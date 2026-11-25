// Mona Lisa'yı çalan adam — cizgi-short hikâyesi (34,6 sn)
export const meta = { fps: 30 };

// çekimler: [ilk kare, ad]
const SHOTS = [[0, "hook"], [58, "wall"], [156, "paris"], [206, "worker"], [295, "closet"], [363, "smock"], [419, "lift"], [467, "hide"],
  [513, "exit"], [561, "empty"], [645, "paper"], [698, "police"], [777, "queue"], [912, "found"], [963, "famous"]];
const shotAt = (f) => { let i = 0; while (i < SHOTS.length - 1 && f >= SHOTS[i + 1][0]) i++; return { i, name: SHOTS[i][1], f0: SHOTS[i][0], f1: (SHOTS[i + 1] || [1060])[0], t: f - SHOTS[i][0] }; };

const PX = 200, IX = -200, NX = 400; // dış mekân, sorgu odası, gazete sahnesi x konumları
let R = {}, monaCan, monaTex, monaState = "";

function drawMona(E, wink) {
  const key = String(wink); if (key === monaState) return; monaState = key;
  const g = monaCan.getContext("2d"), w = monaCan.width, h = monaCan.height;
  const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#9fb08a"); gr.addColorStop(0.45, "#c8b27a"); gr.addColorStop(1, "#5a4a2e"); g.fillStyle = gr; g.fillRect(0, 0, w, h);
  g.fillStyle = "#7d8a62"; g.beginPath(); g.moveTo(0, h * 0.42); g.quadraticCurveTo(w * 0.25, h * 0.3, w * 0.45, h * 0.4); g.lineTo(w * 0.45, h * 0.5); g.lineTo(0, h * 0.55); g.fill();
  g.fillStyle = "#6f7f5a"; g.beginPath(); g.moveTo(w, h * 0.38); g.quadraticCurveTo(w * 0.78, h * 0.3, w * 0.6, h * 0.42); g.lineTo(w, h * 0.52); g.fill();
  g.save(); g.translate(-w * 0.32, -h * 0.02); g.scale(1.6, 1.6);
  E.CAST.drawChar(g, { skin: "#f6e2c0", shirt: "#3b3324", dress: "#3b3324", hair: "long", hairCol: "#2a1f16", seed: 77 }, { face: wink ? "sly" : "smug", arms: "cross", look: wink ? 0.3 : -0.2, blush: true });
  g.restore();
  g.strokeStyle = "rgba(60,40,20,.08)"; g.lineWidth = 2; for (let i = 0; i < 30; i++) { g.beginPath(); const y = (i * 0.618 % 1) * h; g.moveTo(0, y); g.lineTo(w, y + 4); g.stroke(); }
  monaTex.needsUpdate = true;
}

const emptyPic = (g, x, y, w, h) => { g.fillStyle = "#9a3a40"; g.fillRect(x, y, w, h); g.strokeStyle = "#c9a24a"; g.lineWidth = 14; g.strokeRect(x + w * 0.3, y + h * 0.12, w * 0.4, h * 0.76); g.fillStyle = "#fff"; g.font = "900 150px CizgiFont, Nunito"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("?", x + w / 2, y + h / 2 + 6); };
function painting(E, parent) {
  const { THREE } = E, g = E.group(parent);
  E.box(0.98, 1.36, 0.08, E.mat("#c9a24a"), [0, -0.68, 0], { parent: g });
  E.box(0.86, 1.24, 0.09, E.mat("#8a6a2a"), [0, -0.62, 0], { parent: g });
  const m = E.plane(0.78, 1.14, E.mat("#ffffff", { map: monaTex }), [0, 0, 0.05], { parent: g }); m.castShadow = false;
  return g;
}

