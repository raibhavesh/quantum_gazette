// Custom cursor implementation
function createCustomCursor() {
  const cursorDot = document.createElement('div');
  const cursorOutline = document.createElement('div');
  
  cursorDot.className = 'cursor-dot';
  cursorOutline.className = 'cursor-outline';
  
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);
  
  document.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;
    cursorOutline.style.transform = `translate(${posX - 12}px, ${posY - 12}px)`;
  });
  
  // Add hover effect for clickable elements
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.transform += ' scale(1.5)';
      cursorOutline.style.backgroundColor = 'rgba(107, 70, 193, 0.1)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(1.5)', '');
      cursorOutline.style.backgroundColor = 'transparent';
    });
  });
}

// Quantum background effect
function createQuantumBackground() {
  const bg = document.createElement('div');
  bg.className = 'quantum-bg';
  
  // Create quantum particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'quantum-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 3}s`;
    bg.appendChild(particle);
  }
  
  document.body.appendChild(bg);
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  createCustomCursor();
  createQuantumBackground();
});