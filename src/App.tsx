React;
import React, { useState } from "react";
import {
  ChevronLeft,
  Plus,
  Stethoscope,
  PillBottle,
  Brain,
  Frown,
  Baby,
  Slice,
} from "lucide-react";

// ==========================================
// 1. ADIM: YENİ UYGULAMALARINI BURAYA İMPORT ET
// ==========================================
import nobet from "./apps/nobet";
import ab from "./apps/antibiyotik";
import nobet2 from "./apps/nobet2";
import ishal from "./apps/ishal";
import büyü from "./apps/büyüme";
import malab from "./apps/malabsorbsiyon";
import gc from "./apps/gc";
type AppConfig = {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  component: React.ElementType;
};

// ==========================================
// 2. ADIM: UYGULAMAYI SİSTEME KAYDET
// ==========================================
const APPS: AppConfig[] = [
  {
    id: "nobet",
    name: "Nöbet",
    icon: Stethoscope,
    color: "bg-indigo-600",
    component: nobet,
  },
  {
    id: "ab",
    name: "Antibiyotik",
    icon: PillBottle,
    color: "bg-sky-400",
    component: ab,
  },
  {
    id: "nobet2",
    name: "Nöbet2",
    icon: Brain,
    color: "bg-red-700",
    component: nobet2,
  },
  {
    id: "ishal",
    name: "Kronik İshal",
    icon: Frown,
    color: "bg-yellow-900",
    component: ishal,
  },
  {
    id: "büyü",
    name: "Çocuğu Büyüt",
    icon: Baby,
    color: "bg-zinc-900",
    component: büyü,
  },
  {
    id: "malabsorbsiyon",
    name: "malabsorbsiyon",
    icon: Frown,
    color: "bg-red-700",
    component: malab,
  },
  {
    id: "gc",
    name: "Mide GC",
    icon: Slice,
    color: "bg-slate-500",
    component: gc,
  },
];

// ==========================================
// ANA İSKELET (TAM EKRAN MOBİL GÖRÜNÜM)
// ==========================================
export default function App() {
  const [currentAppId, setCurrentAppId] = useState<string | null>(null);

  const ActiveAppConfig = APPS.find((app) => app.id === currentAppId);
  const ActiveComponent = ActiveAppConfig?.component;

  return (
    // h-[100dvh] mobil tarayıcılarda adres çubuğunu hesaba katarak tam ekran yapar
    <div className="h-[100dvh] w-full bg-gray-50 flex flex-col overflow-hidden text-slate-800">
      {currentAppId && ActiveAppConfig ? (
        // ==========================================
        // AKTİF UYGULAMA EKRANI
        // ==========================================
        <div className="flex flex-col h-full w-full bg-white animate-in slide-in-from-right-4 duration-200">
          {/* Üst Bar (Header) */}
          <div className="h-14 flex items-center px-2 border-b border-gray-100 bg-white/90 backdrop-blur-md z-10 shrink-0">
            <button
              onClick={() => setCurrentAppId(null)}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors p-2 rounded-lg active:bg-blue-50"
            >
              <ChevronLeft size={24} />
              <span className="text-base font-medium">Geri</span>
            </button>
            <div className="flex-1 text-center font-semibold text-gray-800 pr-14">
              {ActiveAppConfig.name}
            </div>
          </div>

          {/* Uygulama İçeriği */}
          <div className="flex-1 overflow-y-auto relative bg-white">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      ) : (
        // ==========================================
        // ANA EKRAN (HUB)
        // ==========================================
        <div className="flex-1 overflow-y-auto p-6 pt-12 sm:pt-16 bg-gradient-to-b from-gray-50 to-gray-200">
          <div className="mb-10 pl-2">
            <h1 className="text-3xl font-bold tracking-tight">Ana Ekran</h1>
            <p className="text-gray-500 mt-1 text-sm">Neye ihtiyacın var?</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-8 gap-x-4">
            {APPS.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  className="flex flex-col items-center gap-2 group cursor-pointer select-none"
                  onClick={() => setCurrentAppId(app.id as string)}
                >
                  {/* İkon Kutusu */}
                  <div
                    className={`w-16 h-16 sm:w-18 sm:h-18 ${app.color} rounded-2xl sm:rounded-3xl shadow-sm flex items-center justify-center text-white transition-transform duration-200 active:scale-90`}
                  >
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium text-gray-700 truncate w-full text-center">
                    {app.name}
                  </span>
                </div>
              );
            })}

            {APPS.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 opacity-50">
                <div className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-2xl flex items-center justify-center text-gray-500 mb-4">
                  <Plus size={28} />
                </div>
                <p className="text-sm text-gray-600">
                  Henüz uygulama eklenmedi.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
