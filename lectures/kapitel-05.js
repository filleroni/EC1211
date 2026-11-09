registerLecture({
  id: "kapitel-5",
  number: 5,
  title: "Kapitel 5: Räntor, banker och finanskriser",
  summary: "Nominell och real ränta, riskpremier, bankernas hävstång och sårbarhet, bankrusningar, en utvidgad IS-LM-modell med riskpremie och räntegolv samt finanskrisen 2008–2009.",
  tags: ["Realränta", "Riskpremie", "Hävstång", "Bankrusning", "Finanskris"],

  sections: [
    {
      heading: "Föreläsningens innehåll",
      body: `- Realränta och nominalränta.
- Risk och riskpremier på räntor.
- Vad gör bankerna, och vilken betydelse har det finansiella systemet?
- En utvidgad IS-LM-modell med flera räntor.
- Finanskrisen 2008–2009.`,
    },
    {
      heading: "Nominell och real ränta",
      body: `I början av 1990-talet var en normal bostadsränta **12 %**. År 2020 var den runt **2 %**. Var räntan verkligen sex gånger högre 1990? För att avgöra om en ränta är hög måste vi ta hänsyn till **inflationen**, eftersom inflation urholkar vad en krona är värd i varor och tjänster.

- **Nominalräntan $i_t$** är räntan i **kronor**: hur många fler kronor får jag om ett år för varje krona jag sparar i dag? En krona i dag motsvarar $1 + i_t$ kronor nästa år.
- **Realräntan $r_t$** är räntan i **varor och tjänster**: hur mycket mer kan jag konsumera om ett år för varje enhet konsumtion jag avstår nu? En varukorg i dag motsvarar $1 + r_t$ varukorgar om ett år.

$$1 + r_t \\equiv (1 + i_t)\\,\\frac{P_t}{P^e_{t+1}} = \\frac{1 + i_t}{1 + \\pi^e_{t+1}} \\approx 1 + i_t - \\pi^e_{t+1}$$

Approximationen $r_t \\approx i_t - \\pi^e_{t+1}$ är bra när räntan och inflationen är små.

**I Sverige** har den nominella räntan fallit mer än den reala eftersom inflationen har fallit. Om nominalräntan ligger vid sin **nedre gräns** kan realräntan ändå bli **hög** om inflationen är negativ (deflation).`,
      graphs: [
        {
          type: "curves",
          title: "Realränta som funktion av förväntad inflation",
          xLabel: "Förväntad inflation πᵉ (%)", yLabel: "Realränta r (%)",
          x: [-3, 10], y: [-10, 15],
          params: {
            i: { label: "Nominalränta i (%)", min: 0, max: 14, step: 0.25, value: 4 },
            pe: { label: "Förväntad inflation πᵉ (%)", min: -3, max: 10, step: 0.25, value: 2 },
          },
          curves: [
            { label: "r exakt", fn: "100*((1 + i/100)/(1 + x/100) - 1)" },
            { label: "r ≈ i − πᵉ", fn: "i - x", dashed: true },
            { label: "πᵉ", xAt: "pe", dashed: true },
          ],
          points: [{ between: ["r exakt", "πᵉ"], label: "R", guides: true }],
          readout: "Exakt: r = {R.y} % · approximation i − πᵉ = {=i - pe} %",
          caption: "Prova föreläsningens exempel: i = 12 % och πᵉ = 9 % (ungefär som kring 1990) ger en realränta på knappt 3 %. Med i = 2 % och πᵉ = 0 blir realräntan 2 %. Skillnaden i realränta är alltså mycket mindre än i nominalränta. Vid höga räntor skiljer sig approximationen märkbart från det exakta värdet.",
        },
      ],
    },
    {
      heading: "Risk och riskpremier",
      body: `Räntan på osäkra lån är **högre än den riskfria räntan**. Det finns två skäl.

**1. Kompensation för förväntade förluster.** Om långivaren ska få samma *förväntade* avkastning som med den riskfria räntan måste räntan vara högre i de fall då lånet faktiskt betalas tillbaka. Låt sannolikheten för betalningsinställelse vara $p$ och kalla riskpremien $x$. Då måste gälla
$$p \\cdot 0 + (1 - p)(1 + i + x) = 1 + i$$
Vi löser för $x$:
$$x = \\frac{p}{1 - p}\\,(1 + i)$$
Riskpremien ökar (förstås) med $p$.

**2. Riskaversion.** Det kan vara rimligt att långivaren kräver **mer** än detta som kompensation för att bära risk.`,
      graphs: [
        {
          type: "curves",
          title: "Riskpremien x = p/(1 − p) · (1 + i)",
          xLabel: "Sannolikhet för betalningsinställelse p (%)", yLabel: "Riskpremie x (procentenheter)",
          x: [0, 30], y: [0, 50],
          params: {
            p: { label: "Sannolikhet p (%)", min: 0, max: 30, step: 0.5, value: 5 },
            i: { label: "Riskfri ränta i (%)", min: 0, max: 10, step: 0.25, value: 2 },
          },
          curves: [
            { label: "x", fn: "100*(x/100)/(1 - x/100)*(1 + i/100)" },
            { label: "p", xAt: "p", dashed: true },
          ],
          points: [{ between: ["x", "p"], label: "X" }],
          readout: "Riskpremie x = {X.y} procentenheter, så låneräntan blir i + x = {=i + 100*(p/100)/(1-p/100)*(1+i/100)} %",
          caption: "Premien växer snabbare än linjärt: att gå från 10 % till 20 % sannolikhet för betalningsinställelse mer än fördubblar premien.",
        },
      ],
    },
    {
      heading: "Banker, hävstång och kapitaltäckning",
      body: `I praktiken går inte sparandet direkt till investeringar. Det behövs **finansiella mellanhänder** som lånar upp (eller tar emot insättningar) och lånar ut (investerar). Bankerna har också **eget kapital**.

- **Hävstångsgrad** = tillgångar / eget kapital.
- **Kapitaltäckning** = eget kapital / tillgångar (det omvända).
- **Högre hävstång ökar avkastningen på eget kapital.**

### Exempel från föreläsningen
En bank lånar ut 100. Utlåningsräntan är 5 % och inlåningsräntan 4 %.

| | Eget kapital 20, inlåning 80 | Eget kapital 10, inlåning 90 |
|---|---:|---:|
| Hävstångsgrad | 100/20 = **5** | 100/10 = **10** |
| Vinst | $0{,}05 \\cdot 100 - 0{,}04 \\cdot 80 = 1{,}8$ | $0{,}05 \\cdot 100 - 0{,}04 \\cdot 90 = 1{,}4$ |
| Avkastning på eget kapital | 1,8/20 = **9 %** | 1,4/10 = **14 %** |
| Förlust banken tål innan det egna kapitalet är slut | **20** | **10** |

### Banker och risk
Högre hävstång (lägre kapitaltäckning) ökar den förväntade avkastningen på eget kapital, **men också risken för konkurs**. Banken med hävstångsgrad 5 klarar en förlust på 20, men banken med hävstångsgrad 10 bara hälften så mycket.

Bankförluster som minskar kapitaltäckningen kan få banken att **minska sin utlåning** för att sänka konkursrisken. Den höjer då utlåningsräntan, dvs. **riskpremien x ökar**. Det minskar investeringarna och därmed efterfrågan och produktionen.`,
      graphs: [
        {
          type: "curves",
          title: "Hävstångens avvägning: avkastning mot motståndskraft",
          xLabel: "Hävstångsgrad (tillgångar / eget kapital)", yLabel: "Procent",
          x: [1, 30], y: [0, 40],
          params: {
            lev: { label: "Hävstångsgrad", min: 1, max: 30, step: 0.5, value: 5 },
            iL: { label: "Utlåningsränta (%)", min: 1, max: 10, step: 0.25, value: 5 },
            iD: { label: "Inlåningsränta (%)", min: 0, max: 8, step: 0.25, value: 4 },
          },
          curves: [
            { label: "Avkastning på eget kapital", fn: "iL*x - iD*(x - 1)" },
            { label: "Förlust som tåls (% av tillgångar)", fn: "100/x" },
            { label: "Vald hävstång", xAt: "lev", dashed: true },
          ],
          points: [
            { between: ["Avkastning på eget kapital", "Vald hävstång"], label: "ROE", guides: false },
            { between: ["Förlust som tåls (% av tillgångar)", "Vald hävstång"], label: "Buffert", guides: false },
          ],
          readout: "Hävstång {lev}: avkastning på eget kapital = {=iL*lev - iD*(lev-1)} %, kapitaltäckning = {=100/lev} %, och banken tål en förlust på {=100/lev} % av tillgångarna.",
          caption: "Avkastningen på eget kapital är $i_D + \\text{hävstång} \\times (i_L - i_D)$ och växer linjärt med hävstången. Bufferten mot förluster krymper samtidigt som $1/\\text{hävstång}$.",
        },
      ],
    },
    {
      heading: "Banker skapar pengar, och sårbarhet",
      body: `- Bankens **skulder** (insättningarna) är **likvida** och kan tas ut när som helst.
- Bankens **tillgångar** (utlåningen) är **illikvida**. Banken kan inte kräva att låntagarna betalar tillbaka med kort varsel.
- Bankerna gör alltså en samhällsviktig **löptidstransformering**: de skapar likvida medel (pengar på transaktionskonton) av illikvida tillgångar.

Men detta skapar en **inbyggd sårbarhet**:
- Rykten om att en bank kan få problem kan göra att **alla vill ta ut sina pengar på en gång**. Det klarar banken kanske inte.
- Det är svårt att sälja tillgångarna till rimliga priser när det är bråttom (**fire sales**).
- En **bankrusning** kan bli en **självuppfyllande profetia** om bankens undergång.

### Bankrusningar och finanskriser
- Bankrusningar kan sprida sig som en löpeld genom banksystemet och skapa en **finanskris**. Konsekvenserna är djupa och kan bli långdragna.
- De har inträffat många gånger i historien och kan fortfarande ske. I dag sker de snarare **via nätet** än genom att folk springer till banken, och då kan de gå ännu snabbare.
- Lösningar: **insättningsgarantier** och **kapitaltäckningskrav**.

**Ekonomipriset till Alfred Nobels minne 2022** gick till **Ben S. Bernanke, Douglas W. Diamond och Philip H. Dybvig** ”för forskning om banker och finanskriser”. Diamond och Dybvig visade i en modell varför banker är sårbara för rusningar. Bernanke visade att bankkollapser förvärrade 1930-talsdepressionen.`,
    },
    {
      heading: "En utvidgad IS-LM-modell",
      body: `Nu skiljer vi mellan flera räntor:

- Centralbanken sätter den **nominella styrräntan $i$**.
- Investeringarna beror på den **reala låneräntan inklusive riskpremie**: $i - \\pi^e + x = r + x$.

$$\\text{IS:}\\quad Y = C(Y - T) + I(Y,\\, r + x) + G$$

Under normala förhållanden kan centralbanken anpassa den nominella styrräntan efter inflationsförväntningarna, så att den i praktiken styr den **reala** styrräntan:
$$\\text{LM:}\\quad r = \\bar r$$

### En finansiell störning: riskpremien x ökar
1. x finns i IS men inte i LM. Högre riskpremie ger högre låneräntor för företagen, och investeringarna faller. Efterfrågan blir lägre vid varje styrränta, så **IS flyttas åt vänster**.
2. Jämvikten flyttas från A till A′.

**Slutsats:** produktionen minskar från Y till Y′ **trots att styrräntan inte har ändrats**.

### Ekonomisk politik och räntegolvet
En **sänkning av styrräntan** kan kompensera för den högre riskpremien, så att investeringarna, efterfrågan och produktionen inte faller. Men det **nedre räntegolvet** kan göra det omöjligt att sänka räntan tillräckligt. Det är ett särskilt stort problem när **inflationsförväntningarna är låga**:

| Räntegolv (nominellt) | Förväntad inflation | Lägsta möjliga reala styrränta |
|---:|---:|---:|
| −1 % | 2 % | −1 − 2 = **−3 %** |
| −1 % | −2 % (deflation) | −1 − (−2) = **+1 %** |

Prova i grafen: öka riskpremien och försök sedan återställa Y genom att sänka styrräntan. Om du sänker πᵉ hamnar golvet högre upp.`,
      graphs: [
        {
          type: "curves",
          title: "Utvidgad IS-LM: riskpremie och räntegolv",
          xLabel: "Produktion, Y", yLabel: "Real styrränta, r (%)",
          x: [0, 3000], y: [-5, 10],
          params: {
            xp: { label: "Riskpremie x (procentenheter)", min: 0, max: 6, step: 0.25, value: 1 },
            rbar: { label: "Real styrränta r̄ (%)", min: -5, max: 8, step: 0.25, value: 2 },
            pe: { label: "Förväntad inflation πᵉ (%)", min: -3, max: 4, step: 0.25, value: 2 },
          },
          curves: [
            { label: "IS", fn: "(500 + 400 - 0.5*300 - 0.4*x)/50 - xp", ghost: true },
            { label: "LM", fn: "max(rbar, -1 - pe)", ghost: true },
            { label: "Golv (−1 % − πᵉ)", fn: "-1 - pe", dashed: true },
          ],
          points: [{ between: ["IS", "LM"], label: "A" }],
          readout: "Y = {A.x} · faktisk real styrränta = {=max(rbar, -1 - pe)} % · nominell styrränta i = r + πᵉ = {=max(rbar, -1 - pe) + pe} % · golvet för r = {=-1 - pe} %",
          caption: "Modellen är densamma som i kapitel 4, men investeringarna beror på $r + x$. En ökning av x med 1 procentenhet minskar Y med 125. Den kan kompenseras med en lika stor sänkning av r̄, men bara så länge golvet inte nås. Om du drar r̄ under golvet stannar LM vid golvet.",
        },
      ],
    },
    {
      heading: "Finanskrisen 2008–2009",
      body: `### Bakgrund
- Krisen började med **fallande bostadspriser i USA**.
- Kreditgivningen hade tidigare blivit mycket slappare. Det fanns till och med **NINJA-lån** (*No Income, No Job, no Assets*).
- I stora delar av USA är bostadslån **utan regressrätt** (*non-recourse*). Låntagaren blir kvitt lånet om huset lämnas till banken, vilket lönar sig om huspriset har fallit under lånebeloppet. **Banken tar förlusten.**
- Förlusterna från fallande huspriser slog in i banksystemet. Samtidigt hade stora delar av lånen flyttats till finansiering **utan insättningsgarantier**.

### Krisen
- **Lehman Brothers gick i konkurs den 15 september 2008.** De flesta trodde att Federal Reserve skulle rädda banken, men Fed ville statuera ett exempel och gjorde det inte.
- Paniken spred sig och blev en **global finanskris**.
- Krisen kunde ha utvecklats till en **depression**, men **bankstöd, garantiprogram och aktiv stabiliseringspolitik** förhindrade det.

### Eurokrisen
Oron och misstroendet spred sig till euroområdet. Stater med **höga skulder** och stora underskott i utrikeshandeln (de så kallade ”PIGS”-länderna, bl.a. Portugal, Grekland och Spanien) fick svårt att rulla över sina skulder och finansiera sin import. Processen liknade en bankrusning. Problemen var särskilt stora i **Grekland**.

*Lyssningstips från föreläsningen:* Europapodden i Sveriges Radio, avsnittet om eurokrisen.`,
    },
  ],

  keyTerms: [
    { term: "Nominalränta i", def: "Räntan i kronor." },
    { term: "Realränta r", def: "Räntan i varor: $1 + r = (1 + i)/(1 + \\pi^e) $, ungefär $r \\approx i - \\pi^e$." },
    { term: "Riskpremie x", def: "Det påslag på den riskfria räntan som kompenserar för risken för betalningsinställelse (och för riskaversion)." },
    { term: "Hävstångsgrad", def: "Tillgångar / eget kapital." },
    { term: "Kapitaltäckning", def: "Eget kapital / tillgångar." },
    { term: "Löptidstransformering", def: "Bankerna finansierar illikvida lån med likvida insättningar." },
    { term: "Fire sales", def: "Försäljning av tillgångar till pressade priser när det är bråttom." },
    { term: "Bankrusning", def: "Många insättare tar ut sina pengar samtidigt, vilket kan bli en självuppfyllande profetia." },
    { term: "Insättningsgaranti", def: "Staten garanterar insättningarna, vilket minskar risken för bankrusningar." },
    { term: "Utvidgad IS", def: "$Y = C(Y-T) + I(Y, r + x) + G$." },
    { term: "Räntegolv", def: "Den nedre gräns för nominalräntan som gör att den reala styrräntan inte kan bli lägre än golvet minus πᵉ." },
    { term: "Non-recourse-lån", def: "Ett bostadslån där låntagaren kan lämna huset till banken och bli kvitt skulden." },
  ],

  quiz: [
    {
      q: "Vad mäter realräntan?",
      options: [
        "Räntan i kronor",
        "Hur mycket mer varor och tjänster man får om ett år för varje enhet konsumtion man avstår i dag",
        "Räntan efter skatt",
        "Räntan inklusive riskpremie",
      ],
      answer: 1,
      explain: "Realräntan är räntan uttryckt i varor och tjänster, dvs. justerad för (förväntad) inflation.",
      topic: "Nominell och real ränta",
    },
    {
      q: "Nominalräntan är 5 % och den förväntade inflationen 3 %. Vad är realräntan enligt approximationen?",
      type: "numeric", answer: 2, tolerance: 0.01, unit: "%",
      explain: "$r \\approx i - \\pi^e = 5 - 3 = 2$ %.",
      topic: "Nominell och real ränta",
    },
    {
      q: "Beräkna den **exakta** realräntan när $i = 12$ % och $\\pi^e = 9$ %. (Två decimaler.)",
      type: "numeric", answer: 2.75, tolerance: 0.01, unit: "%",
      explain: "$1 + r = 1{,}12/1{,}09 \\approx 1{,}0275$, så $r \\approx 2{,}75$ %. Approximationen ger 3 %.",
      topic: "Nominell och real ränta",
    },
    {
      q: "Nominalräntan ligger vid sitt golv och ekonomin får deflation. Vad händer med realräntan?",
      options: ["Den sjunker", "Den stiger", "Den är oförändrad", "Den blir alltid noll"],
      answer: 1,
      explain: "$r \\approx i - \\pi^e$. Om $\\pi^e$ blir negativ och $i$ inte kan sänkas stiger realräntan.",
      topic: "Nominell och real ränta",
    },
    {
      q: "Den riskfria räntan är 2 % och sannolikheten för betalningsinställelse är 5 %. Hur stor är den riskpremie (i procentenheter) som ger samma förväntade avkastning? (Två decimaler.)",
      type: "numeric", answer: 5.37, tolerance: 0.01, unit: "procentenheter",
      explain: "$x = \\frac{0{,}05}{0{,}95}(1{,}02) \\approx 0{,}0537$, alltså 5,37 procentenheter.",
      topic: "Risk och riskpremier",
    },
    {
      q: "Varför kan den faktiska riskpremien bli **större** än $x = \\frac{p}{1-p}(1+i)$?",
      options: [
        "För att centralbanken lägger på en avgift",
        "För att långivare är riskaverta och vill ha extra kompensation för att bära risk",
        "För att inflationen alltid är positiv",
        "För att formeln ignorerar skatter",
      ],
      answer: 1,
      explain: "Formeln ger bara samma *förväntade* avkastning som den riskfria räntan. En riskavert långivare kräver mer.",
      topic: "Risk och riskpremier",
    },
    {
      q: "En bank har tillgångar på 100 och eget kapital på 20. Hur stor är hävstångsgraden?",
      type: "numeric", answer: 5, tolerance: 0.01,
      explain: "Hävstångsgrad = tillgångar / eget kapital = 100/20 = 5. Kapitaltäckningen är 20 %.",
      topic: "Banker, hävstång och kapitaltäckning",
    },
    {
      q: "En bank lånar ut 100 till 5 % och finansierar sig med inlåning på 90 till 4 % och eget kapital på 10. Vad är avkastningen på eget kapital (%)?",
      type: "numeric", answer: 14, tolerance: 0.05, unit: "%",
      explain: "Vinst $= 0{,}05 \\cdot 100 - 0{,}04 \\cdot 90 = 1{,}4$. Avkastning $= 1{,}4/10 = 14$ %.",
      topic: "Banker, hävstång och kapitaltäckning",
    },
    {
      q: "Vad är nackdelen med en högre hävstångsgrad?",
      options: [
        "Lägre förväntad avkastning på eget kapital",
        "Mindre buffert mot förluster och därmed högre konkursrisk",
        "Högre inlåningsränta enligt lag",
        "Bankerna får inte låna ut",
      ],
      answer: 1,
      explain: "Med hävstång 10 tål banken bara förluster på 10 % av tillgångarna, jämfört med 20 % vid hävstång 5.",
      topic: "Banker, hävstång och kapitaltäckning",
    },
    {
      q: "En bank gör stora förluster så att kapitaltäckningen faller. Hur påverkar det ekonomin enligt föreläsningen?",
      options: [
        "Banken ökar utlåningen och investeringarna ökar",
        "Banken minskar utlåningen och höjer utlåningsräntan (x ökar), så investeringarna och produktionen faller",
        "Styrräntan stiger automatiskt",
        "Ingen effekt på realekonomin",
      ],
      answer: 1,
      explain: "Högre riskpremie flyttar IS åt vänster.",
      topic: "Banker, hävstång och kapitaltäckning",
    },
    {
      q: "Vad innebär bankernas löptidstransformering?",
      options: [
        "Bankerna omvandlar likvida insättningar till illikvida lån och skapar därigenom likvida medel",
        "Bankerna förlänger statens lån",
        "Bankerna växlar valuta",
        "Bankerna omvandlar aktier till obligationer",
      ],
      answer: 0,
      explain: "Insättarna kan ta ut sina pengar när som helst, men lånen kan inte kallas in snabbt. Det är samhällsnyttigt men skapar sårbarhet.",
      topic: "Banker skapar pengar, och sårbarhet",
    },
    {
      q: "Varför kan en bankrusning bli en självuppfyllande profetia?",
      options: [
        "För att centralbanken alltid stänger banker vid rykten",
        "För att om alla tar ut pengarna samtidigt måste banken sälja illikvida tillgångar till pressade priser (fire sales), och då kan den faktiskt gå omkull",
        "För att insättningsgarantin upphör",
        "För att räntan blir negativ",
      ],
      answer: 1,
      explain: "Även en i grunden sund bank kan falla om alla insättare vill ha tillbaka sina pengar på en gång.",
      topic: "Banker skapar pengar, och sårbarhet",
    },
    {
      q: "Vilka två åtgärder nämns som lösningar på problemet med bankrusningar?",
      options: [
        "Höjd styrränta och lägre skatter",
        "Insättningsgarantier och kapitaltäckningskrav",
        "Fast växelkurs och tullar",
        "Förbud mot utlåning och kontantstopp",
      ],
      answer: 1,
      explain: "Insättningsgarantier gör att insättarna inte behöver rusa till banken, och kapitaltäckningskrav gör bankerna mer motståndskraftiga.",
      topic: "Banker skapar pengar, och sårbarhet",
    },
    {
      q: "Vilka fick ekonomipriset till Alfred Nobels minne 2022 för forskning om banker och finanskriser?",
      options: [
        "Bernanke, Diamond och Dybvig",
        "Keynes, Hicks och Walras",
        "Krugman, Obstfeld och Rogoff",
        "Friedman, Phelps och Lucas",
      ],
      answer: 0,
      explain: "Ben Bernanke, Douglas Diamond och Philip Dybvig.",
      topic: "Banker skapar pengar, och sårbarhet",
    },
    {
      q: "I den utvidgade IS-LM-modellen: vilken ränta påverkar investeringarna?",
      options: [
        "Den nominella styrräntan i",
        "Den reala låneräntan inklusive riskpremie, r + x",
        "Den utländska räntan",
        "Inlåningsräntan",
      ],
      answer: 1,
      explain: "IS: $Y = C(Y-T) + I(Y, r+x) + G$, där $r = i - \\pi^e$.",
      topic: "En utvidgad IS-LM-modell",
    },
    {
      q: "Riskpremien x ökar medan centralbanken håller den reala styrräntan oförändrad. Vad händer?",
      options: [
        "LM flyttas uppåt och Y minskar",
        "IS flyttas åt vänster och Y minskar, trots att styrräntan är oförändrad",
        "IS flyttas åt höger och Y ökar",
        "Ingenting, eftersom styrräntan är oförändrad",
      ],
      answer: 1,
      explain: "Företagens låneränta $r + x$ stiger, investeringarna faller och efterfrågan blir lägre vid varje styrränta.",
      topic: "En utvidgad IS-LM-modell",
    },
    {
      q: "Räntegolvet för den nominella styrräntan är −1 % och den förväntade inflationen är 2 %. Vilken är den lägsta möjliga reala styrräntan (%)?",
      type: "numeric", answer: -3, tolerance: 0.01, unit: "%",
      explain: "$r = i - \\pi^e \\geq -1 - 2 = -3$ %.",
      topic: "En utvidgad IS-LM-modell",
    },
    {
      q: "Samma räntegolv (−1 %), men nu förväntas deflation på 2 %. Vilken är den lägsta möjliga reala styrräntan (%)?",
      type: "numeric", answer: 1, tolerance: 0.01, unit: "%",
      explain: "$-1 - (-2) = +1$ %. Med deflationsförväntningar kan centralbanken inte pressa ned realräntan under noll.",
      topic: "En utvidgad IS-LM-modell",
    },
    {
      q: "Varför ledde fallande bostadspriser i USA till stora bankförluster?",
      options: [
        "Bankerna ägde alla hus direkt",
        "Många lån saknade regressrätt (non-recourse): låntagaren kunde lämna huset till banken och bli kvitt lånet när priset föll under lånebeloppet",
        "Fed höjde räntan till 20 %",
        "Bostadslån var förbjudna",
      ],
      answer: 1,
      explain: "Då hamnade förlusterna hos bankerna. Kreditgivningen hade dessutom varit mycket slapp (NINJA-lån).",
      topic: "Finanskrisen 2008–2009",
    },
    {
      q: "Vilken händelse den 15 september 2008 brukar räknas som startskottet för den globala paniken?",
      options: [
        "Greklands statsbankrutt",
        "Lehman Brothers konkurs",
        "Att euron infördes",
        "Att Fed räddade alla banker",
      ],
      answer: 1,
      explain: "Fed räddade inte Lehman, och paniken spred sig globalt.",
      topic: "Finanskrisen 2008–2009",
    },
  ],
});
