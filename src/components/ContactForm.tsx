import React, { useState } from 'react';
import { Send, CheckCircle2, User, Mail, MessageSquare, PhoneCall, History, Trash2 } from 'lucide-react';
import { MessageSubmission } from '../types';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    subject: 'pertanyaan',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<MessageSubmission | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Quick list of saved messages in this browser tab
  const [submissionHistory, setSubmissionHistory] = useState<MessageSubmission[]>(() => {
    try {
      const stored = localStorage.getItem('kampung_hijau_submissions');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.message.trim()) {
      setErrorMsg('Nama dan pesan wajib diisi!');
      return;
    }

    setLoading(true);

    // Simulate sending network request
    setTimeout(() => {
      const newSubmission: MessageSubmission = {
        id: 'msg-' + Math.random().toString(36).substring(2, 9),
        name: formData.name,
        email: formData.email || '-',
        whatsapp: formData.whatsapp || '-',
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toLocaleString('id-ID', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      };

      try {
        const updated = [newSubmission, ...submissionHistory];
        localStorage.setItem('kampung_hijau_submissions', JSON.stringify(updated));
        setSubmissionHistory(updated);
      } catch (err) {
        console.error('Failed to save submission in localStorage', err);
      }

      setSubmittedMessage(newSubmission);
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        subject: 'pertanyaan',
        message: '',
      });
    }, 1200);
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem('kampung_hijau_submissions');
      setSubmissionHistory([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Form Area */}
      <div className="bg-white rounded-3xl p-8 border border-border-soft shadow-sm lg:col-span-7">
        {submittedMessage ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-brand-light border border-brand-medium/30 text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="font-display font-bold text-xl text-brand-deep mb-2">
              Laporan / Pertanyaan Terkirim!
            </h3>
            <p className="text-neutral-muted text-sm max-w-md mx-auto mb-6">
              Terima kasih <strong>{submittedMessage.name}</strong>, data Anda telah berhasil terdaftar secara lokal di database warga. Kader lingkungan kami akan menindaklanjutinya segera.
            </p>

            <div className="bg-bg-light border border-border-soft rounded-2xl p-5 text-left text-xs space-y-2 max-w-md mx-auto mb-8">
              <div><span className="text-neutral-light font-bold uppercase mr-2">Kode Tiket:</span> <span className="font-mono text-brand-deep">{submittedMessage.id}</span></div>
              <div><span className="text-neutral-light font-bold uppercase mr-2">Kategori:</span> <span className="font-semibold text-brand-primary uppercase">{submittedMessage.subject}</span></div>
              <div><span className="text-neutral-light font-bold uppercase mr-2">Kontak WA:</span> <span className="text-neutral-dark">{submittedMessage.whatsapp}</span></div>
              <div><span className="text-neutral-light font-bold uppercase mr-2">Isi Pesan:</span> <p className="text-neutral-muted mt-1 italic">"{submittedMessage.message}"</p></div>
            </div>

            <button
              id="btn-submit-another"
              onClick={() => setSubmittedMessage(null)}
              className="inline-flex items-center justify-center bg-brand-primary hover:bg-brand-deep text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition-all duration-200 cursor-pointer"
            >
              Kirim Pesan Lain
            </button>
          </div>
        ) : (
          <form id="form-contact" onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            {/* Input Name */}
            <div className="space-y-1">
              <label htmlFor="contact-name" className="text-xs font-bold text-neutral-muted uppercase tracking-wide flex items-center">
                <User className="w-3.5 h-3.5 text-brand-primary mr-1.5" />
                Nama Lengkap / Instansi <span className="text-rose-500 ml-0.5">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="cth. Budiono Siregar"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-bg-light border border-border-soft rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-primary focus:outline-none transition-all duration-200 text-neutral-dark"
              />
            </div>

            {/* Sub-grid email & whatsapp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Input Email */}
              <div className="space-y-1">
                <label htmlFor="contact-email" className="text-xs font-bold text-neutral-muted uppercase tracking-wide flex items-center">
                  <Mail className="w-3.5 h-3.5 text-brand-primary mr-1.5" />
                  Alamat Email (Opsional)
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-bg-light border border-border-soft rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-primary focus:outline-none transition-all duration-200 text-neutral-dark"
                />
              </div>

              {/* Input WhatsApp */}
              <div className="space-y-1">
                <label htmlFor="contact-whatsapp" className="text-xs font-bold text-neutral-muted uppercase tracking-wide flex items-center">
                  <PhoneCall className="w-3.5 h-3.5 text-brand-primary mr-1.5" />
                  No. WhatsApp (Aktif)
                </label>
                <input
                  id="contact-whatsapp"
                  type="tel"
                  placeholder="cth. 08123456789"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full bg-bg-light border border-border-soft rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-primary focus:outline-none transition-all duration-200 text-neutral-dark"
                />
              </div>
            </div>

            {/* Kategori Kepentingan */}
            <div className="space-y-1">
              <label htmlFor="contact-subject" className="text-xs font-bold text-neutral-muted uppercase tracking-wide block">
                Kategori Kepentingan
              </label>
              <select
                id="contact-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-bg-light border border-border-soft rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-primary focus:outline-none transition-all duration-200 text-neutral-dark cursor-pointer"
              >
                <option value="pertanyaan">Tanya Mengenai Program</option>
                <option value="relawan">Daftar Kader / Relawan Hijau</option>
                <option value="bank-sampah">Registrasi Buku Bank Sampah</option>
                <option value="keluhan">Aduan / Masukan Kebersihan Lorong</option>
                <option value="lainnya">Lain-lain</option>
              </select>
            </div>

            {/* Input Message */}
            <div className="space-y-1">
              <label htmlFor="contact-message" className="text-xs font-bold text-neutral-muted uppercase tracking-wide flex items-center">
                <MessageSquare className="w-3.5 h-3.5 text-brand-primary mr-1.5" />
                Detail Pesan / Pertanyaan <span className="text-rose-500 ml-0.5">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                placeholder="Tuliskan pesan Anda secara rinci di sini..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-bg-light border border-border-soft rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-primary focus:outline-none transition-all duration-200 text-neutral-dark resize-none"
              />
            </div>

            {/* Submit button */}
            <button
              id="btn-submit-message"
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center bg-brand-primary hover:bg-brand-deep disabled:bg-brand-medium text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-200 cursor-pointer shadow-sm"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Mengirim Pengajuan...
                </>
              ) : (
                <>
                  Kirim Pesan / Pengajuan
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* History and Info Panel */}
      <div className="lg:col-span-5 space-y-6">
        {/* Info Card */}
        <div className="bg-brand-deep text-white rounded-3xl p-6 border border-brand-primary shadow-lg overflow-hidden relative">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-brand-primary/40 rounded-full blur-xl" />
          
          <h4 className="font-display font-semibold text-lg text-brand-light mb-4">
            Alamat Sekretariat
          </h4>
          <p className="text-brand-light/90 text-sm leading-relaxed mb-4">
            Cokrodiningratan JT II/245, Kel. Cokrodiningratan, Kec. Jetis, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55233.
          </p>

          <div className="space-y-2 border-t border-brand-primary/50 pt-4 text-xs font-mono text-brand-light/80">
            <div><span className="text-brand-accent">Hari Kerja:</span> Senin — Sabtu</div>
            <div><span className="text-brand-accent">Jam Layanan:</span> 08:00 — 16:00 WIB</div>
            <div><span className="text-brand-accent">Hubungi:</span> info@kampunghijau-cokro.org</div>
          </div>
        </div>

        {/* Local Submission History */}
        <div className="bg-white rounded-3xl p-6 border border-border-soft shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-bg-light">
            <h4 className="font-display font-bold text-sm text-neutral-dark flex items-center">
              <History className="w-4 h-4 text-brand-primary mr-2" />
              Riwayat Laporan Anda ({submissionHistory.length})
            </h4>
            {submissionHistory.length > 0 && (
              <button
                id="btn-clear-history"
                onClick={clearHistory}
                className="text-xs text-rose-500 hover:text-rose-700 font-bold cursor-pointer flex items-center gap-1"
                title="Hapus riwayat local"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Hapus
              </button>
            )}
          </div>

          {submissionHistory.length === 0 ? (
            <p className="text-neutral-light text-xs text-center py-6 leading-relaxed">
              Belum ada riwayat pengiriman pesan dari peramban ini. Pesan yang Anda kirimkan akan tercantum di sini secara realtime.
            </p>
          ) : (
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {submissionHistory.map((msg) => (
                <div key={msg.id} className="p-3 bg-bg-light/50 hover:bg-bg-light border border-border-soft rounded-xl transition-all">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold text-neutral-dark truncate max-w-[150px]">
                      {msg.name}
                    </span>
                    <span className="text-[9px] font-mono font-bold uppercase bg-brand-light text-brand-primary px-1.5 py-0.5 rounded">
                      {msg.subject}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-muted mt-1 line-clamp-2 italic">
                    "{msg.message}"
                  </p>
                  <span className="text-[9px] text-neutral-light font-mono block mt-1.5 text-right">
                    {msg.timestamp} (ID: {msg.id})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
