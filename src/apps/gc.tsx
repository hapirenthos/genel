React;
import React, { useState } from "react";
import {
  Stethoscope,
  Activity,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Info,
  ChevronRight,
  Image as ImageIcon,
  FolderOpen,
  AlertTriangle,
  BookOpen,
  Layers,
} from "lucide-react";

// --- TYPESCRIPT INTERFACES ---

type ThemeColor = "blue" | "emerald";

interface AlertBox {
  title: string;
  content: string;
}

interface StatsBoxItem {
  label: string;
  value: string;
}

interface StatsBox {
  title: string;
  items: StatsBoxItem[];
}

interface BaseSection {
  id: string;
  title: string;
  imageName: string;
}

interface TextSection extends BaseSection {
  type: "text";
  content: string[];
}
interface ListSection extends BaseSection {
  type: "list";
  content: string[];
}
interface ListGroupedSection extends BaseSection {
  type: "list-grouped";
  content: { groupTitle: string; items: string[] }[];
}
interface ComparisonSection extends BaseSection {
  type: "comparison";
  content: {
    col1: { title: string; items: string[] };
    col2: { title: string; items: string[] };
  };
}
interface StepsSection extends BaseSection {
  type: "steps";
  content: string[];
}
interface ClinicalSection extends BaseSection {
  type: "clinical";
  content: string[];
  specialBox?: { title: string; items: string[] };
}
interface DiagnosticSection extends BaseSection {
  type: "diagnostic";
  content: { method: string; details: string[] }[];
}
interface TreatmentSection extends BaseSection {
  type: "treatment";
  emergency?: boolean;
  content: {
    firstStep: { title: string; subtitle?: string; items: string[] };
    definitive: { title: string; subtitle?: string; items: string[] };
  };
}

type Section =
  | TextSection
  | ListSection
  | ListGroupedSection
  | ComparisonSection
  | StepsSection
  | ClinicalSection
  | DiagnosticSection
  | TreatmentSection;

interface Topic {
  id: string;
  title: string;
  theme: ThemeColor;
  subtitle: string;
  summary: string;
  alertBox: AlertBox;
  statsBox?: StatsBox;
  sections: Section[];
}

interface MedicalData {
  topics: Topic[];
}

