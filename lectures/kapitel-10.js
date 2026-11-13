// Phillipskurvan i graferna (i procentenheter): π = πᵉ + (m + z) − α·u, u_n = (m + z)/α
registerLecture({
  id: "kapitel-10",
  number: 10,
  title: "Kapitel 10: Phillipskurvan, jämviktsarbetslösheten och inflationen",
  summary: "Phillipskurvan härledd från löne- och prissättningen, version 1.0 och den förväntningsutvidgade 2.0, förankrade förväntningar i dag, jämviktsarbetslösheten u_n = (m + z)/α samt Friedman, Phelps och doktrinhistoria.",
  tags: ["Phillipskurvan", "Inflationsförväntningar", "Jämviktsarbetslöshet", "Friedman–Phelps"],

  sections: [
    {
      heading: "Phillipskurvan: arbetslöshet och inflation",
      body: `Kom ihåg figuren från kapitel 1, med inflation och arbetslöshet i Sverige 1970–2021: **när arbetslösheten är låg (hög) tenderar inflationen att vara hög (låg)**.

I det här kapitlet ska vi
- härleda **Phillipskurvan**, ett samband från arbetslöshet till inflation givet inflationsförväntningarna, från **pris- och lönesambanden** i kapitel 9,
- se **hur sambandet har förändrats över tid**.`,
    },
    {
      heading: "Från priser till inflation",
      body: `Kom ihåg lönebildningssambandet och prissättningssambandet från kapitel 9:
$$W = P^e \\cdot F(u, z), \\qquad P = (1 + m) \\cdot W$$
Ersätt W i den andra ekvationen med uttrycket från den första:
$$P = (1 + m) \\cdot P^e \\cdot F(u, z)$$
Vi specificerar nu en **linjär lönebildningsfunktion**:
$$F(u, z) = 1 - \\alpha u + z$$
och får
$$P = (1 + m) \\cdot P^e \\cdot (1 - \\alpha u + z)$$

Prisnivån P beror **negativt på arbetslösheten u**, givet prispåslaget m, prisförväntningarna Pᵉ och andra variabler som påverkar löntagarnas relativa förhandlingsstyrka.

### Från prisnivå till inflation
Sambandet kan skrivas om till ett samband från arbetslöshet till **inflation** (se appendix i boken):
$$\\pi = \\pi^e + m + z - \\alpha u$$

1. Inflationen beror **ett-till-ett på förväntad inflation**. Det kommer från att den faktiska prisnivån är proportionell mot den förväntade.
2. **Högre prispåslag** och andra faktorer som ökar löntagarnas relativa förhandlingsstyrka **ökar inflationen**.
3. **Högre arbetslöshet minskar inflationen**, med en känslighet som beskrivs av $\\alpha > 0$.`,
      graphs: [
        {
          type: "curves",
          title: "Phillipskurvan: π = πᵉ + (m + z) − α·u",
          xLabel: "Arbetslöshet, u (%)", yLabel: "Inflation, π (%)",
          x: [0, 14], y: [-6, 12],
          params: {
            u: { label: "Arbetslöshet u (%)", min: 0, max: 14, step: 0.1, value: 6 },
            pe: { label: "Förväntad inflation πᵉ (%)", min: -2, max: 8, step: 0.25, value: 2 },
            mz: { label: "m + z (procentenheter)", min: 2, max: 10, step: 0.25, value: 6 },
            alpha: { label: "Känslighet α", min: 0.3, max: 2, step: 0.05, value: 1 },
          },
          curves: [
            { label: "PC", fn: "pe + mz - alpha*x", ghost: true },
            { label: "πᵉ", fn: "pe", dashed: true, color: "var(--muted)" },
            { label: "u", xAt: "u", dashed: true },
          ],
          points: [
            { between: ["PC", "u"], label: "A" },
            { between: ["PC", "πᵉ"], label: "u_n", guides: "v" },
          ],
          readout: "Inflation π = {A.y} % · jämviktsarbetslöshet u_n = (m + z)/α = {=mz/alpha} % · π − πᵉ = {=-alpha*(u - mz/alpha)} procentenheter",
          caption: "Där PC skär linjen πᵉ blir inflationen som förväntat. Det sker vid $u_n = (m+z)/\\alpha$. Högre πᵉ flyttar hela kurvan uppåt. Högre m + z flyttar den uppåt och ökar u_n. Högre α gör den brantare och minskar u_n.",
        },
      ],
    },
    {
      heading: "Phillipskurvan version 1.0",
      body: `Använd nedsänkt t för att markera tidsperiod och anta att $\\pi^e_t = 0$:
$$\\pi_t = m + z - \\alpha u_t$$

Detta är det samband som **Phillips, Solow och Samuelson** fann för England och USA: **Phillipskurvan**.

### Pris- och lönespiral
- $\\pi^e_t = 0$ betyder att den **förväntade prisnivån är lika med förra periodens pris**.
- Så länge arbetslösheten är **lägre än jämviktsnivån $u_n$** blir priserna varje år högre än de förväntade, dvs. högre än förra årets. Lönerna sätts varje period högre än under förra perioden.
- Vi får en **stadig pris- och löneuppgång**. Priserna stiger kontinuerligt, dvs. inflationen är **positiv men inte ökande**.

### Phillipskurvan i data
Den negativa relationen mellan arbetslöshet och inflation var **mycket tydlig under 1960-talet** i USA och Europa (föreläsningen visar USA 1961–69). Därefter är relationen inte alls lika klar.`,
    },
    {
      heading: "Phillipskurvan ”muterar”",
      body: `Varför försvann det enkla sambandet efter 1960-talet?
- **Oljeprischockerna** under 1970-talet ökade inflationen och arbetslösheten **samtidigt**.
- Lönesättarna tog i större utsträckning **med inflationen i sina beräkningar**. I många länder infördes (viss) **indexering av lönerna** till inflationen.
- **Inflationsförväntningarna förlorade sin förankring.**

Föreläsningen visar att punkterna för USA 1970–95 inte längre ligger längs en fallande linje.

### En mer generell förväntningsbildning
Om inflationen ständigt är positiv är $\\pi^e_t = 0$ inte rimligt. Anta i stället att
$$\\pi^e_t = \\theta \\, \\pi_{t-1}$$
**Parametern θ** fångar hur förra årets inflation påverkar den förväntade inflationen under nästa år.

Ett sätt att tolka Phillipskurvans sammanbrott är att **θ ökade från ungefär 0 till närmare 1 under 1970-talet**, eftersom det då blev tydligt att världen fått tendenser till ihållande inflation. Föreläsningen visar också inflationen i USA sedan 1900.`,
    },
    {
      heading: "Förväntningsutvidgad Phillipskurva (version 2.0)",
      body: `Sätt in förväntningsbildningen i ekvationen för inflationen:
$$\\pi_t = \\pi^e_t + m + z - \\alpha u_t \\quad\\Rightarrow\\quad \\pi_t = \\theta\\,\\pi_{t-1} + m + z - \\alpha u_t$$

- **Fram till och med 60-talet** verkar inflationsförväntningarna ha varit nära 0 och oberoende av tidigare års inflation, dvs. **θ = 0**: $\\pi_t = m + z - \\alpha u_t$.
- Om θ är **positivt** reviderar man upp förväntningarna om nästa års inflation när förra årets inflation var hög.
- Om förväntningarna är att inflationen blir **lika med förra årets**, dvs. **θ = 1** och $\\pi^e_t = \\pi_{t-1}$, får vi den **förväntningsutvidgade Phillipskurvan**:
$$\\pi_t - \\pi_{t-1} = m + z - \\alpha u_t$$

Nu är det **förändringen i inflationen** som beror på arbetslösheten. Det stämde bättre med verkligheten efter 1970: föreläsningen visar att förändringen i inflationen i USA 1970–95 hänger tydligt ihop med arbetslösheten.

**Simulera:** håll arbetslösheten fast under $u_n$ och se vad som händer med inflationen år för år för olika θ.`,
      graphs: [
        {
          type: "curves",
          title: "Inflationen år för år: π_t = θ·π_{t−1} + (m + z) − α·u",
          xLabel: "År", yLabel: "Inflation, π (%)",
          x: [0, 15], y: [-10, 40],
          params: {
            theta: { label: "θ (hur mycket förra årets inflation påverkar förväntningarna)", min: 0, max: 1, step: 0.05, value: 0 },
            u: { label: "Arbetslöshet u (%), hålls konstant", min: 2, max: 10, step: 0.1, value: 4 },
            pi0: { label: "Inflation år 0 (%)", min: -2, max: 6, step: 0.5, value: 2 },
          },
          curves: [
            { label: "π_t", fn: "theta > 0.999 ? pi0 + floor(x)*(6 - u) : pow(theta, floor(x))*pi0 + (6 - u)*(1 - pow(theta, floor(x)))/(1 - theta)" },
            { label: "0", fn: "0", dashed: true, color: "var(--muted)" },
          ],
          readout: "u_n = 6 %. Inflation efter 1 år: {=theta > 0.999 ? pi0 + (6-u) : theta*pi0 + (6-u)} % · efter 5 år: {=theta > 0.999 ? pi0 + 5*(6-u) : pow(theta,5)*pi0 + (6-u)*(1-pow(theta,5))/(1-theta)} % · efter 10 år: {=theta > 0.999 ? pi0 + 10*(6-u) : pow(theta,10)*pi0 + (6-u)*(1-pow(theta,10))/(1-theta)} %",
          caption: "Här är m + z = 6 och α = 1, så $u_n = 6$ %. Med **θ = 0** (version 1.0) blir inflationen konstant, $6 - u$ procent, när arbetslösheten ligger fast under u_n. Det är en stadig pris- och lönespiral, men inflationen ökar inte. Med **θ = 1** (version 2.0) **ökar inflationen varje år** så länge u < u_n: inflationen accelererar. Om du sätter u = 6 ligger inflationen kvar där den är.",
        },
      ],
    },
    {
      heading: "Phillipskurvan i dag",
      body: `Kom ihåg grundekvationen $\\pi_t = \\pi^e_t + m + z - \\alpha u_t$. Vilken förväntningsbildning är rimlig i dag?

- Riksbanken (och andra centralbanker) har etablerat en betydande **trovärdighet för inflationsmålet på 2 % per år**.
- **Inflationsförväntningarna är återigen förankrade.**
- En rimlig Phillipskurva är därför
$$\\pi_t = 0{,}02 + m + z - \\alpha u_t$$

Den liknar **version 1.0 mer än version 2.0**, och den är också **mer stabil**. Avvikelser från $u_n = (m + z)/\\alpha$ får inte samma effekt på inflationen, eftersom förväntningarna inte ändras.

Föreläsningen visar data för USA 1996–2022 och Sverige (1974–95 respektive 1996–2022). Under den senare perioden ligger inflationen i båda länderna betydligt stabilare, trots att arbetslösheten varierar. Föreläsningen visar också svensk inflation (exkl. räntor) och inflationsförväntningar 2018–2025. Inflationen steg kraftigt under 2022 och föll sedan tillbaka, medan de långsiktiga förväntningarna förblev betydligt stabilare. Ett diagram visar dessutom olika delars bidrag till inflationen.`,
    },
    {
      heading: "Jämviktsarbetslösheten i Phillipskurvan",
      body: `Vi kan härleda ett matematiskt uttryck för jämviktsarbetslösheten $u_n$. Vid $u_n$ måste priserna bli som förväntat, och därmed blir också inflationen som förväntat, $\\pi = \\pi^e$:
$$\\pi_t = \\pi^e_t + m + z - \\alpha u_t \\;\\Rightarrow\\; 0 = m + z - \\alpha u_n \\;\\Rightarrow\\; u_n = \\frac{m + z}{\\alpha}$$

**Jämviktsarbetslösheten blir högre om m eller z ökar och lägre om α ökar.**

Sätt in uttrycket i Phillipskurvan:
$$\\pi_t = \\pi^e_t + \\alpha \\cdot \\frac{m + z}{\\alpha} - \\alpha u_t = \\pi^e_t + \\alpha u_n - \\alpha u_t$$
$$\\pi_t - \\pi^e_t = -\\alpha\\,(u_t - u_n)$$

**Inflationens avvikelse från förväntan beror negativt på arbetslöshetens avvikelse från jämviktsnivån.**`,
      takeaway: "π − πᵉ = −α(u − u_n). Om arbetslösheten ligger under u_n blir inflationen högre än förväntat.",
    },
    {
      heading: "Friedman och Phelps: ingen långsiktig avvägning",
      body: `- På 60-talet ifrågasatte **Milton Friedman och Edmund Phelps** att det finns ett **stabilt utbytesförhållande** mellan arbetslöshet och inflation. Enligt dem går det inte att **långsiktigt sänka arbetslösheten** bara genom att tillåta lite högre inflation.
- Pris- och lönesättarna låter sig **inte luras på lång sikt** och har inte alltid lägre inflationsförväntningar än den inflation som blir.
- Därmed blir arbetslösheten **på lång sikt i genomsnitt lika med $u_n$**, den nivå som ger samma inflation som den förväntade.`,
    },
    {
      heading: "Jämviktsarbetslöshetens bestämningsfaktorer",
      body: `De faktorer som påverkar $u_n = (m + z)/\\alpha$ **varierar mellan länder**:

- **α** fångar hur **känsliga lönesättarna är för arbetslöshet**. Storleken beror bland annat på arbetslöshetsersättningens storlek, förhandlingsordningen och om facket representerar **insiders** (de som står starkt på arbetsmarknaden) eller också dem som har störst risk att bli arbetslösa.
- **m** kan påverkas av **konkurrensförhållandena** på varumarknaden.
- **z** fångar bland annat **minimilöner, lönesammanpressning**, hur väl **matchningen** mellan arbetslösa och jobb fungerar, och **arbetskraftens sammansättning** (t.ex. andelen med svårt att hitta jobb).

Jämviktsarbetslösheten är därför **inte densamma i olika länder** och **inte nödvändigtvis konstant över tiden**. Arbetslösheten kan också **avvika** från sin jämviktsnivå, och då avviker inflationen från sin förväntade nivå. Föreläsningen visar skattad jämviktsarbetslöshet och faktisk arbetslöshet i Sverige.`,
    },
    {
      heading: "Phillipskurvan vid mycket hög eller mycket låg inflation",
      body: `Phillipskurvans **lutning**, alltså det kortsiktiga bytesförhållandet mellan inflation och arbetslöshet, beror rimligen på **hur snabbt inflationen tenderar att ändras**.

- **Vid hög inflation** är inflationen också mycket mer **variabel**. Det blir då viktigare för lönesättarna att göra bra prognoser och kunna ändra kontrakt och priser, t.ex. genom **löneindexering** så att lönerna automatiskt följer inflationen. **Phillipskurvan blir då nästan lodrät.**
- **Vid mycket låg inflation eller deflation** kan det motsatta inträffa. Om löntagarna inte accepterar **nominella lönesänkningar**, inte ens när arbetslösheten blir väldigt hög, **försvinner sambandet** mellan inflation och arbetslöshet.`,
    },
    {
      heading: "Lite doktrinhistoria",
      body: `- Phillipskurvan beskrevs först **1958 av William Phillips** (1914–75).
- Redan innan sambandet bröt samman menade **Milton Friedman** (1912–2006) och **Edmund Phelps** (1933–) att det skulle ske om arbetslösheten permanent låg under jämviktsarbetslösheten. Det var ett viktigt steg mot att behandla **förväntningsbildningen** mer rimligt i makroekonomin.
- **Phelps** var central i utvecklingen av **nykeynesianska modeller** med rationella agenter och prisstelheter, t.ex. i form av överlappande lönekontrakt. Han fick ekonomipriset **2006**.
- **Friedman** var i stället mycket kritisk till keynesianska idéer om att staten ska motverka variationer i efterfrågan med finanspolitiken. Han menade att den bästa politiken är att se till att **penningmängden inte fluktuerar**, och att den stora depressionen berodde på en kraftig penningpolitisk åtstramning. Han utvecklade också **permanentinkomsthypotesen** (konsumtionen är lika med den förväntade framtida genomsnittliga inkomsten) och myntade begreppet **”helikopterpengar”**. Han fick ekonomipriset **1976**.

### Ricardo och guldmyntfoten
- **David Ricardo** (1772–1823) hävdade bland annat att **prisnivån, allt annat lika, är proportionell mot mängden utestående sedlar och mynt**.
- Det gäller också i vår modell **på medellång sikt**: en ökning av M leder till en proportionellt lika stor ökning av P, så att **M/P är oförändrat**.
- Ricardo använde detta för att förklara den ökande inflationen i England under sin tid, då England hade lämnat guldmyntfoten och ökat penningmängden.
- Under **guldmyntfoten** garanterade centralbanken att man kunde växla in sina sedlar i guld. Det begränsade hur mycket sedlar man kunde trycka och därmed inflationen.
- **Bretton Woods-systemet** (1945–71) var också ett system med guldmyntfot. Federal Reserve garanterade att dollar kunde lösas in mot guld till **35 dollar per uns** (31 gram). Övriga länder hade fast växelkurs mot dollarn, en indirekt guldmyntfot. (Enligt föreläsningen är guldpriset nu runt 4 000 dollar per uns.)`,
    },
  ],

  keyTerms: [
    { term: "Phillipskurvan", def: "Samband från arbetslöshet till inflation: $\\pi = \\pi^e + m + z - \\alpha u$." },
    { term: "Linjär lönebildningsfunktion", def: "$F(u, z) = 1 - \\alpha u + z$." },
    { term: "α (Phillipskurvans känslighet)", def: "Hur mycket inflationen minskar när arbetslösheten ökar med en procentenhet." },
    { term: "Pris- och lönespiral", def: "Priser och löner stiger kontinuerligt när u < u_n och πᵉ = 0. Inflationen är positiv men inte ökande." },
    { term: "Löneindexering", def: "Lönerna justeras automatiskt i takt med inflationen." },
    { term: "θ (förväntningsparameter)", def: "$\\pi^e_t = \\theta\\,\\pi_{t-1}$: hur mycket förra årets inflation påverkar förväntningarna." },
    { term: "Förväntningsutvidgad Phillipskurva", def: "$\\pi_t - \\pi_{t-1} = m + z - \\alpha u_t$ (θ = 1)." },
    { term: "Förankrade inflationsförväntningar", def: "Förväntningarna ligger kvar vid inflationsmålet (2 %) även när inflationen tillfälligt avviker." },
    { term: "Jämviktsarbetslöshet u_n", def: "$u_n = (m + z)/\\alpha$, den arbetslöshet där inflationen blir som förväntat." },
    { term: "Insiders", def: "De som står starkt på arbetsmarknaden. Om facket främst representerar dem påverkas α." },
    { term: "Guldmyntfot", def: "Sedlar kan växlas in mot guld till ett fast pris, vilket begränsar penningmängden." },
    { term: "Bretton Woods", def: "Systemet 1945–71: dollarn kunde lösas in mot guld (35 dollar per uns), och övriga länder hade fast kurs mot dollarn." },
  ],

  quiz: [
    {
      q: "Hur härleds Phillipskurvan i kursen?",
      options: [
        "Från IS- och LM-sambanden",
        "Från löne- och prissättningen (WS och PS)",
        "Från räntepariteten och växelkursen",
        "Från produktionsfunktionen Y = AN enbart",
      ],
      answer: 1,
      explain: "Det ger $P = (1+m)P^e F(u,z)$, som skrivs om till ett samband för inflationen.",
      topic: "Från priser till inflation",
    },
    {
      q: "I $\\pi = \\pi^e + m + z - \\alpha u$: vad händer med inflationen om prispåslaget m ökar, allt annat lika?",
      options: ["Den minskar", "Den ökar", "Den påverkas inte", "Den blir lika med πᵉ"],
      answer: 1,
      explain: "Högre m (liksom högre z) ökar inflationen vid en given arbetslöshet.",
      topic: "Från priser till inflation",
    },
    {
      q: "πᵉ = 2 %, m + z = 6 procentenheter och α = 1. Hur hög blir inflationen om u = 5 %?",
      type: "numeric", answer: 3, tolerance: 0.01, unit: "%",
      explain: "$\\pi = 2 + 6 - 1 \\cdot 5 = 3$ %.",
      topic: "Från priser till inflation",
    },
    {
      q: "Med m + z = 6 procentenheter och α = 1,5, hur hög är jämviktsarbetslösheten (%)?",
      type: "numeric", answer: 4, tolerance: 0.01, unit: "%",
      explain: "$u_n = (m + z)/\\alpha = 6/1{,}5 = 4$ %.",
      topic: "Jämviktsarbetslösheten i Phillipskurvan",
    },
    {
      q: "Vad händer med jämviktsarbetslösheten om α ökar (lönesättarna blir känsligare för arbetslöshet)?",
      options: ["Den ökar", "Den minskar", "Den är oförändrad", "Den blir negativ"],
      answer: 1,
      explain: "$u_n = (m+z)/\\alpha$, så ett större α ger ett lägre u_n.",
      topic: "Jämviktsarbetslösheten i Phillipskurvan",
    },
    {
      q: "Vad gäller i Phillipskurvan version 1.0 (πᵉ = 0) om arbetslösheten ligger fast under u_n?",
      options: [
        "Inflationen ökar varje år så länge u < u_n",
        "Inflationen är positiv och konstant",
        "Inflationen är noll eftersom πᵉ = 0",
        "Det blir deflation när u < u_n",
      ],
      answer: 1,
      explain: "Priserna blir varje år högre än förra året, men inflationstakten är konstant: $\\pi = m + z - \\alpha u$.",
      topic: "Phillipskurvan version 1.0",
    },
    {
      q: "Vilket av följande nämns **inte** som en orsak till att Phillipskurvan ”muterade” efter 1960-talet?",
      options: [
        "Oljeprischockerna på 1970-talet",
        "Att lönesättarna började ta med inflationen i beräkningarna (indexering)",
        "Att inflationsförväntningarna tappade sin förankring",
        "Att Riksbanken införde ett inflationsmål på 2 %",
      ],
      answer: 3,
      explain: "Inflationsmålet infördes 1995 och bidrog i stället till att förankra förväntningarna igen.",
      topic: "Phillipskurvan ”muterar”",
    },
    {
      q: "Vad innebär θ = 1 i $\\pi^e_t = \\theta\\pi_{t-1}$?",
      options: [
        "Att man förväntar sig noll inflation varje år",
        "Att man förväntar sig förra årets inflation",
        "Att man förväntar sig inflationsmålet, 2 %",
        "Att förväntningarna saknar betydelse för π",
      ],
      answer: 1,
      explain: "Då blir Phillipskurvan $\\pi_t - \\pi_{t-1} = m + z - \\alpha u_t$, den förväntningsutvidgade.",
      topic: "Förväntningsutvidgad Phillipskurva (version 2.0)",
    },
    {
      q: "I den förväntningsutvidgade Phillipskurvan: vad händer om arbetslösheten ligger fast under u_n?",
      options: [
        "Inflationen är konstant men positiv",
        "Inflationen ökar år efter år",
        "Inflationen faller tillbaka mot noll",
        "Arbetslösheten stiger automatiskt till u_n",
      ],
      answer: 1,
      explain: "Det är förändringen i inflationen som beror på u: om u < u_n är $\\pi_t - \\pi_{t-1} > 0$.",
      topic: "Förväntningsutvidgad Phillipskurva (version 2.0)",
    },
    {
      q: "Med θ = 1, m + z = 6, α = 1 och π i fjol = 3 %: hur hög blir inflationen i år om u = 4 %?",
      type: "numeric", answer: 5, tolerance: 0.01, unit: "%",
      explain: "$\\pi_t = 3 + 6 - 4 = 5$ %. Inflationen ökar med 2 procentenheter.",
      topic: "Förväntningsutvidgad Phillipskurva (version 2.0)",
    },
    {
      q: "Varför liknar dagens Phillipskurva mer version 1.0 än version 2.0, enligt föreläsningen?",
      options: [
        "För att arbetslösheten alltid ligger på u_n numera",
        "För att förväntningarna är förankrade vid målet, 2 %",
        "För att α har blivit noll sedan 1990-talet",
        "För att indexeringen av lönerna har ökat kraftigt",
      ],
      answer: 1,
      explain: "Med $\\pi^e = 0{,}02$ blir kurvan $\\pi_t = 0{,}02 + m + z - \\alpha u_t$, som är stabilare.",
      topic: "Phillipskurvan i dag",
    },
    {
      q: "Vilket uttryck beskriver inflationens avvikelse från den förväntade?",
      options: [
        "$\\pi_t - \\pi^e_t = \\alpha(u_t - u_n)$",
        "$\\pi_t - \\pi^e_t = -\\alpha(u_t - u_n)$",
        "$\\pi_t - \\pi^e_t = -(m + z)$",
        "$\\pi_t - \\pi^e_t = u_n - \\alpha$",
      ],
      answer: 1,
      explain: "Om arbetslösheten ligger under jämviktsnivån blir inflationen högre än förväntat.",
      topic: "Jämviktsarbetslösheten i Phillipskurvan",
    },
    {
      q: "Vad menade Friedman och Phelps?",
      options: [
        "Att högre inflation permanent kan sänka arbetslösheten",
        "Att ingen stabil långsiktig avvägning u–π finns",
        "Att inflationen främst beror på oljepriset",
        "Att Phillipskurvan alltid är horisontell",
      ],
      answer: 1,
      explain: "Pris- och lönesättare låter sig inte luras på lång sikt.",
      topic: "Friedman och Phelps: ingen långsiktig avvägning",
    },
    {
      q: "Varför blir Phillipskurvan nästan lodrät vid mycket hög inflation?",
      options: [
        "För att arbetslösheten då alltid är nära noll",
        "För att lönerna indexeras och förväntningar anpassas snabbt",
        "För att centralbanken då slutar sätta räntan",
        "För att α blir noll när inflationen är hög",
      ],
      answer: 1,
      explain: "Den kortsiktiga avvägningen mellan inflation och arbetslöshet försvinner nästan.",
      topic: "Phillipskurvan vid mycket hög eller mycket låg inflation",
    },
    {
      q: "Vad händer med sambandet mellan inflation och arbetslöshet vid deflation, om löntagarna inte accepterar nominella lönesänkningar?",
      options: ["Det blir starkare", "Det kan försvinna", "Det blir positivt", "Inget"],
      answer: 1,
      explain: "Om lönerna inte kan sänkas nominellt påverkar inte ens mycket hög arbetslöshet inflationen nedåt.",
      topic: "Phillipskurvan vid mycket hög eller mycket låg inflation",
    },
    {
      q: "Vad gäller enligt Ricardo (och i vår modell på medellång sikt) om penningmängden M fördubblas?",
      options: [
        "Real BNP fördubblas på medellång sikt",
        "Prisnivån fördubblas; M/P oförändrat",
        "Räntan halveras permanent",
        "Reallönerna fördubblas",
      ],
      answer: 1,
      explain: "Prisnivån är proportionell mot penningmängden på medellång sikt.",
      topic: "Lite doktrinhistoria",
    },
  ],
});
