import React, { useEffect, useRef } from 'react';
import { Container } from '../../components/common';
import ContactForm from '../../components/forms/ContactForm';
import SocialLinks from '../../components/common/SocialLinks';
import { PERSONAL_INFO } from '../../constants';
import { usePortfolio } from '../../context/PortfolioContext';
import { gsap } from '../../animations/gsap/gsapConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Mail, MessageCircle, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export const ContactSection = () => {
  const { profile } = usePortfolio();
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        rightColRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact Section"
      className="py-20 md:py-28 bg-navy-950 border-t border-slate-800/80 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-electric-cyan/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Communication Direct Channels (5 cols) */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan bg-electric-cyan/10 px-3.5 py-1 rounded-full mb-3.5 border border-electric-cyan/20">
                Direct Communication
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                Get In Touch With Muhammad.
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                Available for MERN stack software roles, full-stack web applications, 
                and technical consulting inquiries.
              </p>
            </div>

            {/* Direct Verification Channels */}
            <div className="space-y-4">
              {/* WhatsApp Action */}
              {(profile?.whatsapp || PERSONAL_INFO.whatsapp) && (
                <a
                  href={`https://wa.me/${(profile?.whatsapp || PERSONAL_INFO.whatsapp).replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-navy-900 transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block">WhatsApp Direct</span>
                      <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {profile?.whatsapp || PERSONAL_INFO.whatsapp}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </a>
              )}

              {/* Email Action */}
              {(profile?.email || PERSONAL_INFO.email) && (
                <a
                  href={`mailto:${profile?.email || PERSONAL_INFO.email}`}
                  className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800/80 hover:border-electric-cyan/40 hover:bg-navy-900 transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center text-electric-cyan group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block">Verified Email</span>
                      <span className="text-sm font-semibold text-white group-hover:text-electric-cyan transition-colors">
                        {profile?.email || PERSONAL_INFO.email}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-electric-cyan transition-colors" />
                </a>
              )}

              {/* Location Badge */}
              <div className="p-4 rounded-xl bg-navy-900/40 border border-slate-800/60 flex items-center gap-3 text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span>
                  Operating from{' '}
                  <strong className="text-slate-300 font-semibold">
                    {profile?.location || PERSONAL_INFO.location}
                  </strong>{' '}
                  • Remote & Hybrid Ready
                </span>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 block">
                Professional Networks
              </span>
              <SocialLinks />
            </div>
          </div>

          {/* Right Column: Rate-Limited Contact Form (7 cols) */}
          <div ref={rightColRef} className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
