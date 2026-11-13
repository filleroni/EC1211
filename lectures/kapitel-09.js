// WS-PS i graferna: WS: W/P = 1,07 + z − 0,04u, PS: W/P = 1/(1 + m)
registerLecture({
  id: "kapitel-9",
  number: 9,
  title: "Kapitel 9: Arbetsmarknaden",
  summary: "Arbetskraft och arbetslöshet, flöden på arbetsmarknaden, lönebildning och förhandlingsstyrka, prissättning med påslag och jämviktsarbetslöshet i WS-PS-modellen.",
  tags: ["Arbetslöshet", "Lönebildning", "Prispåslag", "WS-PS", "Jämviktsarbetslöshet"],

  sections: [
    {
      heading: "Frågorna i kapitlet",
      body: `- Vi inkluderar **arbetsmarknaden** i analysen.
- Vilka **flöden** finns på arbetsmarknaden?
- Hur bestäms **löner och priser**?
- Hur påverkar löne- och prisbildningen **arbetslösheten i jämvikt**?
- Hur påverkas arbetslösheten av faktorer som **arbetslöshetsersättning** och **konkurrenstryck**?`,
    },
    {
      heading: "Arbetskraften",
      body: `- **Arbetskraften** består av dem som **har jobb eller söker jobb**.
- Personer i åldern 16–64 som **inte** är i arbetskraften kan vara studerande, pensionärer, på sabbatsår, i hemarbete eller annat. **NEET** står för *Not in Employment, Education or Training*.

### Vem är sysselsatt? (SCB:s arbetskraftsundersökning, AKU)
En person är **sysselsatt** om han eller hon
- under mätveckan utför **minst en timmes arbete** som avlönad arbetstagare, som egen företagare (inklusive fri yrkesutövare) eller som oavlönad medhjälpare i ett företag som tillhör en familjemedlem i samma hushåll (personen är *i arbete*), **eller**
- normalt är sysselsatt enligt ovan men är **tillfälligt frånvarande** under hela mätveckan.

Personer som deltar i vissa **arbetsmarknadspolitiska program** räknas också som sysselsatta.

### Vem är arbetslös?
För att räknas som **arbetslös** ska man vara **utan arbete och aktivt söka** ett. **Det går att studera och vara arbetslös.**

### Sveriges befolkning i arbetsför ålder (15–74 år), första kvartalet 2023

| | Antal |
|---|---:|
| **Befolkning** | **7 562 500** |
| I arbetskraften | 5 624 900 |
| – sysselsatta | 5 186 900 |
| – arbetslösa | 438 100 |
| Ej i arbetskraften | 1 937 600 |
| – sjuka | 289 800 |
| – heltidsstuderande | 644 300 |
| – pensionärer | 855 000 |
| – övriga | 148 500 |

Arbetslösheten blir alltså $438\\,100 / 5\\,624\\,900 \\approx 7{,}8$ %.`,
      graphs: [
        {
          type: "series", bars: true,
          title: "Befolkningen 15–74 år efter arbetsmarknadsstatus, Q1 2023 (tusental)",
          categories: ["Sysselsatta", "Arbetslösa", "Sjuka", "Studerande", "Pensionärer", "Övriga"],
          yLabel: "Tusental", y: [0, 5500],
          series: [{ label: "Q1 2023", data: [[0, 5186.9], [1, 438.1], [2, 289.8], [3, 644.3], [4, 855.0], [5, 148.5]] }],
          caption: "Källa: SCB, AKU (enligt föreläsningen). De två första staplarna utgör arbetskraften, och de övriga är ej i arbetskraften.",
        },
      ],
    },
    {
      heading: "Arbetslösheten i Sverige och i Europa",
      body: `- Arbetslösheten (antalet arbetslösa i procent av arbetskraften) **ökade kraftigt i samband med 90-talskrisen** och har **inte kommit tillbaka ned** till nivåerna före krisen (SCB, AKU).
- Föreläsningen visar också utvecklingen januari 2001 – februari 2026 och olika mått på arbetslösheten under samma period.
- **I en europeisk jämförelse** (juli 2024) låg Sverige bland länderna med **högst arbetslöshet**, tillsammans med Finland, Grekland och Spanien. Tjeckien, Polen och Malta hade lägst.
- När det gäller andelen **NEET** (2023) hör Sverige däremot till länderna med **lägst** andel, tillsammans med Island, Nederländerna, Malta och Norge.
- Föreläsningen visar också diagram över **sysselsättningsgrad och arbetskraftsdeltagande** i olika länder.`,
    },
    {
      heading: "Flöden på arbetsmarknaden",
      body: `**Bakom samma arbetslöshetsnivå kan två mycket olika situationer gömma sig:**
- **Stora flöden:** många förlorar jobbet, men de flesta hittar också snabbt ett nytt, **eller**
- **Små flöden:** få förlorar jobbet, men de som gör det har svårt att hitta ett nytt.

Det finns stora skillnader här mellan (och inom) Europa och USA, och mellan olika grupper av individer.

### Flöden under ett kvartal (Q1 2023)
Föreläsningen visar flödena mellan de tre tillstånden under första kvartalet 2023:

| Mellan | Flöden i de två riktningarna |
|---|---|
| Sysselsatta (5 186 900) och arbetslösa (438 100) | 65 700 och 83 300 |
| Sysselsatta och utanför arbetskraften (1 937 600) | 135 100 och 119 500 |
| Arbetslösa och utanför arbetskraften | 139 100 och 68 500 |

Flödena är **stora i förhållande till antalet arbetslösa**. Under ett enda kvartal rör sig hundratusentals personer mellan tillstånden, och många av flödena går **direkt mellan sysselsättning och utanför arbetskraften**, utan att personerna räknas som arbetslösa däremellan.`,
    },
    {
      heading: "Lönebildningen",
      body: `- **Kollektiva löneförhandlingar** mellan företag och anställda är regel snarare än undantag i Europa. I USA och Storbritannien är det inte alls lika vanligt. Andelen anställda som omfattas av kollektivavtal är ca 90 % i Sverige, men bara drygt 10 % i USA.
- Den **fackliga anslutningsgraden** kan vara låg även om kollektivavtal täcker merparten av de anställda.
- **Minimilönebett:** minimilönen i förhållande till medianlönen. Den är relativt hög i flera svenska avtalsområden (t.ex. detaljhandel och hotell och restaurang) jämfört med många andra länder, och lägst i USA.

### Förhandlingsstyrka
Lönen är oftast **högre än reservationslönen**, alltså den lägsta lön man skulle acceptera, både i Europa och USA. Oavsett förhandlingsform är löntagarnas förhandlingsstyrka
- **högre** ju **svårare det är att ersätta dem** med andra,
- **lägre** ju **svårare det är för dem att hitta alternativ** sysselsättning.

Dessa faktorer påverkas av **arbetslöshetsnivån**, men också av institutionella faktorer som **arbetslöshetsersättning och lagstiftning**.

### Effektivitetslöneteorin
Det är **inte lönsamt för företagen att sätta så låg lön som möjligt**, för då förlorar de anställda ingenting på att förlora jobbet. Förlusten av att förlora jobbet ska vara ”lagom” stor, och den beror på lönen och arbetslösheten. **Lägre arbetslöshet skapar då ett tryck uppåt på lönerna.** Det är ytterligare ett argument för att lönerna beror negativt på arbetslösheten.`,
    },
    {
      heading: "Löner, priser och arbetslöshet",
      body: `Några utgångspunkter:
1. Anställda och företag bryr sig (rimligen) om **reallönen** $W/P$, inte den nominella lönen $W$.
2. **Högre arbetslöshet försvagar** löntagarnas förhandlingsposition.
3. Bland andra faktorer som påverkar lönen finns **arbetslöshetsersättningen**. Högre ersättningar ger mindre press på lönerna att sjunka för att minska arbetslösheten. Även andra institutionella faktorer, som anställningsskydd och vilka som förhandlar, är betydelsefulla.

### Lönesättning, formellt
Vi antar att den nominella lönen W beror på tre faktorer:
- **förväntad prisnivå $P^e$** (positivt),
- **arbetslösheten u** (negativt),
- en variabel **z** som fångar allt annat som kan påverka lönebildningen (arbetslöshetsersättning, arbetsrätt m.m.).

$$W = P^e \\, F(\\underset{-}{u}, \\underset{+}{z})$$`,
    },
    {
      heading: "Prisbildning och prispåslag",
      body: `De priser företagen sätter beror bland annat på deras **kostnader**. För att beskriva dem använder vi en **produktionsfunktion**, som anger sambandet mellan mängden och kvaliteten på produktionsfaktorerna och produktionen.

Vi bortser tills vidare från kapital och fokuserar på produktionsfaktorn arbetskraft:
$$Y = A \\cdot N$$
där Y är produktionen, N sysselsättningen (i ett uppskalat representativt företag) och A **arbetsproduktiviteten** (produktion per arbetare). Vi antar tills vidare att **A = 1**.

Företagets kostnader bestäms då av lönen: en enhet Y kräver en enhet arbetskraft, som kostar W. **Marginalkostnaden är alltså W.**

### Prispåslag
Vi tillåter att det **inte råder perfekt konkurrens**, så att priset är högre än marginalkostnaden:
$$P = (1 + m)\\, W$$
där **m är prispåslaget** på marginalkostnaden. Vid perfekt konkurrens är m = 0 och P = W. Detta är **prissättningssambandet**.

*Överkurs:* företagets vinst är $(P - W)Q$. Om efterfrågan är $Q = P^{-(1+m)/m}$, med $m > 0$, maximeras vinsten vid $P = (1 + m)W$.`,
    },
    {
      heading: "Jämviktsarbetslöshet: WS och PS",
      body: `Vi definierar **jämvikt på arbetsmarknaden** som en situation där **$P = P^e$**, dvs. priserna blir som förväntat. Det sker vid en viss nivå på arbetslösheten, som vi kallar **jämviktsarbetslöshet**. Senare tillåter vi avvikelser från en sådan jämvikt.

### Lönesättningssambandet (WS)
Dela båda sidor av $W = P^e F(u, z)$ med $P^e$ och anta att $P^e = P$:
$$\\frac{W}{P} = F(\\underset{-}{u}, \\underset{+}{z})$$
Den reallön som lönesättarna väljer är en **fallande funktion av arbetslösheten**.

### Prissättningssambandet (PS)
Dela båda sidor av $P = (1 + m)W$ med P och sedan med $1 + m$:
$$\\frac{W}{P} = \\frac{1}{1 + m}$$
Enligt prissättningssambandet är reallönen **oberoende av arbetslösheten**, så PS är en **horisontell linje**.

### Jämvikt
I skärningspunkten är båda sambanden uppfyllda. **Jämviktsarbetslösheten $u_n$** är sådan att lönesättarna väljer den lön som ges av prissättningssambandet:
$$F(u_n, z) = \\frac{1}{1 + m}$$

Dra i reglagen och studera de två experimenten i nästa avsnitt.`,
      graphs: [
        {
          type: "curves",
          title: "WS-PS: jämviktsarbetslöshet",
          xLabel: "Arbetslöshet, u (%)", yLabel: "Reallön, W/P",
          x: [0, 15], y: [0.5, 1.2],
          params: {
            z: { label: "z (t.ex. arbetslöshetsersättning)", min: -0.1, max: 0.2, step: 0.01, value: 0 },
            m: { label: "Prispåslag m", min: 0, max: 0.5, step: 0.01, value: 0.2 },
          },
          curves: [
            { label: "WS", fn: "1.07 + z - 0.04*x", ghost: true },
            { label: "PS", fn: "1/(1 + m)", ghost: true },
          ],
          points: [{ between: ["WS", "PS"], label: "u_n" }],
          readout: "Jämviktsarbetslöshet u_n = {u_n.x} % · reallön W/P = 1/(1 + m) = {=1/(1+m)}",
          caption: "Här är $F(u, z) = 1{,}07 + z - 0{,}04u$. **Högre z** (t.ex. generösare arbetslöshetsersättning) flyttar WS uppåt, så att u_n ökar men reallönen är oförändrad. **Högre m** (mindre konkurrens) flyttar PS nedåt, så att reallönen faller och u_n ökar.",
        },
      ],
    },
    {
      heading: "Arbetslöshetsersättning och konkurrens",
      body: `### Högre arbetslöshetsersättning
- Högre arbetslöshetsersättning **stärker löntagarnas förhandlingskraft**: **z ökar**, och **WS-kurvan skiftar uppåt**.
- **Slutsats:** jämviktsarbetslösheten **ökar** från $u_n$ till $u'_n$. Reallönen är oförändrad, eftersom den bestäms av PS.

### Minskad konkurrens på varumarknaden
- Om konkurrensen på varumarknaden minskar ökar **prispåslagen**, så **m går upp**.
- PS-kurvan $W/P = 1/(1 + m)$ **förskjuts nedåt**.
- **Slutsats:** **reallönen faller** och **jämviktsarbetslösheten ökar**.

Omvänt ger **ökad konkurrens** (lägre m) både högre reallön och lägre jämviktsarbetslöshet.`,
    },
    {
      heading: "Jämviktsarbetslöshet och potentiell produktion",
      body: `- Jämviktsarbetslösheten kallas ibland **”naturlig” arbetslöshet**, men det är inte ett så bra uttryck, eftersom nivån **inte är given av naturen**. Den beror på institutioner och konkurrens (z och m).
- Den bygger på att priserna är lika med de förväntade, **P = Pᵉ**. Så behöver det inte alltid vara, och vi återkommer till detta.
- Senare härleder vi vad produktionen blir när arbetslösheten ligger på sin jämviktsnivå. Den produktionsnivån kallas **potentiell produktion**, och avvikelser från den kallas **produktionsgap**. Dessa begrepp är centrala i analysen av konjunkturcykler.`,
    },
  ],

  keyTerms: [
    { term: "Arbetskraften", def: "De som har jobb eller söker jobb (sysselsatta + arbetslösa)." },
    { term: "Sysselsatt (AKU)", def: "Har arbetat minst en timme under mätveckan, eller är tillfälligt frånvarande från ett arbete." },
    { term: "NEET", def: "Not in Employment, Education or Training: varken arbetar, studerar eller är i utbildning." },
    { term: "Reservationslön", def: "Den lägsta lön en person är beredd att arbeta för." },
    { term: "Kollektivavtal", def: "Avtal om löner och villkor som förhandlas mellan arbetsgivare och fack." },
    { term: "Minimilönebett", def: "Minimilönen i förhållande till medianlönen." },
    { term: "Effektivitetslön", def: "En lön över den lägsta möjliga, som ger de anställda något att förlora om de blir av med jobbet." },
    { term: "Lönesättningssambandet (WS)", def: "$W/P = F(u, z)$. Reallönen som lönesättarna väljer faller med arbetslösheten." },
    { term: "Prissättningssambandet (PS)", def: "$W/P = 1/(1+m)$, som följer av $P = (1+m)W$." },
    { term: "Prispåslag", def: "m, påslaget på marginalkostnaden. Vid perfekt konkurrens är m = 0." },
    { term: "Arbetsproduktivitet", def: "A, produktion per arbetare: $Y = A N$." },
    { term: "Jämviktsarbetslöshet", def: "$u_n$ som uppfyller $F(u_n, z) = 1/(1+m)$, då $P = P^e$." },
    { term: "Potentiell produktion", def: "Produktionen när arbetslösheten ligger på jämviktsnivån." },
    { term: "Produktionsgap", def: "Avvikelsen mellan faktisk och potentiell produktion." },
  ],

  quiz: [
    {
      q: "Kalle studerar på heltid och söker aktivt jobb, men har inget. Hur räknas han i AKU?",
      options: ["Som ej i arbetskraften", "Som arbetslös", "Som sysselsatt", "Som NEET"],
      answer: 1,
      explain: "Det går att studera och vara arbetslös. Det som krävs är att man är utan arbete och aktivt söker.",
      topic: "Arbetskraften",
    },
    {
      q: "Lisa arbetade två timmar under mätveckan som oavlönad medhjälpare i sin pappas företag. Hur räknas hon?",
      options: ["Som sysselsatt", "Som arbetslös", "Som ej i arbetskraften", "Hon räknas inte alls"],
      answer: 0,
      explain: "Minst en timmes arbete räcker, även som oavlönad medhjälpare i ett familjeföretag.",
      topic: "Arbetskraften",
    },
    {
      q: "Q1 2023 fanns 5 186 900 sysselsatta och 438 100 arbetslösa i Sverige (15–74 år). Hur hög var arbetslösheten (%)? (En decimal.)",
      type: "numeric", answer: 7.8, tolerance: 0.05, unit: "%",
      explain: "$438\\,100 / (5\\,186\\,900 + 438\\,100) = 438\\,100/5\\,625\\,000 \\approx 7{,}8$ %.",
      topic: "Arbetskraften",
    },
    {
      q: "Varför räcker det inte att titta på arbetslöshetsnivån för att förstå arbetsmarknaden?",
      options: [
        "För att arbetslösheten alltid är densamma över tid",
        "Samma nivå kan bero på stora eller små flöden",
        "För att arbetslösheten inte går att mäta exakt",
        "För att flödena in och ut alltid tar ut varandra",
      ],
      answer: 1,
      explain: "Långtidsarbetslöshet och kort sökarbetslöshet är olika problem, trots att de kan ge samma nivå.",
      topic: "Flöden på arbetsmarknaden",
    },
    {
      q: "Enligt föreläsningen är löntagarnas förhandlingsstyrka …",
      options: [
        "högre ju lättare det är att ersätta dem",
        "högre ju svårare det är att ersätta dem",
        "oberoende av arbetslöshetens nivå",
        "alltid högre i USA än i Europa",
      ],
      answer: 1,
      explain: "Därför försvagar hög arbetslöshet löntagarnas förhandlingsposition.",
      topic: "Lönebildningen",
    },
    {
      q: "Vad säger effektivitetslöneteorin?",
      options: [
        "Att lönen alltid sätts lika med reservationslönen",
        "Att lägsta möjliga lön inte lönar sig för företagen",
        "Att lönerna inte påverkas av arbetslösheten",
        "Att produktiviteten är oberoende av lönenivån",
      ],
      answer: 1,
      explain: "Förlusten av att förlora jobbet beror på lönen och arbetslösheten. Lägre arbetslöshet ger därför tryck uppåt på lönerna.",
      topic: "Lönebildningen",
    },
    {
      q: "I lönesättningsrelationen $W = P^e F(u, z)$: hur påverkar u och z lönen?",
      options: [
        "u positivt, z negativt",
        "u negativt, z positivt",
        "Båda positivt",
        "Båda negativt",
      ],
      answer: 1,
      explain: "Högre arbetslöshet försvagar förhandlingspositionen. z (t.ex. arbetslöshetsersättning) stärker den.",
      topic: "Löner, priser och arbetslöshet",
    },
    {
      q: "Lönen är W = 200 och prispåslaget m = 0,25. Vilket pris sätter företaget?",
      type: "numeric", answer: 250, tolerance: 0.01,
      explain: "$P = (1 + m)W = 1{,}25 \\times 200 = 250$.",
      topic: "Prisbildning och prispåslag",
    },
    {
      q: "Med prispåslaget m = 0,25, vad blir reallönen W/P enligt prissättningssambandet?",
      type: "numeric", answer: 0.8, tolerance: 0.001,
      explain: "$W/P = 1/(1 + 0{,}25) = 0{,}8$.",
      topic: "Jämviktsarbetslöshet: WS och PS",
    },
    {
      q: "Varför är PS-kurvan horisontell i ett diagram med arbetslösheten på x-axeln?",
      options: [
        "För att prissättningen ger $W/P = 1/(1+m)$",
        "För att de nominella lönerna är fasta",
        "För att företagen inte bryr sig om sina kostnader",
        "För att arbetslösheten alltid är konstant",
      ],
      answer: 0,
      explain: "Med $Y = N$ (A = 1) är marginalkostnaden W, och påslaget m bestämmer reallönen oavsett arbetslöshet.",
      topic: "Jämviktsarbetslöshet: WS och PS",
    },
    {
      q: "Hur definieras jämvikt på arbetsmarknaden i kapitel 9?",
      options: [
        "Som att arbetslösheten är noll",
        "Som att priserna blir som förväntat, $P = P^e$",
        "Som att W = P",
        "Som att utbudet av arbete är lika med befolkningen",
      ],
      answer: 1,
      explain: "Då gäller både WS och PS, och arbetslösheten blir $u_n$.",
      topic: "Jämviktsarbetslöshet: WS och PS",
    },
    {
      q: "Arbetslöshetsersättningen höjs. Vad händer i WS-PS-modellen?",
      options: [
        "PS skiftar nedåt, reallönen faller och u_n ökar",
        "WS skiftar uppåt och u_n ökar",
        "WS skiftar nedåt och u_n minskar",
        "PS skiftar uppåt, reallönen stiger och u_n minskar",
      ],
      answer: 1,
      explain: "z ökar och stärker löntagarnas förhandlingsposition. Reallönen bestäms av PS och är oförändrad.",
      topic: "Arbetslöshetsersättning och konkurrens",
    },
    {
      q: "Konkurrensen på varumarknaden minskar så att prispåslagen ökar. Vad händer?",
      options: [
        "PS skiftar uppåt, reallönen stiger och u_n minskar",
        "PS skiftar nedåt, reallönen faller och u_n ökar",
        "WS skiftar uppåt och u_n ökar",
        "Reallönen stiger och u_n ökar",
      ],
      answer: 1,
      explain: "Högre m ger lägre $1/(1+m)$.",
      topic: "Arbetslöshetsersättning och konkurrens",
    },
    {
      q: "Antag att $F(u, z) = 1{,}07 + z - 0{,}04u$ med $z = 0$ och $m = 0{,}25$. Hur hög är jämviktsarbetslösheten (%)? (En decimal.)",
      type: "numeric", answer: 6.75, tolerance: 0.05, unit: "%",
      explain: "$1{,}07 - 0{,}04u_n = 0{,}8$ ger $u_n = 0{,}27/0{,}04 = 6{,}75$ %.",
      topic: "Jämviktsarbetslöshet: WS och PS",
    },
    {
      q: "Varför är ”naturlig arbetslöshet” enligt föreläsningen inte ett så bra namn på jämviktsarbetslösheten?",
      options: [
        "För att den alltid är noll i en fungerande ekonomi",
        "För att den beror på institutioner och konkurrens",
        "För att den inte går att beräkna eller skatta",
        "För att begreppet bara används för USA",
      ],
      answer: 1,
      explain: "Politik som påverkar z eller m ändrar u_n.",
      topic: "Jämviktsarbetslöshet och potentiell produktion",
    },
  ],
});
