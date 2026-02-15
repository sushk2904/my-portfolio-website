# Portfolio Refactor Walkthrough

I have successfully transformed the **CraveLogic** website into a premium **AI Systems Engineer** portfolio for **Sushant Kumar**.

## Key Changes

### 1. Visual Theme (Luxury Dark Mode)
-   **Deep Black Background**: Switched to `#0a0a0a` for a high-end, cinematic feel.
-   **Typography**: Clean `Inter` font with high readability.
-   **Palette**: Monochrome with subtle metallic blue accents (`#94a3b8`).

### 2. Hero Section
-   **Cinematic Background**: Utilized the `portfolio_animation` image sequence as a scroll-controlled background.
-   **Minimal Overlay**: Centered text with "Sushant Kumar" and title, featuring smooth entry animations.

### 3. Tech Stack
-   **Grid Layout**: A comprehensive list of engineering skills (Python, PyTorch, Docker, etc.).
-   **Monochrome Icons**: Minimalist, engraved style that reveals color on hover.

### 4. Projects Section
-   **System Cards**: Structured cards highlighting "Distributed Inference Engine", "Autonomous Agent Framework", and "Real-time Vision Pipeline".
-   **Impact Focused**: emphasized technical outcomes (e.g., "Reduced latency by 40%").

### 5. Technical Improvements
-   **Smooth Scrolling**: Maintained `lenis` smooth scroll.
-   **Responsive**: Optimized for mobile and desktop.
-   **Performance**: Lightweight assets and efficient rendering.

## Files Updated
-   `app/globals.css`: New theme variables.
-   `app/page.tsx`: New page structure.
-   `app/components/HeroSection.tsx`: New hero component.
-   `app/components/TechStack.tsx`: New skills component.
-   `app/components/Projects.tsx`: New projects component.
-   `app/components/StickyNavbar.tsx`: Updated branding.
-   `app/components/ImageSequence.tsx`: Added support for 5-digit filing naming.

## Next Steps
-   **Verify Animation**: Ensure the `portfolio_animation` sequence aligns correctly with the scroll height.
-   **Content**: Replace placeholder project links with actual case studies.
