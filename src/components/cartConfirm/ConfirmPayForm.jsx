import React, { useState } from 'react';
import CreditCard from './CreditCard';

function ConfirmPayForm({ datosPago, handleInputChange, handleCheckboxChange, terminosAceptados, aclaracionAceptada, procesando, handleCompra }) {
  const [cardData, setCardData] = useState({
    number: datosPago.numeroTarjeta || "",
    name: datosPago.nombreTitular || "",
    expiry: datosPago.fechaVencimiento || "",
    cvc: datosPago.codigoSeguridad || "",
  });

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
    handleInputChange(e);
  };

  const allInputsFilled = () => {
    const requiredFields = [
      'email',
      'dniTitular',
    ];
    for (let field of requiredFields) {
      if (!datosPago[field] && !cardData[field]) {
        return false;
      }
    }
    return terminosAceptados && aclaracionAceptada;
  };

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-2xl font-bold mb-8 text-center">Completa los datos para el pago</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label className="block text-sm font-medium text-secondary-color">Email</label>
          <input type="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 text-third-color shadow-sm focus:border-primary-color focus:ring-primary-color sm:text-sm" placeholder="email@ejemplo.com" value={datosPago.email} onChange={handleInputChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-color">DNI del Titular</label>
          <input type="text" name="dniTitular" className="mt-1 block w-full rounded-md border-gray-300 text-third-color shadow-sm focus:border-primary-color focus:ring-primary-color sm:text-sm" placeholder="00000000" value={datosPago.dniTitular} onChange={handleInputChange} />
        </div>
      </div>

      <CreditCard datosPago={datosPago} handleInputChange={handleCardInputChange} />
      
      <p className="mt-4 text-sm text-secondary-color">
        Aclaración: Para ingresar a las funciones para películas P13 y P16, menores de edad deberán ingresar con sus padres o tutores.
        Para ingresar con un adulto responsable, deberá presentar el formulario de autorización en formato físico o mediante Mi Argentina.
      </p>
      <div className="flex items-center mt-4">
        <input type="checkbox" className="h-4 w-4 focus:ring-primary-color border-gray-300 text-third-color rounded" name="aclaracionAceptada" onChange={handleCheckboxChange} checked={aclaracionAceptada} aria-label="Confirmo que he leído y comprendido la aclaración." />
        <label className="ml-2 block text-sm text-secondary-color">
          Confirmo que he leído y comprendido la aclaración.
        </label>
      </div>
      <div className="flex items-center mt-4">
        <input type="checkbox" className="h-4 w-4 focus:ring-primary-color border-gray-300 text-third-color rounded" name="terminosAceptados" onChange={handleCheckboxChange} checked={terminosAceptados} aria-label="Confirmo que he leído y acepto los términos y condiciones." />
        <label className="ml-2 block text-sm text-secondary-color">
          Confirmo que he leído y acepto los términos y condiciones.
        </label>
      </div>
      <button className="bg-primary-color w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleCompra} disabled={!allInputsFilled() || procesando}>
        {procesando ? "Procesando..." : "Confirmar Compra"}
      </button>
    </div>
  );
}

export default ConfirmPayForm;
