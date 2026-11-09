registerLecture({
  id: "kapitel-2",
  number: 2,
  title: "Kapitel 2: Varumarknaden",
  summary: "Hur produktionen bestäms på kort sikt: efterfrågans komponenter, konsumtionsfunktionen, jämvikt på varumarknaden, multiplikatorn och sparande = investeringar.",
  tags: ["Efterfrågan", "Konsumtionsfunktion", "Multiplikatorn", "Finanspolitik", "Sparande"],

  sections: [
    {
      heading: "Ett cirkulärt samband",
      body: `Hur bestäms produktionen på **kort sikt**? Kapitlet bygger på ett cirkulärt samband:

- **Produktionen** bestäms av **efterfrågan**.
- **Efterfrågan** bestäms av **inkomsten**.
- **Inkomsten** bestäms av **produktionen**.

Sambandet är cirkulärt eftersom produktion → inkomst → efterfrågan → produktion. Modellen i det här kapitlet visar hur cirkeln ger en jämvikt.`,
    },
    {
      heading: "Efterfrågans komponenter",
      body: `- **Privat konsumtion (C):** varor och tjänster som hushållen konsumerar.
- **Bruttoinvesteringar (I):** inköp av investeringsvaror i företag och offentlig sektor.
- **Offentlig konsumtion (G):** inköp av varor och tjänster inom stat, kommuner och regioner. *Transfereringar, bidrag och räntor på statsskulden ingår inte.*
- **Export (X)** och **import (IM)**.

Efterfrågan på **inhemskt producerade** varor och tjänster kallas $Z$:
$$Z \\equiv C + I + G + X - IM$$

- Exporten är en del av $Z$ men ingår inte i $C + I + G$, och måste därför **läggas till**.
- Importen ingår i $C + I + G$ men är inte efterfrågan på inhemska varor, och **dras därför bort**.

Skillnaden mellan export och import kallas **handelsbalans** eller **nettoexport**: $NX \\equiv X - IM$.

Om produktionen inte är lika stor som efterfrågan uppstår **lagerinvesteringar**. Vi definierar **jämvikt** som att produktionen är lika med efterfrågan, dvs. att lagerinvesteringarna är noll.`,
    },
    {
      heading: "Sveriges försörjningsbalans",
      body: `Fördelningen av BNP på efterfrågans komponenter kallas **försörjningsbalans** (miljarder kronor, löpande priser, källa SCB):

| | 2022 | andel av BNP | 2023 | andel av BNP |
|---|---:|---:|---:|---:|
| Privat konsumtion (C) | 2 613 | 43,7 % | 2 798 | 45,5 % |
| Bruttoinvesteringar (I) | 1 622 | 27,1 % | 1 552 | 25,2 % |
| Offentlig konsumtion (G) | 1 491 | 24,9 % | 1 623 | 26,4 % |
| Export (X) | 3 157 | 52,8 % | 3 391 | 55,2 % |
| − Import (IM) | −2 982 | −49,9 % | −3 220 | −52,4 % |
| Lagerinvesteringar | 78 | 1,3 % | −11 | −0,2 % |
| **BNP** | **5 976** | | **6 143** | |

- **2022:** nettoexporten var $3\\,157 - 2\\,982 = 175$ miljarder, ett överskott på ca **2,9 %** av BNP.
- **2023:** tabellen ger nettoexporten $3\\,391 - 3\\,220 = 171$ miljarder, ca **2,8 %** av BNP. (Bilden anger 17 miljarder, vilket verkar vara ett skrivfel.)

Lägg märke till hur stora både exporten och importen är i förhållande till BNP. Sverige är en **liten öppen ekonomi**.`,
      graphs: [
        {
          type: "series", bars: true,
          title: "Försörjningsbalansen 2022 och 2023 (miljarder kr)",
          categories: ["C", "I", "G", "X", "−IM", "Lager"],
          yLabel: "Miljarder kronor", y: [-3500, 3600],
          series: [
            { label: "2022", data: [[0, 2613], [1, 1622], [2, 1491], [3, 3157], [4, -2982], [5, 78]] },
            { label: "2023", data: [[0, 2798], [1, 1552], [2, 1623], [3, 3391], [4, -3220], [5, -11]] },
          ],
          caption: "Summan av staplarna för ett år är BNP. Exporten är större än den privata konsumtionen, men importen är nästan lika stor.",
        },
      ],
    },
    {
      heading: "Konsumtionsfunktionen",
      body: `**Disponibel inkomst** är inkomsten efter skatter och transfereringar: $Y_D \\equiv Y - T$, där $T$ är nettoskatten.

Vi antar att konsumtionen beror **positivt** på den disponibla inkomsten: $C = C(Y_D)$. Det är ett exempel på en **beteendeekvation**. Ofta används en **linjär konsumtionsfunktion**:
$$C = c_0 + c_1 Y_D$$

- $c_0$ är **interceptet**: den konsumtion som sker även när den disponibla inkomsten är noll.
- $c_1$ är den **marginella konsumtionsbenägenheten**: hur mycket konsumtionen ökar när den disponibla inkomsten ökar med en krona. Vi antar att $0 < c_1 < 1$, dvs. konsumtionen ökar med inkomsten, men **mindre än ett till ett**.`,
      graphs: [
        {
          type: "curves",
          title: "Konsumtionsfunktionen C = c₀ + c₁·Y_D",
          xLabel: "Disponibel inkomst Y_D", yLabel: "Privat konsumtion C",
          x: [0, 1000], y: [0, 1000],
          params: {
            c0: { label: "Intercept c₀", min: 0, max: 300, step: 5, value: 100 },
            c1: { label: "Marginell konsumtionsbenägenhet c₁", min: 0.1, max: 0.95, step: 0.01, value: 0.6 },
          },
          curves: [
            { label: "C", fn: "c0 + c1*x", ghost: true },
            { label: "C = Y_D", fn: "x", dashed: true },
          ],
          points: [{ between: ["C", "C = Y_D"], label: "B" }],
          readout: "Vid Y_D = 500 är C = {=c0 + c1*500} och privat sparande Y_D − C = {=500 - c0 - c1*500}. Sparandet är noll vid Y_D = {B.x}.",
          caption: "Ett högre $c_0$ flyttar linjen parallellt uppåt, och ett högre $c_1$ gör den brantare. Till höger om skärningen med 45°-linjen sparar hushållen, och till vänster konsumerar de mer än sin inkomst.",
        },
      ],
    },
    {
      heading: "Exogen efterfrågan och finanspolitik",
      body: `Variabler som förklaras inom modellen är **endogena**, och variabler som inte förklaras inom modellen är **exogena**.

- **Investeringarna** antas tills vidare vara exogena: $I = \\bar I$.
- **Offentlig konsumtion G** och **skatter T** utgör tillsammans **finanspolitiken**. De är exogena, men vi analyserar vad som händer med de endogena variablerna när de ändras. Vilka effekter har finanspolitiken?
- Tills vidare studerar vi en **sluten ekonomi**: $X = IM = 0$.`,
    },
    {
      heading: "Jämvikt på varumarknaden",
      body: `Jämvikt på varumarknaden kräver att **produktionen är lika med efterfrågan**: $Y = Z$. Med våra antaganden blir det
$$Y = c_0 + c_1 (Y - T) + \\bar I + G$$

Detta är ett **jämviktsvillkor**. Produktionen är lika med efterfrågan, efterfrågan beror på inkomsten, och inkomsten är i sin tur lika med produktionen.

Modellen har **en endogen variabel** ($Y$), **tre exogena** ($T$, $\\bar I$, $G$) och **två parametrar** ($c_0$, $c_1$).

### Matematisk lösning
$$Y = c_0 + c_1 Y + \\bar I + G - c_1 T$$
$$(1 - c_1)\\,Y = c_0 + \\bar I + G - c_1 T$$
$$Y = \\underbrace{\\frac{1}{1 - c_1}}_{\\text{multiplikator}}\\;\\underbrace{\\left(c_0 + \\bar I + G - c_1 T\\right)}_{\\text{autonom efterfrågan}}$$

### Grafisk lösning
Efterfrågan $ZZ = (c_0 + \\bar I + G - c_1 T) + c_1 Y$ är en linje med lutningen $c_1 < 1$. Jämvikten ligger där $ZZ$ skär **45°-linjen** $Z = Y$. Prova att ändra G, T och de andra variablerna nedan.`,
      graphs: [
        {
          type: "curves",
          title: "Keynesianska korset: jämvikt på varumarknaden",
          xLabel: "Inkomst, produktion Y", yLabel: "Efterfrågan Z",
          x: [0, 5000], y: [0, 5000],
          params: {
            G: { label: "Offentlig konsumtion G", min: 0, max: 1000, step: 10, value: 400 },
            T: { label: "Skatter T", min: 0, max: 1000, step: 10, value: 250 },
            I: { label: "Investeringar Ī", min: 0, max: 800, step: 10, value: 300 },
            c0: { label: "Intercept c₀", min: 0, max: 500, step: 10, value: 200 },
            c1: { label: "Marginell konsumtionsbenägenhet c₁", min: 0.2, max: 0.8, step: 0.01, value: 0.6 },
          },
          curves: [
            { label: "ZZ", fn: "c0 + c1*(x - T) + I + G", ghost: true },
            { label: "45°", fn: "x", dashed: true },
          ],
          points: [{ between: ["ZZ", "45°"], label: "A" }],
          readout: "Jämvikt: Y = {=(c0 + I + G - c1*T)/(1 - c1)} · Autonom efterfrågan = {=c0 + I + G - c1*T} · Multiplikator 1/(1−c₁) = {=1/(1-c1)}",
          caption: "Höjer man G flyttas ZZ parallellt uppåt lika mycket, men jämvikten flyttas åt höger **mer** än så: det är multiplikatoreffekten. Höjer man $c_1$ blir ZZ brantare och multiplikatorn större.",
        },
      ],
      takeaway: "Varje förändring i autonom efterfrågan (c₀, Ī, G eller −c₁T) ger en förändring i Y som är 1/(1−c₁) gånger större.",
    },
    {
      heading: "Multiplikatorn i ord och formler",
      body: `Anta att den autonoma efterfrågan ökar med **en miljard**:

1. Produktionen ökar med 1 miljard, och därmed inkomsterna med 1 miljard.
2. 1 miljard mer i inkomst ger $c_1$ mer konsumtion, alltså $c_1$ mer efterfrågan och $c_1$ mer produktion.
3. $c_1$ mer produktion ger $c_1$ mer inkomst, vilket ger $c_1 \\cdot c_1 = c_1^2$ mer konsumtion, efterfrågan och produktion …

Den totala effekten är en geometrisk summa:
$$1 + c_1 + c_1^2 + c_1^3 + \\dots = \\frac{1}{1 - c_1} > 1$$

**Vad händer om $c_1 \\geq 1$?** Då konvergerar inte summan. Varje omgång blir lika stor eller större än den föregående, och det finns ingen ändlig jämvikt. Därför antar vi att $c_1 < 1$.`,
      graphs: [
        {
          type: "curves",
          title: "Multiplikatorprocessen: kumulativ effekt av 1 miljard mer i efterfrågan",
          xLabel: "Antal omgångar", yLabel: "Kumulativ ökning av Y (miljarder)",
          x: [0, 20], y: [0, 6],
          params: { c1: { label: "Marginell konsumtionsbenägenhet c₁", min: 0.1, max: 0.8, step: 0.01, value: 0.6 } },
          curves: [
            { label: "Kumulativ effekt", fn: "(1 - pow(c1, floor(x)))/(1 - c1)" },
            { label: "1/(1−c₁)", fn: "1/(1 - c1)", dashed: true },
          ],
          readout: "Efter första omgången: 1 · efter 3 omgångar: {=(1-pow(c1,3))/(1-c1)} · efter 10 omgångar: {=(1-pow(c1,10))/(1-c1)} · totalt: {=1/(1-c1)}",
          caption: "Varje trappsteg är en ny omgång av inkomst → konsumtion → produktion. Stegen blir mindre och mindre, och summan närmar sig $1/(1-c_1)$. Ju större $c_1$, desto fler omgångar behövs och desto större blir den totala effekten.",
        },
      ],
    },
    {
      heading: "Anpassningens dynamik",
      body: `Efter en ökning av efterfrågan **hoppar inte produktionen direkt** till den nya jämvikten:

- En del av efterfrågeökningen möts först av **negativa lagerinvesteringar**, dvs. lagren minskar.
- Olika branscher och företag reviderar sina produktionsplaner olika ofta.
- Produktionen anpassas därför **gradvis** till den högre efterfrågan. Detta kallas **anpassningens dynamik**.

Jämfört med de anpassningar vi studerar i senare kapitel går denna dynamik relativt **snabbt**: det handlar om månader eller kvartal snarare än år.`,
    },
    {
      heading: "Investeringar = sparande",
      body: `Jämvikten på varumarknaden kan också uttryckas med sparande och investeringar:

- **Privat sparande:** $S \\equiv Y_D - C = Y - T - C$
- **Offentligt sparande:** $T - G$
- **Totalt sparande:** $(Y - T - C) + (T - G) = Y - C - G$

Jämviktsvillkoret $Y = C + I + G$ betyder att $Y - C - G = I$. Men $Y - C - G$ är ju just det totala sparandet. Alltså gäller i jämvikt:
$$\\underbrace{S + (T - G)}_{\\text{sparande}} = \\underbrace{I}_{\\text{investeringar}}$$

I en sluten ekonomi är **”produktion = efterfrågan”** och **”sparande = investeringar”** två sidor av samma mynt. Grafen nedan ger samma jämvikt som det keynesianska korset.`,
      graphs: [
        {
          type: "curves",
          title: "Sparande = investeringar",
          xLabel: "Inkomst, produktion Y", yLabel: "Sparande, investeringar",
          x: [0, 5000], y: [-800, 1600],
          params: {
            G: { label: "Offentlig konsumtion G", min: 0, max: 1000, step: 10, value: 400 },
            T: { label: "Skatter T", min: 0, max: 1000, step: 10, value: 250 },
            I: { label: "Investeringar Ī", min: 0, max: 800, step: 10, value: 300 },
            c1: { label: "Marginell konsumtionsbenägenhet c₁", min: 0.2, max: 0.8, step: 0.01, value: 0.6 },
          },
          curves: [
            { label: "S + (T−G)", fn: "-200 + (1 - c1)*(x - T) + (T - G)", ghost: true },
            { label: "Ī", fn: "I", ghost: true },
          ],
          points: [{ between: ["S + (T−G)", "Ī"], label: "A" }],
          readout: "Jämvikt: Y = {A.x} · offentligt sparande T − G = {=T - G} · privat sparande S = Ī − (T − G) = {=I - (T - G)}",
          caption: "Här är $c_0 = 200$. En ökning av G minskar det offentliga sparandet, så sparkurvan flyttas nedåt och Y måste öka tills det totala sparandet åter är lika med Ī.",
        },
      ],
    },
    {
      heading: "Varför inte alltid öka G eller sänka T?",
      body: `Om det är så enkelt att höja produktionen, varför löser inte regeringen problemet med låg produktion?

- Vi har antagit att **investeringarna (och nettoexporten) är konstanta**, vilket inte är realistiskt. När vi senare gör dem endogena visar det sig att finanspolitiken bara har **tillfälliga** effekter.
- **Lågt sparande, budgetunderskott och statsskuld** är inte bra på lång sikt.
- **Förväntningar** påverkar effekten. En skattesänkning i dag kan signalera högre skatter i morgon och därmed ändra konsumtionsfunktionen.
- **Högre produktion kan ha oönskade sidoeffekter**, t.ex. inflation och för mycket övertid. Att maximera BNP i dag är inte ett bra mål för politiken.`,
    },
    {
      heading: "Lite doktrinhistoria: Say och Walras",
      body: `BNP kan mätas både som summan av alla inkomster och som värdet av alla färdigvaror. Det betyder att **inkomsterna alltid precis räcker till att betala för det som produceras**.

- **Says lag** (Jean-Baptiste Say, 1767–1832): *utbudet skapar sin egen efterfrågan*.
- **Walras lag** (Léon Walras, 1834–1910): om ekonomin har $n$ marknader kan marknadsjämvikt (utbud = efterfrågan) bara bestämma **$n - 1$ priser**.

Hittills har vi bara studerat **en** marknad ($n = 1$). Då kan vi inte bestämma något pris alls, och jämvikt uppstår oavsett prisnivå.

### Intuitionen för Walras lag
Tänk dig en ekonomi med två varor, äpplen och päron. Konsumenterna äger alla fruktträd. Anta att jämvikt uppstår vid priset 1 för päron och 2 för äpplen, med 200 päron och 100 äpplen. Då är inkomsterna $200 \\cdot 1 + 100 \\cdot 2 = 400$, vilket precis räcker till all konsumtion.

Vad händer om **alla priser dubblas** till 2 och 4? Rimligen ingenting: ett äpple kostar fortfarande lika mycket som två päron, och inkomsterna (800) räcker precis till all konsumtion. Kvantiteterna är oförändrade.

**Slutsats:** det är de **relativa priserna** som har betydelse, och med $n$ varor finns det $n - 1$ relativpriser.`,
    },
  ],

  keyTerms: [
    { term: "Z", def: "Efterfrågan på inhemskt producerade varor: $Z \\equiv C + I + G + X - IM$." },
    { term: "Nettoexport (handelsbalans)", def: "$NX \\equiv X - IM$." },
    { term: "Försörjningsbalans", def: "BNP:s fördelning på efterfrågans komponenter." },
    { term: "Lagerinvesteringar", def: "Skillnaden mellan produktion och försäljning. I jämvikt är de noll." },
    { term: "Disponibel inkomst", def: "$Y_D \\equiv Y - T$." },
    { term: "Konsumtionsfunktion", def: "$C = c_0 + c_1 Y_D$, en beteendeekvation." },
    { term: "Marginell konsumtionsbenägenhet", def: "$c_1$, ökningen i konsumtion när $Y_D$ ökar med en krona ($0 < c_1 < 1$)." },
    { term: "Autonom efterfrågan", def: "$c_0 + \\bar I + G - c_1 T$, den del av efterfrågan som inte beror på $Y$." },
    { term: "Multiplikator", def: "$1/(1 - c_1)$, hur mycket Y ökar när den autonoma efterfrågan ökar med 1." },
    { term: "Finanspolitik", def: "Val av offentlig konsumtion G och skatter T." },
    { term: "Privat sparande", def: "$S \\equiv Y_D - C$." },
    { term: "Offentligt sparande", def: "$T - G$ (budgetöverskott)." },
    { term: "Says lag", def: "Utbudet skapar sin egen efterfrågan." },
    { term: "Walras lag", def: "Med $n$ marknader kan jämvikten bara bestämma $n - 1$ (relativ)priser." },
  ],

  quiz: [
    {
      q: "Varför **subtraheras** importen när man beräknar efterfrågan på inhemska varor, $Z$?",
      options: [
        "För att importen är en kostnad för staten",
        "För att importen ingår i C + I + G men inte är efterfrågan på inhemskt producerade varor",
        "För att importen alltid är större än exporten",
        "För att importen räknas som negativ investering",
      ],
      answer: 1,
      explain: "Hushåll, företag och stat köper även utländska varor. Den delen ska inte räknas som efterfrågan på inhemsk produktion.",
      topic: "Efterfrågans komponenter",
    },
    {
      q: "Vilket av följande ingår **inte** i offentlig konsumtion G?",
      options: ["Lärarlöner i kommunala skolor", "Regionernas inköp av sjukvårdsmaterial", "Barnbidrag", "Statens inköp av IT-tjänster"],
      answer: 2,
      explain: "Barnbidrag är en transferering. Transfereringar, bidrag och räntor på statsskulden ingår inte i G.",
      topic: "Efterfrågans komponenter",
    },
    {
      q: "Under 2022 var Sveriges export 3 157 och import 2 982 miljarder kr. Hur stor var nettoexporten (miljarder kr)?",
      type: "numeric", answer: 175, tolerance: 0.5, unit: "miljarder kr",
      explain: "$NX = X - IM = 3\\,157 - 2\\,982 = 175$.",
      topic: "Sveriges försörjningsbalans",
    },
    {
      q: "Om produktionen är större än efterfrågan, vad händer då?",
      options: ["Lagerinvesteringarna blir positiva", "Lagerinvesteringarna blir negativa", "Importen ökar automatiskt", "Ekonomin är i jämvikt"],
      answer: 0,
      explain: "Det som produceras men inte säljs läggs på lager. I jämvikt är lagerinvesteringarna noll.",
      topic: "Efterfrågans komponenter",
    },
    {
      q: "Vad mäter parametern $c_1$ i $C = c_0 + c_1 Y_D$?",
      options: [
        "Konsumtionen när den disponibla inkomsten är noll",
        "Hur mycket konsumtionen ökar när den disponibla inkomsten ökar med en krona",
        "Andelen av inkomsten som betalas i skatt",
        "Multiplikatorn",
      ],
      answer: 1,
      explain: "$c_1$ är den marginella konsumtionsbenägenheten. Det första alternativet beskriver $c_0$.",
      topic: "Konsumtionsfunktionen",
    },
    {
      q: "Om den marginella konsumtionsbenägenheten är 0,75, hur stor är multiplikatorn?",
      type: "numeric", answer: 4, tolerance: 0.01,
      explain: "$1/(1 - 0{,}75) = 1/0{,}25 = 4$.",
      topic: "Jämvikt på varumarknaden",
    },
    {
      q: "Låt $c_0 = 200$, $c_1 = 0{,}6$, $\\bar I = 300$, $G = 400$ och $T = 250$. Hur stor är jämviktsproduktionen $Y$?",
      type: "numeric", answer: 1875, tolerance: 0.5,
      explain: "Autonom efterfrågan $= 200 + 300 + 400 - 0{,}6 \\cdot 250 = 750$. Multiplikatorn är $1/0{,}4 = 2{,}5$, så $Y = 2{,}5 \\cdot 750 = 1\\,875$.",
      topic: "Jämvikt på varumarknaden",
    },
    {
      q: "Med $c_1 = 0{,}6$: hur mycket ökar $Y$ om $G$ ökar med 100?",
      type: "numeric", answer: 250, tolerance: 0.5,
      explain: "$\\Delta Y = \\frac{1}{1 - 0{,}6} \\cdot 100 = 250$.",
      topic: "Jämvikt på varumarknaden",
    },
    {
      q: "Med $c_1 = 0{,}6$: hur mycket ökar $Y$ om skatterna $T$ **sänks** med 100?",
      type: "numeric", answer: 150, tolerance: 0.5,
      explain: "Den autonoma efterfrågan ökar med $c_1 \\cdot 100 = 60$, så $\\Delta Y = 2{,}5 \\cdot 60 = 150$. En skattesänkning ger mindre effekt än en lika stor ökning av G, eftersom hushållen sparar en del.",
      topic: "Jämvikt på varumarknaden",
    },
    {
      q: "Utmaning: G och T ökar **båda** med 100 (budgetneutralt). Hur mycket förändras Y, oavsett $c_1$?",
      type: "numeric", answer: 100, tolerance: 0.5,
      explain: "$\\Delta Y = \\frac{1}{1-c_1}(100 - c_1 \\cdot 100) = \\frac{1 - c_1}{1 - c_1} \\cdot 100 = 100$. Den budgetneutrala multiplikatorn är 1.",
      topic: "Jämvikt på varumarknaden",
    },
    {
      q: "I det keynesianska korset ökar $G$. Hur förändras grafen?",
      options: [
        "ZZ blir brantare och jämvikten flyttas åt vänster",
        "ZZ flyttas parallellt uppåt och jämvikten flyttas åt höger med mer än ökningen i G",
        "45°-linjen flyttas uppåt",
        "ZZ flyttas parallellt uppåt och jämvikten flyttas åt höger med exakt ökningen i G",
      ],
      answer: 1,
      explain: "G påverkar interceptet men inte lutningen $c_1$. Jämvikten ökar med multiplikatorn gånger ΔG, vilket är mer än ΔG.",
      topic: "Jämvikt på varumarknaden",
    },
    {
      q: "Varför antar vi att $c_1 < 1$?",
      options: [
        "Annars blir multiplikatorn negativ",
        "Annars konvergerar inte summan $1 + c_1 + c_1^2 + \\dots$, och det finns ingen ändlig jämvikt",
        "Annars kan inte skatterna vara positiva",
        "Det är ett krav för att investeringarna ska vara exogena",
      ],
      answer: 1,
      explain: "Om $c_1 \\geq 1$ blir varje omgång i multiplikatorprocessen lika stor eller större än den föregående, så processen tar aldrig slut.",
      topic: "Multiplikatorn i ord och formler",
    },
    {
      q: "Med $c_1 = 0{,}5$: hur stor är den kumulativa effekten på Y efter de tre första omgångarna ($1 + c_1 + c_1^2$) av en efterfrågeökning på 1?",
      type: "numeric", answer: 1.75, tolerance: 0.001,
      explain: "$1 + 0{,}5 + 0{,}25 = 1{,}75$. Den totala effekten blir till slut $1/(1-0{,}5) = 2$.",
      topic: "Multiplikatorn i ord och formler",
    },
    {
      q: "Vad händer direkt efter en ökning av efterfrågan, innan produktionen hunnit anpassas?",
      options: [
        "Priserna stiger omedelbart med lika mycket",
        "Lagren minskar (negativa lagerinvesteringar)",
        "Importen faller",
        "Produktionen hoppar direkt till den nya jämvikten",
      ],
      answer: 1,
      explain: "Företagen säljer först ur lager och anpassar sedan produktionen gradvis. Det tar månader eller kvartal.",
      topic: "Anpassningens dynamik",
    },
    {
      q: "Hur definieras privat sparande?",
      options: ["$S = Y - C - G$", "$S = Y_D - C = Y - T - C$", "$S = T - G$", "$S = I - G$"],
      answer: 1,
      explain: "Privat sparande är disponibel inkomst minus konsumtion. $T - G$ är offentligt sparande.",
      topic: "Investeringar = sparande",
    },
    {
      q: "I en sluten ekonomi i jämvikt gäller att …",
      options: [
        "privat sparande = investeringar, alltid",
        "privat sparande + offentligt sparande = investeringar",
        "offentligt sparande = 0",
        "konsumtion = investeringar",
      ],
      answer: 1,
      explain: "$S + (T - G) = I$. Det är samma villkor som $Y = C + I + G$, uttryckt på ett annat sätt.",
      topic: "Investeringar = sparande",
    },
    {
      q: "Vilket av följande är **inte** ett skäl som föreläsningen ger till att man inte alltid bör öka G för att höja produktionen?",
      options: [
        "Investeringar och nettoexport är inte konstanta, så effekterna blir tillfälliga",
        "Budgetunderskott och statsskuld är inte bra på lång sikt",
        "Offentlig konsumtion ingår inte i BNP",
        "Högre produktion kan ge oönskade sidoeffekter som inflation",
      ],
      answer: 2,
      explain: "G är en del av BNP. De andra alternativen är skäl som tas upp på föreläsningen.",
      topic: "Varför inte alltid öka G eller sänka T?",
    },
    {
      q: "Vad säger Walras lag om en ekonomi med $n$ marknader?",
      options: [
        "Alla $n$ priser bestäms entydigt",
        "Marknadsjämvikt kan bara bestämma $n - 1$ priser, dvs. de relativa priserna",
        "Utbudet skapar sin egen efterfrågan",
        "Minst en marknad är alltid i obalans",
      ],
      answer: 1,
      explain: "Om alla priser dubblas ändras inget reellt. Bara de $n-1$ relativpriserna har betydelse. ”Utbudet skapar sin egen efterfrågan” är Says lag.",
      topic: "Lite doktrinhistoria: Say och Walras",
    },
    {
      q: "I fruktexemplet dubblas alla priser (päron 1 → 2, äpplen 2 → 4). Vad händer med jämviktskvantiteterna?",
      options: ["De halveras", "De dubblas", "De är oförändrade", "Efterfrågan på äpplen ökar"],
      answer: 2,
      explain: "Relativpriset (1 äpple = 2 päron) är oförändrat och inkomsterna dubblas lika mycket som priserna. Därför ändras inga kvantiteter.",
      topic: "Lite doktrinhistoria: Say och Walras",
    },
  ],
});
