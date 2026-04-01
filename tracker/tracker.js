(function() {
  const SERVER_URL = 'http://localhost:5000/api/track';
  const SESSION_ID = 'VIS-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  let startTime = Date.now();
  let maxScroll = 0;
  let visitType = localStorage.getItem('returning') ? 'Returning' : 'First Visit';
  localStorage.setItem('returning', 'true');

  function sendData(action, payload = {}) {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const data = {
      action,
      sessionId: SESSION_ID,
      page: window.location.pathname,
      referrer: document.referrer,
      timeOnPage: timeSpent + 's',
      scrollDepth: maxScroll + '%',
      visitType,
      userAgent: navigator.userAgent,
      screen: `${window.screen.width}x${window.screen.height}`,
      ...payload
    };

    // Use sendBeacon for reliability on leave
    if (navigator.sendBeacon) {
      navigator.sendBeacon(SERVER_URL, JSON.stringify(data));
    } else {
      fetch(SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true
      });
    }
  }

  // Track Page Load
  window.addEventListener('load', () => sendData('Page Visit', { type: 'initial_load' }));

  // Track Clicks
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (target) {
      sendData('Click', {
        element: target.tagName,
        text: target.innerText || target.value || 'icon',
        href: target.href || null
      });
    }
  });

  // Track Form Submissions
  document.addEventListener('submit', (e) => {
    const form = e.target;
    sendData('Form Submit', {
      formId: form.id || 'anonymous_form',
      fields: Array.from(form.elements)
        .filter(el => el.name)
        .map(el => el.name)
    });
  });

  // Track Scroll Depth
  window.addEventListener('scroll', () => {
    const scroll = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
    if (scroll > maxScroll) {
      maxScroll = scroll;
      if ([25, 50, 75, 100].includes(maxScroll)) {
        sendData('Scroll Depth', { depth: maxScroll + '%' });
      }
    }
  });

  // Track Tab Switching
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      sendData('Tab Switch', { state: 'hidden' });
    } else {
      sendData('Tab Switch', { state: 'visible' });
    }
  });

  // Track Exit Intent
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0) {
      sendData('Exit Intent');
    }
  });

  // Handle Unload
  window.addEventListener('beforeunload', () => {
    sendData('Page Exit');
  });

})();
