// Modell i graferna (linjäriserad): D = 120 + 0,7Y + G − 50i, NX = 400 − 0,2Y − 3000(E − 1),
// ränteparitet E ≈ Eᵉ(1 + (i − i*)/100). Då blir IS: i = (3520 + G − 3000Eᵉ + 30Eᵉi* − Y/2)/(50 + 30Eᵉ).
registerLecture({
  id: "kapitel-8",
  number: 8,
  title: "Kapitel 8: Produktion, ränta och växelkurs",
  summary: "Mundell–Fleming-modellen: varumarknaden, penningmarknaden och räntepariteten tillsammans. Penning- och finanspolitik vid flytande växelkurs, fast växelkurs, spekulativa attacker och räntechocken 1992.",
  tags: ["Mundell–Fleming", "Ränteparitet", "Flytande växelkurs", "Fast växelkurs", "Spekulativa attacker"],

  sections: [
    {
      heading: "Tre marknader i jämvikt samtidigt",
      body: `Nu kopplar vi ihop **varumarknaden**, **penningmarknaden** och **öppen ränteparitet** (jämvikt på den internationella finansmarknaden).

- Vi får en **allmän jämvikt** där **produktion, ränta och växelkurs** bestäms samtidigt. Modellen brukar kallas **Mundell–Fleming-modellen**.
- Vi kan använda modellen för att studera bland annat effekterna av **penning- och finanspolitik**.
- Vi kommer att se att en **självständig penningpolitik blir omöjlig vid fast växelkurs**, eftersom räntan då bestäms helt av omvärlden.`,
    },
    {
      heading: "Jämvikt på varumarknaden",
      body: `Jämviktsvillkoret på varumarknaden (produktion = efterfrågan):
$$Y = C(Y - T) + I(Y, i) + G + NX(Y, Y^*, \\varepsilon)$$

Både **räntan** och den **reala växelkursen** påverkar efterfrågan och därmed jämviktsproduktionen:
- **Högre ränta** minskar efterfrågan via lägre investeringar.
- **Högre real växelkurs** minskar efterfrågan via lägre nettoexport (givet Marshall–Lerner-villkoret).

Kom ihåg att $\\varepsilon \\equiv EP/P^*$. Om priserna hemma och utomlands är konstanta kan vi sätta $P/P^* = 1$, eftersom båda är index med godtycklig basnivå. **Då är $\\varepsilon = E$.** Det är realistiskt på kort sikt, eftersom den nominella växelkursen varierar mycket mer än prisnivån.`,
    },
    {
      heading: "Jämvikt på de finansiella marknaderna",
      body: `På **penningmarknaden** är inget förändrat: LM-sambandet är detsamma som tidigare.

Jämvikt på den **internationella finansmarknaden** (valuta och obligationer) ges av ränteparitetsvillkoret:
$$1 + i_t = (1 + i^*_t)\\,\\frac{E_t}{E^e_{t+1}}$$
För en given förväntad framtida växelkurs $E^e_{t+1} = \\bar E^e$ får vi:
$$E_t = \\frac{1 + i_t}{1 + i^*_t}\\,\\bar E^e$$

**En (oväntad) höjning av den inhemska räntan ökar $E_t$**, givet att den förväntade framtida växelkursen inte ändras. Varför?
- Högre $E_t$ innebär en **apprecierad** valuta.
- Givet växelkursen i framtiden innebär dagens appreciering att växelkursen **förväntas falla** (mer) framöver.
- Det förväntade fallet **kompenserar för den högre räntan** hemma, så att både utländska och inhemska obligationer ger samma avkastning i gemensam valuta.

### Ränteparitetskurvan
Ränteparitetsvillkoret ger ett **positivt samband mellan växelkurs och ränta**. En högre ränta måste motsvaras av en större förväntad depreciering. Givet den förväntade framtida växelkursen måste dagens växelkurs då vara högre, för att möjliggöra den större deprecieringen. **Förändringar i den utländska räntan och i den förväntade växelkursen förskjuter ränteparitetskurvan.**`,
      graphs: [
        {
          type: "curves",
          title: "Ränteparitetskurvan: i som funktion av E",
          xLabel: "Växelkurs, E", yLabel: "Inhemsk ränta, i (%)",
          x: [0.94, 1.08], y: [0, 8],
          params: {
            ibar: { label: "Inhemsk ränta ī (%)", min: 0, max: 8, step: 0.25, value: 3 },
            is: { label: "Utländsk ränta i* (%)", min: 0, max: 8, step: 0.25, value: 3 },
            Ee: { label: "Förväntad växelkurs Ēᵉ", min: 0.96, max: 1.04, step: 0.005, value: 1 },
          },
          curves: [
            { label: "Ränteparitet", fn: "100*((x/Ee)*(1 + is/100) - 1)", ghost: true },
            { label: "ī", fn: "ibar", dashed: true },
          ],
          points: [{ between: ["Ränteparitet", "ī"], label: "E" }],
          readout: "E = {E.x:4} · förväntad förändring av E: {=100*(Ee/((1+ibar/100)/(1+is/100)*Ee) - 1):2} %",
          caption: "Exakt villkor: $E = \\frac{1+i}{1+i^*}\\bar E^e$. Högre ī ger högre E (appreciering). Högre i* eller lägre Ēᵉ flyttar kurvan så att E blir lägre vid varje ränta.",
        },
      ],
    },
    {
      heading: "Varu- och finansmarknaderna tillsammans",
      body: `Vi har nu **tre jämviktsvillkor**, som tillsammans bestämmer de **tre endogena variablerna Y, i och E**:

1. **Varumarknadsjämvikt (IS-kurvan)** i den öppna ekonomin. Den ger ett samband mellan Y och i som beror på växelkursen, finanspolitiken (T och G) och utländsk produktion Y\\*:
$$Y = C(Y - T) + I(Y, i) + G + NX(Y, Y^*, E)$$
2. **Penningmarknadsjämvikt (LM-kurvan)**, som med en centralbank som sätter räntan blir:
$$i = \\bar i$$
3. **Ränteparitet**, som ger ett samband mellan E och i som beror på den utländska räntan i\\* och den förväntade växelkursen:
$$E_t = \\frac{1 + i_t}{1 + i^*_t}\\,\\bar E^e$$

### IS-LM i den öppna ekonomin
Precis som i den slutna ekonomin ger högre ränta lägre produktion, så **IS-kurvan lutar nedåt**. Men nu finns det **två orsaker**:
1. Precis som i den slutna ekonomin leder en högre ränta till **lägre investeringar**.
2. Högre ränta leder till **högre växelkurs** via räntepariteten, vilket **minskar nettoexporten**.

Med en centralbank som sätter räntan blir **LM-kurvan horisontell** vid den valda räntan. I diagrammen ritar man IS-LM till vänster och ränteparitetskurvan till höger, med samma ränta på y-axeln.`,
      graphs: [
        {
          type: "curves",
          title: "Mundell–Fleming: IS-LM i den öppna ekonomin",
          xLabel: "Produktion, Y", yLabel: "Ränta, i (%)",
          x: [0, 2500], y: [0, 10],
          params: {
            ibar: { label: "Styrränta ī (%)", min: 0, max: 8, step: 0.25, value: 3 },
            G: { label: "Offentlig konsumtion G", min: 200, max: 700, step: 10, value: 400 },
            is: { label: "Utländsk ränta i* (%)", min: 0, max: 8, step: 0.25, value: 3 },
            Ee: { label: "Förväntad växelkurs Ēᵉ", min: 0.96, max: 1.04, step: 0.005, value: 1 },
          },
          curves: [
            { label: "IS", fn: "(3520 + G - 3000*Ee + 30*Ee*is - x/2)/(50 + 30*Ee)", ghost: true },
            { label: "LM", fn: "ibar", ghost: true },
          ],
          points: [{ between: ["IS", "LM"], label: "A" }],
          readout: "Y = {A.x} · i = {ibar} % · växelkurs E = {=Ee*(1 + (ibar - is)/100):4} · NX = {=400 - 0.2*((3520 + G - 3000*Ee + 30*Ee*is - (50 + 30*Ee)*ibar)*2) - 3000*(Ee*(1 + (ibar - is)/100) - 1)}",
          caption: "Här är $D = 120 + 0{,}7Y + G - 50i$, $NX = 400 - 0{,}2Y - 3000(E - 1)$ och $E \\approx \\bar E^e(1 + (i - i^*)/100)$. **Prova:** höj styrräntan från 3 % till 4 %. Y faller och E stiger (appreciering). Om du i stället höjer G flyttas IS åt höger, men E är oförändrad eftersom räntan inte ändras. **Fast växelkurs:** för att E ska ligga kvar på Ēᵉ måste ī = i\\*. Om i\\* höjs måste ī följa med.",
        },
      ],
    },
    {
      heading: "Åtstramande penningpolitik vid flytande växelkurs",
      body: `Vad händer om **Riksbanken höjer räntan**?

- En höjning av räntan (som kräver en minskning av M) **förskjuter LM-kurvan uppåt** till LM′.
- I ränteparitetsdiagrammet leder den högre räntan till en **högre växelkurs**, E′.

**Slutsats:** produktionen faller till Y′, räntan stiger till i′ och växelkursen stiger till E′ (**valutan apprecierar**). Både den starkare växelkursen och ränteökningen minskar Y.

**Vad händer med nettoexporten?** Lägre Y (mindre import) och högre E (dyrare export) **drar åt motsatta håll**, så den sammanlagda effekten på NX är **oklar**.`,
    },
    {
      heading: "Expansiv finanspolitik vid flytande växelkurs",
      body: `Vad händer om regeringen **ökar G** (eller minskar T)?

- G ingår i IS-sambandet. **IS förskjuts åt höger**, eftersom efterfrågan och därmed jämviktsproduktionen blir större vid varje räntenivå.
- Om centralbanken **inte ändrar räntan** ändras inte heller **växelkursen**, eftersom räntepariteten ger E givet i.

**Slutsats:** produktionen ökar till Y′. Växelkursen är oförändrad, och **nettoexporten faller**, eftersom Y ökar och därmed importen.`,
    },
    {
      heading: "Fast växelkurs",
      body: `Anta nu att landet har valt en **fast växelkurs**.

- Om landet har **öppna finansmarknader** (som i västvärlden) måste ränteparitetsvillkoret vara uppfyllt:
$$E_t = \\frac{1 + i_t}{1 + i^*_t}\\,\\bar E^e$$
- Men fast växelkurs betyder att dagens växelkurs $E_t$ måste vara **densamma som den förväntade** $\\bar E^e$.
- Det kräver att $\\frac{1 + i_t}{1 + i^*_t} = 1$, och därmed att
$$i_t = i^*_t$$

**Det går alltså inte för ett land med fast växelkurs att fritt bestämma sin ränta.** Penningpolitiken (räntesättningen) måste helt inriktas på att hålla växelkursen konstant. Finanspolitiken blir då det viktigaste stabiliseringspolitiska verktyget.`,
      takeaway: "Fast växelkurs + fria kapitalrörelser ⇒ i = i*. Ingen självständig penningpolitik.",
    },
    {
      heading: "Spekulativa attacker",
      body: `Länder med fasta växelkurser eller växelkursband har historiskt ofta **devalverat**, ofta i samband med en **spekulativ attack**, en lågkonjunktur eller svag lönsamhet i exportindustrin.

Under fast växelkurs måste Riksbanken hålla ett visst pris på sin egen valuta i andra valutor.

### Ett räkneexempel
- Sverige bestämmer att EUR/SEK = 1/10, och Riksbanken har **10 miljarder euro** i valutareserven.
- En spekulant köper alla Riksbankens euro till det priset. Det kostar **100 miljarder kronor**. Riksbanken måste då låta kronan flyta.
- Man kan ofta vara ganska säker på att valutan då **deprecierar** (E minskar). Säg att EUR/SEK blir 1/11.
- Spekulanten säljer tillbaka sina euro och får **110 miljarder kronor**. Det är en spekulativ vinst på **10 miljarder**!

### Räntan vid förväntad devalvering
Om valutahandlarna förväntar sig en devalvering måste räntan öka för att få dem att inte sälja sin inhemska valuta. Räntepariteten kräver
$$i_t = i^*_t - \\frac{E^e_{t+1} - E_t}{E_t}$$

**Exempel:** marknaden tror att det är **10 % chans** att det blir en **devalvering på 10 %** nästa dag. Den förväntade devalveringen är då **1 % per dag**, och räntan måste vara 1 % högre än omvärldens **per dag**. Efter ett år har 1 krona vuxit till $(1{,}01)^{365} \\approx 38$ kronor, så årsräntan blir cirka $38 - 1 = 37$, dvs. **3 700 %**. Föreläsningen avrundar till ≈ 3 800 %.

### Tre alternativ
1. **Ge upp och devalvera.**
2. **Kämpa** och upprätthålla pariteten med extremt höga räntor, med en eventuell recession som följd. Kampen kanske ändå inte går att vinna, och då hade det kanske varit bättre att ge upp direkt.
3. **Införa valutareglering.**`,
      graphs: [
        {
          type: "curves",
          title: "Vilken räntepremie krävs för att försvara valutan?",
          xLabel: "Sannolikhet för devalvering nästa dag (%)", yLabel: "Räntepremie per dag (procentenheter)",
          x: [0, 30], y: [0, 6],
          params: {
            p: { label: "Sannolikhet för devalvering (%)", min: 0, max: 30, step: 0.5, value: 10 },
            s: { label: "Devalveringens storlek (%)", min: 0, max: 20, step: 0.5, value: 10 },
          },
          curves: [
            { label: "Premie = p · s", fn: "x/100*s" },
            { label: "p", xAt: "p", dashed: true },
          ],
          points: [{ between: ["Premie = p · s", "p"], label: "R" }],
          readout: "Förväntad devalvering: {R.y} % per dag ⇒ räntan måste vara {R.y} procentenheter högre än omvärldens per dag, vilket motsvarar en årsränta på ca {=100*(pow(1 + p*s/10000, 365) - 1)} %",
          caption: "Med 10 % sannolikhet och 10 % devalvering blir premien 1 % per dag, alltså ca 3 700 % per år (föreläsningen avrundar till ≈ 3 800 %). Även små dagliga premier blir enorma omräknade till årsränta.",
        },
      ],
    },
    {
      heading: "Svenska räntechocken 1992",
      body: `- Fram till 1992 hade Sverige **fast växelkurs**, men devalverade då och då.
- Den **16 september 1992** höjde Riksbanken styrräntan till **500 %**, vilket är $500/365 \\approx 1{,}37$ % **per dag**. Omräknat motsvarar det **över 14 000 % per år**.
- Det lyckades tillfälligt stoppa valutautflödet, men den **19 november 1992** lät man kronan flyta, och den **föll med över 20 %**.

Räntechocken visar alternativ 2 ovan: att kämpa med extremt höga räntor fungerar bara tillfälligt om marknaden fortsätter att tro på en devalvering.`,
    },
    {
      heading: "Lite doktrinhistoria: Mundell och Fleming",
      body: `- IS-LM-modellen för en öppen ekonomi utvecklades oberoende av varandra av **Robert Mundell (1963)** och **Marcus Fleming (1962)**. Den kallas därför **Mundell–Fleming-modellen**.
- Mundell utvecklade också teorin för **optimala valutaområden**, dvs. vilka faktorer som avgör om regioner eller länder bör ha samma valuta (eller fast växelkurs mot varandra).
- Han betonade **två faktorer** som gör en gemensam valuta fördelaktig:
  1. **Synkroniserade konjunkturstörningar:** ländernas konjunkturer är välkorrelerade, dvs. de har hög- och lågkonjunktur ungefär samtidigt.
  2. **Rörlig arbetskraft:** det finns goda möjligheter för arbetskraften att röra sig mellan länderna.
- Om dessa faktorer inte är uppfyllda är en gemensam valuta mindre fördelaktig.
- Mundell fick ekonomipriset **1999**.`,
    },
  ],

  keyTerms: [
    { term: "Mundell–Fleming-modellen", def: "IS-LM för en öppen ekonomi med ränteparitet, som bestämmer Y, i och E samtidigt." },
    { term: "Ränteparitetskurvan", def: "Det positiva sambandet mellan i och E: $E = \\frac{1+i}{1+i^*}\\bar E^e$." },
    { term: "Flytande växelkurs", def: "Växelkursen bestäms på marknaden, och centralbanken kan sätta räntan fritt." },
    { term: "Fast växelkurs", def: "Växelkursen hålls konstant. Med fria kapitalrörelser krävs då att $i = i^*$." },
    { term: "Spekulativ attack", def: "Storskalig försäljning av en valuta i förväntan om devalvering." },
    { term: "Valutareglering", def: "Begränsningar av kapitalflöden in och ut ur landet." },
    { term: "Optimalt valutaområde", def: "Ett område där en gemensam valuta är fördelaktig: synkroniserade konjunkturer och rörlig arbetskraft." },
  ],

  quiz: [
    {
      q: "Vilka tre endogena variabler bestäms i Mundell–Fleming-modellen?",
      options: ["Y, i och E", "Y, P och W", "C, I och G", "i, i* och Eᵉ"],
      answer: 0,
      explain: "Med IS, LM och ränteparitet bestäms produktion, ränta och växelkurs. i\\* och Eᵉ är exogena.",
      topic: "Varu- och finansmarknaderna tillsammans",
    },
    {
      q: "Varför lutar IS-kurvan nedåt i en öppen ekonomi?",
      options: [
        "Bara för att högre ränta minskar investeringarna",
        "Högre ränta minskar investeringarna och ger högre växelkurs (via räntepariteten), vilket minskar nettoexporten",
        "Högre ränta ökar importen direkt",
        "Högre produktion höjer räntan",
      ],
      answer: 1,
      explain: "I den öppna ekonomin finns två kanaler: investeringarna och nettoexporten.",
      topic: "Varu- och finansmarknaderna tillsammans",
    },
    {
      q: "Givet $\\bar E^e$ och i\\*: vad händer med dagens växelkurs om den inhemska räntan höjs oväntat?",
      options: ["E faller (valutan deprecierar)", "E stiger (valutan apprecierar)", "E är oförändrad", "E blir lika med i\\*"],
      answer: 1,
      explain: "$E = \\frac{1+i}{1+i^*}\\bar E^e$. Dagens appreciering gör att valutan förväntas försvagas tillbaka, vilket kompenserar för den högre räntan.",
      topic: "Jämvikt på de finansiella marknaderna",
    },
    {
      q: "$\\bar E^e = 1$, $i^* = 2$ % och $i = 5$ %. Vad är E enligt det exakta ränteparitetsvillkoret? (Fyra decimaler.)",
      type: "numeric", answer: 1.0294, tolerance: 0.0001,
      explain: "$E = 1{,}05/1{,}02 \\approx 1{,}0294$.",
      topic: "Jämvikt på de finansiella marknaderna",
    },
    {
      q: "Riksbanken höjer räntan vid flytande växelkurs. Vad händer?",
      options: [
        "Y faller, i stiger och E stiger (appreciering). Effekten på NX är oklar",
        "Y faller, i stiger och E faller. NX ökar säkert",
        "Y ökar och E stiger",
        "Bara räntan ändras",
      ],
      answer: 0,
      explain: "Lägre Y minskar importen, medan högre E minskar exporten. De två effekterna på NX drar åt olika håll.",
      topic: "Åtstramande penningpolitik vid flytande växelkurs",
    },
    {
      q: "Regeringen ökar G vid flytande växelkurs, och centralbanken håller räntan oförändrad. Vad händer med växelkursen och nettoexporten?",
      options: [
        "E stiger och NX ökar",
        "E är oförändrad och NX faller",
        "E faller och NX ökar",
        "E är oförändrad och NX är oförändrad",
      ],
      answer: 1,
      explain: "Med oförändrad ränta ger räntepariteten oförändrad E. Högre Y ökar importen, så NX faller.",
      topic: "Expansiv finanspolitik vid flytande växelkurs",
    },
    {
      q: "Varför måste $i = i^*$ vid fast växelkurs och fria kapitalrörelser?",
      options: [
        "För att centralbanken bestämmer i\\*",
        "För att fast växelkurs innebär $E_t = \\bar E^e$, och räntepariteten då kräver $(1+i)/(1+i^*) = 1$",
        "För att inflationen alltid är noll",
        "För att IS-kurvan är horisontell",
      ],
      answer: 1,
      explain: "Om $i \\neq i^*$ skulle växelkursen behöva förväntas ändras, men det förutsätts inte ske vid fast kurs.",
      topic: "Fast växelkurs",
    },
    {
      q: "Utlandets ränta höjs, och landet har fast växelkurs. Vad måste centralbanken göra?",
      options: ["Sänka räntan", "Höja räntan lika mycket", "Ingenting", "Höja G"],
      answer: 1,
      explain: "Med fast växelkurs måste $i = i^*$. Penningpolitiken bestäms helt av omvärlden.",
      topic: "Fast växelkurs",
    },
    {
      q: "Riksbanken har 10 miljarder euro och försvarar kursen 10 kr/euro. En spekulant köper alla euro, och sedan deprecierar kronan till 11 kr/euro. Hur stor blir spekulantens vinst (miljarder kronor)?",
      type: "numeric", answer: 10, tolerance: 0.01, unit: "miljarder kr",
      explain: "Köp: 10 mdr euro × 10 = 100 mdr kr. Försäljning: 10 × 11 = 110 mdr kr. Vinst: 10 mdr kr.",
      topic: "Spekulativa attacker",
    },
    {
      q: "Marknaden tror att det är 20 % chans för en devalvering på 5 % nästa dag. Hur mycket högre än omvärldens måste den inhemska räntan vara per dag (procentenheter)?",
      type: "numeric", answer: 1, tolerance: 0.01, unit: "procentenheter",
      explain: "Förväntad devalvering: $0{,}2 \\times 5 = 1$ % per dag.",
      topic: "Spekulativa attacker",
    },
    {
      q: "Vilka tre alternativ har ett land under en spekulativ attack enligt föreläsningen?",
      options: [
        "Höja skatterna, sänka G, höja tullarna",
        "Ge upp och devalvera, kämpa med extremt höga räntor, eller införa valutareglering",
        "Sänka räntan, höja G, devalvera",
        "Byta valuta, gå med i EU, höja lönerna",
      ],
      answer: 1,
      explain: "Att kämpa kan leda till recession och ändå misslyckas, som i Sverige 1992.",
      topic: "Spekulativa attacker",
    },
    {
      q: "Vad hände med den svenska kronan efter räntechocken i september 1992?",
      options: [
        "Den fasta kursen höll i flera år",
        "Valutautflödet stoppades tillfälligt, men i november 1992 släpptes kronan och den föll med över 20 %",
        "Kronan apprecierade kraftigt",
        "Sverige införde euron",
      ],
      answer: 1,
      explain: "Styrräntan 500 % (ca 1,37 % per dag) kunde bara tillfälligt försvara kursen.",
      topic: "Svenska räntechocken 1992",
    },
    {
      q: "Vilka två faktorer gör en gemensam valuta fördelaktig enligt Mundells teori om optimala valutaområden?",
      options: [
        "Låg inflation och låg statsskuld",
        "Synkroniserade konjunkturer och rörlig arbetskraft mellan länderna",
        "Hög ränta och fast växelkurs",
        "Gemensamt språk och gemensam skatt",
      ],
      answer: 1,
      explain: "Om länderna har konjunkturen i fas behövs ingen egen penningpolitik, och rörlig arbetskraft kan ersätta växelkursanpassningar.",
      topic: "Lite doktrinhistoria: Mundell och Fleming",
    },
  ],
});
