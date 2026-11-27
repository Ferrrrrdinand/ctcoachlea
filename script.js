// State
    let totalSeconds = 5 * 60;
    let initialSeconds = 5 * 60;
    let timerId = null;
    let isRunning = false;
    let soundEnabled = true;

    // Elements
    const dispMin = document.getElementById('dispMin');
    const dispSec = document.getElementById('dispSec');
    const dispColon = document.getElementById('dispColon');
    const dispStatus = document.getElementById('dispStatus');
    const timerBox = document.getElementById('timerBox');

    const inputMinutes = document.getElementById('inputMinutes');
    const inputSeconds = document.getElementById('inputSeconds');
    const btnStartPause = document.getElementById('btnStartPause');
    const btnReset = document.getElementById('btnReset');
    const btnApplyTime = document.getElementById('btnApplyTime');
    const bgSelect = document.getElementById('bgSelect');
    const btnSoundToggle = document.getElementById('btnSoundToggle');
    const btnFullscreen = document.getElementById('btnFullscreen');

    const controlsDock = document.getElementById('controlsDock');
    const btnToggleDock = document.getElementById('btnToggleDock');
    const dockTabIcon = document.getElementById('dockTabIcon');

    // Text & Logo Display Elements
    const dispHeaderLine1 = document.getElementById('dispHeaderLine1');
    const dispHeaderLine2 = document.getElementById('dispHeaderLine2');
    const dispTitleCaps = document.getElementById('dispTitleCaps');
    const dispTitleScript = document.getElementById('dispTitleScript');
    const dispTitleSerif = document.getElementById('dispTitleSerif');
    const logoWrapper = document.getElementById('logoWrapper');
    const mainLogo = document.getElementById('mainLogo');

    // Modal Elements
    const editModal = document.getElementById('editModal');
    const btnOpenModal = document.getElementById('btnOpenModal');
    const btnCancelModal = document.getElementById('btnCancelModal');
    const btnSaveModal = document.getElementById('btnSaveModal');

    const inputEditHeader1 = document.getElementById('inputEditHeader1');
    const inputEditHeader2 = document.getElementById('inputEditHeader2');
    const inputEditTitleCaps = document.getElementById('inputEditTitleCaps');
    const inputEditTitleScript = document.getElementById('inputEditTitleScript');
    const inputEditTitleSerif = document.getElementById('inputEditTitleSerif');
    const checkShowLogo = document.getElementById('checkShowLogo');
    const selectLogoSize = document.getElementById('selectLogoSize');

    // Web Audio Synthesizer (Chime sound for countdown finish)
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function getAudioContext() {
      if (!audioCtx) {
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    function playBellChime() {
      if (!soundEnabled) return;
      const ctx = getAudioContext();
      const chimeNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      chimeNotes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.16);

        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.16);
        gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + i * 0.16 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.16 + 2.0);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.16);
        osc.stop(ctx.currentTime + i * 0.16 + 2.1);
      });
    }

    // Render Time
    function render() {
      const m = Math.floor(totalSeconds / 60);
      const s = totalSeconds % 60;
      dispMin.textContent = String(m).padStart(2, '0');
      dispSec.textContent = String(s).padStart(2, '0');

      if (isRunning && totalSeconds > 0 && totalSeconds <= 30) {
        timerBox.classList.add('warning-flash');
      } else {
        timerBox.classList.remove('warning-flash');
      }
    }

    // Tick
    function tick() {
      if (totalSeconds > 0) {
        totalSeconds--;
        render();
        if (totalSeconds === 0) {
          onFinish();
        }
      }
    }

    // Start / Pause
    function toggleStartPause() {
      getAudioContext();

      if (isRunning) {
        // Jeda / Pause
        clearInterval(timerId);
        timerId = null;
        isRunning = false;
        btnStartPause.innerHTML = '▶ LANJUTKAN';
        btnStartPause.className = 'btn btn-green-start';
        dispStatus.textContent = 'DIJEDA / PAUSED';
        dispColon.classList.add('paused');
      } else {
        // Mulai / Start
        if (totalSeconds <= 0) {
          totalSeconds = initialSeconds > 0 ? initialSeconds : 5 * 60;
          render();
        }
        timerId = setInterval(tick, 1000);
        isRunning = true;
        btnStartPause.innerHTML = '⏸ JEDA';
        btnStartPause.className = 'btn btn-amber-pause';
        dispStatus.textContent = 'BERLANGSUNG / LIVE';
        dispColon.classList.remove('paused');
      }
    }

    // Reset
    function reset() {
      clearInterval(timerId);
      timerId = null;
      isRunning = false;
      totalSeconds = initialSeconds;
      render();
      btnStartPause.innerHTML = '▶ MULAI';
      btnStartPause.className = 'btn btn-green-start';
      dispStatus.textContent = 'SIAP / READY';
      dispColon.classList.add('paused');
      timerBox.classList.remove('warning-flash');
    }

    // On Finish
    function onFinish() {
      clearInterval(timerId);
      timerId = null;
      isRunning = false;
      btnStartPause.innerHTML = '▶ MULAI';
      btnStartPause.className = 'btn btn-green-start';
      dispStatus.textContent = 'WAKTU SELESAI / FINISHED';
      dispColon.classList.remove('paused');
      timerBox.classList.add('warning-flash');
      playBellChime();
    }

    // Apply manual time
    function applyInputTime() {
      const m = parseInt(inputMinutes.value, 10) || 0;
      const s = parseInt(inputSeconds.value, 10) || 0;
      initialSeconds = Math.max(0, m * 60 + s);
      totalSeconds = initialSeconds;
      reset();
    }

    // Preset helper
    window.setPreset = function(m, s) {
      inputMinutes.value = m;
      inputSeconds.value = s;
      initialSeconds = m * 60 + s;
      totalSeconds = initialSeconds;
      reset();
    };

    // Quick adjust
    window.adjustTime = function(delta) {
      totalSeconds = Math.max(0, totalSeconds + delta);
      initialSeconds = Math.max(initialSeconds, totalSeconds);
      render();
    };

    // Background switch
    bgSelect.addEventListener('change', (e) => {
      document.body.className = 'mode-' + e.target.value;
    });

    // Toggle Dock Visibility
    function toggleDock() {
      controlsDock.classList.toggle('collapsed');
      const isCollapsed = controlsDock.classList.contains('collapsed');
      dockTabIcon.textContent = isCollapsed ? '▲' : '▼';
    }

    btnToggleDock.addEventListener('click', toggleDock);

    // Toggle sound
    btnSoundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      btnSoundToggle.textContent = soundEnabled ? '🔔 NADA: ON' : '🔕 NADA: OFF';
    });

    // Fullscreen
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Edit Modal Open & Save
    btnOpenModal.addEventListener('click', () => {
      inputEditHeader1.value = dispHeaderLine1.textContent;
      inputEditHeader2.value = dispHeaderLine2.textContent;
      inputEditTitleCaps.value = dispTitleCaps.textContent;
      inputEditTitleScript.value = dispTitleScript.textContent;
      inputEditTitleSerif.value = dispTitleSerif.textContent;
      checkShowLogo.checked = logoWrapper.style.display !== 'none';
      selectLogoSize.value = mainLogo.style.height || '54px';
      editModal.classList.add('open');
    });

    btnCancelModal.addEventListener('click', () => {
      editModal.classList.remove('open');
    });

    btnSaveModal.addEventListener('click', () => {
      dispHeaderLine1.textContent = inputEditHeader1.value;
      dispHeaderLine2.textContent = inputEditHeader2.value;
      dispTitleCaps.textContent = inputEditTitleCaps.value;
      dispTitleScript.textContent = inputEditTitleScript.value;
      dispTitleSerif.textContent = inputEditTitleSerif.value;
      logoWrapper.style.display = checkShowLogo.checked ? 'flex' : 'none';
      mainLogo.style.height = selectLogoSize.value;
      editModal.classList.remove('open');
    });

    // POOL FOTO UNTUK ANIMASI GELEMBUNG NAIK (BAWAH LAUT)
    let photoPool = ['bubble1.jpg', 'bubble4.jpg', 'bubble6.jpg'];
    let photoPoolIndex = 0;
    let risingSpawnerInterval = null;

    const risingContainer = document.getElementById('risingBubblesContainer');
    const bubbleModeSelect = document.getElementById('bubbleModeSelect');
    const multiPhotoUpload = document.getElementById('multiPhotoUpload');
    const multiPhotoCount = document.getElementById('multiPhotoCount');

    // Handle multi-photo upload
    if (multiPhotoUpload) {
      multiPhotoUpload.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
          // Bersihkan pool lama dan isi dengan foto baru yang dipilih
          photoPool = files.map(file => URL.createObjectURL(file));
          photoPoolIndex = 0;
          if (multiPhotoCount) {
            multiPhotoCount.textContent = `✓ Berhasil memuat ${files.length} foto ke aliran gelembung naik!`;
          }
        }
      });
    }

    // Fungsi spawn gelembung naik bawah laut
    function spawnRisingBubble() {
      if (!document.body.classList.contains('bubble-mode-rising')) return;
      if (photoPool.length === 0) return;

      const bubble = document.createElement('div');
      bubble.className = 'rising-bubble';

      // Ukuran acak antara 130px s/d 215px
      const size = Math.floor(Math.random() * 85) + 130;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';

      // Posisi horizontal: kiri (2% - 26%) atau kanan (74% - 94%) agar tidak menutupi timer di tengah
      const isLeft = Math.random() < 0.5;
      const leftPos = isLeft ? (2 + Math.random() * 24) : (74 + Math.random() * 20);
      bubble.style.left = leftPos + '%';

      // Kecepatan melayang naik: 14s s/d 22s (anggun dan lembut seperti bawah laut)
      const duration = (Math.random() * 8 + 14).toFixed(1);
      bubble.style.animationDuration = duration + 's';

      // Goyangan acak ke kiri dan kanan saat naik
      bubble.style.setProperty('--drift-1', (Math.random() * 40 - 20) + 'px');
      bubble.style.setProperty('--drift-2', (Math.random() * 46 - 23) + 'px');
      bubble.style.setProperty('--drift-3', (Math.random() * 40 - 20) + 'px');
      bubble.style.setProperty('--drift-4', (Math.random() * 34 - 17) + 'px');

      // Ambil foto berikutnya secara bergiliran (1 foto per gelembung)
      const currentPhotoSrc = photoPool[photoPoolIndex];
      photoPoolIndex = (photoPoolIndex + 1) % photoPool.length;

      // Buat elemen foto, efek kilau kaca 3D, dan bintang berkilau
      bubble.innerHTML = `
        <img src="${currentPhotoSrc}" class="bubble-photo-img" alt="Foto Gelembung">
        <div class="bubble-gloss"></div>
        <svg class="bubble-star" style="top: ${Math.random() * 25 + 10}%; right: ${Math.random() * 20 + 10}%; width: 22px; height: 22px;" viewBox="0 0 24 24">
          <path d="M12 0 L14 9 L24 12 L14 15 L12 24 L10 15 L0 12 L10 9 Z" fill="#ffffff" />
        </svg>
      `;

      // Hapus otomatis saat gelembung sudah sampai di atas layar
      bubble.addEventListener('animationend', () => {
        bubble.remove();
      });

      risingContainer.appendChild(bubble);
    }

    // Mulai loop spawner
    function startRisingSpawner() {
      if (risingSpawnerInterval) clearInterval(risingSpawnerInterval);
      // Spawn gelembung perdana bertahap
      spawnRisingBubble();
      setTimeout(spawnRisingBubble, 1200);
      setTimeout(spawnRisingBubble, 2400);

      // Interval berkala setiap 2.8 detik
      risingSpawnerInterval = setInterval(spawnRisingBubble, 2800);
    }

    function stopRisingSpawner() {
      if (risingSpawnerInterval) {
        clearInterval(risingSpawnerInterval);
        risingSpawnerInterval = null;
      }
      if (risingContainer) {
        risingContainer.innerHTML = '';
      }
    }

    // Switch mode gelembung naik / diam
    if (bubbleModeSelect) {
      bubbleModeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'rising') {
          document.body.classList.add('bubble-mode-rising');
          startRisingSpawner();
        } else {
          document.body.classList.remove('bubble-mode-rising');
          stopRisingSpawner();
        }
      });
    }

    // Inisialisasi awal gelembung naik
    startRisingSpawner();

    // Aturan 1 Foto = 1 Gelembung (Tidak Boleh Duplikat)
    const bubblePhotoKeys = {};

    [1, 2, 3, 4, 5, 6].forEach(num => {
      const fileInput = document.getElementById(`fileBubble${num}`);
      const imgElem = document.getElementById(`imgBubble${num}`);
      if (fileInput && imgElem) {
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            const fileKey = `${file.name}_${file.size}`;
            
            // Periksa apakah foto ini sudah dipakai di gelembung lain
            for (let i = 1; i <= 6; i++) {
              if (i !== num && bubblePhotoKeys[i] === fileKey) {
                alert(`⚠️ ATURAN: 1 Foto hanya untuk 1 Gelembung!\nFoto "${file.name}" sudah digunakan di Gelembung ${i}. Silakan pilih foto lain.`);
                fileInput.value = '';
                return;
              }
            }

            // Simpan identitas foto untuk gelembung ini
            bubblePhotoKeys[num] = fileKey;
            imgElem.src = URL.createObjectURL(file);
            imgElem.style.display = 'block';
          }
        });
      }
    });

    // Fungsi reset/hapus foto dari gelembung
    window.removeBubblePhoto = function(num) {
      const imgElem = document.getElementById(`imgBubble${num}`);
      const fileInput = document.getElementById(`fileBubble${num}`);
      if (imgElem) {
        imgElem.style.display = 'none';
        imgElem.src = '';
      }
      if (fileInput) fileInput.value = '';
      delete bubblePhotoKeys[num];
    };

    // Button Listeners
    btnStartPause.addEventListener('click', toggleStartPause);
    btnReset.addEventListener('click', reset);
    btnApplyTime.addEventListener('click', applyInputTime);

    // Hotkeys
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        toggleStartPause();
      } else if (e.code === 'KeyR') {
        reset();
      } else if (e.code === 'KeyH') {
        toggleDock();
      } else if (e.code === 'KeyF') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    });

    // Initial State
    render();
    dispColon.classList.add('paused');
