# Design System Specification: Editorial Academic Excellence

## 1. Overview & Creative North Star

### Creative North Star: "The Digital Curator"
This design system rejects the "boxed-in" aesthetic of traditional Learning Management Systems. Instead of a rigid grid of outlines and borders, we embrace the philosophy of **The Digital Curator**. This approach treats educational content like a high-end editorial publication—prioritizing white space, sophisticated tonal shifts, and a clear hierarchy that guides the learner’s eye through complex information with ease and authority.

To move beyond the generic "blue-and-white" LMS template, we utilize **intentional asymmetry**. Hero sections might feature overlapping text elements, and dashboard modules use varying surface elevations rather than strict linear alignment. This creates a rhythmic, bespoke feel that communicates prestige and trustworthiness.

---

## 2. Colors

The palette is derived from a deep navy base, complemented by silver-grey accents and high-contrast whites.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are strictly prohibited for sectioning or grouping. Layout boundaries must be defined solely through:
1. **Background Color Shifts:** (e.g., a `surface-container-low` section sitting on a `surface` background).
2. **Subtle Tonal Transitions:** Using depth to separate the sidebar from the main content.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers, like stacked sheets of fine vellum. 
- **Base Layer:** `surface` (#f7f9fc)
- **Content Zones:** `surface-container` (#eceef1)
- **Elevated Interactive Cards:** `surface-container-lowest` (#ffffff)
- **Active Navigation Elements:** `surface-container-highest` (#e0e3e6)

### The "Glass & Gradient" Rule
To evoke the professional polish of the source logo, use **Glassmorphism** for floating overlays (e.g., course progress modals). Apply `surface` colors at 80% opacity with a `20px` backdrop-blur. 
Main CTAs should utilize a subtle **Signature Texture**: a linear gradient from `primary` (#00020e) to `primary-container` (#0d1b3e) at 135 degrees.

---

## 3. Typography

The system uses a dual-typeface strategy to balance academic authority with modern readability.

*   **Display & Headlines (Manrope):** A geometric sans-serif chosen for its modern, tech-forward personality. Large scales (3.5rem - 2rem) should be used with tight letter-spacing (-0.02em) to create a commanding presence.
*   **Body & Titles (Inter):** The industry standard for legibility. Inter handles the heavy lifting of course content, ensuring that even long-form educational text remains readable at smaller scales.

**Editorial Tip:** Use `display-lg` for welcome states and `headline-sm` for module titles. Never center-align more than three lines of text; maintain a strong left-aligned axis to reinforce the "Editorial" look.

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than structural lines.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, natural lift that mimics physical paper without the clutter of shadows.
*   **Ambient Shadows:** For floating elements like dropdowns, use "Ambient Shadows."
    *   *Blur:* 32px
    *   *Opacity:* 6% 
    *   *Color:* Tinted with `on-surface` (#191c1e) to ensure the shadow feels like part of the environment, not a "grey glow."
*   **The "Ghost Border" Fallback:** If a container absolutely requires a boundary (e.g., an input field), use the `outline-variant` (#c6c6cf) at **15% opacity**. 100% opaque borders are forbidden.

---

## 5. Components

### Buttons
*   **Primary:** `primary` background with the "Signature Texture" gradient. `roundedness.md` (0.375rem).
*   **Secondary:** `secondary-container` background with `on-secondary-container` text. No border.
*   **Tertiary:** Text-only with `on-surface` color. Bold weight.

### Cards & Lists
*   **Rule:** Forbid divider lines. 
*   **Execution:** Use `24px` vertical white space to separate list items. For cards, use a transition from `surface-container-low` to `surface-container-lowest` on hover to indicate interactivity.

### Learning Progress Chips
*   **Action Chips:** Use `secondary-fixed` for a silver metallic feel.
*   **Status:** Use `error-container` for overdue tasks, but keep the text `on-error-container` for high-legibility "Trustworthy" messaging.

### Input Fields
*   **Style:** `surface-container-highest` background, no border, `roundedness.sm`. 
*   **Focus State:** A 2px "Ghost Border" using `primary` at 40% opacity.

### Navigation (LMS Specific)
*   **Sidebar:** Use `primary-container` (#0d1b3e) for a deep, immersive focus mode.
*   **Course Progress Bar:** A thin, high-contrast line using the `primary` blue against a `secondary-fixed` track.

---

## 6. Do's and Don'ts

### Do
*   **DO** use whitespace as a functional tool. If a screen feels cluttered, increase the padding between containers rather than adding a divider.
*   **DO** use `display-md` for high-impact numbers (e.g., "98% Course Completion").
*   **DO** use the `lg` (0.5rem) roundedness for large course thumbnails to soften the tech-heavy navy palette.

### Don't
*   **DON'T** use pure black (#000000). Use `primary` (#00020e) for the deepest tones to maintain the navy brand soul.
*   **DON'T** use 1px lines to separate sidebar items. Use a background color shift or a change in text weight.
*   **DON'T** use "Standard" drop shadows. If it looks like a default CSS shadow, it is too heavy. Use the Ambient Shadow specification.