export function build(E) {
  const { S, T, THREE } = E;
  monaCan = document.createElement("canvas"); monaCan.width = 600; monaCan.height = 880;
  monaTex = new THREE.CanvasTexture(monaCan); monaTex.colorSpace = THREE.SRGBColorSpace; drawMona(E, false);
  // ---- galeri (0,0,0) ----
  S.room({ w: 14, d: 10, h: 5.2, wall: T.wallpaper("#9a3a40", "#8a3036", "diamond"), floor: T.planks("#a8743f"), floorRep: 0.4, window: false, door: false });
  R.mona = painting(E); R.mona.position.set(0, 2.75, -4.9);
  for (const [x, k] of [[-3.2, "landscape"], [3.2, "portrait"], [-5.6, "portrait"], [5.6, "landscape"]]) S.frame(x, 2.3, -4.95, { w: 1.5, h: 1.1, kind: k });
  S.frame(-6.95, 2.3, -1.5, { w: 1.4, h: 1, kind: "landscape", rotY: Math.PI / 2 }); S.frame(6.95, 2.3, -1.5, { w: 1.4, h: 1, kind: "portrait", rotY: -Math.PI / 2 });
  S.bench(-4.2, 1.5, Math.PI / 2); S.rug(0, -1.8, 5, 3.2, "#3f5f8a");
  E.label(T.sign("MONA LISA", { bg: "#c9a24a", fg: "#2b2633", border: "#7a5a1a", size: 170 }), 0.62, 0.23, [0, 1.12, -4.93]);
  R.hooks = E.group(); for (const [x, y] of [[-0.42, 2.72], [0.42, 2.72], [-0.42, 1.48], [0.42, 1.48]]) E.sphere(0.035, E.mat("#2b2633"), [x, y, -4.93], { parent: R.hooks });
  // dolap
  R.closet = E.group(null, [-4.6, 0, -4.35]);
  const cm = E.mat("#7a4a2a", { map: T.planks("#7a4a2a", 3) }), ci = E.mat("#5a3420");
  E.box(1.5, 2.8, 0.08, cm, [0, 0, -0.51], { parent: R.closet }); E.box(0.08, 2.8, 1.1, cm, [-0.71, 0, 0], { parent: R.closet }); E.box(0.08, 2.8, 1.1, cm, [0.71, 0, 0], { parent: R.closet });
  E.box(1.5, 0.1, 1.1, cm, [0, 2.75, 0], { parent: R.closet }); E.box(1.5, 0.1, 1.1, ci, [0, 0, 0], { parent: R.closet });
  R.door = E.group(R.closet, [0.68, 0, 0.58]); const dm = E.box(1.32, 2.6, 0.07, E.mat("#8a5a36", { map: T.wood("#8a5a36") }), [-0.66, 0.08, 0], { parent: R.door }); E.sphere(0.05, E.mat("#e8c45a"), [-1.18, 1.3, 0.06], { parent: R.door });
  // camcının camı
  R.glass = E.box(0.75, 0.95, 0.03, E.mat("#bfe6ff", { transparent: true, opacity: 0.35 }), [0, 0, 0]); R.glass.userData.noink = true; R.glass.castShadow = false;
  // ---- Paris dış (x = 200) ----
  E.ground(T.grass("#86b860"), 320, 0.2, [PX, -0.03, 0]);
  const st = E.group(null, [PX, 0, 0]); st.updateMatrixWorld();
  S.street({ len: 160, width: 9, z: -4, x: PX }); // x=0 merkezli: dış sahneyi PX'e taşı
  R.louvre = S.building(PX, -18, { w: 44, d: 12, floors: 3, fh: 3.6, wall: "#eadfc4", roof: "#5a6b8a", shutter: null, win: "#7fb2d8", cols: 12 });
  E.label(T.sign("MUSÉE DU LOUVRE", { bg: "#eadfc4", fg: "#3a2a20", border: null, size: 120 }), 9, 1.1, [PX, 11.6, -11.9]);
  for (const x of [-14, -7, 7, 14]) { S.tree(PX + x, -9.4, { s: 1.1 }); S.lamp(PX + x + 3.5, -9.3); }
  // Eyfel (uzakta)
  const eif = E.group(null, [PX + 26, 0, -150]), em = E.mat("#7a4a32");
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const leg = E.box(1.6, 22, 1.6, em, [sx * 6, 0, sz * 6], { parent: eif }); leg.rotation.set(-sz * 0.26, 0, sx * 0.26); leg.position.set(sx * 3.2, 10, sz * 3.2); }
  E.box(9, 1.2, 9, em, [0, 18, 0], { parent: eif }); E.cyl(1.4, 3.6, 22, em, [0, 18.5, 0], { parent: eif, seg: 4 }); E.box(4.2, 1, 4.2, em, [0, 30, 0], { parent: eif }); E.cyl(0.4, 1.4, 14, em, [0, 31, 0], { parent: eif, seg: 4 });
  S.hills({ z: -110, col: "#8cbf6a" }); S.clouds({ n: 7, z: -130, y: 50 });
  // dış sahne setlerini PX'e kaydır (street x=0'da kuruldu) — sokak uzun olduğu için PX'te de görünür: ikinci sokak kur
  // ---- sorgu odası (x = -200) ----
  S.room({ x: IX, w: 7, d: 6, h: 3.6, wall: T.wallpaper("#5a6a6a", "#4e5d5d", "stripe"), floor: T.tiles("#d9d2c0", "#8a8478", 10), floorRep: 0.25, window: false, door: true });
  S.table(IX, -1.2, { w: 1.8, d: 1, col: "#6b4428" }); S.hangLamp(IX, 3.6, -1.2, { col: "#2f4a3a", i: 9 });
  S.chair(IX - 0.9, -1.9, {});
  S.paper(IX - 0.2, 0.96, -1.1, T.newspaper("MONA LISA\nÇALINDI!", { paper: "LE JOURNAL", date: "23 AĞUSTOS 1911" }), { w: 0.36, h: 0.48, spin: 0.3 });
  // ---- gazete sahnesi (x = 400) ----
  const bc = document.createElement("canvas"); bc.width = bc.height = 1024; const bg = bc.getContext("2d");
  bg.fillStyle = "#ffcf4a"; bg.fillRect(0, 0, 1024, 1024); bg.fillStyle = "#ffb43a"; for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2; bg.beginPath(); bg.moveTo(512, 512); bg.lineTo(512 + 1100 * Math.cos(a), 512 + 1100 * Math.sin(a)); bg.lineTo(512 + 1100 * Math.cos(a + 0.13), 512 + 1100 * Math.sin(a + 0.13)); bg.fill(); }
  const btex = new THREE.CanvasTexture(bc); btex.colorSpace = THREE.SRGBColorSpace;
  E.plane(30, 30, E.flat("#ffffff", { map: btex, fog: false }), [NX, 0, -6], { noink: true, noShadow: true });
  R.paper = E.plane(2.3, 3.07, E.flat("#ffffff", { map: T.newspaper("MONA LISA\nÇALINDI!", { paper: "LE JOURNAL", date: "23 AĞUSTOS 1911", col: "#b8262e", picDraw: emptyPic }), side: THREE.DoubleSide, fog: false }), [NX, 0, 0], { noShadow: true });
  // ---- karakterler ----
  const vin = { shirt: "#5d6b7a", pants: "#3b3f52", hat: "cap", hatCol: "#4a4f5a", moustache: "#2a1d16", seed: 21, skin: "#f0d0b0" };
  E.actor("vin", vin); E.actor("vinW", { ...vin, shirt: "#f4f1ea", buttons: "#cfc8b8" }); E.actor("vinF", { ...vin, shirt: "#f4f1ea", buttons: "#cfc8b8", build: "stout" });
  E.actor("guard", { shirt: "#22305a", pants: "#1d2238", hat: "police", buttons: "#e8c45a", moustache: "#8a8a8a", seed: 31, build: "stout", skin: "#f6dcc0" });
  E.actor("police", { shirt: "#22305a", pants: "#1d2238", hat: "police", buttons: "#e8c45a", moustache: "#3a2a20", seed: 41, skin: "#e9c3a0" });
  E.actor("sus", { shirt: "#8c6a3a", hat: "bowler", seed: 45, skin: "#f6dcc0", jacket: "#5a4a3a" });
  E.actor("pic", { shirt: "#f4f1ea", hat: "beret", hatCol: "#2b2633", seed: 51, skin: "#e9c3a0", pants: "#2f3a5a" });
  const coats = ["#3f6fb5", "#8c3b4a", "#5d7a3a", "#b5653f", "#2f5f6a", "#7b5ac9", "#c2843a", "#4a5a8a", "#a8343e", "#3f8a6a"], hats = ["tophat", "bowler", null, "fedora", null, "bowler", "beret", "tophat", null, "cap"];
  for (let i = 0; i < 10; i++) { const woman = i % 3 === 1; E.actor("c" + i, { shirt: coats[i], jacket: i % 4 === 0 ? "#2b2633" : null, dress: woman ? coats[(i + 3) % 10] : null, hair: woman ? "long" : i % 2 ? "short" : null, hairCol: ["#2a1d16", "#7a4a2a", "#c9a24a"][i % 3], hat: woman ? null : hats[i], seed: 60 + i * 7, skin: ["#fbf5ea", "#f6dcc0", "#e9c3a0", "#c98f66"][i % 4], moustache: i % 5 === 2 ? "#3a2a20" : null, glasses: i === 7 }); }
}

