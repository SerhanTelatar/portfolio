/* ============================================================
   CONTACT.JS — EmailJS form submission + validation
   Requires: https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js
   Set YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID below.
   ============================================================ */

const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // Replace with your EmailJS public key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';   // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // Replace with your EmailJS template ID

document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    const form = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    const submitBtn = document.getElementById('submit-btn');
    if (!form) return;

    /* ── Validation helpers ── */
    function showError(fieldId, msg) {
        const group = document.getElementById(fieldId)?.closest('.form-group');
        if (!group) return;
        group.classList.add('has-error');
        const errEl = group.querySelector('.form-error');
        if (errEl) errEl.textContent = msg;
        document.getElementById(fieldId)?.classList.add('error');
    }

    function clearError(fieldId) {
        const group = document.getElementById(fieldId)?.closest('.form-group');
        if (!group) return;
        group.classList.remove('has-error');
        document.getElementById(fieldId)?.classList.remove('error');
    }

    function clearAll() {
        ['name', 'email', 'subject', 'message'].forEach(clearError);
    }

    function validateForm() {
        clearAll();
        let valid = true;

        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const subject = document.getElementById('subject')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        if (!name || name.length < 2) {
            showError('name', 'Please enter your full name.'); valid = false;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('email', 'Please enter a valid email address.'); valid = false;
        }
        if (!subject || subject.length < 3) {
            showError('subject', 'Please enter a subject.'); valid = false;
        }
        if (!message || message.length < 10) {
            showError('message', 'Message must be at least 10 characters.'); valid = false;
        }
        return valid;
    }

    /* ── Submit ── */
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';

        try {
            if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
                await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
            } else {
                // Fallback: open mailto link if EmailJS not configured
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const subject = encodeURIComponent(document.getElementById('subject').value.trim());
                const body = encodeURIComponent(`From: ${name} <${email}>\n\n${document.getElementById('message').value.trim()}`);
                window.open(`mailto:telatarserhan@gmail.com?subject=${subject}&body=${body}`);
            }
            // Show success state
            form.style.display = 'none';
            if (success) success.classList.add('show');
        } catch (err) {
            console.error('Email send error:', err);
            showError('message', 'Failed to send. Please try again or email directly.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });

    // Live clear on input
    ['name', 'email', 'subject', 'message'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', () => clearError(id));
    });
});
