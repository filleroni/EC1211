registerLecture({
  id: "kapitel-6",
  number: 6,
  title: "Kapitel 6: Öppna varu- och finansmarknader",
  summary: "Öppenhet på olika marknader, nominell och real växelkurs, betalningsbalansen, BNP och BNI samt valet mellan inhemska och utländska tillgångar: ränteparitet.",
  tags: ["Växelkurs", "Real växelkurs", "Betalningsbalans", "BNI", "Ränteparitet"],

  sections: [
    {
      heading: "Världens ekonomier hänger ihop",
      body: `Tillväxttakten i real BNP rör sig ofta åt samma håll i olika länder, eftersom ekonomierna hänger tätt ihop. Kapitlet handlar om tre frågor:

- Vad innebär **öppenhet** på varu- och finansmarknaderna?
- Vad bestämmer valet mellan **inhemska och utländska varor**?
- Vad bestämmer valet mellan **inhemska och utländska tillgångar**?`,
    },
    {
      heading: "Öppenhet på olika marknader",
      body: `Graden av öppenhet skiljer sig ofta mellan marknader:

- **Varumarknader:** restriktioner i form av **tullar** och import- eller exportkvoter.
- **Finansiella marknader:** regler för **kapitalflöden** avgör i vilken grad man får äga finansiella tillgångar (aktier, obligationer) i andra länder. Sådana regler är i stort sett borttagna mellan de rika länderna.
- **Faktormarknader:** en uppsjö av regler påverkar var arbetskraft och fysiskt kapital kan användas. Vi **bortser** från rörlighet på faktormarknaderna.

### Öppenhet på varumarknaden
- Sveriges export och import är vardera **ungefär hälften så stor som BNP**.
- Andelarna har **ökat stadigt sedan 1970-talet**. Under de hundra åren innan dess fanns ingen tydlig trend.
- Sverige hade **underskott** i handeln under 70-talet och **överskott sedan 90-talet**.
- Exportandelen varierar mycket mellan länder. **Många små länder har stor exportandel, medan stora länder har liten.** Exportandelen kan till och med vara **över 100 %** av BNP, eftersom exporten mäts som hela försäljningsvärdet medan BNP bara räknar förädlingsvärdet. Ett land som importerar insatsvaror, förädlar dem lite och exporterar dem kan alltså få export > BNP.

### Ett bättre mått på öppenhet
Export- och importandelar är **inget bra mått** på öppenhet. Ett bättre mått är **andelen av produktionen som är utsatt för utländsk konkurrens**, dvs. som kan exporteras eller importeras. Branscher som producerar sådana varor kallas **den konkurrensutsatta sektorn**. Den begränsas av både fysiska och legala hinder.`,
    },
    {
      heading: "Nominell växelkurs",
      body: `Den **nominella växelkursen** är relativpriset mellan **valutor** (inte varor). Den kan definieras på två sätt:

| Definition | Exempel |
|---|---|
| Priset på utländsk valuta i inhemsk valuta | ca **11 SEK/EUR** (”en euro kostar 11 kronor”) |
| Värdet av inhemsk valuta i utländsk valuta | ca **0,09 EUR/SEK** (”en krona är värd 0,09 euro”) |

**I kursen definieras växelkursen $E$ som mängden utländsk valuta per enhet inhemsk valuta** (t.ex. EUR/SEK). Valet är godtyckligt. I flera diagram, och i tidningarna, används den motsatta definitionen (t.ex. 10,20 SEK/USD).

Med kursens definition gäller:
- **Appreciering** (kronan blir starkare och mer värd): **$E$ ökar**.
- **Depreciering** (kronan blir svagare och utländsk valuta dyrare): **$E$ minskar**.
- Med **fasta växelkurser** talar man i stället om **revalvering** och **devalvering**.

Flytande nominella växelkurser **svänger mycket**, som Riksbankens data över kronans kurs visar.`,
    },
    {
      heading: "Valet mellan inhemska och utländska varor",
      body: `Konsumenter och företag väljer mellan inhemskt och utländskt producerade varor utifrån **relativpriset i gemensam valuta**. Vad kostar en BMW (tillverkad i Tyskland) i förhållande till en Volvo (tillverkad i Sverige)? Det beror på tre priser:

- priset på BMW:n i Tyskland (i EUR),
- priset på Volvon i Sverige (i SEK),
- den nominella växelkursen (EUR per SEK).

**Exempel:** $P_{BMW} = 50\\,000$ EUR, $P_{Volvo} = 250\\,000$ SEK, $E = 0{,}10$ EUR/SEK.
$$\\text{relativpris} = \\frac{P_{Volvo} \\times E}{P_{BMW}} = \\frac{250\\,000 \\times 0{,}10}{50\\,000} = \\frac{1}{2}$$
Volvon är **hälften så dyr** som BMW:n. Enheterna blir $\\frac{\\text{SEK}/\\text{Volvo} \\times \\text{EUR}/\\text{SEK}}{\\text{EUR}/\\text{BMW}} = \\frac{\\text{BMW}}{\\text{Volvo}}$, alltså antal utländska varor per inhemsk vara.`,
      graphs: [
        {
          type: "curves",
          title: "Volvons pris i förhållande till BMW:ns, som funktion av växelkursen",
          xLabel: "Växelkurs E (EUR per SEK)", yLabel: "Relativpris (BMW per Volvo)",
          x: [0.05, 0.15], y: [0, 1.6],
          params: {
            E: { label: "Växelkurs E (EUR/SEK)", min: 0.05, max: 0.15, step: 0.001, value: 0.1 },
            PV: { label: "Volvons pris (SEK)", min: 150000, max: 400000, step: 5000, value: 250000 },
            PB: { label: "BMW:ns pris (EUR)", min: 30000, max: 70000, step: 1000, value: 50000 },
          },
          curves: [
            { label: "Relativpris", fn: "PV*x/PB", ghost: true },
            { label: "Lika dyra", fn: "1", dashed: true },
            { label: "E", xAt: "E", dashed: true },
          ],
          points: [{ between: ["Relativpris", "E"], label: "V" }],
          readout: "En Volvo kostar {V.y} BMW. Volvon kostar {=PV*E} EUR (och BMW:n {=PB/E} SEK).",
          caption: "Om kronan apprecierar (E ökar) blir svenska bilar **dyrare** jämfört med tyska, vilket är dåligt för exporten. Om kronan deprecierar blir de billigare.",
        },
      ],
    },
    {
      heading: "Real växelkurs",
      body: `Samma beräkning kan göras för **hela ekonomins prisnivå**. Använd BNP-deflatorn $P$ i Sverige och $P^*$ i utlandet:
$$\\varepsilon = \\frac{E \\, P}{P^*}$$
Detta är den **reala växelkursen**. Den mäter **hur dyra ett lands produkter är i förhållande till andra länders**, och avgör t.ex. om det är dyrt (Schweiz) eller billigt (Thailand) att konsumera i ett land.

Den reala växelkursen **apprecierar** ($\\varepsilon$ ökar, inhemska varor blir relativt dyrare) om
- den **nominella växelkursen apprecierar** ($E$ ökar), eller
- **inhemska priser stiger mer än utländska** ($P/P^*$ ökar).

### Nominell och real växelkurs i praktiken
- På kort sikt rör sig den nominella och den reala växelkursen normalt **parallellt**, eftersom $P/P^*$ är mycket mer **trögrörlig** än $E$.
- Men inte alltid: sedan början av 2018 har kronan **deprecierat nominellt** mot euron utan att den reala växelkursen har deprecierat lika mycket. Alltså måste $P/P^*$ ha stigit.

### Bilaterala och multilaterala växelkurser
- **Bilateral** växelkurs: mellan två länder.
- **Multilateral** växelkurs: ett vägt genomsnitt av flera bilaterala växelkurser, oftast med **handelsvikter**.
- Den svenska multilaterala växelkursen kallas **KIX**. Den reala KIX ($\\varepsilon$) har haft en starkare nedåtgående trend än den nominella ($E$). Det vi producerar har alltså blivit **billigare** relativt omvärlden.`,
      takeaway: "ε = EP/P*. Om ε ökar (real appreciering) blir svenska varor relativt dyrare.",
    },
    {
      heading: "Öppenhet på finansiella marknader",
      body: `Internationell öppenhet på finansmarknaderna
- låter investerare **diversifiera**, dvs. inte lägga alla ägg i samma korg (bra för alla),
- låter investerare **spekulera**, dvs. försöka tjäna pengar på prisförändringar med hjälp av bättre information (i viss mån ett nollsummespel),
- låter länder ha **underskott eller överskott i handeln**. Ett land kan konsumera och investera mer än sin löpande inkomst (köpa nu och betala senare), eller mindre (och få en fordran på omvärlden).`,
    },
    {
      heading: "Betalningsbalansen",
      body: `**Betalningsbalansen** summerar ett lands transaktioner med omvärlden. Den delas upp i:

1. **Bytesbalansen**, som består av
   - **handelsbalansen** (export minus import av varor),
   - **tjänstebalansen** (export minus import av tjänster),
   - **faktorinkomstbalansen** eller primärinkomster: löner och kapitalinkomster (inkl. räntor) från utlandet till bosatta i landet, minus motsvarande till utlandet,
   - **löpande transfereringar** eller sekundärinkomster (t.ex. biståndet och EU-avgiften).
2. **Kapitalbalansen**: vissa kapitalöverföringar, så små att vi kan bortse från dem.
3. **Den finansiella balansen** (se nästa avsnitt).

### Sveriges betalningsbalans 2022 (miljarder kronor)

| Post | Mdr kr |
|---|---:|
| Handel med varor | 214,4 |
| Handel med tjänster | −109,7 |
| **A. Handel totalt** | **104,7** |
| Kapitalavkastning | 239,8 |
| Löner och övrigt | 1,1 |
| **B. Primärinkomster totalt** | **241,0** |
| EU-avgift | −37,4 |
| Internationellt samarbete | −45,6 |
| Övrigt | −30,7 |
| **C. Sekundärinkomster totalt** | **−113,7** |
| **A + B + C = Bytesbalans** | **232,0** |
| D. Kapitalbalans | 5,7 |
| Direktinvesteringar | 93,6 |
| Portföljinvesteringar | −188,2 |
| Finansiella derivat | 88,1 |
| Övriga investeringar | −73,9 |
| Valutareserv | 78,6 |
| **E. Finansiell balans netto** | **−1,9** |
| Restpost = E − (A + B + C + D) | −239,6 |

Restposten är stor, vilket visar att statistiken över de finansiella flödena är svår att mäta.`,
      graphs: [
        {
          type: "series", bars: true,
          title: "Sveriges bytesbalans 2022 (miljarder kr)",
          categories: ["Varor", "Tjänster", "Primärinkomster", "Sekundärinkomster", "Bytesbalans"],
          yLabel: "Miljarder kronor", y: [-150, 300],
          series: [{ label: "2022", data: [[0, 214.4], [1, -109.7], [2, 241.0], [3, -113.7], [4, 232.0]] }],
          caption: "Varuexporten och avkastningen på svenska tillgångar utomlands ger stora plusposter. Tjänstehandeln och transfereringarna är negativa. Totalt hade Sverige ett överskott i bytesbalansen på 232 miljarder.",
        },
      ],
    },
    {
      heading: "Finansiell balans och Sveriges ställning mot omvärlden",
      body: `Vad händer om **bytesbalansen inte är noll**?

- Med ett **överskott** (som Sverige har) går landet med löpande överskott mot omvärlden.
- Det betyder att vi **samlar på oss fordringar och tillgångar i utlandet**: obligationer, aktier och andra tillgångar.
- Denna ansamling redovisas i den **finansiella balansen**. Viktiga poster är **direktinvesteringar** (företag som köps i utlandet) och **portföljinvesteringar** (minoritetsposter i aktier och fonder).

**Kort sagt:** Sverige exporterar mer än vi importerar, och som betalning får vi bland annat aktier i utländska företag. Över tid har detta byggt upp en positiv finansiell ställning mot omvärlden. Det är också därför primärinkomsterna (avkastningen på tillgångarna utomlands) är så stora.`,
    },
    {
      heading: "BNP och BNI",
      body: `- **BNP** mäter förädlingsvärdet som produceras **i ett land**, oavsett vem som äger kapitalet eller vilket medborgarskap arbetarna har.
- **BNI** mäter förädlingsvärdet som produceras av **ett lands produktionsfaktorer** (arbete och kapital), oavsett i vilket land produktionen sker.

$$\\text{BNI} = \\text{BNP} + \\text{NI}$$
där NI är faktorinkomster och transfereringar från utlandet, netto.

För de flesta länder är skillnaden liten, men för några är den betydande. **Irland** är det tydligaste exemplet. Där har BNP/BNI-kvoten stigit från ungefär 100 % till omkring 140 % (Världsbanken), eftersom många multinationella företag redovisar sin produktion i Irland men vinsterna går till utländska ägare.`,
    },
    {
      heading: "Valet mellan inhemska och utländska tillgångar",
      body: `Valet mellan att investera hemma och utomlands beror på **räntan** och den **förväntade framtida växelkursen**. Jämför 1 000 kr i en svensk ettårig obligation med 1 000 kr i en amerikansk:

| | År 0 | År 1 (i kronor) |
|---|---|---|
| Svensk obligation | 1 000 kr | $1000\\,(1 + i_t)$ |
| Amerikansk obligation | 1 000 kr växlas till $1000\\,E_t$ dollar | $1000\\,E_t\\,(1 + i^*_t)\\,/\\,E^e_{t+1}$ |

Om vi bortser från skillnader i risk måste den förväntade avkastningen vara **densamma**. Annars skulle inte båda obligationerna kunna säljas när marknaderna är öppna. Det ger **arbitragevillkoret**:
$$1 + i_t = E_t\\,(1 + i^*_t)\\,\\frac{1}{E^e_{t+1}}$$

### Ränteparitet
Skriv om villkoret:
$$1 + i_t = (1 + i^*_t)\\left(1 - \\frac{E^e_{t+1} - E_t}{E^e_{t+1}}\\right)$$
Om räntan och den förväntade växelkursförändringen är små (under ca 10 %) kan vi bortse från produkttermen $i^*_t \\cdot \\frac{E^e_{t+1}-E_t}{E^e_{t+1}}$. Vi kan också skriva $E_t$ i stället för $E^e_{t+1}$ i nämnaren. Då får vi villkoret för **(öppen) ränteparitet**:
$$i_t \\approx i^*_t - \\frac{E^e_{t+1} - E_t}{E_t}$$

### Tolkning
Den förväntade växelkursförändringen **kompenserar för ränteskillnaden**, så att den förväntade avkastningen blir densamma.
- Om räntan är **högre hemma** ($i_t > i^*_t$) måste kronan förväntas **försvagas** ($E$ förväntas falla).
- Om räntan är **lägre hemma** ($i_t < i^*_t$) måste kronan förväntas **stärkas** ($E$ förväntas stiga).
- **Givet den förväntade framtida växelkursen ställer dagens växelkurs in sig så att räntepariteten gäller.** Om den inhemska räntan stiger **stärks** växelkursen i dag, och tvärtom.`,
      graphs: [
        {
          type: "curves",
          title: "Ränteparitet: dagens växelkurs som funktion av den svenska räntan",
          xLabel: "Svensk ränta i (%)", yLabel: "Växelkurs i dag, E (EUR per SEK)",
          x: [0, 8], y: [0.08, 0.1],
          params: {
            i: { label: "Svensk ränta i (%)", min: 0, max: 8, step: 0.25, value: 2 },
            istar: { label: "Utländsk ränta i* (%)", min: 0, max: 8, step: 0.25, value: 2 },
            Ee: { label: "Förväntad växelkurs om ett år Eᵉ", min: 0.085, max: 0.095, step: 0.0005, value: 0.09 },
          },
          curves: [
            { label: "E (ränteparitet)", fn: "Ee*(1 + x/100)/(1 + istar/100)", ghost: true },
            { label: "i", xAt: "i", dashed: true },
          ],
          points: [{ between: ["E (ränteparitet)", "i"], label: "E" }],
          readout: "E = {E.y} EUR/SEK, dvs. {=(1+istar/100)/(Ee*(1+i/100))} SEK/EUR · förväntad förändring av E: {=100*(Ee*(1+istar/100)/(Ee*(1+i/100)) - 1)} %",
          caption: "Om den svenska räntan höjs över den utländska stiger E i dag (kronan stärks). Då förväntas kronan försvagas tillbaka mot Eᵉ, och det kompenserar placerare för den högre räntan. Ett högre förväntat Eᵉ stärker kronan redan i dag. Kurvan bygger på det exakta villkoret $E = E^e(1+i)/(1+i^*)$.",
        },
      ],
    },
    {
      heading: "Sammanfattning",
      body: `- Valet mellan produkter tillverkade utomlands och hemma styrs av den **reala växelkursen**.
- Utländska och inhemska varor är **inte perfekta substitut**, så priserna behöver inte vara desamma.
- Valet mellan inhemska och utländska finansiella tillgångar styrs, givet räntorna, av **förväntningar om förändringar i den nominella växelkursen**.
- Vi bortser från riskskillnader och annat som gör olika länders obligationer till imperfekta substitut. Därför måste den förväntade avkastningen vara densamma, vilket ger **öppen ränteparitet**.`,
    },
  ],

  keyTerms: [
    { term: "Nominell växelkurs E", def: "I kursen: utländsk valuta per enhet inhemsk valuta (t.ex. EUR/SEK)." },
    { term: "Appreciering / depreciering", def: "Den inhemska valutan stärks (E ökar) respektive försvagas (E minskar)." },
    { term: "Revalvering / devalvering", def: "Appreciering respektive depreciering under fast växelkurs." },
    { term: "Real växelkurs ε", def: "$\\varepsilon = EP/P^*$, priset på inhemska varor relativt utländska." },
    { term: "Multilateral växelkurs (KIX)", def: "Ett handelsvägt genomsnitt av bilaterala växelkurser." },
    { term: "Konkurrensutsatt sektor", def: "Branscher vars produkter kan exporteras eller importeras." },
    { term: "Betalningsbalans", def: "Bytesbalans + kapitalbalans + finansiell balans." },
    { term: "Bytesbalans", def: "Handels- och tjänstebalans + primärinkomster + sekundärinkomster (transfereringar)." },
    { term: "Finansiell balans", def: "Förändringen i fordringar och skulder mot utlandet." },
    { term: "BNI", def: "BNP + faktorinkomster och transfereringar från utlandet, netto." },
    { term: "Öppen ränteparitet", def: "$i_t \\approx i^*_t - (E^e_{t+1} - E_t)/E_t$." },
  ],

  quiz: [
    {
      q: "Vilken marknad bortser kursen från när den analyserar öppenhet?",
      options: [
        "Varumarknaden (handel med varor och tjänster)",
        "De finansiella marknaderna (aktier och obligationer)",
        "Faktormarknaderna (arbete och fysiskt kapital)",
        "Valutamarknaden (handel med olika valutor)",
      ],
      answer: 2,
      explain: "Rörligheten för arbetskraft och fysiskt kapital mellan länder ingår inte i analysen.",
      topic: "Öppenhet på olika marknader",
    },
    {
      q: "Hur kan ett lands export vara större än dess BNP?",
      options: [
        "Det är omöjligt, eftersom exporten är en del av BNP",
        "Exporten mäts brutto, BNP bara som förädlingsvärde",
        "För att exporten räknas två gånger i nationalräkenskaperna",
        "För att BNP inte inkluderar export, bara inhemsk användning",
      ],
      answer: 1,
      explain: "Det är därför exportandelar är ett dåligt mått på öppenhet.",
      topic: "Öppenhet på olika marknader",
    },
    {
      q: "Vilket mått på öppenhet förordar föreläsningen?",
      options: [
        "Exportens andel av BNP, eftersom den är lätt att mäta",
        "Andelen av produktionen som möter utländsk konkurrens",
        "Antalet frihandelsavtal som landet har undertecknat",
        "Den genomsnittliga nivån på landets importtullar",
      ],
      answer: 1,
      explain: "Export- och importandelar beror mycket på landets storlek och på mätmetoden.",
      topic: "Öppenhet på olika marknader",
    },
    {
      q: "Med kursens definition (E = utländsk valuta per krona): vad betyder det att E ökar?",
      options: [
        "Kronan deprecierar (blir svagare)",
        "Kronan apprecierar (blir starkare)",
        "Utländsk valuta blir dyrare i kronor",
        "Inflationen i Sverige stiger",
      ],
      answer: 1,
      explain: "Man får fler euro per krona, så kronan är mer värd.",
      topic: "Nominell växelkurs",
    },
    {
      q: "En euro kostar 11 kronor. Vad är E med kursens definition (EUR per SEK)? (Fyra decimaler.)",
      type: "numeric", answer: 0.0909, tolerance: 0.0001, unit: "EUR/SEK",
      explain: "$E = 1/11 \\approx 0{,}0909$ EUR/SEK.",
      topic: "Nominell växelkurs",
    },
    {
      q: "Vad kallas en försvagning av valutan under ett system med **fast** växelkurs?",
      options: ["Depreciering", "Devalvering", "Revalvering", "Appreciering"],
      answer: 1,
      explain: "Under fast kurs talar man om devalvering (försvagning) och revalvering (förstärkning).",
      topic: "Nominell växelkurs",
    },
    {
      q: "En Volvo kostar 300 000 SEK, en BMW 50 000 EUR och E = 0,10 EUR/SEK. Hur stort är relativpriset $P_{Volvo} E / P_{BMW}$?",
      type: "numeric", answer: 0.6, tolerance: 0.001,
      explain: "$300\\,000 \\times 0{,}10 / 50\\,000 = 30\\,000/50\\,000 = 0{,}6$. En Volvo kostar 0,6 BMW.",
      topic: "Valet mellan inhemska och utländska varor",
    },
    {
      q: "Hur definieras den reala växelkursen?",
      options: ["$\\varepsilon = E P^* / P$", "$\\varepsilon = E P / P^*$", "$\\varepsilon = P / P^*$", "$\\varepsilon = 1/E$"],
      answer: 1,
      explain: "Inhemska priser omräknade till utländsk valuta ($EP$), dividerat med utländska priser ($P^*$).",
      topic: "Real växelkurs",
    },
    {
      q: "Den nominella växelkursen är oförändrad, men svensk inflation är högre än utländsk. Vad händer med den reala växelkursen?",
      options: ["Den apprecierar (ε ökar)", "Den deprecierar (ε minskar)", "Den är oförändrad", "Det går inte att säga"],
      answer: 0,
      explain: "$P/P^*$ ökar, så $\\varepsilon = EP/P^*$ ökar. Svenska varor blir relativt dyrare.",
      topic: "Real växelkurs",
    },
    {
      q: "Varför rör sig nominell och real växelkurs oftast parallellt på kort sikt?",
      options: [
        "För att centralbanken bestämmer båda kurserna samtidigt",
        "För att $P/P^*$ ändras mycket långsammare än $E$",
        "För att inflationen alltid är noll på kort sikt",
        "För att de två kurserna definieras på exakt samma sätt",
      ],
      answer: 1,
      explain: "Priserna ändras långsamt, så på kort sikt drivs ε nästan helt av E.",
      topic: "Real växelkurs",
    },
    {
      q: "Vad är KIX?",
      options: [
        "Riksbankens styrränta mot bankerna",
        "En handelsvägd växelkurs för kronan",
        "Ett index för konsumentpriser",
        "Ett mått på Sveriges valutareserv",
      ],
      answer: 1,
      explain: "KIX är ett vägt genomsnitt av kronans växelkurs mot många valutor, med handelsvikter.",
      topic: "Real växelkurs",
    },
    {
      q: "Vilka delar ingår i bytesbalansen?",
      options: [
        "Bara export minus import av varor",
        "Varor, tjänster, primär- och sekundärinkomster",
        "Direktinvesteringar och portföljinvesteringar",
        "Valutareserven och kapitalöverföringar",
      ],
      answer: 1,
      explain: "Direktinvesteringar och portföljinvesteringar ingår i den finansiella balansen.",
      topic: "Betalningsbalansen",
    },
    {
      q: "Använd Sveriges betalningsbalans 2022: handel totalt 104,7, primärinkomster 241,0 och sekundärinkomster −113,7 (mdr kr). Hur stor var bytesbalansen?",
      type: "numeric", answer: 232, tolerance: 0.1, unit: "miljarder kr",
      explain: "$104{,}7 + 241{,}0 - 113{,}7 = 232{,}0$.",
      topic: "Betalningsbalansen",
    },
    {
      q: "Sverige har överskott i bytesbalansen. Vad betyder det för Sveriges tillgångar mot omvärlden?",
      options: [
        "Sverige ökar sin nettoskuld till utlandet",
        "Sverige bygger upp tillgångar i utlandet",
        "Ingenting, bytesbalansen påverkar inte tillgångar",
        "Riksbankens valutareserv måste minska lika mycket",
      ],
      answer: 1,
      explain: "Vi exporterar mer än vi importerar och får betalt i form av utländska tillgångar.",
      topic: "Finansiell balans och Sveriges ställning mot omvärlden",
    },
    {
      q: "Vad är skillnaden mellan BNP och BNI?",
      options: [
        "BNI = BNP minus avskrivningar på kapitalet",
        "BNI = BNP plus nettoinkomster från utlandet",
        "BNI mäter bara den offentliga sektorns produktion",
        "BNI = BNP minus import av varor och tjänster",
      ],
      answer: 1,
      explain: "BNP mäter produktion inom landet, och BNI inkomster till landets produktionsfaktorer.",
      topic: "BNP och BNI",
    },
    {
      q: "Varför är BNP betydligt större än BNI i Irland?",
      options: [
        "För att många irländare arbetar och betalar skatt utomlands",
        "Utlandsägda bolag redovisar produktion där; vinsten går ut",
        "För att Irland har negativ befolkningstillväxt sedan 2008",
        "För att Irland räknar EU-bidrag som en del av BNP",
      ],
      answer: 1,
      explain: "Faktorinkomsterna netto är stora och negativa, så BNI < BNP.",
      topic: "BNP och BNI",
    },
    {
      q: "Skriv öppen ränteparitet med kursens definition av E. Vilket uttryck stämmer?",
      options: [
        "$i_t \\approx i^*_t + (E^e_{t+1} - E_t)/E_t$",
        "$i_t \\approx i^*_t - (E^e_{t+1} - E_t)/E_t$",
        "$i_t = i^*_t$",
        "$i_t \\approx E_t \\, i^*_t$",
      ],
      answer: 1,
      explain: "Om kronan förväntas stärkas (Eᵉ > E) kan den svenska räntan vara lägre än den utländska.",
      topic: "Valet mellan inhemska och utländska tillgångar",
    },
    {
      q: "Den utländska räntan är 3 % och kronan förväntas **stärkas** med 1 % (E förväntas öka med 1 %). Vilken svensk ränta (%) ger ränteparitet (approximativt)?",
      type: "numeric", answer: 2, tolerance: 0.01, unit: "%",
      explain: "$i = 3 - 1 = 2$ %. Den förväntade valutavinsten kompenserar för den lägre svenska räntan.",
      topic: "Valet mellan inhemska och utländska tillgångar",
    },
    {
      q: "Riksbanken höjer räntan och den förväntade framtida växelkursen är oförändrad. Vad händer med kronan i dag enligt räntepariteten?",
      options: ["Den försvagas", "Den stärks", "Den påverkas inte", "Den blir fast"],
      answer: 1,
      explain: "Svenska tillgångar blir mer attraktiva. E stiger tills den förväntade deprecieringen tillbaka mot Eᵉ precis kompenserar för ränteskillnaden.",
      topic: "Valet mellan inhemska och utländska tillgångar",
    },
    {
      q: "Om den svenska räntan är **högre** än den utländska, vad måste gälla enligt räntepariteten?",
      options: [
        "Kronan förväntas stärkas",
        "Kronan förväntas försvagas",
        "Växelkursen förväntas vara oförändrad",
        "Arbitrage är omöjligt",
      ],
      answer: 1,
      explain: "Annars skulle alla vilja placera i kronor. Den förväntade valutaförlusten kompenserar för den högre räntan.",
      topic: "Valet mellan inhemska och utländska tillgångar",
    },
  ],
});
