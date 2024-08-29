import React, { useEffect, useState } from 'react';
import { useUser } from '../userProfile/UserContext';
import { DatePicker, Input } from '@nextui-org/react';

function ConfirmUserInformationForm() {
  const user = useUser();
  const [formValues, setFormValues] = useState({
    name: '',
    surname: '',
    dni: '',
    birthDate: null
  });

  useEffect(() => {
    if (user) {
      console.log("Usuario encontrado en el formulario:", user);
      setFormValues({
        name: user.name || '',
        surname: user.surname || '',
        dni: user.dni || '',
        birthDate: user.birthDate ? new Date(user.birthDate.seconds * 1000) : null
      });
    } else {
      console.log("No se ha encontrado el usuario en el contexto.");
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormValues((prevValues) => ({ ...prevValues, birthDate: date }));
  };

  return (
    <>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-secondary-color">Nombre</label>
            <Input
              type="text"
              name="name"
              className='custom-input'
              value={formValues.name}
              fullWidth
              onChange={handleInputChange}
              placeholder="Nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-color">Apellido</label>
            <Input
              type="text"
              name="surname"
              value={formValues.surname}
              fullWidth
              onChange={handleInputChange}
              placeholder="Apellido"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-secondary-color">DNI</label>
            <Input
              type="text"
              name="dni"
              value={formValues.dni}
              fullWidth
              onChange={handleInputChange}
              placeholder="00000000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-color">Fecha de Nacimiento</label>
            <DatePicker
              value={formValues.birthDate}
              onChange={handleDateChange}
              placeholder="DD/MM/AAAA"
              format="dd/MM/yyyy"
              fullWidth
              showMonthAndYearPickers
              aria-label="Fecha de Nacimiento"
            />
          </div>
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="h-4 w-4 focus:ring-primary-color border-gray-300 rounded" />
          <label className="ml-2 block text-sm text-gray-900">Acepto recibir promociones y novedades de CINE FAN</label>
        </div>
      </form>
    </>
  );
}

export default ConfirmUserInformationForm;
