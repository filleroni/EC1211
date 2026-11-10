/* Begrepp & formler: drill med flerval och fritext.
 *
 * Data registreras med registerDrill({ vars, symbols, formulas }) (se lectures/begrepp-01-07.js).
 * Begrepp hämtas från föreläsningarnas keyTerms.
 * Formler som skrivs in rättas numeriskt: uttrycket tolkas och jämförs med facit för slumpade variabelvärden.
 */
(function () {
  const DRILL = { vars: {}, symbols: [], formulas: [] };
  window.registerDrill = function (d) {
    Object.assign(DRILL.vars, d.vars || {});
    DRILL.symbols.push(...(d.symbols || []));
    DRILL.formulas.push(...(d.formulas || []));
  };

  /* ================= hjälpare ================= */
  function h(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tex = s => `$${s}$`;
  const typeset = n => window.typeset && window.typeset(n);
  const mdi = s => (window.mdInline ? window.mdInline(s) : s);

  /* ================= formeltolk ================= */
  function normalize(s) {
    const sub = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9" };
    return s.normalize("NFC")
      .replace(/[₀-₉]/g, c => sub[c])
      .replace(/ᵉ/g, "^e").replace(/ᵈ/g, "^d").replace(/ˢ/g, "^s")
      .replace(/[−–—]/g, "-").replace(/[·×⋅∙]/g, "*").replace(/÷/g, "/")
      .replace(/∆/g, "Δ").replace(/[\[{]/g, "(").replace(/[\]}]/g, ")")
      .replace(/,/g, ".").replace(/\s+/g, "");
  }

  // Bygg en tokenlista med variabler (längsta alias först).
  function tokenize(src, varKeys) {
    const aliases = [];
    varKeys.forEach(k => {
      const v = DRILL.vars[k];
      (v ? v.aliases : [k]).forEach(a => aliases.push({ a: normalize(a).replace(/[{}]/g, m => (m === "{" ? "(" : ")")), k }));
    });
    aliases.sort((x, y) => y.a.length - x.a.length);
    const out = [];
    let i = 0;
    while (i < src.length) {
      const ch = src[i];
      const hit = aliases.find(al => src.startsWith(al.a, i));
      if (hit) { out.push({ t: "var", k: hit.k }); i += hit.a.length; continue; }
      const num = /^\d+(\.\d+)?|^\.\d+/.exec(src.slice(i));
      if (num) { out.push({ t: "num", v: parseFloat(num[0]) }); i += num[0].length; continue; }
      if ("+-*/^()".includes(ch)) { out.push({ t: ch }); i++; continue; }
      let j = i + 1;
      while (j < src.length && /[\p{L}_']/u.test(src[j])) j++;
      throw new Error(`Okänd beteckning ”${src.slice(i, j)}”.`);
    }
    return out;
  }

  function parse(tokens) {
    let p = 0;
    const peek = () => tokens[p], take = () => tokens[p++];
    const startsAtom = t => t && (t.t === "num" || t.t === "var" || t.t === "(");
    function expr() {
      let a = term();
      while (peek() && (peek().t === "+" || peek().t === "-")) { const op = take().t; a = { t: "bin", op, a, b: term() }; }
      return a;
    }
    function term() {
      let a = unary();
      while (peek() && (peek().t === "*" || peek().t === "/" || startsAtom(peek()))) {
        const op = (peek().t === "*" || peek().t === "/") ? take().t : "imp";
        a = { t: "bin", op: op === "imp" ? "*" : op, a, b: unary(), imp: op === "imp" };
      }
      return a;
    }
    function unary() {
      if (peek() && peek().t === "-") { take(); return { t: "neg", a: unary() }; }
      if (peek() && peek().t === "+") { take(); return unary(); }
      return power();
    }
    function power() {
      const a = atom();
      if (peek() && peek().t === "^") { take(); return { t: "bin", op: "^", a, b: unary() }; }
      return a;
    }
    function atom() {
      const t = take();
      if (!t) throw new Error("Uttrycket tar slut för tidigt.");
      if (t.t === "num") return { t: "num", v: t.v };
      if (t.t === "var") return { t: "var", k: t.k };
      if (t.t === "(") {
        const e = expr();
        if (!peek() || peek().t !== ")") throw new Error("En parentes saknas.");
        take();
        return { t: "par", a: e };
      }
      throw new Error(`Oväntat tecken ”${t.t}”.`);
    }
    if (!tokens.length) throw new Error("Skriv ett uttryck.");
    const e = expr();
    if (p < tokens.length) throw new Error(`Oväntat tecken ”${tokens[p].t === "var" ? DRILL.vars[tokens[p].k]?.aliases[0] : tokens[p].t}”.`);
    return e;
  }

  function evaluate(n, env) {
    switch (n.t) {
      case "num": return n.v;
      case "var": return env[n.k];
      case "par": return evaluate(n.a, env);
      case "neg": return -evaluate(n.a, env);
      case "bin": {
        const a = evaluate(n.a, env), b = evaluate(n.b, env);
        return n.op === "+" ? a + b : n.op === "-" ? a - b : n.op === "*" ? a * b : n.op === "/" ? a / b : Math.pow(a, b);
      }
    }
  }

  function toTex(n) {
    switch (n.t) {
      case "num": return String(n.v).replace(".", "{,}");
      case "var": return DRILL.vars[n.k] ? DRILL.vars[n.k].tex : n.k;
      case "par": return `\\left(${toTex(n.a)}\\right)`;
      case "neg": return `-${toTex(n.a)}`;
      case "bin": {
        const strip = x => (x.t === "par" ? x.a : x);
        if (n.op === "/") return `\\frac{${toTex(strip(n.a))}}{${toTex(strip(n.b))}}`;
        if (n.op === "^") return `{${toTex(n.a)}}^{${toTex(strip(n.b))}}`;
        if (n.op === "*") return `${toTex(n.a)}${n.imp ? "\\," : " \\cdot "}${toTex(n.b)}`;
        return `${toTex(n.a)} ${n.op} ${toTex(n.b)}`;
      }
    }
  }

  // Ta bort ett inledande "Y =" om användaren skrev hela ekvationen.
  function rhsOnly(src) {
    const k = src.lastIndexOf("=");
    return k >= 0 ? src.slice(k + 1) : src;
  }

  function checkFormula(input, f) {
    const src = normalize(rhsOnly(input));
    const user = parse(tokenize(src, f.vars));
    const facit = parse(tokenize(normalize(f.expr), f.vars)); // facit skrivs med nycklarna
    let tested = 0;
    for (let k = 0; k < 40 && tested < 8; k++) {
      const env = {};
      f.vars.forEach(v => { env[v] = 0.11 + Math.random() * 0.76; });
      const want = evaluate(facit, env);
      if (!isFinite(want) || Math.abs(want) > 1e8) continue;
      const got = evaluate(user, env);
      tested++;
      if (!isFinite(got) || Math.abs(got - want) > 1e-7 * Math.max(1, Math.abs(want))) return { ok: false, ast: user };
    }
    return { ok: true, ast: user };
  }
  // Facit skrivs med variabelnycklarna (t.ex. "c1*YD"), så nycklarna måste också fungera som alias.
  function ensureKeyAliases() {
    Object.entries(DRILL.vars).forEach(([k, v]) => { if (!v.aliases.includes(k)) v.aliases.push(k); });
  }

  /* ================= textjämförelse för begrepp ================= */
  const clean = s => s.toLowerCase().normalize("NFC").replace(/[.,;:!?”"'()]/g, " ").replace(/\s+/g, " ").trim();
  function lev(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  function termAccepts(term) {
    const out = new Set([term]);
    const m = /^(.*?)\s*\((.*)\)\s*$/.exec(term);
    if (m) { out.add(m[1]); out.add(m[2]); }
    term.split(/\s*\/\s*/).forEach(x => out.add(x));
    return [...out].map(clean).filter(Boolean);
  }
  function checkTerm(input, term) {
    const u = clean(input);
    if (!u) return false;
    return termAccepts(term).some(a => a === u || lev(a, u) <= Math.max(1, Math.floor(a.length / 8)));
  }

  /* ================= frågebygge ================= */
  function buildPool(lectures, chapters, cats) {
    ensureKeyAliases();
    const pool = [];
    const inCh = ch => chapters.has(ch);
    if (cats.has("begrepp")) {
      lectures.filter(l => inCh(l.number)).forEach(l => (l.keyTerms || []).forEach(k => pool.push({ cat: "begrepp", ch: l.number, term: k.term, def: k.def })));
    }
    if (cats.has("symboler")) DRILL.symbols.filter(s => inCh(s.ch)).forEach(s => pool.push({ cat: "symboler", ...s }));
    if (cats.has("formler")) DRILL.formulas.filter(f => inCh(f.ch)).forEach(f => pool.push({ cat: "formler", ...f }));
    return pool;
  }

  function makeQuestion(item, format, pool) {
    const write = format === "skriv" || (format === "blandat" && Math.random() < 0.5);
    const same = pool.filter(p => p.cat === item.cat && p !== item);
    const pick3 = (arr, key) => {
      const seen = new Set([key(item)]);
      return shuffle(arr).filter(x => { const k = key(x); if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 3);
    };
    if (item.cat === "begrepp") {
      const canWrite = !/[\/,]/.test(item.term) && item.term.split(" ").length <= 4;
      if (write && canWrite) return { item, kind: "write-term", prompt: `Vilket begrepp beskrivs?`, detail: item.def };
      if (Math.random() < 0.5) {
        const opts = shuffle([item, ...pick3(same, x => x.term)]);
        return { item, kind: "mc", prompt: "Vilket begrepp beskrivs?", detail: item.def, options: opts.map(o => o.term), answer: opts.indexOf(item) };
      }
      const opts = shuffle([item, ...pick3(same, x => x.def)]);
      return { item, kind: "mc", prompt: `Vad betyder **${item.term}**?`, options: opts.map(o => o.def), answer: opts.indexOf(item) };
    }
    if (item.cat === "symboler") {
      if (write) return { item, kind: "write-symbol", prompt: "Vilken symbol används för …", detail: item.meaning };
      const opts = shuffle([item, ...pick3(same, x => x.meaning)]);
      return { item, kind: "mc", prompt: `Vad står ${tex(item.tex)} för?`, options: opts.map(o => o.meaning), answer: opts.indexOf(item) };
    }
    // formler
    if (write && item.write !== false && item.expr) return { item, kind: "write-formula", prompt: `Skriv formeln: **${item.name}**` };
    const opts = shuffle([item.tex, ...item.wrong]);
    return { item, kind: "mc", prompt: `Vilken formel stämmer? **${item.name}**`, options: opts.map(t => tex(`${item.lhs} ${t}`)), answer: opts.indexOf(item.tex) };
  }

  /* ================= rendering av en fråga ================= */
  function renderCard(q, idx, total, onResult) {
    const card = h("div", "card quiz-q drill-q");
    const head = h("div", "qhead");
    const catName = { begrepp: "Begrepp", symboler: "Symbol", formler: "Formel" }[q.item.cat];
    head.append(h("span", null, `Fråga ${idx + 1} av ${total}`), h("span", null, `${catName} · Kapitel ${q.item.ch}`));
    card.append(head);
    const qt = h("div", "qtext"); qt.innerHTML = mdi(q.prompt); card.append(qt);
    if (q.detail) { const d = h("div", "drill-detail"); d.innerHTML = mdi(q.detail); card.append(d); }
    const fb = h("div");
    let done = false;

    const finish = (ok, correctHtml, extraHtml, skipped) => {
      if (done) return;
      done = true;
      fb.innerHTML = "";
      const ex = h("div", "explain " + (ok ? "good" : "bad"));
      ex.innerHTML = `<b>${ok ? "Rätt!" : "Inte riktigt."}</b> ${ok ? "" : "Rätt svar: " + correctHtml}${extraHtml || ""}`;
      fb.append(ex);
      if (!ok && q.kind !== "mc" && !skipped) {
        const ov = h("button", "ghost btn-reset", "Jag hade rätt, räkna det som rätt");
        ov.onclick = () => { ov.remove(); ex.className = "explain good"; ex.querySelector("b").textContent = "Godkänt manuellt."; onResult(true, true); };
        fb.append(ov);
      }
      typeset(fb);
      onResult(ok, false);
    };

    if (q.kind === "mc") {
      const btns = q.options.map((o, k) => {
        const b = h("button", "opt"); b.innerHTML = mdi(o);
        b.onclick = () => {
          btns.forEach((x, j) => { x.disabled = true; if (j === q.answer) x.classList.add("correct"); else if (j === k) x.classList.add("wrong"); });
          finish(k === q.answer, mdi(q.options[q.answer]));
        };
        card.append(b);
        return b;
      });
    } else {
      const row = h("div", "row drill-row");
      if (q.kind === "write-formula") row.append(Object.assign(h("span", "drill-lhs"), { innerHTML: tex(q.item.lhs) }));
      const inp = document.createElement("input");
      inp.type = "text"; inp.className = "num-input drill-input"; inp.autocomplete = "off"; inp.spellcheck = false;
      inp.placeholder = q.kind === "write-formula" ? "t.ex. c0 + c1*(Y - T)" : q.kind === "write-symbol" ? "Symbol, t.ex. c1" : "Begrepp";
      const btn = h("button", null, "Kontrollera");
      const skip = h("button", "ghost", "Visa svar");
      row.append(inp, btn, skip);
      card.append(row);

      let preview = null, legend = null;
      if (q.kind === "write-formula") {
        legend = h("div", "drill-legend");
        legend.innerHTML = "Beteckningar: " + q.item.vars.map(k => {
          const v = DRILL.vars[k];
          const shown = v.aliases.find(a => /^[\x20-\x7e]+$/.test(a)) || v.aliases[0];
          return `<code>${shown}</code> = ${tex(v.tex)} (${v.meaning})`;
        }).join(" · ") + ". Skriv * för gånger (eller bara skriv tecknen efter varandra), / för division och ^ för potens.";
        card.append(legend);
        preview = h("div", "drill-preview muted");
        card.append(preview);
        const upd = () => {
          const v = inp.value.trim();
          if (!v) { preview.textContent = ""; return; }
          try {
            const ast = parse(tokenize(normalize(rhsOnly(v)), q.item.vars));
            preview.innerHTML = "Tolkas som: " + tex(`${q.item.lhs} ${toTex(ast)}`);
            typeset(preview);
          } catch (e) { preview.textContent = e.message; }
        };
        inp.addEventListener("input", upd);
      } else if (q.kind === "write-symbol") {
        const lg = h("div", "drill-legend", "Skriv symbolen med vanliga tecken, t.ex. c1, Y_D, i*, E^e, πe eller eps. Stora och små bokstäver spelar roll.");
        card.append(lg);
      }

      const correctHtml = () => q.kind === "write-formula" ? tex(`${q.item.lhs} ${q.item.tex}`)
        : q.kind === "write-symbol" ? tex(q.item.tex) : `<b>${q.item.term}</b>`;

      const check = () => {
        const v = inp.value.trim();
        if (!v || done) return;
        if (q.kind === "write-formula") {
          let res;
          try { res = checkFormula(v, q.item); } catch (e) { preview.textContent = e.message + " Rätta och försök igen."; return; }
          finish(res.ok, correctHtml(), res.ok ? "" : `<br>Du skrev: ${tex(`${q.item.lhs} ${toTex(res.ast)}`)}`);
          if (res.ok) fb.querySelector(".explain").innerHTML += ` ${tex(`${q.item.lhs} ${q.item.tex}`)}`;
          typeset(fb);
        } else if (q.kind === "write-symbol") {
          const u = normalize(v);
          const ok = q.item.aliases.some(a => normalize(a) === u);
          finish(ok, correctHtml());
        } else {
          finish(checkTerm(v, q.item.term), correctHtml(), checkTerm(v, q.item.term) ? ` <b>${q.item.term}</b>` : "");
        }
        inp.disabled = true; btn.disabled = true; skip.disabled = true;
      };
      btn.onclick = check;
      inp.addEventListener("keydown", e => { if (e.key === "Enter") check(); });
      skip.onclick = () => { if (done) return; inp.disabled = true; btn.disabled = true; skip.disabled = true; finish(false, correctHtml(), "", true); };
      setTimeout(() => typeset(card), 0);
    }
    card.append(fb);
    return card;
  }

  /* ================= sidan ================= */
  window.renderDrillPage = function (app, lectures, tab) {
    document.title = "Begrepp & formler";
    app.innerHTML = "";
    app.append(h("h1", null, "Begrepp & formler"));
    app.append(h("p", "muted", "Träna på begrepp, symboler och formler med flerval eller genom att skriva svaret själv. Formler du skriver rättas matematiskt, så likvärdiga uttryck räknas som rätt."));
    const tabs = h("div", "row drill-tabs");
    [["ova", "Öva"], ["formler", "Formelsamling"], ["begrepp", "Begreppslista"]].forEach(([k, label]) => {
      const a = h("a", "btn" + (tab === k ? "" : " ghost"), label); a.href = "#/begrepp/" + k; tabs.append(a);
    });
    app.append(tabs);
    const lecs = lectures.filter(l => l.number != null);
    if (tab === "formler") return formulaSheet(app, lecs);
    if (tab === "begrepp") return termList(app, lecs);

    const card = h("div", "card");
    card.append(h("h3", null, "Kapitel"));
    const chBox = h("div", "drill-checks");
    const chInputs = lecs.map(l => {
      const lab = h("label"); const cb = document.createElement("input"); cb.type = "checkbox"; cb.checked = true;
      lab.append(cb, document.createTextNode(` ${l.number}`)); lab.title = l.title; chBox.append(lab);
      return { cb, n: l.number };
    });
    const allBtn = h("button", "ghost btn-reset", "Alla"), noneBtn = h("button", "ghost btn-reset", "Inga");
    allBtn.onclick = () => { chInputs.forEach(c => c.cb.checked = true); upd(); };
    noneBtn.onclick = () => { chInputs.forEach(c => c.cb.checked = false); upd(); };
    chBox.append(allBtn, noneBtn);
    card.append(chBox);

    card.append(h("h3", null, "Vad vill du öva på?"));
    const catBox = h("div", "drill-checks");
    const cats = [["begrepp", "Begrepp"], ["symboler", "Symboler och variabler"], ["formler", "Formler"]].map(([k, label]) => {
      const lab = h("label"); const cb = document.createElement("input"); cb.type = "checkbox"; cb.checked = true;
      lab.append(cb, document.createTextNode(" " + label)); catBox.append(lab); return { k, cb };
    });
    card.append(catBox);

    card.append(h("h3", null, "Svarsform"));
    const fmtBox = h("div", "drill-checks");
    const fmts = [["blandat", "Blandat"], ["flerval", "Flerval"], ["skriv", "Skriv själv"]].map(([k, label], i) => {
      const lab = h("label"); const rb = document.createElement("input"); rb.type = "radio"; rb.name = "drillfmt"; rb.checked = i === 0;
      lab.append(rb, document.createTextNode(" " + label)); fmtBox.append(lab); return { k, rb };
    });
    card.append(fmtBox);

    const row = h("div", "row"); row.style.marginTop = "14px";
    const nLab = h("label", null, "Antal frågor: ");
    const n = document.createElement("input"); Object.assign(n, { type: "number", min: 1, value: 15, className: "num-input" }); n.style.width = "90px";
    nLab.append(n);
    const avail = h("span", "muted");
    const go = h("button", null, "Starta");
    row.append(nLab, avail, go);
    card.append(row);
    app.append(card);

    const out = h("div"); out.style.marginTop = "20px";
    app.append(out);

    const settings = () => ({
      chapters: new Set(chInputs.filter(c => c.cb.checked).map(c => c.n)),
      cats: new Set(cats.filter(c => c.cb.checked).map(c => c.k)),
      format: fmts.find(f => f.rb.checked).k,
    });
    function upd() {
      const s = settings();
      const pool = buildPool(lecs, s.chapters, s.cats);
      avail.textContent = `(${pool.length} i banken)`;
      go.disabled = pool.length === 0;
    }
    [...chInputs.map(c => c.cb), ...cats.map(c => c.cb)].forEach(x => x.addEventListener("change", upd));
    upd();

    function run(items, s, pool) {
      out.innerHTML = "";
      const qs = items.map(it => makeQuestion(it, s.format, pool));
      const status = h("div", "card drill-status");
      const score = h("span", "score");
      status.append(score);
      out.append(status);
      let answered = 0, right = 0;
      const missed = [];
      const updScore = () => { score.textContent = `${right} rätt av ${answered} besvarade (${qs.length} frågor)`; };
      updScore();
      qs.forEach((q, i) => {
        out.append(renderCard(q, i, qs.length, (ok, override) => {
          if (override) { right++; const k = missed.indexOf(q.item); if (k >= 0) missed.splice(k, 1); }
          else { answered++; if (ok) right++; else missed.push(q.item); }
          updScore();
          if (answered === qs.length && !override) showEnd();
        }));
      });
      const end = h("div"); out.append(end);
      function showEnd() {
        end.innerHTML = "";
        const c = h("div", "card");
        c.append(h("div", "score", `Klart: ${right} av ${qs.length} rätt`));
        const r = h("div", "row"); r.style.marginTop = "10px";
        if (missed.length) {
          const again = h("button", null, `Öva igen på de ${missed.length} du missade`);
          again.onclick = () => { run(shuffle(missed.slice()), s, pool); out.scrollIntoView({ behavior: "smooth" }); };
          r.append(again);
        }
        const fresh = h("button", "ghost", "Nya frågor");
        fresh.onclick = () => go.onclick();
        r.append(fresh);
        c.append(r);
        end.append(c);
        typeset(end);
      }
      typeset(out);
    }

    go.onclick = () => {
      const s = settings();
      const pool = buildPool(lecs, s.chapters, s.cats);
      // fördela jämnt mellan kategorier
      const byCat = {};
      shuffle(pool).forEach(p => (byCat[p.cat] = byCat[p.cat] || []).push(p));
      const lists = Object.values(byCat), want = Math.min(+n.value || 15, pool.length), items = [];
      while (items.length < want) lists.forEach(l => { if (items.length < want && l.length) items.push(l.shift()); });
      run(shuffle(items), s, pool);
      out.scrollIntoView({ behavior: "smooth" });
    };
  };

  function formulaSheet(app, lecs) {
    lecs.forEach(l => {
      const fs = DRILL.formulas.filter(f => f.ch === l.number);
      const ss = DRILL.symbols.filter(s => s.ch === l.number);
      if (!fs.length && !ss.length) return;
      app.append(h("h2", null, l.title));
      if (fs.length) {
        const c = h("div", "card");
        const t = h("table", "drill-table");
        fs.forEach(f => {
          const tr = h("tr");
          tr.append(h("td", null, f.name));
          const td = h("td"); td.innerHTML = tex(`${f.lhs} ${f.tex}`); tr.append(td);
          t.append(tr);
        });
        c.append(t); app.append(c);
      }
      if (ss.length) {
        const c = h("div", "card"); c.style.marginTop = "10px";
        c.append(h("b", null, "Symboler"));
        const t = h("table", "drill-table");
        ss.forEach(s => { const tr = h("tr"); const td = h("td"); td.innerHTML = tex(s.tex); tr.append(td, h("td", null, s.meaning)); t.append(tr); });
        c.append(t); app.append(c);
      }
    });
    typeset(app);
  }

  function termList(app, lecs) {
    lecs.forEach(l => {
      if (!l.keyTerms || !l.keyTerms.length) return;
      app.append(h("h2", null, l.title));
      const c = h("div", "card keyterms"); const dl = h("dl");
      l.keyTerms.forEach(k => { dl.append(h("dt", null, k.term)); const dd = h("dd"); dd.innerHTML = mdi(k.def); dl.append(dd); });
      c.append(dl); app.append(c);
    });
    typeset(app);
  }

  // exponera tolken för tester
  window.__drill = { normalize, tokenize, parse, evaluate, toTex, checkFormula, checkTerm, DRILL, ensureKeyAliases };
})();
