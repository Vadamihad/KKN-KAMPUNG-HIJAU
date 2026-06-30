export type ProgramCategory = 'semua' | 'sampah' | 'farming' | 'penghijauan' | 'edukasi';

export type ProgramStatus = 'aktif' | 'selesai' | 'rencana';

export interface Program {
  id: string;
  title: string;
  category: ProgramCategory;
  status: ProgramStatus;
  description: string;
  fullDescription: string;
  date: string;
  location: string;
  coordinator: string;
  impact: string;
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  iconName: string;
  colorClass: string;
  accentClass: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatarSeed: string;
}

export interface MessageSubmission {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface MemberItem {
  name: string;
  prodi: string;
  fakultas: string;
  role: string;
  color: string;
  iconName: string;
  desc: string;
}
