/* ============================================================
   FEEDBACKS.JS — Rating bars + star rendering
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Animate rating breakdown bars
    const ratingBars = document.querySelectorAll('.bar-fill[data-pct]');
    const observer = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
            ratingBars.forEach(bar => {
                bar.style.width = bar.dataset.pct + '%';
            });
            observer.disconnect();
        }
    }, { threshold: 0.2 });
    ratingBars.forEach(b => observer.observe(b));
});
