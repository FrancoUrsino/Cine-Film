import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const CreditCard = () => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  return (
    <>
      <div>
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <div className="mt-3">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-3">
                <input
                  type="number"
                  name="number"
                  className="form-control mt-1 block w-full rounded-md border-gray-300 text-third-color shadow-sm focus:border-primary-color focus:ring-primary-color sm:text-sm"
                  placeholder="0000 0000 0000 0000"
                  aria-label="Número de tarjeta de crédito"
                  value={state.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control mt-1 block w-full rounded-md border-gray-300 text-third-color shadow-sm focus:border-primary-color focus:ring-primary-color sm:text-sm"
                  placeholder="Nombre del titular"
                  aria-label="Nombre del titular"
                  value={state.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-6 mb-3">
                  <input
                    type="number"
                    name="expiry"
                    className="form-control mt-1 block w-full rounded-md border-gray-300 text-third-color shadow-sm focus:border-primary-color focus:ring-primary-color sm:text-sm"
                    placeholder="MM/AA"
                    aria-label="Fecha de vencimiento"
                    value={state.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                  />
                </div>
                <div className="col-6 mb-3">
                  <input
                    type="number"
                    name="cvc"
                    className="form-control mt-1 block w-full rounded-md border-gray-300 text-third-color shadow-sm focus:border-primary-color focus:ring-primary-color sm:text-sm"
                    placeholder="CVV"
                    aria-label="Código de seguridad (CVV)"
                    value={state.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreditCard;
