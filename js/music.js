// Nhạc nền: điệu valse kiểu phòng hòa nhạc thời Victoria, tổng hợp bằng WebAudio.
// - Giọng chính kiểu piano quán rượu, bass "um", hợp âm "pa-pa" (nhịp 3/4)
// - Vòng lặp lẻ thêm chuông glockenspiel, vòng chẵn chuyển giọng lên quãng 4
// - Khi có chỉ số gần ngưỡng nguy hiểm: chuyển sang giọng thứ (căng thẳng)
// - Tạm dừng: nhạc nhỏ và đục lại; tốc độ x2, x3: nhạc nhanh hơn một chút
const Music = (() => {
  const VOLUME = 0.12;
  let ac = null, master = null, tone = null, timer = null;
  let on = false, muted = false, tension = false, duck = false, tempoMul = 1, mood = "normal";
  let nextT = 0, step = 0;

  const CH = {
    C:  { b: 48, t: [60, 64, 67] }, G:  { b: 43, t: [59, 62, 67] }, G7: { b: 43, t: [59, 62, 65] },
    F:  { b: 41, t: [60, 65, 69] }, Am: { b: 45, t: [60, 64, 69] }, Dm: { b: 50, t: [62, 65, 69] },
  };
  // [hợp âm, giai điệu [nốt, số phách]]
  const SONG = [
    ["C",  [["G4", 1], ["C5", 1], ["E5", 1]]], ["C",  [["G5", 2], ["E5", 1]]],
    ["G7", [["F5", 1], ["D5", 1], ["B4", 1]]], ["C",  [["C5", 2], ["G4", 1]]],
    ["F",  [["A4", 1], ["C5", 1], ["F5", 1]]], ["C",  [["E5", 2], ["C5", 1]]],
    ["G",  [["D5", 1], ["E5", 1], ["D5", 1]]], ["G7", [["B4", 2], ["G4", 1]]],
    ["C",  [["G4", 1], ["C5", 1], ["E5", 1]]], ["C",  [["G5", 2], ["A5", 1]]],
    ["F",  [["A5", 1], ["G5", 1], ["F5", 1]]], ["Am", [["E5", 2], ["C5", 1]]],
    ["Dm", [["D5", 1], ["F5", 1], ["A5", 1]]], ["G",  [["G5", 1], ["F5", 1], ["D5", 1]]],
    ["G7", [["E5", 1], ["D5", 1], ["B4", 1]]], ["C",  [["C5", 3]]],
  ];
  const midi = (s) => {
    const m = s.match(/^([A-G])(\d)$/);
    return 12 * (+m[2] + 1) + { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]];
  };
  // Giọng thứ: hạ bậc 3, 6, 7 (E→Eb, A→Ab, B→Bb)
  const minorize = (n) => { const pc = ((n % 12) + 12) % 12; return pc === 4 || pc === 9 || pc === 11 ? n - 1 : n; };

  function freq(n, loop) {
    if (tension || mood === "sad") n = minorize(n);
    if (loop % 4 >= 2) n += 5;              // chuyển giọng lên quãng 4 cho đỡ nhàm
    return 440 * Math.pow(2, (n - 69) / 12);
  }

  function init() {
    if (ac) { if (ac.state === "suspended") ac.resume(); return true; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ac = new AC();
    master = ac.createGain(); master.gain.value = 0;
    tone = ac.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 7000;
    tone.connect(master); master.connect(ac.destination);
    return true;
  }

  function voice(t, f, dur, type, vol, detune = 0) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.value = f; o.detune.value = detune;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(tone); o.start(t); o.stop(t + dur + 0.05);
  }
  const piano = (t, f, dur) => { voice(t, f, dur, "triangle", 0.22, -6); voice(t, f, dur * 0.8, "triangle", 0.16, 7); voice(t, f * 2, dur * 0.4, "sine", 0.05); };
  const bell = (t, f) => { voice(t, f * 2, 0.9, "sine", 0.07); voice(t, f * 5.4, 0.25, "sine", 0.015); };
  const bass = (t, f, beat) => voice(t, f, beat * 0.9, "triangle", 0.32);
  const stab = (t, notes) => notes.forEach((f) => voice(t, f, 0.16, "square", 0.022));

  function bpm() { return (mood === "sad" ? 96 : mood === "win" ? 168 : 152) * tempoMul; }

  function schedule() {
    if (!on || !ac) return;
    const horizon = ac.currentTime + 0.25;
    while (nextT < horizon) {
      const beatDur = 60 / bpm();
      const loop = Math.floor(step / (SONG.length * 3));
      const bar = Math.floor(step / 3) % SONG.length, beat = step % 3;
      const [chName, mel] = SONG[bar], ch = CH[chName];
      if (beat === 0) bass(nextT, freq(bar % 2 ? ch.b + 7 : ch.b, loop), beatDur);
      else stab(nextT, ch.t.map((n) => freq(n, loop)));
      let pos = 0;
      for (const [note, len] of mel) {
        if (pos === beat) {
          const f = freq(midi(note), loop);
          piano(nextT, f, len * beatDur * 0.95);
          if (loop % 2 === 1) bell(nextT, f);
        }
        pos += len;
      }
      nextT += beatDur; step++;
    }
  }

  function level() { return muted || !on ? 0 : duck ? VOLUME * 0.35 : VOLUME; }
  function apply(time = 0.4) {
    if (!ac) return;
    master.gain.cancelScheduledValues(ac.currentTime);
    master.gain.setTargetAtTime(level(), ac.currentTime, time);
    tone.frequency.setTargetAtTime(duck ? 900 : 7000, ac.currentTime, 0.2);
  }

  return {
    start() {
      try {
        if (!init()) return;
        if (!on) { on = true; nextT = ac.currentTime + 0.15; step = 0; }
        apply(0.8);
        if (!timer) timer = setInterval(schedule, 40);
      } catch {}
    },
    setMuted(m) { muted = m; apply(0.15); },
    setTension(b) { tension = b; },
    setDuck(b) { if (b !== duck) { duck = b; apply(0.2); } },
    setTempo(x) { tempoMul = x; },
    setMood(m) { mood = m; step = 0; },
  };
})();
