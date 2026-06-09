/* ============================================================
   ADP — Portfolio | JS filtres
   Chaque barre de filtres est indépendante par data-grid
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* Pour chaque groupe de filtres dans la page */
    document.querySelectorAll('.pf-filter-bar').forEach(bar => {

        const buttons = bar.querySelectorAll('.pf-filter-btn');

        /* Identifier la grille cible :
           1. via data-grid sur le bouton
           2. ou la grille .pf-projects-grid dans le même .pf-category-block */
        const getGrid = (btn) => {
            const gridId = btn.getAttribute('data-grid');
            if (gridId) return document.getElementById(gridId);
            return btn.closest('.pf-category-block')
                      ?.querySelector('.pf-projects-grid') || null;
        };

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {

                /* Activer le bouton cliqué */
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                const grid = getGrid(btn);
                if (!grid) return;

                const cards = grid.querySelectorAll('.pf-card');

                cards.forEach((card, i) => {
                    const type = card.getAttribute('data-type');
                    const match = filterValue === 'all' || type === filterValue;

                    if (match) {
                        card.classList.remove('hidden');
                        /* Délai en cascade pour un effet visuel propre */
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, i * 40);
                    } else {
                        card.classList.remove('visible');
                        card.classList.add('hidden');
                    }
                });
            });
        });
    });

});