// --- DATA MODEL (ZERO DATA LOSS GUARANTEE) ---
const medicalData: MedicalData = {
  topics: [
    {
      id: "mide-volvulusu",
      title: "MİDE VOLVULUSU",
      theme: "blue",
      subtitle:
        "Midenin anormal ekseni etrafında dönmesi sonucu gelişen, akut karın ve obstrüksiyona yol açabilen bir durumdur.",
      summary:
        "Midenin kendi ekseni etrafında dönmesiyle gelişir. En sık diafragmatik herniye bağlıdır. Organoaksiyel tip daha sık görülür. Ani obstrüksiyon, dilatasyon ve iskemiye yol açabilir. Tanıda grafi ve BT önemlidir. Tedavisi acil cerrahidir.",
      alertBox: {
        title: "AKILDA TUT !",
        content:
          "Ani başlayan şiddetli epigastrik ağrı, şiddetli distansiyon ve NG tüpün ilerletilememesi mide volvulusunu düşündürür. Zamanında tanı ve tedavi hayat kurtarıcıdır.",
      },
      sections: [
        {
          id: "mv-1",
          title: "1. TANIM",
          imageName: "mv_1_tanim.jpg",
          type: "text",
          content: [
            "Midenin longitudinal (organoaksiyel) veya transvers (mezenterikoaksiyel) ekseni etrafında 90°'den fazla dönmesidir.",
          ],
        },
        {
          id: "mv-2",
          title: "2. SINIFLANDIRMA",
          imageName: "mv_2_siniflandirma.jpg",
          type: "comparison",
          content: {
            col1: {
              title: "A. ORGANOAKSİYEL (% 59–70 )",
              items: [
                "Tuba mide anteriora ve yukarıya doğru döner.",
                "Küçük kurvatur yukarı, büyük kurvatur aşağı bakar.",
                "Daha sık görülür.",
              ],
            },
            col2: {
              title: "B. MEZENTERİKOAKSİYEL (% 29–44 )",
              items: [
                "Midenin giriş (kardia) ve çıkış (pilor) kısımları anteriora doğru döner.",
                "Büyük kurvatur yukarıya gelir.",
                "Daha nadirdir.",
              ],
            },
          },
        },
        {
          id: "mv-3",
          title: "3. ETİYOLOJİ / RİSK FAKTÖRLERİ",
          imageName: "mv_3_etiyoloji.jpg",
          type: "list-grouped",
          content: [
            {
              groupTitle: "Genel Nedenler",
              items: [
                "Diafragmatik herni (en sık neden)",
                "Gevşek veya yetersiz gastrik ligamentler",
                "Diyafram felci",
                "Travma",
                "Nöromüsküler hastalıklar",
                "Splenomegali",
                "Gebelik",
                "Yaşlılık",
              ],
            },
            {
              groupTitle: "Anatomik Faktörler",
              items: [
                "Gastrosplenik ligamentin zayıflığı",
                "Gastrohepatik ligamentin zayıflığı",
                "Frenogastrik ligamentin yokluğu/gevşekliği",
              ],
            },
          ],
        },
        {
          id: "mv-4",
          title: "4. PATOFİZYOLOJİ",
          imageName: "mv_4_patofizyoloji.jpg",
          type: "steps",
          content: [
            "Mide dönmesi",
            "Giriş ve/veya çıkış obstrüksiyonu",
            "Gastrik dilatasyon, venöz konjesyon",
            "İskemi → Nekroz → Perforasyon riski",
          ],
        },
        {
          id: "mv-5",
          title: "5. KLİNİK BULGULAR",
          imageName: "mv_5_klinik.jpg",
          type: "clinical",
          content: [
            "Ani başlayan epigastrik ağrı",
            "Şiddetli bulantı ve kusma (kusma genellikle kanlı olabilir)",
            "Şiddetli abdominal distansiyon",
            "Huzursuzluk, taşikardi, hipotansiyon",
            "İleri olgularda şok, perforasyon bulguları",
          ],
          specialBox: {
            title: "BORCHARD TRİADI",
            items: [
              "Şiddetli epigastrik ağrı",
              "Şiddetli distansiyon",
              "Başarısız nazogastrik tüp girişimi",
            ],
          },
        },
        {
          id: "mv-6",
          title: "6. TANI",
          imageName: "mv_6_tani.jpg",
          type: "diagnostic",
          content: [
            {
              method: "A. DÜZ GRAFİ",
              details: [
                "Mide içinde büyük hava-sıvı seviyesi (Retro kardiyak hava-sıvı seviyesi)",
              ],
            },
            {
              method: "B. BT (ALTIN STANDART)",
              details: [
                "Midenin dönmüş olduğu, giriş ve çıkışın yer değiştirdiği görülür. (Torsiyone mide)",
              ],
            },
            {
              method: "C. Üst GİS Endoskopi",
              details: [
                "Hem tanısal hem de dekompresyon sağlayabilir. (Perforasyon şüphesinde dikkatli yapılmalıdır.)",
              ],
            },
          ],
        },
        {
          id: "mv-7",
          title: "7. TEDAVİ",
          imageName: "mv_7_tedavi.jpg",
          type: "treatment",
          emergency: true,
          content: {
            firstStep: {
              title: "İLK YAKLAŞIM",
              items: [
                "Resüsitasyon (IV sıvı, NG tüp ile dekompresyon)",
                "Geniş spektrumlu antibiyotik",
                "Elektrolit ve asit-baz dengesinin düzeltilmesi",
              ],
            },
            definitive: {
              title: "KESİN TEDAVİ: CERRAHİ",
              items: [
                "Volvulusun redüksiyonu",
                "Nekrotik mide varsa rezeksiyon",
                "Fiksasyon (gastropeksi)",
                "Altta yatan nedenin düzeltilmesi (örn. herni onarımı)",
              ],
            },
          },
        },
        {
          id: "mv-8",
          title: "8. KOMPLİKASYONLAR",
          imageName: "mv_8_komplikasyonlar.jpg",
          type: "list",
          content: [
            "Mide nekrozu",
            "Perforasyon",
            "Hemoraji",
            "Şok",
            "Çoklu organ yetmezliği",
            "Ölüm (gecikmiş olgularda)",
          ],
        },
      ],
    },
    {
      id: "wilkie-sendromu",
      title: "WILKIE SENDROMU",
      theme: "emerald",
      subtitle:
        "(SÜPERİOR MEZENTERİK ARTER SENDROMU) Duodenumun 3. kısmının (transvers parça) aort ile superior mezenterik arter (SMA) arasında sıkışması sonucu gelişen, mekanik ince bağırsak obstrüksiyonudur.",
      summary:
        "Duodenum 3. kısmı, aort ile SMA arasında sıkışır. Aorto-mezenterik açı < 22° ve interaortik mesafe < 8-10 mm. En sık neden: yağ dokusunun azalması (kilo kaybı). Tanı: Üst GİS grafisi + BT anjiyografi. Tedavi: Önce konservatif (kilo aldırma), başarısızsa cerrahi (duodenojejunostomi).",
      alertBox: {
        title: "AKILDA TUT !",
        content:
          "Zayıf genç hastada postprandiyal kusma ve kilo kaybı varsa WILKIE SENDROMU düşün! Tanı için BT anjiyografi önemlidir.",
      },
      statsBox: {
        title: "NORMAL DEĞERLER",
        items: [
          { label: "Aorto-mezenterik açı", value: "38° – 65°" },
          { label: "İnteraortik mesafe", value: "10 – 28 mm" },
        ],
      },
      sections: [
        {
          id: "ws-1",
          title: "1. ANATOMİ",
          imageName: "ws_1_anatomi.jpg",
          type: "text",
          content: [
            "İlgili yapılar: Aort, SMA, Duodenum 3. kısmı.",
            "İnteraortik mesafe normalde 10-28 mm'dir.",
            "Normalde aort ile SMA arasındaki açı 38°-65°'dir ve duodenum rahatça geçer.",
          ],
        },
        {
          id: "ws-2",
          title: "2. PATOFİZYOLOJİ",
          imageName: "ws_2_patofizyoloji.jpg",
          type: "steps",
          content: [
            "Kilo kaybı veya yağ dokusunun azalması",
            "Mezenterik yağ yastıkçığının incelmesi",
            "Aorto-mezenterik açının daralması (< 22°) veya interaortik mesafenin azalması (< 8-10 mm)",
            "Duodenum 3. kısmının sıkışması",
            "Obstrüksiyon",
          ],
        },
        {
          id: "ws-3",
          title: "3. RİSK FAKTÖRLERİ",
          imageName: "ws_3_risk_faktorleri.jpg",
          type: "list",
          content: [
            "Hızlı kilo kaybı (kronik hastalıklar, malignite, psikiyatrik hastalıklar - anoreksiya nervoza vb.)",
            "Uzun süre yatak istirahati",
            "Kastedici zayıflık",
            "Travma / cerrahi sonrası",
            "Yanıklar",
            "Gebelik sonrası aşırı kilo kaybı",
          ],
        },
        {
          id: "ws-4",
          title: "4. KLİNİK BULGULAR",
          imageName: "ws_4_klinik.jpg",
          type: "list",
          content: [
            "Postprandiyal epigastrik ağrı ve dolgunluk",
            "Bulantı, kusma (genellikle postprandiyal) - kusma hastayı rahatlatır",
            "Erken doyma",
            "Şişkinlik",
            "Kilo kaybı",
            "Kronik olgularda malnütrisyon bulguları",
          ],
        },
        {
          id: "ws-5",
          title: "5. TANI",
          imageName: "ws_5_tani.jpg",
          type: "diagnostic",
          content: [
            {
              method: "A. ÜST GİS GRAFİSİ",
              details: [
                "Duodenum 1. ve 2. kısmının genişlemesi, 3. kısmın ani daralma ile sonlanması.",
              ],
            },
            {
              method: "B. BT ANJİYOGRAFİ (ALTIN STANDART)",
              details: [
                "Aorto-mezenterik açı < 22°",
                "İnteraortik mesafe < 8-10 mm",
                "Duodenum 3. kısmında kompresyon",
              ],
            },
          ],
        },
        {
          id: "ws-6",
          title: "6. TEDAVİ",
          imageName: "ws_6_tedavi.jpg",
          type: "treatment",
          emergency: false,
          content: {
            firstStep: {
              title: "A. KONSERVATİF TEDAVİ (İLK ADIM)",
              subtitle: "Başarılı olguların çoğunda semptomlar geriler.",
              items: [
                "Kilo aldırma (mezenterik yağ dokusunu artırmak)",
                "Oral beslenmeden kaçınma",
                "Nazogastrik tüp ile dekompresyon",
                "Sıvı-elektrolit desteği",
                "Prokinetik ilaçlar",
              ],
            },
            definitive: {
              title: "B. CERRAHİ TEDAVİ",
              subtitle: "(KONSERVATİF TEDAVİ BAŞARISIZSA)",
              items: [
                "Duodenojejunostomi (tercih edilen yöntem): duodenum 3. kısmının distalindeki jejunuma anastomoz yapılır ve obstrüksiyon bypass edilir.",
                "Strong prosedürü (nadiren): Treitz ligamanının kesilmesiyle SMA'nın duodenuma olan kompresyonu azaltılır.",
              ],
            },
          },
        },
        {
          id: "ws-7",
          title: "7. KOMPLİKASYONLAR",
          imageName: "ws_7_komplikasyonlar.jpg",
          type: "list",
          content: [
            "Ciddi malnütrisyon",
            "Elektrolit bozuklukları",
            "Aspirasyon pnömonisi",
            "Perforasyon (uzamış obstrüksiyonda)",
            "İntestinal iskemi (nadir)",
          ],
        },
      ],
    },
  ],
};

