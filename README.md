# Math Canvas

A design, photo and video editor in one HTML file. It uses real maths on your real photos and videos, and it shows you the equations behind every look.

**Try it:** open `index.html` in a modern browser, or visit the site this repo publishes.

## What it does

- Edit photos and videos with tools made for social posts: text, stickers, shapes, keyframes, doodles, voiceover and captions you type.
- Every effect is a formula you can read. Open the **Check** tab to see the equations and a quality test (resolution, sharpness, noise, exposure, colour, text contrast).
- Colour maths is done in linear light. Photos shrink with Lanczos resampling. Videos export frame by frame. "Measure export error" compares the preview with the export and shows the number.
- Graphs and calculus: curves, surfaces, curves F(x, y) = 0 and vector fields.
- Manga looks and realistic scenes, drawn from equations.
- Projects save in your browser. "Save file" makes a ZIP you can move to another device.

## What it is not

- It does not use AI to make photos or video. The scenes and manga looks are drawn from equations, so they are stylised, not photographs.
- No tool can promise a "perfect" result. This one measures and shows where a problem is.
- MP4 export has not been tested on every browser. If it fails, it falls back to real-time recording (WebM).

## Run and change it

There is nothing to install. `index.html` is the whole app: HTML, CSS and JavaScript in one file.

1. Fork this repo and clone your fork.
2. Edit `index.html`.
3. Open it in a browser to test. A simple local server also works: `python3 -m http.server`.

## Contribute

Anyone can propose changes. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

MIT. See [LICENSE](LICENSE). Bundled libraries are listed in [THIRD-PARTY.md](THIRD-PARTY.md).

## What's new

- **Math3D workspaces**: one tab bar (Design, Photo Lab, Video Lab, Calibration, 3D Lab, Constants). The 3D Lab builds parametric surfaces from real equations with live area, volume, matrices, animation and MP4/WebM export. The Photo and Video Lab measure with honest uncertainty, rectangle tool, saturation and sharpness, vanishing-point perspective analysis and a video frame strip. A measured distance can become a 3D sphere, and a 3D view can be sent back to measure. A first-run guide explains the three steps.
- **Real-world constants**: 27 constants (NIST CODATA 2022 or exact), usable by name in equations (`phi`, `alpha`, `cLight`, `gGrav`), with consistency checks that rebuild constants from each other, a golden nautilus and golden torus, a golden-angle sunflower and Bohr-model numbers.
- **Equation explorer**: implicit surfaces, differential equations, field lines, fractals, crystals, molecules, polyhedra and 4D shapes from your own equations or 42 ready-made models, with section planes, materials, OBJ/STL/GLB/SVG export and a science report. See below.
- **Measurement Lab**: distance, angle, area and circle tools, real units only from a flat reference with 95% intervals, perspective flattening, video point tracking, checkerboard camera calibration, 3D math lab with an error dashboard. See below.
- **Realism check**: upload a photo and the page measures it in linear light (exposure, black and white points, colour balance, saturation, sharpening halos, lens falloff), shows the equations and numbers, and offers one-tap fixes.
- **Paint it from a real formula**: repaints a photo as a sum of cosine waves (a 2-D discrete cosine transform) and prints the formula, with the largest measured coefficients and the error in dB, under the picture.
- **Show the math under the picture**: puts the photo on top and its equations in a panel below, exported with the picture.
- **Phone editor layout**: full-screen dark editor with a fixed centre playhead, a bottom tool row and tabs, and a keyboard tool bar for text.
- Frame-perfect video, linear-light colour maths, full-resolution Lanczos export, project files, ZIP export, multi-variable graphs and more scenes.

## Equation explorer (universal generators)

Open the **Add** tab, then **Equation explorer**. Type an equation or choose a ready-made model; every model says how it is made: **Exact**, **Numerical**, **Procedural** or **Artistic**.

