/* App: loads lecture files, renders pages and the quiz builder. */
(function () {
  const LECTURES = [];
  window.registerLecture = function (lec) { LECTURES.push(lec); };

  /* ---------- markdown + math helpers ---------- */
  function protectMath(src) {
    const store = [];
    const out = src.replace(/\$\$[\s\S]+?\$\$|\$[^$\n]+?\$/g, m => { store.push(m); return `@@M${store.length - 1}@@`; });
    return { out, restore: s => s.replace(/@@M(\d+)@@/g, (_, i) => store[i]) };
  }
  window.md = function (src) {
    if (!src) return "";
    const { out, restore } = protectMath(src);
    const htmlOut = window.marked ? marked.parse(out) : out.split(/\n{2,}/).map(p => `<p>${p}</p>`).join("");
    return restore(htmlOut);
  };
  window.mdInline = function (src) {
    if (!src) return "";
    const { out, restore } = protectMath(String(src));
    return restore(window.marked ? marked.parseInline(out) : out);
  };
  window.typeset = function (node) {
    if (window.renderMathInElement) {
      renderMathInElement(node, {
        delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
        throwOnError: false,
      });
    }
  };

  /* ---------- loading ---------- */
  function loadScript(src) {
    return new Promise(res => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = res;
      s.onerror = () => { console.error("Could not load", src); res(); };
      document.body.appendChild(s);
    });
  }
  async function loadAll() {
    for (const f of window.LECTURE_FILES || []) await loadScript("lectures/" + f);
    LECTURES.sort((a, b) => (a.number ?? 999) - (b.number ?? 999));
    LECTURES.forEach((l, i) => { if (!l.id) l.id = "lecture-" + (i + 1); });
  }

  /* ---------- utils ---------- */
  const app = document.getElementById("app");
  function h(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  const lecLabel = l => (l.number != null ? `Lecture ${l.number}` : "Lecture");
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  /* ---------- pages ---------- */
  function home() {
    document.title = "Macroeconomics – Lecture Companion";
    app.innerHTML = "";
    app.append(h("h1", null, "Macroeconomics lectures"));
    const intro = h("p", "muted", "Walkthroughs, interactive graphs and practice questions for each lecture. Use the quiz builder to mix questions from several lectures.");
    app.append(intro);
    if (!LECTURES.length) {
      app.append(h("div", "card", "No lectures yet. Add a lecture file to the lectures/ folder and list it in lectures/manifest.js."));
      return;
    }
    const row = h("div", "row"); row.style.margin = "0 0 20px";
    const qb = h("a", "btn", "Build a quiz"); qb.href = "#/quiz";
    row.append(qb);
    app.append(row);
    const grid = h("div", "grid");
    LECTURES.forEach(l => {
      const a = h("a", "card lec-card"); a.href = "#/lecture/" + l.id;
      a.append(h("div", "lec-num", lecLabel(l) + (l.date ? " · " + l.date : "")));
      a.append(h("h3", null, l.title));
      if (l.summary) a.append(h("div", "muted", l.summary));
      const graphs = (l.sections || []).reduce((n, s) => n + (s.graphs || (s.graph ? [s.graph] : [])).length, 0);
      a.append(h("div", "lec-meta", `${(l.sections || []).length} sections · ${graphs} graphs · ${(l.quiz || []).length} questions`));
      grid.append(a);
    });
    app.append(grid);
  }

  function lecture(id) {
    const l = LECTURES.find(x => x.id === id);
    if (!l) { app.innerHTML = ""; app.append(h("p", null, "Lecture not found."), Object.assign(h("a", null, "Back to lectures"), { href: "#/" })); return; }
    document.title = `${lecLabel(l)}: ${l.title}`;
    app.innerHTML = "";
    app.append(h("div", "lec-num", lecLabel(l) + (l.date ? " · " + l.date : "")));
    app.append(h("h1", null, l.title));
    if (l.summary) app.append(h("p", "muted", l.summary));
    if (l.tags) { const t = h("div"); l.tags.forEach(x => t.append(h("span", "pill", x))); app.append(t); }

    const sections = l.sections || [];
    const toc = h("div", "card toc");
    toc.append(h("b", null, "Contents"));
    const ol = h("ol");
    sections.forEach(s => { const li = h("li"); const a = h("a", null, s.heading); a.href = "#/lecture/" + l.id + "/" + slug(s.heading); li.append(a); ol.append(li); });
    if (l.keyTerms) { const li = h("li"); const a = h("a", null, "Key terms"); a.href = "#/lecture/" + l.id + "/key-terms"; li.append(a); ol.append(li); }
    if (l.quiz && l.quiz.length) { const li = h("li"); const a = h("a", null, "Practice questions"); a.href = "#/lecture/" + l.id + "/practice-questions"; li.append(a); ol.append(li); }
    toc.append(ol);
    app.append(toc);

    sections.forEach(s => {
      const sec = h("section", "section"); sec.id = slug(s.heading);
      sec.append(h("h2", null, s.heading));
      const body = h("div", "body"); body.innerHTML = window.md(s.body || ""); sec.append(body);
      (s.graphs || (s.graph ? [s.graph] : [])).forEach(g => window.renderGraph(sec, g));
      if (s.after) { const b2 = h("div", "body"); b2.innerHTML = window.md(s.after); sec.append(b2); }
      if (s.takeaway) { const c = h("div", "callout"); c.innerHTML = "<b>Takeaway:</b> " + window.mdInline(s.takeaway); sec.append(c); }
      app.append(sec);
    });

    if (l.keyTerms) {
      const sec = h("section", "section keyterms"); sec.id = "key-terms";
      sec.append(h("h2", null, "Key terms"));
      const card = h("div", "card"), dl = h("dl");
      l.keyTerms.forEach(k => { dl.append(h("dt", null, k.term)); const dd = h("dd"); dd.innerHTML = window.mdInline(k.def); dl.append(dd); });
      card.append(dl); sec.append(card); app.append(sec);
    }

    if (l.quiz && l.quiz.length) {
      const sec = h("section", "section"); sec.id = "practice-questions";
      sec.append(h("h2", null, "Practice questions"));
      sec.append(h("p", "muted", "You get feedback as soon as you answer."));
      app.append(sec);
      window.renderQuiz(sec, l.quiz, { mode: "practice" });
    }
    window.typeset(app);
  }

  function builder() {
    document.title = "Quiz builder";
    app.innerHTML = "";
    app.append(h("h1", null, "Quiz builder"));
    app.append(h("p", "muted", "Pick the lectures to include, choose how many questions, and start."));
    const withQ = LECTURES.filter(l => l.quiz && l.quiz.length);
    if (!withQ.length) { app.append(h("div", "card", "No lectures with questions yet.")); return; }

    const card = h("div", "card");
    const list = h("div", "builder-list");
    const boxes = withQ.map(l => {
      const lab = h("label");
      const cb = document.createElement("input"); cb.type = "checkbox"; cb.checked = true;
      lab.append(cb, h("span", null, `${lecLabel(l)}: ${l.title}`), h("span", "count", `${l.quiz.length} questions`));
      list.append(lab);
      return { l, cb };
    });
    const allRow = h("div", "row"); allRow.style.marginBottom = "8px";
    const all = h("button", "ghost", "Select all"), none = h("button", "ghost", "Clear");
    all.onclick = () => { boxes.forEach(b => b.cb.checked = true); upd(); };
    none.onclick = () => { boxes.forEach(b => b.cb.checked = false); upd(); };
    allRow.append(all, none);
    card.append(allRow, list);

    const opts = h("div", "row opts-row"); opts.style.marginTop = "16px";
    const nLab = h("label", null, "Questions: ");
    const n = document.createElement("input"); Object.assign(n, { type: "number", min: 1, value: 10, className: "num-input" }); n.style.width = "90px";
    nLab.append(n);
    const avail = h("span", "muted");
    const modeSel = document.createElement("select"); modeSel.className = "num-input"; modeSel.style.width = "auto";
    modeSel.innerHTML = `<option value="exam">Exam mode – score at the end</option><option value="practice">Practice mode – feedback per question</option>`;
    const balLab = h("label");
    const bal = document.createElement("input"); bal.type = "checkbox"; bal.checked = true;
    balLab.append(bal, document.createTextNode(" Spread evenly across lectures"));
    opts.append(nLab, avail, modeSel, balLab);
    card.append(opts);

    const go = h("button", null, "Start quiz"); go.style.marginTop = "16px";
    card.append(go);
    app.append(card);
    const out = h("div"); out.style.marginTop = "24px";
    app.append(out);

    function upd() {
      const total = boxes.filter(b => b.cb.checked).reduce((s, b) => s + b.l.quiz.length, 0);
      avail.textContent = `(${total} available)`;
      go.disabled = total === 0;
    }
    boxes.forEach(b => b.cb.addEventListener("change", upd));
    upd();

    go.onclick = () => {
      const chosen = boxes.filter(b => b.cb.checked).map(b => b.l);
      const pools = chosen.map(l => shuffle(l.quiz.map(q => ({ ...q, _source: `${lecLabel(l)}: ${l.title}` }))));
      const total = pools.reduce((s, p) => s + p.length, 0);
      const want = Math.max(1, Math.min(+n.value || 10, total));
      let picked = [];
      if (bal.checked) {
        // round-robin so each lecture is represented as evenly as possible
        const idx = pools.map(() => 0);
        while (picked.length < want) {
          for (let i = 0; i < pools.length && picked.length < want; i++) {
            if (idx[i] < pools[i].length) picked.push(pools[i][idx[i]++]);
          }
        }
      } else picked = shuffle(pools.flat()).slice(0, want);
      picked = shuffle(picked);
      out.innerHTML = "";
      const head = h("div", "row");
      head.append(h("h2", null, `Your quiz (${picked.length} questions)`));
      head.querySelector("h2").style.margin = "0";
      const again = h("button", "ghost", "New quiz with same settings"); again.onclick = go.onclick;
      head.append(again);
      out.append(head);
      window.renderQuiz(out, picked, { mode: modeSel.value, showSource: true });
      out.scrollIntoView({ behavior: "smooth" });
    };
  }

  /* ---------- router ---------- */
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    if (parts[0] === "lecture" && parts[1]) {
      const sameLecture = app.dataset.lec === parts[1];
      if (!sameLecture) { lecture(parts[1]); app.dataset.lec = parts[1]; }
      const target = parts[2] && document.getElementById(parts[2]);
      if (target) target.scrollIntoView({ behavior: sameLecture ? "smooth" : "auto" });
      else if (!sameLecture) window.scrollTo(0, 0);
      return;
    }
    app.dataset.lec = "";
    if (parts[0] === "quiz") builder(); else home();
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  window.addEventListener("load", async () => { await loadAll(); route(); });
})();
