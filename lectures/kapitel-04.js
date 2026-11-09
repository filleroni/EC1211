(function () {
  // Riksbankens styrränta (reporänta). Beslut som [år + månad/12, ny ränta]. Datumen är avrundade till månad.
  const CHANGES = [
    [2000.0, 3.25], [2000.1, 3.75], [2000.95, 4.0], [2001.5, 4.25], [2001.7, 3.75], [2002.2, 4.0], [2002.3, 4.25],
    [2002.85, 4.0], [2002.95, 3.75], [2003.2, 3.5], [2003.45, 3.0], [2003.55, 2.75], [2004.1, 2.5], [2004.25, 2.0],
    [2005.45, 1.5], [2006.05, 1.75], [2006.15, 2.0], [2006.5, 2.25], [2006.7, 2.5], [2006.8, 2.75], [2006.95, 3.0],
    [2007.15, 3.25], [2007.5, 3.5], [2007.7, 3.75], [2007.8, 4.0], [2008.15, 4.25], [2008.7, 4.75], [2008.78, 4.25],
    [2008.83, 3.75], [2008.95, 2.0], [2009.15, 1.0], [2009.3, 0.5], [2009.55, 0.25], [2010.55, 0.5], [2010.7, 0.75],
    [2010.8, 1.0], [2010.95, 1.25], [2011.15, 1.5], [2011.3, 1.75], [2011.55, 2.0], [2011.95, 1.75], [2012.15, 1.5],
    [2012.7, 1.25], [2012.95, 1.0], [2013.95, 0.75], [2014.55, 0.25], [2014.8, 0.0], [2015.15, -0.1], [2015.2, -0.25],
    [2015.55, -0.35], [2016.15, -0.5], [2019.05, -0.25], [2020.05, 0.0], [2022.4, 0.25], [2022.55, 0.75],
    [2022.75, 1.75], [2022.9, 2.5], [2023.15, 3.0], [2023.3, 3.5], [2023.55, 3.75], [2023.75, 4.0], [2024.4, 3.75],
    [2024.65, 3.5], [2024.8, 3.25], [2024.9, 2.75], [2025.05, 2.5], [2025.1, 2.25], [2025.5, 2.0], [2025.75, 1.75],
  ];
  const steps = [];
  CHANGES.forEach(([t, r], k) => {
    if (k > 0) steps.push([t, CHANGES[k - 1][1]]);
    steps.push([t, r]);
  });
  steps.push([2026.25, 1.75]);

  // Modellens parametrar i graferna: C = 200 + 0,5(Y − T), I = 300 + 0,1Y − 50i
  registerLecture({
    id: "kapitel-4",
    number: 4,
    title: "Kapitel 4: IS-LM-modellen",
    summary: "Varumarknaden och penningmarknaden i jämvikt samtidigt: endogena investeringar, IS- och LM-kurvorna, finans- och penningpolitik, policymix och Riksbankens penningpolitik i praktiken.",
    tags: ["IS-LM", "Finanspolitik", "Penningpolitik", "Policymix", "Riksbanken"],

    sections: [
      {
        heading: "Allmän jämvikt: varumarknaden och penningmarknaden tillsammans",
        body: `I kapitel 2 bestämdes produktionen givet investeringarna. I kapitel 3 bestämdes räntan givet inkomsten. Nu sätter vi ihop dem:

- **Varumarknaden** i jämvikt + **penningmarknaden** i jämvikt.
- **Samtidig bestämning** av både ränta och produktion.
- Hur påverkas räntan och produktionen av **penningpolitik** och **finanspolitik**?

Det är vårt första exempel på **allmän jämvikt**: jämvikterna på de två marknaderna beror av varandra.`,
      },
      {
        heading: "Endogena investeringar",
        body: `I kapitel 2 var investeringarna exogena, och jämvikt krävde $Y = C(Y - T) + \\bar I + G$.

Nu låter vi investeringarna bero på
- **försäljningen (produktionen) Y**, positivt: mer försäljning kräver mer kapacitet,
- **räntan i**, negativt: högre ränta gör det dyrare att låna till investeringar.

Det ger **investeringsfunktionen**
$$I = I(Y, i), \\qquad I_Y > 0,\\; I_i < 0$$
och jämviktsvillkoret på varumarknaden blir
$$Y = C(Y - T) + I(Y, i) + G$$

Efterfrågan $ZZ$ ökar nu med produktionen både via konsumtionen **och** via investeringarna. Jämvikten ligger fortfarande där ZZ skär 45°-linjen.`,
      },
      {
        heading: "Räntans effekt på produktionen",
        body: `Vad händer om **räntan ökar**? Investeringarna blir lägre vid varje produktionsnivå, så **ZZ flyttas nedåt**. Jämvikten hamnar på en **lägre produktionsnivå**.

**Slutsats:** högre ränta leder till lägre jämviktsproduktion.

I grafen nedan är $C = 200 + 0{,}5(Y - T)$ och $I = 300 + 0{,}1Y - 50i$, där räntan anges i procent.`,
        graphs: [
          {
            type: "curves",
            title: "ZZ-kurvan med endogena investeringar",
            xLabel: "Produktion, Y", yLabel: "Efterfrågan, Z",
            x: [0, 3000], y: [0, 3000],
            params: {
              i: { label: "Ränta i (%)", min: 0, max: 8, step: 0.25, value: 3 },
              G: { label: "Offentlig konsumtion G", min: 200, max: 700, step: 10, value: 400 },
              T: { label: "Skatter T", min: 100, max: 600, step: 10, value: 300 },
            },
            curves: [
              { label: "ZZ", fn: "200 + 0.5*(x - T) + 300 + 0.1*x - 50*i + G", ghost: true },
              { label: "45°", fn: "x", dashed: true },
            ],
            points: [{ between: ["ZZ", "45°"], label: "A" }],
            readout: "Jämvikt: Y = {A.x} · investeringar I = {=300 + 0.1*((200 + 300 + G - 0.5*T - 50*i)/0.4) - 50*i}",
            caption: "Lutningen på ZZ är nu $c_1 + b_1 = 0{,}5 + 0{,}1 = 0{,}6$, så multiplikatorn blir $1/(1 - 0{,}6) = 2{,}5$. Om räntan höjs med en procentenhet minskar investeringarna med 50 vid varje Y, och jämvikts-Y minskar med $2{,}5 \\times 50 = 125$.",
          },
        ],
      },
      {
        heading: "IS-kurvan",
        body: `Varje ränta ger en jämviktsproduktion på varumarknaden. Om vi ritar dessa kombinationer med **räntan på y-axeln** och **produktionen på x-axeln** får vi **IS-kurvan**.

- **IS-kurvan** visar de kombinationer av ränta och produktion där **varumarknaden är i jämvikt**.
- Den är **nedåtlutande**: högre ränta ger lägre investeringar och därmed lägre produktion.

**Åt vilket håll går orsakssambandet?** Längs IS-kurvan är det räntan som påverkar produktionen, via investeringarna.

### Förskjutningar av IS-kurvan
Allt som ändrar efterfrågan **vid en given ränta** flyttar IS-kurvan:
- **G ökar eller T minskar:** efterfrågan blir högre vid varje ränta, och **IS flyttas åt höger**.
- **G minskar eller T ökar:** **IS flyttas åt vänster**.

Med siffrorna ovan blir IS-kurvan $Y = 2{,}5\\,(200 + 300 + G - 0{,}5T - 50i)$, eller med räntan utlöst:
$$i = \\frac{200 + 300 + G - 0{,}5T - 0{,}4Y}{50}$$`,
      },
      {
        heading: "Penningmarknaden och produktionen",
        body: `Hur påverkar produktionen räntan? Jämvikt på penningmarknaden kräver $M = PY \\cdot L(i)$. Delar vi med prisnivån P får vi
$$\\frac{M}{P} = Y \\cdot L(i)$$
Utbudet av och efterfrågan på **reala pengar** ska vara lika. Efterfrågan på reala pengar ökar proportionellt med den reala produktionen och minskar med räntan.

Om **produktionen ökar** flyttas efterfrågekurvan åt höger. Med **oförändrad penningmängd** stiger räntan. Prova i grafen.`,
        graphs: [
          {
            type: "curves",
            title: "Högre produktion ökar efterfrågan på pengar",
            xLabel: "Real penningmängd, M/P", yLabel: "Ränta, i (%)",
            x: [0, 100], y: [0, 8],
            params: {
              Y: { label: "Produktion Y", min: 800, max: 2500, step: 10, value: 1500 },
              MP: { label: "Real penningmängd M/P", min: 10, max: 90, step: 0.5, value: 37.5 },
            },
            curves: [
              { label: "Md", fn: "max(0, (0.04 - x/Y)/0.005)", ghost: true },
              { label: "Ms", xAt: "MP", ghost: true },
            ],
            points: [{ between: ["Md", "Ms"], label: "A" }],
            readout: "Jämviktsränta i = {A.y} %. För att räntan ska stanna på 3 % krävs M/P = {=Y*(0.04 - 0.005*3)}.",
            caption: "Här är $L(i) = 0{,}04 - 0{,}005\\,i$. Om Y ökar och M/P är oförändrad stiger räntan. Om centralbanken vill att räntan ska ligga kvar måste den öka penningmängden, se nästa avsnitt.",
          },
        ],
      },
      {
        heading: "LM-sambandet: oförändrad penningpolitik = konstant ränta",
        body: `Vi har visat att högre produktion ger högre ränta **om penningmängden hålls konstant**. Men är det rimligt att räntan ändras automatiskt när produktionen ändras, trots oförändrad penningpolitik?

Det beror på vad vi menar med **”oförändrad penningpolitik”**. Moderna centralbanker sätter räntan, så det är rimligt att definiera oförändrad penningpolitik som **en konstant ränta**. Då är det i stället **penningmängden** som anpassas när produktionen ändras:

- Produktionen ökar → penningefterfrågan ökar.
- Med oförändrad penningmängd skulle räntan stiga (från $i_A$ till $i_B$).
- För att räntan ska ligga kvar på $i_A$ ökar centralbanken penningmängden till $M^{s\\prime}$.

**LM-kurvan** blir därför en **horisontell linje** vid den ränta som centralbanken har valt:
$$\\text{LM:}\\quad i = \\bar i$$`,
      },
      {
        heading: "IS och LM tillsammans",
        body: `$$\\text{IS:}\\quad Y = C(Y - T) + I(Y, i) + G \\qquad\\qquad \\text{LM:}\\quad i = \\bar i$$

- **IS:** jämvikt på varumarknaden, där högre ränta ger lägre produktion.
- **LM:** jämvikt på penningmarknaden, där centralbanken ser till att penningmängden upprätthåller räntan $\\bar i$.

**I skärningspunkten är båda jämviktsvillkoren uppfyllda.** Grafen nedan är modellens verktyg för att analysera politik. Dra i reglagen och se hur Y, i, C och I ändras.`,
        graphs: [
          {
            type: "curves",
            title: "IS-LM-modellen",
            xLabel: "Produktion, Y", yLabel: "Ränta, i (%)",
            x: [0, 3000], y: [0, 10],
            params: {
              G: { label: "Offentlig konsumtion G", min: 200, max: 700, step: 10, value: 400 },
              T: { label: "Skatter T", min: 100, max: 600, step: 10, value: 300 },
              ibar: { label: "Styrränta ī (%)", min: 0, max: 8, step: 0.25, value: 3 },
            },
            curves: [
              { label: "IS", fn: "(200 + 300 + G - 0.5*T - 0.4*x)/50", ghost: true },
              { label: "LM", fn: "ibar", ghost: true },
            ],
            points: [{ between: ["IS", "LM"], label: "A" }],
            readout: "Y = {A.x} · i = {ibar} % · C = {=200 + 0.5*((500 + G - 0.5*T - 50*ibar)/0.4 - T)} · I = {=300 + 0.1*((500 + G - 0.5*T - 50*ibar)/0.4) - 50*ibar} · budgetsaldo T − G = {=T - G}",
            caption: "**Prova policymixen:** höj T med 100 (budgetsaldot förbättras och IS flyttas åt vänster). Sänk sedan räntan med 1 procentenhet. Då hamnar Y på samma nivå som från början, men med lägre ränta.",
          },
        ],
      },
      {
        heading: "Finanspolitik: effekten av en skattehöjning",
        body: `- **Finanspolitisk åtstramning (kontraktion):** budgetunderskottet minskar (eller överskottet ökar), genom högre T eller lägre G.
- **Finanspolitisk stimulans (expansion):** budgetunderskottet ökar (eller överskottet minskar).

### Analys i tre steg
1. **Avgör vilket samband som påverkas** (IS, LM eller båda) och hur kurvan flyttas. Det är enklast att titta på ekvationerna.
2. **Visa i IS-LM-diagrammet** hur jämvikten ändras.
3. **Förklara i ord.**

### Exempel: skatten höjs
1. T finns i IS men inte i LM. Högre skatt minskar efterfrågan och produktionen vid varje ränta, så **IS flyttas åt vänster**.
2. Jämvikten flyttas från A till A′. **Produktionen minskar från Y till Y′, och räntan är oförändrad.** Penningmängden måste dock anpassas nedåt.
3. **I ord:** Högre skatter minskar den disponibla inkomsten och därmed konsumtionen. Lägre konsumtion betyder mindre efterfrågan på varor och tjänster, så produktionen minskar. Lägre produktion och inkomst minskar efterfrågan på pengar. Det måste mötas med en lägre penningmängd, annars skulle räntan falla.`,
      },
      {
        heading: "Penningpolitik: effekten av en räntesänkning",
        body: `- **Penningpolitisk åtstramning (kontraktion):** höjd ränta (och minskad penningmängd).
- **Penningpolitisk stimulans (expansion):** sänkt ränta (vilket kräver en ökad penningmängd).

### Exempel: räntan sänks
1. Räntesänkningen ändrar inte sambandet mellan i och Y på varumarknaden, så **IS påverkas inte**. Men **LM flyttas nedåt** till den nya räntan $\\bar i'$.
2. Jämvikten flyttas från A till A′. **Produktionen ökar från Y till Y′, och räntan faller från $\\bar i$ till $\\bar i'$.**
3. **I ord:** Lägre ränta ökar investeringarna, vilket ökar efterfrågan och därmed produktionen och inkomsterna. Effekten förstärks eftersom den ökade produktionen ökar investeringarna ytterligare. Det är en **positiv återkoppling (feedback)**.`,
      },
      {
        heading: "Policymix",
        body: `Penning- och finanspolitik bedrivs ofta **samtidigt**. Ofta ska de hjälpas åt, men ibland är det rätt att låta dem **dra åt olika håll**.

**Exempel:** man vill minska budgetunderskottet utan att orsaka en lågkonjunktur. Det går med en **finanspolitisk åtstramning** kombinerad med en **penningpolitisk stimulans**:

- Åtstramningen flyttar **IS åt vänster**. Utan penningpolitisk åtgärd hamnar jämvikten i A′ med lägre produktion Y′.
- Stimulansen flyttar **LM nedåt**, och jämvikten hamnar i A″.
- **Slutsats:** produktionen ändras inte (Y″ = Y), men räntan blir lägre.

Med siffrorna i IS-LM-grafen: en skattehöjning på 100 minskar Y med $2{,}5 \\times 0{,}5 \\times 100 = 125$. En räntesänkning på 1 procentenhet ökar Y med $2{,}5 \\times 50 = 125$. Effekterna tar alltså ut varandra.

I västvärlden har **penningpolitiken huvudansvaret** för att löpande stabilisera konjunkturen: räntan sänks i lågkonjunktur och höjs i högkonjunktur.`,
      },
      {
        heading: "IS-LM och mer realistiska modeller",
        body: `IS-LM-modellen visar hur finans- och penningpolitiken påverkar produktion och ränta i jämvikt. Med antagandena $C = C(Y - T)$ och $I = I(Y, i)$ kan vi också se vad som händer med konsumtionen och investeringarna. Men modellen
- **bortser från dynamik** (många förändringar tar tid), och
- **antar att prisnivån är konstant**. Om priserna ändras ändras M/P även om M är konstant. Det återkommer vi till senare i kursen.

### Riksbankens modell MAJA
Riksbankens **M**odell för **A**llmän **J**ämvikts**A**nalys (MAJA) är dynamisk och visar vad som händer över tiden. Vid en tillfällig höjning av styrräntan faller **produktion, konsumtion och investeringar ganska snabbt**, men återhämtar sig på sikt. **Priserna rör sig betydligt långsammare.** IS-LM ger alltså en stiliserad men inte orealistisk bild av effekterna på kort sikt (under ett par år).`,
      },
      {
        heading: "Riksbankens mandat och styrränta",
        body: `### Mandatet
- Riksbanken är en myndighet under riksdagen. Regeringen kan **inte** styra Riksbankens beslut. Enligt grundlagen får ingen myndighet bestämma över penningpolitiken, och direktionens ledamöter får inte söka eller ta emot instruktioner. Det kallas **instruktionsförbudet**. Liknande regler gäller för ECB på EU-nivå.
- Riksbanken införde **1995 ett inflationsmål på 2 %** per år.
- Enligt **riksbankslagen från 1 januari 2023** är det överordnade målet att upprätthålla varaktigt låg och stabil inflation (**prisstabilitetsmålet**). Utan att åsidosätta det målet ska Riksbanken också bidra till en balanserad utveckling av produktion och sysselsättning (**realekonomiska hänsyn**).
- Riksdagen måste godkänna hur prisstabilitetsmålet preciseras, t.ex. om målet skulle höjas. Riksbanken frågas ut i riksdagen varje år.

### Styrräntan i praktiken
- Riksbanken bestämmer en **styrränta**, enligt föreläsningen **1,75 %** (mars 2026).
- Med olika instrument ser Riksbanken till att **dagslåneräntan**, den korta riskfria räntan mellan bankerna, hamnar nära styrräntan:
  - Varje vecka ger Riksbanken ut **riksbankscertifikat** med en veckas löptid till styrräntan.
  - Bankerna kan låna eller sätta in pengar hos Riksbanken över natten, till räntor som ligger **0,1 procentenheter över respektive under** styrräntan.
- Styrräntan påverkar **andra räntor** i ekonomin. I vår modell verkar högre ränta genom lägre investeringar och därmed lägre produktion, och senare ska vi se att även inflationen faller. I verkligheten finns flera **transmissionsmekanismer**, men de verkar i huvudsak åt samma håll: **högre ränta ger lägre produktion och lägre inflation**.`,
        graphs: [
          {
            type: "series",
            title: "Riksbankens styrränta 2000–2026 (%)",
            xLabel: "År", yLabel: "Styrränta (%)",
            x: [2000, 2026.25], y: [-1, 6],
            series: [{ label: "Styrränta (reporänta)", data: steps }],
            caption: "Källa: Riksbankens räntebeslut. Datumen är avrundade till månad. Lägg märke till den kraftiga sänkningen under finanskrisen 2008–2009, den **negativa** räntan 2015–2019 och de snabba höjningarna 2022–2023 när inflationen steg.",
          },
        ],
      },
      {
        heading: "Kvantitativa lättnader (QE)",
        body: `När centralbankerna inte längre tyckte att de kunde sänka räntan mer började de köpa stora mängder **andra obligationer**, t.ex. bostadsobligationer (säkerställda obligationer), kommunobligationer och företagsobligationer. Det kallas **kvantitativa lättnader** (*Quantitative Easing*, QE).

Riksbankens värdepappersinnehav ökade från drygt 300 till nästan 1 000 miljarder kronor under pandemin (2020–2022). Balansräkningen växte alltså kraftigt jämfört med före finanskrisen 2008.

Kvantitativa lättnader är ett sätt att påverka **längre räntor** och likviditeten när den korta räntan redan ligger nära sin nedre gräns. Det knyter an till likviditetsfällan i kapitel 3.`,
      },
      {
        heading: "Lite doktrinhistoria",
        body: `- IS-LM-modellen utvecklades redan **1937 av John Hicks** (1904–1989).
- Den formulerar **John Maynard Keynes** (1883–1946) teorier matematiskt och med diagram. Keynes egna teorier var formulerade i ord och mycket svårgenomträngliga.
- Till skillnad från tidigare ekonomer betonade Keynes **efterfrågan**. Han menade att staten med finans- och penningpolitik bör motverka svängningar i efterfrågan, eftersom ekonomin annars kan gå igenom långa perioder med hög arbetslöshet.
- IS-LM är fortfarande centralt för hur politiker och andra tänker om ekonomin. Finansdepartementens och centralbankernas modeller är i dag oftast **nykeynesianska** (t.ex. MAJA) och beskriver direkt hur konsumenter och företag maximerar nytta respektive vinst.
- Centralt i alla keynesianska modeller är att **priserna är trögrörliga**. Priser och inflation kommer senare i kursen.`,
      },
    ],

    keyTerms: [
      { term: "Investeringsfunktion", def: "$I = I(Y, i)$, ökar med produktionen och minskar med räntan." },
      { term: "IS-kurvan", def: "Kombinationer av i och Y där varumarknaden är i jämvikt. Den lutar nedåt." },
      { term: "LM-kurvan", def: "Jämvikt på penningmarknaden. Med räntestyrning är den horisontell: $i = \\bar i$." },
      { term: "Reala pengar", def: "$M/P$. I jämvikt gäller $M/P = Y \\cdot L(i)$." },
      { term: "Finanspolitisk åtstramning", def: "Högre T eller lägre G, så att budgetunderskottet minskar." },
      { term: "Penningpolitisk stimulans", def: "Sänkt ränta (och ökad penningmängd)." },
      { term: "Policymix", def: "Kombinationen av finans- och penningpolitik." },
      { term: "Positiv återkoppling", def: "Högre produktion ökar investeringarna, vilket ökar produktionen ytterligare." },
      { term: "Styrränta", def: "Den ränta Riksbanken sätter, och som styr dagslåneräntan och andra räntor." },
      { term: "Instruktionsförbudet", def: "Riksbankens direktion får inte ta emot instruktioner om penningpolitiken." },
      { term: "Prisstabilitetsmålet", def: "Varaktigt låg och stabil inflation, preciserat som 2 %." },
      { term: "Transmissionsmekanism", def: "De kanaler genom vilka räntan påverkar produktion och inflation." },
      { term: "Kvantitativa lättnader (QE)", def: "Stora köp av obligationer när den korta räntan inte kan sänkas mer." },
    ],

    quiz: [
      {
        q: "Hur beror investeringarna på produktionen och räntan i kapitel 4?",
        options: [
          "De ökar med både produktionen och räntan",
          "De ökar med produktionen och minskar med räntan",
          "De minskar med produktionen och ökar med räntan",
          "De är exogena",
        ],
        answer: 1,
        explain: "$I = I(Y, i)$ med $I_Y > 0$ och $I_i < 0$.",
        topic: "Endogena investeringar",
      },
      {
        q: "Vad händer med ZZ-kurvan och jämviktsproduktionen när räntan höjs?",
        options: [
          "ZZ flyttas uppåt och Y ökar",
          "ZZ flyttas nedåt och Y minskar",
          "ZZ blir brantare och Y är oförändrad",
          "45°-linjen flyttas",
        ],
        answer: 1,
        explain: "Högre ränta minskar investeringarna vid varje Y, så efterfrågan blir lägre och jämvikten hamnar på en lägre produktionsnivå.",
        topic: "Räntans effekt på produktionen",
      },
      {
        q: "Varför lutar IS-kurvan nedåt?",
        options: [
          "Högre produktion ökar penningefterfrågan och därmed räntan",
          "Högre ränta minskar investeringarna och därmed produktionen i varumarknadsjämvikt",
          "Centralbanken sänker räntan när produktionen ökar",
          "Högre ränta ökar sparandet och konsumtionen",
        ],
        answer: 1,
        explain: "Längs IS-kurvan går orsakssambandet från räntan till produktionen. Det första alternativet beskriver penningmarknaden.",
        topic: "IS-kurvan",
      },
      {
        q: "Vad händer med IS-kurvan om den offentliga konsumtionen G ökar?",
        options: ["Den flyttas åt vänster", "Den flyttas åt höger", "Den blir horisontell", "Den påverkas inte"],
        answer: 1,
        explain: "Efterfrågan och produktionen blir högre vid varje ränta.",
        topic: "IS-kurvan",
      },
      {
        q: "Med en given penningmängd: vad händer med räntan om produktionen ökar?",
        options: ["Den stiger", "Den sjunker", "Den är oförändrad", "Den blir noll"],
        answer: 0,
        explain: "Efterfrågan på reala pengar $Y \\cdot L(i)$ ökar. Med oförändrat utbud måste räntan stiga för att efterfrågan ska hållas nere.",
        topic: "Penningmarknaden och produktionen",
      },
      {
        q: "Varför är LM-kurvan horisontell i kursens version av IS-LM?",
        options: [
          "För att penningefterfrågan inte beror på räntan",
          "För att ”oförändrad penningpolitik” definieras som konstant ränta, och centralbanken anpassar penningmängden så att räntan ligger fast",
          "För att penningmängden alltid är konstant",
          "För att priserna är flexibla",
        ],
        answer: 1,
        explain: "Moderna centralbanker sätter räntan. När Y ändras anpassas M så att $i = \\bar i$.",
        topic: "LM-sambandet: oförändrad penningpolitik = konstant ränta",
      },
      {
        q: "Skatten höjs. Vad händer i IS-LM-modellen (med horisontell LM)?",
        options: [
          "IS flyttas åt vänster. Y minskar, i är oförändrad och penningmängden minskar",
          "IS flyttas åt höger. Y ökar och i stiger",
          "LM flyttas uppåt. Y minskar och i stiger",
          "Ingenting händer med Y",
        ],
        answer: 0,
        explain: "T finns bara i IS-sambandet. Lägre produktion minskar penningefterfrågan, så centralbanken måste minska M för att hålla räntan oförändrad.",
        topic: "Finanspolitik: effekten av en skattehöjning",
      },
      {
        q: "Riksbanken sänker styrräntan. Vilken kurva flyttas?",
        options: ["IS åt höger", "IS åt vänster", "LM nedåt", "Båda kurvorna"],
        answer: 2,
        explain: "Räntan finns i LM-sambandet ($i = \\bar i$). IS-kurvan som samband påverkas inte, men vi rör oss längs den till högre Y.",
        topic: "Penningpolitik: effekten av en räntesänkning",
      },
      {
        q: "Varför förstärks effekten av en räntesänkning på produktionen (positiv återkoppling)?",
        options: [
          "Lägre ränta sänker skatterna",
          "Högre produktion ökar investeringarna ytterligare, vilket ökar efterfrågan och produktionen mer",
          "Penningmängden minskar",
          "Importen faller",
        ],
        answer: 1,
        explain: "Eftersom $I$ beror positivt på $Y$ ger den första ökningen i Y mer investeringar, och så vidare.",
        topic: "Penningpolitik: effekten av en räntesänkning",
      },
      {
        q: "Använd $C = 200 + 0{,}5(Y - T)$, $I = 300 + 0{,}1Y - 50i$, $G = 400$, $T = 300$ och $i = 3$ (procent). Hur stor är jämviktsproduktionen Y?",
        type: "numeric", answer: 1500, tolerance: 0.5,
        explain: "$Y = 200 + 0{,}5Y - 150 + 300 + 0{,}1Y - 150 + 400$ ger $0{,}4Y = 600$, alltså $Y = 1\\,500$.",
        topic: "IS och LM tillsammans",
      },
      {
        q: "Med samma modell: hur stor är multiplikatorn $1/(1 - c_1 - b_1)$?",
        type: "numeric", answer: 2.5, tolerance: 0.001,
        explain: "$1/(1 - 0{,}5 - 0{,}1) = 1/0{,}4 = 2{,}5$. Den är större än i kapitel 2 med samma $c_1$, eftersom även investeringarna nu ökar med Y.",
        topic: "IS och LM tillsammans",
      },
      {
        q: "Med samma modell: hur mycket ändras Y om räntan sänks från 3 % till 2 %?",
        type: "numeric", answer: 125, tolerance: 0.5,
        explain: "Investeringarna ökar med 50 vid varje Y, så $\\Delta Y = 2{,}5 \\times 50 = 125$.",
        topic: "Penningpolitik: effekten av en räntesänkning",
      },
      {
        q: "Med samma modell: skatterna höjs med 100. Hur mycket måste räntan sänkas (i procentenheter) för att Y ska vara oförändrad?",
        type: "numeric", answer: 1, tolerance: 0.01, unit: "procentenheter",
        explain: "Skattehöjningen minskar efterfrågan med $0{,}5 \\times 100 = 50$. En räntesänkning på $\\Delta i$ ökar den med $50\\,\\Delta i$, så $\\Delta i = 1$. Det är en policymix.",
        topic: "Policymix",
      },
      {
        q: "Regeringen vill minska budgetunderskottet utan att orsaka en lågkonjunktur. Vilken policymix ger det i IS-LM?",
        options: [
          "Finanspolitisk stimulans + penningpolitisk åtstramning",
          "Finanspolitisk åtstramning + penningpolitisk stimulans",
          "Finanspolitisk åtstramning + penningpolitisk åtstramning",
          "Bara finanspolitisk åtstramning",
        ],
        answer: 1,
        explain: "IS flyttas åt vänster och LM nedåt. Y kan bli oförändrad, men räntan blir lägre.",
        topic: "Policymix",
      },
      {
        q: "Vad visar Riksbankens modell MAJA om effekterna av en tillfällig räntehöjning?",
        options: [
          "Priserna reagerar omedelbart, men produktionen påverkas inte",
          "Produktion, konsumtion och investeringar faller ganska snabbt, medan priserna rör sig betydligt långsammare",
          "Produktionen ökar på kort sikt",
          "Ingen effekt alls",
        ],
        answer: 1,
        explain: "Det stämmer med IS-LM på kort sikt och med att priserna är trögrörliga.",
        topic: "IS-LM och mer realistiska modeller",
      },
      {
        q: "Vad är Riksbankens överordnade mål enligt riksbankslagen från 2023?",
        options: [
          "Full sysselsättning",
          "Varaktigt låg och stabil inflation (prisstabilitetsmålet)",
          "En stabil växelkurs",
          "Att finansiera statens budgetunderskott",
        ],
        answer: 1,
        explain: "Utan att åsidosätta prisstabilitetsmålet ska Riksbanken dessutom bidra till en balanserad utveckling av produktion och sysselsättning.",
        topic: "Riksbankens mandat och styrränta",
      },
      {
        q: "Vad innebär instruktionsförbudet?",
        options: [
          "Riksbanken får inte ge instruktioner till affärsbankerna",
          "Riksbankens direktion får inte söka eller ta emot instruktioner om penningpolitiken, t.ex. från regeringen",
          "Riksdagen får inte fråga ut Riksbanken",
          "Riksbanken får inte köpa statsobligationer",
        ],
        answer: 1,
        explain: "Det skyddar penningpolitikens självständighet. Liknande regler gäller för ECB.",
        topic: "Riksbankens mandat och styrränta",
      },
      {
        q: "Hur ser Riksbanken till att dagslåneräntan hamnar nära styrräntan?",
        options: [
          "Genom att sätta tak för bankernas utlåning",
          "Genom att ge ut riksbankscertifikat till styrräntan och låta bankerna låna och sätta in pengar över natten till 0,1 procentenheter över respektive under styrräntan",
          "Genom att ändra skatterna",
          "Genom att köpa aktier",
        ],
        answer: 1,
        explain: "Ingen bank lånar ut till en annan bank billigare än inlåningsräntan, eller lånar dyrare än utlåningsräntan, hos Riksbanken. Därför hamnar dagslåneräntan nära styrräntan.",
        topic: "Riksbankens mandat och styrränta",
      },
      {
        q: "Vad är kvantitativa lättnader (QE)?",
        options: [
          "Att centralbanken sänker styrräntan till noll",
          "Att centralbanken köper stora mängder obligationer (t.ex. bostadsobligationer) när den inte kan sänka räntan mer",
          "Att regeringen sänker skatterna",
          "Att bankerna minskar sina reserver",
        ],
        answer: 1,
        explain: "Riksbankens värdepappersinnehav ökade kraftigt under pandemin 2020–2022.",
        topic: "Kvantitativa lättnader (QE)",
      },
      {
        q: "Vem formulerade IS-LM-modellen 1937 utifrån Keynes teorier?",
        options: ["John Maynard Keynes", "John Hicks", "Léon Walras", "Jean-Baptiste Say"],
        answer: 1,
        explain: "John Hicks gjorde Keynes teorier matematiska och diagrammatiska.",
        topic: "Lite doktrinhistoria",
      },
    ],
  });
})();
