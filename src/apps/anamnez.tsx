import React, { useState, useEffect } from "react";
// HATA 1 ÇÖZÜMÜ: PlusFile yerine FilePlus kullanıldı
import { Save, FilePlus, FileText, Printer, Stethoscope } from "lucide-react";

// --- TYPESCRIPT INTERFACES ---
export interface FormData {
  id: string | null;
  formType: "pediatri" | "romatoloji";
  lastModified: string | null;
  // HATA 2 ÇÖZÜMÜ: Dinamik alanlara 'boolean' tipi de eklendi (checkbox'lar için)
  [key: string]: string | boolean | null;
}

interface SectionHeaderProps {
  title: string;
}

interface SubHeaderProps {
  title: string;
}

interface InputGroupProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  width?: string;
}

interface TextAreaGroupProps {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
}

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
}

// --- INITIAL STATE ---
const initialFormData: FormData = {
  id: null,
  formType: "pediatri",
  lastModified: null,

  // ORTAK / KİMLİK BİLGİLERİ
  kimlik_adSoyad: "",
  kimlik_dogumTarihi: "",
  kimlik_yas: "",
  kimlik_cinsiyet: "",
  kimlik_adres: "",
  kimlik_gorusmeTarihi: "",
  kimlik_informant: "",
  kimlik_guvenilirlik: "",

  // VİTAL BULGULAR
  vital_genelDurum: "",
  vital_ates: "",
  vital_nabiz: "",
  vital_tansiyon: "",
  vital_solunum: "",
  vital_kilo: "",
  vital_boy: "",
  vital_basCevresi: "",

  // --- PEDİATRİ GENEL FORMU ---
  ped_sikayet: "",
  ped_sure: "",
  ped_sonSaglikliZaman: "",
  ped_onset: "",
  ped_location: "",
  ped_duration: "",
  ped_character: "",
  ped_aggravating: "",
  ped_related: "",
  ped_timing: "",
  ped_severity: "",
  ped_agriSkoru: "",
  ped_gravidaPara: "",
  ped_gebelikHastalik: "",
  ped_prenatalTarama: "",
  ped_kanGrubu: "",
  ped_gebelikHaftasi: "",
  ped_dogumSekli: "",
  ped_apgar: "",
  ped_dogumKiloBoy: "",
  ped_mekonyum: "",
  ped_sarilik: "",
  ped_topukKani: "",
  ped_anneSutu: "",
  ped_formulMama: "",
  ped_ekGida: "",
  ped_asiUyum: "",
  ped_ozelAsi: "",
  ped_gecirilmisHastalik: "",
  ped_alerji: "",
  ped_motor: "",
  ped_dil: "",
  ped_bilissel: "",
  ped_akraba: "",
  ped_ebeveynSaglik: "",
  ped_aileKronik: "",
  ped_bebekOlum: "",
  ped_sosyalDurum: "",
  ped_rosGenel: "",
  ped_rosDeri: "",
  ped_rosHEENT: "",
  ped_rosSolunum: "",
  ped_rosKVS: "",
  ped_rosGI: "",
  ped_rosGU: "",
  ped_rosNorolojik: "",
  ped_fmCilt: "",
  ped_fmHEENT: "",
  ped_fmSolunum: "",
  ped_fmKVS: "",
  ped_fmBatin: "",
  ped_fmEndokrin: "",
  ped_fmKasIskelet: "",
  ped_fmNoro: "",

  // --- ÇOCUK ROMATOLOJİ FORMU ---
  rom_anaYakinma: "",
  rom_toplamSure: "",
  rom_akutMuKornikMi: "",
  rom_baslangic: "",
  rom_belAgrisi: "",
  rom_inflamatuarMekanik: "",
  rom_sabahTutuklugu: "",
  rom_sabahTutukluguSuresi: "",
  rom_agriHafifleme: "",
  rom_mekanikSiddetlenme: "",
  rom_idiyopatikGece: "",
  rom_eklemSayisi: "",
  rom_simetrikMi: "",
  rom_migratuvarMi: "",
  rom_geceUykudanUyandiran: "",
  rom_tetikleyiciEnfeksiyon: "",
  rom_atesPaterni: "",
  rom_kiloKaybi: "",
  rom_ciltSLE: "",
  rom_ciltHSP: "",
  rom_ciltPsoriatik: "",
  rom_giSemptom: "",
  rom_gozSemptom: "",
  rom_guSemptom: "",
  rom_kronikEnfeksiyon: "",
  rom_ilacKullanimi: "",
  rom_aileRomatizma: "",
  rom_aileDiyaliz: "",
  rom_aileFMF: "",
  rom_posturTopallama: "",
  rom_kasAtrofisiSislik: "",
  rom_isiArtisiHassasiyet: "",
  rom_efuzyonBulgusu: "",
  rom_romOlcusu: "",
  rom_organomegaliLAP: "",
  rom_kardiyakUfurum: "",
};

