// IS-LM-PC i graferna: IS: Y = (350 + G − 50(r + x))/0,4 (dvs. T = 300, c₁ + b₁ = 0,6),
// LM: r = r̄, PC: π − π̄ = (α/L)(Y − Yₙ) med α/L = 0,01.
registerLecture({
  id: "kapitel-11",
  number: 11,
  title: "Kapitel 11: Från kort till medellång sikt: IS-LM-PC-modellen",
  summary: "IS-LM kopplat till Phillipskurvan: potentiell produktion, BNP-gap, neutral ränta, utbudsstörningar samt finans- och penningpolitik på medellång sikt i en öppen ekonomi med fast och flytande växelkurs.",
  tags: ["IS-LM-PC", "Potentiell produktion", "BNP-gap", "Neutral ränta", "Undanträngning"],

  sections: [
    {
      heading: "Från kort till medellång sikt",
      body: `Vi kopplar nu ihop vår modell för **varumarknaden och räntesättningen på kort sikt (IS-LM)** med modellen för **lönebildning och inflation (Phillipskurvan)**. Då ser vi hur ekonomin beter sig både på **kort och medellång sikt**.

Modellen använder vi bland annat för att diskutera konsekvenserna av den **nedre gränsen för räntan** och av **utbudsstörningar**. Sedan utvidgar vi den till att inkludera **utrikeshandel**.

### De tre byggstenarna (sluten ekonomi)
- **IS** (jämvikt på varumarknaden): $Y = C(Y - T) + I(Y, r + x) + G$
- **Räntesättningen:** centralbanken väljer en realränta, $r = \\bar r$
- **Phillipskurvan** (från lönebildning och prissättning): $\\pi_t - \\pi^e_t = -\\alpha\\,(u_t - u_n)$`,
    },
    {
      heading: "Potentiell produktion och BNP-gap",
      body: `Vi vill nu göra om Phillipskurvan till ett samband från **produktion** till inflation.

- För en given arbetskraft L är antalet sysselsatta $N_t = L\\,(1 - u_t)$.
- Om varje sysselsatt producerar en enhet varor är också $Y_t = L\\,(1 - u_t)$.
- Den produktion som uppstår när arbetslösheten ligger på jämviktsnivån kallas **potentiell produktion**:
$$Y_n \\equiv L\\,(1 - u_n)$$

$Y_n$ är ekonomins **jämviktsnivå på medellång sikt**, dvs. den produktion som uppstår vid ett **neutralt konjunkturläge**.

### BNP-gapet
Det (absoluta) **BNP-gapet** eller **produktionsgapet** är $Y_t - Y_n$. Det mäter skillnaden mellan faktisk och potentiell produktion och kan vara både positivt och negativt. Oftast uttrycks det i procent: $(Y_t - Y_n)/Y_n$.

Med uttrycken ovan:
$$Y_t - Y_n = L(1 - u_t) - L(1 - u_n) = -L\\,(u_t - u_n) \\quad\\Rightarrow\\quad u_t - u_n = -\\frac{Y_t - Y_n}{L}$$
Insatt i Phillipskurvan:
$$\\pi_t - \\pi^e_t = \\frac{\\alpha}{L}\\,(Y_t - Y_n)$$
Om centralbanken för en **trovärdig inflationsmålspolitik** kan vi ersätta inflationsförväntningarna med **inflationsmålet** $\\bar\\pi$:
$$\\pi_t - \\bar\\pi = \\frac{\\alpha}{L}\\,(Y_t - Y_n)$$`,
      takeaway: "Positivt BNP-gap ⇒ inflation över målet. Negativt BNP-gap ⇒ inflation under målet.",
    },
    {
      heading: "IS-LM-PC-modellen",
      body: `Modellen består av **tre samband**:
1. **IS-sambandet**, som bestämmer produktionen via jämvikt på varumarknaden.
2. **Centralbankens räntesättning** (LM).
3. **Den nya Phillipskurvan (PC)**, som bestämmer inflationen utifrån BNP-gapet.

Diagrammet ritas med **IS-LM överst** (real styrränta mot Y) och **PC under** (inflation minus inflationsmålet mot Y). Båda har samma Y på x-axeln.

I en **kortsiktsjämvikt A** med $Y_t > Y_n$ är BNP-gapet **positivt**, och därmed blir inflationen **högre än målet**. (I föreläsningens figurer står det ”PS:” vid Phillipskurvan. Det ska vara PC.)

### Neutral ränta
I en jämvikt med inflation över målet riskerar inflationsförväntningarna att på sikt **tappa sin förankring**. Penningpolitiken måste därför **höja räntan** så att jämvikten hamnar vid den potentiella produktionen. Den ränta som krävs kallas **neutral ränta** (eller naturlig ränta) och betecknas $r_n$ (eller $r^*$).`,
      graphs: [
        {
          type: "curves",
          title: "IS-LM-PC-modellen",
          params: {
            rbar: { label: "Real styrränta r̄ (%)", min: -2, max: 8, step: 0.1, value: 2 },
            G: { label: "Offentlig konsumtion G", min: 200, max: 700, step: 10, value: 400 },
            xp: { label: "Riskpremie x (procentenheter)", min: 0, max: 4, step: 0.25, value: 1 },
            Yn: { label: "Potentiell produktion Yₙ", min: 1200, max: 1800, step: 10, value: 1500 },
          },
          panels: [
            {
              title: "IS-LM",
              xLabel: "Produktion, Y", yLabel: "Real styrränta, r (%)",
              x: [800, 2200], y: [-2, 8],
              curves: [
                { label: "IS", fn: "(350 + G - 0.4*x)/50 - xp", ghost: true },
                { label: "LM", fn: "rbar", ghost: true },
                { label: "Yₙ", xAt: "Yn", dashed: true, color: "var(--muted)" },
              ],
              points: [{ between: ["IS", "LM"], label: "A" }],
            },
            {
              title: "Phillipskurvan (PC)",
              xLabel: "Produktion, Y", yLabel: "Inflation − mål (procentenheter)",
              x: [800, 2200], y: [-6, 6],
              curves: [
                { label: "PC", fn: "0.01*(x - Yn)", ghost: true },
                { label: "0", fn: "0", dashed: true, color: "var(--muted)" },
                { label: "Y", xAt: "(350 + G - 50*(rbar + xp))/0.4", dashed: true, color: "var(--c1)" },
              ],
              points: [{ between: ["PC", "Y"], label: "A′" }],
            },
          ],
          readout: "Y = {A.x} · BNP-gap = {=((350 + G - 50*(rbar + xp))/0.4 - Yn)/Yn*100:1} % · π − π̄ = {A′.y} procentenheter · neutral ränta r_n = {=(350 + G - 0.4*Yn)/50 - xp} %",
          caption: "Här är $\\alpha/L = 0{,}01$, så ett BNP-gap på 100 ger inflation 1 procentenhet över målet. **Prova:**<br>1) **Positivt gap:** sänk r̄ till 1 %. Y > Yₙ och inflationen hamnar över målet. Den neutrala räntan är 2 %.<br>2) **Negativ utbudsstörning:** sänk Yₙ till 1 400. PC flyttas uppåt/vänster och inflationen stiger. Den neutrala räntan stiger till 2,8 %. Höj r̄ dit, eller sänk i stället G med 40 (finanspolitisk åtstramning).<br>3) **Finansiell störning:** höj x till 2. Y faller under Yₙ, och då krävs en lägre styrränta.",
        },
      ],
    },
    {
      heading: "Stabiliseringspolitik efter en negativ utbudsstörning",
      body: `En **negativ utbudsstörning** (t.ex. högre energipriser eller sämre produktivitet) innebär att **$Y_n$ minskar**. Därmed **förskjuts PC uppåt/vänster**: vid den gamla produktionsnivån blir BNP-gapet positivt och inflationen hamnar över målet.

Då behövs en **åtstramning**:
- antingen genom en **styrräntehöjning** till r′, så att jämvikten hamnar vid A′ (LM flyttas upp),
- eller genom en **finanspolitisk åtstramning** som förskjuter IS till IS′ och jämvikten till A″.

Om konsumenterna och investerarna har blivit mer **pessimistiska** på grund av utbudsstörningen kan IS också förskjutas åt vänster **utan ny politik**.`,
    },
    {
      heading: "Öppen ekonomi på medellång sikt: fast växelkurs",
      body: `I en öppen ekonomi tillkommer nettoexporten:
$$Y = C(Y - T) + I(Y, r + x) + G + NX(Y, Y^*, \\varepsilon)$$

Med **fast växelkurs** är den nominella växelkursen E fixerad. Men den **reala** växelkursen, $\\varepsilon = E \\cdot P/P^*$, kan ändras om **inflationen avviker från omvärldens** (som vi antar har samma inflationsmål).

### Automatisk anpassning
- I en jämvikt A med **negativt BNP-gap** blir inflationen **under målet**. Då deprecierar den reala växelkursen (P stiger långsammare än P\\*).
- **Nettoexporten ökar**, vilket successivt **förskjuter IS åt höger** tills BNP-gapet är noll vid A′.
- En **expansiv finanspolitik** kan skynda på anpassningen.
- **Räntan kan inte ändras**, eftersom vi antar fast växelkurs (i = i\\*).

### Finanspolitik vid fast växelkurs
Anta att ekonomin från början är i jämvikt på medellång sikt, Y = Yₙ, och att det kommer en **permanent finanspolitisk stimulans**:
1. IS förskjuts åt höger. I A′ är Y′ > Yₙ, och **inflationen blir över målet**.
2. Den reala växelkursen **apprecierar** och **nettoexporten faller**.
3. IS förskjuts därmed successivt **tillbaka** till utgångsläget.

**På medellång sikt** är Y = Yₙ igen, men **nettoexporten har fallit lika mycket som finanspolitiken har ökat efterfrågan**. Det kallas **undanträngning** (*crowding out*).`,
    },
    {
      heading: "Flytande växelkurs",
      body: `Phillipskurvan innebär att inflationen avviker från målet om BNP-gapet inte är noll. Vid fast växelkurs sker då en anpassning av den reala växelkursen som ändrar nettoexporten, så att BNP-gapet successivt sluts. **En liknande anpassning sker vid flytande växelkurs.**

Kom ihåg att $\\varepsilon = E \\cdot P/P^*$.
- Vid **fast** växelkurs kan ε bara ändras genom att prisnivån utvecklas annorlunda än i omvärlden.
- Vid **flytande** växelkurs kan **också E ändras**.

Det är en stor skillnad, eftersom **den nominella växelkursen kan ändras snabbt**, mycket snabbare än prisnivån.

### En finanspolitisk expansion
På medellång sikt leder en finanspolitisk expansion till en **real appreciering** som minskar nettoexporten lika mycket som finanspolitiken har ökat efterfrågan: $E \\cdot P/P^*$ ökar. **Undanträngning uppstår.** Men sker den via **E (snabbt)** eller via **P/P\\* (långsamt)**?

För att förstå det går vi tillbaka till räntepariteten:
$$E_t = \\frac{1 + i_t}{1 + i^*_t}\\,E^e_{t+1}$$
**Förändringar i den förväntade växelkursen slår direkt igenom på dagens växelkurs.**`,
    },
    {
      heading: "Vad är rationellt att förvänta? När fungerar finanspolitiken?",
      body: `När vi analyserade kort sikt antog vi att ränte- eller finanspolitiska förändringar inte påverkade den framtida växelkursen. Det kan motiveras med att vi studerade **tillfälliga** förändringar. **Permanenta** förändringar i finanspolitiken kan däremot påverka den förväntade framtida växelkursen.

Det finns två möjliga förväntningar om vad centralbanken gör efter en finanspolitisk expansion:

1. **Centralbanken förväntas vara benhård och inte släppa igenom någon inflation.** Då måste den framtida nominella växelkursen stiga tillräckligt för att åstadkomma den reala apprecieringen. $E^e$ stiger, och därmed stiger **dagens E**, och ε, lika mycket. **IS förskjuts omedelbart tillbaka. Finanspolitiken får ingen verkan alls**, eftersom undanträngningen sker direkt.
2. **Centralbanken förväntas släppa igenom en del inflation** under anpassningen. Då behöver $E^e$ inte stiga så mycket, eller inte alls, och då stiger inte heller dagens E (så mycket). Undanträngningen sker i stället **över tid** genom att P/P\\* stiger. **Finanspolitiken får effekt på kort sikt.**

En annan faktor som kan göra att den nominella växelkursen inte stiger är om stimulansen förväntas vara **temporär**. Det gör stimulanseffekten starkare.

### Slutsatser om finanspolitiken vid flytande växelkurs
- **På medellång sikt har finanspolitiken ingen effekt på BNP.** Stimulanser tränger undan nettoexporten, och åtstramningar ökar nettoexporten, så att efterfrågeeffekten neutraliseras.
- **På kort sikt** beror effekten på vad som händer med den nominella växelkursen.
- Ju **mer långsiktig** den finanspolitiska förändringen är, och ju **mindre avvikelser från inflationsmålet** centralbanken tillåter under anpassningen, desto **svagare** blir den kortsiktiga effekten på produktionen. Växelkursen ändras då direkt i en riktning som motverkar finanspolitiken.`,
      graphs: [
        {
          type: "curves",
          title: "Effekten på Y av en permanent finanspolitisk stimulans över tid (stiliserad)",
          xLabel: "Perioder efter stimulansen", yLabel: "Y − Yₙ",
          x: [0, 12], y: [-20, 300],
          params: {
            dG: { label: "Permanent ökning av G", min: 0, max: 100, step: 5, value: 100 },
            k: { label: "Anpassningstakt via P/P* (andel av gapet som sluts per period)", min: 0.1, max: 0.6, step: 0.05, value: 0.25 },
          },
          curves: [
            { label: "Fast växelkurs", fn: "2.5*dG*pow(1 - k, floor(x))" },
            { label: "Flytande, fall 2 (viss inflation tillåts)", fn: "1.25*dG*pow(1 - k, floor(x))" },
            { label: "Flytande, fall 1 (benhård centralbank)", fn: "0" },
          ],
          readout: "Fast växelkurs: Y − Yₙ = {=2.5*dG} direkt, och efter 4 perioder {=2.5*dG*pow(1-k,4)}. På medellång sikt är gapet 0 i alla fall, och NX har fallit med {dG}.",
          caption: "Med multiplikatorn 2,5 ökar Y först med 2,5·ΔG vid fast växelkurs, och sedan sluts gapet gradvis när inflationen överstiger omvärldens och ε apprecierar. Vid flytande växelkurs, **fall 1**, stiger Eᵉ och E direkt, så Y påverkas inte alls. I **fall 2** stiger E bara delvis, så en del av effekten (här hälften) finns kvar på kort sikt. Siffrorna är stiliserade.",
        },
      ],
    },
    {
      heading: "Penningpolitik vid flytande växelkurs",
      body: `- **På medellång sikt** kan den inhemska **reala** styrräntan inte avvika från omvärldens. Den nominella kan göra det, men det kräver olika inflationsmål.
- Centralbanken kan dock göra en **temporär** ändring av styrräntan.
- Ränteändringen leder till en period av BNP-gap och därmed en inflation som avviker från målet. Det påverkar den **förväntade framtida växelkursen**, som i sin tur påverkar E. Det **förstärker** den kortsiktiga effekten av ränteändringen.
- **Penningpolitiken blir kraftfull vid flytande växelkurs i en öppen ekonomi.**

### Effekten av en temporär räntesänkning
1. En temporär sänkning av styrräntan **förskjuter LM nedåt**.
2. **Växelkursen faller** på grund av den lägre räntan och den lägre förväntade framtida växelkursen. **NX ökar**, och IS förskjuts utåt.
3. I A′ blir **Y högre än Yₙ**, och inflationen stiger över målet.
4. Successivt högre prisnivå och apprecierande valuta ger en **real appreciering** (ε ökar), och IS förskjuts successivt tillbaka.
5. Centralbanken återför till slut räntan till den **neutrala** nivån.

**På medellång sikt** är Y = Yₙ vid A igen, och **nettoexporten är tillbaka på sin utgångsnivå**. **Prisnivån har ökat** och den **nominella växelkursen har deprecierat**, men **den reala växelkursen är oförändrad**.`,
    },
    {
      heading: "Några slutsatser",
      body: `- I en **sluten ekonomi** måste politiken se till att ekonomin kommer tillbaka till potentiell produktion på medellång sikt. Annars tappar inflationsmålet sin förankring.
- I en **öppen ekonomi** finns en **anpassningsmekanism via den reala växelkursen**, som tenderar att över tid automatiskt föra ekonomin till en balanspunkt vid den potentiella produktionen.
- Vid **fast växelkurs** får finanspolitiken **temporära** effekter på produktionen. På medellång sikt leder en finanspolitisk expansion till **undanträngning av nettoexporten**, som neutraliserar stimulanseffekten.
- Vid **flytande växelkurs** blir (temporär) **penningpolitik kraftfull** när det gäller att påverka ekonomin.
- Den **kortsiktiga effekten av finanspolitik vid flytande växelkurs** beror på hur den nominella växelkursen reagerar. Det beror i sin tur på förväntningarna om hur centralbanken agerar och om hur långsiktig den finanspolitiska förändringen förväntas vara.`,
    },
  ],

  keyTerms: [
    { term: "Potentiell produktion", def: "$Y_n \\equiv L(1 - u_n)$, produktionen vid jämviktsarbetslöshet och ekonomins jämvikt på medellång sikt." },
    { term: "BNP-gap (produktionsgap)", def: "$Y_t - Y_n$, ofta uttryckt i procent: $(Y_t - Y_n)/Y_n$." },
    { term: "Phillipskurvan i BNP-gapsform", def: "$\\pi_t - \\bar\\pi = \\frac{\\alpha}{L}(Y_t - Y_n)$." },
    { term: "IS-LM-PC-modellen", def: "IS, centralbankens räntesättning och Phillipskurvan. Den beskriver både kort och medellång sikt." },
    { term: "Neutral ränta", def: "$r_n$ (eller $r^*$): den reala ränta som ger Y = Yₙ och inflation lika med målet." },
    { term: "Negativ utbudsstörning", def: "En störning som minskar Yₙ, så att PC flyttas uppåt/vänster." },
    { term: "Undanträngning", def: "Finanspolitisk stimulans tränger på medellång sikt undan nettoexporten (eller investeringarna) lika mycket." },
    { term: "Real anpassningsmekanism", def: "Inflation som avviker från omvärldens ändrar ε och NX, så att BNP-gapet successivt sluts." },
  ],

  quiz: [
    {
      q: "Hur definieras potentiell produktion i kapitel 11?",
      options: ["$Y_n = L(1 - u_n)$", "$Y_n = L \\cdot u_n$", "$Y_n = C + I + G$", "$Y_n = N/L$"],
      answer: 0,
      explain: "Det är produktionen när arbetslösheten ligger på jämviktsnivån (med en enhet produktion per sysselsatt).",
      topic: "Potentiell produktion och BNP-gap",
    },
    {
      q: "L = 1 000, $u_n$ = 5 % och den faktiska arbetslösheten är 3 %. Hur stort är BNP-gapet $Y_t - Y_n$?",
      type: "numeric", answer: 20, tolerance: 0.01,
      explain: "$Y_t - Y_n = -L(u_t - u_n) = -1000 \\cdot (0{,}03 - 0{,}05) = 20$.",
      topic: "Potentiell produktion och BNP-gap",
    },
    {
      q: "Vilket uttryck är Phillipskurvan i BNP-gapsform när förväntningarna är förankrade vid inflationsmålet?",
      options: [
        "$\\pi_t - \\bar\\pi = -\\frac{\\alpha}{L}(Y_t - Y_n)$",
        "$\\pi_t - \\bar\\pi = \\frac{\\alpha}{L}(Y_t - Y_n)$",
        "$\\pi_t = \\alpha(Y_t - Y_n)$",
        "$\\pi_t - \\bar\\pi = L\\alpha(Y_n - Y_t)$",
      ],
      answer: 1,
      explain: "Med $u_t - u_n = -(Y_t - Y_n)/L$ insatt i $\\pi - \\pi^e = -\\alpha(u - u_n)$ blir uttrycket $\\frac{\\alpha}{L}(Y - Y_n)$.",
      topic: "Potentiell produktion och BNP-gap",
    },
    {
      q: "Ekonomin är i en kortsiktsjämvikt med Y > Yₙ. Vad gäller?",
      options: [
        "Inflationen är under målet, så räntan bör sänkas",
        "Inflationen är över målet, så räntan bör höjas",
        "BNP-gapet är negativt och arbetslösheten är hög",
        "Inflationen är lika med målet, så inget behöver göras",
      ],
      answer: 1,
      explain: "Ett positivt BNP-gap ger inflation över målet. Annars riskerar förväntningarna att tappa sin förankring.",
      topic: "IS-LM-PC-modellen",
    },
    {
      q: "Vad är den neutrala räntan $r_n$?",
      options: [
        "Den nominella räntan i omvärlden",
        "Den realränta som ger Y = Yₙ",
        "Den ränta som ger noll inflation",
        "Den lägsta möjliga styrräntan",
      ],
      answer: 1,
      explain: "Den kallas också naturlig ränta och betecknas $r_n$ eller $r^*$.",
      topic: "IS-LM-PC-modellen",
    },
    {
      q: "En negativ utbudsstörning minskar Yₙ. Vad händer i IS-LM-PC-modellen om centralbanken inte gör något?",
      options: [
        "PC flyttas nedåt/höger och inflationen faller",
        "PC flyttas uppåt/vänster och inflationen stiger",
        "IS flyttas åt höger och inflationen stiger",
        "Inget, eftersom Y inte har ändrats",
      ],
      answer: 1,
      explain: "Därför behövs åtstramning: antingen en högre styrränta eller en stramare finanspolitik.",
      topic: "Stabiliseringspolitik efter en negativ utbudsstörning",
    },
    {
      q: "I modellen i grafen ovan gäller IS: $Y = (350 + G - 50(r + x))/0{,}4$ med G = 400 och x = 1. Vilken neutral ränta (%) ger Y = Yₙ = 1 400?",
      type: "numeric", answer: 2.8, tolerance: 0.01, unit: "%",
      explain: "$1400 \\cdot 0{,}4 = 560 = 750 - 50(r + 1)$ ger $r + 1 = 3{,}8$, alltså $r = 2{,}8$ %.",
      topic: "IS-LM-PC-modellen",
    },
    {
      q: "Fast växelkurs och negativt BNP-gap: hur sluts gapet utan politik?",
      options: [
        "Centralbanken sänker räntan tills gapet är slutet",
        "Låg inflation ger real depreciering, så NX ökar",
        "Den nominella växelkursen stiger och stärker NX",
        "Gapet sluts aldrig utan finanspolitik",
      ],
      answer: 1,
      explain: "Vid fast växelkurs kan ε bara ändras via relativpriserna P/P\\*, vilket tar tid.",
      topic: "Öppen ekonomi på medellång sikt: fast växelkurs",
    },
    {
      q: "Vad händer på medellång sikt efter en permanent finanspolitisk stimulans vid fast växelkurs?",
      options: [
        "Y är permanent högre än Yₙ",
        "Y = Yₙ, och NX har fallit lika mycket",
        "Räntan har stigit och I har fallit",
        "Inflationen är permanent över målet",
      ],
      answer: 1,
      explain: "Den reala appreciering som följer av inflationen tränger undan nettoexporten.",
      topic: "Öppen ekonomi på medellång sikt: fast växelkurs",
    },
    {
      q: "Varför går anpassningen av den reala växelkursen snabbare vid flytande än vid fast växelkurs?",
      options: [
        "För att priserna ändras snabbare vid flytande växelkurs",
        "För att E kan ändras, och E rör sig snabbt",
        "För att räntan alltid är högre vid flytande kurs",
        "För att NX inte påverkas av den reala växelkursen",
      ],
      answer: 1,
      explain: "$\\varepsilon = E \\cdot P/P^*$, och vid fast växelkurs kan bara P/P\\* ändras.",
      topic: "Flytande växelkurs",
    },
    {
      q: "Permanent finanspolitisk expansion vid flytande växelkurs, och marknaden tror att centralbanken är benhård och inte släpper igenom någon inflation. Vad händer på kort sikt?",
      options: [
        "Y ökar kraftigt, eftersom E är oförändrad",
        "E stiger direkt, så Y påverkas inte",
        "E faller och Y ökar mer än multiplikatorn",
        "Räntan stiger kraftigt och I faller",
      ],
      answer: 1,
      explain: "Undanträngningen sker omedelbart via den nominella växelkursen.",
      topic: "Vad är rationellt att förvänta? När fungerar finanspolitiken?",
    },
    {
      q: "Vilka faktorer gör den kortsiktiga effekten av finanspolitik vid flytande växelkurs **starkare**?",
      options: [
        "Att stimulansen är permanent och ingen inflation tillåts",
        "Att den är temporär eller viss inflation tillåts",
        "Att räntan är hög när stimulansen genomförs",
        "Att Marshall–Lerner-villkoret inte är uppfyllt",
      ],
      answer: 1,
      explain: "Då stiger inte E (så mycket) direkt, och undanträngningen sker långsamt via P/P\\*.",
      topic: "Vad är rationellt att förvänta? När fungerar finanspolitiken?",
    },
    {
      q: "Centralbanken gör en temporär räntesänkning vid flytande växelkurs. Vad gäller på medellång sikt?",
      options: [
        "Y är permanent högre än Yₙ",
        "Y = Yₙ; P upp, E ned, ε oförändrad",
        "Den reala växelkursen har deprecierat permanent",
        "Inflationen ligger permanent över målet",
      ],
      answer: 1,
      explain: "På kort sikt är penningpolitiken kraftfull, men på medellång sikt är den neutral för de reala variablerna.",
      topic: "Penningpolitik vid flytande växelkurs",
    },
    {
      q: "Varför blir penningpolitiken särskilt kraftfull vid flytande växelkurs i en öppen ekonomi?",
      options: [
        "Räntan påverkar både I och, via E, NX",
        "För att finanspolitiken då inte fungerar alls",
        "För att priserna är helt flexibla på kort sikt",
        "För att realräntan kan avvika permanent från omvärldens",
      ],
      answer: 0,
      explain: "En lägre ränta sänker E direkt, och den förväntade inflationen sänker också Eᵉ, vilket förstärker effekten på NX.",
      topic: "Penningpolitik vid flytande växelkurs",
    },
  ],
});
