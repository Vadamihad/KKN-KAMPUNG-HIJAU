import * as Icons from 'lucide-react';
import { Program } from '../types';

interface ProgramCardProps {
  program: Program;
  onOpenModal: (program: Program) => void;
}

export default function ProgramCard({ program, onOpenModal }: ProgramCardProps) {
  // Resolve icon safely
  const IconComponent = (Icons as any)[program.iconName] || Icons.Calendar;

  const categoryColor = {
    semua: 'bg-bg-light text-neutral-dark border-border-soft',
    sampah: 'bg-brand-light/40 text-brand-primary border-brand-medium/30',
    farming: 'bg-brand-light text-brand-primary border-brand-medium/50',
    penghijauan: 'bg-brand-medium/20 text-brand-deep border-brand-medium/40',
    edukasi: 'bg-brand-light/60 text-brand-deep border-brand-medium/20',
  }[program.category];

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
    <div
      id={`program-${program.id}`}
      className="group bg-white rounded-2xl border border-border-soft overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:border-brand-primary shadow-[0_8px_30px_rgb(0,0,0,0.01)]"
    >
      {/* Header Visual Stripe */}
      <div className={`h-2.5 w-full ${
        program.category === 'sampah' ? 'bg-brand-accent' :
        program.category === 'farming' ? 'bg-brand-primary' :
        program.category === 'penghijauan' ? 'bg-brand-medium' :
        'bg-brand-deep'
      }`} />

      <div className="p-6 flex-1 flex flex-col">
        {/* Badges */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${categoryColor}`}>
            {categoryLabel}
          </span>
          <span className={`text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full ${statusBadge.classes}`}>
            {statusBadge.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-brand-deep group-hover:text-brand-primary transition-colors duration-200 line-clamp-1 mb-2">
          {program.title}
        </h3>

        {/* Short Description */}
        <p className="text-neutral-muted text-sm leading-relaxed flex-1 line-clamp-3 mb-6">
          {program.description}
        </p>

        {/* Meta details */}
        <div className="space-y-2 mb-6 pt-4 border-t border-border-soft">
          <div className="flex items-center text-xs text-neutral-light font-mono">
            <Icons.Calendar className="w-4 h-4 text-brand-primary mr-2 flex-shrink-0" />
            <span className="truncate">{program.date}</span>
          </div>
          <div className="flex items-center text-xs text-neutral-light font-mono">
            <Icons.MapPin className="w-4 h-4 text-brand-primary mr-2 flex-shrink-0" />
            <span className="truncate">{program.location}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          id={`btn-detail-${program.id}`}
          onClick={() => onOpenModal(program)}
          className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-sm font-bold text-brand-primary bg-brand-light/40 hover:bg-brand-primary hover:text-white transition-all duration-200 cursor-pointer border border-brand-light"
        >
          Lihat Detail Kegiatan
          <Icons.ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
