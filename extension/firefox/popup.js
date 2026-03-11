const chrome = typeof browser !== 'undefined' ? browser : chrome;

document.addEventListener('DOMContentLoaded', () => {
  const barToggle = document.getElementById('bar-toggle');

  chrome.storage.local.get(['barVisible'], (data) => {
    const visible = data.barVisible !== false;
    barToggle.classList.toggle('active', visible);
  });

  document.getElementById('toggle-bar').addEventListener('click', () => {
    const isActive = barToggle.classList.toggle('active');
    chrome.storage.local.set({ barVisible: isActive });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'toggleBar',
          visible: isActive,
        });
      }
    });
  });
});
