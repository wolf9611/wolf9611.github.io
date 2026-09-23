# Academic Homepage of Josué da Silva Cavalcante

This repository holds the source of the static academic homepage of
[Josué da Silva Cavalcante](https://wolf9611.github.io/), a physicist and
astronomer. The site presents his academic background, his research on the
astrometry and photometry of small Solar System bodies, a summarized
curriculum vitae, and his academic work. It supports English and Brazilian
Portuguese, and it preserves the minimalist dark-gray visual identity and the
IBM Plex typography of the original design.

## Architecture

The site is a static artifact. There is no build step, no JavaScript
framework, and no dependency beyond the Google Fonts stylesheet. Every page
is a single HTML file, all styling lives in one stylesheet, and behavior is
limited to two small scripts. The pages are served by GitHub Pages, and every
internal path is absolute from the domain root.

| Concern      | Implementation                                                                 |
| ------------ | ------------------------------------------------------------------------------ |
| Markup       | One HTML file per page, holding all supported languages                        |
| Styling      | `css/style.css`, a hand-written design system with light and dark themes       |
| Behavior     | `js/main.js` for the theme, `js/i18n.js` for language switching                |
| Dependencies | None at runtime, apart from IBM Plex Sans and IBM Plex Serif from Google Fonts |
| Build        | None. Files are served as written                                              |
| Publication  | GitHub Pages, from the existing `wolf9611/wolf9611.github.io` repository       |

## Repository layout

| Path                           | Content                                                                     |
| ------------------------------ | --------------------------------------------------------------------------- |
| `index.html`                   | Homepage: presentation, education, selected figures, teaching, and projects |
| `research/index.html`          | Methods, results, and figures of the undergraduate and master's research    |
| `cv/index.html`                | Summarized curriculum vitae                                                 |
| `pubs/index.html`              | Theses and academic work                                                    |
| `404.html`                     | Custom page for addresses that do not exist                                 |
| `css/style.css`                | Shared stylesheet and design tokens                                         |
| `js/main.js`                   | Theme switcher, applied before paint                                        |
| `js/i18n.js`                   | Translation catalogs and the in-place language runtime                      |
| `assets/mark/`                 | Site mark, favicon, and application icons                                   |
| `assets/research/`             | Figure excerpts from the source PDFs, in lossless WebP                      |
| `files/`                       | Complete master's thesis in PDF                                             |
| `sitemap.xml`, `robots.txt`    | Crawler directives                                                          |
| `README.md`, `README_pt-BR.md` | Documentation in English and in Brazilian Portuguese                        |

## Internationalization

English is the primary language and lives at the site root. Brazilian
Portuguese is a secondary language offered to readers who choose it. Both are
served from the same URL: there is no Portuguese copy of any page, and no
language segment or query parameter appears in any address.

### How it works

Every translatable node in the markup carries an attribute. The runtime in
`js/i18n.js` holds the catalogs and rewrites those nodes when the language
changes, so switching a language never reloads the page and never loses the
reader's scroll position.

| Attribute        | Purpose                                                       |
| ---------------- | ------------------------------------------------------------- |
| `data-i18n`      | Replaces the text content of the element                      |
| `data-i18n-attr` | Sets one or more attributes, written as `attribute:key` pairs |
| `data-set-lang`  | Marks a control that switches the language when clicked       |

A catalog key ending in `Html` is applied as markup rather than as plain text.
This is reserved for the few strings that wrap a link or an emphasis around a
fragment. All other values are assigned as text, so no catalog entry can
inject unexpected markup.

### Preference and design tradeoff

Both languages share one URL, so the address bar cannot express the language
choice. The runtime resolves the language in this order: the stored preference
under the `jdc-lang` key, then the browser language, then English. There is no
query parameter to read. Switching a language never navigates and never
reloads, so the reader keeps their scroll position.

This arrangement has three consequences worth stating plainly. The address
stays the same while the visible language changes, so `/cv/` can be showing
Portuguese. A link copied while reading in Portuguese opens in English for
anyone without a stored preference. Search engines index one URL per page, and
English is what they see. English is the primary language by design, and the
Portuguese edition is a convenience for readers who choose it.

Without JavaScript the pages still render their full English text, and the
inline language control then points to the same page, so no content is lost.

### Maintenance

To add a string, add it to both catalogs in `js/i18n.js` under the same key,
then reference that key from the markup. The runtime logs a console warning
when a key is missing from the active catalog or absent altogether, so a
mismatch never fails silently. To add a language, extend the `catalog` object
and the `SUPPORTED` list, add a button with `data-set-lang` to the switcher,
and add the matching `hreflang` alternate to the affected pages.

## Design system

The stylesheet is organized into numbered sections, from design tokens to
print. Two themes are defined: a dark palette, which is the default, and a
warm paper light palette. Both share the same typographic hierarchy, and the
choice is stored under the `jdc-theme` key. The layout uses fluid typography
through `clamp()` and flexible Flexbox and CSS Grid containers, so it adapts
from mobile to ultra-wide displays without breakpoint-specific markup.

## Accessibility

The site targets WCAG 2.1 level AA. Text and interface colors meet the
required contrast ratios in both themes, every interactive element exposes a
visible focus state, navigation marks the current page with `aria-current`,
and the language switcher reports its state through `aria-pressed`. Reduced
motion preferences are respected, the figure viewer opens in a native dialog
that traps and restores focus, and the language runtime updates the `lang`
attribute so assistive technology announces the correct language. The CV page
keeps a print-friendly layout that forces the light palette when printed.

## Content sources

- **Undergraduate thesis:** _Astronomia de Posição_, Licenciatura in Physics,
  Universidade Estadual Vale do Acaraú, Sobral, 2018. Supervisor: Antônio
  Fernandes Siqueira. The year refers to the work itself, not to a graduation
  date verified separately. Only the requested figure excerpts are included;
  the complete PDF is not published here.
- **Master's thesis:** _Astrometria e fotometria de pequenos corpos do Sistema
  Solar em imagens com campos estelares densos_, Master's degree in Astronomy,
  Observatório Nacional. The year 2025 appears on the title page. Supervisor:
  Julio I. Bueno de Camargo. Co-supervisor: Adriano Pieres.
- **Competitive examination:** [CEV/UECE Comunicado 131/2019, of 30 December
  2019](https://www.cev.uece.br/wp-content/uploads/2021/10/comunicado131.2019.pdf#page=16),
  final result of the SEDUC-CE 2018 examination for Physics teachers. The name
  appears on page 16, under Physics, and the result confirms approval. It is
  not used to infer dates of appointment or investiture.
- **Current teaching position:** reported by the site owner.
- **Doctoral studies:** reported by the site owner, without an institution or
  a start date.

## Figures and page references

The image files are renderings of regions of the original PDFs, without
reconstruction of the figures or alteration of the data. The numbering
printed in each work differs from the page position in the corresponding
file. Links that use `#page=` refer to the position within the PDF, while the
printed page appears in the caption.

| Image                             | Work                 | Figure | Printed page | PDF page |
| --------------------------------- | -------------------- | ------ | ------------ | -------- |
| `horizontal-coordinates.webp`     | Undergraduate thesis | 5      | 24           | 25       |
| `position-triangle.webp`          | Undergraduate thesis | 12     | 34           | 35       |
| `chariklo-image-subtraction.webp` | Master's thesis      | 4.5    | 43           | 55       |
| `chariklo-photometry.webp`        | Master's thesis      | 5.2    | 57           | 69       |

The astrometry table on the Research page reproduces Table 4.1 of the
master's thesis, printed page 45 (PDF page 57), and reports the differing
sample sizes. The uncertainty of the rotational phase is not reproduced,
because the abstract and the body of the PDF present different values.

## Educational projects

The educational section describes collaborative initiatives maintained by the
author, including [BuscApp](https://github.com/eemtijca/buscapp), an
attendance-monitoring and family-communication project developed with
[Emanuel Lázaro](https://github.com/emanuellcs). These references are kept for
attribution and for the documentation of the projects.

## Local preview

The site uses absolute paths from the domain root, so it should be previewed
through a local static server:

```bash
python3 -m http.server 8000
```

The pages are then available at `http://localhost:8000/`. The language
switcher can be tested from any page, and the stored preference can be verified
by reloading after switching.

## Publication and maintenance

The site is published through GitHub Pages from the existing repository, and
changes should be reviewed before they reach the published branch. When the
stylesheet or a script changes, update the `?v=` query string on the `<link>`
and `<script>` tags across the affected pages. The value is currently `v=7`,
and it exists purely to bypass the browser cache for returning visitors.

## Copyright

Copyright 2026 Josué da Silva Cavalcante. All rights reserved.
