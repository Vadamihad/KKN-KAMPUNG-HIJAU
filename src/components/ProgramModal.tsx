import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { Program } from '../types';

interface ProgramModalProps {
  program: Program | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProgramModal({ program, isOpen, onClose }: ProgramModalProps) {
  if (!program) return null;

  // Resolve icon safely
  const IconComponent = (Icons as any)[program.iconName] || Icons.Calendar;

  const categoryLabel = {
    semua: 'Semua',
    sampah: 'Sampah & Kompos',
    farming: 'Urban Farming',
    penghijauan: 'Penghijauan',
    edukasi: 'Edukasi Lingkungan',
  }[program.category];

  const statusBadge = {
    aktif: {
      label: 'Aktif Berjalan',
      classes: 'bg-brand-primary text-white shadow-sm',
    },
    selesai: {
      label: 'Selesai Tahap I',
      classes: 'bg-neutral-muted text-white shadow-sm',
    },
    rencana: {
      label: 'Direncanakan',
      classes: 'bg-brand-accent text-brand-deep shadow-sm',
    },
  }[program.status];

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Content Panel */}
          <motion.div
            id="modal-panel"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto z-10 border border-border-soft"
          >
            {/* Top color strip */}
            <div className={`h-3 w-full ${
              program.category === 'sampah' ? 'bg-brand-accent' :
              program.category === 'farming' ? 'bg-brand-primary' :
              program.category === 'penghijauan' ? 'bg-brand-medium' :
              'bg-brand-deep'
            }`} />

            {/* Close Button */}
            <button
              id="btn-close-modal"
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-neutral-light hover:text-neutral-dark hover:bg-bg-light transition-colors duration-200 cursor-pointer"
              aria-label="Tutup detail program"
            >
              <Icons.X className="w-5 h-5" />
            </button>

            <div className="p-8">
              {/* Category & Status */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-light text-brand-primary border border-brand-medium/30">
                  {categoryLabel}
                </span>
                <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusBadge.classes}`}>
                  {statusBadge.label}
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-brand-light rounded-2xl text-brand-primary border border-brand-medium/30 flex-shrink-0">
                  <IconComponent className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-brand-deep tracking-tight leading-tight">
                    {program.title}
                  </h2>
                </div>
              </div>

              {/* Full Description */}
              <div className="prose prose-emerald max-w-none mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">Tentang Program</h4>
                <p className="text-neutral-muted text-sm leading-relaxed whitespace-pre-line font-medium">
                  {program.fullDescription}
                </p>
              </div>

              {/* Details Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-bg-light/50 border border-border-soft rounded-2xl mb-8">
                {/* Schedule */}
                <div className="flex items-start gap-3">
                  <Icons.Calendar className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-neutral-light uppercase tracking-wide">Jadwal / Waktu</h5>
                    <p className="text-xs font-bold text-neutral-dark mt-0.5 font-mono">{program.date}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <Icons.MapPin className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-neutral-light uppercase tracking-wide">Lokasi</h5>
                    <p className="text-xs font-bold text-neutral-dark mt-0.5 font-mono">{program.location}</p>
                  </div>
                </div>

                {/* Coordinator */}
                <div className="flex items-start gap-3 pt-3 border-t md:border-t-0 md:pt-0 border-dashed border-border-soft">
                  <Icons.User className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-neutral-light uppercase tracking-wide">Koordinator Lapangan</h5>
                    <p className="text-xs font-bold text-neutral-dark mt-0.5">{program.coordinator}</p>
                  </div>
                </div>

                {/* Impact Statement */}
                <div className="flex items-start gap-3 pt-3 border-t md:border-t-0 md:pt-0 border-dashed border-border-soft">
                  <Icons.TrendingUp className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-neutral-light uppercase tracking-wide">Capaian & Dampak</h5>
                    <p className="text-xs font-bold text-brand-deep mt-0.5">{program.impact}</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  id="link-wa-coordinator"
                  href={`https://wa.me/628123456789?text=Halo%20koordinator%20${encodeURIComponent(program.title)}%20Kampung%20Hijau%20Cokrodiningratan,%20saya%20tertarik%20untuk%20ikut%20serta...`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center bg-brand-primary hover:bg-brand-deep text-white font-bold py-3 px-6 rounded-2xl text-sm transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <Icons.MessageSquareCode className="w-4 h-4 mr-2" />
                  Hubungi Koordinator via WA
                </a>
                <button
                  id="btn-close-modal-footer"
                  onClick={onClose}
                  className="inline-flex items-center justify-center bg-bg-light hover:bg-border-soft text-neutral-dark font-bold py-3 px-6 rounded-2xl text-sm transition-all duration-200 cursor-pointer border border-border-soft"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
