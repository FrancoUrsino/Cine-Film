import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import SwiperComponent from '../SwiperCandy';
import { candyOptions, otherOptions, gummyOptions, toysOptions } from '../Data';

function IdCandybar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [selectedCandies, setSelectedCandies] = useState([]);
  const promocionesSeleccionadas = location.state?.promocionesSeleccionadas || [];

  const calcularDescuento = (precio) => {
    let descuento = 1;
    promocionesSeleccionadas.forEach(promo => {
      if (promo.candyOff) {
        descuento *= (1 - promo.candyOff);
      }
    });
    return precio * descuento;
  };

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
      text: `Seleccionaste: ${candy.name} x1. Si quieres elegir algo más no dudes en seleccionarlo, sino baja hasta el botón de siguiente para continuar.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const handleRemoveCandy = (candyId) => {
    setSelectedCandies((prev) => prev.filter((c) => c.id !== candyId));
  };

  const calculateTotalCandy = () => {
    return selectedCandies.reduce((total, candy) => {
      const precioConDescuento = calcularDescuento(candy.price);
      console.log(`Precio original de ${candy.name}: ${candy.price}, con descuento: ${precioConDescuento}`);
      return total + precioConDescuento * candy.quantity;
    }, 0);
  };

  const handleNext = () => {
    const cargoCandy = calculateTotalCandy();
    const updatedPrecio = {
      ...location.state.precio,
      cargoCandy: cargoCandy || 0,
      total: location.state.precio.subtotal + location.state.precio.cargoPorServicio + (cargoCandy || 0)
    };

    navigate(`/${id}/confirmar-compra`, {
      state: {
        ...location.state,
        selectedCandies,
        precio: updatedPrecio,
      }
    });
  };

  return (
    <div className="py-40 p-8 text-foreground">
      <h1 className="text-xl text-foreground font-bold mb-4">Selecciona tus productos del Candybar</h1>
      <SwiperComponent items={candyOptions} handleItem={handleAddCandy} />
      <SwiperComponent items={otherOptions} handleItem={handleAddCandy} />
      <SwiperComponent items={gummyOptions} handleItem={handleAddCandy} />
      <SwiperComponent items={toysOptions} handleItem={handleAddCandy} />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Seleccionados</h2>
        <ul className="list-disc list-inside">
          {selectedCandies.map((candy) => (
            <li key={candy.id}>
              {candy.name} - ${candy.price} x {candy.quantity}
              <button className="ml-4 py-1 px-2 bg-secondary-color text-white rounded" onClick={() => handleRemoveCandy(candy.id)}>Quitar</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="actions flex justify-end mt-8">
        <button className="btn-next bg-primary-color text-black px-4 py-2 rounded-lg" onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
}

export default IdCandybar