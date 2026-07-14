"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PerforationStrip from "@/components/layout/PerforationStrip";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formState.name.trim()) errs.name = "Nama lengkap harus diisi.";
    if (!formState.email.trim()) errs.email = "Alamat surel harus diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email))
      errs.email = "Format surel tidak valid. Contoh: nama@domain.com";
    if (!formState.message.trim()) errs.message = "Pesan harus diisi.";
    return errs;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <>
      <Navbar />
      <PerforationStrip />

      <main className="md:pl-perforation-width px-4 md:px-margin-desktop py-6 md:py-12 max-w-container-max mx-auto">
        <div className="w-full flex flex-col gap-8 items-center">

          <Breadcrumb />

          <AnimatedSection className="w-full relative text-center" id="kontak">
            {/* Section Header */}
            <div className="flex items-end gap-4 mb-12 border-b-thick border-ink pb-4 justify-center">
              <div className="bg-stempel-red text-white px-4 py-2 text-label-mono border-thick border-ink brutal-shadow-sm uppercase font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">contact_mail</span>
                Formulir_06
              </div>
              <h1 className="text-headline-section text-ink uppercase m-0 leading-none">
                Kontak
              </h1>
            </div>

            {/* Feedback: Success */}
            {submitted && (
              <div className="mb-8 border-2 border-map-green bg-map-green/5 p-6 flex items-start gap-4 text-left" role="alert">
                <span className="material-symbols-outlined text-map-green text-3xl">check_circle</span>
                <div>
                  <p className="text-headline-card text-map-green uppercase font-bold">Pesan Terkirim</p>
                  <p className="text-body-main text-ink mt-2">
                    Dokumen pengiriman pesan telah diterima oleh sistem arsip. Respon akan diproses dalam 1x24 jam kerja.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", message: "" }); }}
                    className="mt-4 px-4 py-2 border-2 border-map-green text-map-green text-label-mono font-bold uppercase hover:bg-map-green hover:text-white transition-colors"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              </div>
            )}

            {/* Signed Document Box */}
            {!submitted && (
              <div className="bg-surface border-4 border-double border-stempel-red p-8 md:p-12 relative brutal-shadow max-w-4xl mx-auto text-left">

                <div className="absolute top-4 left-4 w-12 h-4 bg-surface-variant border-2 border-ink -rotate-12 opacity-80"></div>
                <div className="absolute bottom-4 right-4 w-12 h-4 bg-surface-variant border-2 border-ink -rotate-12 opacity-80"></div>

                <div className="absolute -top-6 -right-6 md:-right-12 md:-top-8 rotate-12 pointer-events-none opacity-90 z-20">
                  <div className="border-4 border-stempel-red text-stempel-red p-4 font-display text-2xl font-bold uppercase tracking-widest bg-surface/50 backdrop-blur-sm shadow-[2px_2px_0_0_rgba(232,67,44,1)]">
                    TERVERIFIKASI
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                  {/* Left: Form */}
                  <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                    <div className="text-data-technical text-stempel-red mb-4 border-b-2 border-dashed border-stempel-red pb-2 inline-block">
                      [ DOKUMEN PENGIRIMAN PESAN ]
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-name" className="text-label-mono font-bold uppercase text-ink">No.1 // Nama Lengkap</label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formState.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Ketik nama anda disini..."
                        className={`bg-paper border-2 p-3 text-body-main focus:outline-none focus:ring-2 focus:ring-ink w-full ${
                          errors.name ? "border-stempel-red" : "border-ink"
                        }`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "err-name" : undefined}
                      />
                      {errors.name && (
                        <p id="err-name" className="text-data-technical text-stempel-red mt-1" role="alert">{errors.name}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-email" className="text-label-mono font-bold uppercase text-ink">No.2 // Alamat Surel</label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formState.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="nama@domain.com"
                        className={`bg-paper border-2 p-3 text-body-main focus:outline-none focus:ring-2 focus:ring-ink w-full ${
                          errors.email ? "border-stempel-red" : "border-ink"
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "err-email" : undefined}
                      />
                      {errors.email && (
                        <p id="err-email" className="text-data-technical text-stempel-red mt-1" role="alert">{errors.email}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-message" className="text-label-mono font-bold uppercase text-ink">No.3 // Isi Pesan</label>
                      <textarea
                        id="contact-message"
                        value={formState.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Tuliskan pesan anda..."
                        rows={4}
                        className={`bg-paper border-2 p-3 text-body-main focus:outline-none focus:ring-2 focus:ring-ink w-full resize-none ${
                          errors.message ? "border-stempel-red" : "border-ink"
                        }`}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "err-message" : undefined}
                      />
                      {errors.message && (
                        <p id="err-message" className="text-data-technical text-stempel-red mt-1" role="alert">{errors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="bg-stempel-red text-white border-thick border-ink py-4 px-8 text-label-mono font-bold uppercase brutal-shadow mt-4 hover:bg-ink transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">send</span>
                      Kirim Pesan
                    </button>
                  </form>

                  {/* Right: Direct Channels */}
                  <div className="flex flex-col gap-8 border-t-2 md:border-t-0 md:border-l-2 border-dashed border-ink pt-8 md:pt-0 md:pl-8">
                    <div>
                      <h3 className="text-headline-card text-ink mb-6 uppercase">Jalur Komunikasi Alternatif</h3>

                      <div className="flex flex-col gap-6 text-body-main">
                        <a href="mailto:denitri0609@gmail.com" className="group flex items-center gap-4 text-ink w-fit focus:outline-none focus:ring-2 focus:ring-ink">
                          <div className="w-12 h-12 bg-surface-variant border-2 border-ink flex items-center justify-center group-hover:bg-carbon-blue group-hover:text-white transition-colors brutal-shadow-sm">
                            <span className="material-symbols-outlined">mail</span>
                          </div>
                          <span className="relative overflow-hidden">
                            denitri0609@gmail.com
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-carbon-blue -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                          </span>
                        </a>

                        <a
                          href="https://linkedin.com/in/deni-trio-saputra-451075276"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 text-ink w-fit focus:outline-none focus:ring-2 focus:ring-ink"
                        >
                          <div className="w-12 h-12 bg-surface-variant border-2 border-ink flex items-center justify-center group-hover:bg-carbon-blue group-hover:text-white transition-colors brutal-shadow-sm">
                            <span className="material-symbols-outlined">link</span>
                          </div>
                          <span className="relative overflow-hidden">
                            linkedin.com/in/deni-trio-saputra-451075276
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-carbon-blue -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                          </span>
                        </a>

                        <a
                          href="https://github.com/denisptra"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 text-ink w-fit focus:outline-none focus:ring-2 focus:ring-ink"
                        >
                          <div className="w-12 h-12 bg-surface-variant border-2 border-ink flex items-center justify-center group-hover:bg-carbon-blue group-hover:text-white transition-colors brutal-shadow-sm">
                            <span className="material-symbols-outlined">code</span>
                          </div>
                          <span className="relative overflow-hidden">
                            github.com/denisptra
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-carbon-blue -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                          </span>
                        </a>
                      </div>
                    </div>

                    <div className="mt-auto bg-surface-container-low border-2 border-ink p-4 text-data-technical text-on-surface-variant flex gap-3 items-start">
                      <span className="material-symbols-outlined text-archive-orange">info</span>
                      <p>Respon standar diproses dalam kurun waktu 1x24 jam kerja. Dokumen yang tidak valid akan diabaikan oleh sistem.</p>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </AnimatedSection>

        </div>
      </main>

      <Footer />
    </>
  );
}
