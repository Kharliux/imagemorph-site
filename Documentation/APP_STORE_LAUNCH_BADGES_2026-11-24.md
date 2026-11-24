# ImageMorph — Official Mac App Store badge launch plan (2026-11-24)

## Current public status
- ImageMorph macOS 1.0 (12) and ImageMorph Studio (non-consumable IAP) were both submitted to App Review on 2026-11-24, 15:24 America/Santiago.
- App Store Connect showed both items as Pending Review; this is **not** approval, availability or published download.
- App Store product listing target: https://apps.apple.com/app/id6817488526 (public availability not independently confirmed).
- Launch badge in `language.js` is gated with `APP_STORE_RELEASED = false`. No official download badge should be displayed before release. The existing coming-soon copy remains in place.

## Apple source and rules
- Official guidelines: https://developer.apple.com/app-store/marketing/guidelines/
- Marketing tools: https://toolbox.marketingtools.apple.com/
- Download original **Mac App Store** badge artwork in the respective official languages. DO NOT redraw, translate, alter, crop, recolor or substitute a fake logo.
- Preferred badge is black; minimum on-screen height 40px and clear space one-quarter its height.
- Do not enable `APP_STORE_RELEASED` until actual public download is verified and the artwork is present in all language paths.
- The Apple marketing-tools site was not accessible to automated inspection, so no assets were downloaded or committed here. The website is **prepared**, not badge-complete.

## 19 official artwork slots (website locale => asset)
```
en      assets/app-store-badges/en.svg
de      assets/app-store-badges/de.svg
es      assets/app-store-badges/es.svg
fr      assets/app-store-badges/fr.svg
it      assets/app-store-badges/it.svg
nl      assets/app-store-badges/nl.svg
pl      assets/app-store-badges/pl.svg
pt-BR   assets/app-store-badges/pt-BR.svg
sk      assets/app-store-badges/sk.svg
id      assets/app-store-badges/id.svg
hi      assets/app-store-badges/hi.svg
ja      assets/app-store-badges/ja.svg
ko      assets/app-store-badges/ko.svg
ru      assets/app-store-badges/ru.svg
tr      assets/app-store-badges/tr.svg
uk      assets/app-store-badges/uk.svg
vi      assets/app-store-badges/vi.svg
zh-Hans assets/app-store-badges/zh-Hans.svg
zh-Hant assets/app-store-badges/zh-Hant.svg
```
These are **planned asset filenames**, not proof that the files exist. If official assets arrive in another format, adapt `language.js` to the true file format/paths rather than disguising or modifying artwork.

## Go-live checklist
1. Apple approval and availability confirmed from official public store listing.
2. Acquire all 19 authentic badges in Apple marketing tools; record their provenance and inspect layout, size and locale.
3. Commit the authentic assets with exact names/paths; verify there are no missing files.
4. Set `APP_STORE_RELEASED = true`; verify all 19 homepage URLs, desktop and mobile, links and images. Avoid showing misleading prelaunch copy after release.
5. Independently verify public site deployment and click destination.
6. Keep the app repository/code/PR separate from website changes.
