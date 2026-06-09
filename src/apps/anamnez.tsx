
import React, { useState, useEffect, useMemo } from 'react';
import { Save, FilePlus, Download, Stethoscope, ChevronRight, ChevronDown, FolderOpen, History, Menu, X, Trash2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// --- TYPESCRIPT INTERFACES ---
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => void;
  lastAutoTable: { finalY: number };
}

export interface FormData {
  id: string;
  patientId: string;
  formType: 'pediatri' | 'romatoloji';
  lastModified: string;
  [key: string]: any;
}

// --- HELPERS ---
const getTodayDate = () => new Date().toISOString().split('T')[0];

const calculateAge = (dob: string, targetDate: string) => {
  if (!dob) return '';
  const birthDate = new Date(dob);
  const currentDate = targetDate ? new Date(targetDate) : new Date();

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += lastMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  if (years < 0) return 'Geçersiz Tarih';
  if (years > 0) return `${years} yıl ${months > 0 ? months + ' ay' : ''}`;
  if (months > 0) return `${months} ay ${days > 0 ? days + ' gün' : ''}`;
  return `${days} gün`;
};

// PDF için Türkçe karakter düzeltici (Çıktıda  çıkmasını engeller)
const normalizeText = (text: string | null | undefined) => {
  if (!text) return '';
  return String(text)
    .replace(/Ğ/g, 'G').replace(/Ü/g, 'U').replace(/Ş/g, 'S')
    .replace(/İ/g, 'I').replace(/Ö/g, 'O').replace(/Ç/g, 'C')
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c');
};

// --- INITIAL STATE ---
const initialFormData: FormData = {
  id: '',
  patientId: '',
  formType: 'pediatri',
  lastModified: '',
  
  kimlik_adSoyad: '', kimlik_tc: '', kimlik_dosyaNo: '',
  kimlik_dogumTarihi: '', kimlik_yas: '', kimlik_yas_manuel: false,
  kimlik_cinsiyet: '', kimlik_adres: '',
  kimlik_gorusmeTarihi: getTodayDate(),
  kimlik_informant: '', kimlik_guvenilirlik: '',

  vital_genelDurum: '', vital_ates: '', vital_nabiz: '', vital_tansiyon: '',
  vital_solunum: '', vital_kilo: '', vital_boy: '', vital_basCevresi: '',

  // Pediatri
  ped_sikayet: '', ped_sure: '', ped_sonSaglikliZaman: '',
  ped_onset: '', ped_location: '', ped_duration: '', ped_character: '',
  ped_aggravating: '', ped_related: '', ped_timing: '', ped_severity: '', ped_agriSkoru: '',
  ped_gravidaPara: '', ped_gebelikHastalik: '', ped_prenatalTarama: '',
  ped_anneKanGrubu: '', ped_babaKanGrubu: '',
  ped_gebelikHaftasi: '', ped_dogumSekli: '',
  ped_apgar: '', ped_resusitasyon: '',
  ped_dogumKiloBoy: '', ped_mekonyum: '', ped_sarilik: '', ped_topukKani: '',
  ped_anneSutu: '', ped_formulMama: '', ped_ekGida: '',
  ped_asiUyum: '', ped_ozelAsi: '', ped_gecirilmisHastalik: '', ped_alerji: '',
  ped_motor: '', ped_dil: '', ped_bilissel: '',
  ped_akraba: '', ped_akraba_detay: '',
  ped_ebeveynSaglik: '', ped_aileKronik: '', ped_bebekOlum: '', ped_sosyalDurum: '',
  
  ped_rosGenel: 'Hayır', ped_rosGenel_detay: '',
  ped_rosDeri: 'Hayır', ped_rosDeri_detay: '',
  ped_rosHEENT: 'Hayır', ped_rosHEENT_detay: '',
  ped_rosSolunum: 'Hayır', ped_rosSolunum_detay: '',
  ped_rosKVS: 'Hayır', ped_rosKVS_detay: '',
  ped_rosGI: 'Hayır', ped_rosGI_detay: '',
  ped_rosGU: 'Hayır', ped_rosGU_detay: '',
  ped_rosNorolojik: 'Hayır', ped_rosNorolojik_detay: '',
  
  ped_fmCilt: '', ped_fmCilt_detay: '',
  ped_fmHEENT: '', ped_fmHEENT_detay: '',
  ped_fmSolunum: '', ped_fmSolunum_detay: '',
  ped_fmKVS: '', ped_fmKVS_detay: '',
  ped_fmBatin: '', ped_fmBatin_detay: '',
  ped_fmEndokrin: '', ped_fmEndokrin_detay: '',
  ped_fmKasIskelet: '', ped_fmKasIskelet_detay: '',
  ped_fmNoro: '', ped_fmNoro_detay: '',

  // Romatoloji
  rom_anaYakinma: '', rom_toplamSure: '', rom_akutMuKornikMi: '',
  rom_baslangic: '', rom_belAgrisi: '', rom_inflamatuarMekanik: '',
  rom_sabahTutuklugu: '', rom_sabahTutukluguSuresi: '', rom_agriHafifleme: '',
  rom_mekanikSiddetlenme: '', rom_idiyopatikGece: '',
  rom_eklemSayisi: '', rom_simetrikMi: '', rom_migratuvarMi: '',
  rom_geceUykudanUyandiran: '', rom_tetikleyiciEnfeksiyon: '',
  rom_atesPaterni: '', 
  rom_kiloKaybi: '', rom_kiloKaybi_detay: '',
  rom_ciltSLE: '', rom_ciltSLE_detay: '',
  rom_ciltHSP: '', rom_ciltHSP_detay: '',
  rom_ciltPsoriatik: '', rom_ciltPsoriatik_detay: '',
  rom_giSemptom: '', rom_giSemptom_detay: '',
  rom_gozSemptom: '', rom_gozSemptom_detay: '',
  rom_guSemptom: '', rom_guSemptom_detay: '',
  rom_kronikEnfeksiyon: '', rom_kronikEnfeksiyon_detay: '',
  rom_ilacKullanimi: '', 
  rom_aileRomatizma: '', rom_aileRomatizma_detay: '',
  rom_aileDiyaliz: '', rom_aileDiyaliz_detay: '',
  rom_aileFMF: '', rom_aileFMF_detay: '',
  
  rom_fmLook: '', rom_fmLook_detay: '',
  rom_fmFeel: '', rom_fmFeel_detay: '',
  rom_fmMove: '', rom_fmMove_detay: '',
  rom_fmSistemik: '', rom_fmSistemik_detay: '',
};

// --- PURE UI COMPONENTS ---
const SectionHeader = ({ title }: { title: string }) => (
  <div className="bg-slate-800 text-white p-2 mt-6 mb-4 rounded shadow-sm font-bold uppercase text-sm">
    {title}
  </div>
);

const SubHeader = ({ title }: { title: string }) => (
  <h3 className="font-semibold text-slate-700 mt-4 mb-2 border-b border-slate-200 pb-1">{title}</h3>
);

