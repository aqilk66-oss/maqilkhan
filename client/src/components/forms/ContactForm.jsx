import React, { useState } from 'react';
import { messageService } from '../../services/contentService';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Hidden honeypot field for bot detection
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your name (at least 2 characters)';
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please provide a message with at least 10 characters';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ submitting: true, success: false, error: null });

    try {
      await messageService.sendMessage(formData);
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.message || 'Unable to deliver message right now. Please try again or reach out directly via WhatsApp.',
      });
    }
  };

  return (
    <div className="w-full rounded-3xl bg-navy-900/80 border border-slate-800/80 p-6 sm:p-10 shadow-elevated relative overflow-hidden">
      {/* Success Notification Banner */}
      {status.success && (
        <div
          role="status"
          aria-live="polite"
          className="mb-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3.5 text-emerald-400"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-display font-bold text-sm text-emerald-300">
              Message Delivered Successfully
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Thank you for reaching out. Your inquiry has been logged, and I will review it shortly.
            </p>
          </div>
        </div>
      )}

      {/* Error Notification Banner */}
      {status.error && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-8 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-400 text-xs sm:text-sm"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{status.error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Anti-spam Honeypot field (hidden visually and from screenreaders) */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Row: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
            >
              Your Name <span className="text-electric-cyan">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Henderson"
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? 'name-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl bg-navy-950/80 border text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-electric-cyan transition-all ${
                fieldErrors.name ? 'border-rose-500/80' : 'border-slate-800 focus:border-electric-cyan'
              }`}
            />
            {fieldErrors.name && (
              <p id="name-error" className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                <span>{fieldErrors.name}</span>
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
            >
              Email Address <span className="text-electric-cyan">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. alex@company.com"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl bg-navy-950/80 border text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-electric-cyan transition-all ${
                fieldErrors.email ? 'border-rose-500/80' : 'border-slate-800 focus:border-electric-cyan'
              }`}
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                <span>{fieldErrors.email}</span>
              </p>
            )}
          </div>
        </div>

        {/* Subject Field (Optional) */}
        <div>
          <label
            htmlFor="contact-subject"
            className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
          >
            Subject / Discussion Topic
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Full-Stack Role / Project Inquiry"
            className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-electric-cyan focus:ring-2 focus:ring-electric-cyan transition-all"
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
          >
            Inquiry Message <span className="text-electric-cyan">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your inquiry, project scope, or opportunity details..."
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
            className={`w-full px-4 py-3 rounded-xl bg-navy-950/80 border text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-electric-cyan transition-all resize-y ${
              fieldErrors.message ? 'border-rose-500/80' : 'border-slate-800 focus:border-electric-cyan'
            }`}
          />
          {fieldErrors.message && (
            <p id="message-error" className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
              <span>{fieldErrors.message}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status.submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-electric-cyan to-electric-blue text-navy-950 font-bold text-sm shadow-glow-cyan hover:brightness-110 hover:scale-[1.01] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-electric-cyan"
          >
            {status.submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting Message...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Transmit Message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
