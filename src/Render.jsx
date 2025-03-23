import React, { useState } from 'react';
import Sketch from 'react-p5';

const drawPolygon = (p5, polygon, scale) => {
  const centerX = p5.width / 2;
  const centerY = p5.height / 2;

  // Draw coordinate axes
  p5.stroke(200);
  p5.strokeWeight(1);
  p5.line(0, centerY, p5.width, centerY);
  p5.line(centerX, 0, centerX, p5.height);

  // Draw grid
  p5.strokeWeight(0.5);
  const gridSize = 10;
  for (let x = -50; x <= 50; x += gridSize) {
    const screenX = x * scale + centerX;
    p5.line(screenX, 0, screenX, p5.height);
    
    // Draw x-axis labels
    if (x !== 0) {
      p5.fill(100);
      p5.noStroke();
      p5.textSize(10);
      p5.textAlign(p5.CENTER, p5.TOP);
      p5.text(x.toString(), screenX, centerY + 5);
    }
  }
  
  for (let y = -50; y <= 50; y += gridSize) {
    const screenY = -y * scale + centerY;
    p5.line(0, screenY, p5.width, screenY);
    
    // Draw y-axis labels
    if (y !== 0) {
      p5.fill(100);
      p5.noStroke();
      p5.textSize(10);
      p5.textAlign(p5.RIGHT, p5.CENTER);
      p5.text(y.toString(), centerX - 5, screenY);
    }
  }

  // Draw polygon
  p5.stroke(0);
  p5.strokeWeight(2);
  p5.noFill();
  p5.beginShape();
  polygon.forEach(([x, y]) => {
    p5.vertex(x * scale + centerX, -y * scale + centerY);
  });
  p5.endShape(p5.CLOSE);

  // Draw points
  polygon.forEach(([x, y], index) => {
    p5.fill(index === 0  ||  index === polygon.length - 1? p5.color(255, 0, 0) : p5.color(0, 0, 255));
    p5.noStroke();
    p5.circle(x * scale + centerX, -y * scale + centerY, 8);
  });

  // Draw coordinates
  polygon.forEach(([x, y]) => {
    const px = x * scale + centerX;
    const py = -y * scale + centerY;
    p5.fill(0);
    p5.noStroke();
    p5.textSize(12);
    p5.textAlign(p5.LEFT, p5.CENTER);
    const formatted = `(${x.toFixed(1)}, ${y.toFixed(1)})`;
    p5.text(formatted, px + 10, py);
  });
};

export const PolygonRenderer = ({ polygon, title }) => {
  const [scale, setScale] = useState(10);
  let p5Instance = null;

  const setup = (p5, canvasParentRef) => {
    p5Instance = p5;
    const canvas = p5.createCanvas(600, 600).parent(canvasParentRef);
    
    // Add mousewheel event for zooming
    canvas.mouseWheel((event) => {
      event.preventDefault();
      const zoomSensitivity = 0.1;
      const zoomChange = -event.delta * zoomSensitivity;
      const newScale = Math.max(1, Math.min(50, scale + zoomChange));
      setScale(newScale);
    });
  };

  const draw = (p5) => {
    p5.background(255);
    drawPolygon(p5, polygon, scale);

    // Draw zoom level indicator
    p5.fill(0);
    p5.noStroke();
    p5.textSize(12);
    p5.textAlign(p5.LEFT, p5.TOP);
    p5.text(`Zoom: ${scale.toFixed(1)}x`, 10, 10);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(50, prev + 1));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={handleZoomOut}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            -
          </button>
          <button
            onClick={handleZoomIn}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            +
          </button>
        </div>
      </div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};