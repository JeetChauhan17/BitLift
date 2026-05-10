import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

const hexToRgbNormalized = (hex: string): [number, number, number] => {
  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;
  if (cleanHex.length === 3) {
    return [
      parseInt(cleanHex[0] + cleanHex[0], 16) / 255,
      parseInt(cleanHex[1] + cleanHex[1], 16) / 255,
      parseInt(cleanHex[2] + cleanHex[2], 16) / 255,
    ];
  }
  if (cleanHex.length === 6) {
    return [
      parseInt(cleanHex.substring(0, 2), 16) / 255,
      parseInt(cleanHex.substring(2, 4), 16) / 255,
      parseInt(cleanHex.substring(4, 6), 16) / 255,
    ];
  }
  return [0, 0, 0];
};

interface GlobeProps {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number] | string;
  markerColor?: [number, number, number] | string;
  glowColor?: [number, number, number] | string;
}

const Globe: React.FC<GlobeProps> = ({
  className,
  theta = 0.25,
  dark = 0,
  scale = 1.1,
  diffuse = 0.4,
  mapSamples = 16000,
  mapBrightness = 1.2,
  baseColor = [0.4, 0.6509, 1],
  markerColor = [251 / 255, 100 / 255, 21 / 255],
  glowColor = [0.2745, 0.5765, 0.898],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef = useRef(0);
  const thetaRef = useRef(theta);
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const widthRef = useRef(0);
  const autoRotateSpeed = 0.005;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resolvedBaseColor: [number, number, number] =
      typeof baseColor === "string" ? hexToRgbNormalized(baseColor) : baseColor;

    const resolvedMarkerColor: [number, number, number] =
      typeof markerColor === "string" ? hexToRgbNormalized(markerColor) : markerColor;

    const resolvedGlowColor: [number, number, number] =
      typeof glowColor === "string" ? hexToRgbNormalized(glowColor) : glowColor;

    const updateSize = () => {
      if (canvas) {
        widthRef.current = canvas.offsetWidth;
      }
    };

    updateSize();

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: window.devicePixelRatio || 1,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark,
      scale,
      diffuse,
      mapSamples,
      mapBrightness,
      baseColor: resolvedBaseColor,
      markerColor: resolvedMarkerColor,
      glowColor: resolvedGlowColor,
      opacity: 1,
      offset: [0, 0],
      markers: [],
    });

    let running = true;
    const animate = () => {
      if (!running) return;
      if (!isDragging.current) {
        phiRef.current += autoRotateSpeed;
      }
      globeRef.current?.update({
        phi: phiRef.current,
        theta: thetaRef.current,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      });
      requestAnimationFrame(animate);
    };
    animate();

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
      canvas.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - lastMouseX.current;
        const deltaY = e.clientY - lastMouseY.current;
        const speed = 0.005;
        phiRef.current += deltaX * speed;
        thetaRef.current = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, thetaRef.current - deltaY * speed)
        );
        lastMouseX.current = e.clientX;
        lastMouseY.current = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
      canvas.style.cursor = "grab";
    };

    const onMouseLeave = () => {
      isDragging.current = false;
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const handleResize = () => {
      updateSize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseup", onMouseUp);
        canvas.removeEventListener("mouseleave", onMouseLeave);
      }
      globeRef.current?.destroy();
      globeRef.current = null;
    };
  }, [theta, dark, scale, diffuse, mapSamples, mapBrightness, baseColor, markerColor, glowColor]);

  return (
    <div
      className={cn(
        "z-[10] mx-auto flex items-center justify-center overflow-hidden",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "20rem",
          height: "20rem",
          aspectRatio: "1",
          display: "block",
          cursor: "grab",
        }}
      />
    </div>
  );
};

export default Globe;
