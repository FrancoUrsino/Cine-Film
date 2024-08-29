import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, getDocs, runTransaction, doc } from 'firebase/firestore';
import { firestore } from '../DB/Firebase';

const letrasFilas = 'ABCDEFGHIJ'.split('');
const filas = 10;
const columnas = 10;

const inicializarAsientos = (asientosReservados) => {
  let asientos = Array(filas).fill().map(() => Array(columnas).fill('available'));
  asientosReservados.forEach(({ fila, columna, estado }) => {
    asientos[fila][columna] = estado;
  });
  return asientos;
};

function Sits() {
  const navigate = useNavigate();
  const location = useLocation();
  const [asientosReservados, setAsientosReservados] = useState([]);
  const [asientos, setAsientos] = useState([]);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const { totalEntradas, cine, dia, horario } = location.state;

  useEffect(() => {
    const fetchAsientosReservados = async () => {
      try {
        const seatsRef = collection(firestore, `cines/${cine}/${dia}/${horario}/seats`);
        const querySnapshot = await getDocs(seatsRef);
        const asientosReservadosData = querySnapshot.docs.map(doc => doc.data());
        console.log("Asientos reservados desde Firestore: ", asientosReservadosData);
        setAsientosReservados(asientosReservadosData);
        setAsientos(inicializarAsientos(asientosReservadosData));
      } catch (error) {
        console.error("Error al cargar los asientos reservados: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAsientosReservados();
  }, [cine, dia, horario]);

  const handleAsientoClick = (fila, columna) => {
    if (asientos[fila][columna] === 'sold') return;

    let nuevosAsientosSeleccionados = [...asientosSeleccionados];
    if (asientos[fila][columna] === 'available' && asientosSeleccionados.length < totalEntradas) {
      setAsientos((prevAsientos) => {
        const nuevosAsientos = [...prevAsientos];
        nuevosAsientos[fila][columna] = 'selected';
        return nuevosAsientos;
      });
      nuevosAsientosSeleccionados.push({ fila, columna });
    } else if (asientos[fila][columna] === 'selected') {
      setAsientos((prevAsientos) => {
        const nuevosAsientos = [...prevAsientos];
        nuevosAsientos[fila][columna] = 'available';
        return nuevosAsientos;
      });
      nuevosAsientosSeleccionados = nuevosAsientosSeleccionados.filter(
        (asiento) => asiento.fila !== fila || asiento.columna !== columna
      );
    }
    setAsientosSeleccionados(nuevosAsientosSeleccionados);
  };

  const handleConfirmar = async () => {
    try {
      await runTransaction(firestore, async (transaction) => {
        const seatsRef = collection(firestore, `cines/${cine}/${dia}/${horario}/seats`);

        asientosSeleccionados.forEach(({ fila, columna }) => {
          const asientoRef = doc(seatsRef, `${fila}-${columna}`);
          transaction.set(asientoRef, { fila, columna, estado: 'sold' });
        });
      });

      const { pelicula, promocionesSeleccionadas, precio } = location.state;
      navigate('/candybar', {
        state: {
          pelicula: { titulo: pelicula.titulo, imagen: pelicula.imagen },
          cine,
          dia,
          horario,
          promocionesSeleccionadas,
          totalEntradas,
          precio,
          asientosSeleccionados: asientosSeleccionados.map(({ fila, columna }) => ({
            asiento: `${letrasFilas[fila]}-${columna + 1}`,
            fila,
            columna
          }))
        }
      });
    } catch (error) {
      console.error("Error al confirmar los asientos: ", error);
    }
  };

  const renderAsientos = () => {
    return asientos.map((fila, filaIndex) => (
      <div className="flex justify-center mb-1" key={filaIndex}>
        {fila.map((asiento, columnaIndex) => {
          if (columnaIndex === 2 || columnaIndex === 7) {
            return (
              <React.Fragment key={`${filaIndex}-${columnaIndex}`}>
                <div
                  className={`w-6 h-6 lg:w-8 lg:h-8 border rounded-t-xl 
                    ${asiento === 'available' ? 'bg-secondary-color' : ''} 
                    ${asiento === 'selected' ? 'bg-primary-color shadow-md shadow-white' : ''} 
                    ${asiento === 'sold' ? 'bg-third-color' : ''}`}
                  onClick={() => handleAsientoClick(filaIndex, columnaIndex)}
                ></div>
                <div className="w-4 h-8"></div>
              </React.Fragment>
            );
          }
          return (
            <div
              key={`${filaIndex}-${columnaIndex}`}
              className={`w-6 h-6 lg:w-8 lg:h-8 border rounded-t-xl 
                ${asiento === 'available' ? 'bg-secondary-color' : ''} 
                ${asiento === 'selected' ? 'bg-primary-color shadow-md shadow-white' : ''} 
                ${asiento === 'sold' ? 'bg-third-color' : ''}`}
              onClick={() => handleAsientoClick(filaIndex, columnaIndex)}
            ></div>
          );
        })}
      </div>
    ));
  };

  if (loading) {
    return <div>Cargando asientos...</div>;
  }

  return (
    <div className="text-foreground p-8 py-20">
      <h1 className="text-2xl font-bold mb-8">Seleccionar Asientos</h1>
      <div className="flex justify-center mb-4">
        <div className="w-3/4 p-2">
          <div className="screen bg-white text-center text-black pt-4 pb-2 mb-2 trapezoid">Pantalla</div>
          {renderAsientos()}
        </div>
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-500 border rounded-t-xl mr-2"></div> Disponible
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-color border rounded-t-xl mr-2"></div> Seleccionado
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white border rounded-t-xl mr-2"></div> Vendido
        </div>
      </div>
      <div className="actions flex justify-center mt-8">
        <button className="bg-primary-color text-black px-4 py-2 rounded-lg" onClick={handleConfirmar} disabled={asientosSeleccionados.length !== totalEntradas}>Confirmar</button>
      </div>
    </div>
  );
}

export default Sits;
