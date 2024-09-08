import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SwiperComponent from '../SwiperCandy';
import { candyOptions, otherOptions, gummyOptions, toysOptions } from '../Data';
import CandyModal from './CandyModal';
import { auth } from '../DB/Firebase'; // Importa la autenticación de Firebase

function Candybar() {
  const [selectedCandies, setSelectedCandies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAddCandy = (candy) => {
    setSelectedCandies((prev) => {
      const existingCandy = prev.find((c) => c.id === candy.id);
      if (existingCandy) {
        return prev.map((c) =>
          c.id === candy.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        return [...prev, { ...candy, quantity: 1 }];
      }
    });

    Swal.fire({
      title: '¡Producto añadido!',
      text: `Seleccionaste: ${candy.name} x1. Si quieres elegir algo más no dudes en seleccionarlo, sino baja para continuar.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const handleSubtractCandy = (candyId) => {
    setSelectedCandies((prev) =>
      prev
        .map((c) =>
          c.id === candyId && c.quantity > 1
            ? { ...c, quantity: c.quantity - 1 }
            : c
        )
        .filter((c) => c.quantity > 0)
    );
  };

  const handleRemoveCandy = (candyId) => {
    setSelectedCandies((prev) => prev.filter((c) => c.id !== candyId));
  };

  const handleFinalizePurchase = () => {
    // Verifica si hay un usuario autenticado
    const currentUser = auth.currentUser;
    if (currentUser) {
      // Usuario autenticado, redirige a confirmar compra
      navigate(`/confirmar-compra`, {
        state: {
          selectedCandies,
        },
      });
    } else {
      // Usuario no autenticado, redirige a inicio de sesión
      navigate('/inicio-de-sesion');
    }
  };

  return (
    <div className="py-40 p-8 text-foreground">
      <h1 className="text-xl text-foreground font-bold mb-4">
        Selecciona tus productos del Candybar
      </h1>
      <SwiperComponent items={candyOptions} handleItem={handleAddCandy} />
      <SwiperComponent items={otherOptions} handleItem={handleAddCandy} />
      <SwiperComponent items={gummyOptions} handleItem={handleAddCandy} />
      <SwiperComponent items={toysOptions} handleItem={handleAddCandy} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Seleccionados</h2>
        <button className="bg-primary-color text-black px-4 py-2 rounded-lg mt-4" onClick={() => setShowModal(true)}>Ver Selección</button>
        <button 
          className={`bg-third-color text-black px-4 py-2 rounded-lg mt-4 ml-4 ${selectedCandies.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} 
          onClick={handleFinalizePurchase} 
          disabled={selectedCandies.length === 0}
        >
          Finalizar Compra
        </button>
      </div>

      {showModal && (
        <CandyModal
          selectedCandies={selectedCandies}
          onClose={() => setShowModal(false)}
          onRemoveCandy={handleRemoveCandy}
          onAddCandy={handleAddCandy}
          onSubtractCandy={handleSubtractCandy}
        />
      )}
    </div>
  );
}

export default Candybar;