const nameCard = (title, sub) => (g, w, h, s) => {
  const k = w / 1080, x = 70 * k, y = 1390 * k, pw = Math.max(430, 40 + title.length * 34) * k;
  g.save(); g.fillStyle = "rgba(20,14,24,.88)"; g.beginPath(); g.roundRect(x, y, pw, 112 * k, 22 * k); g.fill();
  g.fillStyle = "#ffcf4a"; g.fillRect(x, y, 10 * k, 112 * k);
  g.font = `900 ${46 * k}px CizgiFont, Nunito, sans-serif`; g.fillStyle = "#fff"; g.textBaseline = "middle"; g.fillText(title, x + 34 * k, y + 40 * k);
  g.font = `700 ${30 * k}px CizgiFont, Nunito, sans-serif`; g.fillStyle = "#ffcf4a"; g.fillText(sub, x + 34 * k, y + 82 * k); g.restore();
};

export function frame(f, E) {
  const X = E.X, sh = shotAt(f), t = sh.t, A = [], FX = [];
  const st = (seed, o = {}) => ({ blink: E.blink(f, seed), ...E.idle(f, seed), ...o });
  let cam, light = "interior", dof = { focus: 4, amount: 0 }, flash = 0, overlay = null, focusPt = null;
  // varsayılanlar
  R.mona.visible = true; R.mona.position.set(0, 2.75, -4.9); R.mona.rotation.set(0, 0, 0); R.mona.scale.setScalar(1);
  R.hooks.visible = false; R.glass.visible = false; R.door.rotation.y = 0; drawMona(E, false);
  const flashIn = (f0, n = 6) => Math.max(0, 1 - Math.abs(f - f0) / n);

  switch (sh.name) {
    case "hook": {
      light = "dramatic";
      const x = 1.0 + 0.2 * X.smooth(t / 57);
      R.mona.position.set(x + 0.55, 1.62, -0.9); R.mona.rotation.set(0, -0.3, -0.18); R.mona.scale.setScalar(0.85);
      A.push({ id: "vinW", pos: [x - 0.15, 0, -1], st: st(2, { face: "sly", arms: [[10, 4], [30, 70]], look: 0.5 }) });
      cam = E.camAt(f, [{ f: 0, pos: [1.25, 1.65, 2.9], look: [1.2, 1.45, -1], fov: 40 }, { f: 57, pos: [1.3, 1.65, 2.1], look: [1.25, 1.5, -1], fov: 38 }]);
      dof = { focus: [1.4, 1.6, -1], amount: 9 };
      FX.push({ kind: "sparkle", pos: [x + 0.6, 2.2, -0.7], size: 0.9, t: t / 30 });
      break;
    }
    case "wall": {
      drawMona(E, f >= 118 && f < 140);
      cam = E.camAt(f, [{ f: 58, pos: [0, 2.15, -1.6], look: [0, 2.15, -4.9], fov: 40 }, { f: 155, pos: [0, 2.15, -2.6], look: [0, 2.15, -4.9], fov: 38 }]);
      FX.push({ kind: "sparkle", pos: [0.55, 2.7, -4.6], size: 0.6, t: t / 30 }, { kind: "sparkle", pos: [-0.55, 1.6, -4.6], size: 0.5, t: t / 30 + 0.5 });
      if (f >= 120 && f < 150) FX.push({ kind: "hearts", pos: [0.62, 2.9, -4.6], size: 0.5, t: (f - 120) / 30 });
      dof = { focus: [0, 2.15, -4.9], amount: 6 };
      break;
    }
    case "paris": {
      light = "day";
      cam = E.camAt(f, [{ f: 156, pos: [PX - 7, 2.2, 6], look: [PX - 2, 5.5, -12], fov: 52 }, { f: 205, pos: [PX - 5.5, 3.4, 4.5], look: [PX - 1, 6.5, -12], fov: 50 }]);
      for (let i = 0; i < 4; i++) { const ph = (t / 30 + i * 0.37); A.push({ id: "c" + i, pos: [PX - 9 + i * 2.6 + ph * 0.9, 0, -8.2 + (i % 2) * 1.5], st: st(10 + i, { legs: "walk", phase: ph * 1.6, face: ["happy", "neutral", "smug", "talk"][i] }), flip: true }); }
      focusPt = [PX - 2, 0, -6];
      break;
    }
    case "worker": {
      const x = X.keyed(f, [[206, -3.2], [270, -0.9], [294, -0.8]]);
      const walking = f < 268;
      A.push({ id: "vin", pos: [x, 0, -2.6], st: st(3, { legs: walking ? "walk" : "stand", phase: t / 26, arms: "hold", face: walking ? "neutral" : "sly", look: walking ? 0.4 : -0.6 }) });
      R.glass.visible = true; R.glass.position.set(x + 0.62, 0.55, -2.45); R.glass.rotation.y = -0.5;
      cam = E.camAt(f, [{ f: 206, pos: [-2.6, 1.75, 1.2], look: [-2.8, 1.6, -3], fov: 42 }, { f: 294, pos: [-0.4, 1.8, 1.4], look: [-0.5, 1.8, -3.5], fov: 40 }]);
      dof = { focus: [x, 1.4, -2.6], amount: 7 };
      overlay = nameCard("Vincenzo Peruggia", "Louvre'un camcısı");
      break;
    }
    case "closet": {
      light = ["night", "interior", 0.48];
      R.door.rotation.y = X.keyed(f, [[295, 0], [318, 1.05]], X.easeOut);
      A.push({ id: "vin", pos: [-4.6, 0.1, -4.3], scale: 0.95, st: st(3, { face: "sly", arms: "hang", look: X.keyed(f, [[300, 0], [330, 0.8], [350, -0.6]]) }), tint: "#c4cdf0" });
      cam = E.camAt(f, [{ f: 295, pos: [-5.3, 1.7, -0.2], look: [-4.6, 1.55, -4.2], fov: 44 }, { f: 362, pos: [-5.0, 1.7, -1.3], look: [-4.6, 1.6, -4.2], fov: 40 }]);
      dof = { focus: [-4.6, 1.6, -4.1], amount: 8 }; focusPt = [-4.6, 0, -4];
      break;
    }
    case "smock": {
      R.door.rotation.y = 1.05;
      const x = X.keyed(f, [[363, -4.55], [395, -3.7]]);
      A.push({ id: "vinW", pos: [x, 0, X.keyed(f, [[363, -4.1], [395, -3.3]])], st: st(4, { legs: f < 395 ? "walk" : "stand", phase: t / 22, face: "nervous", arms: "hang", look: Math.sin(t / 7) }) });
      cam = E.camAt(f, [{ f: 363, pos: [-5.7, 1.7, 0.5], look: [-4.1, 1.5, -3.6], fov: 44 }, { f: 418, pos: [-5.3, 1.7, -0.4], look: [-3.8, 1.55, -3.4], fov: 42 }]);
      dof = { focus: [x, 1.5, -3.4], amount: 6 };
      break;
    }
    case "lift": {
      const p = X.smooth(X.span(f, 428, 458));
      R.mona.position.set(X.X ? 0 : 0 + 0.55 * p, 2.75 - 0.85 * p, -4.9 + 0.75 * p); R.mona.rotation.z = -0.08 * p;
      A.push({ id: "vinW", pos: [0.85, 0, -4.0], st: st(4, { face: p > 0.6 ? "smug" : "determined", arms: p < 0.5 ? "reach" : [[18, 70], [18, 70]], look: -0.7 }) });
      cam = E.camAt(f, [{ f: 419, pos: [0.9, 1.9, -0.9], look: [0.35, 1.8, -4.6], fov: 42 }, { f: 466, pos: [0.8, 1.8, -1.6], look: [0.45, 1.6, -4.5], fov: 40 }]);
      dof = { focus: [0.5, 1.8, -4.4], amount: 6 };
      FX.push({ kind: "lines", pos: [-0.6, 2.4, -4.5], size: 0.5, t: 0 });
      R.hooks.visible = p > 0.3;
      break;
    }
    case "hide": {
      R.hooks.visible = true;
      const puff = f >= 488, pp = X.span(f, 482, 496);
      R.mona.visible = !puff; R.mona.position.set(0.55, 1.9, -4.15); R.mona.scale.setScalar(1 - 0.7 * X.span(f, 474, 488));
      A.push({ id: puff ? "vinF" : "vinW", pos: [0.85, 0, -4.0], st: st(4, { face: puff ? "smug" : "nervous", arms: puff ? "hip" : [[18, 70], [18, 70]], look: puff ? 0.3 : -0.4 }) });
      if (f >= 482 && f < 500) FX.push({ kind: "puff", pos: [0.85, 1.4, -3.7], size: 1.6, t: pp });
      if (puff) FX.push({ kind: "sweat", pos: [1.25, 2.45, -3.8], size: 0.25 });
      cam = E.camAt(f, [{ f: 467, pos: [0.7, 1.75, -0.9], look: [0.6, 1.45, -4.2], fov: 42 }, { f: 512, pos: [0.85, 1.7, -1.3], look: [0.8, 1.4, -4.1], fov: 40 }]);
      dof = { focus: [0.85, 1.5, -4.0], amount: 6 };
      break;
    }
    case "exit": {
      light = "day";
      const z = X.keyed(f, [[513, -11.4], [560, -7.6]], (v) => v);
      A.push({ id: "vinF", pos: [PX + 0.4 + (z + 11.4) * 0.35, 0, z], st: st(5, { legs: "walk", phase: t / 20, face: "smug", arms: "hang", look: 0.6 }) });
      A.push({ id: "guard", pos: [PX - 2.4, 0, -10.6], st: st(6, { legs: "sit", face: "sleep", arms: "cross" }) });
      FX.push({ kind: "zzz", pos: [PX - 1.9, 2.6, -10.4], size: 0.9, t: t / 30 });
      cam = E.camAt(f, [{ f: 513, pos: [PX + 0.6, 1.9, -2.6], look: [PX - 0.9, 1.5, -11], fov: 46 }, { f: 560, pos: [PX + 1.0, 1.85, -2.4], look: [PX - 0.2, 1.4, -9.5], fov: 46 }]);
      E.S && null;
      dof = { focus: [PX + 0.8, 1.4, z], amount: 5 }; focusPt = [PX, 0, -9];
      break;
    }
    case "empty": {
      R.mona.visible = false; R.hooks.visible = true;
      const x = X.keyed(f, [[561, 2.8], [598, 0.95]]); const shocked = f >= 616;
      flash = flashIn(605, 6);
      A.push({ id: "guard", pos: [x, 0, -3.2], st: st(6, { legs: f < 598 ? "walk" : "stand", phase: t / 22, face: shocked ? "shock" : f >= 605 ? "neutral" : "happy", arms: shocked ? "up" : "hang", look: -0.8 }) });
      if (shocked) FX.push({ kind: "exclaim", pos: [x + 0.15, 3.0, -3.0], size: 0.7 * X.back(X.span(f, 616, 624)) });
      cam = E.camAt(f, [{ f: 561, pos: [0.4, 1.9, 0.8], look: [0.3, 2.0, -4.9], fov: 44 }, { f: 615, pos: [0.4, 1.9, 0.3], look: [0.35, 2.0, -4.9], fov: 42 }, { f: 625, pos: [0.6, 1.85, -1.0], look: [0.6, 1.9, -4.5], fov: 40 }]);
      if (shocked) { const s = E.shake(f, 616, 0.06, 10); cam.pos = cam.pos.map((v, i) => v + s[i]); }
      dof = { focus: [x, 1.6, -3.2], amount: 4 };
      break;
    }
    case "paper": {
      light = "day";
      const p = X.easeOut(X.span(f, 645, 668));
      R.paper.rotation.set(0, 0, (1 - p) * Math.PI * 5); R.paper.scale.setScalar(0.15 + 0.85 * p);
      R.paper.position.set(NX, 0.2 + 0.05 * Math.sin(t / 5), 0);
      cam = { pos: [NX, 0.2, 4.1 - 0.4 * X.smooth(X.span(f, 668, 697))], look: [NX, 0.2, 0], fov: 46, roll: 0 };
      if (f > 668) { const s = E.shake(f, 668, 0.05, 8); cam.pos = cam.pos.map((v, i) => v + s[i]); }
      flash = flashIn(668, 4) * 0.6;
      break;
    }
    case "police": {
      light = "dramatic";
      const pic = f >= 746;
      A.push({ id: "police", pos: [IX - 0.6, 0, -1.95], st: st(7, { face: "angry", arms: pic ? "point" : f % 40 < 20 ? "point" : "hip", look: 0.8, talk: E.talk(f, 698, 745) * 0 }) });
      A.push({ id: pic ? "pic" : "sus", pos: [IX + 0.6, 0, -0.5], st: st(8, { face: pic ? "scared" : "nervous", arms: pic ? "shrug" : "hang", look: -0.8, sweat: true }) });
      cam = pic ? E.camAt(f, [{ f: 746, pos: [IX + 0.75, 1.75, 2.2], look: [IX + 0.6, 1.6, -0.5], fov: 40 }, { f: 776, pos: [IX + 0.7, 1.75, 1.6], look: [IX + 0.6, 1.65, -0.5], fov: 38 }])
        : E.camAt(f, [{ f: 698, pos: [IX + 0.1, 2.3, 3.4], look: [IX, 1.5, -1.2], fov: 46 }, { f: 745, pos: [IX + 0.1, 2.2, 2.8], look: [IX, 1.55, -1.2], fov: 44 }]);
      if (pic) { overlay = nameCard("Pablo Picasso", "o da sorgulandı"); FX.push({ kind: "question", pos: [IX + 1.5, 2.9, -0.5], size: 0.55 * X.back(X.span(f, 748, 756)) }); }
      dof = { focus: pic ? [IX + 0.6, 1.6, -0.5] : [IX, 1.4, -1.2], amount: pic ? 8 : 3 }; focusPt = [IX, 0, -1.2];
      if (f >= 698 && f < 708) { const s = E.shake(f, 698, 0.05, 8); cam.pos = cam.pos.map((v, i) => v + s[i]); }
      break;
    }
    case "queue": {
      R.mona.visible = false; R.hooks.visible = true;
      for (let i = 0; i < 10; i++) {
        const z = -3.0 + i * 0.95, x = 1.1 + (i % 2) * 0.35;
        A.push({ id: "c" + i, pos: [x, 0, z], st: st(20 + i, { face: i === 0 ? "wow" : ["think", "neutral", "talk", "smug", "happy", "nervous"][i % 6], arms: i === 0 ? "point" : ["hang", "cross", "chin", "hip", "hang", "count"][i % 6], look: -0.7, talk: i % 3 === 2 ? E.talk(f) : 0 }) });
      }
      cam = E.camAt(f, [{ f: 777, pos: [-3.4, 2.9, 6.8], look: [0.6, 1.5, -0.5], fov: 50 }, { f: 911, pos: [-0.9, 2.15, 0.9], look: [0.55, 1.75, -4.2], fov: 48 }]);
      dof = { focus: X.keyed(f, [[777, 6], [911, 5]]), amount: 5, range: 3 };
      break;
    }
    case "found": {
      flash = flashIn(912, 6);
      cam = E.camAt(f, [{ f: 912, pos: [0, 2.2, -1.4], look: [0, 2.15, -4.9], fov: 42 }, { f: 962, pos: [0, 2.15, -2.3], look: [0, 2.15, -4.9], fov: 40 }]);
      FX.push({ kind: "sparkle", pos: [0.5, 2.8, -4.6], size: 0.7, t: t / 30 }, { kind: "sparkle", pos: [-0.5, 1.7, -4.6], size: 0.6, t: t / 30 + 0.4 });
      A.push({ id: "guard", pos: [1.25, 0, -3.9], st: st(6, { face: "happy", arms: "present", look: -0.6 }) });
      dof = { focus: [0, 2.15, -4.9], amount: 5 };
      break;
    }
    case "famous": {
      light = ["interior", "golden", X.span(f, 963, 1000)];
      drawMona(E, f >= 1028);
      const pos = [[-1.9, -3.6], [-1.15, -3.0], [1.15, -3.0], [1.9, -3.6], [-0.55, -2.4], [0.6, -2.35], [-2.6, -2.6], [2.6, -2.6]];
      pos.forEach(([x, z], i) => A.push({ id: "c" + i, pos: [x, 0, z], st: st(30 + i, { face: ["wow", "happy", "laugh", "grin", "wow", "happy", "smug", "grin"][i], arms: ["cheer", "up", "point", "cheer", "wave", "cheer", "point", "up"][i], phase: f / 30, bob: 14 * Math.abs(Math.sin(f / 6 + i)), look: x > 0 ? -0.5 : 0.5 }) }));
      FX.push({ kind: "sparkle", pos: [0.55, 3.0, -4.6], size: 0.8, t: t / 30 }, { kind: "stars", pos: [0, 3.6, -4.5], size: 1.4, t: t / 30 });
      if (f >= 1028) FX.push({ kind: "hearts", pos: [0.6, 3.2, -4.6], size: 0.6, t: (f - 1028) / 30 });
      cam = E.camAt(f, [{ f: 963, pos: [0, 2.3, -1.0], look: [0, 2.4, -4.9], fov: 42 }, { f: 1030, pos: [0, 2.5, 0.9], look: [0, 2.1, -4.6], fov: 46 }, { f: 1058, pos: [0, 2.52, 1.05], look: [0, 2.1, -4.6], fov: 46 }]);
      dof = { focus: X.keyed(f, [[963, 3.7], [1030, 4.2]]), amount: 3 };
      break;
    }
  }
  return { cam, light, dof, actors: A, fx: FX, flash, overlay, focusPt };
}
