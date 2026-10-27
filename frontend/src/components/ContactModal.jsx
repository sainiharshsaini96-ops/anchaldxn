import React, { useState } from 'react';
import { submitInquiry } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function ContactModal({ isOpen, onClose }) {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Product Information Inquiry',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await submitInquiry(formData);
      setStatusMessage({
        type: 'success',
        text:
          lang === 'hi'
            ? 'धन्यवाद! आपका संदेश सफलतापूर्वक आंचल तक पहुंच गया है।'
            : res.message || 'Thank you! Your message has been received by Anchal.',
      });
      setFormData({
        name: '',
        email: '',
        topic: 'Product Information Inquiry',
        message: '',
      });
      setTimeout(() => {
        onClose();
        setStatusMessage(null);
      }, 2500);
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Error sending message. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-lg bg-surface-container-lowest rounded-2xl p-6 shadow-2xl border border-surface-container-high flex flex-col gap-4 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">
              {lang === 'hi' ? 'सीधे संपर्क करें' : 'Direct Inquiries'}
            </span>
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
              {lang === 'hi' ? 'आंचल को संदेश भेजें' : 'Connect with Anchal'}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant pt-0.5">
              {lang === 'hi'
                ? 'DXN उत्पादों के संबंध में कोई प्रश्न या सुझाव हो तो निसंकोच लिखें।'
                : 'Have questions about DXN products or educational feedback? Send a note directly.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {statusMessage && (
          <div
            className={`p-3 rounded-xl font-label-md text-label-md flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'bg-error-container text-on-error-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {statusMessage.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-primary font-semibold">
              {lang === 'hi' ? 'आपका नाम' : 'Your Name'} *
            </label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={lang === 'hi' ? 'उदा. राहुल शर्मा' : 'e.g. Rachel Green'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all border border-surface-container"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-primary font-semibold">
              {lang === 'hi' ? 'ईमेल पता' : 'Email Address'} *
            </label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all border border-surface-container"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-primary font-semibold">
              {lang === 'hi' ? 'विषय' : 'Topic'}
            </label>
            <select
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all border border-surface-container cursor-pointer"
            >
              <option value="Product Information Inquiry">Product Information Inquiry</option>
              <option value="Botanical Research Feedback">Botanical Research Feedback</option>
              <option value="Label Verification Question">Label Verification Question</option>
              <option value="General Greetings">General Greetings</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-primary font-semibold">
              {lang === 'hi' ? 'संदेश' : 'Your Message'} *
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={
                lang === 'hi'
                  ? 'अपना संदेश यहाँ लिखें...'
                  : 'Write your inquiry or question here...'
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all border border-surface-container resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              disabled={loading}
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md hover:bg-secondary transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'hi' ? 'भेज रहे हैं...' : 'Sending...'}</span>
                </>
              ) : (
                <>
                  <span>{lang === 'hi' ? 'संदेश भेजें' : 'Send Inquiry'}</span>
                  <span className="material-symbols-outlined text-[16px]">send</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
