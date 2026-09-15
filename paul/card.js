/* Optional local event bridge. No cookies, storage, identifiers or network requests.
   An approved, anonymous collector may subscribe to adp:card-event. */
(() => {
  'use strict';
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl) return;
  const emit = (action) => window.dispatchEvent(new CustomEvent('adp:card-event', {
    detail: { page: '/paul', action }
  }));
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-event]');
    if (link) emit(link.dataset.event);
  });
  emit('card_open');
})();
