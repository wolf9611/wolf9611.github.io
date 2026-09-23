# Academic Homepage of Josué da Silva Cavalcante

This repository contains the source code of the static academic homepage of [Josué da Silva Cavalcante](https://wolf9611.github.io/en/), a physicist and astronomer. The site presents his academic background, his research on astrometry and photometry of small Solar System bodies, a summarized curriculum vitae, and his academic work. The content is written in English, with an introductory page in Brazilian Portuguese, and it retains the minimalist dark-gray visual identity and the IBM Plex Sans and IBM Plex Serif typography of the previous design.

The site is built with plain HTML and CSS. There is no compilation step and no JavaScript framework; the only script is a small shared file that implements the light and dark theme switcher and stores the language preference. The pages are served through GitHub Pages, and all internal paths are relative to the root of the site domain.

## Repository structure

| Path                           | Content                                                                                               |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `index.html`                   | Language negotiation page at the site root; it forwards visitors to the English or Portuguese version |
| `en/index.html`                | English homepage: presentation, education, selected figures, teaching, and projects                   |
| `en/research/index.html`       | Methods, results, and figures of the undergraduate and master's research                              |
| `en/cv/index.html`             | Summarized curriculum vitae                                                                           |
| `en/pubs/index.html`           | Theses and academic work                                                                              |
| `pt/index.html`                | Introductory page in Brazilian Portuguese; its links lead to the English pages                        |
| `css/style.css`                | Shared stylesheet: dark theme by default, light counterpart, responsive layout                        |
| `js/main.js`                   | Shared behavior: theme switcher and language preference                                               |
| `assets/mark/`                 | Site mark, favicon, and application icons                                                             |
| `assets/research/`             | Figure excerpts from the source PDFs, in lossless WebP format                                         |
| `files/`                       | Complete master's dissertation in PDF                                                                 |
| `404.html`                     | Custom page for addresses that do not exist                                                           |
| `sitemap.xml`, `robots.txt`    | Crawler directives                                                                                    |
| `README.md`, `README_pt-BR.md` | Documentation in English and in Brazilian Portuguese                                                  |

## Internationalization

The site root performs language negotiation. The root page consults the stored preference first, then the browser language, and forwards the visitor to the English version (`/en/`) or to the Portuguese version (`/pt/`); English is the default. When JavaScript is unavailable, a fallback redirect and explicit language links are provided. Every page carries a compact `EN | PT` switcher in the header, and the language chosen through the switcher is stored locally so that the root page can honor it on subsequent visits.

The Portuguese page (`pt/index.html`) is deliberately maintained in Brazilian Portuguese, and its internal links point to the English versions of the remaining pages, as the Research, CV, and Publications sections exist only in English.

## Design and accessibility

The site preserves the minimalist gray aesthetic of the original design and extends it in three directions. First, the header is fully centered: the language and theme controls, the site title, the tagline, and the navigation are aligned on a common central axis. Second, the site offers a light theme as a counterpart to the default dark theme; the light palette uses warm paper tones with the same typographic hierarchy, and the choice is stored locally. Third, the layout is fully responsive across mobile, tablet, desktop, and ultra-wide screens, using fluid typography (`clamp()`) and flexible Flexbox and CSS Grid layouts.

Accessibility follows WCAG 2.1 level AA: text and interface colors meet the required contrast ratios in both themes, all interactive elements expose visible focus states, the theme toggle and the language switcher carry programmatic labels, navigation marks the current page with `aria-current`, and reduced-motion preferences are respected. The CV page retains a print-friendly layout that forces the light palette when printed.

## Content sources

- **Undergraduate thesis:** _Astronomia de Posição_, Licenciatura in Physics, Universidade Estadual Vale do Acaraú, Sobral, 2018. Supervisor: Antônio Fernandes Siqueira. Only the requested figure excerpts are included; the complete PDF provided by the author is not published in this version. The year refers to the work itself, not to a graduation date verified separately.
- **Master's dissertation:** _Astrometria e fotometria de pequenos corpos do Sistema Solar em imagens com campos estelares densos_, Master's degree in Astronomy, Observatório Nacional. The year 2025 appears on the title page; the cover of the available file also carries a later compilation date. Supervisor: Julio I. Bueno de Camargo. Co-supervisor: Adriano Pieres.
- **Competitive examination:** [CEV/UECE Comunicado 131/2019, of 30 December 2019](https://www.cev.uece.br/wp-content/uploads/2021/10/comunicado131.2019.pdf#page=16), final result of the SEDUC-CE 2018 examination for Physics teachers. Josué's name appears on page 16, under Physics. The result confirms approval; it is not used to infer dates of appointment or investiture.
- **Current teaching position:** reported by the site owner.
- **Doctoral studies:** content preserved from the previous version of the site, without adding an institution or a start date.

## Figures and page references

The image files are renderings of regions of the original PDFs, without reconstruction of the figures or alteration of the data. The numbering printed in each work differs from the page position in the corresponding file; the dissertation links using `#page=` refer to the position within the PDF. The undergraduate thesis figures state the printed page in their captions.

| Image                             | Work                 | Figure | Printed page | PDF page |
| --------------------------------- | -------------------- | ------ | ------------ | -------- |
| `horizontal-coordinates.webp`     | Undergraduate thesis | 5      | 24           | 25       |
| `position-triangle.webp`          | Undergraduate thesis | 12     | 34           | 35       |
| `chariklo-image-subtraction.webp` | Dissertation         | 4.5    | 43           | 55       |
| `chariklo-photometry.webp`        | Dissertation         | 5.2    | 57           | 69       |

The astrometry table on the Research page reproduces Table 4.1 of the dissertation, printed page 45 (PDF page 57), and reports the differing sample sizes. The uncertainty of the rotational phase is not reproduced on the site because the abstract and the body of the PDF present different values.

## Educational projects

The educational section of the site describes collaborative initiatives maintained by the author, including [BuscApp](https://github.com/eemtijca/buscapp), an attendance-monitoring and family-communication project developed with [Emanuel Lázaro](https://github.com/emanuellcs). These references are kept for attribution and for the documentation of the projects.

## Local preview

The site uses paths relative to the domain root, so it should be previewed through a local static server, for example:

```bash
python3 -m http.server 8000
```

The pages are then available at `http://localhost:8000/en/` and `http://localhost:8000/pt/`.

## Publication

The site uses the existing `wolf9611/wolf9611.github.io` repository and the standard GitHub Pages publishing flow. Changes should be reviewed before being incorporated into the published branch. No migration to another service and no second site are required.
