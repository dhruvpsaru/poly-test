import React from 'react';
import Sketch from 'react-p5';
//this is mostly from chat agents
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
  for (let x = -30; x <= 30; x += gridSize) {
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

  for (let y = -30; y <= 30; y += gridSize) {
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
    p5.fill((index === 0  || index ===  polygon.length - 1)? p5.color(255, 0, 0) : p5.color(0, 0, 255));
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
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(600, 600).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(255);
    const scale = 10;
    drawPolygon(p5, polygon, scale);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};