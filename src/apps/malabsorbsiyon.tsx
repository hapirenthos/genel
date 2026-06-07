React;
import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  Stethoscope,
  Microscope,
  BrainCircuit,
  CheckSquare,
  Library,
  Menu,
  X,
  ChevronRight,
  AlertCircle,
  Activity,
  ChevronDown,
  LucideIcon,
} from "lucide-react";

// --- TYPESCRIPT INTERFACES ---

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizProps {
  questions: Question[];
}

interface Step {
  label: string;
  content: string;
}

interface Case {
  id: number;
  title: string;
  steps: Step[];
}

interface CasesProps {
  cases: Case[];
}

interface TableProps {
  headers: string[];
  rows: Record<string, string>[];
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

// --- VERİ MODELİ (ZERO DATA LOSS) ---
const docData = {
  title:
    "Malabsorpsiyon Sendromları: Etiyopatogenez, Yaş Gruplarına Göre Klinik Yaklaşım, Birinci Basamak Yönetimi ve İnteraktif Değerlendirme",
  physiology: {
    title: "Sindirim ve Emilim Fizyolojisi ile Malabsorpsiyon Patogenezi",
    content1:
      "Gastrointestinal sistemde sindirim ve emilim süreçleri; besinlerin mekanik olarak karıştırılması, enzim sentezi ve lümene sekresyonu, fırçamsı kenarda enzimatik aktivite, mukoza bütünlüğünün korunması, hücresel düzeyde transport, intestinal kan akımı, otonomik motilite ve bağırsak mikrobiyomunun son derece kompleks bir etkileşimi sonucunda gerçekleşmektedir. Fizyolojik koşullar altında insan proksimal ince bağırsağı, makro ve mikro besin ögelerini muazzam bir verimlilikle dolaşıma katar. Örneğin, fizyolojik postprandiyal hızlarda proksimal duodenuma perfüze edilen besinlerin, distal duodenuma (yaklaşık 20 cm'lik bir mesafe) ulaşmadan önce trigliserit formundaki yağların yüzde sekseninin, karbonhidratların yüzde altmışının ve proteinlerin yüzde ellisinin emildiği klinik çalışmalarla gösterilmiştir. Bu yüksek emilim kapasitesinin çeşitli patojenik mekanizmalarla bozulması, klinik spektrumu oldukça geniş olan malabsorpsiyon sendromlarına zemin hazırlamaktadır.",
    content2:
      "Besin emilimi üç temel aşamada gerçekleşmekte olup, malabsorpsiyon sendromlarının sınıflandırılması ve etiyopatogenetik analizi genellikle bu aşamalardan hangisinde yapısal veya fonksiyonel bir disfonksiyon olduğuna dayanır. Birinci aşama olan luminal faz, besinlerin mekanik olarak parçalanmasını ve pankreatik ile biliyer sindirim enzimlerinin aktivitesini içerir. Yağların, proteinlerin ve karbonhidratların intraluminal hidrolizi bu aşamada gerçekleşirken, safra tuzları yağların çözünürlüğünü (solubilizasyon) artırarak enzimatik hidroliz sürecini doğrudan destekler. Luminal fazdaki defektler sıklıkla pankreatik ekzokrin yetmezlik (lipaz ve proteaz eksikliği), safra asidi sentez veya sekresyon bozuklukları (hepatik fonksiyon bozukluğu, biliyer obstrüksiyon veya terminal ileum rezeksiyonuna bağlı safra tuzu kaybı) ve gastrik asit sekresyonunun azalması gibi durumlardan kaynaklanır. İkinci aşama olan mukozal faz, fırçamsı kenar (brush border) enzimleri tarafından sindirimin sonlandırıldığı ve besinlerin monomerik son ürünlerinin enterositler tarafından hücre içine aktif veya pasif transportla alındığı aşamadır. Bu faz, hücresel düzeyde sağlıklı bir mukozal membran bütünlüğü gerektirir. Çölyak hastalığı gibi mukozal villöz atrofi ile giden inflamatuar durumlar veya disakkaridaz eksiklikleri (örneğin konjenital veya sekonder laktaz eksikliği) ile spesifik taşıyıcı protein defektleri bu faza ait klasik patolojilerdir. Üçüncü ve son aşama olan postabsorptif faz ise, enterosit içine alınan besinlerin sağlam bir vasküler kan akımı ve lenfatik sistem aracılığıyla sistemik dolaşıma aktarılmasını ifade eder. İntestinal lenfanjiektazi, şilomikron retansiyon hastalığı ve abetalipoproteinemi bu postabsorptif fazın bozukluklarına klasik örneklerdir.",
    content3:
      "Malabsorpsiyon hastalıklarının etiyopatogenetik mekanizmalara göre sınıflandırılması, altta yatan nedene yönelik spesifik tedavilerin planlanmasında büyük önem taşır. Mekanik parçalanmanın yetersiz olması (çiğneme problemleri, azalmış antral kontraktilite), üst gastrointestinal geçiş süresinin fizyolojik emilime izin vermeyecek kadar kısa olması (dumping sendromu) veya kısa bağırsak sendromu gibi intestinal mukozanın kantitatif olarak kritik bir şekilde azalması klinik tabloyu derinleştiren temel fizyopatolojik varyantlardır.",
    table: [
      {
        phase: "Luminal Faz",
        process:
          "Mekanik parçalama, safra ile solubilizasyon, pankreatik hidroliz",
        pathology:
          "Pankreatik ekzokrin yetmezlik (Kistik fibrozis, Shwachman-Diamond), Safra sekresyon bozuklukları",
      },
      {
        phase: "Mukozal Faz",
        process:
          "Fırçamsı kenar enzim aktivitesi enterosite uptake (hücresel alım)",
        pathology:
          "Çölyak hastalığı, Laktaz eksikliği, Kısa bağırsak sendromu, İnfeksiyöz enteritler",
      },
      {
        phase: "Postabsorptif Faz",
        process:
          "Vasküler transport, lenfatik dolaşıma aktarım, şilomikron sekresyonu",
        pathology:
          "Abetalipoproteinemi, İntestinal lenfanjiektazi, Kronik mezenter iskemi",
      },
    ],
  },
  ageGroups: {
    title: "Yaş Gruplarına Göre Ayırıcı Tanı ve Etiyolojik Spektrum",
    intro:
      "Malabsorpsiyon sendromlarının etiyolojisi, hastanın gelişim evresine, genetik yatkınlıklarına ve maruz kaldığı çevresel faktörlere bağlı olarak yaş grupları arasında belirgin farklılıklar gösterir. Klinisyenin hastanın yaşına spesifik olarak odaklanması, yüzlerce olası hastalık barındıran ayırıcı tanı listesini daraltmak açısından kritik bir öneme sahiptir.",
    groups: [
      {
        title: "Yenidoğan ve Süt Çocuğu Dönemi Patolojileri",
        content:
          "Bu erken dönemde ortaya çıkan malabsorpsiyon kliniği sıklıkla genetik mutasyonlara bağlı konjenital defektlerden kaynaklanır. Kronik ishal, büyüme geriliği (failure to thrive) ve spesifik gelişimsel anomaliler en sık karşılaşılan prezantasyon şekilleridir. Kistik Fibrozis (KF), beyaz ırkta 1/2.500 ile 1/3.500 sıklığında görülen, otozomal resesif geçişli ve yaşam süresini doğrudan etkileyen multisistemik bir hastalıktır. Kistik fibrozis transmembran regülatör (CFTR) proteinini kodlayan 7q31.2 kromozom bölgesindeki gen mutasyonu sonucunda klor kanal fonksiyonları bozulur ve koyu kıvamlı sekresyonlar pankreatik kanalları tıkayarak ekzokrin yetmezliğe yol açar. Yenidoğan döneminde (0-30 gün) ozmotik mekanizmayla sulu ve yağlı ishal tablosu ile belirti verirken, 1-24 aylık bebeklik döneminde belirgin steatore (yağlı ishal) ile karşımıza çıkar. Kistik fibrozisten sonra çocukluk çağında pankreatik ekzokrin yetmezliğin en sık görülen ikinci genetik nedeni Shwachman-Diamond sendromudur. Bu sendrom, KF'den farklı olarak sadece pankreası etkilemekle kalmaz; aynı zamanda kemik iliği disfonksiyonuna bağlı olarak nötrofil fonksiyon bozuklukları, ağır nötropeni, anemi veya pansitopeni gibi hematolojik bulgularla karakterizedir. Eşlik eden iskelet sistemi deformiteleri tanıyı destekler.\n\nYenidoğan döneminin bir diğer önemli ancak nadir (dünya çapında literatürde bildirilmiş 100'den fazla vaka) hastalığı Abetalipoproteinemidir. Mikrozomal trigliserit transfer proteinini (MTTP) kodlayan gende meydana gelen mutasyonlara bağlı olarak otozomal resesif geçiş gösterir. MTTP eksikliğinde enterositler sentezledikleri lipitleri şilomikronlara yükleyerek lenfatik sisteme aktaramazlar. Hastalık yaşamın ilk aylarında abdominal distansiyon, steatore, şiddetli malnütrisyon ve büyüme geriliği ile başlar. Yağda eriyen A, D, E ve K vitaminlerinin sistemik dolaşıma geçememesi nedeniyle aylar ve yıllar içerisinde hücresel hasarlar birikir. İlerleyen dönemlerde spinoserebellar ataksi, arefleksi, dizartri, periferal nöropati, kas zayıflığı, iskelet sisteminde pes kavus ve kifoskolyoz gibi Friedreich ataksisini andıran nörolojik ve ortopedik yıkımlar gelişir. Oküler tutulumda ise retinanın ışığa duyarlı katmanlarının dejenerasyonuna bağlı olarak retinitis pigmentosa, nistagmus, strabismus ve oftalmopleji izlenir; bu durum tam görme kaybı ile sonuçlanabilir. Yenidoğan döneminde ayrıca, karbonhidrat malabsorpsiyonuna yol açan ve anne sütü veya formül mama alımı sonrası şiddetli sulu ishal, gaz ve asidoz tablosu yaratan konjenital laktaz eksikliği veya sükraz-izomaltaz eksikliği gibi enzimatik patolojiler de akılda tutulmalıdır.",
      },
      {
        title: "Çocukluk ve Ergenlik Dönemi Patolojileri",
        content:
          "Bebeklikten çocukluğa geçişle birlikte diyete yeni besinlerin eklenmesi, otoimmün mekanizmaların tetiklenmesine ve çevresel patojen maruziyetinin artmasına neden olur. Çölyak hastalığı, genetik yatkınlığı (HLA-DQ2/DQ8 pozitifliği) olan bireylerde gluten alımı ile tetiklenen otoimmün aracılı bir enteropatidir. Erken çocukluktan ergenliğe kadar geniş bir yelpazede bulgu verebilen bu hastalıkta kronik ishal, açıklanamayan kilo kaybı, karın ağrısı, anemi, gecikmiş ergenlik ve boy kısalığı (büyüme geriliği) klasik klinik semptomları oluşturur. İnflamatuar sürecin ince bağırsakta yarattığı villöz atrofi, yüzey alanını daraltarak genel bir mukozal faz malabsorpsiyonuna yol açar. Bu dönemde ayrıca kreş ve okul ortamlarındaki temaslara bağlı olarak rotavirüs veya Giardia gibi enfeksiyöz ajanların yarattığı enteritler, fırçamsı kenar enzimlerinin geçici olarak yıkanmasına bağlı sekonder (geçici) laktaz intoleransı ve malabsorpsiyon tablolarına neden olabilir. Daha nadir durumlarda, primer immün yetmezlikler, eozinofilik gastrointestinal hastalıklar veya monogenik otoinflamatuar hastalıklar, mukozal bariyeri bozarak bağırsak lümenine dışkıyla ciddi protein kaybına neden olan protein kaybettiren enteropatileri tetikleyebilir.",
      },
      {
        title: "Erişkin Dönemi Patolojileri",
        content:
          "Erişkinlerde genetik hastalıkların geç bulguları, otoimmün enteropatilerin komplikasyonları ve kronik sistemik enfeksiyonlar etiyolojik spektrumu oluşturur. Whipple hastalığı, Tropheryma whipplei adlı bakterinin neden olduğu, nadir görülen ancak ölümcül olabilen sistemik enfeksiyöz bir malabsorpsiyon sendromudur. Bakteriler ince bağırsak lamina propriasını infiltre eden makrofajların içinde birikerek lenfatik drenajı tıkar ve postabsorptif mekanizmalarla ciddi yağ malabsorpsiyonuna neden olurlar. Hastalar kliniğe genellikle kronik ishal, şiddetli kilo kaybı, asimetrik gezici artralji ve ileri evrelerde demans veya miyokloni gibi nörolojik bulgularla başvururlar. Öte yandan, erişkin yaşta tanı alan veya glutensiz diyet uyumu kötü olan kronik çölyak hastalarında sürekli mukozal inflamasyona bağlı olarak ciddi osteoporoz, dermatitis herpetiformis (ekstansör yüzeylerde kaşıntılı, büllöz otoimmün cilt döküntüsü) ve immünolojik disregülasyona bağlı fonksiyonel hiposplenizm riskleri dramatik olarak artış gösterir.",
      },
      {
        title: "Geriatrik Dönem Patolojileri",
        content:
          'Yaşlanma süreci, sindirim sisteminin otonomik, anatomik ve mikrobiyolojik yapısında malabsorpsiyona yatkınlık oluşturan bir dizi fizyolojik değişikliği beraberinde getirir. İnce Bağırsak Aşırı Bakteri Çoğalması (SIBO), özellikle mide asit salgısının azalması (aklorhidri) ve toplu bakım merkezlerinde (huzurevleri) yaşamanın getirdiği çevresel floranın değişimi neticesinde geriatrik popülasyonda insidansı belirgin şekilde artan bir durumdur. Aşırı çoğalan bakteriler, karaciğerden salgılanan konjuge safra tuzlarını lümende erken dekonjuge ederek yağların solubilizasyonunu bozar, mukozal inflamasyonu tetikler ve geçirgenlik artışına yol açarak ciddi steatore ve B12 vitamini eksikliğine neden olur. Yaşlanmanın doğal fizyolojik bir sonucu olarak miyenterik pleksus nöronlarında ve duyusal nöronlarda meydana gelen azalmalar, kortikal incelme ve ventriküler genişleme gibi santral nörolojik değişimler ile tükürük salgısındaki azalmalar ve ağız/diş sağlığı problemleri birleştiğinde çiğneme, yutma ve intestinal motilite süreçleri sekteye uğrar.\n\nGeriatrik malabsorpsiyonun en önemli vasküler nedenlerinden biri kronik mezenter iskemidir. Ateroskleroz veya arteriyel tromboembolizm kaynaklı olarak splanknik yatağa giden kan akımının yetersiz kalması sonucu, hastalar yemeklerden kısa bir süre sonra başlayan ve saatlerce süren karın ağrısı (abdominal anjina) yaşarlar. Bu ağrı beklentisi hastalarda "yemek yeme korkusu" oluşturur ve gıda alımının azalması mukozal perfüzyon bozukluğuna eklenerek şiddetli kilo kaybı ve malnütrisyon ile sonuçlanır. Anatomik olarak kolonik iskemi atakları en sık splenik fleksura (sol kolon) ve rektosigmoid bileşkede görülür ve akut sol alt kadran ağrısı ile kanlı ishal tablolarına yol açabilir.',
      },
    ],
    table: [
      {
        group: "Yenidoğan / Süt Çocuğu",
        diag: "Kistik Fibrozis, Shwachman-Diamond, Abetalipoproteinemi, Enzim Eksiklikleri",
        patho:
          "Konjenital mutasyonlar, pankreatik yetmezlik, lipit transport defektleri",
      },
      {
        group: "Çocukluk / Ergenlik",
        diag: "Çölyak Hastalığı, Enfeksiyöz Enteritler, Sekonder Laktaz Eksikliği",
        patho:
          "Otoimmün mukozal hasar, enfeksiyon sonrası epitel yıkımı, villöz atrofi",
      },
      {
        group: "Erişkin",
        diag: "Whipple Hastalığı, Erişkin Çölyak Komplikasyonları, Crohn Hastalığı",
        patho:
          "Sistemik bakteriyel infiltrasyon, fonksiyonel hiposplenizm gelişimi",
      },
      {
        group: "Geriatrik (>65 Yaş)",
        diag: "SIBO, Kronik Mezenter İskemi, Yaşa Bağlı Fizyolojik İnhibisyonlar",
        patho:
          "Erken safra dekonjugasyonu, vasküler perfüzyon defekti, motilite kaybı",
      },
    ],
  },
  clinical: {
    title: "Öykü ve Fizik Muayenede Dikkat Edilmesi Gerekenler",
    intro:
      "Malabsorpsiyon sendromlarının teşhisinde detaylı bir anamnez ve baştan aşağı sistemik bir fizik muayene, eksikliği duyulan spesifik makro ve mikro besin ögelerinin hücresel düzeyde yarattığı hasarların saptanmasını sağlar. Sindirim sistemi hastalıklarında belirtiler genellikle ishal ve kilo kaybı etrafında odaklansa da, sekonder sistemik bulgular etiyolojik teşhisin anahtarıdır.",
    sections: [
      {
        subtitle: "Klinik Öykü İpuçları",
        content:
          "Hastanın ishal paterninin sorgulanması ilk basamaktır. İshalin karakteri; yağlı (steatore), sulu (ozmotik veya sekretuvar) veya inflamatuar (kanlı/mukuslu) olup olmadığı patolojinin lokalizasyonuna işaret eder. Kötü kokulu, tuvalet yüzeyinde yüzen, yapışkan ve temizlenmesi zor, açık renkli dışkı formasyonu, yağ malabsorpsiyonunun (pankreatik yetmezlik, biliyer obstrüksiyon veya abetalipoproteinemi) klasik göstergesidir. Gastrointestinal sistem dışı belirtiler de dikkatle sorgulanmalıdır. Hastada açıklanamayan kilo kaybı, kronik yorgunluk, bebeklik döneminde persentil eğrilerinden düşme (gelişim geriliği), tekrarlayan alt ve üst solunum yolu enfeksiyonları (Kistik Fibrozis veya kemik iliği yetmezliği sendromları şüphesi) veya ilerleyici nörolojik semptomların varlığı kaydedilmelidir. Hastanın yaşam biçimi, sosyal ve psikolojik öyküsü tanısal ipuçları sunar. Örneğin, bir huzurevinde yaşayan demanslı bir hastada kronik ishal öncelikle SIBO veya enfeksiyöz patolojileri düşündürürken; yemeklerden korkma, istemsiz kilo kaybı ve şiddetli postprandiyal karın ağrısı öyküsü veren hipertansif bir yaşlıda öncelikli şüphe kronik mezenter iskemidir.",
      },
      {
        subtitle: "Fizik Muayene Bulguları ve Sistemik Etkileri",
        content:
          "Malabsorpsiyon, emilemeyen vitaminlerin, minerallerin ve eser elementlerin dokulardaki depolarının tükenmesiyle birlikte kendine has sistemik fizik muayene bulguları verir. Eksikliği sık görülen maddeler arasında B12 vitamini, kalsiyum, demir, folat, D vitamini, magnezyum, karotenoidler, tiamin, bakır ve selenyum bulunur.",
        list: [
          "Nörolojik Muayene: B12 vitamini eksikliğine bağlı subakut kombine dejenerasyon (propriyosepsiyon ve vibrasyon kaybı) veya E vitamini eksikliğine bağlı spinoserebellar ataksi, arefleksi ve periferik nöropati aranmalıdır. Abetalipoproteinemi vakalarında bu bulgulara ilaveten kranial sinir tutulumları; strabismus (şaşılık), nistagmus (istemsiz göz hareketleri) ve oftalmopleji eşlik eder.",
          "İskelet ve Kas Sistemi: Kalsiyum, magnezyum ve D vitamini emilim bozukluğuna sekonder olarak gelişen tetani (Chvostek ve Trousseau belirtileri), osteopeni, ergenlikte büyüme geriliği ve kemik deformiteleri saptanabilir. Abetalipoproteinemi vakalarında kas zayıflığı iskelet gelişimini bozarak ciddi kifoskolyoz (sırtın ve omurganın eğriliği), lordoz ve pes kavus (yüksek kavisli ayak) gibi ortopedik deformitelere yol açar.",
          "Dermatolojik ve Oküler Muayene: Çölyak hastalığına spesifik olarak ekstansör yüzeylerde (omuz, kalça, dirsek ve dizlerde) simetrik olarak yerleşen, aşırı kaşıntılı ve su toplayan büllöz lezyonlar (dermatitis herpetiformis) saptanabilir. Oküler muayenede A vitamini eksikliğine bağlı olarak gece körlüğü (niktalopi), kseroftalmi veya abetalipoproteinemide izlenen, retinanın fotoreseptör tabakasının ilerleyici dejenerasyonuyla karakterize retinitis pigmentosa gözlemlenebilir.",
          "Hematolojik Bulgular: Mukozal demir ve folat emiliminin bozulmasına veya kan kaybına bağlı solukluk, koilonişi (kaşık tırnak), glossit (düzleşmiş, kırmızı dil) ve pürpüralar (K vitamini eksikliğine veya diseritropoeze bağlı kanama diyatezi) gözden kaçırılmamalıdır.",
        ],
      },
    ],
  },
  lab: {
    title:
      "Birinci Basamak Tetkikler, Laboratuvar Analizi ve Klinik Yorumlanması",
    intro:
      "Birinci basamakta hekimin başvuracağı laboratuvar testleri, semptomların ardındaki fizyolojik mekanizmayı aydınlatmaya, malabsorpsiyonun makro besin tipini (yağ, karbonhidrat veya protein) belirlemeye ve invaziv biyopsi prosedürlerine yönlendirme yapmaya hizmet eder.",
    sections: [
      {
        subtitle: "Gaita İncelemeleri: Redüktan Madde, pH ve Fekal Elastaz",
        content:
          "Karbonhidrat malabsorpsiyonunun değerlendirilmesinde dışkıda redüktan madde ve pH ölçümü temel köşe taşlarıdır. Normal şartlarda laktaz, maltaz ve sükraz gibi fırçamsı kenar enzimleri ince bağırsakta karbonhidratları monosakkaritlere parçalayarak emilmelerini sağlar. Eğer mukozal hasar (çölyak, rotavirüs enteriti) veya konjenital enzim eksikliği varsa, emilemeyen bu şekerler kalın bağırsağa geçer. Kolonda bulunan mikrobiyom, yüksek ozmotik yüke sahip bu şekerleri fermente ederek kısa zincirli yağ asitleri, laktik asit ve gaz (hidrojen, karbondioksit) üretir. Bu asidik metabolitler dışkı pH'sını dramatik şekilde düşürür (genellikle <5.5). Dışkıda glukoz, fruktoz, laktoz veya maltoz gibi indirgeyici şekerlerin varlığı, Clinitest tabletleri veya Benedict solüsyonu ile tespit edilir. Test sonucunda solüsyonun yeşil-sarıdan turuncu-kırmızıya dönmesi redüktan madde pozitifliği olarak yorumlanır ve şiddetli malabsorpsiyonu destekler. Ancak dikkat edilmesi gereken bir husus; eğer kolondaki bakteriyel fermentasyon çok şiddetli ise, şekerlerin tamamı asite dönüştürülüp tüketildiğinden dışkıda indirgen şeker kalmayabilir ve test yalancı negatif sonuç verebilir.\n\nYağ malabsorpsiyonunu değerlendirmek ve pankreatik ekzokrin fonksiyonu ölçmek için fekal elastaz düzeyine bakılmalıdır. Yağlı ishal (steatore) şikayeti ile başvuran bir hastada, dışkıdaki fekal elastazın spesifik bir sınır değerin (tipik olarak 200 mg/g dışkı) altında çıkması, pankreasın yeterli lipaz/proteaz üretemediğini kanıtlar ve etiyolojiyi Kistik Fibrozis, Shwachman-Diamond sendromu veya kronik pankreatit olarak sınırlandırır. Testin güvenilirliği yüksek olmakla birlikte, hastada eş zamanlı olarak çok yüksek hacimli sulu (sekretuvar/ozmotik) ishal mevcutsa, dışkının seyreltici etkisine (dilüsyon) bağlı olarak fekal elastaz seviyesi yalancı düşük çıkabilir, bu klinik tuzak akılda tutulmalıdır.",
      },
      {
        subtitle: "Çölyak Serolojisi ve Yorumlanması",
        content:
          'Çölyak hastalığının serolojik taraması, birinci basamakta doku transglutaminaz antikorları (Anti-tTG) ve Total IgA seviyelerinin ölçümüne dayanır. Anti-tTG IgA, bağışıklık sisteminin genetik olarak yatkın bireylerde gluten proteinine tepki olarak ince bağırsak mukozasında (lamina propriada) ürettiği çok spesifik bir otoantikordur. Doku transglutaminaz IgA\'nın yüksek çıkması, mukozal hasarın aktif bir şekilde devam ettiğini, bağışıklık sisteminin glutene saldırdığını ve villöz atrofinin varlığını güçlü bir şekilde gösterir. Bu değerin yüksekliği, kronik ishal, anemi, büyüme geriliği, osteoporoz ve dermatitis herpetiformis gibi klinik bulgularla tam bir korelasyon içindedir. Testin negatif çıkması kanda saptanabilir düzeyde otoimmün aktivite olmadığını gösterir; ancak klinisyenin dikkat etmesi gereken büyük bir istisna vardır: Çölyak hastalarında genel popülasyona kıyasla "selektif IgA eksikliği" insidansı oldukça yüksektir. Hastada temel IgA üretimi yoksa, tTG IgA antikorları da sentezlenemeyeceği için hastalık şiddetli olsa bile test yanlış negatif sonuç verecektir. Bu nedenle tTG IgA istenirken her zaman Total IgA düzeyi de istenmeli, eğer Total IgA düşükse tTG IgG veya deamide gliadin peptidi (DGP) IgG gibi IgG bazlı antikor panellerine geçilmelidir.',
      },
      {
        subtitle:
          "Periferik Kan Yaymasının Tanısal Gücü ve Hematolojik Bulgular",
        content:
          "Malabsorpsiyon hastalıklarında periferik yayma (kan frotisi), sadece besin eksikliğine bağlı mikrositer veya makrositer anemileri göstermekle kalmaz; aynı zamanda spesifik hastalıkların genetik ve metabolik izlerini hücresel düzeyde taşıyan eşsiz ve uygun maliyetli bir tanı aracıdır.",
        list: [
          'Akantositler (Acanthocytosis): Kırmızı kan hücrelerinin hücresel membran lipit kompozisyonunun ve protein yapısının bozulması sonucunda yüzeylerinde düzensiz aralıklarla yerleşmiş, farklı boyutlarda ve asimetrik dikenimsi çıkıntılar oluşması durumudur. Akantositler, abetalipoproteinemi tanısı için karakteristik ve çok güçlü bir periferik kan bulgusudur. Mikroskop altında değerlendirilirken, hücre yüzeyinde düzenli ve eşit aralıklı, simetrik çıkıntılara sahip olan "echinocyte" (burr hücresi) yapılarından ayırt edilmeleri şarttır. Akantosit yapısındaki anormal eritrositler morfolojik esnekliklerini kaybettikleri için dalak dokusundan (spleno-retiküler sistem) geçerken takılırlar ve makrofajlar tarafından yıkıma uğrarlar; bu hücresel tuzaklanma süreci klinik olarak kronik hemolitik anemi tablosu yaratır.',
          "Howell-Jolly Cisimcikleri ve Hiposplenizm: Kemik iliğinde eritrositlerin olgunlaşması sırasında nükleusun dışarı atılması gerekir; bu süreçte hücre içinde kalan küçük, yuvarlak ve koyu bazofilik boyanan nükleer DNA kalıntılarına Howell-Jolly cisimcikleri denir. Sağlıklı bir bireyde dalaktaki kırmızı pulpa makrofajları bu kusurlu hücreleri dolaşımdan çeker veya hücre zarına zarar vermeden içindeki nükleer kalıntıyı söküp alır. Periferik kanda bu inklüzyonların görülmesi, dalağın filtrasyon fonksiyonunun bozulduğunun (hiposplenizm) patognomonik kanıtıdır. Erişkin başlangıçlı veya uzun süre tedavisiz kalmış Çölyak hastalığı olgularında, bağışıklık sisteminin disregülasyonuna bağlı olarak fonksiyonel hiposplenizm gelişebilmektedir. Periferik yaymada trombositoz (>600x10^9/L), hedef hücreleri (target cells), stomatositler ve bol miktarda Howell-Jolly cisimciği gözlenen kronik ishalli bir hastada çölyak hastalığı komplikasyonu akla gelmelidir. Bu hastaların yönetimindeki en kritik adım; dalak fonsiyonlarının kaybına bağlı olarak Pnömokok, Meningokok, Haemophilus influenzae tip b ve Capnocytophaga canimorsus gibi kapsüllü bakterilerin neden olabileceği hayatı tehdit eden fulminan sepsisi önlemek için derhal profilaktik aşılama programının başlatılmasıdır.",
        ],
      },
      {
        subtitle: "Moleküler Analizler: Whipple Hastalığında PCR ve Biyopsi",
        content:
          "Whipple hastalığının tanısı geleneksel olarak klinik şüphe üzerine yapılan endoskopik duodenum biyopsilerine dayanır. Alınan mukozal örneklerin mikroskobik incelemesinde lamina propriayı infiltre eden makrofajların içinde Periyodik Asit-Schiff (PAS) boyası ile koyu pembe-kırmızı reaksiyon veren bazofilik inklüzyonların görülmesi klasik tanı yöntemidir. Bu PAS-pozitif inklüzyonlar, elektron mikroskobunda 0.25 mikrometre boyutlarında, karakteristik trilaminar (üç katmanlı) membrana sahip Tropheryma whipplei bakterilerinin hücre duvarı kalıntılarıdır. Ancak hastaların yaklaşık yarısında PAS boyaması negatif kalabilmektedir. Bu aşamada, hsp65 geni gibi oldukça korunmuş DNA segmentlerini hedefleyen Polimeraz Zincir Reaksiyonu (PCR) testleri devreye girer. Duodenal biyopsi örneklerinden veya nörolojik tutulum varlığında lomber ponksiyonla alınan beyin omurilik sıvısından (BOS) çalışılan T. whipplei spesifik PCR testi, >%99.9 gibi son derece yüksek bir spesifite oranına sahip olup mikrobiyolojik etiyolojiyi kesinleştirir ve uzun süreli antibiyoterapi kararı için altın standarttır.",
      },
    ],
  },
  cases: [
    {
      id: 1,
      title:
        "VAKA 1: Pediatrik Steatorede Kritik Ayrım - Kistik Fibrozis mi, Yoksa Başka Bir Şey mi?",
      steps: [
        {
          label: "Birinci Basamak Sunumu",
          content:
            "6 aylık erkek bebek, annesi tarafından birinci basamak sağlık kuruluşuna 'sık sık kötü kokulu, çocuk bezinin dışına taşan, yıkamakla zor temizlenen yağlı dışkılama' (steatore) ve büyüme eğrilerinde belirgin düşüş (failure to thrive) şikayetleriyle getiriliyor. Anamnezden hastanın son iki ay içinde üç kez orta kulak iltihabı ve bir kez alt solunum yolu enfeksiyonu geçirdiği öğreniliyor. Fizik muayenesinde cilt altı yağ dokusunun azaldığı, kas tonusunun zayıf olduğu ve belirgin bir abdominal distansiyon bulunduğu saptanıyor.",
        },
        {
          label: "Klinik Soru 1",
          content:
            "Bu yaş grubunda, yağlı ishal, gelişim geriliği ve tekrarlayan enfeksiyonlar tablosu ile gelen bir süt çocuğunda luminal fazı etkileyen hangi iki temel pankreatik ekzokrin sendrom öncelikle düşünülmelidir ve bunu aydınlatmak için birinci basamakta hangi spesifik gaita testi istersiniz?",
        },
        {
          label: "Laboratuvar Verisi ve İlerleyiş",
          content:
            "Klinisyen, çocukluk çağında pankreas yetmezliği dendiğinde akla ilk gelen hastalıklar olan Kistik Fibrozis ve Shwachman-Diamond sendromu arasında bir ayrım yapmak zorundadır. Yağ malabsorpsiyonunun kaynağının pankreas olduğunu doğrulamak için dışkıda fekal elastaz düzeyi istenir. Sonuç laboratuvardan 85 mg/g dışkı (Normal referans değeri > 200 mg/g) olarak döner. Bu ciddi düşüklük, hastanın pankreatik ekzokrin yetmezliği olduğunu kesinleştirir. Çocuk, kistik fibrozis tanısının konulabilmesi için genetik ve biyokimyasal altın standart olan 'ter testi'ne (terde klor konsantrasyonu ölçümü) yönlendirilir. İki farklı zamanda yapılan ter testleri tamamen normal (negatif) sınırlarda sonuçlanır. Bu süreçte çocuk rutin aşılaması için kliniğe geldiğinde alınan tam kan sayımında izah edilemeyen ve sebat eden ciddi nötropeni (Nötrofil: 350/mm³, referans <1500 nötrofeni sınırıdır), eşlik eden hafif mikrositer anemi saptanır.",
        },
        {
          label: "Klinik Soru 2",
          content:
            "Fekal elastazı düşük olup ter testi tamamen negatif saptanan ve kliniğine ciddi kemik iliği disfonksiyonu (nötropeni) eklenen bu infantil pankreatik yetmezlik olgusunda nihai tanı nedir? Bu hastalığın yönetiminde hekimin izlemesi gereken hematolojik tutulum süreci nasıldır?",
        },
        {
          label: "Klinik Çözüm ve Patofizyoloji",
          content:
            "Ter testinin negatif olması, 7q31.2 kromozom mutasyonu kaynaklı Kistik Fibrozis tanısını büyük ölçüde dışlar. Hastada pankreatik ekzokrin yetmezliğe (steatore) eşlik eden hematolojik baskılanma (nötropeni), ayırıcı tanıda bizi doğrudan Shwachman-Diamond sendromu'na götürür. Bu sendrom, ribozom biyogenezindeki bir defektten kaynaklanan genetik bir hastalıktır. Hastalar sadece malnütrisyon riski altında değil, aynı zamanda kemik iliği yetmezliğine bağlı ölümcül fırsatçı enfeksiyonlar ve ilerleyen yaşlarda miyelodisplastik sendrom (MDS) ile akut miyeloid lösemiye (AML) dönüşüm riski altındadırlar. Bu nedenle hastanın düzenli hematolojik takibi (gerekirse granülosit koloni uyarıcı faktör desteği) ve sentetik pankreatik enzim replasman tedavisi hayati önem taşır.",
        },
      ],
    },
    {
      id: 2,
      title:
        "VAKA 2: Kronik Yorgunluk, Kaşıntılı Döküntü ve Beklenmedik Hematolojik Acil Durum",
      steps: [
        {
          label: "Birinci Basamak Sunumu",
          content:
            "35 yaşında kadın hasta, son bir yıldır artarak devam eden kronik yorgunluk, şişkinlik, aralıklı sulu ishal atakları ve özellikle diz, dirsek ve omuzlarının dış (ekstansör) yüzeylerinde ortaya çıkan, aşırı kaşıntılı, ince su toplamaları (vezikül ve büller) şeklinde olan döküntüler şikayetiyle başvuruyor. Rutin laboratuvar taramasında hemoglobin 9.5 g/dL (mikrositer anemi, ferritin 8 ng/mL) ve trombosit sayısı 720.000/μL (ciddi reaktif trombositoz) olarak bulunuyor. Diğer biyokimyasal parametreler normaldir.",
        },
        {
          label: "Klinik Soru 1",
          content:
            "Erişkin bir kadında kronik anemi, ishal ve dermatolojik muayenede simetrik ekstansör büllöz lezyonların varlığı klinik olarak hangi spesifik mukozal otoimmün hastalığa işaret eder ve tanıyı doğrulamak için birinci basamak serolojide hangi parametreler istenmelidir?",
        },
        {
          label: "Laboratuvar Verisi ve İlerleyiş",
          content:
            "Klinisyen, ciltteki bu karakteristik kaşıntılı lezyonların Çölyak hastalığının ekstraintestinal bir prezantasyonu olan Dermatitis Herpetiformis olduğunu düşünür. Tanıyı desteklemek üzere çölyak spesifik otoantikor profili olan Anti-doku transglutaminaz (tTG) IgA ve potansiyel bir immün yetmezliği dışlamak için Total IgA seviyeleri istenir. Total IgA normal sınırlarda iken, Anti-tTG IgA düzeyi referans aralığının on katından fazla (yüksek pozitif) raporlanır. Tanı büyük ölçüde kesinleşmiştir. Ancak klinisyenin dikkatini hastanın ciddi şekilde yüksek olan trombosit sayısı (720.000) çeker. Trombositozun etiyolojisini aydınlatmak üzere istenen periferik kan yaymasında (frotisinde); çok sayıda hedef hücresi (target cell) ve daha da önemlisi, eritrositlerin içinde makrofajlar tarafından temizlenememiş nükleer DNA kalıntıları olan koyu mavi-mor renkli Howell-Jolly cisimcikleri saptanır. Hastanın öyküsünde daha önce geçirilmiş bir cerrahi ameliyat veya splenektomi yoktur. Batın ultrasonografisinde dalak boyutları normal ölçülür ancak nükleer tıp tarafından yapılan sintigrafide dalağın retiküloendotelyal aktivite (tutulum) göstermediği izlenir.",
        },
        {
          label: "Klinik Soru 2",
          content:
            "Otoimmün gluten enteropatisi (Çölyak) tanısı kesinleşen bu hastanın periferik yaymasında anatomik olarak var olan bir dalağa rağmen Howell-Jolly cisimciklerinin saptanması hangi klinik komplikasyonun geliştiğini kanıtlar? Bu tablo hastayı hangi spesifik tehlikeye açık hale getirir?",
        },
        {
          label: "Klinik Çözüm ve Patofizyoloji",
          content:
            "Howell-Jolly cisimciklerinin varlığı, dalağın kırmızı pulpa makrofajlarının hatalı ve inklüzyon barındıran eritrositleri kandan temizleme yeteneğini tamamen kaybettiğini gösterir. Hasta anatomik bir dalağa sahip olsa da, doku düzeyinde gelişen immün kompleks çökelmeleri ve mikrovasküler tıkanıklıklar nedeniyle fonksiyonel hiposplenizm gelişmiştir. Dalak fonksiyonlarının durması, kanda fizyolojik olarak sekestre edilmesi gereken trombositlerin artışına (trombositoz) yol açmıştır. Fonksiyonel dalak yetmezliği olan bu erişkin hasta, bağışıklık zafiyeti nedeniyle Streptococcus pneumoniae (Pnömokok), Neisseria meningitidis (Meningokok) ve Haemophilus influenzae gibi kapsüllü bakterilere karşı hayatı tehdit eden 'Fulminan Sepsis' (Overwhelming Post-Splenectomy Infection - OPSI sendromuna benzer bir tablo) riski altındadır. Yönetimde sadece sıkı glutensiz diyet yeterli olmaz; hastanın derhal bu üçlü aşılama programına alınması ve enfeksiyon bulgularında agresif antibiyoterapi başlanması şarttır.",
        },
      ],
    },
    {
      id: 3,
      title:
        "VAKA 3: Geriatrik Popülasyonda Kilo Kaybı, Malnütrisyon ve 'Yemek Yeme Korkusu'",
      steps: [
        {
          label: "Birinci Basamak Sunumu",
          content:
            "74 yaşında, uzun süredir insüline bağımlı diabetes mellitus ve kontrolsüz hipertansiyon öyküsü bulunan erkek hasta, son altı ay içerisinde istemsiz 14 kilogram kaybı ve halsizlik şikayetleriyle geriatri polikliniğine başvuruyor. Hastanın detaylı anamnezinde; yemeklerden yaklaşık 30 ile 45 dakika sonra göbek çevresinde (periumbilikal) başlayan, şiddeti giderek artan, kramp tarzında ve yaklaşık iki saat süren dayanılmaz karın ağrıları yaşadığı öğreniliyor. Hasta bu ağrıları tekrar yaşamamak için yiyecek porsiyonlarını iyice azalttığını ve son günlerde sadece sıvı gıdalar tüketebildiğini belirterek 'yemek yemekten korkuyorum' ifadesini kullanıyor. Fizik muayenesinde karın çökük (skafoid batın), genel bir hassasiyet var ancak defans veya rebound saptanmıyor. Dinlemekle bağırsak sesleri hipoaktiftir.",
        },
        {
          label: "Klinik Soru 1",
          content:
            "Birden fazla kardiyovasküler risk faktörü taşıyan bu geriatrik hastada, postprandiyal (yemek sonrası) şiddetli karın ağrısı ve buna sekonder gelişen gıda reddi ve malnütrisyon tablosu bağırsakların hangi fazında oluşan, hangi spesifik patolojiyi düşündürmelidir?",
        },
        {
          label: "Laboratuvar Verisi ve İlerleyiş",
          content:
            "Hastanın anlattığı klasik postprandiyal ağrı ve yeme fobisi (sitofobi), literatürde 'abdominal anjina' olarak bilinir. Semptomlar postabsorptif faz ve mukozal kanlanma eksikliği ile ilgilidir ve hastanın ön tanısı Kronik Mezenter İskemi'dir. Klinisyen, bu iskemik malabsorpsiyon tablosunu, yaşlılarda görülen ve steatore yapan SIBO (İnce Bağırsak Aşırı Bakteri Çoğalması) gibi diğer malnütrisyon nedenlerinden net biçimde ayırmak ister. Hastanın yapılan laboratuvar testlerinde; dışkıda gizli kan hafif pozitif saptanırken, laktaz eksikliğini gösteren dışkıda redüktan madde negatiftir ve pankreatik fonksiyonu gösteren fekal elastaz düzeyi normaldir. Tam kan sayımında lökosit sayısı normal sınırlarda iken, trombotik bir süreci işaret eden D-dimer düzeyi referans aralığının üstündedir. Çekilen bilgisayarlı tomografi (BT) anjiyografisinde superior mezenterik arter (SMA) ostiumunda ileri derecede aterosklerotik darlık (oklüzyona yakın) izlenir.",
        },
        {
          label: "Klinik Soru 2",
          content:
            "Kanlanma yetersizliği nedeniyle mukozal atrofisi başlayan ve emilimi bozulan bu yaşlı hastada, altta yatan sistemik ateroskleroz ve olası akut arterit zemininde, kolonik anatomide özellikle hangi bölgelerin daha hızlı iskemik nekroza (akut kolon iskemisi) gitmesi beklenir?",
        },
        {
          label: "Klinik Çözüm ve Patofizyoloji",
          content:
            "Kronik mezenter iskemi, splanknik vasküler yatağın (superior mezenterik, inferior mezenterik arterler veya çölyak turunkus) aterosklerotik darlığı nedeniyle bağırsak mukozasının artan oksijen ve metabolik madde talebini (özellikle sindirim sırasında) karşılayamaması sonucunda ortaya çıkar. Hücreler lümendeki besini alsa bile, postabsorptif dolaşıma aktaramaz, mukozal membran iskemik hasara uğrar. İlerleyen süreçte aniden gelişebilecek trombüs atakları, sistemin anatomik zayıf noktası (watershed bölgesi) olan Splenik fleksura (sol kolon) ve Rektosigmoid bileşke'yi vurur. İki ana arter dalının birbirine ulaştığı ancak perfüzyon basıncının en düşük olduğu bu bölgeler, akut iskemiye, transmüral nekroza ve şiddetli sol alt kadran ağrısıyla giden kanlı ishale (akut kolonik iskemi) son derece duyarlıdır. Hastanın tedavisinde anjiyografik değerlendirme eşliğinde endovasküler stentleme veya cerrahi revaskülarizasyon (bypass) hayat kurtarıcıdır; aksi takdirde iskemik transmüral rüptür ve peritonit kaçınılmazdır.",
        },
      ],
    },
  ],
  quiz: [
    {
      id: 1,
      question:
        "Besinlerin emilimi sırasında gerçekleşen luminal, mukozal ve postabsorptif fazlar malabsorpsiyon etiyolojisini belirler. Aşağıdaki hastalıklardan hangisinin primer patogenezi 'postabsorptif fazda' vasküler veya lenfatik transportun bozulmasına dayanır?",
      options: [
        "Sekonder laktaz eksikliği",
        "Abetalipoproteinemi",
        "Kistik fibrozis",
        "Çölyak hastalığı",
        "Giardiazis enfeksiyonu",
      ],
      correct: 1,
      explanation:
        "Abetalipoproteinemide enterosit içine alınan lipitlerin şilomikronlara yüklenerek lenfatik dolaşıma aktarılamaması söz konusudur; bu durum postabsorptif transport fazının klasik bir bozukluğudur.",
    },
    {
      id: 2,
      question:
        "Sağlıklı bir sindirim sisteminde besinlerin büyük bir kısmı ince bağırsağın oldukça spesifik bir bölümünde yüksek bir verimlilikle emilir. Fizyolojik hızlarda besin tüketen bir insanda, karbonhidratların yaklaşık yüzde altmışının ve trigliseritlerin yüzde sekseninin emiliminin tamamlandığı bağırsak bölgesi neresidir?",
      options: [
        "Terminal ileum",
        "Çekum",
        "Proksimal duodenumdan distal duodenuma kadar olan 20 cm'lik segment",
        "Jejunumun orta segmenti",
        "Asendan kolon",
      ],
      correct: 2,
      explanation:
        "Klinik perfuzyon çalışmalarına göre, besinler fizyolojik hızlarda duodenuma girdiğinde, henüz distal duodenuma (ilk 20 cm) ulaşmadan trigliseritlerin %80'i ve karbonhidratların %60'ı son derece verimli bir şekilde emilmektedir.",
    },
    {
      id: 3,
      question:
        "Otuz günlük bir yenidoğanda klor kanallarındaki mutasyona bağlı olarak yoğun sekresyon birikimi gelişmiştir. Bu bebeğin malabsorpsiyon sürecine bağlı olarak dışkı karakteristiği ve temel mekanizması için en doğru tanımlama aşağıdakilerden hangisidir?",
      options: [
        "Mukozal invazyonla karakterize kanlı ishal",
        "Yağ asitlerinin laksatif etkisine bağlı inflamatuar ishal",
        "Özofagus sfinkter disfonksiyonuna bağlı asidik ishal",
        "Luminal fazdaki enzim eksikliğine bağlı ozmotik mekanizmalı sulu/yağlı ishal",
        "İntestinal iskemi kaynaklı fokal nekrotik ishal",
      ],
      correct: 3,
      explanation:
        "Kistik fibrozisin erken (0-30 gün) döneminde ekzokrin pankreas enzim eksikliği intraluminal osmotik yükü artırır; bu da ozmotik mekanizmayla su çekerek sulu ve yağlı bir ishale neden olur.",
    },
    {
      id: 4,
      question:
        "Bebeklik döneminde yağlı dışkılama (steatore), kronik nötropeni ve iskelet sistemi deformiteleri saptanan bir hastada kistik fibrozis ter testiyle dışlanmıştır. Bu klinik tabloda öncelikle düşünülmesi gereken genetik malabsorpsiyon sendromu hangisidir?",
      options: [
        "Shwachman-Diamond sendromu",
        "Dubowitz sendromu",
        "Abetalipoproteinemi",
        "Çölyak hastalığı",
        "Whipple hastalığı",
      ],
      correct: 0,
      explanation:
        "Kistik fibrozisten sonra en sık görülen ekzokrin pankreatik yetmezlik nedenidir. Pankreas yetmezliğine eşlik eden hematolojik bulgular (özellikle nötropeni) Shwachman-Diamond sendromunun ayırıcı özelliğidir.",
    },
    {
      id: 5,
      question:
        "Abetalipoproteinemi tanısı ile takip edilen ve MTTP geni mutasyonu taşıyan bir çocuk hastada, yıllar içerisinde lipit transport defektine bağlı olarak hangi oküler komplikasyonun gelişmesi ve potansiyel olarak tam görme kaybına ilerlemesi beklenir?",
      options: [
        "Katarakt",
        "Glokom krizleri",
        "Retinitis pigmentosa",
        "Akut optik nevrit",
        "Maküla dejenerasyonu",
      ],
      correct: 2,
      explanation:
        "Mikrozomal trigliserit transfer proteini (MTTP) mutasyonunda yağda eriyen A vitamini emilemez. Bunun sonucunda retinanın dejenerasyonu ile karakterize olan retinitis pigmentosa gelişir.",
    },
    {
      id: 6,
      question:
        "Periferik kan yayması (froti) incelemesinde 'akantosit' (acanthocytosis) saptanması, aşağıdaki malabsorptif ve metabolik hastalıklardan hangisi için en güçlü hücresel belirteçtir?",
      options: [
        "Kistik fibrozis",
        "Abetalipoproteinemi",
        "Fonksiyonel hiposplenizm",
        "SIBO (İnce bağırsak aşırı bakteri çoğalması)",
        "Kısa bağırsak sendromu",
      ],
      correct: 1,
      explanation:
        "Membran lipit ve protein oranlarındaki ciddi disfonksiyona bağlı olarak eritrosit yüzeyinde asimetrik dikenimsi çıkıntıların (akantositler) oluşması abetalipoproteineminin en klasik hematolojik bulgusudur.",
    },
    {
      id: 7,
      question:
        "Dışkıda redüktan madde pozitifliğinin saptandığı kronik ishalli bir bebekte, patofizyolojik olarak kolon lümeninde aşağıdaki olaylardan hangisinin gerçekleştiği kesin olarak söylenebilir?",
      options: [
        "Pankreatik lipazın tamamen inaktive olduğu",
        "Safra tuzlarının ileumdan geri emilemediği",
        "Sindirilmemiş karbonhidratların bakteriler tarafından fermente edildiği",
        "Mukozal immunoglobülinlerin lümene sızdığı",
        "Makrofajların bağırsak duvarını infiltre ettiği",
      ],
      correct: 2,
      explanation:
        "Redüktan madde testi, laktaz veya fruktoz emilim bozukluğunda kolona geçen indirgeyici şekerleri tespit eder. Bu şekerler kalın bağırsaktaki bakterilerce fermente edilerek asit ve gaz oluşumuna neden olur.",
    },
    {
      id: 8,
      question:
        "Dışkı PH'sının asidik (<5.5) saptanması, klinisyeni hangi spesifik malabsorpsiyon alt tipine yönlendirmelidir?",
      options: [
        "Karbonhidrat malabsorpsiyonu",
        "Şilomikron transport defekti",
        "Protein kaybettiren enteropati",
        "Safra tuzu eksikliği",
        "Pankreatik proteaz yetmezliği",
      ],
      correct: 0,
      explanation:
        "Emilemeyen karbonhidratlar kolona ulaştığında bakteriyel fermentasyona uğrar. Fermentasyon yan ürünleri olan laktik asit ve kısa zincirli yağ asitleri dışkı pH'sını asidik seviyelere çeker.",
    },
    {
      id: 9,
      question:
        "Dışkıda fekal elastaz ölçümü pankreatik ekzokrin yetmezlik şüphesinde kullanılır. Test sonucunu klinisyenin yanlış değerlendirmesine (yalancı düşük çıkmasına) neden olabilecek klinik tablo aşağıdakilerden hangisidir?",
      options: [
        "Hastanın test öncesinde yüksek miktarda karbonhidrat tüketmesi",
        "Yüksek hacimli ve çok şiddetli sulu ishalin dışkıyı seyreltmesi (dilüsyon)",
        "Eş zamanlı B12 vitamini eksikliğinin olması",
        "İntestinal lümen pH'sının alkali olması",
        "Çölyak serolojisinin pozitif bulunması",
      ],
      correct: 1,
      explanation:
        "Fekal elastaz dışkının gramı başına ölçülen bir enzim konsantrasyonudur. Şiddetli sulu ishal varlığında dışkı hacmi artıp konsantrasyon sulandığı için test yalancı düşük çıkabilir.",
    },
    {
      id: 10,
      question:
        "Çölyak hastalığından şüphelenilen bir çocukta, bağışıklık sisteminin glutene karşı ince bağırsak dokusunda başlattığı hasarı birinci basamakta göstermek için istenmesi gereken spesifik serolojik test hangisidir?",
      options: [
        "Anti-Saccharomyces cerevisiae antikorları (ASCA)",
        "Perinükleer anti-nötrofil sitoplazmik antikor (PANCA)",
        "Anti-Doku Transglutaminaz (tTG) IgA",
        "Fekal kalprotektin",
        "Anti-Tropheryma whipplei IgG",
      ],
      correct: 2,
      explanation:
        "İnce bağırsaktaki gluten hasarına karşı oluşan spesifik otoimmün yanıt tTG IgA antikorları ile ölçülür ve çölyak hastalığının serolojik taramasında altın standarttır.",
    },
    {
      id: 11,
      question:
        "Anti-tTG IgA testi negatif gelen kronik ishalli ve büyüme geriliği olan bir hastada, çölyak hastalığını tam olarak dışlamadan önce klinisyenin mutlaka kontrol etmesi gereken laboratuvar parametresi aşağıdakilerden hangisidir?",
      options: [
        "Serum ferritin düzeyi",
        "Dışkıda gizli kan",
        "Serum Total IgA düzeyi",
        "Serum amilaz düzeyi",
        "Fekal elastaz düzeyi",
      ],
      correct: 2,
      explanation:
        "Çölyak hastalarında selektif IgA eksikliği genel popülasyondan daha sık görülür. Total IgA düşükse tTG IgA sentezlenemez ve test yanlış negatif çıkar.",
    },
    {
      id: 12,
      question:
        "Periferik kan yaymasında Howell-Jolly cisimciklerinin saptanması, vücutta hangi spesifik organın fonksiyonunu kaybettiğini veya sistemden çıkarıldığını gösterir?",
      options: ["Karaciğer", "Böbrek", "Pankreas", "Dalak", "Terminal İleum"],
      correct: 3,
      explanation:
        "Howell-Jolly cisimcikleri eritrosit içindeki DNA nükleer kalıntılarıdır. Normalde dalaktaki makrofajlar tarafından temizlenirler. Kanda görülmeleri dalağın fonksiyon kaybını (hiposplenizm) kanıtlar.",
    },
    {
      id: 13,
      question:
        "Çölyak hastalığı öyküsü olan 35 yaşındaki bir kadının rutin kan sayımında sebat eden yüksek bir trombositoz (>600x10^9/L) ve periferik yaymada Howell-Jolly cisimcikleri saptanıyor. Yönetimde en öncelikli tıbbi müdahale hangisi olmalıdır?",
      options: [
        "Acil splenektomi kararı alınması",
        "Kemik iliği aspirasyon ve biyopsisi yapılması",
        "Pnömokok, Meningokok ve Haemophilus influenzae tip b aşılarının yapılması",
        "Agresif intravenöz demir replasmanına başlanması",
        "Yüksek doz kortikosteroid tedavisi",
      ],
      correct: 2,
      explanation:
        "Hastada fonksiyonel hiposplenizm gelişmiştir. Dalağı çalışmayan bu hastalar kapsüllü bakterilere karşı ölümcül sepsis riski altındadır; acil profilaktik aşılama esastır.",
    },
    {
      id: 14,
      question:
        "İleri yaştaki geriatrik bir hastada miyenterik nöronların azalmasına, mide asidinin düşmesine ve bağırsak motilitesinin bozulmasına ikincil olarak safra asitlerinin ince bağırsak lümeninde erken dekonjuge olması hangi patolojinin sonucudur?",
      options: [
        "Abetalipoproteinemi",
        "İnce Bağırsak Aşırı Bakteri Çoğalması (SIBO)",
        "Akut apandisit",
        "Kistik fibrozis",
        "Primer sklerozan kolanjit",
      ],
      correct: 1,
      explanation:
        "SIBO tablosunda kolonik bakteriler safra tuzlarını erken dekonjuge eder, bu da lipitlerin misel oluşturmasını engelleyerek yağ malabsorpsiyonuna yol açar.",
    },
    {
      id: 15,
      question:
        "Kronik ateroskleroz öyküsü olan 73 yaşında bir hastada, yemeklerden yarım saat sonra başlayan kramp tarzı karın ağrısı, 'yemek yemekten korkma' ve buna bağlı ciddi kilo kaybı tablosu mevcuttur. Bu geriatrik malabsorpsiyonun en olası etiyolojisi nedir?",
      options: [
        "Mide kanseri",
        "Pankreatik ekzokrin yetmezlik",
        "Kronik mezenter iskemi (Abdominal anjina)",
        "Çölyak hastalığı",
        "Laktoz intoleransı",
      ],
      correct: 2,
      explanation:
        "Kronik mezenter iskemi, artan sindirim kan talebinin tıkalı arterler nedeniyle karşılanamaması sonucunda postprandiyal iskemi ve ağrıya yol açar. Hasta yemekten kaçınır.",
    },
    {
      id: 16,
      question:
        "Akut kolonik iskeminin anatomik olarak bağırsakta en sık etkilediği, kanlanma açısından 'watershed' (sınır) bölgesi neresidir?",
      options: [
        "Terminal ileum",
        "Çekum",
        "Splenik fleksura (Sol kolon)",
        "Hepatik fleksura (Sağ kolon)",
        "Duodenal ampulla",
      ],
      correct: 2,
      explanation:
        "Splenik fleksura (ve rektosigmoid bileşke), sistemik iskemi veya tromboembolizmden en çabuk etkilenen anastomozun en zayıf olduğu uç noktalardır.",
    },
    {
      id: 17,
      question:
        "Kronik ishal, eklem ağrıları ve açıklanamayan kilo kaybı olan erişkin bir erkek hastada Whipple hastalığı düşünülmektedir. Bu hastalığın patolojik tanısı için duodenum biyopsisinde görülen makrofaj inklüzyonlarını spesifik olarak boyayan yöntem hangisidir?",
      options: [
        "Gram boyama",
        "Çini mürekkebi",
        "Periyodik Asit-Schiff (PAS)",
        "Giemsa boyası",
        "Asit-Resistan Boya (ARB)",
      ],
      correct: 2,
      explanation:
        "Whipple basillerinin makrofajlar içinde bıraktığı hücre duvar kalıntıları karakteristik olarak PAS boyası ile kuvvetli pozitif reaksiyon (pembe-kırmızı) verir.",
    },
    {
      id: 18,
      question:
        "PAS boyamasının negatif sonuç verdiği ancak hastanın şiddetli nörolojik bulguları ve malabsorpsiyonu nedeniyle Whipple hastalığının dışlanamadığı durumlarda tanıyı %99.9 spesifite ile koyduran moleküler test hangisidir?",
      options: [
        "Serum spesifik IgE düzeyi",
        "Dışkıda kalprotektin",
        "Duodenal dokuda Tropheryma whipplei spesifik PCR testi",
        "Kemik iliği biyopsisi",
        "Dışkı kültürü",
      ],
      correct: 2,
      explanation:
        "Whipple basillerinin kültürü çok zordur ve PAS hastaların yarısında negatif çıkabilir. Spesifik PCR testi tanıyı doğrulamada altın standarttır.",
    },
    {
      id: 19,
      question:
        "Mukozal hasara veya inflamatuar bağırsak hastalıklarına sekonder olarak gelişen 'protein kaybettiren enteropati'nin temel klinik yansıması laboratuvarda nasıl izlenir?",
      options: [
        "Serum amilaz seviyesinde artış",
        "Dışkı pH'sında bazikleşme",
        "Hipoalbüminemi, ödem ve serum immünoglobulin düzeylerinde düşüş",
        "Periferik kanda şistosit artışı",
        "Fekal elastaz düzeyinde telafi edici artış",
      ],
      correct: 2,
      explanation:
        "Albümin ve immünglobulinlerin lümene sızıp atılması kanda hipoalbüminemi, buna bağlı ödem ve bağışıklık zafiyeti yaratır.",
    },
    {
      id: 20,
      question:
        "Malabsorpsiyona sekonder olarak gelişen spesifik vitamin ve mineral eksikliklerinin fizik muayene bulguları eşleştirildiğinde aşağıdakilerden hangisi yanlıştır?",
      options: [
        "B12 vitamini eksikliği -> Propriyosepsiyon kaybı ve ataksi",
        "A vitamini eksikliği -> Retinitis pigmentosa ve gece körlüğü",
        "K vitamini eksikliği -> Dermatitis herpetiformis",
        "D vitamini ve Kalsiyum eksikliği -> Tetani ve osteopeni",
        "E vitamini eksikliği -> Spinoserebellar ataksi ve arefleksi",
      ],
      correct: 2,
      explanation:
        "Dermatitis herpetiformis, K vitamini eksikliğine bağlı değil, çölyak hastalığındaki otoimmün IgA birikimine bağlıdır. K vitamini eksikliği kanamaya yol açar.",
    },
    {
      id: 21,
      question:
        "Abetalipoproteinemide kan yaymasında görülen akantosit hücrelerinin, diğer anemi türlerinde görülen echinocyte (burr hücresi) yapılarından ayırt edilmesindeki morfolojik fark nedir?",
      options: [
        "Akantositler merkezinde nükleus barındırır.",
        "Burr hücrelerinin çıkıntıları sadece tek bir kutupta toplanmıştır.",
        "Akantositlerdeki dikenimsi çıkıntılar asimetrik, düzensiz aralıklı ve farklı boyutlardadır; burr hücrelerinin çıkıntıları ise simetrik ve eşit aralıklıdır.",
        "Akantositler hücre zarında PAS pozitif granüller içerir.",
        "Burr hücreleri sadece kemik iliğinde görülür, kanda bulunmaz.",
      ],
      correct: 2,
      explanation:
        "Akantositler lipit membran deformitesine bağlı olarak asimetrik çok düzensiz yapılar gösterirken, burr hücreleri düzenli dalgalanmaları olan hücrelerdir.",
    },
    {
      id: 22,
      question:
        "Tropheryma whipplei enfeksiyonunun elektron mikroskobu incelemesinde patognomonik olarak görülen basillerin boyutu ve zar yapısı nasıldır?",
      options: [
        "2 mikrometre uzunluğunda kalın peptidoglikan duvarlı",
        "0.25 mikrometre uzunluğunda trilaminar (üç katmanlı) membranlı yapı",
        "İntraselüler viral inklüzyonlar şeklinde",
        "5 mikrometre çapında kapsüllü diplokok yapısında",
        "1 mikrometre çapında asit-dirençli basil yapısında",
      ],
      correct: 1,
      explanation:
        "Whipple basilleri son derece küçük (0.25 mikrometre) çubuk şeklinde ve üç katmanlı (trilaminar) membrana sahip organizmalar olarak tanımlanır.",
    },
    {
      id: 23,
      question:
        "Malabsorpsiyonlu erişkin hastada osteoporoz, demir eksikliği anemisi ve simetrik olarak omuz ve kalçalara yerleşen kaşıntılı su toplayan döküntüleri (Dermatitis herpetiformis) olan bir olguda ilk yapılması gereken birinci basamak serolojik tetkik nedir?",
      options: [
        "Dışkıda redüktan madde tayini",
        "Fekal elastaz seviyesi",
        "Anti-doku transglutaminaz IgA (tTG IgA) ve Total IgA seviyesi",
        "Serum TSH düzeyi",
        "PCR ile Tropheryma whipplei analizi",
      ],
      correct: 2,
      explanation:
        "Anemi, osteoporoz ve dermatitis herpetiformis triadının en olası tanısı çölyak hastalığıdır. İlk yapılması gereken serolojik test tTG IgA ve Total IgA'dır.",
    },
    {
      id: 24,
      question:
        "Malabsorpsiyon şikayeti ile tetkik edilen hastada, kistik fibrozise neden olan CFTR geninin lokalize olduğu kromozom bölgesi aşağıdakilerden hangisidir?",
      options: ["7q31.2", "17q21", "15q11", "22q11.2", "Xq28"],
      correct: 0,
      explanation:
        "Kistik Fibrozis, 7q31.2 kromozom bölgesinde yer alan CFTR genindeki mutasyonlar sonucu meydana gelir.",
    },
    {
      id: 25,
      question:
        "Redüktan madde testinde kullanılan solüsyonlar ve mekanizması için hangi ifade doğrudur?",
      options: [
        "PAS boyası kullanılarak hücre içi karbonhidratlar boyanır.",
        "Clinitest tabletleri veya Benedict solüsyonu kullanılarak dışkıdaki indirgeyici şekerler tespit edilir ve solüsyonun rengi yeşil/sarıdan turuncu/kırmızıya döner.",
        "Helycobacter pilori üreaz enzimi kullanılarak amonyak ölçümü yapılır.",
        "Dışkıya asit damlatılarak hidrojen gazı çıkışı gözlemlenir.",
        "Sudan III boyası ile fekal lipit damlacıkları sayılır.",
      ],
      correct: 1,
      explanation:
        "Clinitest veya Benedict solüsyonu, laktoz, maltoz veya fruktoz gibi emilemeyen redüktör (indirgeyici) şekerlerle reaksiyona girerek bir renk değişimi kaskadı yaratır.",
    },
    {
      id: 26,
      question:
        "Aşağıdaki malabsorpsiyon etiyolojilerinden hangisi mekanik karışımın, gastrik asit sekresyonunun ve antral kontraktilitenin bozulması sonucu 'luminal fazı' olumsuz etkiler?",
      options: [
        "İntestinal lenfanjiektazi",
        "Dumping sendromu",
        "Mide rezeksiyonu (Gastrektomi) öyküsü",
        "Çölyak hastalığı",
        "Abetalipoproteinemi",
      ],
      correct: 2,
      explanation:
        "Midenin cerrahi olarak alınması (rezeksiyon), yiyeceklerin yeterli süre mekanik olarak karıştırılamaması ve sindirim enzimleriyle eşleşememesine (luminal faz bozukluğu) neden olur.",
    },
    {
      id: 27,
      question:
        "Bir hastada kanda deamide gliadin peptidi (DGP) IgG ve tTG IgG antikorlarının ölçümüne duyulan klinik ihtiyacın en temel nedeni nedir?",
      options: [
        "Hastanın glutensiz diyetine uyumunun değerlendirilememesi",
        "Çölyak hastalığı ile birlikte çok sık izlenen selektif IgA eksikliği durumunda, IgA bazlı tTG testinin yalancı negatif çıkmasını engellemek",
        "Fonksiyonel hiposplenizmin şiddetini ölçmek",
        "Dermatitis herpetiformis cilt lezyonunun derinliğini belirlemek",
        "Trombositoz varlığında yanlış reaksiyonları ekarte etmek",
      ],
      correct: 1,
      explanation:
        "Selektif IgA eksikliğinde vücut IgA sentezleyemediği için IgA sınıfı otoantikorlar saptanamaz. Bu açığı kapatmak için IgG sınıfı antikorlara (DGP IgG, tTG IgG) bakılmalıdır.",
    },
    {
      id: 28,
      question:
        "Shwachman-Diamond sendromu teşhisi konan bir çocuğun ileriki yaşlarında hangi hematolojik komplikasyon açısından en yüksek klinik riski taşıdığı öngörülür?",
      options: [
        "Demir eksikliği anemisi",
        "Polistemia vera",
        "Kemik iliği yetmezliği, pansitopeni ve potansiyel malign transformasyon",
        "İdiyopatik trombositopenik purpura (ITP)",
        "Orak hücreli anemi krizleri",
      ],
      correct: 2,
      explanation:
        "Shwachman-Diamond sendromu pankreatik yetmezlikle birlikte genetik bir kemik iliği disfonksiyonu sendromudur. Hastalar yaşamları boyunca ağır nötropeni ve MDS/AML gibi malignitelere yatkındır.",
    },
    {
      id: 29,
      question:
        "Akantosit yapısındaki anormal kırmızı kan hücrelerinin dolaşımda karşılaştığı temel fizyopatolojik sorun nedir ve hastada hangi klinik bulguya yol açar?",
      options: [
        "Hücreler aşırı miktarda demir depolar ve hemokromatozis gelişir.",
        "Membran esnekliklerini yitirdikleri için dalakta sıkışıp parçalanırlar, bu da hücresel yıkıma ve kronik hemolitik anemiye yol açar.",
        "Vasküler endotelde yapışarak yaygın mikrotrombüslere neden olurlar.",
        "Kemik iliğinde aşırı çoğalarak lösemik infiltrasyon yaparlar.",
        "Akciğer kapillerlerinde gaz alışverişini bloke ederek hipoksi yaratırlar.",
      ],
      correct: 1,
      explanation:
        "Membran lipit defekti olan akantositler deforme olamadıkları için dalağın sinüzoidlerinden geçerken sıkışırlar ve makrofajlar tarafından yok edilirler, bu da hemolitik anemi doğurur.",
    },
    {
      id: 30,
      question:
        "Bir bakım evinde kalan 80 yaşındaki hastada şiddetli megaloblastik anemi (B12 vitamini eksikliği) ve steatore saptanıyor. Hasta endoskopi ve biyopsiyi reddediyor. Malabsorpsiyonun en olası nedenlerinden olan SIBO tanısını doğrulamak için kullanılabilecek non-invaziv test aşağıdakilerden hangisi olabilir?",
      options: [
        "Clinitest",
        "Ter testi",
        "Hidrojen/Metan nefes testi",
        "Lomber ponksiyon",
        "Periferik yayma",
      ],
      correct: 2,
      explanation:
        "Karbonhidratların aşırı çoğalmış bakteriler tarafından fermente edilmesiyle açığa çıkan gazların ölçülmesi (Hidrojen nefes testi), SIBO'nun non-invaziv standart testidir.",
    },
  ],
  references: [
    "Malabsorption Syndromes - StatPearls - NCBI Bookshelf, https://www.ncbi.nlm.nih.gov/books/NBK553106/",
    "The Pathophysiology of Malabsorption - PMC - NIH, https://pmc.ncbi.nlm.nih.gov/articles/PMC4513829/",
    "Overview of Malabsorption - Gastroenterology - Merck Manual Professional Edition",
    "Doku Transglutaminaz IgA ve IgG Testi Nedir? - A Life Sağlık Grubu",
    "KRONİK İSHALLİ ÇOCUĞA - Türk Çocuk Gastroenteroloji Hepatoloji",
    "Classification of malabsorption syndromes - PubMed",
    "Abetalipoproteinemia: MedlinePlus Genetics",
    "ÇOCUK VE ERGEN İÇİN KRONİK HASTALIKLARDA FİZİKSEL AKTİVİTE REHBERİ - Karatekin Üniversitesi",
    "Poster Sunumları - Cloudfront.net",
    "Abetalipoproteinemia - American Academy of Ophthalmology",
    "Etiket: laktoz - ENFEKSİYON HASTALIKLARI",
    "Transglutaminaz IgA Testi Nedir? - Synevo Laboratuvarları",
    "Tropheryma whipplei DNA detection by PCR - UW Medicine Pathology",
    "Whipple's disease - Diagnosis & treatment - Mayo Clinic",
    "Contribution of PCR to Differential Diagnosis between Patients with Whipple Disease and Tropheryma whipplei Carriers - ASM Journals",
    "WHIPB - Overview: Tropheryma whipplei, Molecular Detection, PCR, Blood",
    "Hyposplenism and Gastrointestinal Diseases: Significance and Mechanisms - Karger Publishers",
    "Functional hyposplenism diagnosed by blood film examination - ASH Publications",
    "(PDF) YAŞLI FİZYOLOJİSİ - ResearchGate",
    "YAŞLILARDA MALNÜTRİSYON VE HEMŞİRELİK YAKLAŞIMLARI - DergiPark",
    "BİLDİRİ ÖZET KİTABI - Ulusal Travma ve Acil Cerrahi Derneği",
    "2-GIS Motilitesi Ve Bozuklukları | PDF - Scribd",
    "Acanthocytosis - StatPearls - NCBI Bookshelf - NIH",
    "Acanthocytosis: a key feature for the diagnosis of abetalipoproteinemia | Blood | ASH",
    "ACANTHOCYTES IN PERIPHERAL BLOOD SMEAR 1 - ASH Image Bank",
    "Howell-Jolly bodies on peripheral smear leading to the diagnosis of congenital hyposplenism in a patient with septic shock - PMC",
    "Histology, Howell-Jolly Bodies - StatPearls - NCBI Bookshelf",
    "Hematologic manifestations of celiac disease - PMC - NIH",
  ],
};

// --- BİLEŞENLER ---

const InteractiveQuiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleOptionClick = (index: number) => {
    if (showExplanation) return;
    setSelectedOpt(index);
    setShowExplanation(true);
    if (index === questions[currentQ].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelectedOpt(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm text-center border-t-4 border-teal-600">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">
          Test Tamamlandı!
        </h3>
        <div className="text-6xl font-black text-teal-600 mb-4">
          {score} / {questions.length}
        </div>
        <p className="text-slate-600 mb-8">
          Klinik bilginizi başarıyla test ettiniz.
        </p>
        <button
          onClick={resetQuiz}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
        >
          Testi Yeniden Çöz
        </button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
        <span className="text-xs font-bold uppercase text-teal-700 tracking-wider">
          Soru {currentQ + 1} / {questions.length}
        </span>
        <span className="text-xs font-semibold bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
          Skor: {score}
        </span>
      </div>
      <div className="p-6">
        <h4 className="text-lg font-medium text-slate-800 mb-6 leading-relaxed">
          {q.question}
        </h4>
        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let btnClass =
              "w-full text-left p-4 rounded-lg border transition-all duration-200 ";
            if (showExplanation) {
              if (idx === q.correct)
                btnClass += "bg-green-50 border-green-500 text-green-900";
              else if (idx === selectedOpt)
                btnClass += "bg-red-50 border-red-500 text-red-900";
              else
                btnClass +=
                  "bg-white border-slate-200 text-slate-500 opacity-50";
            } else {
              btnClass +=
                "bg-white border-slate-200 hover:border-teal-400 hover:bg-teal-50 text-slate-700";
            }
            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                className={btnClass}
                disabled={showExplanation}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                      showExplanation && idx === q.correct
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-slate-300"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-sm">{opt}</span>
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-8 animate-fade-in-up">
            <div
              className={`p-4 rounded-lg flex items-start space-x-3 ${
                selectedOpt === q.correct
                  ? "bg-green-100 text-green-800"
                  : "bg-amber-100 text-amber-900"
              }`}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block mb-1">
                  {selectedOpt === q.correct ? "Doğru!" : "Yanlış."}
                </strong>
                <p className="text-sm leading-relaxed">{q.explanation}</p>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium flex items-center space-x-2 inline-flex"
              >
                <span>
                  {currentQ < questions.length - 1
                    ? "Sonraki Soru"
                    : "Sonuçları Gör"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InteractiveCases: React.FC<CasesProps> = ({ cases }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const activeCase = cases[activeCaseIndex];

  const handleCaseChange = (idx: number) => {
    setActiveCaseIndex(idx);
    setCurrentStep(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {cases.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => handleCaseChange(idx)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${
              idx === activeCaseIndex
                ? "bg-teal-600 text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Vaka {idx + 1}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-slate-800 text-white p-5">
          <h3 className="text-lg font-semibold">{activeCase.title}</h3>
        </div>

        <div className="p-6 relative">
          {/* Stepper Line */}
          <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-slate-200 hidden md:block z-0"></div>

          <div className="space-y-8 relative z-10">
            {activeCase.steps.map((step, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 ${
                  idx <= currentStep
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 hidden"
                }`}
              >
                <div className="flex md:space-x-6">
                  <div
                    className={`hidden md:flex flex-shrink-0 w-8 h-8 rounded-full border-4 items-center justify-center text-xs font-bold bg-white
                    ${
                      idx < currentStep
                        ? "border-teal-500 text-teal-600"
                        : idx === currentStep
                        ? "border-amber-500 text-amber-600"
                        : "border-slate-300 text-slate-400"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`text-xs font-bold uppercase tracking-wider mb-2 
                      ${idx % 2 === 1 ? "text-amber-600" : "text-teal-700"}`}
                    >
                      {step.label}
                    </div>
                    <div
                      className={`p-4 rounded-lg text-sm leading-relaxed
                      ${
                        idx % 2 === 1
                          ? "bg-amber-50 border border-amber-100 text-amber-900 font-medium"
                          : "bg-slate-50 border border-slate-200 text-slate-700"
                      }`}
                    >
                      {step.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {currentStep < activeCase.steps.length - 1 && (
            <div className="mt-8 text-center md:text-left md:pl-14">
              <button
                onClick={() => setCurrentStep((s) => s + 1)}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition inline-flex items-center space-x-2 shadow-sm"
              >
                <span>İleri / İncele</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
          {currentStep === activeCase.steps.length - 1 && (
            <div className="mt-8 text-center md:text-left md:pl-14">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-lg border border-green-200">
                <CheckSquare className="w-4 h-4 mr-2" /> Vaka Analizi Tamamlandı
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DataTable: React.FC<TableProps> = ({ headers, rows }) => (
  <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden my-6">
    <table className="w-full table-fixed break-words whitespace-normal text-left">
      <thead className="bg-teal-50 text-teal-800 border-b border-teal-100">
        <tr>
          {headers.map((h, i) => (
            <th
              key={i}
              className="p-3 text-[10px] md:text-xs font-bold uppercase tracking-wider"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50 transition-colors">
            {Object.values(row).map((cell, j) => (
              <td
                key={j}
                className="p-3 text-[10px] md:text-sm text-slate-700 leading-relaxed align-top"
              >
                {cell as string}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- ANA UYGULAMA ---

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("physiology");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const navigation: NavItem[] = [
    { id: "physiology", label: "Fizyoloji ve Patogenez", icon: Activity },
    { id: "ageGroups", label: "Yaş Gruplarına Göre Etiyoloji", icon: Users },
    { id: "clinical", label: "Öykü ve Fizik Muayene", icon: Stethoscope },
    { id: "lab", label: "Laboratuvar ve Tetkikler", icon: Microscope },
    { id: "cases", label: "PDÖ İnteraktif Vakalar", icon: BrainCircuit },
    { id: "quiz", label: "Çoktan Seçmeli Test", icon: CheckSquare },
    { id: "references", label: "Kaynakça", icon: Library },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "physiology":
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200">
              {docData.physiology.title}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {docData.physiology.content1}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {docData.physiology.content2}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {docData.physiology.content3}
            </p>
            <DataTable
              headers={[
                "Malabsorpsiyon Fazı",
                "Fizyolojik Süreç",
                "İlişkili Patolojiler ve Örnek Hastalıklar",
              ]}
              rows={docData.physiology.table}
            />
          </div>
        );
      case "ageGroups":
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200">
              {docData.ageGroups.title}
            </h2>
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 text-indigo-900 text-sm leading-relaxed">
              {docData.ageGroups.intro}
            </div>

            <div className="space-y-6">
              {docData.ageGroups.groups.map((g, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-teal-700 mb-3">
                    {g.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {g.content}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-8">
              Yaş Gruplarına Göre Özet Tablo
            </h3>
            <DataTable
              headers={[
                "Yaş Grubu",
                "En Sık Karşılaşılan Ayırıcı Tanılar",
                "Temel Patofizyolojik Özellik",
              ]}
              rows={docData.ageGroups.table as Record<string, string>[]}
            />
          </div>
        );
      case "clinical":
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200">
              {docData.clinical.title}
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {docData.clinical.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm col-span-1 md:col-span-2">
                <h3 className="text-lg font-bold text-teal-700 mb-3 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />{" "}
                  {docData.clinical.sections[0].subtitle}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {docData.clinical.sections[0].content}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm col-span-1 md:col-span-2">
                <h3 className="text-lg font-bold text-teal-700 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2" />{" "}
                  {docData.clinical.sections[1].subtitle}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {docData.clinical.sections[1].content}
                </p>
                <div className="space-y-3">
                  {docData.clinical.sections[1].list?.map((item, i) => {
                    const [title, desc] = item.split(": ");
                    return (
                      <div
                        key={i}
                        className="bg-slate-50 p-4 rounded-lg border border-slate-100"
                      >
                        <strong className="text-slate-800 block mb-1">
                          {title}
                        </strong>
                        <span className="text-slate-600 text-sm leading-relaxed">
                          {desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      case "lab":
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200">
              {docData.lab.title}
            </h2>
            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg text-teal-900 leading-relaxed">
              {docData.lab.intro}
            </div>

            <div className="space-y-6">
              {docData.lab.sections.map((sec, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-teal-700 mb-3">
                    {sec.subtitle}
                  </h3>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {sec.content}
                  </p>
                  {sec.list && (
                    <ul className="mt-4 space-y-3">
                      {sec.list.map((item, j) => {
                        const [title, desc] = item.split(": ");
                        return (
                          <li
                            key={j}
                            className="text-sm text-slate-600 leading-relaxed"
                          >
                            <strong className="text-slate-800">{title}:</strong>{" "}
                            {desc}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case "cases":
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200">
                Probleme Dayalı Öğrenme (PDÖ) Vakaları
              </h2>
              <p className="text-slate-500 mt-2">
                Klinik senaryoları adım adım inceleyerek tanı ve tedavi
                yaklaşımınızı geliştirin.
              </p>
            </div>
            <InteractiveCases cases={docData.cases} />
          </div>
        );
      case "quiz":
        return (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Çoktan Seçmeli Test
              </h2>
              <p className="text-slate-500 text-sm">
                Etiyopatogenez, klinik yaklaşımlar ve laboratuvar analizlerini
                derinlemesine sınayan değerlendirme modülü.
              </p>
            </div>
            <InteractiveQuiz questions={docData.quiz} />
          </div>
        );
      case "references":
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200 flex items-center">
              <Library className="mr-3 w-6 h-6 text-teal-600" /> Kaynakça
            </h2>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <ul className="space-y-3 list-decimal pl-5">
                {docData.references.map((ref, i) => (
                  <li
                    key={i}
                    className="text-xs md:text-sm text-slate-600 break-words leading-relaxed"
                  >
                    {ref}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-teal-200 selection:text-teal-900 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-teal-800 text-white p-4 flex justify-between items-center shadow-md z-20 sticky top-0">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-teal-200" />
          <h1 className="font-bold text-sm tracking-wide truncate max-w-[200px]">
            Malabsorpsiyon Rehberi
          </h1>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1 hover:bg-teal-700 rounded-lg"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`
        fixed inset-y-0 left-0 bg-teal-900 text-teal-100 w-72 z-30 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:w-72 md:flex-shrink-0 flex flex-col shadow-2xl md:shadow-none
      `}
      >
        <div className="p-6 border-b border-teal-800 hidden md:block">
          <div className="flex items-center space-x-3 text-white mb-2">
            <BookOpen className="w-8 h-8 text-teal-400" />
            <h1 className="font-bold text-xl leading-tight">DoctoApp</h1>
          </div>
          <p className="text-xs text-teal-300 opacity-80 mt-2 uppercase tracking-widest font-semibold">
            Klinik Rehber Modülü
          </p>
        </div>

        <div className="flex-1 overflow-y-auto py-6 space-y-1 scrollbar-hide">
          <div className="px-6 mb-4 text-[10px] font-black uppercase text-teal-500 tracking-widest">
            İçindekiler
          </div>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors border-l-4
                  ${
                    isActive
                      ? "border-teal-400 bg-teal-800 text-white"
                      : "border-transparent text-teal-200 hover:bg-teal-800/50 hover:text-white"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 mr-3 ${
                    isActive ? "text-teal-400" : "text-teal-400/50"
                  }`}
                />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-teal-800 bg-teal-950/50 text-xs text-center text-teal-400/60">
          Malabsorpsiyon Sendromları v1.0
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-teal-900/50 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden min-h-screen">
        {/* Header Title Bar (Desktop) */}
        <header className="hidden md:block bg-white border-b border-slate-200 p-8 sticky top-0 z-10 shadow-sm/50">
          <h1 className="text-2xl lg:text-3xl font-black text-slate-800 leading-tight max-w-4xl">
            Malabsorpsiyon Sendromları:{" "}
            <span className="text-teal-600 font-bold">
              Etiyopatogenez ve Klinik Yönetim
            </span>
          </h1>
        </header>

        {/* Content Render Container */}
        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