const InputGroup = ({ label, name, value, onChange, type = "text", placeholder = "", width = "w-full" }: any) => (
  <div className={`${width} p-1 shrink-0`}>
    <label className="block text-xs font-semibold text-slate-600 mb-1 truncate">{label}</label>
    <input
      type={type} name={name} value={value || ''} onChange={onChange} placeholder={placeholder}
      className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const SelectGroup = ({ label, name, value, onChange, options, width = "w-full" }: any) => (
  <div className={`${width} p-1 shrink-0`}>
    <label className="block text-xs font-semibold text-slate-600 mb-1 truncate">{label}</label>
    <select name={name} value={value || ''} onChange={onChange} className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
      <option value="">Seçiniz...</option>
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const TextAreaGroup = ({ label, name, value, onChange, rows = 2, width = "w-full" }: any) => (
  <div className={`${width} p-1 mt-1 shrink-0`}>
    <label className="block text-xs font-semibold text-slate-600 mb-1 truncate">{label}</label>
    <textarea
      name={name} value={value || ''} onChange={onChange} rows={rows}
      className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
    />
  </div>
);

const RadioGroup = ({ label, name, value, options, onChange, width = "w-full" }: any) => (
  <div className={`${width} p-1 mt-1 shrink-0`}>
    {label && <label className="block text-xs font-semibold text-slate-600 mb-1 truncate">{label}</label>}
    <div className="flex flex-wrap gap-4 mt-1">
      {options.map((opt: any) => (
        <label key={opt.value} className="flex items-center space-x-2 text-sm cursor-pointer whitespace-nowrap">
          <input
            type="radio" name={name} value={opt.value} checked={value === opt.value}
            onChange={() => onChange(name, opt.value)}
            className="text-blue-600 focus:ring-blue-500 w-4 h-4"
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const YesNoDetail = ({ label, radioName, detailName, radioValue, detailValue, onChangeRadio, onChangeDetail, isExam = false }: any) => (
  <div className="mb-3 p-3 bg-slate-50 border border-slate-200 rounded-lg w-full">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
      <span className="text-sm font-semibold text-slate-700 w-full sm:w-1/2">{label}</span>
      <div className="w-full sm:w-1/2 flex sm:justify-end">
        <RadioGroup 
          name={radioName} value={radioValue} width="w-auto"
          options={isExam ? [{label:'Evet (Anormal)', value:'Evet'}, {label:'Hayır (Doğal)', value:'Hayır'}] : [{label:'Evet', value:'Evet'}, {label:'Hayır', value:'Hayır'}]} 
          onChange={onChangeRadio} 
        />
      </div>
    </div>
    {radioValue === 'Evet' && (
      <div className="mt-2 animate-fadeIn w-full">
        <TextAreaGroup label="Detaylar/Açıklama:" name={detailName} value={detailValue} onChange={onChangeDetail} rows={1} width="w-full" />
      </div>
    )}
  </div>
);

const RosItem = ({ systemName, symptoms, radioName, detailName, radioValue, detailValue, onChangeRadio, onChangeDetail }: any) => (
  <div className="mb-3 p-4 bg-slate-50 border border-slate-200 rounded-lg w-full flex flex-col justify-between">
    <div className="flex flex-col mb-3">
      <span className="text-sm font-bold text-slate-800">{systemName}</span>
      <span className="text-xs text-slate-500 italic mt-1 leading-relaxed">{symptoms}</span>
    </div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-slate-200 pt-3 mt-auto gap-2">
      <span className="text-xs font-bold text-slate-600">Bulgu var mı?</span>
      <RadioGroup 
        name={radioName} value={radioValue} width="w-auto"
        options={[{label:'Evet', value:'Evet'}, {label:'Hayır', value:'Hayır'}]} 
        onChange={onChangeRadio} 
      />
    </div>
    {radioValue === 'Evet' && (
      <div className="mt-3 animate-fadeIn w-full">
        <TextAreaGroup label="Pozitif Bulguları Detaylandırın:" name={detailName} value={detailValue} onChange={onChangeDetail} rows={1} width="w-full" />
      </div>
    )}
  </div>
);


// --- MAIN APPLICATION ---
export default function HastaAnamnezMiniApp() {
  const [activeTab, setActiveTab] = useState<'pediatri' | 'romatoloji'>('pediatri');
  const [savedFiles, setSavedFiles] = useState<FormData[]>([]);
  const [formData, setFormData] = useState<FormData>({ ...initialFormData });
  const [expandedPatients, setExpandedPatients] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // PDF Modali için state'ler
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportRange, setExportRange] = useState({ start: '', end: '', includeAll: false });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('klinikApp_files');
      if (stored) setSavedFiles(JSON.parse(stored));
    } catch (e) { console.error(e); }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      if (name === 'kimlik_yas') {
        newData.kimlik_yas_manuel = true;
      }
      if (name === 'kimlik_dogumTarihi' || name === 'kimlik_gorusmeTarihi') {
        newData.kimlik_yas_manuel = false;
        newData.kimlik_yas = calculateAge(newData.kimlik_dogumTarihi, newData.kimlik_gorusmeTarihi);
      }
      
      return newData;
    });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewFile = () => {
    if (window.confirm("Kaydedilmemiş verileriniz silinecektir. Yeni dosya açmak istiyor musunuz?")) {
      setFormData({ ...initialFormData, formType: activeTab, kimlik_gorusmeTarihi: getTodayDate() });
    }
  };

  const handleSave = () => {
    if (!formData.kimlik_adSoyad && !formData.kimlik_dosyaNo) {
      alert("Lütfen en azından hastanın 'Adı Soyadı' veya 'Dosya No' bilgisini giriniz.");
      return;
    }

    const newFiles = [...savedFiles];
    const now = new Date().toLocaleString('tr-TR');
    const pId = formData.kimlik_dosyaNo ? formData.kimlik_dosyaNo.trim() : formData.kimlik_adSoyad.trim().toLowerCase();

    const recordToSave = { 
      ...formData, 
      id: formData.id || Date.now().toString(),
      patientId: pId,
      lastModified: now,
      formType: activeTab 
    };

    if (formData.id) {
      const index = newFiles.findIndex(f => f.id === formData.id);
      if (index !== -1) newFiles[index] = recordToSave;
    } else {
      newFiles.push(recordToSave);
    }

    setSavedFiles(newFiles);
    setFormData(recordToSave);
    localStorage.setItem('klinikApp_files', JSON.stringify(newFiles));
    alert("Dosya başarıyla kaydedildi.");
  };

  const loadFile = (file: FormData) => {
    if (formData.kimlik_adSoyad && formData.id !== file.id && !window.confirm("Mevcut formu kapatıp seçilen kaydı açmak istiyor musunuz?")) return;
    setFormData(file);
    setActiveTab(file.formType || 'pediatri');
    if(window.innerWidth < 1024) setSidebarOpen(false);
  };

  const deleteFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Bu kayıt kalıcı olarak silinecektir. Emin misiniz?")) {
      const updated = savedFiles.filter(f => f.id !== id);
      setSavedFiles(updated);
      localStorage.setItem('klinikApp_files', JSON.stringify(updated));
      if (formData.id === id) {
        setFormData({ ...initialFormData });
      }
    }
  };

  // --- GELİŞMİŞ VE PROFESYONEL PDF DIŞA AKTARMA FONKSİYONU ---
  const exportPDF = () => {
    const doc = new jsPDF() as jsPDFWithAutoTable;
    
    let filesToExport = exportRange.includeAll 
      ? savedFiles.filter(f => {
          if (!exportRange.start || !exportRange.end) return true;
          const date = new Date(f.kimlik_gorusmeTarihi);
          return date >= new Date(exportRange.start) && date <= new Date(exportRange.end);
        })
      : [formData];

    if (filesToExport.length === 0 || !filesToExport[0].kimlik_adSoyad) {
      alert("Dışa aktarılacak geçerli/kaydedilmiş bir dosya bulunamadı.");
      return;
    }

    filesToExport.forEach((f, index) => {
      if(index > 0) doc.addPage();
      let currentY = 20;

      // Ana Başlık
      doc.setFontSize(16);
      doc.setTextColor(30, 58, 138); // Koyu Mavi
      doc.text(normalizeText("KLINIK ANAMNEZ VE MUAYENE RAPORU"), 105, currentY, { align: 'center' });
      currentY += 8;

      // Alt Başlık
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(normalizeText(`Form Tipi: ${f.formType === 'pediatri' ? 'Genel Pediatri' : 'Cocuk Romatoloji'}  |  Cikti Tarihi: ${new Date().toLocaleString('tr-TR')}`), 105, currentY, { align: 'center' });
      currentY += 12;

      // PDF İÇİN YARDIMCI FONKSİYONLAR
      const val = (k: string) => normalizeText(f[k] ? String(f[k]) : '-');
      const ynVal = (r: string, d: string) => {
        if (!f[r]) return '-';
        if (f[r] === 'Hayır') return 'Hayir';
        return normalizeText(`Evet${f[d] ? ` (${f[d]})` : ''}`);
      };
      const fmVal = (r: string, d: string) => {
        if (!f[r]) return 'Degerlendirilmemis';
        if (f[r] === 'Hayır') return 'Dogal ya da ozelliksiz';
        return normalizeText(f[d] ? String(f[d]) : 'Detay belirtilmemis');
      };

      // Tablo Çizici Fonksiyon
      const drawSection = (title: string, data: string[][]) => {
        doc.autoTable({
          startY: currentY,
          head: [[{ content: normalizeText(title), colSpan: 2, styles: { halign: 'left', fillColor: [79, 70, 229], textColor: 255 } }]],
          body: data,
          theme: 'grid',
          headStyles: { fontStyle: 'bold', fontSize: 10 },
          bodyStyles: { fontSize: 9, cellPadding: 2, textColor: [30, 41, 59] },
          columnStyles: { 0: { fontStyle: 'bold', cellWidth: 70, fillColor: [248, 250, 252] } },
          margin: { left: 14, right: 14 }
        });
        currentY = doc.lastAutoTable.finalY + 6;
      };

      // 1. KİMLİK BİLGİLERİ (ORTAK)
      drawSection('1. KIMLIK BILGILERI VE DEMOGRAFI', [
        ['Dosya No / TC Kimlik No', `${val('kimlik_dosyaNo')} / ${val('kimlik_tc')}`],
        ['Hasta Adi Soyadi', val('kimlik_adSoyad')],
        ['Dogum Tarihi / Yasi', `${val('kimlik_dogumTarihi')} / ${val('kimlik_yas')}`],
        ['Cinsiyeti', val('kimlik_cinsiyet')],
        ['Gorusme Tarihi', val('kimlik_gorusmeTarihi')],
        ['Informant / Guvenilirlik', `${val('kimlik_informant')} / ${val('kimlik_guvenilirlik')}`],
        ['Guncel Adres', val('kimlik_adres')],
      ]);

      // 2. VİTAL BULGULAR (ORTAK)
      drawSection('2. VITAL BULGULAR VE ANTROPOMETRI', [
        ['Genel Durum', val('vital_genelDurum')],
        ['Ates / Nabiz / Tansiyon', `${val('vital_ates')} C / ${val('vital_nabiz')} /dk / ${val('vital_tansiyon')} mmHg`],
        ['Solunum Hizi', `${val('vital_solunum')} /dk`],
        ['Kilo / Boy / Bas Cevresi', `${val('vital_kilo')} kg / ${val('vital_boy')} cm / ${val('vital_basCevresi')} cm`],
      ]);

      // FORMA GÖRE DEĞİŞEN ALANLAR
      if (f.formType === 'pediatri') {
        drawSection('3. BASVURU NEDENI & HASTALIK OYKUSU', [
          ['Ana Sikayet', val('ped_sikayet')],
          ['Sure / Son Saglikli Zaman', `${val('ped_sure')} / ${val('ped_sonSaglikliZaman')}`],
          ['Agri Skoru', val('ped_agriSkoru')],
          ['OLD CARTS (Baslangic/Sure)', `${val('ped_onset')} / ${val('ped_duration')}`],
          ['OLD CARTS (Yerlesim/Karakter)', `${val('ped_location')} / ${val('ped_character')}`],
          ['OLD CARTS (Artiran/Azaltan)', val('ped_aggravating')],
          ['OLD CARTS (Iliskili/Siddet)', `${val('ped_related')} / ${val('ped_severity')}`]
        ]);

        drawSection('4. OZGECMIS (Prenatal, Natal, Postnatal)', [
          ['Gebelik (Gravida/Para)', val('ped_gravidaPara')],
          ['Anne / Baba Kan Grubu', `${val('ped_anneKanGrubu')} / ${val('ped_babaKanGrubu')}`],
          ['Gebelik Hastaliklari/Ilaclar', val('ped_gebelikHastalik')],
          ['Dogum Sekli / Haftasi', `${val('ped_dogumSekli')} / ${val('ped_gebelikHaftasi')}`],
          ['Apgar / Resusitasyon', `${val('ped_apgar')} / ${val('ped_resusitasyon')}`],
          ['Dogum Kilo, Boy, B.Cevresi', val('ped_dogumKiloBoy')],
          ['Mekonyum/Sarilik/Tarama', `${val('ped_mekonyum')} / ${val('ped_sarilik')} / ${val('ped_topukKani')}`]
        ]);

        drawSection('5. BESLENME, BAGISIKLAMA VE ALERJI', [
          ['Anne Sutu/Mama/Ek Gida', `${val('ped_anneSutu')} / ${val('ped_formulMama')} / ${val('ped_ekGida')}`],
          ['Ulusal / Ozel Asilar', `${val('ped_asiUyum')} / ${val('ped_ozelAsi')}`],
          ['Gecirilmis Hastalik/Cerrahi', val('ped_gecirilmisHastalik')],
          ['Alerjiler', val('ped_alerji')]
        ]);

        drawSection('6. GELISIM, SOYGECMIS VE SOSYAL', [
          ['Gelisim (Motor/Dil/Bilissel)', `${val('ped_motor')} / ${val('ped_dil')} / ${val('ped_bilissel')}`],
          ['Akraba Evliligi', ynVal('ped_akraba', 'ped_akraba_detay')],
          ['Ebeveyn / Kardes Sagligi', val('ped_ebeveynSaglik')],
          ['Ailede Kronik Hastaliklar', val('ped_aileKronik')],
          ['Sosyal Cevre (IHELLP)', val('ped_sosyalDurum')]
        ]);

        drawSection('7. SISTEMLERIN GOZDEN GECIRILMESI (ROS)', [
          ['Genel', ynVal('ped_rosGenel', 'ped_rosGenel_detay')],
          ['Deri', ynVal('ped_rosDeri', 'ped_rosDeri_detay')],
          ['Bas-Boyun (HEENT)', ynVal('ped_rosHEENT', 'ped_rosHEENT_detay')],
          ['Solunum', ynVal('ped_rosSolunum', 'ped_rosSolunum_detay')],
          ['Kardiyovaskuler', ynVal('ped_rosKVS', 'ped_rosKVS_detay')],
          ['Gastrointestinal', ynVal('ped_rosGI', 'ped_rosGI_detay')],
          ['Genitouriner', ynVal('ped_rosGU', 'ped_rosGU_detay')],
          ['Kas-Iskelet / Norolojik', ynVal('ped_rosNorolojik', 'ped_rosNorolojik_detay')]
        ]);

        drawSection('8. SISTEMIK FIZIK MUAYENE', [
          ['Cilt, Sac, Tirnak', fmVal('ped_fmCilt', 'ped_fmCilt_detay')],
          ['Bas ve Boyun (HEENT)', fmVal('ped_fmHEENT', 'ped_fmHEENT_detay')],
          ['Solunum Sistemi', fmVal('ped_fmSolunum', 'ped_fmSolunum_detay')],
          ['Kardiyovaskuler', fmVal('ped_fmKVS', 'ped_fmKVS_detay')],
          ['Batin ve Genitalya', fmVal('ped_fmBatin', 'ped_fmBatin_detay')],
          ['Endokrin (Tanner)', fmVal('ped_fmEndokrin', 'ped_fmEndokrin_detay')],
          ['Kas-Iskelet Sistemi', fmVal('ped_fmKasIskelet', 'ped_fmKasIskelet_detay')],
          ['Norolojik Muayene', fmVal('ped_fmNoro', 'ped_fmNoro_detay')]
        ]);

      } else {
        // ROMATOLOJİ FORMU ÇIKTISI
        drawSection('3. ROMATOLOJIK BASVURU NEDENI', [
          ['Ana Yakinma', val('rom_anaYakinma')],
          ['Sikayet Suresi / Tip', `${val('rom_toplamSure')} (${val('rom_akutMuKornikMi')})`],
          ['Baslangic Sekli', val('rom_baslangic')],
          ['Bel Agrisi (<5 Yas)', val('rom_belAgrisi')]
        ]);

        drawSection('4. AGRI KARAKTERI VE TUTULUM PATERNI', [
          ['Agri Tipi (Suphe)', val('rom_inflamatuarMekanik')],
          ['Sabah Tutuklugu', `${val('rom_sabahTutuklugu')} (${val('rom_sabahTutukluguSuresi')} dk)`],
          ['Eforla Hafifleme/Siddetlenme', `${val('rom_agriHafifleme')} / ${val('rom_mekanikSiddetlenme')}`],
          ['Gece Masajla Hafifleme', val('rom_idiyopatikGece')],
          ['Tutulan Eklem Sayisi', val('rom_eklemSayisi')],
          ['Simetrik / Gezici', `${val('rom_simetrikMi')} / ${val('rom_migratuvarMi')}`],
          ['Gece Uyandiran Agri', val('rom_geceUykudanUyandiran')],
          ['Tetikleyici Enfeksiyon Oykusu', val('rom_tetikleyiciEnfeksiyon')]
        ]);

        drawSection('5. SISTEMIK VE EKSTRA-ARTIKULER BULGULAR', [
          ['Ates Paterni', val('rom_atesPaterni')],
          ['Kilo Kaybi', ynVal('rom_kiloKaybi', 'rom_kiloKaybi_detay')],
          ['Cilt Bulgusu (SLE/HSP/Psor.)', `SLE: ${ynVal('rom_ciltSLE', 'rom_ciltSLE_detay')} | HSP: ${ynVal('rom_ciltHSP', 'rom_ciltHSP_detay')} | Psoriatik: ${ynVal('rom_ciltPsoriatik', 'rom_ciltPsoriatik_detay')}`],
          ['Gastrointestinal', ynVal('rom_giSemptom', 'rom_giSemptom_detay')],
          ['Goz (Uveit vb.)', ynVal('rom_gozSemptom', 'rom_gozSemptom_detay')],
          ['Genitouriner', ynVal('rom_guSemptom', 'rom_guSemptom_detay')]
        ]);

        drawSection('6. ROMATOLOJI ODAKLI OZGECMIS/SOYGECMIS', [
          ['Kullanilan Ilaclar', val('rom_ilacKullanimi')],
          ['Kronik Enfeksiyon', ynVal('rom_kronikEnfeksiyon', 'rom_kronikEnfeksiyon_detay')],
          ['Ailede Romatizma vb.', ynVal('rom_aileRomatizma', 'rom_aileRomatizma_detay')],
          ['Ailede Erken Diyaliz', ynVal('rom_aileDiyaliz', 'rom_aileDiyaliz_detay')],
          ['Ailede FMF/Periyodik Ates', ynVal('rom_aileFMF', 'rom_aileFMF_detay')]
        ]);

        drawSection('7. KAS-ISKELET VE SISTEMIK FIZIK MUAYENE', [
          ['Inspeksiyon (Look)', fmVal('rom_fmLook', 'rom_fmLook_detay')],
          ['Palpasyon (Feel)', fmVal('rom_fmFeel', 'rom_fmFeel_detay')],
          ['Hareket (Move)', fmVal('rom_fmMove', 'rom_fmMove_detay')],
          ['Sistemik Muayene', fmVal('rom_fmSistemik', 'rom_fmSistemik_detay')]
        ]);
      }
    });

    doc.save(`Anamnez_Raporu_${getTodayDate()}.pdf`);
    setShowExportModal(false);
  };

  const groupedPatients = useMemo(() => {
    const groups: Record<string, FormData[]> = {};
    savedFiles.forEach(f => {
      const key = f.patientId || 'Bilinmeyen';
      if (!groups[key]) groups[key] = [];
      groups[key].push(f);
    });
    Object.keys(groups).forEach(k => {
      groups[k].sort((a, b) => new Date(b.kimlik_gorusmeTarihi).getTime() - new Date(a.kimlik_gorusmeTarihi).getTime());
    });
    return groups;
  }, [savedFiles]);

  const togglePatientExpand = (pId: string) => {
    setExpandedPatients(prev => ({ ...prev, [pId]: !prev[pId] }));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans text-slate-800 selection:bg-blue-200 overflow-hidden">
      
      {/* SIDEBAR */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-0 overflow-hidden'} shrink-0 bg-slate-900 text-white flex flex-col h-screen sticky top-0 transition-all duration-300 z-20`}>
        <div className="p-4 border-b border-slate-700 bg-slate-950 flex justify-between items-center whitespace-nowrap">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-blue-400" />
            Klinik Arşiv
          </h1>
          <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-slate-800 rounded lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 min-w-[16rem]">
          <button onClick={handleNewFile} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2.5 px-4 rounded-md text-sm font-semibold transition-all shadow-md">
            <FilePlus className="w-4 h-4" /> Yeni Hasta / Form
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 min-w-[16rem]">
          <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Kayıtlı Hastalar</h2>
          {Object.keys(groupedPatients).length === 0 ? (
            <p className="text-xs text-slate-500 italic px-1">Henüz kayıt yok.</p>
          ) : (
            <div className="space-y-1">
              {Object.entries(groupedPatients).map(([pId, records]) => {
                const latestRecord = records[0];
                const displayName = latestRecord.kimlik_adSoyad || 'İsimsiz';
                const isExpanded = expandedPatients[pId];

                return (
                  <div key={pId} className="bg-slate-800/40 rounded-lg overflow-hidden border border-slate-700/50">
                    <button 
                      onClick={() => togglePatientExpand(pId)}
                      className="w-full flex items-center justify-between p-3 hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FolderOpen className="w-4 h-4 text-blue-400 shrink-0" />
                        <div className="flex flex-col text-left truncate">
                          <span className="text-sm font-semibold text-slate-200 truncate">{displayName}</span>
                          <span className="text-[10px] text-slate-400">Dosya No: {latestRecord.kimlik_dosyaNo || '-'}</span>
                        </div>
                      </div>
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                    </button>
                    
                    {isExpanded && (
                      <div className="bg-slate-900/50 border-t border-slate-800">
                        {records.map(record => (
                          <div 
                            key={record.id}
                            className={`w-full text-left py-2 px-4 pl-9 text-xs flex justify-between items-center border-l-2 transition-colors cursor-pointer ${formData.id === record.id ? 'border-blue-500 bg-slate-800 text-white' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'}`}
                            onClick={() => loadFile(record)}
                          >
                            <div className="flex flex-col gap-0.5">
                              <span className="font-medium flex items-center gap-1.5">
                                 <History className="w-3 h-3" /> {record.kimlik_gorusmeTarihi}
                              </span>
                              <span className="text-[10px] opacity-80">{record.formType === 'pediatri' ? 'Genel Pediatri' : 'Çocuk Romatoloji'}</span>
                            </div>
                            <button onClick={(e) => deleteFile(record.id, e)} className="text-red-400 hover:text-red-500 p-1 hover:bg-slate-700 rounded transition-colors" title="Kaydı Sil">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
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
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden relative">
        
        {/* TOP ACTION BAR - ESNEK/RESPONSIVE */}
        <div className="bg-white shadow-sm border-b border-slate-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 z-10">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-md shrink-0">
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="flex flex-wrap sm:flex-nowrap bg-slate-100 p-1 rounded-lg flex-1 sm:flex-none w-full sm:w-auto">
              <button onClick={() => { setActiveTab('pediatri'); setFormData(p => ({...p, formType: 'pediatri'})) }} className={`flex-1 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all ${activeTab === 'pediatri' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}>
                Genel Pediatri
              </button>
              <button onClick={() => { setActiveTab('romatoloji'); setFormData(p => ({...p, formType: 'romatoloji'})) }} className={`flex-1 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all ${activeTab === 'romatoloji' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}>
                Romatoloji
              </button>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button onClick={() => setShowExportModal(true)} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-semibold transition-colors shadow-sm">
              <Download className="w-4 h-4" /> PDF İndir
            </button>
            <button onClick={handleSave} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-semibold transition-colors shadow-sm">
              <Save className="w-4 h-4" /> Kaydet
            </button>
          </div>
        </div>

        {/* SCROLLABLE FORM AREA */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-100 p-4 sm:p-6">
          
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-7xl mx-auto p-4 sm:p-8">
            
            {/* 1. ORTAK KİMLİK BİLGİLERİ */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 mb-6">
              <SectionHeader title="I. KİMLİK BİLGİLERİ VE DEMOGRAFİ" />
              <div className="flex flex-wrap -mx-1">
                <InputGroup label="Dosya / Hasta No" name="kimlik_dosyaNo" value={formData.kimlik_dosyaNo} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/3" />
                <InputGroup label="Hastanın Adı Soyadı" name="kimlik_adSoyad" value={formData.kimlik_adSoyad} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/3" />
                <InputGroup label="TC Kimlik No" name="kimlik_tc" value={formData.kimlik_tc} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/3" />
                
                <InputGroup label="Başvuru/Görüşme Tarihi" name="kimlik_gorusmeTarihi" type="date" value={formData.kimlik_gorusmeTarihi} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/4" />
                <InputGroup label="Doğum Tarihi" name="kimlik_dogumTarihi" type="date" value={formData.kimlik_dogumTarihi} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/4" />
                <InputGroup label="Kesin Yaşı (Oto/Manuel)" name="kimlik_yas" value={formData.kimlik_yas} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/4" />
                <SelectGroup label="Cinsiyeti" name="kimlik_cinsiyet" value={formData.kimlik_cinsiyet} onChange={handleInputChange} options={['Kız', 'Erkek']} width="w-full md:w-1/2 lg:w-1/4" />
                
                <InputGroup label="Bilgiyi Veren Kişi (Yakınlığı)" name="kimlik_informant" value={formData.kimlik_informant} onChange={handleInputChange} width="w-full lg:w-1/2" />
                <InputGroup label="Bilginin Güvenilirliği (Bariyer vb.)" name="kimlik_guvenilirlik" value={formData.kimlik_guvenilirlik} onChange={handleInputChange} width="w-full lg:w-1/2" />
                <InputGroup label="Doğum Yeri ve Güncel Adresi" name="kimlik_adres" value={formData.kimlik_adres} onChange={handleInputChange} width="w-full" />
              </div>
            </div>

            {/* TAB 1: PEDİATRİ */}
            {activeTab === 'pediatri' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="II. BAŞVURU NEDENİ & III. MEVCUT HASTALIK ÖYKÜSÜ" />
                  <div className="flex flex-wrap -mx-1">
                    <TextAreaGroup label="Şikayet (Ana Yakınma)" name="ped_sikayet" value={formData.ped_sikayet} onChange={handleInputChange} width="w-full" />
                    <InputGroup label="Şikayetin Süresi" name="ped_sure" value={formData.ped_sure} onChange={handleInputChange} width="w-full md:w-1/2" />
                    <InputGroup label="En Son Tam Sağlıklı Hissedilen Zaman" name="ped_sonSaglikliZaman" value={formData.ped_sonSaglikliZaman} onChange={handleInputChange} width="w-full md:w-1/2" />
                  </div>
                  <SubHeader title="OLD CARTS Analizi" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                    <TextAreaGroup label="Başlangıç (Onset)" name="ped_onset" value={formData.ped_onset} onChange={handleInputChange} rows={1}/>
                    <TextAreaGroup label="Yerleşim/Yayılım (Location/Radiation)" name="ped_location" value={formData.ped_location} onChange={handleInputChange} rows={1}/>
                    <TextAreaGroup label="Süre (Duration)" name="ped_duration" value={formData.ped_duration} onChange={handleInputChange} rows={1}/>
                    <TextAreaGroup label="Karakter (Character)" name="ped_character" value={formData.ped_character} onChange={handleInputChange} rows={1}/>
                    <TextAreaGroup label="Artıran/Azaltan Faktörler" name="ped_aggravating" value={formData.ped_aggravating} onChange={handleInputChange} rows={1}/>
                    <TextAreaGroup label="İlişkili Semptomlar" name="ped_related" value={formData.ped_related} onChange={handleInputChange} rows={1}/>
                    <TextAreaGroup label="Zamanlama (Timing)" name="ped_timing" value={formData.ped_timing} onChange={handleInputChange} rows={1}/>
                    <TextAreaGroup label="Şiddet (Severity) / Uyku-Oyun" name="ped_severity" value={formData.ped_severity} onChange={handleInputChange} rows={1}/>
                  </div>
                  <div className="mt-4 flex -mx-1">
                    <InputGroup label="Ağrı Skoru (FACES/VAS)" name="ped_agriSkoru" value={formData.ped_agriSkoru} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/3" />
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="IV. ÖZGEÇMİŞ (PMH)" />
                  <SubHeader title="Prenatal & Natal (Doğum Öncesi ve Doğum)" />
                  <div className="flex flex-wrap -mx-1">
                    <InputGroup label="Gebelik Sayısı/Sonuçları (Gravida, Para)" name="ped_gravidaPara" value={formData.ped_gravidaPara} onChange={handleInputChange} width="w-full lg:w-1/2" />
                    <SelectGroup label="Anne Kan Grubu" name="ped_anneKanGrubu" value={formData.ped_anneKanGrubu} onChange={handleInputChange} options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} width="w-full md:w-1/2 lg:w-1/4" />
                    <SelectGroup label="Baba Kan Grubu" name="ped_babaKanGrubu" value={formData.ped_babaKanGrubu} onChange={handleInputChange} options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} width="w-full md:w-1/2 lg:w-1/4" />
                    
                    <TextAreaGroup label="Hastalıklar ve İlaç Kullanımı" name="ped_gebelikHastalik" value={formData.ped_gebelikHastalik} onChange={handleInputChange} rows={1} width="w-full lg:w-1/2" />
                    <TextAreaGroup label="Tarama Testleri (TORCH vb.)" name="ped_prenatalTarama" value={formData.ped_prenatalTarama} onChange={handleInputChange} rows={1} width="w-full lg:w-1/2" />
                    
                    <InputGroup label="Gebelik Haftası" name="ped_gebelikHaftasi" value={formData.ped_gebelikHaftasi} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/4" />
                    <InputGroup label="Doğum Şekli/Endikasyonu" name="ped_dogumSekli" value={formData.ped_dogumSekli} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/4" />
                    <InputGroup label="APGAR" name="ped_apgar" value={formData.ped_apgar} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/4" />
                    <InputGroup label="Resüsitasyon İhtiyacı" name="ped_resusitasyon" value={formData.ped_resusitasyon} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/4" />
                  </div>

                  <SubHeader title="Postnatal, Beslenme ve Bağışıklama" />
                  <div className="flex flex-wrap -mx-1">
                    <InputGroup label="Doğum Ağırlığı/Boyu/Baş Çevresi" name="ped_dogumKiloBoy" value={formData.ped_dogumKiloBoy} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/4" />
                    <InputGroup label="İlk İdrar/Mekonyum Zamanı" name="ped_mekonyum" value={formData.ped_mekonyum} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/4" />
                    <InputGroup label="Sarılık/NICU Yatışı" name="ped_sarilik" value={formData.ped_sarilik} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/4" />
                    <InputGroup label="Topuk Kanı/İşitme/KKH Tarama" name="ped_topukKani" value={formData.ped_topukKani} onChange={handleInputChange} width="w-full md:w-1/2 lg:w-1/4" />
                    
                    <TextAreaGroup label="Anne Sütü" name="ped_anneSutu" value={formData.ped_anneSutu} onChange={handleInputChange} rows={1} width="w-full lg:w-1/3" />
                    <TextAreaGroup label="Formül Mama" name="ped_formulMama" value={formData.ped_formulMama} onChange={handleInputChange} rows={1} width="w-full lg:w-1/3" />
                    <TextAreaGroup label="Ek Gıda / Tolerans" name="ped_ekGida" value={formData.ped_ekGida} onChange={handleInputChange} rows={1} width="w-full lg:w-1/3" />
                    
                    <InputGroup label="Ulusal Aşı Uyumu" name="ped_asiUyum" value={formData.ped_asiUyum} onChange={handleInputChange} width="w-full md:w-1/2" />
                    <InputGroup label="Özel Aşılar" name="ped_ozelAsi" value={formData.ped_ozelAsi} onChange={handleInputChange} width="w-full md:w-1/2" />
                    
                    <TextAreaGroup label="Geçirilmiş Hastalıklar/Cerrahi" name="ped_gecirilmisHastalik" value={formData.ped_gecirilmisHastalik} onChange={handleInputChange} rows={1} width="w-full lg:w-1/2" />
                    <TextAreaGroup label="Alerjiler (İlaç, Gıda, Çevre)" name="ped_alerji" value={formData.ped_alerji} onChange={handleInputChange} rows={1} width="w-full lg:w-1/2" />
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="V. GELİŞİMSEL & VI. SOYGEÇMİŞ" />
                  <div className="flex flex-wrap -mx-1">
                    <InputGroup label="Motor Gelişim" name="ped_motor" value={formData.ped_motor} onChange={handleInputChange} width="w-full md:w-1/3" />
                    <InputGroup label="Dil Gelişimi" name="ped_dil" value={formData.ped_dil} onChange={handleInputChange} width="w-full md:w-1/3" />
                    <InputGroup label="Bilişsel/Sosyal (M-CHAT)" name="ped_bilissel" value={formData.ped_bilissel} onChange={handleInputChange} width="w-full md:w-1/3" />
                    
                    <div className="w-full px-1 mt-2">
                       <YesNoDetail label="Akraba Evliliği var mı?" radioName="ped_akraba" detailName="ped_akraba_detay" radioValue={formData.ped_akraba} detailValue={formData.ped_akraba_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    </div>
                    
                    <TextAreaGroup label="Ebeveyn/Kardeş Sağlık Durumu" name="ped_ebeveynSaglik" value={formData.ped_ebeveynSaglik} onChange={handleInputChange} width="w-full md:w-1/2" />
                    <TextAreaGroup label="Ailedeki Kronik Hastalıklar" name="ped_aileKronik" value={formData.ped_aileKronik} onChange={handleInputChange} width="w-full md:w-1/2" />
                    <InputGroup label="Bebek Ölümü/Düşük Öyküsü" name="ped_bebekOlum" value={formData.ped_bebekOlum} onChange={handleInputChange} width="w-full" />
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="VII. SOSYAL ÖYKÜ & VIII. ROS" />
                  <TextAreaGroup label="Sosyal Çevre (IHELLP / HEEADSSS)" name="ped_sosyalDurum" value={formData.ped_sosyalDurum} onChange={handleInputChange} width="w-full" />
                  
                  <SubHeader title="Sistemlerin Gözden Geçirilmesi (ROS)" />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                    <RosItem 
                      systemName="Genel" symptoms="Ateş, kilo kaybı, halsizlik, çabuk yorulma vb."
                      radioName="ped_rosGenel" detailName="ped_rosGenel_detay" 
                      radioValue={formData.ped_rosGenel} detailValue={formData.ped_rosGenel_detay} 
                      onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                    />
                    <RosItem 
                      systemName="Deri" symptoms="Döküntü, sarılık, kaşıntı, morarma, renk değişikliği vb."
                      radioName="ped_rosDeri" detailName="ped_rosDeri_detay" 
                      radioValue={formData.ped_rosDeri} detailValue={formData.ped_rosDeri_detay} 
                      onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                    />
                    <RosItem 
                      systemName="Baş-Boyun (HEENT)" symptoms="Baş ağrısı, görme/işitme sorunları, burun kanaması, boğaz ağrısı vb."
                      radioName="ped_rosHEENT" detailName="ped_rosHEENT_detay" 
                      radioValue={formData.ped_rosHEENT} detailValue={formData.ped_rosHEENT_detay} 
                      onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                    />
                    <RosItem 
                      systemName="Solunum" symptoms="Öksürük, hırıltı, stridor, nefes darlığı, balgam vb."
                      radioName="ped_rosSolunum" detailName="ped_rosSolunum_detay" 
                      radioValue={formData.ped_rosSolunum} detailValue={formData.ped_rosSolunum_detay} 
                      onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                    />
                    <RosItem 
                      systemName="Kardiyovasküler" symptoms="Çarpıntı, göğüs ağrısı, morarma (siyanoz), eforla yorulma vb."
                      radioName="ped_rosKVS" detailName="ped_rosKVS_detay" 
                      radioValue={formData.ped_rosKVS} detailValue={formData.ped_rosKVS_detay} 
                      onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                    />
                    <RosItem 
                      systemName="Gastrointestinal" symptoms="Bulantı, kusma, ishal, kabızlık, hematemez vb."
                      radioName="ped_rosGI" detailName="ped_rosGI_detay" 
                      radioValue={formData.ped_rosGI} detailValue={formData.ped_rosGI_detay} 
                      onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                    />
                    <RosItem 
                      systemName="Genitoüriner" symptoms="Sık idrara çıkma, disüri, hematüri, enürezis vb."
                      radioName="ped_rosGU" detailName="ped_rosGU_detay" 
                      radioValue={formData.ped_rosGU} detailValue={formData.ped_rosGU_detay} 
                      onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                    />
                    <RosItem 
                      systemName="Kas-İskelet ve Nörolojik" symptoms="Eklem ağrısı/şişliği, yürüyüş bozukluğu, nöbet, güçsüzlük vb."
                      radioName="ped_rosNorolojik" detailName="ped_rosNorolojik_detay" 
                      radioValue={formData.ped_rosNorolojik} detailValue={formData.ped_rosNorolojik_detay} 
                      onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="IX. FİZİK MUAYENE" />
                  <SubHeader title="Vital Bulgular ve Antropometri" />
                  <div className="flex flex-wrap -mx-1 mb-4">
                    <SelectGroup label="Genel Durum" name="vital_genelDurum" value={formData.vital_genelDurum} onChange={handleInputChange} options={['İyi', 'Orta', 'Toksik']} width="w-full lg:w-1/3" />
                    <InputGroup label="Ateş (°C)" name="vital_ates" value={formData.vital_ates} onChange={handleInputChange} width="w-1/2 md:w-1/4 lg:w-1/6" />
                    <InputGroup label="Nabız (/dk)" name="vital_nabiz" value={formData.vital_nabiz} onChange={handleInputChange} width="w-1/2 md:w-1/4 lg:w-1/6" />
                    <InputGroup label="Tansiyon (mmHg)" name="vital_tansiyon" value={formData.vital_tansiyon} onChange={handleInputChange} width="w-1/2 md:w-1/4 lg:w-1/6" />
                    <InputGroup label="Solunum (/dk)" name="vital_solunum" value={formData.vital_solunum} onChange={handleInputChange} width="w-1/2 md:w-1/4 lg:w-1/6" />
                    
                    <InputGroup label="Ağırlık (kg/Z)" name="vital_kilo" value={formData.vital_kilo} onChange={handleInputChange} width="w-full md:w-1/3" />
                    <InputGroup label="Boy (cm/Z)" name="vital_boy" value={formData.vital_boy} onChange={handleInputChange} width="w-full md:w-1/3" />
                    <InputGroup label="Baş Çevresi (cm)" name="vital_basCevresi" value={formData.vital_basCevresi} onChange={handleInputChange} width="w-full md:w-1/3" />
                  </div>
                  
                  <SubHeader title="Sistemik Muayene" />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <YesNoDetail isExam label="Cilt, Saç, Tırnak" radioName="ped_fmCilt" detailName="ped_fmCilt_detay" radioValue={formData.ped_fmCilt} detailValue={formData.ped_fmCilt_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail isExam label="Baş ve Boyun (HEENT)" radioName="ped_fmHEENT" detailName="ped_fmHEENT_detay" radioValue={formData.ped_fmHEENT} detailValue={formData.ped_fmHEENT_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail isExam label="Solunum Sistemi" radioName="ped_fmSolunum" detailName="ped_fmSolunum_detay" radioValue={formData.ped_fmSolunum} detailValue={formData.ped_fmSolunum_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail isExam label="Kardiyovasküler Sistem" radioName="ped_fmKVS" detailName="ped_fmKVS_detay" radioValue={formData.ped_fmKVS} detailValue={formData.ped_fmKVS_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail isExam label="Batın ve Genitalya" radioName="ped_fmBatin" detailName="ped_fmBatin_detay" radioValue={formData.ped_fmBatin} detailValue={formData.ped_fmBatin_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail isExam label="Endokrin Gelişim (Tanner)" radioName="ped_fmEndokrin" detailName="ped_fmEndokrin_detay" radioValue={formData.ped_fmEndokrin} detailValue={formData.ped_fmEndokrin_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail isExam label="Kas-İskelet Sistemi" radioName="ped_fmKasIskelet" detailName="ped_fmKasIskelet_detay" radioValue={formData.ped_fmKasIskelet} detailValue={formData.ped_fmKasIskelet_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail isExam label="Nörolojik Muayene" radioName="ped_fmNoro" detailName="ped_fmNoro_detay" radioValue={formData.ped_fmNoro} detailValue={formData.ped_fmNoro_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ROMATOLOJİ */}
            {activeTab === 'romatoloji' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="I. BAŞVURU NEDENİ & VİTAL BULGULAR" />
                  <div className="flex flex-wrap -mx-1">
                    <TextAreaGroup label="Ana Yakınma (Ailenin/Hastanın kelimeleriyle)" name="rom_anaYakinma" value={formData.rom_anaYakinma} onChange={handleInputChange} width="w-full" />
                    <InputGroup label="Şikayetlerin Toplam Süresi" name="rom_toplamSure" value={formData.rom_toplamSure} onChange={handleInputChange} width="w-full lg:w-1/2" />
                    <RadioGroup label="Akut mu, >6 hafta mı?" name="rom_akutMuKornikMi" value={formData.rom_akutMuKornikMi} options={[{label:'Akut (<6hf)', value:'Akut'}, {label:'Kronik (>6hf)', value:'Kronik'}]} onChange={handleRadioChange} width="w-full lg:w-1/2" />
                  </div>
                  
                  <SubHeader title="Vital Bulgular" />
                  <div className="flex flex-wrap -mx-1">
                    <InputGroup label="Ateş (°C)" name="vital_ates" value={formData.vital_ates} onChange={handleInputChange} width="w-1/2 lg:w-1/4" />
                    <InputGroup label="Nabız (/dk)" name="vital_nabiz" value={formData.vital_nabiz} onChange={handleInputChange} width="w-1/2 lg:w-1/4" />
                    <InputGroup label="Tansiyon (mmHg)" name="vital_tansiyon" value={formData.vital_tansiyon} onChange={handleInputChange} width="w-1/2 lg:w-1/4" />
                    <InputGroup label="Kilo (kg)" name="vital_kilo" value={formData.vital_kilo} onChange={handleInputChange} width="w-1/2 lg:w-1/4" />
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="II. EKLEM AĞRISI VE KAS-İSKELET ŞİKAYETLERİNİN DETAYLANDIRILMASI" />
                  <div className="flex flex-wrap -mx-1">
                    <RadioGroup label="Başlangıç:" name="rom_baslangic" value={formData.rom_baslangic} options={[{label:'Aniden (Travma/Septik)', value:'Aniden'}, {label:'Sinsi Sinsi (>6hf JIA)', value:'Sinsi'}]} onChange={handleRadioChange} width="w-full lg:w-1/2" />
                    <RadioGroup label="(<5 yaş ise) Bel ağrısı şikayeti var mı?" name="rom_belAgrisi" value={formData.rom_belAgrisi} options={[{label:'Var', value:'Var'}, {label:'Yok', value:'Yok'}, {label:'Uygulanamaz', value:'NA'}]} onChange={handleRadioChange} width="w-full lg:w-1/2" />
                  </div>

                  <SubHeader title="İnflamatuar vs. Mekanik Ağrı Ayrımı" />
                  <RadioGroup label="Karakteristik Tip Şüphesi:" name="rom_inflamatuarMekanik" value={formData.rom_inflamatuarMekanik} options={[{label:'İnflamatuar', value:'İnflamatuar'}, {label:'Mekanik', value:'Mekanik'}, {label:'İdiyopatik', value:'Idiyopatik'}]} onChange={handleRadioChange} width="w-full" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="p-3 bg-red-50 border border-red-100 rounded">
                      <p className="text-xs font-bold text-red-800 mb-2">İnflamatuar:</p>
                      <RadioGroup label="Sabahları şiddetli mi?" name="rom_sabahTutuklugu" value={formData.rom_sabahTutuklugu} options={[{label:'Evet', value:'Evet'}, {label:'Hayır', value:'Hayır'}]} onChange={handleRadioChange} width="w-full" />
                      <InputGroup label="Sabah tutukluğu (dk)" name="rom_sabahTutukluguSuresi" type="number" value={formData.rom_sabahTutukluguSuresi} onChange={handleInputChange} width="w-full" />
                      <RadioGroup label="Efor ile hafifliyor mu?" name="rom_agriHafifleme" value={formData.rom_agriHafifleme} options={[{label:'Evet', value:'Evet'}, {label:'Hayır', value:'Hayır'}]} onChange={handleRadioChange} width="w-full" />
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded">
                      <p className="text-xs font-bold text-blue-800 mb-2">Mekanik:</p>
                      <RadioGroup label="Eforla kötüleşip, istirahatle düzeliyor mu?" name="rom_mekanikSiddetlenme" value={formData.rom_mekanikSiddetlenme} options={[{label:'Evet', value:'Evet'}, {label:'Hayır', value:'Hayır'}]} onChange={handleRadioChange} width="w-full" />
                    </div>
                    <div className="p-3 bg-green-50 border border-green-100 rounded">
                      <p className="text-xs font-bold text-green-800 mb-2">İdiyopatik:</p>
                      <RadioGroup label="Akşam/gece çıkıp masajla hafifliyor mu?" name="rom_idiyopatikGece" value={formData.rom_idiyopatikGece} options={[{label:'Evet', value:'Evet'}, {label:'Hayır', value:'Hayır'}]} onChange={handleRadioChange} width="w-full" />
                    </div>
                  </div>

                  <SubHeader title="Tutulum Paterni & Kırmızı Bayraklar" />
                  <div className="flex flex-wrap -mx-1 items-center mb-4">
                    <SelectGroup label="Kaç eklem etkilenmiş?" name="rom_eklemSayisi" value={formData.rom_eklemSayisi} onChange={handleInputChange} options={['Monoartrit (1)', 'Oligoartrit (1-4)', 'Poliartrit (≥5)']} width="w-full md:w-1/3" />
                    <RadioGroup label="Simetrik mi?" name="rom_simetrikMi" value={formData.rom_simetrikMi} options={[{label:'Simetrik', value:'Simetrik'}, {label:'Asimetrik', value:'Asimetrik'}]} onChange={handleRadioChange} width="w-full md:w-1/3" />
                    <RadioGroup label="Gezici (migratuvar) mi?" name="rom_migratuvarMi" value={formData.rom_migratuvarMi} options={[{label:'Evet', value:'Evet'}, {label:'Hayır', value:'Hayır'}]} onChange={handleRadioChange} width="w-full md:w-1/3" />
                  </div>
                  <RadioGroup label="Gece uykudan uyandıran ve istirahatle geçmeyen ağrı var mı?" name="rom_geceUykudanUyandiran" value={formData.rom_geceUykudanUyandiran} options={[{label:'Var', value:'Var'}, {label:'Yok', value:'Yok'}]} onChange={handleRadioChange} width="w-full" />
                  <TextAreaGroup label="Semptom öncesi 2-4 hf enfeksiyon (boğaz ağrısı, kene vb.) öyküsü?" name="rom_tetikleyiciEnfeksiyon" value={formData.rom_tetikleyiciEnfeksiyon} onChange={handleInputChange} rows={1} width="w-full"/>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="III. EKSTRA-ARTİKÜLER VE SİSTEMİK BULGULAR" />
                  <div className="flex flex-wrap -mx-1">
                    <InputGroup label="Ateş paterni (dalgalı, periyodik vb.)" name="rom_atesPaterni" value={formData.rom_atesPaterni} onChange={handleInputChange} width="w-full lg:w-1/2" />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                    <YesNoDetail label="Açıklanamayan kilo kaybı var mı?" radioName="rom_kiloKaybi" detailName="rom_kiloKaybi_detay" radioValue={formData.rom_kiloKaybi} detailValue={formData.rom_kiloKaybi_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail label="Yüz döküntüsü, oral aft, saç dökülmesi? (SLE)" radioName="rom_ciltSLE" detailName="rom_ciltSLE_detay" radioValue={formData.rom_ciltSLE} detailValue={formData.rom_ciltSLE_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail label="Gluteal/Bacak ekstansör purpurik döküntü? (HSP)" radioName="rom_ciltHSP" detailName="rom_ciltHSP_detay" radioValue={formData.rom_ciltHSP} detailValue={formData.rom_ciltHSP_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail label="Tırnakta çukurcuk veya psoriatik plak?" radioName="rom_ciltPsoriatik" detailName="rom_ciltPsoriatik_detay" radioValue={formData.rom_ciltPsoriatik} detailValue={formData.rom_ciltPsoriatik_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail label="Mide/Bağırsak: Karın ağrısı, ishal, kanlı dışkı?" radioName="rom_giSemptom" detailName="rom_giSemptom_detay" radioValue={formData.rom_giSemptom} detailValue={formData.rom_giSemptom_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail label="Göz: Kızarıklık, fotofobi, bulanık görme?" radioName="rom_gozSemptom" detailName="rom_gozSemptom_detay" radioValue={formData.rom_gozSemptom} detailValue={formData.rom_gozSemptom_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail label="Üriner: Hematüri veya köpüklenme?" radioName="rom_guSemptom" detailName="rom_guSemptom_detay" radioValue={formData.rom_guSemptom} detailValue={formData.rom_guSemptom_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="IV. ROMATOLOJİ ODAKLI ÖZGEÇMİŞ VE SOYGEÇMİŞ" />
                  <TextAreaGroup label="Kullanılan immünsüpresif / antibiyotikler:" name="rom_ilacKullanimi" value={formData.rom_ilacKullanimi} onChange={handleInputChange} rows={1} width="w-full" />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                     <YesNoDetail label="Kronik enfeksiyon öyküsü var mı?" radioName="rom_kronikEnfeksiyon" detailName="rom_kronikEnfeksiyon_detay" radioValue={formData.rom_kronikEnfeksiyon} detailValue={formData.rom_kronikEnfeksiyon_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                     <YesNoDetail label="Ailede Romatizma, SLE, İBH, Sedef?" radioName="rom_aileRomatizma" detailName="rom_aileRomatizma_detay" radioValue={formData.rom_aileRomatizma} detailValue={formData.rom_aileRomatizma_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                     <YesNoDetail label="Ailede erken yaşta diyaliz öyküsü?" radioName="rom_aileDiyaliz" detailName="rom_aileDiyaliz_detay" radioValue={formData.rom_aileDiyaliz} detailValue={formData.rom_aileDiyaliz_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                     <YesNoDetail label="Ailede periyodik ateş (FMF vb.)?" radioName="rom_aileFMF" detailName="rom_aileFMF_detay" radioValue={formData.rom_aileFMF} detailValue={formData.rom_aileFMF_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                  <SectionHeader title="V. KAS-İSKELET SİSTEMİ VE SİSTEMİK FİZİK MUAYENE" />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <YesNoDetail isExam label="İnspeksiyon (Look) Anormallik? (Postür, atrofi, şişlik)" radioName="rom_fmLook" detailName="rom_fmLook_detay" radioValue={formData.rom_fmLook} detailValue={formData.rom_fmLook_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail isExam label="Palpasyon (Feel) Anormallik? (Isı artışı, hassasiyet, Efüzyon)" radioName="rom_fmFeel" detailName="rom_fmFeel_detay" radioValue={formData.rom_fmFeel} detailValue={formData.rom_fmFeel_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail isExam label="Hareket (Move) ROM Kısıtlılığı / Ağrı?" radioName="rom_fmMove" detailName="rom_fmMove_detay" radioValue={formData.rom_fmMove} detailValue={formData.rom_fmMove_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                    <YesNoDetail isExam label="Sistemik Muayene Anormalliği? (LAP, Üfürüm vb.)" radioName="rom_fmSistemik" detailName="rom_fmSistemik_detay" radioValue={formData.rom_fmSistemik} detailValue={formData.rom_fmSistemik_detay} onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PDF İNDİRME MODALI (POPUP) */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <h2 className="font-bold text-lg mb-4 text-slate-800 border-b pb-2">PDF İndirme Ayarları</h2>
            
            <label className="flex items-center gap-3 mb-5 cursor-pointer text-slate-700 font-medium">
              <input 
                type="checkbox" 
                checked={exportRange.includeAll}
                onChange={(e) => setExportRange({...exportRange, includeAll: e.target.checked})}
                className="w-5 h-5 text-indigo-600 rounded"
              />
              Birden fazla hasta kaydını birleştir
            </label>
            
            {exportRange.includeAll && (
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-5 animate-fadeIn">
                <p className="text-xs text-slate-500 mb-3">Sadece aşağıdaki tarih aralığındaki formları indir (boş bırakılırsa tüm kayıtlar indirilir):</p>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Başlangıç Tarihi</label>
                    <input type="date" className="w-full border border-slate-300 p-2 rounded focus:ring-2 focus:ring-indigo-500" onChange={(e) => setExportRange({...exportRange, start: e.target.value})}/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Bitiş Tarihi</label>
                    <input type="date" className="w-full border border-slate-300 p-2 rounded focus:ring-2 focus:ring-indigo-500" onChange={(e) => setExportRange({...exportRange, end: e.target.value})}/>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setShowExportModal(false)} className="px-5 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium rounded-lg transition-colors">
                İptal
              </button>
              <button onClick={exportPDF} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors">
                <Download size={18} /> İndirmeyi Başlat
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}