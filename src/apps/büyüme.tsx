React;
import React, { useState, useEffect, JSX } from "react";
import {
  Menu,
  X,
  BookOpen,
  Activity,
  Baby,
  Brain,
  AlertTriangle,
  HelpCircle,
  ChevronRight,
  CheckCircle2,
  ChevronDown,
  Stethoscope,
  Footprints,
  Puzzle,
  ShieldAlert,
  FileText,
  Syringe,
  TrendingUp,
} from "lucide-react";

// --- TİPLER (TypeScript Hatalarını Önlemek İçin) ---

interface SoruData {
  id: number;
  kategori: string;
  soru: string;
  secenekler: string[];
  cevap: string;
  aciklama: string;
}

interface MonthData {
  name: string;
  bg: string;
  Büyüme?: string;
  Kaba_Motor?: string;
  İnce_Motor?: string;
  Dil_Sosyal?: string;
  Bilişsel?: string;
  Dil_Bilişsel?: string;
  Dil?: string;
}

interface AgeGroup {
  title: string;
  icon: JSX.Element;
  color: string;
  months: MonthData[];
}

// --- VERİ YAPILARI ---

const sorular: SoruData[] = [
  {
    id: 1,
    kategori: "Büyüme",
    soru: "1. Boy kısalığı nedeniyle araştırılan 10 yaşındaki erkek hastanın fizik muayenesinde üst segment / alt segment (Ü/A) oranı 0.85 olarak bulunmuştur. (Yaşı için beklenen normal Ü/A oranı 1.0'dır). Bu bulgu, çocuğun boy kısalığının aşağıdaki durumların hangisinden kaynaklanabileceğini düşündürmez?",
    secenekler: [
      "A) Hipogonadizm",
      "B) Klinefelter Sendromu",
      "C) Akondroplazi",
      "D) Marfan Sendromu",
      "E) Östrojen eksikliği",
    ],
    cevap: "C",
    aciklama:
      "Akondroplazi kısa ekstremite cüceliğidir, bu nedenle ekstremitelerin kısa olması nedeniyle alt segment küçülür, Ü/A oranı yaşa göre patolojik olarak yüksek (1.0'ın çok üstünde) saptanır. Diğer şıklarda ekstremiteler aşırı uzadığı için oran 1.0'ın altındadır.",
  },
  {
    id: 2,
    kategori: "Büyüme",
    soru: '2. Çocuğun genetik boy potansiyelini öngörmek için kullanılan "Cinsiyete Göre Düzeltilmiş Hedef Boy" formülünde, anne boyu 165 cm ve baba boyu 175 cm olan bir kız çocuğunun ulaşması beklenen genetik hedef boy ortalaması kaç santimetredir?',
    secenekler: [
      "A) 163.5 cm",
      "B) 168.5 cm",
      "C) 170.0 cm",
      "D) 176.5 cm",
      "E) 180.0 cm",
    ],
    cevap: "A",
    aciklama:
      "Kızlar için: (Anne boyu + (Baba boyu - 13)) / 2 => (165 + (175 - 13)) / 2 = 163.5 cm.",
  },
  {
    id: 3,
    kategori: "Büyüme",
    soru: "3. İki yaşındaki bir çocuğun muayenesinde baş çevresinin supraorbital çıkıntı ile oksipital prominens arasından yapılan ölçümünün, büyüme eğrisinde 0.4 persentilin altında olduğu saptanıyor. Bu durum aşağıdakilerden hangisini ifade eder ve hangi klinik basamak atılmalıdır?",
    secenekler: [
      "A) Normal bir fizyolojik varyasyondur, izlem yeterlidir.",
      "B) Büyüme hormonu eksikliği göstergesidir, GH başlanmalıdır.",
      "C) Mikrosefalidir, serebral disgenezi veya yapısal patoloji şüphesiyle Kraniyal MRG endikedir.",
      "D) Kraniyosinostoz göstergesidir, izlenmelidir.",
      "E) Çölyak hastalığını düşündürür, bağırsak biyopsisi yapılmalıdır.",
    ],
    cevap: "C",
    aciklama:
      "Baş çevresinin 0.4 persentilin altı (veya -2 SD altı) mikrosefalidir. GGG ve serebral yapısal defekt açısından kırmızı bayraktır, nörogörüntüleme (MRG) gerektirir.",
  },
  {
    id: 4,
    kategori: "Büyüme",
    soru: "4. WHO (Dünya Sağlık Örgütü) 2006 ve CDC 2000 büyüme standartlarının kullanımı ile ilgili AAP önerisi aşağıdakilerden hangisinde doğru verilmiştir?",
    secenekler: [
      "A) Tüm çocukluk çağı boyunca WHO eğrileri kullanılmalıdır.",
      "B) 0-24 ay arası bebekler için anne sütü ağırlıklı WHO eğrileri, 2-19 yaş için CDC eğrileri kullanılmalıdır.",
      "C) 0-5 yaş arası CDC eğrileri, 5-18 yaş arası WHO eğrileri kullanılmalıdır.",
      "D) Eğrilerin kullanımı cinsiyete göre değişmez, her iki cins için aynı eğriler kullanılır.",
      "E) WHO eğrileri 3. ve 97. persentiller arasına yerleştirilmiştir.",
    ],
    cevap: "B",
    aciklama:
      "Bebeklerin fizyolojik anne sütü büyüme paternini yansıttığı için 0-24 ay arası WHO standartları, 2 yaşından sonra ise CDC referans eğrileri kullanılır.",
  },
  {
    id: 5,
    kategori: "Büyüme",
    soru: "5. Fizyolojik dentisyon sürecinde bir süt çocuğunda mineralizasyonu anne karnında başlayan ve ilk süren dişler genellikle hangileridir?",
    secenekler: [
      "A) Maksiller birinci molarlar",
      "B) Mandibular lateral kesiciler",
      "C) Mandibular santral kesiciler",
      "D) Maksiller kaninler",
      "E) Maksiller santral kesiciler",
    ],
    cevap: "C",
    aciklama:
      "İlk süren dişler mandibular (alt çene) santral (orta) kesici dişlerdir ve genellikle 5-7. aylar arasında çıkarlar.",
  },
  {
    id: 6,
    kategori: "Büyüme",
    soru: '6. Gelişimsel poliklinik izleminde "Gecikmiş diş sürmesi" tanısı koyabilmek için sağlıklı doğmuş bir bebekte süt dişlerinin sürmemiş olması gereken yaş alt sınırı ortalama kaç aydır?',
    secenekler: ["A) 8 ay", "B) 10 ay", "C) 13 ay", "D) 18 ay", "E) 24 ay"],
    cevap: "C",
    aciklama:
      "Süt dişlerinin sürmesi genelde 6-8. aylarda başlar, varyasyonları geniştir ancak 13. aya kadar hiçbir dişin sürmemiş olması gecikmiş diş sürmesidir ve altta yatan (hipotiroidi, rikets, Down sendromu vb.) durumlar aranmalıdır.",
  },
  {
    id: 7,
    kategori: "Büyüme",
    soru: "7. On iki yaşındaki sağlıklı bir erkek çocuğun büyüme hızı grafiğine göre, pubertal büyüme atağı başladığında (Tanner evre 4 civarı) beklenen pik yıllık boy uzama hızı (cm/yıl) aşağıdakilerden hangisidir?",
    secenekler: [
      "A) 5-7 cm",
      "B) 6-8 cm",
      "C) 8-12 cm",
      "D) 10-14 cm",
      "E) 15-18 cm",
    ],
    cevap: "D",
    aciklama:
      "Erkeklerde ergenlik büyüme atağı pik hızı 10-14 cm/yıl'dır. Kızlarda ise 8-12 cm/yıl civarındadır. Prepubertal dönemde ise bu hız 5-7 cm/yıl civarındadır.",
  },
  {
    id: 8,
    kategori: "Büyüme",
    soru: "8. Büyüme geriliği ile getirilen bir süt çocuğunun büyüme eğrisinde, boy uzunluğu persentilinin tamamen korunduğu, ancak vücut ağırlığı persentilinin iki ana çizgiden daha fazla düştüğü (wasting) ve Vücut Kitle İndeksinin (VKİ) çok zayıf olduğu görülüyor. Hangi etiyoloji bu tabloyu en iyi açıklar?",
    secenekler: [
      "A) Konjenital Hipotiroidi",
      "B) Büyüme Hormonu Eksikliği",
      "C) Turner Sendromu",
      "D) Kistik Fibrozis (Malnütrisyon / Malabsorpsiyon)",
      "E) Cushing Sendromu",
    ],
    cevap: "D",
    aciklama:
      "Vücut ağırlığının boydan daha erken ve şiddetli etkilenerek VKİ'nin düşmesi nutrisyonel eksikliği, organ yetmezliklerini veya çölyak/kistik fibrozis gibi malabsorpsiyonları düşündürür. Endokrin patolojilerde ise boy persentili, tartıya göre çok daha fazla bozulur.",
  },
  {
    id: 9,
    kategori: "Büyüme",
    soru: "9. Çocukların kemik yaşının radyolojik olarak (sol el bilek grafisi ile) tayini büyüme geriliği ayırıcı tanısında büyük önem taşır. Kemik yaşının kronolojik yaşla uyumlu (eşit) saptandığı boy kısalığı tablosu aşağıdakilerden hangisidir?",
    secenekler: [
      "A) Ailesel boy kısalığı",
      "B) Konstitüsyonel büyüme ve puberte gecikmesi",
      "C) Büyüme hormonu eksikliği",
      "D) Kronik ağır malnütrisyon",
      "E) Konjenital hipotiroidi",
    ],
    cevap: "A",
    aciklama:
      "Ailesel boy kısalığında kemik olgunlaşması normal hızdadır ve kemik yaşı kronolojik yaşa eşittir. Diğer seçeneklerin tamamında kemik yaşı kronolojik yaştan belirgin olarak geridir.",
  },
  {
    id: 10,
    kategori: "Büyüme",
    soru: '10. Aşırı prematüre (28 haftalık) doğan ve şu an kronolojik olarak 9 aylık olan bir bebeğin büyüme eğrilerine değerleri işaretlenirken "düzeltilmiş yaş (corrected age)" kullanımı kaç aylık üzerinden yapılmalıdır ve bu düzeltme uygulaması genel olarak kaç yaşına kadar sürdürülmelidir?',
    secenekler: [
      "A) 6 aylık değerleri kullanılmalı; 1 yaşına kadar sürdürülmeli",
      "B) 6 aylık değerleri kullanılmalı; 2 (veya 3) yaşına kadar sürdürülmeli",
      "C) 9 aylık değerleri kullanılmalı; düzeltme yapılmamalı",
      "D) 7 aylık değerleri kullanılmalı; 5 yaşına kadar sürdürülmeli",
      "E) 8 aylık değerleri kullanılmalı; ergenliğe kadar sürdürülmeli",
    ],
    cevap: "B",
    aciklama:
      "Bebek 40 haftadan 12 hafta (3 ay) erken doğmuştur. 9 aylıkken düzeltilmiş yaşı 6 aydır. CDC ve AAP kılavuzlarına göre prematürelerin antropometrik ölçümleri (ve gelişimsel kilometre taşları) 24 ay - 36 aya kadar düzeltilmiş yaş kullanılarak yorumlanmalıdır.",
  },
  {
    id: 11,
    kategori: "Büyüme",
    soru: "11. Vücut Kitle İndeksi (VKİ), ağırlığın boyun karesine bölünmesiyle hesaplanır (kg/m²). İki ile 20 yaş arası çocukların değerlendirmesinde VKİ persentilinin 96. persentil (≥95. p) olarak bulunması klinik olarak neyi ifade eder?",
    secenekler: [
      "A) Aşırı zayıflık",
      "B) İdeal normal ağırlık",
      "C) Obezite riski (Fazla kilolu)",
      "D) Obezite",
      "E) Marasmus",
    ],
    cevap: "D",
    aciklama:
      'VKİ ≥ 95. persentil olması çocukluk çağında "Obezite" olarak sınıflandırılır. 85-95. persentil arası ise "Fazla Kiloluluk" (Overweight) riskini belirtir.',
  },
  {
    id: 12,
    kategori: "Büyüme",
    soru: "12. Fetal dönemdeki (anne karnındaki) büyüme hızı ortalama kaç cm/yıl'a denk gelmektedir?",
    secenekler: [
      "A) 10-14 cm/yıl",
      "B) 23-27 cm/yıl",
      "C) 30-40 cm/yıl",
      "D) 60-100 cm/yıl",
      "E) 120-150 cm/yıl",
    ],
    cevap: "D",
    aciklama:
      "Fetal evre insan hayatında lineer büyümenin en hızlı olduğu dönemdir ve hızı 60-100 cm/yıl bandındadır.",
  },
  {
    id: 13,
    kategori: "Büyüme",
    soru: "13. Bebeklik (infantil) döneminde (ilk 1 yaş içinde) boy uzamasını en çok kontrol eden ve belirleyen temel faktör aşağıdakilerden hangisidir?",
    secenekler: [
      "A) Testosteron",
      "B) Östrojen",
      "C) Büyüme hormonu (GH) pulsatil salgısı",
      "D) Beslenme ve tiroid hormonları",
      "E) Luteinize edici hormon (LH)",
    ],
    cevap: "D",
    aciklama:
      "İlk 1 yılda büyüme genetikten çok çevresel faktörlerin, özellikle beslenme kalitesinin (nutrisyon) ve tiroid hormonlarının etkisi altındadır. Büyüme hormonunun (GH) etkisi 2 yaşından sonra belirginleşmeye başlar.",
  },
  {
    id: 14,
    kategori: "Büyüme",
    soru: "14. İki yaşındaki desteksiz ayakta durabilen bir çocuğun boy ölçüm tekniğiyle ilgili aşağıdakilerden hangisi yanlıştır?",
    secenekler: [
      "A) Boy stadiyometre ile ayakta dururken ölçülmelidir.",
      "B) Baş, Frankfurt düzleminde yer almalıdır.",
      "C) Topuklar, kalçalar, omuzlar ve oksiput dikey tahtaya temas etmelidir.",
      "D) Ölçüm için ayakkabılar ve saç tokaları mutlaka çıkarılmalıdır.",
      "E) Supin (yatarak) ölçüm yapılıyorsa ayakta ölçülen değerin her zaman aynısı çıkar, fark etmez.",
    ],
    cevap: "E",
    aciklama:
      "2 yaşındaki bir çocuk için supin (yatarak) ölçülen uzunluk (length), yerçekiminin omurgaya yaptığı kompresyon olmadığı için ayakta ölçülen boydan (stature) genellikle 1-2 cm daha uzun çıkar. Çapraz kullanım büyüme hızını yanlış hesaplatabilir.",
  },
  {
    id: 15,
    kategori: "Büyüme",
    soru: "15. Birinci yaşın sonunda, vaktinde doğmuş sağlıklı bir bebeğin vücut ağırlığı ile ilgili aşağıdakilerden hangisi beklenen fizyolojik artıştır?",
    secenekler: [
      "A) Doğum ağırlığının iki katına çıkması",
      "B) Doğum ağırlığının üç katına çıkması",
      "C) Doğum ağırlığının dört katına çıkması",
      "D) Sadece 2 kg alması",
      "E) Doğum ağırlığının beş katına çıkması",
    ],
    cevap: "B",
    aciklama:
      "Bebekler ortalama olarak 5-6 aylıkken doğum kilolarını ikiye, 1. yaşın sonunda üçe, 2-2.5 yaş civarında ise dörde katlarlar.",
  },
  {
    id: 16,
    kategori: "Büyüme",
    soru: '16. Çocuklarda lineer büyümenin duraklamasının "büyüme geriliği" (growth faltering) olarak tanımlanabilmesi için persentil eğrisinde nasıl bir değişiklik olması beklenir?',
    secenekler: [
      "A) Çocuğun persentilinin 50. persentilden 25. persentile düşmesi (tek majör çizgi).",
      "B) İki majör persentil çizgisini (örn. 75. persentilden 25. persentile) aşağıya doğru çaprazlaması.",
      "C) Çocuğun persentil eğrisinde aynı hizada kalarak büyümesi.",
      "D) Boy hızının 1 cm artması.",
      "E) 85. persentilden 95. persentile çıkması.",
    ],
    cevap: "B",
    aciklama:
      "Kısa süre içinde eğrideki ardışık iki majör persentil çizgisinin (örn. %90, 75, 50, 25, 10, 5) aşağı doğru kırılması klinik faltering olarak isimlendirilir.",
  },
  {
    id: 17,
    kategori: "Büyüme",
    soru: "17. Bebeklerde kranial sütürlerin kapanmasını yansıtan baş çevresi ölçümü hangi nedenden ötürü hayati bir öneme sahiptir ve en az hangi yaşa kadar düzenli yapılmalıdır?",
    secenekler: [
      "A) IQ seviyesini hesaplamak için, 12 yaşa kadar",
      "B) Diş sürme zamanını anlamak için, 5 yaşa kadar",
      "C) Nörogelişimsel disgenetik anomalileri (makrosefali/mikrosefali) erken saptamak için, 2-3 yaşa kadar",
      "D) Beslenmeyi izlemek için, 1 yaşa kadar",
      "E) Tiroid hormon seviyesini belirlemek için, 6 ay",
    ],
    cevap: "C",
    aciklama:
      "Serebral korteksin %80'inin geliştiği ilk 2-3 yılda baş çevresi beyin hacmini doğrudan yansıtır ve GGG ile ilişkili patolojilerin ilk sinyali olabilir.",
  },
  {
    id: 18,
    kategori: "Büyüme",
    soru: '18. "Gowers Belirtisi" pozitifliği, yani çocuğun çömeldiği yerden bacaklarına tutunarak yavaşça tırmanıp ayağa kalkması, sıklıkla kaba motor gerilik ile prezente olan hangi durumun göstergesidir?',
    secenekler: [
      "A) Alt ekstremite distal kas gücü zayıflığı",
      "B) İnce motor kas immatüritesi",
      "C) Serebral diplejik spastisite",
      "D) Proksimal kas (kalça/diz ekstansörleri) zayıflığı, özellikle Duchenne Musküler Distrofi",
      "E) Hipoksik iskemik ensefalopati",
    ],
    cevap: "D",
    aciklama:
      "Gowers belirtisi proksimal kas güçsüzlüğünün klinik belirtisidir ve musküler distrofilerin (örn. DMD) karakteristik muayene bulgusudur.",
  },
  {
    id: 19,
    kategori: "Büyüme",
    soru: "19. İkinci yılın (1-2 yaş) içinde olan sağlıklı bir çocuğun ortalama boy uzama hızı (cm/yıl) aşağıdakilerden hangisidir?",
    secenekler: [
      "A) 5 cm",
      "B) 7 cm",
      "C) 10-14 cm",
      "D) 20 - 24 cm",
      "E) 30 cm",
    ],
    cevap: "C",
    aciklama:
      "Bebek birinci yılında 23-27 cm uzarken, ikinci yılda this hız 10-14 cm arasına yavaşlar.",
  },
  {
    id: 20,
    kategori: "Büyüme",
    soru: "20. Sekiz yaşındaki bir kız çocuğunda, kemik yaşının takvim yaşından 3 yıl geri olduğu ve boyun 3. persentilin çok altında olduğu saptanıyor. Çocuğun kilosu ise 50. persentildedir. Bu izole boy kısalığının sebebi aşağıdakilerden hangisi olamaz?",
    secenekler: [
      "A) Büyüme hormonu eksikliği",
      "B) Tiroid hormon eksikliği",
      "C) Turner sendromu",
      "D) Cushing sendromu",
      "E) Klasik Çölyak hastalığı",
    ],
    cevap: "E",
    aciklama:
      "Klasik Çölyak hastalığı bir malabsorbsiyon tablosudur; kilonun boydan çok daha şiddetli düştüğü (zayıflık - wasting) bir profil sergiler. Ancak sorudaki tablo kilonun korunduğu, sadece lineer büyümenin durduğu endokrin / genetik tiptedir.",
  },
  {
    id: 21,
    kategori: "Gelişim",
    soru: "21. Bir bebekte normal motor gelişimin seyri düşünüldüğünde, yüzükoyun pozisyondayken dirseklerinden destek alıp başını dik tutabildiği, desteksiz oturamadığı ancak sosyal gülümsemesinin aktifleştiği dönem ortalama kaç aylıkken gözlenir?",
    secenekler: [
      "A) Yenidoğan (1 hafta)",
      "B) 2 - 3 ay",
      "C) 6 ay",
      "D) 9 ay",
      "E) 12 ay",
    ],
    cevap: "B",
    aciklama:
      "Yüzükoyunken başı dik tutma ve sosyal gülümsemenin pik yapması 2. ve 3. ayların en klasik özellikleridir.",
  },
  {
    id: 22,
    kategori: "Gelişim",
    soru: "22. Bir bebeğin ellerini kullanarak, bir küpü bir elinden diğerine sorunsuzca geçirebildiği (transfer edebildiği) ve destekli olarak çok rahat oturduğu ay aşağıdakilerden hangisidir?",
    secenekler: ["A) 2 ay", "B) 4 ay", "C) 5-6 ay", "D) 9 ay", "E) 12 ay"],
    cevap: "C",
    aciklama:
      '"Hand-to-hand transfer" ince motor becerisi genellikle 5. ay ile 6. ay civarında oturur.',
  },
  {
    id: 23,
    kategori: "Gelişim",
    soru: '23. Piaget\'nin tanımladığı "nesne sürekliliği" (object permanence), yani bir bebeğin ebeveyni tarafından bir örtünün altına saklanan oyuncağı, onun hala orada olduğunu bilerek örtüyü kaldırıp bulması becerisi tipik olarak hangi aydan itibaren belirginleşir?',
    secenekler: [
      "A) 2. ay",
      "B) 4. ay",
      "C) 8-9. aylar",
      "D) 15. ay",
      "E) 24. ay",
    ],
    cevap: "C",
    aciklama:
      "Nesne sürekliliği 8. aydan itibaren oturmaya başlar ve 9. aydaki arama-bulma davranışlarını sağlar.",
  },
  {
    id: 24,
    kategori: "Gelişim",
    soru: "24. Gelişimsel deviasyon (deviation) kavramını en iyi açıklayan klinik durum aşağıdakilerden hangisidir?",
    secenekler: [
      "A) Bebeklerin tüm gelişimsel basamaklarının 6 ay geriden gelmesi",
      "B) Bebeklerin daha önce söylediği kelimeleri unutması",
      "C) Desteksiz oturma becerisi gelişmeden, ekstansör spastisite nedeniyle bebeğin ayağa kalkması",
      "D) İki aylık bebeğin henüz başını tam tutamaması",
      "E) Dört yaşındaki çocuğun kelimeleri telaffuz edememesi",
    ],
    cevap: "C",
    aciklama:
      "Gelişim basamaklarının biyolojik/anatomik sıralamasının bozulması deviasyondur. Bu durum Serebral Palside sık görülür.",
  },
  {
    id: 25,
    kategori: "Gelişim",
    soru: "25. Gelişimsel kırmızı bayraklar düşünüldüğünde, bir bebeğin hiçbir kelime kullanmadan ve işaret parmağıyla (ortak dikkat - joint attention) bir objeyi ebeveynine göstermeden iletişim kurmaya çalışması en geç kaçıncı ayda alarm kabul edilip otizm ve dil gelişimi açısından uzmana sevk edilmelidir?",
    secenekler: ["A) 6. ay", "B) 9. ay", "C) 15. ay", "D) 24. ay", "E) 36. ay"],
    cevap: "C",
    aciklama:
      "AAP ve CDC'ye göre 15. ayda işaret parmağı kullanımı, 3-6 kelime söyleme ve basit komutları alma olmalıdır; yokluğu kesin kırmızı bayraktır.",
  },
  {
    id: 26,
    kategori: "Gelişim",
    soru: "26. Hangi yaştaki bir çocuktan merdivenleri iki ayağını birleştirerek değil de ayak değiştirerek (alternating - bir yetişkin gibi) çıkması ve üç tekerlekli bisikleti (trisiklet) pedallaması beklenir?",
    secenekler: [
      "A) 15. ay",
      "B) 18. ay",
      "C) 24. ay (2 yaş)",
      "D) 36. ay (3 yaş)",
      "E) 48. ay (4 yaş)",
    ],
    cevap: "D",
    aciklama:
      "Merdiveni ayak değiştirerek çıkma ve üç tekerlekli bisikleti kullanma 36. ayın (3 yaşın) klasik gross motor mihenk taşıdır.",
  },
  {
    id: 27,
    kategori: "Gelişim",
    soru: "27. Aşağıdaki gelişimsel testlerden hangisi klinisyen tarafından hem aileden bilgi alınarak hem de çocuğun muayene sırasında doğrudan görevleri yapmasının (küp dizme, çizme vb.) gözlemlenmesiyle skorlanan, 0-6 yaş arası altın standart bir tarama testidir?",
    secenekler: [
      "A) AGTE (Ankara Gelişim Tarama Envanteri)",
      "B) ASQ-3 (Ages and Stages Questionnaire)",
      "C) Denver II Gelişimsel Tarama Testi",
      "D) M-CHAT",
      "E) PEDS",
    ],
    cevap: "C",
    aciklama:
      "Denver II, direkt çocuğun performansının ölçüldüğü ve ailenin ifadesinin birleştirildiği testtir. AGTE ve ASQ-3 ise temel olarak aile tarafından doldurulan anketlerdir.",
  },
  {
    id: 28,
    kategori: "Gelişim",
    soru: '28. Ebeveynlerin çocuklarıyla birlikte sosyal etkileşime girdikleri "Ce-e (Peek-a-boo)" oyununu oynadıkları ve bebeğin yabancıları ayırt ederek yabancı anksiyetesi gösterdiği en tipik gelişimsel periyot hangisidir?',
    secenekler: [
      "A) 2-3 ay",
      "B) 4-6 ay",
      "C) 7-9 ay",
      "D) 15-18 ay",
      "E) 24-30 ay",
    ],
    cevap: "C",
    aciklama:
      "Yabancı kaygısı ve peek-a-boo (ce-e) oyunları 7. ile 9. aylar arasında zirve yapar.",
  },
  {
    id: 29,
    kategori: "Gelişim",
    soru: "29. İki yaşındaki (24 aylık) normal gelişim gösteren bir çocuktan beklenen ince motor ve kaba motor becerisi aşağıdakilerden hangisinde birlikte doğru verilmiştir?",
    secenekler: [
      "A) 3 küpten kule yapma - Geri geri yürüme",
      "B) 6 küpten kule yapma - Merdivenleri iki ayak aynı basamakta (in-out) inip çıkma",
      "C) Makasla kağıt kesme - Trisiklet pedallama",
      "D) Artı (+) işareti çizme - Ayak değiştirerek merdiven inme",
      "E) 10 küpten kule yapma - Tek ayak üzerinde zıplama",
    ],
    cevap: "B",
    aciklama:
      "2 yaş çocukları ortalama 6 küpten kule yapar ve merdivenleri her basamağa iki ayak basarak çıkarlar.",
  },
  {
    id: 30,
    kategori: "Gelişim",
    soru: '30. Bilişsel ve dil gelişiminin normal seyrinde, çocuğun cümle kurarken "ben" ve "sen" gibi zamirleri doğru kullanmaya başladığı ve sorular sormaya başladığı dönem hangisidir?',
    secenekler: [
      "A) 12. ay",
      "B) 18. ay",
      "C) 24 - 30. aylar",
      "D) 48. ay",
      "E) 60. ay",
    ],
    cevap: "C",
    aciklama:
      "Kişi zamirlerinin (ben, sen, benim) doğru kullanılması ve aidiyet duygusunun başlaması 24. ay ile 30. ay arasındaki dönemin karakteristik dil gelişimidir.",
  },
  {
    id: 31,
    kategori: "Gelişim",
    soru: "31. AAP'nin kılavuzlarına göre erken otizm (OSB) taraması için çocuk doktorunun rutin olarak spesifik anketleri (M-CHAT gibi) kullanması gereken aylar hangileridir?",
    secenekler: [
      "A) 6 ve 12. aylar",
      "B) 9, 18 ve 30. aylar",
      "C) 18 ve 24. aylar",
      "D) 36 ve 48. aylar",
      "E) Doğumdan hemen sonra ve 6. yaşta",
    ],
    cevap: "C",
    aciklama:
      "Genel gelişim taramaları 9, 18 ve 30. aylarda yapılırken; spesifik Otizm (OSB) taraması 18. ve 24. aylarda yapılmalıdır.",
  },
  {
    id: 32,
    kategori: "Gelişim",
    soru: "32. Dört yaşındaki (48 aylık) bir çocuğun dil gelişimi ile ilgili olarak aşağıdaki ifadelerden hangisi doğrudur?",
    secenekler: [
      "A) Konuşmasının sadece %50'si yabancılar tarafından anlaşılabilir.",
      "B) En fazla 2 kelimelik cümleler kurar.",
      "C) Konuşmasının tamamı (%100) yabancılar tarafından anlaşılır, hikaye anlatır.",
      'D) Sadece "ne" sorusunu sorar, "neden" sorusunu anlayamaz.',
      "E) 10'a kadar sayabilir ancak adını söyleyemez.",
    ],
    cevap: "C",
    aciklama:
      "4 yaşındaki çocuğun artikülasyonu gelişmiştir ve konuşmasının %100'ü yabancılarca net anlaşılır. Karmaşık hikayeler kurgulayabilir.",
  },
  {
    id: 33,
    kategori: "Gelişim",
    soru: "33. Çizim ve görsel-uzamsal motor beceriler açısından bakıldığında bir çocuğun artı (+) işaretini, daireyi ve üçgeni doğru kopyalayabildiği aylar sırasıyla aşağıdakilerin hangisinde verilmiştir?",
    secenekler: [
      "A) Daire: 2 yaş, Artı: 3 yaş, Üçgen: 4 yaş",
      "B) Daire: 3 yaş, Artı: 4 yaş, Üçgen: 5 yaş",
      "C) Daire: 4 yaş, Artı: 5 yaş, Üçgen: 6 yaş",
      "D) Artı: 2 yaş, Üçgen: 3 yaş, Daire: 5 yaş",
      "E) Daire: 1.5 yaş, Artı: 2 yaş, Üçgen: 3 yaş",
    ],
    cevap: "B",
    aciklama:
      "Daireyi 36 ay (3 yaş), Artı/Kareyi 48 ay (4 yaş), Üçgeni ise 60 ay (5 yaş) kopyalayabilir.",
  },
  {
    id: 34,
    kategori: "Gelişim",
    soru: "34. Beş yaşındaki (60 aylık) bir çocuktan beklenen sosyal beceri aşağıdakilerden hangisidir?",
    secenekler: [
      "A) Paralel oyun oynaması, oyuncaklarını asla paylaşmaması",
      "B) Yetişkinlerin tüm yardımlarıyla giyinip soyunabilmesi",
      "C) Kendi başına kurallı oyunlar oynaması ve ev işlerine yardım etmesi",
      "D) Kendi yansımasına aynada yeni gülümsemeye başlaması",
      "E) Kaşıkla kendi yemeğini ilk defa yemeye başlaması",
    ],
    cevap: "C",
    aciklama:
      'Beş yaşındaki bir çocuk kurallı "cooperative" (işbirliğine dayalı) oyunlar oynar, sembolik fantezi yeteneği gelişmiştir, bağımsız giyinir.',
  },
  {
    id: 35,
    kategori: "Gelişim",
    soru: "35. Bir buçuk yaşındaki (18 ay) bir bebeğin dil ve kaba motor gelişimi için hangisi kırmızı bayrak olarak kabul edilebilir?",
    secenekler: [
      "A) Koşamaması ve bağımsız yürüyememesi",
      "B) Merdivenleri iki ayakla çıkamaması",
      "C) Üç kelimelik cümle kuramaması",
      "D) Daire çizememesi",
      "E) Gündüz mesane kontrolünün olmaması",
    ],
    cevap: "A",
    aciklama:
      "18 ay, desteksiz bağımsız yürümenin başlaması ve koşmanın ilk adımları için kesin kırmızı bayrak sınırıdır. Çocuğun 18 ayda koşamaması/yürüyememesi anormaldir.",
  },
  {
    id: 36,
    kategori: "Gelişim",
    soru: "36. Bir yaşında (12 ay) olan normal gelişen bir bebeğin dil gelişimi hakkında hangisi söylenebilir?",
    secenekler: [
      "A) İki kelimelik cümleler kurabilir.",
      "B) Hiçbir anlamlı kelime üretemez, sadece ağlar.",
      "C) Jargon ve jest kullanarak, amaca yönelik 1-3 kelimeyi (anne, baba, su vb.) doğru yerde kullanabilir.",
      "D) Kelimelerin anlamını bilmez, sadece papağan gibi taklit eder (Ekolali).",
      "E) Hikayeler anlatabilir.",
    ],
    cevap: "C",
    aciklama:
      '12. ayda çocuk spesifik olarak "anne" ve "baba"yı bilir, ayrıca birkaç anlamlı kelimesi ve aktif jest kullanımı vardır.',
  },
  {
    id: 37,
    kategori: "Gelişim",
    soru: "37. Gelişimi izlenen çocuklarda, daha önce kazanılmış olan yürüme, konuşma veya çevreyle İletişim gibi becerilerin aylar içerisinde giderek kaybedilmesine ne ad verilir ve bu durumun varlığında ne düşünülmelidir?",
    secenekler: [
      "A) Disosiyasyon - Yalnızca işitme kaybı",
      "B) Gecikme - Fizyolojik büyüme geriliği",
      "C) Regresyon - İlerleyici nörodejeneratif veya nörometabolik hastalık şüphesi",
      "D) Deviasyon - Düzeltilmiş yaş kullanımı hatası",
      "E) Paralel oyun - Otizm",
    ],
    cevap: "C",
    aciklama:
      'Kazanılan becerilerin kaybı "regresyon"dur ve nöronal yıkımın, metabolik depo hastalıklarının veya Rett sendromunun klasik alarm bulgusudur.',
  },
  {
    id: 38,
    kategori: "Gelişim",
    soru: '38. Süt çocukluğunda görülen "babıldama" (babbling - sessiz ve sesli harflerin ardışık üretimi, "ba-ba-ba") gelişiminin başlamaması halinde, bebeğin özellikle hangi fonksiyonunun acilen değerlendirilmesi gerekir?',
    secenekler: [
      "A) Görme keskinliği",
      "B) Tiroid fonksiyon testleri",
      "C) İşitme yetisi (Odyolojik değerlendirme)",
      "D) Kalp ekokardiyografisi",
      "E) Renal ultrasonografi",
    ],
    cevap: "C",
    aciklama:
      "6-9 aylar arasında babıldamanın hiç başlamaması ağır işitme kayıplarının (konjenital sağırlık) ilk ve en önemli klinik belirtisidir.",
  },
  {
    id: 39,
    kategori: "Gelişim",
    soru: "39. Çocuğun sosyal gelişim sürecinde, diğer çocuklarla fiziksel olarak aynı ortamda bulunmasına rağmen onlarla etkileşime girmeden, kendi oyuncaklarıyla tek başına oynadığı döneme ne ad verilir ve hangi yaş aralığında tipiktir?",
    secenekler: [
      "A) İşbirlikçi (Cooperative) oyun - 5 yaş",
      "B) Paralel oyun - 2 yaş (24-30 ay)",
      "C) Yaratıcı (Symbolic) oyun - 4 yaş",
      "D) Kurallı oyun - 6 yaş",
      "E) Motor oyun - 6 ay",
    ],
    cevap: "B",
    aciklama:
      'İki yaş civarındaki çocuklar diğer çocukların yanındadır ancak onlarla oyun/oyuncak paylaşmazlar, buna "paralel oyun" denir.',
  },
  {
    id: 40,
    kategori: "Gelişim",
    soru: "40. İki aylık (8 haftalık) bir bebek yüzükoyun pozisyonundayken (tummy time) aşağıdakilerden hangisini yapması beklenir?",
    secenekler: [
      "A) Kollarını tamamen düzleştirip belden kalkması",
      "B) Başını ve göğsünün üst kısmını kısa süreliğine yerden kaldırması",
      "C) Kendi başına sırtüstü pozisyona dönmesi",
      "D) Sürünerek ileri doğru gitmesi",
      "E) Hiç başını kaldıramaması, yüzünün tamamen yere gömülü kalması",
    ],
    cevap: "B",
    aciklama:
      "İki aylık bebek yüzükoyunken omuzlardan ve baştan destek alarak başını/göğsünü (chest up) anlık olarak kaldırabilir.",
  },
  {
    id: 41,
    kategori: "GGG",
    soru: "41. Global Gelişme Geriliği (GGG) tanımı klinik olarak hangi yaş grubundaki çocuklarda kullanılır ve temel tanı kriteri nedir?",
    secenekler: [
      "A) 5 yaşından büyüklerde IQ'nun <70 olması.",
      "B) 2 yaşından küçüklerde sadece kaba motor gerilik olması.",
      "C) 5 yaşından küçük çocuklarda kaba motor, ince motor, dil, bilişsel veya sosyal alanların en az ikisinde >2 standart sapma gecikme olması.",
      "D) Tüm okul çağı çocuklarında okuma güçlüğü yaşanması.",
      "E) Otistik bulguların izole olarak bulunması.",
    ],
    cevap: "C",
    aciklama:
      "GGG, 5 yaşından küçük çocuklarda, IQ testi standardize uygulanamadığı için en az iki majör gelişim alanında belirgin gerilik saptanmasıyla tanımlanır.",
  },
  {
    id: 42,
    kategori: "GGG",
    soru: '42. Katkı Pediatri ve AAP algoritmalarına göre, etiyolojisi bilinmeyen Global Gelişme Geriliği saptanan her hastada (kız/erkek fark etmeksizin) "1. basamak altın standart" genetik tanı testi aşağıdakilerden hangisidir?',
    secenekler: [
      "A) Tüm Ekzom Dizileme (WES)",
      "B) Standart G-Bantlama Karyotip Analizi",
      "C) Kromozomal Mikrodizileme (CMA)",
      "D) Hedefe yönelik FISH analizi",
      "E) Kemik iliği analizi",
    ],
    cevap: "C",
    aciklama:
      "Kromozomal mikrodizileme (Microarray - CMA), submikroskobik delesyon ve duplikasyonları saptadığı için GGG'de ilk yapılması gereken ve standart karyotipin yerini alan testtir.",
  },
  {
    id: 43,
    kategori: "GGG",
    soru: '43. GGG ile başvuran bir çocukta, fizik muayenede saptanan "Maküla çevresinde kiraz kırmızısı leke (Cherry-red spot)" bulgusu öncelikle hangi grup metabolik hastalık şüphesini doğurur?',
    secenekler: [
      "A) Aminoasitopatiler (Fenilketonüri vb.)",
      "B) Yağ Asidi Oksidasyon Bozuklukları",
      "C) Mitokondriyal Hastalıklar",
      "D) Lizozomal Depo Hastalıkları (Tay-Sachs, Niemann-Pick vb.)",
      "E) Pürin metabolizması defektleri",
    ],
    cevap: "D",
    aciklama:
      "Kiraz kırmızısı leke, sfingolipidlerin retinada birikimiyle ortaya çıkan lizozomal depo hastalıklarının patognomonik fizik muayene bulgusudur.",
  },
  {
    id: 44,
    kategori: "GGG",
    soru: "44. Otistik spektrum bozukluğu kliniği gösteren, kazanılmış el ve konuşma becerilerini kaybeden (regresyon) ve stereotipik el yıkama/ovuşturma hareketleri olan bir kız çocuğunda GGG araştırmasında spesifik olarak hangi genin dizilemesi öncelikle istenmelidir?",
    secenekler: ["A) FMR1", "B) DMD", "C) MECP2", "D) UBE3A", "E) SMN1"],
    cevap: "C",
    aciklama:
      "Belirtilen klasik regresyon ve el stereotipileri tablosu kız çocuklarında görülen Rett Sendromuna aittir ve geni MECP2'dir.",
  },
  {
    id: 45,
    kategori: "GGG",
    soru: "45. GGG vakalarında metabolik tarama testlerinin tanısal verimi %1-5 civarında olsa da her algoritmada şiddetle önerilmesinin ana bilimsel ve klinik sebebi aşağıdakilerden hangisidir?",
    secenekler: [
      "A) Testlerin maliyetinin genetik testlerden çok daha ucuz olması",
      'B) Metabolik hastalıkların çoğu için diyet, enzim veya kofaktör replasmanı gibi "doğrudan tedavi edici ve yıkımı durdurucu" spesifik yaklaşımların bulunması',
      "C) Bütün genetik hastalıkların metabolik testlerle saptanabilmesi",
      "D) Sadece metabolik hastalıkların kalıtsal olması",
      "E) Çocuğun IQ skorunu anında belirleyebilmesi",
    ],
    cevap: "B",
    aciklama:
      "Metabolik hastalıkların tedavisiyle zihinsel ve motor yıkım önlenebileceği için GGG olgularında erken taranmaları hayati öneme sahiptir.",
  },
  {
    id: 46,
    kategori: "GGG",
    soru: "46. Nedeni bilinmeyen GGG araştırmasında, idrar kreatin/kreatinin oranının son derece yüksek saptandığı, beyin MR Spektroskopisinde kreatin pikinin olmadığı ve nöbetlerin eşlik ettiği hastalık (Kreatin Transporter Defekti) hangi genin mutasyonuyla oluşur?",
    secenekler: ["A) SLC6A8", "B) GAMT", "C) AGAT", "D) MECP2", "E) FMR1"],
    cevap: "A",
    aciklama:
      "Kreatin transporter defekti SLC6A8 mutasyonu ile oluşur. GAMT ve AGAT ise sentez defektleridir.",
  },
  {
    id: 47,
    kategori: "GGG",
    soru: "47. FMR1 genindeki CGG üçlü tekrar sayısının artmasıyla (200'den fazla) oluşan, özellikle erkeklerde uzun yüz, belirgin kulaklar, makroorşidizm, otistik özellikler ve GGG ile kendini gösteren en sık kalıtsal zihinsel yetersizlik nedeni hangisidir?",
    secenekler: [
      "A) Down Sendromu",
      "B) Klinefelter Sendromu",
      "C) Frajil X Sendromu",
      "D) Angelman Sendromu",
      "E) Prader-Willi Sendromu",
    ],
    cevap: "C",
    aciklama:
      "Frajil X Sendromu kalıtsal Zihinsel Yetersizliğin bir numaralı nedenidir ve genetik algoritmanın 1. basamağında yer alır.",
  },
  {
    id: 48,
    kategori: "GGG",
    soru: "48. Global Gelişme Geriliğinde radyolojik olarak Manyetik Rezonans Görüntüleme (MRG) çekilmesi hangi durumda ilk planda şart değildir (endike olmayabilir)?",
    secenekler: [
      "A) Fizik muayenede mikrosefali saptanması",
      "B) Fokal nörolojik defisit ve spastisite varlığı",
      "C) Dirençli epileptik nöbetlerin eşlik etmesi",
      "D) İzole hafif konuşma gecikmesi olup, fizik ve nörolojik muayenesi tamamen normal olan 3 yaşındaki çocuk",
      "E) Makrosefali ve hidrosefali şüphesi",
    ],
    cevap: "D",
    aciklama:
      "Tamamen normal bir nörolojik muayeneye sahip olan izole gecikmelerde rutin MRG endikasyonu yoktur. Anatomik bir asimetri, baş çevresi anomalisi veya nöbet varsa MRG çekilmelidir.",
  },
  {
    id: 49,
    kategori: "GGG",
    soru: '49. Çevresel toksinlere maruziyet sonucunda GGG gelişen çocuklarda, gebelik sırasında maruz kalınan, sözcük üretme ve pragmatik kavrama yetilerinde ağır defisit yaratan, ince üst dudak ve pürüzsüz filtrum ile karakterize "Fetal... Spektrum Bozukluğu"na yol açan en yaygın teratojen hangisidir?',
    secenekler: [
      "A) Sigara (Nikotin)",
      "B) Alkol",
      "C) Kurşun",
      "D) Kokain",
      "E) SSRI Antidepresanlar",
    ],
    cevap: "B",
    aciklama:
      "Fetal Alkol Sendromu, gebelikte alkol maruziyeti sonucu oluşan, öğrenme güçlüğü ve tipik dismorfik yüz bulgularıyla giden ciddi bir nörogelişimsel bozukluktur.",
  },
  {
    id: 50,
    kategori: "GGG",
    soru: "50. Aşağıdakilerden hangisi GGG ile ilişkili X'e bağlı sendromik olmayan zihinsel yetersizlikleri (XLID) araştırmak için kullanılan bir yöntemdir ve kimlere uygulanması önerilir?",
    secenekler: [
      "A) Yalnızca 5 yaşından büyük kız çocuklarına",
      "B) Soyağacında anne tarafından erkek akrabalarda (örn. dayı) benzer zihinsel gerilik öyküsü olan, ancak Frajil X'i negatif olan erkek çocuklarına",
      "C) Tüm yenidoğanlara rutin olarak",
      "D) Sadece kataraktı olan çocuklara",
      "E) Kromozom analizi Trizomi 21 gelen çocuklara",
    ],
    cevap: "B",
    aciklama:
      "XLID (X-linked intellectual disability) erkeklerde X kromozomu aracılığıyla geçer. Aile öyküsünde X'e bağlı kalıtım deseni varsa spesifik multigen panelleri kullanılır.",
  },
  {
    id: 51,
    kategori: "GGG",
    soru: "51. Aşağıdaki komorbiditelerden hangisi GGG/ZY hastalarında normal popülasyona göre belirgin oranda daha sık görülür ve tedavi edilmezse çocuğun kognitif rehabilitasyonunu bloke eder?",
    secenekler: [
      "A) Tip 1 Diabetes Mellitus",
      "B) Orak Hücreli Anemi",
      "C) Dirençli Epilepsi ve Otizm Spektrum Bozuklukları",
      "D) Kronik Böbrek Yetmezliği",
      "E) Juvenil Romatoid Artrit",
    ],
    cevap: "C",
    aciklama:
      "GGG hastalarında epilepsi görülme oranı popülasyondan 10 kat fazladır ve %40'a varan oranda otizm/psikiyatrik bozukluklar eşlik eder.",
  },
  {
    id: 52,
    kategori: "GGG",
    soru: "52. Zihinsel yetersizliği olan çocuklarda saldırganlık, öfke nöbetleri ve kendine zarar verme davranışlarının yönetiminde genellikle hangi farmakolojik ajan grubunun (özellikle Risperidon veya Aripiprazol) kullanımı önerilmektedir?",
    secenekler: [
      "A) Atipik Antipsikotikler",
      "B) Barbitüratlar",
      "C) Benzodiazepinler",
      "D) Trisiklik Antidepresanlar",
      "E) Narkotik Analjezikler",
    ],
    cevap: "A",
    aciklama:
      "Otizm veya Zihinsel Yetersizlikte şiddetli iritabilite ve agresyonun FDA onaylı farmakolojik tedavilerinden biri düşük doz atipik antipsikotiklerdir (Risperidon, Aripiprazol).",
  },
  {
    id: 53,
    kategori: "GGG",
    soru: '53. Bir GGG hastasının fizik muayenesinde "Kaba yüz görünümü (gargoylism), eklem kontraktürleri, hepatosplenomegali ve korneal bulanıklık" saptanmıştır. İdrar taramasında hangi testin pozitif çıkması muhtemeldir?',
    secenekler: [
      "A) İdrar ketonları",
      "B) İdrar Glikozaminoglikanları (MPS taraması)",
      "C) Pürin pirimidin analizi",
      "D) İdrar kalsiyumu",
      "E) GAA / Kreatinin oranı",
    ],
    cevap: "B",
    aciklama:
      "Kaba yüz, korneal opasite ve organomegali Mukopolisakkaridoz (MPS) grubunun tipik bulgularıdır ve idrarda Glikozaminoglikan atılımı artar.",
  },
  {
    id: 54,
    kategori: "GGG",
    soru: "54. İnfantil çağda şiddetli hipotoni, kardiyomiyopati, GGG ve kreatin kinaz (CK) yüksekliği ile başvuran bir bebekte öncelikle hangi organel / metabolik defekt düşünülmelidir?",
    secenekler: [
      "A) Yağ Asidi Oksidasyon Bozuklukları (Örn. LCHAD, Pompe vs.) veya Mitokondriyal Hastalıklar",
      "B) Fenilketonüri",
      "C) Konjenital Rubella",
      "D) Frajil X",
      "E) Turner Sendromu",
    ],
    cevap: "A",
    aciklama:
      "Hipotoni, GGG ve eşlik eden kardiyomiyopati (veya karaciğer yağlanması) her zaman mitokondriyal enerji defektlerini veya yağ asidi oksidasyon bozukluklarını (Pompe gibi glikojen depo hastalıklarını da) akla getirmelidir.",
  },
  {
    id: 55,
    kategori: "GGG",
    soru: '55. GGG vakalarında "nöroplastisiteyi" (sinaptik ağların uyarana bağlı reorganizasyon yeteneği) hedef alan fonksiyonel MRG (fMRG) ile kanıtlanmış kognitif müdahale eğitimlerinden en bilineni hangisidir?',
    secenekler: [
      "A) Ketojenik Diyet",
      "B) Çalışan Bellek (Working Memory) Eğitim Programları (örn. Klingberg modeli)",
      "C) Koklear İmplantasyon",
      "D) Botulinum Toksini Enjeksiyonu",
      "E) Vagal Sinir Stimülasyonu",
    ],
    cevap: "B",
    aciklama:
      "Çalışan bellek eğitimleri (bilgisayar destekli kognitif müdahaleler), prefrontal ve parietal korteksteki nöronal ağları aktifleştirerek plastisite sağlar ve dikkat ile akademik performansı iyileştirir.",
  },
  {
    id: 56,
    kategori: "GGG",
    soru: '56. Aşağıdakilerden hangisi GGG etiyolojisini aydınlatmak için istenen metabolik tarama testleri kapsamında değerlendirilen temel "Kan" testlerinden biri değildir?',
    secenekler: [
      "A) Total homosistein",
      "B) Açil karnitin profili",
      "C) Serum aminoasitleri",
      "D) Kan gazı ve amonyak",
      "E) Frajil X üçlü tekrar analizi",
    ],
    cevap: "E",
    aciklama:
      "Frajil X genetik (moleküler DNA) bir testtir. Diğer seçenekler biyokimyasal/metabolik parametreleri gösterir.",
  },
  {
    id: 57,
    kategori: "GGG",
    soru: "57. Yenidoğan döneminde hipoksik-iskemik ensefalopati (HİE) tanısı almış ve terapötik hipotermi uygulanmış bir bebeğin uzun dönem izleminde en fazla aşağıdaki nörogelişimsel bozukluklardan hangisinin gelişme riski yüksektir?",
    secenekler: [
      "A) Tip 1 Diyabet",
      "B) Serebral Palsi (Özellikle kuadriplejik veya diplejik tip) ve GGG",
      "C) Duchenne Musküler Distrofi",
      "D) Akondroplazi",
      "E) Fenilketonüri",
    ],
    cevap: "B",
    aciklama:
      "Perinatal asfiksiye bağlı HİE, Serebral Palsi'nin ve ona bağlı ağır Global Gelişme Geriliğinin en sık görülen yapısal-edinsel nedenidir.",
  },
  {
    id: 58,
    kategori: "GGG",
    soru: "58. GGG saptanan bir hastada, boy kısalığı, mikrosefali, sindaktili (parmak anomalileri) ve kalp defekti varsa bu hastanın klinik değerlendirmesinde etiyolojiyi bulmak için en faydalı olacak test aşağıdakilerden hangisidir?",
    secenekler: [
      "A) Elektromiyografi (EMG)",
      "B) Serum lipid profili",
      "C) Kromozomal Mikrodizileme (CMA - Microarray)",
      "D) Beyin Omurilik Sıvısı (BOS) laktat tayini",
      "E) Glukoz tolerans testi",
    ],
    cevap: "C",
    aciklama:
      "Çoklu sistemik konjenital anomaliler ve GGG/mikrosefali kombinasyonu öncelikle kromozomal delesyon/duplikasyon (kopya sayısı varyasyonları) veya monogenik sendromları düşündürür, ilk test CMA'dır.",
  },
  {
    id: 59,
    kategori: "GGG",
    soru: '59. GGG olan çocukların bakım ve tedavi süreçlerinde hekimin "sosyal (IHELLP)" faktörleri ele almasının nedeni nedir?',
    secenekler: [
      "A) Çocuğun okul ücretini karşılamak için",
      "B) Çevresel stres, fakirlik, yetersiz beslenme ve anne depresyonunun (epigenetik etki ile) beyin nöroplastisitesini kalıcı şekilde bozarak GGG tablosunu çok daha ağırlaştırması ve müdahale şansını azaltması",
      "C) İlaçların dozunu hesaplamak için",
      "D) Ailenin kan grubunu tespit etmek için",
      "E) GGG'nin genetik geçiş hızını belirlemek için",
    ],
    cevap: "B",
    aciklama:
      'Biyolojik ve genetik risklerle birlikte "toksik çevresel stresin" varlığı, nörobiyolojik gelişimi bloke eden majör bir nedendir.',
  },
  {
    id: 60,
    kategori: "GGG",
    soru: "60. Lesch-Nyhan sendromunda görülen koreoatetoz, spastisite, GGG ve kendine zarar verme tablosuna altta yatan hangi genetik/metabolik defekt neden olmaktadır?",
    secenekler: [
      "A) HPRT (Hipoksantin-guanin fosforiboziltransferaz) enzim eksikliği",
      "B) Tiroid hormon eksikliği",
      "C) Distrofin mutasyonu",
      "D) Fenilalanin hidroksilaz eksikliği",
      "E) MECP2 mutasyonu",
    ],
    cevap: "A",
    aciklama:
      "Lesch-Nyhan sendromu, pürin kurtarma yolağındaki HPRT enziminin genetik eksikliği ile X'e bağlı kalıtılan, nörolojik ağır yıkım ve hiperürisemi ile karakterize bir hastalıktır.",
  },
];

