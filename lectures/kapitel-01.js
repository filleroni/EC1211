registerLecture({
  id: "kapitel-1",
  number: 1,
  title: "Kapitel 1: En rundtur i makroekonomin",
  summary: "Grundbegrepp, hur BNP mäts, nominell och real BNP, konjunkturer, arbetslöshet, inflation samt Okuns lag och Phillipskurvan.",
  tags: ["BNP", "Arbetslöshet", "Inflation", "Okuns lag", "Phillipskurvan"],

  sections: [
    {
      heading: "Förkunskaper",
      body: `Kursen kräver ingen avancerad matematik, men följande bör du kunna:

- Vad en **tillväxttakt** är (procentuell förändring per period).
- **Räta linjens ekvation** $y = a + bx$: $a$ är interceptet och $b$ är lutningen.
- Lösa **linjära ekvationer**, t.ex. lösa ut $x$ ur $y = a(b - x)$, vilket ger $x = b - y/a$.
- Lösa **linjära ekvationssystem** med två ekvationer, t.ex. $y = a(b - x)$ och $x = c(d + y)$.
- Förstå funktioner som $Y = F(X)$ och $Z = F(K, L)$, och vad det betyder att $F$ är **ökande** i $K$ och $L$ (mer kapital eller arbete ger mer produktion).
- Vad en **log-skala** är: på en log-skala blir konstant procentuell tillväxt en rät linje, vilket gör det lätt att jämföra tillväxttakter över lång tid.`,
    },
    {
      heading: "Viktiga begrepp i modern makroekonomi",
      body: `Fyra idéer återkommer genom hela kursen:

1. **Dubbelriktade (cirkulära) orsakssamband.** Produktion → sysselsättning → inkomster → efterfrågan → produktion. Variablerna påverkar varandra i en cirkel. Det är just detta som modellen i kapitel 2 fångar.
2. **Allmän jämvikt.** Det som händer på en marknad påverkar ofta priser och beteenden på andra marknader.
3. **Rationellt beteende.** Individer gör (i genomsnitt) inte slumpmässiga utan optimerande val, och valen påverkas av ändrade incitament.
4. **Empirisk koppling.** Teorierna ska kunna prövas mot data.

### Tre viktiga distinktioner

| Distinktion | Innebörd |
|---|---|
| **Teori – verklighet** | En modell är som en guidebok som hjälper oss att skapa en bild av verkligheten. Men modell ≠ verklighet. |
| **Positiv – normativ** | *Positiv* analys beskriver hur det faktiskt är. *Normativ* analys handlar om hur det borde vara, givet vissa mål. |
| **Exogen – endogen** | *Exogena* variabler tas som givna i modellen. *Endogena* variabler förklaras inom modellen. |`,
      takeaway: "”Höjd skatt minskar konsumtionen” är ett positivt påstående (det kan prövas). ”Skatten borde höjas” är normativt.",
    },
    {
      heading: "Tre centrala variabler och tidshorisonter",
      body: `De tre viktigaste makrovariablerna är:

- **BNP och BNP-tillväxt.** BNP mäter värdet av ekonomins samlade produktion av varor och tjänster och är lika med de samlade inkomsterna.
- **Arbetslöshet.** Den kan definieras på olika sätt, t.ex. öppen arbetslöshet eller inklusive personer i arbetsmarknadspolitiska åtgärder.
- **Inflation.** Förändringstakten i prisnivån, mätt med prisindex (oftast konsumentprisindex). Prisstabilitet är ett viktigt mål för den ekonomiska politiken.

### Hur bestäms BNP? Kursen i superkort sammanfattning

| Tidshorisont | Vad bestämmer BNP? |
|---|---|
| **Kort sikt** (upp till ett par år) | Främst **efterfrågan** på varor och tjänster |
| **Medellång sikt** (ca 3–10 år) | BNP rör sig mot **potentiell produktion**, som bestäms av teknologi, kapitalstock och den sysselsatta arbetskraftens storlek och kvalitet |
| **Lång sikt** (flera decennier) | **Kapitalackumulation, teknologisk utveckling och befolkning**, som i sin tur påverkas av sparande, investeringsklimat, utbildning, forskning och politisk stabilitet |`,
    },
    {
      heading: "Tre sätt att mäta BNP",
      body: `Alla tre sätten ger **samma resultat**. Föreläsningens exempel med ett stålföretag och en bilfabrik:

| | Företag 1 (stål) | Företag 2 (bilar) |
|---|---:|---:|
| Försäljningsintäkter | 100 | 200 |
| Löner | 80 | 70 |
| Inköp av stål | – | 100 |
| Vinst | 20 | 30 |

**1. Värdet av färdigvaror (slutlig användning).**
En *färdigvara* är avsedd för slutlig konsumtion eller investering (en hamburgare, en verkstadsmaskin). En *insatsvara* används för att producera andra varor (stålet). Bara bilarna är färdigvaror, så **BNP = 200**.
Om insatsvarorna räknades med skulle det bli **dubbelräkning**. BNP skulle då bero på om produktionen sker i ett eller flera företag.

**2. Summan av förädlingsvärden.**
Förädlingsvärde = värdet av produktionen − värdet av insatsvarorna.
Stålföretaget: $100 - 0 = 100$. Bilföretaget: $200 - 100 = 100$. **BNP = 100 + 100 = 200.**

**3. Summan av inkomster.**
Alla inkomster till arbete (löner) och kapital (vinster och räntor):
Löner $80 + 70 = 150$, vinster $20 + 30 = 50$. **BNP = 150 + 50 = 200.**`,
      takeaway: "Produktion = förädlingsvärde = inkomster. Det som produceras genererar exakt lika mycket inkomster.",
    },
    {
      heading: "Nominell och real BNP",
      body: `- **Nominell BNP** ($P Y$, BNP i löpande priser) värderar varorna till deras aktuella marknadspriser. Den ökar dels för att det produceras **mer**, dels för att **priserna stiger**.
- **Real BNP** ($Y$, BNP i fasta priser) värderar alla varor till priserna från ett och samma basår. Då rensas prisförändringarna bort.

Exempel med en enda vara (bilar). Real BNP beräknas i 2021 års priser:

| År | Antal bilar | Löpande pris | Nominell BNP | Real BNP (2021 års priser) |
|---|---:|---:|---:|---:|
| 2020 | 10 | 200 000 | 2 000 000 | 2 400 000 |
| 2021 | 12 | 240 000 | 2 880 000 | 2 880 000 |
| 2022 | 13 | 260 000 | 3 380 000 | 3 120 000 |

I verkligheten finns många varor, men principen är densamma. Vi antar också att **kvaliteten** är oförändrad. I praktiken måste man ta hänsyn till kvalitetsförändringar, och de är svåra att mäta.`,
      graphs: [
        {
          type: "series", bars: true,
          title: "Nominell och real BNP i bilexemplet",
          categories: ["2020", "2021", "2022"],
          yLabel: "Kronor (miljoner)", y: [0, 3.6],
          series: [
            { label: "Nominell BNP (löpande priser)", data: [[0, 2.0], [1, 2.88], [2, 3.38]] },
            { label: "Real BNP (2021 års priser)", data: [[0, 2.4], [1, 2.88], [2, 3.12]] },
          ],
          caption: "I basåret 2021 är nominell och real BNP lika stora. Nominell BNP växer snabbare än real BNP eftersom priserna stiger. Mellan 2021 och 2022 växte nominell BNP med 17,4 %, men real BNP bara med 8,3 %.",
        },
      ],
    },
    {
      heading: "70-regeln",
      body: `Om något växer med $x$ % per år tar det **ungefär $70/x$ år** innan det har fördubblats.

- Med 1 % tillväxt per år tar en fördubbling ca 70 år.
- På samma 70 år sker en **fyrdubbling** vid 2 % tillväxt och en **åttadubbling** vid 3 %.

Små skillnader i tillväxttakt ger alltså enorma skillnader i levnadsstandard på lång sikt. Dra i reglaget och jämför 70-regeln med den exakta fördubblingstiden.`,
      graphs: [
        {
          type: "curves",
          title: "Fördubblingstid vid olika tillväxttakter",
          xLabel: "År", yLabel: "BNP-index (startår = 100)",
          x: [0, 100], y: [0, 820],
          params: { g: { label: "Tillväxttakt g (% per år)", min: 0.5, max: 7, step: 0.1, value: 2 } },
          curves: [
            { label: "BNP", fn: "100*pow(1 + g/100, x)", ghost: true },
            { label: "Fördubbling", fn: "200", dashed: true },
            { label: "70/g", xAt: "70/g", dashed: true },
          ],
          points: [{ between: ["BNP", "Fördubbling"], label: "D", guides: false }],
          readout: "Exakt fördubblingstid: {D.x} år · 70-regeln: {=70/g} år · Index efter 70 år: {=100*pow(1+g/100,70)}",
          caption: "Den lodräta linjen visar 70-regelns uppskattning och punkten D den exakta fördubblingen. För tillväxttakter på några procent ligger de mycket nära varandra.",
        },
      ],
    },
    {
      heading: "Konjunkturer",
      body: `- **Högkonjunktur:** BNP är högre än normalt, dvs. ligger **över sin trend**.
- **Lågkonjunktur:** BNP är lägre än normalt, dvs. ligger **under sin trend**.
- **Expansion:** en period då real BNP växer (snabbare än normalt).
- **Recession:** en period då real BNP faller.
- **Depression:** en särskilt lång period med låg tillväxt och hög arbetslöshet.

Vad ”normalt” och ”trend” betyder mer exakt återkommer vi till senare i kursen. Figuren nedan är en stiliserad illustration.`,
      graphs: [
        {
          type: "curves",
          title: "Stiliserade konjunkturcykler kring en trend",
          xLabel: "År", yLabel: "Real BNP (index)",
          x: [0, 20], y: [85, 195],
          params: {
            g: { label: "Trendtillväxt (% per år)", min: 0, max: 3, step: 0.1, value: 2 },
            a: { label: "Konjunktursvängningarnas storlek (%)", min: 0, max: 6, step: 0.5, value: 3 },
            T: { label: "Cykelns längd (år)", min: 4, max: 12, step: 0.5, value: 8 },
          },
          curves: [
            { label: "Trend", fn: "100*pow(1 + g/100, x)", dashed: true },
            { label: "Faktisk BNP", fn: "100*pow(1 + g/100, x)*(1 + a/100*sin(2*PI*x/T))" },
          ],
          caption: "Där den faktiska BNP-kurvan ligger över trenden är det högkonjunktur, och där den ligger under är det lågkonjunktur. Om trendtillväxten är låg och svängningarna stora faller real BNP periodvis, och då är det recession.",
        },
      ],
    },
    {
      heading: "Arbetslöshet",
      body: `**Arbetskraften** består av de sysselsatta och de arbetslösa:
$$L = N + U$$
**Arbetslöshetstalet** är andelen arbetslösa i arbetskraften:
$$u = \\frac{U}{L}$$

Bara den som **aktivt söker arbete** räknas som arbetslös. Den som saknar jobb men inte söker räknas som **”ej i arbetskraften”**.

**Varför bryr vi oss om arbetslösheten?** Den påverkar de arbetslösas välfärd direkt genom förlorad inkomst och sämre hälsa. Den är också en signal om att ekonomins resurser inte utnyttjas fullt ut.`,
    },
    {
      heading: "Inflation och prisindex",
      body: `**Inflation** är en generell och ihållande uppgång i priserna på varor och tjänster. **Deflation** (negativ inflation) är en generell och ihållande nedgång i priserna.

### BNP-deflatorn
BNP-deflatorn beskriver prisnivån på det som **produceras**. Den är ett index som sätts till 1 (eller 100) ett visst basår:
$$P_t = \\frac{\\text{Nominell BNP}_t}{\\text{Real BNP}_t} = \\frac{P_t Y_t}{Y_t}$$
Inflationen kan mätas som deflatorns förändringstakt:
$$\\pi_t = \\frac{P_t - P_{t-1}}{P_{t-1}}$$
Nominell BNP är alltså deflatorn gånger real BNP: $P_t Y_t = P_t \\times Y_t$.

### Konsumentprisindex (KPI)
KPI mäter i stället priserna på det som **konsumeras**, alltså levnadskostnaderna. KPI och BNP-deflatorn rör sig oftast åt samma håll. Det finns varianter av KPI för olika syften. Riksbanken använder **KPIF**, där de direkta effekterna av ränteförändringar (t.ex. att boendekostnaderna stiger) är borträknade.

**Varför bryr sig ekonomer om inflation?** För att inte alla priser, skatter, bidrag, räntor och löner anpassar sig lika snabbt. Då förändras relativpriserna och inkomstfördelningen på ett oavsiktligt sätt.`,
      takeaway: "I bilexemplet är deflatorn för 2022 = 3 380 000 / 3 120 000 ≈ 1,083 (2021 = 1). Inflationen mätt med deflatorn blev alltså ca 8,3 %.",
    },
    {
      heading: "Okuns lag",
      body: `Ekonomisk teori handlar om samband mellan variabler. **Okuns lag** säger att förändringar i arbetslösheten samvarierar med BNP-tillväxten. **Hög** tillväxt är typiskt förknippad med **fallande** arbetslöshet, och **låg** tillväxt med **stigande** arbetslöshet. Föreläsningen visar detta med svenska data för 1970–2021 (SCB och Eurostat).

Sambandet kan skrivas förenklat som
$$u_t - u_{t-1} = -\\beta\\,(g_t - \\bar g)$$
där $\\bar g$ är den ”normala” tillväxttakt som krävs för att arbetslösheten ska vara oförändrad.`,
      graphs: [
        {
          type: "curves",
          title: "Okuns lag (stiliserad)",
          xLabel: "BNP-tillväxt (%)", yLabel: "Förändring i arbetslöshet (procentenheter)",
          x: [-4, 8], y: [-3, 3],
          params: {
            beta: { label: "Okun-koefficient β", min: 0.1, max: 0.8, step: 0.05, value: 0.4 },
            gbar: { label: "Normal tillväxt ḡ (%)", min: 0, max: 4, step: 0.1, value: 2 },
          },
          curves: [
            { label: "Okun", fn: "-beta*(x - gbar)", ghost: true },
            { label: "Oförändrad u", fn: "0", dashed: true },
          ],
          points: [{ between: ["Okun", "Oförändrad u"], label: "ḡ" }],
          readout: "Om tillväxten blir 5 % ändras arbetslösheten med {=-beta*(5-gbar)} procentenheter. Om tillväxten blir −2 % ändras den med {=-beta*(-2-gbar)} procentenheter.",
          caption: "Om tillväxten ligger över ḡ faller arbetslösheten, och om den ligger under ḡ stiger arbetslösheten. Ju större β, desto brantare linje och desto mer reagerar arbetslösheten på tillväxten.",
        },
      ],
    },
    {
      heading: "Phillipskurvan",
      body: `**Phillipskurvan** beskriver ett samband mellan arbetslöshet och inflation. När arbetslösheten är **låg** tenderar inflationen att vara **hög**, och när arbetslösheten är hög tenderar inflationen att vara låg. Föreläsningen visar svenska data för 1970–2021 (SCB).

Grafen nedan är stiliserad. Flytta arbetslösheten och se vilken inflation som följer. Vi återkommer senare i kursen till varför sambandet finns och varför det har förändrats över tid.`,
      graphs: [
        {
          type: "curves",
          title: "Phillipskurvan (stiliserad)",
          xLabel: "Arbetslöshet u (%)", yLabel: "Inflation π (%)",
          x: [0, 12], y: [-2, 12],
          params: {
            u: { label: "Arbetslöshet u (%)", min: 1, max: 11, step: 0.1, value: 6 },
            b: { label: "Kurvans lutning", min: 0.2, max: 1.5, step: 0.05, value: 0.8 },
          },
          curves: [
            { label: "Phillipskurva", fn: "7 - b*(x - 2)" },
            { label: "u", xAt: "u", dashed: true },
          ],
          points: [{ between: ["Phillipskurva", "u"], label: "A" }],
          readout: "Vid u = {u} % blir inflationen {A.y} %.",
        },
      ],
    },
  ],

  keyTerms: [
    { term: "Exogen variabel", def: "En variabel som tas som given i modellen." },
    { term: "Endogen variabel", def: "En variabel som förklaras inom modellen." },
    { term: "Positiv / normativ analys", def: "Hur det är, respektive hur det borde vara givet vissa mål." },
    { term: "BNP", def: "Värdet av alla färdigvaror och färdigtjänster som produceras under en period, vilket är lika med summan av förädlingsvärden och lika med summan av inkomster." },
    { term: "Färdigvara / insatsvara", def: "En färdigvara går till slutlig konsumtion eller investering. En insatsvara används för att producera andra varor." },
    { term: "Förädlingsvärde", def: "Värdet av ett företags produktion minus värdet av de insatsvaror som gått åt." },
    { term: "Nominell BNP", def: "BNP i löpande priser, $P Y$." },
    { term: "Real BNP", def: "BNP i fasta priser (basårets priser), $Y$." },
    { term: "BNP-deflator", def: "$P_t = P_t Y_t / Y_t$, prisnivån på det som produceras." },
    { term: "KPI / KPIF", def: "Konsumentprisindex, prisnivån på det som konsumeras. I KPIF är de direkta effekterna av ränteförändringar borträknade." },
    { term: "Arbetskraften", def: "$L = N + U$, sysselsatta plus arbetslösa." },
    { term: "Arbetslöshetstal", def: "$u = U/L$." },
    { term: "Recession", def: "En period då real BNP faller." },
    { term: "Okuns lag", def: "Hög BNP-tillväxt är förknippad med fallande arbetslöshet." },
    { term: "Phillipskurvan", def: "Låg arbetslöshet är förknippad med hög inflation." },
    { term: "70-regeln", def: "Vid tillväxttakten $x$ % fördubblas en storhet på ungefär $70/x$ år." },
  ],

  quiz: [
    {
      q: "I föreläsningens exempel säljer ett stålföretag stål för 100 till en bilfabrik, som säljer bilar för 200. Hur stor är BNP?",
      type: "numeric", answer: 200, tolerance: 0.5,
      explain: "Bara färdigvaror räknas: bilarna för 200. Stålet är en insatsvara och skulle dubbelräknas om det togs med.",
      topic: "Tre sätt att mäta BNP",
    },
    {
      q: "Hur stort är bilföretagets förädlingsvärde i samma exempel?",
      type: "numeric", answer: 100, tolerance: 0.5,
      explain: "Förädlingsvärde = produktionsvärde − insatsvaror = $200 - 100 = 100$.",
      topic: "Tre sätt att mäta BNP",
    },
    {
      q: "Varför räknas insatsvaror inte in i BNP?",
      options: [
        "För att de redan har beskattats",
        "För att det skulle leda till dubbelräkning, och BNP skulle då bero på hur produktionen är organiserad mellan företag",
        "För att insatsvaror alltid importeras",
        "För att insatsvaror inte har något marknadspris",
      ],
      answer: 1,
      explain: "Insatsvarans värde ingår redan i färdigvarans pris. Annars skulle BNP öka bara av att två företag delade upp produktionen i två led.",
      topic: "Tre sätt att mäta BNP",
    },
    {
      q: "Löner är 80 + 70 och vinster 20 + 30 i exemplet. Vad visar inkomstmetoden?",
      options: [
        "BNP = 150, eftersom vinster inte räknas",
        "BNP = 300, eftersom alla intäkter räknas",
        "BNP = 200, samma som med de andra metoderna",
        "BNP = 250, eftersom stålinköpet läggs till",
      ],
      answer: 2,
      explain: "Summan av inkomster till arbete och kapital är $150 + 50 = 200$. Alla tre metoderna ger samma BNP.",
      topic: "Tre sätt att mäta BNP",
    },
    {
      q: "13 bilar produceras 2022 och priset 2021 var 240 000 kr. Hur stor är real BNP 2022 i 2021 års priser (i kronor)?",
      type: "numeric", answer: 3120000, tolerance: 1,
      explain: "$13 \\times 240\\,000 = 3\\,120\\,000$.",
      topic: "Nominell och real BNP",
    },
    {
      q: "Real BNP var 2 880 000 år 2021 och 3 120 000 år 2022. Hur stor var den reala BNP-tillväxten i procent?",
      type: "numeric", answer: 8.33, tolerance: 0.05, unit: "%",
      explain: "$(3\\,120\\,000 - 2\\,880\\,000) / 2\\,880\\,000 \\approx 0{,}0833$, alltså 8,33 %.",
      topic: "Nominell och real BNP",
    },
    {
      q: "Nominell BNP 2022 är 3 380 000 och real BNP (2021 års priser) är 3 120 000. Hur stor är BNP-deflatorn 2022 (basår 2021 = 1)? Svara med tre decimaler.",
      type: "numeric", answer: 1.083, tolerance: 0.001,
      explain: "$P = PY/Y = 3\\,380\\,000 / 3\\,120\\,000 \\approx 1{,}083$.",
      topic: "Inflation och prisindex",
    },
    {
      q: "Nominell BNP ökar med 6 % och real BNP med 2 %. Vad har ungefär hänt med prisnivån (BNP-deflatorn)?",
      options: ["Den har ökat med ca 8 %", "Den har ökat med ca 4 %", "Den har ökat med ca 3 %", "Den är oförändrad"],
      answer: 1,
      explain: "Eftersom $PY = P \\times Y$ gäller approximativt att nominell tillväxt ≈ inflation + real tillväxt, alltså $6 - 2 = 4$ %.",
      topic: "Inflation och prisindex",
    },
    {
      q: "Enligt 70-regeln: hur många år tar det för BNP att fördubblas med en tillväxt på 3,5 % per år?",
      type: "numeric", answer: 20, tolerance: 0.5, unit: "år",
      explain: "$70 / 3{,}5 = 20$ år.",
      topic: "70-regeln",
    },
    {
      q: "Ungefär hur mycket större är BNP efter 70 år om tillväxten är 2 % per år?",
      options: ["Dubbelt så stor", "Tre gånger så stor", "Fyra gånger så stor", "Åtta gånger så stor"],
      answer: 2,
      explain: "Vid 2 % sker en fördubbling vart 35:e år, alltså två fördubblingar på 70 år: $2 \\times 2 = 4$.",
      topic: "70-regeln",
    },
    {
      q: "I ett land finns 4,8 miljoner sysselsatta och 0,4 miljoner arbetslösa. Hur stort är arbetslöshetstalet i procent? (Två decimaler.)",
      type: "numeric", answer: 7.69, tolerance: 0.02, unit: "%",
      explain: "$L = 4{,}8 + 0{,}4 = 5{,}2$ miljoner, så $u = 0{,}4/5{,}2 \\approx 7{,}69$ %.",
      topic: "Arbetslöshet",
    },
    {
      q: "Anna har inget jobb och har slutat söka arbete. Hur klassificeras hon?",
      options: ["Som arbetslös", "Som sysselsatt", "Som ej i arbetskraften", "Som deltidsarbetslös"],
      answer: 2,
      explain: "Bara den som aktivt söker arbete räknas som arbetslös. Anna räknas som ”ej i arbetskraften”.",
      topic: "Arbetslöshet",
    },
    {
      q: "Om fler arbetslösa ger upp och slutar söka jobb, vad händer då med det uppmätta arbetslöshetstalet $u = U/L$, allt annat lika?",
      options: ["Det stiger", "Det sjunker", "Det är oförändrat", "Det går inte att säga"],
      answer: 1,
      explain: "Både $U$ och $L$ minskar lika mycket. Eftersom $U < L$ minskar kvoten $U/L$.",
      topic: "Arbetslöshet",
    },
    {
      q: "Vilket påstående är normativt?",
      options: [
        "Högre räntor minskar investeringarna",
        "Arbetslösheten i Sverige var högre 2021 än 2019",
        "Riksbanken borde prioritera låg arbetslöshet framför låg inflation",
        "En skattesänkning ökar den disponibla inkomsten",
      ],
      answer: 2,
      explain: "Normativa påståenden handlar om hur det *borde* vara. De andra påståendena kan i princip prövas mot data och är alltså positiva.",
      topic: "Viktiga begrepp i modern makroekonomi",
    },
    {
      q: "Vad är en exogen variabel?",
      options: [
        "En variabel som förklaras inom modellen",
        "En variabel som tas som given i modellen",
        "En variabel som alltid är konstant över tid",
        "En variabel som bara påverkar utlandet",
      ],
      answer: 1,
      explain: "Exogena variabler bestäms utanför modellen. Vi kan ändra dem och studera effekterna på de endogena variablerna.",
      topic: "Viktiga begrepp i modern makroekonomi",
    },
    {
      q: "Vad bestämmer främst BNP på medellång sikt (ca 3–10 år)?",
      options: [
        "Efterfrågan på varor och tjänster",
        "Potentiell produktion: teknologi, kapitalstock och arbetskraft",
        "Enbart penningpolitiken",
        "Befolkningstillväxt och forskning över flera decennier",
      ],
      answer: 1,
      explain: "På kort sikt styr efterfrågan, på medellång sikt rör sig BNP mot potentiell produktion, och på lång sikt styr kapitalackumulation, teknologi och befolkning.",
      topic: "Tre centrala variabler och tidshorisonter",
    },
    {
      q: "Vad kallas en period då real BNP faller?",
      options: ["Expansion", "Högkonjunktur", "Recession", "Deflation"],
      answer: 2,
      explain: "Recession innebär fallande real BNP. Deflation handlar om fallande priser, inte om produktionen.",
      topic: "Konjunkturer",
    },
    {
      q: "Vad är den viktigaste skillnaden mellan KPI och BNP-deflatorn?",
      options: [
        "KPI mäter priser på det som konsumeras, och BNP-deflatorn priser på det som produceras",
        "KPI mäter bara livsmedelspriser",
        "BNP-deflatorn inkluderar importerade konsumtionsvaror men inte KPI",
        "Det finns ingen skillnad",
      ],
      answer: 0,
      explain: "KPI speglar levnadskostnaderna. Deflatorn speglar priserna på inhemsk produktion. Importerade konsumtionsvaror ingår därför i KPI men inte i deflatorn.",
      topic: "Inflation och prisindex",
    },
    {
      q: "Vad säger Okuns lag?",
      options: [
        "Låg arbetslöshet är förknippad med hög inflation",
        "Hög BNP-tillväxt är förknippad med fallande arbetslöshet",
        "BNP-tillväxt och inflation rör sig alltid åt samma håll",
        "Arbetslösheten är oberoende av tillväxten",
      ],
      answer: 1,
      explain: "Okuns lag kopplar förändringar i arbetslösheten till BNP-tillväxten. Det första alternativet beskriver Phillipskurvan.",
      topic: "Okuns lag",
    },
    {
      q: "Antag att $u_t - u_{t-1} = -0{,}4\\,(g_t - 2)$. Om BNP-tillväxten är 5 %, hur mycket förändras arbetslösheten (i procentenheter)?",
      type: "numeric", answer: -1.2, tolerance: 0.01, unit: "procentenheter",
      explain: "$-0{,}4 \\times (5 - 2) = -1{,}2$. Arbetslösheten faller med 1,2 procentenheter.",
      topic: "Okuns lag",
    },
    {
      q: "Vad beskriver Phillipskurvan?",
      options: [
        "Ett negativt samband mellan arbetslöshet och inflation",
        "Ett positivt samband mellan BNP och arbetslöshet",
        "Sambandet mellan sparande och investeringar",
        "Sambandet mellan nominell och real BNP",
      ],
      answer: 0,
      explain: "När arbetslösheten är låg tenderar inflationen att vara hög, och tvärtom.",
      topic: "Phillipskurvan",
    },
  ],
});
