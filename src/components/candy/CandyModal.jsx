import React from 'react';
import { IoClose } from "react-icons/io5";

function CandyModal({ selectedCandies, onClose, onRemoveCandy, onAddCandy, onSubtractCandy }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#161616]/70 backdrop-blur-md p-6 rounded-lg w-96">
        <div className='flex justify-between pb-8'>
          <h2 className="text-2xl font-semibold">Tu Selección</h2>
          <button
            className="text-third-color px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>
        {selectedCandies.length === 0 ? (
          <p>No has seleccionado ningún producto.</p>
        ) : (
          <ul>
            {selectedCandies.map((candy) => (
              <li key={candy.id} className="flex justify-between items-center mb-4">
                <span>{candy.name}</span>
                <div className="flex items-center">
                  <button
                    className="bg-primary-color text-black px-2 py-1 rounded-lg mr-2"
                    onClick={() => onSubtractCandy(candy.id)}
                  >
                    -
                  </button>
                  <span>{candy.quantity}</span>
                  <button
                    className="bg-primary-color text-black px-2 py-1 rounded-lg ml-2"
                    onClick={() => onAddCandy(candy)}
                  >
                    +
                  </button>
                  <button
                    className="bg-secondary-color text-third-color px-2 py-1 rounded-lg ml-4"
                    onClick={() => onRemoveCandy(candy.id)}
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CandyModal;
