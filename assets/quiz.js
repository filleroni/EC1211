/* Quiz component.
 * Question formats in lecture files:
 *   { q: "…", options: ["A", "B", "C", "D"], answer: 1, explain: "…" }      // multiple choice (answer = index)
 *   { q: "…", type: "numeric", answer: 2.5, tolerance: 0.05, explain: "…" } // numeric answer
 *   Optional: topic: "Section name"
 *
 * renderQuiz(container, questions, { mode: "practice" | "exam", showSource: bool })
 *   practice – feedback immediately after each answer
 *   exam     – answers are checked when you press "Submit"
 */
(function () {
  function h(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  const rich = (e, s) => { e.innerHTML = window.md ? window.mdInline(s) : s; return e; };

  window.renderQuiz = function (container, questions, opts = {}) {
    const mode = opts.mode || "practice";
    const wrap = h("div", "quiz");
    container.appendChild(wrap);
    const answers = new Array(questions.length).fill(null);
    const checkers = [];
    const status = h("div", "row");
    const progress = h("span", "muted");

    function updateProgress() {
      const done = answers.filter(a => a !== null).length;
      if (mode === "practice") {
        const right = checkers.filter(c => c.correct === true).length;
        progress.textContent = `${done}/${questions.length} besvarade · ${right} rätt`;
      } else progress.textContent = `${done}/${questions.length} besvarade`;
    }

    // Blanda svarsalternativens ordning (inte i dugga-läge, där a–d ska ligga fast som på en riktig dugga)
    questions = questions.map(q => {
      if (opts.letters || !q.options || q.optionFigures || q.fixedOrder) return q;
      const order = q.options.map((_, k) => k);
      for (let k = order.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [order[k], order[j]] = [order[j], order[k]]; }
      return { ...q, options: order.map(k => q.options[k]), answer: order.indexOf(q.answer) };
    });

    questions.forEach((q, i) => {
      const card = h("div", "card quiz-q");
      const head = h("div", "qhead");
      head.append(h("span", null, `Fråga ${i + 1} av ${questions.length}`));
      if (opts.showSource && q._source) head.append(h("span", null, q._source));
      else if (q.topic) head.append(h("span", null, q.topic));
      card.appendChild(head);
      const qt = h("div", "qtext"); qt.innerHTML = window.md ? window.md(q.q) : q.q; card.appendChild(qt);
      if (q.figure && window.renderGraph) {
        const fw = h("div", "qfig"); card.appendChild(fw); window.renderGraph(fw, q.figure);
      }
      if (q.optionFigures && window.renderGraph) {
        const grid = h("div", "fig-grid");
        q.optionFigures.forEach((spec, k) => {
          const cell = h("div", "fig-cell");
          cell.appendChild(h("div", "fig-letter", String.fromCharCode(97 + k) + ")"));
          window.renderGraph(cell, spec);
          grid.appendChild(cell);
        });
        card.appendChild(grid);
        if (!q.options) q.options = q.optionFigures.map((_, k) => "Figur " + String.fromCharCode(97 + k));
      }
      const fb = h("div");
      const st = { correct: null };
      checkers.push(st);

      const showFeedback = (ok, correctText) => {
        fb.innerHTML = "";
        const ex = h("div", "explain " + (ok ? "good" : "bad"));
        const blank = answers[i] === null;
        ex.innerHTML = `<b>${ok ? "Rätt!" : blank ? "Ej besvarad." : "Inte riktigt."}</b> ` +
          (ok ? "" : correctText ? `Rätt svar: ${window.mdInline ? window.mdInline(correctText) : correctText}. ` : "") +
          (q.explain ? (window.mdInline ? window.mdInline(q.explain) : q.explain) : "");
        fb.appendChild(ex);
        if (mode === "practice") {
          const again = h("button", "ghost btn-reset retry", "Försök igen");
          again.addEventListener("click", () => st.reset());
          fb.appendChild(again);
        }
        window.typeset && window.typeset(fb);
      };

      if (q.type === "numeric") {
        const row = h("div", "row");
        const inp = document.createElement("input");
        Object.assign(inp, { type: "text", inputMode: "decimal", className: "num-input", placeholder: "Ditt svar" });
        const btn = h("button", "ghost", mode === "practice" ? "Kontrollera" : "Spara");
        row.append(inp, btn);
        card.appendChild(row);
        const tol = q.tolerance != null ? q.tolerance : Math.max(Math.abs(q.answer) * 0.01, 1e-6);
        st.check = () => {
          const v = parseFloat(String(answers[i] ?? "").replace(",", "."));
          st.correct = isFinite(v) && Math.abs(v - q.answer) <= tol;
          inp.disabled = true; btn.disabled = true;
          showFeedback(st.correct, String(q.answer).replace(".", ",") + (q.unit ? " " + q.unit : ""));
        };
        const commit = () => {
          if (inp.value.trim() === "") return;
          answers[i] = inp.value.trim();
          if (mode === "practice") st.check();
          updateProgress();
        };
        st.reset = () => {
          answers[i] = null; st.correct = null;
          inp.disabled = false; btn.disabled = false; inp.value = "";
          fb.innerHTML = ""; updateProgress(); inp.focus();
        };
        btn.addEventListener("click", commit);
        inp.addEventListener("keydown", e => { if (e.key === "Enter") commit(); });
        if (mode === "exam") inp.addEventListener("input", () => { answers[i] = inp.value.trim() || null; updateProgress(); });
      } else {
        const btns = q.options.map((o, k) => {
          const b = rich(h("button", "opt"), opts.letters ? String.fromCharCode(97 + k) + ") " + o : o);
          b.addEventListener("click", () => {
            answers[i] = k;
            if (mode === "practice") st.check();
            else btns.forEach((x, j) => x.classList.toggle("selected", j === k));
            updateProgress();
          });
          card.appendChild(b);
          return b;
        });
        st.check = () => {
          const k = answers[i];
          st.correct = k === q.answer;
          btns.forEach((b, j) => {
            b.disabled = true;
            b.classList.remove("selected");
            if (j === q.answer) b.classList.add("correct");
            else if (j === k) b.classList.add("wrong");
          });
          showFeedback(st.correct, q.options[q.answer]);
        };
        st.reset = () => {
          answers[i] = null; st.correct = null;
          btns.forEach(b => { b.disabled = false; b.classList.remove("correct", "wrong", "selected"); });
          fb.innerHTML = ""; updateProgress();
        };
      }
      card.appendChild(fb);
      wrap.appendChild(card);
    });

    const result = h("div");
    status.append(progress);
    if (mode === "practice") {
      const all = h("button", "ghost btn-reset", "Börja om alla frågor");
      all.addEventListener("click", () => { checkers.forEach(c => c.reset && c.reset()); wrap.scrollIntoView({ behavior: "smooth" }); });
      status.append(all);
    }
    if (mode === "exam") {
      const submit = h("button", null, "Lämna in");
      submit.addEventListener("click", () => {
        const unanswered = answers.filter(a => a === null).length;
        if (unanswered && !confirm(`${unanswered} fråga/frågor obesvarade. Lämna in ändå?`)) return;
        checkers.forEach(c => c.check());
        submit.disabled = true;
        const right = checkers.filter(c => c.correct).length;
        const pct = Math.round(100 * right / questions.length);
        result.innerHTML = "";
        const card = h("div", "card");
        card.append(h("div", "score", `${right} / ${questions.length} rätt (${pct} %)`));
        if (opts.passMark != null) {
          const pass = right >= opts.passMark;
          const g = h("div", "grade " + (pass ? "pass" : "fail"), pass ? "Betyg: G (godkänd)" : "Betyg: U (underkänd)");
          card.append(g, h("p", "muted", `Gränsen för godkänt är ${opts.passMark} rätt av ${questions.length}.`));
        }
        if (opts.onSubmit) opts.onSubmit(right);
        const wrong = questions.map((q, i) => ({ q, ok: checkers[i].correct })).filter(x => !x.ok);
        const bySrc = {};
        wrong.forEach(x => { const k = x.q._source || x.q.topic || "Övrigt"; bySrc[k] = (bySrc[k] || 0) + 1; });
        if (wrong.length) {
          card.append(h("p", "muted", "Repetera: " + Object.entries(bySrc).map(([k, v]) => `${k} (${v})`).join(", ")));
        } else card.append(h("p", "muted", "Alla rätt!"));
        result.appendChild(card);
        updateProgress();
        result.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      status.prepend(submit);
    }
    wrap.append(status, result);
    updateProgress();
    window.typeset && window.typeset(wrap);
  };
})();
