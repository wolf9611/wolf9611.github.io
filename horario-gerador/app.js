/* UI for Gerador de Horários JCA (GitHub Pages) */
(function () {
  "use strict";

  const LS_AV = "jca_horario_av_v1";
  const LS_SOL = "jca_horario_sol_v1";

  let BASE = null;
  let SOLUTION = null;
  let AV = {};
  let currentDay = null;
  let currentTeacher = null;

  const $ = (id) => document.getElementById(id);

  function setStatus(kind, text) {
    $("status").innerHTML = `<span class="pill ${kind}">${text}</span>`;
  }

  async function loadBase() {
    const r = await fetch("data/school_base.json", { cache: "no-cache" });
    if (!r.ok) throw new Error("Falha ao carregar school_base.json");
    return r.json();
  }

  function initAvailability() {
    AV = {};
    for (const t of BASE.teachers) {
      AV[t.name] = { ...(t.availability || {}) };
    }
    try {
      const saved = JSON.parse(localStorage.getItem(LS_AV) || "null");
      if (saved && typeof saved === "object") {
        for (const [name, av] of Object.entries(saved)) {
          if (!AV[name]) AV[name] = {};
          Object.assign(AV[name], av);
        }
      }
    } catch (_) {}
  }

  function renderStats() {
    const s = BASE.stats || {};
    $("stats").innerHTML =
      `<span class="pill ok">${s.teachers || BASE.teachers.length} professores</span>` +
      `<span class="pill ok">${s.subjects || BASE.subjects.length} disciplinas</span>` +
      `<span class="pill">${s.demand_lines || BASE.demands.length} demandas</span>` +
      `<span class="pill">${s.total_lessons || "—"} aulas/semana</span>` +
      `<span class="pill">${s.filled_cells || "—"}/${s.grid_cells || "—"} células</span>`;
    $("math").textContent = JSON.stringify(
      BASE.meta || {
        formulation: "CSP escolar no navegador",
        hard: ["turma×slot ≤ 1", "professor×slot ≤ 1", "disponibilidade", "carga"],
        search: "greedy MRV + min-conflicts + simulated annealing",
      },
      null,
      2
    );
  }

  function renderTeacherSelect() {
    const sel = $("teacher");
    sel.innerHTML = BASE.teachers
      .map((t) => `<option value="${t.name}">${t.name} (${t.weekly_load})</option>`)
      .join("");
    currentTeacher = BASE.teachers[0]?.name;
    sel.onchange = () => {
      currentTeacher = sel.value;
      renderAv();
    };
  }

  function renderTabs() {
    $("dayTabs").innerHTML = BASE.days
      .map((d) => {
        const lab = BASE.day_labels[d] || d;
        const cls = d === currentDay ? "" : "secondary";
        return `<button type="button" class="${cls}" data-day="${d}">${lab}</button>`;
      })
      .join("");
    $("dayTabs").onclick = (ev) => {
      const b = ev.target.closest("button[data-day]");
      if (!b) return;
      currentDay = b.getAttribute("data-day");
      renderTabs();
      renderGrid();
    };
  }

  function renderGrid() {
    if (!SOLUTION) return;
    const by = {};
    for (const a of SOLUTION.assignments) {
      by[`${a.day}|${a.period}|${a.turma}`] = a;
    }
    let html =
      "<tr><th>Aula</th>" +
      BASE.turmas.map((t) => `<th>${BASE.turma_labels[t] || t}</th>`).join("") +
      "</tr>";
    for (const p of BASE.periods) {
      html += `<tr><th>${p.label}<br/><span style="font-weight:400;color:#9db0c9">${p.time}</span></th>`;
      for (const t of BASE.turmas) {
        const a = by[`${currentDay}|${p.id}|${t}`];
        if (a) html += `<td class="cell"><b>${a.subject}</b><span>${a.teacher}</span></td>`;
        else html += `<td class="cell"><span>—</span></td>`;
      }
      html += "</tr>";
    }
    $("grid").innerHTML = html;
    buildPrintAll(by);
  }

  function buildPrintAll(by) {
    const wrap = $("printAll");
    let html = "";
    for (const d of BASE.days) {
      html += `<div class="day-print"><h2>${BASE.school || "Horário"}</h2>`;
      html += `<h3>${BASE.day_labels[d] || d}</h3>`;
      html += '<table class="grid"><tr><th>Aula</th>';
      html += BASE.turmas.map((t) => `<th>${BASE.turma_labels[t] || t}</th>`).join("");
      html += "</tr>";
      for (const p of BASE.periods) {
        html += `<tr><th>${p.label}<br/>${p.time}</th>`;
        for (const t of BASE.turmas) {
          const a = by[`${d}|${p.id}|${t}`];
          if (a) html += `<td class="cell"><b>${a.subject}</b><br/><span>${a.teacher}</span></td>`;
          else html += `<td class="cell">—</td>`;
        }
        html += "</tr>";
      }
      html += "</table></div>";
    }
    wrap.innerHTML = html;
  }

  function renderAv() {
    const g = $("avgrid");
    let html = "<div></div>" + BASE.periods.map((p) => `<div>${p.id}ª</div>`).join("");
    for (const d of BASE.days) {
      html += `<div>${(BASE.day_labels[d] || d).slice(0, 3)}</div>`;
      for (const p of BASE.periods) {
        const k = `${d}|${p.id}`;
        const on = AV[currentTeacher]?.[k] !== false;
        html += `<div class="${on ? "on" : "off"}" data-k="${k}">${on ? "✓" : "✕"}</div>`;
      }
    }
    g.innerHTML = html;
    g.onclick = (ev) => {
      const el = ev.target.closest("[data-k]");
      if (!el) return;
      const k = el.getAttribute("data-k");
      AV[currentTeacher][k] = !(AV[currentTeacher][k] !== false);
      renderAv();
    };
  }

  function saveAv() {
    localStorage.setItem(LS_AV, JSON.stringify(AV));
    setStatus("ok", "Disponibilidade salva");
  }

  function restoreRef() {
    SOLUTION = {
      status: "REFERENCE",
      assignments: BASE.reference_assignments || [],
      stats: { status: "REFERENCE", violations: 0 },
      violations: [],
    };
    try {
      localStorage.setItem(LS_SOL, JSON.stringify(SOLUTION));
    } catch (_) {}
    setStatus("ok", "REFERÊNCIA");
    $("log").textContent = "Grade de referência carregada do PDF 03/ago.";
    renderGrid();
  }

  function generate() {
    const btn = $("btnGen");
    btn.disabled = true;
    setStatus("warn", "resolvendo…");
    $("log").textContent = "CSP + min-conflicts + simulated annealing…";

    const iters = Number($("iters").value || 4000);
    const seed = Number($("seed").value || 42);
    const preferReference = $("preferRef").checked;
    const lockElectives = $("lockElec").checked;

    // yield to UI
    setTimeout(() => {
      try {
        const res = window.HorarioSolver.solve(BASE, {
          iterations: iters,
          seed,
          preferReference,
          lockElectives,
          availability: AV,
        });
        SOLUTION = res;
        try {
          localStorage.setItem(LS_SOL, JSON.stringify(res));
        } catch (_) {}
        const ok = res.stats.violations === 0;
        setStatus(ok ? "ok" : "bad", res.stats.status);
        $("log").textContent = JSON.stringify(
          {
            stats: res.stats,
            violations: (res.violations || []).slice(0, 15),
          },
          null,
          2
        );
        renderGrid();
      } catch (e) {
        setStatus("bad", "erro");
        $("log").textContent = String(e && e.stack ? e.stack : e);
      } finally {
        btn.disabled = false;
      }
    }, 30);
  }

  function exportPdf() {
    // Ensure print view built
    renderGrid();
    window.print();
  }

  async function main() {
    BASE = await loadBase();
    initAvailability();
    renderStats();
    renderTeacherSelect();
    currentDay = BASE.days[0];
    renderTabs();
    renderAv();

    try {
      const saved = JSON.parse(localStorage.getItem(LS_SOL) || "null");
      if (saved && Array.isArray(saved.assignments) && saved.assignments.length) {
        SOLUTION = saved;
        setStatus("ok", saved.stats?.status || "salvo");
      } else {
        restoreRef();
      }
    } catch (_) {
      restoreRef();
    }
    renderGrid();

    $("btnSaveAv").onclick = saveAv;
    $("btnGen").onclick = generate;
    $("btnRef").onclick = restoreRef;
    $("btnPdf").onclick = exportPdf;
  }

  main().catch((e) => {
    $("stats").textContent = String(e);
    setStatus("bad", "falha");
  });
})();