// --- BİLEŞENLER ---

const AlertBox = ({ type = "info", title, children }: any) => {
  const styles: Record<string, string> = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    danger: "bg-rose-50 border-rose-200 text-rose-800",
  };
  const icons: Record<string, any> = {
    info: <Activity className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    danger: <ShieldAlert className="w-5 h-5 text-rose-500" />,
  };

  return (
    <div className={`p-4 my-4 border rounded-xl flex gap-3 ${styles[type]}`}>
      <div className="flex-shrink-0 mt-1">{icons[type]}</div>
      <div>
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <div className="text-sm space-y-2 leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

const SoruKarti = ({ soruData }: { soruData: SoruData }) => {
  const [acik, setAcik] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 sm:p-5">
        <h3 className="font-medium text-slate-800 mb-3 text-sm sm:text-base">
          {soruData.soru}
        </h3>
        <ul className="space-y-2 mb-4">
          {soruData.secenekler.map((secenek: string, index: number) => {
            const isCevap = secenek.startsWith(soruData.cevap + ")");
            return (
              <li
                key={index}
                className={`p-2.5 rounded-lg text-sm border transition-colors ${
                  acik && isCevap
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-medium"
                    : "bg-slate-50 border-transparent text-slate-600"
                }`}
              >
                {secenek}
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setAcik(!acik)}
          className="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          {acik ? (
            <ChevronDown className="w-4 h-4 mr-1" />
          ) : (
            <ChevronRight className="w-4 h-4 mr-1" />
          )}
          {acik ? "Açıklamayı Gizle" : "Cevabı ve Açıklamayı Gör"}
        </button>

        {acik && (
          <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-lg flex items-start gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-indigo-900 block mb-1">
                Doğru Cevap: {soruData.cevap}
              </span>
              <p className="text-sm text-indigo-800 leading-relaxed">
                {soruData.aciklama}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- ANA İÇERİK BÖLÜMLERİ ---

const Bolum1Buyume = () => (
  <div className="space-y-6 animate-fade-in">
    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 border-b pb-4 flex items-center gap-2">
      <TrendingUp className="w-8 h-8 text-indigo-600" />
      1. Büyümenin Değerlendirilmesi ve İzlemi
    </h1>

    <p className="text-slate-700 leading-relaxed">
      Büyüme, organizmanın hücre sayısındaki ve boyutundaki artışı ifade eden
      kantitatif bir süreç olup, çocuk sağlığının en temel fizyolojik
      göstergesidir. Büyüme parametrelerindeki sapmalar, altta yatan sistemik,
      genetik veya endokrinolojik patolojilerin ilk ve sıklıkla tek belirtisi
      olabilmektedir. Büyümenin izleminde güvenilirlik, ölçümlerin hassas
      cihazlarla, doğru pozisyonlarda ve standart tekniklerle
      gerçekleştirilmesine bağlıdır.
    </p>

    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4 flex items-center gap-2">
      <Stethoscope className="w-5 h-5 text-indigo-500" />
      1.1. Antropometrik Ölçüm Teknikleri ve Normatif Veriler
    </h2>
    <p className="text-slate-700 leading-relaxed">
      Büyümenin klinik değerlendirmesinde yaşa ve cinsiyete spesifik standart
      büyüme eğrilerinden (persentil veya standart sapma skorları) yararlanılır.
      İki yaşından küçük çocukların boy ölçümleri yatar pozisyonda (supin) iki
      uzman veya eğitimli personel eşliğinde, çocuğun başı{" "}
      <strong>Frankfurt düzleminde</strong> (dış kantus ile dış kulak yolunu
      birleştiren hattın yere dik olduğu pozisyon) sabitlenerek yapılmalıdır.
      İki yaşını doldurmuş ve desteksiz ayakta durabilen çocukların boyu ise
      stadiyometre kullanılarak, ayakkabısız, baş yine Frankfurt düzlemindeyken,
      oksiput, sırt, kalça ve topukların dikey eksende cihaza temas ettiği
      pozisyonda ölçülmelidir.
    </p>

    <AlertBox type="info" title="Büyüme Eğrisi Kriterleri (WHO vs CDC)">
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>WHO 2006 (0-24 ay):</strong> Sadece anne sütü almış bebeklerin
          verilerine dayanır. Nasıl büyümesi gerektiğini gösteren "standart"tır.
          Bebeklerde primer tercih edilmelidir.
        </li>
        <li>
          <strong>CDC 2000 (2-19 yaş):</strong> Kesitsel verilere dayanır. Bir
          "referans" işlevi görerek 2 yaş sonrasında kullanılır.
        </li>
        <li>
          <strong>VKİ:</strong> 85-95. persentil arası fazla kiloluluk, ≥95.
          persentil obezite kabul edilir.
        </li>
      </ul>
    </AlertBox>

    <AlertBox type="warning" title="Prematüre İzlemi">
      <p>
        Prematüre doğan bebeklerde büyüme değerlendirilirken{" "}
        <strong>düzeltilmiş yaş (corrected age)</strong> kullanımı kritiktir.
        Çocuğun kronolojik yaşından, erken doğduğu hafta sayısı düşülerek
        hesaplanır ve bebek 24 aylık (veya doğum ağırlığı 1500g altındaysa 36
        aylık) olana dek kullanılır.
      </p>
    </AlertBox>

    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">
      1.2. Vücut Orantıları ve Genetik Potansiyel
    </h2>
    <p className="text-slate-700 leading-relaxed mb-4">
      Boy kısalığının veya büyüme geriliğinin etiyolojisi araştırılırken lineer
      boy ölçümünün ötesine geçilerek vücut orantılarının (body proportions)
      analizi yapılmalıdır.{" "}
      <strong>Üst segment / alt segment (Ü/A) oranı</strong> truncal büyüme ile
      ekstremite büyümesi arasındaki ilişkiyi yansıtır. Alt segment, simfizis
      pubis'in üst kenarından yere kadar olan mesafedir. Doğumda baş ve gövde
      görece daha büyüktür ve Ü/A oranı ortalama 1.7 civarındadır. 3 yaşında
      1.3'e, 7-8 yaşlarında ise 1.0 değerine ulaşarak eşitlenir.
    </p>

    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
      <h4 className="font-semibold text-indigo-900 mb-2">
        Genetik Potansiyel Hesaplama (Hedef Boy)
      </h4>
      <ul className="text-sm text-slate-700 space-y-2">
        <li>
          <strong>Erkek Çocuk:</strong> (Anne Boyu + 13 + Baba Boyu) / 2
        </li>
        <li>
          <strong>Kız Çocuk:</strong> (Baba Boyu - 13 + Anne Boyu) / 2
        </li>
        <li className="text-xs text-slate-500 italic mt-2">
          * Elde edilen değere ±10 cm eklenerek hedef aralık bulunur.
        </li>
      </ul>
    </div>

    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">
      1.3. Büyüme Hızı (Velocity) ve Evreleri
    </h2>

    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full table-fixed break-words whitespace-normal text-left text-[10px] sm:text-xs">
        <thead className="bg-indigo-50 text-indigo-900">
          <tr>
            <th className="w-1/3 p-2 sm:p-3 font-semibold border-r border-indigo-100">
              Yaşam Evresi
            </th>
            <th className="w-1/3 p-2 sm:p-3 font-semibold border-r border-indigo-100">
              Ortalama Yıllık Boy Uzama Hızı
            </th>
            <th className="w-1/3 p-2 sm:p-3 font-semibold">
              Büyümeyi Etkileyen Temel Hormonal/Biyolojik Faktörler
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 border-r border-slate-100 font-medium">
              Fetal Dönem
            </td>
            <td className="p-2 sm:p-3 border-r border-slate-100">
              60-100 cm/yıl (İntrauterin)
            </td>
            <td className="p-2 sm:p-3">
              İnsülin benzeri büyüme faktörleri (IGF), plasental fonksiyon, anne
              beslenmesi
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 border-r border-slate-100 font-medium">
              İnfantil Dönem (İlk 1 Yaş)
            </td>
            <td className="p-2 sm:p-3 border-r border-slate-100">
              23-27 cm/yıl
            </td>
            <td className="p-2 sm:p-3">Beslenme kalitesi, tiroid hormonları</td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 border-r border-slate-100 font-medium">
              İnfantil Dönem (1-2 Yaş)
            </td>
            <td className="p-2 sm:p-3 border-r border-slate-100">
              10-14 cm/yıl
            </td>
            <td className="p-2 sm:p-3">
              Büyüme hormonu ve genetik hedefe doğru kanallaşma başlar
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 border-r border-slate-100 font-medium">
              Çocukluk (2 Yaş - Puberte Başı)
            </td>
            <td className="p-2 sm:p-3 border-r border-slate-100">
              5-7 cm/yıl (Prepubertal nadir 5-5.5 cm)
            </td>
            <td className="p-2 sm:p-3">
              Büyüme hormonu (GH), IGF-1 ve tiroid hormonları
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 border-r border-slate-100 font-medium">
              Pubertal Büyüme Atağı
            </td>
            <td className="p-2 sm:p-3 border-r border-slate-100">
              Kızlarda: 8-12 cm/yıl, Erkeklerde: 10-14 cm/yıl
            </td>
            <td className="p-2 sm:p-3">
              GH ve Seks steroidlerinin (Östrojen, Testosteron) sinerjistik
              etkisi
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <AlertBox
      type="danger"
      title="Kırmızı Bayrak: Büyüme Geriliği (Growth Faltering)"
    >
      <p>
        Büyüme hızı eğrilerinde persentiller arasında{" "}
        <strong>iki veya daha fazla majör çizgi atlanarak</strong> aşağı doğru
        bir düşüş yaşanması, daima ileri tetkik gerektirir.
        <br />• Beslenme yetersizliği veya malabsorbsiyonda (Çölyak vb.) VKİ ve
        vücut ağırlığı düşer (wasting).
        <br />• Endokrin (Hipotiroidi, GH eksikliği) patolojilerde ise boy uzama
        hızı düşerken vücut ağırlığı korunur (rölatif obezite görünümü).
      </p>
    </AlertBox>

    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4 flex items-center gap-2">
      <Footprints className="w-5 h-5 text-indigo-500" /> 1.4. Diş Gelişimi ve
      Kronolojisi
    </h2>
    <p className="text-slate-700 text-sm mb-4 leading-relaxed">
      Bebeklerde diş gelişiminin fizyolojik varyasyonları oldukça geniştir;
      ancak{" "}
      <strong>
        13. aya gelmiş bir bebekte hiçbir süt dişinin sürmemiş olması "gecikmiş
        diş sürmesi" (delayed eruption) olarak kabul edilir
      </strong>{" "}
      ve ileri tıbbi değerlendirme gerektirir. Konjenital hipotiroidi, rikets,
      Down sendromu araştırılmalıdır.
    </p>

    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full table-fixed break-words whitespace-normal text-left text-[9px] sm:text-[10px] md:text-xs">
        <thead className="bg-indigo-50 text-indigo-900">
          <tr>
            <th className="p-2 border-r border-indigo-100 font-semibold">
              Süt (Birincil) Dişler
            </th>
            <th className="p-2 border-r border-indigo-100 font-semibold">
              Mineralizasyon Başlangıcı
            </th>
            <th className="p-2 border-r border-indigo-100 font-semibold">
              Sürme Yaşı (Aylar)
            </th>
            <th className="p-2 border-r border-indigo-100 font-semibold">
              Dökülme Yaşı (Yıllar)
            </th>
            <th className="p-2 font-semibold">
              Kalıcı Diş Sürme Yaşı (Yıllar)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          <tr className="hover:bg-slate-50">
            <td className="p-2 border-r border-slate-100 font-medium">
              Santral Kesiciler
            </td>
            <td className="p-2 border-r border-slate-100">Fetal 5. ay</td>
            <td className="p-2 border-r border-slate-100">
              Alt: 5-7, Üst: 6-8
            </td>
            <td className="p-2 border-r border-slate-100">
              Alt: 6-7, Üst: 7-8
            </td>
            <td className="p-2">Alt: 6-7, Üst: 7-8</td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 border-r border-slate-100 font-medium">
              Lateral Kesiciler
            </td>
            <td className="p-2 border-r border-slate-100">Fetal 5. ay</td>
            <td className="p-2 border-r border-slate-100">
              Alt: 7-10, Üst: 8-11
            </td>
            <td className="p-2 border-r border-slate-100">
              Alt: 7-8, Üst: 8-9
            </td>
            <td className="p-2">Alt: 7-8, Üst: 8-9</td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 border-r border-slate-100 font-medium">
              Kaninler (Köpek Dişi)
            </td>
            <td className="p-2 border-r border-slate-100">Fetal 6. ay</td>
            <td className="p-2 border-r border-slate-100">
              Alt: 16-20, Üst: 16-20
            </td>
            <td className="p-2 border-r border-slate-100">
              Alt: 9-11, Üst: 11-12
            </td>
            <td className="p-2">Alt: 9-11, Üst: 11-12</td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 border-r border-slate-100 font-medium">
              1. Molarlar (Azı)
            </td>
            <td className="p-2 border-r border-slate-100">Fetal 5. ay</td>
            <td className="p-2 border-r border-slate-100">
              Alt: 10-16, Üst: 10-16
            </td>
            <td className="p-2 border-r border-slate-100">
              Alt: 10-12, Üst: 10-12
            </td>
            <td className="p-2">6-7 yaş (Doğumda kalsifiye)</td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 border-r border-slate-100 font-medium">
              2. Molarlar
            </td>
            <td className="p-2 border-r border-slate-100">Fetal 6. ay</td>
            <td className="p-2 border-r border-slate-100">
              Alt: 20-30, Üst: 20-30
            </td>
            <td className="p-2 border-r border-slate-100">
              Alt: 11-13, Üst: 10-12
            </td>
            <td className="p-2">12-13 yaş</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Bolum2Gelisim = () => (
  <div className="space-y-6 animate-fade-in">
    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 border-b pb-4 flex items-center gap-2">
      <Brain className="w-8 h-8 text-indigo-600" />
      2. Gelişimin Değerlendirilmesi ve İzlemi
    </h1>
    <p className="text-slate-700 leading-relaxed">
      Nöromotor ve bilişsel gelişim, beyin korteksi, bazal ganglionlar,
      serebellum ve çevresel sinir ağlarının dinamik miyelinasyonu,
      sinaptogenezi ve budanması (pruning) ile paralel olarak şekillenir.
      Gelişimin değerlendirilmesinde salt beceri listelerinin kontrolü yeterli
      değildir; çocuğun psikososyal çevresinin, ailenin dinamiklerinin ve
      epigenetik etmenlerin analizini gerektiren çok boyutlu bir izlem planı
      yürütülmelidir.
    </p>

    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">
      2.1. Bronfenbrenner'in Ekolojik Modeli ve Risk Faktörleri
    </h2>
    <p className="text-slate-700 leading-relaxed">
      Çocuk gelişimi, Ekolojik Sistemler Kuramı doğrultusunda iç içe geçmiş
      halkalar halinde çocuğu çevreleyen faktörlerin etkileşimi olarak
      incelenmelidir. En iç halkada çocuğun doğrudan iletişimde olduğu
      mikrosistem (aile, okul, yakın çevre) yer alır. Fetal ve erken bebeklik
      dönemlerinde beynin nöral plastisitesi zirvededir; bu durum çocuğu hem
      pozitif eğitim müdahalelerine açık hale getirir hem de toksik stres
      faktörlerine karşı aşırı duyarlı kılar.
    </p>

    <AlertBox
      type="warning"
      title="IHELLP Kısaltması (Sosyal Risklerin Taranması)"
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
        <li>
          <strong>I (Income):</strong> Gelir eksikliği/yoksulluk
        </li>
        <li>
          <strong>H (Housing):</strong> Uygun olmayan barınma
        </li>
        <li>
          <strong>E (Education):</strong> Eğitim eksikliği
        </li>
        <li>
          <strong>L (Legal status):</strong> Yasal veya mülteci sorunları
        </li>
        <li>
          <strong>L (Literacy):</strong> Düşük okuryazarlık
        </li>
        <li>
          <strong>P (Personal safety):</strong> İhmal/istismar
        </li>
      </ul>
      <p className="mt-2 text-xs italic">
        Anne depresyonu veya ihmal öyküsü ile perinatal hipoksi gibi biyolojik
        risklerin bir arada bulunması, "çifte vurgun" (double jeopardy) etkisi
        yaratır.
      </p>
    </AlertBox>

    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4 flex items-center gap-2">
      <FileText className="w-5 h-5 text-indigo-500" /> 2.2. Gelişimsel Sürveyans
      ve Tarama Testleri
    </h2>
    <p className="text-slate-700 mb-4 leading-relaxed">
      Sağlıklı çocuk izleminde gelişimsel sürveyans her vizitte yapılmalıdır.
      Ancak Amerikan Pediatri Akademisi (AAP), her çocuğun{" "}
      <strong>9., 18. ve 30. ay vizitlerinde</strong> standardize edilmiş
      gelişimsel tarama testleriyle taranmasını ve ayrıca{" "}
      <strong>18. ve 24. aylarda Otizm Spektrum Bozukluğu</strong> spesifik
      testlerinin (M-CHAT-R/F) uygulanmasını kesin olarak önermektedir.
    </p>

    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full table-fixed break-words whitespace-normal text-left text-[10px] sm:text-xs">
        <thead className="bg-indigo-50 text-indigo-900">
          <tr>
            <th className="w-1/4 p-2 sm:p-3 font-semibold border-r border-indigo-100">
              Tarama Aracı
            </th>
            <th className="w-1/4 p-2 sm:p-3 font-semibold border-r border-indigo-100">
              Hedef Yaş
            </th>
            <th className="w-2/4 p-2 sm:p-3 font-semibold">
              Değerlendirilen Alanlar ve Özellikler
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 font-medium border-r border-slate-100">
              Denver II
            </td>
            <td className="p-2 sm:p-3 border-r border-slate-100">0-6 Yaş</td>
            <td className="p-2 sm:p-3">
              Kaba motor, ince motor-uyumsal, dil ve kişisel-sosyal. Toplam 139
              madde. Klinisyen tarafından gözlem ve ebeveyn raporu ile.
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 font-medium border-r border-slate-100">
              AGTE
            </td>
            <td className="p-2 sm:p-3 border-r border-slate-100">0-6 Yaş</td>
            <td className="p-2 sm:p-3">
              Türk çocukları için standardize, dil-bilişsel, motor, sosyal
              beceri ve özbakım alanlarını ölçen 154 maddelik aile anketi.
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 font-medium border-r border-slate-100">
              ASQ-3 / EGE
            </td>
            <td className="p-2 sm:p-3 border-r border-slate-100">2-66 Ay</td>
            <td className="p-2 sm:p-3">
              Ebeveyn tarafından doldurulan, problem çözme, iletişim ve motor
              becerileri puanlayan yüksek duyarlılıklı envanter.
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 font-medium border-r border-slate-100">
              Bayley III
            </td>
            <td className="p-2 sm:p-3 border-r border-slate-100">1-42 Ay</td>
            <td className="p-2 sm:p-3">
              Uzmanlarca uygulanan, yaş eşdeğeri puanı veren altın standart
              nörogelişimsel testtir.
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 font-medium border-r border-slate-100">
              M-CHAT-R/F
            </td>
            <td className="p-2 sm:p-3 border-r border-slate-100">16-48 Ay</td>
            <td className="p-2 sm:p-3">
              Otizm riskini tarayan, ortak dikkat, göz teması ve sembolik oyun
              gibi parametreleri inceleyen temel ölçektir.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">
      2.3. Anormal Gelişim Paternleri ve Kırmızı Bayraklar
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-800 mb-1">1. Gecikme (Delay)</h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          Becerilerin olağan sıralamayı takip etmesi ancak zamansal olarak
          normal popülasyondan belirgin şekilde geriden gelmesidir.
        </p>
      </div>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-800 mb-1">
          2. Disosiyasyon (Dissociation)
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          Bir veya iki gelişim akışında belirgin gecikme varken, diğerlerinin
          tamamen normal seyretmesidir (Örn: Otizmde izole konuşma bozukluğu).
        </p>
      </div>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-800 mb-1">
          3. Deviasyon (Deviation)
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          Gelişimsel kazanımların anatomik/nörolojik sıralamasının bozulmasıdır.
          (Örn: Oturmadan ayağa kalkan spastik diplejik serebral palsili bebek).
        </p>
      </div>
      <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 shadow-sm">
        <h4 className="font-bold text-rose-800 mb-1">
          4. Regresyon (Regression)
        </h4>
        <p className="text-sm text-rose-700 leading-relaxed">
          Daha önce kazandığı becerileri kaybetmesidir. İlerleyici
          nörodejeneratif hastalıkların en büyük kırmızı bayrağıdır (Acil!).
        </p>
      </div>
    </div>

    <AlertBox type="danger" title="Kesin Kırmızı Bayraklar (Zaman Çizelgesi)">
      <ul className="list-disc pl-5 space-y-1">
        <li>Göz temasının yokluğu, asimetrik postür veya kalıcı hipotoni.</li>
        <li>
          <strong>6. aya kadar:</strong> Babıldamanın olmaması (İşitme kontrolü
          şart).
        </li>
        <li>
          <strong>12. aya kadar:</strong> Desteksiz oturamama.
        </li>
        <li>
          <strong>15. aya kadar:</strong> Parmakla işaret etmeme (ortak dikkatin
          kurulamaması).
        </li>
        <li>
          <strong>18. aya kadar:</strong> Bağımsız yürüyememe.
        </li>
        <li>
          <strong>24. aya kadar:</strong> İki kelimeli cümleler kuramama.
        </li>
      </ul>
    </AlertBox>
  </div>
);

const Bolum3AyAy = () => {
  const [activeAgeTab, setActiveAgeTab] = useState(0);

  const ageData: AgeGroup[] = [
    {
      title: "Yenidoğan - 4. Ay",
      icon: <Baby className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
      months: [
        {
          name: "Yenidoğan & 1. Ay",
          bg: "bg-blue-50 border-blue-100",
          Büyüme:
            "İlk haftada fizyolojik tartı kaybı (yaklaşık %5-10), 10-14 gün içinde doğum kilosu yakalanır. İlk ayın sonunda ayda 800-1000 gr alım ve ~3 cm uzama beklenir.",
          Kaba_Motor:
            "Kollar/bacaklar fleksiyonda. Yüzükoyun asfiksiden korunmak için başını çevirebilir ama kaldıramaz. İlkel refleksler baskındır.",
          İnce_Motor:
            "Eller sıkıca yumruk (fisted). Palmar yakalama refleksi vardır.",
          Dil_Sosyal:
            "İnsan yüzüne 20-30 cm mesafeden sabitlenebilir (regards face). İhtiyaçlarını ağlayarak ifade eder.",
        },
        {
          name: "2. Ay",
          bg: "bg-white border-blue-50",
          Büyüme:
            "Hızlı kilo ve boy artışı devam eder. Baş çevresi ayda ortalama 2 cm büyür.",
          Kaba_Motor:
            "Yüzükoyun (tummy time) başını ve omuzlarını kısa süreliğine kaldırabilir. Traksiyonda baş düşüklüğü (head lag) görülür.",
          İnce_Motor:
            "Eller %50 açıktır, çıngırağı bir an tutabilir (bilinçli değil).",
          Dil_Sosyal:
            "Agulama (cooing) dönemi başlar. İletişim niyeti olan 'sosyal gülümseme' (social smile) ortaya çıkar.",
        },
        {
          name: "3. Ay",
          bg: "bg-blue-50 border-blue-100",
          Büyüme:
            "Büyüme hızı infantil dönemin hızlı evresindedir (ayda ortalama 600-800 gr alım, baş çevresi ayda 1-1.5 cm büyür).",
          Kaba_Motor:
            "Oturtulduğunda başını ara sıra dik tutabilir, yüzükoyun ön kollarından destek alarak gövdesini kaldırabilir. Yanlara yuvarlanma eğilimi.",
          İnce_Motor:
            "Orta hatta ellerini birleştirir, inceler. Eşyalara vurarak uzanmaya çalışır (batting).",
          Dil_Sosyal:
            "Neşeli sesler, çığlıklar. 180 derece hareket eden nesneleri ve yüzleri mükemmel izler (tracking).",
        },
        {
          name: "4. Ay",
          bg: "bg-white border-blue-50",
          Büyüme: "Büyüme hızı yüksektir; hızlı tartı alımı devam eder.",
          Kaba_Motor:
            "Sırtüstünden yüzükoyun pozisyona tam dönebilir (rolling). Kollarından çekildiğinde başı arkaya düşmez (no head lag) ve belden destekle oturur.",
          İnce_Motor:
            "Elleri sürekli açıktır. Volonter (isteyerek) yakalama başlar, nesneleri ağzına götürür (oral keşif).",
          Dil_Sosyal:
            "Yüksek sesle ve kıkırdayarak güler. Besini gördüğünde ağzını açarak hazır olduğunu gösterir.",
        },
      ],
    },
    {
      title: "5. Ay - 11. Ay",
      icon: <Activity className="w-5 h-5" />,
      color: "bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200",
      months: [
        {
          name: "5-6. Ay",
          bg: "bg-teal-50 border-teal-100",
          Büyüme:
            "Çocuğun doğum ağırlığı altıncı ayda yaklaşık iki katına ulaşır. Süt dişleri mineralize olup çıkmaya başlayabilir (ilk olarak alt santral kesiciler).",
          Kaba_Motor:
            "Tripod duruşuyla veya tamamen desteksiz oturabilir. Her iki yönde serbestçe dönebilir.",
          İnce_Motor:
            "Nesneleri bir elinden diğerine sorunsuzca geçirebilir (transfer). Düşen nesneyi arar.",
          Dil_Sosyal:
            "Babıldama (babbling - 'ba-ba') doruktadır. Sese başını çevirir. Aynadaki yansımasına güler. Yabancı kaygısı başlar.",
        },
        {
          name: "7-8. Ay",
          bg: "bg-white border-teal-50",
          Büyüme:
            "İlk yaşın ikinci yarısında büyüme hızı bir miktar yavaşlar. Alt ve üst lateral kesici dişlerin sürmesi gerçekleşebilir.",
          Kaba_Motor: "Desteksiz çok stabil oturur, yerde sürünmeye başlar.",
          İnce_Motor:
            "Tırmıklayarak yakalama (raking grasp). İki küpü alıp birbirine vurarak ses çıkarır.",
          Bilişsel:
            "Gözünün önünde saklanan nesnenin örtüsünü açarak bulabilir (Piaget 'nesne sürekliliği' kazanılmıştır).",
        },
        {
          name: "9. Ay",
          bg: "bg-teal-50 border-teal-100",
          Büyüme:
            "Ağırlık artışı devam eder ancak ilk aylara göre yavaştır. Fizyolojik gelişim hızla nöromotor alana kaymıştır.",
          Kaba_Motor:
            "Mobilyalara tutunarak ayağa kalkabilir (pulls to stand) ve sıralar. Emekleme çok etkindir.",
          İnce_Motor:
            "Başparmak ve işaret parmağıyla küçük nesneleri alma: Kıskaç kavraması (pincer grasp).",
          Dil_Sosyal:
            "İsmine tam döner. 'Hayır' kelimesini kavrar. 'Ce-e' (peek-a-boo) oynar. Parmakla işaret ederek ortak dikkat kurar.",
        },
        {
          name: "10-11. Ay",
          bg: "bg-white border-teal-50",
          Büyüme:
            "Bir yaşa doğru ağırlık artış hızı iyice yavaşlamıştır. Birinci azı (molar) dişlerin mineralizasyonu tamamlanır.",
          Kaba_Motor:
            "Bir süre ellerini bırakarak desteksiz ayakta dikilebilir.",
          İnce_Motor:
            "Nesneleri kontrollü bir şekilde kabın içine bırakabilir (voluntary release).",
          Dil_Sosyal:
            "'Bay-bay' yapmak gibi anlamlı jestleri kullanır. Spesifik 'mama' ve 'dada' kullanımı.",
        },
      ],
    },
    {
      title: "1 Yaş - 2 Yaş",
      icon: <Footprints className="w-5 h-5" />,
      color:
        "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200",
      months: [
        {
          name: "12. Ay (1 Yaş)",
          bg: "bg-orange-50 border-orange-100",
          Büyüme:
            "Doğum ağırlığı 3 katına, boyu yaklaşık 1.5 katına (ortalama 75 cm) ulaşır. Baş çevresi ~46 cm. Lineer büyüme 10 cm/yıl seviyesine inerek yavaşlar.",
          Kaba_Motor:
            "İlk desteksiz adımlarını atar veya elinden tutularak rahatça yürür. Ayaktayken çömelip (stoops) alıp tekrar ayağa kalkabilir.",
          İnce_Motor:
            "Kitap sayfalarını çevirmeye çalışır. Küplerle basit yığınlar.",
          Dil_Bilişsel:
            "Anne/baba bilerek söyler + 1-2 kelime. Basit tek adımlı yönergeleri jest yardımı olmadan yerine getirir. Egosantrik sembolik oyun başlar.",
        },
        {
          name: "15. Ay",
          bg: "bg-white border-orange-50",
          Büyüme:
            "Yıllık boy uzama hızı 10-14 cm/yıl bandında devam eder. Bacaklarda uzama ivme kazanır.",
          Kaba_Motor:
            "Desteksiz bağımsız düzgün yürür. Geriye doğru yürüyebilir.",
          İnce_Motor:
            "2 küpten dengeli kule yapar. Kalemle karalamalar (scribbling).",
          Dil_Sosyal:
            "Ortalama 4-6 net kelime. Başka çocukların oynadığı oyunları taklit eder. Empati gösterir (sarılır).",
        },
        {
          name: "18. Ay (1.5 Yaş)",
          bg: "bg-orange-50 border-orange-100",
          Büyüme:
            "Ön kol ve bacakların gövdeye göre uzaması belirginleşir. Köpek dişlerinin (kaninler) sürmesi beklenir.",
          Kaba_Motor:
            "Düşmeden koşabilir. Dengesini kaybetmeden topa tekme atabilir.",
          İnce_Motor:
            "3-4 küpten kule. Kaşığı bağımsız kullanır. Kıyafetlerini (şapka, çorap) tek başına çıkarabilir.",
          Dil: "10-20 kelime arası hazine. 'Burun nerede?' dendiğinde vücudunda 2-3 bölümü doğru işaret eder.",
        },
        {
          name: "24. Ay (2 Yaş)",
          bg: "bg-white border-orange-50",
          Büyüme:
            "Doğum ağırlığı dörde katlanmıştır. Büyüme hızı yılda ortalama 6-7 cm'ye yavaşlamıştır.",
          Kaba_Motor:
            "Merdivenleri her basamağa iki ayak basarak (in-out) tek başına iner/çıkar. Topu baş üstünden atar.",
          İnce_Motor: "6-7 küpten kule. Dikey/yatay çizgileri kopya edebilir.",
          Dil_Sosyal:
            "Yaklaşık 50 kelime. İki kelimelik anlamlı cümleler ('Baba git'). Diğer çocukların yanında 'Paralel oyun' oynar. 'Ben' zamirini öğrenir.",
        },
      ],
    },
    {
      title: "2.5 Yaş - 6 Yaş",
      icon: <Puzzle className="w-5 h-5" />,
      color:
        "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
      months: [
        {
          name: "30. Ay (2.5 Yaş)",
          bg: "bg-purple-50 border-purple-100",
          Büyüme:
            "2 ile 3 yaş arası büyüme hızı yılda 6-7 cm'dir. İkinci azı dişleri (molarlar) ağızda belirginleşir.",
          Kaba_Motor:
            "İki ayağıyla aynı anda yerden zıplayabilir (broad jump).",
          İnce_Motor: "8 küpten kule yapabilir.",
          Dil: "İsteklerini sürekli ifade eder, 'benim' aidiyetini kullanır ve 'neden' soruları yavaş yavaş başlar.",
        },
        {
          name: "36. Ay (3 Yaş)",
          bg: "bg-white border-purple-50",
          Büyüme:
            "Süt dentisyonu (20 adet diş) tamamen tamamlanmıştır. Çocuğun Üst Segment / Alt Segment (Ü/A) oranı 1.3 civarındadır, bacakların uzaması belirgindir.",
          Kaba_Motor:
            "Merdivenleri yetişkin gibi ayak değiştirerek (alternating) çıkabilir. Üç tekerlekli bisikleti (trisiklet) pedallayabilir.",
          İnce_Motor:
            "Yuvarlak (daire) kopyalayabilir. 9-10 küpten kule yapar. Yardımla diş fırçalar.",
          Dil_Sosyal:
            "Üç kelimelik cümleler, %75'i yabancılarca anlaşılır. Yaş/cinsiyet söyler. Paylaşmayı/sıra beklemeyi öğrenir.",
        },
        {
          name: "48. Ay (4 Yaş)",
          bg: "bg-purple-50 border-purple-100",
          Büyüme:
            "Düzenli çocukluk çağı büyüme evresi (yılda 5-7 cm uzama) sürer. Vücut orantıları yetişkine daha fazla yaklaşır.",
          Kaba_Motor:
            "Merdiveni ayak değiştirerek rahatça iner. Tek ayak üstünde seker (hopping).",
          İnce_Motor:
            "Artı (+) işareti ve kare kopyalar. Makasla düz çizgiden kağıt keser.",
          Dil_Sosyal:
            "Konuşmanın %100'ü anlaşılırdır. Zıt kavramları bilir. Organize, kurallı grup oyunları (cooperative play). Tamamen kendi kendine giyinip soyunur.",
        },
        {
          name: "60. Ay (5 Yaş)",
          bg: "bg-white border-purple-50",
          Büyüme:
            "Prepubertal dönemin yavaş ve istikrarlı lineer uzaması devam eder. Büyüme GH ve tiroid ekseninin kontrolündedir.",
          Kaba_Motor:
            "İp atlar gibi sıçrar (skipping) ve çok rahat seker. İki ayak üzerinde dengede durur.",
          İnce_Motor: "Üçgen kopyalar. Altı bölümlü detaylı insan çizer.",
          Dil_Sosyal:
            "Kompleks cümleler, 'Neden?'e mantıklı cevaplar. 10'a kadar atlamadan sayar. Kurallı oyunlara harfiyen uyar, özür diler.",
        },
        {
          name: "72. Ay (6 Yaş)",
          bg: "bg-purple-50 border-purple-100",
          Büyüme:
            "VKİ'nin adipozite reboundu yapmaya başladığı dönemdir. Ağızda kalıcı birinci büyük azı dişleri (molarlar) süt dişlerinin arkasından sürmeye başlar.",
          Kaba_Motor:
            "Tek ayak üzerinde 6 sn düşmeden kalır. İki tekerlekli bisiklete biner.",
          İnce_Motor: "El yazısı şekillenir, basit kelimeleri yazar.",
          Dil_Bilişsel:
            "Sağ ve sol kavramlarını ayırır. Okumaya ve hecelemeye başlar. Detaylı hikayeler kurgular.",
        },
      ],
    },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 border-b pb-4 flex items-center gap-2 mb-6">
        <Baby className="w-8 h-8 text-indigo-600" />
        3. Yenidoğandan 6 Yaşına Gelişim Basamakları
      </h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {ageData.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveAgeTab(idx)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors border ${
              activeAgeTab === idx
                ? tab.color + " ring-2 ring-offset-2 ring-indigo-400"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {tab.icon} {tab.title}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {ageData[activeAgeTab].months.map((m, i) => (
          <div
            key={i}
            className={`p-4 sm:p-5 rounded-xl border shadow-sm transition-all ${m.bg}`}
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200/50 pb-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              {m.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              {m.Büyüme && (
                <div className="bg-white/60 p-3 rounded-lg border border-slate-100/50 md:col-span-2">
                  <span className="font-bold flex items-center gap-1.5 text-slate-800 mb-1">
                    <TrendingUp className="w-4 h-4 text-indigo-500" /> Büyüme
                    Beklentisi:
                  </span>
                  <span className="text-slate-700 leading-relaxed block">
                    {m.Büyüme}
                  </span>
                </div>
              )}
              {m.Kaba_Motor && (
                <div>
                  <span className="font-semibold text-indigo-700 block mb-0.5">
                    Kaba Motor:
                  </span>{" "}
                  <span className="text-slate-600 leading-relaxed">
                    {m.Kaba_Motor}
                  </span>
                </div>
              )}
              {m.İnce_Motor && (
                <div>
                  <span className="font-semibold text-emerald-700 block mb-0.5">
                    İnce Motor:
                  </span>{" "}
                  <span className="text-slate-600 leading-relaxed">
                    {m.İnce_Motor}
                  </span>
                </div>
              )}
              {m.Dil_Sosyal && (
                <div>
                  <span className="font-semibold text-amber-700 block mb-0.5">
                    Dil & Sosyal:
                  </span>{" "}
                  <span className="text-slate-600 leading-relaxed">
                    {m.Dil_Sosyal}
                  </span>
                </div>
              )}
              {m.Bilişsel && (
                <div>
                  <span className="font-semibold text-purple-700 block mb-0.5">
                    Bilişsel:
                  </span>{" "}
                  <span className="text-slate-600 leading-relaxed">
                    {m.Bilişsel}
                  </span>
                </div>
              )}
              {m.Dil_Bilişsel && (
                <div>
                  <span className="font-semibold text-blue-700 block mb-0.5">
                    Dil & Bilişsel:
                  </span>{" "}
                  <span className="text-slate-600 leading-relaxed">
                    {m.Dil_Bilişsel}
                  </span>
                </div>
              )}
              {m.Dil && (
                <div>
                  <span className="font-semibold text-rose-700 block mb-0.5">
                    Dil:
                  </span>{" "}
                  <span className="text-slate-600 leading-relaxed">
                    {m.Dil}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Bolum4GGG = () => (
  <div className="space-y-6 animate-fade-in">
    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 border-b pb-4 flex items-center gap-2">
      <AlertTriangle className="w-8 h-8 text-indigo-600" />
      4. Global Gelişme Geriliğine Yaklaşım
    </h1>

    <p className="text-slate-700 leading-relaxed">
      <strong>Global Gelişme Geriliği (GGG)</strong>, 5 yaşından küçük
      çocuklarda kaba motor, ince motor, alıcı/ifade edici dil, bilişsel
      yetenekler ve kişisel/sosyal gelişim alanlarının{" "}
      <strong>en az ikisinde</strong> normatif yaş verilerine göre 2 standart
      sapma ve üzerinde (DQ &lt; 70) gecikme bulunmasıdır. 5 yaşından büyüklerde
      IQ skoru ≤70 olması ve adaptif kısıtlılık saptanmasına{" "}
      <strong>Zihinsel Yetersizlik (ZY)</strong> denir.
    </p>

    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4 flex items-center gap-2">
      <Syringe className="w-5 h-5 text-indigo-500" /> 4.1. Epidemiyoloji ve
      Etiyoloji
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-indigo-800 mb-2">
          1. Genetik ve Kromozomal Anomaliler
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          GGG'nin en sık nedeni. Trizomi 21 (Down), mikrodelesyonlar (22q11.2,
          1p36), Frajil X ve imprinting bozuklukları (Prader-Willi, Angelman).
        </p>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-indigo-800 mb-2">
          2. Serebral Disgeneziler
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          Nöronal migrasyon defektleri, lizensefali vb. GGG vakalarının yaklaşık
          %28'i.
        </p>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-indigo-800 mb-2">
          3. Pre/Perinatal Faktörler
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          TORCH, Fetal Alkol Spektrumu, Hipoksik-İskemik Ensefalopati (HİE -
          Kuadriplejik SP'nin yaygın nedeni), Prematürite.
        </p>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-indigo-800 mb-2">
          4. Kalıtsal Metabolik ve Endokrin
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          DKMH (PKU, biyotinidaz eksikliği) çok nadir olsa da "tedavi
          edilebilir" oldukları için atlanmamalıdır. Konjenital hipotiroidi
          kalıcı zihinsel yetersizlik yapar.
        </p>
      </div>
    </div>

    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4 flex items-center gap-2">
      <Stethoscope className="w-5 h-5 text-indigo-500" /> 4.2. Tanısal Yaklaşım
      ve Fizik Muayene İpuçları
    </h2>

    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-6">
      <table className="w-full table-fixed break-words whitespace-normal text-left text-[10px] sm:text-xs">
        <thead className="bg-rose-50 text-rose-900">
          <tr>
            <th className="w-1/2 p-2 sm:p-3 font-semibold border-r border-rose-100">
              İpucu Veren Klinik Bulgu
            </th>
            <th className="w-1/2 p-2 sm:p-3 font-semibold">
              Olası Sendromlar / Metabolik Hastalıklar
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 font-medium border-r border-slate-100">
              Göz: Kiraz Kırmızısı Leke (Cherry-red spot)
            </td>
            <td className="p-2 sm:p-3">
              Tay-Sachs, Niemann-Pick Tip A, GM1 Gangliosidoz
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 font-medium border-r border-slate-100">
              Göz: Katarakt
            </td>
            <td className="p-2 sm:p-3">
              Galaktozemi, Lowe sendromu, Serebrotendinöz Ksantomatozis
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 font-medium border-r border-slate-100">
              Göz: Retinitis Pigmentosa
            </td>
            <td className="p-2 sm:p-3">
              Mitokondriyal hastalıklar (MELAS, Kearns-Sayre), Refsum, NCL
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 font-medium border-r border-slate-100">
              Deri: Sütlü Kahve (Cafe-au-Lait) ve Depigmente Lekeler
            </td>
            <td className="p-2 sm:p-3">
              Nörofibromatozis Tip 1 (NF1), Tüberoskleroz
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 font-medium border-r border-slate-100">
              Saç: Kırılgan (Trikoreksis Nodosa)
            </td>
            <td className="p-2 sm:p-3">
              Menkes hastalığı, Arjininosüksinik asidüri, Biyotinidaz eksikliği
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 font-medium border-r border-slate-100">
              Sistemik: Organomegali (Hepatosplenomegali)
            </td>
            <td className="p-2 sm:p-3">
              Gaucher, Niemann-Pick, Mukopolisakkaridozlar, Glikojen Depo
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-2 sm:p-3 font-medium border-r border-slate-100">
              Sistemik: Kaba Yüz (Gargoylism), Dizostozis
            </td>
            <td className="p-2 sm:p-3">
              Mukopolisakkaridozlar (Hurler, Hunter), Oligosakkaridozlar
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <AlertBox type="info" title="Araştırma Algoritması">
      <ol className="list-decimal pl-5 space-y-2 mt-2">
        <li>
          <strong>Temel Tetkikler:</strong> İşitme/Görme testi, CK, Tiroid, B12.
        </li>
        <li>
          <strong>Altın Standart Genetik:</strong>{" "}
          <strong>Kromozomal Mikrodizileme (CMA)</strong> standart karyotipin
          yerini almıştır. <strong>Frajil X Testi</strong> her çocukta mutlaka
          taranmalıdır.
        </li>
        <li>
          <strong>Metabolik Tarama:</strong> Kreatin Eksikliği Sendromları
          (SLC6A8, GAMT) için GAA/Kreatin oranları. Homosistein, aminoasitler
          vb.
        </li>
        <li>
          <strong>MRG Endikasyonu:</strong> Mikrosefali, asimetrik fokal
          bulgular, spastisite veya nöbet varsa zorunludur. Rutin çekilmez.
        </li>
        <li>
          <strong>Cinsiyete Özgü (İleri test):</strong> Kızlarda regresyon/el
          stereotipisi varsa MECP2 (Rett Sendromu). Erkeklerde dayı vb. öykü
          varsa XLID Paneli.
        </li>
      </ol>
    </AlertBox>

    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">
      4.4. Tedavi ve Nöroplastisite
    </h2>
    <p className="text-slate-700 leading-relaxed text-sm">
      Tanı beklenmeden "erken müdahale" şarttır. Çalışan bellek (Working memory)
      eğitimleri (Klingberg modeli vb.) beyin beyaz cevher yollarında
      miyelinasyonu artırarak kalıcı düzelme sağlar. Komorbiditelerin (Epilepsi
      %15-20, Psikiyatrik %40) yönetimi kritiktir (Örn: İritabilite için düşük
      doz Risperidon).
    </p>
  </div>
);

const Bolum5Sorular = () => {
  const [filter, setFilter] = useState("Tümü");
  const kategoriler = ["Tümü", "Büyüme", "Gelişim", "GGG"];

  const filteredSorular =
    filter === "Tümü" ? sorular : sorular.filter((s) => s.kategori === filter);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-8 h-8 text-indigo-600" />
          5. Çalışma Soruları ({sorular.length})
        </h1>
        <div className="flex flex-wrap gap-2">
          {kategoriler.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors border ${
                filter === cat
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredSorular.map((soru) => (
          <SoruKarti key={soru.id} soruData={soru} />
        ))}
      </div>
    </div>
  );
};

const Kaynakca = () => (
  <div className="animate-fade-in bg-slate-50 p-6 rounded-xl border border-slate-200">
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
      <BookOpen className="w-6 h-6 text-indigo-600" /> Alıntılanan Çalışmalar
    </h2>
    <ul className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600 break-words leading-relaxed">
      <li>
        Growth Velocity of Infants from Birth to 5 Years Born in Maku, Iran -
        Semantic Scholar
      </li>
      <li>WHO Child Growth Standards - IRIS</li>
      <li>Growth Monitoring - Case Based Pediatrics Chapter</li>
      <li>
        Monitoring postnatal growth of preterm infants: present and future - PMC
        - NIH
      </li>
      <li>Nelson essentials of pediatrics</li>
      <li>Short Stature | Obgyn Key</li>
      <li>
        Upper and Lower Body Segment Ratios from Birth to 18 years in Children
        from Western Maharashtra
      </li>
      <li>Pediatrice Endocrine - UTMB</li>
      <li>Assessment of Growth - Nelson Textbook of Pediatrics</li>
      <li>
        Delayed Eruption of Primary Teeth Among Children with Down Syndrome -
        JIDMR
      </li>
      <li>A Narrative Review on Advancing Pediatric Oral Health - PMC</li>
      <li>CDC's Revised Developmental Milestone Checklists - PMC - NIH</li>
      <li>AAP Developmental and Behavioral Pediatrics 2nd Edition</li>
      <li>Milestones by 2 Months | Learn the Signs. Act Early. - CDC</li>
      <li>CDC's Developmental Milestones | Learn the Signs. Act Early.</li>
      <li>Developmental Milestones Table, Pediatrics PIR</li>
      <li>Nelson's Pediatrics Table 8-1. Developmental Milestones</li>
      <li>Evaluation of Short and Tall Stature in Children | AFP - AAFP</li>
      <li>
        Developmental Milestones and Daily Living Skills in Individuals With
        Angelman Syndrome
      </li>
      <li>Creatine Disorders Panel Testing | Test Fact Sheet - ARUP Consult</li>
    </ul>
  </div>
);

// --- ANA UYGULAMA BİLEŞENİ ---

export default function App() {
  const [activeTab, setActiveTab] = useState("buyume");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mobil menü açıkken arkadaki body'nin kaymasını (scroll) engelle
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const tabs = [
    { id: "buyume", label: "Büyüme", icon: <TrendingUp className="w-5 h-5" /> },
    { id: "gelisim", label: "Gelişim", icon: <Brain className="w-5 h-5" /> },
    { id: "ayay", label: "Ay Ay Gelişim", icon: <Baby className="w-5 h-5" /> },
    {
      id: "ggg",
      label: "Global Gelişme Geriliği",
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    {
      id: "sorular",
      label: "Çalışma Soruları",
      icon: <HelpCircle className="w-5 h-5" />,
    },
    {
      id: "kaynaklar",
      label: "Kaynakça",
      icon: <BookOpen className="w-5 h-5" />,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "buyume":
        return <Bolum1Buyume />;
      case "gelisim":
        return <Bolum2Gelisim />;
      case "ayay":
        return <Bolum3AyAy />;
      case "ggg":
        return <Bolum4GGG />;
      case "sorular":
        return <Bolum5Sorular />;
      case "kaynaklar":
        return <Kaynakca />;
      default:
        return <Bolum1Buyume />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col md:flex-row selection:bg-indigo-100 selection:text-indigo-900">
      {/* MOBIL HEADER */}
      <div className="md:hidden bg-indigo-700 text-white p-4 flex justify-between items-center shadow-md relative z-20">
        <div className="flex items-center gap-2 font-bold text-lg tracking-wide">
          <Stethoscope className="w-6 h-6 text-indigo-200" />
          DoctoApp Pediatri
        </div>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-1.5 rounded-lg bg-indigo-600/50 hover:bg-indigo-500 focus:outline-none transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* OFF-CANVAS MOBİL BACKDROP */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR / MOBILE NAV (OFF-CANVAS) */}
      <div
        className={`${
          mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        } md:translate-x-0 fixed md:sticky top-0 h-screen left-0 w-[280px] bg-white border-r border-slate-200 md:shadow-none transform transition-transform duration-300 ease-in-out z-40 flex flex-col overflow-hidden`}
      >
        {/* Sidebar Kendi Header Alanı (Mobilde de Görünür ve Üstte Kalmayı Engeller) */}
        <div className="flex p-5 md:p-6 border-b border-slate-100 items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2.5 rounded-xl">
              <Stethoscope className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="font-bold text-lg text-slate-800 leading-tight">
              DoctoApp
              <br />
              <span className="text-indigo-600 text-sm">Pediatri Notu</span>
            </h2>
          </div>
          {/* Mobil Kapatma Butonu */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Linkleri */}
        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">
            İÇİNDEKİLER
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setMobileMenuOpen(false);
                window.scrollTo(0, 0);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-50 text-indigo-700 border-indigo-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent"
              } border`}
            >
              <div
                className={`${
                  activeTab === tab.id ? "text-indigo-600" : "text-slate-400"
                }`}
              >
                {tab.icon}
              </div>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4 text-xs font-medium text-center text-slate-400 border-t bg-slate-50">
          Doküman Verisyonu 2.2
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-12 w-full max-w-5xl mx-auto pb-24">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 md:p-10 min-h-[80vh]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
