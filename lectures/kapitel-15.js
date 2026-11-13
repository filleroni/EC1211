// Föreläsning 14 = bokens kapitel 15. I graferna är f(k) = √k med k = K/(AN).
registerLecture({
  id: "kapitel-15",
  number: 14,
  title: "Kapitel 15: Humankapital och teknisk utveckling",
  summary: "Humankapital, teknisk utveckling och FoU, patent, rivaliserande och exkluderbara varor, Solowmodellen med teknisk utveckling och befolkningstillväxt, balanserad tillväxt samt institutioner och tillväxt.",
  tags: ["Humankapital", "Teknisk utveckling", "FoU", "Balanserad tillväxt", "Institutioner"],

  sections: [
    {
      heading: "Humankapital",
      body: `- **Alla produktionsfaktorer som kan ackumuleras är ett slags kapital.**
- En sådan faktor är **humankapital**: de kunskaper och färdigheter som producerande individer har i sina huvuden.
- Vi kan avsätta resurser för att bygga upp mer humankapital. Precis som med fysiskt kapital ger **mer humankapital per arbetare högre produktion per arbetare**.
- Ett sätt att modellera **endogen tillväxt** är att inkludera humankapital i produktionsfunktionen och beskriva hur individer och samhället ackumulerar det genom **utbildning** och **learning-by-doing**.
- Värdet av humankapital **spiller över** mellan individer.
- Vi kommer dock att studera en modell med **exogen tillväxt**.`,
    },
    {
      heading: "Teknisk utveckling och FoU",
      body: `**Teknisk utveckling** innebär
- **mer produktion** för en given insats av kapital och arbetskraft,
- **nya och bättre produkter**.

**Forskning och utveckling (FoU)** i företag görs för att öka företagens framtida vinster, och är därmed att betrakta som en **investering**, även om resultatet är en idé och inte en produkt.

### Vad styr tillväxttakten i den tekniska utvecklingen?
1. **Produktiviteten i FoU**, dvs. hur många bra idéer man kan förvänta sig skapa i förhållande till kostnaden.
2. **Möjligheten att tjäna pengar på FoU**: kan det företag som investerar i FoU självt skörda de ekonomiska vinsterna av de nya idéerna?

Möjligheten att tjäna pengar påverkas av **patentsystemet**. Ett patent ger det företag som utvecklat en ny produkt eller process rätt att **utestänga andra** från att producera eller använda den under en begränsad tid. Det är en **balansgång mellan monopolmakt och incitament**.`,
    },
    {
      heading: "Rivaliserande och exkluderbara varor",
      body: `- **Rivaliserande varor:** om en person använder dem kan inte en annan göra det. Det gäller vanliga varor och tjänster, men också **humankapital**.
- **Icke-rivaliserande varor:** t.ex. **idéer** som Pythagoras sats, IS-LM-modellen eller kunskapen om hur man konstruerar en iPhone.

**Paul Romer** (ekonomipriset **2018**) visade hur marknadsekonomin kan producera icke-rivaliserande varor om de är **exkluderbara**, så att det går att sälja rätten att använda dem. Patentsystemet är här viktigt, men inte alltid helt nödvändigt.

| | Exkluderbar | Svår att exkludera |
|---|---|---|
| **Rivaliserande** | Vanliga varor och tjänster, humankapital (normalt lätta att göra exkluderbara) | |
| **Icke-rivaliserande** | Patenterade idéer, streamingtjänster | Grundforskning, matematiska satser |

Icke-rivaliserande varor är ofta svårare att exkludera, men inte alltid (tänk på streamingtjänster). **För idéer som inte är exkluderbara behövs universitet och andra icke-vinstdrivande institutioner** för att de ska produceras.`,
    },
    {
      heading: "Teknisk utveckling i Solowmodellen",
      body: `Nu inkluderar vi teknisk utveckling i modellen. Vi antar att den är **exogen**, dvs. vi bortser från drivkrafterna bakom FoU och ackumulationen av humankapital ovan.

$$Y = F(K, AN)$$
Ett högre **A** betyder att ett givet antal sysselsatta motsvarar mer arbetskraft i **effektivitetsenheter**. Högre A ger därmed högre produktion. AN kallas **effektiv arbetskraft**.

Som tidigare antar vi konstant skalavkastning och normaliserar, men nu genom att dela med **AN**. Definiera kapital och produktion **per effektivitetsenhet arbetskraft**:
$$k \\equiv \\frac{K}{AN}, \\qquad y \\equiv \\frac{Y}{AN}$$
$$\\frac{Y}{AN} = F\\!\\left(\\frac{K}{AN}, \\frac{AN}{AN}\\right) \\equiv f(k)$$
Med dessa variabler ser Solowmodellen ut (nästan) som tidigare.`,
    },
    {
      heading: "Balanserad tillväxt",
      body: `Utan teknisk utveckling och befolkningstillväxt nåddes ett stationärt läge där Y och K var konstanta. **Om A och N växer kan tillväxten fortsätta.** Kalla tillväxttakterna i A och N för $g_A$ och $g_N$.

Nu finns i stället en **balanspunkt där k och y är konstanta**. Det betyder att **K och Y växer lika snabbt som AN**, dvs. med $g_A + g_N$ (en produkt växer med summan av faktorernas tillväxttakter). Den kallas **balanserad tillväxt**. **Tillväxttakten i Y/N är då lika med den teknologiska tillväxttakten $g_A$.**

### Investeringsbehovet
Hur mycket måste investeras för att K ska växa i takt med AN?
- precis som tidigare **δk** för att ersätta deprecieringen,
- och nu också **$(g_A + g_N)k$**, för att K ska kunna växa i takt med AN.

Investeringsbehovet blir alltså $(\\delta + g_A + g_N)\\,k$, och k är konstant när
$$s\\,f(k^*) = (\\delta + g_A + g_N)\\,k^*$$
- Om **k < k\\*** är investeringarna större än investeringsbehovet. Då växer K snabbare än AN, så **k växer**.
- Om **k > k\\*** är investeringarna mindre än investeringsbehovet. Då växer K långsammare än AN, så **k faller**.
- **Ekonomin rör sig mot den balanserade tillväxtpunkten.**`,
      graphs: [
        {
          type: "curves",
          title: "Solowmodellen med teknisk utveckling och befolkningstillväxt",
          xLabel: "Kapital per effektivitetsenhet, k = K/(AN)", yLabel: "Produktion, investeringar",
          x: [0, 20], y: [0, 5],
          params: {
            s: { label: "Sparkvot s", min: 0.05, max: 0.5, step: 0.01, value: 0.2 },
            d: { label: "Deprecieringstakt δ", min: 0.02, max: 0.15, step: 0.005, value: 0.06 },
            gA: { label: "Teknisk tillväxt g_A", min: 0, max: 0.05, step: 0.0025, value: 0.02 },
            gN: { label: "Befolkningstillväxt g_N", min: 0, max: 0.04, step: 0.0025, value: 0.02 },
          },
          curves: [
            { label: "f(k)", fn: "sqrt(x)" },
            { label: "s·f(k)", fn: "s*sqrt(x)", ghost: true },
            { label: "(δ + g_A + g_N)·k", fn: "(d + gA + gN)*x", ghost: true },
          ],
          points: [{ between: ["s·f(k)", "(δ + g_A + g_N)·k"], label: "k*" }],
          readout: "k* = (s/(δ + g_A + g_N))² = {=pow(s/(d+gA+gN),2):2} · y* = {=s/(d+gA+gN):3} · Y och K växer med g_A + g_N = {=100*(gA+gN):2} % per år · Y/N och K/N växer med g_A = {=100*gA:2} % per år",
          caption: "Med √k blir $k^* = \\left(\\frac{s}{\\delta + g_A + g_N}\\right)^2$. Snabbare befolkningstillväxt gör investeringsbehovslinjen brantare och sänker k\\* och y\\*, men tillväxten i Y/N bestäms ändå bara av g_A.",
        },
      ],
    },
    {
      heading: "Balanserade tillväxttakter",
      body: `| Variabel | Tillväxttakt |
|---|---|
| Kapital per effektivitetsenhet, $k = K/(AN)$ | 0 |
| Produktion per effektivitetsenhet, $y = Y/(AN)$ | 0 |
| Antal sysselsatta, N | $g_N$ |
| Teknologi, A | $g_A$ |
| Kapitalstock, K | $g_A + g_N$ |
| Produktion, $Y = F(K, AN)$ | $g_A + g_N$ |
| **Produktion per sysselsatt, Y/N** | **$g_A$** |
| Kapital per sysselsatt, K/N | $g_A$ |`,
      takeaway: "I balanserad tillväxt växer BNP per sysselsatt i samma takt som tekniken, g_A.",
    },
    {
      heading: "Högre sparkvot med teknisk utveckling",
      body: `Vad händer om sparkvoten ökar från $s_0$ till $s_1$?
- **Investeringskurvan förskjuts uppåt.**
- Ekonomin rör sig mot en **ny balanserad tillväxtpunkt** med **högre kapital och produktion per effektivitetsenhet**.
- Under en **övergångsfas** växer kapitalet och produktionen **snabbare än $g_A + g_N$**.

I ett diagram med **log Y** mot tiden rör sig ekonomin från en tillväxtbana till en **högre, parallell tillväxtbana**. Lutningen (tillväxttakten) är densamma på lång sikt, men nivån är högre.`,
      graphs: [
        {
          type: "curves",
          title: "ln Y över tiden när sparkvoten höjs år 0",
          xLabel: "År", yLabel: "ln Y (index, ln Y₀ = 0)",
          x: [0, 100], y: [0, 4],
          params: {
            s0: { label: "Ursprunglig sparkvot s₀", min: 0.05, max: 0.3, step: 0.01, value: 0.1 },
            s1: { label: "Ny sparkvot s₁", min: 0.05, max: 0.4, step: 0.01, value: 0.2 },
            gA: { label: "g_A", min: 0, max: 0.04, step: 0.0025, value: 0.02 },
            gN: { label: "g_N", min: 0, max: 0.03, step: 0.0025, value: 0.01 },
          },
          curves: [
            { label: "Bana med s₀", fn: "x*log((1 + gA)*(1 + gN))", dashed: true, color: "var(--muted)", labelAt: 80 },
            { label: "Faktisk ln Y", fn: "(n => { const g = (1 + gA)*(1 + gN), dd = 0.05; let k = pow(s0/(dd + gA + gN), 2); const y0 = sqrt(k); for (let t = 0; t < n; t++) k = (s1*sqrt(k) + (1 - dd)*k)/g; return log(sqrt(k)/y0); })(floor(x)) + x*log((1 + gA)*(1 + gN))", labelAt: 45 },
            { label: "Ny bana med s₁", fn: "x*log((1 + gA)*(1 + gN)) + log(s1/s0)", dashed: true, labelAt: 8 },
          ],
          readout: "Långsiktig tillväxt i Y: {=100*((1+gA)*(1+gN) - 1):2} % per år (oberoende av s) · Nivåskillnad mellan banorna: ln(s₁/s₀) = {=log(s1/s0):3}, dvs. Y blir {=s1/s0:2} gånger högre på lång sikt",
          caption: "Den faktiska banan går från den gamla tillväxtbanan upp mot en högre, parallell bana. Under övergången är tillväxten högre än g_A + g_N. Här är δ = 0,05 och f(k) = √k, så $y^* = s/(\\delta + g_A + g_N)$ och nivån blir s₁/s₀ gånger högre.",
        },
      ],
    },
    {
      heading: "Institutioner och tillväxt",
      body: `**Institutioner** formar spelreglerna för ekonomisk (och annan) interaktion mellan människor.
- **Äganderätt** är viktig för incitamenten att investera. Föreläsningen visar sambandet mellan **skydd mot expropriering** och BNP per capita.
- **Vem har makten** i ett samhälle, de som vill bevara det gamla eller de som vill bygga nytt?

Det finns många historiska exempel på hur viktiga institutioner är:
- **Industrialiseringen** i England och senare i USA.
- **Den nya ekonomiska politiken i Kina** efter Mao Zedong.
- **Institutionella reformer i Sverige.** Föreläsningen visar tillväxttakten i Sveriges reala BNP med genomsnitt för fyra olika perioder (Penn World Table).
- **Splittringen av Korea.** Satellitbilden ”Korea by night” visar ett upplyst Sydkorea och ett nästan helt mörkt Nordkorea: samma folk, språk och historia, men olika institutioner.
- **Kolonialismen**, som ledde till mycket olika institutioner beroende på om kolonisatörerna flyttade till kolonierna eller bara exploaterade dem.

**Ekonomipriset 2024** gick till **Daron Acemoglu, Simon Johnson och James A. Robinson** ”för studier av hur institutioner formas och påverkar välstånd”.

### Sammanfattning
- Det finns en **tendens till konvergens** mellan länder, men ingen ekonomisk lag. Inkomsten per capita varierar extremt mycket mellan länder.
- Länder växer och kommer ikapp världsfronten om de har **goda ekonomiska och politiska institutioner**, när **fysiskt kapital och humankapital** växer snabbt och när den **tekniska utvecklingen**, egen eller importerad, går snabbt.
- Det finns mycket spännande forskning kvar!`,
    },
  ],

  keyTerms: [
    { term: "Humankapital", def: "Kunskaper och färdigheter hos individerna, ett slags kapital som kan ackumuleras." },
    { term: "Endogen tillväxt", def: "Tillväxt som förklaras inom modellen, t.ex. genom ackumulation av humankapital eller FoU." },
    { term: "FoU", def: "Forskning och utveckling, en investering i idéer." },
    { term: "Patent", def: "Tidsbegränsad rätt att utestänga andra från att använda en uppfinning. En balans mellan monopolmakt och incitament." },
    { term: "Rivaliserande vara", def: "Om en person använder varan kan inte en annan göra det." },
    { term: "Icke-rivaliserande vara", def: "Kan användas av många samtidigt, t.ex. idéer." },
    { term: "Exkluderbar vara", def: "Det går att hindra andra från att använda den, så att rätten att använda den kan säljas." },
    { term: "Effektiv arbetskraft", def: "AN, arbetskraft mätt i effektivitetsenheter." },
    { term: "Balanserad tillväxt", def: "k och y är konstanta, K och Y växer med $g_A + g_N$, och Y/N växer med $g_A$." },
    { term: "Investeringsbehov", def: "$(\\delta + g_A + g_N)k$, de investeringar som krävs för att k ska vara konstant." },
    { term: "Institutioner", def: "Spelreglerna för ekonomisk interaktion, t.ex. äganderätt och politisk makt." },
  ],

  quiz: [
    {
      q: "Vad är humankapital?",
      options: [
        "Antalet sysselsatta i ekonomin",
        "Individers kunskaper och färdigheter",
        "Maskiner, fabriker och byggnader",
        "Hushållens sparande på banken",
      ],
      answer: 1,
      explain: "Mer humankapital per arbetare ger, precis som fysiskt kapital, högre produktion per arbetare.",
      topic: "Humankapital",
    },
    {
      q: "Vilka två faktorer styr enligt föreläsningen tillväxttakten i den tekniska utvecklingen?",
      options: [
        "Sparkvoten och den reala räntan",
        "FoU:s produktivitet och möjligheten att tjäna på idéer",
        "Befolkningstillväxten och kapitalförslitningen",
        "Växelkursen och inflationstakten i ekonomin",
      ],
      answer: 1,
      explain: "Möjligheten att tjäna pengar påverkas bland annat av patentsystemet.",
      topic: "Teknisk utveckling och FoU",
    },
    {
      q: "Varför beskrivs patentsystemet som en balansgång?",
      options: [
        "För att patent är gratis men tar lång tid att få",
        "Det ger incitament till FoU men också monopolmakt",
        "För att patent sänker kostnaderna för forskning",
        "För att patent gäller för alltid och aldrig kan hävas",
      ],
      answer: 1,
      explain: "Utan patent får uppfinnaren svårt att tjäna pengar, men med patent kan andra inte använda idén fritt.",
      topic: "Teknisk utveckling och FoU",
    },
    {
      q: "Vilket av följande är en icke-rivaliserande vara?",
      options: ["En smörgås", "En arbetares humankapital", "Pythagoras sats", "En bil"],
      answer: 2,
      explain: "En idé kan användas av hur många som helst samtidigt.",
      topic: "Rivaliserande och exkluderbara varor",
    },
    {
      q: "Vad visade Paul Romer (ekonomipriset 2018)?",
      options: [
        "Att institutioner avgör välståndet på lång sikt",
        "Att exkluderbara idéer kan produceras på marknaden",
        "Att Phillipskurvan blir instabil vid hög inflation",
        "Att sparkvoten inte påverkar BNP per capita",
      ],
      answer: 1,
      explain: "Om det går att sälja rätten att använda en idé finns det incitament att ta fram den.",
      topic: "Rivaliserande och exkluderbara varor",
    },
    {
      q: "Hur definieras kapital per effektivitetsenhet arbetskraft?",
      options: ["$k = K/N$", "$k = K/(AN)$", "$k = AK/N$", "$k = K \\cdot A \\cdot N$"],
      answer: 1,
      explain: "AN är den effektiva arbetskraften.",
      topic: "Teknisk utveckling i Solowmodellen",
    },
    {
      q: "Vilket är investeringsbehovet för att k = K/(AN) ska vara konstant?",
      options: [
        "$\\delta k$",
        "$(\\delta + g_A + g_N)k$",
        "$(g_A + g_N)k$",
        "$(\\delta + g_A - g_N)k$",
      ],
      answer: 1,
      explain: "Deprecieringen ska ersättas, och K måste dessutom växa i takt med AN.",
      topic: "Balanserad tillväxt",
    },
    {
      q: "Hur snabbt växer produktionen per sysselsatt, Y/N, i balanserad tillväxt?",
      options: ["0", "$g_N$", "$g_A$", "$g_A + g_N$"],
      answer: 2,
      explain: "Y växer med $g_A + g_N$ och N med $g_N$, så Y/N växer med $g_A$.",
      topic: "Balanserade tillväxttakter",
    },
    {
      q: "Teknologin växer med 2 % och befolkningen med 1 % per år. Hur snabbt växer BNP (Y) i balanserad tillväxt (%)?",
      type: "numeric", answer: 3, tolerance: 0.01, unit: "%",
      explain: "$g_A + g_N = 2 + 1 = 3$ %.",
      topic: "Balanserade tillväxttakter",
    },
    {
      q: "Med $f(k) = \\sqrt k$, s = 0,2, δ = 0,06, $g_A$ = 0,02 och $g_N$ = 0,02: vad är k\\*?",
      type: "numeric", answer: 4, tolerance: 0.01,
      explain: "$k^* = (s/(\\delta + g_A + g_N))^2 = (0{,}2/0{,}1)^2 = 4$.",
      topic: "Balanserad tillväxt",
    },
    {
      q: "Sparkvoten ökar i en ekonomi med teknisk utveckling. Vad händer?",
      options: [
        "Den långsiktiga tillväxttakten ökar permanent",
        "Tillfälligt högre tillväxt, sedan en högre parallell bana",
        "Y/N faller, eftersom konsumtionen minskar",
        "Inget, eftersom tillväxten bestäms av g_A",
      ],
      answer: 1,
      explain: "Nivån blir permanent högre, men den långsiktiga tillväxttakten bestäms av $g_A + g_N$.",
      topic: "Högre sparkvot med teknisk utveckling",
    },
    {
      q: "Vad illustrerar jämförelsen mellan Nord- och Sydkorea?",
      options: [
        "Att geografi och klimat avgör välståndet",
        "Att institutioner är avgörande för tillväxt",
        "Att sparkvoten är det enda som spelar roll",
        "Att befolkningstillväxten avgör inkomsten",
      ],
      answer: 1,
      explain: "Acemoglu, Johnson och Robinson fick ekonomipriset 2024 för studier av hur institutioner formas och påverkar välstånd.",
      topic: "Institutioner och tillväxt",
    },
    {
      q: "Vilka fick ekonomipriset 2024, och för vad?",
      options: [
        "Bernanke, Diamond och Dybvig, för forskning om banker",
        "Acemoglu, Johnson och Robinson, för forskning om institutioner",
        "Paul Romer, för teorin om endogen teknisk utveckling",
        "Robert Mundell, för teorin om optimala valutaområden",
      ],
      answer: 1,
      explain: "Institutioner som äganderätt och politisk makt är centrala för tillväxten.",
      topic: "Institutioner och tillväxt",
    },
  ],
});
