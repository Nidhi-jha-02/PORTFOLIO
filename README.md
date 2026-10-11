# 🖥️ COA Academic Portfolio (Computer Organization & Architecture)

An academic portfolio website built with **React**, **Vite**, **Tailwind CSS v4**, and **GSAP Motion**, inspired by the signature high-contrast editorial and cinematic Netflix design system, adapted into a clean **Light Theme**.

---

## 🌟 Portfolio Sections Overview

1. **Home (`#home`)**: 
   - Displays student name, photograph, roll number, branch, semester, COA course code, and introduction.
   - Interactive 3D holographic tilt poster card with realistic specular glare.
   - Quick action buttons: **Explore Projects**, **View CV**, and **COA Tool**.

2. **About Me (`#about`)**: 
   - Student academic origin, core academic interests, and future career goals.
   - Interactive Bento Grid layout with real-time mouse hover spotlights.
   - Highlighting key architectural domains: Instruction Set Architecture (ISA), CPU Pipelining, Cache Mapping, and Memory Subsystems.

3. **My CV (`#cv`)**:
   - Dedicated Curriculum Vitae overview card with verified status badge.
   - **View Resume** button: opens an interactive in-browser preview modal.
   - **Download Resume** button: downloads formatted curriculum vitae file.

4. **COA Learning Tool (`#converter`)**:
   - Live 4-way bidirectional number system converter for **Decimal (Base 10)**, **Binary (Base 2)**, **Octal (Base 8)**, and **Hexadecimal (Base 16)**.
   - 8-bit register bit viewer with MSB/LSB labels and nibble decomposition.
   - 2's Complement signed calculation and ASCII character lookup.
   - One-click copy-to-clipboard for every radix format.

5. **Assignments (`#assignments`)**:
   - Interactive 3D stacked sticky cards powered by GSAP ScrollTrigger.
   - Assignment 01: Computer Arithmetic & ALU Architecture (Booth's Algorithm).
   - Assignment 02: ISA & Addressing Modes (MIPS & x86 formats).
   - Assignment 03: Cache Memory Hierarchy & Set-Associative Mapping.
   - Assignment 04: 5-Stage Pipelining, Hazard Resolution & Control Units.
   - Buttons to view problem details and download lab report submissions.

6. **Projects and GitHub (`#projects`)**:
   - Authentic 3D opening folder archive with animated card spread physics.
   - Emulation projects: 8-Bit CPU Simulator, Cache Visualizer, Pipeline Hazard Detector, Virtual Memory Simulator, etc.
   - Direct links to GitHub repositories for each project.

7. **Achievements (`#achievements`)**:
   - 3D curved cylinder arc carousel showcasing certificates, hackathon rankings, workshops, and peer mentorship.
   - Desktop GSAP Scrub & mobile swipe-and-snap carousel.

8. **Contact & Footer (`#contact`)**:
   - Academic contact inquiry form with interactive validation.
   - Fast links and social profile handles.

---

## 🛠️ How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## ✏️ Customizing Your Details (Placeholders)

Search and replace the following placeholders in `src/components/`:
- `[Your Name]` &rarr; Your full name
- `[Roll Number]` &rarr; Your university registration / roll number
- `[Branch]` &rarr; Your engineering branch (e.g., Computer Science & Engineering)
- `[Semester]` &rarr; Current semester (e.g., 4th Semester)
- `[COA Subject Code]` &rarr; Course code (e.g., CS-204 / PCC-CS301)
- `[Your College / University Name]` &rarr; Your university or college name
- `[Your-Username]` &rarr; Your GitHub username
- Photograph: Replace `src/assets/Portfolio/picture.png` with your portrait photo!
