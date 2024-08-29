import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../components/DB/Firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import Swal from 'sweetalert2';
import ConfirmUserInformationForm from '../components/cartConfirm/ConfirmUserInformationForm';
import ConfirmPayForm from '../components/cartConfirm/ConfirmPayForm';

function Confirm() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { pelicula = {}, asientosSeleccionados = [], precio = {}, totalEntradas, cine, dia, horario, selectedCandies } = location.state || {};
  
  const [procesando, setProcesando] = useState(false);
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [aclaracionAceptada, setAclaracionAceptada] = useState(false);
  const [datosPago, setDatosPago] = useState({
    email: '',
    nombreTitular: '',
    dniTitular: '',
    numeroTarjeta: '',
    codigoSeguridad: '',
    fechaVencimientoMes: '',
    fechaVencimientoAno: '',
    medioPago: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosPago({ ...datosPago, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'terminosAceptados') {
      setTerminosAceptados(checked);
    } else if (name === 'aclaracionAceptada') {
      setAclaracionAceptada(checked);
    }
  };

  const isButtonDisabled = () => {
    return !terminosAceptados || !aclaracionAceptada ||
      !datosPago.email ||
      !datosPago.nombreTitular ||
      !datosPago.dniTitular ||
      !datosPago.numeroTarjeta ||
      !datosPago.codigoSeguridad ||
      !datosPago.fechaVencimientoMes ||
      !datosPago.fechaVencimientoAno ||
      !datosPago.medioPago;
  };

  const handleCompra = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate('/inicio-de-sesion');
      return;
    }

    Swal.fire({
      title: 'Procesando compra...',
      text: 'Por favor espera unos segundos.',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
    setProcesando(true);

    const orderData = {
      pelicula,
      cine,
      dia,
      horario,
      totalEntradas,
      precio: {
        ...precio,
        cargoCandy: precio.cargoCandy || 0
      },
      asientosSeleccionados,
      candy: selectedCandies,
      date: new Date()
    };

    try {
      const userOrdersRef = collection(firestore, 'users', currentUser.uid, 'orders');
      await setDoc(doc(userOrdersRef), orderData);

      setTimeout(() => {
        Swal.fire('¡Compra confirmada!', '', 'success');
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error("Error al guardar la compra: ", error);
      Swal.fire('¡Error!', 'Ocurrió un problema al guardar la compra.', 'error');
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="p-8 py-20 grid grid-cols-1 lg:grid-cols-2 lg:w-10/12 mx-auto">
      <div className="max-w-lg lg:mx-auto lg:h-[430px] bg-third-color shadow-md lg:order-last text-center lg:text-start lg:rounded-lg">
        <h2 className="text-xl lg:text-3xl text-center font-bold mb-4">Detalles de la Compra</h2>
        <div className='grid grid-cols-1 lg:grid-cols-3'>
          <div>
            <img src={pelicula.imagen} alt={pelicula.titulo} className="w-[300px] lg:w-[150px] lg:h-[180px] mx-auto col-span-1 px-1" />
          </div>
          <div className='lg:text-start col-span-2'>
            <p className='lg:pb-4'><strong>Película:</strong> {pelicula.titulo}</p>
            <p className='lg:pb-3'><strong>Cine:</strong> {cine}</p>
            <hr className='hidden lg:block' />
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              <p className='lg:py-3'><strong>Día:</strong> {dia}</p>
              <p className='lg:py-3'><strong>Horario:</strong> {horario}</p>
            </div>
            <hr className='hidden lg:block' />
          </div>
        </div>
        <div className='lg:pl-1'>
          <p><strong>Cantidad de Entradas:</strong> {totalEntradas}</p>
          <p><strong>Asientos Seleccionados:</strong> {asientosSeleccionados.map(asiento => asiento.asiento).join(', ')}</p>
          <p><strong>Precio de las Entradas:</strong> {precio.subtotal}</p>
          <p><strong>Total del Candybar:</strong> {precio.cargoCandy}</p>
          <p><strong>Cargo por servicio:</strong> {precio.cargoPorServicio}</p>
          <p><strong>Precio Total:</strong> {precio.total}</p>
        </div>
      </div>
      <div className="max-w-2xl lg:w-10/12 mx-auto bg-third-color p-8 shadow-md lg:rounded-lg">
        <h1 className="text-2xl font-bold mb-8 text-center">Por Favor Valida y Completá Tus Datos</h1>
        <div className="space-y-6">
          <ConfirmUserInformationForm />
          <hr />
          <ConfirmPayForm
            datosPago={datosPago}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            terminosAceptados={terminosAceptados}
            aclaracionAceptada={aclaracionAceptada}
            isButtonDisabled={isButtonDisabled}
            procesando={procesando}
            handleCompra={handleCompra}
          />
        </div>
      </div>
    </div>
  );
}

export default Confirm;
