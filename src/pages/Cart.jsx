import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '../components/DB/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import PromocionesBancarias from '../components/cart/BanksPromotions';
import ResumenCompra from '../components/cart/CartResume';
import { promociones } from '../components/Data';

function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const {id} = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [pelicula, setPelicula] = useState({ imagen: '', titulo: '' });
  const [cine, setCine] = useState('');
  const [dia, setDia] = useState('');
  const [horario, setHorario] = useState('');
  const [promocionesSeleccionadas, setPromocionesSeleccionadas] = useState([]);
  const [totalEntradas, setTotalEntradas] = useState(0);
  const [precio, setPrecio] = useState({ subtotal: 0, cargoPorServicio: 520, cargoCandy: 0, total: 520 });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (location.state) {
      const { pelicula, cine, dia, horario, cantidad, precio } = location.state;
      setPelicula(pelicula || {});
      setCine(cine || '');
      setDia(dia || '');
      setHorario(horario || '');
      setTotalEntradas(cantidad || 0);
      setPrecio(precio || { subtotal: 0, cargoPorServicio: 520, cargoCandy: 0, total: 520 });
    }
  }, [location.state]);

  const handlePromocionSeleccionada = (promo) => {
    setPromocionesSeleccionadas((prevPromos) => {
      const existingPromo = prevPromos.find((p) => p.id === promo.id);
      if (existingPromo) {
        return prevPromos.map((p) =>
          p.id === promo.id ? { ...p, cantidad: p.cantidad + promo.cantidad } : p
        );
      } else {
        return [...prevPromos, { ...promo, cantidad: promo.cantidad }];
      }
    });
    actualizarPrecioYEntradas(promo.entradas, promo.precio);
  };

  const actualizarPrecioYEntradas = (cantidad, precioUnitario) => {
    setTotalEntradas((prevTotal) => prevTotal + cantidad);
    setPrecio((prevPrecio) => {
      const nuevoSubtotal = prevPrecio.subtotal + precioUnitario;
      const nuevoTotal = nuevoSubtotal + prevPrecio.cargoPorServicio + prevPrecio.cargoCandy;
      return {
        ...prevPrecio,
        subtotal: nuevoSubtotal,
        total: nuevoTotal
      };
    });
  };

  const handleCantidadChange = (promoId, nuevaCantidad, esIncremento) => {
    setPromocionesSeleccionadas((prevPromos) =>
      prevPromos.map((p) =>
        p.id === promoId ? { ...p, cantidad: nuevaCantidad } : p
      )
    );
    const promoSeleccionada = promociones.find((p) => p.id === promoId);
    const cantidadDiferencia = esIncremento ? 1 : -1;
    actualizarPrecioYEntradas(cantidadDiferencia * promoSeleccionada.entradas, cantidadDiferencia * promoSeleccionada.precio);
  };

  const eliminarPromocion = (promoId) => {
    const promoSeleccionada = promocionesSeleccionadas.find((p) => p.id === promoId);
    setPromocionesSeleccionadas((prevPromos) => prevPromos.filter((p) => p.id !== promoId));
    actualizarPrecioYEntradas(-promoSeleccionada.cantidad * promoSeleccionada.entradas, -promoSeleccionada.cantidad * promoSeleccionada.precio);
  };

  const handleBack = () => {
    navigate(-1);
  };


  const handleNext = () => {
    if (isLoggedIn) {
      navigate(`/${id}/seleccionar-asientos`, {
        state: {
          pelicula,
          cine,
          dia,
          horario,
          promocionesSeleccionadas,
          totalEntradas,
          precio
        }
      });
    } else {
      navigate('/inicio-de-sesion', { state: { from: location } });
    }
  };

  return (
    <div className="py-40 p-8">
      <h1 className="text-xl text-foreground font-bold mb-4">Hola {userName}!</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PromocionesBancarias promociones={promociones} onPromocionSeleccionada={handlePromocionSeleccionada} totalEntradas={totalEntradas} />
        </div>
        <div className="lg:col-span-1">
          <ResumenCompra pelicula={pelicula} cine={cine} dia={dia} horario={horario} promocionesSeleccionadas={promocionesSeleccionadas} handleCantidadChange={handleCantidadChange} precio={precio} totalEntradas={totalEntradas} eliminarPromocion={eliminarPromocion} />
        </div>
      </div>
      <div className="actions flex justify-between mt-8">
        <button className="btn-back bg-third-color text-black px-4 py-2 rounded-lg" onClick={handleBack}>Volver</button>
        <button className="btn-next bg-primary-color text-black px-4 py-2 rounded-lg" onClick={handleNext} disabled={totalEntradas === 0}>Siguiente</button>
      </div>
    </div>
  );
}

export default Cart;
