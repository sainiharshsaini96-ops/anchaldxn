---
name: Botanical Wellness Guide
colors:
  surface: '#effdf3'
  surface-dim: '#d0ddd4'
  surface-bright: '#effdf3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e9f7ee'
  surface-container: '#e3f1e8'
  surface-container-high: '#deece2'
  surface-container-highest: '#d8e6dd'
  on-surface: '#121e19'
  on-surface-variant: '#414944'
  inverse-surface: '#27332d'
  inverse-on-surface: '#e6f4eb'
  outline: '#717973'
  outline-variant: '#c0c9c2'
  surface-tint: '#386752'
  primary: '#003020'
  on-primary: '#ffffff'
  primary-container: '#164734'
  on-primary-container: '#84b59c'
  inverse-primary: '#9fd1b8'
  secondary: '#1f6b49'
  on-secondary: '#ffffff'
  secondary-container: '#a7f3c7'
  on-secondary-container: '#26714e'
  tertiary: '#382600'
  on-tertiary: '#ffffff'
  tertiary-container: '#523b04'
  on-tertiary-container: '#c7a566'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bbeed3'
  primary-fixed-dim: '#9fd1b8'
  on-primary-fixed: '#002115'
  on-primary-fixed-variant: '#1f4f3c'
  secondary-fixed: '#a7f3c7'
  secondary-fixed-dim: '#8cd6ac'
  on-secondary-fixed: '#002112'
  on-secondary-fixed-variant: '#005233'
  tertiary-fixed: '#ffdea5'
  tertiary-fixed-dim: '#e6c180'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5b430c'
  background: '#effdf3'
  on-background: '#121e19'
  surface-variant: '#d8e6dd'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: 4rem
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 2.5rem
    fontWeight: '600'
    lineHeight: 3rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 1.875rem
    fontWeight: '600'
    lineHeight: 2.375rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Manrope
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Manrope
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.875rem
    letterSpacing: 0em
  body-md:
    fontFamily: Manrope
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Manrope
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Manrope
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.02em
  label-md:
    fontFamily: Manrope
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Manrope
    fontSize: 0.6875rem
    fontWeight: '700'
    lineHeight: 0.875rem
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2rem
  space-xl: 3.5rem
---

## Brand & Style
The brand personality embodies serene wellness, transparent product education, and grounded natural authority. It fuses an editorial, botanical aesthetic with clinical clarity—approachable yet deeply knowledgeable, quiet yet distinct. 

The visual style embraces an **Editorial Natural** movement: spacious layouts, warm organic canvas tones, deliberate micro-interactions, and refined typography. Interface elements avoid synthetic digital tropes, opting instead for tactile paper-like cards, disciplined botanical green tones, warm gold accents, and transparent factual labeling that fosters consumer trust across multi-language product education.

## Colors
The color system reflects natural equilibrium, anchored by deep forest tones and warm organic backdrops:

- **Primary Brand / Headings / CTA (`#164734`):** Deep forest green. Anchor for high-priority actions, brand headers, and structural emphasis.
- **Secondary Brand / Interactive (`#37805C`):** Botanical green. Used for secondary CTAs, active filter pills, verified checkmarks, and supporting highlights.
- **Tertiary / Accent (`#C7A566`):** Soft warm gold. Reserved for premium certifications, highlight badges, ratings, and subtle gold accents.
- **Neutral Main Text (`#25312B`):** Deep charcoal with a hint of warm green; provides high legibility without the harshness of pure black.
- **Neutral Secondary Text (`#70796F`):** Muted botanical gray for metadata, subtitles, table captions, and botanical nomenclature.
- **Primary Background (`#FAF8F2`):** Warm ivory creating a gentle, natural foundation across the screen canvas.
- **Content Surfaces / Cards (`#FFFFFF`):** Pure crisp white for elevated readability against the warm canvas.
- **Section / Container Fill (`#E8EEE5`):** Muted botanical sage for alternating sections, inset quote panels, and neutral chip backgrounds.
- **Border / Divider (`#E2E8DF`):** Light sage hairline divider ensuring clean structure across tables and cards.

## Typography
Manrope serves as the sole typographic engine, bridging contemporary geometric clarity with humanist warmth. 

Line heights remain deliberately spacious (1.6x–1.65x for body text) to reinforce an unhurried, editorial reading experience. English headlines use negative tracking for a crisp, punchy presentation, while uppercase badges and labels utilize expanded letter spacing (+0.04em to +0.06em) for instant scannability. For bilingual deployments (English and Devanagari Hindi), font line heights and vertical centering in buttons and badges must retain a 2px padding buffer to accommodate Hindi ascenders and descenders seamlessly.

## Layout & Spacing
The layout adheres to a 12-column responsive fluid grid bounded at a maximum container width of `1280px` for optimal long-form editorial legibility.

