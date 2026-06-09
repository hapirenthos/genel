
import React, { useState, useEffect } from 'react';
import { Save, FilePlus, FileText, Printer, Stethoscope } from 'lucide-react';

// --- TYPESCRIPT INTERFACES ---
export interface FormData {
  id: string | null;
  formType: 'pediatri' | 'romatoloji';
  lastModified: string | null;
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
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: string;
  placeholder?: string;
  width?: string;
}

interface TextAreaGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label?: string;
  name: string;
  value: string;
  options: RadioOption[];
  onChange: (name: string, value: string) => void;
}

interface RosItemProps {
  label: string;
  radioName: string;
  detailName: string;
  radioValue: string;
  detailValue: string;
  onChangeRadio: (name: string, value: string) => void;
  onChangeDetail: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

// --- INITIAL STATE ---
const initialFormData: FormData = {
  id: null,
  formType: 'pediatri',
  lastModified: null,
  
  // ORTAK / KİMLİK BİLGİLERİ
  kimlik_adSoyad: '',
  kimlik_tc: '',
  kimlik_dosyaNo: '', // YENİ EKLENEN ALAN
  kimlik_dogumTarihi: '',
  kimlik_yas: '',
  kimlik_cinsiyet: '',
  kimlik_adres: '',
  kimlik_gorusmeTarihi: '',
  kimlik_informant: '',
  kimlik_guvenilirlik: '',

  // VİTAL BULGULAR
  vital_genelDurum: '',
  vital_ates: '',
  vital_nabiz: '',
  vital_tansiyon: '',
  vital_solunum: '',
  vital_kilo: '',
  vital_boy: '',
  vital_basCevresi: '',

  // --- PEDİATRİ GENEL FORMU ---
  ped_sikayet: '',
  ped_sure: '',
  ped_sonSaglikliZaman: '',
  ped_onset: '',
  ped_location: '',
  ped_duration: '',
  ped_character: '',
  ped_aggravating: '',
  ped_related: '',
  ped_timing: '',
  ped_severity: '',
  ped_agriSkoru: '',
  ped_gravidaPara: '',
  ped_gebelikHastalik: '',
  ped_prenatalTarama: '',
  ped_kanGrubu: '',
  ped_gebelikHaftasi: '',
  ped_dogumSekli: '',
  ped_apgar: '',
  ped_dogumKiloBoy: '',
  ped_mekonyum: '',
  ped_sarilik: '',
  ped_topukKani: '',
  ped_anneSutu: '',
  ped_formulMama: '',
  ped_ekGida: '',
  ped_asiUyum: '',
  ped_ozelAsi: '',
  ped_gecirilmisHastalik: '',
  ped_alerji: '',
  ped_motor: '',
  ped_dil: '',
  ped_bilissel: '',
  ped_akraba: '',
  ped_ebeveynSaglik: '',
  ped_aileKronik: '',
  ped_bebekOlum: '',
  ped_sosyalDurum: '',
  
  // ROS (SİSTEMLERİN GÖZDEN GEÇİRİLMESİ) - GÜNCELLENDİ
  ped_rosGenel: 'Hayır', ped_rosGenel_detay: '',
  ped_rosDeri: 'Hayır', ped_rosDeri_detay: '',
  ped_rosHEENT: 'Hayır', ped_rosHEENT_detay: '',
  ped_rosSolunum: 'Hayır', ped_rosSolunum_detay: '',
  ped_rosKVS: 'Hayır', ped_rosKVS_detay: '',
  ped_rosGI: 'Hayır', ped_rosGI_detay: '',
  ped_rosGU: 'Hayır', ped_rosGU_detay: '',
  ped_rosNorolojik: 'Hayır', ped_rosNorolojik_detay: '',
  
  ped_fmCilt: '',
  ped_fmHEENT: '',
  ped_fmSolunum: '',
  ped_fmKVS: '',
  ped_fmBatin: '',
  ped_fmEndokrin: '',
  ped_fmKasIskelet: '',
  ped_fmNoro: '',

  // --- ÇOCUK ROMATOLOJİ FORMU ---
  rom_anaYakinma: '',
  rom_toplamSure: '',
  rom_akutMuKornikMi: '',
  rom_baslangic: '',
  rom_belAgrisi: '',
  rom_inflamatuarMekanik: '',
  rom_sabahTutuklugu: '',
  rom_sabahTutukluguSuresi: '',
  rom_agriHafifleme: '',
  rom_mekanikSiddetlenme: '',
  rom_idiyopatikGece: '',
  rom_eklemSayisi: '',
  rom_simetrikMi: '',
  rom_migratuvarMi: '',
  rom_geceUykudanUyandiran: '',
  rom_tetikleyiciEnfeksiyon: '',
  rom_atesPaterni: '',
  rom_kiloKaybi: '',
  rom_ciltSLE: '',
  rom_ciltHSP: '',
  rom_ciltPsoriatik: '',
  rom_giSemptom: '',
  rom_gozSemptom: '',
  rom_guSemptom: '',
  rom_kronikEnfeksiyon: '',
  rom_ilacKullanimi: '',
  rom_aileRomatizma: '',
  rom_aileDiyaliz: '',
  rom_aileFMF: '',
  rom_posturTopallama: '',
  rom_kasAtrofisiSislik: '',
  rom_isiArtisiHassasiyet: '',
  rom_efuzyonBulgusu: '',
  rom_romOlcusu: '',
  rom_organomegaliLAP: '',
  rom_kardiyakUfurum: '',
};

// --- REUSABLE PURE COMPONENTS (Artık dışarıda, klavye kapanmaz) ---
const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <div className="bg-slate-800 text-white p-2 mt-6 mb-4 rounded shadow-sm print:bg-gray-200 print:text-black print:border-b-2 print:border-black font-bold uppercase text-sm">
    {title}
  </div>
);

