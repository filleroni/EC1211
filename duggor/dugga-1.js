(function () {
  /* ---------- figurhjälpare ---------- */
  const OLD = "var(--muted)";

  // IS-LM-figur med en förskjutning. kind: "IS-left" | "IS-right" | "LM-down" | "LM-up"
  function islm(kind) {
    const base = { type: "curves", xLabel: "Y", yLabel: "i", x: [0, 100], y: [0, 10], ticks: false };
    const IS = "9 - 0.08*x", ISl = "6.6 - 0.08*x", ISr = "11.4 - 0.08*x";
    if (kind === "IS-left") return { ...base,
      curves: [{ label: "IS", fn: IS, color: OLD, dashed: true }, { label: "IS′", fn: ISl, color: "var(--c1)" }, { label: "LM", fn: "4", color: "var(--c2)" }],
      arrows: [{ from: [45, 5.2], to: [22, 5.2] }] };
    if (kind === "IS-right") return { ...base,
      curves: [{ label: "IS", fn: IS, color: OLD, dashed: true }, { label: "IS′", fn: ISr, color: "var(--c1)", labelAt: 72 }, { label: "LM", fn: "4", color: "var(--c2)" }],
      arrows: [{ from: [30, 6.6], to: [58, 6.6] }] };
    if (kind === "LM-down") return { ...base,
      curves: [{ label: "IS", fn: IS, color: "var(--c1)" }, { label: "LM", fn: "6", color: OLD, dashed: true }, { label: "LM′", fn: "3", color: "var(--c2)" }],
      arrows: [{ from: [85, 5.7], to: [85, 3.4] }] };
    return { ...base,
      curves: [{ label: "IS", fn: IS, color: "var(--c1)" }, { label: "LM", fn: "3", color: OLD, dashed: true }, { label: "LM′", fn: "6", color: "var(--c2)" }],
      arrows: [{ from: [85, 3.3], to: [85, 5.6] }] };
  }

  // 45°-diagram för öppen ekonomi. Varje kurva är [etikett, uttryck]. marks: [[kurva1, kurva2, "Y₁"], …]
  function open45(curves, marks, max) {
    return {
      type: "curves", xLabel: "Y", yLabel: "Efterfrågan", x: [0, max], y: [0, max], ticks: false,
      curves: [{ label: "45°", fn: "x", color: "var(--ink)" }].concat(curves.map(([label, fn, style]) => ({ label, fn, labelAt: max * 0.03, ...(style || {}) }))),
      points: marks.map(([a, b, lab]) => ({ between: [a, b], label: lab, showLabel: false, xMark: lab, guides: "v", dot: false })),
    };
  }

  registerDugga({
    id: "dugga-1",
    number: 1,
    title: "Dugga 1",
    description: "Omfattar kapitel 1–7: BNP och makrovariabler, varumarknaden, penningmarknaden, IS-LM, räntor och banker, öppna marknader och varumarknaden i en öppen ekonomi.",
    passMark: 6,
    exams: [
      /* ============================ A ============================ */
      {
        id: "ovning-a", title: "Övningsdugga A",
        summary: "BNP-tillväxt, multiplikatorn, IS-LM-figurer och öppen ekonomi.",
        questions: [
          {
            ch: 1,
            q: `En ekonomi producerar två färdigvaror, bröd och kaffe:

| | 2024 antal | 2024 pris | 2025 antal | 2025 pris |
|---|---:|---:|---:|---:|
| Bröd | 100 | 20 | 110 | 22 |
| Kaffe | 50 | 40 | 50 | 44 |

Hur hög är tillväxten i **nominell** BNP mellan 2024 och 2025?`,
            options: ["10 %", "15,5 %", "5 %", "21 %"], answer: 1,
            explain: "Nominell BNP 2024: $100 \\cdot 20 + 50 \\cdot 40 = 4000$. 2025: $110 \\cdot 22 + 50 \\cdot 44 = 2420 + 2200 = 4620$. Tillväxt: $4620/4000 - 1 = 15{,}5$ %.",
          },
          {
            ch: 1,
            q: "I ekonomin i föregående fråga, hur hög är den **reala** BNP-tillväxten mätt i 2024 års priser?",
            options: ["5 %", "0 %", "10 %", "15,5 %"], answer: 0,
            explain: "Real BNP 2025 i 2024 års priser: $110 \\cdot 20 + 50 \\cdot 40 = 4200$. Tillväxt: $4200/4000 - 1 = 5$ %.",
          },
          {
            ch: 2,
            q: "Varuefterfrågan i en sluten ekonomi är $Z = c_0 + c_1(Y - T) + I + G$ med $c_0 = 100$, $c_1 = 0{,}8$, $I = 200$, $G = 300$ och $T = 100$. Hur mycket ändras jämviktsproduktionen Y om skatterna **höjs** med 10?",
            options: ["Y minskar med 50", "Y minskar med 40", "Y minskar med 8", "Y ökar med 40"], answer: 1,
            explain: "Den autonoma efterfrågan minskar med $c_1 \\cdot 10 = 8$. Multiplikatorn är $1/(1 - 0{,}8) = 5$, så $\\Delta Y = -5 \\cdot 8 = -40$.",
          },
          {
            ch: 1,
            q: "I ett land finns 9 miljoner sysselsatta och 1 miljon som saknar arbete och aktivt söker jobb. Dessutom finns 1 miljon som saknar arbete men inte söker. Hur hög är arbetslösheten?",
            options: ["10 %", "18,2 %", "11,1 %", "20 %"], answer: 0,
            explain: "De som inte söker arbete räknas inte till arbetskraften. $L = 9 + 1 = 10$ miljoner, så $u = 1/10 = 10$ %.",
          },
          {
            ch: 3,
            q: "Riksbanken genomför en expansiv öppen marknadsoperation. Vilket påstående är korrekt?",
            options: [
              "Riksbanken säljer obligationer, obligationspriset faller och räntan stiger.",
              "Riksbanken köper obligationer, obligationspriset stiger och räntan faller.",
              "Riksbanken köper obligationer, obligationspriset faller och räntan faller.",
              "Riksbanken säljer obligationer, penningmängden ökar och räntan faller.",
            ], answer: 1,
            explain: "Vid en expansiv operation köper Riksbanken obligationer och betalar med pengar, så penningmängden ökar. Den ökade efterfrågan driver upp obligationspriset, och eftersom $P_B = 1000/(1+i)$ faller räntan.",
          },
          {
            ch: 4,
            q: "Vilken av följande figurer visar effekten av en **minskning av den offentliga konsumtionen** i IS-LM-modellen?",
            optionFigures: [islm("LM-down"), islm("IS-right"), islm("IS-left"), islm("LM-up")], answer: 2,
            explain: "Lägre G minskar efterfrågan vid varje ränta, så IS-kurvan flyttas åt vänster. LM påverkas inte, eftersom centralbanken håller räntan oförändrad.",
          },
          {
            ch: 5,
            q: "Den nominella räntan är 3 % och den förväntade inflationen är 5 %. Hur hög är realräntan ungefär?",
            options: ["8 %", "2 %", "−2 %", "0,6 %"], answer: 2,
            explain: "$r \\approx i - \\pi^e = 3 - 5 = -2$ %.",
          },
          {
            ch: 7,
            q: "Figuren visar 45°-diagrammet för en öppen ekonomi. Från början är ekonomin i jämvikt vid Y₁ med balanserad handel (DD och ZZ skär varandra på 45°-linjen). Sedan **ökar den offentliga konsumtionen**, och DD och ZZ flyttas lika mycket uppåt till DD′ och ZZ′. Vilket påstående är korrekt?",
            figure: open45([
              ["DD", "450 + 0.7*x", { color: OLD, dashed: true }],
              ["ZZ", "750 + 0.5*x", { color: OLD, dashed: true }],
              ["DD′", "600 + 0.7*x", { color: "var(--c2)" }],
              ["ZZ′", "900 + 0.5*x", { color: "var(--c1)" }],
            ], [["ZZ", "45°", "Y₁"], ["ZZ′", "45°", "Y₂"]], 2500),
            options: [
              "BNP ökar från Y₁ till Y₂ och nettoexporten blir positiv.",
              "BNP ökar från Y₁ till Y₂ och nettoexporten blir negativ.",
              "BNP är oförändrad, men nettoexporten blir negativ.",
              "BNP ökar från Y₁ till Y₂, och den produktion som ger balanserad handel (Y_TB) ökar också till Y₂.",
            ], answer: 1,
            explain: "När DD och ZZ flyttas lika mycket ändras inte Y_TB (den ligger kvar vid Y₁). Den nya jämvikten Y₂ > Y_TB, och där ligger ZZ′ under DD′, så nettoexporten är negativ.",
          },
          {
            ch: 5,
            q: "En bank har tillgångar på 200 och eget kapital på 10. Vilket påstående är korrekt?",
            options: [
              "Hävstångsgraden är 5 % och kapitaltäckningen 20.",
              "Hävstångsgraden är 10 och kapitaltäckningen 10 %.",
              "Hävstångsgraden är 190 och kapitaltäckningen 10.",
              "Hävstångsgraden är 20 och kapitaltäckningen 5 %.",
            ], answer: 3,
            explain: "Hävstångsgrad = tillgångar/eget kapital = 200/10 = 20. Kapitaltäckning = eget kapital/tillgångar = 1/20 = 5 %.",
          },
          {
            ch: 6,
            q: "Den svenska räntan är 4 % och räntan i euroområdet är 2 %. Enligt öppen ränteparitet (med E = euro per krona), vad förväntar sig marknaden?",
            options: [
              "Att kronan stärks med ungefär 2 % under året.",
              "Att växelkursen är oförändrad.",
              "Att kronan försvagas med ungefär 2 % under året.",
              "Att kronan försvagas med ungefär 6 % under året.",
            ], answer: 2,
            explain: "$i \\approx i^* - (E^e - E)/E$ ger $(E^e - E)/E \\approx 2 - 4 = -2$ %. E förväntas alltså falla med 2 %, dvs. kronan förväntas försvagas. Det kompenserar för den högre svenska räntan.",
          },
        ],
      },

      /* ============================ B ============================ */
      {
        id: "ovning-b", title: "Övningsdugga B",
        summary: "Förädlingsvärde, deflatorn, penningpolitik, riskpremie och växelkurser.",
        questions: [
          {
            ch: 1,
            q: `En ekonomi består av tre företag. Gruvan säljer malm till stålverket, stålverket säljer stål till bilfabriken, och bilfabriken säljer bilar till hushållen.

| | Gruva | Stålverk | Bilfabrik |
|---|---:|---:|---:|
| Försäljningsintäkter | 300 | 700 | 1000 |
| Löner | 250 | 300 | 200 |
| Inköp av insatsvaror | 0 | 300 | 700 |
| Vinst | 50 | 100 | 100 |

Hur stor är BNP?`,
            options: ["2000", "1000", "750", "Det går inte att beräkna utan priserna på de enskilda varorna."], answer: 1,
            explain: "Bara bilarna är färdigvaror: BNP = 1000. Summan av förädlingsvärden ger samma sak: $300 + (700 - 300) + (1000 - 700) = 1000$. Summan av inkomster likaså: löner $750$ + vinster $250 = 1000$.",
          },
          {
            ch: 1,
            q: "Nominell BNP är 5 500 och real BNP (i basårets priser) är 5 000. Vilket påstående om BNP-deflatorn är korrekt?",
            options: [
              "Deflatorn är 0,91, så priserna har fallit med 9 % sedan basåret.",
              "Deflatorn är 500, dvs. skillnaden mellan nominell och real BNP.",
              "Deflatorn är 1,10, så produktionens priser har stigit med 10 %.",
              "Deflatorn mäter levnadskostnaderna och är samma sak som KPI.",
            ], answer: 2,
            explain: "$P = PY/Y = 5500/5000 = 1{,}10$. Deflatorn mäter prisnivån på det som produceras, inte på det som konsumeras (KPI).",
          },
          {
            ch: 2,
            q: `Analysera följande påståenden om den enkla modellen för varumarknaden i en sluten ekonomi, där $0 < c_1 < 1$:

1. Multiplikatorn $1/(1 - c_1)$ är större än 1.
2. En höjning av skatterna T ökar jämviktsproduktionen.`,
            options: ["Endast påstående 1 är riktigt.", "Endast påstående 2 är riktigt.", "Båda påståendena är riktiga.", "Inget påstående är riktigt."], answer: 0,
            explain: "När $0 < c_1 < 1$ är $1/(1 - c_1) > 1$. En skattehöjning minskar den disponibla inkomsten och konsumtionen, så Y minskar.",
          },
          {
            ch: 4,
            q: "Vilken av följande figurer visar en **penningpolitisk stimulans** i IS-LM-modellen?",
            optionFigures: [islm("IS-right"), islm("LM-down"), islm("LM-up"), islm("IS-left")], answer: 1,
            explain: "En penningpolitisk stimulans innebär en lägre styrränta, så LM flyttas nedåt. Y ökar längs IS-kurvan.",
          },
          {
            ch: 4,
            q: "Regeringen ökar den offentliga konsumtionen, och Riksbanken låter styrräntan vara oförändrad. Vad händer med penningmängden i IS-LM-modellen?",
            options: [
              "Den ökar.",
              "Den minskar.",
              "Den är oförändrad, eftersom räntan är oförändrad.",
              "Det går inte att avgöra, eftersom penningmängden inte syns i IS-LM-diagrammet.",
            ], answer: 0,
            explain: "Högre G ger högre Y och därmed högre efterfrågan på pengar. För att räntan ska vara oförändrad måste Riksbanken öka penningmängden.",
          },
          {
            ch: 3,
            q: "Den nominella inkomsten ökar, och Riksbanken håller **penningmängden** konstant. Vad händer på penningmarknaden?",
            options: [
              "Efterfrågan på pengar minskar och räntan faller.",
              "Efterfrågan på pengar ökar och räntan faller.",
              "Efterfrågan på pengar ökar och räntan stiger.",
              "Ingenting, eftersom penningefterfrågan bara beror på räntan.",
            ], answer: 2,
            explain: "$M^d = PY \\cdot L(i)$. Högre PY flyttar efterfrågekurvan åt höger, och med oförändrat utbud måste räntan stiga.",
          },
          {
            ch: 5,
            q: "Den riskfria räntan är 2 % och sannolikheten att en låntagare inte betalar tillbaka är 10 %. Hur stor riskpremie krävs för att långivaren ska få samma förväntade avkastning som med den riskfria räntan?",
            options: ["10 procentenheter", "11,3 procentenheter", "12 procentenheter", "2,2 procentenheter"], answer: 1,
            explain: "$x = \\frac{p}{1-p}(1+i) = \\frac{0{,}1}{0{,}9} \\cdot 1{,}02 \\approx 0{,}113$.",
          },
          {
            ch: 6,
            q: "Priset på en euro stiger från 11,0 till 11,5 kronor. Inflationen är ungefär lika hög i Sverige och i euroområdet. Vilket påstående är korrekt?",
            options: [
              "Kronan har stärkts, dvs. apprecierat nominellt. Den reala växelkursen har deprecierat.",
              "Kronan har stärkts, dvs. apprecierat både nominellt och realt.",
              "Kronan har försvagats, dvs. deprecierat nominellt. Den reala växelkursen har apprecierat.",
              "Kronan har försvagats, dvs. deprecierat både nominellt och realt.",
            ], answer: 3,
            explain: "Utländsk valuta har blivit dyrare, så E (euro per krona) har fallit. Det är en nominell depreciering. Eftersom P/P* är ungefär oförändrad faller också $\\varepsilon = EP/P^*$.",
          },
          {
            ch: 7,
            q: "Figuren visar en öppen ekonomi som från början är i jämvikt vid Y₁ med balanserad handel. Sedan **ökar den utländska inkomsten Y\\***, och ZZ flyttas till ZZ′. Vilket påstående är korrekt?",
            figure: open45([
              ["DD", "450 + 0.7*x", { color: "var(--c2)" }],
              ["ZZ", "750 + 0.5*x", { color: OLD, dashed: true }],
              ["ZZ′", "900 + 0.5*x", { color: "var(--c1)" }],
            ], [["ZZ", "45°", "Y₁"], ["ZZ′", "45°", "Y₂"], ["ZZ′", "DD", "Y₃"]], 2600),
            options: [
              "BNP ökar från Y₁ till Y₃ och nettoexporten blir positiv.",
              "BNP ökar från Y₁ till Y₂ och nettoexporten blir positiv.",
              "BNP ökar från Y₁ till Y₂ och nettoexporten blir negativ.",
              "BNP ökar från Y₁ till Y₃ och nettoexporten blir noll.",
            ], answer: 1,
            explain: "Den nya jämvikten ligger där ZZ′ skär 45°-linjen (Y₂). Y₃ är den nya produktionsnivån som ger balanserad handel. Eftersom Y₂ < Y₃ ligger ZZ′ över DD i jämvikten, så nettoexporten är positiv.",
          },
          {
            ch: 7,
            q: "I en öppen ekonomi är det privata sparandet 300, det offentliga sparandet (T − G) −50 och investeringarna 200. Hur stor är bytesbalansen?",
            options: ["50", "450", "−50", "150"], answer: 0,
            explain: "Privat sparande + offentligt sparande − investeringar = bytesbalansen: $300 - 50 - 200 = 50$.",
          },
        ],
      },

      /* ============================ C ============================ */
      {
        id: "ovning-c", title: "Övningsdugga C",
        summary: "70-regeln, Okuns lag, jämvikts-Y, riskpremie i IS-LM, räntegolv och Marshall–Lerner.",
        questions: [
          {
            ch: 1,
            q: "Real BNP per capita växer med 2,5 % per år. Ungefär hur lång tid tar det innan den har fördubblats?",
            options: ["14 år", "25 år", "28 år", "40 år"], answer: 2,
            explain: "Enligt 70-regeln: $70/2{,}5 = 28$ år.",
          },
          {
            ch: 1,
            q: "Okuns lag i ett land ges av $u_t - u_{t-1} = -0{,}5\\,(g_t - 2)$, där $g_t$ är BNP-tillväxten i procent. Vad händer med arbetslösheten om BNP växer med 4 %?",
            options: ["Den ökar med 1 procentenhet.", "Den minskar med 2 procentenheter.", "Den är oförändrad.", "Den minskar med 1 procentenhet."], answer: 3,
            explain: "$-0{,}5 \\cdot (4 - 2) = -1$. Arbetslösheten minskar med 1 procentenhet.",
          },
          {
            ch: 2,
            q: "I en sluten ekonomi gäller $C = 50 + 0{,}6(Y - T)$, $I = 150$, $G = 200$ och $T = 100$. Hur stor är jämviktsproduktionen?",
            options: ["850", "1000", "340", "600"], answer: 0,
            explain: "$Y = \\frac{1}{1 - 0{,}6}(50 + 150 + 200 - 0{,}6 \\cdot 100) = 2{,}5 \\cdot 340 = 850$.",
          },
          {
            ch: 4,
            q: "Vilken av följande förändringar flyttar IS-kurvan åt **höger**?",
            options: [
              "En sänkning av styrräntan.",
              "En höjning av skatterna.",
              "En ökning av G.",
              "En ökning av penningmängden.",
            ], answer: 2,
            explain: "Högre G ökar efterfrågan vid varje ränta. En räntesänkning ger en rörelse längs IS-kurvan (LM flyttas), och en skattehöjning flyttar IS åt vänster.",
          },
          {
            ch: 3,
            q: "Riksbanken säljer statsobligationer på den öppna marknaden. Vad händer?",
            options: [
              "Penningmängden ökar och räntan faller.",
              "Penningmängden minskar, obligationspriset faller och räntan stiger.",
              "Penningmängden minskar, obligationspriset stiger och räntan faller.",
              "Penningmängden påverkas inte, eftersom obligationer inte är pengar.",
            ], answer: 1,
            explain: "Köparna betalar med pengar, så penningmängden minskar (en kontraktiv operation). Det ökade utbudet av obligationer pressar priset, och ett lägre pris betyder högre ränta.",
          },
          {
            ch: 5,
            q: "Vilken figur visar effekten av en **ökning av riskpremien x** i den utvidgade IS-LM-modellen, där centralbanken håller den reala styrräntan oförändrad?",
            optionFigures: [islm("LM-up"), islm("IS-right"), islm("LM-down"), islm("IS-left")], answer: 3,
            explain: "Riskpremien finns i IS-sambandet: $Y = C(Y-T) + I(Y, r + x) + G$. Högre x ger högre låneränta för företagen, lägre investeringar och lägre efterfrågan vid varje styrränta. IS flyttas åt vänster.",
          },
          {
            ch: 5,
            q: "Den nominella styrräntan kan inte sänkas under −0,5 %, och hushållen förväntar sig en deflation på 1 %. Vilken är den lägsta reala styrränta centralbanken kan åstadkomma?",
            options: ["−1,5 %", "−0,5 %", "0,5 %", "1 %"], answer: 2,
            explain: "$r = i - \\pi^e \\geq -0{,}5 - (-1) = 0{,}5$ %. Med deflationsförväntningar blir golvet för realräntan positivt.",
          },
          {
            ch: 6,
            q: "Den nominella växelkursen (euro per krona) är oförändrad. Under året stiger priserna med 5 % i Sverige och med 2 % i euroområdet. Vad händer med den reala växelkursen $\\varepsilon = EP/P^*$?",
            options: [
              "Den deprecierar med ungefär 3 %.",
              "Den apprecierar med ungefär 3 %.",
              "Den är oförändrad, eftersom E är oförändrad.",
              "Den apprecierar med ungefär 7 %.",
            ], answer: 1,
            explain: "P/P* ökar med ungefär $5 - 2 = 3$ %. Svenska varor blir alltså ungefär 3 % dyrare relativt utländska.",
          },
          {
            ch: 7,
            q: "Antag att export- och importvolymerna inte reagerar alls på relativpriser på mycket kort sikt. Vad händer då med nettoexporten $NX = X - IM/\\varepsilon$ på mycket kort sikt om den reala växelkursen **deprecierar** (ε faller)?",
            options: [
              "Nettoexporten ökar, eftersom exporten blir billigare för utlandet.",
              "Nettoexporten minskar, eftersom importen blir dyrare i inhemska varor.",
              "Nettoexporten påverkas inte, eftersom volymerna är oförändrade.",
              "Nettoexporten ökar, eftersom importvolymen minskar direkt.",
            ], answer: 1,
            explain: "Om volymerna är fasta är X och IM oförändrade. IM/ε ökar när ε faller, så NX minskar. Marshall–Lerner-villkoret är alltså inte uppfyllt på så kort sikt.",
          },
          {
            ch: 5,
            q: "Varför är banker sårbara för bankrusningar?",
            options: [
              "För att deras tillgångar är mer likvida än deras skulder.",
              "För att illikvida lån finansieras med insättningar som kan tas ut direkt.",
              "För att de är skyldiga att hålla 100 % reserver hos Riksbanken.",
              "För att centralbanken bestämmer deras utlåningsränta.",
            ], answer: 1,
            explain: "Om många insättare vill ta ut sina pengar samtidigt måste banken sälja illikvida tillgångar till pressade priser (fire sales). Det kan få även en sund bank att falla.",
          },
        ],
      },

      /* ============================ D ============================ */
      {
        id: "ovning-d", title: "Övningsdugga D",
        summary: "KPI och deflator, sparande = investeringar, räntehöjning, hävstång, ränteparitet och BNI.",
        questions: [
          {
            ch: 1,
            q: "Ett företag säljer varor för 500. Det köper insatsvaror för 200 och betalar 250 i löner. Hur stort är företagets förädlingsvärde?",
            options: ["50", "250", "300", "500"], answer: 2,
            explain: "Förädlingsvärde = produktionsvärde − insatsvaror = $500 - 200 = 300$. Det fördelas på löner (250) och vinst (50).",
          },
          {
            ch: 1,
            q: "Priset på importerade bilar stiger kraftigt, medan priserna på allt som produceras i Sverige är oförändrade. Vad händer, allt annat lika?",
            options: [
              "Både KPI och BNP-deflatorn stiger lika mycket.",
              "BNP-deflatorn stiger men inte KPI.",
              "KPI stiger men inte BNP-deflatorn.",
              "Varken KPI eller BNP-deflatorn påverkas.",
            ], answer: 2,
            explain: "KPI mäter priserna på det som konsumeras, inklusive importvaror. BNP-deflatorn mäter priserna på det som produceras i landet.",
          },
          {
            ch: 2,
            q: "En sluten ekonomi är i jämvikt med Y = 1000, C = 600, G = 250 och T = 200. Hur stora är investeringarna?",
            options: ["100", "150", "200", "400"], answer: 1,
            explain: "$I = Y - C - G = 1000 - 600 - 250 = 150$. Det stämmer med sparande = investeringar: privat sparande $Y - T - C = 200$ plus offentligt sparande $T - G = -50$ ger 150.",
          },
          {
            ch: 4,
            q: "Vilken av följande figurer visar en **finanspolitisk stimulans** i IS-LM-modellen?",
            optionFigures: [islm("IS-right"), islm("LM-up"), islm("IS-left"), islm("LM-down")], answer: 0,
            explain: "Högre G eller lägre T ökar efterfrågan vid varje ränta, så IS-kurvan flyttas åt höger.",
          },
          {
            ch: 4,
            q: "Riksbanken höjer styrräntan. Vad händer i IS-LM-modellen?",
            options: [
              "LM flyttas uppåt. Y minskar, och penningmängden minskar.",
              "IS flyttas åt vänster. Y minskar, och räntan är oförändrad.",
              "LM flyttas uppåt. Y ökar, och penningmängden ökar.",
              "LM flyttas nedåt. Y minskar, och penningmängden minskar.",
            ], answer: 0,
            explain: "En högre ränta flyttar LM uppåt. Investeringarna faller och Y minskar längs IS. För att upprätthålla den högre räntan måste penningmängden minska.",
          },
          {
            ch: 3,
            q: "Vad menas med en likviditetsfälla?",
            options: [
              "Att bankerna inte har tillräckligt med reserver.",
              "Att räntan är vid sitt golv, så mer pengar inte sänker den.",
              "Att centralbanken inte kan öka penningmängden mer.",
              "Att hushållen inte vill hålla några pengar alls.",
            ], answer: 1,
            explain: "När räntan är noll finns ingen alternativkostnad för att hålla pengar. Efterfrågan på pengar blir horisontell, och mer pengar sänker inte räntan.",
          },
          {
            ch: 5,
            q: "En bank lånar ut 100 till 4 % ränta. Den finansierar sig med inlåning på 95 till 3 % ränta och med 5 i eget kapital. Hur hög är avkastningen på det egna kapitalet?",
            options: ["1 %", "4 %", "11,5 %", "23 %"], answer: 3,
            explain: "Vinst: $0{,}04 \\cdot 100 - 0{,}03 \\cdot 95 = 4 - 2{,}85 = 1{,}15$. Avkastning på eget kapital: $1{,}15/5 = 23$ %. Den höga hävstången (20) ger hög avkastning men liten buffert mot förluster.",
          },
          {
            ch: 6,
            q: "Räntan i euroområdet är 3 %, och marknaden förväntar sig att kronan stärks med 1 % mot euron under året. Vilken svensk ränta ger ungefär öppen ränteparitet?",
            options: ["1 %", "2 %", "3 %", "4 %"], answer: 1,
            explain: "$i \\approx i^* - (E^e - E)/E = 3 - 1 = 2$ %. Placerare i kronor får 1 % i valutavinst, så de godtar en lägre ränta.",
          },
          {
            ch: 7,
            q: "I en öppen ekonomi ökar den offentliga konsumtionen, och växelkursen är oförändrad. Vad händer med den produktionsnivå som ger balanserad handel, Y_TB?",
            options: [
              "Den ökar lika mycket som Y, eftersom importen ökar.",
              "Den minskar, eftersom handelsbalansen försämras.",
              "Den är oförändrad, eftersom DD och ZZ flyttas lika mycket.",
              "Den ökar mer än Y, eftersom ZZ flyttas mer än DD.",
            ], answer: 2,
            explain: "G finns i både DD och ZZ. Avståndet mellan dem (NX) vid ett givet Y ändras inte, så de skär varandra vid samma Y som tidigare.",
          },
          {
            ch: 6,
            q: "Sverige får mer kapitalavkastning från utlandet än vad utländska ägare får från Sverige. Vilket påstående är korrekt, allt annat lika?",
            options: [
              "BNI är större än BNP.",
              "BNP är större än BNI.",
              "BNP och BNI är alltid lika stora.",
              "Kapitalavkastning ingår varken i BNP eller i BNI.",
            ], answer: 0,
            explain: "BNI = BNP + nettoinkomster från utlandet. Om de är positiva är BNI större än BNP.",
          },
        ],
      },
    ],
  });
})();
