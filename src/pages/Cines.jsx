import React, { useState, useEffect } from 'react';

const Cines = () => {
  const [cineData, setCineData] = useState([]);
  const [selectedCine, setSelectedCine] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setCineData(data.cines))
      .catch(error => console.error('Error al cargar datos:', error));
  }, []);

  const handleCineSelect = (index) => {
    setSelectedCine(cineData[index]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Cines</h1>
      <div className="flex justify-center mb-4">
        <select
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm"
          onChange={(e) => handleCineSelect(e.target.value)}
        >
          <option value="">Selecciona un cine</option>
          {Object.keys(cineData).map((key, index) => (
            <option key={index} value={index}>
              {key}
            </option>
          ))}
        </select>
      </div>
      {selectedCine && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">{selectedCine.direccion}</h2>
          <div className="space-y-4">
            {selectedCine.tarifas.map((tarifa, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="text-xl font-medium">Sala: {tarifa.sala}</h3>
                <p>General: {tarifa.general}</p>
                {tarifa.menor && <p>Menor: {tarifa.menor}</p>}
                {tarifa.mayores && <p>Mayores de 60 años: {tarifa.mayores}</p>}
                {tarifa.martesMiercoles && <p>Martes y Miércoles: {tarifa.martesMiercoles}</p>}
                {tarifa.beneficioEspecial && <p>Beneficio Especial: {tarifa.beneficioEspecial}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cines;