const SubHeader: React.FC<SubHeaderProps> = ({ title }) => (
  <h3 className="font-semibold text-slate-700 mt-4 mb-2 border-b border-slate-200 pb-1 print:text-black">{title}</h3>
);

const InputGroup: React.FC<InputGroupProps> = ({ label, name, value, onChange, type = "text", placeholder = "", width = "w-full" }) => (
  <div className={`${width} p-1`}>
    <label className="block text-xs font-semibold text-slate-600 mb-1 print:text-black">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:p-0 print:text-sm"
    />
  </div>
);

const TextAreaGroup: React.FC<TextAreaGroupProps> = ({ label, name, value, onChange, placeholder = "", rows = 2 }) => (
  <div className="w-full p-1 mt-2">
    <label className="block text-xs font-semibold text-slate-600 mb-1 print:text-black">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:text-sm print:resize-none"
    />
  </div>
);

const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, value, options, onChange }) => (
  <div className="p-1 mt-2">
    {label && <label className="block text-xs font-semibold text-slate-600 mb-1 print:text-black">{label}</label>}
    <div className="flex flex-wrap gap-4 mt-1">
      {options.map(opt => (
        <label key={opt.value} className="flex items-center space-x-2 text-sm cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(name, opt.value)}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="print:font-medium">{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const RosItem: React.FC<RosItemProps> = ({ label, radioName, detailName, radioValue, detailValue, onChangeRadio, onChangeDetail }) => (
  <div className="mb-3 p-3 bg-slate-50 border border-slate-200 rounded-lg print:bg-transparent print:border-none print:p-0 print:mb-1">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <span className="text-sm font-semibold text-slate-700 w-full sm:w-1/2">{label}</span>
      <div className="w-full sm:w-1/2 flex sm:justify-end">
        <RadioGroup 
          name={radioName} 
          value={radioValue} 
          options={[{label:'Evet', value:'Evet'}, {label:'Hayır', value:'Hayır'}]} 
          onChange={onChangeRadio} 
        />
      </div>
    </div>
    {radioValue === 'Evet' && (
      <div className="mt-2 animate-fadeIn">
        <TextAreaGroup 
          label="Detaylar:" 
          name={detailName} 
          value={detailValue} 
          onChange={onChangeDetail} 
          rows={1} 
        />
      </div>
    )}
  </div>
);

// --- MAIN COMPONENT ---
export default function HastaAnamnezMiniApp() {
  const [activeTab, setActiveTab] = useState<'pediatri' | 'romatoloji'>('pediatri');
  const [savedFiles, setSavedFiles] = useState<FormData[]>([]);
  const [formData, setFormData] = useState<FormData>({ ...initialFormData });

  useEffect(() => {
    const loadData = () => {
      try {
        const stored = localStorage.getItem('pediatriApp_files');
        if (stored) {
          setSavedFiles(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Veriler yüklenemedi", e);
      }
    };
    loadData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: string | boolean = value;
    if (type === 'checkbox') {
      parsedValue = (e.target as HTMLInputElement).checked;
    }

    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewFile = () => {
    if (window.confirm("Kaydedilmemiş verileriniz silinecektir. Yeni dosya açmak istiyor musunuz?")) {
      setFormData({ ...initialFormData, formType: activeTab });
    }
  };

  const handleSave = () => {
    if (!formData.kimlik_adSoyad) {
      alert("Lütfen en azından hastanın 'Adı Soyadı' bilgisini giriniz.");
      return;
    }

    const newFiles = [...savedFiles];
    const now = new Date().toLocaleString('tr-TR');
    
    if (formData.id) {
      const index = newFiles.findIndex(f => f.id === formData.id);
      if (index !== -1) {
        newFiles[index] = { ...formData, lastModified: now, formType: activeTab };
      }
    } else {
      const newRecord: FormData = { 
        ...formData, 
        id: Date.now().toString(), 
        lastModified: now,
        formType: activeTab 
      };
      newFiles.push(newRecord);
      setFormData(newRecord);
    }

    setSavedFiles(newFiles);
    localStorage.setItem('pediatriApp_files', JSON.stringify(newFiles));
    alert("Dosya başarıyla kaydedildi/güncellendi.");
  };

  const loadFile = (file: FormData) => {
    if (window.confirm("Bu dosyayı açmak istiyor musunuz? Mevcut değişiklikler kaydedilmemişse kaybolur.")) {
      setFormData(file);
      setActiveTab(file.formType as 'pediatri' | 'romatoloji' || 'pediatri');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // --- RENDER HELPERS ---
  const renderKimlikBilgileri = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-slate-100 print:shadow-none print:border-none print:p-0">
      <SectionHeader title="I. KİMLİK BİLGİLERİ VE DEMOGRAFİ" />
      <div className="flex flex-wrap -mx-1">
        <InputGroup label="Hastanın Adı Soyadı" name="kimlik_adSoyad" value={(formData.kimlik_adSoyad as string) || ''} onChange={handleInputChange} width="w-full md:w-1/3" />
        <InputGroup label="TC Kimlik No (Opsiyonel)" name="kimlik_tc" value={(formData.kimlik_tc as string) || ''} onChange={handleInputChange} width="w-full md:w-1/3" />
        <InputGroup label="Hasta No / Dosya No" name="kimlik_dosyaNo" value={(formData.kimlik_dosyaNo as string) || ''} onChange={handleInputChange} width="w-full md:w-1/3" />
        
        <InputGroup label="Doğum Tarihi" name="kimlik_dogumTarihi" type="date" value={(formData.kimlik_dogumTarihi as string) || ''} onChange={handleInputChange} width="w-full md:w-1/4" />
        <InputGroup label="Kesin Yaşı" name="kimlik_yas" value={(formData.kimlik_yas as string) || ''} onChange={handleInputChange} width="w-full md:w-1/4" />
        <div className="w-full md:w-1/4 p-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Cinsiyeti</label>
          <select name="kimlik_cinsiyet" value={(formData.kimlik_cinsiyet as string) || ''} onChange={handleInputChange} className="w-full border border-slate-300 rounded p-2 text-sm print:appearance-none print:border-b print:rounded-none">
            <option value="">Seçiniz...</option>
            <option value="Kız">Kız</option>
            <option value="Erkek">Erkek</option>
          </select>
        </div>
        <InputGroup label="Görüşme Tarihi" name="kimlik_gorusmeTarihi" type="date" value={(formData.kimlik_gorusmeTarihi as string) || ''} onChange={handleInputChange} width="w-full md:w-1/4" />
        
        <InputGroup label="Doğum Yeri ve Güncel Adresi" name="kimlik_adres" value={(formData.kimlik_adres as string) || ''} onChange={handleInputChange} width="w-full" />
        <InputGroup label="Bilgiyi Veren Kişi (İnformant) / Yakınlığı" name="kimlik_informant" value={(formData.kimlik_informant as string) || ''} onChange={handleInputChange} width="w-full md:w-1/2" />
        <InputGroup label="Bilginin Güvenilirliği" name="kimlik_guvenilirlik" placeholder="Kısıtlılık, dil bariyeri vb." value={(formData.kimlik_guvenilirlik as string) || ''} onChange={handleInputChange} width="w-full md:w-1/2" />
      </div>
    </div>
  );

  const renderVitalBulgular = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-slate-100 print:shadow-none print:border-none print:p-0">
       <SectionHeader title="VİTAL BULGULAR VE ANTROPOMETRİ" />
       <div className="flex flex-wrap -mx-1">
         <RadioGroup 
            label="Genel Durum" 
            name="vital_genelDurum" 
            value={(formData.vital_genelDurum as string) || ''}
            options={[{label: 'İyi', value: 'İyi'}, {label: 'Orta', value: 'Orta'}, {label: 'Toksik', value: 'Toksik'}]} 
            onChange={handleRadioChange}
          />
         <div className="w-full flex flex-wrap mt-2">
            <InputGroup label="Ateş (°C)" name="vital_ates" value={(formData.vital_ates as string) || ''} onChange={handleInputChange} width="w-1/2 md:w-1/4" />
            <InputGroup label="Nabız (/dk)" name="vital_nabiz" value={(formData.vital_nabiz as string) || ''} onChange={handleInputChange} width="w-1/2 md:w-1/4" />
            <InputGroup label="Tansiyon (mmHg)" name="vital_tansiyon" value={(formData.vital_tansiyon as string) || ''} onChange={handleInputChange} width="w-1/2 md:w-1/4" />
            <InputGroup label="Solunum (/dk)" name="vital_solunum" value={(formData.vital_solunum as string) || ''} onChange={handleInputChange} width="w-1/2 md:w-1/4" />
            <InputGroup label="Ağırlık (kg) / Z-Skor" name="vital_kilo" value={(formData.vital_kilo as string) || ''} onChange={handleInputChange} width="w-1/3" />
            <InputGroup label="Boy (cm) / Z-Skor" name="vital_boy" value={(formData.vital_boy as string) || ''} onChange={handleInputChange} width="w-1/3" />
            <InputGroup label="Baş Çevresi (cm)" name="vital_basCevresi" value={(formData.vital_basCevresi as string) || ''} onChange={handleInputChange} width="w-1/3" />
         </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0 print:hidden shadow-xl z-10">
        <div className="p-4 border-b border-slate-700">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-blue-400" />
            Klinik Arşiv
          </h1>
          <p className="text-xs text-slate-400 mt-1">Anamnez ve Dosya Yönetimi</p>
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
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Kaydedilen Dosyalar</h2>
          {savedFiles.length === 0 ? (
            <p className="text-xs text-slate-500 italic">Henüz kaydedilmiş dosya yok.</p>
          ) : (
            <ul className="space-y-2">
              {savedFiles.map(file => (
                <li key={file.id}>
                  <button 
                    onClick={() => loadFile(file)}
                    className={`w-full text-left p-3 rounded flex flex-col gap-1 transition-colors border-l-4 ${formData.id === file.id ? 'bg-slate-800 border-blue-500' : 'bg-slate-800/50 border-transparent hover:bg-slate-800'}`}
                  >
                    <span className="text-sm font-medium text-slate-200 truncate">{file.kimlik_adSoyad || 'İsimsiz Hasta'}</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {file.formType === 'pediatri' ? 'Genel Pediatri' : 'Çocuk Romatoloji'}
                    </span>
                    <span className="text-[10px] text-slate-500">{file.lastModified}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto bg-white shadow-xl min-h-screen relative print:shadow-none print:w-full print:max-w-none">
        
        {/* TOP BAR */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center z-10 print:hidden">
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => { setActiveTab('pediatri'); setFormData(p => ({...p, formType: 'pediatri'})) }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'pediatri' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Genel Pediatri
            </button>
            <button
              onClick={() => { setActiveTab('romatoloji'); setFormData(p => ({...p, formType: 'romatoloji'})) }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'romatoloji' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Çocuk Romatoloji
            </button>
          </div>

          <div className="flex space-x-3">
            <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-sm font-medium transition-colors">
              <Printer className="w-4 h-4" /> Yazdır (PDF)
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors shadow-sm">
              <Save className="w-4 h-4" /> {formData.id ? 'Değişiklikleri Kaydet' : 'Dosyayı Kaydet'}
            </button>
          </div>
        </div>

        {/* PRINT HEADER */}
        <div className="hidden print:block text-center mb-8 border-b-2 border-black pb-4 mt-8">
          <h1 className="text-2xl font-bold uppercase">{activeTab === 'pediatri' ? 'GENEL PEDİATRİ ANAMNEZ VE FİZİK MUAYENE FORMU' : 'ÇOCUK ROMATOLOJİ SPESİFİK ANAMNEZ VE KLİNİK DEĞERLENDİRME FORMU'}</h1>
        </div>

        {/* FORM AREA */}
        <div className="p-8 print:p-0">
          
          {renderKimlikBilgileri()}

          {/* ========================================== */}
          {/* TAB 1: GENEL PEDİATRİ                      */}
          {/* ========================================== */}
          {activeTab === 'pediatri' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0">
                <SectionHeader title="II. BAŞVURU NEDENİ (Ana Yakınma)" />
                <TextAreaGroup label="Şikayet (Hastanın/Ailenin ifadeleriyle)" name="ped_sikayet" value={(formData.ped_sikayet as string) || ''} onChange={handleInputChange} />
                <InputGroup label="Şikayetin Süresi" name="ped_sure" value={(formData.ped_sure as string) || ''} onChange={handleInputChange} />
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="III. MEVCUT HASTALIK ÖYKÜSÜ (HPI)" />
                <InputGroup label="En son tam sağlıklı hissedilen zaman" name="ped_sonSaglikliZaman" value={(formData.ped_sonSaglikliZaman as string) || ''} onChange={handleInputChange} />
                
                <SubHeader title="OLD CARTS Analizi" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <TextAreaGroup label="Başlangıç (Onset) - Nasıl başladı?" name="ped_onset" value={(formData.ped_onset as string) || ''} onChange={handleInputChange} rows={1}/>
                  <TextAreaGroup label="Yerleşim ve Yayılım (Location/Radiation)" name="ped_location" value={(formData.ped_location as string) || ''} onChange={handleInputChange} rows={1}/>
                  <TextAreaGroup label="Süre (Duration)" name="ped_duration" value={(formData.ped_duration as string) || ''} onChange={handleInputChange} rows={1}/>
                  <TextAreaGroup label="Karakter (Character) - Yanıcı, batıcı vb." name="ped_character" value={(formData.ped_character as string) || ''} onChange={handleInputChange} rows={1}/>
                  <TextAreaGroup label="Artıran/Azaltan Faktörler (Aggravating/Alleviating)" name="ped_aggravating" value={(formData.ped_aggravating as string) || ''} onChange={handleInputChange} rows={1}/>
                  <TextAreaGroup label="İlişkili Semptomlar (Related Symptoms)" name="ped_related" value={(formData.ped_related as string) || ''} onChange={handleInputChange} rows={1}/>
                  <TextAreaGroup label="Zamanlama (Timing) - Günün hangi saati?" name="ped_timing" value={(formData.ped_timing as string) || ''} onChange={handleInputChange} rows={1}/>
                  <TextAreaGroup label="Şiddet (Severity) - Uyku/Oyun etkileşimi" name="ped_severity" value={(formData.ped_severity as string) || ''} onChange={handleInputChange} rows={1}/>
                </div>
                <div className="mt-2 w-1/3">
                  <InputGroup label="Ağrı Skoru (FACES, VAS vb.)" name="ped_agriSkoru" value={(formData.ped_agriSkoru as string) || ''} onChange={handleInputChange} />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="IV. ÖZGEÇMİŞ (PMH)" />
                <SubHeader title="1. Prenatal (Doğum Öncesi)" />
                <div className="flex flex-wrap -mx-1">
                  <InputGroup label="Gebelik Sayısı/Sonuçları (Gravida, Para)" name="ped_gravidaPara" value={(formData.ped_gravidaPara as string) || ''} onChange={handleInputChange} width="w-full md:w-1/2" />
                  <InputGroup label="Anne-Baba Kan Grubu" name="ped_kanGrubu" value={(formData.ped_kanGrubu as string) || ''} onChange={handleInputChange} width="w-full md:w-1/2" />
                  <TextAreaGroup label="Hastalıklar ve İlaç Kullanımı" name="ped_gebelikHastalik" value={(formData.ped_gebelikHastalik as string) || ''} onChange={handleInputChange} />
                  <TextAreaGroup label="Tarama Testleri (TORCH vb.)" name="ped_prenatalTarama" value={(formData.ped_prenatalTarama as string) || ''} onChange={handleInputChange} />
                </div>

                <SubHeader title="2. Natal (Doğum) Öyküsü" />
                <div className="flex flex-wrap -mx-1">
                  <InputGroup label="Gebelik Haftası" name="ped_gebelikHaftasi" value={(formData.ped_gebelikHaftasi as string) || ''} onChange={handleInputChange} width="w-full md:w-1/3" />
                  <InputGroup label="Doğum Şekli/Endikasyonu" name="ped_dogumSekli" value={(formData.ped_dogumSekli as string) || ''} onChange={handleInputChange} width="w-full md:w-1/3" />
                  <InputGroup label="APGAR Skorları/Resüsitasyon" name="ped_apgar" value={(formData.ped_apgar as string) || ''} onChange={handleInputChange} width="w-full md:w-1/3" />
                </div>

                <SubHeader title="3. Postnatal ve Yenidoğan Öyküsü" />
                <div className="flex flex-wrap -mx-1">
                  <InputGroup label="Doğum Ağırlığı, Boyu, Baş Çevresi" name="ped_dogumKiloBoy" value={(formData.ped_dogumKiloBoy as string) || ''} onChange={handleInputChange} width="w-full" />
                  <InputGroup label="İlk İdrar/Mekonyum Zamanı" name="ped_mekonyum" value={(formData.ped_mekonyum as string) || ''} onChange={handleInputChange} width="w-full md:w-1/3" />
                  <InputGroup label="Sarılık/NICU Yatışı" name="ped_sarilik" value={(formData.ped_sarilik as string) || ''} onChange={handleInputChange} width="w-full md:w-1/3" />
                  <InputGroup label="Topuk Kanı/İşitme/KKH Tarama" name="ped_topukKani" value={(formData.ped_topukKani as string) || ''} onChange={handleInputChange} width="w-full md:w-1/3" />
                </div>

                <SubHeader title="4. Beslenme ve Diyet" />
                <div className="flex flex-wrap -mx-1">
                  <TextAreaGroup label="Anne Sütü (Süre, sıklık)" name="ped_anneSutu" value={(formData.ped_anneSutu as string) || ''} onChange={handleInputChange} />
                  <TextAreaGroup label="Formül Mama" name="ped_formulMama" value={(formData.ped_formulMama as string) || ''} onChange={handleInputChange} />
                  <TextAreaGroup label="Tamamlayıcı Beslenme (Ek gıda)" name="ped_ekGida" value={(formData.ped_ekGida as string) || ''} onChange={handleInputChange} />
                </div>

                <SubHeader title="5. Bağışıklama & 6. Alerjiler" />
                <div className="flex flex-wrap -mx-1">
                  <InputGroup label="Ulusal Aşı Uyumu" name="ped_asiUyum" value={(formData.ped_asiUyum as string) || ''} onChange={handleInputChange} width="w-full md:w-1/2" />
                  <InputGroup label="Özel Aşılar (Rotavirüs vb.)" name="ped_ozelAsi" value={(formData.ped_ozelAsi as string) || ''} onChange={handleInputChange} width="w-full md:w-1/2" />
                  <TextAreaGroup label="Geçirilmiş Hastalıklar/Cerrahi/Yatış" name="ped_gecirilmisHastalik" value={(formData.ped_gecirilmisHastalik as string) || ''} onChange={handleInputChange} />
                  <TextAreaGroup label="Alerjiler (İlaç, Gıda, Çevre)" name="ped_alerji" value={(formData.ped_alerji as string) || ''} onChange={handleInputChange} />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="V. GELİŞİMSEL & VI. SOYGEÇMİŞ" />
                <div className="flex flex-wrap -mx-1">
                  <InputGroup label="Motor Gelişim" name="ped_motor" value={(formData.ped_motor as string) || ''} onChange={handleInputChange} width="w-full md:w-1/3" />
                  <InputGroup label="Dil Gelişimi" name="ped_dil" value={(formData.ped_dil as string) || ''} onChange={handleInputChange} width="w-full md:w-1/3" />
                  <InputGroup label="Bilişsel/Sosyal (M-CHAT vb.)" name="ped_bilissel" value={(formData.ped_bilissel as string) || ''} onChange={handleInputChange} width="w-full md:w-1/3" />
                </div>
                <div className="mt-4 flex flex-wrap -mx-1">
                  <RadioGroup label="Akraba Evliliği" name="ped_akraba" value={(formData.ped_akraba as string) || ''} options={[{label:'Var', value:'Var'}, {label:'Yok', value:'Yok'}]} onChange={handleRadioChange} />
                  <TextAreaGroup label="Ebeveyn/Kardeş Sağlık Durumu" name="ped_ebeveynSaglik" value={(formData.ped_ebeveynSaglik as string) || ''} onChange={handleInputChange} />
                  <TextAreaGroup label="Ailedeki Kronik Hastalıklar" name="ped_aileKronik" value={(formData.ped_aileKronik as string) || ''} onChange={handleInputChange} />
                  <InputGroup label="Bebek Ölümü/Düşük Öyküsü" name="ped_bebekOlum" value={(formData.ped_bebekOlum as string) || ''} onChange={handleInputChange} width="w-full" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="VII. SOSYAL ÖYKÜ & VIII. ROS" />
                <TextAreaGroup label="Sosyal Çevre (IHELLP / HEEADSSS)" name="ped_sosyalDurum" value={(formData.ped_sosyalDurum as string) || ''} onChange={handleInputChange} />
                
                <SubHeader title="Sistemlerin Gözden Geçirilmesi (ROS)" />
                <div className="mt-3">
                  <RosItem 
                    label="Genel (Ateş, kilo kaybı, halsizlik vb.)" 
                    radioName="ped_rosGenel" detailName="ped_rosGenel_detay" 
                    radioValue={formData.ped_rosGenel as string} detailValue={formData.ped_rosGenel_detay as string} 
                    onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                  />
                  <RosItem 
                    label="Deri (Döküntü, sarılık, kaşıntı, morarma vb.)" 
                    radioName="ped_rosDeri" detailName="ped_rosDeri_detay" 
                    radioValue={formData.ped_rosDeri as string} detailValue={formData.ped_rosDeri_detay as string} 
                    onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                  />
                  <RosItem 
                    label="Baş-Boyun / HEENT (Baş ağrısı, görme/işitme vb.)" 
                    radioName="ped_rosHEENT" detailName="ped_rosHEENT_detay" 
                    radioValue={formData.ped_rosHEENT as string} detailValue={formData.ped_rosHEENT_detay as string} 
                    onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                  />
                  <RosItem 
                    label="Solunum (Öksürük, hırıltı, stridor vb.)" 
                    radioName="ped_rosSolunum" detailName="ped_rosSolunum_detay" 
                    radioValue={formData.ped_rosSolunum as string} detailValue={formData.ped_rosSolunum_detay as string} 
                    onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                  />
                  <RosItem 
                    label="Kardiyovasküler (Çarpıntı, nefes darlığı, morarma vb.)" 
                    radioName="ped_rosKVS" detailName="ped_rosKVS_detay" 
                    radioValue={formData.ped_rosKVS as string} detailValue={formData.ped_rosKVS_detay as string} 
                    onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                  />
                  <RosItem 
                    label="Gastrointestinal (Bulantı, kusma, ishal vb.)" 
                    radioName="ped_rosGI" detailName="ped_rosGI_detay" 
                    radioValue={formData.ped_rosGI as string} detailValue={formData.ped_rosGI_detay as string} 
                    onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                  />
                  <RosItem 
                    label="Genitoüriner (Sık idrar, disüri, hematüri vb.)" 
                    radioName="ped_rosGU" detailName="ped_rosGU_detay" 
                    radioValue={formData.ped_rosGU as string} detailValue={formData.ped_rosGU_detay as string} 
                    onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                  />
                  <RosItem 
                    label="Kas-İskelet ve Nörolojik (Ağrı, nöbet, güçsüzlük vb.)" 
                    radioName="ped_rosNorolojik" detailName="ped_rosNorolojik_detay" 
                    radioValue={formData.ped_rosNorolojik as string} detailValue={formData.ped_rosNorolojik_detay as string} 
                    onChangeRadio={handleRadioChange} onChangeDetail={handleInputChange} 
                  />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="IX. FİZİK MUAYENE" />
                {renderVitalBulgular()}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                  <TextAreaGroup label="Cilt, Saç, Tırnak" name="ped_fmCilt" value={(formData.ped_fmCilt as string) || ''} onChange={handleInputChange} rows={2}/>
                  <TextAreaGroup label="Baş ve Boyun (HEENT)" name="ped_fmHEENT" value={(formData.ped_fmHEENT as string) || ''} onChange={handleInputChange} rows={2}/>
                  <TextAreaGroup label="Solunum Sistemi" name="ped_fmSolunum" value={(formData.ped_fmSolunum as string) || ''} onChange={handleInputChange} rows={2}/>
                  <TextAreaGroup label="Kardiyovasküler Sistem" name="ped_fmKVS" value={(formData.ped_fmKVS as string) || ''} onChange={handleInputChange} rows={2}/>
                  <TextAreaGroup label="Batın ve Genitalya" name="ped_fmBatin" value={(formData.ped_fmBatin as string) || ''} onChange={handleInputChange} rows={2}/>
                  <TextAreaGroup label="Endokrin Gelişim (Tanner)" name="ped_fmEndokrin" value={(formData.ped_fmEndokrin as string) || ''} onChange={handleInputChange} rows={2}/>
                  <TextAreaGroup label="Kas-İskelet Sistemi" name="ped_fmKasIskelet" value={(formData.ped_fmKasIskelet as string) || ''} onChange={handleInputChange} rows={2}/>
                  <TextAreaGroup label="Nörolojik Muayene" name="ped_fmNoro" value={(formData.ped_fmNoro as string) || ''} onChange={handleInputChange} rows={2}/>
                </div>
              </div>

            </div>
          )}

          {/* ========================================== */}
          {/* TAB 2: ÇOCUK ROMATOLOJİ                    */}
          {/* ========================================== */}
          {activeTab === 'romatoloji' && (
            <div className="space-y-6 animate-fadeIn">
              
              {renderVitalBulgular()}

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0">
                <SectionHeader title="I. TEMEL BİLGİLER VE BAŞVURU NEDENİ" />
                <TextAreaGroup label="Ana Yakınma (Ailenin/Hastanın kelimeleriyle)" name="rom_anaYakinma" value={(formData.rom_anaYakinma as string) || ''} onChange={handleInputChange} />
                <div className="flex flex-wrap mt-2 -mx-1">
                  <InputGroup label="Şikayetlerin Toplam Süresi" name="rom_toplamSure" value={(formData.rom_toplamSure as string) || ''} onChange={handleInputChange} width="w-full md:w-1/2" />
                  <div className="w-full md:w-1/2 p-1">
                     <RadioGroup label="Akut mu, >6 hafta mı?" name="rom_akutMuKornikMi" value={(formData.rom_akutMuKornikMi as string) || ''} options={[{label:'Akut (<6 hafta)', value:'Akut'}, {label:'Kronik (>6 hafta)', value:'Kronik'}]} onChange={handleRadioChange} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="II. EKLEM AĞRISI VE KAS-İSKELET ŞİKAYETLERİNİN DETAYLANDIRILMASI" />
                
                <SubHeader title="Ağrının Başlangıcı ve Yaş Kriterleri" />
                <RadioGroup 
                  label="Şikayetler aniden mi yoksa sinsi sinsi mi başladı?" 
                  name="rom_baslangic" 
                  value={(formData.rom_baslangic as string) || ''}
                  options={[{label:'Aniden (Travma/Septik şüphesi)', value:'Aniden'}, {label:'Sinsi Sinsi (>6hf JIA şüphesi)', value:'Sinsi'}]} 
                  onChange={handleRadioChange}
                />
                <RadioGroup 
                  label="(<5 yaş ise) Bel ağrısı şikayeti var mı? (Kırmızı Bayrak)" 
                  name="rom_belAgrisi" 
                  value={(formData.rom_belAgrisi as string) || ''}
                  options={[{label:'Var', value:'Var'}, {label:'Yok', value:'Yok'}, {label:'Uygulanamaz (>5 yaş)', value:'NA'}]} 
                  onChange={handleRadioChange}
                />

                <SubHeader title="İnflamatuar vs. Mekanik Ağrı Ayrımı" />
                <div className="space-y-3">
                  <RadioGroup 
                    label="Karakteristik Tip Şüphesi:" 
                    name="rom_inflamatuarMekanik" 
                    value={(formData.rom_inflamatuarMekanik as string) || ''}
                    options={[{label:'İnflamatuar', value:'İnflamatuar'}, {label:'Mekanik', value:'Mekanik'}, {label:'İdiyopatik (Büyüme)', value:'Idiyopatik'}]} 
                    onChange={handleRadioChange}
                  />
                  
                  <div className="p-3 bg-red-50 border border-red-100 rounded print:bg-transparent print:border-none print:p-0">
                    <p className="text-xs font-bold text-red-800 mb-2 print:text-black">İnflamatuar Şüphe Kriterleri:</p>
                    <RadioGroup label="Sabahları uyanıldığında mı en şiddetli?" name="rom_sabahTutuklugu" value={(formData.rom_sabahTutuklugu as string) || ''} options={[{label:'Evet', value:'Evet'}, {label:'Hayır', value:'Hayır'}]} onChange={handleRadioChange} />
                    <InputGroup label="Sabah tutukluğu süresi (dk)" name="rom_sabahTutukluguSuresi" type="number" value={(formData.rom_sabahTutukluguSuresi as string) || ''} onChange={handleInputChange} width="w-1/3" />
                    <RadioGroup label="Kullanım/Efor ile hafifliyor mu?" name="rom_agriHafifleme" value={(formData.rom_agriHafifleme as string) || ''} options={[{label:'Evet', value:'Evet'}, {label:'Hayır', value:'Hayır'}]} onChange={handleRadioChange} />
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-100 rounded print:bg-transparent print:border-none print:p-0">
                    <p className="text-xs font-bold text-blue-800 mb-2 print:text-black">Mekanik Şüphe Kriterleri:</p>
                    <RadioGroup label="Eforla kötüleşip, istirahatle düzeliyor mu?" name="rom_mekanikSiddetlenme" value={(formData.rom_mekanikSiddetlenme as string) || ''} options={[{label:'Evet', value:'Evet'}, {label:'Hayır', value:'Hayır'}]} onChange={handleRadioChange} />
                  </div>

                  <div className="p-3 bg-green-50 border border-green-100 rounded print:bg-transparent print:border-none print:p-0">
                    <p className="text-xs font-bold text-green-800 mb-2 print:text-black">İdiyopatik Şüphe Kriterleri:</p>
                    <RadioGroup label="Eklemde şişlik yok, akşam/gece ortaya çıkıp masajla hafifliyor mu?" name="rom_idiyopatikGece" value={(formData.rom_idiyopatikGece as string) || ''} options={[{label:'Evet', value:'Evet'}, {label:'Hayır', value:'Hayır'}]} onChange={handleRadioChange} />
                  </div>
                </div>

                <SubHeader title="Tutulum Paterni ve Yayılım" />
                <div className="flex flex-wrap -mx-1 items-center">
                  <div className="w-full md:w-1/3 p-1">
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Kaç eklem etkilenmiş?</label>
                    <select name="rom_eklemSayisi" value={(formData.rom_eklemSayisi as string) || ''} onChange={handleInputChange} className="w-full border border-slate-300 rounded p-2 text-sm print:appearance-none print:border-b print:border-0 print:rounded-none">
                      <option value="">Seçiniz...</option>
                      <option value="Monoartrit (1)">Monoartrit (1)</option>
                      <option value="Oligoartrit (1-4)">Oligoartrit (1-4)</option>
                      <option value="Poliartrit (≥5)">Poliartrit (≥5)</option>
                    </select>
                  </div>
                  <div className="w-full md:w-1/3">
                    <RadioGroup label="Simetrik mi?" name="rom_simetrikMi" value={(formData.rom_simetrikMi as string) || ''} options={[{label:'Simetrik', value:'Simetrik'}, {label:'Asimetrik', value:'Asimetrik'}]} onChange={handleRadioChange} />
                  </div>
                  <div className="w-full md:w-1/3">
                    <RadioGroup label="Gezici (migratuvar) mi?" name="rom_migratuvarMi" value={(formData.rom_migratuvarMi as string) || ''} options={[{label:'Evet', value:'Evet'}, {label:'Hayır', value:'Hayır'}]} onChange={handleRadioChange} />
                  </div>
                </div>

                <SubHeader title="Kırmızı Bayrak & Tetikleyiciler" />
                <RadioGroup label="Gece uykudan uyandıran ve istirahatle geçmeyen ağrı var mı? (Malignite/Enfeksiyon)" name="rom_geceUykudanUyandiran" value={(formData.rom_geceUykudanUyandiran as string) || ''} options={[{label:'Var', value:'Var'}, {label:'Yok', value:'Yok'}]} onChange={handleRadioChange} />
                <TextAreaGroup label="Semptom öncesi 2-4 hf enfeksiyon (boğaz ağrısı, ishal, dizüri, kene) öyküsü?" name="rom_tetikleyiciEnfeksiyon" value={(formData.rom_tetikleyiciEnfeksiyon as string) || ''} onChange={handleInputChange} />
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="III. EKSTRA-ARTİKÜLER VE SİSTEMİK BULGULAR" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InputGroup label="Ateş paterni (dalgalı, sürekli, periyodik)" name="rom_atesPaterni" value={(formData.rom_atesPaterni as string) || ''} onChange={handleInputChange} />
                    <RadioGroup label="Açıklanamayan kilo kaybı var mı?" name="rom_kiloKaybi" value={(formData.rom_kiloKaybi as string) || ''} options={[{label:'Var', value:'Var'}, {label:'Yok', value:'Yok'}]} onChange={handleRadioChange} />
                    <TextAreaGroup label="Mide/Bağırsak: Karın ağrısı, ishal, kanlı dışkılama?" name="rom_giSemptom" value={(formData.rom_giSemptom as string) || ''} onChange={handleInputChange} rows={2}/>
                  </div>
                  <div>
                    <RadioGroup label="Yüz döküntüsü, oral aft, saç dökülmesi? (SLE)" name="rom_ciltSLE" value={(formData.rom_ciltSLE as string) || ''} options={[{label:'Var', value:'Var'}, {label:'Yok', value:'Yok'}]} onChange={handleRadioChange} />
                    <RadioGroup label="Gluteal/Bacak ekstansör purpurik döküntü? (HSP)" name="rom_ciltHSP" value={(formData.rom_ciltHSP as string) || ''} options={[{label:'Var', value:'Var'}, {label:'Yok', value:'Yok'}]} onChange={handleRadioChange} />
                    <RadioGroup label="Tırnakta çukurcuk (pitting) veya psoriatik plak?" name="rom_ciltPsoriatik" value={(formData.rom_ciltPsoriatik as string) || ''} options={[{label:'Var', value:'Var'}, {label:'Yok', value:'Yok'}]} onChange={handleRadioChange} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <TextAreaGroup label="Göz: Kızarıklık, fotofobi, bulanık görme?" name="rom_gozSemptom" value={(formData.rom_gozSemptom as string) || ''} onChange={handleInputChange} rows={2}/>
                  <TextAreaGroup label="Üriner: Hematüri veya proteinüri(köpüklenme)?" name="rom_guSemptom" value={(formData.rom_guSemptom as string) || ''} onChange={handleInputChange} rows={2}/>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="IV. ROMATOLOJİ ODAKLI ÖZGEÇMİŞ VE SOYGEÇMİŞ" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <RadioGroup label="Kronik enfeksiyon öyküsü var mı?" name="rom_kronikEnfeksiyon" value={(formData.rom_kronikEnfeksiyon as string) || ''} options={[{label:'Var', value:'Var'}, {label:'Yok', value:'Yok'}]} onChange={handleRadioChange} />
                    <TextAreaGroup label="Kullanılan immünsüpresif / antibiyotikler:" name="rom_ilacKullanimi" value={(formData.rom_ilacKullanimi as string) || ''} onChange={handleInputChange} rows={2}/>
                  </div>
                  <div>
                    <RadioGroup label="Ailede Romatizma, SLE, İBH, Sedef?" name="rom_aileRomatizma" value={(formData.rom_aileRomatizma as string) || ''} options={[{label:'Var', value:'Var'}, {label:'Yok', value:'Yok'}]} onChange={handleRadioChange} />
                    <RadioGroup label="Ailede erken yaşta diyaliz öyküsü?" name="rom_aileDiyaliz" value={(formData.rom_aileDiyaliz as string) || ''} options={[{label:'Var', value:'Var'}, {label:'Yok', value:'Yok'}]} onChange={handleRadioChange} />
                    <RadioGroup label="Ailede periyodik ateş (FMF vb.)?" name="rom_aileFMF" value={(formData.rom_aileFMF as string) || ''} options={[{label:'Var', value:'Var'}, {label:'Yok', value:'Yok'}]} onChange={handleRadioChange} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                <SectionHeader title="V. KAS-İSKELET SİSTEMİ VE SİSTEMİK FİZİK MUAYENE" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <SubHeader title="İnspeksiyon (Look)" />
                    <TextAreaGroup label="Postür ve yürüyüş (topallama?)" name="rom_posturTopallama" value={(formData.rom_posturTopallama as string) || ''} onChange={handleInputChange} rows={2}/>
                    <TextAreaGroup label="Kas atrofisi, eklem şişliği/şekil bozukluğu?" name="rom_kasAtrofisiSislik" value={(formData.rom_kasAtrofisiSislik as string) || ''} onChange={handleInputChange} rows={2}/>
                  </div>
                  <div>
                    <SubHeader title="Palpasyon (Feel)" />
                    <TextAreaGroup label="Isı artışı veya hassasiyet?" name="rom_isiArtisiHassasiyet" value={(formData.rom_isiArtisiHassasiyet as string) || ''} onChange={handleInputChange} rows={2}/>
                    <RadioGroup label="Efüzyon (Bulge/Patellar tap) pozitif mi?" name="rom_efuzyonBulgusu" value={(formData.rom_efuzyonBulgusu as string) || ''} options={[{label:'Pozitif', value:'Pozitif'}, {label:'Negatif', value:'Negatif'}]} onChange={handleRadioChange} />
                  </div>
                </div>
                
                <div className="mt-4">
                  <SubHeader title="Hareket (Move)" />
                  <TextAreaGroup label="Aktif/Pasif ROM ölçümleri ve eşlik eden ağrı belgelenmesi:" name="rom_romOlcusu" value={(formData.rom_romOlcusu as string) || ''} onChange={handleInputChange} rows={3}/>
                </div>

                <div className="mt-4">
                  <SubHeader title="Sistemik Muayene Kontrolü" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RadioGroup label="Lenfadenopati (LAP), Hepatosplenomegali?" name="rom_organomegaliLAP" value={(formData.rom_organomegaliLAP as string) || ''} options={[{label:'Mevcut', value:'Mevcut'}, {label:'Yok', value:'Yok'}]} onChange={handleRadioChange} />
                    <RadioGroup label="Kardiyak muayenede üfürüm duyuldu mu?" name="rom_kardiyakUfurum" value={(formData.rom_kardiyakUfurum as string) || ''} options={[{label:'Evet', value:'Evet'}, {label:'Hayır', value:'Hayır'}]} onChange={handleRadioChange} />
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
