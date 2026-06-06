React;
import React, { useState, ReactNode } from "react";
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCcw,
  ChevronRight,
  Activity,
  Brain,
  ShieldAlert,
  Thermometer,
  HeartPulse,
  Stethoscope,
} from "lucide-react";

// --- TİP TANIMLAMALARI (TypeScript Hatalarını Çözmek İçin) ---
interface Section {
  id: number;
  title: string;
  icon: ReactNode;
  content: ReactNode;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
}

// --- DATA: PDF İÇERİĞİ ---
const sections: Section[] = [
  {
    id: 0,
    title: "1. Acil Yaklaşım",
    icon: <Activity className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">
          1. Nöbet Geçiren Çocuğa Acil Yaklaşım ve Stabilizasyon
        </h2>
        <p>
          Nöbet geçirmekte olan (veya acile nöbet ile getirilen) bir çocukta ilk
          hedef hastanın stabilizasyonudur ve vital fonksiyonların güvenceye
          alınmasıdır.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Hava Yolu, Solunum ve Dolaşım (ABC):</strong> Hastanın hava
            yolu açık tutulmalı, başı yana çevrilerek aspirasyon önlenmelidir.
            Oksijenizasyon kontrol edilmeli; nazal kanül veya maske ile oksijen
            verilmelidir (gerektiğinde entübasyon kararı alınmalıdır). EKG ve
            kardiyak monitorizasyon hemen başlatılmalıdır.
          </li>
          <li>
            <strong>Kan Şekeri Kontrolü:</strong> Parmak ucundan kan şekeri
            bakılmalı, hipoglisemi (glukoz &lt;60 mg/dl) saptanırsa derhal 5
            ml/kg %10 dekstroz intravenöz (IV) olarak verilmelidir.
          </li>
          <li>
            <strong>Damar Yolu ve Kan Tetkikleri:</strong> Damar yolu açılarak
            kalsiyum, fosfor, alkalen fosfataz, sodyum, potasyum, klor, böbrek
            ve karaciğer fonksiyon testleri, tam kan sayımı, venöz kan gazı ve
            (varsa) antiepileptik ilaç kan düzeyleri için kan örnekleri
            alınmalıdır.
          </li>
          <li>
            <strong>Acil Farmakolojik Müdahale:</strong> Nöbet devam ediyorsa,
            birinci basamak tedavi olarak IV Diazepam (0.15-0,2 mg/kg dozunda)
            veya Midazolam uygulanmalıdır. İkinci doza rağmen nöbet durmazsa
            veya ardışık nöbetler varsa (Status Epileptikus), Fenitoin,
            Levetirasetam veya Fenobarbital gibi ikinci basamak antiepileptik
            ilaç yüklemelerine geçilmelidir.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 1,
    title: "2. Anamnez & Muayene",
    icon: <Stethoscope className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">
          2. Anamnez ve Fizik/Nörolojik Muayenede İpuçları
        </h2>
        <h3 className="text-lg font-semibold text-slate-800">Anamnez:</h3>
        <p>
          Nöbetin fokal mi jeneralize mi olduğu, süresi, daha önce nöbet/bilinç
          kaybı öyküsü, eşlik eden ateş, kusma, ishal, öksürük veya travma
          varlığı titizlikle sorgulanmalıdır. Ailede febril veya afebril nöbet
          öyküsü, ani ölüm ve çocuğun motor-mental gelişim basamakları
          öğrenilmelidir.
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          Muayene İpuçları:
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Cilt:</strong> Hipo/hiperpigmente lekeler (örneğin
            Tüberoskleroz sendromu için Wood lambası ile incelenen hipopigmente
            lekeler), hemanjiomlar, peteşi veya ekimozlar.
          </li>
          <li>
            <strong>Baş-Boyun:</strong> Baş çevresinde makrosefali (hidrosefali,
            SSS gelişim anomalileri) ya da fontanel bombeliği, katarakt,
            fundoskopik muayenede papil ödem.
          </li>
          <li>
            <strong>Organomegali ve İskelet Sistemi:</strong> Hepatomegali
            (metabolik depo hastalıkları, anemi, enfeksiyon, malignite) ve el
            bileklerinde genişleme gibi raşitizm bulguları akut semptomatik
            nöbete neden olabilen metabolik sorunları (hipokalsemi gibi) işaret
            edebilir.
          </li>
          <li>
            <strong>Nörolojik Değerlendirme:</strong> Bilinç durumu, kraniyal
            sinirler, derin tendon refleksleri, fokal nörolojik defisit ve
            meningeal irritasyon bulgularının (ense sertliği) varlığı
            değerlendirilmelidir.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    title: "3. Nöbet Sınıflaması",
    icon: <Brain className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">
          3. Nöbet Sınıflaması (ILAE) ve Yenidoğan Nöbetleri
        </h2>

        <h3 className="text-lg font-semibold text-slate-800">
          ILAE 2017 Nöbet Sınıflaması:
        </h3>
        <p>Nöbetler üç ana başlıkta incelenir:</p>
        <ol className="list-decimal pl-5 space-y-2 font-medium">
          <li>
            <strong>Fokal Başlangıçlı:</strong> Farkındalığın korunduğu ya da
            bozulduğu; motor (otomatizma, klonik, tonik) veya motor olmayan
            (kognitif, otonomik, duyusal) bulgularla seyreden nöbetler. Fokal
            başlayıp bilateral tonik-klonik nöbete ilerleyebilir.
          </li>
          <li>
            <strong>Jeneralize Başlangıçlı:</strong> Motor (tonik-klonik,
            miyoklonik, atonik, epileptik spazm) ve motor olmayan (tipik veya
            atipik absans).
          </li>
          <li>
            <strong>Başlangıcı Bilinmeyen:</strong> Klinik olarak net
            gözlenememiş motor veya motor olmayan nöbetler.
          </li>
        </ol>

        <h3 className="text-lg font-semibold text-slate-800 mt-6">
          Yenidoğan Nöbetleri:
        </h3>
        <p>
          Sıklık sırasına göre perinatal asfiksi/hipoksik iskemik ensefalopati,
          intrakraniyal kanama, hipoglisemi, enfeksiyonlar, hipokalsemi,
          metabolik hastalıklar ve annede madde kullanımı sebebiyle gelişir.
          Dört sınıfa ayrılır:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Subtle (Gizli):</strong> Apne, gözlerde kayma, ağız-dil
            hareketleri (yalanma, emme) veya ekstremitelerde pedal çevirme
            hareketleri.
          </li>
          <li>Tonik, Klonik ve Miyoklonik nöbetler.</li>
        </ul>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-2 text-yellow-800">
          <strong>Not:</strong> Yenidoğan nöbetleri kesinlikle acil metabolik
          müdahale (glukoz, kalsiyum) ve gerekirse fenobarbital yüklemesi
          gerektirir.
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "4. Febril Nöbetler",
    icon: <Thermometer className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">
          4. Febril Nöbetler: Tanım, Sınıflama, LP Endikasyonları ve Yönetim
        </h2>

        <p>
          <strong>Tanım:</strong> 6 ay - 5 yaş arasındaki çocuklarda (ILAE
          tanımına göre 1 ay - 5 yaş), santral sinir sistemi enfeksiyonu veya
          önceden bilinen bir nörolojik hastalık olmaksızın ateşle (&gt;38°C)
          ortaya çıkan nöbetlerdir.
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          Sınıflama:
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Basit Febril Nöbet:</strong> Jeneralize tipte, 15 dakikadan
            (genellikle 5 dk'dan) kısa süren, 24 saat içinde tekrarlamayan ve
            post-iktal (nöbet sonrası) fokal nörolojik bulgu bırakmayan
            nöbetlerdir.
          </li>
          <li>
            <strong>Komplike Febril Nöbet:</strong> Fokal özellik gösteren, 15
            dakikadan uzun süren veya aynı febril hastalık döneminde (24 saat
            içinde) tekrarlayan nöbetlerdir.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          Lomber Ponksiyon (LP) Endikasyonları:
        </h3>
        <p>
          Ateşli bir nöbette en büyük korku menenjiti atlamaktır. Aşağıdaki
          durumlarda LP kesinlikle düşünülmelidir:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Meningeal irritasyon bulguları (ense sertliği, Kernig, Brudzinski)
            olan her çocukta.
          </li>
          <li>
            6-12 ay arasındaki bebeklerde; Haemophilus influenzae tip b ve
            pnömokok aşı takvimi eksik veya durumu bilinmiyorsa (menenjit
            bulguları bu yaşta tam oturmayabilir).
          </li>
          <li>
            Nöbet öncesinde antibiyotik kullanmış çocuklarda (menenjit kliniğini
            maskeleyebileceği için).
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          Yönetim ve Profilaksi:
        </h3>
        <p>
          Aileye febril nöbetlerin genellikle iyi huylu olduğu ve kendi başına
          epilepsi gelişimine nadiren yol açtığı anlatılmalıdır. Günlük rutin
          antiepileptik kullanımı önerilmez. Yüksek ateş anlarında ailenin
          antipiretik (ateş düşürücü) kullanması nöbeti "önlemez", sadece
          hastayı rahatlatır. Eğer çocukta çok sık ve uzun süreli febril nöbet
          oluyorsa (risk faktörleri: ilk nöbet &lt;18 ay, ailede febril nöbet
          öyküsü, ateşi nispeten düşükken nöbet geçirme) rektal diazepam ile
          "aralıklı profilaksi" verilebilir.
        </p>
      </div>
    ),
  },
  {
    id: 4,
    title: "5. Senkop & Bilinç Kaybı",
    icon: <HeartPulse className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">
          5. Senkop (Bilinç Kaybı) ve Ayırıcı Tanısı
        </h2>
        <p>
          Kısa süreli, postüral tonus kaybının eşlik ettiği bilinç kaybı
          tablolarında, nöbet ile senkop (bayılma) ayrımı kritiktir.
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          Klinik İpuçları:
        </h3>
        <p>
          Vazovagal (nörokardiyojenik) senkopta genellikle öncesinde baş
          dönmesi, kötü hissetme, göz kararması, mide bulantısı ve soğuk terleme
          (prodromal semptomlar) görülür. Ayakta dururken veya ani pozisyon
          değişikliği ile ortaya çıkar ve hasta sırt üstü yattığında bilinç 1
          dakikadan kısa sürede tamamen geri gelir.{" "}
          <strong>
            Eğer bilinç kaybı egzersiz "sırasında" (sonrasında değil) veya
            oturur/yatar pozisyonda oluyorsa, aritmiye bağlı kardiyak
            senkoplardan veya konvülsiyondan şüphelenilmelidir.
          </strong>
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          Senkop Nedenleri Sınıflaması:
        </h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Otonomik Nedenler (%60-80):</strong> Vazovagal senkop,
            ortostatik hipotansiyon, durumsal senkop (öksürük, işeme, soluk
            tutma).
          </li>
          <li>
            <strong>Kardiyak Nedenler (%2-6):</strong> Aritmiler (SVT, Uzun QT,
            Kalp blokları) ve obstrüktif/kalp kası lezyonları (Aort stenozu,
            Hipertrofik Kardiyomiyopati, Pulmoner hipertansiyon).{" "}
            <span className="font-semibold text-red-600">
              Not: Tüm bilinç kaybı hastalarında EKG altın standart tarama
              testidir.
            </span>
          </li>
          <li>
            <strong>Nöropsikiyatrik & Metabolik:</strong> Hiperventilasyon,
            histeri/konversiyon, migren, epileptik nöbet, hipoglisemi, toksinler
            (karbonmonoksit, antidepresanlar).
          </li>
        </ol>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          Vazovagal Senkop Yönetimi:
        </h3>
        <p>
          Hastaya sıcak ve kapalı ortamlardan kaçınması, bol sıvı tüketmesi,
          ayakta uzun süre dikilmemesi, prodromal bulguları hissettiğinde uzanıp
          bacaklarını havaya kaldırması önerilir.
        </p>
      </div>
    ),
  },
  {
    id: 5,
    title: "6. Semptomatik Nöbetler",
    icon: <ShieldAlert className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">
          6. Afebril/Akut Semptomatik Nöbetler ve Ciddi Epileptik Sendromlar
        </h2>
        <p>
          Ateşin eşlik etmediği ve ilk kez ortaya çıkan provoke (semptomatik)
          nöbetlerde veya dirençli nöbet durumlarında ayırıcı tanı
          genişletilmelidir.
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          Akut Semptomatik Nöbet Nedenleri:
        </h3>
        <p>
          Metabolik (hipokalsemi - örneğin raşitizmli hastalarda, hipomagnezemi,
          hiponatremi, hipoglisemi), zehirlenmeler (karbonmonoksit, endojen
          üremi), kafa travmaları ve intrakraniyal kanamalar.
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          Özel Epileptik / Nörolojik Sendromlar:
        </h3>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <strong>Akut Dissemine Ensefalomiyelit (ADEM):</strong> Ateşli
            hastalık sonrasında nöbet ve bilinç değişikliği, ensefalopati
            tablosu.
          </li>
          <li>
            <strong>Dravet Sendromu:</strong> Bebeklik çağında inatçı ve
            febril/afebril uzamış nöbetlerle giden, SCN1A mutasyonunun izlendiği
            ağır epileptik ensefalopati.
          </li>
          <li>
            <strong>Otoimmün Ensefalit (Anti-NMDA):</strong> Subakut gelişen
            nöbetler, davranış/psikiyatrik değişiklikler ve istemsiz hareketler.
          </li>
          <li>
            <strong>
              FIRES (Febrile Infection-Related Epilepsy Syndrome):
            </strong>{" "}
            Geçirilmiş bir febril enfeksiyonu takiben immün veya enfeksiyöz
            patoloji gösterilemeyen dirençli katastrofik status epileptikus
            tablosudur.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          İlk Afebril Nöbette Yaklaşım:
        </h3>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          Nörolojik muayene normalse, provoke edici net bir toksik/metabolik
          bulgu yoksa ve EEG tamamen normalse çocuklarda "ilk nöbette"
          genellikle antiepileptik ilaca hemen başlanmaz. Ancak EEG'de
          epileptiform anormallik varsa veya beyin görüntülemesinde altta yatan
          fokal lezyon saptanırsa uzun süreli antiepileptik profilaksisi
          endikasyonu doğar.
        </div>
      </div>
    ),
  },
];

