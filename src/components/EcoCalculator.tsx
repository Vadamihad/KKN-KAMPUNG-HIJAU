import { useState } from 'react';
import { Leaf, Recycle, Trees, Sparkles, HelpCircle, Activity } from 'lucide-react';

export default function EcoCalculator() {
  const [organic, setOrganic] = useState<number>(3); // kg per week
  const [inorganic, setInorganic] = useState<number>(4); // kg per week
  const [plants, setPlants] = useState<number>(12); // active pots/trees

  // Impact Constants
  // 1 kg organic waste composted avoids ~2.1 kg CO2e of landfill methane
  // 1 kg inorganic waste recycled avoids ~1.5 kg CO2e
  // 1 plant/tree absorbs ~21.8 kg CO2e per year
  const annualOrganicComposted = organic * 52;
  const annualInorganicRecycled = inorganic * 52;
  const annualWasteDiverted = annualOrganicComposted + annualInorganicRecycled;

  const co2FromOrganic = annualOrganicComposted * 2.1;
  const co2FromInorganic = annualInorganicRecycled * 1.5;
  const co2FromPlants = plants * 21.8;
  const totalCo2Prevented = co2FromOrganic + co2FromInorganic + co2FromPlants;

  // Car kilometers saved (average car emits 0.18 kg CO2 per km)
  const carKmEquivalent = Math.round(totalCo2Prevented / 0.18);

  return (
    <div
      id="eco-calculator"
      className="bg-white rounded-3xl border border-border-soft overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 hover:border-brand-primary transition-all duration-300"
    >
      {/* Slider Controls Panel */}
      <div className="p-8 lg:col-span-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-brand-light text-brand-primary rounded-lg border border-brand-medium/20">
              <Activity className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
              Kalkulator Mandiri
            </span>
          </div>
          <h3 className="font-display font-bold text-2xl text-brand-deep tracking-tight mb-2">
            Hitung Kontribusi Hijau Anda
          </h3>
          <p className="text-neutral-muted text-sm leading-relaxed mb-8">
            Geser tombol di bawah sesuai dengan perkiraan kebiasaan ramah lingkungan rumah tangga Anda setiap pekannya.
          </p>

          <div className="space-y-6">
            {/* Input 1: Organic */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="organic-range" className="flex items-center text-sm font-bold text-neutral-dark">
                  <Recycle className="w-4 h-4 text-brand-primary mr-2" />
                  Sampah Organik Dikompos
                </label>
                <span className="font-mono text-xs font-extrabold bg-brand-light text-brand-primary px-2.5 py-1 rounded">
                  {organic} kg / minggu
                </span>
              </div>
              <input
                id="organic-range"
                type="range"
                min="0"
                max="25"
                step="1"
                value={organic}
                onChange={(e) => setOrganic(Number(e.target.value))}
                className="w-full h-2 bg-bg-light rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <p className="text-[11px] text-neutral-light font-medium">
                Sisa sayuran, buah, nasi, daun kering yang diolah jadi pupuk di rumah.
              </p>
            </div>

            {/* Input 2: Inorganic */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="inorganic-range" className="flex items-center text-sm font-bold text-neutral-dark">
                  <Leaf className="w-4 h-4 text-brand-accent mr-2" />
                  Sampah Anorganik Disetor ke Bank Sampah
                </label>
                <span className="font-mono text-xs font-extrabold bg-brand-light text-brand-deep px-2.5 py-1 rounded">
                  {inorganic} kg / minggu
                </span>
              </div>
              <input
                id="inorganic-range"
                type="range"
                min="0"
                max="40"
                step="1"
                value={inorganic}
                onChange={(e) => setInorganic(Number(e.target.value))}
                className="w-full h-2 bg-bg-light rounded-lg appearance-none cursor-pointer accent-brand-accent"
              />
              <p className="text-[11px] text-neutral-light font-medium">
                Kertas, kardus, botol plastik, kaleng, logam yang disetor untuk didaur ulang.
              </p>
            </div>

            {/* Input 3: Plants */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="plants-range" className="flex items-center text-sm font-bold text-neutral-dark">
                  <Trees className="w-4 h-4 text-brand-deep mr-2" />
                  Jumlah Tanaman / Pot di Rumah
                </label>
                <span className="font-mono text-xs font-extrabold bg-brand-medium/20 text-brand-deep px-2.5 py-1 rounded">
                  {plants} tanaman
                </span>
              </div>
              <input
                id="plants-range"
                type="range"
                min="0"
                max="80"
                step="2"
                value={plants}
                onChange={(e) => setPlants(Number(e.target.value))}
                className="w-full h-2 bg-bg-light rounded-lg appearance-none cursor-pointer accent-brand-deep"
              />
              <p className="text-[11px] text-neutral-light font-medium">
                Tanaman pot, tanaman rambat, sayur hidroponik, atau pohon buah di pekarangan Anda.
              </p>
            </div>
          </div>
        </div>

        {/* Informative Tip */}
        <div className="mt-8 p-4 bg-brand-light/20 rounded-2xl border border-brand-light flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-brand-deep leading-relaxed">
            <strong>Tahukah Anda?</strong> Dengan memilah sampah organik, Anda membantu mencegah penumpukan sampah basah di TPA Piyungan yang berisiko meledak akibat gas metana liar!
          </p>
        </div>
      </div>

      {/* Results Panel */}
      <div className="bg-brand-deep text-white p-8 lg:col-span-5 flex flex-col justify-between relative overflow-hidden">
        {/* Absolute Background Graphics */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-brand-primary/40 rounded-full blur-2xl" />
        <div className="absolute -left-12 -top-12 w-48 h-48 bg-brand-accent/20 rounded-full blur-2xl" />

        <div className="relative z-10">
          <h4 className="font-display font-semibold text-lg text-brand-light tracking-wide mb-6">
            Dampak Tahunan Anda
          </h4>

          <div className="space-y-6">
            {/* Impact 1: Waste Diverted */}
            <div>
              <span className="text-xs font-bold text-brand-light/70 uppercase tracking-widest font-mono block">
                SAMPAH TERALIHKAN DARI TPA
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-display font-extrabold text-3xl tracking-tight text-white">
                  {annualWasteDiverted}
                </span>
                <span className="text-sm font-semibold text-brand-light/90">
                  kg / tahun
                </span>
              </div>
              <div className="w-full bg-brand-deep/80 border border-brand-primary/20 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-brand-accent h-full transition-all duration-500 ease-out" 
                  style={{ width: `${Math.min(100, (annualWasteDiverted / 1500) * 100)}%` }} 
                />
              </div>
            </div>

            {/* Impact 2: CO2 Prevented */}
            <div>
              <span className="text-xs font-bold text-brand-light/70 uppercase tracking-widest font-mono block">
                EMISI CO2 DIURANGI
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-display font-extrabold text-3xl text-brand-light tracking-tight">
                  {totalCo2Prevented.toFixed(1)}
                </span>
                <span className="text-sm font-semibold text-brand-light/90">
                  kg CO₂e / tahun
                </span>
              </div>
              <div className="w-full bg-brand-deep/80 border border-brand-primary/20 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-brand-medium h-full transition-all duration-500 ease-out" 
                  style={{ width: `${Math.min(100, (totalCo2Prevented / 2000) * 100)}%` }} 
                />
              </div>
            </div>

            {/* Impact 3: Kilometers Saved */}
            <div className="pt-4 border-t border-brand-primary/40">
              <span className="text-xs font-bold text-brand-light/70 uppercase tracking-widest font-mono block">
                SETARA PERJALANAN MOBIL
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-display font-extrabold text-2xl text-brand-light tracking-tight">
                  {carKmEquivalent.toLocaleString('id-ID')}
                </span>
                <span className="text-sm font-semibold text-brand-light/90">
                  km berkendara dikurangi
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-8 pt-6 border-t border-brand-primary/40 flex items-center gap-3">
          <div className="p-2 bg-brand-primary/60 rounded-xl border border-brand-primary">
            <Sparkles className="w-5 h-5 text-brand-accent animate-pulse" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-brand-light">Keluarga Berdaya Hijau</h5>
            <p className="text-[11px] text-brand-light/80 leading-tight">
              Kontribusi kecil Anda adalah pondasi kelestarian Yogyakarta!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
