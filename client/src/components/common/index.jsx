import React from 'react';

export const Container = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export const Section = ({ children, id, className = '' }) => {
  return (
    <section id={id} className={`py-16 md:py-24 relative overflow-hidden ${className}`}>
      {children}
    </section>
  );
};

export const SectionTitle = ({ subtitle, title, description, align = 'center', className = '' }) => {
  const alignmentClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center mx-auto';

  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${alignmentClass} ${className}`}>
      {subtitle && (
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan bg-electric-cyan/10 px-3 py-1 rounded-full mb-3 border border-electric-cyan/20">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-electric-cyan text-navy-950 hover:bg-electric-blue hover:text-white shadow-glow-cyan focus:ring-electric-cyan font-semibold',
    secondary: 'bg-navy-850 text-white hover:bg-navy-800 border border-slate-700/60 hover:border-electric-cyan/50 focus:ring-slate-600',
    outline: 'border border-electric-cyan/60 text-electric-cyan hover:bg-electric-cyan/10 focus:ring-electric-cyan',
    ghost: 'text-slate-300 hover:text-electric-cyan hover:bg-white/5 focus:ring-slate-500',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
};
