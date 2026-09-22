const canvas = document.querySelector('#sky');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  stars = Array.from({ length: Math.floor(innerWidth / 7) }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: Math.random() * 1.3, phase: Math.random() * Math.PI * 2, speed: .008 + Math.random() * .02
  }));
}
function draw(t) {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  stars.forEach(s => { const a = .25 + (Math.sin(t * s.speed + s.phase) + 1) * .3; ctx.fillStyle = `rgba(255,244,224,${a})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); });
  requestAnimationFrame(draw);
}
resize(); draw(0); addEventListener('resize', resize);

const petalWrap = document.querySelector('.petals');
for (let i = 0; i < 22; i++) {
  const petal = document.createElement('i'); petal.className = 'petal';
  petal.style.left = `${Math.random() * 100}%`; petal.style.top = `${-Math.random() * 110}vh`;
  petal.style.setProperty('--drift', `${-100 + Math.random() * 200}px`);
  petal.style.animationDuration = `${8 + Math.random() * 10}s`; petal.style.animationDelay = `${-Math.random() * 15}s`;
  petalWrap.append(petal);
}

let audioContext, oscillator, gain;
document.querySelector('#soundButton').addEventListener('click', function () {
  if (!audioContext) { audioContext = new AudioContext(); oscillator = audioContext.createOscillator(); gain = audioContext.createGain(); oscillator.type = 'sine'; oscillator.frequency.value = 174; gain.gain.value = 0; oscillator.connect(gain).connect(audioContext.destination); oscillator.start(); }
  const on = !this.classList.toggle('active'); this.classList.toggle('active', on);
  gain.gain.cancelScheduledValues(audioContext.currentTime); gain.gain.linearRampToValueAtTime(on ? .025 : 0, audioContext.currentTime + .4);
  this.setAttribute('aria-label', on ? 'ปิดเสียงบรรยากาศ' : 'เปิดเสียงบรรยากาศ');
});

const messages = ['ขอให้ทุกวันของเรา มีแต่ความอ่อนโยน ✦', 'May every road lead us back to each other.', 'A wish has been tucked into the stars.'];
document.querySelector('#wishButton').addEventListener('click', () => { document.querySelector('#wishMessage').textContent = messages[Math.floor(Math.random() * messages.length)]; });
