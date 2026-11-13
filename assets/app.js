/* App: loads lecture files, renders pages and the quiz builder. */
(function () {
  const LECTURES = [];
  window.registerLecture = function (lec) { LECTURES.push(lec); };
  const DUGGOR = [];
  window.registerDugga = function (d) { DUGGOR.push(d); };

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
    for (const f of window.LECTURE_FILES || []) await loadScript("lectures/" + f + (window.CACHE_BUST || ""));
    await loadScript("duggor/manifest.js" + (window.CACHE_BUST || ""));
    for (const f of window.DUGGA_FILES || []) await loadScript("duggor/" + f + (window.CACHE_BUST || ""));
    DUGGOR.sort((a, b) => a.number - b.number);
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
  const lecLabel = l => (l.number != null ? `Föreläsning ${l.number}` : "Föreläsning");
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  /* ---------- pages ---------- */
  function home() {
    document.title = "EC1211 Makroekonomi";
    app.innerHTML = "";
    app.append(h("h1", null, "Föreläsningar i makroekonomi"));
    const intro = h("p", "muted", "Genomgångar, interaktiva grafer och övningsfrågor för varje föreläsning. Med quizverktyget kan du blanda frågor från flera föreläsningar.");
    app.append(intro);
    if (!LECTURES.length) {
      app.append(h("div", "card", "Inga föreläsningar ännu."));
      return;
    }
    const row = h("div", "row"); row.style.margin = "0 0 20px";
    const qb = h("a", "btn", "Skapa quiz"); qb.href = "#/quiz";
    row.append(qb);
    app.append(row);
    const grid = h("div", "grid");
    LECTURES.forEach(l => {
      const a = h("a", "card lec-card"); a.href = "#/lecture/" + l.id;
      a.append(h("div", "lec-num", lecLabel(l) + (l.date ? " · " + l.date : "")));
      a.append(h("h3", null, l.title));
      if (l.summary) a.append(h("div", "muted", l.summary));
      const graphs = (l.sections || []).reduce((n, s) => n + (s.graphs || (s.graph ? [s.graph] : [])).length, 0);
      a.append(h("div", "lec-meta", `${(l.sections || []).length} avsnitt · ${graphs} grafer · ${(l.quiz || []).length} frågor`));
      grid.append(a);
    });
    app.append(grid);
  }

  function lecture(id) {
    const l = LECTURES.find(x => x.id === id);
    if (!l) { app.innerHTML = ""; app.append(h("p", null, "Föreläsningen hittades inte."), Object.assign(h("a", null, "Tillbaka till föreläsningarna"), { href: "#/" })); return; }
    document.title = `${lecLabel(l)}: ${l.title}`;
    app.innerHTML = "";
    app.append(h("div", "lec-num", lecLabel(l) + (l.date ? " · " + l.date : "")));
    app.append(h("h1", null, l.title));
    if (l.summary) app.append(h("p", "muted", l.summary));
    if (l.tags) { const t = h("div"); l.tags.forEach(x => t.append(h("span", "pill", x))); app.append(t); }

    const sections = l.sections || [];
    const toc = h("div", "card toc");
    toc.append(h("b", null, "Innehåll"));
    const ol = h("ol");
    sections.forEach(s => { const li = h("li"); const a = h("a", null, s.heading); a.href = "#/lecture/" + l.id + "/" + slug(s.heading); li.append(a); ol.append(li); });
    if (l.keyTerms) { const li = h("li"); const a = h("a", null, "Nyckelbegrepp"); a.href = "#/lecture/" + l.id + "/nyckelbegrepp"; li.append(a); ol.append(li); }
    if (l.quiz && l.quiz.length) { const li = h("li"); const a = h("a", null, "Övningsfrågor"); a.href = "#/lecture/" + l.id + "/ovningsfragor"; li.append(a); ol.append(li); }
    toc.append(ol);
    app.append(toc);

    sections.forEach(s => {
      const sec = h("section", "section"); sec.id = slug(s.heading);
      sec.append(h("h2", null, s.heading));
      const body = h("div", "body"); body.innerHTML = window.md(s.body || ""); sec.append(body);
      (s.graphs || (s.graph ? [s.graph] : [])).forEach(g => window.renderGraph(sec, g));
      if (s.after) { const b2 = h("div", "body"); b2.innerHTML = window.md(s.after); sec.append(b2); }
      if (s.takeaway) { const c = h("div", "callout"); c.innerHTML = "<b>Att ta med sig:</b> " + window.mdInline(s.takeaway); sec.append(c); }
      app.append(sec);
    });

    if (l.keyTerms) {
      const sec = h("section", "section keyterms"); sec.id = "nyckelbegrepp";
      sec.append(h("h2", null, "Nyckelbegrepp"));
      const card = h("div", "card"), dl = h("dl");
      l.keyTerms.forEach(k => { dl.append(h("dt", null, k.term)); const dd = h("dd"); dd.innerHTML = window.mdInline(k.def); dl.append(dd); });
      card.append(dl); sec.append(card); app.append(sec);
    }

    if (l.quiz && l.quiz.length) {
      const sec = h("section", "section"); sec.id = "ovningsfragor";
      sec.append(h("h2", null, "Övningsfrågor"));
      sec.append(h("p", "muted", "Du får återkoppling direkt när du svarar."));
      app.append(sec);
      window.renderQuiz(sec, l.quiz, { mode: "practice" });
    }
    window.typeset(app);
  }

  function builder() {
    document.title = "Skapa quiz";
    app.innerHTML = "";
    app.append(h("h1", null, "Skapa quiz"));
    app.append(h("p", "muted", "Välj vilka föreläsningar som ska ingå och hur många frågor du vill ha."));
    const withQ = LECTURES.filter(l => l.quiz && l.quiz.length);
    if (!withQ.length) { app.append(h("div", "card", "Det finns inga föreläsningar med frågor ännu.")); return; }

    const card = h("div", "card");
    const list = h("div", "builder-list");
    const boxes = withQ.map(l => {
      const lab = h("label");
      const cb = document.createElement("input"); cb.type = "checkbox"; cb.checked = true;
      lab.append(cb, h("span", null, `${lecLabel(l)}: ${l.title}`), h("span", "count", `${l.quiz.length} frågor`));
      list.append(lab);
      return { l, cb };
    });
    const allRow = h("div", "row"); allRow.style.marginBottom = "8px";
    const all = h("button", "ghost", "Markera alla"), none = h("button", "ghost", "Avmarkera alla");
    all.onclick = () => { boxes.forEach(b => b.cb.checked = true); upd(); };
    none.onclick = () => { boxes.forEach(b => b.cb.checked = false); upd(); };
    allRow.append(all, none);
    card.append(allRow, list);

    const opts = h("div", "row opts-row"); opts.style.marginTop = "16px";
    const nLab = h("label", null, "Antal frågor: ");
    const n = document.createElement("input"); Object.assign(n, { type: "number", min: 1, value: 10, className: "num-input" }); n.style.width = "90px";
    nLab.append(n);
    const avail = h("span", "muted");
    const modeSel = document.createElement("select"); modeSel.className = "num-input"; modeSel.style.width = "auto";
    modeSel.innerHTML = `<option value="exam">Provläge – resultat i slutet</option><option value="practice">Övningsläge – svar direkt</option>`;
    const balLab = h("label");
    const bal = document.createElement("input"); bal.type = "checkbox"; bal.checked = true;
    balLab.append(bal, document.createTextNode(" Fördela jämnt mellan föreläsningarna"));
    opts.append(nLab, avail, modeSel, balLab);
    card.append(opts);

    const go = h("button", null, "Starta quiz"); go.style.marginTop = "16px";
    card.append(go);
    app.append(card);
    const out = h("div"); out.style.marginTop = "24px";
    app.append(out);

    function upd() {
      const total = boxes.filter(b => b.cb.checked).reduce((s, b) => s + b.l.quiz.length, 0);
      avail.textContent = `(${total} tillgängliga)`;
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
      head.append(h("h2", null, `Ditt quiz (${picked.length} frågor)`));
      head.querySelector("h2").style.margin = "0";
      const again = h("button", "ghost", "Nytt quiz med samma inställningar"); again.onclick = go.onclick;
      head.append(again);
      out.append(head);
      window.renderQuiz(out, picked, { mode: modeSel.value, showSource: true });
      out.scrollIntoView({ behavior: "smooth" });
    };
  }

  /* ---------- duggor ---------- */
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
  };

  function duggaList() {
    document.title = "Övningsduggor";
    app.innerHTML = "";
    app.append(h("h1", null, "Övningsduggor"));
    app.append(h("p", "muted", "Egna övningsduggor i samma format som kursens duggor: 10 flervalsfrågor med ett rätt svar var. Godkänt (G) kräver minst 6 rätt. Skrivtiden är 2 timmar."));
    if (!DUGGOR.length) { app.append(h("div", "card", "Inga övningsduggor ännu.")); return; }
    DUGGOR.forEach(d => {
      app.append(h("h2", null, d.title));
      if (d.description) app.append(h("p", "muted", d.description));
      const grid = h("div", "grid");
      d.exams.forEach(ex => {
        const a = h("a", "card lec-card"); a.href = `#/dugga/${d.id}/${ex.id}`;
        a.append(h("div", "lec-num", d.title));
        a.append(h("h3", null, ex.title));
        if (ex.summary) a.append(h("div", "muted", ex.summary));
        const best = store.get(`best:${d.id}:${ex.id}`);
        a.append(h("div", "lec-meta", `${ex.questions.length} frågor` + (best != null ? ` · bästa resultat: ${best}/${ex.questions.length}` : "")));
        grid.append(a);
      });
      const r = h("a", "card lec-card"); r.href = `#/dugga/${d.id}/slump`;
      r.append(h("div", "lec-num", d.title));
      r.append(h("h3", null, "Slumpad dugga"));
      r.append(h("div", "muted", "10 frågor som dras slumpmässigt från alla övningsduggor ovan. Ny kombination varje gång."));
      r.append(h("div", "lec-meta", `${d.exams.reduce((n, e) => n + e.questions.length, 0)} frågor i banken`));
      grid.append(r);
      app.append(grid);
    });
  }

  function duggaExam(did, eid) {
    const d = DUGGOR.find(x => x.id === did);
    if (!d) { app.innerHTML = "<p>Duggan hittades inte.</p>"; return; }
    let title, questions;
    if (eid === "slump") {
      title = "Slumpad dugga";
      const pool = shuffle(d.exams.flatMap(e => e.questions.map(q => ({ ...q, _source: e.title }))));
      // försök täcka så många olika kapitel som möjligt
      const picked = [], seen = new Set();
      pool.forEach(q => { if (picked.length < 10 && !seen.has(q.ch)) { picked.push(q); seen.add(q.ch); } });
      pool.forEach(q => { if (picked.length < 10 && !picked.includes(q)) picked.push(q); });
      questions = picked.sort((a, b) => (a.ch || 0) - (b.ch || 0));
    } else {
      const ex = d.exams.find(x => x.id === eid);
      if (!ex) { app.innerHTML = "<p>Duggan hittades inte.</p>"; return; }
      title = ex.title; questions = ex.questions;
    }
    questions = questions.map(q => ({ ...q, topic: q.ch ? "Föreläsning " + q.ch : q.topic }));
    document.title = `${d.title}: ${title}`;
    app.innerHTML = "";
    const back = h("a", null, "← Alla övningsduggor"); back.href = "#/duggor";
    app.append(back);
    app.append(h("h1", null, `${d.title}: ${title}`));
    const info = h("div", "card exam-info");
    info.append(h("span", null, `${questions.length} frågor · 1 poäng per fråga · G vid minst 6 rätt · skrivtid 2 timmar`));
    const timer = h("span", "timer", "2:00:00");
    const tbtn = h("button", "ghost", "Starta klocka");
    let tid = null;
    tbtn.onclick = () => {
      if (tid) return;
      const end = Date.now() + 2 * 3600 * 1000;
      const tick = () => {
        const ms = Math.max(0, end - Date.now());
        const s2 = Math.floor(ms / 1000);
        timer.textContent = `${Math.floor(s2 / 3600)}:${String(Math.floor(s2 / 60) % 60).padStart(2, "0")}:${String(s2 % 60).padStart(2, "0")}`;
        if (ms === 0 || !document.body.contains(timer)) { clearInterval(tid); }
      };
      tid = setInterval(tick, 1000); tick();
      tbtn.disabled = true;
    };
    info.append(timer, tbtn);
    if (eid === "slump") {
      const again = h("button", "ghost", "Dra nya frågor");
      again.onclick = () => duggaExam(did, eid);
      info.append(again);
    }
    app.append(info);
    app.append(h("p", "muted", "Svara på alla frågor och tryck sedan på ”Lämna in” längst ned. Därefter ser du rätt svar och förklaringar."));
    window.renderQuiz(app, questions, {
      mode: "exam", letters: true, passMark: d.passMark ?? 6,
      onSubmit: right => {
        if (eid === "slump") return;
        const k = `best:${did}:${eid}`;
        const prev = store.get(k);
        if (prev == null || right > prev) store.set(k, right);
      },
    });
    window.typeset(app);
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
    if (parts[0] === "quiz") builder();
    else if (parts[0] === "duggor") duggaList();
    else if (parts[0] === "begrepp") window.renderDrillPage(app, LECTURES, parts[1] || "ova");
    else if (parts[0] === "dugga" && parts[1] && parts[2]) duggaExam(parts[1], parts[2]);
    else home();
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  async function start() { await loadAll(); app.dataset.ready = "1"; route(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
