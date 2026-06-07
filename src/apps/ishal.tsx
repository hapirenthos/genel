React;
import React, { useState } from "react";
import {
  Menu,
  X,
  BookOpen,
  Activity,
  Users,
  ClipboardList,
  TestTube,
  Microscope,
  Stethoscope,
  Lightbulb,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  BookMarked,
  LucideIcon,
} from "lucide-react";

// --- TİP (TYPE) VE INTERFACE TANIMLAMALARI ---

interface PblStage {
  title: string;
  text: string;
  reasoning: string;
}

interface PblCase {
  id: string;
  title: string;
  stages: PblStage[];
}

interface SubTab {
  id: string;
  title: string;
  text?: string;
  isTable?: boolean;
  headers?: string[];
  rows?: string[][];
}

interface Section {
  title: string;
  icon: LucideIcon;
  text?: string;
  intro?: string;
  subTabs?: SubTab[];
  cases?: PblCase[];
  items?: string[];
}

type ContentDataType = Record<string, Section>;

// --- DATA: TAMAMEN KORUNMUŞ İÇERİK ---

const contentData: ContentDataType = {
  intro: {
    title: "İntrodüksiyon ve Tanımsal Çerçeve",
    icon: BookOpen,
    text: `Pediatrik popülasyonda gastrointestinal sistem hastalıkları, tüm dünyada morbidite ve mortalitenin en önde gelen nedenleri arasında yer almaya devam etmektedir. Akut ishal ataklarının büyük bir kısmı kendini sınırlayan viral veya bakteriyel enfeksiyonlara bağlı olarak günler içinde düzelme eğilimi gösterse de, ishalin uzaması ve kronikleşmesi klinisyenler için çok daha karmaşık bir tanısal, terapötik ve nutrisyonel zorluk teşkil eder. Genel tıbbi literatürde ve pediatrinin temel başvuru kaynaklarında kronik ishal, dışkı kıvamında belirgin azalma ve dışkı miktarında artışın ondört günden daha uzun sürmesi olarak tanımlanmaktadır. Objektif hacimsel parametrelere göre değerlendirildiğinde, yenidoğanlarda ve küçük çocuklarda günlük dışkı miktarının 10 g/kg/gün sınırını, adölesan ve erişkinlerde ise 200 g/gün sınırını aşması ishal olarak kabul edilmektedir. Üç yaşına kadar olan çocuklarda bağırsak alışkanlıkları değişkenlik gösterdiğinden ve erişkin tipi dışkılama paternine ancak bu yaşlardan sonra ulaşıldığından, dışkılama frekansından ziyade dışkının hacmi ve sıvı içeriği tanıda çok daha kritik bir öneme sahiptir.

Kronik ve persistan ishal atakları, özellikle büyüme ve gelişmenin en kritik olduğu yaşamın ilk yıllarında ortaya çıktığında, uzun vadeli ve geri dönüşümsüz yıkıcı sonuçlar doğurma potansiyeli taşır. Erken çocukluk döneminde geçirilen tekrarlayan veya uzayan ishal atakları, bağırsak mukozasında yapısal hasara yol açarak besin emilimini bozar; bu durum malnütrisyona, sekonder laktaz eksikliğine, immün yetmezliğe ve sekonder enfeksiyonlara zemin hazırlayan tehlikeli bir hücresel kısır döngü yaratır. Yeterli besin desteği sağlanamayan ve kronik inflamasyon veya malabsorbsiyon tablosuna giren çocuklarda sadece lineer büyüme geriliği değil, aynı zamanda kalıcı psikomotor ve bilişsel gelişim gerilikleri de ortaya çıkmaktadır. Beslenme bozukluğuna bağlı olarak gelişen ekzokrin pankreatik yetmezlik veya villöz atrofi, mevcut ishalin şiddetini daha da artırarak klinik tablonun içinden çıkılmaz bir hal almasına neden olabilir. Bu nedenle, kronik ishali olan bir çocuğun değerlendirilmesi, ampirik tedavilerden ziyade yaşa özgü ayırt edici tanıları içeren sistematik, patofizyolojiye dayalı ve kanıt temelli bir tıbbi yaklaşımı zorunlu kılmaktadır.`,
  },
  pathophysiology: {
    title: "Kronik İshalin Patofizyolojik Mekanizmaları",
    icon: Activity,
    intro: `Kronik ishalin etiyolojisi genetik mutasyonlardan immünolojik bozukluklara kadar geniş bir yelpazeye yayılsa da, lümende aşırı sıvı birikimine yol açan temel hücresel ve biyokimyasal mekanizmalar dört ana kategori altında incelenir. Bu mekanizmaların tam olarak anlaşılması, tanısal algoritmaların rasyonel bir şekilde uygulanabilmesi için elzemdir. Birçok klinik tabloda bu mekanizmaların birden fazlası eş zamanlı olarak hastalıktan sorumlu olabilmektedir.`,
    subTabs: [
      {
        id: "osmotic",
        title: "Ozmotik İshal",
        text: `Ozmotik ishal, bağırsak lümeninde emilemeyen veya yapısal nedenlerle sindirilemeyen osmotik olarak aktif solütlerin varlığına bağlı olarak, osmotik gradiyent boyunca suyun hücre içinden lümene çekilmesi sonucunda meydana gelir. İnce bağırsak mukozasındaki fırçamsı kenar enzimlerinin (örneğin laktaz veya sükraz-izomaltaz) eksikliği durumunda, sindirilemeyen disakkaritler kolona ulaşır. Kolonda bulunan mikrobiyota, bu sindirilemeyen şekerleri fermente ederek laktik asit ve kısa zincirli yağ asitlerine dönüştürür. Bu biyokimyasal fermantasyon süreci, dışkı pH'sının belirgin şekilde düşmesine (asidik dışkı) ve aşırı hidrojen ile metan gazı üretimine neden olur. Diyetle aşırı miktarda alınan fruktoz, sorbitol (elma, armut, erik suyu gibi meyve sularında bolca bulunur) veya magnezyum hidroksit ile laktuloz gibi laksatifler de benzer şekilde ciddi ozmotik yüke yol açarak ishale neden olur. Ozmotik ishalin en temel klinik karakteristikleri; hastanın oral alımının kesilmesi (açlık testi) durumunda lümene giren osmotik yük ortadan kalktığı için ishalin dramatik şekilde durması ve dışkı elektrolit analiziyle hesaplanan fekal ozmotik açığın yüksek (genellikle >50-100 mOsm/kg) saptanmasıdır.`,
      },
      {
        id: "secretory",
        title: "Sekretuvar İshal",
        text: `Sekretuvar ishal, intestinal epitel hücrelerinden (özellikle kript hücrelerinden) lümene aktif sıvı ve elektrolit sekresyonunun artması veya fizyolojik absorpsiyon mekanizmalarının bozulması sonucunda gelişir. Genellikle siklik AMP (cAMP), siklik GMP (cGMP) veya intrasellüler kalsiyum gibi ikincil ulak sistemlerini aktive eden endojen sekretagoglar (Vazoaktif İntestinal Peptid - VIP, gastrin, prostaglandinler), bakteriyel enterotoksinler (Kolera toksini veya toksijenik Escherichia coli) veya hücre apikal membranında yer alan klorür/sodyum kanallarındaki konjenital transport defektleri bu duruma yol açar. Hücre içi sekonder habercilerin artışı, apikal membrandaki klorür kanallarının (örneğin CFTR) açık kalmasına neden olurken, eş zamanlı olarak sodyum-klorür emilimini inhibe eder. Suyun klorürü takip ederek lümene geçmesiyle masif bir dehidratasyon tablosu oluşur. Sekretuvar ishal, hastanın aç bırakılmasına rağmen endojen sekresyon devam ettiği için ishalin durmaması, günlük dışkı hacminin çok yüksek olması (lümende masif dehidratasyona yol açar) ve elektrolit kaybının fazla olması nedeniyle fekal ozmotik açığın düşük (<50 mOsm/kg) olması ile karakterizedir. Dışkı sodyumu sıklıkla 70 mEq/L'nin üzerindedir.`,
      },
      {
        id: "inflammatory",
        title: "İnflamatuvar İshal",
        text: `İnflamatuvar ishal, bağırsak epitelinde mukozal hasara, ülserasyona ve dolayısıyla toplam emilim yüzey alanının dramatik kaybına neden olan patolojik süreçleri tanımlar. İltihaplanan ve bütünlüğü bozulan dokudan bağırsak lümenine protein, kan, mukus ve lökosit sızar. İnflamatuvar sitokinler ve prostaglandinler aynı zamanda reaktif olarak bağırsak motilitesini artırır ve sekretuvar mekanizmaları da tetikleyerek sıvı absorpsiyon kapasitesini düşürür. İnflamatuvar bağırsak hastalıkları (Ülseratif Kolit, Crohn hastalığı), otoimmün enteropatiler, çölyak hastalığı (hem malabsorptif hem inflamatuvar örtüşme gösterir) ve invaziv bakteriyel/paraziter enfeksiyonlar (Shigella, Salmonella, Campylobacter, Yersinia, Clostridium difficile, Entamoeba histolytica) bu grubun en belirgin örnekleridir. Dışkı analizinde makroskopik kan ve mukus varlığı, mikroskopik olarak lökosit tespit edilmesi ve nötrofil degranülasyonunu gösteren yüksek fekal kalprotektin seviyeleri bu mekanizmanın en güvenilir biyobelirteçleridir. İnflamatuvar ishal sıklıkla sistemik semptomlarla (ateş, kilo kaybı, büyüme geriliği) birlikte seyreder.`,
      },
      {
        id: "dysmotility",
        title: "Dismotilite ve Fonksiyonel Bozukluklar",
        text: `Bağırsak geçiş süresinin (transit time) otonom sinir sistemi bozuklukları, tirotoksikoz veya fonksiyonel nedenlerle anormal derecede hızlanması, luminal içerikteki suyun ve besin maddelerinin emilimi için yeterli fizyolojik sürenin tanınmamasına neden olur. Sonuç olarak, bağırsak absorptif kapasitesi tamamen normal ve sağlam olmasına rağmen sıvı dolu içeriğin hızla atılması ishale yol açar. Geçiş süresinin yavaşladığı, anatomik kör döngülerin (blind loop) veya psödo-obstrüksiyon tablolarının olduğu durumlarda ise ince bağırsakta aşırı bakteriyel çoğalma (SIBO) gelişir. Lümende aşırı çoğalan bakteriler, safra tuzlarını dekonjuge ederek miçel oluşumunu engeller ve sekonder yağ malabsorbsiyonuna yol açar. Çocukluk çağının kronik non-spesifik ishali (Toddler's diarrhea) ve daha büyük çocuklarda/adölesanlarda görülen irritabl bağırsak sendromu (IBS), yapısal, biyokimyasal veya inflamatuvar bir doku hasarı olmaksızın gelişen tipik fonksiyonel dismotilite örnekleridir.`,
      },
      {
        id: "table1",
        title: "Tablo: Patofizyolojik Karşılaştırma",
        isTable: true,
        headers: [
          "Parametre",
          "Ozmotik İshal",
          "Sekretuvar İshal",
          "İnflamatuvar İshal",
          "Dismotilite İshali",
        ],
        rows: [
          [
            "Temel Mekanizma",
            "Lümende emilemeyen aktif solüt varlığı",
            "Kriptlerden aktif iyon ve su sekresyonu",
            "Mukozal hasar, yüzey kaybı, eksüdasyon",
            "Geçiş süresinin aşırı hızlanması veya yavaşlaması",
          ],
          [
            "Açlık Yanıtı",
            "İshal tamamen durur",
            "İshal hacimli şekilde devam eder",
            "İshal kısmen devam edebilir",
            "Gıda alımı ile tetiklenir (gastrokolik refleks)",
          ],
          [
            "Dışkı Hacmi",
            "Genellikle daha az (<200 mL/24 saat)",
            "Masif, volümlü (>200 mL/24 saat)",
            "Değişken, genellikle sık ve az miktarda",
            "Değişken (Genelde hacim çok yüksek değildir)",
          ],
          [
            "Fekal Ozmotik Açık",
            "Geniş (> 50-100 mOsm/kg)",
            "Dar (<50 mOsm/kg)",
            "Genellikle normal",
            "-",
          ],
          [
            "Dışkı PH'sı",
            "Karbonhidrat malabsorbsiyonunda asidik (<6.0)",
            "Genellikle nötral veya alkali (>6.0)",
            "Değişken (Sıklıkla nötral)",
            "Nötral",
          ],
          [
            "Lökosit / Gizli Kan",
            "Negatif",
            "Negatif",
            "Güçlü Pozitif",
            "Negatif",
          ],
        ],
      },
    ],
  },
  ageGroups: {
    title: "Yaş Gruplarına Göre Ayırıcı Tanılar",
    icon: Users,
    intro: `Pediatrik kronik ishal vakalarında etiyolojik yelpaze yaşa göre çok büyük farklılıklar gösterir. Hastanın hangi yaş grubunda olduğu, kullanılacak klinik algoritmaların ilk basamağını oluşturur. Yaş bazlı bir yaklaşım, nadir sendromların doğru zamanda düşünülmesini sağlarken, daha büyük çocuklarda gereksiz genetik testlerin yapılmasını engeller.`,
    subTabs: [
      {
        id: "neonate",
        title: "1. Yenidoğan (0-30 Gün) ve Erken Süt Çocukluğu",
        text: `Bu dönemde başlayan kronik ishal atakları son derece ciddidir ve hızlıca hayatı tehdit eden dehidratasyon, elektrolit imbalansı ve ileri derece malnütrisyon tabloları ile seyreder. Bu durum eski tıp literatüründe "İnfantın İnatçı İshali (Intractable Diarrhea of Infancy - IDI)" olarak adlandırılırken, günümüzde spesifik moleküler, enzimatik ve genetik altyapıları aydınlatılan "Konjenital İshal ve Enteropatiler (CoDEs)" çatısı altında toplanmaktadır. Bu gruptaki hastalıklar genellikle spesifik transport defektleri veya bağırsak epitelinin yapısal gelişim kusurlarıdır.

Konjenital hastalıklar arasında öne çıkan Mikrovillus İnklüzyon Hastalığı (MVID), MYO5B gen mutasyonları sonucunda enterosit apikal membranında fırçamsı kenarın (mikrovillusların) olmaması ve hücre içinde patognomonik inklüzyon cisimcikleri ile karakterize otozomal resesif bir transport ve polarite defektidir. Doğumdan hemen sonra (genellikle ilk 72 saat içinde) masif sekretuvar, sulu ishal ile başlar. Hasta enteral beslenmeyi tolere edemez ve total parenteral beslenmeye (TPN) tam bağımlı hale gelir. Genellikle ince bağırsak nakli gerektirir.

Bir diğer önemli tablo olan Konjenital Tufting Enteropatisi (İntestinal Epitelyal Displazi), EpCAM gen mutasyonları sonucu gelişen, ince bağırsak epitelinde gözyaşı damlası şeklinde fokal epitel hücre kümelenmeleri (tuft) ile kendini gösteren ciddi bir enteropatidir. Erken bebeklik döneminde refrakter sekretuvar ishal ile ortaya çıkar ve MVID gibi yüksek mortalite oranına sahiptir.

Elektrolit transport defektleri açısından Konjenital Klorür İshali, SLC26A3 genindeki mutasyon nedeniyle lümendeki klorür ile hücre içindeki bikarbonat değişiminin bozulduğu, in utero başlayan (fetal polihidramnios öyküsü sıktır) nadir bir hastalıktır. Fekal klorür düzeyi çok yüksektir (>90 mEq/L) ve sistemik olarak ağır hipokloremik, hipokalemik metabolik alkaloz ile seyreder. Sıklıkla renal bir patoloji olan Bartter sendromu ile karıştırılır, ancak düşük idrar klorürü ve son derece yüksek fekal klorür ile ayrımı kesin olarak yapılır. Fetal ultrasonda renal bozukluklarda megamesane görülürken, konjenital klorür ishalinde megakolon izlenmesi önemli bir prenatal ipucudur. Buna karşın Konjenital Sodyum İshali, SPINT2 veya reseptör guanilat siklaz C (GC-C) aktivasyon mutasyonları ile ilişkili olup, lümenden sodyum emiliminin defektif olduğu durumdur. Klorür ishalinin aksine sistemik metabolik asidoz ve dışkıda yüksek sodyum (>145 mEq/L) atılımı ile karakterizedir.

Karbonhidrat emilim bozukluklarının en ağır formu olan Konjenital Glikoz-Galaktoz Malabsorbsiyonu (GGM), sodyum bağımlı glikoz transporter (SGLT1) defektidir. Doğum sonrası emzirmeye veya laktoz/glikoz içeren formül mamaya başlanmasıyla lümende biriken şekerlere sekonder ciddi asidik ve ozmotik ishal gelişir. Fekal pH düşüktür ve indirgeyici maddeler pozitiftir. Çocuğun diyeti fruktoz bazlı, glikoz ve galaktoz içermeyen özel formüllerle (örneğin 3232A formülü) değiştirildiğinde ishal mucizevi bir hızla kesilir.

Son olarak, IPEX Sendromu (İmmün disregülasyon, poliendokrinopati, enteropati ve X'e bağlı geçiş), FOXP3 gen mutasyonu nedeniyle regülatör T hücre (Treg) fonksiyonunun bozulduğu bir hastalıktır. Yaşamın ilk aylarında başlayan şiddetli immün aracılı sekretuvar ishal, tip 1 diyabet ve tiroidit ile seyreder. İnce bağırsak biyopsisinde ciddi villöz atrofi, kanda anti-enterosit ve anti-goblet hücre antikorları görülebilir. Kesin tedavisi hematopoietik kök hücre naklidir.`,
      },
      {
        id: "toddler",
        title: "2. Süt Çocuğu ve Oyun Çocuğu Dönemi (1 Ay - 3 Yaş)",
        text: `Bu yaş grubu pediatrilerde kronik ishal vakalarının en sık görüldüğü, ancak büyük bir kısmının yapısal veya inflamatuvar bir hastalık barındırmadığı dönemdir. Gereksiz medikalizasyondan kaçınılması gereken en kritik popülasyonu oluşturur.

Bu dönemin açık ara en sık görülen nedeni Çocukluk Çağının Kronik Non-spesifik İshali (Toddler's Diarrhea) tablosudur. Genellikle 6 ay ile 36 ay arasında başlar. İshal sadece uyanık olunan saatlerde ortaya çıkar, günde 4-10 kez kahverengi, sulu, bazen sindirilmemiş gıda parçaları (bezelye, havuç vb.) içeren ancak kesinlikle kan veya mukus içermeyen dışkılama görülür. İshalin bu kadar kronik ve sık olmasına rağmen çocuğun kilo alımı, boy uzaması ve genel fiziksel muayenesi tamamen normaldir; herhangi bir besin eksikliği saptanmaz. En önemli etiyolojik faktörler aşırı sıvı tüketimi, yüksek fruktoz ve sorbitol içeren meyve sularının (elma, armut suyu) kontrolsüz tüketimi, diyetin yağ içeriğinin düşük olması ve lif eksikliğidir.

Bir diğer yaygın neden Post-Gastroenterit İshal durumudur. Akut bir viral (örneğin Rotavirus) veya bakteriyel bağırsak enfeksiyonunu takiben bağırsak mukozasındaki apikal fırçamsı kenarda oluşan geçici hücresel hasar sonucu laktaz enzim aktivitesinin azalmasıyla karakterizedir. Sekonder laktoz intoleransına bağlı olarak enfeksiyon geçse dahi haftalarca süren osmotik ishal görülür. Mukozal onarım tamamlandığında tablo kendiliğinden düzelir.

Diyete ek gıdaların eklenmesiyle klinik bulgu vermeye başlayan Çölyak Hastalığı (Gluten Duyarlı Enteropati), diyete gluten içeren gıdaların (buğday, arpa, çavdar) eklenmesiyle ortaya çıkan otoimmün aracılı hücresel bir enteropatidir. Doku transglutaminaz enzimi tarafından deamide edilen gliadin peptitlerinin HLA-DQ2/DQ8 molekülleri aracılığıyla immün sisteme sunulması mukozal hasarı başlatır. Kilo alamama, genel malabsorbsiyon (kötü kokulu, yağlı, hacimli dışkı), karın şişliği, kas erimesi, demir eksikliği anemisi ve spesifik seroloji (TTG IgA yüksekliği) ile karakterizedir.

Pankreatik ekzokrin yetmezliğe bağlı olarak ciddi maldigesyon ve steatore ile seyreden Kistik Fibrozis hastalarında ise gelişme geriliği, tekrarlayan akciğer enfeksiyonları, mekonium ileusu öyküsü ve ter testinde yükseklik saptanır.

Erken dönemde karşılaşılan İnek Sütü Proteini Alerjisi (CMPA) ise sıklıkla formül mamaya geçişte başlar, kanlı/mukuslu ishal, kusma ve sistemik egzama eşlik edebilir. İnflamatuvar eozinofilik mekanizmalar devrededir.`,
      },
      {
        id: "older",
        title: "3. Daha Büyük Çocuklar ve Adölesanlar (3 - 18 Yaş)",
        text: `Bu yaş periyodu, erişkin tipi inflamatuvar ve fonksiyonel hastalıkların pediatrik yaş grubunda klasik prezentasyonlarını göstermeye başladığı zaman dilimidir.

İnflamatuvar Bağırsak Hastalıkları (IBD), hücresel immünitenin bağırsak florasına karşı uygunsuz reaksiyon vermesiyle oluşur. Karın ağrısı, kronik kanlı ve mukuslu ishal, sistemik ateş, kilo kaybı, anemi ve gecikmiş puberte gibi dramatik belirtiler gösterir. Crohn hastalığı ağızdan anüse kadar tüm gastrointestinal sistemi tutabilir, atlamalı lezyonlar yapar ve transmural inflamasyon nedeniyle perianal hastalık (fistül/fissür) çok sık görülür. Ülseratif kolit ise daha yüzeysel mukozal inflamasyonla kolonu diffüz tutar ve kanlı ishal çok daha belirgindir.

Buna karşın İrritabl Bağırsak Sendromu (IBS) büyük çocuklarda görülen en yaygın fonksiyonel bir hastalıktır. Genellikle psikosomatik stresörlerle tetiklenen karın ağrısı ile birlikte defekasyon alışkanlığında değişiklikler (ishal ve kabızlık atakları) izlenir. Bağırsak-beyin aksındaki disregülasyon suçlanmaktadır. Alarm semptomları (kilo kaybı, anemi, uykudan uyandıran gece ishali, kanlı dışkı) kesinlikle yoktur. Tanı organik hastalıkların dışlanması ve Rome IV kriterlerine dayanarak konulur.

Enfeksiyöz nedenler arasında Giardiasis, kreş ve okul çocuklarında fekal-oral yolla bulaşan, mikrovilluslara yapışarak yüzey alanını kapatan ve belirgin yağlı malabsorptif ishale neden olan yaygın bir paraziter hastalıktır. Clostridium difficile enfeksiyonu ise genellikle yakın zamanlı geniş spektrumlu antibiyotik kullanımına ikincil olarak normal komensal floranın bozulmasıyla ortaya çıkar; toksinleri aracılığıyla ciddi sekretuvar ve inflamatuvar psödomembranöz kolite yol açabilir.

Primer Laktoz İntoleransı (Hipolaktazya), laktaz enzim aktivitesinin yaşla birlikte genetik olarak programlanmış ilerleyici kaybı neticesinde ortaya çıkar. Bebeklik döneminde sütü rahatça tolere eden çocukta, okul çağı ve adölesan dönemde süt ürünleri alımı sonrası karında şişkinlik, gaz ve şiddetli ozmotik ishal başlar.

Ayrıca bu yaş grubunda nadir görülen nöroendokrin tümörler (VIPoma, Karsinoid sendrom) sürekli kanda yüksek sekretagog peptit seviyeleri nedeniyle masif ve hayatı tehdit edici boyutta sekretuvar ishale neden olabilir.`,
      },
      {
        id: "table2",
        title: "Tablo: Hastalık Özetleri",
        isTable: true,
        headers: [
          "Hastalık / Tablo",
          "Tipik Başlangıç Yaşı",
          "İshalin Karakteri",
          "Büyüme/Gelişme",
          "Eşlik Eden Spesifik Bulgular",
        ],
        rows: [
          [
            "MVID / Tufting Ent.",
            "Yenidoğan (<30 gün)",
            "Masif Sekretuvar",
            "Ciddi Gerilik (TPN bağımlı)",
            "İnklüzyon cisimcikleri / Tuftlar",
          ],
          [
            "Konjenital Klorür İshali",
            "Doğumdan itibaren",
            "Sekretuvar, sulu",
            "Gerilik",
            "Alkaloz, hipokloremi, polihidramnios",
          ],
          [
            "Toddler's Diarrhea",
            "6-36 ay",
            "Gündüzleri, sulu/gıda artıklı",
            "Tamamen Normal",
            "Bol sıvı ve meyve suyu tüketimi öyküsü",
          ],
          [
            "Çölyak Hastalığı",
            "Diyete gluten girince",
            "Yağlı (Steatore), Hacimli",
            "İlerleyici Gerilik",
            "Karın şişliği, kas erimesi, anemi",
          ],
          [
            "İnflamatuvar Bağırsak H.",
            "> 3 yaş ve Adölesan",
            "Kanlı, mukuslu",
            "Gecikmiş puberte, Kilo kaybı",
            "Ateş, perianal fissür/fistül (Crohn), aft",
          ],
          [
            "İrritabl Bağırsak Sen.",
            "Adölesan",
            "Değişken (Sulu/Kabızlık)",
            "Tamamen Normal",
            "Karın ağrısı dışkılama ile rahatlar",
          ],
        ],
      },
    ],
  },
  clinicalApproach: {
    title: "Klinik Yaklaşım: Öykü ve Fizik Muayene",
    icon: ClipboardList,
    intro: `Kronik ishali olan bir çocuğun diagnostik sürecinde, ampirik ilaç tedavisine başlamadan önce kapsamlı bir tıbbi anamnez ve sistemik fizik muayene yapılması, gereksiz ve yüksek maliyetli invaziv tetkiklerin önlenmesindeki en kritik ve ilk basamaktır. Temel hedef, ishalin yapısal bir organ patolojisinden (malabsorbsiyon, inflamasyon, enzim defekti) mi yoksa geçici bir diyet hatası/fonksiyonel bir süreçten (CNSD, IBS) mi kaynaklandığını birbirinden kesin çizgilerle ayırmaktır.`,
    subTabs: [
      {
        id: "anamnesis",
        title: "Anamnez ve Diyet Sorgusu",
        text: `Dışkının fiziksel özellikleri ve ishalin paternine dair detaylar tanı için en değerli ipuçlarını barındırır.\n\n1. Dışkının Rengi, Kıvamı ve İçeriği: Dışkının sulu, fışkırır tarzda olması ve karında aşırı gaz sancısına eşlik etmesi karbonhidrat malabsorbsiyonuna bağlı ozmotik bir ishalin tipik bulgusudur. Dışkının son derece kötü kokulu, macun veya kil kıvamında, soluk renkli ve suyun yüzeyinde yüzer tarzda (klozete yapışan ve zor temizlenen) olması ağır bir yağ malabsorbsiyonunu (steatore) işaret eder (Çölyak hastalığı, kistik fibrozis, safra tuzu eksikliği). Dışkıda makroskopik kan ve yoğun mukus varlığı tartışmasız bir şekilde inflamatuvar patolojileri (IBD, alerjik kolit, invaziv bakteriyel ajanlar) düşündürür. İshalin sadece uyanık olunan saatlerde görülmesi, gece uykuyu asla bölmemesi ve içinde sindirilmemiş sebze (havuç, mısır) parçacıkları barındırması kronik non-spesifik ishal (Toddler's diarrhea) tablosunun imza belirtisidir.\n\n2. Diyet Günlüğü ve Spesifik Gıda İlişkileri: Ailelerden hastanın üç günlük detaylı diyet ve dışkılama günlüğünü (stool diary) tutmaları istenmelidir. Günlük tüketilen karbonhidrat içerikli içeceklerin hacmi, elma, armut ve erik suyu gibi yüksek oranda fruktoz ve emilemeyen sorbitol içeren içeceklerin miktarı mililitre cinsinden hesaplanmalıdır. Ailelerin ishali kesmek için yanlış bir inanışla diyetteki yağ oranını sıfıra indirmesi bağırsak geçiş hızını daha da artıracağından dikkatle sorgulanmalıdır. Semptomların inek sütü formülüne başlandıktan sonra ortaya çıkması inek sütü proteini alerjisini veya galaktozemi/GGM tablolarını; diyete buğday, makarna, bisküvi gibi tahılların eklenmesiyle kademeli olarak başlaması ise çölyak hastalığını akla getirmelidir.\n\n3. Başlangıç Zamanı, Seyir ve Çevresel Faktörler: Doğumdan hemen sonra mekonyum çıkışı olmaksızın sıvı ishal başlaması konjenital transport defektlerini (CoDEs), yakın zamanda geçirilmiş endemik bölge seyahati paraziter hastalıkları (Giardia, Amipli dizanteri), ve yakın zamanlı (son 4-6 hafta içinde) geniş spektrumlu antibiyotik kullanım öyküsü Clostridium difficile enfeksiyonunu kuvvetle destekler.`,
      },
      {
        id: "redflags",
        title: "Büyüme Persentilleri ve Alarm (Red Flag) Bulguları",
        text: `Gelişmekte olan biyolojik organizma, kronik ishal ataklarına maruz kaldığında kısa süre içinde sistemik belirtiler göstermeye başlar. Çocuğun boy, ağırlık ve baş çevresi standart büyüme eğrilerine (persentil kartlarına) titizlikle işaretlenmelidir. Hastanın büyüme hızının duraklaması veya mevcut persentil eğrisinden aşağı doğru (örneğin 50. persentilden 10. persentile) düşmesi durumu (Failure to Thrive - Büyüme/Gelişme Geriliği) kesin ve tartışılamaz bir organik patoloji göstergesidir ve klinik yaklaşımda en büyük "red flag" (kırmızı bayrak) bulgusudur. Bir çocuğun boy ve kilosunun normal seyrinde artması, şiddetli malabsorbsiyonları ve yapısal ishalleri büyük ölçüde dışlamaya yardımcı olur.\n\nKlinisyenin hızlıca spesifik ve ileri invaziv araştırma yapmasını zorunlu kılan Alarm (Red Flag) Semptom ve Bulguları şunlardır:\n\n• İlerleyici kilo kaybı veya boy uzamasında duraklama: Sindirim ve emilimin bozulduğu majör malabsorbsiyon hastalıklarını (Çölyak, IBD, Kistik Fibrozis) gösterir.\n\n• Geceleri uykudan uyandıran veya uyku sırasında devam eden ishal: Gıda alımından bağımsız, otonom çalışan sekretuvar patolojileri (örn. VIPoma) veya ciddi bağırsak hasarını gösterir. Toddler ishali veya IBS asla uykuyu bölmez.\n\n• Makroskopik kan ve mikroskopik lökosit varlığı: Epitelyal bütünlüğün bozulduğunu ve vasküler yatağın açığa çıktığını kanıtlar (İnflamasyon/Enfeksiyon/Alerji).\n\n• Ateş, şiddetli karın ağrısı, kusma veya dehidratasyon şoku: Sistemik inflamasyon, cerrahi batın veya fulminan kolit tablolarının acil işaretleridir.\n\n• Perianal Hastalık Bulguları: Muayenede saptanan cilt katlantıları (skin tags), kompleks fissürler veya perianal fistüller, Crohn hastalığı için son derece tipiktir ve tanı koydurucudur.\n\n• Spesifik Besin Eksikliği Cilt Bulguları: Ağız, anüs ve göz çevresinde gelişen soyulmalı döküntüler (Periorifisyal dermatit) şiddetli çinko eksikliğini (Acrodermatitis enteropathica veya sekonder kayıp) işaret eder. Alt ekstremitede eritema nodosum veya piyoderma gangrenozum gibi lezyonlar IBD'nin ekstraintestinal bulgularıdır.\n\n• Genel Sistemik Bulgular: Protein kaybeden enteropatiye bağlı olarak damar içi onkotik basıncın düşmesi sonucu gelişen ekstremite ödemleri, kas kitlesi kaybı (gluteal ve temporal bölgelerde), solukluk ve gecikmiş puberte gibi bulgular kapsamlı bir kronik malnütrisyonun fiziksel yansımalarıdır.`,
      },
    ],
  },
  tests: {
    title: "Birinci Basamak Tetkikler ve Yorumlama",
    icon: TestTube,
    intro: `Detaylı bir öykü alımı ve fizik muayeneden sonra, büyüme geriliği saptanan veya alarm bulguları barındıran çocuklarda tanısal test algoritması genellikle invaziv olmayan dışkı (gaita) analizleri ile başlar ve ardından şüphelenilen mekanizmaya yönelik spesifik kan tetkikleri ile derinleştirilir.`,
    subTabs: [
      {
        id: "stool",
        title: "1. Dışkı (Gaita) Testlerinin Yorumlanması",
        text: `Dışkı analizleri, bağırsağın lümenindeki biyokimyasal ve mikrobiyolojik ortamı yansıtan invaziv olmayan ilk tanısal penceredir.\n\n• Fekal Ozmotik Açık (FOG - Fecal Osmotic Gap): İshalin hücre içi sekresyondan mı (sekretuvar) yoksa dışarıdan alınan lümen içi bir maddeden mi (ozmotik) kaynaklandığını net bir biçimde ayırt etmek için dışkıdaki majör katyonlar olan sodyum ve potasyum seviyeleri ölçülerek hesaplanır. Kolon lümenindeki içeriğin sistemik serum osmolalitesiyle hızla dengelendiği fizyolojik gerçeğinden yola çıkılarak formül şu şekilde kurulur: FOG = 290 - 2 × (Dışkı Na+ + Dışkı K+). Bu denklemdeki 290 değeri serum osmolalitesini temsil eder. Bulunan farkın (açığın) 50 mOsm/kg, çoğunlukla da 100 mOsm/kg'dan büyük olması, lümende sodyum ve potasyum dışında, suyu tutan ölçülememiş bir solütün (sindirilememiş laktoz, laktuloz, magnezyum vb.) varlığına işaret ederek kesin bir şekilde ozmotik ishal tanısını koydurur. Farkın 50 mOsm/kg'ın altında olması ise ishal sıvısının tamamen iyonlardan ibaret olduğunu göstererek sekretuvar ishal lehine güçlü kanıt sunar.\n\n• Dışkı pH'sı ve İndirgeyici Maddeler (Reducing Substances): Karbonhidrat metabolizma bozukluklarını saptamada çok değerlidir. Normal fizyolojide süt çocuklarında dışkı pH'sı yaşamın ilk 30 gününden sonra 6.0'ın üzerindedir. pH'nın 5.5'in altına düşmesi, ince bağırsakta emilemeyen karbonhidratların kolondaki mikrobiyota tarafından fermente edilerek kısa zincirli yağ asitlerine dönüştürüldüğüne işaret eder. Clinitest kullanılarak bakılan indirgeyici maddelerin pozitif olması dışkıda yapısal olarak okside olabilen glikoz, galaktoz, fruktoz ve laktoz gibi şekerlerin malabsorbe edildiğini gösterir. (Klinik İpucu: Sükroz kimyasal yapısı gereği bir indirgeyici şeker değildir; bu nedenle sükraz-izomaltaz eksikliğinde asit hidrolizi yapılmadan Clinitest ile saptanamaz).\n\n• Fekal Kalprotektin ve Lökosit Testleri: Fekal kalprotektin, nötrofillerin sitoplazmasında bolca bulunan çinko ve kalsiyum bağlayıcı bir proteindir. Mukozal hasar durumunda lümene salınır ve dışkıda stabilitesini çok iyi korur. Organik inflamatuvar bağırsak hastalıklarını (IBD), fonksiyonel dismotilite ishallerinden (IBS vb.) ayırmada kullanılan altın standart bir inflamasyon biyobelirteci olarak yerini almıştır.\n\n• Mikrobiyolojik İnceleme: Patojenik bakteriyel kültür (Salmonella, Shigella, Yersinia, enteropatojenik Escherichia coli, Campylobacter), parazit ve ova mikroskopisi, özellikle daha yüksek duyarlılığa sahip Giardia ve Cryptosporidium spesifik antijen testleri rutin algoritmanın bir parçasıdır. Gaita toksin analizi ile Clostridium difficile varlığı taranmalıdır.\n\n• Fekal Yağ (72-Saatlik Koleksiyon) ve Fekal Elastaz: Steatore (yağlı ishal) şüphesi varlığında kesin miktar tayini için altın standart, 72 saat süreyle biriktirilen dışkıda yapılan kantitatif ölçümdür. Testin doğru yorumlanabilmesi için hastanın test öncesinde yeterli yağ (bebeklerde >30 g/gün, büyüklerde >50 g/gün) tüketmesi şarttır. Emilinemeyen yağın, toplam yağ alımının bebeklikten sonra %5'ini aşması patolojiktir. Pankreatik ekzokrin fonksiyonların sağlamlığını değerlendirmek için ölçülen düşük fekal elastaz seviyesi, Kistik Fibrozis veya Shwachman-Diamond sendromu lehine yorumlanır.`,
      },
      {
        id: "blood",
        title: "2. Kan Testleri ve Nutrisyonel Belirteçler",
        text: `Kan tahlilleri, dışkı tetkiklerinin bölgesel bulgularını sistemik düzeyde tamamlar ve malnütrisyonun şiddetini sayısal olarak ortaya koyar.\n\n• Çölyak Serolojisi: Diyete gluten içeren gıdalar eklendikten sonra büyüme geriliği veya kronik ishal ile başvuran tüm çocuklarda ilk basamak test, kanda Doku Transglutaminaz (TTG) IgA antikor seviyesidir. Ancak pediatrik popülasyonda (özellikle çölyak hastalarında) selektif IgA eksikliği oldukça sık görüldüğünden, testin yalancı negatif (false-negative) çıkmasını önlemek adına her zaman eş zamanlı olarak serum Total IgA seviyesi ölçülmelidir.\n\n• Tam Kan Sayımı (CBC) ve Akut Faz Reaktanları: Düşük MCV ile seyreden mikrositik anemi, kronik kan kaybını veya proksimal ince bağırsak hasarına bağlı demir malabsorbsiyonunu (çölyak veya IBD) gösterir. Yüksek eozinofil sayısı alerjik enteropatileri veya inatçı paraziter enfeksiyonları akla getirir. Eritrosit Sedimentasyon Hızı (ESR) ve C-Reaktif Protein (CRP) değerlerindeki yükseklik sistemik bir inflamasyonun (örneğin Crohn hastalığı) devam ettiğini gösterir.\n\n• Metabolik ve Biyokimyasal Paneller: Elektrolit imbalanslarının tespiti hayati önem taşır. Konjenital klorür ishalinde kanda derin bir hipokloremik ve hipokalemik metabolik alkaloz saptanırken; sodyum ishalinde veya masif ishal dehidratasyonunda metabolik asidoz gelişir. Protein kaybını (protein-losing enteropathy) doğrulamak için serum albümin ve daha kısa yarı ömre sahip olan pre-albümin düzeylerine bakılır. Yağ malabsorbsiyonu durumunda koagülasyon kaskadını etkileyen K vitamini eksikliğine ikincil olarak uzamış protrombin zamanı (PT) ile birlikte A, D, ve E vitamin seviyelerinde düşüklük tespit edilir.`,
      },
    ],
  },
  advancedCare: {
    title: "Kesin Tanı ve İleri Bakımın Kısa Özeti",
    icon: Microscope,
    text: `Birinci basamak kan ve gaita testleri sonucunda organik, inflamatuvar veya yapısal mukozal bir patolojiden şüpheleniliyorsa, spesifik tedavi ve invaziv tetkikler için hasta zaman kaybetmeden pediatrik gastroenteroloji ünitesine refere edilir. İleri düzey teşhis ve bakım süreci multidisipliner bir yaklaşım gerektirir.\n\n• Endoskopi ve Histopatolojik Biyopsi: İnce bağırsak ve kolon mukozasının direkt olarak gözlenmesi ve kesin doku tanısının konulması için sedasyon altında alt ve üst gastrointestinal endoskopi uygulanır. Duodenumdan alınan biyopsilerde normal mimarinin kaybolarak villöz atrofi ve kript hiperplazisinin gelişmesi ile birlikte epitel içi lenfosit infiltrasyonu izlenmesi Çölyak hastalığını kanıtlar. Buna karşın lenfosit artışı olmaksızın sadece villöz atrofi görülmesi Otoimmün enteropatiyi; epitel yüzeyinde mikroskobik gözyaşı damlası görünümünde kümelenmeler (tufts) saptanması ise Tufting enteropatisini doğrular. Kolonoskopik inceleme ise vasküler patern kaybını, yapısal inflamasyonu, kript apselerini ve Crohn hastalığına özgü non-kazeifiye granülomları saptayarak IBD tanısını kesinleştirir.\n\n• Nefes Testleri (Breath Tests): İnce bağırsakta emilemeyen karbonhidratların (laktoz, sükroz) kolondaki bakteriler tarafından sindirilmesi sonucu açığa çıkan hidrojen gazının nefes havasında ölçülmesine dayanır. Karbonhidrat emilim kusurlarını ve anatomik kör döngülere ikincil gelişen ince bağırsakta aşırı bakteri üremesi (SIBO) tablosunu kanıtlamak için güvenle kullanılır.\n\n• İleri Genetik Panel Testleri: Yenidoğan döneminde başlayan inatçı ve hayatı tehdit eden ishallerde (CODEs), elektron mikroskobu ve genetik sekanslama hayati rol oynar. Mikrovillus inklüzyon hastalığı (MYO5B geni), Konjenital tufting enteropatisi (EpCAM geni), IPEX sendromu (FOXP3 geni) gibi sendromların kesin ve nihai tanısı moleküler genetik analizler ile konur.\n\n• Medikal, Beslenme ve Cerrahi Yönetim Prensipleri: İlerleyici ishali kesmek ve katastrofik "ishal-malnütrisyon kısır döngüsünü" kırmak için öncelikle hastanın hemodinamik stabilitesi ve parenteral yolla nutrisyonel durumu güvence altına alınır. Konjenital epitelial defektlerde (MVID, Tufting enteropati) ve cerrahi olarak kısa bağırsak sendromu gelişen olgularda gastrointestinal kanal emilim yapamadığından hastalar Total Parenteral Beslenme (TPN) rejimine bağlanır. Bu hastalarda nihai tedavi ince bağırsak transplantasyonudur. IPEX ve otoimmün enteropatilerde bağışıklık sistemini baskılamak için yüksek doz kortikosteroidler, takrolimus, infliksimab gibi immünosupresifler veya hematopoietik kök hücre nakli (HSCT) uygulanır. Çölyak hastalığında ise ömür boyu tavizsiz uygulanan katı bir glutensiz diyet, histolojik iyileşme ve semptomların tamamen kaybolması için tek başına yeterlidir. GGM gibi spesifik karbonhidrat transport defekti tablolarında ise, karbonhidrat içermeyen ve sadece fruktoz bazlı modifiye bebek formülleri verilerek semptomlar kontrol altına alınır.`,
  },
  pblCases: {
    title: "Probleme Dayalı Öğrenim (PDÖ) Uygulamaları",
    icon: Stethoscope,
    intro: `Kronik ishalin karmaşık klinik senaryolarında, teorik bilgilerin pratiğe ve gerçek hasta yönetimine entegrasyonu, hastalık sendromlarının basamak basamak çözümlenmesi ile mümkündür. Nelson pediatri ilkelerine uygun şekilde tasarlanmış, klinik akıl yürütme becerisini geliştirecek 2 PDÖ (Probleme Dayalı Öğrenim) vakası aşağıda sunulmuştur:`,
    cases: [
      {
        id: "case1",
        title:
          "Vaka 1: Büyüme Geriliği Olmayan Uyanık Saat İshali (Toddler's Diarrhea)",
        stages: [
          {
            title: "Aşama 1: Klinik Prezentasyon ve İlk Değerlendirme",
            text: "Yirmi dört aylık erkek çocuk, yaklaşık 4 aydır aralıksız devam eden günde ortalama 5-6 kez sulu, macun kıvamında ve zaman zaman içinde tam sindirilmemiş havuç, mısır, bezelye gibi sebze parçacıkları barındıran dışkılama şikayeti ile birinci basamak pediatri polikliniğine getiriliyor. Aile çok endişeli ancak çocuğun neşesinin yerinde olduğunu belirtiyor. Anamnezde ateş, kusma, iştahsızlık veya karın ağrısı öyküsü bulunmuyor. Klinisyenin ısrarlı soruları üzerine anne, çocuğun gece yatağa yattıktan sonra sabaha kadar uyanmadığını, gece bezi ıslatmadığını ve ishalin sadece çocuk uyanıkken ve hareket halindeyken gerçekleştiğini net bir dille ifade ediyor.",
            reasoning:
              'Hekim bu aşamada öyküdeki temel ayrıcı noktaları yakalar. İshalin 14 günden uzun sürmesi kronik ishal tanısını doğrular. Dışkıda sindirilmemiş gıda parçalarının görülmesi emilim defektinden ziyade bağırsak geçiş hızının (motilitenin) çok arttığını düşündürür. En kritik "red flag" noktası olan ishalin gece uykuyu bölmemesi durumu, bağırsak epitelinden otonom sıvı sızmasına neden olan organik sekretuvar patolojileri dışlar; fonksiyonel bir dismotilite tablosunu öne çıkarır.',
          },
          {
            title: "Aşama 2: Fiziksel Muayene, Büyüme Eğrisi ve Diyet Analizi",
            text: "Fizik muayenede çocuğun vital bulguları tamamen normal saptanır. Karın muayenesinde herhangi bir organomegali, kitle veya hassasiyet palpe edilmez; karın distansiyonu yoktur. Kas kitlesi, cilt altı yağ dokusu ve deri bütünlüğü sağlamdır (ödem veya periorifisyal dermatit yok). Klinisyen, çocuğun yaşa göre boy ve ağırlık persentillerini standart eğrilere işaretlediğinde, değerlerin 6. aydan beri stabil olarak 50. ile 75. persentil çizgisini takip ettiğini, büyüme eğrisinde hiçbir kırılma veya düşüş olmadığını saptar. Detaylı diyet sorgulamasında çocuğun günde yaklaşık 5 biberon (ortalama 1.2 litre) %100 elma suyu ve şekerli içecek tükettiği öğrenilir. Üstelik aile ishali durdurmak gibi tamamen yanlış bir inançla diyetteki katı yağları (tereyağı, zeytinyağı vb.) son iki haftada tamamen kısıtlamıştır.",
            reasoning:
              "Büyüme persentillerinin stabilitesinin kanıtlanması ile doktor organik, enflamatuvar veya malabsorptif tüm ağır süreçleri (Çölyak, IBD, Kistik fibrozis vb.) pratikte dışlamış olur. Yüksek meyve suyu alımı bağırsağa muazzam bir sorbitol ve fruktoz yükü bindirerek lümende sıvıyı hapseden ozmotik bir ishal yaratmaktadır. Ayrıca diyetten yağın tamamen çıkarılması, mideden boşalmayı ve bağırsak geçişini yavaşlatan normal gastrokolik refleks kontrolünü ortadan kaldırarak geçiş süresini daha da hızlandırmıştır.",
          },
          {
            title: "Aşama 3: Rasyonel Test Kullanımı ve Tanı",
            text: "Hekim bu aşamada invaziv ve pahalı testlere (Endoskopi, spesifik antikorlar vb.) gitmeye gerek duymaz. Aileyi rahatlatmak ve paraziter/inflamatuvar sinsi bir süreci tamamen ekarte etmek için sadece tam kan sayımı ve basit gaita testi (kültür, Giardia antijeni, lökosit, gizli kan) ister. Test sonuçları tamamen normal döner; anemi saptanmaz, gaitada enflamasyon hücresi veya kan yoktur.",
            reasoning:
              "Alarm bulgusu olmayan ve büyümesi normal devam eden bir çocukta test algoritmasının sınırlı tutulması temel prensiptir. Tüm bulgular ışığında kesin tanı; Çocukluk Çağının Kronik Non-spesifik İshali (Toddler's Diarrhea) olarak konur.",
          },
          {
            title: "Aşama 4: Kanıta Dayalı Tedavi Yönetimi",
            text: 'Hekim aileye çocuğun tamamen sağlıklı olduğunu, bağırsağında yapısal hiçbir hastalık bulunmadığını ve gereksiz antibiyotik kullanımının bağırsak florasını daha da bozacağını ayrıntılı bir şekilde açıklar. Tedavi olarak medikal ilaç yerine tıbbi diyetetik bir yaklaşım olan "4 Fs" konsepti başlatılır:\n\n1. Fruit Juice / Fluid (Sıvı ve Meyve Suyu Kısıtlaması): Elma suyu gibi emilemeyen sorbitol ve yüksek fruktoz içeren sıvılar evden tamamen uzaklaştırılır. Sıvı alımı (su ve süt) çocuğun fizyolojik ihtiyacı olan günlük 100 mL/kg seviyesine geri çekilir.\n\n2. Fat (Yağ Artırımı): Bağırsak geçiş hızını fizyolojik seviyelere yavaşlatmak amacıyla diyetteki lipid oranı tekrar artırılır; diyete tam yağlı süt, zeytinyağı ve tereyağı eklenir.\n\n3. Fiber (Lif Desteği): Bağırsakta aşırı kalan suyu emip bir sünger gibi dışkıyı katılaştıracak olan lifli gıdalar (yulaf, kepek, tam buğday) diyete kademeli olarak ilave edilir.\n\nDört hafta sonraki kontrolde çocuğun dışkılaması günde bir kez, şekilli ve normal formda izlenir.',
            reasoning:
              "Bu aşamada medikal ilaçlar yerine sadece diyetetik değişikliklerle bağırsak motilitesi ve sıvı yükü düzenlenmiş, çocuğun sorunu invaziv işlem olmadan başarıyla çözülmüştür.",
          },
        ],
      },
      {
        id: "case2",
        title:
          "Vaka 2: Ek Gıdaya Geçiş Sonrası Başlayan Malabsorbsiyon ve Büyüme Geriliği",
        stages: [
          {
            title: "Aşama 1: Klinik Prezentasyon ve İlk Değerlendirme",
            text: "On sekiz aylık kız çocuk, son 6 aydır giderek şiddetlenen halsizlik, kronik iştahsızlık, karında belirgin bir gerginlik hissi (şişlik) ve kötü kokulu ishal şikayetleriyle kliniğe getiriliyor. Annenin tarifine göre dışkı adeta macun gibi yapışkan (klozete veya beze sıvaşan), çok bol hacimli ve soluk renklidir. Anamnez derinleştirildiğinde, bebeğin ilk 6 ay sadece anne sütü aldığı ve o periyotta kilo alımının mükemmel olduğu öğreniliyor. Şikayetlerin bebek altıncı ayını doldurup ek gıdalara (bebe bisküvisi, buğday bazlı tahıl mamaları ve şehriye çorbası) başlatıldıktan birkaç ay sonra sinsice ve yavaş yavaş ortaya çıktığı fark ediliyor.",
            reasoning:
              'Dışkının tarif edilen "kötü kokulu, çok hacimli, soluk renkli ve yapışkan" nitelikleri, klasik bir yağ malabsorbsiyonunun (steatore) doğrudan kanıtıdır. Gelişen şikayetlerin anne sütü alırken değil de, doğrudan diyete tahıl (buğday proteini) eklenmesiyle zaman olarak örtüşmesi tanısal bir aydınlanma noktasıdır ve hekimi gluten duyarlılığı ihtimaline yaklaştırır.',
          },
          {
            title: 'Aşama 2: Fiziksel Muayene ve "Kırmızı Bayrak" Analizi',
            text: "Fiziksel incelemede vücut ısısı normal, ancak çocuğun genel görünümü apatik (ilgisiz) ve soluk (konjonktival ve palmar solukluk). Karın muayenesinde ileri derecede distandü (davul gibi şişkin) ve gazlı bir batın saptanıyor; ancak asit veya karaciğer/dalak büyümesi (organomegali) yok. Çocuğun el ve ayakları incecik kalmış, gluteal bölgede ve bacaklarda cilt altı yağ dokusu erimiş (kas atrofisi). Büyüme eğrisi incelendiğinde; doğumdan 6. aya kadar 50. persentili mükemmel şekilde izleyen ağırlık eğrisinin o tarihten itibaren yavaşladığı, son birkaç aydır ise hızla aşağı doğru kırılarak 3. persentilin dahi altına düştüğü, boy eğrisinin de sekonder olarak 10. persentile gerilediği saptanıyor.",
            reasoning:
              'Boy ve kilo persentillerindeki dramatik düşüş (Failure to Thrive) hastadaki en ciddi "red flag" bulgusudur. Cilt altı yağ dokusunun kaybı (malnütrisyon), solukluk (anemi) ve devasa karın şişliği (emilemeyen materyalin gaz fermantasyonu ve hipoproteinemi), bağırsak yüzey alanının ciddi yıkıma uğradığını gösterir.',
          },
          {
            title:
              "Aşama 3: Birinci Basamak Tetkik Stratejisi ve Doğru Yorumlama",
            text: "Tam kan sayımında Hemoglobin düzeyi: 8.5 g/dL (Düşük), MCV: 68 fL (Ağır mikrositik) saptanıyor. Gaitada gizli kan negatif, parazit negatif, lökosit görülmüyor; ancak istenen 72 saatlik dışkı koleksiyonunda yağ atılımının total alınan yağın %15'ini geçtiği (belirgin fekal yağ pozitifliği) görülüyor. Klinisyen, aneminin demir emilim bozukluğuna, ishalin ise gluten duyarlılığına bağlı olabileceğinden şüphelenerek spesifik serolojik testler ister. Test sonuçları:\n\n• Serum Total IgA: Yaşa göre normal referans aralıklarında (50 mg/dL)\n• Anti-Doku Transglutaminaz (TTG) IgA Antikoru: Üst referans limitinin (>10 katı) üzerinde, aşırı pozitif saptanır.",
            reasoning:
              "Hastadaki mikrositik anemi, bağırsakta demirin emildiği ana yer olan duodenumun harap olduğunu kanıtlar. TTG IgA testi istenirken aynı kan örneğinden Total IgA seviyesinin istenmesi hayati önem taşır; zira eğer hastada doğuştan selektif IgA eksikliği olsaydı TTG IgA seviyesi (hasta çölyak olsa bile) sıfır çıkacak ve hekim yanlışlıkla hastalığı dışlayacaktı. TTG IgA'nın bu kadar yüksek bir titrede pozitif olması büyük ölçüde tanı koydurucudur.",
          },
          {
            title: "Aşama 4: İleri Bakım, Kesin Tanı ve Diyet Modifikasyonu",
            text: 'Hekim serolojik teşhisi doku seviyesinde kesinleştirmek için çocuğu derhal Pediatrik Gastroenteroloji ünitesine sevk eder. Çocuğa, glutensiz diyete henüz geçilmeden (bağırsak florası henüz iyileşmeden) üst gastrointestinal sistem endoskopisi yapılır. Alınan duodenal biyopsi örneklerinin patolojik incelemesinde; normalde fırça gibi uzun olan bağırsak villuslarının tamamen silindiği (villöz atrofi), epitel hücreleri arasında masif miktarda lenfosit biriktiği (intraepitelyal lenfositoz) ve doku yenilenme çabasına bağlı olarak kript hiperplazisinin geliştiği (Marsh sınıflandırması tip 3 lezyon) raporlanır.\n\nAileye hastalığın genetik temelli olduğu ve tedavisinin ilaç değil, ömür boyu sürecek "sıfır toleranslı" glutensiz diyet (buğday, arpa ve çavdarın her türlü türevinin diyetten çıkarılması) olduğu diyetisyen eşliğinde detaylıca anlatılır. Glutensiz diyetin sıkı bir şekilde uygulanmaya başlanmasından yalnızca birkaç hafta sonra çocuğun ishal şikayetleri ve huzursuzluğu tamamen geriler. Altı ay sonraki poliklinik kontrolünde karın şişliğinin yok olduğu, aneminin düzeldiği ve çocuğun kaybettiği ayları telafi edecek şekilde inanılmaz bir "yakalama büyümesi" (catch-up growth) göstererek yeniden kendi normal 50. persentil eğrisine tırmandığı izlenir.',
            reasoning:
              "Organik malabsorbsiyonun altın standart kesin doku tanısı konmuştur: Çölyak Hastalığı (Gluten-Sensitif Otoimmün Enteropati). Tanının histopatolojik olarak kanıtlanması ve yaşam boyu diyet tedavisinin uygulanması ile hasta tamamen sağlığına kavuşmuştur.",
          },
        ],
      },
    ],
  },
  conclusion: {
    title: "Sonuç",
    icon: CheckCircle,
    text: `Çocukluk ve ergenlik çağında kronik ishale yaklaşım, detaylı bir tıbbi anamnez, kusursuz bir fizik muayene ve büyüme persentillerinin büyüteç altına alındığı kademeli ve son derece rasyonel bir süreçtir. "Kırmızı bayrak" olarak adlandırılan alarm bulgularının (kilo kaybı, bağırsak kanaması, gece uykudan uyandıran şiddetli ishal) tamamen yokluğunda, büyümesi ve boy atması kusursuz olan bir çocukta ilk etapta mutlaka fonksiyonel ve diyetetik bozukluklar, bilhassa çocukluk çağının kronik non-spesifik ishali (Toddler's diarrhea) düşünülmeli; hastalar medikal ilaçların ve invaziv tetkiklerin getireceği risklerden korunarak yalnızca beslenme modifikasyonları (4 Fs kuralı) ile yönetilmelidir.

Ancak öyküde büyüme geriliği saptanan, konjenital yenidoğan döneminde başlayan, dışkı incelemesinde gizli kan, iltihap hücreleri veya fekal ozmotik açığın yüksek bulunduğu hastalarda durum tam tersidir. Bu profildeki hastalarda hücre içi yapısal hasara yol açan ciddi malabsorbsiyon (örneğin Çölyak hastalığı, Kistik fibrozis), genetik transport defektleri (Konjenital klorür ishali, MVID) veya dokuyu harap eden inflamatuvar hastalık (İnflamatuvar bağırsak hastalıkları, İnvaziv enfeksiyonlar) olasılıkları hiç vakit kaybedilmeden birinci basamak dışkı ve kanda spesifik antikor/genetik testleriyle derinlemesine araştırılmalıdır. Gelişme çağındaki dinamik bir çocuğun organlarındaki besin emilim defektlerinin zeka ve fiziksel yapıda kalıcı sekeller bırakmaması adına, ishalin altındaki temel hücresel etiyolojinin net bir biçimde ayrıştırılması ve erken dönemde hedefe yönelik spesifik immünosupresif, diyetetik veya parenteral destek rejimlerinin uygulanması pediatrik gastroenterolojinin en temel prensibidir.

Eğitici ve multidisipliner bir vizyonla yaklaşıldığında, çocuklarda kronik ishal yönetimi hem mortaliteyi ortadan kaldıran hem de hastanın tüm potansiyel büyümesini garanti altına alan hayat kurtarıcı bir klinik süreçtir.`,
  },
  references: {
    title: "Kaynaklar (Works cited)",
    icon: BookMarked,
    items: [
      "Chronic Diarrhea, https://sa1s3.patientpop.com/assets/docs/68682.pdf",
      "Approach to diarrhoeal disorders in children - PMC, https://pmc.ncbi.nlm.nih.gov/articles/PMC8804427/",
      "How to Do in Persistent Diarrhea of Children?: Concepts and Treatments of Chronic Diarrhea ... - PMC, https://pmc.ncbi.nlm.nih.gov/articles/PMC3746051/",
      "DIARRHEAL (DIARRHOEAL) DISEASES - PMC - NIH, https://pmc.ncbi.nlm.nih.gov/articles/PMC7252245/",
      "Çocuklarda Kronik İshale Yaklaşım - Çocuk Dergisi - Dergi Park, https://dergipark.org.tr/tr/pub/jchild/article/799917",
      "Acute Gastroenteritis in Children - Nelson Textbook of Pediatrics, https://elsevier-elibrary.com/contents/fullcontent/15188720/epubcontent_v2/OEBPS/B9781437707557003328.htm",
      "How to Do in Persistent Diarrhea of Children?: Concepts and Treatments of Chronic Diarrhea - ResearchGate, https://www.researchgate.net/publication/256447085_...",
      "Chronic Diarrhea - Clinical GateClinical Gate, https://clinicalgate.com/chronic-diarrhea/",
      "DOI: 10.1542/pir.33-5-207 2012;33;207 Pediatrics in Review Garrett C. Zella and Esther J. Israel Chronic Diarrhea in Children ht - University of Calgary, https://papers.ucalgary.ca/paediatrics/assets/chronic-diarrhea-pir-2012.pdf",
      "Evaluation of Chronic Diarrhea - AAFP, https://www.aafp.org/afp/2011/1115/p1119",
      "Chronic Diarrhea in Children - ResearchGate, https://www.researchgate.net/publication/224879430_Chronic_Diarrhea_in_Children",
      "Pathophysiology, Evaluation, and Management of Chronic Watery Diarrhea - PMC, https://pmc.ncbi.nlm.nih.gov/articles/PMC5285476/",
      "Chronic Diarrhea | Pediatric Annals - Slack Journals, https://journals.healio.com/doi/10.3928/0090-4481-19820101-08",
      "Chronic diarrhea, https://www.medicine.uodiyala.edu.iq/uploads/Pediatrics/siminars/mariam%20hatam.pdf",
      "Pocket Pediatrics, https://tailieuykhoamienphi.com/wp-content/uploads/2021/10/kupdf.net_pocketpediatrics.pdf",
      "Journal of the Korean Medical Association, https://jkma.org/journal/Table.php?xn=JKMA-55-546.xml&id=",
      "Diarrhea, Toddler's, KidsHealth, https://chopib.staywellsolutionsonline.com/Bedside/22,39030",
      "Chronic Diarrhea: | Patient Care Online, https://www.patientcareonline.com/view/chronic-diarrhea",
      "Chronic Diarrhea & Malabsorption, https://medicine.uodiyala.edu.iq/wp-content/uploads/2022/12/childhood-Diarrhea-Malabsorption.pdf",
      "Reduced sodium/proton exchanger NHE3 activity causes congenital sodium diarrhea - PMC, https://pmc.ncbi.nlm.nih.gov/articles/PMC4634371/",
      "pediatric secrets, https://repository.unar.ac.id/jspui/bitstream/123456789/5333/1/PEDIATRIC%20SECRETS%202021.pdf",
      "Pediatric Acute Gastroenteritis Overview | PDF | Diarrhea | Cholera - Scribd, https://www.scribd.com/document/456856827/Gastroenteritis-Pediatrics-Nelson-s",
      "Chronic Diarrhea | Obgyn Key, https://obgynkey.com/chronic-diarrhea/",
      "Chronic diarrhoea in children - IRIS Unina, https://www.iris.unina.it/retrieve/...",
      "Cracking the Codes for Congenital Diarrhea and Enteropathies (CODEs): A Case Report and Review - PMC, https://pmc.ncbi.nlm.nih.gov/articles/PMC11636582/",
      "(PDF) Cracking the Codes for Congenital Diarrhea and Enteropathies (CoDEs): A Case Report and Review - ResearchGate, https://www.researchgate.net/...",
      "Congenital Tufting Enteropathy: Biology, Pathogenesis and Mechanisms - MDPI, https://www.mdpi.com/2077-0383/10/1/19",
      "Microvillus Inclusion Disease - Symptoms, Causes, Treatment | NORD, https://rarediseases.org/rare-diseases/microvillus-inclusion-disease/",
      "Chapter 330 - Nelson Textbook of Pediatrics, https://elsevier-elibrary.com/contents/fullcontent/...",
      "Neonatal Enteropathies: Defining the Causes of Protracted Diarrhea of Infancy - naspghan, https://naspghan.org/files/documents/pdfs/...",
      "Paediatric Congenital Enteropathies: Clinical and Histological Review - PMC, https://pmc.ncbi.nlm.nih.gov/articles/PMC12025760/",
      "Congenital diarrhea - KEGG DISEASE - genome.jp, https://www.genome.jp/dbget-bin/www_bget?ds:H01174",
      "Rare Disease Database - Regulations.gov, https://downloads.regulations.gov/FDA-2016-P-2955-0204/attachment_19.pdf",
      "(PDF) Congenital Chloride Diarrhea: A Case Report - ResearchGate, https://www.researchgate.net/publication/26467534_...",
      "Congenital chloride diarrhea misdiagnosed as pseudo-Bartter syndrome - PMC - NIH, https://pmc.ncbi.nlm.nih.gov/articles/PMC3872595/",
      "Genetic diagnosis by whole exome capture and massively parallel DNA sequencing - PNAS, https://www.pnas.org/doi/10.1073/pnas.0910672106",
      "Differential diagnosis of perinatal Bartter, Bartter and Gitelman syndromes | Clinical Kidney Journal | Oxford Academic, https://academic.oup.com/ckj/article/14/1/36/5939819",
      "Reduced sodium/proton exchanger NHE3 activity causes congenital sodium diarrhea - Oxford Academic, https://academic.oup.com/hmg/article-pdf/24/23/6614/17262316/ddv367.pdf",
      "Autoimmune Enteropathy: An Updated Review with Special Focus on Stem Cell Transplant Therapy - PMC, https://pmc.ncbi.nlm.nih.gov/articles/PMC8260026/",
      "The Meal Plan to Relieve Toddler Diarrhea - Sehat kahani, https://sehatkahani.com/the-meal-plan-to-relieve-toddler-diarrhea/",
      "Chronic diarrhea in children - PubMed, https://pubmed.ncbi.nlm.nih.gov/419014/",
      "Diarrhea (Case 103) - Okuda and Nelson's Emergency Medicine Certifying Exam Review Illustrated - Cambridge University Press & Assessment, https://www.cambridge.org/...",
      "Evaluation of Chronic Diarrhea - JoyRich Medical Center, https://www.joyrichhealthcarecenters.com/wp-content/uploads/2020/11/diarrhea-evaluation-2020.pdf",
      "Diarrhea, Toddler's - PMC - NIH, https://pmc.ncbi.nlm.nih.gov/articles/PMC7151931/",
      "Tips for parents dealing with toddler's diarrhea - Swedish, https://blog.swedish.org/swedish-blog/tips-for-parents-dealing-with-toddlers-diarrhea",
      "Toddler's Diarrhea - Riley Children's Health, https://www.rileychildrens.org/health-info/toddlers-diarrhea",
    ],
  },
};

