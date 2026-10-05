import React from 'react';
import { PERSONAL_INFO } from '../../constants';
import { usePortfolio } from '../../context/PortfolioContext';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';

export const SocialLinks = ({ className = '', iconSize = 'w-4 h-4' }) => {
  const { profile } = usePortfolio();

  const githubUrl = profile?.github || PERSONAL_INFO.github;
  const linkedinUrl = profile?.linkedin || PERSONAL_INFO.linkedin;
  const rawPhone = profile?.whatsapp || PERSONAL_INFO.whatsapp;
  const cleanPhone = rawPhone ? rawPhone.replace(/[^0-9]/g, '') : '923425730066';
  const whatsappUrl = `https://wa.me/${cleanPhone}`;
  const emailUrl = profile?.email ? `mailto:${profile.email}` : `mailto:${PERSONAL_INFO.email}`;

  const socials = [
    {
      name: 'GitHub',
      url: githubUrl,
      label: 'View GitHub Profile',
      icon: Github,
      enabled: !!githubUrl,
    },
    {
      name: 'LinkedIn',
      url: linkedinUrl,
      label: 'Connect on LinkedIn',
      icon: Linkedin,
      enabled: !!linkedinUrl,
    },
    {
      name: 'WhatsApp',
      url: whatsappUrl,
      label: 'Message on WhatsApp',
      icon: MessageCircle,
      enabled: !!rawPhone,
    },
    {
      name: 'Email',
      url: emailUrl,
      label: 'Send Direct Email',
      icon: Mail,
      enabled: !!(profile?.email || PERSONAL_INFO.email),
    },
  ].filter((item) => item.enabled);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="p-2.5 rounded-lg bg-navy-900 border border-slate-800 text-slate-400 hover:text-electric-cyan hover:border-electric-cyan/40 hover:bg-navy-850 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-electric-cyan group"
          >
            <Icon className={iconSize} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
