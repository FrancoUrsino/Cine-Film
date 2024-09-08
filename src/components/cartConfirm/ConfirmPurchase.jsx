import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../DB/Firebase';
import ConfirmUserInformationForm from './ConfirmUserInformationForm';
import ConfirmPayForm from './ConfirmPayForm';

function ConfirmPurchase() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCandies } = location.state || { selectedCandies: [] };

  const [datosPago, setDatosPago] = useState({
    tarjeta: '',
    fechaExpiracion: '',
    cvv: '',
    email: '',
    dniTitular: '',
  });
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [aclaracionAceptada, setAclaracionAceptada] = useState(false);
  const [procesando, setProcesando] = useState(false);

  const precio = {
    cargoPorServicio: 250,
    total: '0.00',
  };

  const totalCandyPrice = selectedCandies.reduce((acc, candy) => acc + candy.price * candy.quantity, 0);
  precio.total = (totalCandyPrice + parseFloat(precio.cargoPorServicio)).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosPago(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'terminosAceptados') {
      setTerminosAceptados(checked);
    } else if (name === 'aclaracionAceptada') {
      setAclaracionAceptada(checked);
    }
  };

  const handleCompra = async () => {
    Swal.fire({
      title: 'Procesando compra...',
      text: 'Por favor espera unos segundos.',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
    setProcesando(true);

    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate('/inicio-de-sesion');
      return;
    }

    const orderData = {
      candy: selectedCandies,
      date: new Date(),
    };

    try {
      const userOrdersRef = collection(firestore, 'users', currentUser.uid, 'candybar');
      await setDoc(doc(userOrdersRef), orderData);

      setTimeout(() => {
        Swal.fire('¡Compra confirmada!', 'Gracias por tu compra.', 'success');
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
    <div className='grid grid-cols-1 lg:grid-cols-2 py-14 gap-2'>
      <div className="mx-auto max-w-2xl w-full md:w-11/12 lg:h-[300px] bg-third-color shadow-md lg:order-last text-center lg:text-start p-8 rounded-lg">
        <div className=''>
          <h2 className="text-xl font-bold mb-4">Detalles del Candybar</h2>
          <div className="">
            {selectedCandies.length > 0 ? (
              selectedCandies.map((candy) => (
                <div key={candy.id} className="flex justify-between">
                  <span>{candy.name}</span>
                  <span>{candy.quantity} x ${candy.price.toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p>No se han seleccionado candies.</p>
            )}
            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between">
                <span>Cargo por Servicio:</span>
                <span>${precio.cargoPorServicio}</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span>Total:</span>
                <span>${precio.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-2xl lg:w-10/12 mx-auto bg-third-color p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-8 text-center">Por Favor Valida y Completá Tus Datos</h1>
        <div className="bg-white p-4 shadow-md rounded-lg space-y-6">
          <ConfirmUserInformationForm />
          <hr />
          <ConfirmPayForm
            datosPago={datosPago}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            terminosAceptados={terminosAceptados}
            aclaracionAceptada={aclaracionAceptada}
            isButtonDisabled={false}
            procesando={procesando}
            handleCompra={handleCompra}
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmPurchase;
