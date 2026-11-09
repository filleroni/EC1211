# Macroeconomics Lecture Companion

A static website for lecture walkthroughs, interactive graphs and quizzes. It runs on GitHub Pages and needs no server or build step.

## Publish on GitHub Pages (one time)

1. Sign in at github.com → **New repository** (e.g. `macro-lectures`), set it to **Public**, and create it.
2. On the new repo page, click **uploading an existing file**. Drag in **everything inside** the unzipped folder (`index.html`, `README.md`, `.nojekyll`, and the `assets` and `lectures` folders), then click **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, then select branch **main** and folder **/ (root)**. Click **Save**.
4. After a minute or two the site is live at `https://<your-username>.github.io/macro-lectures/`.

(Private repos can use Pages only on paid GitHub plans.)

## Adding a lecture

1. Put the lecture file (e.g. `lecture-03.js`) in the `lectures/` folder (on GitHub: open the folder → **Add file → Upload files**).
2. Add its file name to `lectures/manifest.js`:
   ```js
   window.LECTURE_FILES = [
     "lecture-01.js",
     "lecture-02.js",
     "lecture-03.js",
   ];
   ```
3. Commit. The site updates within a minute or so.

The lecture appears on the home page, and its questions become available in the quiz builder automatically.

## Lecture file format

See `lectures/kapitel-02.js` for a full example. Outline:

```js
registerLecture({
  id: "lecture-03",          // used in the URL
  number: 3,                 // ordering
  title: "…", date: "…", summary: "…", tags: ["…"],
  sections: [
    { heading: "…", body: "Markdown text with $math$", graphs: [ /* graph specs */ ], takeaway: "…" },
  ],
  keyTerms: [ { term: "…", def: "…" } ],
  quiz: [
    { q: "…", options: ["…", "…", "…", "…"], answer: 0, explain: "…", topic: "…" },
    { q: "…", type: "numeric", answer: 5, tolerance: 0.01, explain: "…" },
  ],
});
```

### Graphs

- `type: "curves"` draws an economic diagram. Each curve is a formula in `x` and slider parameters (`fn`), or a vertical line (`xAt`). `points` marks intersections, `ghost: true` keeps the starting position as a dashed line, and `readout` shows live values.
- `type: "series"` draws a line chart from data points (`bars: true` gives a bar chart).

## Previewing locally

Open `index.html` in a browser. Formulas render only with an internet connection.
