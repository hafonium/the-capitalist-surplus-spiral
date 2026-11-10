// Âm thanh tổng hợp bằng WebAudio: nhạc nền hộp nhạc lạc điệu + tiếng drone + chuông, và hiệu ứng
const Sound = (() => {
  let ac = null, master, musicBus, droneBus, sfxBus;
  let muted = false, fear = 0, melodyOn = false, droneOn = false;
  let step = 0, nextT = 0, timer = null;

  const mf = (m) => 440 * Math.pow(2, (m - 69) / 12);

  function ctx() {
    if (!ac) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ac = new AC();
      master = ac.createGain(); master.gain.value = muted ? 0 : 0.9; master.connect(ac.destination);
      // tiếng vọng cho hộp nhạc
      musicBus = ac.createGain(); musicBus.gain.value = 0.5;
      const delay = ac.createDelay(2); delay.delayTime.value = 0.46;
      const fb = ac.createGain(); fb.gain.value = 0.42;
      const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1600;
      musicBus.connect(master); musicBus.connect(delay); delay.connect(lp); lp.connect(fb); fb.connect(delay); lp.connect(master);
      droneBus = ac.createGain(); droneBus.gain.value = 0; droneBus.connect(master);
      sfxBus = ac.createGain(); sfxBus.gain.value = 1; sfxBus.connect(master);
    }
    if (ac.state === "suspended") ac.resume();
    return ac;
  }

  function tone(freq, t, dur, { type = "sine", vol = 0.05, slide = 0, bus } = {}) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.linearRampToValueAtTime(Math.max(20, freq + slide), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(bus || sfxBus); o.start(t); o.stop(t + dur + 0.05);
  }

  function noise(t, dur, { vol = 0.04, freq = 900, q = 3, bus } = {}) {
    const n = Math.floor(ac.sampleRate * dur), b = ac.createBuffer(1, n, ac.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 1.5);
    const s = ac.createBufferSource(); s.buffer = b;
    const f = ac.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = freq; f.Q.value = q;
    const g = ac.createGain(); g.gain.value = vol;
    s.connect(f); f.connect(g); g.connect(bus || sfxBus); s.start(t);
  }

  // Chuông nhà thờ: các họa âm không điều hòa
  function bell(t, base = 110, vol = 0.07) {
    [[1, 1], [2.0, .5], [2.76, .4], [4.07, .25], [5.4, .15]].forEach(([r, a]) =>
      tone(base * r, t, 5.5 / Math.sqrt(r), { vol: vol * a, bus: musicBus }));
  }

  // Giai điệu hộp nhạc La thứ (hòa âm) – 32 nốt móc đơn
  const MELODY = [
    69, 72, 76, 81, 80, 76, 72, 71,
    69, 72, 76, 77, 76, 72, 71, 68,
    69, 0, 76, 0, 74, 72, 0, 71,
    68, 0, 71, 0, 69, 0, 0, 0,
  ];
  const BASS = { 0: 45, 8: 41, 16: 38, 24: 40 }; // A2 F2 D2 E2

  function scheduleStep(t) {
    const i = step % MELODY.length;
    const bar = Math.floor(step / MELODY.length);
    const m = MELODY[i];
    // hộp nhạc lạc điệu: càng sợ càng lệch
    const wobble = (Math.random() - 0.5) * (0.006 + fear * 0.02) + (bar % 2 ? -0.012 : 0);
    if (m) {
      const f = mf(m) * (1 + wobble);
      tone(f, t, 1.8, { vol: 0.045, bus: musicBus });
      tone(f * 2.003, t, 0.9, { vol: 0.012, bus: musicBus });
    }
    if (BASS[i] !== undefined) tone(mf(BASS[i]), t, 3.2, { type: "triangle", vol: 0.05, bus: musicBus });
    if (i === 0 && bar % 2 === 1) bell(t + 0.02, 98, 0.06);
    if (fear >= 1 && i % 4 === 0) heartAt(t + 0.05, fear >= 2 ? 0.2 : 0.13);
    if (Math.random() < 0.015 + fear * 0.02) noise(t, 1.4, { vol: 0.02, freq: 300 + Math.random() * 500, q: 8, bus: musicBus });
    step++;
  }

  function scheduler() {
    if (!ac || !melodyOn) return;
    const eighth = 60 / (66 * (1 + 0.18 * fear)) / 2;
    while (nextT < ac.currentTime + 0.25) { scheduleStep(nextT); nextT += eighth; }
  }

  function startDrone() {
    if (droneOn || !ctx()) return;
    droneOn = true;
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 240; lp.Q.value = 6;
    lp.connect(droneBus);
    [55, 55.4, 82.4, 110.7].forEach((f, k) => {
      const o = ac.createOscillator(); o.type = k < 2 ? "sawtooth" : "sine"; o.frequency.value = f;
      const g = ac.createGain(); g.gain.value = k < 2 ? 0.05 : 0.025;
      o.connect(g); g.connect(lp); o.start();
    });
    const lfo = ac.createOscillator(), lg = ac.createGain();
    lfo.frequency.value = 0.07; lg.gain.value = 140; lfo.connect(lg); lg.connect(lp.frequency); lfo.start();
    droneBus.gain.setTargetAtTime(0.9, ac.currentTime, 2.5);
  }

  function heartAt(t, vol) {
    tone(58, t, 0.16, { vol, slide: -20 });
    tone(50, t + 0.2, 0.18, { vol: vol * 0.8, slide: -15 });
  }

  const now = () => (ctx() ? ac.currentTime : null);
  const safe = (fn) => (...a) => { try { const t = now(); if (t !== null) fn(t, ...a); } catch {} };

  return {
    startMusic: safe(() => {
      startDrone();
      if (!melodyOn) { melodyOn = true; step = 0; nextT = ac.currentTime + 0.3; }
      if (!timer) timer = setInterval(scheduler, 60);
    }),
    stopMelody() { melodyOn = false; },
    setFear(f) { fear = f; },
    setMuted(m) {
      muted = m;
      if (ac) master.gain.setTargetAtTime(m ? 0 : 0.9, ac.currentTime, 0.1);
    },
    sfx: {
      buy: safe((t) => { tone(880, t, 0.12, { type: "triangle", vol: 0.04 }); tone(1320, t + 0.06, 0.18, { type: "triangle", vol: 0.03 }); }),
      hammer: safe((t) => { tone(110, t, 0.2, { type: "sawtooth", vol: 0.08, slide: -60 }); noise(t, 0.15, { vol: 0.06, freq: 1800, q: 1 }); }),
      swipe: safe((t) => noise(t, 0.25, { vol: 0.05, freq: 2400, q: 0.8 })),
      whisper: safe((t) => { noise(t, 2.2, { vol: 0.05, freq: 2600, q: 6 }); noise(t + 0.4, 1.6, { vol: 0.03, freq: 1700, q: 9 }); }),
      creak: safe((t) => tone(180, t, 1.1, { type: "sawtooth", vol: 0.025, slide: 90 })),
      bad: safe((t) => {
        bell(t, 82, 0.12); bell(t + 2.2, 82, 0.1);
        tone(620, t, 1.4, { type: "sawtooth", vol: 0.04, slide: -540 });
        noise(t, 1.6, { vol: 0.09, freq: 500, q: 1.5 });
      }),
      good: safe((t) => [69, 72, 76, 81].forEach((m, i) => tone(mf(m), t + i * 0.18, 1.6, { vol: 0.05, bus: musicBus }))),
    },
  };
})();
