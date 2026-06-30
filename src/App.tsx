import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Menu, 
  X, 
  ArrowUp, 
  ChevronRight, 
  BookOpen, 
  ShieldCheck, 
  Sparkles,
  Heart,
  ChevronRightSquare,
  Volume2,
  Trash2,
  Sprout,
  Calendar,
  Users,
  MapPin,
  TrendingUp,
  FileCheck,
  Award
} from 'lucide-react';

import { Program, ProgramCategory } from './types';
import { PROGRAMS_DATA, FAQ_DATA, TESTIMONIALS_DATA, MEMBERS_DATA } from './data';

import ProgramCard from './components/ProgramCard';
import ProgramModal from './components/ProgramModal';
import FaqAccordion from './components/FaqAccordion';
import ContactForm from './components/ContactForm';

const renderMemberIcon = (iconName: string) => {
  switch (iconName) {
    case 'Award':
      return <Award className="w-4 h-4" />;
    case 'MapPin':
      return <MapPin className="w-4 h-4" />;
    case 'FileCheck':
      return <FileCheck className="w-4 h-4" />;
    case 'TrendingUp':
      return <TrendingUp className="w-4 h-4" />;
    case 'Sprout':
      return <Sprout className="w-4 h-4" />;
    case 'Heart':
      return <Heart className="w-4 h-4" />;
    case 'Sparkles':
      return <Sparkles className="w-4 h-4" />;
    default:
      return <Award className="w-4 h-4" />;
  }
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory>('semua');
  
  // Modal State
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Back to Top State
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Community Announcement Announcement banner close
  const [showBanner, setShowBanner] = useState(true);

  // Monitor scrolling for header style, active section highlighting, and back to top
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      setShowBackToTop(window.scrollY > 400);

      const sections = ['beranda', 'tim-kkn', 'anggota-sub4', 'dpl', 'program', 'faq', 'kontak'];
      let current = 'beranda';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop - 150; // Offset for header & comfort
          if (window.scrollY >= top) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter programs based on selected category
  const filteredPrograms = selectedCategory === 'semua'
    ? PROGRAMS_DATA
    : PROGRAMS_DATA.filter(p => p.category === selectedCategory);

  const handleOpenProgramModal = (program: Program) => {
    setSelectedProgram(program);
    setModalOpen(true);
  };

  const handleCloseProgramModal = () => {
    setModalOpen(false);
    // Keep selected program until animation completes
    setTimeout(() => {
      setSelectedProgram(null);
    }, 200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // offset for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-bg-light text-neutral-dark font-sans antialiased selection:bg-brand-light selection:text-brand-deep">
      
      {/* 1. TOP NOTIFICATION BANNER */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            id="notif-banner"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-brand-deep text-white text-xs sm:text-sm font-medium py-2.5 px-4 flex items-center justify-between gap-4 border-b border-brand-primary relative z-50 animate-fade-in"
          >
            <div className="flex items-center gap-2 mx-auto">
              <Sparkles className="w-4 h-4 text-brand-accent animate-pulse flex-shrink-0" />
              <span>
                <strong>Jadwal Minggu Ini:</strong> Penimbangan Bank Sampah "Maju Lestari" diadakan hari Sabtu besok pkl 08.00 - 11.00 WIB.
              </span>
            </div>
            <button
              id="btn-close-banner"
              onClick={() => setShowBanner(false)}
              className="text-brand-light hover:text-white p-1 rounded hover:bg-brand-primary/50 cursor-pointer"
              aria-label="Tutup pengumuman"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. NAVIGATION BAR */}
      <nav
        id="navbar"
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'top-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-border-soft py-3.5' 
            : `${showBanner ? 'top-10 sm:top-9' : 'top-0'} py-5 bg-transparent`
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between font-display">
            {/* Logo Brand */}
            <a
              id="nav-logo"
              href="#beranda"
              onClick={(e) => handleNavLinkClick(e, 'beranda')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-all duration-300">
                CH
              </div>
              <div>
                <span className="font-display font-bold text-sm sm:text-base tracking-tight text-brand-deep block leading-tight uppercase">
                  Kampung Hijau Cokrodiningratan
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-brand-accent uppercase block">
                  by KKN-PPM UGM JAVATIS
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-semibold">
              <a
                id="link-nav-beranda"
                href="#beranda"
                onClick={(e) => handleNavLinkClick(e, 'beranda')}
                className={`pb-1 transition-colors duration-250 cursor-pointer text-sm font-semibold tracking-tight ${
                  activeSection === 'beranda'
                    ? 'text-brand-primary border-b-2 border-brand-primary font-bold'
                    : 'text-neutral-muted hover:text-brand-primary'
                }`}
              >
                Beranda
              </a>

              {/* Profil Dropdown */}
              <div className="relative group pb-1">
                <button
                  id="btn-nav-profil"
                  className={`flex items-center gap-1 transition-colors duration-250 cursor-pointer text-sm font-semibold tracking-tight ${
                    ['tim-kkn', 'anggota-sub4', 'dpl'].includes(activeSection)
                      ? 'text-brand-primary font-bold'
                      : 'text-neutral-muted hover:text-brand-primary'
                  }`}
                >
                  Profil
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-2 w-60 rounded-2xl bg-white shadow-lg border border-border-soft py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <a
                    id="link-nav-tim-kkn"
                    href="#tim-kkn"
                    onClick={(e) => handleNavLinkClick(e, 'tim-kkn')}
                    className={`flex items-center px-4 py-2.5 text-xs font-bold transition-colors ${
                      activeSection === 'tim-kkn' ? 'bg-brand-light/40 text-brand-primary' : 'text-neutral-dark hover:bg-brand-light/20 hover:text-brand-primary'
                    }`}
                  >
                    TIM KKN JAVATIS
                  </a>
                  <a
                    id="link-nav-anggota-sub4"
                    href="#anggota-sub4"
                    onClick={(e) => handleNavLinkClick(e, 'anggota-sub4')}
                    className={`flex items-center px-4 py-2.5 text-xs font-bold transition-colors ${
                      activeSection === 'anggota-sub4' ? 'bg-brand-light/40 text-brand-primary' : 'text-neutral-dark hover:bg-brand-light/20 hover:text-brand-primary'
                    }`}
                  >
                    ANGGOTA SUB UNIT 4
                  </a>
                  <a
                    id="link-nav-dpl"
                    href="#dpl"
                    onClick={(e) => handleNavLinkClick(e, 'dpl')}
                    className={`flex items-center px-4 py-2.5 text-xs font-bold transition-colors ${
                      activeSection === 'dpl' ? 'bg-brand-light/40 text-brand-primary' : 'text-neutral-dark hover:bg-brand-light/20 hover:text-brand-primary'
                    }`}
                  >
                    DOSEN PEMBIMBING LAPANGAN
                  </a>
                </div>
              </div>

              <a
                id="link-nav-program"
                href="#program"
                onClick={(e) => handleNavLinkClick(e, 'program')}
                className={`pb-1 transition-colors duration-250 cursor-pointer text-sm font-semibold tracking-tight ${
                  activeSection === 'program'
                    ? 'text-brand-primary border-b-2 border-brand-primary font-bold'
                    : 'text-neutral-muted hover:text-brand-primary'
                }`}
              >
                Program
              </a>

              <a
                id="link-nav-faq"
                href="#faq"
                onClick={(e) => handleNavLinkClick(e, 'faq')}
                className={`pb-1 transition-colors duration-250 cursor-pointer text-sm font-semibold tracking-tight ${
                  activeSection === 'faq'
                    ? 'text-brand-primary border-b-2 border-brand-primary font-bold'
                    : 'text-neutral-muted hover:text-brand-primary'
                }`}
              >
                FAQ
              </a>

              <a
                id="link-nav-kontak"
                href="#kontak"
                onClick={(e) => handleNavLinkClick(e, 'kontak')}
                className={`pb-1 transition-colors duration-250 cursor-pointer text-sm font-semibold tracking-tight ${
                  activeSection === 'kontak'
                    ? 'text-brand-primary border-b-2 border-brand-primary font-bold'
                    : 'text-neutral-muted hover:text-brand-primary'
                }`}
              >
                Hubungi
              </a>
            </div>

            {/* Desktop Join Button */}
            <div className="hidden lg:block">
              <a
                id="nav-btn-join"
                href="#kontak"
                onClick={(e) => handleNavLinkClick(e, 'kontak')}
                className="bg-brand-primary hover:bg-brand-deep text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                Gabung Relawan
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              id="navToggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-muted hover:text-brand-primary hover:bg-brand-light/30 cursor-pointer transition-all border border-transparent hover:border-brand-medium/20"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="navLinks"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-md border-b border-border-soft mt-2 overflow-hidden shadow-md"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                <a
                  id="link-mobile-beranda"
                  href="#beranda"
                  onClick={(e) => handleNavLinkClick(e, 'beranda')}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeSection === 'beranda'
                      ? 'bg-brand-light/40 text-brand-deep font-bold border-l-4 border-brand-primary'
                      : 'text-neutral-dark hover:bg-bg-light hover:text-brand-primary'
                  }`}
                >
                  Beranda
                </a>

                {/* Profil Header and Submenus */}
                <div className="py-1">
                  <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-light font-mono">
                    Profil
                  </div>
                  <div className="space-y-0.5 pl-3">
                    <a
                      id="link-mobile-tim-kkn"
                      href="#tim-kkn"
                      onClick={(e) => handleNavLinkClick(e, 'tim-kkn')}
                      className={`block px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        activeSection === 'tim-kkn'
                          ? 'bg-brand-light/35 text-brand-primary font-extrabold border-l-2 border-brand-primary'
                          : 'text-neutral-muted hover:bg-bg-light hover:text-brand-primary'
                      }`}
                    >
                      — TIM KKN JAVATIS
                    </a>
                    <a
                      id="link-mobile-anggota-sub4"
                      href="#anggota-sub4"
                      onClick={(e) => handleNavLinkClick(e, 'anggota-sub4')}
                      className={`block px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        activeSection === 'anggota-sub4'
                          ? 'bg-brand-light/35 text-brand-primary font-extrabold border-l-2 border-brand-primary'
                          : 'text-neutral-muted hover:bg-bg-light hover:text-brand-primary'
                      }`}
                    >
                      — ANGGOTA SUB UNIT 4
                    </a>
                    <a
                      id="link-mobile-dpl"
                      href="#dpl"
                      onClick={(e) => handleNavLinkClick(e, 'dpl')}
                      className={`block px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        activeSection === 'dpl'
                          ? 'bg-brand-light/35 text-brand-primary font-extrabold border-l-2 border-brand-primary'
                          : 'text-neutral-muted hover:bg-bg-light hover:text-brand-primary'
                      }`}
                    >
                      — DOSEN PEMBIMBING LAPANGAN
                    </a>
                  </div>
                </div>

                <a
                  id="link-mobile-program"
                  href="#program"
                  onClick={(e) => handleNavLinkClick(e, 'program')}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeSection === 'program'
                      ? 'bg-brand-light/40 text-brand-deep font-bold border-l-4 border-brand-primary'
                      : 'text-neutral-dark hover:bg-bg-light hover:text-brand-primary'
                  }`}
                >
                  Program
                </a>

                <a
                  id="link-mobile-faq"
                  href="#faq"
                  onClick={(e) => handleNavLinkClick(e, 'faq')}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeSection === 'faq'
                      ? 'bg-brand-light/40 text-brand-deep font-bold border-l-4 border-brand-primary'
                      : 'text-neutral-dark hover:bg-bg-light hover:text-brand-primary'
                  }`}
                >
                  FAQ
                </a>

                <a
                  id="link-mobile-kontak"
                  href="#kontak"
                  onClick={(e) => handleNavLinkClick(e, 'kontak')}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeSection === 'kontak'
                      ? 'bg-brand-light/40 text-brand-deep font-bold border-l-4 border-brand-primary'
                      : 'text-neutral-dark hover:bg-bg-light hover:text-brand-primary'
                  }`}
                >
                  Hubungi
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 3. HERO WELCOMING SECTION */}
      <section
        id="beranda"
        className="relative pt-32 sm:pt-40 pb-20 lg:pb-32 overflow-hidden"
      >
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[600px] bg-brand-light/70 rounded-bl-full -z-10" />
        <div className="absolute left-10 bottom-10 w-72 h-72 bg-brand-accent/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-light text-brand-primary border border-brand-medium/30 font-bold text-xs">
                <Leaf className="w-3.5 h-3.5" />
                <span>Gerakan Eco-Village Yogyakarta</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-deep tracking-tight leading-[1.1] md:leading-tight">
                Kampung Hijau<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-deep">
                  Cokrodiningratan
                </span>
                <span className="block text-sm sm:text-base md:text-lg font-mono font-bold text-brand-accent tracking-widest mt-3 uppercase">
                  by KKN-PPM UGM JAVATIS
                </span>
              </h1>

              <p className="text-neutral-muted text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                Portal pengabdian masyarakat resmi oleh <strong>Sub-Unit 4 KKN-PPM UGM JAVATIS</strong>. Kami berfokus mengimplementasikan reaktivasi Bank Sampah digital, sistem pertanian vertikultur, instalasi komposter ember tumpuk, lubang biopori resapan, serta pemetaan spasial lingkungan hidup di RW 03 Cokrodiningratan.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <a
                  id="cta-explore"
                  href="#program"
                  onClick={(e) => handleNavLinkClick(e, 'program')}
                  className="inline-flex items-center justify-center bg-brand-primary hover:bg-brand-deep text-white font-bold py-3.5 px-7 rounded-2xl text-sm transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                >
                  Eksplor Program Kerja
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </a>
                <a
                  id="cta-calc"
                  href="#kalkulator"
                  onClick={(e) => handleNavLinkClick(e, 'kalkulator')}
                  className="inline-flex items-center justify-center bg-white hover:bg-bg-light text-neutral-dark font-bold py-3.5 px-7 rounded-2xl text-sm transition-all duration-200 border border-border-soft cursor-pointer"
                >
                  Hitung Kontribusi Saya
                </a>
              </div>

              {/* Mini highlights */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border-soft max-w-md mx-auto lg:mx-0">
                <div>
                  <span className="block text-2xl font-extrabold text-brand-deep font-display">100%</span>
                  <span className="text-xs text-neutral-light font-bold">Swadaya Warga</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold text-brand-deep font-display">1.2+ Ton</span>
                  <span className="text-xs text-neutral-light font-bold">Sampah Terkelola</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold text-brand-deep font-display">64+</span>
                  <span className="text-xs text-neutral-light font-bold">Kader Aktif</span>
                </div>
              </div>
            </div>

            {/* Hero Right Card Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
                {/* Decorative glow behind cards */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-light to-brand-accent/25 rounded-3xl blur-3xl -z-10 transform scale-95" />

                {/* Primary Card */}
                <div className="bg-white rounded-3xl p-6 border border-border-soft shadow-sm relative z-10 hover:-translate-y-1 hover:border-brand-primary transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-extrabold tracking-widest uppercase bg-brand-light text-brand-primary px-2.5 py-1 rounded-lg border border-brand-medium/30">
                      INFO UTAMA KAMPUNG
                    </span>
                    <span className="w-2.5 h-2.5 bg-brand-primary rounded-full animate-ping" />
                  </div>

                  <h3 className="font-display font-extrabold text-xl text-brand-deep mb-2 leading-tight">
                    Misi Hijau Kami di Pinggir Kali Code
                  </h3>
                  <p className="text-neutral-muted text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                    Mengintegrasikan pemukiman perkotaan yang padat penduduk agar tetap sehat, tangguh pangan, dan memiliki ketahanan sanitasi yang prima secara mandiri.
                  </p>

                  <div className="space-y-3.5">
                    {/* Item 1 */}
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-brand-light text-brand-accent rounded-lg border border-brand-medium/10">
                        <Trash2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-dark">Pemilahan Dari Rumah</h4>
                        <p className="text-[11px] text-neutral-light font-semibold">Warga wajib memisahkan sampah basah & kering.</p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-brand-light text-brand-primary rounded-lg border border-brand-medium/10">
                        <Sprout className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-dark">Urban Farming Mandiri</h4>
                        <p className="text-[11px] text-neutral-light font-semibold">Ketahanan pangan lewat kebun sayur gizi RW.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary overlapping small badge card */}
                <div className="absolute -bottom-6 -right-4 bg-brand-deep text-white p-4 rounded-2xl shadow-lg max-w-[180px] z-20 border border-brand-primary/30 hidden sm:block">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="w-4 h-4 text-brand-accent fill-brand-accent" />
                    <span className="text-[10px] font-bold tracking-wide uppercase text-brand-light/90">Kader Inti</span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed">"Kerja ikhlas demi masa depan cucu kelak."</p>
                  <span className="text-[9px] text-brand-light/70 block mt-1 font-mono">— Ibu Endang</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PROFIL SUB-SECTIONS ==================== */}

      {/* 1. TIM KKN JAVATIS */}
      <section
        id="tim-kkn"
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand-light/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand-primary border border-brand-medium/25 text-xs font-bold uppercase tracking-wider font-mono mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>Unit JAVATIS UGM 2026</span>
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-deep tracking-tight mb-4">
              Tim KKN-PPM UGM JAVATIS
            </h2>
            <p className="text-neutral-muted text-sm sm:text-base leading-relaxed font-medium">
              Pengabdian masyarakat kolaboratif oleh mahasiswa Universitas Gadjah Mada untuk mendorong akselerasi teknologi tepat guna dan kelestarian ekologi di Kecamatan Jetis.
            </p>
          </div>

          {/* Tema Utama Box */}
          <div className="max-w-4xl mx-auto bg-bg-light border-l-4 border-brand-primary p-6 sm:p-8 rounded-r-3xl shadow-sm mb-20">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-primary font-mono mb-3">
              Tema Utama Kegiatan
            </h3>
            <p className="text-neutral-dark text-base sm:text-lg leading-relaxed font-bold italic text-brand-deep">
              "Pendampingan Pemberdayaan Masyarakat Bidang Teknologi Tepat Guna, Pengelolaan Sampah dan Lingkungan Kampung Hijau, serta Pemanfaatan Teknologi Informasi dan Media Sosial di Desa Bumijo dan Desa Cokrodiningratan, Kec Jetis, Kota Yogyakarta"
            </p>
            <div className="w-full border-t border-border-soft mt-6 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-neutral-muted">
              <div>Lokasi KKN: Kelurahan Cokrodiningratan & Kelurahan Bumijo</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-accent" />
                <span>Periode II Tahun 2026</span>
              </div>
            </div>
          </div>

          {/* Tiga Pilar Kerja (Pillars) */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-deep mb-3">
              Tiga Pilar Kerja KKN-PPM UGM
            </h3>
            <p className="text-neutral-muted text-xs sm:text-sm font-medium">
              Pilar aksi nyata yang diimplementasikan oleh tim mahasiswa untuk pemberdayaan masyarakat secara partisipatif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Farming */}
            <div className="bg-bg-light/40 p-8 rounded-3xl border border-border-soft flex flex-col justify-between hover:border-brand-primary hover:bg-white hover:shadow-sm transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 bg-brand-light text-brand-primary rounded-2xl border border-brand-medium/20 flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <Sprout className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-brand-deep mb-3">
                  Kemandirian Pangan
                </h4>
                <p className="text-neutral-muted text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                  Memanfaatkan lahan sempit perkotaan untuk penanaman sayuran harian dan tanaman obat keluarga secara vertikal dan hidroponik, menjamin asupan sayur sehat yang bebas pestisida bagi seluruh warga.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Kebun Gizi & Hidroponik <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Pillar 2: Circular economy */}
            <div className="bg-bg-light/40 p-8 rounded-3xl border border-border-soft flex flex-col justify-between hover:border-brand-accent hover:bg-white hover:shadow-sm transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 bg-brand-light text-brand-accent rounded-2xl border border-brand-medium/10 flex items-center justify-center mb-6 group-hover:bg-brand-accent group-hover:text-brand-deep transition-all duration-300">
                  <Trash2 className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-brand-deep mb-3">
                  Ekonomi Sirkular
                </h4>
                <p className="text-neutral-muted text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                  Mengubah limbah rumah tangga menjadi pundi tabungan bernilai ekonomis. Melalui Bank Sampah serta pengolahan minyak jelantah bekas dapur, warga mendapatkan tambahan ekonomi sekaligus mengamankan sanitasi air.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Bank Sampah & Jelantah <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Pillar 3: Environmental care */}
            <div className="bg-bg-light/40 p-8 rounded-3xl border border-border-soft flex flex-col justify-between hover:border-brand-deep hover:bg-white hover:shadow-sm transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 bg-brand-light text-brand-deep rounded-2xl border border-brand-medium/10 flex items-center justify-center mb-6 group-hover:bg-brand-deep group-hover:text-white transition-all duration-300">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-brand-deep mb-3">
                  Kesehatan Lingkungan
                </h4>
                <p className="text-neutral-muted text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                  Pemasangan biopori resapan air untuk mencegah genangan banjir, peneduhan lorong melalui penataan lorong-lorong sempit menggunakan tanaman hias rambat guna menciptakan iklim mikro sejuk di kampung.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-deep flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Koridor Teduh & Biopori <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ANGGOTA SUB UNIT 4 */}
      <section
        id="anggota-sub4"
        className="py-20 bg-bg-light/60 border-t border-b border-border-soft"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand-primary border border-brand-medium/25 text-xs font-bold uppercase tracking-wider font-mono mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>Intelektual Muda Pengabdi</span>
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-deep tracking-tight mb-4">
              Anggota Sub Unit 4
            </h2>
            <p className="text-neutral-muted text-sm sm:text-base leading-relaxed font-medium">
              Sinergi 6 mahasiswa Universitas Gadjah Mada lintas program studi dan klaster yang berdedikasi membangun RW 03 Cokrodiningratan.
            </p>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {MEMBERS_DATA.map((member, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-border-soft hover:border-brand-primary/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    {/* Member Initials Avatar */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm ${member.color} shadow-sm`}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-neutral-light text-[11px] font-mono font-bold uppercase tracking-wider">
                      UGM 2026
                    </span>
                  </div>
                  <h4 className="font-display font-extrabold text-base text-brand-deep leading-tight">
                    {member.name}
                  </h4>
                  <div className="text-[11px] font-bold text-neutral-muted mt-1">
                    {member.prodi} <span className="text-neutral-light">({member.fakultas})</span>
                  </div>
                  <p className="text-xs text-neutral-muted mt-4 leading-relaxed font-medium">
                    {member.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3.5 border-t border-border-soft flex items-center gap-2 text-brand-primary font-bold text-xs">
                  <div className="p-1 rounded-md bg-brand-light/40 text-brand-primary">
                    {renderMemberIcon(member.iconName)}
                  </div>
                  <span className="line-clamp-1">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DOSEN PEMBIMBING LAPANGAN */}
      <section
        id="dpl"
        className="py-20 bg-white border-b border-border-soft"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand-primary border border-brand-medium/25 text-xs font-bold uppercase tracking-wider font-mono">
                <Award className="w-3.5 h-3.5" />
                <span>Supervisi & Bimbingan Akademik</span>
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-deep tracking-tight leading-tight">
                Dosen Pembimbing Lapangan
              </h2>
              <p className="text-neutral-muted text-sm sm:text-base leading-relaxed font-medium">
                Pendampingan terstruktur dan pengawasan mutu akademik program pengabdian KKN-PPM Universitas Gadjah Mada dipandu langsung oleh Dosen Pembimbing Lapangan yang berkompeten di bidang pengembangan agro dan kemasyarakatan.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-brand-light text-brand-primary flex items-center justify-center font-bold text-xs mt-1">✓</div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-brand-deep">Pengawasan Program Kerja</h4>
                    <p className="text-xs text-neutral-muted mt-0.5 leading-relaxed font-medium">Memastikan program berjalan sesuai metodologi pengabdian berbasis teknologi tepat guna.</p>
                  </div>
                </div>
                <div className="flex gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-brand-light text-brand-primary flex items-center justify-center font-bold text-xs mt-1">✓</div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-brand-deep">Sinergi Lintas Sektoral</h4>
                    <p className="text-xs text-neutral-muted mt-0.5 leading-relaxed font-medium">Menghubungkan sinergi penelitian kampus dengan pemberdayaan nyata warga RW 03.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card Column */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="bg-white rounded-3xl p-8 border-2 border-brand-medium/25 shadow-sm relative w-full max-w-[420px] hover:border-brand-primary hover:shadow-md transition-all duration-300">
                <div className="absolute -top-3.5 left-8 bg-brand-primary text-white text-[10px] font-extrabold tracking-widest uppercase px-4 py-1 rounded-full shadow-sm">
                  DOSEN PEMBIMBING LAPANGAN
                </div>
                <div className="flex flex-col items-center text-center mt-4">
                  {/* DPL Avatar */}
                  <div className="relative mb-5">
                    <div className="absolute inset-0 bg-brand-primary rounded-full blur-md transform scale-105 opacity-25" />
                    <img
                      src="https://picsum.photos/seed/niken_dpl/400/400"
                      alt="Niken Nabilaputri Pranaasri, S.P., M.Agr."
                      referrerPolicy="no-referrer"
                      className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md relative z-10"
                    />
                  </div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-brand-deep leading-tight">
                    Niken Nabilaputri Pranaasri, S.P., M.Agr.
                  </h3>
                  <p className="text-xs text-brand-primary font-bold font-mono mt-1.5">
                    DPL JAVATIS Kelurahan Cokrodiningratan
                  </p>
                  
                  <div className="bg-bg-light rounded-2xl p-4 mt-4 text-xs text-neutral-muted leading-relaxed font-bold italic max-w-[320px]">
                    "Membimbing mahasiswa KKN-PPM UGM Unit JAVATIS periode II tahun 2026 dalam akselerasi pembangunan berkelanjutan di Kelurahan Cokrodiningratan."
                  </div>

                  <div className="w-full border-t border-border-soft mt-6 pt-5 flex justify-center gap-8">
                    <div className="text-center">
                      <span className="block text-xs font-bold text-neutral-dark">Unit KKN</span>
                      <span className="text-[10px] text-neutral-muted font-bold">JAVATIS 2026</span>
                    </div>
                    <div className="w-px bg-border-soft" />
                    <div className="text-center">
                      <span className="block text-xs font-bold text-neutral-dark">Klaster</span>
                      <span className="text-[10px] text-neutral-muted font-bold">Agroteknologi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DAFTAR PROGRAM KERJA (Filterable programs) */}
      <section
        id="program"
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-brand-primary font-mono mb-2">Program Kerja Sub-Unit 4</h2>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-deep tracking-tight">
                Inisiatif JAVATIS RW 03
              </h3>
              <p className="text-neutral-muted text-sm mt-2 max-w-xl leading-relaxed font-medium">
                Daftar program unggulan pengabdian dari mahasiswa KKN-PPM UGM Sub-Unit 4 di RW 03 Cokrodiningratan dalam memelihara keseimbangan lingkungan hidup.
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-1.5 bg-bg-light border border-border-soft p-1.5 rounded-2xl self-start md:self-auto">
              {[
                { cat: 'semua', label: 'Semua' },
                { cat: 'sampah', label: 'Sampah & Kompos' },
                { cat: 'farming', label: 'Urban Farming' },
                { cat: 'penghijauan', label: 'Penghijauan' },
                { cat: 'edukasi', label: 'Edukasi' },
              ].map((btn) => (
                <button
                  key={btn.cat}
                  id={`btn-filter-${btn.cat}`}
                  onClick={() => setSelectedCategory(btn.cat as ProgramCategory)}
                  className={`filter-btn px-4 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                    selectedCategory === btn.cat
                      ? 'bg-brand-primary text-white font-bold shadow-sm'
                      : 'text-neutral-muted hover:text-brand-primary hover:bg-white/60'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid with layout motion */}
          <motion.div
            id="program-cards-grid"
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPrograms.map((program) => (
                <motion.div
                  key={program.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="program-card h-full"
                  data-status={program.status}
                >
                  <ProgramCard
                    program={program}
                    onOpenModal={handleOpenProgramModal}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Fallback empty view */}
          {filteredPrograms.length === 0 && (
            <div className="text-center py-16 bg-bg-light border border-border-soft rounded-3xl max-w-md mx-auto">
              <span className="text-neutral-muted font-bold">Belum ada program untuk kategori ini.</span>
            </div>
          )}
        </div>
      </section>

      {/* 8. TESTIMONIALS / WARGA BERSUARA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-brand-primary font-mono mb-2">Suara Warga</h2>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-deep tracking-tight">
              Apresiasi dan Kesan Warga
            </h3>
            <p className="text-neutral-muted text-sm mt-3 leading-relaxed font-medium">
              Cerita nyata dari warga dan kader pelopor lingkungan RW 03 Cokrodiningratan setelah berkolaborasi dalam berbagai program kerja Sub-Unit 4 KKN UGM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-white p-8 rounded-3xl border border-border-soft flex flex-col justify-between hover:border-brand-primary/40 transition-all duration-300 shadow-sm"
              >
                <div className="space-y-4">
                  {/* Rating or flower stars icon */}
                  <div className="flex gap-1 text-brand-accent">
                    {[...Array(5)].map((_, i) => (
                      <Leaf key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
                    ))}
                  </div>
                  <p className="text-neutral-muted text-sm italic leading-relaxed font-medium">
                    "{item.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-border-soft">
                  {/* Generated avatar placeholder using UI avatars or local stylized icon */}
                  <div className="w-10 h-10 rounded-full bg-brand-light border border-brand-medium/30 text-brand-primary flex items-center justify-center font-extrabold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-brand-deep">{item.name}</h5>
                    <span className="text-[10px] text-brand-primary font-bold font-mono block mt-0.5">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section
        id="faq"
        className="py-20 bg-bg-light border-t border-b border-border-soft"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-brand-primary font-mono mb-2">Pertanyaan Umum</h2>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-deep tracking-tight">
              Tanya Jawab Seputar Kampung Hijau
            </h3>
            <p className="text-neutral-muted text-sm mt-3 leading-relaxed font-medium">
              Berikut adalah beberapa hal penting yang sering ditanyakan oleh warga baru maupun pihak luar seputar mekanisme kegiatan lingkungan kami.
            </p>
          </div>

          <FaqAccordion items={FAQ_DATA} />
        </div>
      </section>

      {/* 10. KONTAK & HUBUNGI KAMI FORM */}
      <section
        id="kontak"
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-brand-primary font-mono mb-2">Hubungi Kami</h2>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-deep tracking-tight">
              Sampaikan Aspirasi / Daftar Kader
            </h3>
            <p className="text-neutral-muted text-sm mt-3 leading-relaxed font-medium">
              Tertarik melakukan studi banding, donasi tanaman, registrasi tabungan Bank Sampah, atau melaporkan keluhan lingkungan? Silakan hubungi kader kami di bawah ini.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-brand-deep text-brand-light pt-16 pb-12 border-t border-brand-primary/40 relative overflow-hidden">
        {/* Background ambient elements */}
        <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -top-24 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Footer Brand Info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center text-white font-bold text-lg">
                  CH
                </div>
                <div>
                  <span className="font-display font-bold text-sm tracking-tight text-white block">
                    Kampung Hijau Cokrodiningratan
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-brand-accent uppercase block">
                    by KKN-PPM UGM JAVATIS
                  </span>
                </div>
              </div>
              <p className="text-brand-light/80 text-xs sm:text-sm leading-relaxed max-w-md font-medium">
                Gerakan kesadaran kolektif warga Kelurahan Cokrodiningratan, Jetis, Yogyakarta dalam mewujudkan pemukiman padat kota yang asri, berdaya pangan mandiri, serta bebas dari pencemaran lingkungan.
              </p>
              <div className="text-xs font-mono text-brand-light/60 font-bold">
                <span>Dikelola secara gotong-royong oleh Pengurus RW 03</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white tracking-widest uppercase font-mono">
                Navigasi Cepat
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
                {[
                  { id: 'beranda', label: 'Halaman Beranda' },
                  { id: 'tim-kkn', label: 'TIM KKN JAVATIS' },
                  { id: 'anggota-sub4', label: 'ANGGOTA SUB UNIT 4' },
                  { id: 'dpl', label: 'DOSEN PEMBIMBING LAPANGAN' },
                  { id: 'program', label: 'Program Kerja' },
                ].map((item) => (
                  <li key={item.id}>
                    <a
                      id={`link-footer-${item.id}`}
                      href={`#${item.id}`}
                      onClick={(e) => handleNavLinkClick(e, item.id)}
                      className="text-brand-light/75 hover:text-white transition-colors cursor-pointer"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support and Collabs */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-sm font-bold text-white tracking-widest uppercase font-mono">
                Kemitraan & Dukungan
              </h4>
              <p className="text-brand-light/80 text-xs leading-relaxed font-medium">
                Terbuka kolaborasi dengan akademisi perguruan tinggi (KKN/PPM), program CSR perusahaan, LSM lingkungan hidup, dan instansi dinas terkait.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[10px] font-bold tracking-wider font-mono bg-brand-primary/35 border border-brand-primary/50 text-brand-light px-2.5 py-1 rounded-lg">
                  #KotaYogyakarta
                </span>
                <span className="text-[10px] font-bold tracking-wider font-mono bg-brand-primary/35 border border-brand-primary/50 text-brand-light px-2.5 py-1 rounded-lg">
                  #YogyakartaHijau
                </span>
                <span className="text-[10px] font-bold tracking-wider font-mono bg-brand-primary/35 border border-brand-primary/50 text-brand-light px-2.5 py-1 rounded-lg">
                  #EcoVillage
                </span>
              </div>
            </div>
          </div>

          {/* Copyright Area */}
          <div className="pt-8 border-t border-brand-primary/35 text-center text-xs text-brand-light/60 flex flex-col sm:flex-row justify-between items-center gap-4 font-medium">
            <p>
              © {new Date().getFullYear()} Kampung Hijau Cokrodiningratan. Hak cipta dilindungi undang-undang.
            </p>
            <p className="flex items-center gap-1.5">
              Made with <Heart className="w-3.5 h-3.5 text-brand-accent fill-brand-accent animate-pulse" /> in Yogyakarta
            </p>
          </div>
        </div>
      </footer>

      {/* 12. FLOATING BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            id="backToTop"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 bg-brand-primary hover:bg-brand-deep text-white p-3.5 rounded-2xl shadow-md border border-brand-medium/30 transition-all cursor-pointer hover:scale-105"
            aria-label="Kembali ke atas"
            title="Kembali ke atas"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 13. PROGRAM DETAIL DIALOG POPUP */}
      <ProgramModal
        program={selectedProgram}
        isOpen={modalOpen}
        onClose={handleCloseProgramModal}
      />
    </div>
  );
}
