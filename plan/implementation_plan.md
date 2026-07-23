# Implementation Plan - Rebuilding AI4STEM Main Page

Rebuild the main page ([index.html](file:///Users/helmi/Library/CloudStorage/GoogleDrive-cikguhelmi83@gmail.com/My%20Drive/Antigravity/AI4STEM/index.html)) to deliver a premium, high-tech, futuristic experience integrating STEM & AI. We will merge the audio and video modules into a single "AI Multimedia" module (leaving exactly 3 tools) and completely remove the guestbook (Pelawat) form.

## Proposed Changes

### Main Page (index.html)

#### [MODIFY] [index.html](file:///Users/helmi/Library/CloudStorage/GoogleDrive-cikguhelmi83@gmail.com/My%20Drive/Antigravity/AI4STEM/index.html)

1. **Design System & Aesthetics**:
   - Apply a premium dark mode or highly sophisticated deep blue/indigo glassmorphic look.
   - Use Lucide icons (avoid emojis) and implement clean, hoverable Bento Grid modules.
   - Choose premium typography (DM Sans or Outfit) with smooth CSS transitions.

2. **Hero Section Rebuild**:
   - Create a stunning futuristic grid with glowing background blobs.
   - Keep the dynamic typewriter effect pointing to STEM & AI topics.
   - Highlight core metrics (Pendidik Dilatih, Projek Inovasi, Akses Percuma).

3. **STEM Integration Grid (The Teras STEM)**:
   - A beautiful grid explaining the 4 pillars of STEM and how AI enhances each of them (e.g., Physics simulation, Machine Learning, CAD & Design, Computations).

4. **Kotak Peralatan Digital (Three Cards)**:
   - **Card 1: AI Teks** (Generatif) -> pointing to `generatif_ai.html`.
   - **Card 2: AI Visual** -> pointing to `visual_ai.html`.
   - **Card 3: AI Multimedia** (Merged Audio & Video) -> pointing to a page or presenting a choice to access `audio_ai.html` or `video_ai.html`.

5. **Guestbook Removal**:
   - Delete the entire guestbook form section (`#guestbook`) and its scripts.

### Navigation

#### [MODIFY] [nav-component.js](file:///Users/helmi/Library/CloudStorage/GoogleDrive-cikguhelmi83@gmail.com/My%20Drive/Antigravity/AI4STEM/assets/js/nav-component.js)
- Remove the "Pelawat" (Guestbook) button from the header navigation menu since the form has been removed.

## Verification Plan

### Automated Tests
- N/A (this is a static frontend website).

### Manual Verification
- Load `index.html` in the browser.
- Verify the layout is fully responsive at mobile, tablet, and desktop breakpoints.
- Confirm the typewriter script functions correctly.
- Test that the merged "AI Multimedia" card links to the respective pages and that the guestbook form is completely gone.
