const functions = require('firebase-functions');
// Restrict CORS to your public origins. Allowlist your custom domain and the
// GitHub Pages hostname used for testing. Also allow requests with no origin
// (for server-to-server calls/tools).
const allowedOrigins = [
  'https://www.arthurkortekaas.nl',
  'https://arthurkortekaas.nl',
  'https://taliesinds.github.io'
];
const cors = require('cors')({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server or curl
    return allowedOrigins.includes(origin) ? callback(null, true) : callback(new Error('Not allowed by CORS'));
  }
});

// Keep secret out of code: read from environment. In 2nd-gen Cloud Functions
// `functions.config()` is not available and calling it will crash the loader.
// Map your Secret Manager secret to the environment variable `RECAPTCHA_SECRET`
// when deploying (or set process.env.RECAPTCHA_SECRET for local testing).
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || process.env.RECAPTCHA_SECRET_FALLBACK || '';

exports.verifyCaptcha = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') return res.status(405).json({ ok: false, reason: 'method-not-allowed' });
  const token = req.body && req.body.token;
    if (!token) return res.status(400).json({ ok: false, reason: 'no-token' });
    if (!RECAPTCHA_SECRET) return res.status(500).json({ ok: false, reason: 'no-secret-configured' });

    try {
      const params = new URLSearchParams();
      params.append('secret', RECAPTCHA_SECRET);
      params.append('response', token);

      const g = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        body: params
      });
      const data = await g.json();
  // (debug logs removed) -- function only returns verification result
      // data.success is boolean (v2)
      if (data.success) {
        // Optional: verify hostname matches your site:
        // if (data.hostname !== 'yourdomain.com') return res.json({ ok: false, reason: 'hostname-mismatch' });
        return res.json({ ok: true });
      } else {
        return res.json({ ok: false, reason: 'verification-failed', details: data['error-codes'] || [] });
      }
    } catch (err) {
      console.error('verifyCaptcha error', err);
      return res.status(500).json({ ok: false, reason: 'server-error' });
    }
  });
});