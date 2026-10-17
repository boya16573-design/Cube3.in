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

- **Realism check**: upload a photo and the page measures it in linear light (exposure, black and white points, colour balance, saturation, sharpening halos, lens falloff), shows the equations and numbers, and offers one-tap fixes.
- **Paint it from a real formula**: repaints a photo as a sum of cosine waves (a 2-D discrete cosine transform) and prints the formula, with the largest measured coefficients and the error in dB, under the picture.
- **Show the math under the picture**: puts the photo on top and its equations in a panel below, exported with the picture.
- **Phone editor layout**: full-screen dark editor with a fixed centre playhead, a bottom tool row and tabs, and a keyboard tool bar for text.
- Frame-perfect video, linear-light colour maths, full-resolution Lanczos export, project files, ZIP export, multi-variable graphs and more scenes.