- **Desktop (>=1024px):** 12 columns, `1.5rem` (24px) gutters, `3rem` (48px) canvas margins. Complex product comparison tables and multi-card discoveries use full 12-column spans or 3-column triplets.
- **Tablet (768px - 1023px):** 8 columns, `1.25rem` (20px) gutters, `2rem` (32px) margins. Grids reflow from 3–4 items per row down to 2 items per row.
- **Mobile (<768px):** 4 columns, `1rem` (16px) gutters, `1.25rem` (20px) outer margins. Horizontal scroll strips with edge bleed are permitted for category filter pills and quick metric chips.

Section blocks maintain an expansive vertical rhythm, separated by `space-xl` (56px) on mobile and doubled (`7rem`) on desktop screens to preserve an open, serene cadence.

## Elevation & Depth
Depth is achieved through **Tonal Layering** paired with ultra-diffuse, natural shadows:

- **Level 0 (Canvas):** Warm ivory (`#FAF8F2`) flat plane with zero elevation.
- **Level 1 (Cards & Surface Panels):** Pure white (`#FFFFFF`) with a 1px border (`#E2E8DF`) and a botanical-tinted ambient drop shadow: `0 4px 20px -2px rgba(22, 71, 52, 0.04), 0 2px 6px -1px rgba(22, 71, 52, 0.02)`.
- **Level 2 (Hovered Cards & Dropdowns):** Subtle upward displacement (-2px) accompanied by an expanded shadow: `0 12px 32px -4px rgba(22, 71, 52, 0.08), 0 4px 12px -2px rgba(22, 71, 52, 0.03)`.
- **Level 3 (Modals & Sticky Headers):** Pure white or frosted warm ivory (`#FAF8F2` with 85% opacity and 12px backdrop-blur), anchored by `0 20px 40px -8px rgba(37, 49, 43, 0.12)`.

Elevations never rely on heavy black drop-shadows; all shadow hues are tinted with the deep forest tone to keep the visual field organic.

## Shapes
The design uses generous, organic roundness that harmonizes with botanical curvature without slipping into playful immaturity. Standard surfaces, containers, and product cards utilize `rounded-2xl` (`1rem` / 16px). Interactive controls such as category filters, language switches, verified fact badges, and pill buttons use full circular pills (`9999px`) to create clear tactile contrast against rectangular content cards.

## Components

### Buttons & Interactive Controls
- **Primary CTA:** Background `#164734`, text `#FFFFFF`, rounded pill (`rounded-full`), padded `0.75rem 1.75rem`. Hover triggers `#37805C` with smooth 200ms ease.
- **Secondary / Ghost Button:** Transparent background, 1.5px border `#164734`, text `#164734`, rounded pill. Hover triggers background `#E8EEE5`.
- **Language Switcher (Bilingual English/Hindi):** Segmented pill container in `#E8EEE5` with 4px padding. The active language uses a pure white pill (`#FFFFFF`) with an ambient shadow, displaying bold typography (`label-md`). Inactive items use `#70796F`.

### Badges & Category Filter Pills
- **Category Filter Pills:** Inactive state features `#FFFFFF` surface with a 1px `#E2E8DF` border and `#25312B` text. Active state fills with `#164734` text `#FFFFFF`.
- **Verified Fact Badges:** Compact pill badge with 1px border. Background `#FAF8F2`, text `#164734`, left-aligned mini checkmark icon in `#37805C`.
- **Certification / Gold Badges:** Background `#FAF8F2`, text `#967432`, border 1px solid `#C7A566` at 30% opacity.

### Cards & Discovery Surfaces
- **Product & Educational Cards:** Built on pure white (`#FFFFFF`) with `rounded-2xl` (16px), 1px stroke in `#E2E8DF`, and Level 1 soft botanical elevation. Internal content uses `space-md` (20px) to `space-lg` (32px) padding. Botanical images sit within a muted sage frame (`#E8EEE5`) with rounded corners inset by 8px from card boundaries.

### Comparison Tables
- **Structure:** Clean minimal row-based grid on `#FFFFFF` with outer `rounded-2xl` wrapping. Header row is filled with `#E8EEE5` using `label-md` tracking.
- **Dividers:** 1px horizontal borders in `#E2E8DF`. No vertical grid lines. Alternating hover rows highlight with `#FAF8F2`.
- **Metric Verification:** Green checkmark icons (`#37805C`) and subtle cross markers (`#70796F`).

### Accordion Panels
- **Container:** Borderless flat white cards or nested inside `#E8EEE5` subtle containers.
- **Header:** Clean typographic row (`headline-sm`) with a circular trailing toggle icon (`#37805C`) that rotates 45 degrees upon expansion.
- **Body:** Generous top padding (`space-sm`), rendered in `body-md` text with `#25312B`.

### Form Inputs & Checkboxes
- **Input Fields:** Crisp white background, 1px `#E2E8DF` border, `rounded-xl` (12px), text `#25312B`. Focus state transitions border to `#37805C` with an outer soft halo (`0 0 0 3px rgba(55, 128, 92, 0.15)`).
- **Checkboxes & Radios:** 20px size, rounded-md (4px) or rounded-full. Checked state fills with `#164734` featuring a crisp white vector icon.