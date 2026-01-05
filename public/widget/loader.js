(function() {
  // Get the script tag and API key
  var scripts = document.getElementsByTagName('script');
  var currentScript = scripts[scripts.length - 1];
  var apiKey = currentScript.getAttribute('data-api-key');
  
  if (!apiKey) {
    console.error('TysonsTech Widget: Missing data-api-key attribute');
    return;
  }

  // Configuration
  var widgetUrl = 'https://tysonstechsolutions.com/widget/' + apiKey;
  var position = currentScript.getAttribute('data-position') || 'bottom-right';

  // Create widget container
  var container = document.createElement('div');
  container.id = 'tysonstech-widget-container';
  container.style.cssText = 'position:fixed;z-index:999999;' + 
    (position === 'bottom-left' ? 'left:20px;' : 'right:20px;') + 
    'bottom:20px;';

  // Create toggle button
  var button = document.createElement('button');
  button.id = 'tysonstech-widget-button';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  button.style.cssText = 'width:60px;height:60px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:transform 0.2s,box-shadow 0.2s;background:#2563eb;color:white;';
  button.onmouseover = function() { this.style.transform = 'scale(1.05)'; this.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)'; };
  button.onmouseout = function() { this.style.transform = 'scale(1)'; this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'; };

  // Create iframe container
  var iframeContainer = document.createElement('div');
  iframeContainer.id = 'tysonstech-widget-frame-container';
  iframeContainer.style.cssText = 'display:none;width:380px;height:600px;max-height:calc(100vh - 100px);border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.15);margin-bottom:16px;background:white;';

  // Create iframe
  var iframe = document.createElement('iframe');
  iframe.id = 'tysonstech-widget-frame';
  iframe.src = widgetUrl;
  iframe.style.cssText = 'width:100%;height:100%;border:none;';
  iframe.allow = 'geolocation';

  iframeContainer.appendChild(iframe);
  container.appendChild(iframeContainer);
  container.appendChild(button);
  document.body.appendChild(container);

  // Toggle functionality
  var isOpen = false;
  button.onclick = function() {
    isOpen = !isOpen;
    iframeContainer.style.display = isOpen ? 'block' : 'none';
    button.innerHTML = isOpen 
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  };

  // Listen for messages from iframe
  window.addEventListener('message', function(event) {
    if (event.data.type === 'tysonstech-close') {
      isOpen = false;
      iframeContainer.style.display = 'none';
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
    }
    if (event.data.type === 'tysonstech-set-color') {
      button.style.background = event.data.color;
    }
  });
})();
