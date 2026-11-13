// Föreläsning 12 = bokens kapitel 13
registerLecture({
  id: "kapitel-13",
  number: 12,
  title: "Kapitel 13: Fakta om tillväxt",
  summary: "Levnadsstandard och köpkraftskorrigerad BNP, tillväxt i rika länder sedan 1950, konvergens, den aggregerade produktionsfunktionen, konstant skalavkastning, avtagande marginalavkastning och tillväxtens källor.",
  tags: ["Tillväxt", "PPP", "Konvergens", "Produktionsfunktion", "Skalavkastning"],

  sections: [
    {
      heading: "Levnadsstandard och köpkraftskorrigering",
      body: `Tillväxt ger förutsättningar för att förbättra människors ekonomiska **levnadsstandard**. Jämförelser över tid och mellan länder utgår oftast från **BNP per capita** (per person).

**BNP per capita till marknadspriser, omräknat med samma växelkurs, är missvisande:**
- **Växelkurser varierar kraftigt** på kort och medellång sikt, utan att det har motsvarande effekt på levnadsstandarden.
- Varor och tjänster som av praktiska skäl måste **produceras och konsumeras lokalt** har olika priser i olika länder. De tenderar att vara **billigare i länder med lägre BNP per capita**. Köpkraften hos en dollar är högre i Indien än i Norge.

**Lösningen är att köpkraftskorrigera BNP (PPP, *Purchasing Power Parity*).** Då uttrycks BNP i olika länder med en uppsättning **gemensamma priser**. Indiens risproduktion värderas till exempel till amerikanska priser.

Effekterna är stora: **Sveriges BNP per capita är ungefär 40 gånger Indiens till lokala priser, men ungefär 8 gånger efter köpkraftskorrigering.**

### Ger pengar lycka?
Frågan har länge diskuterats, och det finns en intensiv debatt och betydande forskning. Internationella enkätundersökningar ger i dag mer tillförlitliga svar än tidigare. I **Gallup World Poll 2006** (131 länder) fick de svarande placera sig på ”livets trappa”, där det översta steget motsvarar det bästa tänkbara livet och det nedersta det sämsta. Föreläsningen visar hur svaren hänger ihop med BNP per capita.`,
    },
    {
      heading: "Tillväxt i fem rika länder sedan 1950",
      body: `Köpkraftskorrigerad real BNP per capita (2017 års US-dollar):

| | Årlig real tillväxt 1950–2019 (%) | BNP/capita 1950 | BNP/capita 2019 | Kvot 2019/1950 |
|---|---:|---:|---:|---:|
| Sverige | 2,4 | 10 881 | 55 893 | 5,1 |
| Frankrike | 2,6 | 7 657 | 44 823 | 5,9 |
| Japan | 4,0 | 2 879 | 39 637 | 13,8 |
| Storbritannien | 2,3 | 9 967 | 46 187 | 4,6 |
| USA | 2,1 | 15 734 | 63 393 | 4,0 |
| **Genomsnitt** | **2,7** | | | **6,7** |

(På bilden står det ”2013/1950” i sista kolumnen, men kvoterna stämmer med 2019/1950.)

- **Stor ökning av BNP per capita** under ungefär en livstid.
- **Konvergens:** en tendens till **högre tillväxt ju lägre BNP per capita var under startåret**. Japan, som var fattigast 1950, växte snabbast, och USA, som var rikast, växte långsammast. Men det gäller inte riktigt för alla.

Föreläsningen visar också konvergens bland OECD-länderna och frågar om den gäller för **alla länder i världen**. Där är mönstret mycket svagare: många fattiga länder har inte vuxit snabbare än de rika. Ett **längre perspektiv** visar att den snabba tillväxten i BNP per capita är ett relativt nytt fenomen i historien.`,
      graphs: [
        {
          type: "series", bars: true,
          title: "Real BNP per capita 1950 och 2019 (PPP, tusental 2017 US$)",
          categories: ["Sverige", "Frankrike", "Japan", "Storbritannien", "USA"],
          yLabel: "Tusental US$", y: [0, 70],
          series: [
            { label: "1950", data: [[0, 10.881], [1, 7.657], [2, 2.879], [3, 9.967], [4, 15.734]] },
            { label: "2019", data: [[0, 55.893], [1, 44.823], [2, 39.637], [3, 46.187], [4, 63.393]] },
          ],
          caption: "Japan startade lägst och har vuxit mest (13,8 gånger), medan USA startade högst och har vuxit minst (4,0 gånger). Det är ett tydligt exempel på konvergens bland rika länder.",
        },
      ],
    },
    {
      heading: "Den aggregerade produktionsfunktionen",
      body: `Den **aggregerade produktionsfunktionen** anger sambandet mellan den aggregerade produktionen (BNP) och produktionsfaktorerna.

Tidigare har vi använt en mycket enkel produktionsfunktion där produktionen bara beror på sysselsättningen. Nu lägger vi till **kapital**. För konjunkturvariationer (medellång sikt) är förändringar i kapitalmängden inte viktiga, men på längre sikt är de det:
$$Y = F(K, N)$$
- **Y** = produktion (BNP).
- **K** = kapital: summan av alla maskiner, fabriker, kontor och andra fysiska produkter som används i produktionen.
- **N** = arbetskraft: antalet sysselsatta.

Funktionen F anger hur mycket som produceras med en given mängd kapital och arbetskraft. Den beror på landets **teknologinivå**: en högre nivå ger mer produktion, givet K och N.

Två egenskaper hos F är viktiga: **konstant skalavkastning** och **avtagande marginalavkastning**.`,
    },
    {
      heading: "Konstant skalavkastning",
      body: `**Konstant skalavkastning** innebär att om man fördubblar både kapitalet och arbetskraften så fördubblas också produktionen:
$$2Y = F(2K, 2N)$$
Mer generellt gäller för varje positivt tal $a$:
$$aY = F(aK, aN)$$

**Exempel:** $F(K, N) = \\sqrt{K}\\sqrt{N}$. Testa med $a = 2$:
$$F(2K, 2N) = \\sqrt{2K}\\sqrt{2N} = \\sqrt 2 \\sqrt 2 \\sqrt K \\sqrt N = 2\\sqrt K \\sqrt N = 2F(K, N)$$`,
    },
    {
      heading: "Avtagande marginalavkastning",
      body: `- **Avtagande marginalavkastning för kapital:** om mängden kapital ökar, givet en konstant mängd arbetskraft, blir produktionsökningarna mindre och mindre ju mer kapitalmängden ökar.
- **Avtagande marginalavkastning för arbetskraft:** om mängden arbetskraft ökar, givet en konstant mängd kapital, blir produktionsökningarna mindre och mindre ju mer arbetskraften ökar.

**Exempel** med $F(K, N) = \\sqrt K \\sqrt N$ och N = 1. Öka K med en enhet från 1, 9 och 100:
| | Produktionsökning |
|---|---:|
| $F(2,1) - F(1,1) = \\sqrt 2 - 1$ | 0,414 |
| $F(10,1) - F(9,1) = \\sqrt{10} - 3$ | 0,162 |
| $F(101,1) - F(100,1) = \\sqrt{101} - 10$ | 0,050 |`,
    },
    {
      heading: "Produktion per sysselsatt",
      body: `Med konstant skalavkastning kan vi få ett uttryck för **produktionen per sysselsatt Y/N**. Formeln $aY = F(aK, aN)$ gäller för varje $a > 0$. Välj $a = 1/N$:
$$\\frac{Y}{N} = F\\!\\left(\\frac{K}{N}, \\frac{N}{N}\\right) = F\\!\\left(\\frac{K}{N}, 1\\right)$$

**För en given produktionsfunktion (given teknisk nivå) bestäms produktionen per sysselsatt av kapitalet per sysselsatt, K/N.** När K/N ökar, ökar Y/N, men med **avtagande marginalavkastning**.

**Exempel:** $F(K, N) = \\sqrt K \\sqrt N$ ger
$$\\frac{Y}{N} = \\frac{\\sqrt K \\sqrt N}{N} = \\frac{\\sqrt K}{\\sqrt N} = \\sqrt{\\frac{K}{N}}$$

### Teknisk utveckling
Om den **tekniska nivån höjs** kan mer produceras för varje given mängd kapital per sysselsatt. Kurvan $F(K/N, 1)$ **förskjuts uppåt** (roterar moturs).`,
      graphs: [
        {
          type: "curves",
          title: "Produktion per sysselsatt: Y/N = A·√(K/N)",
          xLabel: "Kapital per sysselsatt, K/N", yLabel: "Produktion per sysselsatt, Y/N",
          x: [0, 100], y: [0, 16],
          params: {
            k: { label: "Kapital per sysselsatt K/N", min: 1, max: 100, step: 1, value: 25 },
            A: { label: "Teknisk nivå A", min: 0.5, max: 1.6, step: 0.05, value: 1 },
          },
          curves: [
            { label: "F(K/N, 1)", fn: "A*sqrt(x)", ghost: true },
            { label: "K/N", xAt: "k", dashed: true },
          ],
          points: [{ between: ["F(K/N, 1)", "K/N"], label: "P" }],
          readout: "Y/N = {P.y} · marginalprodukt för kapital (ökning av Y/N om K/N ökar med 1) ≈ {=A*(sqrt(k+1) - sqrt(k)):3}",
          caption: "Dra K/N från 1 till 100. Varje extra enhet kapital ger allt mindre extra produktion: avtagande marginalavkastning. Om A höjs flyttas hela kurvan uppåt. Det är teknisk utveckling.",
        },
      ],
    },
    {
      heading: "Tillväxtens källor",
      body: `Tillväxt i BNP per capita (eller BNP per sysselsatt) kommer från **två källor**:
1. **Kapitalbildning**, dvs. ackumulation av kapital.
2. **Tekniska framsteg.**

- Eftersom ökningar i kapitalmängden ger allt mindre produktionsökningar **kan kapitalackumulering inte i sig själv ge permanent tillväxt**.
- **Sparkvoten** är andelen av inkomsten som sparas. En högre sparkvot betyder att mer kapital ackumuleras (om det inte investeras utomlands eller i improduktiva investeringar).
- Om sparkvoten ökar får vi därför **snabbare tillväxt**, men på grund av avtagande marginalavkastning **avstannar effekten till slut**.
- Länder med högre sparkvot får dock en **permanent högre BNP per sysselsatt**.
- **Permanent tillväxt kräver permanent teknisk utveckling.**`,
      takeaway: "Kapital ger högre nivå, men bara teknisk utveckling ger varaktig tillväxt.",
    },
  ],

  keyTerms: [
    { term: "BNP per capita", def: "BNP per person, det vanligaste måttet på materiell levnadsstandard." },
    { term: "Köpkraftskorrigering (PPP)", def: "BNP uttryckt i gemensamma priser, så att prisskillnader mellan länder inte snedvrider jämförelsen." },
    { term: "Konvergens", def: "Tendensen att länder med lägre BNP per capita växer snabbare." },
    { term: "Aggregerad produktionsfunktion", def: "$Y = F(K, N)$, sambandet mellan BNP och produktionsfaktorerna." },
    { term: "Kapital (K)", def: "Maskiner, fabriker, kontor och andra fysiska produkter som används i produktionen." },
    { term: "Konstant skalavkastning", def: "$aY = F(aK, aN)$: dubbelt så mycket K och N ger dubbelt så mycket Y." },
    { term: "Avtagande marginalavkastning", def: "Mer av en faktor, givet den andra, ger allt mindre produktionsökningar." },
    { term: "Produktion per sysselsatt", def: "$Y/N = F(K/N, 1)$, som bestäms av kapitalet per sysselsatt." },
    { term: "Sparkvot", def: "Andelen av inkomsten som sparas." },
  ],

  quiz: [
    {
      q: "Varför är BNP per capita omräknat med marknadsväxelkurser missvisande för att jämföra levnadsstandard?",
      options: [
        "Kurserna svänger, och lokala priser skiljer sig åt",
        "För att BNP inte mäter produktion av tjänster",
        "För att befolkningen i många länder inte kan mätas",
        "För att alla länder har samma priser på allt",
      ],
      answer: 0,
      explain: "Därför köpkraftskorrigerar man (PPP) med gemensamma priser.",
      topic: "Levnadsstandard och köpkraftskorrigering",
    },
    {
      q: "Enligt föreläsningen är Sveriges BNP per capita ca 40 gånger Indiens till lokala priser. Ungefär hur många gånger är den efter köpkraftskorrigering?",
      options: ["40", "20", "8", "1"],
      answer: 2,
      explain: "En dollar räcker längre i Indien, så skillnaden krymper kraftigt efter PPP-korrigering.",
      topic: "Levnadsstandard och köpkraftskorrigering",
    },
    {
      q: "Vilket av de fem rika länderna i tabellen hade den snabbaste tillväxten 1950–2019, och varför är det ett exempel på konvergens?",
      options: [
        "USA, som var rikast 1950 och därför växte snabbast",
        "Japan, som var fattigast 1950 och växte snabbast",
        "Sverige, som hade högst sparkvot under perioden",
        "Storbritannien, som hade störst befolkning 1950",
      ],
      answer: 1,
      explain: "Konvergens innebär att den som startar lägre växer snabbare.",
      topic: "Tillväxt i fem rika länder sedan 1950",
    },
    {
      q: "Real BNP per capita i Sverige var 10 881 år 1950 och 55 893 år 2019. Hur många gånger högre var den 2019? (En decimal.)",
      type: "numeric", answer: 5.1, tolerance: 0.05,
      explain: "$55\\,893/10\\,881 \\approx 5{,}1$.",
      topic: "Tillväxt i fem rika länder sedan 1950",
    },
    {
      q: "Vad innebär konstant skalavkastning?",
      options: [
        "Att produktionen är konstant över tiden",
        "Att $aY = F(aK, aN)$ för alla $a > 0$",
        "Att mer kapital alltid ger lika mycket mer produktion",
        "Att den tekniska nivån är konstant",
      ],
      answer: 1,
      explain: "Exempel: $F(K,N) = \\sqrt K \\sqrt N$.",
      topic: "Konstant skalavkastning",
    },
    {
      q: "Med $F(K, N) = \\sqrt K \\sqrt N$ och N = 1: hur mycket ökar produktionen om K ökar från 9 till 10? (Tre decimaler.)",
      type: "numeric", answer: 0.162, tolerance: 0.001,
      explain: "$\\sqrt{10} - \\sqrt 9 = 3{,}162 - 3 = 0{,}162$.",
      topic: "Avtagande marginalavkastning",
    },
    {
      q: "Vad betyder avtagande marginalavkastning för kapital?",
      options: [
        "Att mer kapital minskar den totala produktionen",
        "Att varje extra enhet kapital ger allt mindre",
        "Att kapitalet förslits snabbare ju äldre det är",
        "Att både K och N måste öka för att Y ska öka",
      ],
      answer: 1,
      explain: "Kurvan Y/N mot K/N blir allt flackare.",
      topic: "Avtagande marginalavkastning",
    },
    {
      q: "Med $F(K, N) = \\sqrt K \\sqrt N$: vad är Y/N om K = 400 och N = 4?",
      type: "numeric", answer: 10, tolerance: 0.01,
      explain: "$Y/N = \\sqrt{K/N} = \\sqrt{100} = 10$.",
      topic: "Produktion per sysselsatt",
    },
    {
      q: "Vad händer med kurvan $F(K/N, 1)$ om den tekniska nivån höjs?",
      options: [
        "Den förskjuts nedåt",
        "Den förskjuts uppåt",
        "Den blir horisontell",
        "Den blir en rät linje",
      ],
      answer: 1,
      explain: "Mer kan produceras för varje given mängd kapital per sysselsatt.",
      topic: "Produktion per sysselsatt",
    },
    {
      q: "Varför kan kapitalackumulering inte ensam ge permanent tillväxt?",
      options: [
        "För att kapital är dyrt att finansiera",
        "På grund av avtagande marginalavkastning",
        "För att sparkvoten alltid är noll på lång sikt",
        "För att kapital inte påverkar produktionen",
      ],
      answer: 1,
      explain: "Permanent tillväxt kräver permanent teknisk utveckling.",
      topic: "Tillväxtens källor",
    },
    {
      q: "Vad är den långsiktiga effekten av en högre sparkvot enligt föreläsningen?",
      options: [
        "En permanent högre tillväxttakt i BNP per sysselsatt",
        "En permanent högre nivå på BNP per sysselsatt",
        "En lägre BNP per sysselsatt, eftersom konsumtionen faller",
        "Ingen effekt alls, eftersom kapitalet förslits",
      ],
      answer: 1,
      explain: "Tillväxteffekten avstannar på grund av avtagande marginalavkastning, men nivån förblir högre.",
      topic: "Tillväxtens källor",
    },
  ],
});
