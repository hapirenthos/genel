import React, { useState, useEffect, useMemo } from "react";
import {
  Save,
  FilePlus,
  Printer,
  Stethoscope,
  ChevronRight,
  ChevronDown,
  FolderOpen,
  History,
  Menu,
  X,
} from "lucide-react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// --- TYPESCRIPT INTERFACES ---
export interface FormData {
  id: string;
  patientId: string;
  formType: "pediatri" | "romatoloji";
  lastModified: string;
  [key: string]: any;
}

// --- HELPERS ---
const getTodayDate = () => new Date().toISOString().split("T")[0];

const calculateAge = (dob: string, targetDate: string) => {
  if (!dob) return "";
  const birthDate = new Date(dob);
  const currentDate = targetDate ? new Date(targetDate) : new Date();

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    days += lastMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  if (years < 0) return "Geçersiz Tarih";
  if (years > 0) return `${years} yıl ${months > 0 ? months + " ay" : ""}`;
  if (months > 0) return `${months} ay ${days > 0 ? days + " gün" : ""}`;
  return `${days} gün`;
};

// --- INITIAL STATE ---
const initialFormData: FormData = {
  id: "",
  patientId: "",
  formType: "pediatri",
  lastModified: "",

  kimlik_adSoyad: "",
  kimlik_tc: "",
  kimlik_dosyaNo: "",
  kimlik_dogumTarihi: "",
  kimlik_yas: "",
  kimlik_yas_manuel: false,
  kimlik_cinsiyet: "",
  kimlik_adres: "",
  kimlik_gorusmeTarihi: getTodayDate(),
  kimlik_informant: "",
  kimlik_guvenilirlik: "",

  vital_genelDurum: "",
  vital_ates: "",
  vital_nabiz: "",
  vital_tansiyon: "",
  vital_solunum: "",
  vital_kilo: "",
  vital_boy: "",
  vital_basCevresi: "",

  // Pediatri
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
  ped_anneKanGrubu: "",
  ped_babaKanGrubu: "",
  ped_gebelikHaftasi: "",
  ped_dogumSekli: "",
  ped_apgar: "",
  ped_resusitasyon: "",
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
  ped_akraba_detay: "",
  ped_ebeveynSaglik: "",
  ped_aileKronik: "",
  ped_bebekOlum: "",
  ped_sosyalDurum: "",

  ped_rosGenel: "Hayır",
  ped_rosGenel_detay: "",
  ped_rosDeri: "Hayır",
  ped_rosDeri_detay: "",
  ped_rosHEENT: "Hayır",
  ped_rosHEENT_detay: "",
  ped_rosSolunum: "Hayır",
  ped_rosSolunum_detay: "",
  ped_rosKVS: "Hayır",
  ped_rosKVS_detay: "",
  ped_rosGI: "Hayır",
  ped_rosGI_detay: "",
  ped_rosGU: "Hayır",
  ped_rosGU_detay: "",
  ped_rosNorolojik: "Hayır",
  ped_rosNorolojik_detay: "",

  ped_fmCilt: "",
  ped_fmCilt_detay: "",
  ped_fmHEENT: "",
  ped_fmHEENT_detay: "",
  ped_fmSolunum: "",
  ped_fmSolunum_detay: "",
  ped_fmKVS: "",
  ped_fmKVS_detay: "",
  ped_fmBatin: "",
  ped_fmBatin_detay: "",
  ped_fmEndokrin: "",
  ped_fmEndokrin_detay: "",
  ped_fmKasIskelet: "",
  ped_fmKasIskelet_detay: "",
  ped_fmNoro: "",
  ped_fmNoro_detay: "",

  // Romatoloji
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
  rom_kiloKaybi_detay: "",
  rom_ciltSLE: "",
  rom_ciltSLE_detay: "",
  rom_ciltHSP: "",
  rom_ciltHSP_detay: "",
  rom_ciltPsoriatik: "",
  rom_ciltPsoriatik_detay: "",
  rom_giSemptom: "",
  rom_giSemptom_detay: "",
  rom_gozSemptom: "",
  rom_gozSemptom_detay: "",
  rom_guSemptom: "",
  rom_guSemptom_detay: "",
  rom_kronikEnfeksiyon: "",
  rom_kronikEnfeksiyon_detay: "",
  rom_ilacKullanimi: "",
  rom_aileRomatizma: "",
  rom_aileRomatizma_detay: "",
  rom_aileDiyaliz: "",
  rom_aileDiyaliz_detay: "",
  rom_aileFMF: "",
  rom_aileFMF_detay: "",

  rom_fmLook: "",
  rom_fmLook_detay: "",
  rom_fmFeel: "",
  rom_fmFeel_detay: "",
  rom_fmMove: "",
  rom_fmMove_detay: "",
  rom_fmSistemik: "",
  rom_fmSistemik_detay: "",
};

// --- PURE UI COMPONENTS ---
const SectionHeader = ({ title }: { title: string }) => (
  <div className="bg-slate-800 text-white p-2 mt-6 mb-4 rounded shadow-sm font-bold uppercase text-sm">
    {title}
  </div>
);

const SubHeader = ({ title }: { title: string }) => (
  <h3 className="font-semibold text-slate-700 mt-4 mb-2 border-b border-slate-200 pb-1">
    {title}
  </h3>
);

