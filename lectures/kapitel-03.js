registerLecture({
  id: "kapitel-3",
  number: 3,
  title: "Kapitel 3: Penningmarknaden",
  summary: "Efterfrågan på pengar, jämvikt på penningmarknaden, öppna marknadsoperationer, obligationspriser och räntor, bankernas roll och likviditetsfällan.",
  tags: ["Pengar", "Ränta", "Riksbanken", "Obligationer", "Banker"],

  sections: [
    {
      heading: "Frågorna i kapitlet",
      body: `- Hur kommer **pengar** och **räntan** på sparande in i bilden?
- Vad gör **centralbanken**?
- Vad gör **affärsbankerna**?

I kapitel 2 var investeringarna exogena och räntan fanns inte med. Nu tar vi fram en teori för hur räntan bestäms, och i kapitel 4 kopplar vi ihop den med varumarknaden.`,
    },
    {
      heading: "Efterfrågan på pengar",
      body: `**Pengar** är kontanter och transaktionskonton som man kan handla med, t.ex. via bankkort. De är en form av förmögenhet. Men det är sällan rimligt att ha *all* sin förmögenhet i pengar. I modellen är alternativet **obligationer**, dvs. skuldsedlar som ger ränta men som är krångliga eller omöjliga att använda för löpande transaktioner.

Vad styr hur stor del av förmögenheten man håller i pengar? Två faktorer:

1. **Transaktioner.** Pengar behövs för löpande inköp. Ju mer inköp per tidsenhet, desto mer pengar efterfrågas.
2. **Räntan.** Pengar ger ingen eller låg ränta. Ju högre ränta på andra sparformer (obligationer), desto mindre pengar efterfrågas. Räntan är **alternativkostnaden** för att hålla pengar.

### Efterfrågefunktionen för pengar
Antag att penningefterfrågan är proportionell mot **nominell inkomst** $PY$ och fallande i räntan $i$:
$$M^d = PY \\cdot L(i), \\qquad L'(i) < 0$$

$L(i) = M^d / PY$ är mängden pengar i förhållande till nominell BNP. För kontanter i Sverige är den i dag ungefär 60/6 000 miljarder, dvs. cirka 1 %.`,
    },
    {
      heading: "Jämvikt på penningmarknaden",
      body: `Antag först att de enda pengarna är **kontanter**. Riksbanken har monopol på att ge ut kontanter och kan styra hur mycket som finns i omlopp. Kalla penningutbudet $M^s$. Jämvikt kräver att $M^s = M^d$, alltså
$$M = PY \\cdot L(i)$$

På penningmarknaden är **M och PY exogena** och **räntan i endogen**. Jämviktsvillkoret bestämmer räntan som funktion av penningmängden och den nominella inkomsten. Sambandet mellan M och i för given PY kallas **LM-sambandet**.

Grafiskt är penningutbudet en lodrät linje vid $M$ och efterfrågan en fallande kurva. Jämvikten ligger i skärningspunkten. Prova:

- **Öka PY:** efterfrågekurvan flyttas åt höger och **räntan stiger**.
- **Öka M:** utbudslinjen flyttas åt höger och **räntan sjunker**.`,
      graphs: [
        {
          type: "curves",
          title: "Penningmarknaden: M = PY · L(i)",
          xLabel: "Pengar, M (miljarder kr)", yLabel: "Ränta, i (%)",
          x: [0, 120], y: [0, 8],
          params: {
            M: { label: "Penningutbud M", min: 20, max: 110, step: 1, value: 60 },
            PY: { label: "Nominell inkomst PY", min: 4000, max: 8000, step: 100, value: 6000 },
          },
          curves: [
            { label: "Md", fn: "max(0, (0.014 - x/PY)/0.002)", ghost: true },
            { label: "Ms", xAt: "M", ghost: true },
          ],
          points: [{ between: ["Md", "Ms"], label: "A" }],
          readout: "Jämviktsränta: i = {A.y} %",
          caption: "Här är $L(i) = 0{,}014 - 0{,}002\\,i$. När $M$ ökar mycket når räntan till slut noll och kan inte sjunka mer. Det är **likviditetsfällan**, som behandlas sist i kapitlet.",
        },
      ],
      takeaway: "Högre inkomst ger högre ränta. Mer pengar ger lägre ränta.",
    },
    {
      heading: "Penningpolitik och öppna marknadsoperationer",
      body: `Centralbankens **tillgångar** är obligationer, andra statspapper och utländsk valuta. Dess **skulder** är de pengar som finns i omlopp (sedlar och mynt). Centralbanken påverkar penningmängden genom att ändra sin balansräkning med **öppna marknadsoperationer**, dvs. genom att köpa eller sälja obligationer mot pengar.

| | Tillgångar (obligationer) | Skulder (pengar) | Kallas |
|---|---:|---:|---|
| Riksbanken **köper** obligationer för 1 mdr | +1 mdr | +1 mdr | **Expansiv** operation (penningpolitisk stimulans) |
| Riksbanken **säljer** obligationer för 1 mdr | −1 mdr | −1 mdr | **Kontraktiv** operation (penningpolitisk åtstramning) |`,
    },
    {
      heading: "Obligationspriser och räntan",
      body: `Ta en obligation med **1 års löptid** som betalar **1 000 kr** om ett år. Om priset i dag är $P_B$ blir räntan
$$i = \\frac{1000 - P_B}{P_B}$$
Löser vi ut priset får vi
$$P_B \\cdot i = 1000 - P_B \\;\\Rightarrow\\; P_B (1 + i) = 1000 \\;\\Rightarrow\\; P_B = \\frac{1000}{1 + i}$$

- **Högre obligationspris = lägre ränta.** När Riksbanken köper obligationer drivs priset upp och räntan ned.
- När Riksbanken säljer obligationer faller priset och räntan stiger.

Det är samma resultat som när vi tittade på penningmängden. Med öppna marknadsoperationer ökar centralbanken mängden pengar genom att minska mängden obligationer i omlopp, och tvärtom.`,
      graphs: [
        {
          type: "curves",
          title: "Priset på en ettårig obligation som betalar 1 000 kr",
          xLabel: "Ränta, i (%)", yLabel: "Pris i dag, P_B (kr)",
          x: [0, 12], y: [880, 1010],
          params: { i: { label: "Ränta i (%)", min: 0, max: 12, step: 0.1, value: 5 } },
          curves: [
            { label: "P_B", fn: "1000/(1 + x/100)" },
            { label: "i", xAt: "i", dashed: true },
          ],
          points: [{ between: ["P_B", "i"], label: "B" }],
          readout: "Vid i = {i} % är priset P_B = {B.y} kr. Avkastning: 1000 − P_B = {=1000 - 1000/(1+i/100)} kr.",
        },
      ],
    },
    {
      heading: "Sätts räntan eller penningmängden?",
      body: `**Moderna centralbanker bestämmer räntan.** Om centralbanken vill att räntan ska vara $\\bar i$ måste den se till att utbudet av pengar är exakt så stort som efterfrågas vid den räntan. Om efterfrågan ändras (t.ex. för att PY ökar) måste utbudet **anpassas**. I praktiken sker det bland annat genom regelbundna auktioner.

Dra i reglagen nedan: räntan ligger fast, och penningmängden blir den variabel som anpassas.`,
      graphs: [
        {
          type: "curves",
          title: "Centralbanken styr räntan, och penningmängden anpassas",
          xLabel: "Pengar, M (miljarder kr)", yLabel: "Ränta, i (%)",
          x: [0, 120], y: [0, 8],
          params: {
            ibar: { label: "Målränta ī (%)", min: 0, max: 6, step: 0.25, value: 2 },
            PY: { label: "Nominell inkomst PY", min: 4000, max: 8000, step: 100, value: 6000 },
          },
          curves: [
            { label: "Md", fn: "max(0, (0.014 - x/PY)/0.002)", ghost: true },
            { label: "ī", fn: "ibar", dashed: true },
          ],
          points: [{ between: ["Md", "ī"], label: "A" }],
          readout: "För att hålla räntan på {ibar} % måste centralbanken tillhandahålla M = {=PY*(0.014 - 0.002*ibar)} miljarder.",
        },
      ],
    },
    {
      heading: "Banker och finansiella mellanhänder",
      body: `**Finansiella intermediärer** (finansiella mellanhänder), t.ex. banker, lånar in pengar från hushåll och företag och använder dem för att köpa obligationer eller aktier, eller lånar ut dem till andra.

- **Pengar är inte bara sedlar och mynt.** Bankerna skapar likvida medel, t.ex. transaktionskonton och kreditkortskrediter, ur mindre likvida tillgångar som bostadslån och obligationer.
- **Penningmängdsmått:** **M0** = sedlar och mynt (ca 60 mdr kr). **M1** inkluderar även lönekonton och liknande (drygt 4 000 mdr kr). **M3** är det bredaste måttet.
- Bankerna måste hålla **reserver**, dvs. spara en del av inlåningen som likvida medel:
  - för att klara (oförutsedda) uttag,
  - för att klara sina egna transaktioner,
  - för att uppfylla legala reservkrav (inte i Sverige, men t.ex. i USA).
- Reserverna kan sättas in hos centralbanken.

### Balansräkning för det finansiella systemet (förenklad)

| | Tillgångar | Skulder |
|---|---|---|
| **Centralbanken** | Obligationer | Bankernas reserver (”inlåningsfacilitet”), sedlar och mynt |
| **Bankerna** | Utlåning (t.ex. bostadslån), reserver hos centralbanken, obligationer | Inlåning (transaktionskonton och mindre likvida konton), annan upplåning, eget kapital |

En viktig del av bankregleringen är **kapitaltäckningsgraden**: hur mycket eget kapital bankerna har i förhållande till sina (riskvägda) tillgångar.`,
    },
    {
      heading: "Efterfrågan på centralbankspengar",
      body: `Hushåll och företag behöver likviditet för löpande betalningar. De håller den i form av **kontanter**, men numera framför allt som **transaktionskonton** i affärsbankerna. Bankerna lånar ut det mesta av inlåningen, men en del hamnar som **reserver** på konton hos centralbanken. Reserverna är lika likvida som kontanter.

$$\\underbrace{\\text{kontanter}}_{\\text{hushåll och företag}} + \\underbrace{\\text{reserver}}_{\\text{banker}} = \\text{efterfrågan på centralbankspengar } (H)$$

Efterfrågan på centralbankspengar är en fallande funktion av räntan, precis som tidigare. Om Riksbanken håller utbudet på nivån $H$ bestäms räntan i skärningspunkten.

**Slutsats:** penningpolitiken får **samma effekter** som när vi bortsåg från bankerna.

Men **efterfrågan på likviditet kan öka kraftigt i en kris.** Viljan att hålla obligationer och aktier faller, och alla vill ha likvida tillgångar. Det hände t.ex. i början av pandemin. Då flyttas efterfrågekurvan kraftigt åt höger, och centralbanken måste tillföra mycket likviditet för att räntan inte ska stiga.`,
    },
    {
      heading: "Likviditetsfällan",
      body: `En tillräckligt expansiv penningpolitik kan pressa ned räntan till **noll**. Då kan man hålla mer pengar **utan alternativkostnad**, eftersom pengar och obligationer ger samma (noll) avkastning.

- Efterfrågan på pengar blir **horisontell vid i = 0**.
- Ytterligare ökningar av $M^s$ har **ingen effekt** på räntan.
- Detta kallas en **likviditetsfälla**: penningpolitiken kan inte sänka räntan under noll.

**Nyare erfarenheter:** vi vet nu att räntan *kan* sänkas under noll. Riksbanken hade negativ styrränta 2015–2019. Men den kan inte sänkas hur långt som helst, eftersom man alltid kan hålla kontanter som ger noll i ränta.

Prova i grafen i avsnittet ”Jämvikt på penningmarknaden”: dra upp M till över ca 85. Räntan fastnar då på noll.`,
    },
  ],

  keyTerms: [
    { term: "Penningefterfrågan", def: "$M^d = PY \\cdot L(i)$, ökar med nominell inkomst och minskar med räntan." },
    { term: "Alternativkostnad för pengar", def: "Räntan man går miste om genom att hålla pengar i stället för obligationer." },
    { term: "LM-sambandet", def: "Sambandet mellan M och i (för given inkomst) som ges av jämvikten på penningmarknaden." },
    { term: "Öppen marknadsoperation", def: "Centralbanken köper (expansiv) eller säljer (kontraktiv) obligationer mot pengar." },
    { term: "Obligationspris", def: "$P_B = 1000/(1+i)$ för en ettårig obligation som betalar 1 000 kr. Högre pris betyder lägre ränta." },
    { term: "Finansiell intermediär", def: "En aktör (t.ex. bank) som lånar in och lånar ut eller placerar pengar." },
    { term: "M0, M1, M3", def: "Penningmängdsmått, från smalast (sedlar och mynt) till bredast." },
    { term: "Reserver", def: "Bankernas likvida medel, t.ex. insättningar hos centralbanken." },
    { term: "Centralbankspengar (H)", def: "Kontanter plus bankernas reserver hos centralbanken." },
    { term: "Kapitaltäckningsgrad", def: "Bankens eget kapital i förhållande till dess riskvägda tillgångar." },
    { term: "Likviditetsfälla", def: "När räntan är noll blir penningefterfrågan horisontell, och mer pengar sänker inte räntan." },
  ],

  quiz: [
    {
      q: "Vilka två faktorer styr främst efterfrågan på pengar i modellen?",
      options: [
        "Prisnivån och växelkursen",
        "Transaktionsvolymen (inkomsten) och räntan på alternativa placeringar",
        "Skatterna och den offentliga konsumtionen",
        "Inflationen och arbetslösheten",
      ],
      answer: 1,
      explain: "Mer transaktioner ger högre efterfrågan på pengar. Högre ränta på obligationer gör det dyrare att hålla pengar.",
      topic: "Efterfrågan på pengar",
    },
    {
      q: "Varför är penningefterfrågan **fallande** i räntan?",
      options: [
        "För att högre ränta gör att folk handlar mer",
        "För att räntan är alternativkostnaden för att hålla pengar i stället för obligationer",
        "För att centralbanken drar in pengar när räntan stiger",
        "För att pengar ger högre ränta än obligationer",
      ],
      answer: 1,
      explain: "Pengar ger ingen eller låg ränta. Ju högre räntan på obligationer är, desto mer förlorar man på att hålla pengar.",
      topic: "Efterfrågan på pengar",
    },
    {
      q: "Om $M^d = PY \\cdot L(i)$ och PY fördubblas, vad händer med penningefterfrågan vid en given ränta?",
      options: ["Den halveras", "Den är oförändrad", "Den fördubblas", "Den ökar med mindre än det dubbla"],
      answer: 2,
      explain: "Efterfrågan är proportionell mot PY. Vid given ränta fördubblas den alltså.",
      topic: "Efterfrågan på pengar",
    },
    {
      q: "Vilka variabler är exogena respektive endogena på penningmarknaden i kapitel 3?",
      options: [
        "M och i är exogena, PY är endogen",
        "M och PY är exogena, i är endogen",
        "Alla tre är endogena",
        "PY är exogen, M och i är endogena",
      ],
      answer: 1,
      explain: "Jämviktsvillkoret $M = PY \\cdot L(i)$ bestämmer räntan givet penningmängden och den nominella inkomsten.",
      topic: "Jämvikt på penningmarknaden",
    },
    {
      q: "Den nominella inkomsten ökar medan penningmängden är oförändrad. Vad händer med jämviktsräntan?",
      options: ["Den stiger", "Den sjunker", "Den är oförändrad", "Den blir noll"],
      answer: 0,
      explain: "Efterfrågekurvan flyttas åt höger. Med oförändrat utbud måste räntan stiga för att efterfrågan ska minska till M igen.",
      topic: "Jämvikt på penningmarknaden",
    },
    {
      q: "Riksbanken ökar penningmängden. Vad händer med räntan, allt annat lika (och utan likviditetsfälla)?",
      options: ["Den stiger", "Den sjunker", "Den är oförändrad", "Det beror på skatterna"],
      answer: 1,
      explain: "Utbudslinjen flyttas åt höger, och jämvikten hamnar längre ned på den fallande efterfrågekurvan.",
      topic: "Jämvikt på penningmarknaden",
    },
    {
      q: "Antag $L(i) = 0{,}014 - 0{,}002\\,i$ (i i procent) och $PY = 6\\,000$. Vilken ränta (%) ger jämvikt om $M = 60$?",
      type: "numeric", answer: 2, tolerance: 0.01, unit: "%",
      explain: "$60 = 6000(0{,}014 - 0{,}002\\,i)$ ger $0{,}01 = 0{,}014 - 0{,}002\\,i$, alltså $i = 2$.",
      topic: "Jämvikt på penningmarknaden",
    },
    {
      q: "Riksbanken köper obligationer för 1 miljard kr. Vad händer med dess balansräkning?",
      options: [
        "Tillgångarna (obligationer) och skulderna (pengar) ökar båda med 1 miljard",
        "Tillgångarna ökar och skulderna minskar med 1 miljard",
        "Bara skulderna ökar",
        "Balansräkningen påverkas inte",
      ],
      answer: 0,
      explain: "Riksbanken betalar med nya pengar (en skuld) och får obligationer (en tillgång). Det är en expansiv öppen marknadsoperation.",
      topic: "Penningpolitik och öppna marknadsoperationer",
    },
    {
      q: "Vad kallas det när centralbanken säljer obligationer?",
      options: ["Expansiv öppen marknadsoperation", "Kontraktiv öppen marknadsoperation", "Kvantitativa lättnader", "Finanspolitisk åtstramning"],
      answer: 1,
      explain: "Penningmängden minskar när köparna betalar med pengar. Det är en penningpolitisk åtstramning.",
      topic: "Penningpolitik och öppna marknadsoperationer",
    },
    {
      q: "En ettårig obligation betalar 1 000 kr om ett år och kostar 950 kr i dag. Hur hög är räntan i procent? (Två decimaler.)",
      type: "numeric", answer: 5.26, tolerance: 0.01, unit: "%",
      explain: "$i = (1000 - 950)/950 \\approx 0{,}0526$, alltså 5,26 %.",
      topic: "Obligationspriser och räntan",
    },
    {
      q: "Vad är priset i dag på en ettårig obligation som betalar 1 000 kr om räntan är 4 %? (Två decimaler.)",
      type: "numeric", answer: 961.54, tolerance: 0.01, unit: "kr",
      explain: "$P_B = 1000/1{,}04 \\approx 961{,}54$ kr.",
      topic: "Obligationspriser och räntan",
    },
    {
      q: "Riksbanken köper stora mängder obligationer. Vad händer med obligationspriset och räntan?",
      options: ["Priset stiger och räntan stiger", "Priset stiger och räntan sjunker", "Priset sjunker och räntan stiger", "Priset sjunker och räntan sjunker"],
      answer: 1,
      explain: "Ökad efterfrågan driver upp priset. Eftersom $P_B = 1000/(1+i)$ betyder ett högre pris en lägre ränta.",
      topic: "Obligationspriser och räntan",
    },
    {
      q: "Hur bedriver moderna centralbanker främst penningpolitik?",
      options: [
        "De bestämmer penningmängden och låter räntan bli vad den blir",
        "De bestämmer räntan och anpassar penningmängden så att den räntan gäller",
        "De bestämmer statens budget",
        "De bestämmer växelkursen och löner",
      ],
      answer: 1,
      explain: "Centralbanken sätter en ränta och tillhandahåller den mängd pengar som efterfrågas vid den räntan.",
      topic: "Sätts räntan eller penningmängden?",
    },
    {
      q: "Riksbanken vill hålla räntan oförändrad, men den nominella inkomsten ökar. Vad måste Riksbanken göra?",
      options: ["Minska penningmängden", "Öka penningmängden", "Ingenting", "Höja skatterna"],
      answer: 1,
      explain: "Högre PY ökar penningefterfrågan. Om utbudet inte ökar stiger räntan.",
      topic: "Sätts räntan eller penningmängden?",
    },
    {
      q: "Vilket penningmängdsmått är det smalaste och består bara av sedlar och mynt?",
      options: ["M0", "M1", "M3", "H"],
      answer: 0,
      explain: "M0 är sedlar och mynt (ca 60 mdr kr i Sverige). M1 inkluderar även transaktionskonton, och M3 är det bredaste måttet.",
      topic: "Banker och finansiella mellanhänder",
    },
    {
      q: "Vilket av följande är **inte** ett skäl för banker att hålla reserver, enligt föreläsningen?",
      options: [
        "Att klara oförutsedda uttag",
        "Att klara sina egna transaktioner",
        "Att uppfylla legala reservkrav (t.ex. i USA)",
        "Att finansiera statens budgetunderskott",
      ],
      answer: 3,
      explain: "De tre första är de skäl som nämns. Reservkrav finns inte i Sverige.",
      topic: "Banker och finansiella mellanhänder",
    },
    {
      q: "Vad mäter kapitaltäckningsgraden?",
      options: [
        "Bankens reserver i förhållande till inlåningen",
        "Bankens eget kapital i förhållande till dess riskvägda tillgångar",
        "Centralbankens obligationsinnehav i förhållande till BNP",
        "Bankens vinst i förhållande till dess utlåning",
      ],
      answer: 1,
      explain: "Den är en central del av bankregleringen och visar hur stora förluster banken klarar.",
      topic: "Banker och finansiella mellanhänder",
    },
    {
      q: "Vad består efterfrågan på centralbankspengar av?",
      options: [
        "Bara kontanter",
        "Kontanter som hushåll och företag efterfrågar plus bankernas efterfrågan på reserver",
        "Alla bankkonton (M1)",
        "Statsobligationer",
      ],
      answer: 1,
      explain: "Bankernas reserver hos centralbanken är lika likvida som kontanter och ingår därför i efterfrågan på centralbankspengar.",
      topic: "Efterfrågan på centralbankspengar",
    },
    {
      q: "Vad händer med efterfrågan på likviditet i en finansiell kris, som i början av pandemin?",
      options: [
        "Den faller kraftigt eftersom folk köper fler aktier",
        "Den ökar kraftigt eftersom aktörerna vill byta obligationer och aktier mot likvida tillgångar",
        "Den påverkas inte",
        "Den blir negativ",
      ],
      answer: 1,
      explain: "Efterfrågekurvan flyttas åt höger. Utan mer likviditet från centralbanken skulle räntan stiga.",
      topic: "Efterfrågan på centralbankspengar",
    },
    {
      q: "Vad innebär en likviditetsfälla?",
      options: [
        "Bankerna har slut på reserver",
        "Räntan är noll, penningefterfrågan horisontell, och ytterligare ökningar av penningmängden sänker inte räntan",
        "Centralbanken kan inte trycka mer pengar",
        "Inflationen är så hög att ingen vill hålla pengar",
      ],
      answer: 1,
      explain: "Vid noll ränta finns ingen alternativkostnad för att hålla pengar, så den extra penningmängden hålls utan att räntan ändras. I praktiken har räntan kunnat sänkas något under noll, men inte hur långt som helst.",
      topic: "Likviditetsfällan",
    },
  ],
});
