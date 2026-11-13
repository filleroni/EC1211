// Symboler och formler för kapitel 8–14 (används av fliken "Begrepp & formler").
// Variabler som redan definierats i begrepp-01-07.js (E, Ee, i, istar, …) kan återanvändas.
registerDrill({
  vars: {
    ibar: { tex: "\\bar i", aliases: ["ī", "ibar", "i_bar"], meaning: "inhemsk styrränta" },
    d: { tex: "d", aliases: ["d"], meaning: "räntepremie per dag (som decimaltal)" },
    pdev: { tex: "p", aliases: ["p"], meaning: "sannolikhet för devalvering" },
    sdev: { tex: "s", aliases: ["s"], meaning: "devalveringens storlek" },
    W: { tex: "W", aliases: ["W"], meaning: "nominell lön" },
    Pe: { tex: "P^e", aliases: ["P^e", "Pe", "P_e"], meaning: "förväntad prisnivå" },
    m: { tex: "m", aliases: ["m"], meaning: "prispåslag" },
    Aprod: { tex: "A", aliases: ["A"], meaning: "arbetsproduktivitet" },
    Nemp: { tex: "N", aliases: ["N"], meaning: "sysselsättning" },
  },

  symbols: [
    /* Kapitel 8 */
    { ch: 8, tex: "\\bar E^e", meaning: "Förväntad framtida växelkurs (tas som given)", aliases: ["Ee", "E^e", "Ēe", "Ē^e"] },
    { ch: 8, tex: "E_t", meaning: "Dagens nominella växelkurs (utländsk valuta per krona)", aliases: ["E", "E_t", "Et"] },
    { ch: 8, tex: "i^*_t", meaning: "Utländsk ränta", aliases: ["i*", "i^*", "i*_t"] },
    /* Kapitel 9 */
    { ch: 9, tex: "W", meaning: "Nominell lön", aliases: ["W"] },
    { ch: 9, tex: "W/P", meaning: "Reallön", aliases: ["W/P"] },
    { ch: 9, tex: "P^e", meaning: "Förväntad prisnivå", aliases: ["P^e", "Pe"] },
    { ch: 9, tex: "z", meaning: "Övriga faktorer som påverkar lönebildningen (t.ex. arbetslöshetsersättning, arbetsrätt)", aliases: ["z"] },
    { ch: 9, tex: "m", meaning: "Prispåslag på marginalkostnaden", aliases: ["m"] },
    { ch: 9, tex: "A", meaning: "Arbetsproduktivitet (produktion per arbetare)", aliases: ["A"] },
    { ch: 9, tex: "u_n", meaning: "Jämviktsarbetslöshet", aliases: ["u_n", "un"] },
    { ch: 9, tex: "F(u, z)", meaning: "Funktionen som anger vilken reallön lönesättarna väljer (fallande i u, ökande i z)", aliases: ["F(u,z)", "F"] },
  ],

  formulas: [
    /* ---------- Kapitel 8 ---------- */
    { ch: 8, name: "Ränteparitet: dagens växelkurs givet förväntad framtida växelkurs", lhs: "E_t =", tex: "\\frac{1 + i_t}{1 + i^*_t}\\,\\bar E^e", expr: "(1 + i)/(1 + istar)*Ee", vars: ["i", "istar", "Ee"],
      wrong: ["\\frac{1 + i^*_t}{1 + i_t}\\,\\bar E^e", "(1 + i_t)(1 + i^*_t)\\,\\bar E^e", "\\frac{1 + i_t}{1 + i^*_t}\\,\\frac{1}{\\bar E^e}"] },
    { ch: 8, name: "IS i den öppna ekonomin", lhs: "Y =", tex: "C(Y - T) + I(Y, i) + G + NX(Y, Y^*, E)", write: false,
      wrong: ["C(Y - T) + I(Y, i) + G", "C(Y - T) + I(Y, E) + G + NX(Y, Y^*, i)", "C(Y - T) + I(Y, i) + G - NX(Y, Y^*, E)"] },
    { ch: 8, name: "Ränta vid fast växelkurs och fria kapitalrörelser", lhs: "i_t =", tex: "i^*_t", expr: "istar", vars: ["istar", "i"],
      wrong: ["\\bar i", "i^*_t + \\pi^e", "0"] },
    { ch: 8, name: "Räntepremie per dag vid förväntad devalvering (p = sannolikhet, s = storlek)", lhs: "i_t - i^*_t =", tex: "p \\cdot s", expr: "pdev*sdev", vars: ["pdev", "sdev"],
      wrong: ["\\frac{p}{s}", "p + s", "(1 + p)^{365}"] },
    { ch: 8, name: "Daglig ränta d omräknad till årsränta", lhs: "\\text{årsränta} =", tex: "(1 + d)^{365} - 1", expr: "(1 + d)^365 - 1", vars: ["d"],
      wrong: ["365\\,d", "(1 + d)^{365}", "\\frac{d}{365}"] },

    /* ---------- Kapitel 9 ---------- */
    { ch: 9, name: "Lönesättningsrelationen", lhs: "W =", tex: "P^e\\,F(\\underset{-}{u}, \\underset{+}{z})", write: false,
      wrong: ["P\\,F(\\underset{+}{u}, \\underset{-}{z})", "\\frac{F(u, z)}{P^e}", "P^e\\,F(\\underset{+}{u}, \\underset{+}{z})"] },
    { ch: 9, name: "Produktionsfunktionen (bara arbetskraft)", lhs: "Y =", tex: "A \\cdot N", expr: "Aprod*Nemp", vars: ["Aprod", "Nemp"],
      wrong: ["\\frac{A}{N}", "A + N", "\\frac{N}{A}"] },
    { ch: 9, name: "Prissättning med påslag", lhs: "P =", tex: "(1 + m)\\,W", expr: "(1 + m)*W", vars: ["m", "W"],
      wrong: ["\\frac{W}{1 + m}", "m\\,W", "(1 - m)\\,W"] },
    { ch: 9, name: "Prissättningssambandet (PS) för reallönen", lhs: "\\frac{W}{P} =", tex: "\\frac{1}{1 + m}", expr: "1/(1 + m)", vars: ["m"],
      wrong: ["1 + m", "\\frac{m}{1 + m}", "1 - m"] },
    { ch: 9, name: "Lönesättningssambandet (WS) för reallönen", lhs: "\\frac{W}{P} =", tex: "F(\\underset{-}{u}, \\underset{+}{z})", write: false,
      wrong: ["\\frac{1}{1 + m}", "F(\\underset{+}{u}, \\underset{-}{z})", "P^e F(u, z)"] },
    { ch: 9, name: "Villkor för jämviktsarbetslösheten", lhs: "F(u_n, z) =", tex: "\\frac{1}{1 + m}", expr: "1/(1 + m)", vars: ["m"],
      wrong: ["1 + m", "\\frac{W}{P^e}", "0"] },
  ],
});
