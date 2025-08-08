// src/contexts/config.js
// Preferred: same-origin '/api/contact' when server is deployed next to the site.
// Override by setting VITE_CONTACT_ENDPOINT or window.__CONTACT_ENDPOINT__.
export const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT ||
  (typeof window !== 'undefined' ? window.__CONTACT_ENDPOINT__ : null) ||
  '/api/contact';