export default function HastaAnamnezMiniApp() {
  const [activeTab, setActiveTab] = useState<"pediatri" | "romatoloji">(
    "pediatri"
  );
  const [savedFiles, setSavedFiles] = useState<FormData[]>([]);
  const [formData, setFormData] = useState<FormData>({ ...initialFormData });

  useEffect(() => {
    const loadData = () => {
      try {
        const stored = localStorage.getItem("pediatriApp_files");
        if (stored) {
          setSavedFiles(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Veriler yüklenemedi", e);
      }
    };
    loadData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    let parsedValue: string | boolean = value;
    if (type === "checkbox") {
      parsedValue = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewFile = () => {
    if (
      window.confirm(
        "Kaydedilmemiş verileriniz silinecektir. Yeni dosya açmak istiyor musunuz?"
      )
    ) {
      setFormData({ ...initialFormData, formType: activeTab });
    }
  };

  const handleSave = () => {
    if (!formData.kimlik_adSoyad) {
      alert("Lütfen en azından hastanın 'Adı Soyadı' bilgisini giriniz.");
      return;
    }

    const newFiles = [...savedFiles];
    const now = new Date().toLocaleString("tr-TR");

    if (formData.id) {
      const index = newFiles.findIndex((f) => f.id === formData.id);
      if (index !== -1) {
        newFiles[index] = {
          ...formData,
          lastModified: now,
          formType: activeTab,
        };
      }
    } else {
      const newRecord: FormData = {
        ...formData,
        id: Date.now().toString(),
        lastModified: now,
        formType: activeTab,
      };
      newFiles.push(newRecord);
      setFormData(newRecord);
    }

    setSavedFiles(newFiles);
    localStorage.setItem("pediatriApp_files", JSON.stringify(newFiles));
    alert("Dosya başarıyla kaydedildi/güncellendi.");
  };

  const loadFile = (file: FormData) => {
    if (
      window.confirm(
        "Bu dosyayı açmak istiyor musunuz? Mevcut değişiklikler kaydedilmemişse kaybolur."
      )
    ) {
      setFormData(file);
      setActiveTab((file.formType as "pediatri" | "romatoloji") || "pediatri");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
    <div className="bg-slate-800 text-white p-2 mt-6 mb-4 rounded shadow-sm print:bg-gray-200 print:text-black print:border-b-2 print:border-black font-bold uppercase text-sm">
      {title}
    </div>
  );

  const SubHeader: React.FC<SubHeaderProps> = ({ title }) => (
    <h3 className="font-semibold text-slate-700 mt-4 mb-2 border-b border-slate-200 pb-1 print:text-black">
      {title}
    </h3>
  );

  const InputGroup: React.FC<InputGroupProps> = ({
    label,
    name,
    type = "text",
    placeholder = "",
    width = "w-full",
  }) => (
    <div className={`${width} p-1`}>
      <label className="block text-xs font-semibold text-slate-600 mb-1 print:text-black">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={(formData[name] as string) || ""}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:p-0 print:text-sm"
      />
    </div>
  );

  const TextAreaGroup: React.FC<TextAreaGroupProps> = ({
    label,
    name,
    placeholder = "",
    rows = 2,
  }) => (
    <div className="w-full p-1 mt-2">
      <label className="block text-xs font-semibold text-slate-600 mb-1 print:text-black">
        {label}
      </label>
      <textarea
        name={name}
        value={(formData[name] as string) || ""}
        onChange={handleInputChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:text-sm print:resize-none"
      />
    </div>
  );

  const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options }) => (
    <div className="p-1 mt-2">
      <label className="block text-xs font-semibold text-slate-600 mb-1 print:text-black">
        {label}
      </label>
      <div className="flex flex-wrap gap-4 mt-1">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center space-x-2 text-sm cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={formData[name] === opt.value}
              onChange={() => handleRadioChange(name, opt.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="print:font-medium">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const KimlikBilgileri = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-slate-100 print:shadow-none print:border-none print:p-0">
      <SectionHeader title="I. KİMLİK BİLGİLERİ VE DEMOGRAFİ" />
      <div className="flex flex-wrap -mx-1">
        <InputGroup
          label="Hastanın Adı Soyadı"
          name="kimlik_adSoyad"
          width="w-full md:w-1/2"
        />
        <InputGroup
          label="TC Kimlik No (Opsiyonel)"
          name="kimlik_tc"
          width="w-full md:w-1/2"
        />
        <InputGroup
          label="Doğum Tarihi"
          name="kimlik_dogumTarihi"
          type="date"
          width="w-full md:w-1/4"
        />
        <InputGroup
          label="Kesin Yaşı"
          name="kimlik_yas"
          width="w-full md:w-1/4"
        />
        <div className="w-full md:w-1/4 p-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Cinsiyeti
          </label>
          <select
            name="kimlik_cinsiyet"
            value={(formData.kimlik_cinsiyet as string) || ""}
            onChange={handleInputChange}
            className="w-full border border-slate-300 rounded p-2 text-sm print:appearance-none print:border-b print:rounded-none"
          >
            <option value="">Seçiniz...</option>
            <option value="Kız">Kız</option>
            <option value="Erkek">Erkek</option>
          </select>
        </div>
        <InputGroup
          label="Görüşme Tarihi"
          name="kimlik_gorusmeTarihi"
          type="date"
          width="w-full md:w-1/4"
        />
        <InputGroup
          label="Doğum Yeri ve Güncel Adresi"
          name="kimlik_adres"
          width="w-full"
        />
        <InputGroup
          label="Bilgiyi Veren Kişi (İnformant) / Yakınlığı"
          name="kimlik_informant"
          width="w-full md:w-1/2"
        />
        <InputGroup
          label="Bilginin Güvenilirliği"
          name="kimlik_guvenilirlik"
          placeholder="Kısıtlılık, dil bariyeri vb."
          width="w-full md:w-1/2"
        />
      </div>
    </div>
  );

  const VitalBulgular = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-slate-100 print:shadow-none print:border-none print:p-0">
      <SectionHeader title="VİTAL BULGULAR VE ANTROPOMETRİ" />
      <div className="flex flex-wrap -mx-1">
        <RadioGroup
          label="Genel Durum"
          name="vital_genelDurum"
          options={[
            { label: "İyi", value: "İyi" },
            { label: "Orta", value: "Orta" },
            { label: "Toksik", value: "Toksik" },
          ]}
        />
        <div className="w-full flex flex-wrap mt-2">
          <InputGroup
            label="Ateş (°C)"
            name="vital_ates"
            width="w-1/2 md:w-1/4"
          />
          <InputGroup
            label="Nabız (/dk)"
            name="vital_nabiz"
            width="w-1/2 md:w-1/4"
          />
          <InputGroup
            label="Tansiyon (mmHg)"
            name="vital_tansiyon"
            width="w-1/2 md:w-1/4"
          />
          <InputGroup
            label="Solunum (/dk)"
            name="vital_solunum"
            width="w-1/2 md:w-1/4"
          />
          <InputGroup
            label="Ağırlık (kg) / Z-Skor"
            name="vital_kilo"
            width="w-1/3"
          />
          <InputGroup
            label="Boy (cm) / Z-Skor"
            name="vital_boy"
            width="w-1/3"
          />
          <InputGroup
            label="Baş Çevresi (cm)"
            name="vital_basCevresi"
            width="w-1/3"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {/* SIDEBAR (Hidden on Print) */}
      <div className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0 print:hidden shadow-xl z-10">
        <div className="p-4 border-b border-slate-700">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-blue-400" />
            Klinik Arşiv
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Anamnez ve Dosya Yönetimi
          </p>
        </div>

        <div className="p-4 space-y-3">
          <button
            onClick={handleNewFile}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm transition-colors font-medium"
          >
            <FilePlus className="w-4 h-4" /> Yeni Dosya
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pt-0">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Kaydedilen Dosyalar
          </h2>
          {savedFiles.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              Henüz kaydedilmiş dosya yok.
            </p>
          ) : (
            <ul className="space-y-2">
              {savedFiles.map((file) => (
                <li key={file.id}>
                  <button
                    onClick={() => loadFile(file)}
                    className={`w-full text-left p-3 rounded flex flex-col gap-1 transition-colors border-l-4 ${
                      formData.id === file.id
                        ? "bg-slate-800 border-blue-500"
                        : "bg-slate-800/50 border-transparent hover:bg-slate-800"
                    }`}
                  >
                    <span className="text-sm font-medium text-slate-200 truncate">
                      {file.kimlik_adSoyad || "İsimsiz Hasta"}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {file.formType === "pediatri"
                        ? "Genel Pediatri"
                        : "Çocuk Romatoloji"}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {file.lastModified}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto bg-white shadow-xl min-h-screen relative print:shadow-none print:w-full print:max-w-none">
        {/* TOP BAR (Hidden on Print) */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center z-10 print:hidden">
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => {
                setActiveTab("pediatri");
                setFormData((p) => ({ ...p, formType: "pediatri" }));
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "pediatri"
                  ? "bg-white shadow text-blue-700"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Genel Pediatri Formu
            </button>
            <button
              onClick={() => {
                setActiveTab("romatoloji");
                setFormData((p) => ({ ...p, formType: "romatoloji" }));
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "romatoloji"
                  ? "bg-white shadow text-blue-700"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Çocuk Romatoloji Formu
            </button>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-sm font-medium transition-colors"
            >
              <Printer className="w-4 h-4" /> Yazdır (PDF)
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />{" "}
              {formData.id ? "Değişiklikleri Kaydet" : "Dosyayı Kaydet"}
            </button>
          </div>
        </div>

        {/* PRINT HEADER (Only visible on print) */}
        <div className="hidden print:block text-center mb-8 border-b-2 border-black pb-4 mt-8">
          <h1 className="text-2xl font-bold uppercase">
            {activeTab === "pediatri"
              ? "GENEL PEDİATRİ ANAMNEZ VE FİZİK MUAYENE FORMU"
              : "ÇOCUK ROMATOLOJİ SPESİFİK ANAMNEZ VE KLİNİK DEĞERLENDİRME FORMU"}
          </h1>
        </div>

        {/* FORM AREA */}
        <div className="p-8 print:p-0">
          <KimlikBilgileri />

          {activeTab === "pediatri" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0">
                <SectionHeader title="II. BAŞVURU NEDENİ (Ana Yakınma)" />
                <TextAreaGroup
                  label="Şikayet (Hastanın/Ailenin ifadeleriyle)"
                  name="ped_sikayet"
                />
                <InputGroup label="Şikayetin Süresi" name="ped_sure" />
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="III. MEVCUT HASTALIK ÖYKÜSÜ (HPI)" />
                <InputGroup
                  label="En son tam sağlıklı hissedilen zaman"
                  name="ped_sonSaglikliZaman"
                />

                <SubHeader title="OLD CARTS Analizi" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <TextAreaGroup
                    label="Başlangıç (Onset) - Nasıl başladı?"
                    name="ped_onset"
                    rows={1}
                  />
                  <TextAreaGroup
                    label="Yerleşim ve Yayılım (Location/Radiation)"
                    name="ped_location"
                    rows={1}
                  />
                  <TextAreaGroup
                    label="Süre (Duration)"
                    name="ped_duration"
                    rows={1}
                  />
                  <TextAreaGroup
                    label="Karakter (Character) - Yanıcı, batıcı vb."
                    name="ped_character"
                    rows={1}
                  />
                  <TextAreaGroup
                    label="Artıran/Azaltan Faktörler (Aggravating/Alleviating)"
                    name="ped_aggravating"
                    rows={1}
                  />
                  <TextAreaGroup
                    label="İlişkili Semptomlar (Related Symptoms)"
                    name="ped_related"
                    rows={1}
                  />
                  <TextAreaGroup
                    label="Zamanlama (Timing) - Günün hangi saati?"
                    name="ped_timing"
                    rows={1}
                  />
                  <TextAreaGroup
                    label="Şiddet (Severity) - Uyku/Oyun etkileşimi"
                    name="ped_severity"
                    rows={1}
                  />
                </div>
                <div className="mt-2 w-1/3">
                  <InputGroup
                    label="Ağrı Skoru (FACES, VAS vb.)"
                    name="ped_agriSkoru"
                  />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="IV. ÖZGEÇMİŞ (PMH)" />

                <SubHeader title="1. Prenatal (Doğum Öncesi)" />
                <div className="flex flex-wrap -mx-1">
                  <InputGroup
                    label="Gebelik Sayısı/Sonuçları (Gravida, Para)"
                    name="ped_gravidaPara"
                    width="w-full md:w-1/2"
                  />
                  <InputGroup
                    label="Anne-Baba Kan Grubu"
                    name="ped_kanGrubu"
                    width="w-full md:w-1/2"
                  />
                  <TextAreaGroup
                    label="Hastalıklar ve İlaç Kullanımı"
                    name="ped_gebelikHastalik"
                  />
                  <TextAreaGroup
                    label="Tarama Testleri (TORCH vb.)"
                    name="ped_prenatalTarama"
                  />
                </div>

                <SubHeader title="2. Natal (Doğum) Öyküsü" />
                <div className="flex flex-wrap -mx-1">
                  <InputGroup
                    label="Gebelik Haftası"
                    name="ped_gebelikHaftasi"
                    width="w-full md:w-1/3"
                  />
                  <InputGroup
                    label="Doğum Şekli/Endikasyonu"
                    name="ped_dogumSekli"
                    width="w-full md:w-1/3"
                  />
                  <InputGroup
                    label="APGAR Skorları/Resüsitasyon"
                    name="ped_apgar"
                    width="w-full md:w-1/3"
                  />
                </div>

                <SubHeader title="3. Postnatal ve Yenidoğan Öyküsü" />
                <div className="flex flex-wrap -mx-1">
                  <InputGroup
                    label="Doğum Ağırlığı, Boyu, Baş Çevresi"
                    name="ped_dogumKiloBoy"
                    width="w-full"
                  />
                  <InputGroup
                    label="İlk İdrar/Mekonyum Zamanı"
                    name="ped_mekonyum"
                    width="w-full md:w-1/3"
                  />
                  <InputGroup
                    label="Sarılık/NICU Yatışı"
                    name="ped_sarilik"
                    width="w-full md:w-1/3"
                  />
                  <InputGroup
                    label="Topuk Kanı/İşitme/KKH Tarama"
                    name="ped_topukKani"
                    width="w-full md:w-1/3"
                  />
                </div>

                <SubHeader title="4. Beslenme ve Diyet" />
                <div className="flex flex-wrap -mx-1">
                  <TextAreaGroup
                    label="Anne Sütü (Süre, sıklık)"
                    name="ped_anneSutu"
                  />
                  <TextAreaGroup label="Formül Mama" name="ped_formulMama" />
                  <TextAreaGroup
                    label="Tamamlayıcı Beslenme (Ek gıda)"
                    name="ped_ekGida"
                  />
                </div>

                <SubHeader title="5. Bağışıklama & 6. Alerjiler" />
                <div className="flex flex-wrap -mx-1">
                  <InputGroup
                    label="Ulusal Aşı Uyumu"
                    name="ped_asiUyum"
                    width="w-full md:w-1/2"
                  />
                  <InputGroup
                    label="Özel Aşılar (Rotavirüs vb.)"
                    name="ped_ozelAsi"
                    width="w-full md:w-1/2"
                  />
                  <TextAreaGroup
                    label="Geçirilmiş Hastalıklar/Cerrahi/Yatış"
                    name="ped_gecirilmisHastalik"
                  />
                  <TextAreaGroup
                    label="Alerjiler (İlaç, Gıda, Çevre)"
                    name="ped_alerji"
                  />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="V. GELİŞİMSEL & VI. SOYGEÇMİŞ" />
                <div className="flex flex-wrap -mx-1">
                  <InputGroup
                    label="Motor Gelişim"
                    name="ped_motor"
                    width="w-full md:w-1/3"
                  />
                  <InputGroup
                    label="Dil Gelişimi"
                    name="ped_dil"
                    width="w-full md:w-1/3"
                  />
                  <InputGroup
                    label="Bilişsel/Sosyal (M-CHAT vb.)"
                    name="ped_bilissel"
                    width="w-full md:w-1/3"
                  />
                </div>
                <div className="mt-4 flex flex-wrap -mx-1">
                  <RadioGroup
                    label="Akraba Evliliği"
                    name="ped_akraba"
                    options={[
                      { label: "Var", value: "Var" },
                      { label: "Yok", value: "Yok" },
                    ]}
                  />
                  <TextAreaGroup
                    label="Ebeveyn/Kardeş Sağlık Durumu"
                    name="ped_ebeveynSaglik"
                  />
                  <TextAreaGroup
                    label="Ailedeki Kronik Hastalıklar"
                    name="ped_aileKronik"
                  />
                  <InputGroup
                    label="Bebek Ölümü/Düşük Öyküsü"
                    name="ped_bebekOlum"
                    width="w-full"
                  />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="VII. SOSYAL ÖYKÜ & VIII. ROS" />
                <TextAreaGroup
                  label="Sosyal Çevre (IHELLP / HEEADSSS)"
                  name="ped_sosyalDurum"
                />
                <SubHeader title="Sistemlerin Gözden Geçirilmesi (ROS)" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <InputGroup label="Genel" name="ped_rosGenel" />
                  <InputGroup label="Deri" name="ped_rosDeri" />
                  <InputGroup label="Baş-Boyun (HEENT)" name="ped_rosHEENT" />
                  <InputGroup label="Solunum" name="ped_rosSolunum" />
                  <InputGroup label="Kardiyovasküler" name="ped_rosKVS" />
                  <InputGroup label="Gastrointestinal" name="ped_rosGI" />
                  <InputGroup label="Genitoüriner" name="ped_rosGU" />
                  <InputGroup
                    label="Kas-İskelet/Nörolojik"
                    name="ped_rosNorolojik"
                  />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="IX. FİZİK MUAYENE" />
                <VitalBulgular />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                  <TextAreaGroup
                    label="Cilt, Saç, Tırnak"
                    name="ped_fmCilt"
                    rows={2}
                  />
                  <TextAreaGroup
                    label="Baş ve Boyun (HEENT)"
                    name="ped_fmHEENT"
                    rows={2}
                  />
                  <TextAreaGroup
                    label="Solunum Sistemi"
                    name="ped_fmSolunum"
                    rows={2}
                  />
                  <TextAreaGroup
                    label="Kardiyovasküler Sistem"
                    name="ped_fmKVS"
                    rows={2}
                  />
                  <TextAreaGroup
                    label="Batın ve Genitalya"
                    name="ped_fmBatin"
                    rows={2}
                  />
                  <TextAreaGroup
                    label="Endokrin Gelişim (Tanner)"
                    name="ped_fmEndokrin"
                    rows={2}
                  />
                  <TextAreaGroup
                    label="Kas-İskelet Sistemi"
                    name="ped_fmKasIskelet"
                    rows={2}
                  />
                  <TextAreaGroup
                    label="Nörolojik Muayene"
                    name="ped_fmNoro"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "romatoloji" && (
            <div className="space-y-6 animate-fadeIn">
              <VitalBulgular />

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0">
                <SectionHeader title="I. TEMEL BİLGİLER VE BAŞVURU NEDENİ" />
                <TextAreaGroup
                  label="Ana Yakınma (Ailenin/Hastanın kelimeleriyle)"
                  name="rom_anaYakinma"
                />
                <div className="flex flex-wrap mt-2 -mx-1">
                  <InputGroup
                    label="Şikayetlerin Toplam Süresi"
                    name="rom_toplamSure"
                    width="w-full md:w-1/2"
                  />
                  <div className="w-full md:w-1/2 p-1">
                    <RadioGroup
                      label="Akut mu, >6 hafta mı?"
                      name="rom_akutMuKornikMi"
                      options={[
                        { label: "Akut (<6 hafta)", value: "Akut" },
                        { label: "Kronik (>6 hafta)", value: "Kronik" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="II. EKLEM AĞRISI VE KAS-İSKELET ŞİKAYETLERİNİN DETAYLANDIRILMASI" />

                <SubHeader title="Ağrının Başlangıcı ve Yaş Kriterleri" />
                <RadioGroup
                  label="Şikayetler aniden mi yoksa sinsi sinsi mi başladı?"
                  name="rom_baslangic"
                  options={[
                    {
                      label: "Aniden (Travma/Septik şüphesi)",
                      value: "Aniden",
                    },
                    { label: "Sinsi Sinsi (>6hf JIA şüphesi)", value: "Sinsi" },
                  ]}
                />
                <RadioGroup
                  label="(<5 yaş ise) Bel ağrısı şikayeti var mı? (Kırmızı Bayrak)"
                  name="rom_belAgrisi"
                  options={[
                    { label: "Var", value: "Var" },
                    { label: "Yok", value: "Yok" },
                    { label: "Uygulanamaz (>5 yaş)", value: "NA" },
                  ]}
                />

                <SubHeader title="İnflamatuar vs. Mekanik Ağrı Ayrımı" />
                <div className="space-y-3">
                  <RadioGroup
                    label="Karakteristik Tip Şüphesi:"
                    name="rom_inflamatuarMekanik"
                    options={[
                      { label: "İnflamatuar", value: "İnflamatuar" },
                      { label: "Mekanik", value: "Mekanik" },
                      { label: "İdiyopatik (Büyüme)", value: "Idiyopatik" },
                    ]}
                  />

                  <div className="p-3 bg-red-50 border border-red-100 rounded print:bg-transparent print:border-none print:p-0">
                    <p className="text-xs font-bold text-red-800 mb-2 print:text-black">
                      İnflamatuar Şüphe Kriterleri:
                    </p>
                    <RadioGroup
                      label="Sabahları uyanıldığında mı en şiddetli?"
                      name="rom_sabahTutuklugu"
                      options={[
                        { label: "Evet", value: "Evet" },
                        { label: "Hayır", value: "Hayır" },
                      ]}
                    />
                    <InputGroup
                      label="Sabah tutukluğu süresi (dk)"
                      name="rom_sabahTutukluguSuresi"
                      type="number"
                      width="w-1/3"
                    />
                    <RadioGroup
                      label="Kullanım/Efor ile hafifliyor mu?"
                      name="rom_agriHafifleme"
                      options={[
                        { label: "Evet", value: "Evet" },
                        { label: "Hayır", value: "Hayır" },
                      ]}
                    />
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-100 rounded print:bg-transparent print:border-none print:p-0">
                    <p className="text-xs font-bold text-blue-800 mb-2 print:text-black">
                      Mekanik Şüphe Kriterleri:
                    </p>
                    <RadioGroup
                      label="Eforla kötüleşip, istirahatle düzeliyor mu?"
                      name="rom_mekanikSiddetlenme"
                      options={[
                        { label: "Evet", value: "Evet" },
                        { label: "Hayır", value: "Hayır" },
                      ]}
                    />
                  </div>

                  <div className="p-3 bg-green-50 border border-green-100 rounded print:bg-transparent print:border-none print:p-0">
                    <p className="text-xs font-bold text-green-800 mb-2 print:text-black">
                      İdiyopatik Şüphe Kriterleri:
                    </p>
                    <RadioGroup
                      label="Eklemde şişlik yok, akşam/gece ortaya çıkıp masajla hafifliyor mu?"
                      name="rom_idiyopatikGece"
                      options={[
                        { label: "Evet", value: "Evet" },
                        { label: "Hayır", value: "Hayır" },
                      ]}
                    />
                  </div>
                </div>

                <SubHeader title="Tutulum Paterni ve Yayılım" />
                <div className="flex flex-wrap -mx-1 items-center">
                  <div className="w-full md:w-1/3 p-1">
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Kaç eklem etkilenmiş?
                    </label>
                    <select
                      name="rom_eklemSayisi"
                      value={(formData.rom_eklemSayisi as string) || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded p-2 text-sm print:appearance-none print:border-b print:border-0 print:rounded-none"
                    >
                      <option value="">Seçiniz...</option>
                      <option value="Monoartrit (1)">Monoartrit (1)</option>
                      <option value="Oligoartrit (1-4)">
                        Oligoartrit (1-4)
                      </option>
                      <option value="Poliartrit (≥5)">Poliartrit (≥5)</option>
                    </select>
                  </div>
                  <div className="w-full md:w-1/3">
                    <RadioGroup
                      label="Simetrik mi?"
                      name="rom_simetrikMi"
                      options={[
                        { label: "Simetrik", value: "Simetrik" },
                        { label: "Asimetrik", value: "Asimetrik" },
                      ]}
                    />
                  </div>
                  <div className="w-full md:w-1/3">
                    <RadioGroup
                      label="Gezici (migratuvar) mi?"
                      name="rom_migratuvarMi"
                      options={[
                        { label: "Evet", value: "Evet" },
                        { label: "Hayır", value: "Hayır" },
                      ]}
                    />
                  </div>
                </div>

                <SubHeader title="Kırmızı Bayrak & Tetikleyiciler" />
                <RadioGroup
                  label="Gece uykudan uyandıran ve istirahatle geçmeyen ağrı var mı? (Malignite/Enfeksiyon)"
                  name="rom_geceUykudanUyandiran"
                  options={[
                    { label: "Var", value: "Var" },
                    { label: "Yok", value: "Yok" },
                  ]}
                />
                <TextAreaGroup
                  label="Semptom öncesi 2-4 hf enfeksiyon (boğaz ağrısı, ishal, dizüri, kene) öyküsü?"
                  name="rom_tetikleyiciEnfeksiyon"
                />
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="III. EKSTRA-ARTİKÜLER VE SİSTEMİK BULGULAR" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InputGroup
                      label="Ateş paterni (dalgalı, sürekli, periyodik)"
                      name="rom_atesPaterni"
                    />
                    <RadioGroup
                      label="Açıklanamayan kilo kaybı var mı?"
                      name="rom_kiloKaybi"
                      options={[
                        { label: "Var", value: "Var" },
                        { label: "Yok", value: "Yok" },
                      ]}
                    />
                    <TextAreaGroup
                      label="Mide/Bağırsak: Karın ağrısı, ishal, kanlı dışkılama?"
                      name="rom_giSemptom"
                      rows={2}
                    />
                  </div>
                  <div>
                    <RadioGroup
                      label="Yüz döküntüsü, oral aft, saç dökülmesi? (SLE)"
                      name="rom_ciltSLE"
                      options={[
                        { label: "Var", value: "Var" },
                        { label: "Yok", value: "Yok" },
                      ]}
                    />
                    <RadioGroup
                      label="Gluteal/Bacak ekstansör purpurik döküntü? (HSP)"
                      name="rom_ciltHSP"
                      options={[
                        { label: "Var", value: "Var" },
                        { label: "Yok", value: "Yok" },
                      ]}
                    />
                    <RadioGroup
                      label="Tırnakta çukurcuk (pitting) veya psoriatik plak?"
                      name="rom_ciltPsoriatik"
                      options={[
                        { label: "Var", value: "Var" },
                        { label: "Yok", value: "Yok" },
                      ]}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <TextAreaGroup
                    label="Göz: Kızarıklık, fotofobi, bulanık görme?"
                    name="rom_gozSemptom"
                    rows={2}
                  />
                  <TextAreaGroup
                    label="Üriner: Hematüri veya proteinüri(köpüklenme)?"
                    name="rom_guSemptom"
                    rows={2}
                  />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="IV. ROMATOLOJİ ODAKLI ÖZGEÇMİŞ VE SOYGEÇMİŞ" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <RadioGroup
                      label="Kronik enfeksiyon öyküsü var mı?"
                      name="rom_kronikEnfeksiyon"
                      options={[
                        { label: "Var", value: "Var" },
                        { label: "Yok", value: "Yok" },
                      ]}
                    />
                    <TextAreaGroup
                      label="Kullanılan immünsüpresif / antibiyotikler:"
                      name="rom_ilacKullanimi"
                      rows={2}
                    />
                  </div>
                  <div>
                    <RadioGroup
                      label="Ailede Romatizma, SLE, İBH, Sedef?"
                      name="rom_aileRomatizma"
                      options={[
                        { label: "Var", value: "Var" },
                        { label: "Yok", value: "Yok" },
                      ]}
                    />
                    <RadioGroup
                      label="Ailede erken yaşta diyaliz öyküsü?"
                      name="rom_aileDiyaliz"
                      options={[
                        { label: "Var", value: "Var" },
                        { label: "Yok", value: "Yok" },
                      ]}
                    />
                    <RadioGroup
                      label="Ailede periyodik ateş (FMF vb.)?"
                      name="rom_aileFMF"
                      options={[
                        { label: "Var", value: "Var" },
                        { label: "Yok", value: "Yok" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="V. KAS-İSKELET SİSTEMİ VE SİSTEMİK FİZİK MUAYENE" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <SubHeader title="İnspeksiyon (Look)" />
                    <TextAreaGroup
                      label="Postür ve yürüyüş (topallama?)"
                      name="rom_posturTopallama"
                      rows={2}
                    />
                    <TextAreaGroup
                      label="Kas atrofisi, eklem şişliği/şekil bozukluğu?"
                      name="rom_kasAtrofisiSislik"
                      rows={2}
                    />
                  </div>
                  <div>
                    <SubHeader title="Palpasyon (Feel)" />
                    <TextAreaGroup
                      label="Isı artışı veya hassasiyet?"
                      name="rom_isiArtisiHassasiyet"
                      rows={2}
                    />
                    <RadioGroup
                      label="Efüzyon (Bulge/Patellar tap) pozitif mi?"
                      name="rom_efuzyonBulgusu"
                      options={[
                        { label: "Pozitif", value: "Pozitif" },
                        { label: "Negatif", value: "Negatif" },
                      ]}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <SubHeader title="Hareket (Move)" />
                  <TextAreaGroup
                    label="Aktif/Pasif ROM ölçümleri ve eşlik eden ağrı belgelenmesi:"
                    name="rom_romOlcusu"
                    rows={3}
                  />
                </div>

                <div className="mt-4">
                  <SubHeader title="Sistemik Muayene Kontrolü" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RadioGroup
                      label="Lenfadenopati (LAP), Hepatosplenomegali?"
                      name="rom_organomegaliLAP"
                      options={[
                        { label: "Mevcut", value: "Mevcut" },
                        { label: "Yok", value: "Yok" },
                      ]}
                    />
                    <RadioGroup
                      label="Kardiyak muayenede üfürüm duyuldu mu?"
                      name="rom_kardiyakUfurum"
                      options={[
                        { label: "Evet", value: "Evet" },
                        { label: "Hayır", value: "Hayır" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
