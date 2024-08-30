import React from 'react';
import { promociones } from '../components/Data'; // Asegúrate de que la ruta sea correcta

function Promotions() {
  return (
    <>
    <img src="/assets/promotionsHeader.jpg" alt="tarjeta negra" className='w-full h-[500px] object-cover' />
    <div>
    <h2 className='text-secondary-color font-bold text-xl lg:text-5xl text-center my-4'>VENIR AL CINE SIEMPRE ES UN GRAN PLAN.</h2>
    <p className='text-secondary-color text-lg lg:text-2xl text-center w-9/12 mx-auto'>Arma tu experiencia perfecta con increíbles descuentos en combos y entradas.</p>
    <p className='text-secondary-color text-lg lg:text-2xl text-center w-9/12 mx-auto'>¡Te esperamos!</p>
    </div>
      <div className=' py-20 text-foreground'>
        <h3 className="text-4xl font-bold text-secondary-color text-center my-10"><span className='tickets-img'></span>PROMOCIONES<span className='tickets-img w-10'></span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:w-9/12 mx-auto">
          {promociones.map((promo) => (
            <div key={promo.id} className="border p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 items-center shadow-md">
              <img src={promo.imagen} alt={promo.titulo} className="w-full h-32 object-contain mb-4 md:mb-0" />
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold">{promo.titulo}</h3>
                <p className="mt-2">{promo.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Promotions;
