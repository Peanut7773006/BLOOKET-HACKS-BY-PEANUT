(() => {
  const style = document.createElement('style');
  style.textContent = `
    #zach-gui {
      position: fixed;
      top: 100px;
      left: 100px;
      width: 280px;
      height: 160px;
      background: cyan;
      border: 3px solid black;
      border-radius: 15px;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
      user-select: none;
      z-index: 9999999;
      cursor: move;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
      transition: height 0.3s ease;
      overflow: hidden;
      text-transform: uppercase;
    }
    #zach-gui-header {
      padding: 8px 12px;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      background: rgba(0,0,0,0.1);
      border-bottom: 2px solid black;
      color: black;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      user-select: text;
      position: relative;
      flex-shrink: 0;
    }
    #zach-gui-header-text {
      user-select: none;
    }
    #zach-gui-close-box {
      position: absolute;
      top: 3px; /* moved up for perfect spacing */
      left: 10px;
      width: 22px;
      height: 22px;
      background: red;
      color: black;
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;
      text-align: center;
      border-radius: 6px;
      cursor: pointer;
      user-select: none;
      border: 2px solid black;
      font-family: Arial, sans-serif;
      transition: background 0.3s ease;
      z-index: 10;
      text-transform: none;
    }
    #zach-gui-close-box:hover {
      background: darkred;
      color: white;
    }
    #zach-gui-content {
      padding: 20px 15px 10px 15px;
      font-size: 16px;
      color: black;
      text-align: center;
      flex-shrink: 0;
    }
    #zach-gui-buttons {
      margin: 0 15px 15px 15px;
      display: none;
      flex-direction: column;
      gap: 8px;
      flex-grow: 1;
      overflow-y: auto;
      align-items: center;
      max-height: 280px;
      background: transparent !important;
      padding-top: 8px;
      position: relative;
    }
    #zach-gui-buttons::before {
      content: "";
      position: absolute;
      top: 0;
      left: 20%;
      width: 60%;
      height: 2px;
      background: grey;
      border-radius: 2px;
    }
    #zach-gui-buttons button {
      background: black;
      color: cyan;
      border: 2px solid black;
      border-radius: 8px;
      padding: 6px 0;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.3s ease;
      width: 160px;
      text-transform: uppercase;
    }
    #zach-gui-buttons button:hover {
      background: #004d4d;
    }
    #zach-open-btn {
      margin: 10px 15px 10px 15px;
      background: black;
      color: cyan;
      border: 2px solid black;
      border-radius: 8px;
      padding: 8px 0;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s ease;
      width: 160px;
      margin-left: auto;
      margin-right: auto;
      flex-shrink: 0;
      text-transform: uppercase;
    }
    
    /* Scrollbar styles */
    #zach-gui-buttons::-webkit-scrollbar {
      width: 8px;
    }
    #zach-gui-buttons::-webkit-scrollbar-track {
      background: transparent;
    }
    #zach-gui-buttons::-webkit-scrollbar-thumb {
      background-color: grey;
      border-radius: 4px;
    }
    /* Firefox scrollbar */
    #zach-gui-buttons {
      scrollbar-width: thin;
      scrollbar-color: grey transparent;
    }
  `;
  document.head.appendChild(style);

  const gui = document.createElement('div');
  gui.id = 'zach-gui';

  const header = document.createElement('div');
  header.id = 'zach-gui-header';

  const closeBox = document.createElement('div');
  closeBox.id = 'zach-gui-close-box';
  closeBox.textContent = '✖';
  closeBox.title = 'Disable menu (remove)';
  header.appendChild(closeBox);

  const headerText = document.createElement('div');
  headerText.id = 'zach-gui-header-text';
  headerText.textContent = 'Click E to hide menu';
  header.appendChild(headerText);

  gui.appendChild(header);

  const content = document.createElement('div');
  content.id = 'zach-gui-content';
  content.textContent = 'this menu was made by Zach';
  gui.appendChild(content);

  const openBtn = document.createElement('button');
  openBtn.id = 'zach-open-btn';
  openBtn.textContent = 'Open Menu';
  gui.appendChild(openBtn);

  const btnContainer = document.createElement('div');
  btnContainer.id = 'zach-gui-buttons';

  const btnTexts = [
    'ALL BLOOKS',
    'UNLIMITED TOKENS',
    'GET DEV BLOOKS',
    'INVISIBLE PLAYER',
    'SPEED BOOST',
    'DOUBLE XP',
    'AUTO ANSWER',
    'UNLOCK ALL MAPS',
    'FREE SKINS',
    'ENABLE ALL MODS'
  ];

  btnTexts.forEach(text => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btnContainer.appendChild(btn);
    if (text === 'ENABLE ALL MODS') {
      btn.addEventListener('click', () => {
        btnContainer.style.display = 'none';
        openBtn.textContent = 'Open Menu';
        gui.style.height = '160px';
      });
    } else {
      btn.addEventListener('click', () => alert(`"${text}" does not work. This is just a gimmick.`));
    }
  });

  gui.appendChild(btnContainer);

  openBtn.addEventListener('click', () => {
    if (btnContainer.style.display === 'flex') {
      btnContainer.style.display = 'none';
      openBtn.textContent = 'Open Menu';
      gui.style.height = '160px';
    } else {
      btnContainer.style.display = 'flex';
      openBtn.textContent = 'Minimize Menu';
      gui.style.height = '420px';
    }
  });

  closeBox.addEventListener('click', () => {
    gui.remove();
    style.remove();
    window.removeEventListener('keydown', keyHandler);
  });

  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  gui.addEventListener('mousedown', (e) => {
    if (
      e.target === openBtn ||
      btnContainer.contains(e.target) ||
      e.target === closeBox
    )
      return;
    isDragging = true;
    dragOffsetX = e.clientX - gui.getBoundingClientRect().left;
    dragOffsetY = e.clientY - gui.getBoundingClientRect().top;
    gui.style.cursor = 'grabbing';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    gui.style.cursor = 'move';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      e.preventDefault();
      let newX = e.clientX - dragOffsetX;
      let newY = e.clientY - dragOffsetY;
      const maxX = window.innerWidth - gui.offsetWidth;
      const maxY = window.innerHeight - gui.offsetHeight;
      if (newX < 0) newX = 0;
      else if (newX > maxX) newX = maxX;
      if (newY < 0) newY = 0;
      else if (newY > maxY) newY = maxY;
      gui.style.left = newX + 'px';
      gui.style.top = newY + 'px';
    }
  });

  function keyHandler(e) {
    if (e.key.toLowerCase() === 'e') {
      e.preventDefault();
      if (gui.style.display === 'none') {
        gui.style.display = 'flex';
      } else {
        gui.style.display = 'none';
      }
    }
  }
  window.addEventListener('keydown', keyHandler);

  document.body.appendChild(gui);
})();
