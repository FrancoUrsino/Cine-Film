import React from 'react';
import { IoClose } from "react-icons/io5";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function CartResume({ pelicula, cine, dia, horario, promocionesSeleccionadas, handleCantidadChange, precio, totalEntradas, eliminarPromocion }) {
  const handleCantidadIncrement = (promoId) => {
    const promoSeleccionada = promocionesSeleccionadas.find((p) => p.id === promoId);
    if (totalEntradas + promoSeleccionada.entradas <= 8) {
      handleCantidadChange(promoId, promoSeleccionada.cantidad + 1, true);
      } else {
      Swal.fire({
        title: 'Error',
        text: 'No puedes seleccionar más de 8 entradas en total.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'bg-primary-color text-black rounded-lg px-4 py-2'
        }
    });
  };
  };

  const handleCantidadDecrement = (promoId) => {
    const promoSeleccionada = promocionesSeleccionadas.find((p) => p.id === promoId);
    if (promoSeleccionada.cantidad > 1) {
      handleCantidadChange(promoId, promoSeleccionada.cantidad - 1, false);
    }
  };

  return (
    <div className='text-foreground'>
      <h2 className="text-2xl font-bold mb-4">Resumen de la Compra</h2>
      <div className="border p-4 rounded-lg grid lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold">Película</h3>
        <p>{pelicula.titulo}</p>
        <img src={pelicula.imagen} alt={pelicula.titulo} className="w-40 h-56" />
          <h3 className="text-lg font-semibold mt-4">Cine</h3>
        <p>{cine}</p>
          <h3 className="text-lg font-semibold mt-4">Día y Horario</h3>
        <p>{dia} - {horario}</p>  
        </div>
        <div>
        <h3 className="text-lg font-semibold mt-4">Promociones Seleccionadas</h3>
          {promocionesSeleccionadas.map((promo) => (
            <div key={promo.id} className="border p-4 rounded-lg mb-4 relative">
              <h4 className="text-lg font-bold">{promo.titulo}</h4>
              <p>${promo.precio}</p>
              <div className="flex items-center mt-2">
                <button className="px-2 py-1 border rounded-lg bg-third-color text-black" onClick={() => handleCantidadDecrement(promo.id)}>-</button>
                <p className="mx-2">{promo.cantidad}</p>
                <button className="px-2 py-1 border rounded-lg bg-primary-color text-black" onClick={() => handleCantidadIncrement(promo.id)}
                >
                  +
                </button>
              </div>
              <button
                className="absolute top-2 right-2"
                onClick={() => eliminarPromocion(promo.id)}
              >
                <IoClose />
              </button>
            </div>
          ))}
          <h3 className="text-lg font-semibold mt-4">Total Entradas: {totalEntradas}</h3>
          <h3 className="text-lg font-semibold mt-4">Cargo por servicio: ${precio.cargoPorServicio}</h3>
          <h3 className="text-lg font-semibold mt-4">Total Precio: ${precio.total}</h3>
        </div>
        
      </div>
    </div>
  );
}

export default CartResume;