// --- COMPONENTS ---

const ThemeConfig: Record<ThemeColor, any> = {
  blue: {
    primary: "bg-blue-600",
    light: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-200",
    hover: "hover:bg-blue-100",
    activeTab: "border-blue-600 text-blue-700 bg-blue-50",
  },
  emerald: {
    primary: "bg-emerald-600",
    light: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
    hover: "hover:bg-emerald-100",
    activeTab: "border-emerald-600 text-emerald-700 bg-emerald-50",
  },
};

interface ImagePlaceholderProps {
  imageName: string;
  themeColor: ThemeColor;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  imageName,
  themeColor,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const imagePath = `/images/${imageName}`;

  if (!hasError) {
    return (
      <div className="w-full mb-6 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white flex justify-center">
        <img
          src={imagePath}
          alt={`Bölüm Görseli - ${imageName}`}
          className="max-w-full h-auto object-contain max-h-[400px]"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-full mb-6 rounded-xl border-2 border-dashed p-8 flex flex-col items-center justify-center text-center bg-slate-50 border-slate-300">
      <div
        className={`p-4 rounded-full mb-4 ${
          themeColor === "blue"
            ? "bg-blue-100 text-blue-500"
            : "bg-emerald-100 text-emerald-500"
        }`}
      >
        <ImageIcon size={32} />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-2">
        Görsel Bekleniyor
      </h3>
      <p className="text-sm text-slate-500 max-w-md">
        Projenizde{" "}
        <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700">
          public/images/
        </code>{" "}
        klasörü içine kırptığınız görseli{" "}
        <strong className="text-slate-800">{imageName}</strong> adıyla
        kaydettiğinizde burada otomatik olarak görünecektir.
      </p>
    </div>
  );
};

interface ContentRendererProps {
  section: Section;
  theme: ThemeColor;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({
  section,
  theme,
}) => {
  const colors = ThemeConfig[theme];

  switch (section.type) {
    case "text":
      return (
        <div className="space-y-3">
          {section.content.map((text, i) => (
            <p
              key={i}
              className="text-slate-700 leading-relaxed flex items-start"
            >
              <ChevronRight
                className={`min-w-5 h-5 mt-0.5 mr-2 ${colors.text}`}
              />
              <span>{text}</span>
            </p>
          ))}
        </div>
      );

    case "list":
      return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {section.content.map((item, i) => (
            <li
              key={i}
              className={`flex items-start p-3 rounded-lg ${colors.light} border ${colors.border}`}
            >
              <CheckCircle2
                className={`min-w-5 h-5 mr-3 mt-0.5 ${colors.text}`}
              />
              <span className="text-slate-800 text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "list-grouped":
      return (
        <div className="space-y-6">
          {section.content.map((group, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <div
                className={`${colors.light} px-4 py-2 border-b border-slate-200 font-semibold text-slate-800`}
              >
                {group.groupTitle}
              </div>
              <ul className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                {group.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start text-sm text-slate-700"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-2 mr-2 ${colors.primary}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "comparison":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[section.content.col1, section.content.col2].map((col, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
            >
              <h4 className={`font-bold mb-4 flex items-center ${colors.text}`}>
                <Layers className="w-5 h-5 mr-2" />
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.items.map((item, j) => (
                  <li key={j} className="flex text-sm text-slate-700">
                    <span className="mr-2 text-slate-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "steps":
      return (
        <div className="relative py-4">
          <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-slate-200" />
          <div className="space-y-6">
            {section.content.map((step, i) => (
              <div key={i} className="relative flex items-start group">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-colors ${
                    i === section.content.length - 1
                      ? "bg-red-500 text-white"
                      : colors.light + " " + colors.text
                  }`}
                >
                  {i === section.content.length - 1 ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    i + 1
                  )}
                </div>
                <div className="ml-4 flex-1 pt-2">
                  <div
                    className={`p-4 rounded-lg border bg-white shadow-sm transition-shadow group-hover:shadow-md ${
                      i === section.content.length - 1
                        ? "border-red-200 bg-red-50"
                        : "border-slate-200"
                    }`}
                  >
                    <p
                      className={`font-medium ${
                        i === section.content.length - 1
                          ? "text-red-700"
                          : "text-slate-800"
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "clinical":
      return (
        <div className="space-y-6">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {section.content.map((item, i) => (
              <li
                key={i}
                className="flex items-start p-3 bg-white rounded-lg border border-slate-200 shadow-sm"
              >
                <Activity
                  className={`min-w-5 h-5 mr-3 mt-0.5 ${colors.text}`}
                />
                <span className="text-slate-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>

          {section.specialBox && (
            <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl">
              <h4 className="font-bold text-amber-800 mb-3 flex items-center">
                <Stethoscope className="w-5 h-5 mr-2" />
                {section.specialBox.title}
              </h4>
              <ul className="space-y-2">
                {section.specialBox.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-amber-900 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2 text-amber-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );

    case "diagnostic":
      return (
        <div className="space-y-4">
          {section.content.map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
            >
              <h4
                className={`font-bold mb-2 ${
                  item.method.includes("ALTIN") ? "text-amber-600" : colors.text
                }`}
              >
                {item.method}
              </h4>
              <ul className="space-y-1">
                {item.details.map((detail, j) => (
                  <li
                    key={j}
                    className="text-sm text-slate-700 flex items-start"
                  >
                    <span className="mr-2 text-slate-400 mt-0.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "treatment":
      return (
        <div className="space-y-6">
          {section.emergency && (
            <div className="bg-red-600 text-white p-3 rounded-lg text-center font-bold animate-pulse shadow-md">
              ACİL DURUMDUR!
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className={`p-6 rounded-xl border-2 border-dashed ${colors.border} bg-white`}
            >
              <h4 className={`font-bold mb-1 ${colors.text}`}>
                {section.content.firstStep.title}
              </h4>
              {section.content.firstStep.subtitle && (
                <p className="text-xs text-slate-500 mb-4 italic">
                  {section.content.firstStep.subtitle}
                </p>
              )}
              <ul className="space-y-3 mt-4">
                {section.content.firstStep.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex text-sm text-slate-700 items-start"
                  >
                    <ArrowRight
                      className={`min-w-4 h-4 mr-2 mt-0.5 ${colors.text}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`p-6 rounded-xl bg-gradient-to-br from-white to-slate-50 border shadow-sm ${colors.border}`}
            >
              <h4 className="font-bold mb-1 text-slate-800">
                {section.content.definitive.title}
              </h4>
              {section.content.definitive.subtitle && (
                <p className="text-xs text-slate-500 mb-4 italic">
                  {section.content.definitive.subtitle}
                </p>
              )}
              <ul className="space-y-3 mt-4">
                {section.content.definitive.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex text-sm text-slate-800 font-medium items-start"
                  >
                    <CheckCircle2 className="min-w-4 h-4 mr-2 mt-0.5 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );

    default:
      return <div>Bilinmeyen içerik tipi</div>;
  }
};

const ImageGuideModal: React.FC = () => (
  <div className="bg-slate-800 text-slate-100 p-6 rounded-xl shadow-xl mt-6">
    <div className="flex items-center mb-4 text-amber-400">
      <FolderOpen className="w-6 h-6 mr-3" />
      <h3 className="text-lg font-bold">
        Geliştirici Rehberi: Görselleri Ekleme
      </h3>
    </div>
    <p className="text-sm text-slate-300 mb-4">
      Kırptığınız fotoğrafları uygulamada göstermek için projenizin ana
      dizinindeki <code className="bg-slate-700 px-2 py-1 rounded">public</code>{" "}
      klasörü altına{" "}
      <code className="bg-slate-700 px-2 py-1 rounded">images</code> adında bir
      klasör açın ve dosyaları aşağıdaki isimlerle oraya kopyalayın:
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
      <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
        <h4 className="text-blue-400 font-bold mb-2 uppercase tracking-wider">
          Mide Volvulusu
        </h4>
        <ul className="space-y-1 text-slate-400">
          <li>mv_1_tanim.jpg</li>
          <li>mv_2_siniflandirma.jpg</li>
          <li>mv_3_etiyoloji.jpg</li>
          <li>mv_4_patofizyoloji.jpg</li>
          <li>mv_5_klinik.jpg</li>
          <li>mv_6_tani.jpg</li>
          <li>mv_7_tedavi.jpg</li>
          <li>mv_8_komplikasyonlar.jpg</li>
        </ul>
      </div>
      <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
        <h4 className="text-emerald-400 font-bold mb-2 uppercase tracking-wider">
          Wilkie Sendromu
        </h4>
        <ul className="space-y-1 text-slate-400">
          <li>ws_1_anatomi.jpg</li>
          <li>ws_2_patofizyoloji.jpg</li>
          <li>ws_3_risk_faktorleri.jpg</li>
          <li>ws_4_klinik.jpg</li>
          <li>ws_5_tani.jpg</li>
          <li>ws_6_tedavi.jpg</li>
          <li>ws_7_komplikasyonlar.jpg</li>
        </ul>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState<string>(
    medicalData.topics[0].id
  );
  const [activeSectionIds, setActiveSectionIds] = useState<
    Record<string, string>
  >({});
  const [showGuide, setShowGuide] = useState<boolean>(false);

  const activeTopic =
    medicalData.topics.find((t) => t.id === activeTopicId) ||
    medicalData.topics[0];
  const theme = ThemeConfig[activeTopic.theme];

  const currentSectionId =
    activeSectionIds[activeTopicId] || activeTopic.sections[0].id;
  const currentSection =
    activeTopic.sections.find((s) => s.id === currentSectionId) ||
    activeTopic.sections[0];

  const handleTopicChange = (id: string) => {
    setActiveTopicId(id);
  };

  const handleSectionChange = (sectionId: string) => {
    setActiveSectionIds((prev) => ({
      ...prev,
      [activeTopicId]: sectionId,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-20 shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-gradient-to-br from-blue-500 to-emerald-500 p-2 rounded-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              DoctoApp
            </h1>
          </div>
          <p className="text-slate-400 text-sm">
            Gastrointestinal Sistem Acilleri
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 mt-2 px-2">
            Konular
          </div>
          {medicalData.topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicChange(topic.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                activeTopicId === topic.id
                  ? `${ThemeConfig[topic.theme].primary} text-white shadow-lg`
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span className="font-semibold">{topic.title}</span>
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  activeTopicId === topic.id
                    ? "translate-x-1"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </button>
          ))}

          <div className="mt-8 pt-8 border-t border-slate-800">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="w-full text-left px-4 py-3 rounded-xl transition-all flex items-center text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <FolderOpen className="w-5 h-5 mr-3" />
              <span className="font-medium text-sm">Görsel Rehberini Gör</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-screen overflow-y-auto flex flex-col bg-slate-50">
        {/* HEADER / HERO */}
        <header
          className={`${theme.primary} text-white px-8 py-10 shadow-md relative overflow-hidden shrink-0`}
        >
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
            <BookOpen size={240} />
          </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              {activeTopic.title}
            </h2>
            <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-3xl font-medium">
              {activeTopic.subtitle}
            </p>
          </div>
        </header>

        {/* CONTENT TABS & BODY */}
        <div className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8">
          {showGuide && <ImageGuideModal />}

          {/* Alert Box (AKILDA TUT) */}
          <div className="mb-8 bg-gradient-to-r from-amber-100 to-yellow-50 border border-amber-200 rounded-2xl p-6 shadow-sm flex items-start">
            <div className="bg-amber-500 rounded-full p-2 mr-4 shrink-0 shadow-sm">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-amber-800 font-bold text-lg mb-1">
                {activeTopic.alertBox.title}
              </h3>
              <p className="text-amber-900 font-medium leading-relaxed">
                {activeTopic.alertBox.content}
              </p>
            </div>
          </div>

          {/* Stats Box (If exists, e.g., Wilkie Normal Values) */}
          {activeTopic.statsBox && (
            <div className="mb-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-4 flex items-center border-b pb-2">
                <Activity className="w-4 h-4 mr-2 text-slate-400" />
                {activeTopic.statsBox.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeTopic.statsBox.items.map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-slate-50 p-3 rounded-lg"
                  >
                    <span className="text-slate-600 text-sm">{stat.label}</span>
                    <span className="font-bold text-slate-800 bg-white px-3 py-1 rounded shadow-sm text-sm">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTIONS TABS NAVIGATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-100 bg-slate-50">
              {activeTopic.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`px-5 py-4 text-sm font-bold whitespace-nowrap transition-colors border-b-2 flex items-center ${
                    currentSectionId === section.id
                      ? theme.activeTab
                      : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>

            {/* ACTIVE SECTION CONTENT */}
            <div className="p-6 md:p-8 bg-white">
              {/* Image Placeholder specific to this section */}
              <ImagePlaceholder
                imageName={currentSection.imageName}
                themeColor={activeTopic.theme}
              />

              {/* Title & Badge */}
              <div className="flex items-center mb-6">
                <div className={`w-2 h-8 rounded mr-4 ${theme.primary}`}></div>
                <h3 className="text-2xl font-bold text-slate-800">
                  {currentSection.title}
                </h3>
              </div>

              {/* Render Section Content dynamically */}
              <ContentRenderer
                section={currentSection}
                theme={activeTopic.theme}
              />
            </div>
          </div>

          {/* SUMMARY FOOTER */}
          <div className="bg-slate-800 rounded-2xl p-6 text-white shadow-lg mb-8 flex items-start">
            <Info className="w-8 h-8 text-blue-400 mr-4 shrink-0 mt-1" />
            <div>
              <h4 className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
                ÖZET
              </h4>
              <p className="text-slate-100 leading-relaxed font-medium">
                {activeTopic.summary}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* CSS for hiding scrollbar in tabs but keeping functionality */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </div>
  );
};

export default App;