const keys: string[] = Object.keys(contentData);

// --- INTERACTIVE BİLEŞEN (TYPESCRIPT EKLENTİLİ) ---

interface InteractiveCaseProps {
  caseData: PblCase;
}

const InteractiveCase: React.FC<InteractiveCaseProps> = ({ caseData }) => {
  const [stage, setStage] = useState<number>(0);
  const [showReasoning, setShowReasoning] = useState<boolean>(false);

  const nextStage = () => {
    if (stage < caseData.stages.length - 1) {
      setStage((s) => s + 1);
      setShowReasoning(false);
    } else {
      setStage(caseData.stages.length);
    }
  };

  const resetCase = () => {
    setStage(0);
    setShowReasoning(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-8 overflow-hidden">
      <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-4 flex justify-between items-center">
        <h3 className="text-xl font-bold text-indigo-900">{caseData.title}</h3>
        {stage === caseData.stages.length && (
          <button
            onClick={resetCase}
            className="text-sm text-indigo-600 hover:text-indigo-800 underline"
          >
            Vakayı Baştan Başlat
          </button>
        )}
      </div>

      <div className="p-6">
        <div className="space-y-6 mb-6">
          {caseData.stages.slice(0, stage).map((s, idx) => (
            <div key={idx} className="opacity-70">
              <h4 className="font-semibold text-lg text-gray-700 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                {s.title}
              </h4>
              <div className="mt-2 text-gray-600 whitespace-pre-wrap pl-7">
                {s.text}
              </div>
              <div className="mt-3 bg-gray-50 border-l-4 border-gray-300 p-3 ml-7 rounded-r">
                <p className="font-semibold text-sm text-gray-600 mb-1">
                  Klinik Akıl Yürütme:
                </p>
                <p className="text-gray-600 text-sm whitespace-pre-wrap">
                  {s.reasoning}
                </p>
              </div>
            </div>
          ))}
        </div>

        {stage < caseData.stages.length && (
          <div className="border-l-4 border-indigo-500 pl-5 py-2 animate-fade-in">
            <h4 className="font-bold text-lg text-indigo-900 flex items-center">
              <ArrowRight className="w-5 h-5 mr-2 text-indigo-500" />
              {caseData.stages[stage].title}
            </h4>
            <div className="mt-3 text-gray-800 whitespace-pre-wrap leading-relaxed">
              {caseData.stages[stage].text}
            </div>

            {!showReasoning ? (
              <button
                onClick={() => setShowReasoning(true)}
                className="mt-6 flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow transition-colors"
              >
                <Lightbulb className="w-5 h-5 mr-2" />
                Klinik Akıl Yürütmeyi ve Öğrenme Hedefini Gör
              </button>
            ) : (
              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-5 animate-fade-in shadow-inner">
                <h5 className="font-bold text-blue-900 flex items-center mb-2">
                  <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
                  Klinik Akıl Yürütme ve Öğrenme Hedefi
                </h5>
                <p className="text-blue-900 whitespace-pre-wrap leading-relaxed">
                  {caseData.stages[stage].reasoning}
                </p>

                <button
                  onClick={nextStage}
                  className="mt-5 flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition-colors ml-auto"
                >
                  {stage === caseData.stages.length - 1
                    ? "Vakayı Tamamla"
                    : "Sonraki Aşamaya Geç"}
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            )}
          </div>
        )}

        {stage === caseData.stages.length && (
          <div className="mt-8 p-5 bg-green-50 border border-green-200 text-green-800 rounded-xl font-bold flex items-center justify-center text-lg shadow-sm">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
            Tebrikler, vaka analizi başarıyla tamamlandı.
          </div>
        )}
      </div>
    </div>
  );
};

// --- ANA APP BİLEŞENİ ---

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(keys[0]);
  const [activeSubTabs, setActiveSubTabs] = useState<Record<string, string>>(
    {}
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const currentSection = contentData[activeTab];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setIsSidebarOpen(false);
  };

  const handleSubTabChange = (tabKey: string, subId: string) => {
    setActiveSubTabs((prev) => ({ ...prev, [tabKey]: subId }));
  };

  const renderTable = (tableData: SubTab) => {
    if (!tableData.headers || !tableData.rows) return null;

    return (
      <div className="mt-6 border border-gray-200 rounded-lg shadow-sm bg-white w-full max-w-full overflow-hidden box-border">
        <table className="w-full table-fixed border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {tableData.headers.map((h, i) => (
                <th
                  key={i}
                  className="p-1 sm:p-2 border border-gray-200 text-left font-bold text-gray-800 uppercase tracking-tighter text-[9px] sm:text-[10px] md:text-xs lg:text-sm align-top whitespace-normal"
                  style={{ wordBreak: "break-word", hyphens: "auto" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="p-1 sm:p-2 border border-gray-200 text-gray-800 text-[9px] sm:text-[10px] md:text-xs lg:text-sm leading-tight align-top whitespace-normal"
                    style={{ wordBreak: "break-word", hyphens: "auto" }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderContent = () => {
    if (activeTab === "pblCases" && currentSection.cases) {
      return (
        <div className="animate-fade-in pb-12">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {currentSection.intro}
          </p>
          {currentSection.cases.map((caseData) => (
            <InteractiveCase key={caseData.id} caseData={caseData} />
          ))}
        </div>
      );
    }

    if (activeTab === "references" && currentSection.items) {
      return (
        <div className="animate-fade-in bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full overflow-hidden">
          <ul className="space-y-4 text-sm text-gray-600">
            {currentSection.items.map((item, idx) => (
              <li
                key={idx}
                className="pl-4 border-l-4 border-gray-300 py-1 break-words whitespace-normal"
                style={{ wordBreak: "break-word" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="animate-fade-in w-full">
        {currentSection.intro && (
          <p className="text-gray-700 text-lg leading-relaxed mb-6 whitespace-pre-wrap">
            {currentSection.intro}
          </p>
        )}

        {currentSection.text && (
          <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
            {currentSection.text}
          </div>
        )}

        {currentSection.subTabs && (
          <div className="mt-8 w-full">
            <div className="flex flex-wrap gap-2 mb-6 bg-gray-100 p-1.5 rounded-xl">
              {currentSection.subTabs.map((sub) => {
                const isActive =
                  (activeSubTabs[activeTab] ||
                    (currentSection.subTabs &&
                      currentSection.subTabs[0].id)) === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => handleSubTabChange(activeTab, sub.id)}
                    className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-white text-indigo-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    }`}
                  >
                    {sub.title.split(":")[0]}
                  </button>
                );
              })}
            </div>

            <div className="bg-white p-3 sm:p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-full overflow-hidden box-border">
              {currentSection.subTabs.map((sub) => {
                const isActive =
                  (activeSubTabs[activeTab] ||
                    (currentSection.subTabs &&
                      currentSection.subTabs[0].id)) === sub.id;
                if (!isActive) return null;

                return (
                  <div
                    key={sub.id}
                    className="animate-fade-in w-full max-w-full box-border"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b">
                      {sub.title}
                    </h3>
                    {sub.isTable ? (
                      renderTable(sub)
                    ) : (
                      <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap break-words">
                        {sub.text}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0
      `}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-900 leading-tight">
            Çocuklarda Kronik İshale Yaklaşım
          </h1>
          <button
            className="md:hidden text-gray-500"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {keys.map((key) => {
              const Icon = contentData[key].icon;
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => handleTabChange(key)}
                  className={`w-full flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mr-3 ${
                      isActive ? "text-indigo-600" : "text-gray-400"
                    }`}
                  />
                  <span className="text-left">{contentData[key].title}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t text-xs text-gray-500 text-center">
          Medikal Kılavuz İnteraktif Uygulaması
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full w-full relative max-w-full">
        <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 focus:outline-none p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-2 font-semibold text-gray-800 truncate">
            {currentSection.title}
          </span>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full max-w-5xl mx-auto p-4 md:p-8 box-border">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
                <currentSection.icon className="w-8 h-8 mr-4 text-indigo-600 flex-shrink-0" />
                <span className="break-words">{currentSection.title}</span>
              </h2>
              <div className="h-1 w-20 bg-indigo-500 mt-4 rounded-full"></div>
            </div>

            {renderContent()}
          </div>
        </div>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `,
        }}
      />
    </div>
  );
}
