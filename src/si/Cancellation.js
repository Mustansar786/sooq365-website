const Cancellation = [
    {
        title: "Neudeležba stranke",
        body: "Stranka, ki se je odločila za odpoved rezerviranega potovanja, mora lastnika o tem nemudoma obvestiti preko klepeta v aplikaciji Urent. Postopek odpovedi poteka prek aplikacije Urent. V primeru, da se stranka ne pojavi na odhodnem mestu brez odpovedi potovanja po preteku 120 minut od trenutka, ko bi se potovanje moralo pričeti, se to šteje kot neudeležba stranke in se zaračuna ustrezna pristojbina za odsotnost stranke. Če stranka pride na izhodišče potovanja brez vozniškega dovoljenja ali z neveljavnim vozniškim dovoljenjem, se tudi ta primer šteje kot neudeležba stranke. Ko bodo veljavne pristojbine zaračunane, bodo vračila obdelana samo s prvotnim plačilnim sredstvom.",
        bodyTable: [{
            columnOne: "Trajanje potovanja",
            columnTwo: "Pristojbine"
        }, {
            columnOne: "Več kot 3 dni*",
            columnTwo: "Celotna tarifa za vse 3 dni potovanja"
        }, {
            columnOne: "Manj kot 3 dni",
            columnTwo: "75 % cene za enodnevno potovanje"
        }],
        extraText:''
    },
    {
        title: "Zamuda pri vračilu avtomobila s strani stranke",
        body: "V primeru, da se stranka ne pojavi na dogovorjenem odstavnem mestu v roku 120 minut po zaključku potovanja, ki se šteje za obdobje mirovanja, se za zamudni čas zaračuna   celotna   dnevna   cena   najema.   Plačilo   za   takšno   zamudo   lahko   stranki zaračuna neposredno lastnik brez uporabe aplikacije Urent.",
        bodyTable: [],
        extraText:''
    },
    {
        title: "Stroški odpovedi s strani strank",
        body: "Stranka, ki se je odločila za odpoved rezerviranega potovanja, mora lastnika o tem nemudoma obvestiti preko klepeta v aplikaciji Urent. Postopek odpovedi poteka prek aplikacije Urent. Če stranka odpove potovanje, preden lastnik potrdi rezervacijo, se stranki ne zaračuna nobenih stroškov. Ta pravilnik velja samo za rezervacije, ki zahtevajo potrditev lastnika. Če je naročilo na strani oddano brez predhodne rezervacije ali želi stranka preklicati že potrjeno naročilo s strani lastnika, veljajo naslednja pravila.",
        bodyTable: [{
            columnOne: "Čas za odpoved",
            columnTwo: "Pristojbina za odpoved"
        }, {
            columnOne: "24 ur ali več pred začetkom potovanja",
            columnTwo: "10% celotne cene rezervacije"
        }, {
            columnOne: "Manj kot 24 ur pred začetkom potovanja",
            columnTwo: "20 % celotne cene rezervacije"
        }],
        extraText:'Stranka lahko prekliče rezervacijo brez dodatnih stroškov, če ponovno opravi rezervacijo pri istem lastniku v 24 urah. Vračila bodo izvedena samo s prvotnim načinom plačila.'}, {
        title: "Neudeležba lastnika",
        body: "Lastnik, ki želi odpovedati rezervacijo potovanja, ki je že bila potrjena, mora stranko o tem nemudoma obvestiti preko klepeta v aplikaciji Urent. Nepravočasna odpoved in/ali 60-minutna zamuda pri dostavi avtomobila stranki na določeno lokacijo za brez predhodnega obvestila bo obravnavana kot neudeležba lastnika, kar bo predmet kazni v višini 500 AED in se zadrži celoten znesek prejemkov za potovanje. V primeru ponavljajočih se incidentov bo določena dodatna kazen v višini 150 Dhs z naknadno odstranitvijo lastnika z Urenta. Pri rezervaciji istega dne imajo lastniki na voljo 120-minutno obdobje odloga, da se s svojimi strankami srečajo na dogovorjenem izhodišču izleta – v tem primeru se lastniku ne zaračuna kazni za neudeležbo. Če stranka ob srečanju z lastnikom ugotovi (ob razumnem ravnanju), da se registrirano vozilo bistveno razlikuje od opisa v storitvah, se to prav tako šteje za neudeležbo lastnika in velja zgoraj omenjena kazen za lastnika. Izjema je, če so te razlike v opisu vozila dogovorjene med lastnikom in najemnikom.",
        bodyTable:[],
        extraText:''
    }, {
        title: "Preklic s strani lastnika",
        body: "Ne glede na razlog za odpoved rezervacije, v primeru odpovedi potovanja s strani lastnika, bo ekipa Urenta stopila v stik s stranko in poskušala poiskati nadomestno vozilo drugih lastnikov. Če stranka zavrne nadaljnjo rezervacijo, je upravičena do celotnega povračila, lastnik pa bo podvržen naslednjim kaznim:",
        bodyTable: [{
            columnOne: "Čas odpovedi",
            columnTwo: "Strošek odpovedi"
        }, {
            columnOne: "Več kot 48 ur pred začetkom potovanja",
            columnTwo: "20 % zasluška od potovanja ter dodatna denarna kazen v v višini 150 Dhs v primeru ponovitve takih situacij in odstranitve s platforme Urent"
        }, {
            columnOne: " Manj kot 48 ur pred začetkom potovanja",
            columnTwo: "20 % zasluška od potovanja ter dodatna denarna kazen v v višini 250 Dhs v primeru ponovitve takih situacij in odstranitve s platforme Urent"
        }],
        extraText:''
    }, {
        title: "Sprememba potovanja s strani lastnika",
        body: "Ko lastnik potrdi rezervacijo, nadaljnje spremembe niso več mogoče. Za odpoved ali neudeležbo s strani lastnika Urent zaračuna globe in kazni. Vse globe se zaračunajo samo za določeno kršitev.",
        bodyTable:[],
        extraText:''
    }, {
        title: "Vračila",
        body: "Vračila se izvedejo v skladu s prvotnim načinom plačila in se obdelajo v 10–45 dneh, odvisno od banke izdajateljice kreditne kartice.",
        bodyTable:[],
        extraText:''
    }
]
export default Cancellation

