/* ============================================================
   ABOUT.JS — Skills tabs + bar animation
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Skill tabs
    const tabs = document.querySelectorAll('.skill-tab');
    const panels = document.querySelectorAll('.skills-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('panel-' + target)?.classList.add('active');
            // Re-animate bars when switching to tech tab
            if (target === 'tech') animateSkillBars();
        });
    });

    // Animate bars on page load for default tab
    animateSkillBars();
});
