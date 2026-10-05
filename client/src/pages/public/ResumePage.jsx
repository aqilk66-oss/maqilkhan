import React from 'react';
import { Container } from '../../components/common';
import SEO from '../../components/common/SEO';
import { PERSONAL_INFO } from '../../constants';
import { usePortfolio } from '../../context/PortfolioContext';
import { FileDown, GraduationCap, MapPin, CheckCircle2, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const ResumePage = () => {
  const { activeCv, profile, education } = usePortfolio();

  const currentRole = profile?.primaryRole || PERSONAL_INFO.primaryRole;
  const currentLocation = profile?.location || PERSONAL_INFO.location;
  const currentDegree = education && education.length > 0 ? education[0] : null;

  const cvDownloadUrl = activeCv?.fileUrl || '/Muhammad_Aqil_Khan_CV.pdf';
  const cvVersion = activeCv?.version || 'v1.0';
  const cvFileName = activeCv?.fileName || 'Muhammad_Aqil_Khan_CV.pdf';
  const cvFileSize = activeCv?.fileSize || '184 KB';

  return (
    <div className="py-16 md:py-24 bg-navy-950 min-h-screen text-slate-100">
      <SEO
        title="Curriculum Vitae & Resume | Muhammad Aqil Khan"
        description="Download the active CV of Muhammad Aqil Khan, MERN Stack Developer. Education: B.S. Computer Science (2022–2026), GPGC Charsadda."
        canonicalUrl="https://aqilkhan.dev/resume"
      />
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan bg-electric-cyan/10 px-3.5 py-1 rounded-full mb-3.5 border border-electric-cyan/20">
            Curriculum Vitae
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            Professional Qualifications & Resume.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Summary of academic qualifications, MERN stack full-stack competencies, and verified technical experience.
          </p>
        </div>

        {/* Dynamic CV Document Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-navy-900/60 border border-slate-800/80 shadow-elevated max-w-4xl relative overflow-hidden mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                  Active Document Version: {cvVersion} ({cvFileSize})
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {profile?.fullName || 'Muhammad Aqil Khan'} — Resume
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-1">
                {currentRole} • {currentLocation}
              </p>
            </div>

            <a
              href={cvDownloadUrl}
              download={cvFileName}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-cyan to-electric-blue text-navy-950 font-bold text-sm shadow-glow-cyan hover:brightness-110 transition-all shrink-0"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Active CV ({cvVersion})</span>
            </a>
          </div>

          {/* Structured Qualifications Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="space-y-4">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-electric-cyan" />
                <span>Formal Education</span>
              </h3>
              <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 text-sm space-y-1">
                <p className="font-bold text-white">
                  {currentDegree?.degree || 'B.S. Computer Science'}
                </p>
                <p className="text-xs text-slate-400">
                  {currentDegree?.institution || 'Government Post Graduate College Charsadda'} (
                  {currentDegree?.startYear || '2022'} – {currentDegree?.endYear || '2026'})
                </p>
                <p className="text-xs text-emerald-400 font-mono">
                  {currentDegree?.gradeOrStatus || 'Degree Candidate'} • {currentDegree?.location || 'Charsadda, Pakistan'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-electric-cyan" />
                <span>Core Competencies</span>
              </h3>
              <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 text-sm space-y-1">
                <p className="font-bold text-white">MERN & Full-Stack Development</p>
                <p className="text-xs text-slate-400">React, Node.js, Express.js, MongoDB, REST APIs</p>
                <p className="text-xs text-electric-cyan font-mono">Modern UI/UX • Tailwind CSS • GSAP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Link to Contact */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-electric-cyan hover:underline"
          >
            <span>Have a specific opportunity or role? Send a message</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>
      </Container>
    </div>
  );
};

export default ResumePage;
