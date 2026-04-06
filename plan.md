# 3D Portfolio SPA Plan

## Summary
Build a GitHub Pages-friendly single-page portfolio using `Vite + React + TypeScript + three.js + @react-three/fiber`, with a solar-system carousel as the main interaction model. The experience should feel cinematic but still work well on mobile and for users who prefer reduced motion, with project content driven from a local typed config so the site can be updated without touching scene logic.

## Implementation Changes
### App architecture
- Scaffold a Vite React TypeScript app configured for GitHub Pages deployment under the profile site domain.
- Use a single-page layout with two coordinated layers:
  - A fullscreen R3F canvas for the 3D solar-system scene.
  - A DOM overlay for selected-project details, project links, loading/error states, and accessible fallback controls.
- Keep content in one typed local source of truth containing:
  - site owner label (`Paul Williams`)
  - three project entries with id, title, URL, description, planet styling metadata
  - optional resume asset path and availability flag
- Add a small app state layer to manage selected planet, camera/rotation transitions, hover state, and resume availability.

### 3D scene design
- Create a central emissive sun that also functions as a clickable resume trigger.
- Arrange three orbiting planets on a carousel-like orbital path rather than a physics simulation, so selection is deterministic and easy to tune.
- When a planet is selected:
  - animate it to the visual front/center position
  - de-emphasize non-selected planets
  - synchronize the overlay panel with that project’s description and external link
- Add readable text labels for the sun and planets using a stable text-rendering approach that remains legible across screen sizes.
- Build a stylized starfield backdrop with subtle twinkle and color variation, but cap particle counts and effect complexity to protect mobile performance.
- Use lighting, fog/color grading, and motion easing to create atmosphere without making the scene hard to read.

### Interaction and accessibility
- Support pointer interactions for hover/select on planets and sun.
- Provide keyboard-accessible non-canvas controls that mirror project selection and expose the same links/content.
- Respect reduced-motion preferences by shortening or simplifying orbital/camera animation.
- On smaller screens, keep the scene but simplify camera framing and overlay layout so labels and content remain readable.
- If the resume file is not yet present, keep the sun interactive state visually clear and route clicks to a graceful placeholder behavior rather than a broken link.

### Deployment and maintainability
- Configure SPA hosting and asset paths so the site can deploy cleanly to `williapa.github.io`.
- Keep scene tuning values centralized so future changes to orbital radius, animation timing, label offsets, and color themes do not require large code edits.
- Separate responsibilities into a few clear modules:
  - content/config
  - 3D scene objects and animation
  - UI overlay/accessibility controls
  - deployment/build config

## Public Interfaces / Types
- `PortfolioItem` type: `id`, `title`, `url`, `description`, `theme/visual props`
- `SiteContent` type: owner name, resume metadata, projects list
- Scene/controller props should accept selected item id and callbacks for selection and resume click, keeping the canvas layer independent from content storage details.

## Future Agent Task Breakdown
1. Project scaffold and deploy setup
   - Create the Vite/React/TS app, install R3F/Three dependencies, configure GitHub Pages-safe base paths, and add basic app shell wiring.

2. Content model and app state
   - Define typed local content, selection state, resume availability handling, and shared interfaces used by both the scene and overlay.

3. Core 3D scene
   - Implement the canvas, camera defaults, lighting, sun, orbit paths, and initial planet placement.

4. Selection animation system
   - Add front-and-center selection behavior, orbit rotation logic, camera/easing transitions, and de-emphasis of non-selected planets.

5. Labels and project detail overlay
   - Add in-scene labels plus the DOM detail panel with project description, external links, and responsive layout behavior.

6. Accessibility and fallback controls
   - Add keyboard/project list controls, reduced-motion behavior, focus handling, and graceful non-3D interaction parity.

7. Visual polish and performance tuning
   - Build the starfield/twinkle background, tune materials/colors/motion, and profile for mobile-friendly performance.

8. Resume integration
   - Wire the sun click target to the hosted resume asset, including placeholder behavior until the file is added.

9. QA and deployment hardening
   - Validate build output, route/base-path correctness, interaction behavior across viewport sizes, and final GitHub Pages publish readiness.

## Test Plan
- Verify initial load shows the sun, three planets, labels, and a visible default selected project state.
- Verify clicking each planet rotates it into the primary position and updates the description/link panel correctly.
- Verify clicking the sun opens the resume when present and uses a non-broken fallback when absent.
- Verify external project links open the intended destinations.
- Verify keyboard navigation can change the selected project and trigger the same content updates as pointer input.
- Verify reduced-motion preference produces simplified transitions without breaking layout or selection logic.
- Verify mobile and narrow-screen layouts keep labels/content usable and avoid severe frame drops.
- Verify production build and GitHub Pages base-path behavior load assets correctly from the intended profile site URL.

## Assumptions
- Default stack: `Vite + React + TypeScript`.
- Content stays in a local typed config for v1 rather than a CMS or remote fetch.
- Balanced experience is the target: strong visuals, but not at the expense of basic accessibility and device coverage.
- Resume file is not yet available, so the implementation should include a placeholder-ready integration path rather than blocking on the asset.
- The site is a true SPA with one primary screen, not a multi-route portfolio.
