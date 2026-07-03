'use client';
import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

import "./DotGrid.css";

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  shockRadius?: number;
  shockStrength?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface Dot {
  x: number;
  y: number;
  size: number;
  color: string;
  originalX: number;
  originalY: number;
  offsetX: number;
  offsetY: number;
}

// Simple function to blend two colors
function blendColors(color1: string, color2: string, percentage: number): string {
  // Convert hex to RGB
  const parseColor = (hexColor: string) => {
    const hex = hexColor.replace('#', '');
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  };
  
  const color1Rgb = parseColor(color1);
  const color2Rgb = parseColor(color2);
  
  const r = Math.round(color1Rgb.r + (color2Rgb.r - color1Rgb.r) * percentage);
  const g = Math.round(color1Rgb.g + (color2Rgb.g - color1Rgb.g) * percentage);
  const b = Math.round(color1Rgb.b + (color2Rgb.b - color1Rgb.b) * percentage);
  
  return `rgb(${r}, ${g}, ${b})`;
}

const DotGrid = ({
  dotSize = 4,
  gap = 15,
  baseColor = "#64FFDA",
  activeColor = "#FFFFFF",
  proximity = 120,
  shockRadius = 250,
  shockStrength = 5,
  resistance = 750,
  returnDuration = 1.5,
  className = "",
  style,
}: DotGridProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const isMovingRef = useRef<boolean>(false);
  
  // Build the grid of dots
  const buildGrid = useCallback(() => {
    if (!wrapperRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const { width, height } = wrapper.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = width;
    canvas.height = height;
    
    // Calculate grid dimensions
    const cols = Math.floor(width / (dotSize + gap));
    const rows = Math.floor(height / (dotSize + gap));
    
    // Calculate starting position to center the grid
    const startX = (width - (cols * (dotSize + gap) - gap)) / 2;
    const startY = (height - (rows * (dotSize + gap) - gap)) / 2;
    
    // Create dots
    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({
          x: startX + x * (dotSize + gap),
          y: startY + y * (dotSize + gap),
          size: dotSize,
          color: baseColor,
          originalX: startX + x * (dotSize + gap),
          originalY: startY + y * (dotSize + gap),
          offsetX: 0,
          offsetY: 0
        });
      }
    }
    dotsRef.current = dots;
    
    // Draw the initial state
    drawDots();
  }, [dotSize, gap, baseColor]);
  
  // Draw the dots on the canvas
  const drawDots = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw each dot
    dotsRef.current.forEach(dot => {
      const { x, y, offsetX, offsetY, size, color } = dot;
      
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  }, []);
  
  // Update dot colors and positions based on mouse position
  const updateColors = useCallback(() => {
    if (!dotsRef.current.length) return;
    
    const { x: mouseX, y: mouseY } = mousePosition.current;
    const isMoving = isMovingRef.current;
    
    dotsRef.current.forEach(dot => {
      const dx = dot.x - mouseX;
      const dy = dot.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < proximity) {
        // Calculate intensity based on proximity
        const intensity = 1 - (distance / proximity);
        
        // Update color
        dot.color = blendColors(baseColor, activeColor, intensity);
        
        // Add a small movement effect when mouse is moving
        if (isMoving) {
          const angle = Math.atan2(dy, dx);
          const push = 5 * intensity;
          
          gsap.to(dot, {
            offsetX: Math.cos(angle) * push,
            offsetY: Math.sin(angle) * push,
            duration: 0.3,
            overwrite: true,
            onComplete: () => {
              gsap.to(dot, {
                offsetX: 0,
                offsetY: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)"
              });
            }
          });
        }
      } else {
        dot.color = baseColor;
      }
    });
    
    drawDots();
  }, [proximity, baseColor, activeColor, drawDots]);
  
  // Animation loop
  const animateFrame = useCallback(() => {
    updateColors();
    animationFrameRef.current = requestAnimationFrame(animateFrame);
  }, [updateColors]);
  
  // Handle mouse movement
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastMoveTime = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      
      // Calculate movement
      const now = performance.now();
      const dt = now - lastMoveTime;
      if (dt > 0) {
        const speed = Math.sqrt(
          Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2)
        ) / dt;
        
        // Update movement state
        isMovingRef.current = speed > 0.1;
      }
      
      // Update position
      mousePosition.current = {
        x: currentX,
        y: currentY
      };
      
      // Store last values
      lastX = currentX;
      lastY = currentY;
      lastMoveTime = now;
    };
    
    // Start animation loop
    animateFrame();
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animateFrame]);
  
  // Handle click for shock effect
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      dotsRef.current.forEach((dot) => {
        const dx = dot.x - clickX;
        const dy = dot.y - clickY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < shockRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / shockRadius) * shockStrength;
          
          const targetX = Math.cos(angle) * force * 10;
          const targetY = Math.sin(angle) * force * 10;
          
          // Use GSAP to animate the dot
          gsap.killTweensOf(dot);
          gsap.to(dot, {
            offsetX: targetX,
            offsetY: targetY,
            duration: 0.1,
            ease: "power2.out",
            onUpdate: drawDots,
            onComplete: () => {
              gsap.to(dot, {
                offsetX: 0,
                offsetY: 0,
                duration: returnDuration,
                ease: "elastic.out(1, 0.3)",
                onUpdate: drawDots
              });
            }
          });
        }
      });
    };
    
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [shockRadius, shockStrength, returnDuration, drawDots]);
  
  // Initialize and handle resize
  useEffect(() => {
    buildGrid();
    
    const handleResize = () => {
      buildGrid();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [buildGrid]);
  
  return (
    <section className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
};

export default DotGrid; 