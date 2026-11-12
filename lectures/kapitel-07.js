// Modell i graferna: D = C + I + G med C + I = 120 + 0,7Y (givet T och i), NX = 0,1·Y* − 0,2·Y − 300·(ε − 1)
registerLecture({
  id: "kapitel-7",
  number: 7,
  title: "Kapitel 7: Varumarknaden i en öppen ekonomi",
  summary: "Inhemsk efterfrågan (DD) och efterfrågan på inhemska varor (ZZ), nettoexport, effekter av G, Y* och växelkursen, Marshall–Lerner-villkoret, sparande och bytesbalans samt komparativa fördelar.",
  tags: ["Öppen ekonomi", "Nettoexport", "Real växelkurs", "Marshall–Lerner", "Komparativa fördelar"],

  sections: [
    {
      heading: "Två sorters efterfrågan: D och Z",
      body: `I en öppen ekonomi måste vi skilja mellan två sorters efterfrågan:

- **D = C + I + G**: efterfrågan från **inhemska** konsumenter, investerare och offentlig sektor. Den kan riktas mot både inhemska och utländska varor.
- **Z**: efterfrågan som riktas mot **inhemska producenter**, både från Sverige och från utlandet.

Det är **Z som bestämmer produktionen**. **Skillnaden mellan Z och D är nettoexporten** (handelsbalansen). Som vanligt studerar vi sedan hur förändringar i exogena variabler påverkar jämvikten.`,
    },
    {
      heading: "Efterfrågan på inhemskt producerade varor, Z",
      body: `$$Z = C + I + G - \\frac{IM}{\\varepsilon} + X$$

**Varför dividerar vi importen med $\\varepsilon$?** Vi räknar allt i **inhemska varor**, men utländska och inhemska varor är inte samma sak. Importen mäts i utländska varor och måste räknas om.

**Exempel:** en Volvo kostar en halv BMW ($\\varepsilon = 0{,}5$ BMW/Volvo). Om vi importerar 1 000 BMW och exporterar 1 000 Volvo är handelsbalansen **inte** noll, utan **−1 000 Volvo**: importen motsvarar $1000/0{,}5 = 2000$ Volvo. För att handelsbalansen ska bli noll måste vi exportera **2 000 Volvo**.

### Vad bestämmer C, I, X och IM?
- Som tidigare beror konsumtionen på disponibel inkomst och investeringarna på produktion och ränta: $C + I + G = C(Y - T) + I(Y, i) + G$.
- Den reala växelkursen påverkar **sammansättningen** av konsumtion och investeringar (hur stor andel som är utländsk), men inte den **totala nivån**. Det är en förenkling.
- **Högre real växelkurs** (inhemska varor blir relativt dyrare) ger **mer import och mindre export**, och tvärtom.
- **Högre inhemsk inkomst Y** ger mer import. **Högre utländsk inkomst Y\\*** ger mer export.

$$IM = IM(\\underset{+}{Y}, \\underset{+}{\\varepsilon}) \\qquad X = X(\\underset{+}{Y^*}, \\underset{-}{\\varepsilon})$$`,
    },
    {
      heading: "DD, AA och ZZ",
      body: `Vi bygger efterfrågan på inhemska varor steg för steg:

1. **DD**, inhemsk efterfrågan $D = C(Y - T) + I(Y, i) + G$, ökar med Y.
2. Dra bort importen. Den ökar med inkomsten och måste mätas i inhemska varor, alltså som $IM(Y, \\varepsilon)/\\varepsilon$. Då får vi **AA**, den del av den inhemska efterfrågan som riktas mot inhemska varor: $A = D - IM(Y, \\varepsilon)/\\varepsilon$.
3. Lägg till exporten, som **inte** beror på Y. Då får vi **ZZ**, den totala efterfrågan på inhemska varor:
$$Z = D - \\frac{IM(Y, \\varepsilon)}{\\varepsilon} + X(Y^*, \\varepsilon)$$

**ZZ är flackare än DD**, eftersom en del av varje extra krona i inkomst läcker ut som import.

**Nettoexporten** $NX = X - IM/\\varepsilon$ är lika med $Z - D$, dvs. **avståndet mellan ZZ och DD**. Vid $Y_{TB}$ (*trade balance*) skär ZZ och DD varandra och NX = 0. Vid lägre Y är NX positiv, och vid högre Y negativ.`,
    },
    {
      heading: "Jämvikt på varumarknaden och nettoexport",
      body: `$$Y = C(Y - T) + I(Y, i) + G - \\frac{IM(Y, \\varepsilon)}{\\varepsilon} + X(Y^*, \\varepsilon)$$

- **Jämvikt** uppstår när efterfrågan på inhemska varor (högerledet) är lika med produktionen Y, dvs. där **ZZ skär 45°-linjen**.
- **Handelsbalansen behöver inte vara noll** i jämvikt.
- Ju större jämviktsproduktionen är, desto **mindre** blir nettoexporten.

Använd grafen nedan för att undersöka de tre experimenten i följande avsnitt. Den nedre grafen visar nettoexporten som funktion av Y.`,
      graphs: [
        {
          type: "curves",
          title: "Varumarknaden i en öppen ekonomi",
          xLabel: "Produktion/inkomst, Y", yLabel: "Efterfrågan",
          x: [0, 3000], y: [0, 3000],
          params: {
            G: { label: "Offentlig konsumtion G", min: 200, max: 700, step: 10, value: 400 },
            Ys: { label: "Utländsk inkomst Y*", min: 2000, max: 6000, step: 50, value: 4000 },
            eps: { label: "Real växelkurs ε", min: 0.7, max: 1.3, step: 0.01, value: 1 },
          },
          curves: [
            { label: "DD", fn: "120 + 0.7*x + G", ghost: true },
            { label: "ZZ", fn: "120 + 0.7*x + G + 0.1*Ys - 0.2*x - 300*(eps - 1)", ghost: true },
            { label: "45°", fn: "x", dashed: true, color: "var(--muted)" },
          ],
          points: [
            { between: ["ZZ", "45°"], label: "A" },
            { between: ["ZZ", "DD"], label: "TB", guides: false },
          ],
          readout: "Jämvikt Y = {A.x} · Y_TB = {TB.x} · nettoexport i jämvikt NX = {=0.1*Ys - 0.2*((120 + G + 0.1*Ys - 300*(eps-1))/0.5) - 300*(eps-1)} · multiplikator 1/(1 − 0,5) = 2",
          caption: "Här är $D = 120 + 0{,}7Y + G$ och $NX = 0{,}1Y^* - 0{,}2Y - 300(\\varepsilon - 1)$. ZZ har lutningen 0,5, mot 0,7 för DD. Multiplikatorn är därför 2 i den öppna ekonomin, jämfört med $1/0{,}3 \\approx 3{,}3$ om ekonomin vore sluten.",
        },
        {
          type: "curves",
          title: "Nettoexport som funktion av inkomsten",
          xLabel: "Produktion/inkomst, Y", yLabel: "Nettoexport, NX",
          x: [0, 3000], y: [-300, 500],
          params: {
            G: { label: "Offentlig konsumtion G", min: 200, max: 700, step: 10, value: 400 },
            Ys: { label: "Utländsk inkomst Y*", min: 2000, max: 6000, step: 50, value: 4000 },
            eps: { label: "Real växelkurs ε", min: 0.7, max: 1.3, step: 0.01, value: 1 },
          },
          curves: [
            { label: "NX", fn: "0.1*Ys - 0.2*x - 300*(eps - 1)", ghost: true },
            { label: "NX = 0", fn: "0", dashed: true, color: "var(--muted)" },
            { label: "Jämvikts-Y", xAt: "(120 + G + 0.1*Ys - 300*(eps-1))/0.5", dashed: true },
          ],
          points: [
            { between: ["NX", "Jämvikts-Y"], label: "A" },
            { between: ["NX", "NX = 0"], label: "Y_TB", guides: false },
          ],
          readout: "I jämvikt: Y = {A.x} och NX = {A.y}. Handelsbalansen är noll vid Y_TB = {Y_TB.x}.",
          caption: "NX-linjen flyttas inte när G ändras. Däremot ökar jämvikts-Y, och man rör sig längs linjen till lägre NX. Ändringar i Y* och ε flyttar själva NX-linjen.",
        },
      ],
    },
    {
      heading: "Ökad inhemsk efterfrågan: G ökar",
      body: `- DD och ZZ flyttas **lika mycket uppåt**.
- **$Y_{TB}$ ändras inte**, eftersom DD och ZZ fortfarande skär varandra vid samma Y (givet att växelkursen hålls konstant).
- Jämvikten flyttas till ett högre Y. Om Y = $Y_{TB}$ från början blir $Y' > Y_{TB}$ efter ökningen.

**Slutsats:** högre G ger **högre produktion** och **sämre handelsbalans** (lägre NX).

Lägg också märke till att multiplikatorn är **mindre** i en öppen ekonomi, eftersom en del av den ökade efterfrågan går till import.`,
    },
    {
      heading: "Ökad utländsk inkomst: Y* ökar",
      body: `- Y\\* finns i ZZ (genom exporten) men **inte** i DD. ZZ flyttas uppåt, men DD gör det inte.
- **$Y_{TB}$ ökar**, eftersom DD och ZZ nu skär varandra vid ett högre Y.
- Y ökar (där nya ZZ′ skär 45°-linjen), men **$Y_{TB}$ ökar mer**. Om Y = $Y_{TB}$ från början blir $Y' < Y'_{TB}$ efteråt.

**Slutsats:** högre Y\\* ger **högre produktion** och **bättre handelsbalans**. En utländsk högkonjunktur smittar alltså av sig på Sverige.`,
    },
    {
      heading: "Nettoexport och växelkurs: Marshall–Lerner-villkoret",
      body: `$$NX(\\underset{-}{Y}, \\underset{+}{Y^*}, \\underset{?}{\\varepsilon}) \\equiv X(Y^*, \\varepsilon) - \\frac{IM(Y, \\varepsilon)}{\\varepsilon}$$

- NX **faller** med inhemsk inkomst (importen ökar) och **stiger** med utländsk inkomst (exporten ökar).
- Vad händer om den **reala växelkursen stiger** (real appreciering)? Det finns tre effekter:
  1. **Exporten minskar**, eftersom inhemska varor blir dyrare.
  2. **Importvolymen ökar**, eftersom utländska varor blir billigare.
  3. **Priset på en given importvolym minskar** (i inhemska varor räknat), eftersom vi dividerar med ett större ε.
- De två första effekterna **försämrar** handelsbalansen, men den tredje drar åt **motsatt håll**. För att en högre ε ska försämra handelsbalansen måste export- och importvolymerna vara **tillräckligt priskänsliga**.

Om så är fallet säger vi att **Marshall–Lerner-villkoret** är uppfyllt. I praktiken är det (nästan alltid) uppfyllt, åtminstone efter en tid.

I grafen nedan är exportvolymen $X = 100\\,\\varepsilon^{-a}$ och importvolymen $IM = 100\\,\\varepsilon^{b}$. Marshall–Lerner-villkoret är uppfyllt när $a + b > 1$. Sätt $a = b = 0$ (helt okänsliga volymer på mycket kort sikt): då **ökar** NX när ε stiger.`,
      graphs: [
        {
          type: "curves",
          title: "Nettoexport som funktion av den reala växelkursen",
          xLabel: "Real växelkurs ε", yLabel: "Nettoexport, NX",
          x: [0.6, 1.4], y: [-120, 120],
          params: {
            a: { label: "Exportens priskänslighet a", min: 0, max: 2, step: 0.05, value: 1 },
            b: { label: "Importens priskänslighet b", min: 0, max: 2, step: 0.05, value: 1 },
          },
          curves: [
            { label: "NX", fn: "100*pow(x, -a) - 100*pow(x, b)/x", ghost: true },
            { label: "0", fn: "0", dashed: true, color: "var(--muted)" },
          ],
          readout: "a + b = {=a + b}. Om ε stiger från 1,0 till 1,1 ändras NX med {=(100*pow(1.1,-a) - 100*pow(1.1,b)/1.1)} (positivt = förbättring).",
          caption: "Om $a + b > 1$ lutar NX nedåt: en real appreciering försämrar handelsbalansen och en real depreciering förbättrar den. Om $a + b < 1$ är det tvärtom.",
        },
      ],
    },
    {
      heading: "Real växelkurs och jämvikt på varumarknaden",
      body: `$$Y = C(\\underset{+}{Y - T}) + I(\\underset{+}{Y}, \\underset{-}{i}) + G + NX(\\underset{-}{Y}, \\underset{+}{Y^*}, \\underset{-}{\\varepsilon})$$

Både **räntan** och den **reala växelkursen** påverkar efterfrågan och därmed jämviktsproduktionen:
- **Högre ränta** minskar investeringarna och därmed produktionen.
- **Högre real växelkurs** minskar nettoexporten och därmed produktionen (givet Marshall–Lerner-villkoret).

Kom ihåg att $\\varepsilon \\equiv EP/P^*$. Om vi antar att priserna hemma och utomlands är konstanta kan vi sätta $P/P^* = 1$, eftersom båda är index med godtycklig basnivå. **Då är $\\varepsilon = E$.** Det är realistiskt på kort sikt, eftersom den nominella växelkursen varierar mycket mer än prisnivån.

### Real depreciering
- ε finns (negativt) i ZZ men **inte** i DD. Lägre ε flyttar ZZ uppåt, men inte DD.
- **$Y_{TB}$ ökar.** Y ökar, men $Y_{TB}$ ökar mer.

**Slutsats:** lägre ε ger **högre produktion** och **bättre handelsbalans**.

### Real depreciering + finanspolitisk åtstramning
Antag att nettoexporten är negativ och att man vill göra den positiv **utan att Y ändras**:
- Den reala deprecieringen flyttar **ZZ uppåt** (men inte DD).
- En åtstramande finanspolitik flyttar **både DD och ZZ nedåt** lika mycket. ZZ hamnar där den var från början, medan DD hamnar lägre (DD′).
- $Y_{TB}$ ökar, och NX (avståndet mellan ZZ och DD) blir större.

**Slutsats:** med lagom stor finanspolitisk åtstramning blir **Y oförändrad** men **handelsbalansen förbättras**. Prova i grafen ovan: sänk ε till 0,9 och sänk sedan G med 30.`,
    },
    {
      heading: "Sparande, investeringar och bytesbalans",
      body: `I den slutna ekonomin var investeringarna lika med sparandet. **Öppenhet gör det möjligt för ett land att låna till sina investeringar eller att investera utomlands.**

Skriv om jämviktsvillkoret:
$$Y = C + I + G + NX \\quad\\Rightarrow\\quad Y - C - G = I + NX$$
Vänsterledet är värdet av det som produceras minus det som konsumeras av privat och offentlig sektor. Om det är positivt kan det användas till investeringar och/eller nettoexport.

Lägg till **nettoinkomster från omvärlden NI** på båda sidor (BNP och BNI kan skilja sig åt), subtrahera och addera T, och flytta I till vänster:
$$\\underbrace{(Y + NI - T - C)}_{\\text{privat sparande}} + \\underbrace{(T - G)}_{\\text{offentligt sparande}} - I = \\underbrace{NX + NI}_{\\text{bytesbalans (CA)}}$$

**Privat plus offentligt sparande minus investeringarna är lika med bytesbalansen.** Ett land som sparar mer än det investerar har överskott i bytesbalansen och lånar ut till omvärlden. Det gäller t.ex. Sverige.`,
    },
    {
      heading: "Tullar: när ett annat land inför tullar",
      body: `Om ett annat land inför **tullar** blir våra exportprodukter dyrare för köparna där. Vi kan fånga det som att **den reala växelkursen för exporten stiger**. I exportuttrycket multipliceras den reala växelkursen med $(1 + \\tau^*)$, där $\\tau^*$ är den utländska tullsatsen:
$$Y = C(Y - T) + I(Y, i) + G - \\frac{IM(Y, \\varepsilon)}{\\varepsilon} + X\\big(Y^*,\; \\varepsilon\\,(1 + \\tau^*)\\big)$$

- Exporten minskar, och därmed **förskjuts ZZ nedåt**. DD påverkas inte.
- **Y minskar** till Y′.
- **$Y_{TB}$ minskar mer**, så **handelsbalansen försämras**.

Effekten liknar alltså en real appreciering, men den gäller bara exporten.`,
      graphs: [
        {
          type: "curves",
          title: "Tullar och motåtgärder i 45°-diagrammet",
          xLabel: "Produktion/inkomst, Y", yLabel: "Efterfrågan",
          x: [0, 3000], y: [0, 3000],
          params: {
            taus: { label: "Utländsk tull på vår export τ* (%)", min: 0, max: 40, step: 1, value: 0 },
            tau: { label: "Vår tull på importen τ (%)", min: 0, max: 40, step: 1, value: 0 },
          },
          curves: [
            { label: "DD", fn: "120 + 0.7*x + 400" },
            { label: "ZZ", fn: "520 + 0.7*x + 400 - 0.2*x - 150*((1 + taus/100) - 1) - 150*(1/(1 + tau/100) - 1)", ghost: true },
            { label: "45°", fn: "x", dashed: true, color: "var(--muted)" },
          ],
          points: [
            { between: ["ZZ", "45°"], label: "A" },
            { between: ["ZZ", "DD"], label: "TB", guides: false },
          ],
          readout: "Y = {A.x} · Y_TB = {TB.x} · export X = {=400 - 150*(taus/100)} · import IM/ε = {=0.2*((520 + 400 - 150*(taus/100) - 150*(1/(1+tau/100) - 1))/0.5) + 150*(1/(1+tau/100) - 1)} · NX = {=400 - 150*(taus/100) - (0.2*((520 + 400 - 150*(taus/100) - 150*(1/(1+tau/100) - 1))/0.5) + 150*(1/(1+tau/100) - 1))}",
          caption: "Här är $\\varepsilon = 1$, $Y^* = 4000$ och $G = 400$. Exporten är $X = 400 - 150\\,(\\varepsilon(1+\\tau^*) - 1)$ och importen $IM/\\varepsilon = 0{,}2Y + 150\\,(\\varepsilon/(1+\\tau) - 1)$. **Prova:** sätt τ* till 20 %. Y faller från 1 840 till 1 780, och Y_TB faller ännu mer, från 2 000 till 1 850. Sätt sedan τ till 25 %. Då är Y och Y_TB tillbaka där de började, men både exporten och importen är lägre än från början.",
        },
      ],
    },
    {
      heading: "Motåtgärder",
      body: `Om det inhemska landet svarar med att självt införa en tull med tullsatsen $\\tau$ på **importen** kommer den in i importuttrycket:
$$Y = C(Y - T) + I(Y, i) + G - \\frac{IM\\big(Y, \\varepsilon/(1 + \\tau)\\big)}{\\varepsilon} + X\\big(Y^*,\; \\varepsilon\\,(1 + \\tau^*)\\big)$$

- Tullen gör importen dyrare, så **importen minskar**. Det **ökar nettoexporten**.
- **ZZ förskjuts därmed tillbaka** uppåt.

### Är allt detsamma?
ZZ har förskjutits tillbaka, och Y och handelsbalansen kan bli som innan. **Men allt är inte detsamma:**
- **Både exporten och importen är lägre** än innan tullarna.
- Handeln orsakas rimligen av **komparativa fördelar**, och de kan inte längre utnyttjas fullt ut till allas bästa.
- **BNP blir lägre för alla**, men den effekten ligger utanför vår modell, där produktionen bara bestäms av efterfrågan.`,
    },
    {
      heading: "Pass-through",
      body: `I exportuttrycket ser vi att en högre tull i importlandet ökar $\\varepsilon\\,(1 + \\tau^*)$, vilket minskar exporten. Exportminskningen kan uppstå **på två sätt**:

- **Antingen** stiger priserna inklusive tull i importlandet, så att konsumenterna där köper mindre,
- **eller** sänker exportörerna sina priser. Men då blir det mindre lönsamt att exportera, så exporten minskar ändå.

Hur mycket priserna stiger i importlandet kallas **pass-through** (genomslag). Om den är **100 %** stiger priserna ett-till-ett med tullen.

**Varför spelar det roll?** Pass-through avgör **vem som drabbas mest** av tullen. Vid 100 % pass-through stiger priserna i det land som inför tullen. Det blir inflation, och **landet som inför tullen drabbas mest**.

### USA och Kina
- Modern forskning visar att de amerikanska tullarna mot Kina hade nästan **100 % pass-through**. De amerikanska konsumenterna fick alltså betala.
- Kinas motåtgärder hade mycket **lägre pass-through**. Amerikanska exportörer fick sänka sina priser och fick därmed mindre betalt.
- **USA skjuter sig alltså själv i båda fötterna.** Importen blir dyrare för konsumenterna, och exportörerna får sämre betalt. Dessutom kan varken USA eller omvärlden fullt ut utnyttja sina komparativa fördelar.

Föreläsningen visar också USA:s importprisindex *exklusive* tullar (FRED). Importpriserna steg kraftigt 2021–2022, planade sedan ut och har stigit igen under 2025–2026. Om utländska exportörer hade tagit tullkostnaden genom att sänka sina priser skulle det här indexet ha fallit, men det har det inte gjort.`,
    },
    {
      heading: "USA:s handels- och bytesbalans",
      body: `Föreläsningen visar amerikansk data från FRED (U.S. Census Bureau och Bureau of Economic Analysis):

- **Handelsbalansen för varor** har länge haft ett stort underskott. Underskottet växte efter 2020. Kring årsskiftet 2024/2025 blev det rekordstort, när importen tidigarelades inför de aviserade tullarna. Därefter har det svängt kraftigt.
- **Handelsbalansen för tjänster** visar ett överskott.
- **Bytesbalansen** har varit negativ under hela perioden sedan 2000. Den har försämrats tydligt efter 2020, och underskottet var som störst i början av 2025.

USA:s bytesbalans har alltså **otvetydigt försämrats** under senare år, och USA:s tillgångar i omvärlden växer långsammare än skulderna.

### Bytesbalansidentiteten
Kom ihåg nationalinkomstidentiteten från tidigare i kapitlet:
$$(Y + NI - T - C) + (T - G) - I = NX + NI$$
**Privat sparande + offentligt sparande − investeringar = bytesbalansen** (handelsbalansen plus nettofaktorinkomster).

- NX har länge varit negativ, och på senare tid har även NI fallit, men den har delvis återhämtat sig.
- I vänsterledet är det **offentliga sparandet i USA katastrofalt lågt**, och det privata sparandet är också lågt i ett internationellt perspektiv.
- Det är nog **vänsterledet USA behöver göra något åt**: det privata sparandet behöver öka och de enorma offentliga underskotten behöver minska. Då ordnar sig nog handelsbalansen.
- **Skattesänkningar och tullar gör inte saken bättre.** Skattesänkningar minskar det offentliga sparandet. Tullar ändrar inte sparandet och investeringarna, men minskar både exporten och importen.`,
      takeaway: "Bytesbalansen bestäms i grunden av sparande och investeringar. Tullar kan inte lösa ett bytesbalansunderskott som beror på för lågt sparande.",
    },
    {
      heading: "Lite doktrinhistoria: komparativa fördelar",
      body: `**David Ricardo** (1772–1823) visade att vilka varor ett land exporterar beror på **komparativa fördelar**. Handel kan vara värdefull även om ett land är **mindre produktivt i båda varorna**. Det som krävs är att den **relativa** produktiviteten skiljer sig mellan länderna.

### Exemplet från föreläsningen
Två länder, A och B, har 100 enheter arbetskraft var.

| | Arbete per maskin | Arbete per enhet mat | Relativpris på maskiner (utan handel) |
|---|---:|---:|---:|
| Land A | 1 | 1 | 1 |
| Land B | 4 | 2 | 2 |

**Utan handel** (hälften av arbetskraften till varje vara):
- A: 50 maskiner och 50 mat. B: 12,5 maskiner och 25 mat.
- **Global produktion: 62,5 maskiner och 75 mat.**

**Med handel och specialisering:**
- B specialiserar sig helt på mat och producerar **50 mat**.
- A lägger 25 enheter arbete på mat och 62,5 på maskiner. Globalt produceras då lika mycket som tidigare: 62,5 maskiner och 75 mat.
- A har **12,5 enheter arbetskraft över**, som kan användas till ökad global produktion. A exporterar maskiner och B exporterar mat, **trots att A är mer produktivt även i mat**.
- I jämvikt hamnar relativpriset på maskiner på världsmarknaden **mellan 1 och 2**.

### Pareto och Heckscher–Ohlin
- Handel ger här en **Pareto-förbättring** (efter Vilfredo Pareto, 1848–1923): minst en individ får det bättre utan att någon får det sämre.
- **Eli Heckscher** (1879–1952) och **Bertil Ohlin** (1899–1979) förklarade **vad som avgör** de komparativa fördelarna: skillnader i hur rikligt länderna har tillgång till olika **produktionsfaktorer**. Om maskinproduktion kräver mycket högutbildad arbetskraft och land A har en stor andel högutbildade, har A en komparativ fördel i maskiner.
- Bertil Ohlin fick ekonomipriset **1977**.`,
      graphs: [
        {
          type: "curves",
          title: "Produktionsmöjligheter i land A och B",
          xLabel: "Mat", yLabel: "Maskiner",
          x: [0, 110], y: [0, 110],
          curves: [
            { label: "Land A: maskiner + mat = 100", fn: "100 - x", domain: [0, 100] },
            { label: "Land B: 4·maskiner + 2·mat = 100", fn: "25 - x/2", domain: [0, 50] },
          ],
          texts: [
            { at: [50, 56], text: "A utan handel (50, 50)" },
            { at: [25, 18], text: "B utan handel (25; 12,5)" },
          ],
          caption: "Kurvornas lutning är det relativa priset på maskiner uttryckt i mat utan handel: 1 i A och 2 i B. Eftersom lutningarna skiljer sig finns det vinster att hämta på specialisering och handel.",
        },
      ],
    },
  ],

  keyTerms: [
    { term: "D (DD)", def: "Inhemsk efterfrågan, $C + I + G$." },
    { term: "Z (ZZ)", def: "Efterfrågan på inhemskt producerade varor, $D - IM/\\varepsilon + X$." },
    { term: "Nettoexport NX", def: "$X - IM/\\varepsilon = Z - D$." },
    { term: "Y_TB", def: "Den produktionsnivå där handelsbalansen är noll (där DD och ZZ skär varandra)." },
    { term: "Marshall–Lerner-villkoret", def: "Export- och importvolymerna är så priskänsliga att en real depreciering förbättrar handelsbalansen." },
    { term: "Bytesbalans (CA)", def: "$NX + NI$, vilket är lika med privat + offentligt sparande − investeringar." },
    { term: "Komparativ fördel", def: "Lägre relativ alternativkostnad för att producera en vara." },
    { term: "Pareto-förbättring", def: "Minst en individ får det bättre utan att någon får det sämre." },
    { term: "Heckscher–Ohlin", def: "Komparativa fördelar beror på skillnader i tillgången till produktionsfaktorer." },
    { term: "Tull", def: "En avgift på importerade varor. En utländsk tull $\\tau^*$ verkar som en högre real växelkurs för vår export: $\\varepsilon(1+\\tau^*)$." },
    { term: "Motåtgärd", def: "En egen tull $\\tau$ på importen, som svar på andra länders tullar. Den minskar importen: $IM(Y, \\varepsilon/(1+\\tau))$." },
    { term: "Pass-through", def: "Hur mycket priserna i importlandet stiger när en tull införs. Vid 100 % stiger de ett-till-ett med tullen." },
  ],

  quiz: [
    {
      q: "Vad är skillnaden mellan D och Z i en öppen ekonomi?",
      options: [
        "D är efterfrågan från utlandet och Z är inhemsk efterfrågan",
        "D är inhemsk efterfrågan (C + I + G) och Z är efterfrågan på inhemskt producerade varor",
        "D och Z är samma sak",
        "D inkluderar exporten men inte Z",
      ],
      answer: 1,
      explain: "Z = D − IM/ε + X. Det är Z som bestämmer produktionen.",
      topic: "Två sorters efterfrågan: D och Z",
    },
    {
      q: "Varför divideras importen med ε i uttrycket för Z?",
      options: [
        "För att importen beskattas",
        "För att importen mäts i utländska varor och måste räknas om till inhemska varor",
        "För att importen är mindre viktig",
        "För att växelkursen alltid är 1",
      ],
      answer: 1,
      explain: "Om en Volvo kostar en halv BMW motsvarar 1 000 importerade BMW 2 000 Volvo.",
      topic: "Efterfrågan på inhemskt producerade varor, Z",
    },
    {
      q: "En Volvo kostar en halv BMW (ε = 0,5). Sverige importerar 1 000 BMW. Hur många Volvo måste exporteras för att handelsbalansen ska vara noll?",
      type: "numeric", answer: 2000, tolerance: 0.5, unit: "Volvo",
      explain: "$IM/\\varepsilon = 1000/0{,}5 = 2000$.",
      topic: "Efterfrågan på inhemskt producerade varor, Z",
    },
    {
      q: "Varför är ZZ flackare än DD?",
      options: [
        "För att exporten ökar med Y",
        "För att importen ökar med inkomsten, så en del av varje extra krona läcker ut till utlandet",
        "För att räntan stiger med Y",
        "För att G minskar med Y",
      ],
      answer: 1,
      explain: "Exporten beror inte på Y, men importen gör det. Därför ökar Z mindre än D när Y ökar.",
      topic: "DD, AA och ZZ",
    },
    {
      q: "Vad visar avståndet mellan ZZ och DD?",
      options: ["Importen", "Exporten", "Nettoexporten (Z − D)", "Sparandet"],
      answer: 2,
      explain: "Där ZZ ligger över DD är NX positiv, och där ZZ ligger under DD är NX negativ.",
      topic: "DD, AA och ZZ",
    },
    {
      q: "Offentlig konsumtion G ökar i en öppen ekonomi. Vad händer?",
      options: [
        "Y ökar och handelsbalansen förbättras",
        "Y ökar och handelsbalansen försämras, medan Y_TB är oförändrad",
        "Y minskar och handelsbalansen förbättras",
        "Y_TB ökar mer än Y",
      ],
      answer: 1,
      explain: "DD och ZZ flyttas lika mycket, så Y_TB ändras inte. Högre Y ger mer import.",
      topic: "Ökad inhemsk efterfrågan: G ökar",
    },
    {
      q: "Utländsk inkomst Y* ökar (utländsk högkonjunktur). Vad händer?",
      options: [
        "Y ökar och handelsbalansen förbättras",
        "Y ökar och handelsbalansen försämras",
        "Y påverkas inte",
        "Bara DD flyttas",
      ],
      answer: 0,
      explain: "Bara ZZ flyttas uppåt. Y ökar, men Y_TB ökar ännu mer, så NX blir positiv i jämvikt.",
      topic: "Ökad utländsk inkomst: Y* ökar",
    },
    {
      q: "Varför är multiplikatorn mindre i en öppen ekonomi än i en sluten?",
      options: [
        "För att exporten minskar när Y ökar",
        "För att en del av den ökade efterfrågan går till import i stället för till inhemsk produktion",
        "För att räntan är högre",
        "För att skatterna är högre",
      ],
      answer: 1,
      explain: "ZZ är flackare, och flackare efterfrågekurva betyder mindre multiplikator.",
      topic: "Ökad inhemsk efterfrågan: G ökar",
    },
    {
      q: "Vilka tre effekter har en real appreciering (ε ökar) på nettoexporten?",
      options: [
        "Exporten ökar, importvolymen minskar och importpriset ökar",
        "Exporten minskar, importvolymen ökar och priset på en given importvolym (i inhemska varor) minskar",
        "Bara exporten påverkas",
        "Alla tre effekterna förbättrar handelsbalansen",
      ],
      answer: 1,
      explain: "De två första försämrar handelsbalansen och den tredje förbättrar den. Marshall–Lerner-villkoret avgör nettoeffekten.",
      topic: "Nettoexport och växelkurs: Marshall–Lerner-villkoret",
    },
    {
      q: "Vad säger Marshall–Lerner-villkoret?",
      options: [
        "Att handelsbalansen alltid är noll",
        "Att export- och importvolymerna är tillräckligt priskänsliga för att en real depreciering ska förbättra handelsbalansen",
        "Att räntan bestäms av växelkursen",
        "Att exporten är oberoende av växelkursen",
      ],
      answer: 1,
      explain: "Om villkoret är uppfyllt minskar NX när ε ökar.",
      topic: "Nettoexport och växelkurs: Marshall–Lerner-villkoret",
    },
    {
      q: "Export- och importvolymerna är helt okänsliga för relativpriset på mycket kort sikt. Vad händer då med nettoexporten om den reala växelkursen stärks?",
      options: ["Den ökar", "Den minskar", "Den påverkas inte", "Den blir noll"],
      answer: 0,
      explain: "Bara den tredje effekten verkar: samma importvolym kostar färre inhemska varor, så NX = X − IM/ε ökar när ε ökar.",
      topic: "Nettoexport och växelkurs: Marshall–Lerner-villkoret",
    },
    {
      q: "Under vilket antagande är ε = E?",
      options: [
        "Om räntorna är lika hemma och utomlands",
        "Om priserna hemma och utomlands är konstanta, så att P/P* kan sättas till 1",
        "Om handelsbalansen är noll",
        "Om Marshall–Lerner-villkoret är uppfyllt",
      ],
      answer: 1,
      explain: "Det är realistiskt på kort sikt, eftersom priserna är trögrörliga medan E varierar mycket.",
      topic: "Real växelkurs och jämvikt på varumarknaden",
    },
    {
      q: "En real depreciering (ε sjunker), givet Marshall–Lerner. Vad händer?",
      options: [
        "Bara DD flyttas uppåt, och Y_TB minskar",
        "ZZ flyttas uppåt, Y ökar och handelsbalansen förbättras",
        "ZZ flyttas nedåt och Y minskar",
        "Ingenting händer",
      ],
      answer: 1,
      explain: "ε finns i ZZ men inte i DD. Y_TB ökar mer än Y.",
      topic: "Real växelkurs och jämvikt på varumarknaden",
    },
    {
      q: "Ett land vill förbättra handelsbalansen utan att Y ändras. Vilken kombination fungerar?",
      options: [
        "Real appreciering + finanspolitisk expansion",
        "Real depreciering + finanspolitisk åtstramning",
        "Real depreciering + finanspolitisk expansion",
        "Bara finanspolitisk expansion",
      ],
      answer: 1,
      explain: "Deprecieringen flyttar ZZ upp, och åtstramningen flyttar DD och ZZ ned. ZZ hamnar på samma ställe, medan DD hamnar lägre, så NX ökar.",
      topic: "Real växelkurs och jämvikt på varumarknaden",
    },
    {
      q: "I en öppen ekonomi gäller att privat sparande + offentligt sparande − investeringar = …",
      options: ["0", "Bytesbalansen (NX + NI)", "BNP", "Budgetunderskottet"],
      answer: 1,
      explain: "$(Y + NI - T - C) + (T - G) - I = NX + NI$.",
      topic: "Sparande, investeringar och bytesbalans",
    },
    {
      q: "När är varumarknaden i jämvikt i en öppen ekonomi?",
      options: [
        "När inhemsk efterfrågan C + I + G är lika med produktionen",
        "När efterfrågan på inhemskt producerade varor C + I + G + NX är lika med produktionen",
        "När exporten är lika med importen",
        "När sparandet är lika med investeringarna",
      ],
      answer: 1,
      explain: "Jämvikten ligger där ZZ skär 45°-linjen. Handelsbalansen behöver inte vara noll.",
      topic: "Jämvikt på varumarknaden och nettoexport",
    },
    {
      q: "Land A behöver 1 enhet arbete per maskin och 1 per mat. Land B behöver 4 respektive 2. Vilket land har komparativ fördel i mat?",
      options: ["Land A", "Land B", "Inget av dem", "Båda"],
      answer: 1,
      explain: "I B kostar en enhet mat en halv maskin, men i A kostar den en hel maskin. B har lägre alternativkostnad för mat, trots att A har absolut fördel i båda varorna.",
      topic: "Lite doktrinhistoria: komparativa fördelar",
    },
    {
      q: "Mellan vilka värden hamnar världsmarknadspriset på maskiner (uttryckt i mat) i exemplet?",
      options: ["Mellan 0 och 1", "Mellan 1 och 2", "Mellan 2 och 4", "Exakt 1,5"],
      answer: 1,
      explain: "Det hamnar mellan de två ländernas relativpriser utan handel (1 och 2).",
      topic: "Lite doktrinhistoria: komparativa fördelar",
    },
    {
      q: "Vad förklarar komparativa fördelar enligt Heckscher–Ohlin-modellen?",
      options: [
        "Skillnader i valuta",
        "Skillnader i den relativa tillgången på produktionsfaktorer",
        "Skillnader i räntenivå",
        "Slumpen",
      ],
      answer: 1,
      explain: "Ett land med mycket högutbildad arbetskraft har komparativ fördel i varor som kräver sådan arbetskraft.",
      topic: "Lite doktrinhistoria: komparativa fördelar",
    },
    {
      q: "Ett annat land inför tullar på svensk export. Vad händer i 45°-diagrammet för Sverige?",
      options: [
        "DD och ZZ flyttas lika mycket nedåt. Y minskar och Y_TB är oförändrad",
        "ZZ flyttas nedåt (men inte DD). Y minskar, Y_TB minskar mer och handelsbalansen försämras",
        "ZZ flyttas uppåt. Y ökar och handelsbalansen förbättras",
        "Ingenting, eftersom tullen betalas av utländska konsumenter",
      ],
      answer: 1,
      explain: "Tullen verkar som en högre real växelkurs för exporten, $\\varepsilon(1+\\tau^*)$. Exporten minskar, vilket bara påverkar ZZ.",
      topic: "Tullar: när ett annat land inför tullar",
    },
    {
      q: "Hur kommer den utländska tullsatsen $\\tau^*$ in i modellen?",
      options: [
        "Som $X(Y^*, \\varepsilon(1+\\tau^*))$, dvs. som en högre real växelkurs för exporten",
        "Som $X(Y^*(1+\\tau^*), \\varepsilon)$, dvs. som högre utländsk inkomst",
        "Som en högre skatt T i Sverige",
        "Som $IM(Y, \\varepsilon(1+\\tau^*))$",
      ],
      answer: 0,
      explain: "Våra varor blir dyrare för de utländska köparna, precis som om den reala växelkursen hade stigit, men bara för exporten.",
      topic: "Tullar: när ett annat land inför tullar",
    },
    {
      q: "Sverige svarar med en egen tull på importen (en motåtgärd). Vad händer?",
      options: [
        "Importen ökar och ZZ flyttas nedåt ytterligare",
        "Importen minskar, nettoexporten ökar och ZZ flyttas tillbaka uppåt",
        "Bara DD påverkas",
        "Exporten ökar till den nivå den hade innan",
      ],
      answer: 1,
      explain: "Importtullen gör importen dyrare: $IM(Y, \\varepsilon/(1+\\tau))$ minskar. Exporten förblir dock lägre än innan.",
      topic: "Motåtgärder",
    },
    {
      q: "Efter motåtgärden har ZZ flyttats tillbaka till sitt ursprungliga läge. Är allt som innan?",
      options: [
        "Ja, Y, export och import är som innan tullarna",
        "Nej, både exporten och importen är lägre, och de komparativa fördelarna kan inte utnyttjas fullt ut, så BNP blir lägre för alla (utanför modellen)",
        "Nej, Y är permanent högre",
        "Nej, handelsbalansen är permanent i överskott",
      ],
      answer: 1,
      explain: "Y och NX kan bli desamma i modellen, men handelsvolymen är mindre och vinsterna från specialisering går förlorade.",
      topic: "Motåtgärder",
    },
    {
      q: "Vad menas med att en tull har 100 % pass-through?",
      options: [
        "Att exportörerna sänker sina priser lika mycket som tullen",
        "Att priserna i importlandet stiger ett-till-ett med tullen, så att konsumenterna i landet som inför tullen betalar den",
        "Att tullen inte påverkar handeln",
        "Att hela tullen går tillbaka till exportlandet",
      ],
      answer: 1,
      explain: "Med 100 % pass-through drabbas framför allt landet som inför tullen, genom högre priser och inflation.",
      topic: "Pass-through",
    },
    {
      q: "Vad visade forskningen om de amerikanska tullarna mot Kina och Kinas motåtgärder?",
      options: [
        "Båda hade nära 0 % pass-through",
        "USA:s tullar hade nära 100 % pass-through (amerikanska konsumenter betalade), medan Kinas motåtgärder hade låg pass-through (amerikanska exportörer fick sänka sina priser)",
        "Kinesiska exportörer betalade hela USA:s tull",
        "Tullarna förbättrade USA:s bytesbalans kraftigt",
      ],
      answer: 1,
      explain: "USA ”skjuter sig själv i båda fötterna”: dyrare import för konsumenterna och sämre betalt för exportörerna.",
      topic: "Pass-through",
    },
    {
      q: "Enligt bytesbalansidentiteten, vad behöver USA främst göra för att förbättra sin bytesbalans?",
      options: [
        "Införa högre tullar",
        "Sänka skatterna",
        "Öka det privata sparandet och minska de offentliga underskotten",
        "Öka investeringarna",
      ],
      answer: 2,
      explain: "$S + (T - G) - I = NX + NI$. Tullar ändrar inte sparandet, och skattesänkningar minskar det offentliga sparandet.",
      topic: "USA:s handels- och bytesbalans",
    },
  ],
});
