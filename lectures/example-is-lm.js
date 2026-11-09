// EXAMPLE LECTURE – shows the format. Delete it (and its line in manifest.js) once your own lectures are in.
registerLecture({
  id: "example-is-lm",
  number: 0,
  title: "Example: The IS-LM model",
  date: "",
  summary: "A short demo lecture showing the format: walkthrough text, interactive graphs and quiz questions.",
  tags: ["Short run", "Goods market", "Money market"],

  sections: [
    {
      heading: "The goods market and the IS curve",
      body: `In the short run, output is determined by demand. Equilibrium in the goods market requires
$$Y = C(Y - T) + I(r) + G$$
A **lower interest rate** raises investment, which raises demand and output. That gives a downward-sloping **IS curve** in $(Y, r)$ space.`,
      takeaway: "Fiscal expansion (higher $G$ or lower $T$) shifts the IS curve to the right.",
    },
    {
      heading: "The money market and the LM curve",
      body: `Money market equilibrium requires real money supply to equal money demand: $M/P = L(r, Y)$.
Higher income raises money demand, so for a given money supply the interest rate must rise. That gives an upward-sloping **LM curve**.`,
    },
    {
      heading: "Equilibrium and policy",
      body: "Move the sliders to see how fiscal and monetary policy shift the curves. The dashed lines show where the curves started.",
      graphs: [
        {
          type: "curves",
          title: "IS-LM: fiscal and monetary policy",
          xLabel: "Output, Y", yLabel: "Interest rate, r (%)",
          x: [0, 1000], y: [0, 12],
          params: {
            G: { label: "Government spending G", min: 100, max: 400, step: 5, value: 250 },
            M: { label: "Money supply M/P", min: 300, max: 900, step: 10, value: 600 },
          },
          curves: [
            { label: "IS", fn: "16 + 0.03*(G - 250) - 0.014*x", ghost: true },
            { label: "LM", fn: "0.012*x - (M - 600)/60 - 2", ghost: true },
          ],
          points: [{ between: ["IS", "LM"], label: "E" }],
          readout: "Equilibrium: Y = {E.x}, r = {E.y}%",
          caption: "Raising $G$ moves IS right: output and the interest rate both rise (partial crowding out). Raising $M/P$ moves LM down: output rises and the interest rate falls.",
        },
      ],
    },
    {
      heading: "Example data chart",
      body: "Lectures can also contain data charts, for example a time series from the slides.",
      graphs: [
        {
          type: "series",
          title: "Illustrative output gap (% of potential)",
          xLabel: "Year", yLabel: "%",
          series: [{ label: "Output gap", data: [[2018, 0.6], [2019, 0.9], [2020, -4.2], [2021, -1.1], [2022, 1.3], [2023, 0.2], [2024, -0.5]] }],
          caption: "Illustrative numbers only.",
        },
      ],
    },
  ],

  keyTerms: [
    { term: "IS curve", def: "Combinations of $Y$ and $r$ where the goods market is in equilibrium." },
    { term: "LM curve", def: "Combinations of $Y$ and $r$ where the money market is in equilibrium." },
    { term: "Crowding out", def: "Higher interest rates from fiscal expansion reduce private investment." },
  ],

  quiz: [
    {
      q: "An increase in government spending, all else equal, will in the IS-LM model:",
      options: ["Shift LM right; lower $r$", "Shift IS right; raise $Y$ and $r$", "Shift IS left; lower $Y$", "Leave $Y$ unchanged"],
      answer: 1,
      explain: "Higher $G$ raises demand at every interest rate, so IS shifts right. Along an upward-sloping LM, both $Y$ and $r$ rise.",
      topic: "Equilibrium and policy",
    },
    {
      q: "Why does the LM curve slope upward?",
      options: [
        "Higher income lowers saving",
        "Higher income raises money demand, so $r$ must rise to keep the money market in equilibrium",
        "Higher interest rates raise investment",
        "The central bank always raises rates when output rises",
      ],
      answer: 1,
      explain: "With a fixed real money supply, more transactions demand must be offset by a higher interest rate.",
      topic: "The money market and the LM curve",
    },
    {
      q: "If the marginal propensity to consume is 0.8, what is the simple Keynesian spending multiplier?",
      type: "numeric", answer: 5, tolerance: 0.01,
      explain: "Multiplier $= 1/(1 - MPC) = 1/0.2 = 5$.",
      topic: "The goods market and the IS curve",
    },
  ],
});
