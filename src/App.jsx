
import { PolygonRenderer } from './Render';
import { run } from './logic';
import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('[[6,18], [14,18], [16,9], [10,5], [4,9]]');
  const [polygon, setPolygon] = useState([[6, 18], [14, 18], [16, 9], [10, 5], [4, 9]]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newPolygon = JSON.parse(inputValue);
      if (Array.isArray(newPolygon) && newPolygon.every(point =>
        Array.isArray(point) && point.length === 2 &&
        typeof point[0] === 'number' && typeof point[1] === 'number'
      )) {
        setPolygon(newPolygon);
      } else {
        alert('Please enter valid coordinates in the format: [[x1,y1], [x2,y2], ...]');
      }
    } catch (error) {
      alert('Invalid JSON format. Please enter coordinates in the format: [[x1,y1], [x2,y2], ...]');
    }
  };

  const transformedPolygon = run([...polygon]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Enter Polygon Coordinates</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="coordinates" className="block text-sm font-medium text-gray-700 mb-2">
                Coordinates (JSON format)
              </label>
              <input
                id="coordinates"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="[[x1,y1], [x2,y2], ...]"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Polygon
            </button>
          </form>
        </div>
        <div className="flex gap-8 justify-center">
          <PolygonRenderer polygon={polygon} title="Original" />
          <PolygonRenderer polygon={transformedPolygon} title="Transformed" />
        </div>
      </div>
    </div>
  );
}

export default App;