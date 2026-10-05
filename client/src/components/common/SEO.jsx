import React, { useEffect } from 'react';

/**
 * Technical SEO Head Manager
 * Sets page title, meta description, canonical link, Open Graph tags, and JSON-LD structured data.
 */
export const SEO = ({
  title = 'Muhammad Aqil Khan | MERN Stack & Full-Stack Web Developer',
  description = 'Muhammad Aqil Khan — MERN Stack Developer & Full-Stack Web Developer. Engineering high-performance web applications, REST APIs, and modern interfaces.',
  canonicalUrl,
  ogType = 'website',
  ogImage = '/images/personal/image-2-hero.jpg',
  structuredData,
  noIndex = false,
}) => {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta Helper
    const setMetaTag = (selector, attribute, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) el.setAttribute('name', name);
        } else if (selector.startsWith('meta[property=')) {
          const prop = selector.match(/property="([^"]+)"/)?.[1];
          if (prop) el.setAttribute('property', prop);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attribute, value);
    };

    // Descriptions
    setMetaTag('meta[name="description"]', 'content', description);

    // Robots / Indexing
    setMetaTag('meta[name="robots"]', 'content', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:type"]', 'content', ogType);
    setMetaTag('meta[property="og:image"]', 'content', ogImage);

    // Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);
    } else if (linkCanonical) {
      linkCanonical.remove();
    }

    // JSON-LD Structured Data
    const scriptId = 'json-ld-seo-schema';
    let scriptEl = document.getElementById(scriptId);
    if (structuredData) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(structuredData);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, canonicalUrl, ogType, ogImage, structuredData, noIndex]);

  return null;
};

export default SEO;
