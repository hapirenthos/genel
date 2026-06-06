import React, { useState } from "react";
import {
  RefreshCw,
  AlertCircle,
  Info,
  CheckCircle,
  ArrowRight,
  ActivitySquare,
  Brain,
  Thermometer,
  Droplet,
  Stethoscope,
  Syringe,
  Skull,
} from "lucide-react";

// --- TypeScript Arayüzleri (Hataları gidermek için tipler) ---
interface Option {
  label: string;
  next: string;
  value: string;
  icon?: React.ReactNode;
  note?: string;
}

interface Step {
  question: string;
  description?: string;
  type?: string;
  options: Option[];
}

interface Result {
  title: string;
  drug: string;
  targets: string[];
  logic: string;
  whyNot: string;
  tip: string;
}

const AnaerobeAwareAlgorithm: React.FC = () => {
  const [history, setHistory] = useState<string[]>(["start"]);
  const [answers, setAnswers] = useState<Record<string, Option>>({});

  // --- SORU VE YOL VERİTABANI ---
  const steps: Record<string, Step> = {
    start: {
      question: "Klinik tabloyu ve enfeksiyonun doğasını nasıl tanımlarsınız?",
      description:
        "Hastanın geliş şikayeti, enfeksiyonun kaynağı ve ciddiyeti?",
      options: [
        {
          label: "Ağır Sepsis / Şok (Odak Belirsiz/Batın)",
          next: "sepsis_esbl",
          value: "sepsis",
          icon: <ActivitySquare className="w-5 h-5" />,
        },
        {
          label: "SSS / Menenjit / Beyin Apsesi",
          next: "meningitis_type",
          value: "meningitis",
          icon: <Brain className="w-5 h-5" />,
        },
        {
          label: "Pnömoni / Akciğer Apsesi",
          next: "pneu_context",
          value: "pneumonia",
          icon: <Stethoscope className="w-5 h-5" />,
        },
        {
          label: "Üriner Sistem",
          next: "uti_context",
          value: "uti",
          icon: <Droplet className="w-5 h-5" />,
        },
        {
          label: "Deri / Yumuşak Doku / Diyabetik Ayak",
          next: "skin_type",
          value: "skin",
          icon: <Thermometer className="w-5 h-5" />,
        },
      ],
    },

    // --- SEPSİS YOLU ---
    sepsis_esbl: {
      question: "Adım 1: ESBL / Çoklu Dirençli G(-) Riski Var mı?",
      description:
        "Son 90 günde antibiyotik kullanımı, hastane yatışı, kolonizasyon?",
      type: "risk",
      options: [
        {
          label: "Evet, Yüksek Risk",
          next: "sepsis_anaerobe",
          value: "yes",
          note: "Karbapenem ihtiyacı.",
        },
        {
          label: "Hayır, Standart Sepsis",
          next: "sepsis_anaerobe",
          value: "no",
          note: "Beta-laktam koruyucu yaklaşım.",
        },
      ],
    },
    sepsis_anaerobe: {
      question: "Adım 2: Anaerobik Odak Şüphesi Var mı?",
      description:
        "Batın içi patoloji, safra yolu, perforasyon şüphesi, kötü koku, diyabetik ayak?",
      type: "risk",
      options: [
        {
          label: "Evet (Batın/GİS/Apse)",
          next: "sepsis_mrsa",
          value: "yes",
          note: "Mutlaka anaerob kapsamalıyız.",
        },
        {
          label: "Hayır (Üriner/Akciğer vb.)",
          next: "sepsis_mrsa",
          value: "no",
          note: "Standart kapsam yeterli.",
        },
      ],
    },
    sepsis_mrsa: {
      question: "Adım 3: MRSA Riski Var mı?",
      description: "Santral kateter, hemodiyaliz, cilt enfeksiyonu öyküsü?",
      type: "risk",
      options: [
        { label: "Evet, MRSA Riski Var", next: "result_sepsis", value: "yes" },
        { label: "Hayır", next: "result_sepsis", value: "no" },
      ],
    },

    // --- MENENJİT / BEYİN APSESİ ---
    meningitis_type: {
      question: "Santral Sinir Sistemi Tablosu?",
      options: [
        {
          label: "Klasik Menenjit (Ateş, Ense Sertliği)",
          next: "meningitis_scenario",
          value: "meningitis",
        },
        {
          label: "Beyin Apsesi Şüphesi (Fokal Nörolojik Defisit)",
          next: "result_brain_abscess",
          value: "abscess",
          note: "Genelde KBB kaynaklı yayılım.",
        },
      ],
    },
    meningitis_scenario: {
      question: "Gelişim Senaryosu?",
      options: [
        {
          label: "Toplum Kökenli (Spontan)",
          next: "meningitis_age",
          value: "community",
        },
        {
          label: "Nozokomiyal / Post-Op / Şant",
          next: "result_meningitis_postop",
          value: "nosocomial",
        },
      ],
    },
    meningitis_age: {
      question: "Hasta Yaşı ve İmmün Durumu?",
      options: [
        {
          label: "Erişkin (<50 yaş, sağlıklı)",
          next: "result_meningitis_adult",
          value: "std_adult",
        },
        {
          label: "İleri Yaş (≥50) veya İmmünsüprese",
          next: "result_meningitis_risk",
          value: "risk_adult",
        },
      ],
    },

    // --- PNÖMONİ / AKCİĞER APSESİ ---
    pneu_context: {
      question: "Pnömoni Tipi ve Apse Şüphesi?",
      description: "Radyolojide kavitasyon var mı? Kötü kokulu balgam var mı?",
      options: [
        {
          label: "Akciğer Apsesi / Nekrotizan Pnömoni",
          next: "result_lung_abscess",
          value: "abscess",
          note: "Uzun süreli tedavi gerekir.",
        },
        {
          label: "Aspirasyon Pnömonisi",
          next: "result_aspiration",
          value: "aspiration",
          note: "Anaerob riski yüksek.",
        },
        { label: "Toplum Kökenli (TKP)", next: "pneu_cap_risk", value: "cap" },
        {
          label: "Hastane Kökenli (HAP/VAP)",
          next: "result_hap",
          value: "hap",
        },
      ],
    },
    pneu_cap_risk: {
      question: "Komorbidite (KOAH, Diyabet, Böbrek)?",
      options: [
        { label: "Evet (Riskli)", next: "result_cap_comorbid", value: "yes" },
        { label: "Hayır (Sağlıklı)", next: "result_cap_healthy", value: "no" },
      ],
    },

    // --- İYE ---
    uti_context: {
      question: "İYE Klinik Durumu?",
      options: [
        { label: "Basit Sistit", next: "result_uti_simple", value: "simple" },
        { label: "Pyelonefrit", next: "result_uti_pyelo", value: "pyelo" },
        { label: "Sondalı (CAUTI)", next: "result_uti_cauti", value: "cauti" },
        {
          label: "Renal Apse / Karbunkül Şüphesi",
          next: "result_uti_abscess",
          value: "abscess",
          note: "Dirençli ateş, flank ağrısı.",
        },
      ],
    },

    // --- DERİ ---
    skin_type: {
      question: "Enfeksiyonun Karakteri?",
      options: [
        {
          label: "Nekrotizan Fasiit (Gazlı Gangren)",
          next: "result_necrotizing",
          value: "necrotizing",
          note: "Krepitasyon var, Anaerob!",
        },
        {
          label: "Diyabetik Ayak Enfeksiyonu",
          next: "result_diabetic_foot",
          value: "diabetic",
          note: "Polimikrobiyal + Anaerob",
        },
        {
          label: "Basit Apse / Pürülan",
          next: "result_skin_purulent",
          value: "purulent",
        },
        {
          label: "Sellülit (Püy yok)",
          next: "result_skin_nonpurulent",
          value: "non_purulent",
        },
      ],
    },
  };

  // --- SONUÇ MOTORU ---
  const getResult = (): Result => {
    // --- SEPSİS ---
    if (history.includes("sepsis_mrsa")) {
      const esbl = answers["sepsis_esbl"]?.value === "yes";
      const anaerobeRisk = answers["sepsis_anaerobe"]?.value === "yes";
      const mrsa = answers["sepsis_mrsa"]?.value === "yes";

      let baseDrug = "";
      let drugLogic = "";

      if (esbl) {
        baseDrug = "Meropenem";
        drugLogic = "Yüksek direnç riski nedeniyle Karbapenem seçildi. ";
      } else {
        if (anaerobeRisk) {
          baseDrug = "Piperasilin-Tazobaktam";
          drugLogic =
            "ESBL riski düşük. Anaerob şüphesi (batın/safra) olduğu için Piptazo mükemmel bir tercihtir (tek ilaçla işi çözer). ";
        } else {
          baseDrug = "Piperasilin-Tazobaktam veya [Sefepim]";
          drugLogic = "Standart sepsis protokolü. ";
        }
      }

      let addOn = mrsa ? " + Vankomisin" : "";

      let targets = [];
      if (baseDrug.includes("Meropenem")) {
        targets.push("G(-) Enterikler & Pseudomonas (Meropenem)");
        targets.push("Anaeroblar (Meropenem)");
      } else {
        targets.push("G(-) Enterikler & Pseudomonas (Piptazo)");
        targets.push("Anaeroblar (Piptazo)");
        targets.push("MSSA (Piptazo)");
      }
      if (mrsa) targets.push("MRSA (Vankomisin)");

      return {
        title: `Sepsis Tedavisi ${
          anaerobeRisk ? "(Batın/Anaerob Odaklı)" : ""
        }`,
        drug: baseDrug + addOn,
        targets: targets,
        logic:
          drugLogic +
          (anaerobeRisk
            ? "Seçilen ilaç (Mero/Piptazo) anaerobları doğal olarak kapsadığı için ek Metronidazol gerekmez."
            : ""),
        whyNot:
          "Sefepim veya Seftazidim seçilseydi, anaerobları kapsamadığı için yanına Metronidazol eklemek zorundaydık.",
        tip: "Odak apse ise perkütan veya cerrahi drenaj olmadan antibiyotik tek başına yetersiz kalır.",
      };
    }

    // --- MENENJİT & BEYİN APSESİ ---
    if (answers["meningitis_type"]?.value === "abscess") {
      return {
        title: "Beyin Apsesi",
        drug: "Seftriakson + Metronidazol (+ Vankomisin/Linezolid)",
        targets: [
          "Streptokoklar (Seftriakson)",
          "Oral Anaeroblar (Metronidazol)",
          "S. aureus / MRSA (Vankomisin)",
        ],
        logic:
          "Beyin apseleri genelde diş/sinüzit (Streptokok + Anaerob) kaynaklıdır. Seftriakson beyne iyi geçer ama anaerobları öldürmez, bu yüzden Metronidazol ŞARTTIR.",
        whyNot:
          "Meropenem de bir seçenektir ancak Seftriakson+Metro kombinasyonu klasik ve güçlüdür.",
        tip: "Apse >2.5 cm ise veya kitle etkisi varsa Nöroşirurji drenajı gerekir. Tedavi 6-8 hafta sürer.",
      };
    }
    if (answers["meningitis_scenario"]?.value === "nosocomial") {
      return {
        title: "Nozokomiyal / Post-Op Menenjit",
        drug: "Vankomisin + [Meropenem veya Seftazidim]",
        targets: [
          "MRSA (Vanko)",
          "Pseudomonas (Mero/Seftaz)",
          "G(-) Basiller (Mero/Seftaz)",
        ],
        logic:
          "Cilt ve hastane florası. Karbapenem korumak için Seftazidim (Pseudo etkili) kullanılabilir.",
        whyNot: "Seftriakson Pseudomonas'ı kaçırır.",
        tip: "Şant varsa çekilmelidir.",
      };
    }
    if (answers["meningitis_age"]?.value) {
      const risk = answers["meningitis_age"].value === "risk_adult";
      return {
        title: risk ? "Menenjit (Listeria Riski)" : "Toplum Kökenli Menenjit",
        drug: risk
          ? "Seftriakson + Vankomisin + Ampisilin"
          : "Seftriakson + Vankomisin",
        targets: risk
          ? ["S. pneumo (Seftri+Vanko)", "Listeria (Ampisilin)"]
          : ["S. pneumo (Seftri+Vanko)", "Meningokok (Seftri)"],
        logic:
          "Klasik menenjitte anaerob beklenmez (apse değilse), bu yüzden Metronidazol verilmez.",
        whyNot:
          "Ampisilin sadece immünsüprese/yaşlı hastada Listeria için eklenir.",
        tip: "Steroid tedavisi ilk dozla birlikte verilmelidir.",
      };
    }

    // --- PNÖMONİ / AKCİĞER APSESİ ---
    if (answers["pneu_context"]?.value === "abscess") {
      return {
        title: "Akciğer Apsesi / Nekrotizan Pnömoni",
        drug: "Ampisilin-Sulbaktam (Unasyn) veya [Seftriakson + Klindamisin]",
        targets: [
          "Oral Anaeroblar (Sulbaktam/Klindamisin)",
          "Streptokoklar (Ampisilin/Seftri)",
          "S. aureus (Sulbaktam/Klinda)",
        ],
        logic:
          "Akciğer apsesinin bir numaralı nedeni aspirasyon ve oral anaeroblardır. Tedavi uzun sürmelidir (4-6 hafta).",
        whyNot:
          "Metronidazol akciğer apsesinde tercih EDİLMEZ (Başarısızlık oranı yüksektir). Klindamisin veya Beta-laktam/İnhibitör tercih edilir.",
        tip: "Hızla kavitasyon yapan bakteriler: S. aureus, Klebsiella, Anaeroblar.",
      };
    }
    if (answers["pneu_context"]?.value === "aspiration") {
      return {
        title: "Aspirasyon Pnömonisi",
        drug: "Ampisilin-Sulbaktam veya Moksifloksasin",
        targets: [
          "Anaeroblar (Sulbaktam/Moksi)",
          "Streptokoklar (Ampisilin/Moksi)",
        ],
        logic: "Anaerob kapsama şarttır.",
        whyNot: "Seftriakson tek başına anaerobları kaçırır.",
        tip: "Ağız hijyeni bozuk hastalarda risk yüksektir.",
      };
    }
    if (answers["pneu_context"]?.value === "hap") {
      return {
        title: "Nozokomiyal Pnömoni (HAP)",
        drug: "Piptazo veya [Sefepim/Seftazidim]",
        targets: [
          "Pseudomonas (Piptazo/Sefepim)",
          "Enterikler (Tümü)",
          "Anaeroblar (SADECE Piptazo kapsar)",
        ],
        logic:
          "Eğer Sefepim veya Seftazidim seçerseniz ve aspirasyon/apse şüpheniz varsa yanına Klindamisin eklemelisiniz. Piptazo kendinden anaerob etkilidir.",
        whyNot: "Ertapenem Pseudomonas'a etkisizdir.",
        tip: "MRSA riski varsa Vankomisin ekle.",
      };
    }
    // TKP Logic
    if (history.includes("pneu_cap_risk")) {
      const comorbid = answers["pneu_cap_risk"]?.value === "yes";
      return {
        title: comorbid ? "TKP (Komorbidite Var)" : "TKP (Sağlıklı)",
        drug: comorbid ? "Seftriakson + Makrolid" : "Amoksisilin",
        targets: ["S. pneumoniae", "Atipikler (Makrolid)"],
        logic: "Standart TKP'de rutin anaerob kapsamaya gerek yoktur.",
        whyNot: "Anaerob tedavi sadece aspirasyon şüphesinde verilir.",
        tip: "Kinolonlar alternatif olabilir.",
      };
    }

    // --- DERİ ---
    if (answers["skin_type"]?.value === "necrotizing") {
      return {
        title: "Nekrotizan Fasiit (Gazlı Gangren)",
        drug: "ACİL CERRAHİ + Meropenem + Vankomisin + Klindamisin",
        targets: [
          "Polimikrobiyal G(-) (Meropenem)",
          "Clostridium / Anaeroblar (Meropenem + Klinda)",
          "MRSA (Vanko)",
          "Toksin (Klindamisin)",
        ],
        logic:
          "En ölümcül anaerobik enfeksiyondur. 'Krepitasyon' (deri altında gaz sesi) anaerob işaretidir. Klindamisin toksin sentezini durdurmak için eklenir.",
        whyNot:
          "Sadece ilaç verirsen hasta ölür. Kaynak kontrolü (Cerrahi) asıldır.",
        tip: "LRINEC skoru tanıya yardımcı olabilir.",
      };
    }
    if (answers["skin_type"]?.value === "diabetic") {
      return {
        title: "Diyabetik Ayak Enfeksiyonu",
        drug: "Ampisilin-Sulbaktam veya Piperasilin-Tazobaktam",
        targets: [
          "G(-) Enterikler (Amp/Piptazo)",
          "Anaeroblar (Sulbaktam/Tazobaktam)",
          "G(+) Koklar (Amp/Piptazo)",
        ],
        logic:
          "Diyabetik ayak daima polimikrobiyaldir ve mutlaka ANAEROB içerir. Pis kokuludur.",
        whyNot:
          "Seftriakson veya Siprofloksasin tek başına verilmez (Anaerob açığı kalır).",
        tip: "Osteomiyelit varsa tedavi 6 haftaya uzar. MRSA riski varsa Vanko/Daptomisin ekle.",
      };
    }
    if (answers["skin_type"]?.value === "purulent") {
      return {
        title: "Basit Deri Apsesi",
        drug: "Drenaj (Bıçak) ± TMP-SMX",
        targets: ["S. aureus (MRSA)"],
        logic: "Apse duvarı antibiyotiği geçirmez. Ana tedavi drenajdır.",
        whyNot:
          "Anaerob tedavisine (Metronidazol) genelde gerek yoktur, etken Stafilokoktur.",
        tip: "Apse çevresinde sellülit (kızarıklık) yaygınsa antibiyotik ekle.",
      };
    }

    // --- İYE ---
    if (answers["uti_context"]?.value === "abscess") {
      return {
        title: "Renal Apse / Karbunkül",
        drug: "Meropenem veya Piptazo (+ Drenaj)",
        targets: [
          "E. coli",
          "S. aureus (Hematojen yayılım)",
          "Anaeroblar (Nadir ama kapsanır)",
        ],
        logic:
          "Böbrek apsesi tedaviye dirençli ateş yapar. Antibiyotik penetrasyonu zordur, güçlü ilaç gerekir.",
        whyNot: "Nitrofurantoin dokuya geçmez.",
        tip: "Apse >3-5 cm ise perkütan drenaj gerekir.",
      };
    }
    if (answers["uti_context"]?.value) {
      return {
        title: "Üriner Sistem Enfeksiyonu",
        drug:
          answers["uti_context"].value === "simple"
            ? "Nitrofurantoin / Fosfomisin"
            : "Seftriakson",
        targets: ["E. coli"],
        logic: "Standart İYE'de anaerob beklenmez.",
        whyNot: "Anaerob ilacı (Metronidazol) İYE'de gereksizdir.",
        tip: "Komplike durumlarda kültüre göre git.",
      };
    }

    return {
      title: "Hesaplanıyor...",
      drug: "...",
      logic: "...",
      targets: [],
      whyNot: "...",
      tip: "...",
    };
  };

  const currentStepKey = history[history.length - 1];
  const currentStep = steps[currentStepKey];
  const isFinished = !currentStep;

  const handleSelect = (option: Option) => {
    const newAnswers = { ...answers, [currentStepKey]: option };
    setAnswers(newAnswers);
    if (option.next.startsWith("result")) {
      setHistory([...history, option.next]);
    } else {
      setHistory([...history, option.next]);
    }
  };

  const handleReset = () => {
    setHistory(["start"]);
    setAnswers({});
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      const newAnswers = { ...answers };
      const lastKey = Object.keys(newAnswers).pop();
      if (lastKey) delete newAnswers[lastKey];
      setAnswers(newAnswers);
    }
  };

  if (history[history.length - 1].startsWith("result") || isFinished) {
    const result = getResult();
    const isAnaerobeRelated = result.targets.some(
      (t) =>
        t.toLowerCase().includes("anaerob") ||
        t.toLowerCase().includes("sulbaktam") ||
        t.toLowerCase().includes("metronidazol")
    );

    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200 font-sans mt-10">
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
            Tedavi Protokolü
          </h2>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-sm bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded transition shadow-sm border border-slate-600"
          >
            <RefreshCw className="w-4 h-4" /> Yeni Vaka
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* İLAÇ KARTI */}
          <div className="text-center p-8 bg-slate-50 rounded-xl border-2 border-emerald-500/30 shadow-sm relative overflow-hidden">
            {isAnaerobeRelated && (
              <div className="absolute top-4 right-4 bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded border border-purple-200 flex items-center gap-1">
                <Skull className="w-3 h-3" /> ANAEROB KAPSAM AKTİF
              </div>
            )}
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
              {result.title}
            </h3>
            <div className="text-3xl md:text-5xl font-extrabold text-slate-800 leading-tight flex items-center justify-center gap-3">
              <Syringe className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
              {result.drug}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 shadow-sm">
              <h4 className="flex items-center gap-2 font-bold text-blue-900 mb-4 text-lg border-b border-blue-200 pb-2">
                <ActivitySquare className="w-5 h-5 text-blue-600" />
                Hedeflenen Patojenler
              </h4>
              <ul className="space-y-3">
                {result.targets &&
                  result.targets.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-slate-700 font-medium"
                    >
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          t.toLowerCase().includes("anaerob")
                            ? "bg-purple-500"
                            : "bg-blue-500"
                        }`}
                      ></span>
                      <span className="text-sm md:text-base">{t}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="bg-amber-50/50 p-6 rounded-xl border border-amber-100 shadow-sm">
              <h4 className="flex items-center gap-2 font-bold text-amber-900 mb-4 text-lg border-b border-amber-200 pb-2">
                <Brain className="w-5 h-5 text-amber-600" />
                Klinik Akıl Yürütme
              </h4>
              <p className="text-slate-800 leading-relaxed font-medium">
                "{result.logic}"
              </p>

              <div className="mt-6 p-4 bg-white rounded-lg border border-amber-100">
                <div className="flex gap-2 items-start">
                  <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-rose-700 text-sm block mb-1">
                      Neden/Nasıl?
                    </span>
                    <p className="text-slate-600 text-sm">{result.whyNot}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center p-5 bg-emerald-50 rounded-lg border border-emerald-100 shadow-sm">
            <div className="bg-emerald-100 p-3 rounded-full flex-shrink-0">
              <Info className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <span className="font-bold text-emerald-800 block mb-1 text-lg">
                Uzman Notu & Drenaj
              </span>
              <p className="text-slate-700 font-medium">{result.tip}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200 font-sans mt-10 min-h-[650px] flex flex-col">
      <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Skull className="w-32 h-32" />
        </div>
        <h1 className="text-3xl font-bold flex items-center gap-3 relative z-10">
          <Stethoscope className="w-10 h-10 text-emerald-400" />
          Antibiyotik & Anaerob Rehberi
        </h1>
        <p className="text-slate-300 mt-2 font-medium max-w-2xl relative z-10">
          Apse yönetimi, anaerob şüphesi ve direnç desenlerine göre
          özelleştirilmiş algoritma.
        </p>
      </div>

      <div className="p-8 flex-grow flex flex-col relative">
        <div className="mb-6 flex items-center text-sm font-medium text-slate-400 gap-2">
          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
            Adım {history.length}
          </span>
          {history.length > 1 && (
            <button
              className="flex items-center gap-1 hover:text-slate-800 transition-colors"
              onClick={handleBack}
            >
              &larr; Geri Dön
            </button>
          )}
        </div>

        <div className="mb-8 z-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            {currentStep.question}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            {currentStep.description}
          </p>
        </div>

        <div className="grid gap-4 mt-auto z-10">
          {currentStep.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className="group relative w-full text-left p-6 rounded-xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all duration-200 ease-in-out bg-white"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {option.icon && (
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-emerald-100 text-slate-500 group-hover:text-emerald-600 transition-colors">
                      {option.icon}
                    </div>
                  )}
                  <span className="font-bold text-xl text-slate-700 group-hover:text-emerald-800">
                    {option.label}
                  </span>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-transform" />
              </div>
              {option.note && (
                <span className="block text-sm text-slate-400 mt-2 font-medium italic ml-0 md:ml-14 group-hover:text-emerald-600/70">
                  "{option.note}"
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Anaerob Şüphe İpucu Kutusu */}
        {!isFinished && (
          <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-100 text-sm text-purple-800 flex items-start gap-3">
            <Skull className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">
                Anaerob Ne Zaman Düşünülmeli?
              </span>
              <ul className="list-disc list-inside mt-1 text-purple-700">
                <li>Kötü kokulu (fetid) akıntı</li>
                <li>Doku içinde gaz (krepitasyon)</li>
                <li>
                  Mukozal yüzeylere (ağız, bağırsak, vajina) yakın enfeksiyon
                </li>
                <li>Nekrotik doku, apse formasyonu, ısırık yaraları</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-50 p-4 text-center text-xs text-slate-400 border-t font-medium">
        Hekim onayı olmadan kullanılmaz.
      </div>
    </div>
  );
};

export default AnaerobeAwareAlgorithm;