// --- DATA: QUIZ (20 Soru, 5 Şık) ---
const quizData: QuizQuestion[] = [
  {
    id: 1,
    question:
      "Acile nöbet geçirmekte olan bir çocuk getirildiğinde ilk yapılması gereken nedir?",
    options: [
      "Acilen antiepileptik ilaç başlamak",
      "Lomber ponksiyon yapmak",
      "Hastanın hava yolunu açık tutup stabilizasyonu sağlamak",
      "Ailenin epilepsi geçmişini detaylıca sorgulamak",
      "Derhal EEG çekimine göndermek",
    ],
    answer: 2,
  },
  {
    id: 2,
    question:
      "Nöbet geçiren bir çocukta kan şekeri ölçüldüğünde hipoglisemi sınırı ve uygulanacak ilk tedavi dozu aşağıdakilerden hangisidir?",
    options: [
      "<50 mg/dl, 2 ml/kg %20 dekstroz",
      "<60 mg/dl, 5 ml/kg %10 dekstroz",
      "<70 mg/dl, 10 ml/kg %5 dekstroz",
      "<40 mg/dl, 5 ml/kg %10 dekstroz",
      "<60 mg/dl, 2 ml/kg %20 dekstroz",
    ],
    answer: 1,
  },
  {
    id: 3,
    question:
      "Nöbet devam ediyorsa birinci basamak farmakolojik tedavi olarak hangi ilaç uygulanmalıdır?",
    options: [
      "IV Fenitoin",
      "IV Levetirasetam",
      "IV Valproik Asit",
      "IV Diazepam veya Midazolam",
      "IV Fenobarbital",
    ],
    answer: 3,
  },
  {
    id: 4,
    question:
      "Birinci basamak tedaviye yanıt vermeyen Status Epileptikus tablosunda ikinci basamak tedavi seçenekleri arasında aşağıdakilerden hangisi yer almaz?",
    options: [
      "Fenitoin",
      "Levetirasetam",
      "Fenobarbital",
      "Diazepam",
      "Hiçbiri (Hepsi ikinci basamaktır)",
    ],
    answer: 3,
  },
  {
    id: 5,
    question:
      "Nöbet geçiren bir çocukta cilt muayenesinde Wood lambası ile incelendiğinde hipopigmente lekeler görülmesi öncelikle hangi sendromu düşündürür?",
    options: [
      "Nörofibromatozis tip 1",
      "Sturge-Weber sendromu",
      "İnkontinentia pigmenti",
      "Ataksi telenjiektazi",
      "Tüberoskleroz sendromu",
    ],
    answer: 4,
  },
  {
    id: 6,
    question:
      "Nöbet şikayeti ile gelen bir çocukta el bileklerinde genişleme gibi raşitizm bulguları saptanmıştır. Bu hastada akut semptomatik nöbete yol açan muhtemel metabolik sorun hangisidir?",
    options: [
      "Hipoglisemi",
      "Hipokalsemi",
      "Hiponatremi",
      "Hiperkalemi",
      "Hipomagnezemi",
    ],
    answer: 1,
  },
  {
    id: 7,
    question:
      "ILAE 2017 Nöbet Sınıflamasına göre nöbetler hangi üç ana başlık altında toplanır?",
    options: [
      "Basit, Komplike, Status",
      "Motor, Duyusal, Otonomik",
      "Fokal, Jeneralize, Başlangıcı Bilinmeyen",
      "Tonik, Klonik, Miyoklonik",
      "Febril, Afebril, Akut Semptomatik",
    ],
    answer: 2,
  },
  {
    id: 8,
    question:
      "Aşağıdakilerden hangisi yenidoğan nöbetlerinin en sık görülen nedenidir?",
    options: [
      "İntrakraniyal kanama",
      "Hipoglisemi",
      "Hipokalsemi",
      "Perinatal asfiksi / Hipoksik iskemik ensefalopati",
      "Menenjit / Enfeksiyonlar",
    ],
    answer: 3,
  },
  {
    id: 9,
    question:
      "Yenidoğan döneminde apne, gözlerde kayma, emme/yalanma ve pedal çevirme hareketleri ile karakterize nöbet tipi aşağıdakilerden hangisidir?",
    options: [
      "Subtle (Gizli) nöbet",
      "Miyoklonik nöbet",
      "Tonik nöbet",
      "Klonik nöbet",
      "Epileptik spazm",
    ],
    answer: 0,
  },
  {
    id: 10,
    question:
      "ILAE tanımına göre febril nöbetlerin görüldüğü tipik yaş aralığı nedir?",
    options: [
      "1 ay - 5 yaş",
      "6 ay - 6 yaş",
      "3 ay - 3 yaş",
      "1 yaş - 5 yaş",
      "Sadece yenidoğan dönemi",
    ],
    answer: 0,
  },
  {
    id: 11,
    question:
      "Aşağıdakilerden hangisi 'Basit Febril Nöbet'in özelliklerinden biri değildir?",
    options: [
      "Jeneralize tipte olması",
      "Genellikle 15 dakikadan kısa sürmesi",
      "Fokal özellik göstermesi",
      "24 saat içinde tekrarlamaması",
      "Nöbet sonrası fokal nörolojik bulgu bırakmaması",
    ],
    answer: 2,
  },
  {
    id: 12,
    question:
      "Febril nöbet geçiren bir çocukta Lomber Ponksiyon (LP) endikasyonu için aşağıdakilerden hangisi yanlıştır?",
    options: [
      "Meningeal irritasyon bulguları olan her çocukta yapılmalıdır.",
      "12 yaşından büyük her çocukta rutin olarak uygulanmalıdır.",
      "Aşı takvimi eksik olan 6-12 ay arası bebeklerde düşünülmelidir.",
      "Nöbet öncesinde antibiyotik kullananlarda menenjit maskelenmiş olabileceğinden düşünülmelidir.",
      "Menenjit şüphesi olan her durumda öncelikle değerlendirilmelidir.",
    ],
    answer: 1,
  },
  {
    id: 13,
    question:
      "Febril nöbet öyküsü olan bir çocukta yüksek ateş sırasında antipiretik (ateş düşürücü) kullanımının nöbet üzerindeki etkisi nedir?",
    options: [
      "Nöbet eşiğini doğrudan yükseltir",
      "Nöbet geçirmeyi kesin olarak önler",
      "Epilepsi gelişimini engeller",
      "Nöbeti önlemez, sadece hastayı rahatlatır",
      "Nöbet süresini uzatır",
    ],
    answer: 3,
  },
  {
    id: 14,
    question:
      "Senkop (bayılma) ve nöbet ayırıcı tanısında, vazovagal senkop için hangisi tipik değildir?",
    options: [
      "Öncesinde baş dönmesi, göz kararması görülmesi",
      "Ayakta uzun süre dururken veya ani pozisyon değişikliği ile ortaya çıkması",
      "Bilinç kaybının sırt üstü yatırıldığında 1 dakikadan uzun sürede geri gelmesi",
      "Mide bulantısı ve soğuk terlemenin eşlik etmesi",
      "Otonomik nedenli senkoplar arasında yer alması",
    ],
    answer: 2,
  },
  {
    id: 15,
    question:
      "Aritmiye bağlı kardiyak senkoplardan şüphelenmeyi gerektiren en önemli klinik ipucu aşağıdakilerden hangisidir?",
    options: [
      "Olay öncesi şiddetli öksürük krizi yaşanması",
      "Bilinç kaybının egzersiz 'sırasında' veya yatar pozisyonda olması",
      "Uzun süre kapalı ve sıcak ortamda ayakta beklenmesi",
      "Kan alınması sırasında iğne korkusuyla ortaya çıkması",
      "Öncesinde şiddetli mide bulantısı hissedilmesi",
    ],
    answer: 1,
  },
  {
    id: 16,
    question:
      "Tüm bilinç kaybı / senkop şikayeti ile başvuran hastalarda yapılması gereken altın standart tarama testi hangisidir?",
    options: [
      "Kraniyal MR",
      "Lomber ponksiyon",
      "Kan şekeri ölçümü",
      "EEG (Elektroensefalografi)",
      "EKG (Elektrokardiyografi)",
    ],
    answer: 4,
  },
  {
    id: 17,
    question:
      "Ateşli hastalık sonrasında nöbet, bilinç değişikliği ve ensefalopati tablosu ile acile getirilen bir çocukta öncelikle hangi tablo düşünülmelidir?",
    options: [
      "Dravet Sendromu",
      "Akut Dissemine Ensefalomiyelit (ADEM)",
      "Otoimmün Ensefalit",
      "Basit Febril Nöbet",
      "Vazovagal senkop",
    ],
    answer: 1,
  },
  {
    id: 18,
    question:
      "Bebeklik çağında inatçı ve uzamış nöbetlerle giden, genetik olarak SCN1A mutasyonunun izlendiği ağır epileptik ensefalopati hangisidir?",
    options: [
      "FIRES Sendromu",
      "Tüberoskleroz",
      "Dravet Sendromu",
      "Lennox-Gastaut Sendromu",
      "Ohtahara Sendromu",
    ],
    answer: 2,
  },
  {
    id: 19,
    question:
      "Geçirilmiş bir febril enfeksiyonu takiben immün veya enfeksiyöz patoloji gösterilemeyen dirençli katastrofik status epileptikus tablosuna ne ad verilir?",
    options: [
      "ADEM",
      "Anti-NMDA ensefaliti",
      "Dravet sendromu",
      "FIRES (Febrile Infection-Related Epilepsy Syndrome)",
      "Komplike febril nöbet",
    ],
    answer: 3,
  },
  {
    id: 20,
    question:
      "İlk kez afebril nöbet geçiren bir çocukta uzun süreli antiepileptik ilaç başlama endikasyonu için aşağıdakilerden hangisi doğrudur?",
    options: [
      "Her ilk afebril nöbet sonrasında rutin olarak ilaç başlanmalıdır.",
      "Nörolojik muayene ve EEG tamamen normalse her zaman hemen tedavi başlanır.",
      "Sadece EEG'de epileptiform anormallik varsa veya MR'da fokal lezyon saptanırsa başlanır.",
      "Lomber ponksiyon sonucu beklenmeden hemen tedaviye geçilir.",
      "Hastanın yaşı 12'den büyükse muayene bulgusuna bakılmaksızın tedavi başlanır.",
    ],
    answer: 2,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<number>(0);

  // TypeScript hatasını önlemek için Record<number, number> tanımlaması yapıldı
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Parametrelere açıkça "number" tipleri eklendi
  const handleOptionSelect = (
    questionIndex: number,
    optionIndex: number
  ): void => {
    if (!isSubmitted) {
      setAnswers((prev) => ({
        ...prev,
        [questionIndex]: optionIndex,
      }));
    }
  };

  const calculateScore = (): number => {
    let score = 0;
    quizData.forEach((q, index) => {
      if (answers[index] === q.answer) score++;
    });
    return score;
  };

  const handleSubmit = (): void => {
    if (Object.keys(answers).length < quizData.length) {
      if (
        !window.confirm(
          "Cevaplamadığınız sorular var. Testi yine de bitirmek istiyor musunuz?"
        )
      ) {
        return;
      }
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = (): void => {
    setAnswers({});
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Brain className="w-6 h-6" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
              Nöbet / Bilinç Kaybı PDÖ
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar / Tabs */}
        <aside className="lg:w-1/4 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border p-3 flex flex-col space-y-1 sticky top-24">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 pt-2">
              İçerik Modülleri
            </h2>

            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveTab(section.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`flex items-center text-left gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === section.id
                    ? "bg-blue-50 text-blue-700 font-medium border border-blue-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div
                  className={`${
                    activeTab === section.id
                      ? "text-blue-600"
                      : "text-slate-400"
                  }`}
                >
                  {section.icon}
                </div>
                <span className="text-sm">{section.title}</span>
                {activeTab === section.id && (
                  <ChevronRight className="w-4 h-4 ml-auto text-blue-500" />
                )}
              </button>
            ))}

            <div className="h-px bg-slate-100 my-2 mx-2"></div>

            <button
              onClick={() => {
                setActiveTab(99);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex items-center text-left gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 99
                  ? "bg-emerald-50 text-emerald-700 font-bold border border-emerald-100"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              <div
                className={`${
                  activeTab === 99 ? "text-emerald-600" : "text-slate-400"
                }`}
              >
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-sm">Değerlendirme Testi</span>
              {activeTab === 99 && (
                <ChevronRight className="w-4 h-4 ml-auto text-emerald-500" />
              )}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="lg:w-3/4 bg-white rounded-xl shadow-sm border p-6 md:p-10 min-h-[60vh]">
          {activeTab !== 99 ? (
            // Render Document Section
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {sections.find((s) => s.id === activeTab)?.content}
            </div>
          ) : (
            // Render Quiz Section
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Konu Değerlendirme Testi
                  </h2>
                  <p className="text-slate-500 mt-1">
                    20 Soru • 5 Şıklı Çoktan Seçmeli
                  </p>
                </div>
                {isSubmitted && (
                  <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold text-lg flex items-center gap-2">
                    Skor: {calculateScore()} / 20
                  </div>
                )}
              </div>

              {isSubmitted && (
                <div
                  className={`mb-8 p-4 rounded-lg border ${
                    calculateScore() >= 15
                      ? "bg-emerald-50 border-emerald-200"
                      : calculateScore() >= 10
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                    {calculateScore() >= 15 ? (
                      <CheckCircle2 className="text-emerald-500" />
                    ) : (
                      <AlertCircle className="text-yellow-500" />
                    )}
                    Test Tamamlandı
                  </h3>
                  <p>
                    Doğru sayınız: <strong>{calculateScore()}</strong>, Yanlış
                    sayınız: <strong>{20 - calculateScore()}</strong>.
                  </p>
                  <p className="text-sm mt-1 opacity-80">
                    Sonuçları inceleyebilir veya testi sıfırlayarak tekrar
                    çözebilirsiniz.
                  </p>
                </div>
              )}

              <div className="space-y-8">
                {quizData.map((q, qIndex) => (
                  <div
                    key={q.id}
                    className="bg-slate-50 p-5 md:p-6 rounded-xl border"
                  >
                    <h4 className="text-lg font-semibold text-slate-800 mb-4 flex gap-3">
                      <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                        {q.id}
                      </span>
                      <span>{q.question}</span>
                    </h4>

                    <div className="space-y-3 pl-10">
                      {q.options.map((opt, oIndex) => {
                        const isSelected = answers[qIndex] === oIndex;
                        const isCorrect = q.answer === oIndex;

                        let optionClass =
                          "border-slate-200 bg-white hover:border-blue-300";
                        if (isSelected)
                          optionClass = "border-blue-500 bg-blue-50";

                        if (isSubmitted) {
                          if (isCorrect) {
                            optionClass =
                              "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500";
                          } else if (isSelected && !isCorrect) {
                            optionClass =
                              "border-red-400 bg-red-50 text-red-700";
                          } else {
                            optionClass =
                              "border-slate-200 bg-white opacity-60";
                          }
                        }

                        return (
                          <button
                            key={oIndex}
                            disabled={isSubmitted}
                            onClick={() => handleOptionSelect(qIndex, oIndex)}
                            className={`w-full text-left p-3 md:p-4 rounded-lg border transition-all duration-200 flex items-center gap-3 ${optionClass}`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full border flex flex-shrink-0 items-center justify-center ${
                                isSelected
                                  ? "border-blue-500"
                                  : "border-slate-300"
                              } ${
                                isSubmitted && isCorrect
                                  ? "bg-emerald-500 border-emerald-500"
                                  : ""
                              } ${
                                isSubmitted && isSelected && !isCorrect
                                  ? "bg-red-500 border-red-500"
                                  : ""
                              }`}
                            >
                              {isSelected && !isSubmitted && (
                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                              )}
                              {isSubmitted && isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              )}
                              {isSubmitted && isSelected && !isCorrect && (
                                <XCircle className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <span className="text-sm md:text-base leading-snug">
                              {opt}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center pt-6 border-t">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95"
                  >
                    Testi Bitir ve Sonucu Gör
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md flex items-center gap-2 transition-all"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    Testi Sıfırla
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
