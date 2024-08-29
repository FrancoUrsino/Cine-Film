import React from 'react';
import { useNavigate } from 'react-router-dom';

function Modal({ show, onClose, selectedCinema, selectedDay, selectedTime, selectedType, selectedLanguage, movieTitle, movieImage }) {
  const navigate = useNavigate();
  if (!show) {
    return null;
  }

  const handleContinue = () => {
    navigate('/promociones', {
      state: {
        pelicula: { titulo: movieTitle, imagen: movieImage },
        cine: selectedCinema?.label,
        dia: selectedDay?.label,
        horario: selectedTime,
        cantidad: 0,
        precio: {
          subtotal: 0,
          cargoPorServicio: 520,
          cargoCandy: 0,
          total: 520
        }
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center text-center justify-center z-50">
      <div className="bg-[#161616] rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 lg:h-[400px]">
        <h2 className="text-2xl font-bold mb-8 lg:mt-5 lg:text-5xl">Su selección</h2>
        <p className='my-2 lg:text-lg'><strong>Título:</strong> {movieTitle}</p>
        <p className='my-2 lg:text-lg'><strong>Cine:</strong> {selectedCinema?.label}</p>
        <p className='my-2 lg:text-lg'><strong>Día:</strong> {selectedDay?.label} <strong>Horario:</strong> {selectedTime}</p>
        <p className='my-2 lg:text-lg'><strong>Sala:</strong> {selectedType} {selectedLanguage}</p>
        <hr className='mt-12' />
        <div className="flex justify-center mt-4 lg:mt-8">
          <button className="bg-third-color text-black px-4 py-2 rounded-lg mr-2" onClick={onClose}>Cancelar</button>
          <button className="bg-primary-color text-black px-4 py-2 rounded-lg" onClick={handleContinue}>Continuar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
