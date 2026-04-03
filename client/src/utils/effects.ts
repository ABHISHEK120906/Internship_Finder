// Particle System
export function createParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  `;
  document.body.prepend(canvas);
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = Array.from({length: 60}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.5 + 0.5,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 
      ? '201,168,76'   // gold
      : '192,192,192'  // silver
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Text Scramble Effect
export class TextScramble {
  private el: HTMLElement;
  private chars: string;
  private frameRequest: number = 0;
  private frame: number = 0;
  private queue: Array<{from: string; to: string; start: number; end: number}> = [];
  private resolve: (() => void) | null = null;

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#ELITEXAI';
    this.update = this.update.bind(this);
  }

  setText(newText: string): Promise<void> {
    const promise = new Promise<void>(res => this.resolve = res);
    this.queue = newText.split('').map((to) => ({
      from: this.chars[Math.floor(Math.random() * this.chars.length)],
      to, 
      start: Math.floor(Math.random() * 20),
      end: Math.floor(Math.random() * 20) + 20,
    }));
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  private update() {
    let output = '';
    let complete = 0;
    this.queue.forEach(({ from, to, start, end }) => {
      if (this.frame >= end) { 
        complete++; 
        output += to; 
      }
      else if (this.frame >= start) {
        output += `<span style="color:#C9A84C;opacity:0.6">
          ${this.chars[Math.floor(Math.random()*this.chars.length)]}
        </span>`;
      } else { 
        output += from; 
      }
    });
    this.el.innerHTML = output;
    if (complete !== this.queue.length) {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    } else { 
      if (this.resolve) this.resolve(); 
    }
  }
}

// Magnetic Button Effect
export function magneticButton(el: HTMLElement) {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e as MouseEvent).clientX - rect.left - rect.width/2;
    const y = (e as MouseEvent).clientY - rect.top - rect.height/2;
    el.style.transform = 
      `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.5s ease';
  });
}

// Spotlight Card Effect
export function initSpotlightCards() {
  document.querySelectorAll('.spotlight-card')
    .forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        (card as HTMLElement).style.setProperty(
          '--mouse-x', 
          `${e.clientX - rect.left}px` 
        );
        (card as HTMLElement).style.setProperty(
          '--mouse-y', 
          `${e.clientY - rect.top}px` 
        );
      });
    });
}

// Scroll Progress
export function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.setProperty('--scroll-percent', `${scrollPercent}%`);
  }

  window.addEventListener('scroll', updateProgress);
  updateProgress();
}

// Counter Animation
export function animateCounter(element: HTMLElement, target: number, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Typing Animation
export function typeWriter(element: HTMLElement, text: string, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Custom Cursor
export function initCustomCursor() {
  const cursor = document.createElement('div');
  const cursorRing = document.createElement('div');
  
  cursor.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: #C9A84C;
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease;
  `;
  
  cursorRing.style.cssText = `
    position: fixed;
    width: 40px;
    height: 40px;
    border: 1px solid #C9A84C;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  `;
  
  document.body.appendChild(cursor);
  document.body.appendChild(cursorRing);
  
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  
  function animateRing() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    
    requestAnimationFrame(animateRing);
  }
  animateRing();
  
  // Hover effects
  document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}
