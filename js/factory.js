// Âm thanh nền nhà xưởng (tổng hợp bằng WebAudio, âm lượng nhỏ):
// tiếng ù máy, nhịp khung dệt (nhanh/dày hơn khi c/v cao), xả hơi nước, tiếng búa xa (khi còn thợ)
const Factory = (() => {
  const VOLUME = 0.16;            // âm lượng tổng – giữ nhỏ để không át hiệu ứng
  let ac = null, master = null, timer = null;
  let on = false, muted = false;
  let cv = 50, v = 50;
  let nextBeat = 0, beat = 0, nextHiss = 0, nextHammer = 0;
  let noiseBuf = null;

  function init() {
    if (ac) { if (ac.state === "suspended") ac.resume(); return true; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ac = new AC();
    master = ac.createGain(); master.gain.value = 0; master.connect(ac.destination);

    // bộ đệm nhiễu trắng dùng chung
    const n = ac.sampleRate * 2;
    noiseBuf = ac.createBuffer(1, n, ac.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;

    // tiếng ù nền: nhiễu nâu lọc thấp + điện lưới 50/100 Hz
    const hum = ac.createBufferSource(); hum.buffer = brownNoise(); hum.loop = true;
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 160;
    const hg = ac.createGain(); hg.gain.value = 0.55;
    hum.connect(lp); lp.connect(hg); hg.connect(master); hum.start();
    [[50, 0.05], [100, 0.025]].forEach(([f, g]) => {
      const o = ac.createOscillator(); o.frequency.value = f;
      const og = ac.createGain(); og.gain.value = g;
      o.connect(og); og.connect(master); o.start();
    });
    return true;
  }

  function brownNoise() {
    const n = ac.sampleRate * 3, b = ac.createBuffer(1, n, ac.sampleRate), d = b.getChannelData(0);
    let last = 0;
    for (let i = 0; i < n; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
    return b;
  }

  // một tiếng "cạch" ngắn: nhiễu qua bộ lọc dải
  function burst(t, { freq, q = 2, dur = 0.05, vol = 0.2, type = "bandpass" }) {
    const s = ac.createBufferSource(); s.buffer = noiseBuf;
    const f = ac.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(master);
    s.start(t, Math.random() * 1.5); s.stop(t + dur + 0.05);
  }

  function hiss(t) {
    const s = ac.createBufferSource(); s.buffer = noiseBuf; s.loop = true;
    const f = ac.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 3200;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
    s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + 2);
  }

  // tiếng búa gõ kim loại ở xa (lọc thấp để nghe như vọng lại)
  function hammer(t) {
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1800; lp.connect(master);
    [[620, 0.07], [1530, 0.035], [2410, 0.02]].forEach(([f, vol]) => {
      const o = ac.createOscillator(); o.frequency.value = f * (0.97 + Math.random() * 0.06);
      const g = ac.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      o.connect(g); g.connect(lp); o.start(t); o.stop(t + 0.5);
    });
  }

  function schedule() {
    if (!on || !ac) return;
    const machines = Math.max(1, Math.min(5, Math.round(cv / 20)));
    const bpm = 96 + machines * 12;                // nhiều máy hơn -> nhịp nhanh hơn
    const step = 60 / bpm / 2;
    const horizon = ac.currentTime + 0.2;

    while (nextBeat < horizon) {
      const t = nextBeat, i = beat % 8;
      // khung dệt 1: cạch – cộp
      if (i % 2 === 0) burst(t, { freq: 2600, q: 3, dur: 0.035, vol: 0.18 });
      else burst(t, { freq: 420, q: 1.5, dur: 0.08, vol: 0.22 });
      // khung dệt 2 (khi có từ 3 máy), lệch nhịp
      if (machines >= 3 && i % 3 === 1) burst(t + step * 0.5, { freq: 1700, q: 4, dur: 0.03, vol: 0.12 });
      // máy dập lớn (khi có từ 4 máy)
      if (machines >= 4 && i === 0) burst(t, { freq: 140, q: 1, dur: 0.18, vol: 0.35, type: "lowpass" });
      nextBeat += step; beat++;
    }
    if (nextHiss < horizon) { hiss(nextHiss); nextHiss += 7 + Math.random() * 9; }
    if (nextHammer < horizon) {
      if (v > 10) { hammer(nextHammer); if (Math.random() < 0.5) hammer(nextHammer + 0.42); }
      nextHammer += 2.5 + Math.random() * 4;
    }
  }

  function fadeTo(target, time) {
    master.gain.cancelScheduledValues(ac.currentTime);
    master.gain.setTargetAtTime(target, ac.currentTime, time);
  }

  return {
    start() {
      try {
        if (!init()) return;
        on = true;
        const t = ac.currentTime + 0.1;
        nextBeat = t; nextHiss = t + 3; nextHammer = t + 1.5;
        fadeTo(muted ? 0 : VOLUME, 1.2);
        if (!timer) timer = setInterval(schedule, 50);
      } catch {}
    },
    stop() {
      on = false;
      if (ac) fadeTo(0, 0.6);
    },
    setMuted(m) {
      muted = m;
      if (ac && on) fadeTo(m ? 0 : VOLUME, 0.15);
    },
    setState(newCv, newV) { cv = newCv; v = newV; },
  };
})();
