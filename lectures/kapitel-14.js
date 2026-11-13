// Föreläsning 13 = bokens kapitel 14. I graferna är f(k) = √k (utom där α anges).
registerLecture({
  id: "kapitel-14",
  number: 13,
  title: "Kapitel 14: Sparande, kapitalbildning och produktion",
  summary: "Solowmodellen utan teknisk utveckling: f(k), investeringar sf(k) och kapitalförslitning δk, stationärt läge, effekten av högre sparkvot, gyllene regeln, pensionssystem, anpassningshastighet och öppen ekonomi.",
  tags: ["Solowmodellen", "Sparkvot", "Stationärt läge", "Gyllene regeln", "Pensioner"],

  sections: [
    {
      heading: "Produktion och kapital: ett kretslopp",
      body: `Samspelet mellan produktion och kapitalbildning i en **sluten ekonomi** kan beskrivas som ett kretslopp:

1. **Kapitalstocken** bestämmer **produktionen/inkomsten**.
2. **Produktionen/inkomsten** bestämmer **sparandet/investeringarna**.
3. **Investeringarna** bestämmer **förändringen i kapitalstocken**.
4. Förändringen i kapitalstocken ger en ny kapitalstock, och kretsloppet börjar om.

I det här kapitlet antar vi att **sysselsättningen och teknologin är konstanta**. Men Y och K ändras över tid, så vi använder nedsänkt t för att hålla reda på perioden (t.ex. år).`,
    },
    {
      heading: "1. Kapital → produktion",
      body: `Med konstant skalavkastning kan sambandet mellan produktion och kapital skrivas per sysselsatt:
$$\\frac{Y_t}{N} = F\\!\\left(\\frac{K_t}{N}, 1\\right)$$
Förenkla notationen med
$$k_t \\equiv \\frac{K_t}{N}, \\qquad y_t \\equiv \\frac{Y_t}{N}, \\qquad f(k_t) \\equiv F\\!\\left(\\frac{K_t}{N}, 1\\right)$$
Då kan vi skriva
$$y_t = f(k_t)$$`,
    },
    {
      heading: "2. Produktion → sparande och investeringar",
      body: `- Vi vet att **BNP = inkomst**.
- Anta att samhället sparar en given andel **s** av alla inkomster, så att det totala sparandet är **sY**. Resten, $(1 - s)Y$, konsumeras som privat eller offentlig konsumtion: $C + G = (1 - s)Y$. **s kallas sparkvoten.**
- Jämvikt på varumarknaden innebär att $Y = C + I + G$ i en sluten ekonomi (eller om NX = 0).
- Då gäller **$I = sY$**.

Dela med N och använd tidsindex:
$$\\frac{I_t}{N} = s\\,\\frac{Y_t}{N} = s\\,f(k_t)$$`,
    },
    {
      heading: "3. Investeringar → förändring i kapitalstocken",
      body: `Kapitalstockens storlek ändras av två orsaker:
- **investeringar** lägger till kapital,
- **depreciering** (kapitalförslitning) drar ifrån kapital.

Anta att en andel **δ** försvinner genom kapitalförslitning varje period. Då finns $(1 - \\delta)$ kvar av förra periodens kapital:
$$K_{t+1} = (1 - \\delta)K_t + I_t$$
Dela med N och använd resultatet ovan:
$$k_{t+1} = (1 - \\delta)k_t + s\\,y_t \\quad\\Rightarrow\\quad k_{t+1} - k_t = s\\,y_t - \\delta\\,k_t$$

**Förändringen i kapitalstocken beror på skillnaden mellan tillskottet från sparandet/investeringarna och deprecieringen.**`,
    },
    {
      heading: "När växer kapitalstocken? Solowmodellen",
      body: `Sammanfattning:
$$y_t = f(k_t), \\qquad k_{t+1} - k_t = s\\,f(k_t) - \\delta\\,k_t$$

- Om $s f(k_t) > \\delta k_t$ **växer** kapitalstocken.
- Om $s f(k_t) < \\delta k_t$ **faller** den.
- Om $s f(k_t) = \\delta k_t$ är den **konstant**.

Både $s f(k)$ och $\\delta k$ är ökande funktioner av k och kan ritas i samma figur, tillsammans med produktionen f(k):
- **Investeringarna $s f(k)$** ökar snabbast i början, men växer mindre och mindre när kapitalstocken ökar, på grund av avtagande marginalavkastning.
- **Deprecieringen $\\delta k$** är linjär i k.

### Stationärt läge
- Om k är **tillräckligt högt** är $s f(k) < \\delta k$, och kapitalet och produktionen per sysselsatt **faller**.
- Om k är **tillräckligt lågt** är $s f(k) > \\delta k$, och kapitalet och produktionen per sysselsatt **ökar**.
- Vid **k\\***, där $s f(k^*) = \\delta k^*$, är kapitalstocken och produktionen **konstanta**. Det är ett **stationärt läge** (*steady state*).
- Om k avviker från k\\* rör sig k mot k\\* och y mot y\\*.`,
      graphs: [
        {
          type: "curves",
          title: "Solowmodellen: f(k) = √k",
          xLabel: "Kapital per sysselsatt, k", yLabel: "Produktion, investeringar, depreciering",
          x: [0, 30], y: [0, 6],
          params: {
            s: { label: "Sparkvot s", min: 0.05, max: 0.5, step: 0.01, value: 0.2 },
            d: { label: "Deprecieringstakt δ", min: 0.05, max: 0.2, step: 0.005, value: 0.1 },
            k0: { label: "Dagens kapital k (för att se om k växer)", min: 0.5, max: 30, step: 0.5, value: 2 },
          },
          curves: [
            { label: "f(k)", fn: "sqrt(x)" },
            { label: "s·f(k)", fn: "s*sqrt(x)", ghost: true },
            { label: "δ·k", fn: "d*x", ghost: true },
            { label: "k", xAt: "k0", dashed: true, color: "var(--muted)" },
          ],
          points: [{ between: ["s·f(k)", "δ·k"], label: "k*" }],
          readout: "k* = (s/δ)² = {=pow(s/d,2)} · y* = s/δ = {=s/d} · c* = (1 − s)·y* = {=(1-s)*s/d} · Vid k = {k0}: förändringen i k är s√k − δk = {=s*sqrt(k0) - d*k0:3} (positivt = k växer, negativt = k krymper)",
          caption: "Avståndet mellan f(k) och s·f(k) är konsumtionen. Höj s: s·f(k) roterar uppåt och k\\* och y\\* ökar. Höj δ: δ·k blir brantare och k\\* och y\\* minskar.",
        },
      ],
    },
    {
      heading: "Dynamiken: från k₀ till k*",
      body: `Dynamiken kan visas i en figur med $k_t$ på x-axeln och $k_{t+1}$ på y-axeln. Längs **45°-linjen** är $k_t = k_{t+1}$. Kurvan
$$k_{t+1} = s\\,f(k_t) + (1 - \\delta)\\,k_t$$
ger nästa periods kapitalstock, givet dagens.

Vi startar i period 0 med kapitalstocken $k_0$ och läser av $k_1$ på y-axeln. Sedan för vi över $k_1$ till x-axeln för att se vad $k_2$ blir, och så vidare. **För varje period kommer kapitalstocken närmare balanspunkten k\\***, det stationära läget.`,
      graphs: [
        {
          type: "curves",
          title: "Kapitalstockens dynamik: k_{t+1} mot k_t",
          xLabel: "k_t", yLabel: "k_{t+1}",
          x: [0, 8], y: [0, 8],
          params: {
            s: { label: "Sparkvot s", min: 0.05, max: 0.4, step: 0.01, value: 0.2 },
            d: { label: "Deprecieringstakt δ", min: 0.05, max: 0.2, step: 0.005, value: 0.1 },
            k0: { label: "Startkapital k₀", min: 0.2, max: 8, step: 0.1, value: 1 },
          },
          curves: [
            { label: "k_{t+1} = s√k_t + (1−δ)k_t", fn: "s*sqrt(x) + (1 - d)*x" },
            { label: "45°", fn: "x", dashed: true, color: "var(--muted)" },
          ],
          points: [{ between: ["k_{t+1} = s√k_t + (1−δ)k_t", "45°"], label: "k*" }],
          readout: "k₀ = {k0} → k₁ = {=s*sqrt(k0) + (1-d)*k0:3} → k₂ = {=(k => s*sqrt(k) + (1-d)*k)(s*sqrt(k0) + (1-d)*k0):3} → k₃ = {=(k => s*sqrt(k) + (1-d)*k)((k => s*sqrt(k) + (1-d)*k)(s*sqrt(k0) + (1-d)*k0)):3} … mot k* = {=pow(s/d,2):3}",
          caption: "Kurvan ligger över 45°-linjen till vänster om k\\* (k växer) och under den till höger (k krymper). Därför rör sig ekonomin alltid mot k\\*.",
        },
      ],
    },
    {
      heading: "En ökning av sparkvoten",
      body: `Anta att ekonomin är i stationärt läge för sparkvoten $s_b$, och att sparkvoten **ökar till $s_a$**:
- **Investeringskurvan $s f(k)$ förskjuts uppåt** (roterar motsols).
- Ekonomin rör sig mot ett **nytt stationärt läge med högre kapitalstock och högre produktion**.

**Över tiden:**
- En ökning av sparkvoten leder till en **period av tillväxt**.
- Tillväxten **avtar** tills den nya, högre stationära produktionen har nåtts.

### Tre viktiga observationer
1. **På väldigt lång sikt har sparkvoten ingen betydelse för tillväxten.** Tillväxten blir alltid noll på lång sikt när vi bortser från befolkningstillväxt och teknisk utveckling.
2. Men **en högre sparkvot ger permanent högre BNP per capita.** Allt annat lika har länder med högre sparkvot högre BNP per capita.
3. **En ökning av sparkvoten ger en tillfällig period av högre tillväxt**, tills det nya stationära läget har nåtts.`,
    },
    {
      heading: "Hur mycket påverkar sparkvoten? Och hur snabbt?",
      body: `För att diskutera storleken på effekterna antar vi $f(k_t) = \\sqrt{k_t}$. I stationärt läge är investeringarna lika med deprecieringen:
$$s\\sqrt{k^*} = \\delta k^* \\;\\Rightarrow\\; s^2 k^* = \\delta^2 (k^*)^2 \\;\\Rightarrow\\; k^* = \\left(\\frac{s}{\\delta}\\right)^2$$
Insatt i produktionsfunktionen:
$$y^* = \\sqrt{k^*} = \\frac{s}{\\delta}$$

**Om sparkvoten fördubblas** (t.ex. från 10 till 20 %) **fördubblas produktionen**, medan **kapitalstocken fyrdubblas** (k\\* är proportionell mot s²).

### Anpassningshastigheten
Starta i ett stationärt läge med s = 0,1 och δ = 0,1 per år, så att $k_0 = 1$ och $y_0 = 1$. Sparkvoten ökar till 0,2:
- Investeringarna i period 0 är $0{,}2 y_0 = 0{,}2$ och deprecieringen $0{,}1 k_0 = 0{,}1$.
- Kapitalstocken ökar från 1 till **$k_1 = 1{,}1$**, och därmed blir **$y_1 = \\sqrt{1{,}1} \\approx 1{,}05$**.
- Om vi fortsätter på samma sätt får vi en sekvens för produktionen (lätt att göra i t.ex. Excel, se Athena). **Anpassningen går ganska långsamt: tillväxten är positiv under flera decennier.**

### Kan skillnader i s förklara skillnader mellan länder?
Sparkvoten är typiskt **lägre i fattiga länder**: rika länder kan ha sparkvoter uppemot 0,3, medan riktigt fattiga länder har ned mot 0,05. En sex gånger högre sparkvot ger enligt modellen **sex gånger högre stationär produktion**. Men kvoten mellan de rikaste och de fattigaste ländernas BNP är snarare **40**. **Sparkvoten förklarar alltså en hel del, men långt ifrån allt.** Vi återkommer till detta i kapitel 15.`,
      graphs: [
        {
          type: "curves",
          title: "Produktion per sysselsatt efter en ökning av sparkvoten",
          xLabel: "År efter ökningen", yLabel: "Produktion per sysselsatt, y",
          x: [0, 80], y: [0, 4],
          params: {
            s0: { label: "Ursprunglig sparkvot", min: 0.05, max: 0.3, step: 0.01, value: 0.1 },
            s1: { label: "Ny sparkvot", min: 0.05, max: 0.4, step: 0.01, value: 0.2 },
            d: { label: "Deprecieringstakt δ", min: 0.05, max: 0.2, step: 0.005, value: 0.1 },
          },
          curves: [
            { label: "y_t", fn: "(n => { let k = pow(s0/d, 2); for (let t = 0; t < n; t++) k = s1*sqrt(k) + (1 - d)*k; return sqrt(k); })(floor(x))" },
            { label: "y* gammal", fn: "s0/d", dashed: true, color: "var(--muted)" },
            { label: "y* ny", fn: "s1/d", dashed: true },
          ],
          readout: "y₀ = {=s0/d:3} → y₁ = {=sqrt(s1*sqrt(pow(s0/d,2)) + (1-d)*pow(s0/d,2)):3} (tillväxt år 1: {=100*(sqrt(s1*(s0/d) + (1-d)*pow(s0/d,2))/(s0/d) - 1):2} %) · nytt y* = {=s1/d:3}",
          caption: "Med s = 0,1 → 0,2 och δ = 0,1 går y från 1 mot 2. Efter ett år är y ≈ 1,05 (som på bilden). Tillväxten är högst i början och avtar sedan. Det tar flera decennier att komma nära det nya stationära läget.",
        },
      ],
    },
    {
      heading: "Sparande och konsumtion: gyllene regeln",
      body: `Hur påverkas **konsumtionen** i det stationära läget av sparkvoten? En högre sparkvot ger alltid högre stationär BNP, men gäller detsamma för konsumtionen?

**Nej:**
- Om **s = 0** blir den stationära konsumtionen 0, eftersom den stationära produktionen blir 0.
- Om **s = 1** blir konsumtionen också 0, eftersom all produktion sparas.
- Däremellan är sambandet **först ökande och sedan minskande**.
- **Maximal konsumtion** nås vid **gyllene regelns sparkvot, $s_G$**.

### Grafiskt
Konsumtionen är produktionen minus investeringarna, dvs. **avståndet mellan f(k) och s·f(k)** i det stationära läget. Den stationära konsumtionen **ökar (minskar)** när sparandet ökar om lutningen på f(k) är **större (mindre)** än lutningen på deprecieringskurvan, dvs. δ. **Den stationära konsumtionen maximeras om s väljs så att f′(k) = δ i det stationära läget.**

Med $f(k) = k^\\alpha$ ger detta $s_G = \\alpha$. Med $f(k) = \\sqrt k$ (α = 0,5) är alltså $s_G = 0{,}5$.`,
      graphs: [
        {
          type: "curves",
          title: "Stationär konsumtion som funktion av sparkvoten, f(k) = k^α",
          xLabel: "Sparkvot, s", yLabel: "Stationär konsumtion per sysselsatt, c*",
          x: [0, 1], y: [0, 3],
          params: {
            s: { label: "Sparkvot s", min: 0.01, max: 0.99, step: 0.01, value: 0.2 },
            a: { label: "α (kapitalets andel)", min: 0.2, max: 0.5, step: 0.01, value: 0.5 },
            d: { label: "δ", min: 0.05, max: 0.2, step: 0.005, value: 0.1 },
          },
          curves: [
            { label: "c*(s)", fn: "(1 - x)*pow(x/d, a/(1 - a))" },
            { label: "s", xAt: "s", dashed: true },
            { label: "s_G = α", xAt: "a", dashed: true, color: "var(--c3)" },
          ],
          points: [{ between: ["c*(s)", "s"], label: "C" }],
          readout: "Vid s = {s}: y* = {=pow(s/d, a/(1-a)):3}, c* = {C.y:3}. Gyllene regeln: s_G = α = {a} ger maximal c* = {=(1-a)*pow(a/d, a/(1-a)):3}",
          caption: "I stationärt läge är $y^* = (s/\\delta)^{\\alpha/(1-\\alpha)}$ och $c^* = (1 - s)\\,y^*$. Konsumtionen är högst vid $s_G = \\alpha$. Om s < s_G ökar en högre sparkvot den stationära konsumtionen. Om s > s_G minskar den.",
        },
      ],
    },
    {
      heading: "Pensioner och sparande",
      body: `- Det vanligaste sättet att finansiera ett pensionssystem är ett **fördelningssystem** (*pay-as-you-go*). De arbetandes pensionsavgifter **investeras inte**, utan går direkt till att betala pensionerna för de nuvarande pensionärerna. Pensionssparandet är därmed **inget aggregerat sparande**, utan går till pensionärernas konsumtion.
- Det svenska obligatoriska pensionssystemet är i huvudsak konstruerat på detta sätt (utom **PPM-pensionen**), och det gäller även det amerikanska.
- Alternativet är ett **fonderat system** (*fully funded*). Avgifterna fonderas, dvs. investeras, och bidrar därmed till kapitalackumulationen.

### Ett fördelningssystem införs
- Att införa ett fördelningssystem är detsamma som att **s minskar** till s′. I den gamla jämvikten räcker investeringarna inte längre till för att ersätta deprecieringen.
- **Kapitalstocken och BNP per sysselsatt faller**, och den nya jämvikten uppstår vid k′ med **y′ < y**.
- Den **stationära konsumtionen minskar också**, om inte $s > s_G$ från början.
- **Den generation som är pensionärer när systemet införs får pensioner utan att ha betalat för dem.**
- En **återgång till ett fonderat system** kräver att de nuvarande löntagarna betalar både sina egna och de nuvarande pensionärernas pensioner.`,
    },
    {
      heading: "Öppen ekonomi: kapitalflöden",
      body: `I en sluten ekonomi innebär varumarknadsjämvikt att I = S. **I en öppen ekonomi gäller inte det längre.**

Anta att ekonomin öppnas och nu kan **låna och investera till räntan r\\*** (den reala räntan inklusive eventuella förväntade förändringar i den reala växelkursen). En investerare väljer mellan att investera en enhet kapital hemma och att investera utomlands till r\\*.

- Om investeringen sker hemma ökar produktionen från $f(k^*)$ till ungefär $f(k^* + 1)$. Ökningen kallas **marginalprodukten av kapital, MPK(k\\*)**.
- En andel δ av investeringen deprecierar, vilket är en kostnad.
- **Avkastningen på investeringen hemma är MPK(k\\*) − δ**, och den ska jämföras med r\\*.

MPK(k) är lika med **lutningen på f(k)** (derivatan), och den **avtar med k**. Med $f(k) = \\sqrt k$ är $MPK(k) = \\frac{1}{2\\sqrt k}$.

- Om **MPK − δ > r\\*** lönar det sig att **låna utomlands för att investera hemma**. Kapital flödar in **tills MPK − δ = r\\***.
- Det sker **oberoende av sparkvoten s**, genom ett **bytesbalansunderskott** om I > sY.
- Inflödet ger en **mycket snabbare anpassning** än om kapitalet ska ackumuleras genom inhemskt sparande.
- Om MPK från början är lägre minskar i stället kapitalstocken.

**Exempel:** δ = 0,15 och r\\* = 0,05. Kapital flödar in tills $MPK(k) = 0{,}20$, dvs. $\\frac{1}{2\\sqrt k} = 0{,}2 \\Rightarrow \\sqrt k = 2{,}5 \\Rightarrow k = 6{,}25$.`,
      graphs: [
        {
          type: "curves",
          title: "Avkastning på kapital hemma jämfört med omvärldens ränta",
          xLabel: "Kapital per sysselsatt, k", yLabel: "Avkastning",
          x: [0, 10], y: [0, 0.5],
          params: {
            d: { label: "Deprecieringstakt δ", min: 0.05, max: 0.25, step: 0.01, value: 0.15 },
            rs: { label: "Omvärldens realränta r*", min: 0, max: 0.15, step: 0.005, value: 0.05 },
          },
          curves: [
            { label: "MPK(k) − δ", fn: "1/(2*sqrt(x)) - d", ghost: true },
            { label: "r*", fn: "rs", ghost: true },
          ],
          points: [{ between: ["MPK(k) − δ", "r*"], label: "k" }],
          readout: "Kapital flödar in (eller ut) tills k = 1/(4(r* + δ)²) = {=1/(4*pow(rs + d, 2)):3}",
          caption: "Till vänster om skärningspunkten är avkastningen hemma högre än r\\*, så kapital flödar in. Till höger flödar kapital ut.",
        },
      ],
    },
    {
      heading: "En mer realistisk produktionsfunktion",
      body: `Hittills har vi använt $F(K, N) = \\sqrt K \\sqrt N$, vilket gav $f(k) = \\sqrt k$. Notera att $\\sqrt K \\sqrt N = K^{0{,}5} N^{0{,}5}$, och att $\\sqrt k = k^{0{,}5}$.

- **Summan av exponenterna** (0,5 + 0,5) är 1. Det krävs för att funktionen ska ha **konstant skalavkastning**.
- Vi kan generalisera till
$$F(K, N) = K^{\\alpha} N^{1-\\alpha}, \\qquad f(k) = k^{\\alpha}$$
- Om löner och kapitalersättningar sätts på konkurrensmarknader, och därmed ges av respektive marginalprodukt, går **andelen α av produktionen till kapitalet** och **andelen 1 − α till arbetskraften**.
- I data är dessa andelar förvånansvärt stabila, på ungefär **en tredjedel respektive två tredjedelar**.
- En realistisk produktionsfunktion är därför
$$F(K, N) = K^{1/3} N^{2/3}$$`,
    },
  ],

  keyTerms: [
    { term: "Kapital per sysselsatt (k)", def: "$k_t = K_t/N$." },
    { term: "Produktion per sysselsatt (y)", def: "$y_t = Y_t/N = f(k_t)$." },
    { term: "Sparkvot (s)", def: "Andelen av inkomsten som sparas. I en sluten ekonomi är $I = sY$." },
    { term: "Depreciering (δ)", def: "Den andel av kapitalet som förslits varje period." },
    { term: "Kapitalackumulation", def: "$k_{t+1} - k_t = s f(k_t) - \\delta k_t$." },
    { term: "Stationärt läge (steady state)", def: "$s f(k^*) = \\delta k^*$, där k och y är konstanta." },
    { term: "Gyllene regelns sparkvot", def: "$s_G$, den sparkvot som maximerar den stationära konsumtionen (där $f'(k) = \\delta$)." },
    { term: "Fördelningssystem", def: "Pensionsavgifterna betalar direkt de nuvarande pensionerna (pay-as-you-go), vilket minskar s." },
    { term: "Fonderat system", def: "Pensionsavgifterna investeras och bidrar till kapitalackumulationen." },
    { term: "Marginalprodukt av kapital (MPK)", def: "Lutningen på f(k), produktionsökningen av en extra enhet kapital." },
    { term: "Cobb–Douglas-produktionsfunktion", def: "$F(K, N) = K^\\alpha N^{1-\\alpha}$, där α är kapitalets andel (ca 1/3)." },
  ],

  quiz: [
    {
      q: "I en sluten ekonomi i Solowmodellen sparas andelen s av inkomsten. Vad gäller för investeringarna?",
      options: ["$I = (1 - s)Y$", "$I = sY$", "$I = \\delta K$", "$I = C + G$"],
      answer: 1,
      explain: "Jämvikt på varumarknaden, $Y = C + I + G$ med $C + G = (1-s)Y$, ger $I = sY$.",
      topic: "2. Produktion → sparande och investeringar",
    },
    {
      q: "Hur förändras kapitalstocken per sysselsatt från ett år till nästa?",
      options: [
        "$k_{t+1} - k_t = s f(k_t) + \\delta k_t$",
        "$k_{t+1} - k_t = s f(k_t) - \\delta k_t$",
        "$k_{t+1} - k_t = f(k_t) - s k_t$",
        "$k_{t+1} - k_t = \\delta f(k_t)$",
      ],
      answer: 1,
      explain: "Investeringarna lägger till kapital och deprecieringen drar ifrån.",
      topic: "3. Investeringar → förändring i kapitalstocken",
    },
    {
      q: "Vad gäller i det stationära läget k\\*?",
      options: ["$s f(k^*) > \\delta k^*$", "$s f(k^*) = \\delta k^*$", "$f(k^*) = \\delta$", "$k^* = s$"],
      answer: 1,
      explain: "Investeringarna ersätter precis deprecieringen, så k är konstant.",
      topic: "När växer kapitalstocken? Solowmodellen",
    },
    {
      q: "Med $f(k) = \\sqrt k$, s = 0,3 och δ = 0,1: vad är det stationära kapitalet k\\*?",
      type: "numeric", answer: 9, tolerance: 0.01,
      explain: "$k^* = (s/\\delta)^2 = 3^2 = 9$.",
      topic: "Hur mycket påverkar sparkvoten? Och hur snabbt?",
    },
    {
      q: "Med $f(k) = \\sqrt k$, s = 0,3 och δ = 0,1: vad är den stationära produktionen y\\*?",
      type: "numeric", answer: 3, tolerance: 0.01,
      explain: "$y^* = s/\\delta = 3$.",
      topic: "Hur mycket påverkar sparkvoten? Och hur snabbt?",
    },
    {
      q: "Med $f(k) = \\sqrt k$: om sparkvoten fördubblas, vad händer i det nya stationära läget?",
      options: [
        "y\\* och k\\* fördubblas",
        "y\\* fördubblas och k\\* fyrdubblas",
        "y\\* fyrdubblas och k\\* fördubblas",
        "Inget, eftersom tillväxten är noll",
      ],
      answer: 1,
      explain: "$y^* = s/\\delta$ och $k^* = (s/\\delta)^2$.",
      topic: "Hur mycket påverkar sparkvoten? Och hur snabbt?",
    },
    {
      q: "Startläge: s = δ = 0,1 och k₀ = 1. Sparkvoten ökar till 0,2. Hur stort blir k₁?",
      type: "numeric", answer: 1.1, tolerance: 0.001,
      explain: "$k_1 = k_0 + s\\sqrt{k_0} - \\delta k_0 = 1 + 0{,}2 - 0{,}1 = 1{,}1$.",
      topic: "Hur mycket påverkar sparkvoten? Och hur snabbt?",
    },
    {
      q: "Vad säger Solowmodellen (utan teknisk utveckling och befolkningstillväxt) om sparkvotens effekt på lång sikt?",
      options: [
        "En högre sparkvot ger permanent högre tillväxt",
        "Högre nivå på BNP per capita, men ingen långsiktig tillväxt",
        "En högre sparkvot sänker BNP per capita",
        "Sparkvoten har ingen effekt alls, varken på nivå eller tillväxt",
      ],
      answer: 1,
      explain: "En ökning ger också en tillfällig period av högre tillväxt.",
      topic: "En ökning av sparkvoten",
    },
    {
      q: "Varför är den stationära konsumtionen noll både vid s = 0 och vid s = 1?",
      options: [
        "Vid s = 0 är y = 0, vid s = 1 sparas allt",
        "För att δ = 0 i båda fallen",
        "För att f(k) är linjär i båda fallen",
        "Det stämmer inte, c\\* är max vid s = 1",
      ],
      answer: 0,
      explain: "Däremellan är sambandet först ökande och sedan minskande, med maximum vid gyllene regeln.",
      topic: "Sparande och konsumtion: gyllene regeln",
    },
    {
      q: "Vilket villkor gäller vid gyllene regelns sparkvot?",
      options: [
        "$f'(k^*) = \\delta$",
        "$s = \\delta$",
        "$f(k^*) = \\delta k^*$",
        "$s f'(k^*) = 1$",
      ],
      answer: 0,
      explain: "Lutningen på produktionsfunktionen är då lika med lutningen på deprecieringslinjen.",
      topic: "Sparande och konsumtion: gyllene regeln",
    },
    {
      q: "Ett fördelningssystem för pensioner införs. Vad händer enligt Solowmodellen?",
      options: [
        "s ökar, och k och y ökar mot ett högre stationärt läge",
        "s minskar, och k och y faller mot ett lägre läge",
        "Inget, eftersom pensioner inte påverkar sparandet",
        "Konsumtionen ökar alltid i det nya stationära läget",
      ],
      answer: 1,
      explain: "Avgifterna investeras inte. Den första pensionärsgenerationen får pensioner utan att ha betalat för dem.",
      topic: "Pensioner och sparande",
    },
    {
      q: "Rika länder har sparkvoter kring 0,3 och fattiga kring 0,05. Hur mycket högre blir den stationära produktionen enligt modellen med $f = \\sqrt k$, och hur stor är den faktiska skillnaden?",
      options: [
        "36 gånger enligt modellen, och faktiskt 6 gånger",
        "6 gånger enligt modellen, men faktiskt ca 40 gånger",
        "40 gånger både enligt modellen och i verkligheten",
        "2 gånger enligt modellen, och faktiskt 6 gånger",
      ],
      answer: 1,
      explain: "$y^* = s/\\delta$, så kvoten blir $0{,}3/0{,}05 = 6$. Sparkvoten förklarar en hel del, men långt ifrån allt.",
      topic: "Hur mycket påverkar sparkvoten? Och hur snabbt?",
    },
    {
      q: "I en öppen ekonomi är δ = 0,15, r\\* = 0,05 och $f(k) = \\sqrt k$ (så $MPK = 1/(2\\sqrt k)$). Till vilket k flödar kapitalet in?",
      type: "numeric", answer: 6.25, tolerance: 0.01,
      explain: "$MPK - \\delta = r^*$ ger $1/(2\\sqrt k) = 0{,}2$, alltså $\\sqrt k = 2{,}5$ och $k = 6{,}25$.",
      topic: "Öppen ekonomi: kapitalflöden",
    },
    {
      q: "Vad gäller för produktionsfunktionen $F(K, N) = K^\\alpha N^{1-\\alpha}$ på konkurrensmarknader?",
      options: [
        "Kapitalet får α av produktionen, arbetet 1 − α",
        "Kapitalet får hela produktionen som vinst",
        "Arbetet får andelen α och kapitalet 1 − α",
        "Funktionen har ökande skalavkastning",
      ],
      answer: 0,
      explain: "Exponenterna summerar till 1, vilket ger konstant skalavkastning.",
      topic: "En mer realistisk produktionsfunktion",
    },
  ],
});
