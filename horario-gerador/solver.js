/**
 * School timetabling — browser CSP solver
 *
 * Hard constraints (CSP):
 *  H1 each demand r places exactly lessons_r slots
 *  H2 at most one lesson per (turma, day, period)
 *  H3 at most one lesson per (teacher, day, period)
 *  H4 teacher availability
 *  H5 locked electives stay fixed
 *
 * Search:
 *  1) constructive greedy (MRV-like: largest remaining demand first)
 *  2) min-conflicts repair
 *  3) simulated annealing on soft objective
 *
 * Soft objective (maximize score):
 *  + reference match
 *  - teacher day gaps
 *  - daily load imbalance
 */
(function (global) {
  "use strict";

  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function isElective(a) {
    if (a && a.elective) return true;
    const s = String((a && a.subject) || "");
    return /^(E[1-4]|Clube)/.test(s);
  }

  function slotKey(day, period) {
    return day + "|" + period;
  }

  function cloneAssignments(list) {
    return list.map((a) => ({ ...a }));
  }

  function buildIndexes(base, assignments) {
    const classOcc = new Map(); // key -> assignment
    const teachOcc = new Map();
    for (const a of assignments) {
      classOcc.set(`${a.turma}|${a.day}|${a.period}`, a);
      teachOcc.set(`${a.teacher}|${a.day}|${a.period}`, a);
    }
    return { classOcc, teachOcc };
  }

  function demandKey(d) {
    return `${d.turma}|${d.subject}|${d.teacher}`;
  }

  function countDemands(assignments) {
    const got = new Map();
    for (const a of assignments) {
      const k = `${a.turma}|${a.subject}|${a.teacher}`;
      got.set(k, (got.get(k) || 0) + 1);
    }
    return got;
  }

  function validate(base, assignments, availability) {
    const viol = [];
    const { classOcc, teachOcc } = buildIndexes(base, assignments);
    // rebuild to detect doubles
    const cCount = new Map();
    const tCount = new Map();
    for (const a of assignments) {
      const ck = `${a.turma}|${a.day}|${a.period}`;
      const tk = `${a.teacher}|${a.day}|${a.period}`;
      cCount.set(ck, (cCount.get(ck) || 0) + 1);
      tCount.set(tk, (tCount.get(tk) || 0) + 1);
      const av = availability[a.teacher];
      if (av && av[slotKey(a.day, a.period)] === false) {
        viol.push(`disp ${a.teacher} ${a.day} ${a.period}`);
      }
    }
    for (const [k, n] of cCount) if (n > 1) viol.push(`turma ${k}`);
    for (const [k, n] of tCount) if (n > 1) viol.push(`prof ${k}`);

    const need = new Map(base.demands.map((d) => [demandKey(d), d.lessons]));
    const got = countDemands(assignments);
    for (const [k, n] of need) {
      if ((got.get(k) || 0) !== n) viol.push(`demanda ${k}: ${got.get(k) || 0}/${n}`);
    }
    return viol;
  }

  function softScore(base, assignments, preferRef) {
    const days = base.days;
    const periods = base.periods.map((p) => p.id);
    let score = 0;

    if (preferRef) {
      const ref = new Set(
        (base.reference_assignments || [])
          .filter((a) => !isElective(a))
          .map((a) => `${a.turma}|${a.subject}|${a.teacher}|${a.day}|${a.period}`)
      );
      for (const a of assignments) {
        if (isElective(a)) continue;
        if (ref.has(`${a.turma}|${a.subject}|${a.teacher}|${a.day}|${a.period}`)) score += 5;
      }
    }

    // gaps + balance per teacher
    const byTP = new Map(); // teacher -> day -> set periods
    for (const a of assignments) {
      if (!byTP.has(a.teacher)) byTP.set(a.teacher, new Map());
      const dm = byTP.get(a.teacher);
      if (!dm.has(a.day)) dm.set(a.day, []);
      dm.get(a.day).push(a.period);
    }
    for (const [, dm] of byTP) {
      const loads = [];
      for (const d of days) {
        const ps = (dm.get(d) || []).slice().sort((a, b) => a - b);
        loads.push(ps.length);
        if (ps.length >= 2) {
          const span = ps[ps.length - 1] - ps[0] + 1;
          const gap = span - ps.length;
          score -= 2 * gap;
        }
      }
      if (loads.length) {
        score -= Math.max(...loads) - Math.min(...loads);
      }
    }
    return score;
  }

  function availableSlots(base, dem, availability, classOcc, teachOcc, lockedClass, lockedTeach) {
    const out = [];
    const av = availability[dem.teacher] || {};
    for (const day of base.days) {
      for (const p of base.periods) {
        const period = p.id;
        if (lockedClass.has(`${dem.turma}|${day}|${period}`)) continue;
        if (lockedTeach.has(`${dem.teacher}|${day}|${period}`)) continue;
        if (av[slotKey(day, period)] === false) continue;
        if (classOcc.has(`${dem.turma}|${day}|${period}`)) continue;
        if (teachOcc.has(`${dem.teacher}|${day}|${period}`)) continue;
        out.push({ day, period });
      }
    }
    return out;
  }

  function solve(base, opts) {
    const options = Object.assign(
      {
        iterations: 4000,
        seed: 42,
        preferReference: true,
        lockElectives: true,
        availability: null,
        onProgress: null,
      },
      opts || {}
    );
    const rnd = mulberry32(options.seed >>> 0);
    const t0 = performance.now();

    // availability map
    const availability = {};
    for (const t of base.teachers) {
      availability[t.name] = Object.assign({}, t.availability || {});
    }
    if (options.availability) {
      for (const [name, av] of Object.entries(options.availability)) {
        availability[name] = Object.assign(availability[name] || {}, av);
      }
    }

    const locked = [];
    const lockedClass = new Set();
    const lockedTeach = new Set();
    const freeDemands = [];

    for (const d of base.demands) {
      if (options.lockElectives && (d.elective || /^(E[1-4]|Clube)/.test(String(d.subject || "")))) {
        continue; // placed from reference
      }
      freeDemands.push({ ...d });
    }

    if (options.lockElectives) {
      for (const a of base.reference_assignments || []) {
        if (isElective(a)) {
          const fa = { ...a, elective: true };
          locked.push(fa);
          lockedClass.add(`${fa.turma}|${fa.day}|${fa.period}`);
          lockedTeach.add(`${fa.teacher}|${fa.day}|${fa.period}`);
        }
      }
    }

    // Start from reference for free demands when possible
    let assignments = cloneAssignments(locked);
    const { classOcc, teachOcc } = buildIndexes(base, assignments);
    const placedCount = new Map(); // demandKey -> count

    function tryPlace(dem, day, period) {
      const ck = `${dem.turma}|${day}|${period}`;
      const tk = `${dem.teacher}|${day}|${period}`;
      if (classOcc.has(ck) || teachOcc.has(tk)) return false;
      const av = availability[dem.teacher] || {};
      if (av[slotKey(day, period)] === false) return false;
      if (lockedClass.has(ck) || lockedTeach.has(tk)) return false;
      const a = {
        day,
        period,
        turma: dem.turma,
        subject: dem.subject,
        teacher: dem.teacher,
        elective: !!dem.elective,
      };
      assignments.push(a);
      classOcc.set(ck, a);
      teachOcc.set(tk, a);
      const dk = demandKey(dem);
      placedCount.set(dk, (placedCount.get(dk) || 0) + 1);
      return true;
    }

    function removeAt(idx) {
      const a = assignments[idx];
      if (!a || a._locked) return false;
      if (isElective(a) && options.lockElectives) return false;
      classOcc.delete(`${a.turma}|${a.day}|${a.period}`);
      teachOcc.delete(`${a.teacher}|${a.day}|${a.period}`);
      const dk = `${a.turma}|${a.subject}|${a.teacher}`;
      placedCount.set(dk, (placedCount.get(dk) || 1) - 1);
      assignments.splice(idx, 1);
      return true;
    }

    // Mark locked
    for (const a of assignments) a._locked = true;

    // Seed from reference
    if (options.preferReference) {
      for (const a of base.reference_assignments || []) {
        if (isElective(a) && options.lockElectives) continue;
        const dem = freeDemands.find(
          (d) => d.turma === a.turma && d.subject === a.subject && d.teacher === a.teacher
        );
        if (!dem) continue;
        const dk = demandKey(dem);
        if ((placedCount.get(dk) || 0) >= dem.lessons) continue;
        tryPlace(dem, a.day, a.period);
      }
    }

    // Remaining constructive
    const remaining = () => {
      const list = [];
      for (const dem of freeDemands) {
        const have = placedCount.get(demandKey(dem)) || 0;
        for (let i = have; i < dem.lessons; i++) list.push(dem);
      }
      return list;
    };

    let left = remaining();
    // sort by fewest available slots (MRV)
    left.sort((a, b) => {
      const sa = availableSlots(base, a, availability, classOcc, teachOcc, lockedClass, lockedTeach).length;
      const sb = availableSlots(base, b, availability, classOcc, teachOcc, lockedClass, lockedTeach).length;
      return sa - sb;
    });

    for (const dem of left) {
      let slots = availableSlots(base, dem, availability, classOcc, teachOcc, lockedClass, lockedTeach);
      if (!slots.length) continue;
      if (options.preferReference) {
        // prefer slots that match any remaining reference for this demand
      }
      // pick random among top domain
      const pick = slots[Math.floor(rnd() * slots.length)];
      tryPlace(dem, pick.day, pick.period);
    }

    // Min-conflicts + SA
    let best = cloneAssignments(assignments);
    let bestScore = softScore(base, best, options.preferReference);
    let bestViol = validate(base, best, availability).length;
    let curScore = bestScore;
    let temperature = 3.0;

    const maxIt = options.iterations | 0;
    for (let it = 0; it < maxIt; it++) {
      // identify unsatisfied demands
      const needFix = [];
      for (const dem of freeDemands) {
        const have = placedCount.get(demandKey(dem)) || 0;
        if (have < dem.lessons) {
          for (let k = have; k < dem.lessons; k++) needFix.push({ type: "missing", dem });
        }
      }

      // also random move of free assignments to reduce gaps
      const freeIdx = [];
      for (let i = 0; i < assignments.length; i++) {
        if (!assignments[i]._locked) freeIdx.push(i);
      }

      let moved = false;
      if (needFix.length && freeIdx.length) {
        // place missing: free a conflicting slot if needed
        const item = needFix[Math.floor(rnd() * needFix.length)];
        const dem = item.dem;
        let slots = availableSlots(base, dem, availability, classOcc, teachOcc, lockedClass, lockedTeach);
        if (!slots.length) {
          // eject random free assignment sharing class or teacher domain pressure
          const victimPos = freeIdx[Math.floor(rnd() * freeIdx.length)];
          removeAt(victimPos);
          slots = availableSlots(base, dem, availability, classOcc, teachOcc, lockedClass, lockedTeach);
        }
        if (slots.length) {
          const s = slots[Math.floor(rnd() * slots.length)];
          tryPlace(dem, s.day, s.period);
          moved = true;
        }
      } else if (freeIdx.length) {
        // relocate random lesson
        const victimPos = freeIdx[Math.floor(rnd() * freeIdx.length)];
        const a = assignments[victimPos];
        const dem = { turma: a.turma, subject: a.subject, teacher: a.teacher, lessons: 1, elective: a.elective };
        removeAt(victimPos);
        let slots = availableSlots(base, dem, availability, classOcc, teachOcc, lockedClass, lockedTeach);
        if (slots.length) {
          // prefer better soft score slots (sample)
          let bestS = null;
          let bestSc = -1e18;
          const samples = Math.min(12, slots.length);
          for (let s = 0; s < samples; s++) {
            const cand = slots[Math.floor(rnd() * slots.length)];
            // tentative
            tryPlace(dem, cand.day, cand.period);
            const sc = softScore(base, assignments, options.preferReference);
            // undo last
            removeAt(assignments.length - 1);
            if (sc > bestSc) {
              bestSc = sc;
              bestS = cand;
            }
          }
          const pick = bestS || slots[Math.floor(rnd() * slots.length)];
          tryPlace(dem, pick.day, pick.period);
          moved = true;
        } else {
          // put back somewhere random if possible — else lost (will repair later)
          slots = availableSlots(base, dem, availability, classOcc, teachOcc, lockedClass, lockedTeach);
          if (slots.length) tryPlace(dem, slots[0].day, slots[0].period);
        }
      }

      if (!moved && needFix.length === 0) {
        // small random swap: move one
        if (freeIdx.length) {
          const victimPos = freeIdx[Math.floor(rnd() * freeIdx.length)];
          const a = assignments[victimPos];
          const dem = { turma: a.turma, subject: a.subject, teacher: a.teacher, lessons: 1 };
          removeAt(victimPos);
          const slots = availableSlots(base, dem, availability, classOcc, teachOcc, lockedClass, lockedTeach);
          if (slots.length) {
            const s = slots[Math.floor(rnd() * slots.length)];
            tryPlace(dem, s.day, s.period);
          }
        }
      }

      const sc = softScore(base, assignments, options.preferReference);
      const viol = validate(base, assignments, availability).length;
      const delta = sc - curScore - 50 * (viol - bestViol);
      if (viol < bestViol || (viol === bestViol && sc >= curScore) || rnd() < Math.exp(delta / Math.max(0.01, temperature))) {
        curScore = sc;
        if (viol < bestViol || (viol === bestViol && sc > bestScore)) {
          bestScore = sc;
          bestViol = viol;
          best = cloneAssignments(assignments).map((a) => {
            const b = { ...a };
            delete b._locked;
            return b;
          });
        }
      } else {
        // reject — restart from best occasionally
        if (rnd() < 0.02) {
          assignments = cloneAssignments(best);
          for (const a of assignments) {
            if (isElective(a) && options.lockElectives) a._locked = true;
          }
          // rebuild indexes
          classOcc.clear();
          teachOcc.clear();
          placedCount.clear();
          for (const a of assignments) {
            classOcc.set(`${a.turma}|${a.day}|${a.period}`, a);
            teachOcc.set(`${a.teacher}|${a.day}|${a.period}`, a);
            const dk = `${a.turma}|${a.subject}|${a.teacher}`;
            placedCount.set(dk, (placedCount.get(dk) || 0) + 1);
          }
          curScore = bestScore;
        }
      }

      temperature *= 0.9995;
      if (options.onProgress && it % 200 === 0) {
        options.onProgress({ it, bestScore, bestViol, temperature });
      }
      if (bestViol === 0 && it > maxIt * 0.4 && temperature < 0.2) break;
    }

    // final cleanup locked flags
    const final = best.map((a) => {
      const b = {
        day: a.day,
        period: a.period,
        turma: a.turma,
        subject: a.subject,
        teacher: a.teacher,
        elective: !!a.elective || isElective(a),
      };
      return b;
    });

    const violations = validate(base, final, availability);
    return {
      status: violations.length === 0 ? "FEASIBLE" : "PARTIAL",
      assignments: final,
      stats: {
        status: violations.length === 0 ? "FEASIBLE" : "PARTIAL",
        objective: softScore(base, final, options.preferReference),
        wall_time_s: Math.round((performance.now() - t0) / 10) / 100,
        num_assignments: final.length,
        violations: violations.length,
        iterations: maxIt,
        algorithm: "CSP constructive + min-conflicts + simulated annealing",
      },
      violations,
    };
  }

  global.HorarioSolver = { solve, validate, softScore, isElective, slotKey };
})(typeof window !== "undefined" ? window : globalThis);
