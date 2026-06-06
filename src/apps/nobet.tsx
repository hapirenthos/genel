React;
import React, { useState, useEffect, ReactNode } from "react";

// --- TİP TANIMLAMALARI (TypeScript) ---
type EgitimModulu = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  content: ReactNode;
};

type QuizSoru = {
  soru: string;
  secenekler: string[];
  cevap: number;
  aciklama: string;
};

type VakaSecenek = {
  text: string;
  isCorrect: boolean;
  feedback: string;
};

type VakaAdim = {
  text: string;
  options: VakaSecenek[];
};

type Vaka = {
  id: number;
  title: string;
  desc: string;
  steps: VakaAdim[];
};

type QuizFeedback = {
  isCorrect: boolean;
  text: string;
};

// --- İKONLAR (Inline SVG) ---
const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const BookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);
const ActivityIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const HelpIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ArrowLeftIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// --- KAPSAMLI EĞİTİM VERİLERİ (PDÖ FÖYÜNÜN TAMAMI) ---
const egitimModulleri: EgitimModulu[] = [
  {
    id: "acil",
    icon: "🚨",
    title: "1. Acil Nöbet Yönetimi",
    desc: "Aktif nöbet geçiren hastada ilk adımlar ve algoritmalar.",
    content: (
      <div className="space-y-4 text-sm text-gray-800 leading-relaxed">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <h3 className="font-bold text-red-700 mb-2">
            İlk ve Acil Yapılacaklar (ABC)
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Hava Yolu (Airway):</strong> Açık olmalı, aspirasyon
              yapılmalı.
            </li>
            <li>
              <strong>Solunum (Breathing):</strong> Solunum kontrolü, nazal
              kanül/maske ile Oksijen, gerekirse entübasyon.
            </li>
            <li>
              <strong>Dolaşım (Circulation):</strong> Nabız, KB takibi. EKG
              monitorizasyonu.
            </li>
            <li>
              <strong>Zaman Takibi:</strong> Nöbetin başlangıcından geçen süre
              kaydedilmeli.
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-2">
            Acil Laboratuvar & İlaçlar
          </h3>
          <ul className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Kan Şekeri:</strong> Parmak ucundan bak.{" "}
              <strong>&lt;60 mg/dl ise 5 ml/kg %10 Dekstroz IV</strong> ver.
            </li>
            <li>
              <strong>Damar Yolu:</strong> Aç ve kan al (Elektrolitler,
              Kalsiyum, Kan sayımı, Toksikoloji, Kan gazı).
            </li>
            <li>
              <strong>Nöbet Durdurma:</strong> Nöbet devam ediyorsa{" "}
              <strong>0.15 - 0.2 mg/kg Diazepam IV</strong> (yavaş infüzyon).
            </li>
          </ul>
        </div>

        <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg">
          <h3 className="font-bold text-orange-800 mb-2">
            Hipokalsemik Nöbet Tedavisi
          </h3>
          <p className="mb-2">
            Afebril, raşitizm bulguları olan (geniş el bileği vb.) çocukta nöbet
            devam ediyorsa:
          </p>
          <ul className="list-disc pl-5">
            <li>
              <strong>İlaç:</strong> %10'luk Kalsiyum Glukonat solüsyonu
            </li>
            <li>
              <strong>Doz:</strong> 1-2 ml/kg
            </li>
            <li>
              <strong>Uygulama:</strong> 1/1 oranında SF ile sulandırılır.
            </li>
            <li>
              <strong>DİKKAT:</strong> Kalp hızı takip edilerek çok yavaş
              (yaklaşık 10 dakikada) IV verilir. Hızlı verilirse kardiyak arrest
              yapabilir!
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "siniflama",
    icon: "📊",
    title: "2. Nöbet Sınıflaması (ILAE)",
    desc: "Güncel ILAE nöbet sınıflaması.",
    content: (
      <div className="space-y-4 text-sm text-gray-800">
        <p className="mb-2">
          <strong>Epilepsi Tanımı:</strong> Aralarında en az 24 saat olan,
          provokasyonsuz ≥2 nöbet. VEYA tek nöbet olup, nöbet tekrar riski {">"}
          %60 ise.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-3">
            <h4 className="font-bold text-blue-700 border-b pb-1 mb-2">
              1. Fokal Başlangıçlı
            </h4>
            <p className="text-xs text-gray-500 mb-2">
              Farkındalık korunan / bozulan
            </p>
            <ul className="list-disc pl-5 text-xs space-y-1">
              <li>
                <strong>Motor:</strong> Otomatizmalar, Atonik, Klonik, Ep.
                Spazm, Hiperkinetik, Miyoklonik, Tonik
              </li>
              <li>
                <strong>Motor Olmayan:</strong> Otonomik, Davranış durması,
                Kognitif, Emosyonel, Sensoriyel
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-3">
            <h4 className="font-bold text-green-700 border-b pb-1 mb-2">
              2. Jeneralize Başlangıçlı
            </h4>
            <ul className="list-disc pl-5 text-xs space-y-1">
              <li>
                <strong>Motor:</strong> Tonik-klonik, Klonik, Tonik, Miyoklonik,
                Miyoklonik-Tonik-Klonik, Miyoklonik-Atonik, Atonik, Ep. Spazm
              </li>
              <li>
                <strong>Motor Olmayan (Absans):</strong> Tipik, Atipik,
                Miyoklonik absans, Göz kapağı miyoklonisi
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-3">
            <h4 className="font-bold text-purple-700 border-b pb-1 mb-2">
              3. Başlangıcı Bilinmeyen
            </h4>
            <ul className="list-disc pl-5 text-xs space-y-1">
              <li>
                <strong>Motor:</strong> Tonik-klonik, Epileptik spazmlar
              </li>
              <li>
                <strong>Motor Olmayan:</strong> Davranış durması
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "febril",
    icon: "🔥",
    title: "3. Febril Nöbetler",
    desc: "Basit/Komplike ayırımı, LP endikasyonları ve tedavi.",
    content: (
      <div className="space-y-4 text-sm text-gray-800">
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <strong>Tanım:</strong> 6 ay - 5 yaş arası, santral sinir sistemi dışı
          enfeksiyon kaynaklı ateşle ortaya çıkan nöbetlerdir. Öncesinde
          nörolojik problemi (Serebral palsi, gelişme geriliği vb.) olan
          hastanın ateşli nöbeti "Febril Nöbet" <b>sayılmaz</b>.
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white border border-gray-300 p-3 rounded-lg shadow-sm">
            <h4 className="font-bold text-blue-700 text-center mb-2">
              Basit Febril Nöbet
            </h4>
            <ul className="list-disc pl-4 text-xs space-y-1">
              <li>Jeneralize nöbet</li>
              <li>Süre ≤ 15 dk</li>
              <li>24 saatte tek nöbet</li>
              <li>Post-iktal fokal bulgu YOK</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-300 p-3 rounded-lg shadow-sm">
            <h4 className="font-bold text-red-700 text-center mb-2">
              Komplike Febril Nöbet
            </h4>
            <ul className="list-disc pl-4 text-xs space-y-1">
              <li>Fokal nöbet</li>
              <li>Süre ≥ 15 dk</li>
              <li>24 saatte tekrar eder</li>
              <li>Post-iktal bulgu olabilir</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg border-b pb-1">
            Lomber Ponksiyon (LP) Ne Zaman Yapılmalı?
          </h4>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              Meningeal irritasyon bulgusu (ense sertliği, Kernig, Brudzinski)
              varsa.
            </li>
            <li>
              <strong>6-12 ay arası:</strong> Hib ve Pnömokok aşıları
              eksik/bilinmiyorsa.
            </li>
            <li>
              <strong>Önceden antibiyotik kullanımı:</strong> Menenjit
              bulgularını maskeleyebileceği için.
            </li>
            <li>
              <span className="text-red-600 font-semibold">Kural:</span> Aşıları
              tam, genel durumu iyi çocukta rutin LP önerilmez.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "afebril",
    icon: "🧠",
    title: "4. Afebril Nöbetler",
    desc: "Bebek ve çocuklarda afebril nöbet etiyolojisi ve ipuçları.",
    content: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>
          Ateşsiz nöbetle gelen bir çocukta etiyolojiyi bulmak için detaylı
          sistemik ve nörolojik muayene şarttır.
        </p>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-2 font-bold text-center">
            Fizik Muayene İpuçları & Etiyoloji
          </div>
          <table className="w-full text-left text-xs">
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-bold bg-gray-50 w-1/3">
                  Deri (Hipopigmente Leke)
                </td>
                <td className="p-2">Tüberoskleroz</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-bold bg-gray-50">
                  Baş Çevresi ({">"}97p)
                </td>
                <td className="p-2">Hidrosefali, Makrosefali</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-bold bg-gray-50">Hepatomegali</td>
                <td className="p-2">Metabolik/Depo hastalıkları</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-bold bg-gray-50">Geniş El Bileği</td>
                <td className="p-2">Raşitizm (Akut hipokalsemik nöbet)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
          <h4 className="font-bold text-indigo-800 mb-2">
            İlk Nöbete Yaklaşım ve Tedavi Kararı
          </h4>
          <ul className="list-decimal pl-5 space-y-1">
            <li>
              Gerçek bir nöbet mi yoksa "Paroksismal olay" (senkop, katılma vb.)
              mi ayırt et.
            </li>
            <li>
              Muayene/Gelişim normal, tetikleyici yok,{" "}
              <strong>EEG normalse İLK NÖBETTE İLAÇ BAŞLANMAZ.</strong>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "yenidogan",
    icon: "👶",
    title: "5. Yenidoğan Nöbetleri",
    desc: "Yenidoğan dönemine özel nöbet nedenleri ve acil yaklaşım.",
    content: (
      <div className="space-y-4 text-sm text-gray-800">
        <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
          <h4 className="font-bold text-pink-800 mb-2">
            Sıklık Sırasına Göre Nedenler
          </h4>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              <strong>Perinatal Hipoksi (HİE) - En sık!</strong>
            </li>
            <li>İntrakraniyal Kanama</li>
            <li>Hipoglisemi</li>
            <li>Enfeksiyon</li>
            <li>Hipokalsemi</li>
          </ol>
        </div>

        <div>
          <h4 className="font-bold border-b pb-1 mb-2">
            Yenidoğan Nöbet Tipleri
          </h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Subtle (Gizli):</strong> Apne, anormal göz hareketleri,
              yalanma, yutkunma, çiğneme, pedal çevirme.
            </li>
            <li>
              <strong>Tonik, Klonik, Miyoklonik</strong>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
          <h4 className="font-bold text-blue-800 mb-2">
            Yenidoğan Nöbeti Acil Tedavisi
          </h4>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Havalanma/Dolaşım sağla, Kan Şekeri bak.</li>
            <li>
              <strong>1. Basamak:</strong>{" "}
              <span className="font-bold text-red-600">
                20 mg/kg IV Fenobarbital
              </span>{" "}
              yüklenir.
            </li>
            <li>
              <strong>2. Basamak:</strong> Fenitoin veya Levetirasetam IV.
            </li>
          </ol>
        </div>
      </div>
    ),
  },
  {
    id: "ayirici-tani",
    icon: "🔍",
    title: "6. Özel Sendromlar",
    desc: "Dravet, ADEM, Otoimmün Ensefalit ve Non-Epileptik Olaylar.",
    content: (
      <div className="space-y-4 text-sm text-gray-800">
        <div className="border border-gray-200 rounded-lg p-3">
          <h4 className="font-bold text-purple-700 mb-1">Dravet Sendromu</h4>
          <ul className="list-disc pl-5 text-xs space-y-1">
            <li>
              Hayatın <strong>ilk yılında</strong> uzamış febril/afebril
              nöbetler.
            </li>
            <li>1-4 yaş arası farklı nöbet tiplerinin eklenmesi.</li>
            <li>
              <strong>SCN1A</strong> sodyum kanal mutasyonu.
            </li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-3">
          <h4 className="font-bold text-blue-700 mb-1">
            Otoimmün Epilepsiler (Örn: Anti-NMDAR)
          </h4>
          <ul className="list-disc pl-5 text-xs space-y-1">
            <li>
              Nöbetle birlikte bilinç, <strong>davranış değişikliği</strong>,
              istemsiz hareketler.
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-bold text-orange-700 mb-1">FIRES</h4>
            <p className="text-xs">
              Febril enfeksiyon sonrası refrakter status epileptikus.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-bold text-orange-700 mb-1">GEFS+</h4>
            <p className="text-xs">
              6 aydan küçük/5 yaştan büyükte devam eden febril nöbetler + aile
              öyküsü.
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

// --- ÇALIŞMA SORULARI ---
const quizSorulari: QuizSoru[] = [
  {
    soru: "11 aylık bir bebek ilk kez 5 dakika süren, jeneralize özellikli bir febril nöbet geçiriyor. Hib ve Pnömokok aşılarının yapılmadığı öğreniliyor. Yaklaşımda hangisi en doğrudur?",
    secenekler: [
      "Sadece ateş düşürücü verip eve yollamak",
      "Lomber ponksiyon (LP) yapmak",
      "Rutin EEG ve Kranial MR çekmek",
      "Koruyucu amaçlı günlük fenobarbital başlamak",
    ],
    cevap: 1,
    aciklama:
      "Aşıları eksik/bilinmeyen 6-12 ay arası bebeklerde meningeal bulgular belirgin olmayabileceği için santral sinir sistemi enfeksiyonunu dışlamak amacıyla LP yapılması önerilir.",
  },
  {
    soru: "Aşağıdakilerden hangisi 'Komplike Febril Nöbet' kriterlerinden biridir?",
    secenekler: [
      "Nöbetin 5 dakika sürmesi",
      "Nöbetin jeneralize karakterde olması",
      "24 saat içinde nöbetin tekrar etmesi",
      "Post-iktal dönemde hastanın hemen uyanması",
    ],
    cevap: 2,
    aciklama:
      "Fokal başlangıç, 15 dakikadan uzun sürmesi veya 24 saat içinde tekrar etmesi komplike febril nöbet kriterleridir.",
  },
  {
    soru: "Acil servise getirildiğinde aktif olarak jeneralize nöbet geçirmeye devam eden 18 aylık bir çocuğa damar yolu açıldıktan sonra ilk aşamada verilmesi gereken antiepileptik ilaç ve dozu hangisidir?",
    secenekler: [
      "Fenobarbital 20 mg/kg IV",
      "Diazepam 0.15-0.2 mg/kg IV",
      "Fenitoin 20 mg/kg IV",
      "Kalsiyum Glukonat 1 ml/kg IV",
    ],
    cevap: 1,
    aciklama:
      "Çocuklarda (yenidoğan hariç) aktif nöbeti durdurmak için ilk seçenek IV Diazepam (0.15-0.2 mg/kg) veya diğer benzodiazepinlerdir.",
  },
  {
    soru: "On aylık bir bebek acil servise ATEŞSİZ nöbet nedeniyle getiriliyor. Muayenesinde el bileklerinin geniş olduğu, karnının bombeliği ve karaciğerinin büyük olduğu saptanıyor. Nöbetin en olası primer nedeni hangisi olabilir?",
    secenekler: [
      "Raşitizme sekonder Hipokalsemi",
      "Febril Konvülsiyon",
      "Tüberoskleroz Kompleksi",
      "Serebral Palsi",
    ],
    cevap: 0,
    aciklama:
      "El bileklerinde genişleme raşitizm bulgusudur. Raşitizme bağlı şiddetli hipokalsemi akut afebril nöbet nedenidir.",
  },
  {
    soru: "Yenidoğan döneminde nöbetlerin EN SIK görülen nedeni aşağıdakilerden hangisidir?",
    secenekler: [
      "İntrakraniyal Kanamalar",
      "Hipokalsemi",
      "Perinatal Hipoksi (HİE)",
      "Doğumsal Metabolik Hastalıklar",
    ],
    cevap: 2,
    aciklama:
      "Sıklık sırasına göre yenidoğan nöbetlerinin en sık nedeni perinatal hipoksi (HİE) dir.",
  },
];

// --- VAKALAR (Simülasyonlar) ---
const vakaListesi: Vaka[] = [
  {
    id: 1,
    title: "Vaka 1: 11 Aylık Erkek Bebek (Ateşli)",
    desc: "Ateş, boş bakma, kasılma şikayeti ile başvuran süt çocuğu.",
    steps: [
      {
        text: "11 aylık erkek bebek, acile yaklaşık 5 dakika süren boş bakma, el ve kollarda ritmik atımlar nedeniyle ailesi tarafından getirildi. Aile bebeğin ateşinin 38.3°C olduğunu ölçmüş. Eşlik eden kusma, ishal yok. İlk yaklaşımda ne yaparsınız?",
        options: [
          {
            text: "Hemen EEG çekerim ve Valproik asit başlarım.",
            isCorrect: false,
            feedback:
              "Yanlış. Basit febril nöbetlerde akut dönemde rutin EEG önerilmez ve antiepileptik başlanmaz.",
          },
          {
            text: "Öyküyü derinleştirip motor-mental gelişimini, aşı durumunu ve aile öyküsünü sorgularım.",
            isCorrect: true,
            feedback:
              "Doğru! Febril nöbette öncelikle aşılama (S. pneumoniae, Hib), gelişim basamakları ve aile öyküsü sorgulanır.",
          },
        ],
      },
      {
        text: "Öyküden aşılarının tam olduğu, gelişiminin normal olduğu, babasının da küçükken febril nöbet geçirdiği öğrenildi. Hastanın şu an ateşi 38.6°C, uyanık. Ense sertliği yok. Tanınız nedir?",
        options: [
          {
            text: "Komplike Febril Nöbet",
            isCorrect: false,
            feedback:
              "Yanlış. Nöbet 15 dakikadan kısa, jeneralize ve günde 1 kez olduğu için komplike değildir.",
          },
          {
            text: "Basit Febril Nöbet",
            isCorrect: true,
            feedback:
              "Doğru. Kriterleri tam karşılıyor: Süre <15 dk, jeneralize, 24 saatte tek ve ailede öykü var.",
          },
        ],
      },
      {
        text: "Bu hasta için (11 aylık, aşıları tam, menenjit bulgusu yok) Lomber Ponksiyon (LP) planlar mısınız?",
        options: [
          {
            text: "Evet, 12 ay altındaki tüm bebeklere ateşli nöbette kesinlikle LP yapılmalıdır.",
            isCorrect: false,
            feedback:
              "Yanlış. AAP rehberlerine göre aşıları TAM ve genel durumu İYİ olan bebeklerde rutin LP gerekmez.",
          },
          {
            text: "Hayır. Aşıları tam, genel durumu iyi ve menengeal irritasyon bulgusu yok.",
            isCorrect: true,
            feedback: "Doğru. LP endikasyonu yoktur.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Vaka 2: 18 Aylık Ahmet (Aktif Nöbet)",
    desc: "3 gündür ateşli, ağızdan köpük gelme, acilde baygın ve kasılıyor.",
    steps: [
      {
        text: "18 aylık Ahmet, 3 gündür ÜSYE nedeniyle antibiyotik alıyor. Sabah ağzından köpük gelirken bulunmuş. Acile geldiğinde bilinci kapalı ve aktif jeneralize nöbeti devam ediyor. İlk adımınız nedir?",
        options: [
          {
            text: "Detaylı olarak ateşi ne zaman başladı öyküsü alırım.",
            isCorrect: false,
            feedback:
              "Yanlış. Aktif nöbet geçiren hastada ilk iş öykü almak değil, hastayı stabilize etmektir.",
          },
          {
            text: "ABC'yi kontrol eder, damar yolu açar ve kan şekeri bakarım.",
            isCorrect: true,
            feedback:
              "Doğru! Öncelikle hava yolu açılır, oksijen başlanır ve hipoglisemi dışlanır.",
          },
        ],
      },
      {
        text: "Kan şekeri 85 mg/dl geldi. Ancak Ahmet'in nöbeti hala sürüyor. Acil ilaç tercihiniz nedir?",
        options: [
          {
            text: "20 mg/kg IV Fenobarbital",
            isCorrect: false,
            feedback: "Yanlış. Fenobarbital yenidoğan döneminde ilk tercihtir.",
          },
          {
            text: "0.15 - 0.2 mg/kg IV Diazepam",
            isCorrect: true,
            feedback:
              "Doğru! Aktif nöbeti kırmak için ilk basamak IV Diazepam'dır.",
          },
        ],
      },
      {
        text: "Diazepam sonrası nöbet durdu. Ahmet 3 gündür antibiyotik alıyordu. Bu durumda yaklaşımınız ne olur?",
        options: [
          {
            text: "Ateş düşürücü verip taburcu ederim.",
            isCorrect: false,
            feedback:
              "Yanlış. Antibiyotik alıyor olması menenjit tablosunu maskelemiş olabilir.",
          },
          {
            text: "Nöbet öncesi sistemik antibiyotik kullanım öyküsü olduğu için menenjiti dışlamak amacıyla LP yapılmasını düşünürüm.",
            isCorrect: true,
            feedback:
              "Doğru! Antibiyotik kullanımı menengeal bulguları baskılayabileceğinden bu grupta LP yapılması önerilir.",
          },
        ],
      },
    ],
  },
];

// --- BİLEŞENLER ---

const EgitimModulIcerik = ({
  modul,
  onBack,
}: {
  modul: EgitimModulu;
  onBack: () => void;
}) => {
  return (
    <div className="bg-white absolute inset-0 z-20 overflow-y-auto animate-slideIn">
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b px-4 py-3 flex items-center gap-3 z-10 shadow-sm">
        <button
          onClick={onBack}
          className="p-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
        >
          <ArrowLeftIcon />
        </button>
        <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
          {modul.icon} {modul.title}
        </h2>
      </div>
      <div className="p-5 pb-20">{modul.content}</div>
    </div>
  );
};

const QuizComponent = () => {
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<QuizFeedback | null>(null);

  const handleAnswer = (index: number) => {
    const isCorrect = index === quizSorulari[currentQ].cevap;
    if (isCorrect) setScore(score + 1);

    setFeedback({
      isCorrect,
      text: quizSorulari[currentQ].aciklama,
    });
  };

  const nextQuestion = () => {
    setFeedback(null);
    if (currentQ + 1 < quizSorulari.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="text-4xl mb-4">🏆</div>
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          Test Tamamlandı!
        </h2>
        <p className="text-lg mb-6">
          Skorunuz:{" "}
          <span className="font-bold text-blue-600 text-2xl">{score}</span> /{" "}
          {quizSorulari.length}
        </p>
        <button
          onClick={() => {
            setCurrentQ(0);
            setScore(0);
            setShowResult(false);
            setFeedback(null);
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md w-full"
        >
          Testi Tekrar Çöz
        </button>
      </div>
    );
  }

  const q = quizSorulari[currentQ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 pb-2 border-b">
        <span>
          Soru {currentQ + 1} / {quizSorulari.length}
        </span>
        <span className="text-blue-500">Doğru: {score}</span>
      </div>

      <h3 className="text-[15px] font-bold text-gray-800 mb-5 leading-snug">
        {q.soru}
      </h3>

      {!feedback ? (
        <div className="space-y-3">
          {q.secenekler.map((secenek, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm font-medium text-gray-700 shadow-sm"
            >
              <span className="font-bold text-blue-500 mr-2">
                {String.fromCharCode(65 + idx)}.
              </span>{" "}
              {secenek}
            </button>
          ))}
        </div>
      ) : (
        <div className="animate-fadeIn">
          <div
            className={`p-4 rounded-xl mb-5 flex gap-3 ${
              feedback.isCorrect
                ? "bg-green-50 border border-green-200 text-green-900"
                : "bg-red-50 border border-red-200 text-red-900"
            }`}
          >
            <div className="mt-0.5">
              {feedback.isCorrect ? (
                <span className="text-green-500">
                  <CheckIcon />
                </span>
              ) : (
                "❌"
              )}
            </div>
            <div>
              <p className="font-bold mb-1 text-sm">
                {feedback.isCorrect ? "Tebrikler, Doğru!" : "Yanlış Seçim"}
              </p>
              <p className="text-xs leading-relaxed opacity-90">
                {feedback.text}
              </p>
            </div>
          </div>
          <button
            onClick={nextQuestion}
            className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition shadow-md"
          >
            {currentQ + 1 < quizSorulari.length
              ? "Sonraki Soru"
              : "Sonuçları Gör"}
          </button>
        </div>
      )}
    </div>
  );
};

const VakaSimulasyonu = ({
  vaka,
  onBack,
}: {
  vaka: Vaka;
  onBack: () => void;
}) => {
  const [step, setStep] = useState<number | "completed">(0);
  const [feedback, setFeedback] = useState<VakaSecenek | null>(null);

  const handleNextStep = () => {
    setFeedback(null);
    if (typeof step === "number" && step + 1 < vaka.steps.length)
      setStep(step + 1);
    else setStep("completed");
  };

  if (step === "completed") {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6 text-center animate-fadeIn">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Simülasyon Başarılı!
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Bu vakadaki tüm klinik adımları doğru yönettiniz.
        </p>
        <button
          onClick={onBack}
          className="bg-blue-600 text-white w-full py-3 rounded-xl font-bold"
        >
          Vakalara Dön
        </button>
      </div>
    );
  }

  const s = vaka.steps[step as number];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
      <div className="bg-gray-50 border-b px-4 py-3 flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-gray-500 font-bold text-sm flex items-center gap-1 hover:text-gray-800"
        >
          <ArrowLeftIcon /> Çık
        </button>
        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
          Adım {(step as number) + 1}/{vaka.steps.length}
        </span>
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-800 font-medium leading-relaxed mb-6">
          {s.text}
        </p>

        {!feedback ? (
          <div className="space-y-3">
            {s.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setFeedback(opt)}
                className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-sm font-medium text-gray-700 shadow-sm transition"
              >
                {opt.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="animate-fadeIn">
            <div
              className={`p-4 rounded-xl mb-6 ${
                feedback.isCorrect
                  ? "bg-green-50 text-green-900 border border-green-200"
                  : "bg-red-50 text-red-900 border border-red-200"
              }`}
            >
              <p className="font-bold mb-1 flex items-center gap-2">
                {feedback.isCorrect ? (
                  <>
                    <CheckIcon /> Doğru Hamle
                  </>
                ) : (
                  "❌ Hatalı Yaklaşım"
                )}
              </p>
              <p className="text-xs leading-relaxed mt-2 opacity-90">
                {feedback.feedback}
              </p>
            </div>
            <button
              onClick={
                feedback.isCorrect ? handleNextStep : () => setFeedback(null)
              }
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-md transition ${
                feedback.isCorrect
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-800 hover:bg-gray-900"
              }`}
            >
              {feedback.isCorrect ? "Devam Et" : "Tekrar Dene"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- ANA UYGULAMA (APP) ---

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [seciliModul, setSeciliModul] = useState<EgitimModulu | null>(null);
  const [seciliVaka, setSeciliVaka] = useState<Vaka | null>(null);

  // Sayfa başa sarsın
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, seciliModul, seciliVaka]);

  const renderContent = () => {
    if (activeTab === "home") {
      return (
        <div className="space-y-5 animate-fadeIn pb-20">
          <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 scale-150">
              🧠
            </div>
            <h2 className="text-2xl font-black mb-2">
              PDÖ: Nöbet / Bilinç Kaybı
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed opacity-90">
              Hacettepe Üniversitesi Pediatrik Nöroloji Probleme Dayalı Öğrenim
              Föyünden derlenmiş tam kapsamlı eğitim rehberi.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveTab("egitim")}
              className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition text-center flex flex-col items-center justify-center gap-2"
            >
              <div className="bg-blue-50 text-blue-600 p-3 rounded-full">
                <BookIcon />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">
                  Konu Anlatımı
                </h3>
                <p className="text-[10px] text-gray-500">
                  Sınıflama & Algoritma
                </p>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition text-center flex flex-col items-center justify-center gap-2"
            >
              <div className="bg-purple-50 text-purple-600 p-3 rounded-full">
                <HelpIcon />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Test Çöz</h3>
                <p className="text-[10px] text-gray-500">Bilgini Sına</p>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("vakalar")}
              className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition text-center flex flex-col items-center justify-center gap-2 col-span-2"
            >
              <div className="bg-green-50 text-green-600 p-3 rounded-full">
                <ActivityIcon />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">
                  İnteraktif Vakalar
                </h3>
                <p className="text-[10px] text-gray-500">
                  Karar Verme Simülasyonu
                </p>
              </div>
            </button>
          </div>
        </div>
      );
    }

    if (activeTab === "egitim") {
      if (seciliModul)
        return (
          <EgitimModulIcerik
            modul={seciliModul}
            onBack={() => setSeciliModul(null)}
          />
        );

      return (
        <div className="animate-fadeIn pb-20">
          <h2 className="text-xl font-extrabold text-gray-800 mb-4 px-1">
            Eğitim Kütüphanesi
          </h2>
          <div className="space-y-3">
            {egitimModulleri.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setSeciliModul(mod)}
                className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-blue-400 transition flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{mod.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-blue-700 transition">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                      {mod.desc}
                    </p>
                  </div>
                </div>
                <div className="text-gray-300 group-hover:text-blue-500 transition">
                  <ChevronRightIcon />
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === "quiz") {
      return (
        <div className="animate-fadeIn pb-20">
          <h2 className="text-xl font-extrabold text-gray-800 mb-4 px-1">
            Çalışma Soruları
          </h2>
          <QuizComponent />
        </div>
      );
    }

    if (activeTab === "vakalar") {
      if (seciliVaka)
        return (
          <div className="pb-20">
            <VakaSimulasyonu
              vaka={seciliVaka}
              onBack={() => setSeciliVaka(null)}
            />
          </div>
        );

      return (
        <div className="animate-fadeIn pb-20">
          <h2 className="text-xl font-extrabold text-gray-800 mb-2 px-1">
            Klinik Vakalar
          </h2>
          <p className="text-xs text-gray-500 mb-4 px-1">
            Öğrendiklerinizi gerçek vaka senaryoları üzerinde uygulayın.
          </p>
          <div className="space-y-3">
            {vakaListesi.map((vaka) => (
              <button
                key={vaka.id}
                onClick={() => setSeciliVaka(vaka)}
                className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-green-400 transition flex flex-col items-start text-left group"
              >
                <div className="flex justify-between items-start w-full mb-2">
                  <h3 className="font-bold text-gray-800 text-sm group-hover:text-green-700 transition">
                    {vaka.title}
                  </h3>
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Simülasyon
                  </span>
                </div>
                <p className="text-xs text-gray-500">{vaka.desc}</p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex justify-center selection:bg-blue-200">
      <div className="w-full max-w-md bg-gray-50 min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
        {/* Header (Top) */}
        <header className="bg-white px-5 py-4 shadow-sm z-10 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
            P
          </div>
          <h1 className="text-lg font-black text-gray-800 tracking-tight">
            Pediatrik<span className="text-blue-600 font-bold">Nöroloji</span>
          </h1>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 overflow-y-auto relative">
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-between px-6 py-2 pb-safe shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-30">
          <NavButton
            active={activeTab === "home"}
            onClick={() => {
              setActiveTab("home");
              setSeciliModul(null);
              setSeciliVaka(null);
            }}
            icon={<HomeIcon />}
            label="Ana Sayfa"
          />
          <NavButton
            active={activeTab === "egitim"}
            onClick={() => {
              setActiveTab("egitim");
              setSeciliModul(null);
              setSeciliVaka(null);
            }}
            icon={<BookIcon />}
            label="Eğitim"
          />
          <NavButton
            active={activeTab === "quiz"}
            onClick={() => {
              setActiveTab("quiz");
              setSeciliModul(null);
              setSeciliVaka(null);
            }}
            icon={<HelpIcon />}
            label="Sorular"
          />
          <NavButton
            active={activeTab === "vakalar"}
            onClick={() => {
              setActiveTab("vakalar");
              setSeciliModul(null);
              setSeciliVaka(null);
            }}
            icon={<ActivityIcon />}
            label="Vakalar"
          />
        </nav>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .pb-safe { padding-bottom: calc(0.5rem + env(safe-area-inset-bottom)); }
      `,
        }}
      />
    </div>
  );
}

// Navigasyon Buton Bileşeni Tipi ve Tanımı
type NavButtonProps = {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
};

const NavButton = ({ active, onClick, icon, label }: NavButtonProps) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
      active ? "text-blue-600" : "text-gray-400 hover:text-gray-700"
    }`}
  >
    <div
      className={`mb-1 transition-transform duration-300 ${
        active ? "-translate-y-1 scale-110 drop-shadow-md" : ""
      }`}
    >
      {icon}
    </div>
    <span
      className={`text-[9px] font-extrabold tracking-wide uppercase transition-all ${
        active ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
      }`}
    >
      {label}
    </span>
  </button>
);
