import React from 'react';

function BanksPromotions({ promociones, onPromocionSeleccionada, totalEntradas }) {
  const handleSelectPromo = (promo) => {
    if (totalEntradas + promo.entradas <= 8) {
      onPromocionSeleccionada(promo);
    }
  };

  return (
    <div className='text-foreground'>
      <h2 className="text-2xl font-bold mb-4">Promociones Bancarias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promociones.map((promo) => (
          <div key={promo.id} className="border p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 items-center shadow-md relative">
              <img src={promo.imagen} alt={promo.titulo} className="w-full h-32 object-contain mb-4" />
              <div className="text-center">
                <h3 className="text-lg font-bold">{promo.titulo}</h3>
                <p className="mt-2">{promo.descripcion}</p>
              <p className="text-xl font-semibold mt-4">${promo.precio}</p>
              </div>
            <button className={`mt-2 px-4 py-2 border rounded-lg md:col-span-2 ${totalEntradas + promo.entradas > 8 ? 'bg-secondary-color text-black cursor-not-allowed' : 'bg-primary-color text-black'}`} onClick={() => handleSelectPromo(promo)} disabled={totalEntradas + promo.entradas > 8}>Seleccionar</button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default BanksPromotions;
