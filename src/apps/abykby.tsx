React;
import React, { useState } from "react";
import {
  Activity,
  BookOpen,
  Brain,
  ChevronRight,
  ListChecks,
  Menu,
  Stethoscope,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Syringe,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

// --- TİP TANIMLAMALARI ---
type Tab = "abh" | "kbh" | "quiz_abh" | "quiz_kbh" | "pdo" | "references";

interface Question {
  id: number;
  q: string;
  options: string[];
  correct: string;
  explanation: string;
}

interface CaseStep {
  title: string;
  text: string;
  options: string[];
  correctLabel: string;
  explanation: string;
}

interface Case {
  id: number;
  title: string;
  intro: string;
  steps: CaseStep[];
}

// --- VERİLER: TABLOLAR ---
const prifleTable = {
  headers: [
    "pRIFLE Evresi",
    "Tahmini Kreatinin Klerensi (eCCl) Değişimi",
    "İdrar Çıkışı Kriteri",
  ],
  rows: [
    ["Risk (R)", "eCCl'de %25 azalma", "<0.5 mL/kg/saat (8 saat boyunca)"],
    ["Injury (I)", "eCCl'de %50 azalma", "<0.5 mL/kg/saat (16 saat boyunca)"],
    [
      "Failure (F)",
      "eCCl'de %75 azalma VEYA eCCl < 35 mL/dk/1.73 m²",
      "<0.3 mL/kg/saat (24 saat boyunca) VEYA 12 saat anüri",
    ],
    ["Loss (L)", "Persistan böbrek yetmezliği > 4 hafta", "Uygulanamaz"],
    [
      "End Stage (E)",
      "Son Dönem Böbrek Hastalığı (Persistan yetmezlik > 3 ay)",
      "Uygulanamaz",
    ],
  ],
};

const kdigoTable = {
  headers: [
    "KDIGO Evresi",
    "Serum Kreatinin (SCr) Kriteri",
    "İdrar Çıkışı (UO) Kriteri",
  ],
  rows: [
    [
      "Evre 1",
      "48 saat içinde ≥0.3 mg/dL artış VEYA 7 gün içinde bazale göre 1.5-1.9 kat artış",
      "<0.5 mL/kg/saat (6-12 saat boyunca)",
    ],
    [
      "Evre 2",
      "Bazale göre 2.0 - 2.9 kat artış",
      "< 0.5 mL/kg/saat (≥ 12 saat boyunca)",
    ],
    [
      "Evre 3",
      "Bazale göre 3 kat artış VEYA SCr ≥ 4 mg/dL VEYA diyaliz İhtiyacı VEYA eGFH < 35 mL/dk/1.73 m²",
      "< 0.3 mL/kg/saat (≥ 24 saat boyunca) VEYA anüri (≥12 saat)",
    ],
  ],
};

const kbhKdigoTable = {
  headers: [
    "KBH Evresi (KDIGO)",
    "Klinik Tanımlama",
    "Tahmini GFH (mL/dk/1.73 m²)",
  ],
  rows: [
    [
      "G1",
      "Normal veya artmış GFH (Ancak idrarda proteinüri/hematüri veya USG'de yapısal hasar mevcut)",
      "≥ 90",
    ],
    ["G2", "GFH'de hafif düzeyde azalma", "60-89"],
    ["G3a", "GFH'de hafif-orta düzeyde azalma", "45-59"],
    ["G3b", "GFH'de orta-şiddetli düzeyde azalma", "30-44"],
    ["G4", "GFH'de şiddetli düzeyde azalma", "15-29"],
    [
      "G5",
      "Son Dönem Böbrek Hastalığı (SDBH) veya diyaliz gereksinimi",
      "< 15",
    ],
  ],
};

// --- VERİLER: SORU BANKALARI ---
const abyQuestions: Question[] = [
  {
    id: 1,
    q: "ABH tanısı konmuş 2 yaşında bir çocuğun etiyolojisini aydınlatmak amacıyla idrar fraksiyone sodyum atılımı (FENa) hesaplanıyor. Hasta daha önce diüretik kullanmamış veya yoğun sıvı tedavisi almamıştır. FENa değerinin %0.4 olarak saptanması aşağıdakilerden hangisini en güçlü şekilde destekler?",
    options: [
      "A) Akut post-streptokokal glomerülonefrit geliştiğini",
      "B) Aminoglikozit kullanımına bağlı akut interstisyel nefrit tablosunu",
      "C) Bilateral posterior üretral valv obstrüksiyonunu",
      "D) Gastroenterit kaynaklı sıvı deplesyonuna bağlı prerenal ABH'yi",
      "E) Uzamış doku iskemisine bağlı gelişen akut tübüler nekrozu (ATN)",
    ],
    correct: "D",
    explanation:
      "FENa değerinin %1'in altında olması, böbrek tübüllerinin hücresel olarak sağlam olduğunu ve vücuttaki düşük sıvı hacmine (hipoperfüzyon) fizyolojik bir yanıt olarak idrardaki sodyumu maksimum kapasitede geri emdiğini kanıtlar. Bu durum prerenal ABH'nin tipik göstergesidir. ATN (E) veya interstisyel nefrit (B) gibi intrinsik parankim hasarlarında tübüllerin geri emme yeteneği bozulduğu için FENa %2'nin üzerine çıkar. Postrenal durumlarda (C) ise FENa değişkenlik gösterir ancak sıklıkla >%4 bulunur.",
  },
  {
    id: 2,
    q: "Yenidoğan yoğun bakım ünitesinde izlenen prematüre bebeklerde ABH gelişiminin değerlendirilmesinde, serum kreatinin ölçümlerinin yorumlanması ile ilgili aşağıdaki ifadelerden hangisi yanlıştır?",
    options: [
      "A) Yaşamın ilk haftasında ölçülen serum kreatinin değerleri, bebeğin fonksiyonundan çok annenin kreatinin seviyelerini yansıtır.",
      "B) Klasik KDIGO evrelemesindeki serum kreatinin cut-off değerleri ve sınırları yenidoğanlarda doğrudan ve değiştirilmeden kullanılır.",
      "C) Serum kreatinin seviyesi hücresel hasarın anlık bir belirteci olmaktan ziyade, fonksiyon kaybının gecikmeli bir göstergesidir.",
      "D) Yenidoğanlarda Evre 3 ABH tanısı koyabilmek için uygulanan modifiye nKDIGO kriterlerinde eşik değer >2.5 mg/dL olarak belirlenmiştir.",
      "E) Yenidoğanlarda hidrasyon durumundaki hızlı değişimler ve tübüler sekresyon dinamikleri kreatinin ölçüm güvenilirliğini azaltır.",
    ],
    correct: "B",
    explanation:
      "Klasik KDIGO kriterleri erişkinler ve daha büyük çocuklar için tasarlanmıştır. Yenidoğan fizyolojisindeki kas kütlesi farklılıkları ve maternal kreatinin geçişi nedeniyle, erişkinlerdeki Evre 3 kreatinin sınırı olan >4.0 mg/dL yenidoğanlara uygulanamaz. Bu yüzden modifiye nKDIGO geliştirilmiştir ve Evre 3 sınırı yenidoğan anatomisiyle uyumlu olarak >2.5 mg/dL kabul edilir. Diğer tüm seçenekler yenidoğan kreatinin fizyolojisini doğru açıklar.",
  },
  {
    id: 3,
    q: "Çocuklarda pRIFLE kriterleri kullanılarak böbrek fonksiyonlarındaki gerileme evrelendirilirken, 'Injury (Hasar)' evresi tahmini kreatinin klerensinde (eCCl) yüzde kaçlık bir düşüş ile karakterizedir?",
    options: ["A) %10", "B) %25", "C) %50", "D) %75", "E) %100"],
    correct: "C",
    explanation:
      "pRIFLE sınıflandırması oransal azalmalara dayanır. Risk (R) evresi klerenşte %25'lik bir azalmayı, Injury (I) evresi %50'lik bir azalmayı, Failure (F) evresi ise %75'lik bir azalmayı veya klerensin mutlak olarak 35 mL/dk/1.73m²'nin altına düşmesini ifade eder.",
  },
  {
    id: 4,
    q: "Güncel KDIGO Akut Böbrek Hasarı kılavuzlarına göre, serum kreatinin (SCr) değerinin kullanıldığı fonksiyonel tanı kriterlerinde, bir çocuğun Evre 1 ABH kabul edilebilmesi için 48 saat içerisinde serum kreatinin düzeyinde en az ne kadarlık mutlak bir artış olması gerekmektedir?",
    options: [
      "A) ≥ 0.1 mg/dL",
      "B) ≥ 0.3 mg/dL",
      "C) ≥ 0.5 mg/dL",
      "D) ≥ 1.0 mg/dL",
      "E) ≥ 2.0 mg/dL",
    ],
    correct: "B",
    explanation:
      "KDIGO tanı kriterine göre, böbrek fonksiyonunda ani bir bozulmayı işaret eden Evre 1 ABH tanımı, 48 saat gibi kısa bir pencere içerisinde serum kreatinin değerinde bazale göre ≥0.3 mg/dL mutlak artış olması veya 7 gün içinde kreatinin bazal değerinin 1.5 - 1.9 katına çıkması olarak tanımlanır.",
  },
  {
    id: 5,
    q: "Akut böbrek hasarında, böbrek perfüzyonunun azaldığı prerenal durumlarla, hücresel yıkımın başladığı intrinsik parankimal hasarın ayırt edilmesinde kullanılan FENa eşik değerleri, tübüler olgunlaşmamışlık nedeniyle yenidoğanlarda daha büyük çocuklara göre farklılık gösterir. Sağlıklı bir yenidoğanda prerenal ABH lehine olan FENa değeri ile Akut Tübüler Nekroz (ATN) lehine olan FENa değeri sırasıyla aşağıdakilerden hangisinde doğru verilmiştir?",
    options: [
      "A) < %1 prerenal / > %2 ATN",
      "B) < %2 prerenal / > %2.5 ATN",
      "C) < %0.5 prerenal / > %1.5 ATN",
      "D) < %3 prerenal / > %4 ATN",
      "E) < %1.5 prerenal / > %2 ATN",
    ],
    correct: "B",
    explanation:
      "Normal çocuklarda ve erişkinlerde prerenal hasarda FENa < %1 iken ATN'de FENa > %2'dir. Ancak yenidoğanların proksimal tübülleri fizyolojik olarak henüz sodyumu tam kapasiteyle tutamaz ve idrarla fizyolojik sodyum kaybı fazladır. Bu yüzden FENa eşikleri yükseltilmiştir; yenidoğanlarda < %2 prerenal durumu, > %2.5 ise ATN'yi (yapısal hasarı) gösterir.",
  },
  {
    id: 6,
    q: "Beş yaşında bir kız çocuğu, üç gün süren kanlı ishalin ardından solukluk, anüri (idrar çıkışı yok) ve bacaklarında peteşiyel döküntüler ile acil servise getiriliyor. Laboratuvar tahlillerinde derin trombositopeni ve periferik yaymada şiztositlerin izlendiği mikroanjiyopatik anemi saptanıyor. Bu hastadaki akut böbrek hasarının patofizyolojik yerleşimi ve etiyolojik mekanizması aşağıdaki kategorilerden hangisine aittir?",
    options: [
      "A) İshal kaynaklı volüm deplesyonuna bağlı Prerenal hasar",
      "B) Üriner sistem tıkanıklığına bağlı Postrenal obstrüksiyon",
      "C) NSAİİ kullanımına bağlı Akut interstisyel nefrit",
      "D) Hemolitik Üremik Sendrom'a (HÜS) bağlı İntrinsik (renal) vasküler hasar",
      "E) Miyokardit ve konjestif kalp yetmezliğine sekonder renal iskemisi",
    ],
    correct: "D",
    explanation:
      "Kanlı ishal prodromunu takiben gelişen anemi, trombositopeni ve akut böbrek hasarı triadı, Shiga toksin üreten bakterilerin neden olduğu Tipik Hemolitik Üremik Sendrom'un (HÜS) klasik tablosudur. Toksinler doğrudan renal glomerüler endotel hücrelerine zarar vererek mikrovasküler trombozlara yol açar, bu nedenle durum intrinsik (renal) böbrek hasarı kategorisindedir. İshal olmasına rağmen tablo artık sadece sıvı açığı (prerenal) değildir, hücresel hasar oturmuştur.",
  },
  {
    id: 7,
    q: "Çocuklarda idrar çıkış miktarının azalması (oligüri veya anüri), serum kreatinin yükselmesinden çok daha önce böbrek disfonksiyonunu gösterebilir. KDIGO evreleme sisteminde, en şiddetli evre olan Evre 3 ABH tanısında idrar çıkışının saatte kaç mL/kg'ın altında ve ne kadar süreyle kalması veya tamamen durması (anüri) kriter olarak belirlenmiştir?",
    options: [
      "A) < 0.5 mL/kg/saat (6 saat boyunca)",
      "B) < 0.5 mL/kg/saat (12 saat boyunca)",
      "C) < 0.3 mL/kg/saat (≥ 24 saat boyunca) VEYA anüri (≥ 12 saat)",
      "D) < 1.0 mL/kg/saat (12 saat boyunca)",
      "E) < 0.1 mL/kg/saat (6 saat boyunca)",
    ],
    correct: "C",
    explanation:
      "KDIGO Evre 1 ve 2 için sınır < 0.5 mL/kg/saat iken, Evre 3'te tablonun derinleştiğini göstermek üzere sınır daha da daraltılarak < 0.3 mL/kg/saat hıza ve 24 saatlik süreye çekilmiştir. Alternatif olarak 12 saatlik anüri (hiç idrar çıkmaması) doğrudan Evre 3 olarak kabul edilir.",
  },
  {
    id: 8,
    q: "ABH tanısında güncel yaklaşımlarda fonksiyonel serum kreatinin ölçümüne yapısal bir alternatif olarak sunulan, tüm çekirdekli hücrelerden sabit bir hızda üretildiği için kas kütlesinden, cinsiyetten, hidrasyondan veya beslenmeden etkilenmeyen endojen renal belirteç aşağıdakilerden hangisidir?",
    options: [
      "A) Ürik asit",
      "B) Kan Üre Azotu (BUN)",
      "C) Sistatin C",
      "D) İdrar NGAL düzeyi",
      "E) Beta-2 mikroglobulin",
    ],
    correct: "C",
    explanation:
      "Sistatin C, nonglikozile bir proteindir ve tüm hücrelerde sabit üretilir. Kas kütlesine bağımlı olan kreatinin aksine, özellikle erken evrelerde veya kas kütlesi çok düşük çocuklarda/yenidoğanlarda GFR'nin çok daha tutarlı ve bağımsız bir göstergesidir. NGAL bir biyobelirteçtir ancak sistatin C doğrudan GFR tahmini için kreatinin yerini alan yapısal bir endojen filtredir.",
  },
  {
    id: 9,
    q: "Böbrek ultrasonografisinde belirgin bilateral hidronefroz ve dilate böbrek pelvisi saptanan, fizik muayenesinde karın alt kadranında mesanesi distandü (dolu ve gergin) olarak palpe edilen 2 haftalık erkek bebekteki ABH tablosu, etiyolojik sınıflamada aşağıdakilerden hangisine uyar?",
    options: [
      "A) Prerenal - Hipo-perfüzyon",
      "B) İntrinsik - Glomerüler yıkım",
      "C) İntrinsik - Tübüler iskemik hasar",
      "D) İntrinsik - İnterstisyel nefrit",
      "E) Postrenal - Obstrüktif üropati",
    ],
    correct: "E",
    explanation:
      "Erkek bebekte bilateral böbrek genişlemesi (hidronefroz) ve idrarını boşaltamamaya bağlı şişmiş bir mesane bulgusu, idrar yolunun mesane altı seviyesinde tıkandığını kanıtlar. Bu durumun pediatrideki en klasik örneği posterior üretral valvdir (PUV). Hidrostatik basıncın böbreğe vurmasıyla oluşan hasar anatomik engelden kaynaklandığı için Postrenal sınıftadır.",
  },
  {
    id: 10,
    q: "Yedi yaşındaki erkek çocukta, şiddetli bir streptokokal farenjit enfeksiyonu geçirdikten yaklaşık iki hafta sonra aniden idrarda çay rengi değişiklik (makroskopik hematüri), kan basıncı yüksekliği ve göz kapaklarında (periorbital) ödem gelişiyor. Bu hastadan alınan böbrek biyopsisinin histopatolojisinde aşağıdakilerden hangisinin görülmesi patognomoniktir?",
    options: [
      "A) Podosit ayakçıkları altında immün kompleks birikimini gösteren subepitelyal hörgüç ('hump') oluşumları",
      "B) Sadece renal proksimal tübüllerde epitel dökülmesi ve nekroz",
      "C) İdrar yolları obstrüksiyonuna bağlı artmış pelvik kistik dilatasyonlar",
      "D) Glomerüler bazal membranın tamamen incelip ayrılması",
      "E) Eozinofil infiltrasyonuna bağlı masif interstisyel inflamasyon",
    ],
    correct: "A",
    explanation:
      "Klinik tablo, dolaşımdaki antijen-antikor komplekslerinin glomerüllerde çökmesi sonucu oluşan akut post-streptokokal glomerülonefrittir. Patolojisinde, epitel hücresinin (podositin) hemen altında elektron yoğun immün birikimlerin oluşturduğu ve mikroskopta hörgüç (hump) olarak adlandırılan çıkıntılar izlenmesi bu hastalığa özgüdür. Eozinofili interstisyel nefritte, tübül dökülmesi ATN'de görülür.",
  },
  {
    id: 11,
    q: "ABH yönetimi sırasında pediatrik hastalarda karşılaşılan, solunum kaslarını veya santral sinir sistemini etkilemeden önce doğrudan kardiyak ileti sistemini bozarak ölümcül aritmilere (asistoli veya ventriküler fibrilasyon) yol açtığı için ilk basamakta hızlıca tespit edilip medikal olarak müdahale edilmesi gereken en acil elektrolit anormalliği aşağıdakilerden hangisidir?",
    options: [
      "A) Hiponatremi",
      "B) Hiperkalemi",
      "C) Hiperfosfatemi",
      "D) Hipokalsemi",
      "E) Hipomagnezemi",
    ],
    correct: "B",
    explanation:
      "Böbrek fonksiyonunun ani kaybında hidrojen ile birlikte potasyum atılımı da durur. Hiperkalemi, EKG'de sivri T dalgaları ile başlar ve QRS genişlemesi ile hızla ölümcül kardiyak arrest tablosuna gider. Bu nedenle ABH'de en acil yönetilmesi gereken, gerekirse reçine tedavisi veya acil hemodiyaliz başlatılmasını gerektiren durum hiperkalemidir.",
  },
  {
    id: 12,
    q: "ABH hastasında FENa değerinin yanı sıra idrar osmolaritesi incelendiğinde, idrarı konsantre etme yeteneğine bakarak Akut Tübüler Nekroz (ATN) ve Prerenal ABH ayrımı yapılabilir. Bu iki durumdaki beklenen ozmolalite bulguları hangi seçenekte doğru eşleştirilmiştir?",
    options: [
      "A) ATN'de idrar konsantre edilir (>500 mosmol/kg) / Prerenal'de idrar seyreltiktir (<350 mosmol/kg).",
      "B) ATN'de idrar seyreltiktir (<350 mosmol/kg) / Prerenal'de idrar konsantre edilir (>500 mosmol/kg).",
      "C) Her ikisinde de böbrek su tutmaya çalıştığı için idrar eşit derecede konsantredir.",
      "D) Her ikisinde de idrar seyreltiktir, ayırıcı tanı sadece idrar sodyumu ile yapılır.",
      "E) ATN'de idrar ozmolaritesi her zaman kan ozmolaritesinin en az iki katıdır.",
    ],
    correct: "B",
    explanation:
      "Prerenal durumda tübüller hücresel olarak sağlamdır, bu nedenle ADH (antidiüretik hormon) etkisine yanıt vererek vücut suyunu korumak için idrarı maksimum düzeyde konsantre ederler (>500 mosmol/kg). Ancak ATN'de tübüller zedelendiği için suyu geri emme yeteneklerini (konsantrasyon defekti) kaybederler ve idrar, plazma ozmolalitesine yakın veya daha seyreltik (<350 mosmol/kg) olarak atılır.",
  },
  {
    id: 13,
    q: "Akut böbrek hasarı tablosundaki bir çocuğa akut Renal Replasman Tedavisi (Hemodiyaliz) başlanması kararı verilirken, aşağıdaki durumlardan hangisi diyaliz için kesin (mutlak) bir endikasyon teşkil etmez ve öncelikle medikal takibi gerektirir?",
    options: [
      "A) Medikal tedaviye ve reçinelere dirençli hiperkalemi",
      "B) Diüretiklere yanıt vermeyen ve pulmoner ödeme yol açan dirençli sıvı yüklenmesi",
      "C) Üremik ensefalopati (bilinç bulanıklığı) ve üremik perikardit bulguları",
      "D) Şiddetli ve bikarbonat infüzyonuna yanıtsız derin metabolik asidoz",
      "E) Başvuru anında sadece BUN düzeyinin 40 mg/dL seviyesinde olması",
    ],
    correct: "E",
    explanation:
      "Dirençli hiperkalemi, refrakter sıvı yükü, derin asidoz ve üremik komplikasyonlar (ensefalopati/perikardit) diyalizin mutlak ve acil endikasyonlarıdır. Ancak BUN seviyesinin tek başına artmış olması (özellikle 40 mg/dL gibi ılımlı bir yükseklik), hastanın kliniği stabilse ve hayatı tehdit eden asidoz/hiperkalemi yoksa acil diyaliz gerektirmez; öncelikli olarak sıvı tedavisi ile yönetilebilir.",
  },
  {
    id: 14,
    q: "Pediatrik hastalarda tahmini glomerüler filtrasyon hızını (eGFH) başucu yöntemiyle kolayca ve hızlıca hesaplamak için kullanılan Modifiye Schwartz formülü (eGFH=0.413 x Boy/SCr), matematiksel olarak hangi hasta parametrelerine dayanır?",
    options: [
      "A) Yaş ve Vücut Ağırlığı (Kg)",
      "B) Boy uzunluğu (cm) ve Kan Üre Azotu (BUN)",
      "C) Boy uzunluğu (cm) ve Serum Kreatinin (mg/dL)",
      "D) Vücut Ağırlığı (Kg) ve Serum Kreatinin (mg/dL)",
      "E) Vücut Yüzey Alanı ve İdrar Sodyumu",
    ],
    correct: "C",
    explanation:
      "Geleneksel Schwartz formülü, çocuğun boy uzunluğunun (cm) belirli bir katsayıyla (güncel modifikasyonda 0.413) çarpılıp, plazma kreatinin düzeyine bölünmesiyle eGFH'yi doğrudan hesaplar. Vücut ağırlığını veya BUN değerini hesaba katmaz.",
  },
  {
    id: 15,
    q: "pRIFLE sınıflandırma kriterlerinin son evrelerine doğru ilerlerken hastalığın geçici bir hasardan çıkıp kalıcı bir yetmezliğe doğru gittiğine işaret eden 'Loss (Kayıp)' kategorisi için hastada hangi klinik durumun gerçekleşmesi şart koşulmuştur?",
    options: [
      "A) Glomerüler filtrasyon hızında %100'lük mutlak bir durma olması",
      "B) Tanı konan böbrek yetmezliği tablosunun klinik olarak 4 haftadan daha uzun süre devam etmesi (Persistan yetmezlik)",
      "C) Hastanın yoğun bakım Ünitesinde en az 3 gün sürekli diyaliz makinesine bağlı kalması",
      "D) İdrar çıkışının herhangi bir müdahaleye rağmen 6 saat boyunca hiç olmaması",
      "E) Kreatinin seviyesinin yatış değerinin sadece 2 katına çıkması",
    ],
    correct: "B",
    explanation:
      "pRIFLE kriterlerindeki R, I, F harfleri hasarın şiddetini belirtirken, L (Loss) ve E (End-stage) zaman içindeki sonuçları belirtir. Böbrek fonksiyon kaybının 4 haftadan (1 ay) uzun sürmesi 'Loss' evresini, 3 aydan uzun sürmesi ise kalıcı böbrek hastalığını ifade eden 'End Stage' evresini tanımlar.",
  },
  {
    id: 16,
    q: "Uluslararası KDIGO kılavuzunun son taslak güncellemelerinde, Akut Böbrek Hasarı (AKD/AKI) çerçevesi genişletilirken, erken tanıyı artırmak amacıyla serum kreatinin ve idrar çıkışı gibi geleneksel fonksiyonel kriterlerin yanına resmi olarak hangi yeni değerlendirme kriteri kategorisi eklenmiştir?",
    options: [
      "A) Vücut kitle indeksi varyasyon ölçümleri",
      "B) Böbrek ultrasonografisinde saptanan kortikal kalınlık değişiklikleri",
      "C) Yapısal böbrek hasarı belirteçleri (Biyomarker elevasyonu ve Sistatin C artışı)",
      "D) Kemik mineral yoğunluğu taramaları",
      "E) Santral venöz basınçtaki saatlik dalgalanmalar",
    ],
    correct: "C",
    explanation:
      "Güncel KDIGO taslak kılavuzları, böbrek yetmezliğini sadece işlevsel bir azalma olarak değil, aynı zamanda hücresel düzeyde yapısal bir hasar olarak ele almaktadır. Bu nedenle SCr ve UO fonksiyonel kriterlerine ek olarak, böbrekteki yapısal hasarı daha kreatinin yükselmeden gösteren biyomarkerlar ve Sistatin C artışları yapısal tanı kriteri olarak teşvik edilmektedir.",
  },
  {
    id: 17,
    q: "Bir çocuğun klinik takibinde böbrek fonksiyonunda saatler/günler içerisinde yıkıcı bir gerileme görülüyor ve yapılan böbrek biyopsisinin histopatolojik incelemesinde glomerül epitel hücrelerinin çoğalarak Bowman kapsülü içinde 'hilal (kresent)' şeklinde proliferatif yapılar oluşturduğu saptanıyor. Bu patolojik görünüm klinik olarak hangi agresif sendromun tanımına uyar?",
    options: [
      "A) Basit akut prerenal oligüri",
      "B) Hızlı ilerleyen (Kresentik) glomerülonefrit (RPGN)",
      "C) İlaca bağlı akut interstisyel nefrit",
      "D) Minimal değişiklik hastalığı (Nefrotik Sendrom)",
      "E) Renal arter trombozu",
    ],
    correct: "B",
    explanation:
      "Bowman kapsülünü dolduran yoğun hücresel proliferasyon (kresent oluşumu), anti-GBM hastalığı veya bazı şiddetli post-enfeksiyöz GN'lerin yol açtığı, son derece agresif seyreden ve tedavi edilmezse günler içinde kalıcı yetmezliğe giden Hızlı İlerleyen Glomerülonefrit (RPGN) veya Kresentik GN tablosunun patognomonik işaretidir.",
  },
  {
    id: 18,
    q: "Pediatrik yoğun bakım ünitelerinde yatan kritik çocuklarda AKI (ABH) gelişimi açısından epidemiyolojik çalışmalarda saptanan bağımsız risk faktörleri arasında aşağıdakilerden hangisi yer almaz?",
    options: [
      "A) Sepsis kaynaklı sistemik inflamasyon ve hipotansiyon",
      "B) Aminoglikozit grubu gibi spesifik nefrotoksik antibiyotik maruziyeti",
      "C) Vücut sıcaklığının fizyolojik sınırlarda (36.5°C) seyretmesi",
      "D) Doğum sırasında yaşanan perinatal asfiksi ve organ iskemisi",
      "E) Açık kalp ameliyatları (Kardiyopulmoner bypass pompası) geçirmek",
    ],
    correct: "C",
    explanation:
      "Vücut sıcaklığının normal seyretmesi bir risk faktörü değildir. Oysa sepsisin yarattığı vazodilatasyon, aminoglikozitlerin tübüler toksisitesi, asfiksideki global oksijensizlik ve açık kalp ameliyatlarında bypass makinesine bağlı dolaşım arrestleri pediatrik ABH'nin en büyük yoğun bakım riskleridir.",
  },
  {
    id: 19,
    q: "İlaç toksisitesinin ABH üzerindeki etkisi göz önüne alındığında, tanısal amaçlı kullanılan iyotlu radyokontrast maddelerin çocuklarda böbrek hasarı oluşturmasındaki ana patofizyolojik mekanizma aşağıdakilerden hangisidir?",
    options: [
      "A) Glomerüllerin yapısını bozarak kresent oluşumunu indüklemesi",
      "B) Böbrek medüllasında vazokonstriksiyona bağlı iskemi yaratması ve doğrudan tübüler hücre toksisitesi yapması",
      "C) İdrarda kristalleşip üreterleri tıkayarak taş oluşturması",
      "D) Mesane boynunda nörojenik sfinkter spazmı yaratarak çıkışı kapatması",
      "E) Doğrudan hipotalamusu baskılayarak ADH salınımını durdurması",
    ],
    correct: "B",
    explanation:
      "Radyokontrast ajanlar sağlıklı çocuklarda genelde tolere edilse de, volüm açığı olanlarda böbrek medüllasında kan akımını keserek vazokonstriktif iskemi yaratırlar ve ayrıca doğrudan böbrek tübül hücrelerine toksik etki yaparak akut tübüler hasara yol açarlar.",
  },
  {
    id: 20,
    q: "Çok düşük doğum ağırlıklı prematüre bir bebekte ABH insidansının zamanında doğan bebeklere göre belirgin düzeyde artmış olmasının en temel embriyolojik açıklaması aşağıdakilerden hangisidir?",
    options: [
      "A) Karaciğerdeki üre döngüsü enzimlerinin çok hızlı sentezlenmesi",
      "B) Prematüre bebeklerde mesane kapasitesinin çok küçük olması",
      "C) Gebeliğin üçüncü trimesterinde gerçekleşmesi gereken nefron oluşum sürecinin (nefrojenez) erken doğumla kesintiye uğramış olması",
      "D) Anne sütünde böbrekleri koruyucu yeterli sodyumun bulunmaması",
      "E) Kordon kanında yoğun oksijen bulunmasının oksidatif hasar yapması",
    ],
    correct: "C",
    explanation:
      "Fetal hayatta nefron gelişimi (nefrojenez) ağırlıklı olarak 36. haftaya kadar, yani üçüncü trimesterde devam eder. Bebek bu süreyi tamamlamadan doğduğunda nefron havuzu eksik kalır. Bu anatomik eksiklik, prematüre bebeğin böbreklerini doğum sonrası hemodinamik streslere ve oksijensizliğe (hipoksi) karşı son derece kırılgan hale getirir.",
  },
];

const kbyQuestions: Question[] = [
  {
    id: 1,
    q: "Uluslararası KDIGO rehberlerine göre, böbrek fonksiyonlarının ilerleyici kaybını tanımlayan Kronik Böbrek Hastalığının (KBH) evreleri (G1-G5) belirlenirken esas alınan temel fizyolojik ölçüt aşağıdakilerden hangisidir?",
    options: [
      "A) Çocuğun 24 saatlik idrar hacmi (Poliüri varlığı)",
      "B) Sistemik kan basıncı düzeyi",
      "C) Tahmini Glomerüler Filtrasyon Hızı (eGFH)",
      "D) Serum albümin miktarı ve ödem durumu",
      "E) Retikülosit sayısı ve Hemoglobin seviyesi",
    ],
    correct: "C",
    explanation:
      "KBH'nin şiddetini ve hastanın SDBH'ye olan yakınlığını belirleyen KDIGO evreleme sistemi, mutlak surette hastanın eGFH (mL/dk/1.73m²) değerine göre kategorize edilir (Örn: G3a için 45-59, G5 için <15). İdrar hacmi veya tansiyon komplikasyon göstergeleridir, evreleme aracı değillerdir.",
  },
  {
    id: 2,
    q: "Beş yaşındaki bir çocuk hastada 'Kronik Böbrek Hastalığı' tanısının resmi olarak konulabilmesi için, saptanan böbrek fonksiyon ve yapı anormalliklerinin (örneğin proteinüri veya düşük GFH) aralıksız olarak en az ne kadar süredir devam ediyor olması şart koşulmuştur?",
    options: ["A) 1 hafta", "B) 2 hafta", "C) 1 ay", "D) 3 ay", "E) 1 yıl"],
    correct: "D",
    explanation:
      "KDIGO kriterlerine göre, akut böbrek hasarı ile kronik böbrek hastalığını ayıran temel çizgi zaman dilimidir. Yapısal veya fonksiyonel anormalliklerin KBH olarak adlandırılabilmesi için >3 ay boyunca persistan olarak devam etmesi gerekir.",
  },
  {
    id: 3,
    q: "Çocuklarda KBH evrelemesi yapılırken, '3 aylık süre' kuralının ve standart G1-G5 GFR eşiklerinin doğrudan uygulanamadığı, zira fizyolojik olarak GFH'nin hala matürasyon (olgunlaşma) aşamasında kabul edildiği pediatrik yaş grubu aşağıdakilerden hangisidir?",
    options: [
      "A) 2 yaş altı bebekler ve yenidoğanlar",
      "B) 3-5 yaş arası oyun çocukları",
      "C) 6 - 10 yaş arası okul çocukları",
      "D) 10-15 yaş arası puberte dönemi",
      "E) Sadece adölesanlar (>15 yaş)",
    ],
    correct: "A",
    explanation:
      "Sağlıklı doğan yenidoğanların eGFH'si 40-60 mL/dk civarındadır, bu erişkinler için evre 3 KBH demektir ancak bebek için tamamen normaldir. GFH ancak 2 yaşına doğru 90 mL/dk'nın üzerine çıkarak erişkin seviyesine ulaşır. Bu nedenle evreleme eşikleri <2 yaş grupta geçersizdir ve 3 ay kuralı da 3 aydan küçük infantlar için mantıksal olarak uygulanamaz.",
  },
  {
    id: 4,
    q: "Hastalığı sürekli ilerleyen ve KDIGO'ya göre Evre 4 (G4) KBH olarak sınıflandırılan bir çocuk hastada beklenen tahmini GFH aralığı aşağıdakilerden hangisidir?",
    options: [
      "A) ≥ 90 mL/dk/1.73m²",
      "B) 60-89 mL/dk/1.73m²",
      "C) 45-59 mL/dk/1.73m²",
      "D) 15-29 mL/dk/1.73m²",
      "E) < 15 mL/dk/1.73m²",
    ],
    correct: "D",
    explanation:
      "KDIGO evreleme sistemine göre; Evre 1 >90, Evre 2 60-89, Evre 3a 45-59, Evre 3b 30-44 aralığıdır. Evre 4 ise diyalizden bir önceki şiddetli kayıp dönemi olup eGFH'nin 15-29 mL/dk/1.73m² arasına düştüğünü gösterir.",
  },
  {
    id: 5,
    q: "Erişkin popülasyondan farklı olarak, dünya genelinde kayıt sistemlerine bakıldığında pediatrik Kronik Böbrek Hastalığının (KBH) en yaygın görülen (olguların yaklaşık %50'sini oluşturan) majör etiyolojisi aşağıdakilerden hangisidir?",
    options: [
      "A) Tip 1 ve Tip 2 Diyabetik Nefropati",
      "B) Böbrek ve İdrar Yollarının Doğumsal Anomalileri (CAKUT)",
      "C) Hipertansif nefroskleroz",
      "D) Sistemik Lupus Eritematozus nefriti",
      "E) Akut post-streptokokal glomerülonefritin kronikleşmesi",
    ],
    correct: "B",
    explanation:
      "Erişkinlerde KBH'nin şampiyonu diyabet ve hipertansiyondur. Ancak çocuklarda kronik böbrek yetmezliği ağırlıklı olarak yapısal/embriyolojik kusurlardan kaynaklanır. Konjenital hipoplazi, agenezis, multikistik displastik böbrekler ve posterior üretral valv gibi hastalıkları barındıran CAKUT yelpazesi pediatrik KBH'nin açık ara en büyük nedenidir.",
  },
  {
    id: 6,
    q: "Çocuklarda, idrarın mesaneden üreterlere geri kaçtığı Vezikoüreteral Reflü (VUR) varlığında, tekrarlayan ateşli İdrar Yolu Enfeksiyonlarının (İYE) da tabloya eklenmesiyle böbrek parankiminde ilerleyici skar (nedbe) oluşumuyla karakterize duruma ne ad verilir?",
    options: [
      "A) Akut tübüler nekroz",
      "B) Reflü nefropatisi",
      "C) Üremik ensefalopati",
      "D) Alport Sendromu",
      "E) Minimal Değişiklik Hastalığı",
    ],
    correct: "B",
    explanation:
      "Bakteri içeren idrarın yüksek basınçla böbrek pelvikaliseal sistemine reflüsü, renal parankimde ciddi bir inflamasyon başlatır. İyileşme süreci fibrozisle (skarlaşma) sonuçlanır. Bu mekanizmayla ortaya çıkan parankim kaybı 'Reflü Nefropatisi' olarak adlandırılır.",
  },
  {
    id: 7,
    q: "Erken çocukluk döneminde geçirdiği İYE'ler sonucunda reflü nefropatisi gelişmiş ve böbreklerinde yaygın skarları olan bir hastada, yıllar içinde klinik olarak en sık saptanan ve KBH progresyonunu hızlandıran komplikasyon aşağıdakilerden hangisidir?",
    options: [
      "A) Ortotastik hipotansiyon atakları",
      "B) İkincil Hipertansiyon ve proteinüri (mikroalbüminüri) gelişimi",
      "C) Pankreas yetmezliği ve Tip 1 Diyabet",
      "D) Karaciğerde siroz ve portal hipertansiyon",
      "E) Safra taşı oluşumu",
    ],
    correct: "B",
    explanation:
      "Skarlaşmış böbrek dokusu lokal olarak iskemik kalır ve vücut buna yanıt olarak renin salgılar. Bu da sistemik sekonder hipertansiyona yol açar. Artan basınç sağlam glomerülleri zedeler (fokal segmental glomerüloskleroza kayar) ve idrarda protein kaçağı başlar. Hipertansiyon ve mikroalbüminüri reflü nefropatili erişkin ve çocukların en tipik uzun dönem sorunudur.",
  },
  {
    id: 8,
    q: "KBH ilerledikçe böbreğin endokrin ve ekskretuvar fonksiyonlarının çökmesiyle gelişen 'Kronik Böbrek Hastalığı-Mineral ve Kemik Bozukluğu'nda (CKD-MBD), hastada beklenen tipik serum laboratuvar bulgusu profili aşağıdakilerden hangisidir?",
    options: [
      "A) Hiperkalsemi, Hipofosfatemi, Düşük Paratiroid Hormonu (PTH)",
      "B) Hipokalsemi, Hiperfosfatemi, Yüksek Paratiroid Hormonu (Sekonder Hiperparatiroidizm)",
      "C) Hipokalsemi, Hipofosfatemi, Normal Paratiroid Hormonu",
      "D) Hiperkalsemi, Hiperfosfatemi, Düşük Paratiroid Hormonu",
      "E) Normal Kalsiyum, Düşük Fosfor, Düşük Paratiroid Hormonu",
    ],
    correct: "B",
    explanation:
      "Böbrek GFR'si azaldığında kanın fosfor yükü atılamaz (Hiperfosfatemi). Artan fosfor serumdaki serbest kalsiyuma bağlanır ve çöker. Aynı zamanda hasarlı böbrek D vitaminini aktifleştiremediği için bağırsaktan kalsiyum emilemez (Hipokalsemi). Vücut düşen kalsiyumu düzeltmek için paratiroid bezini çılgınca çalıştırır ve aşırı PTH salgılanır (Sekonder Hiperparatiroidizm).",
  },
  {
    id: 9,
    q: "Böbrek kaynaklı kemik anormalliği olan 'Renal Osteodistrofi'nin patogenezinde ve kemik yıkımının hızlanmasında rol oynamayan patofizyolojik faktör aşağıdakilerden hangisidir?",
    options: [
      "A) Böbreklerin aktif D vitamini (1,25-OH Kolekalsiferol) üretiminde yetersiz kalması",
      "B) Paratiroid bezinden kana salınan PTH miktarının patolojik seviyelere çıkması",
      "C) Böbreklerden idrarla fosfat atılamamasına bağlı kan fosforunun yükselmesi",
      "D) Tiroid bezinden tiroksin (T4) salınımının kontrolsüz şekilde artması",
      "E) Kemik dönüşüm (turnover) ve mineralizasyon hızındaki hücresel anormallikler",
    ],
    correct: "D",
    explanation:
      "Renal osteodistrofiyi (böbrek raşitizmi) yaratan kaskad D vitamini eksikliği, hiperfosfatemi, hipokalsemi ve bunları düzeltmeye çalışan PTH'nin kemiği eritmesinden ibarettir. Tiroid bezinin veya tiroksin hormonunun CKD-MBD tablosunda hiçbir direkt belirleyici rolü yoktur.",
  },
  {
    id: 10,
    q: "X'e bağlı hipofosfatemik rikets (XLH) hastası bir çocukta, yüksek doz geleneksel vitamin D tedavisine rağmen bacaklarda eğrilik (genu varum) ve boy kısalığı gibi rikets bulgularının düzelmemesinin temel hücresel mekanizması nedir?",
    options: [
      "A) Kemiğin PTH reseptörlerinin genetik olarak tamamen yok olması",
      "B) Karaciğerdeki D vitamini sentezleyen enzimin eksikliği",
      "C) PHEX gen mutasyonuna bağlı olarak artmış FGF23 hormonunun böbreklerden durmaksızın fosfat kaybettirmesi",
      "D) İnce bağırsakta kalsiyum taşıyıcı kanalların yapısının bozuk olması",
      "E) Oksidatif strese bağlı kemik iliği nekrozu",
    ],
    correct: "C",
    explanation:
      "XLH basit bir besinsel D vitamini eksikliği değildir. Kök nedeni X kromozomundaki PHEX gen mutasyonudur. Bu mutasyon, FGF23 hormonunun parçalanmasını engeller. Aşırı artan FGF23 böbreklere giderek fosfatın idrarla tamamen kaybedilmesine ve kemiğe çökecek mineral kalmamasına neden olur.",
  },
  {
    id: 11,
    q: "Çok ileri evre Son Dönem Böbrek Yetmezliği olan ve kan üre azotu (BUN) seviyesi 200 mg/dL'yi aşan bir çocuk hastada, terin cilt yüzeyinde buharlaşması sonucunda alın ve saçlı deri gibi bölgelerde beyaz, tuza benzer ince kristallerin oluştuğu nadir klinik tabloya ne ad verilir?",
    options: [
      "A) Eritema nodozum",
      "B) Üremik frost (Üremik kırağı)",
      "C) İktiyozis vulgaris",
      "D) Henoch-Schönlein purpurası döküntüsü",
      "E) Epidermolizis bülloza",
    ],
    correct: "B",
    explanation:
      "Üremik frost, böbreklerden süzülemeyen devasa miktardaki ürenin ter bezleri yoluyla cilt yüzeyine atılması ve terin kurumasıyla üre tuzlarının çökelmesi durumudur. Günümüzde KBH hastalarının erken dönemde diyalize alınması sebebiyle çok nadir rastlanan tarihi bir bulgudur.",
  },
  {
    id: 12,
    q: "Günümüzde, çocukluk çağındaki fosfat ziyanı yapan spesifik bir KBH formu olan X'e bağlı hipofosfatemik rikets (XLH) yönetiminde çığır açan ve doğrudan FGF23 hormonunu bloke ederek idrarla fosfat kaybını durduran insan monoklonal antikoru aşağıdakilerden hangisidir?",
    options: [
      "A) Rituksimab",
      "B) Eculizumab",
      "C) Burosumab",
      "D) İnfliksimab",
      "E) Omalizumab",
    ],
    correct: "C",
    explanation:
      "Burosumab, FGF23'ü spesifik olarak hedef alıp bağlayarak etkisiz hale getiren, böylece böbreğin fosfatı geri emmesini sağlayarak XLH'deki kemik deformasyonlarını başarıyla iyileştiren çok yeni ve devrim niteliğinde bir tedavidir.",
  },
  {
    id: 13,
    q: "Kronik Böbrek Hastalığı ilerledikçe çocuk hastalarda klinik olarak halsizlik, solukluk ve yorgunluk şikayetleriyle saptanan normositik normokromik aneminin en birincil patofizyolojik nedeni aşağıdakilerden hangisidir?",
    options: [
      "A) Sık görülen mide-bağırsak kanamaları",
      "B) İnce bağırsakta B12 vitamini emilim defekti",
      "C) Skarlaşmış böbrek dokusundan kemik iliğini uyaran Eritropoietin (EPO) salınımının yetersiz kalması",
      "D) Kırmızı kan hücrelerinin oraklaşması",
      "E) Demir emiliminin tamamen durması",
    ],
    correct: "C",
    explanation:
      "KBH'de üremik toksinler nedeniyle eritrosit yaşam süresi bir miktar kısalsa da, aneminin esas ve en derin nedeni renal korteksteki peritübüler interstisyel hücrelerden salgılanması gereken eritropoietin hormonunun, böbrek dokusunun fibrozise gitmesi sebebiyle üretilememesidir. Dışarıdan EPO replasmanı anemiyi düzeltir.",
  },
  {
    id: 14,
    q: "Böbreğin anatomik yapısını ve kronikleşmiş hastalık sekellerini değerlendirmek için ultrasonografi yapıldığında, KBY tanısıyla uyumlu olan en spesifik radyo-anatomik bulgu aşağıdakilerden hangisidir?",
    options: [
      "A) Böbrek kortikal kalınlığının artarak şişmesi",
      "B) Skar dokusuna bağlı olarak böbrek parankim ekojenitesinin artması ve genel boyutların (uzunluğun) küçülerek büzüşmesi",
      "C) Her iki böbrekte devasa boyutta sıvı dolu kistlerin aniden ortaya çıkması",
      "D) Sadece böbrek veninin trombozla tıkanarak genişlemesi",
      "E) Normalde siyah görünen medüller piramitlerin tamamen yok olması",
    ],
    correct: "B",
    explanation:
      "Akut böbrek hasarında böbrekler inflamasyon ve ödemle şişmiş (büyümüş) olabilir. Ancak kronik böbrek hastalığında süreç fibrozis (nedbe dokusu oluşumu) ile sonuçlandığı için böbrekler büzüşür (boyut küçülür), kortikal tabaka incelir ve fibroz doku ses dalgalarını fazla yansıttığı için böbrek USG'de karaciğere veya dalağa kıyasla çok daha parlak (ekojenik) görünür.",
  },
  {
    id: 15,
    q: "Bir yenidoğanda KBH için artmış riski işaret eden ve CAKUT şüphesi uyandırarak derhal abdominal böbrek ultrasonografisi çekilmesini gerektiren klinik/fiziksel bulgulardan biri aşağıdakilerden hangisidir?",
    options: [
      "A) Dış kulak yapısında doğumsal malformasyonlar veya umbilikal kordonda tek arter bulunması",
      "B) Gözlerin beyazında (sklerada) ikter (sarılık) saptanması",
      "C) Doğum travmasına bağlı kafa derisinde sefalhematom oluşumu",
      "D) Omuz distosisi nedeniyle gelişen brakial pleksus felci",
      "E) Konjenital katarakt varlığı",
    ],
    correct: "A",
    explanation:
      "Kulak ile böbrekler embriyolojik olarak aynı dönemde ve eş zamanlı gelişim sinyalleri ile şekillenirler. Bu nedenle düşük kulak, dış kulak malformasyonları veya normalde iki arter bir ven olması gereken kordonda tek umbilikal arter saptanması, genetik veya sendromik CAKUT tablolarının kuvvetli habercileridir ve böbrek USG taranmasını zorunlu kılar.",
  },
  {
    id: 16,
    q: "KDIGO evreleme sistemine göre 'Evre 5' olarak sınıflandırılan (Son Dönem Böbrek Hastalığı) ve eGFH'si kalıcı olarak < 15 mL/dk/1.73m²'nin altına düşen bir çocuğun hayatta kalmasını sağlamak için uygulanması gereken nihai tıbbi standart yaklaşım aşağıdakilerden hangisidir?",
    options: [
      "A) Yalnızca diyetteki sodyumu ve suyu kısıtlamak",
      "B) Toksin birikimini önleyecek Renal Replasman Tedavilerine (Diyaliz yöntemleri veya Böbrek Nakli) başlamak",
      "C) İnflamasyonu baskılamak için çok yüksek doz kortikosteroid infüzyonu",
      "D) Kemikleri korumak için yüksek doz intravenöz kalsiyum infüzyonu",
      "E) Böbreği idrar üretmeye zorlamak için bol hidrasyon ve loop diüretiği",
    ],
    correct: "B",
    explanation:
      "Evre 5'te böbrek fonksiyonları o kadar düşüktür ki, diyet modifikasyonları veya diüretikler bedenin üremik toksinlerden temizlenmesi veya sıvı dengesi için artık yeterli olamaz. Hastanın yaşamını idame ettirebilmesi için makine destekli diyalize (hemodiyaliz veya periton diyalizi) başlanması ve en kesin çözüm olarak böbrek transplantasyonuna yönlendirilmesi elzemdir.",
  },
  {
    id: 17,
    q: "Böbrekte yapısal bir zedelenme gelişmesine rağmen, tahmini GFH değerinin (≥90 mL/dk) hala normal sınırlarda olduğu bir hastaya Evre 1 KBH denebilmesi için aşağıdakilerden hangisinin pozitif saptanması gerekir?",
    options: [
      "A) Şiddetli sol kalp yetmezliği bulguları",
      "B) Ekokardiyografide aort kapak darlığı",
      "C) Yapısal veya üriner böbrek hastalığı kanıtı (Örneğin idrarda sürekli proteinüri, hematüri veya USG'de anatomik bozukluk)",
      "D) Anne ile bebek arasında kan grubu uyuşmazlığı tespiti",
      "E) Sadece doğumdaki Apgar skorunun düşük kalması",
    ],
    correct: "C",
    explanation:
      "KBH evre 1 tanımı, 'fonksiyonları tamamen normal de olsa böbrekte saptanabilir yapısal bir anormalliğin olması' esasına dayanır. GFH normal olabilir ancak hasta sürekli protein kaçırıyorsa veya USG'de displastik bir böbrek varsa bu durum Evre 1 KBH'dir.",
  },
  {
    id: 18,
    q: "Kromozom anormalliği olan Down sendromlu (Trizomi 21) çocukların böbrek sağlığı açısından taşıdıkları, literatürde yeri olan spesifik risk durumu aşağıdakilerden hangisidir?",
    options: [
      "A) Çoğunlukla karın boşluğunu dolduran dev kistik böbreklerle doğmaları",
      "B) Yaşıtlarına ve vücut yüzey alanlarına kıyasla daha küçük böbrek hacmine ve yapısal olarak azalmış glomerüler filtrasyon hızına sahip olma eğilimleri",
      "C) Post-streptokokal glomerülonefrite karşı %100 yatkın olmaları",
      "D) Sodyumu idrardan geri emememe (Tuz kaybettiren nefropati) sendromları yaşamaları",
      "E) Sadece idrar yolu enfeksiyonlarına karşı tam korumalı olmaları",
    ],
    correct: "B",
    explanation:
      "Yakın dönem araştırmaları, kromozomal bir sendrom olan Down sendromlu çocukların, anatomik malformasyon olmasa dahi, yaşa uyumlu sağlıklı kontrollere göre daha düşük böbrek hacimlerine ve bazal durumda azalmış GFR kapasitesine sahip olduklarını ortaya koymuştur; bu onları gizli KBH riskine sokar.",
  },
  {
    id: 19,
    q: "İki yaşında bilateral posterior üretral valv (PUV) tanısıyla ameliyat edilmiş ve Evre 3 KBH ile takip edilmekte olan bir çocuk hastada, DMSA (Dimercaptosuccinic acid) renal sintigrafisi istenmesinin başlıca klinik amacı nedir?",
    options: [
      "A) Dakikalık GFH değerini mL/dk olarak net bir sayıyla vermek",
      "B) Böbrek havuzcuklarında non-opak böbrek taşı varlığını saptamak",
      "C) Mesanenin maksimum idrar tutma kapasitesini mL cinsinden hesaplamak",
      "D) Enfeksiyonların ve obstrüksiyonun yarattığı böbrek parankimindeki skar (nedbe) alanlarını görüntülemek ve iki böbreğin biribirine göre fonksiyon yüzdelerini kıyaslamak",
      "E) Renal arter ve ven içindeki kan akım hızlarını Doppler gibi ölçmek",
    ],
    correct: "D",
    explanation:
      "Teknesyum 99m-DMSA sadece böbreğin kortikal parankim hücreleri tarafından tutulan radyofarmasötik bir ajandır. Sintigrafi filminde maddenin tutulmadığı soğuk alanlar olarak görülen yerler, enfeksiyonun/reflünün harabiyet yaptığı geri dönüşümsüz parankimal skarları gösterir. Ayrıca sağ böbrek %40, sol böbrek %60 süzüyor gibi oransal (diferansiyel) fonksiyon bilgisini net olarak verir.",
  },
  {
    id: 20,
    q: "Tek böbrekli (tek taraflı renal agenezis) doğan ancak anne karnındaki gelişim sürecinde kalan tek böbreğinde belirgin fetal kompansatuvar büyüme (hipertrofi) geliştiği saptanan bir bebeğin yetişkinlik dönemi KBH riski, kompansatuvar büyüme göstermeyen tek böbrekli bebeklere göre nasıldır?",
    options: [
      "A) İki kat daha yüksektir",
      "B) Tamamen aynıdır, hipertrofi işe yaramaz",
      "C) Hiç KBH riski yoktur, tam koruma sağlar",
      "D) Kompansatuvar büyüme KBH gelişim riskini belirgin şekilde azaltır",
      "E) KBH gelişimini doğrudan hızlandırır",
    ],
    correct: "D",
    explanation:
      "Tek böbrek anomalisinde, vücut rahim içinde bu durumu fark edip kalan böbrekteki nefronların ebadını ve fonksiyon kapasitesini artırırsa (kompansatuvar adaptasyon/hipertrofi), o çocuk yaşamı boyunca nispeten güvenli bir rezerv oluşturmuş olur ve yetişkinlikte KBH gelişme riski, böbreği büyüyememiş çocuklara göre istatistiksel olarak anlamlı ölçüde azalır.",
  },
];

const pdoCases: Case[] = [
  {
    id: 1,
    title:
      "Vaka 1: Yenidoğan Yoğun Bakım Ünitesi - Akut Böbrek Hasarı (Perinatal Asfiksi)",
    intro:
      "38 haftalık miadında, zor bir vajinal doğum öyküsü olan erkek bebek, doğumda ağlamadığı ve kalp tepe atımı <60/dk olduğu için resüsite ediliyor. Apgar skoru 1. dakikada 3, 5. dakikada 5 olan bebek, Hipoksik İskemik Ensefalopati (HİE) tanısıyla Yenidoğan Yoğun Bakım Ünitesi'ne (YYBÜ) alınıp hipotermi protokolüne sokuluyor. Bebeğin yaşamının 2. gününde alınan takiplerinde idrar çıkışının son 12 saattir 0.4 mL/kg/saat olduğu ve bebeğin periferik ödem geliştirdiği saptanıyor.",
    steps: [
      {
        title: "Adım 1: İlk Değerlendirme ve Fonksiyon Analizi",
        text: "Sıvı resüsitasyonu ve inotropik destek başlamadan önce bebeğin böbrek fonksiyonlarını temelden değerlendirmek istiyorsunuz. Alınan kan örneğinde Serum Kreatinin değeri 1.6 mg/dL geliyor. Bu klinik ve laboratuvar tablosu karşısında böbrek hasarı evrelemesi açısından hangi analitik yaklaşım en doğrudur?",
        options: [
          "A) Kreatinin değeri erişkin eşiklerini (0.8'i) aştığı için bu hastanın kesin Evre 2 ABH olduğuna kanaat getirir, derhal diyaliz hazırlığına başlarım.",
          "B) Yaşamın 2. günündeki kreatinin hala anneden plasentayla geçen değeri yansıtabileceği için rakama tek başına güvenmem; ancak idrar çıkışının 12 saattir 0.4 mL/kg/saat olması nKDIGO kriterlerine göre fonksiyonel olarak Evre 2 ABH tablosuna işaret eder.",
          "C) Bebek asfiktik olduğu için kas yıkımı (kreatinin) mutlaka düşüktür, tahlilin laboratuvar hatası olduğunu düşünür ve tekrar kan alırım.",
        ],
        correctLabel: "B",
        explanation:
          "Yenidoğanda, özellikle ilk haftada bakılan serum kreatinin, kendi böbreğinden süzülemeyen maternal kreatinindir ve referans almak çok zordur. Ancak idrar üretimi bebeğin kendi böbreğinin işlevini anlık olarak gösterir. nKDIGO'ya göre idrar çıkışının >12 saat boyunca <0.5 mL/kg/sa olması Evre 2 ABH kriteridir. Asfiksi, organ perfüzyonunu keserek böbreği doğrudan vurmuştur.",
      },
      {
        title: "Adım 2: Hasarın Karakterini Belirleme (Prerenal mi, ATN mi?)",
        text: "Düşük idrar çıkışının ve artan ödemin, bebeğin kalbinin iyi basamamasına bağlı bir sıvı açığından (prerenal) mı, yoksa uzamış asfiksinin yarattığı tübüler nekrozdan (renal) mı kaynaklandığını ayırt etmeniz gerekiyor. Laboratuvara idrar ve kan sodyum/kreatinin eş zamanlı örneklerini yolluyorsunuz ve Fraksiyone Sodyum Atılımı (FENa) değeri %3.1 hesaplanıyor.",
        options: [
          "A) FENa değeri yenidoğan sınırı olan %2.5'in çok üzerinde olduğu için tübüler parankim hasarı (ATN) geliştiğini anlarım, böbrek idrar yapamayacağı için agresif sıvı yüklemesinden kaçınırım.",
          "B) FENa > %2 olduğu için sıvı açığı (prerenal) vardır, bebeğe bol izotonik sıvı yüklemesi yaparım.",
          "C) Yenidoğanda tübüller olgunlaşmadığı için FENa hesaplaması hiçbir işe yaramaz, sadece ultrason çekerim.",
        ],
        correctLabel: "A",
        explanation:
          "Prerenal hasarda sağlam tübüller sodyumu korumak için emer, ATN'de ise tübül öldüğü için sodyum idrara kaçar. Yenidoğanlar için ATN eşik değeri > %2.5'tir. %3.1 değeri, iskeminin böbrek proksimal tübüllerini nekroza uğrattığını kanıtlar. Böbrek filtrasyon ve konsantrasyon yeteneğini kaybetmiştir; agresif sıvı vermek bebeği sadece daha fazla şişirir ve pulmoner ödeme sokar. Dikkatli sıvı kısıtlaması esastır.",
      },
    ],
  },
  {
    id: 2,
    title: "Vaka 2: Okul Çağı Çocuğu - Akut Glomerüler Yıkım (PSGN)",
    intro:
      "8 yaşında kız çocuğu, ailesi tarafından üç gün önce başlayan göz kapaklarında şişlik (periorbital ödem), aşırı halsizlik ve idrar renginin koyulaşarak çay rengini alması şikayetleriyle acil servise getiriliyor. Öyküsünün derinleştirilmesinde, yaklaşık 15 gün önce ateşli ve boğaz ağrılı bir tonsillit geçirdiği, ancak antibiyotik kullanmadan semptomatik olarak iyileştiği öğreniliyor. Acil serviste ölçülen kan basıncı: 145/95 mmHg (kendi yaşı için >99. persentil, hipertansif).",
    steps: [
      {
        title: "Adım 1: Etkili Laboratuvar Paneli Seçimi",
        text: "Fizik muayene ve anamnez, immün kompleks aracılı bir post-enfeksiyöz tabloyu (APSGN) işaret ediyor. Hastanın durumunu netleştirmek ve böbreğin ne kadar etkilendiğini görmek için acil şartlarda hangi laboratuvar panelini öncelikli istersiniz?",
        options: [
          "A) Sadece idrar kültürü, antibiyogram ve böbrek sintigrafisi",
          "B) Tam idrar tetkiki (hematüri/proteinüri için), serum elektrolitleri (özellikle Potasyum), kreatinin, BUN ve immünolojik tanıyı doğrulamak için C3 kompleman düzeyi ile ASO titresi",
          "C) Abdominal bilgisayarlı tomografi ve karaciğer fonksiyon testleri",
        ],
        correctLabel: "B",
        explanation:
          "Hastanın prodromal öyküsü Akut Post-Streptokokal Glomerülonefrit (APSGN) ile birebir uyumludur. Bu hastalıkta glomerüller immün komplekslerle tıkandığı için kan süzülemez, kreatinin/BUN artar. Eritrositler idrara kaçtığı için mikroskopta dismorfik eritrositler ve makroskobik çay rengi idrar görülür. Hipertansiyon sıvı yüküne bağlıdır. APSGN tanısında kandaki C3 kompleman düzeyinin düşük olması ve streptokoklara karşı antikor (ASO) titresinin yüksek olması klasik beklentidir.",
      },
      {
        title: "Adım 2: Hasar Progresyonu ve Evreleme",
        text: "Hastanın acilde alınan bazal serum kreatinini 0.5 mg/dL iken, yatışının 48. saatinde tekrar edilen kreatinini 1.1 mg/dL yükseliyor. İdrar miktarı da saatte 0.4 mL/kg. KDIGO kriterlerine göre hastanın ABH evresindeki son durumu nedir?",
        options: [
          "A) Evre 1'de kalmıştır, çünkü artış sadece 0.6 mg/dL.",
          "B) Evre 2 ABH olmuştur, çünkü kreatinin değeri bazal değerinin 2 katını aşmıştır (2.2 katına çıkmıştır).",
          "C) Evre 3 ABH olmuştur, diyalize girmesi zorunludur.",
        ],
        correctLabel: "B",
        explanation:
          "KDIGO Evre 2 tanımı, kreatinin değerinin 48 saat-7 gün içerisinde bazalin 2.0 ila 2.9 katına çıkmasını gerektirir. 0.5'in 2 katı 1.0'dır, hasta 1.1'e ulaştığı için doğrudan Evre 2 sınıfına girer ve hasar şiddetlenmektedir.",
      },
      {
        title: "Adım 3: Kritik Müdahale Kararı",
        text: "Hastanın potasyumu 5.8 mEq/L (sınırda yüksek, aritmik değil), pH: 7.32 (hafif asidoz). İdrar çıkışı halen oligürik. Fizik muayenesinde akciğer bazallerinde ince raller (sıvı birikimi) duyuluyor. Bu aşamada tıbbi müdahaleniz ne olur?",
        options: [
          "A) Geri dönülmez noktada olduğu için boyundan kateter açıp derhal Hemodiyalize almak.",
          "B) Sıvı alımını kısıtlamak, diyetten sodyumu çıkarmak ve sıvı yükünü/hipertansiyonu kırmak için loop diüretikleri (Furosemid) infüzyonu başlamak.",
          "C) İmmün baskılayıcı olarak Yüksek doz İntravenöz Steroid (Pulse metilprednizolon) başlamak.",
        ],
        correctLabel: "B",
        explanation:
          "APSGN, kendini sınırlayan bir hastalıktır ve yönetimindeki temel prensip volüm yükünün (sıvı birikiminin) ve sekonder hipertansiyonun kontrol edilmesidir. Hastada henüz dirençli asidoz veya hayatı tehdit eden EKG bozukluğu yaratacak potasyum düzeyi yoktur, dolayısıyla hemodiyaliz (A) gerekmez. APSGN steroidlere yanıt vermez (C). Furosemid ve su kısıtlaması hastanın akciğerlerini rahatlatacak ve tansiyonunu düşürecek en doğru yaşam kurtarıcı manevradır.",
      },
    ],
  },
  {
    id: 3,
    title: "Vaka 3: Süt Çocuğu Dönemi - Kronik Böbrek Hastalığı ve CAKUT",
    intro:
      "6 aylık erkek bebek, son 3 aydır tekrarlayan, ateşli idrar yolu enfeksiyonu (İYE) geçirmesi ve beslenememe, kusma, büyüme geriliği (boy ve kilo ölçümleri 3. persentilin çok altında) şikayetleriyle polikliniğe getiriliyor. Dosyası incelendiğinde, annenin hamileliği sırasında rutin ultrason takiplerinde amniyon sıvısının azaldığı (Oligohidramnios) bilgisi göze çarpıyor.",
    steps: [
      {
        title: "Adım 1: Etiyolojik Tanısal Yaklaşım",
        text: "Oligohidramnios öyküsü (fetal idrar üretiminin azaldığını gösterir), tekrarlayan ateşli İYE öyküsü ve erkek bebek olma parametreleri bir araya geldiğinde, altta yatan hangi majör anatomik anomali grubundan şüphelenirsiniz ve ilk tetkikiniz ne olur?",
        options: [
          "A) X'e bağlı kalıtsal hipofosfatemik rikets şüphesiyle bacak X-ray filmi ve FGF23 hormonu tahlili",
          "B) Nefrotik sendrom/Fokal segmental glomerüloskleroz şüphesiyle ultrason eşliğinde böbrek biyopsisi",
          "C) Böbrek ve İdrar Yollarının Doğumsal Anomalileri (CAKUT) ve Posterior Üretral Valv (PUV) obstrüksiyonu şüphesiyle acil Böbrek ve Mesane Ultrasonografisi (USG)",
        ],
        correctLabel: "C",
        explanation:
          "Amniyon sıvısını fetüsün idrarı oluşturur. İdrarın azalması, bebeğin ya böbreklerinin gelişmediğini (agenezis) ya da idrarı dışarı atamadığını (obstrüksiyon) gösterir. Erkek bebeklerde tekrarlayan İYE'nin altında yatan en dramatik obstrüktif anomali Posterior Üretral Valvdir (PUV) ve CAKUT şemsiyesinde değerlendirilir. İlk tercih mutlaka non-invaziv radyasyon içermeyen USG olmalıdır.",
      },
      {
        title: "Adım 2: Görüntüleme Sonucunun Yorumlanması ve Sınıflandırma",
        text: "Çekilen abdominal ultrasonografide; 'bilateral hidronefroz (böbrek havuzcuklarında aşırı genişleme), artmış böbrek ekojenitesi (parlak böbrek), azalmış kortikal kalınlık (incelmiş parankim) ve duvarı ileri derecede kalınlaşmış, trabeküle bir mesane' görülüyor. Kan tahlilinde BUN: 55 mg/dL, Kreatinin: 1.4 mg/dL bulunuyor. Sistatin C değerleri de yüksek. Bu çocuğun böbrek hastalığının seyri nasıl sınıflandırılır?",
        options: [
          "A) Sadece sıvı eksiğine bağlı geri döndürülebilir Prerenal ABH.",
          "B) Akut postrenal obstrüksiyon tablosu, ancak ultrasona göre böbrek parankimi henüz tamamen sağlamdır.",
          "C) Geçmişten gelen obstrüksiyon ve enfeksiyonların zemininde gelişmiş Erken-Çocukluk Kronik Böbrek Hastalığı (KBH).",
        ],
        correctLabel: "C",
        explanation:
          "Altı aylık bir bebekte kreatininin normal değeri 0.2-0.4 mg/dL civarındadır. 1.4 mg/dL devasa bir böbrek yıkımını gösterir. Ultrasonografide ekojenitenin artması ve korteksin incelmesi, hasarın akut dönemden çıkıp kalıcı bir fibrozise (skara) dönüştüğünü kanıtlar. Bebek CAKUT kaynaklı KBH tablosundadır.",
      },
    ],
  },
  {
    id: 4,
    title:
      "Vaka 4: Ergenlik Dönemi - Reflü Nefropatisi ve Mineral Kemik Bozukluğu (CKD-MBD)",
    intro:
      "14 yaşında kız çocuğu, okulda çabuk yorulma, derin halsizlik ve yürüdüğünde bacaklarında ortaya çıkan künt bir kemik ağrısı ile pediatrik nefroloji polikliniğine başvuruyor. Özgeçmişi incelendiğinde; küçük yaşlarda geçirdiği şiddetli İYE'ler nedeniyle çift taraflı Vezikoüreteral Reflü (VUR) saptandığı ve 6 yaşındayken anti-reflü cerrahisi geçirdiği görülüyor. Fizik muayenesinde oldukça soluk görünümlü, cilt kurumuş ve kan basıncı 135/85 mmHg (yaşına göre evre 1 hipertansiyon sınırında).",
    steps: [
      {
        title: "Adım 1: Fonksiyonel Evreleme",
        text: "Laboratuvardan gelen sonuçlarda serum kreatinin 2.8 mg/dL olarak ölçülüyor. Modifiye Schwartz formülü ile hastanın tahmini Glomerüler Filtrasyon Hızı (eGFH) 25 mL/dk/1.73m² olarak hesaplanıyor. Hasta KDIGO sistemine göre kronik böbrek hastalığının hangi evresindedir ve patolojinin orijinal ismi nedir?",
        options: [
          "A) Evre G2 KBH - Hipertansif Nefroskleroz",
          "B) Evre G4 KBH - Reflü Nefropatisi",
          "C) Evre G5 KBH - Polikistik Böbrek Hastalığı",
        ],
        correctLabel: "B",
        explanation:
          "eGFH değeri 15-29 mL/dk arasında olduğu için KDIGO Evre 4 (Şiddetli azalmış GFR) sınıfına girer. Hastanın yıllar önceki VUR rahatsızlığının yarattığı skarlar ilerlemiş ve klasik bir 'Reflü Nefropatisi' tablosu oluşturmuştur. Evre 5 olması için eGFH <15 olmalıdır.",
      },
      {
        title: "Adım 2: Komplikasyon (Kemik Ağrısı) Taraması",
        text: "Hastanın kemik ağrısını ve kronik yorgunluğunu açıklamak için laboratuvar panelini genişletiyorsunuz. Bu hastada kemik döngüsünün bozulduğuna işaret eden KBH-Mineral ve Kemik Bozukluğuna (CKD-MBD veya Renal osteodistrofi) uyan spesifik laboratuvar üçlüsü hangisidir?",
        options: [
          "A) Yüksek Hemoglobin, Düşük Serum Kalsiyumu, Tamamen Normal Paratiroid Hormonu",
          "B) Düşük Hemoglobin, Yüksek Fosfor, Düşük Kalsiyum ve Çok Yüksek Paratiroid Hormonu (Sekonder Hiperparatiroidizm)",
          "C) Yüksek D Vitamini, Düşük Fosfor, Düşük Kreatinin",
        ],
        correctLabel: "B",
        explanation:
          "Evre 4'e gelmiş bir böbrek kan fosforunu süzemez ve vücutta tutar (Hiperfosfatemi). Kalsitriol (Aktif D vit) yapamadığı için kalsiyum bağırsaktan emilemez (Hipokalsemi). Düzenleyici paratiroid bezi çıldırarak bol miktarda PTH salgılar (Sekonder Hiperparatiroidizm) ve eksik kalsiyumu tamamlamak için hastanın kemiklerini eritmeye başlar. Yorgunluğu ise böbreklerin EPO üretememesinden kaynaklanan anemidir (Düşük Hb).",
      },
      {
        title: "Adım 3: Tıbbi Müdahalenin Geleceği",
        text: "Hastanın diyetini (düşük fosforlu) düzenliyor, D vitamini analogları (kalsitriol) ve fosfor bağlayıcılar veriyorsunuz. Ancak takiplerinde 15 yaşında eGFH değeri 14 mL/dk'nın altına (Evre 5) düşmeye başlıyor. Bu aşamadaki tıbbi yönetim ve izlem stratejiniz ne olmalıdır?",
        options: [
          "A) GFH düştüğü için ilaçların toksik olacağını düşünerek tüm kalsiyum ve tansiyon ilaçlarını kesip diyet kısıtlamalarını esnetmek.",
          "B) Hayatı idame ettirmek ve böbrek atıklarını uzaklaştırmak için Diyaliz hazırlıklarına (fistül cerrahisi veya periton diyalizi kateteri) ve Böbrek Nakli (Transplantasyon) kadavra listesi/canlı verici hazırlıklarına derhal başlamak.",
          "C) Tek taraflı nefrektomi yaparak kan basıncını tamamen sıfırlamak.",
        ],
        correctLabel: "B",
        explanation:
          "Hasta Son Dönem Böbrek Hastalığına (G5) girmiştir. Bu saatten sonra konservatif medikal tedavi, biriken toksinlerin ve sıvı yükünün ölümcül sonuçlarını engelleyemez. Hayat kalitesini, okul ve büyüme performansını korumak için uygun bir diyaliz modalitesine geçiş yapılmalı ve pediatride altın standart olan böbrek transplantasyonu sürecine geç kalınmadan odaklanılmalıdır.",
      },
    ],
  },
];

const referencesList = [
  "1. APPROACH TO PEDIATRIC ACUTE KIDNEY INJURY - PedsCases",
  "2. Current Concepts of Pediatric Acute Kidney Injury-Are We Ready to Translate Them into Everyday Practice? - PMC",
  "3. Chronic Kidney Disease - Boston Children's Hospital",
  "4. Neonatal AKI profile using KDIGO guidelines: A cohort study in tertiary care hospital ICU of Lahore, Pakistan Frontiers",
  "5. Chronic kidney disease: Pediatric Perspective",
  "6. CAKUT: A Pediatric and Evolutionary Perspective on the Leading Cause of CKD in Childhood - PMC",
  "7. Pediatric Practice and Research >>> Submission >> Çocuklarda Akut Böbrek Hasarı",
  "8. Selewski Neonatal AKI ESPN.pdf - ERKNet",
  "9. Neonatal Acute Kidney Injury - International Pediatric Nephrology Association",
  "10. Chapter XIII.15. Acute Kidney Injury (AKI) - University of Hawaii System",
  "11. Tests of Kidney Function in Children - Anesthesia Key",
  "12. Pediatric acute kidney injury: new advances in the last decade - PMC",
  "13. Acute Kidney Injury in Children: Classification, Recognition and Treatment Principles - PMC",
  "14. Management of Acute Kidney Injury in Extremely Low Birth Weight Infants - PMC - NIH",
  "15. Neonatal Acute Kidney Injury - PMC-NIH",
  "16. Acute Kidney Injury (AKI or ARF) in Pediatrics (Nelson) | PPTX - Slideshare",
  "17. File:Intrarenal acute kidney injury.webm - Wikimedia Commons",
  "18. Chapter 527 - Nelson Textbook of Pediatrics",
  "19. File:Acute Glomerulonephritis Pathology Diagram.svg - Wikimedia Commons",
  "20. Pediatric Chronic Kidney Disease: Mind the Gap Between Reality and Expectations - MDPI",
  "21. Recognition and management of acute kidney injury in children",
  "22. | Pediatric-modified RIFLE (PRIFLE) criteria | Download Table - ResearchGate",
  "23. Acute Kidney Injury in Children: A Focus for the General Pediatrician - MDPI",
  "24. File:Crescentic glomerulonephritis.webm - Wikimedia Commons",
  "25. File:Crescentic glomerulonephritis - very high mag.jpg - Wikimedia Commons",
  "26. Chronic Kidney Disease - StatPearls - NCBI Bookshelf",
  "27. Chronic kidney disease in children: an update - PMC",
  "28. Kufa Medical Journal",
  "29. 'Children Kidney Care Centers': Rationale, requirements and recommendations for best facilities and better future",
  "30. 'Children Kidney Care Centers': Rationale, requirements and recommendations for best facilities and better future - PMC",
  "31. KDIGO 2026 CLINICAL PRACTICE GUIDELINE FOR ACUTE KIDNEY INJURY (AKI) AND ACUTE KIDNEY DISEASE (AKD) PUBLIC REVIEW DRAFT MARCH 202",
  "32. CAKUT: A Pediatric and Evolutionary Perspective on the Leading Cause of CKD in Childhood - PubMed",
  "33. Carl Bates CAKUT 2020.pdf - ERKNet",
  "34. Renal osteodystrophy - Wikipedia",
  "35. Rickets - Wikipedia",
  "36. Autosomal dominant hypophosphatemic rickets - Wikipedia",
  "37. X-linked hypophosphatemia - Wikipedia",
  "38. Nelson Textbook of Pediatrics, 2-Volume Set - 22nd Edition | Elsevier Shop",
  "39. Uremic frost - Wikipedia",
  "40. File:Ultrasonography of chronic renal disease caused by glomerulonephritis.jpg",
  "41. pRIFLE (Pediatric Risk, Injury, Failure, Loss, End Stage Renal Disease) score identifies Acute Kidney Injury and predicts mortality in critically ill children: a prospective study - PMC",
  "42. Acute Kidney Injury (AKI) and Acute Kidney Disease (AKD) - KDIGO",
];

// --- YENİDEN KULLANILABİLİR BİLEŞENLER ---

// 1. Tablo Bileşeni
const StrictTable = ({
  data,
}: {
  data: { headers: string[]; rows: string[][] };
}) => {
  return (
    <div className="w-full my-6 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
      <table className="w-full table-fixed break-words whitespace-normal text-left text-[9px] sm:text-[10px] md:text-xs">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            {data.headers.map((h, i) => (
              <th
                key={i}
                className="p-2 border-b border-r last:border-r-0 font-semibold align-top"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr
              key={i}
              className="border-b last:border-b-0 hover:bg-slate-50 transition-colors"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="p-2 border-r last:border-r-0 align-top text-slate-600"
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

// 2. Uyarı Kutusu Bileşeni
const AlertBox = ({
  title,
  children,
  type = "info",
}: {
  title: string;
  children: React.ReactNode;
  type?: "info" | "warning";
}) => {
  const bg =
    type === "info"
      ? "bg-indigo-50 border-indigo-200"
      : "bg-amber-50 border-amber-200";
  const text = type === "info" ? "text-indigo-800" : "text-amber-800";
  const Icon = type === "info" ? Info : AlertCircle;

  return (
    <div
      className={`p-4 my-4 border rounded-lg flex items-start space-x-3 ${bg} ${text}`}
    >
      <Icon className="w-6 h-6 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-bold mb-1">{title}</h4>
        <div className="text-sm opacity-90 leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

// 3. Görsel Bileşeni (Linkleri doğrudan ekranda gösterir, kırık url'ler fallback image alır)
const SafeImage = ({ src, caption }: { src: string; caption: string }) => {
  return (
    <figure className="my-8 border border-slate-200 rounded-xl p-3 bg-white shadow-sm flex flex-col items-center">
      <div className="w-full bg-slate-50 rounded-lg flex justify-center p-2 mb-3">
        <img
          src={src}
          alt={caption}
          className="max-h-[500px] w-auto object-contain rounded-md shadow-sm border border-slate-200"
          loading="lazy"
        />
      </div>
      <figcaption className="text-sm md:text-base text-slate-700 text-center font-medium leading-relaxed px-4 mt-2">
        <ImageIcon className="w-5 h-5 inline-block mr-2 text-indigo-500 -mt-0.5" />
        {caption}
      </figcaption>
    </figure>
  );
};

// 4. Soru Bankası Bileşeni
const QuizBank = ({
  questions,
  title,
}: {
  questions: Question[];
  title: string;
}) => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
        <ListChecks className="text-indigo-600" /> {title}
      </h2>
      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm"
          >
            <h3 className="font-semibold text-slate-800 mb-3 text-sm md:text-base leading-relaxed">
              <span className="text-indigo-600 mr-2">{idx + 1}.</span>
              {q.q}
            </h3>
            <div className="space-y-2 mb-4 pl-2 md:pl-6">
              {q.options.map((opt, i) => (
                <div key={i} className="text-sm text-slate-600">
                  {opt}
                </div>
              ))}
            </div>

            <button
              onClick={() => setOpenId(openId === q.id ? null : q.id)}
              className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
            >
              <ChevronRight
                className={`w-4 h-4 mr-1 transition-transform ${
                  openId === q.id ? "rotate-90" : ""
                }`}
              />
              {openId === q.id ? "Çözümü Gizle" : "Çözümü Göster"}
            </button>

            {openId === q.id && (
              <div className="mt-4 p-4 bg-indigo-50/50 border-l-4 border-indigo-500 text-sm text-slate-700 rounded-r-lg animate-in fade-in slide-in-from-top-2">
                <div className="font-bold text-indigo-900 mb-1">
                  Doğru Cevap: {q.correct}
                </div>
                <div>{q.explanation}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. İnteraktif Vaka Bileşeni (PDÖ)
const CaseStudyViewer = () => {
  const [activeCaseId, setActiveCaseId] = useState<number>(1);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);

  const activeCase = pdoCases.find((c) => c.id === activeCaseId)!;
  const currentStep = activeCase.steps[activeStepIdx];
  const isCompleted = selectedOpt !== null;
  const isCorrect = selectedOpt === currentStep.correctLabel;

  const handleCaseChange = (id: number) => {
    setActiveCaseId(id);
    setActiveStepIdx(0);
    setSelectedOpt(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
        <Stethoscope className="text-indigo-600" /> Probleme Dayalı Öğrenim
        (PDÖ) Vakaları
      </h2>

      {/* Case Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {pdoCases.map((c) => (
          <button
            key={c.id}
            onClick={() => handleCaseChange(c.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              activeCaseId === c.id
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Vaka {c.id}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {activeCase.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {activeCase.intro}
          </p>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            {activeCase.steps.map((_, i) => (
              <React.Fragment key={i}>
                <span
                  className={
                    i === activeStepIdx
                      ? "text-indigo-600"
                      : i < activeStepIdx
                      ? "text-green-500"
                      : ""
                  }
                >
                  ADIM {i + 1}
                </span>
                {i < activeCase.steps.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
          </div>

          <h4 className="font-semibold text-lg text-slate-800 mb-4">
            {currentStep.title}
          </h4>
          <p className="text-sm text-slate-700 mb-6 leading-relaxed">
            {currentStep.text}
          </p>

          <div className="space-y-3">
            {currentStep.options.map((opt, i) => {
              const optLetter = opt.charAt(0);
              let btnClass =
                "w-full text-left p-4 text-sm border rounded-lg transition-all ";
              if (!isCompleted) {
                btnClass +=
                  "hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 cursor-pointer";
              } else {
                if (optLetter === currentStep.correctLabel)
                  btnClass +=
                    "border-green-500 bg-green-50 text-green-800 font-medium";
                else if (optLetter === selectedOpt)
                  btnClass += "border-red-500 bg-red-50 text-red-800";
                else
                  btnClass +=
                    "border-slate-200 bg-slate-50 text-slate-400 opacity-50 cursor-not-allowed";
              }

              return (
                <button
                  key={i}
                  disabled={isCompleted}
                  onClick={() => setSelectedOpt(optLetter)}
                  className={btnClass}
                >
                  <div className="flex items-start">
                    <span className="mr-3 mt-0.5">
                      {isCompleted && optLetter === currentStep.correctLabel ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : null}
                      {isCompleted &&
                      optLetter === selectedOpt &&
                      optLetter !== currentStep.correctLabel ? (
                        <XCircle className="w-4 h-4 text-red-600" />
                      ) : null}
                      {!isCompleted ? (
                        <div className="w-4 h-4 rounded-full border border-slate-300" />
                      ) : null}
                    </span>
                    <span>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {isCompleted && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-2">
              <div
                className={`p-4 rounded-lg mb-6 border ${
                  isCorrect
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <h5
                  className={`font-bold flex items-center gap-2 mb-2 ${
                    isCorrect ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  {isCorrect ? "Doğru Seçim!" : "Yanlış Seçim!"} (Doğru Cevap:{" "}
                  {currentStep.correctLabel})
                </h5>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {currentStep.explanation}
                </p>
              </div>

              {activeStepIdx < activeCase.steps.length - 1 ? (
                <button
                  onClick={() => {
                    setActiveStepIdx((prev) => prev + 1);
                    setSelectedOpt(null);
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Sonraki Adım <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-800 text-white rounded-lg">
                  <CheckCircle className="w-4 h-4" /> Vaka Tamamlandı
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- İÇERİK BÖLÜMLERİ (FULL METİN) ---

const SectionABH = () => (
  <div className="space-y-6 text-slate-800 leading-relaxed text-base">
    <div className="border-b pb-4 mb-6">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Çocuklarda Akut Böbrek Hasarı (ABY/ABH)
      </h1>
      <p className="text-slate-500 text-sm">
        Çocuklarda Akut ve Kronik Böbrek Hastalıklarına Kapsamlı Yaklaşım:
        Pediatrik Nefrolojide Klinik Değerlendirme ve Yönetim
      </p>
    </div>

    <p>
      Pediatrik nefroloji pratiğinde, böbrek fonksiyonlarındaki ani veya
      ilerleyici kayıpların incelenmesi, hastaların kısa ve uzun vadeli
      sağkalımını belirleyen en temel unsurdur. Tarihsel gelişim süreci
      içerisinde böbrek disfonksiyonu genellikle "yetmezlik" (failure) terimi
      ile ifade edilmiş olsa da, güncel tıp literatürü ve Nelson Textbook of
      Pediatrics gibi temel referans kaynakları, hücresel düzeydeki hasarın
      erken dönemde tanınmasını ve önleyici tıbbi müdahalelerin hızla devreye
      sokulmasını vurgulamak amacıyla "Akut Böbrek Hasarı" (ABH) ve "Kronik
      Böbrek Hastalığı" (KBH) terminolojisini standartlaştırmıştır.
    </p>

    <p>
      Pediatrik popülasyonu yetişkinlerden ayıran en kritik faktör, böbrek
      fizyolojisinin ve glomerüler filtrasyon hızının (GFH) doğumdan itibaren
      sürekli bir olgunlaşma ve adaptasyon süreci içinde olmasıdır. Yenidoğan
      döneminde nefronların anatomik gelişimi tamamlanmış olsa da fonksiyonel
      kapasiteleri son derece düşüktür ve yetişkin düzeyindeki filtrasyon
      kapasitesine ancak yaşamın ikinci yılında ulaşılır. Bu dinamik yapı, tanı
      kriterlerinin, evreleme sistemlerinin ve laboratuvar belirteçlerinin yaşa
      özgü olarak modifiye edilmesini zorunlu kılmaktadır. Bu rapor, çocuklarda
      akut ve kronik böbrek hasarı tablolarına klinik yaklaşımı, patofizyolojik
      temelleri, evreleme sistemlerini, yaş gruplarına göre değişen ayırıcı
      tanıları ve kanıta dayalı yönetim stratejilerini derinlemesine
      incelemektedir.
    </p>

    <p>
      Akut böbrek hasarı, böbreklerin kanı süzme işlevindeki ani ve genellikle
      geri döndürülebilir bir azalma sonucunda, kan üre azotu (BUN) ve serum
      kreatinin gibi nitrojenli atık ürünlerinin kanda birikmesi,
      sıvı-elektrolit dengesinin ve asit-baz homeostazının bozulması ile
      karakterize olan karmaşık bir klinik sendromdur. ABH, tek bir hastalıktan
      ziyade, hücresel iskemiden toksik zedelenmelere kadar uzanan çok çeşitli
      patolojik mekanizmaların ortak sonlanım noktasıdır.
    </p>

    <h3 className="text-2xl font-bold text-slate-900 mt-10">
      Tanım ve Evreleme Sistemlerinin Evrimi
    </h3>
    <p>
      Pediatrik ABH'nin tanımlanmasında yıllar içinde çeşitli konsensüs
      kriterleri geliştirilmiş ve bu kriterler erken tanıyı optimize edecek
      şekilde sürekli güncellenmiştir. Serum kreatinin düzeyindeki çok küçük
      artışların bile hastanede kalış süresi ve mortalite ile doğrudan ilişkili
      olduğunun saptanması, tanı kriterlerinin giderek daha hassas hale
      getirilmesine yol açmıştır. Günümüzde pediatrik pratikte temel olarak
      pRIFLE ve KDIGO (Kidney Disease: Improving Global Outcomes)
      sınıflandırmaları kullanılmaktadır.
    </p>

    <h4 className="text-lg font-semibold text-indigo-700 mt-6">
      Pediatrik RIFLE (pRIFLE) Kriterleri
    </h4>
    <p>
      Erişkinler için geliştirilen RIFLE kriterlerinin çocuklara uyarlanmış hali
      olan pRIFLE sistemi, tahmini kreatinin klerensindeki (eCCl) oransal
      azalmayı ve idrar çıkışını temel alır. Bu sistem, hasarın şiddetini Risk,
      Hasar (Injury) ve Yetmezlik (Failure) olmak üzere üç evrede, klinik
      sonlanımını ise Kayıp (Loss) ve Son Dönem (End Stage) olmak üzere iki
      kategoride sınıflandırır.
    </p>
    <StrictTable data={prifleTable} />

    <h4 className="text-lg font-semibold text-indigo-700 mt-6">
      KDIGO Kriterleri
    </h4>
    <p>
      Gerek pediatrik gerekse erişkin hastalar için evrensel bir dil oluşturmak
      amacıyla geliştirilen KDIGO kriterleri, pRIFLE ve AKIN sistemlerinin en
      güçlü yönlerini birleştirmiştir. KDIGO sınıflandırması, bazal serum
      kreatinin değerindeki katlanma oranlarına veya mutlak artış miktarlarına
      dayanarak üç şiddet evresi tanımlar.
    </p>
    <StrictTable data={kdigoTable} />

    <AlertBox title="Yenidoğanlarda Modifiye KDIGO (nKDIGO)" type="warning">
      <p>
        Yenidoğan dönemi, böbrek fonksiyonlarının değerlendirilmesi açısından
        eşsiz zorluklar barındırır. Yaşamın ilk haftasında bebeğin serum
        kreatinin seviyesi, kendi böbrek fonksiyonundan ziyade plasental yolla
        geçen maternal kreatinini yansıtır. Ayrıca, prematüre bebeklerde kas
        kütlesinin azlığı, hidrasyon durumundaki hızlı değişimler ve tübüler
        kreatinin sekresyonu nedeniyle serum kreatinin değeri, böbrek hasarından
        çok fonksiyonel bir gecikme göstergesi olarak işlev görür.
      </p>
      <p className="mt-2">
        Bu fizyolojik gerçekler doğrultusunda Ulusal Sağlık Enstitüleri (NIH) ve
        AWAKEN çalışma grubu, referans kreatinin değerinin "ölçülen en düşük
        önceki değer" (trough) olarak kabul edildiği yenidoğan modifiye KDIGO
        (nKDIGO) kriterlerinin kullanılmasını önermektedir. Bu modifikasyonda
        Evre 3 ABH tanımı için serum kreatinin eşik değeri, erişkinlerdeki 4.0
        mg/dL yerine yenidoğan anatomisiyle uyumlu olarak &gt;2.5 mg/dL olarak
        revize edilmiştir.
      </p>
    </AlertBox>

    <h3 className="text-2xl font-bold text-slate-900 mt-10">
      Epidemiyoloji ve Etiyolojik Sınıflandırma
    </h3>
    <p>
      Son on yıllık epidemiyolojik veriler incelendiğinde, çocukluk çağı ABH
      insidansında belirgin bir artış olduğu ve hastalığın etiyolojik profilinde
      dramatik bir değişim yaşandığı görülmektedir. Geçmişte hemolitik üremik
      sendrom (HÜS) veya akut glomerülonefritler gibi primer böbrek hastalıkları
      ön plandayken, günümüzde özellikle yoğun bakım ünitelerinde yatan
      hastalarda sepsis, kardiyopulmoner cerrahiler, perinatal asfiksi ve
      nefrotoksik ilaç maruziyeti (aminoglikozitler, kemoterapötikler,
      non-steroid anti-inflamatuarlar) gibi multifaktöriyel ikincil nedenler çok
      daha büyük bir yer tutmaktadır.
    </p>

    <p className="font-semibold mt-4">
      Böbrek hasarının altında yatan patolojik mekanizmalar anatomik
      yerleşimlerine göre üç ana başlık altında sınıflandırılır:
    </p>

    <div className="space-y-4 my-6">
      <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
        <h5 className="font-bold text-indigo-900 text-lg mb-2">
          1. Prerenal Akut Böbrek Hasarı
        </h5>
        <p>
          Çocukluk çağında açık ara en sık karşılaşılan tablodur ve temelinde
          böbrek parankiminde henüz yapısal bir hasar oluşmaksızın böbrek kan
          akımının (perfüzyonunun) yetersiz kalması yatar. İshal ve kusmaya
          bağlı dehidratasyon en yaygın senaryodur; ancak kanamalar, yanıklar,
          nefrotik sendrom veya kalp yetmezliği gibi efektif sirkülatuvar
          volümün azaldığı durumlarda da prerenal hasar gelişir. Böbrek, azalan
          kan akımına yanıt olarak glomerüler perfüzyon basıncını korumak için
          afferent arteriyolü genişletir ve efferent arteriyolü daraltır; ancak
          perfüzyon bozukluğu uzarsa bu kompanzasyon mekanizmaları çöker ve
          iskemik parankim hasarı başlar.
        </p>
      </div>

      <div className="bg-amber-50 p-5 rounded-lg border border-amber-100">
        <h5 className="font-bold text-amber-900 text-lg mb-2">
          2. İntrinsik (Renal) Akut Böbrek Hasarı
        </h5>
        <p>
          Böbreğin kendi vasküler yapıları, glomerülleri, tübülleri veya
          interstisyumunda doğrudan bir hücresel zedelenme olması durumudur.
          Prerenal hipoperfüzyonun uzun sürmesi sonucunda oksijensizliğe en
          duyarlı bölge olan proksimal tübüllerde gelişen akut tübüler nekroz
          (ATN) en tipik örnektir. Bunun yanı sıra, immün kompleks birikimiyle
          karakterize post-streptokokal glomerülonefrit, endotel hasarı ve
          mikroanjiyopatik trombozla seyreden hemolitik üremik sendrom (HÜS)
          veya ilaçlara sekonder gelişen akut interstisyel nefrit intrinsik
          böbrek hasarı yelpazesini oluşturur.
        </p>
      </div>

      <div className="bg-slate-100 p-5 rounded-lg border border-slate-200">
        <h5 className="font-bold text-slate-800 text-lg mb-2">
          3. Postrenal Akut Böbrek Hasarı
        </h5>
        <p>
          Üriner sistemin herhangi bir seviyesindeki mekanik veya fonksiyonel
          obstrüksiyonlara bağlı olarak gelişir. İdrar akışının engellenmesi,
          böbrek pelvisi ve tübüller içindeki hidrostatik basıncı artırarak net
          glomerüler filtrasyon basıncını sıfırlar. Bilateral üreteropelvik
          bileşke darlıkları, posterior üretral valv (PUV) veya nörojenik mesane
          en sık görülen pediatrik postrenal ABH nedenleridir.
        </p>
      </div>
    </div>

    <h3 className="text-2xl font-bold text-slate-900 mt-10">
      Yaş Gruplarına Göre Ayırıcı Tanı ve Klinik Özellikler
    </h3>
    <p>
      Böbrek fizyolojisindeki maturasyonel farklılıklar nedeniyle, çocuklarda
      yaş gruplarına göre ABH etiyolojisi ve klinik görünümü büyük ölçüde
      değişir.
    </p>

    <ul className="list-disc pl-6 space-y-4 mt-4">
      <li>
        <strong>Yenidoğan döneminde</strong> ABH gelişim riski oldukça
        yüksektir. Gebeliğin üçüncü trimesteri nefron oluşumunun en yoğun olduğu
        dönem olduğundan, prematüre doğan veya intrauterin gelişme geriliği olan
        bebekler, nefron sayıları eksik olarak doğarlar ve yaşamın ilk
        günlerinde hipoksi veya toksik ajanlara karşı son derece kırılgandırlar.
        Perinatal asfiksi, konjenital anomaliler (CAKUT), umbilikal
        kateterizasyona bağlı renal arter trombozları veya kord kanamaları
        yenidoğanlarda en sık görülen ABH nedenleridir. İlginç bir şekilde,
        yenidoğanlarda ABH her zaman oligüri ile seyretmez; non-oligürik ABH
        yenidoğan yoğun bakım ünitelerinde oldukça yaygındır, zira hasarlı
        tübüller idrarı konsantre edemediği için paradoksal olarak normal veya
        yüksek miktarda idrar çıkışı gözlenebilir.
      </li>
      <li>
        <strong>Süt çocuğu ve oyun çocuğu döneminde</strong>, immün sistemin dış
        dünya ile yoğun olarak karşılaşmasına paralel olarak enfeksiyöz ve
        gastrointestinal kaynaklı nedenler ön plana çıkar. Rotavirüs veya diğer
        enterik patojenlere bağlı ağır gastroenteritlerin yol açtığı
        dehidratasyon (prerenal ABH) bu yaş grubunun en büyük riskidir. Bunun
        yanında, Shiga toksin üreten E. coli enfeksiyonlarına sekonder gelişen
        ve mikroanjiyopatik hemolitik anemi, trombositopeni ve akut böbrek
        hasarı triadı ile karakterize olan tipik HÜS, bu yaş grubunun en
        dramatik böbrek acillerinden biridir.
      </li>
      <li>
        <strong>Okul çağı çocukları ve ergenlerde ise</strong> tablo daha çok
        erişkin tipine benzemeye başlar. Geçirilmiş bir A grubu beta-hemolitik
        streptokok enfeksiyonunu (farenjit veya piyoderma) takiben bir ila üç
        hafta sonra ortaya çıkan akut post-streptokokal glomerülonefrit, klasik
        olarak hematüri, hipertansiyon ve periorbital ödem ile kendini gösterir.
        Ayrıca, sistemik lupus eritematozus (SLE), Henoch-Schönlein purpurası
        (IgA vasküliti) gibi romatolojik hastalıkların böbrek tutulumları veya
        travma kaynaklı rabdomiyoliz bu yaş grubunda düşünülmelidir.
      </li>
    </ul>

    <h3 className="text-2xl font-bold text-slate-900 mt-10">
      Öykü ve Fizik Muayene Bulguları
    </h3>
    <p>
      Kapsamlı bir öykü ve fizik muayene, ABH etiyolojisini aydınlatmada
      laboratuvar testleri kadar kıymetlidir. Hastanın yakın dönemde geçirdiği
      enfeksiyonlar (HÜS veya post-enfeksiyöz GN şüphesi), kullandığı reçeteli
      veya reçetesiz ilaçlar (interstisyel nefrit veya tübüler toksisite),
      alınan sıvı miktarı ve idrar çıkışındaki belirgin azalmalar titizlikle
      sorgulanmalıdır. İyotlu radyokontrast ajanlara maruziyet, özellikle renal
      perfüzyonu bozarak akut tübüler disfonksiyona neden olabileceğinden
      atlanmaması gereken bir öykü detayıdır.
    </p>
    <p>
      Fizik muayenede öncelikle hastanın hidrasyon durumu ve hemodinamik
      stabilitesi değerlendirilir. Taşikardi, kuru müköz membranlar, cilt turgor
      ve tonusunda azalma, çökük fontanel ve uzamış kapiller dolum zamanı,
      intravasküler hacim eksikliğini ve prerenal hasarı işaret eder. Buna
      karşılık, ekstraselüler sıvı yüklenmesini gösteren periorbital ve
      pretibial ödem, asit, hepatomegali, gallop ritmi ve ciddi hipertansiyon,
      genellikle akut glomerülonefritler veya nefrotik sendromlar gibi intrinsik
      böbrek hastalıklarının belirtisidir. Ciltte peteşi ve ekimozlar HÜS'ü,
      purpurik döküntüler vaskülitleri düşündürürken; abdominal palpasyonda ele
      gelen glob vesikale (distandü mesane) veya kitleler, postrenal
      obstrüksiyonun kesin işaretleridir.
    </p>

    <h3 className="text-2xl font-bold text-slate-900 mt-10">
      İlk Basamak Tetkikler ve Laboratuvarın Yorumlanması
    </h3>
    <p>
      ABH şüphesi olan bir pediatrik hastada ilk basamak değerlendirme tam kan
      sayımı, serum kreatinin, kan üre azotu (BUN), elektrolit paneli (sodyum,
      potasyum, klorür, bikarbonat) ve tam idrar tetkikinden oluşur. Böbrek
      fonksiyonlarındaki ani kayıp, hidrojen ve potasyum iyonlarının
      atılamamasına neden olacağından, hiperkalemi ve metabolik asidoz tablosu
      hızla gelişir. Özellikle medikal tedaviye dirençli hiperkalemi, ölümcül
      kardiyak aritmilere yol açabileceği için acil diyaliz endikasyonudur.
    </p>

    <AlertBox
      title="Prerenal ve İntrinsik Hasarın Ayırt Edilmesi (FENa Analizi)"
      type="info"
    >
      <p>
        ABH etiyolojisini saptamada ve tedavi planını (sıvı resüsitasyonu mu
        yoksa sıvı kısıtlaması mı) belirlemede Fraksiyone Sodyum Atılımı (FENa)
        kritik bir rol oynar. FENa, süzülen sodyumun ne kadarının idrarla
        atıldığını gösteren oransal bir değerdir.
      </p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>
          <strong>Prerenal ABH durumunda:</strong> Azalmış perfüzyona yanıt
          olarak böbrek tübülleri sağlamdır ve sodyum ile suyu dolaşımda tutmak
          için maksimum düzeyde geri emerler. İdrar sodyumu 10-20 mEq/L'nin
          altına düşer ve <strong>FENa &lt; %1</strong> hesaplanır. Ayrıca
          idrarın ozmolalitesi yüksek (&gt;500 mosmol/kg) ve özgül ağırlığı
          fazladır (&gt;1.020).
        </li>
        <li>
          <strong>İntrinsik Hasar (ATN) durumunda:</strong> Böbrek perfüzyon
          eksikliği tübüler nekroza yol açtığında, zedelenmiş tübüler hücreler
          sodyumu geri emme yeteneğini kaybeder. İdrarla kaybedilen sodyum
          miktarı artar, idrar seyreltikleşir (&lt;350 mosmol/kg) ve{" "}
          <strong>FENa &gt; %2.0</strong>'nin üzerine çıkar.
        </li>
        <li>
          <strong>Yenidoğan Fizyolojisi Farkı:</strong> Sağlıklı yenidoğanlar
          sodyumu daha fazla attıkları için, yenidoğan döneminde prerenal hasar
          için FENa sınırı &lt; %2, intrinsik hasar için ise &gt; %2.5 olarak
          kabul edilmelidir.
        </li>
        <li>
          <em>Not:</em> Çocuğun daha önce intravenöz sıvı veya loop diüretiği
          almış olması, FENa değerinin güvenilirliğini ortadan kaldırır.
        </li>
      </ul>
    </AlertBox>

    <h3 className="text-2xl font-bold text-slate-900 mt-10">
      Görüntüleme ve Histopatoloji
    </h3>
    <p>
      Etiyolojisi ilk bakışta netleştirilemeyen tüm pediatrik ABH hastalarında,
      anatomik obstrüksiyonları, böbrek ebatlarını veya doğumsal anomalileri
      (tek böbrek, displazi) değerlendirmek üzere üriner ultrasonografi altın
      standarttır. Ultrasonografide artmış ekojenite tıbbi (parankimal) böbrek
      hastalıklarına işaret ederken, pelvikaliseal dilatasyon obstrüksiyon
      lehinedir. Nadiren, klinik tablonun atipik seyrettiği, kresentik
      glomerülonefrit veya lupus nefriti gibi immünolojik hasarların düşünüldüğü
      durumlarda, kesin tanıyı koymak ve tedavi rejimini belirlemek amacıyla
      böbrek biyopsisine başvurulur.
    </p>

    <SafeImage
      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Acute_Glomerulonephritis_Pathology_Diagram.svg"
      caption="Görsel 1: Akut post-streptokokal glomerülonefritin patofizyolojik şeması. Podosit ayakçıkları altında yerleşen ve kanda süzülmeyi bozan belirgin subepitelyal immün kompleks ('hump') birikimleri görülmektedir."
    />

    <SafeImage
      src="https://upload.wikimedia.org/wikipedia/commons/6/69/Crescentic_glomerulonephritis_-_very_high_mag.jpg"
      caption="Görsel 2: Hızlı ilerleyen böbrek yetmezliğine (RPGN) yol açan kresentik glomerülonefritin çok yüksek büyütmeli mikroskobik görüntüsü. Glomerül içinde hilal (kresent) şeklinde hücresel proliferasyon açıkça izlenmektedir."
    />
  </div>
);

const SectionKBH = () => (
  <div className="space-y-6 text-slate-800 leading-relaxed text-base">
    <div className="border-b pb-4 mb-6">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Kronik Böbrek Hastalığı (KBY/KBH)
      </h1>
      <p className="text-slate-500 text-sm">
        Çocuklarda Akut ve Kronik Böbrek Hastalıklarına Kapsamlı Yaklaşım:
        Pediatrik Nefrolojide Klinik Değerlendirme ve Yönetim
      </p>
    </div>

    <p>
      Kronik böbrek hastalığı (KBH), altta yatan spesifik nedene bakılmaksızın,
      böbrek yapısındaki veya fonksiyonundaki anormalliklerin üç aydan daha uzun
      bir süre boyunca devam etmesi ve genellikle ilerleyici bir hücresel
      yıkımla seyretmesi durumudur. Böbrekler, sadece toksinleri temizleyen bir
      filtre değil; aynı zamanda kemik büyümesini destekleyen kalsiyum ve fosfor
      dengesini sağlayan, kan basıncını kontrol eden ve kırmızı kan hücresi
      yapımını uyaran endokrin organlardır. Bu nedenle KBH, basit bir süzme
      kusuru olmanın ötesinde, büyüme geriliğinden kemik deformitelerine kadar
      tüm sistemleri etkileyen yıkıcı bir süreçtir. Geleneksel "kronik böbrek
      yetmezliği" terimi, günümüzde bu ilerleyici sürecin tüm evrelerini
      kapsayacak şekilde "Kronik Böbrek Hastalığı" olarak genişletilmiştir.
    </p>

    <h3 className="text-2xl font-bold text-slate-900 mt-10">
      Tanım, Evreleme ve Yaşa Özgü Kriterler
    </h3>
    <p>
      Kronik böbrek hastalığının evrelenmesi, böbreklerin kanı filtreleme
      kapasitesinin bir ölçüsü olan Glomerüler Filtrasyon Hızına (GFH) dayanır.
      KDIGO kılavuzları, hastalığın seyrini öngörebilmek, komplikasyonları
      tahmin etmek ve tedavi zamanlamasını (örneğin diyaliz başlangıcını)
      ayarlamak amacıyla KBH'yi beş ana evreye (G1-G5) ayırmıştır.
    </p>

    <StrictTable data={kbhKdigoTable} />

    <p>
      Bu standart evreleme sistemi yetişkinler için son derece uyumlu olsa da,
      pediatrik popülasyonda böbrek gelişiminin devam etmesi nedeniyle doğrudan
      kullanılamaz. Sağlıklı doğan bir yenidoğanın böbrekleri henüz tam
      kapasiteyle çalışmaz; ilk günlerde GFH 40-60 mL/dk/1.73m² gibi oldukça
      düşük değerlerdedir. Böbrekler ancak çocuk iki yaşına geldiğinde tamamen
      olgunlaşır ve GFH yetişkin seviyelerine (≥90) ulaşır.
    </p>

    <AlertBox title="Pediatrik Evrelemede İki Önemli Fark" type="warning">
      <ul className="list-decimal pl-5 space-y-2 mt-2 font-medium">
        <li>
          Kronik böbrek hastalığının klasik 5 evreli bu sınıflandırması,{" "}
          <strong>2 yaşından küçük çocuklar için uygulanmaz</strong>, zira düşük
          GFH fizyolojik olabilir.
        </li>
        <li>
          Hastalığı tanımlamak için gereken{" "}
          <strong>"anormalliklerin en az 3 aydır devam etmesi"</strong> şartı,
          doğası gereği 3 aydan daha küçük yenidoğanlar ve bebekler için
          kullanılamaz.
        </li>
      </ul>
    </AlertBox>

    <h4 className="text-lg font-semibold text-indigo-700 mt-6">
      GFH Hesaplamasında Yöntemler (Schwartz Formülü ve Sistatin C)
    </h4>
    <p>
      Çocuklarda GFH tahmini için en pratik ve yaygın olarak kullanılan yöntem,
      çocuğun boyunu ve serum kreatinin seviyesini hesaba katan Modifiye
      Schwartz Formülü'dür:{" "}
      <code>
        eGFH (mL/dk/1.73 m²) = 0.413 × Boy (cm) / Serum Kreatinin (mg/dL)
      </code>
      . Ancak serum kreatinin düzeyi kas kütlesine bağımlı olduğu için, KBH
      nedeniyle ciddi büyüme ve gelişme geriliği veya kas atrofisi yaşayan
      çocuklarda yanıltıcı derecede normal (düşük) çıkabilir. Bu sınırlamayı
      aşmak için, tüm çekirdekli hücrelerden sabit bir hızda üretilen ve yaş,
      cinsiyet veya kas kütlesinden etkilenmeyen Sistatin C proteini, böbrek
      fonksiyonunun çok daha hassas ve erken bir göstergesi olarak pediatrik
      nefrolojide giderek daha fazla tercih edilmektedir.
    </p>

    <h3 className="text-2xl font-bold text-slate-900 mt-10">
      Epidemiyoloji ve Altta Yatan Etiyolojiler
    </h3>
    <p>
      Erişkinlerde kronik böbrek hastalığının en büyük sorumluları diyabet ve
      uzun süreli hipertansiyon iken, pediatrik popülasyonda tablonun temelleri
      genellikle genetik veya embriyolojik anomalilere dayanır. Kayıt
      sistemlerine göre çocukluk çağı KBH vakalarının yaklaşık %50'si, Böbrek ve
      İdrar Yollarının Doğumsal Anomalileri (CAKUT - Congenital Anomalies of the
      Kidney and Urinary Tract) şemsiyesi altında toplanan yapısal
      bozukluklardan kaynaklanmaktadır. Bunu kalıtsal nefropatiler ve edinsel
      glomerüler hastalıklar izler.
    </p>

    <ul className="list-disc pl-6 space-y-4 mt-4">
      <li>
        <strong>CAKUT ve Fetal Nefron Gelişimi:</strong> İnsanlarda nefronların
        oluşumu gebeliğin 36. haftasına kadar devam eder ve üçüncü trimester
        nefron gelişiminin zirve yaptığı dönemdir. Bu nedenle prematüre doğan
        veya intrauterin büyüme geriliği olan bebekler, kalıcı olarak azaltılmış
        bir nefron sayısıyla dünyaya gelirler. Eksik sayıdaki bu nefronlar,
        vücudun yükünü karşılayabilmek için aşırı filtrasyon (hiperfiltrasyon)
        yapmak zorunda kalır ve bu durum yıllar içinde sklerozise ve KBH'ye yol
        açar. Klinik muayenede tek umbilikal arter veya dış kulak malformasyonu
        saptanan yenidoğanlar CAKUT açısından çok yüksek risk taşırlar ve acil
        renal ultrasonografi gerektirirler. Ayrıca, tek fonksiyonel böbrekle
        doğan infantlar, anne karnında kompansatuvar büyüme (hipertrofi)
        geliştirmişlerse yetişkinlikte KBH riskleri düşüktür; ancak hipertrofi
        yoksa risk oldukça yüksektir.
      </li>
      <li>
        <strong>Vezikoüreteral Reflü (VUR) ve Reflü Nefropatisi:</strong>{" "}
        İdrarın mesaneden üreterlere ve böbreklere doğru geri kaçması durumudur.
        VUR varlığında idrar yolu enfeksiyonu (İYE) gelişmesi, böbrek
        parankiminde geri dönüşümsüz inflamasyon ve fibrozise yol açar. VUR ve
        İYE birlikteliği olan çocukların %10-15'inde böbrek skarlaşması gelişir.
        Bu skarlar, enfeksiyon iyileştikten yıllar sonra bile mikroalbüminüri,
        dirençli hipertansiyon ve sonuç olarak KBH'ye (Reflü Nefropatisi) neden
        olur. Kuzey Amerika'da reflü nefropatisi, pediatrik KBH'nin 4. en sık
        nedenidir.
      </li>
      <li>
        <strong>Genetik ve Kromozomal Sendromlar:</strong> Down sendromlu
        çocukların, yaş uyumlu kontrollere kıyasla anatomik olarak daha küçük
        böbreklere ve düşük bir bazal GFH'ye sahip oldukları saptanmıştır.
      </li>
    </ul>

    <h3 className="text-2xl font-bold text-slate-900 mt-10">
      Klinik Özellikler, Hastalık Komplikasyonları ve Muayene Bulguları
    </h3>
    <p>
      Kronik böbrek hastalığı son derece sinsi ilerleyen bir patolojidir. Böbrek
      rezervi geniş olduğu için GFH normalin %30'una düşene kadar çocuk tamamen
      asemptomatik kalabilir. İlerleyen evrelerde poliüri, polidipsi,
      iştahsızlık, belirgin solukluk ve lineer büyüme geriliği tabloya hakim
      olur. Hastalığın ilerlemesiyle çoklu organ sistemlerinde ciddi
      komplikasyonlar baş gösterir:
    </p>

    <div className="space-y-6 mt-6">
      <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
        <h4 className="font-bold text-lg text-slate-800 mb-2">
          1. Kronik Böbrek Hastalığı-Mineral ve Kemik Bozukluğu (CKD-MBD) ve
          Renal Osteodistrofi
        </h4>
        <p>
          Böbrekler, D vitaminini aktif formu olan kalsitriole dönüştüren ve
          fazla fosforu vücuttan atan ana merkezdir. KBH ilerledikçe böbrek
          fosforu atamaz (hiperfosfatemi gelişir) ve D vitaminini
          aktifleştiremez. Kandaki aşırı fosfor kalsiyuma bağlanarak dokulara
          çöker ve serum kalsiyumunu düşürür (hipokalsemi). Bu durum, paratiroid
          bezini aşırı uyararak ikincil hiperparatiroidizme neden olur. Yüksek
          Paratiroid Hormonu (PTH) seviyeleri, kalsiyumu normalleştirmek için
          kemiklerden kalsiyum çeker. Sonuç olarak kemik döngüsü, hacmi ve
          mineralizasyonu bozularak "Renal Osteodistrofi" veya "Renal Rikets"
          (böbrek kaynaklı raşitizm) adı verilen, kemik ağrıları, kırıklar ve
          bacaklarda eğriliklerle (genu varum) giden ağır iskelet deformiteleri
          ortaya çıkar.
        </p>

        <div className="mt-4 p-4 bg-indigo-50 border-l-4 border-indigo-500 text-sm">
          <strong className="text-indigo-900 block mb-1">
            Genetik Boyutu - X'e Bağlı Hipofosfatemik Rikets (XLH):
          </strong>
          Geleneksel D vitamini tedavisine yanıt vermeyen, kemik deformiteleri
          ve boy kısalığı yapan bu genetik rikets formu, PHEX gen mutasyonu
          sonucu ortaya çıkar. PHEX mutasyonu, böbreklerden aşırı fosfat
          atılımına neden olan FGF23 (Fibroblast Büyüme Faktörü 23) hormonunun
          kan seviyelerini patolojik olarak artırır. Günümüzde bu çocukların
          tedavisinde, FGF23'ü bloke eden insan monoklonal antikoru{" "}
          <strong>Burosumab</strong> başarılı bir şekilde kullanılmaktadır.
        </div>
      </div>

      <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
        <h4 className="font-bold text-lg text-slate-800 mb-2">
          2. Kardiyovasküler Bulgular ve Anemi
        </h4>
        <p>
          Böbreklerdeki tübülointerstisyel hücreler eritropoietin (EPO)
          sentezinden sorumludur. Hücre hasarı nedeniyle EPO sentezlenememesi ve
          üremik toksinlerin kırmızı kan hücrelerinin yaşam süresini kısaltması,
          hastalarda derin bir normositik normokromik anemiye yol açar. Tuz ve
          su tutulumu ile aktive olan renin-anjiyotensin-aldosteron sistemi
          (RAAS), hastalarda şiddetli ve dirençli hipertansiyon ataklarına neden
          olur.
        </p>
      </div>

      <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
        <h4 className="font-bold text-lg text-slate-800 mb-2">
          3. İleri Evre Üremik Sendrom ve Üremik Frost
        </h4>
        <p>
          Diyaliz ihtiyacının olduğu Evre 5 (SDBH) seviyesine gelen, ancak
          tedavi almayan hastalarda kan üre azotu (BUN) 200 mg/dL üzerine
          çıktığında üremik toksinler ter bezleri aracılığıyla deriden atılmaya
          başlanır. Terin cilt yüzeyinde buharlaşmasıyla geriye kalan üre
          kristalleşerek deride beyaz, tuza benzer bir tabaka oluşturur. "Üremik
          frost" olarak bilinen bu fenomen, modern diyaliz yöntemlerinin
          yaygınlaşmasıyla günümüzde son derece nadir hale gelmiştir (prevalansı
          %0.8-3).
        </p>
      </div>
    </div>

    <h3 className="text-2xl font-bold text-slate-900 mt-10">
      İlk Basamak Tetkikler ve Görüntülemenin Yorumlanması
    </h3>
    <p>
      KBH şüphesi ile değerlendirilen bir çocukta laboratuvar paneli, hastalığın
      sadece şiddetini değil, yarattığı metabolik yıkımı da göstermelidir. Serum
      elektrolitleri, üre, kreatinin ve sistatin C değerlerinin yanı sıra kemik
      metabolizmasını görmek için kalsiyum, fosfor, intakt Paratiroid Hormonu
      (iPTH) ve alkalen fosfataz (ALP) düzeyleri şarttır. İdrar tahlilinde
      mikroskobik inceleme ve spot idrarda protein/kreatinin oranı hastalığın
      yapısal ilerleyişi (G1 evresi tanısı) için yol göstericidir.
    </p>
    <p>
      Radyolojik değerlendirme, pediatrik KBH'de nedene yönelik en önemli
      araçtır. Primer anatomik defekti veya kronik hasarı göstermede böbrek
      ultrasonografisi her hastaya uygulanmalıdır. KBH'nin klasik
      ultrasonografik görünümü, sağlıklı böbreğin aksine kortikal ekojenitesi
      artmış (fibrozis nedeniyle daha parlak görünen), kortikal kalınlığı
      azalmış ve boyutları küçülmüş böbreklerdir. Eğer hastada VUR ve İYE öyküsü
      varsa, böbrek parankimindeki hasarı ve skar bölgelerini haritalamak, aynı
      zamanda iki böbreğin birbiriyle kıyaslandığı diferansiyel fonksiyon
      oranını (% olarak) belirlemek için 99mTc-DMSA (Dimercaptosuccinic acid)
      böbrek sintigrafisi istenir. Obstrüksiyon dinamiğini değerlendirmek için
      ise MAG-3 renogram kullanılır.
    </p>

    <SafeImage
      src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Ultrasonography_of_chronic_renal_disease_caused_by_glomerulonephritis.jpg"
      caption="Görsel 3: Glomerülonefrit nedenli kronik böbrek hastalığı tanısı almış bir hastanın böbrek ultrasonografi kesiti. Parankimde kronik inflamasyon ve skarlaşmayı gösteren belirgin ekojenite (parlaklık) artışı ve kortikal kalınlıkta bariz azalma dikkati çekmektedir."
    />
  </div>
);

// --- ANA UYGULAMA BİLEŞENİ ---
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("abh");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "abh", label: "Akut Böbrek Hasarı (ABH)", icon: Activity },
    { id: "kbh", label: "Kronik Böbrek Hastalığı (KBH)", icon: Syringe },
    { id: "pdo", label: "İnteraktif Vakalar (PDÖ)", icon: Stethoscope },
    { id: "quiz_abh", label: "Soru Bankası (ABH)", icon: ListChecks },
    { id: "quiz_kbh", label: "Soru Bankası (KBH)", icon: ListChecks },
    { id: "references", label: "Kaynaklar", icon: BookOpen },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "abh":
        return <SectionABH />;
      case "kbh":
        return <SectionKBH />;
      case "quiz_abh":
        return <QuizBank title="ABH Soru Bankası" questions={abyQuestions} />;
      case "quiz_kbh":
        return <QuizBank title="KBH Soru Bankası" questions={kbyQuestions} />;
      case "pdo":
        return <CaseStudyViewer />;
      case "references":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
              <BookOpen className="text-indigo-600" /> Referanslar ve Kaynakça
            </h2>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed bg-white p-6 rounded-lg border shadow-sm break-all">
              {referencesList.map((ref, idx) => (
                <li
                  key={idx}
                  className="pb-2 flex items-start gap-2 border-b border-slate-100 last:border-0"
                >
                  <FileText className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span>{ref}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return <SectionABH />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Mobil Başlık */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Brain className="w-6 h-6 text-indigo-400" /> DoctoApp
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sol Menü (Sidebar) */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0
      `}
      >
        <div className="h-16 hidden md:flex items-center gap-2 px-6 bg-slate-950 text-white font-bold text-xl border-b border-slate-800">
          <Brain className="w-7 h-7 text-indigo-500" /> DoctoApp
        </div>
        <div className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-16 md:mt-0">
          Pediatrik Nefroloji
        </div>
        <nav className="flex-1 overflow-y-auto px-3 space-y-1 pb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-indigo-200" : "text-slate-400"
                  }`}
                />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Ana İçerik Alanı */}
      <div className="flex-1 overflow-y-auto pt-16 md:pt-0">
        <div className="max-w-4xl mx-auto p-4 md:p-8 pb-20">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
