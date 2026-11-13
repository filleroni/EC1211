(function () {
  /* ---------- figurhjälpare ---------- */
  const OLD = "var(--muted)";
  const old = (label, fn) => ({ label, fn, color: OLD, dashed: true });
  const mark = (a, b, lab) => ({ between: [a, b], label: lab, showLabel: false, xMark: lab, guides: "v" });

  // WS-PS. kind: "WS-up" | "WS-down" | "PS-down" | "PS-up"
  function wsps(kind) {
    const base = { type: "curves", xLabel: "", yLabel: "W/P", x: [0, 15], y: [0.55, 1.2], ticks: false, texts: [{ at: [14.6, 0.5], text: "u", anchor: "end" }] };
    const WS = "1.07 - 0.04*x", PS = "0.8333";
    const sets = {
      "WS-up":   [old("WS", WS), { label: "WS′", fn: "1.15 - 0.04*x", color: "var(--c1)" }, { label: "PS", fn: PS, color: "var(--c2)" }],
      "WS-down": [old("WS", WS), { label: "WS′", fn: "0.99 - 0.04*x", color: "var(--c1)" }, { label: "PS", fn: PS, color: "var(--c2)" }],
      "PS-down": [{ label: "WS", fn: WS, color: "var(--c1)" }, old("PS", PS), { label: "PS′", fn: "0.75", color: "var(--c2)" }],
      "PS-up":   [{ label: "WS", fn: WS, color: "var(--c1)" }, old("PS", PS), { label: "PS′", fn: "0.9", color: "var(--c2)" }],
    };
    const c = sets[kind];
    const newWS = c.find(x => x.label.startsWith("WS") && x.color !== OLD).label;
    const newPS = c.find(x => x.label.startsWith("PS") && x.color !== OLD).label;
    const oldWS = c.find(x => x.label.startsWith("WS")).label, oldPS = c.find(x => x.label.startsWith("PS")).label;
    return { ...base, curves: c.map(x => x.label.startsWith("WS") ? { ...x, labelAt: x.color === OLD ? 2 : 0.3 } : x), points: [mark(oldWS, oldPS, "uₙ"), mark(newWS, newPS, "uₙ′")] };
  }

  // Solowdiagram med f(k) = √k. kind: "s-up" | "s-down" | "d-up" | "tech-up"
  function solow(kind) {
    const base = { type: "curves", xLabel: "", yLabel: "", x: [0, 16], y: [0, 4.6], ticks: false, texts: [{ at: [15.6, -0.35], text: "k", anchor: "end" }] };
    const sets = {
      "s-up":    [{ label: "f(k)", fn: "sqrt(x)", color: "var(--c1)" }, old("sf(k)", "0.2*sqrt(x)"), { label: "s′f(k)", fn: "0.3*sqrt(x)", color: "var(--c2)" }, { label: "δk", fn: "0.1*x", color: "var(--c3)" }],
      "s-down":  [{ label: "f(k)", fn: "sqrt(x)", color: "var(--c1)" }, old("sf(k)", "0.3*sqrt(x)"), { label: "s′f(k)", fn: "0.2*sqrt(x)", color: "var(--c2)" }, { label: "δk", fn: "0.1*x", color: "var(--c3)" }],
      "d-up":    [{ label: "f(k)", fn: "sqrt(x)", color: "var(--c1)" }, { label: "sf(k)", fn: "0.3*sqrt(x)", color: "var(--c2)" }, old("δk", "0.1*x"), { label: "δ′k", fn: "0.15*x", color: "var(--c3)" }],
      "tech-up": [old("f(k)", "sqrt(x)"), { label: "f′(k)", fn: "1.3*sqrt(x)", color: "var(--c1)" }, old("sf(k)", "0.25*sqrt(x)"), { label: "sf′(k)", fn: "0.325*sqrt(x)", color: "var(--c2)" }, { label: "δk", fn: "0.1*x", color: "var(--c3)" }],
    };
    const c = sets[kind];
    const inv = c.filter(x => x.label.includes("s") && x.label !== "f(k)" && x.label !== "f′(k)");
    const dep = c.filter(x => x.label.includes("δ"));
    const pts = [];
    const oldInv = inv[0].label, newInv = inv[inv.length - 1].label, oldDep = dep[0].label, newDep = dep[dep.length - 1].label;
    pts.push(mark(oldInv, oldDep, "k*"));
    pts.push(mark(newInv, newDep, "k*′"));
    const at = { "f(k)": 12, "f′(k)": 8, "sf(k)": 12.8, "s′f(k)": 12.8, "sf′(k)": 12.8, "δk": 10, "δ′k": 7 };
    return { ...base, curves: c.map(x => ({ ...x, labelAt: at[x.label] ?? 14 })), points: pts };
  }

  // Phillipskurva π mot u. kind: "up" | "down" | "flat" | "steep"
  function pc(kind) {
    const base = { type: "curves", xLabel: "u", yLabel: "π", x: [0, 14], y: [-4, 10], ticks: false };
    const PC = "8 - x";
    const sets = { up: "10 - x", down: "6 - x", flat: "5 - 0.5*x", steep: "14 - 2*x" };
    return { ...base, curves: [old("PC", PC), { label: "PC′", fn: sets[kind], color: "var(--c1)" }] };
  }

  const DUGGA = {
    id: "dugga-2",
    number: 2,
    title: "Dugga 2",
    description: "Omfattar föreläsning 8–14 (bokens kapitel 8–11 och 13–15): Mundell–Fleming, arbetsmarknaden och WS-PS, Phillipskurvan, IS-LM-PC, fakta om tillväxt, Solowmodellen samt humankapital och teknisk utveckling.",
    passMark: 6,
    exams: [
      /* ============================ A ============================ */
      {
        id: "ovning-a", title: "Övningsdugga A",
        summary: "Ränteparitet, WS-PS-figur, Phillipskurvan, utbudsstörning och Solowfigur.",
        questions: [
          {
            ch: 8,
            q: "Den förväntade framtida växelkursen är $\\bar E^e = 1$, den svenska räntan är 4 % och den utländska 2 %. Vad blir dagens växelkurs enligt det exakta ränteparitetsvillkoret $E_t = \\frac{1+i_t}{1+i^*_t}\\bar E^e$?",
            options: ["Ungefär 0,98, så kronan förväntas stärkas", "Ungefär 1,02, så kronan förväntas försvagas med ca 2 %", "Exakt 1, eftersom Ēᵉ = 1", "Ungefär 1,06"], answer: 1,
            explain: "$E = 1{,}04/1{,}02 \\approx 1{,}0196$. Eftersom Ēᵉ = 1 förväntas E falla med ca 2 %, vilket kompenserar för den högre svenska räntan.",
          },
          {
            ch: 8,
            q: "Ett land har fast växelkurs och fria kapitalrörelser. Omvärldens ränta höjs. Vad händer enligt Mundell–Fleming-modellen?",
            options: [
              "Centralbanken kan låta räntan vara oförändrad, och produktionen påverkas inte.",
              "Centralbanken måste höja räntan lika mycket, så produktionen minskar.",
              "Centralbanken måste sänka räntan för att stimulera ekonomin.",
              "Växelkursen apprecierar automatiskt.",
            ], answer: 1,
            explain: "Med fast växelkurs krävs $i = i^*$. Den högre räntan minskar investeringarna och Y. Penningpolitiken är inte självständig.",
          },
          {
            ch: 9,
            q: "Vilken av följande figurer visar effekten av en **höjd arbetslöshetsersättning** i WS-PS-modellen?",
            optionFigures: [wsps("PS-down"), wsps("WS-down"), wsps("PS-up"), wsps("WS-up")], answer: 3,
            explain: "Högre ersättning stärker löntagarnas förhandlingsposition, så z ökar och WS skiftar uppåt. Jämviktsarbetslösheten ökar medan reallönen (som bestäms av PS) är oförändrad.",
          },
          {
            ch: 9,
            q: "Företagen sätter priset med ett påslag på 25 % på marginalkostnaden: $P = (1 + m)W$ med m = 0,25. Vilken reallön ger prissättningssambandet?",
            options: ["1,25", "0,75", "0,8", "0,25"], answer: 2,
            explain: "$W/P = 1/(1 + m) = 1/1{,}25 = 0{,}8$.",
          },
          {
            ch: 10,
            q: "Phillipskurvan är $\\pi = \\pi^e + m + z - \\alpha u$ (i procent). Den förväntade inflationen är 2 %, m + z = 8 procentenheter, α = 2 och arbetslösheten är 5 %. Hur hög blir inflationen?",
            options: ["0 %", "2 %", "5 %", "−2 %"], answer: 0,
            explain: "$\\pi = 2 + 8 - 2 \\cdot 5 = 0$ %. Arbetslösheten (5 %) ligger över $u_n = 8/2 = 4$ %, så inflationen hamnar under den förväntade.",
          },
          {
            ch: 10,
            q: "Med m + z = 6 procentenheter och α = 1,5 i Phillipskurvan, hur hög är jämviktsarbetslösheten?",
            options: ["9 %", "4 %", "6 %", "1,5 %"], answer: 1,
            explain: "$u_n = (m + z)/\\alpha = 6/1{,}5 = 4$ %.",
          },
          {
            ch: 11,
            q: "En sluten ekonomi är i medelfristig jämvikt med Y = Yₙ. Sedan kommer en **negativ utbudsstörning** som minskar Yₙ. Vad bör centralbanken göra enligt IS-LM-PC-modellen, om finanspolitiken är oförändrad?",
            options: [
              "Sänka räntan, eftersom produktionen faller.",
              "Höja räntan till den nya, högre neutrala räntan, så att Y sjunker till det nya Yₙ och inflationen återgår till målet.",
              "Ingenting, eftersom inflationen inte påverkas.",
              "Höja räntan permanent över den neutrala räntan.",
            ], answer: 1,
            explain: "När Yₙ minskar blir BNP-gapet positivt vid oförändrat Y, så inflationen hamnar över målet. Det krävs en åtstramning: en högre styrränta (eller en finanspolitisk åtstramning).",
          },
          {
            ch: 12,
            q: "Vilken av följande produktionsfunktioner har **konstant skalavkastning**?",
            options: ["$F(K, N) = K^{0{,}5} N^{0{,}6}$", "$F(K, N) = K^{0{,}3} N^{0{,}7}$", "$F(K, N) = K \\cdot N$", "$F(K, N) = K^{0{,}2} N^{0{,}2}$"], answer: 1,
            explain: "Exponenterna måste summera till 1: $F(aK, aN) = a^{0{,}3+0{,}7} F(K, N) = aF(K, N)$.",
          },
          {
            ch: 13,
            q: "Vilken av följande figurer visar effekten av en **ökning av sparkvoten** i Solowmodellen?",
            optionFigures: [solow("d-up"), solow("s-up"), solow("s-down"), solow("tech-up")], answer: 1,
            explain: "En högre sparkvot vrider investeringskurvan sf(k) uppåt. Den skär δk vid ett högre k\\*. Produktionsfunktionen påverkas inte.",
          },
          {
            ch: 14,
            q: "Teknologin växer med 2 % och antalet sysselsatta med 1 % per år. Hur snabbt växer **produktionen per sysselsatt** när ekonomin har balanserad tillväxt?",
            options: ["0 %", "1 %", "2 %", "3 %"], answer: 2,
            explain: "Y växer med $g_A + g_N = 3$ % och N med 1 %, så Y/N växer med $g_A = 2$ %.",
          },
        ],
      },

      /* ============================ B ============================ */
      {
        id: "ovning-b", title: "Övningsdugga B",
        summary: "Penningpolitik vid flytande kurs, spekulation, AKU, accelererande inflation och Solowberäkningar.",
        questions: [
          {
            ch: 8,
            q: "Riksbanken höjer styrräntan, och växelkursen är flytande. Vilket påstående är korrekt enligt Mundell–Fleming-modellen (givet Ēᵉ)?",
            options: [
              "Y minskar, kronan deprecierar och nettoexporten ökar säkert.",
              "Y minskar och kronan apprecierar. Effekten på nettoexporten är oklar.",
              "Y ökar och kronan apprecierar.",
              "Y är oförändrad, men kronan apprecierar.",
            ], answer: 1,
            explain: "Högre ränta ger lägre investeringar och högre E. Lägre Y minskar importen, medan högre E minskar exporten. De två effekterna på NX drar åt olika håll.",
          },
          {
            ch: 8,
            q: "Ett land har fast växelkurs. Marknaden tror att det är 5 % sannolikhet för en devalvering på 20 % nästa dag. Hur mycket högre än omvärldens måste den inhemska räntan vara **per dag** för att placerare ska behålla den inhemska valutan?",
            options: ["0,25 procentenheter", "1 procentenhet", "5 procentenheter", "20 procentenheter"], answer: 1,
            explain: "Förväntad devalvering $= 0{,}05 \\times 20 = 1$ % per dag. Omräknat till årsränta blir det ungefär 3 700 %.",
          },
          {
            ch: 9,
            q: "Sara studerar på heltid. Hon har inget jobb, men har sökt aktivt under den senaste månaden och kan börja arbeta direkt. Hur räknas hon i SCB:s arbetskraftsundersökning?",
            options: ["Som ej i arbetskraften, eftersom hon studerar", "Som arbetslös", "Som sysselsatt", "Som NEET"], answer: 1,
            explain: "Det går att studera och vara arbetslös. Det som avgör är att man är utan arbete och aktivt söker ett.",
          },
          {
            ch: 9,
            q: "Vilken av följande figurer visar effekten av **minskad konkurrens på varumarknaden** (högre prispåslag m) i WS-PS-modellen?",
            optionFigures: [wsps("WS-up"), wsps("PS-up"), wsps("PS-down"), wsps("WS-down")], answer: 2,
            explain: "Högre m ger lägre $1/(1+m)$, så PS skiftar nedåt. Reallönen faller och jämviktsarbetslösheten ökar.",
          },
          {
            ch: 10,
            q: "Förväntningarna är $\\pi^e_t = \\pi_{t-1}$ (θ = 1). Förra årets inflation var 4 %, m + z = 6, α = 1 och arbetslösheten är 8 %. Hur hög blir inflationen i år?",
            options: ["2 %", "4 %", "6 %", "−2 %"], answer: 0,
            explain: "$\\pi_t = \\pi_{t-1} + m + z - \\alpha u_t = 4 + 6 - 8 = 2$ %. Arbetslösheten ligger över $u_n = 6$ %, så inflationen faller med 2 procentenheter.",
          },
          {
            ch: 10,
            q: "Vad menade Friedman och Phelps om sambandet mellan inflation och arbetslöshet?",
            options: [
              "Att man permanent kan sänka arbetslösheten genom att acceptera högre inflation.",
              "Att det saknas en stabil långsiktig avvägning, eftersom förväntningarna anpassas så att arbetslösheten i genomsnitt blir lika med jämviktsarbetslösheten.",
              "Att inflationen bara beror på penningmängden på kort sikt.",
              "Att Phillipskurvan alltid är horisontell.",
            ], answer: 1,
            explain: "Pris- och lönesättare låter sig inte luras på lång sikt. Försök att hålla u under $u_n$ leder till stigande inflation.",
          },
          {
            ch: 11,
            q: "Phillipskurvan i BNP-gapsform är $\\pi_t - \\bar\\pi = \\frac{\\alpha}{L}(Y_t - Y_n)$. Anta α = 1, L = 200 och att BNP-gapet $Y_t - Y_n$ är 6. Hur mycket avviker inflationen från målet?",
            options: ["Den är 3 procentenheter över målet.", "Den är 3 procentenheter under målet.", "Den är 6 procentenheter över målet.", "Den är lika med målet."], answer: 0,
            explain: "$\\frac{1}{200} \\cdot 6 = 0{,}03$, dvs. 3 procentenheter över målet.",
          },
          {
            ch: 12,
            q: "Produktionsfunktionen är $F(K, N) = \\sqrt K \\sqrt N$. Det finns K = 900 enheter kapital och N = 4 sysselsatta. Hur stor är produktionen per sysselsatt?",
            options: ["60", "15", "225", "30"], answer: 1,
            explain: "$Y/N = \\sqrt{K/N} = \\sqrt{225} = 15$. (Total produktion: $Y = 30 \\cdot 2 = 60$.)",
          },
          {
            ch: 13,
            q: "I Solowmodellen är $f(k) = \\sqrt k$, sparkvoten s = 0,25 och deprecieringstakten δ = 0,05. Hur stort är kapitalet per sysselsatt i det stationära läget?",
            options: ["5", "25", "0,2", "125"], answer: 1,
            explain: "$s\\sqrt{k^*} = \\delta k^* \\Rightarrow k^* = (s/\\delta)^2 = 5^2 = 25$. Produktionen är $y^* = 5$.",
          },
          {
            ch: 14,
            q: "Vad är syftet med patentsystemet enligt föreläsningen?",
            options: [
              "Att göra idéer rivaliserande.",
              "Att ge incitament till FoU genom att uppfinnaren tillfälligt kan utestänga andra. Det är en balansgång mellan monopolmakt och incitament.",
              "Att sänka priserna på nya produkter.",
              "Att se till att alla idéer produceras av universitet.",
            ], answer: 1,
            explain: "Patent gör en idé exkluderbar, så att företaget kan tjäna pengar på sin FoU.",
          },
        ],
      },

      /* ============================ C ============================ */
      {
        id: "ovning-c", title: "Övningsdugga C",
        summary: "IS i öppen ekonomi, WS-PS-beräkning, Phillipskurvfigur, undanträngning, neutral ränta och gyllene regeln.",
        questions: [
          {
            ch: 8,
            q: "Varför lutar IS-kurvan nedåt i Mundell–Fleming-modellen?",
            options: [
              "Enbart för att en högre ränta minskar investeringarna.",
              "För att en högre ränta minskar investeringarna och dessutom, via räntepariteten, ger en starkare valuta som minskar nettoexporten.",
              "För att en högre ränta ökar importen direkt.",
              "För att en högre produktion höjer räntan.",
            ], answer: 1,
            explain: "I den öppna ekonomin finns två kanaler från räntan till efterfrågan.",
          },
          {
            ch: 8,
            q: "Regeringen ökar G vid flytande växelkurs, och centralbanken håller räntan oförändrad. Vad händer på kort sikt enligt Mundell–Fleming (givet Ēᵉ)?",
            options: [
              "Y ökar, E är oförändrad och nettoexporten minskar.",
              "Y ökar, E stiger och nettoexporten ökar.",
              "Y är oförändrad, men E stiger.",
              "Y minskar och E faller.",
            ], answer: 0,
            explain: "Med oförändrad ränta ger räntepariteten oförändrad E. Högre Y ökar importen.",
          },
          {
            ch: 9,
            q: "Lönesättningen ges av $W/P = F(u, z) = 1{,}2 - 0{,}05u$ (u i procent) och prissättningen av $W/P = 1/(1 + m)$ med m = 0,25. Hur hög är jämviktsarbetslösheten?",
            options: ["4 %", "8 %", "12 %", "24 %"], answer: 1,
            explain: "$1/(1{,}25) = 0{,}8$. Då ger $1{,}2 - 0{,}05u_n = 0{,}8$ att $u_n = 0{,}4/0{,}05 = 8$ %.",
          },
          {
            ch: 10,
            q: "Vilken figur visar hur Phillipskurvan (π mot u) förändras när **den förväntade inflationen ökar**, allt annat lika?",
            optionFigures: [pc("down"), pc("flat"), pc("up"), pc("steep")], answer: 2,
            explain: "$\\pi = \\pi^e + m + z - \\alpha u$. Högre πᵉ flyttar hela kurvan parallellt uppåt. Lutningen (−α) är oförändrad.",
          },
          {
            ch: 10,
            q: "Inflationsförväntningarna är noll (Phillipskurvan version 1.0), och arbetslösheten ligger permanent **under** jämviktsarbetslösheten. Vad händer med inflationen?",
            options: [
              "Den ökar för varje år.",
              "Den är positiv men konstant: en stadig pris- och lönespiral.",
              "Den är noll.",
              "Den blir negativ.",
            ], answer: 1,
            explain: "$\\pi = m + z - \\alpha u > 0$ och konstant. Med θ = 1 (version 2.0) hade inflationen i stället ökat varje år.",
          },
          {
            ch: 11,
            q: "En öppen ekonomi med **fast växelkurs** är i jämvikt med Y = Yₙ. Sedan kommer en permanent finanspolitisk stimulans. Vad gäller på medellång sikt enligt IS-LM-PC-modellen?",
            options: [
              "Y är permanent högre än Yₙ, och inflationen ligger kvar över målet.",
              "Y = Yₙ, och nettoexporten har minskat lika mycket som finanspolitiken ökade efterfrågan (undanträngning).",
              "Centralbanken höjer räntan, så att Y = Yₙ.",
              "Den reala växelkursen har deprecierat.",
            ], answer: 1,
            explain: "Inflation över omvärldens ger en real appreciering, och NX faller tills IS är tillbaka i utgångsläget.",
          },
          {
            ch: 11,
            q: "IS-sambandet är $Y = (350 + G - 50(r + x))/0{,}4$ med G = 400 och riskpremien x = 1. Potentiell produktion är Yₙ = 1 500. Hur hög är den neutrala realräntan $r_n$?",
            options: ["1 %", "2 %", "3 %", "4 %"], answer: 1,
            explain: "$1500 \\cdot 0{,}4 = 600 = 750 - 50(r_n + 1)$ ger $r_n + 1 = 3$, alltså $r_n = 2$ %.",
          },
          {
            ch: 13,
            q: "I Solowmodellen med $f(k) = \\sqrt k$ ger gyllene regeln sparkvoten $s_G = 0{,}5$. Ett land har sparkvoten 0,6. Vad händer med den **stationära konsumtionen** per sysselsatt om sparkvoten sänks till 0,5?",
            options: [
              "Den minskar, eftersom produktionen minskar.",
              "Den ökar, eftersom landet sparar mer än gyllene regelns sparkvot.",
              "Den påverkas inte.",
              "Den blir noll.",
            ], answer: 1,
            explain: "$c^* = (1 - s)s/\\delta$: $0{,}4 \\cdot 0{,}6 = 0{,}24 < 0{,}5 \\cdot 0{,}5 = 0{,}25$ (delat med δ). Över $s_G$ ökar konsumtionen om man sparar mindre, trots att y\\* blir lägre.",
          },
          {
            ch: 14,
            q: "I Solowmodellen med teknisk utveckling ökar befolkningstillväxten $g_N$. Vad händer i det nya balanserade tillväxtläget?",
            options: [
              "k\\* = K/(AN) blir lägre, och tillväxttakten i Y/N är oförändrad (= g_A).",
              "k\\* blir högre, och Y/N växer snabbare.",
              "Y/N växer med g_A + g_N.",
              "Inget förändras.",
            ], answer: 0,
            explain: "Investeringsbehovet $(\\delta + g_A + g_N)k$ blir brantare, så k\\* minskar. På lång sikt växer Y/N fortfarande med $g_A$.",
          },
          {
            ch: 12,
            q: "Real BNP per capita i Japan var 2 879 dollar 1950 och 39 637 dollar 2019 (PPP, 2017 års priser), mot 15 734 respektive 63 393 i USA. Vad illustrerar detta?",
            options: [
              "Divergens: rika länder växer snabbare.",
              "Konvergens: landet med lägst BNP per capita från början växte snabbast.",
              "Att växelkurser avgör tillväxten.",
              "Att sparkvoten var lika i båda länderna.",
            ], answer: 1,
            explain: "Japan växte 13,8 gånger och USA 4,0 gånger.",
          },
        ],
      },

      /* ============================ D ============================ */
      {
        id: "ovning-d", title: "Övningsdugga D",
        summary: "Räntechocken 1992, WS-PS-figur, accelererande inflation, temporär räntesänkning, Solowdynamik och pensioner.",
        questions: [
          {
            ch: 8,
            q: "Den 16 september 1992 höjde Riksbanken styrräntan till 500 % per år. Ungefär hur mycket motsvarar det per dag?",
            options: ["0,5 %", "1,37 %", "5 %", "13,7 %"], answer: 1,
            explain: "$500/365 \\approx 1{,}37$ % per dag. Omräknat med ränta på ränta motsvarar det över 14 000 % per år.",
          },
          {
            ch: 8,
            q: "Vad krävs enligt Mundells teori om optimala valutaområden för att en gemensam valuta ska vara fördelaktig?",
            options: [
              "Att länderna har samma språk och samma skattesystem.",
              "Att ländernas konjunkturer är synkroniserade och att arbetskraften kan röra sig mellan länderna.",
              "Att länderna har hög inflation.",
              "Att länderna har stora handelsunderskott.",
            ], answer: 1,
            explain: "Då behövs ingen egen penningpolitik, och rörlig arbetskraft kan ersätta växelkursanpassningar.",
          },
          {
            ch: 9,
            q: "Vilken av följande figurer visar effekten av en **sänkt arbetslöshetsersättning** i WS-PS-modellen?",
            optionFigures: [wsps("WS-down"), wsps("PS-down"), wsps("WS-up"), wsps("PS-up")], answer: 0,
            explain: "Lägre ersättning försvagar löntagarnas förhandlingsposition (z minskar), så WS skiftar nedåt och jämviktsarbetslösheten minskar.",
          },
          {
            ch: 10,
            q: "I den förväntningsutvidgade Phillipskurvan (θ = 1) försöker regeringen hålla arbetslösheten permanent under $u_n$. Vad händer?",
            options: [
              "Inflationen stabiliseras på en högre nivå.",
              "Inflationen ökar år efter år (accelererar).",
              "Inflationen faller.",
              "Jämviktsarbetslösheten sjunker permanent.",
            ], answer: 1,
            explain: "$\\pi_t - \\pi_{t-1} = -\\alpha(u_t - u_n) > 0$ varje år så länge $u_t < u_n$.",
          },
          {
            ch: 10,
            q: "Vilken av följande förändringar **sänker** jämviktsarbetslösheten $u_n = (m + z)/\\alpha$?",
            options: [
              "Högre minimilöner (z ökar).",
              "Mindre konkurrens på varumarknaden (m ökar).",
              "Lönesättarna blir känsligare för arbetslöshet (α ökar).",
              "Sämre matchning mellan arbetslösa och lediga jobb (z ökar).",
            ], answer: 2,
            explain: "Ett större α i nämnaren ger ett lägre $u_n$. De andra alternativen höjer $u_n$.",
          },
          {
            ch: 11,
            q: "En centralbank i en öppen ekonomi med flytande växelkurs gör en **temporär** räntesänkning. Vad gäller på medellång sikt, när räntan är tillbaka på den neutrala nivån?",
            options: [
              "Y är permanent högre än Yₙ.",
              "Y = Yₙ och nettoexporten är som från början. Prisnivån har stigit och den nominella växelkursen deprecierat, men den reala växelkursen är oförändrad.",
              "Den reala växelkursen har deprecierat permanent.",
              "Inflationen ligger permanent över målet.",
            ], answer: 1,
            explain: "På kort sikt är penningpolitiken kraftfull, men på medellång sikt påverkas bara nominella variabler.",
          },
          {
            ch: 11,
            q: "Arbetskraften är L = 5 000 personer och jämviktsarbetslösheten är 6 %. Varje sysselsatt producerar en enhet. Hur stor är den potentiella produktionen?",
            options: ["300", "4 700", "5 000", "5 300"], answer: 1,
            explain: "$Y_n = L(1 - u_n) = 5000 \\cdot 0{,}94 = 4700$.",
          },
          {
            ch: 13,
            q: "I Solowmodellen är $f(k) = \\sqrt k$, s = 0,2 och δ = 0,1. Kapitalet per sysselsatt är i dag k = 9. Vad är $k$ nästa period, och vart är ekonomin på väg?",
            options: [
              "9,3, så k växer mot k\\* = 4.",
              "8,7, så k krymper mot k\\* = 4.",
              "9, eftersom ekonomin redan är i stationärt läge.",
              "9,6, så k växer mot k\\* = 16.",
            ], answer: 1,
            explain: "$k_{t+1} = k_t + s\\sqrt{k_t} - \\delta k_t = 9 + 0{,}6 - 0{,}9 = 8{,}7$. $k^* = (0{,}2/0{,}1)^2 = 4$.",
          },
          {
            ch: 13,
            q: "Ett land går från ett fonderat pensionssystem till ett **fördelningssystem** (pay-as-you-go). Vad händer enligt Solowmodellen?",
            options: [
              "Sparkvoten ökar, och k och y ökar.",
              "Sparkvoten minskar, och kapital och produktion per sysselsatt faller mot ett lägre stationärt läge. Den första pensionärsgenerationen får pensioner utan att ha betalat.",
              "Ingenting, eftersom pensionsavgifter är sparande.",
              "BNP per sysselsatt växer snabbare permanent.",
            ], answer: 1,
            explain: "I ett fördelningssystem investeras avgifterna inte, utan går direkt till dagens pensionärer.",
          },
          {
            ch: 14,
            q: "Vilken av följande figurer visar en **höjning av den tekniska nivån** (vid given sparkvot) i ett Solowdiagram med k på x-axeln?",
            optionFigures: [solow("s-down"), solow("d-up"), solow("s-up"), solow("tech-up")], answer: 3,
            explain: "Bättre teknik flyttar f(k) uppåt, och därmed även sf(k). Skärningen med δk hamnar vid ett högre k\\*. I figur c ändras bara sparkvoten, och f(k) är oförändrad.",
          },
        ],
      },
    ],
  };

  // Placera rätt svar på varierande positioner (a–d) i textfrågorna. null = rör inte (t.ex. figurfrågor).
  const PLACE = {
    "ovning-a": [1, 0, null, 2, 0, 0, 3, 3, null, 2],
    "ovning-b": [2, 1, 0, null, 0, 3, 0, 3, 1, 3],
    "ovning-c": [3, 0, 1, null, 1, 0, 2, 3, 0, 1],
    "ovning-d": [2, 1, null, 0, 2, 1, 2, 3, 0, null],
  };
  DUGGA.exams.forEach(ex => {
    (PLACE[ex.id] || []).forEach((target, i) => {
      const q = ex.questions[i];
      if (target == null || !q || !q.options || q.optionFigures) return;
      const o = q.options.slice();
      [o[q.answer], o[target]] = [o[target], o[q.answer]];
      q.options = o; q.answer = target;
    });
    ex.questions.sort((a, b) => a.ch - b.ch); // föreläsningsordning
  });
  registerDugga(DUGGA);
})();
