/* ============================================================
   PROJECTS.JS — Search + filter logic
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('project-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const statusSelect = document.getElementById('status-filter');
    const langSelect = document.getElementById('lang-filter');
    const cards = document.querySelectorAll('.project-card');
    const countEl = document.getElementById('project-count');

    let activeType = 'all';
    let activeStatus = 'all';
    let activeLang = 'all';
    let searchQuery = '';

    function filterCards() {
        let visible = 0;
        cards.forEach(card => {
            const title = card.dataset.title?.toLowerCase() || '';
            const desc = card.dataset.desc?.toLowerCase() || '';
            const type = card.dataset.type || '';
            const status = card.dataset.status || '';
            const langs = card.dataset.langs || '';

            const matchSearch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery) || langs.toLowerCase().includes(searchQuery);
            const matchType = activeType === 'all' || type === activeType;
            const matchStatus = activeStatus === 'all' || status === activeStatus;
            const matchLang = activeLang === 'all' || langs.toLowerCase().includes(activeLang);

            const show = matchSearch && matchType && matchStatus && matchLang;
            card.classList.toggle('hidden', !show);
            if (show) visible++;
        });

        // Show no-results if needed
        const noResults = document.getElementById('no-results');
        if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';

        if (countEl) countEl.innerHTML = `Showing <span>${visible}</span> of <span>${cards.length}</span> projects`;
    }

    // Events
    searchInput?.addEventListener('input', e => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterCards();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeType = btn.dataset.type;
            filterCards();
        });
    });

    statusSelect?.addEventListener('change', e => {
        activeStatus = e.target.value;
        filterCards();
    });

    langSelect?.addEventListener('change', e => {
        activeLang = e.target.value;
        filterCards();
    });

    // Init count
    filterCards();
});
