# Solar Spectrum — AM1.5 Explorer

An English, responsive solar spectrum calculator. Deploy the folder contents directly to GitHub Pages. No build step, CDN, external font, account, or API key is required.

## Publish on GitHub Pages

1. Extract the ZIP.
2. Create a GitHub repository, such as `solar-spectrum`.
3. Upload the extracted **contents** to its root: `index.html`, `assets/`, `data/`, `tests/`, documentation, and `.nojekyll`. Do not upload only the ZIP or put the website inside an extra parent folder.
4. Open **Settings → Pages → Build and deployment**.
5. Choose **Deploy from a branch**, **main**, **/(root)**, and **Save**.
6. Open the HTTPS URL shown by GitHub when deployment finishes. Use that same URL on iPhone, iPad, and Android.

Every asset URL is relative, so the repository name can be anything. See [GitHub's publishing-source guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Local use

Open `index.html` in a modern desktop browser. Computation and figure generation work offline. For local HTTP preview, run `python -m http.server 8000` and open `http://localhost:8000`. On a phone, use the deployed HTTPS website; ZIP preview apps do not run a complete website.

## Preserved functionality

- AM1.5G (global tilt) and AM1.5D (direct + circumsolar).
- Arbitrary wavelength bounds, including decimals, between 280 and 4000 nm.
- UV, visible, infrared, and full-range presets.
- Band energy fraction, band irradiance, and total irradiance.
- Full-spectrum and selected-band chart views.
- CSV result download and original source-data download.
- PNG, SVG, and PDF figure exports.
- Custom width and height in cm, inches, or pixels; 72–1200 DPI.
- Invalid-input feedback and disabled export actions until input is valid.
- Repeat-save link and native file sharing on supported browsers.

## Design changes

A white/graphite interface with blue actions, a restrained spectrum motif, system typography, grouped controls, and a chart-first result area. Layout adapts from 320 px to desktop. Dark mode follows the operating system. Keyboard focus, screen-reader labels, selected-button states, safe-area padding, and reduced-motion preferences are supported.

Design references were consulted, not installed as runtime dependencies:

- [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): responsive layout, accessible controls, contrast, and data presentation. The search suggested a data dashboard; irrelevant enterprise marketing sections were not adopted.
- [Apple Design Skill](https://github.com/dickwu/apple-design-skill): hierarchy, restraint, progressive disclosure, semantic colors, and adaptive layout. This is a web application, not an Apple-native interface.
- [Nature Figure](https://github.com/Yuan1z0825/nature-skills/tree/main/skills/nature-figure): export typography, axes, colors, editable text, and physical dimensions. Its Python/R authoring workflow is not used in this browser-only application.

## Scientific figure export

Choose **Export figure**, then a preset or custom dimensions.

| Preset | Physical dimensions | PNG pixels at 300 DPI |
| --- | --- | --- |
| Single column | 89 × 65 mm | 1051 × 768 |
| Double column | 183 × 100 mm | 2161 × 1181 |

All exports use a white background, 7 pt Arial/Helvetica-compatible text, labeled axes with units, explicit ticks, a gray reference curve, blue selected-band shading, and dashed band boundaries. There are no background gridlines, shadows, smoothing, or decorative gradients in exported figures. Legends and the selected wavelength range are included.

- **SVG (recommended)**: actual vector paths and editable text, with physical dimensions. Fonts use a standard Arial/Helvetica fallback stack, not embedded font binaries. Ensure the intended font is installed when editing or converting.
- **PNG**: rounded pixel dimensions at the requested DPI, with a pHYs resolution metadata chunk.
- **PDF**: exact-size page containing a high-resolution JPEG image. It is a **raster PDF**, with no editable figure text. Use SVG as the editable master.
- Exports reflect the current **Full view / Band view**, independent of screen size and device pixel ratio.
- The size guard retains the original approximately 5–61 cm per-side range, 16-megapixel cap, and 8192-pixel side cap. On memory-limited phones, use SVG or a smaller PNG.
- The dialog flags low raster DPI, non-column widths, and heights beyond 170 mm.

These are Nature-informed technical defaults, **not a blanket journal-compliance certification**. Nature main-figure production requires editable artwork; a high-DPI PNG or this raster PDF does not replace it. Review the exact journal, article stage, font handling, file format, legend, and source-data requirements. The browser exporter does not run the Nature skill's Python/R PDF audit tools.

Reference: [Nature figure specifications](https://research-figure-guide.nature.com/figures/preparing-figures-our-specifications/) (consulted 2026-11-01). For widths see [Nature Article requirements in the supplied skill](https://github.com/Yuan1z0825/nature-skills/blob/main/skills/nature-figure/references/nature-article-requirements.md).

## Calculation and data integrity

Energy fraction = integral over selected band / integral over 280–4000 nm × 100%.

Uses all original sampling points, linear interpolation at band boundaries, and trapezoidal integration with compensated summation. The total is integrated, not fixed to 1000 W/m². This is incident **energy fraction**, not photon fraction, absorption efficiency, or catalytic efficiency. Preset region limits are interface conventions. Narrow-band accuracy is limited by source resolution.

| Reference check | Expected value |
| --- | --- |
| AM1.5G total | 1000.370655573442 W/m² |
| AM1.5D total | 900.139329284215 W/m² |
| AM1.5G, 350–400 nm | 32.328605 W/m²; 3.23166266622128% |

`assets/core.js`, `assets/spectrum-data.js`, and `data/ASTMG173.csv` are unchanged from the user-supplied archive. No reference values were invented or resampled.

The supplied archive attributes the source to ASTM G173-03 Reference Spectra Derived from SMARTS v. 2.9.2, with an original retrieval date of 2026-10-22. This redesign preserves that provenance; it did not independently re-download the reference data.

- [Reference spectra and data terms](https://www.nlr.gov/grid/solar-resource/spectra-am1.5)
- Data retain their original source terms. This package does not assign a new license to the dataset or the user's original code.

## Verification

Run the dependency-free tests: `node --test tests/core.test.cjs`.

See `QA.md` for browser checks and their limits.

## Files

- `index.html`: English UI
- `assets/styles.css`: responsive light/dark design
- `assets/core.js`: unchanged integration and size validation
- `assets/chart.js`: screen and publication SVG renderer
- `assets/export.js`: preserved PNG/SVG/raster-PDF exporters
- `assets/app.js`: interaction and export presets
- `assets/spectrum-data.js`, `data/ASTMG173.csv`: unchanged reference data
- `tests/core.test.cjs`: regression tests
