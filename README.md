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

- **Measurement Lab**: distance, angle, area and circle tools, real units only from a flat reference with 95% intervals, perspective flattening, video point tracking, checkerboard camera calibration, 3D math lab with an error dashboard. See below.
- **Realism check**: upload a photo and the page measures it in linear light (exposure, black and white points, colour balance, saturation, sharpening halos, lens falloff), shows the equations and numbers, and offers one-tap fixes.
- **Paint it from a real formula**: repaints a photo as a sum of cosine waves (a 2-D discrete cosine transform) and prints the formula, with the largest measured coefficients and the error in dB, under the picture.
- **Show the math under the picture**: puts the photo on top and its equations in a panel below, exported with the picture.
- **Phone editor layout**: full-screen dark editor with a fixed centre playhead, a bottom tool row and tabs, and a keyboard tool bar for text.
- Frame-perfect video, linear-light colour maths, full-resolution Lanczos export, project files, ZIP export, multi-variable graphs and more scenes.

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
