/* Interactive graph engine.
 *
 * Two graph types are supported in lecture files:
 *
 * 1. type: "curves"  – economic diagrams with sliders (IS-LM, AD-AS, supply/demand, Solow …)
 *    {
 *      type: "curves", title, xLabel, yLabel, x: [min, max], y: [min, max],
 *      params: { G: { label: "Government spending", min: 0, max: 100, step: 1, value: 40 } },
 *      curves: [
 *        { label: "IS", fn: "(A + G - b*x)/c", ghost: true },   // y as a function of x (and params)
 *        { label: "LRAS", xAt: "Yn" }                            // vertical line at x = value
 *      ],
 *      points: [ { between: ["IS", "LM"], label: "E" } ],        // equilibrium markers
 *      readout: "Y* = {E.x}, r* = {E.y}",                         // optional live text
 *      caption: "…"
 *    }
 *    Expressions are plain JavaScript; Math functions (pow, sqrt, log, exp …) can be used directly.
 *    ghost: true draws the curve at the starting slider values as a dashed line, to show shifts.
 *
 * 2. type: "series" – data/line charts.
 *    { type: "series", title, xLabel, yLabel, series: [ { label, data: [[x, y], …] } ], bars: false }
 */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const COLORS = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)", "var(--c5)"];
  const W = 640, H = 400, M = { l: 62, r: 24, t: 18, b: 52 };

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function html(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function niceTicks(min, max, n = 6) {
    const span = max - min;
    if (!(span > 0)) return [min];
    const step0 = span / n, mag = Math.pow(10, Math.floor(Math.log10(step0)));
    const norm = step0 / mag;
    const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
    const out = [];
    for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) out.push(+v.toFixed(10));
    return out;
  }
  function fmt(v) {
    if (!isFinite(v)) return "–";
    const a = Math.abs(v);
    return a >= 1000 ? v.toFixed(0) : a >= 10 ? v.toFixed(1) : v.toFixed(2);
  }
  function compile(expr, names) {
    try {
      // non-strict so `with(Math)` lets authors write pow(), sqrt(), exp() …
      return new Function(...names, "x", "with (Math) { return (" + expr + "); }");
    } catch (e) {
      console.error("Bad expression:", expr, e);
      return () => NaN;
    }
  }

  function frame(svg, spec) {
    const sx = v => M.l + (v - spec.x[0]) / (spec.x[1] - spec.x[0]) * (W - M.l - M.r);
    const sy = v => H - M.b - (v - spec.y[0]) / (spec.y[1] - spec.y[0]) * (H - M.t - M.b);
    const g = el("g", {}, svg);
    if (spec.ticks !== false) {
      niceTicks(spec.x[0], spec.x[1]).forEach(t => {
        el("line", { x1: sx(t), x2: sx(t), y1: M.t, y2: H - M.b, class: "gridline" }, g);
        el("text", { x: sx(t), y: H - M.b + 18, "text-anchor": "middle" }, g).textContent = fmt(t);
      });
      niceTicks(spec.y[0], spec.y[1]).forEach(t => {
        el("line", { x1: M.l, x2: W - M.r, y1: sy(t), y2: sy(t), class: "gridline" }, g);
        el("text", { x: M.l - 8, y: sy(t) + 4, "text-anchor": "end" }, g).textContent = fmt(t);
      });
    }
    el("line", { x1: M.l, x2: W - M.r, y1: H - M.b, y2: H - M.b, class: "axis" }, g);
    el("line", { x1: M.l, x2: M.l, y1: M.t, y2: H - M.b, class: "axis" }, g);
    el("text", { x: (M.l + W - M.r) / 2, y: H - 10, "text-anchor": "middle", "font-weight": 600 }, g).textContent = spec.xLabel || "";
    el("text", { x: 16, y: (M.t + H - M.b) / 2, "text-anchor": "middle", "font-weight": 600,
      transform: `rotate(-90 16 ${(M.t + H - M.b) / 2})` }, g).textContent = spec.yLabel || "";
    return { sx, sy };
  }

  function clipPath(svg, id) {
    const defs = el("defs", {}, svg);
    const cp = el("clipPath", { id }, defs);
    el("rect", { x: M.l, y: M.t, width: W - M.l - M.r, height: H - M.t - M.b }, cp);
  }

  /* ---------- curves ---------- */
  function renderCurves(root, spec) {
    const params = spec.params || {};
    const names = Object.keys(params);
    const start = {}; names.forEach(n => start[n] = params[n].value);
    const state = { ...start };
    const curves = (spec.curves || []).map((c, i) => ({
      ...c,
      color: c.color || COLORS[i % COLORS.length],
      f: c.fn ? compile(c.fn, names) : null,
      xf: c.xAt != null ? compile(String(c.xAt), names) : null,
    }));
    const byLabel = Object.fromEntries(curves.map(c => [c.label, c]));
    const clipId = "clip" + Math.random().toString(36).slice(2);

    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": spec.title || "graph" });
    root.appendChild(svg);
    const readout = html("div", "graph-readout");

    function vals(p) { return names.map(n => p[n]); }

    function evalAt(c, x, p) { return c.f(...vals(p), x); }

    function intersect(a, b, p) {
      if (a.xf && b.xf) return null;
      if (a.xf || b.xf) {
        const v = a.xf || b.xf, other = a.xf ? b : a;
        const x = v(...vals(p), 0);
        return { x, y: evalAt(other, x, p) };
      }
      const N = 600, [x0, x1] = spec.x;
      const d = x => evalAt(a, x, p) - evalAt(b, x, p);
      let px = x0, pd = d(x0);
      for (let i = 1; i <= N; i++) {
        const x = x0 + (x1 - x0) * i / N, dx = d(x);
        if (isFinite(pd) && isFinite(dx) && (pd === 0 || pd * dx < 0)) {
          let lo = px, hi = x;
          for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; (d(lo) * d(m) <= 0) ? hi = m : lo = m; }
          const xm = (lo + hi) / 2;
          return { x: xm, y: evalAt(a, xm, p) };
        }
        px = x; pd = dx;
      }
      return null;
    }

    function pathFor(c, p, sx, sy) {
      if (c.xf) {
        const x = c.xf(...vals(p), 0);
        return `M${sx(x)},${sy(spec.y[0])}L${sx(x)},${sy(spec.y[1])}`;
      }
      const lo = c.domain ? Math.max(c.domain[0], spec.x[0]) : spec.x[0];
      const hi = c.domain ? Math.min(c.domain[1], spec.x[1]) : spec.x[1];
      let d = "", pen = false;
      const N = 300, span = spec.y[1] - spec.y[0];
      for (let i = 0; i <= N; i++) {
        const x = lo + (hi - lo) * i / N, y = evalAt(c, x, p);
        if (!isFinite(y) || y < spec.y[0] - 3 * span || y > spec.y[1] + 3 * span) { pen = false; continue; }
        d += (pen ? "L" : "M") + sx(x).toFixed(1) + "," + sy(y).toFixed(1);
        pen = true;
      }
      return d;
    }

    function draw() {
      svg.innerHTML = "";
      clipPath(svg, clipId);
      const { sx, sy } = frame(svg, spec);
      const plot = el("g", { "clip-path": `url(#${clipId})` }, svg);
      const changed = names.some(n => state[n] !== start[n]);
      curves.forEach(c => {
        if (c.ghost && changed) {
          el("path", { d: pathFor(c, start, sx, sy), fill: "none", stroke: c.color, "stroke-width": 2,
            "stroke-dasharray": "6 5", opacity: .45 }, plot);
        }
        el("path", { d: pathFor(c, state, sx, sy), fill: "none", stroke: c.color, "stroke-width": 2.6,
          "stroke-dasharray": c.dashed ? "7 5" : "none" }, plot);
        // label near right end (or top for vertical lines)
        let lx, ly;
        if (c.xf) { lx = c.xf(...vals(state), 0); ly = spec.y[1] - (spec.y[1] - spec.y[0]) * .04; }
        else {
          const hi = c.domain ? Math.min(c.domain[1], spec.x[1]) : spec.x[1];
          for (let k = 0; k <= 60; k++) {
            const x = hi - (hi - spec.x[0]) * k / 100, y = evalAt(c, x, state);
            if (isFinite(y) && y >= spec.y[0] && y <= spec.y[1]) { lx = x; ly = y; break; }
          }
        }
        if (lx != null) el("text", { x: Math.min(sx(lx) + 6, W - M.r - 4), y: sy(ly) - 8, fill: c.color,
          "font-weight": 700, "text-anchor": sx(lx) > W - M.r - 40 ? "end" : "start", style: `fill:${c.color}` }, plot).textContent = c.label;
      });
      const found = {};
      (spec.points || []).forEach(pt => {
        const a = byLabel[pt.between[0]], b = byLabel[pt.between[1]];
        if (!a || !b) return;
        if (pt.ghost !== false && changed) {
          const p0 = intersect(a, b, start);
          if (p0) el("circle", { cx: sx(p0.x), cy: sy(p0.y), r: 4.5, fill: "var(--muted)", opacity: .6 }, plot);
        }
        const p = intersect(a, b, state);
        found[pt.label] = p;
        if (!p) return;
        if (pt.guides !== false) {
          el("line", { x1: sx(p.x), x2: sx(p.x), y1: sy(p.y), y2: sy(spec.y[0]), class: "guide" }, plot);
          el("line", { x1: sx(spec.x[0]), x2: sx(p.x), y1: sy(p.y), y2: sy(p.y), class: "guide" }, plot);
        }
        el("circle", { cx: sx(p.x), cy: sy(p.y), r: 6, fill: "var(--ink)", class: "eq-dot" }, plot);
        el("text", { x: sx(p.x) + 9, y: sy(p.y) + 16, "font-weight": 700 }, plot).textContent = pt.label;
      });
      if (spec.readout) {
        readout.textContent = spec.readout.replace(/\{([^}]+)\}/g, (_, key) => {
          const [lab, axis] = key.split(".");
          if (found[lab] && axis) return fmt(found[lab][axis]);
          if (key in state) return fmt(state[key]);
          return "–";
        });
      }
    }

    if (names.length) {
      const ctr = html("div", "controls");
      const inputs = {};
      names.forEach(n => {
        const p = params[n];
        const lab = html("label");
        const top = html("span");
        const name = html("b", null, p.label || n);
        const val = html("span", null, fmt(p.value));
        top.append(name, val);
        const inp = document.createElement("input");
        Object.assign(inp, { type: "range", min: p.min, max: p.max, step: p.step || (p.max - p.min) / 100, value: p.value });
        inp.addEventListener("input", () => { state[n] = +inp.value; val.textContent = fmt(state[n]); draw(); });
        inputs[n] = { inp, val };
        lab.append(top, inp);
        ctr.appendChild(lab);
      });
      const reset = html("button", "ghost btn-reset", "Reset");
      reset.addEventListener("click", () => {
        names.forEach(n => { state[n] = start[n]; inputs[n].inp.value = start[n]; inputs[n].val.textContent = fmt(start[n]); });
        draw();
      });
      const wrap = html("div"); wrap.appendChild(reset);
      ctr.appendChild(wrap);
      root.appendChild(ctr);
    }
    root.appendChild(readout);
    draw();
  }

  /* ---------- series ---------- */
  function renderSeries(root, spec) {
    const all = spec.series.flatMap(s => s.data);
    const xs = all.map(d => d[0]), ys = all.map(d => d[1]);
    const pad = (a, b) => (b - a) * .05 || 1;
    const s = { ...spec };
    s.x = spec.x || [Math.min(...xs) - (spec.bars ? .6 : 0), Math.max(...xs) + (spec.bars ? .6 : 0)];
    s.y = spec.y || [Math.min(0, Math.min(...ys) - pad(Math.min(...ys), Math.max(...ys))), Math.max(...ys) + pad(Math.min(...ys), Math.max(...ys))];
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": spec.title || "chart" });
    root.appendChild(svg);
    const { sx, sy } = frame(svg, s);
    const n = spec.series.length;
    spec.series.forEach((ser, i) => {
      const color = ser.color || COLORS[i % COLORS.length];
      if (spec.bars) {
        const bw = (sx(1) - sx(0)) * .8 / n;
        ser.data.forEach(([x, y]) => {
          const y0 = sy(Math.max(0, s.y[0])), y1 = sy(y);
          el("rect", { x: sx(x) - bw * n / 2 + i * bw, y: Math.min(y0, y1), width: bw - 1, height: Math.abs(y0 - y1),
            style: `fill:${color}`, rx: 2 }, svg);
        });
      } else {
        el("path", { d: ser.data.map((d, k) => (k ? "L" : "M") + sx(d[0]) + "," + sy(d[1])).join(""),
          fill: "none", stroke: color, "stroke-width": 2.4 }, svg);
      }
    });
    if (n > 1 || spec.series[0].label) {
      const lg = html("div", "legend");
      spec.series.forEach((ser, i) => {
        const it = html("span");
        const sw = html("i"); sw.style.background = ser.color || COLORS[i % COLORS.length];
        it.append(sw, document.createTextNode(ser.label || ""));
        lg.appendChild(it);
      });
      root.appendChild(lg);
    }
  }

  window.renderGraph = function (container, spec) {
    const root = html("div", "graph card");
    if (spec.title) root.appendChild(html("div", "graph-title", spec.title));
    container.appendChild(root);
    try {
      if (spec.type === "series") renderSeries(root, spec);
      else renderCurves(root, spec);
    } catch (e) {
      console.error(e);
      root.appendChild(html("p", "muted", "This graph could not be drawn: " + e.message));
    }
    if (spec.caption) {
      const cap = html("div", "graph-caption");
      cap.innerHTML = window.md ? window.md(spec.caption) : spec.caption;
      root.appendChild(cap);
    }
    return root;
  };
})();
