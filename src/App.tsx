React;
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Battery,
  Wifi,
  Signal,
  Plus, // Örnek ikon, yeni uygulamalar ekledikçe buraya yeni ikonlar import edebilirsin
} from "lucide-react";

// ==========================================
// 1. ADIM: YENİ UYGULAMALARINI BURAYA İMPORT ET
// Benden yeni bir uygulama kodunu alıp /apps klasörüne kaydettikten sonra
// o dosyayı buraya çağırmalısın.
// Örnek: import HavaDurumu from './apps/HavaDurumu';
// ==========================================
import nobet from "./apps/nobet";
// ==========================================
// 2. ADIM: UYGULAMAYI SİSTEME KAYDET
// Yeni uygulamanı telefonda göstermek için aşağıdaki listeye bir obje ekle.
// ==========================================
const APPS = [
  {
    id: "nobet",
    name: "Nöbet",
    icon: Plus, // lucide-react'tan import ettiğin uygun bir ikon
    color: "bg-sky-400", // Tailwind renk kodu (ikonun arkaplanı)
    component: nobet, // 1. Adımda import ettiğin bileşen adı
  },
];

// ==========================================
// ANA İSKELET (HUB - TELEFON ARAYÜZÜ)
// Buranın altındaki kodlara dokunmana gerek yok.
// ==========================================
export default function App() {
  // State'in hem string hem null alabileceğini TypeScript'e daha net söyleyelim
  const [currentAppId, setCurrentAppId] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  // Üst bar için saat güncellemesi (Dakikada bir güncellenir)
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Şu an açık olan uygulamanın verilerini bul
  const ActiveAppConfig = APPS.find((app) => app.id === currentAppId);
  const ActiveComponent = ActiveAppConfig?.component;

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 sm:p-0">
      {/* Telefon Çerçevesi */}
      <div className="w-full max-w-[400px] h-[800px] bg-gray-50 rounded-[3rem] shadow-2xl border-[12px] border-gray-900 overflow-hidden relative flex flex-col">
        {/* Durum Çubuğu (Status Bar) */}
        <div className="h-12 w-full bg-transparent absolute top-0 z-50 flex items-center justify-between px-6 text-sm font-medium">
          <span className="text-gray-800">
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <div className="w-32 h-6 bg-black absolute left-1/2 -translate-x-1/2 top-0 rounded-b-3xl"></div>{" "}
          {/* Çentik (Notch) */}
          <div className="flex items-center gap-2 text-gray-800">
            <Signal size={14} />
            <Wifi size={14} />
            <Battery size={16} />
          </div>
        </div>

        {/* Ana İçerik Alanı */}
        <div className="flex-1 pt-12 flex flex-col overflow-hidden bg-gray-100">
          {currentAppId && ActiveAppConfig ? (
            // ==========================================
            // AKTİF UYGULAMA EKRANI
            // ==========================================
            <div className="flex flex-col h-full bg-white animate-in slide-in-from-right-4 duration-300">
              <div className="h-14 flex items-center px-4 border-b border-gray-100 bg-white/80 backdrop-blur-md z-10">
                <button
                  onClick={() => setCurrentAppId(null)}
                  className="flex items-center text-blue-500 hover:text-blue-600 transition-colors p-1 -ml-1 rounded-lg"
                >
                  <ChevronLeft size={28} />
                  <span className="text-lg font-medium tracking-tight">
                    Geri
                  </span>
                </button>
                <div className="flex-1 text-center font-semibold text-gray-800 mr-8">
                  {ActiveAppConfig.name}
                </div>
              </div>
              <div className="flex-1 overflow-auto relative">
                {/* Çağırılan Uygulama Burada Render Edilir */}
                {ActiveComponent && <ActiveComponent />}
              </div>
            </div>
          ) : (
            // ==========================================
            // ANA EKRAN (HUB) - UYGULAMA İKONLARI
            // ==========================================
            <div className="p-6 pt-10 h-full bg-gradient-to-b from-gray-100 to-gray-200 overflow-y-auto">
              <div className="mb-8 pl-2">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                  Ana Ekran
                </h1>
                <p className="text-gray-500 mt-1">
                  Uygulamaların burada görünecek.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-y-8 gap-x-4">
                {/* Eklenen Uygulamaları Listele */}
                {APPS.map((app) => {
                  const Icon = app.icon;
                  return (
                    <div
                      key={app.id}
                      className="flex flex-col items-center gap-2 group cursor-pointer"
                      onClick={() => setCurrentAppId(app.id)}
                    >
                      <div
                        className={`w-16 h-16 ${app.color} rounded-2xl shadow-sm flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-105 active:scale-95`}
                      >
                        <Icon size={32} strokeWidth={1.5} />
                      </div>
                      <span className="text-[11px] font-medium text-gray-600 truncate w-full text-center">
                        {app.name}
                      </span>
                    </div>
                  );
                })}

                {/* Eğer hiç uygulama yoksa bilgi mesajı göster */}
                {APPS.length === 0 && (
                  <div className="col-span-4 flex flex-col items-center justify-center py-10 text-center opacity-50">
                    <div className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-2xl flex items-center justify-center text-gray-500 mb-4">
                      <Plus size={28} />
                    </div>
                    <p className="text-sm text-gray-600">
                      Henüz uygulama eklenmedi.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      App.tsx dosyasındaki APPS dizisini düzenle.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Ana Ekran Çizgisi (Home Indicator) */}
        <div className="h-6 w-full absolute bottom-0 bg-transparent flex items-center justify-center pb-2 z-50">
          <div
            className="w-1/3 h-1.5 bg-gray-800/20 rounded-full cursor-pointer hover:bg-gray-800/40 transition-colors"
            onClick={() => setCurrentAppId(null)} // Tıklanınca ana ekrana döner
          ></div>
        </div>
      </div>
    </div>
  );
}