**Implemented and tested** (`node tests/gen3d.test.js`, `node tests/gen-catalog.test.js`)
- Implicit surfaces F(x, y, z) = level by marching tetrahedra, with grid-refinement convergence, Euler characteristic, area, volume and warnings when the surface is cut by the box (sphere area and volume within 2% of exact; double torus gives chi = -2).
- Differential equations: classical Runge-Kutta 4 for 3D and 6D systems (Lorenz, Rossler, Kepler), observed order of accuracy, conserved-quantity drift, a flag for the time after which a chaotic path can no longer be trusted, blow-up detection.
- 3D vector-field lines (dipole, wire, ABC flow), L-systems, iterated function systems with exact similarity dimension, parametric curves with Richardson-extrapolated length, crystal lattices (packing fractions checked against textbook values), molecules from reference geometry (bond lengths and angles checked), the five Platonic solids (area, volume and V - E + F checked against closed forms), 4D polytopes with exact rotation and projection, procedural terrain, planet and galaxy.
- Safe expression parser only; nothing typed is executed as JavaScript. Extra functions: noise, noise3, fbm, erf, gauss.
- Orthographic and perspective cameras, section plane with cross-section area, floor grid, planar shadow, simulated Blinn-Phong materials, procedural textures, colour maps and contour bands, transparent view.
- Export: OBJ, binary STL (with a watertight warning), GLB, SVG snapshot, model JSON (reopenable), HTML science report with equations, methods, accuracy checks, parameter sensitivity and limits.
- A "describe what you want" box that matches keywords to the catalog and says plainly when something (a car, an animal, a building) cannot be generated reliably from equations.

**Not implemented**: Web Workers (generation runs on the main thread), Three.js/WebGL and true PBR (shadows are a flat planar projection, no ambient occlusion or ray-traced reflections), fluid/finite-element simulation, 3D reconstruction from one photograph, animation file export of the 3D view beyond the existing video export, and anything needing a server.

## Measurement Lab (scientific measurement mode)


Open it with the **Measurement Lab** button in the header. Everything runs in the browser; nothing is uploaded.

**Implemented and tested**
- Photo and video opening, zoom and pan, fit/1:1, crop, exposure/contrast/brightness with a before/after slider, annotated PNG, CSV and JSON measurement export, tracking CSV export, undo/redo/reset.
- Distance, angle, polygon (area and perimeter), circle (3-point or least-squares), with zero-length, collinear and self-crossing checks.
- Real-world units only after you mark a flat reference object of known size (homography). Results are labelled measured / calculated / calibrated / estimated / assumed / unknown / invalid, with 95% intervals from Monte Carlo click-error propagation.
- Unit conversion (mm, cm, m, km, in, ft, yd, mi).
- Four-corner perspective flattening with geometry validation and before/after.
- Point tracking in video: pyramidal Lucas-Kanade with a forward-backward check, lost-track detection with reasons, manual correction, timestamped export.
- Checkerboard camera calibration (Zhang closed form plus Levenberg-Marquardt), sub-pixel corner refinement, RMS and per-photo reprojection error, standard errors, warnings, profiles saved on the device or exported as JSON, and lens-distortion removal for measured points.
- 3D math lab: parametric surfaces with exact formulas only where they apply, mesh convergence study, error dashboard.

**Tests**: `node tests/run.js` (3D maths and photo geometry) and `node tests/meas.test.js` (measurement, tracking, calibration). They use synthetic ground truth (known homographies, known cameras, known motion).

**Limits**: planar measurement only (points off the reference plane read wrong); no 3D reconstruction, relighting, occlusion-aware compositing or multi-view photogrammetry; corner placement for calibration is semi-manual (you mark the four outer corners, the rest are predicted and snapped); no tangential distortion; frame rate may be assumed when the browser cannot measure it; no OpenCV.js (the algorithms are our own, with the same published methods).

## Reality Engine (v32)
Open it with the **Reality Engine** tab. Unit-aware calculator, eight physics models (projectile, collision, pendulum, orbit, waves, heat, special relativity, quantum levels), Monte Carlo input uncertainty, least-squares trajectory fit against observations (including Video Lab tracks), a validation suite, plain-language question parsing, and JSON/CSV/Markdown/PNG export. Results are labelled exact under assumptions, numerical approximation, empirical estimate, or unvalidated prediction.

**Tests**: `node tests/units.test.js`, `node tests/phys.test.js`, `node tests/nlq.test.js`.

**Not implemented**: rigid-body contact, N-body orbits, field solvers, fluids, stress, general relativity, multi-view 3D reconstruction, workers/GPU, Three.js. Fit standard errors cover scatter only, not calibration error.
