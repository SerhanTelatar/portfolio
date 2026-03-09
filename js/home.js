/* ============================================================
   HOME.JS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Particle canvas
    initParticles('particles-canvas');

    // Typewriter
    const typeEl = document.getElementById('typewriter-text');
    const roles = ['Deep Learning Engineer', 'Computer Vision Specialist', 'ML Researcher', 'Software Engineer', 'AI/ML Student'];
    initTypewriter(typeEl, roles);
});
