import React, { useState } from 'react';

const formats = [
  {
    title: "4D E-Motion",
    image: "../assets/4d.png",
    alt: "4D E-Motion",
    description: "La tecnología 4D E-Motion, es un sistema de cine equipado con butacas móviles y sorprendentes efectos especiales. Viento, agua, vibración, impacto de aire y aromas, todo en perfecto sincronismo con la película, generando una experiencia sensorial inmersiva. Viento: Una ráfaga de aire frontal roza tu rostro impulsada por la fuerza de la acción. Aire: Envolventes disparos de aire expulsados repentinamente alrededor de tu cuello. Vibración: Localizadas en el asiento y el respaldo, permiten un amplio espectro de intensidad y variaciones. Aromas: Esencias que estimulan sensaciones creando los climas cinematográficos más emocionantes. Agua: sorprendente rocío de agua para sumergirte en la aventura. Temblor: Vibraciones producidas por las bajas frecuencias se trasladan de la butaca para sentir el poder del sonido en tu cuerpo. Viento: Poderosas ráfagas de viento o suaves brisas recorren cada rincón de la sala. Luces: Impactantes destellos de luces inteligentes traspasan la pantalla cubriendo todo el ambiente de color."
  },
  {
    title: "D-BOX",
    image: "../assets/dbox.png",
    alt: "D-BOX",
    description: "La tecnología D-Box incorpora el movimiento a la experiencia de ir al cine. Las butacas con sistema D-BOX, son butacas programadas para moverse según los efectos especiales de la película, brindando al espectador una innovadora y diferente manera de vivir el cine. D-Box cuenta con 3 niveles de intensidad que el espectador puede controlar a su gusto; dando mayor o menor intensidad, o bien apagándola en determinado momento según su necesidad; posee un sensor de detección lo cual hace que la butaca deje de moverse automáticamente si el cliente se levanta de ella. El peso mínimo recomendado para este formato es 18 Kg. La suma de estos efectos hará la experiencia de ver una película aún más espectacular, no sólo por los efectos visuales de la misma, sino por la sensación real de sentirse inmerso dentro de ella. Proyecciones en 2D y 3D."
  },
  {
    title: "XD",
    image: "../assets/xd.jpg",
    alt: "XD",
    description: "El concepto XD es totalmente novedoso en el mercado de Cines de Argentina y significa Extreme Digital Cinema, lo que representa una forma extrema de ver, vivir y sentir el cine. Una pantalla gigante de piso a techo y de pared a pared, con posibilidad de visualizar películas tanto en 2D como en 3D en formato completamente digital, con butacas más grande y cómodas, acompañado de un impactante sistema de audio digital superior, de última generación, con mayor potencia y más cantidad de parlantes."
  },
  {
    title: "Comfort",
    image: "../assets/comfort.png",
    alt: "Comfort",
    description: "Comfort es un concepto pensado para brindar la mayor comodidad. Las butacas Comfort son más amplias y cómodas, poseen apoya pies y un sistema de reclinado electrónico que permite al espectador mirar la película en un cómodo sillón casi a 180 grados."
  }
];

const FormatCard = ({ format, onClick, isSelected }) => (
  <div className="w-full h-auto cursor-pointer" onClick={onClick}>
    <img src={format.image} alt={format.alt} className="w-full h-64 md:h-76 lg:h-80 object-contain" />
    {isSelected && (
      <div className="mt-4 p-4 bg-[#161616] text-primary-color">
        <h3 className="text-2xl font-bold">{format.title}</h3>
        <p className="mt-2">{format.description}</p>
      </div>
    )}
  </div>
);

const FormatsSection = () => {
  const [selectedFormat, setSelectedFormat] = useState(null);

  const handleCardClick = (format) => {
    if (selectedFormat && selectedFormat.title === format.title) {
      setSelectedFormat(null);
    } else {
      setSelectedFormat(format);
    }
  };

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl font-semibold text-secondary-color mb-10 pl-2">FORMATOS</h2>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:grid-cols-4">
        {formats.map((format, index) => (
          <FormatCard
            key={index}
            format={format}
            onClick={() => handleCardClick(format)}
            isSelected={selectedFormat && selectedFormat.title === format.title}
          />
        ))}
      </div>
    </div>
  );
};

export default FormatsSection;