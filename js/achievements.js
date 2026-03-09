/* ============================================================
   ACHIEVEMENTS.JS — Cert modal + tab switching
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const achTabs = document.querySelectorAll('.ach-tab');
    const achPanels = document.querySelectorAll('.ach-panel');

    achTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            achTabs.forEach(t => t.classList.remove('active'));
            achPanels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('panel-' + tab.dataset.tab)?.classList.add('active');
        });
    });

    // Certificate modal
    const modal = document.getElementById('cert-modal');
    const mImg = document.getElementById('modal-img');
    const mName = document.getElementById('modal-name');
    const mDesc = document.getElementById('modal-desc');
    const mLink = document.getElementById('modal-link');

    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', () => {
            if (!modal) return;
            mImg.src = card.dataset.img || '';
            mImg.alt = card.dataset.name || '';
            mName.textContent = card.dataset.name || '';
            mDesc.textContent = card.dataset.desc || '';
            if (card.dataset.link && card.dataset.link !== '#') {
                mLink.href = card.dataset.link;
                mLink.classList.remove('disabled');
                mLink.style.pointerEvents = 'auto';
            } else {
                mLink.href = '#';
                mLink.classList.add('disabled');
            }
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    document.getElementById('modal-close')?.addEventListener('click', closeModal);
    modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    function closeModal() {
        modal?.classList.remove('open');
        document.body.style.overflow = '';
    }
});
