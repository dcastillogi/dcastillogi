import React, { useEffect, useRef } from 'react';

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  update: () => boolean;
}

interface ParticleAuraProps {
  children: React.ReactNode;
}

export const ParticleAura: React.FC<ParticleAuraProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const particleContainerRef = useRef<HTMLDivElement | null>(null);

  const createParticle = (): Particle => {
    if (!particleContainerRef.current || !buttonRef.current || !containerRef.current) return null as any;

    const element = document.createElement('div');
    element.className = 'absolute pointer-events-none rounded-full bg-orange/50';
    particleContainerRef.current.appendChild(element);

    // Get button and container positions relative to the particle container
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Convert button position to be relative to container
    const buttonRelativeX = buttonRect.left - containerRect.left;
    const buttonRelativeY = buttonRect.top - containerRect.top;
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;

    // Choose spawn position along button edges
    const side = Math.floor(Math.random() * 4);
    let x: number, y: number;

    switch(side) {
      case 0: // top
        x = buttonRelativeX + Math.random() * buttonWidth;
        y = buttonRelativeY;
        break;
      case 1: // right
        x = buttonRelativeX + buttonWidth;
        y = buttonRelativeY + Math.random() * buttonHeight;
        break;
      case 2: // bottom
        x = buttonRelativeX + Math.random() * buttonWidth;
        y = buttonRelativeY + buttonHeight;
        break;
      default: // left
        x = buttonRelativeX;
        y = buttonRelativeY + Math.random() * buttonHeight;
    }

    // Calculate direction away from button center
    const centerX = buttonRelativeX + buttonWidth / 2;
    const centerY = buttonRelativeY + buttonHeight / 2;
    const angle = Math.atan2(y - centerY, x - centerX);
    
    const speed = 1.5;
    const size = Math.random() * 2 + 2;
    
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;

    const particle: Particle = {
      element,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      opacity: 1,
      update: function() {
        this.x += this.vx;
        this.y += this.vy;

        // Calculate distance from container edges
        const distanceFromEdge = Math.min(
          this.x,
          this.y,
          containerRect.width - this.x,
          containerRect.height - this.y
        );
        
        // Fade out as particles approach container edges
        this.opacity = Math.max(0, distanceFromEdge / 50);
        
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.element.style.opacity = String(this.opacity);
        
        if (this.opacity <= 0) {
          this.element.remove();
          return false;
        }
        
        return true;
      }
    };

    return particle;
  };

  const updateParticles = () => {
    particlesRef.current = particlesRef.current.filter(particle => particle.update());
    animationFrameRef.current = requestAnimationFrame(updateParticles);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a particle container that fills the parent
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'absolute';
    particleContainer.style.inset = '0';
    particleContainer.style.overflow = 'hidden';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '0';
    containerRef.current.appendChild(particleContainer);
    particleContainerRef.current = particleContainer;

    // Get reference to the button element
    buttonRef.current = containerRef.current.querySelector('button') as HTMLButtonElement;

    let spawnInterval = setInterval(() => {
      particlesRef.current.push(createParticle());
    }, 50);

    updateParticles();

    return () => {
      clearInterval(spawnInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      particlesRef.current.forEach(particle => particle.element.remove());
      particlesRef.current = [];
      particleContainer.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {children}
    </div>
  );
};