const InputGroup = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  width = "w-full",
}: any) => (
  <div className={`${width} p-1`}>
    <label className="block text-xs font-semibold text-slate-600 mb-1 truncate">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const SelectGroup = ({
  label,
  name,
  value,
  onChange,
  options,
  width = "w-full",
}: any) => (
  <div className={`${width} p-1`}>
    <label className="block text-xs font-semibold text-slate-600 mb-1 truncate">
      {label}
    </label>
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    >
      <option value="">Seçiniz...</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const TextAreaGroup = ({
  label,
  name,
  value,
  onChange,
  rows = 2,
  width = "w-full",
}: any) => (
  <div className={`${width} p-1 mt-1`}>
    <label className="block text-xs font-semibold text-slate-600 mb-1 truncate">
      {label}
    </label>
    <textarea
      name={name}
      value={value || ""}
      onChange={onChange}
      rows={rows}
      className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
    />
  </div>
);

const RadioGroup = ({
  label,
  name,
  value,
  options,
  onChange,
  width = "w-full",
}: any) => (
  <div className={`${width} p-1 mt-1`}>
    {label && (
      <label className="block text-xs font-semibold text-slate-600 mb-1 truncate">
        {label}
      </label>
    )}
    <div className="flex flex-wrap gap-4 mt-1">
      {options.map((opt: any) => (
        <label
          key={opt.value}
          className="flex items-center space-x-2 text-sm cursor-pointer whitespace-nowrap"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(name, opt.value)}
            className="text-blue-600 focus:ring-blue-500 w-4 h-4"
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const YesNoDetail = ({
  label,
  radioName,
  detailName,
  radioValue,
  detailValue,
  onChangeRadio,
  onChangeDetail,
  isExam = false,
}: any) => (
  <div className="mb-3 p-3 bg-slate-50 border border-slate-200 rounded-lg w-full">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
      <span className="text-sm font-semibold text-slate-700 w-full sm:w-1/2">
        {label}
      </span>
      <div className="w-full sm:w-1/2 flex sm:justify-end">
        <RadioGroup
          name={radioName}
          value={radioValue}
          width="w-auto"
          options={
            isExam
              ? [
                  { label: "Evet (Anormal bulgu)", value: "Evet" },
                  { label: "Hayır (Doğal)", value: "Hayır" },
                ]
              : [
                  { label: "Evet", value: "Evet" },
                  { label: "Hayır", value: "Hayır" },
                ]
          }
          onChange={onChangeRadio}
        />
      </div>
    </div>
    {radioValue === "Evet" && (
      <div className="mt-2 animate-fadeIn w-full">
        <TextAreaGroup
          label="Detaylar/Açıklama:"
          name={detailName}
          value={detailValue}
          onChange={onChangeDetail}
          rows={1}
          width="w-full"
        />
      </div>
    )}
  </div>
);

// YENİ ROS (Sistem Gözden Geçirme) BİLEŞENİ
const RosItem = ({
  systemName,
  symptoms,
  radioName,
  detailName,
  radioValue,
  detailValue,
  onChangeRadio,
  onChangeDetail,
}: any) => (
  <div className="mb-3 p-4 bg-slate-50 border border-slate-200 rounded-lg w-full flex flex-col justify-between">
    <div className="flex flex-col mb-3">
      <span className="text-sm font-bold text-slate-800">{systemName}</span>
      <span className="text-xs text-slate-500 italic mt-1 leading-relaxed">
        {symptoms}
      </span>
    </div>
    <div className="flex items-center justify-between border-t border-slate-200 pt-3 mt-auto">
      <span className="text-xs font-bold text-slate-600">Bulgu var mı?</span>
      <RadioGroup
        name={radioName}
        value={radioValue}
        width="w-auto"
        options={[
          { label: "Evet", value: "Evet" },
          { label: "Hayır", value: "Hayır" },
        ]}
        onChange={onChangeRadio}
      />
    </div>
    {radioValue === "Evet" && (
      <div className="mt-3 animate-fadeIn w-full">
        <TextAreaGroup
          label="Pozitif Bulguları Detaylandırın:"
          name={detailName}
          value={detailValue}
          onChange={onChangeDetail}
          rows={1}
          width="w-full"
        />
      </div>
    )}
  </div>
);

// --- MAIN APPLICATION ---
export default function HastaAnamnezMiniApp() {
  const [activeTab, setActiveTab] = useState<"pediatri" | "romatoloji">(
    "pediatri"
  );
  const [savedFiles, setSavedFiles] = useState<FormData[]>([]);
  const [formData, setFormData] = useState<FormData>({ ...initialFormData });
  const [expandedPatients, setExpandedPatients] = useState<
    Record<string, boolean>
  >({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("klinikApp_files");
      if (stored) setSavedFiles(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      if (name === "kimlik_yas") {
        newData.kimlik_yas_manuel = true;
      }
      if (name === "kimlik_dogumTarihi" || name === "kimlik_gorusmeTarihi") {
        newData.kimlik_yas_manuel = false;
        newData.kimlik_yas = calculateAge(
          newData.kimlik_dogumTarihi,
          newData.kimlik_gorusmeTarihi
        );
      }

      return newData;
    });
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
      setFormData({
        ...initialFormData,
        formType: activeTab,
        kimlik_gorusmeTarihi: getTodayDate(),
      });
    }
  };

  const handleSave = () => {
    if (!formData.kimlik_adSoyad && !formData.kimlik_dosyaNo) {
      alert(
        "Lütfen en azından hastanın 'Adı Soyadı' veya 'Dosya No' bilgisini giriniz."
      );
      return;
    }

    const newFiles = [...savedFiles];
    const now = new Date().toLocaleString("tr-TR");
    const pId = formData.kimlik_dosyaNo
      ? formData.kimlik_dosyaNo.trim()
      : formData.kimlik_adSoyad.trim().toLowerCase();

    const recordToSave = {
      ...formData,
      id: formData.id || Date.now().toString(),
      patientId: pId,
      lastModified: now,
      formType: activeTab,
    };

    if (formData.id) {
      const index = newFiles.findIndex((f) => f.id === formData.id);
      if (index !== -1) newFiles[index] = recordToSave;
    } else {
      newFiles.push(recordToSave);
    }

    setSavedFiles(newFiles);
    setFormData(recordToSave);
    localStorage.setItem("klinikApp_files", JSON.stringify(newFiles));
    alert("Dosya başarıyla kaydedildi.");
  };

  const loadFile = (file: FormData) => {
    if (
      formData.kimlik_adSoyad &&
      formData.id !== file.id &&
      !window.confirm(
        "Mevcut formu kapatıp seçilen kaydı açmak istiyor musunuz?"
      )
    )
      return;
    setFormData(file);
    setActiveTab(file.formType || "pediatri");
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const groupedPatients = useMemo(() => {
    const groups: Record<string, FormData[]> = {};
    savedFiles.forEach((f) => {
      const key = f.patientId || "Bilinmeyen";
      if (!groups[key]) groups[key] = [];
      groups[key].push(f);
    });
    Object.keys(groups).forEach((k) => {
      groups[k].sort(
        (a, b) =>
          new Date(b.kimlik_gorusmeTarihi).getTime() -
          new Date(a.kimlik_gorusmeTarihi).getTime()
      );
    });
    return groups;
  }, [savedFiles]);

  const togglePatientExpand = (pId: string) => {
    setExpandedPatients((prev) => ({ ...prev, [pId]: !prev[pId] }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Başlık
    doc.setFontSize(16);
    doc.text("Hasta Anamnez ve Klinik Değerlendirme Raporu", 105, 15, {
      align: "center",
    });
    doc.setFontSize(10);
    doc.text(`Tarih: ${formData.kimlik_gorusmeTarihi}`, 105, 22, {
      align: "center",
    });

    // Temel Bilgiler
    doc.autoTable({
      startY: 30,
      head: [["Alan", "Bilgi"]],
      body: [
        ["Hasta Adı", formData.kimlik_adSoyad],
        ["TC No", formData.kimlik_tc],
        ["Dosya No", formData.kimlik_dosyaNo],
        [
          "Yaş / Cinsiyet",
          `${formData.kimlik_yas} / ${formData.kimlik_cinsiyet}`,
        ],
      ],
      theme: "grid",
    });

    // ROS Özet
    doc.text(
      "Sistemlerin Gözden Geçirilmesi (ROS) Özeti",
      14,
      (doc as any).lastAutoTable.finalY + 10
    );
    doc.autoTable({
      startY: (doc as any).lastAutoTable.finalY + 12,
      head: [["Sistem", "Bulgu?"]],
      body: [
        ["Genel", formData.ped_rosGenel],
        ["Deri", formData.ped_rosDeri],
        ["Solunum", formData.ped_rosSolunum],
        ["Kardiyovasküler", formData.ped_rosKVS],
        ["Gastrointestinal", formData.ped_rosGI],
      ],
      theme: "striped",
    });

    doc.save(`Anamnez_${formData.kimlik_adSoyad || "rapor"}.pdf`);
  };

  // --- PRINT RENDER HELPERS ---
  const val = (key: string) => (formData[key] ? formData[key] : "-");
  const fmVal = (radioKey: string, detailKey: string) => {
    const r = formData[radioKey];
    if (!r) return "Değerlendirilmemiş";
    if (r === "Hayır") return "Doğal ya da özelliksiz";
    return formData[detailKey] ? formData[detailKey] : "Detay belirtilmemiş";
  };
  const ynVal = (radioKey: string, detailKey: string) => {
    const r = formData[radioKey];
    if (!r) return "-";
    if (r === "Hayır") return "Hayır";
    return `Evet (${formData[detailKey] || "Detay yok"})`;
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans text-slate-800 selection:bg-blue-200 overflow-hidden">
      {/* SIDEBAR */}
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-0 overflow-hidden"
        } shrink-0 bg-slate-900 text-white flex flex-col h-screen sticky top-0 print:hidden transition-all duration-300 z-20`}
      >
        <div className="p-4 border-b border-slate-700 bg-slate-950 flex justify-between items-center whitespace-nowrap">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-blue-400" />
            Klinik Arşiv
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 hover:bg-slate-800 rounded lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 min-w-[16rem]">
          <button
            onClick={handleNewFile}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2.5 px-4 rounded-md text-sm font-semibold transition-all shadow-md"
          >
            <FilePlus className="w-4 h-4" /> Yeni Hasta / Form
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 min-w-[16rem]">
          <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
            Kayıtlı Hastalar
          </h2>
          {Object.keys(groupedPatients).length === 0 ? (
            <p className="text-xs text-slate-500 italic px-1">
              Henüz kayıt yok.
            </p>
          ) : (
            <div className="space-y-1">
              {Object.entries(groupedPatients).map(([pId, records]) => {
                const latestRecord = records[0];
                const displayName = latestRecord.kimlik_adSoyad || "İsimsiz";
                const isExpanded = expandedPatients[pId];

                return (
                  <div
                    key={pId}
                    className="bg-slate-800/40 rounded-lg overflow-hidden border border-slate-700/50"
                  >
                    <button
                      onClick={() => togglePatientExpand(pId)}
                      className="w-full flex items-center justify-between p-3 hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FolderOpen className="w-4 h-4 text-blue-400 shrink-0" />
                        <div className="flex flex-col text-left truncate">
                          <span className="text-sm font-semibold text-slate-200 truncate">
                            {displayName}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Dosya No: {latestRecord.kimlik_dosyaNo || "-"}
                          </span>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="bg-slate-900/50 border-t border-slate-800">
                        {records.map((record) => (
                          <button
                            key={record.id}
                            onClick={() => loadFile(record)}
                            className={`w-full text-left py-2 px-4 pl-9 text-xs flex flex-col gap-0.5 border-l-2 transition-colors ${
                              formData.id === record.id
                                ? "border-blue-500 bg-slate-800 text-white"
                                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/80"
                            }`}
                          >
                            <span className="font-medium flex items-center gap-1.5">
                              <History className="w-3 h-3" />{" "}
                              {record.kimlik_gorusmeTarihi}
                            </span>
                            <span className="text-[10px] opacity-80">
                              {record.formType === "pediatri"
                                ? "Genel Pediatri"
                                : "Çocuk Romatoloji"}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden print:overflow-visible relative">
        {/* TOP ACTION BAR - ESNEK/RESPONSIVE */}
        <div className="bg-white shadow-sm border-b border-slate-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 z-10 print:hidden">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-md shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="flex flex-wrap sm:flex-nowrap bg-slate-100 p-1 rounded-lg flex-1 sm:flex-none w-full sm:w-auto">
              <button
                onClick={() => {
                  setActiveTab("pediatri");
                  setFormData((p) => ({ ...p, formType: "pediatri" }));
                }}
                className={`flex-1 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                  activeTab === "pediatri"
                    ? "bg-white shadow-sm text-blue-700"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Genel Pediatri
              </button>
              <button
                onClick={() => {
                  setActiveTab("romatoloji");
                  setFormData((p) => ({ ...p, formType: "romatoloji" }));
                }}
                className={`flex-1 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                  activeTab === "romatoloji"
                    ? "bg-white shadow-sm text-blue-700"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Romatoloji
              </button>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={generatePDF}
              className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-semibold transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" /> PDF Olarak İndir
            </button>
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-semibold transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" /> Kaydet
            </button>
          </div>
        </div>

        {/* SCROLLABLE FORM AREA */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-100 p-4 sm:p-6 print:p-0 print:overflow-visible">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-7xl mx-auto p-4 sm:p-8 print:shadow-none print:border-none">
            {/* 1. ORTAK KİMLİK BİLGİLERİ */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 mb-6">
              <SectionHeader title="I. KİMLİK BİLGİLERİ VE DEMOGRAFİ" />
              <div className="flex flex-wrap -mx-1">
                <InputGroup
                  label="Dosya / Hasta No"
                  name="kimlik_dosyaNo"
                  value={formData.kimlik_dosyaNo}
                  onChange={handleInputChange}
                  width="w-full md:w-1/2 lg:w-1/3"
                />
                <InputGroup
                  label="Hastanın Adı Soyadı"
                  name="kimlik_adSoyad"
                  value={formData.kimlik_adSoyad}
                  onChange={handleInputChange}
                  width="w-full md:w-1/2 lg:w-1/3"
                />
                <InputGroup
                  label="TC Kimlik No"
                  name="kimlik_tc"
                  value={formData.kimlik_tc}
                  onChange={handleInputChange}
                  width="w-full md:w-1/2 lg:w-1/3"
                />

                <InputGroup
                  label="Başvuru/Görüşme Tarihi"
                  name="kimlik_gorusmeTarihi"
                  type="date"
                  value={formData.kimlik_gorusmeTarihi}
                  onChange={handleInputChange}
                  width="w-full md:w-1/2 lg:w-1/4"
                />
                <InputGroup
                  label="Doğum Tarihi"
                  name="kimlik_dogumTarihi"
                  type="date"
                  value={formData.kimlik_dogumTarihi}
                  onChange={handleInputChange}
                  width="w-full md:w-1/2 lg:w-1/4"
                />
                <InputGroup
                  label="Kesin Yaşı (Oto/Manuel)"
                  name="kimlik_yas"
                  value={formData.kimlik_yas}
                  onChange={handleInputChange}
                  width="w-full md:w-1/2 lg:w-1/4"
                />
                <SelectGroup
                  label="Cinsiyeti"
                  name="kimlik_cinsiyet"
                  value={formData.kimlik_cinsiyet}
                  onChange={handleInputChange}
                  options={["Kız", "Erkek"]}
                  width="w-full md:w-1/2 lg:w-1/4"
                />

                <InputGroup
                  label="Bilgiyi Veren Kişi (Yakınlığı)"
                  name="kimlik_informant"
                  value={formData.kimlik_informant}
                  onChange={handleInputChange}
                  width="w-full lg:w-1/2"
                />
                <InputGroup
                  label="Bilginin Güvenilirliği (Bariyer vb.)"
                  name="kimlik_guvenilirlik"
                  value={formData.kimlik_guvenilirlik}
                  onChange={handleInputChange}
                  width="w-full lg:w-1/2"
                />
                <InputGroup
                  label="Doğum Yeri ve Güncel Adresi"
                  name="kimlik_adres"
                  value={formData.kimlik_adres}
                  onChange={handleInputChange}
                  width="w-full"
                />
              </div>
            </div>

            {/* TAB 1: PEDİATRİ */}
            {activeTab === "pediatri" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="II. BAŞVURU NEDENİ & III. MEVCUT HASTALIK ÖYKÜSÜ" />
                  <div className="flex flex-wrap -mx-1">
                    <TextAreaGroup
                      label="Şikayet (Ana Yakınma)"
                      name="ped_sikayet"
                      value={formData.ped_sikayet}
                      onChange={handleInputChange}
                      width="w-full"
                    />
                    <InputGroup
                      label="Şikayetin Süresi"
                      name="ped_sure"
                      value={formData.ped_sure}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2"
                    />
                    <InputGroup
                      label="En Son Tam Sağlıklı Hissedilen Zaman"
                      name="ped_sonSaglikliZaman"
                      value={formData.ped_sonSaglikliZaman}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2"
                    />
                  </div>
                  <SubHeader title="OLD CARTS Analizi" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                    <TextAreaGroup
                      label="Başlangıç (Onset)"
                      name="ped_onset"
                      value={formData.ped_onset}
                      onChange={handleInputChange}
                      rows={1}
                    />
                    <TextAreaGroup
                      label="Yerleşim/Yayılım (Location/Radiation)"
                      name="ped_location"
                      value={formData.ped_location}
                      onChange={handleInputChange}
                      rows={1}
                    />
                    <TextAreaGroup
                      label="Süre (Duration)"
                      name="ped_duration"
                      value={formData.ped_duration}
                      onChange={handleInputChange}
                      rows={1}
                    />
                    <TextAreaGroup
                      label="Karakter (Character)"
                      name="ped_character"
                      value={formData.ped_character}
                      onChange={handleInputChange}
                      rows={1}
                    />
                    <TextAreaGroup
                      label="Artıran/Azaltan Faktörler"
                      name="ped_aggravating"
                      value={formData.ped_aggravating}
                      onChange={handleInputChange}
                      rows={1}
                    />
                    <TextAreaGroup
                      label="İlişkili Semptomlar"
                      name="ped_related"
                      value={formData.ped_related}
                      onChange={handleInputChange}
                      rows={1}
                    />
                    <TextAreaGroup
                      label="Zamanlama (Timing)"
                      name="ped_timing"
                      value={formData.ped_timing}
                      onChange={handleInputChange}
                      rows={1}
                    />
                    <TextAreaGroup
                      label="Şiddet (Severity) / Uyku-Oyun"
                      name="ped_severity"
                      value={formData.ped_severity}
                      onChange={handleInputChange}
                      rows={1}
                    />
                  </div>
                  <div className="mt-4 flex -mx-1">
                    <InputGroup
                      label="Ağrı Skoru (FACES/VAS)"
                      name="ped_agriSkoru"
                      value={formData.ped_agriSkoru}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2 lg:w-1/3"
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="IV. ÖZGEÇMİŞ (PMH)" />
                  <SubHeader title="Prenatal & Natal (Doğum Öncesi ve Doğum)" />
                  <div className="flex flex-wrap -mx-1">
                    <InputGroup
                      label="Gebelik Sayısı/Sonuçları (Gravida, Para)"
                      name="ped_gravidaPara"
                      value={formData.ped_gravidaPara}
                      onChange={handleInputChange}
                      width="w-full lg:w-1/2"
                    />
                    <SelectGroup
                      label="Anne Kan Grubu"
                      name="ped_anneKanGrubu"
                      value={formData.ped_anneKanGrubu}
                      onChange={handleInputChange}
                      options={[
                        "A+",
                        "A-",
                        "B+",
                        "B-",
                        "AB+",
                        "AB-",
                        "O+",
                        "O-",
                      ]}
                      width="w-full md:w-1/2 lg:w-1/4"
                    />
                    <SelectGroup
                      label="Baba Kan Grubu"
                      name="ped_babaKanGrubu"
                      value={formData.ped_babaKanGrubu}
                      onChange={handleInputChange}
                      options={[
                        "A+",
                        "A-",
                        "B+",
                        "B-",
                        "AB+",
                        "AB-",
                        "O+",
                        "O-",
                      ]}
                      width="w-full md:w-1/2 lg:w-1/4"
                    />

                    <TextAreaGroup
                      label="Hastalıklar ve İlaç Kullanımı"
                      name="ped_gebelikHastalik"
                      value={formData.ped_gebelikHastalik}
                      onChange={handleInputChange}
                      rows={1}
                      width="w-full lg:w-1/2"
                    />
                    <TextAreaGroup
                      label="Tarama Testleri (TORCH vb.)"
                      name="ped_prenatalTarama"
                      value={formData.ped_prenatalTarama}
                      onChange={handleInputChange}
                      rows={1}
                      width="w-full lg:w-1/2"
                    />

                    <InputGroup
                      label="Gebelik Haftası"
                      name="ped_gebelikHaftasi"
                      value={formData.ped_gebelikHaftasi}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2 lg:w-1/4"
                    />
                    <InputGroup
                      label="Doğum Şekli/Endikasyonu"
                      name="ped_dogumSekli"
                      value={formData.ped_dogumSekli}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2 lg:w-1/4"
                    />
                    <InputGroup
                      label="APGAR"
                      name="ped_apgar"
                      value={formData.ped_apgar}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2 lg:w-1/4"
                    />
                    <InputGroup
                      label="Resüsitasyon İhtiyacı"
                      name="ped_resusitasyon"
                      value={formData.ped_resusitasyon}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2 lg:w-1/4"
                    />
                  </div>

                  <SubHeader title="Postnatal, Beslenme ve Bağışıklama" />
                  <div className="flex flex-wrap -mx-1">
                    <InputGroup
                      label="Doğum Ağırlığı/Boyu/Baş Çevresi"
                      name="ped_dogumKiloBoy"
                      value={formData.ped_dogumKiloBoy}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2 lg:w-1/4"
                    />
                    <InputGroup
                      label="İlk İdrar/Mekonyum Zamanı"
                      name="ped_mekonyum"
                      value={formData.ped_mekonyum}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2 lg:w-1/4"
                    />
                    <InputGroup
                      label="Sarılık/NICU Yatışı"
                      name="ped_sarilik"
                      value={formData.ped_sarilik}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2 lg:w-1/4"
                    />
                    <InputGroup
                      label="Topuk Kanı/İşitme/KKH Tarama"
                      name="ped_topukKani"
                      value={formData.ped_topukKani}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2 lg:w-1/4"
                    />

                    <TextAreaGroup
                      label="Anne Sütü"
                      name="ped_anneSutu"
                      value={formData.ped_anneSutu}
                      onChange={handleInputChange}
                      rows={1}
                      width="w-full lg:w-1/3"
                    />
                    <TextAreaGroup
                      label="Formül Mama"
                      name="ped_formulMama"
                      value={formData.ped_formulMama}
                      onChange={handleInputChange}
                      rows={1}
                      width="w-full lg:w-1/3"
                    />
                    <TextAreaGroup
                      label="Ek Gıda / Tolerans"
                      name="ped_ekGida"
                      value={formData.ped_ekGida}
                      onChange={handleInputChange}
                      rows={1}
                      width="w-full lg:w-1/3"
                    />

                    <InputGroup
                      label="Ulusal Aşı Uyumu"
                      name="ped_asiUyum"
                      value={formData.ped_asiUyum}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2"
                    />
                    <InputGroup
                      label="Özel Aşılar"
                      name="ped_ozelAsi"
                      value={formData.ped_ozelAsi}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2"
                    />

                    <TextAreaGroup
                      label="Geçirilmiş Hastalıklar/Cerrahi"
                      name="ped_gecirilmisHastalik"
                      value={formData.ped_gecirilmisHastalik}
                      onChange={handleInputChange}
                      rows={1}
                      width="w-full lg:w-1/2"
                    />
                    <TextAreaGroup
                      label="Alerjiler (İlaç, Gıda, Çevre)"
                      name="ped_alerji"
                      value={formData.ped_alerji}
                      onChange={handleInputChange}
                      rows={1}
                      width="w-full lg:w-1/2"
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="V. GELİŞİMSEL & VI. SOYGEÇMİŞ" />
                  <div className="flex flex-wrap -mx-1">
                    <InputGroup
                      label="Motor Gelişim"
                      name="ped_motor"
                      value={formData.ped_motor}
                      onChange={handleInputChange}
                      width="w-full md:w-1/3"
                    />
                    <InputGroup
                      label="Dil Gelişimi"
                      name="ped_dil"
                      value={formData.ped_dil}
                      onChange={handleInputChange}
                      width="w-full md:w-1/3"
                    />
                    <InputGroup
                      label="Bilişsel/Sosyal (M-CHAT)"
                      name="ped_bilissel"
                      value={formData.ped_bilissel}
                      onChange={handleInputChange}
                      width="w-full md:w-1/3"
                    />

                    <div className="w-full px-1 mt-2">
                      <YesNoDetail
                        label="Akraba Evliliği var mı?"
                        radioName="ped_akraba"
                        detailName="ped_akraba_detay"
                        radioValue={formData.ped_akraba}
                        detailValue={formData.ped_akraba_detay}
                        onChangeRadio={handleRadioChange}
                        onChangeDetail={handleInputChange}
                      />
                    </div>

                    <TextAreaGroup
                      label="Ebeveyn/Kardeş Sağlık Durumu"
                      name="ped_ebeveynSaglik"
                      value={formData.ped_ebeveynSaglik}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2"
                    />
                    <TextAreaGroup
                      label="Ailedeki Kronik Hastalıklar"
                      name="ped_aileKronik"
                      value={formData.ped_aileKronik}
                      onChange={handleInputChange}
                      width="w-full md:w-1/2"
                    />
                    <InputGroup
                      label="Bebek Ölümü/Düşük Öyküsü"
                      name="ped_bebekOlum"
                      value={formData.ped_bebekOlum}
                      onChange={handleInputChange}
                      width="w-full"
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="VII. SOSYAL ÖYKÜ & VIII. ROS" />
                  <TextAreaGroup
                    label="Sosyal Çevre (IHELLP / HEEADSSS)"
                    name="ped_sosyalDurum"
                    value={formData.ped_sosyalDurum}
                    onChange={handleInputChange}
                    width="w-full"
                  />

                  <SubHeader title="Sistemlerin Gözden Geçirilmesi (ROS)" />
                  {/* YENİ ROS LİSTESİ BURASI */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                    <RosItem
                      systemName="Genel"
                      symptoms="Ateş, kilo kaybı, halsizlik, çabuk yorulma vb."
                      radioName="ped_rosGenel"
                      detailName="ped_rosGenel_detay"
                      radioValue={formData.ped_rosGenel}
                      detailValue={formData.ped_rosGenel_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <RosItem
                      systemName="Deri"
                      symptoms="Döküntü, sarılık, kaşıntı, morarma, renk değişikliği vb."
                      radioName="ped_rosDeri"
                      detailName="ped_rosDeri_detay"
                      radioValue={formData.ped_rosDeri}
                      detailValue={formData.ped_rosDeri_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <RosItem
                      systemName="Baş-Boyun (HEENT)"
                      symptoms="Baş ağrısı, görme/işitme sorunları, burun kanaması, boğaz ağrısı vb."
                      radioName="ped_rosHEENT"
                      detailName="ped_rosHEENT_detay"
                      radioValue={formData.ped_rosHEENT}
                      detailValue={formData.ped_rosHEENT_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <RosItem
                      systemName="Solunum"
                      symptoms="Öksürük, hırıltı, stridor, nefes darlığı, balgam vb."
                      radioName="ped_rosSolunum"
                      detailName="ped_rosSolunum_detay"
                      radioValue={formData.ped_rosSolunum}
                      detailValue={formData.ped_rosSolunum_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <RosItem
                      systemName="Kardiyovasküler"
                      symptoms="Çarpıntı, göğüs ağrısı, morarma (siyanoz), eforla yorulma vb."
                      radioName="ped_rosKVS"
                      detailName="ped_rosKVS_detay"
                      radioValue={formData.ped_rosKVS}
                      detailValue={formData.ped_rosKVS_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <RosItem
                      systemName="Gastrointestinal"
                      symptoms="Bulantı, kusma, ishal, kabızlık, hematemez vb."
                      radioName="ped_rosGI"
                      detailName="ped_rosGI_detay"
                      radioValue={formData.ped_rosGI}
                      detailValue={formData.ped_rosGI_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <RosItem
                      systemName="Genitoüriner"
                      symptoms="Sık idrara çıkma, disüri, hematüri, enürezis vb."
                      radioName="ped_rosGU"
                      detailName="ped_rosGU_detay"
                      radioValue={formData.ped_rosGU}
                      detailValue={formData.ped_rosGU_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <RosItem
                      systemName="Kas-İskelet ve Nörolojik"
                      symptoms="Eklem ağrısı/şişliği, yürüyüş bozukluğu, nöbet, güçsüzlük vb."
                      radioName="ped_rosNorolojik"
                      detailName="ped_rosNorolojik_detay"
                      radioValue={formData.ped_rosNorolojik}
                      detailValue={formData.ped_rosNorolojik_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="IX. FİZİK MUAYENE" />
                  <SubHeader title="Vital Bulgular ve Antropometri" />
                  <div className="flex flex-wrap -mx-1 mb-4">
                    <SelectGroup
                      label="Genel Durum"
                      name="vital_genelDurum"
                      value={formData.vital_genelDurum}
                      onChange={handleInputChange}
                      options={["İyi", "Orta", "Toksik"]}
                      width="w-full lg:w-1/3"
                    />
                    <InputGroup
                      label="Ateş (°C)"
                      name="vital_ates"
                      value={formData.vital_ates}
                      onChange={handleInputChange}
                      width="w-1/2 md:w-1/4 lg:w-1/6"
                    />
                    <InputGroup
                      label="Nabız (/dk)"
                      name="vital_nabiz"
                      value={formData.vital_nabiz}
                      onChange={handleInputChange}
                      width="w-1/2 md:w-1/4 lg:w-1/6"
                    />
                    <InputGroup
                      label="Tansiyon (mmHg)"
                      name="vital_tansiyon"
                      value={formData.vital_tansiyon}
                      onChange={handleInputChange}
                      width="w-1/2 md:w-1/4 lg:w-1/6"
                    />
                    <InputGroup
                      label="Solunum (/dk)"
                      name="vital_solunum"
                      value={formData.vital_solunum}
                      onChange={handleInputChange}
                      width="w-1/2 md:w-1/4 lg:w-1/6"
                    />

                    <InputGroup
                      label="Ağırlık (kg/Z)"
                      name="vital_kilo"
                      value={formData.vital_kilo}
                      onChange={handleInputChange}
                      width="w-full md:w-1/3"
                    />
                    <InputGroup
                      label="Boy (cm/Z)"
                      name="vital_boy"
                      value={formData.vital_boy}
                      onChange={handleInputChange}
                      width="w-full md:w-1/3"
                    />
                    <InputGroup
                      label="Baş Çevresi (cm)"
                      name="vital_basCevresi"
                      value={formData.vital_basCevresi}
                      onChange={handleInputChange}
                      width="w-full md:w-1/3"
                    />
                  </div>

                  <SubHeader title="Sistemik Muayene" />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <YesNoDetail
                      isExam
                      label="Cilt, Saç, Tırnak"
                      radioName="ped_fmCilt"
                      detailName="ped_fmCilt_detay"
                      radioValue={formData.ped_fmCilt}
                      detailValue={formData.ped_fmCilt_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      isExam
                      label="Baş ve Boyun (HEENT)"
                      radioName="ped_fmHEENT"
                      detailName="ped_fmHEENT_detay"
                      radioValue={formData.ped_fmHEENT}
                      detailValue={formData.ped_fmHEENT_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      isExam
                      label="Solunum Sistemi"
                      radioName="ped_fmSolunum"
                      detailName="ped_fmSolunum_detay"
                      radioValue={formData.ped_fmSolunum}
                      detailValue={formData.ped_fmSolunum_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      isExam
                      label="Kardiyovasküler Sistem"
                      radioName="ped_fmKVS"
                      detailName="ped_fmKVS_detay"
                      radioValue={formData.ped_fmKVS}
                      detailValue={formData.ped_fmKVS_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      isExam
                      label="Batın ve Genitalya"
                      radioName="ped_fmBatin"
                      detailName="ped_fmBatin_detay"
                      radioValue={formData.ped_fmBatin}
                      detailValue={formData.ped_fmBatin_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      isExam
                      label="Endokrin Gelişim (Tanner)"
                      radioName="ped_fmEndokrin"
                      detailName="ped_fmEndokrin_detay"
                      radioValue={formData.ped_fmEndokrin}
                      detailValue={formData.ped_fmEndokrin_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      isExam
                      label="Kas-İskelet Sistemi"
                      radioName="ped_fmKasIskelet"
                      detailName="ped_fmKasIskelet_detay"
                      radioValue={formData.ped_fmKasIskelet}
                      detailValue={formData.ped_fmKasIskelet_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      isExam
                      label="Nörolojik Muayene"
                      radioName="ped_fmNoro"
                      detailName="ped_fmNoro_detay"
                      radioValue={formData.ped_fmNoro}
                      detailValue={formData.ped_fmNoro_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ROMATOLOJİ */}
            {activeTab === "romatoloji" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="I. BAŞVURU NEDENİ & VİTAL BULGULAR" />
                  <div className="flex flex-wrap -mx-1">
                    <TextAreaGroup
                      label="Ana Yakınma (Ailenin/Hastanın kelimeleriyle)"
                      name="rom_anaYakinma"
                      value={formData.rom_anaYakinma}
                      onChange={handleInputChange}
                      width="w-full"
                    />
                    <InputGroup
                      label="Şikayetlerin Toplam Süresi"
                      name="rom_toplamSure"
                      value={formData.rom_toplamSure}
                      onChange={handleInputChange}
                      width="w-full lg:w-1/2"
                    />
                    <RadioGroup
                      label="Akut mu, >6 hafta mı?"
                      name="rom_akutMuKornikMi"
                      value={formData.rom_akutMuKornikMi}
                      options={[
                        { label: "Akut (<6hf)", value: "Akut" },
                        { label: "Kronik (>6hf)", value: "Kronik" },
                      ]}
                      onChange={handleRadioChange}
                      width="w-full lg:w-1/2"
                    />
                  </div>

                  <SubHeader title="Vital Bulgular" />
                  <div className="flex flex-wrap -mx-1">
                    <InputGroup
                      label="Ateş (°C)"
                      name="vital_ates"
                      value={formData.vital_ates}
                      onChange={handleInputChange}
                      width="w-1/2 lg:w-1/4"
                    />
                    <InputGroup
                      label="Nabız (/dk)"
                      name="vital_nabiz"
                      value={formData.vital_nabiz}
                      onChange={handleInputChange}
                      width="w-1/2 lg:w-1/4"
                    />
                    <InputGroup
                      label="Tansiyon (mmHg)"
                      name="vital_tansiyon"
                      value={formData.vital_tansiyon}
                      onChange={handleInputChange}
                      width="w-1/2 lg:w-1/4"
                    />
                    <InputGroup
                      label="Kilo (kg)"
                      name="vital_kilo"
                      value={formData.vital_kilo}
                      onChange={handleInputChange}
                      width="w-1/2 lg:w-1/4"
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="II. EKLEM AĞRISI VE KAS-İSKELET ŞİKAYETLERİNİN DETAYLANDIRILMASI" />
                  <div className="flex flex-wrap -mx-1">
                    <RadioGroup
                      label="Başlangıç:"
                      name="rom_baslangic"
                      value={formData.rom_baslangic}
                      options={[
                        { label: "Aniden (Travma/Septik)", value: "Aniden" },
                        { label: "Sinsi Sinsi (>6hf JIA)", value: "Sinsi" },
                      ]}
                      onChange={handleRadioChange}
                      width="w-full lg:w-1/2"
                    />
                    <RadioGroup
                      label="(<5 yaş ise) Bel ağrısı şikayeti var mı?"
                      name="rom_belAgrisi"
                      value={formData.rom_belAgrisi}
                      options={[
                        { label: "Var", value: "Var" },
                        { label: "Yok", value: "Yok" },
                        { label: "Uygulanamaz", value: "NA" },
                      ]}
                      onChange={handleRadioChange}
                      width="w-full lg:w-1/2"
                    />
                  </div>

                  <SubHeader title="İnflamatuar vs. Mekanik Ağrı Ayrımı" />
                  <RadioGroup
                    label="Karakteristik Tip Şüphesi:"
                    name="rom_inflamatuarMekanik"
                    value={formData.rom_inflamatuarMekanik}
                    options={[
                      { label: "İnflamatuar", value: "İnflamatuar" },
                      { label: "Mekanik", value: "Mekanik" },
                      { label: "İdiyopatik", value: "Idiyopatik" },
                    ]}
                    onChange={handleRadioChange}
                    width="w-full"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="p-3 bg-red-50 border border-red-100 rounded">
                      <p className="text-xs font-bold text-red-800 mb-2">
                        İnflamatuar:
                      </p>
                      <RadioGroup
                        label="Sabahları şiddetli mi?"
                        name="rom_sabahTutuklugu"
                        value={formData.rom_sabahTutuklugu}
                        options={[
                          { label: "Evet", value: "Evet" },
                          { label: "Hayır", value: "Hayır" },
                        ]}
                        onChange={handleRadioChange}
                        width="w-full"
                      />
                      <InputGroup
                        label="Sabah tutukluğu (dk)"
                        name="rom_sabahTutukluguSuresi"
                        type="number"
                        value={formData.rom_sabahTutukluguSuresi}
                        onChange={handleInputChange}
                        width="w-full"
                      />
                      <RadioGroup
                        label="Efor ile hafifliyor mu?"
                        name="rom_agriHafifleme"
                        value={formData.rom_agriHafifleme}
                        options={[
                          { label: "Evet", value: "Evet" },
                          { label: "Hayır", value: "Hayır" },
                        ]}
                        onChange={handleRadioChange}
                        width="w-full"
                      />
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded">
                      <p className="text-xs font-bold text-blue-800 mb-2">
                        Mekanik:
                      </p>
                      <RadioGroup
                        label="Eforla kötüleşip, istirahatle düzeliyor mu?"
                        name="rom_mekanikSiddetlenme"
                        value={formData.rom_mekanikSiddetlenme}
                        options={[
                          { label: "Evet", value: "Evet" },
                          { label: "Hayır", value: "Hayır" },
                        ]}
                        onChange={handleRadioChange}
                        width="w-full"
                      />
                    </div>
                    <div className="p-3 bg-green-50 border border-green-100 rounded">
                      <p className="text-xs font-bold text-green-800 mb-2">
                        İdiyopatik:
                      </p>
                      <RadioGroup
                        label="Akşam/gece çıkıp masajla hafifliyor mu?"
                        name="rom_idiyopatikGece"
                        value={formData.rom_idiyopatikGece}
                        options={[
                          { label: "Evet", value: "Evet" },
                          { label: "Hayır", value: "Hayır" },
                        ]}
                        onChange={handleRadioChange}
                        width="w-full"
                      />
                    </div>
                  </div>

                  <SubHeader title="Tutulum Paterni & Kırmızı Bayraklar" />
                  <div className="flex flex-wrap -mx-1 items-center mb-4">
                    <SelectGroup
                      label="Kaç eklem etkilenmiş?"
                      name="rom_eklemSayisi"
                      value={formData.rom_eklemSayisi}
                      onChange={handleInputChange}
                      options={[
                        "Monoartrit (1)",
                        "Oligoartrit (1-4)",
                        "Poliartrit (≥5)",
                      ]}
                      width="w-full md:w-1/3"
                    />
                    <RadioGroup
                      label="Simetrik mi?"
                      name="rom_simetrikMi"
                      value={formData.rom_simetrikMi}
                      options={[
                        { label: "Simetrik", value: "Simetrik" },
                        { label: "Asimetrik", value: "Asimetrik" },
                      ]}
                      onChange={handleRadioChange}
                      width="w-full md:w-1/3"
                    />
                    <RadioGroup
                      label="Gezici (migratuvar) mi?"
                      name="rom_migratuvarMi"
                      value={formData.rom_migratuvarMi}
                      options={[
                        { label: "Evet", value: "Evet" },
                        { label: "Hayır", value: "Hayır" },
                      ]}
                      onChange={handleRadioChange}
                      width="w-full md:w-1/3"
                    />
                  </div>
                  <RadioGroup
                    label="Gece uykudan uyandıran ve istirahatle geçmeyen ağrı var mı?"
                    name="rom_geceUykudanUyandiran"
                    value={formData.rom_geceUykudanUyandiran}
                    options={[
                      { label: "Var", value: "Var" },
                      { label: "Yok", value: "Yok" },
                    ]}
                    onChange={handleRadioChange}
                    width="w-full"
                  />
                  <TextAreaGroup
                    label="Semptom öncesi 2-4 hf enfeksiyon (boğaz ağrısı, kene vb.) öyküsü?"
                    name="rom_tetikleyiciEnfeksiyon"
                    value={formData.rom_tetikleyiciEnfeksiyon}
                    onChange={handleInputChange}
                    rows={1}
                    width="w-full"
                  />
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="III. EKSTRA-ARTİKÜLER VE SİSTEMİK BULGULAR" />
                  <div className="flex flex-wrap -mx-1">
                    <InputGroup
                      label="Ateş paterni (dalgalı, periyodik vb.)"
                      name="rom_atesPaterni"
                      value={formData.rom_atesPaterni}
                      onChange={handleInputChange}
                      width="w-full lg:w-1/2"
                    />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                    <YesNoDetail
                      label="Açıklanamayan kilo kaybı var mı?"
                      radioName="rom_kiloKaybi"
                      detailName="rom_kiloKaybi_detay"
                      radioValue={formData.rom_kiloKaybi}
                      detailValue={formData.rom_kiloKaybi_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      label="Yüz döküntüsü, oral aft, saç dökülmesi? (SLE)"
                      radioName="rom_ciltSLE"
                      detailName="rom_ciltSLE_detay"
                      radioValue={formData.rom_ciltSLE}
                      detailValue={formData.rom_ciltSLE_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      label="Gluteal/Bacak ekstansör purpurik döküntü? (HSP)"
                      radioName="rom_ciltHSP"
                      detailName="rom_ciltHSP_detay"
                      radioValue={formData.rom_ciltHSP}
                      detailValue={formData.rom_ciltHSP_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      label="Tırnakta çukurcuk veya psoriatik plak?"
                      radioName="rom_ciltPsoriatik"
                      detailName="rom_ciltPsoriatik_detay"
                      radioValue={formData.rom_ciltPsoriatik}
                      detailValue={formData.rom_ciltPsoriatik_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      label="Mide/Bağırsak: Karın ağrısı, ishal, kanlı dışkı?"
                      radioName="rom_giSemptom"
                      detailName="rom_giSemptom_detay"
                      radioValue={formData.rom_giSemptom}
                      detailValue={formData.rom_giSemptom_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      label="Göz: Kızarıklık, fotofobi, bulanık görme?"
                      radioName="rom_gozSemptom"
                      detailName="rom_gozSemptom_detay"
                      radioValue={formData.rom_gozSemptom}
                      detailValue={formData.rom_gozSemptom_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      label="Üriner: Hematüri veya köpüklenme?"
                      radioName="rom_guSemptom"
                      detailName="rom_guSemptom_detay"
                      radioValue={formData.rom_guSemptom}
                      detailValue={formData.rom_guSemptom_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="IV. ROMATOLOJİ ODAKLI ÖZGEÇMİŞ VE SOYGEÇMİŞ" />
                  <TextAreaGroup
                    label="Kullanılan immünsüpresif / antibiyotikler:"
                    name="rom_ilacKullanimi"
                    value={formData.rom_ilacKullanimi}
                    onChange={handleInputChange}
                    rows={1}
                    width="w-full"
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                    <YesNoDetail
                      label="Kronik enfeksiyon öyküsü var mı?"
                      radioName="rom_kronikEnfeksiyon"
                      detailName="rom_kronikEnfeksiyon_detay"
                      radioValue={formData.rom_kronikEnfeksiyon}
                      detailValue={formData.rom_kronikEnfeksiyon_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      label="Ailede Romatizma, SLE, İBH, Sedef?"
                      radioName="rom_aileRomatizma"
                      detailName="rom_aileRomatizma_detay"
                      radioValue={formData.rom_aileRomatizma}
                      detailValue={formData.rom_aileRomatizma_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      label="Ailede erken yaşta diyaliz öyküsü?"
                      radioName="rom_aileDiyaliz"
                      detailName="rom_aileDiyaliz_detay"
                      radioValue={formData.rom_aileDiyaliz}
                      detailValue={formData.rom_aileDiyaliz_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      label="Ailede periyodik ateş (FMF vb.)?"
                      radioName="rom_aileFMF"
                      detailName="rom_aileFMF_detay"
                      radioValue={formData.rom_aileFMF}
                      detailValue={formData.rom_aileFMF_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="V. KAS-İSKELET SİSTEMİ VE SİSTEMİK FİZİK MUAYENE" />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <YesNoDetail
                      isExam
                      label="İnspeksiyon (Look) Anormallik? (Postür, atrofi, şişlik)"
                      radioName="rom_fmLook"
                      detailName="rom_fmLook_detay"
                      radioValue={formData.rom_fmLook}
                      detailValue={formData.rom_fmLook_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      isExam
                      label="Palpasyon (Feel) Anormallik? (Isı artışı, hassasiyet, Efüzyon)"
                      radioName="rom_fmFeel"
                      detailName="rom_fmFeel_detay"
                      radioValue={formData.rom_fmFeel}
                      detailValue={formData.rom_fmFeel_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      isExam
                      label="Hareket (Move) ROM Kısıtlılığı / Ağrı?"
                      radioName="rom_fmMove"
                      detailName="rom_fmMove_detay"
                      radioValue={formData.rom_fmMove}
                      detailValue={formData.rom_fmMove_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                    <YesNoDetail
                      isExam
                      label="Sistemik Muayene Anormalliği? (LAP, Üfürüm vb.)"
                      radioName="rom_fmSistemik"
                      detailName="rom_fmSistemik_detay"
                      radioValue={formData.rom_fmSistemik}
                      detailValue={formData.rom_fmSistemik_detay}
                      onChangeRadio={handleRadioChange}
                      onChangeDetail={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- PRINT TEMPLATE (TÜM DOSYAYI YAZDIRIR) --- */}
        <div className="hidden print:block w-full max-w-none text-black p-4 text-[11px] leading-snug font-serif">
          <div className="text-center mb-6 pb-2 border-b-2 border-black">
            <h1 className="text-xl font-bold uppercase tracking-widest">
              ÇOCUK KLİNİĞİ BÜTÜNLEŞİK ANAMNEZ VE MUAYENE RAPORU
            </h1>
            <p className="text-sm">
              Rapor Tarihi: {new Date().toLocaleString("tr-TR")}
            </p>
          </div>

          <div className="mb-4">
            <h2 className="font-bold text-sm bg-gray-200 p-1 mb-2">
              I. KİMLİK BİLGİLERİ VE DEMOGRAFİ
            </h2>
            <div className="grid grid-cols-4 gap-2 border-b border-gray-300 pb-2">
              <p>
                <strong>Dosya No:</strong> {val("kimlik_dosyaNo")}
              </p>
              <p>
                <strong>Hasta Adı:</strong> {val("kimlik_adSoyad")}
              </p>
              <p>
                <strong>TC No:</strong> {val("kimlik_tc")}
              </p>
              <p>
                <strong>Cinsiyet:</strong> {val("kimlik_cinsiyet")}
              </p>
              <p>
                <strong>Doğum T.:</strong> {val("kimlik_dogumTarihi")}
              </p>
              <p>
                <strong>Yaşı:</strong> {val("kimlik_yas")}
              </p>
              <p>
                <strong>Görüşme T.:</strong> {val("kimlik_gorusmeTarihi")}
              </p>
              <p>
                <strong>İnformant:</strong> {val("kimlik_informant")}
              </p>
            </div>
            <p className="mt-1">
              <strong>Adres/Yer:</strong> {val("kimlik_adres")} |{" "}
              <strong>Güvenilirlik:</strong> {val("kimlik_guvenilirlik")}
            </p>
          </div>

          <div className="mb-4">
            <h2 className="font-bold text-sm bg-gray-200 p-1 mb-2">
              VİTAL BULGULAR VE ANTROPOMETRİ
            </h2>
            <div className="grid grid-cols-5 gap-2">
              <p>
                <strong>Durum:</strong> {val("vital_genelDurum")}
              </p>
              <p>
                <strong>Ateş:</strong> {val("vital_ates")}
              </p>
              <p>
                <strong>Nabız:</strong> {val("vital_nabiz")}
              </p>
              <p>
                <strong>Tansiyon:</strong> {val("vital_tansiyon")}
              </p>
              <p>
                <strong>Solunum:</strong> {val("vital_solunum")}
              </p>
              <p>
                <strong>Kilo:</strong> {val("vital_kilo")}
              </p>
              <p>
                <strong>Boy:</strong> {val("vital_boy")}
              </p>
              <p>
                <strong>Baş Çev.:</strong> {val("vital_basCevresi")}
              </p>
            </div>
          </div>

          {/* BÖLÜM 1: PEDİATRİ VERİLERİ (HER ZAMAN YAZDIRILIR) */}
          <div className="mb-6 border-t-2 border-black pt-2 break-inside-avoid">
            <h2 className="font-bold text-base mb-2 text-center bg-gray-100 py-1">
              GENEL PEDİATRİ FORMU
            </h2>
            <p>
              <strong>Ana Şikayet:</strong> {val("ped_sikayet")} |{" "}
              <strong>Süre:</strong> {val("ped_sure")} |{" "}
              <strong>Son Sağlıklı Zaman:</strong> {val("ped_sonSaglikliZaman")}
            </p>
            <p>
              <strong>HPI (OLD CARTS):</strong> Başlangıç: {val("ped_onset")} |
              Yerleşim: {val("ped_location")} | Süre: {val("ped_duration")} |
              Karakter: {val("ped_character")} | Artıran/Azaltan:{" "}
              {val("ped_aggravating")} | İlişkili: {val("ped_related")} | Zaman:{" "}
              {val("ped_timing")} | Şiddet: {val("ped_severity")} | Ağrı Skoru:{" "}
              {val("ped_agriSkoru")}
            </p>

            <h3 className="font-bold mt-2">Özgeçmiş (PMH)</h3>
            <p>
              <strong>Prenatal:</strong> Gravida/Para: {val("ped_gravidaPara")}{" "}
              | Anne KG: {val("ped_anneKanGrubu")} Baba KG:{" "}
              {val("ped_babaKanGrubu")} | Hst/İlaç: {val("ped_gebelikHastalik")}{" "}
              | Tarama: {val("ped_prenatalTarama")}
            </p>
            <p>
              <strong>Natal:</strong> {val("ped_gebelikHaftasi")} hf, Şekli:{" "}
              {val("ped_dogumSekli")}, Apgar: {val("ped_apgar")}, Resus:{" "}
              {val("ped_resusitasyon")}
            </p>
            <p>
              <strong>Postnatal:</strong> Kilo/Boy/BÇ: {val("ped_dogumKiloBoy")}{" "}
              | Mekonyum: {val("ped_mekonyum")} | Sarılık/NICU:{" "}
              {val("ped_sarilik")} | Taramalar: {val("ped_topukKani")}
            </p>
            <p>
              <strong>Beslenme/Aşı:</strong> AS: {val("ped_anneSutu")} | Mama:{" "}
              {val("ped_formulMama")} | EkGıda: {val("ped_ekGida")} | Ulusal
              Aşı: {val("ped_asiUyum")} | Özel Aşı: {val("ped_ozelAsi")}
            </p>
            <p>
              <strong>Hastalık/Alerji:</strong> Geçirilmiş:{" "}
              {val("ped_gecirilmisHastalik")} | Alerji: {val("ped_alerji")}
            </p>

            <h3 className="font-bold mt-2">Gelişim, Soygeçmiş & Sosyal</h3>
            <p>
              <strong>Gelişim:</strong> Motor: {val("ped_motor")} | Dil:{" "}
              {val("ped_dil")} | Bilişsel: {val("ped_bilissel")}
            </p>
            <p>
              <strong>Soygeçmiş:</strong> Akraba:{" "}
              {ynVal("ped_akraba", "ped_akraba_detay")} | Ebeveyn Sğl:{" "}
              {val("ped_ebeveynSaglik")} | Kronik: {val("ped_aileKronik")} |
              BebekÖlm/Düşük: {val("ped_bebekOlum")}
            </p>
            <p>
              <strong>Sosyal (IHELLP):</strong> {val("ped_sosyalDurum")}
            </p>

            <h3 className="font-bold mt-2 border-b border-gray-300">
              Sistemlerin Gözden Geçirilmesi (ROS)
            </h3>
            <div className="grid grid-cols-2 gap-x-4">
              <p>
                <strong>Genel:</strong>{" "}
                {ynVal("ped_rosGenel", "ped_rosGenel_detay")}
              </p>
              <p>
                <strong>Deri:</strong>{" "}
                {ynVal("ped_rosDeri", "ped_rosDeri_detay")}
              </p>
              <p>
                <strong>HEENT:</strong>{" "}
                {ynVal("ped_rosHEENT", "ped_rosHEENT_detay")}
              </p>
              <p>
                <strong>Solunum:</strong>{" "}
                {ynVal("ped_rosSolunum", "ped_rosSolunum_detay")}
              </p>
              <p>
                <strong>KVS:</strong> {ynVal("ped_rosKVS", "ped_rosKVS_detay")}
              </p>
              <p>
                <strong>GİS:</strong> {ynVal("ped_rosGI", "ped_rosGI_detay")}
              </p>
              <p>
                <strong>GÜS:</strong> {ynVal("ped_rosGU", "ped_rosGU_detay")}
              </p>
              <p>
                <strong>Nörolojik:</strong>{" "}
                {ynVal("ped_rosNorolojik", "ped_rosNorolojik_detay")}
              </p>
            </div>

            <h3 className="font-bold mt-2 border-b border-gray-300">
              Sistemik Fizik Muayene
            </h3>
            <div className="grid grid-cols-2 gap-x-4">
              <p>
                <strong>Cilt/Saç:</strong>{" "}
                {fmVal("ped_fmCilt", "ped_fmCilt_detay")}
              </p>
              <p>
                <strong>HEENT:</strong>{" "}
                {fmVal("ped_fmHEENT", "ped_fmHEENT_detay")}
              </p>
              <p>
                <strong>Solunum:</strong>{" "}
                {fmVal("ped_fmSolunum", "ped_fmSolunum_detay")}
              </p>
              <p>
                <strong>KVS:</strong> {fmVal("ped_fmKVS", "ped_fmKVS_detay")}
              </p>
              <p>
                <strong>Batın/Genital:</strong>{" "}
                {fmVal("ped_fmBatin", "ped_fmBatin_detay")}
              </p>
              <p>
                <strong>Endokrin:</strong>{" "}
                {fmVal("ped_fmEndokrin", "ped_fmEndokrin_detay")}
              </p>
              <p>
                <strong>Kas-İskelet:</strong>{" "}
                {fmVal("ped_fmKasIskelet", "ped_fmKasIskelet_detay")}
              </p>
              <p>
                <strong>Nörolojik:</strong>{" "}
                {fmVal("ped_fmNoro", "ped_fmNoro_detay")}
              </p>
            </div>
          </div>

          {/* BÖLÜM 2: ROMATOLOJİ VERİLERİ (HER ZAMAN YAZDIRILIR) */}
          <div className="mb-4 border-t-2 border-black pt-2 break-inside-avoid mt-8">
            <h2 className="font-bold text-base mb-2 text-center bg-gray-100 py-1">
              ÇOCUK ROMATOLOJİ FORMU
            </h2>
            <p>
              <strong>Yakınma:</strong> {val("rom_anaYakinma")} |{" "}
              <strong>Süre/Tip:</strong> {val("rom_toplamSure")} (
              {val("rom_akutMuKornikMi")}) | <strong>Başlangıç:</strong>{" "}
              {val("rom_baslangic")} | <strong>Bel Ağrısı:</strong>{" "}
              {val("rom_belAgrisi")}
            </p>
            <p>
              <strong>Ağrı Karakteri:</strong> {val("rom_inflamatuarMekanik")} |
              Sabah Tut.: {val("rom_sabahTutuklugu")} (
              {val("rom_sabahTutukluguSuresi")}dk) | Eforla Hafifleme:{" "}
              {val("rom_agriHafifleme")} | Eforla Şiddetlenme:{" "}
              {val("rom_mekanikSiddetlenme")} | Gece İdiyopatik:{" "}
              {val("rom_idiyopatikGece")}
            </p>
            <p>
              <strong>Patern:</strong> {val("rom_eklemSayisi")} | Simetri:{" "}
              {val("rom_simetrikMi")} | Migratuvar: {val("rom_migratuvarMi")} |
              Gece Uyandıran: {val("rom_geceUykudanUyandiran")} | Tetikleyici
              Enf.: {val("rom_tetikleyiciEnfeksiyon")}
            </p>

            <h3 className="font-bold mt-2 border-b border-gray-300">
              Ekstra-Artiküler ve Sistemik (Romatoloji)
            </h3>
            <div className="grid grid-cols-2 gap-x-4">
              <p>
                <strong>Ateş Paterni:</strong> {val("rom_atesPaterni")}
              </p>
              <p>
                <strong>Kilo Kaybı:</strong>{" "}
                {ynVal("rom_kiloKaybi", "rom_kiloKaybi_detay")}
              </p>
              <p>
                <strong>Cilt (SLE):</strong>{" "}
                {ynVal("rom_ciltSLE", "rom_ciltSLE_detay")}
              </p>
              <p>
                <strong>Cilt (HSP):</strong>{" "}
                {ynVal("rom_ciltHSP", "rom_ciltHSP_detay")}
              </p>
              <p>
                <strong>Cilt (Psoriatik):</strong>{" "}
                {ynVal("rom_ciltPsoriatik", "rom_ciltPsoriatik_detay")}
              </p>
              <p>
                <strong>GİS:</strong>{" "}
                {ynVal("rom_giSemptom", "rom_giSemptom_detay")}
              </p>
              <p>
                <strong>Göz:</strong>{" "}
                {ynVal("rom_gozSemptom", "rom_gozSemptom_detay")}
              </p>
              <p>
                <strong>GÜS:</strong>{" "}
                {ynVal("rom_guSemptom", "rom_guSemptom_detay")}
              </p>
            </div>

            <h3 className="font-bold mt-2 border-b border-gray-300">
              Özgeçmiş / Soygeçmiş (Romatoloji)
            </h3>
            <div className="grid grid-cols-2 gap-x-4">
              <p>
                <strong>İlaçlar:</strong> {val("rom_ilacKullanimi")}
              </p>
              <p>
                <strong>Kr. Enfeksiyon:</strong>{" "}
                {ynVal("rom_kronikEnfeksiyon", "rom_kronikEnfeksiyon_detay")}
              </p>
              <p>
                <strong>Aile (Romatizma vb):</strong>{" "}
                {ynVal("rom_aileRomatizma", "rom_aileRomatizma_detay")}
              </p>
              <p>
                <strong>Aile (Diyaliz):</strong>{" "}
                {ynVal("rom_aileDiyaliz", "rom_aileDiyaliz_detay")}
              </p>
              <p className="col-span-2">
                <strong>Aile (FMF/Periyodik):</strong>{" "}
                {ynVal("rom_aileFMF", "rom_aileFMF_detay")}
              </p>
            </div>

            <h3 className="font-bold mt-2 border-b border-gray-300">
              Romatolojik Fizik Muayene
            </h3>
            <div className="grid grid-cols-1 gap-y-1">
              <p>
                <strong>İnspeksiyon (Look):</strong>{" "}
                {fmVal("rom_fmLook", "rom_fmLook_detay")}
              </p>
              <p>
                <strong>Palpasyon (Feel):</strong>{" "}
                {fmVal("rom_fmFeel", "rom_fmFeel_detay")}
              </p>
              <p>
                <strong>Hareket (Move):</strong>{" "}
                {fmVal("rom_fmMove", "rom_fmMove_detay")}
              </p>
              <p>
                <strong>Sistemik:</strong>{" "}
                {fmVal("rom_fmSistemik", "rom_fmSistemik_detay")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
