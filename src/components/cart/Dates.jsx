import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Modal from './Modal';

function Dates({ cinemas, movieTitle, movieImage }) {
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (selectedCinema) {
      const today = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
      const cinemaHorarios = cinemas[selectedCinema.value];
      if (cinemaHorarios[today]) {
        setSelectedDay({ value: today, label: today });
      } else {
        setSelectedDay({ value: Object.keys(cinemaHorarios)[0], label: Object.keys(cinemaHorarios)[0] });
      }
    }
  }, [selectedCinema, cinemas]);

  const handleCinemaChange = (selectedOption) => {
    setSelectedCinema(selectedOption);
    setSelectedTime(null);
  };

  const handleDayChange = (selectedOption) => {
    setSelectedDay(selectedOption);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time, type, language) => {
    setSelectedTime(time);
    setSelectedType(type);
    setSelectedLanguage(language);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const cinemaOptions = Object.keys(cinemas).map((cinema) => ({
    value: cinema,
    label: cinema,
  }));

  const cinemaHorarios = selectedCinema ? cinemas[selectedCinema.value] : null;
  const days = cinemaHorarios
    ? Object.keys(cinemaHorarios).map((day) => ({
      value: day,
      label: day,
    }))
    : [];
  const horariosForDay = cinemaHorarios && selectedDay ? cinemaHorarios[selectedDay.value] : [];

  const groupedHorarios = Array.isArray(horariosForDay)
  ? horariosForDay.reduce((acc, show) => {
      const key = `${show.type} ${show.language}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push({ time: show.time, type: show.type, language: show.language });
      return acc;
    }, {})
  : {};


  return (
    <div>
      <Select
        value={selectedCinema}
        onChange={handleCinemaChange}
        options={cinemaOptions}
        placeholder="Seleccione un cine"
        isClearable
        className="text-black mb-5"
      />

      {cinemaHorarios && (
        <div>
          <Select
            value={selectedDay}
            onChange={handleDayChange}
            options={days}
            placeholder="Seleccione un día"
            isClearable
            className="text-black mb-5"
          />

          <div>
            {horariosForDay && horariosForDay.length > 0 ? (
              <>
                {Object.keys(groupedHorarios).map((key) => (
                  <div key={key} className="mt-2">
                    <h3 className="text-lg font-semibold">{key}</h3>
                    <div className="flex flex-wrap">
                      {groupedHorarios[key].map((horario, index) => (
                        <button key={index} className={`m-2 px-4 py-2 border ${selectedTime === horario.time ? 'bg-primary-color text-black rounded-lg' : 'bg-[#161616] text-white rounded-lg'}`} onClick={() => handleTimeSelect(horario.time, horario.type, horario.language)}>{horario.time}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>No hay funciones disponibles.</p>
            )}
          </div>
        </div>
      )}

      <button onClick={handleShowModal} disabled={!selectedTime} className={`mt-5 px-4 py-2 border rounded-lg ${selectedTime ? 'bg-primary-color text-black' : 'bg-secondary-color text-black cursor-not-allowed'}`}>Confirmar horario</button>

      <Modal
        show={showModal}
        onClose={handleCloseModal}
        selectedCinema={selectedCinema}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        selectedType={selectedType}
        selectedLanguage={selectedLanguage}
        movieTitle={movieTitle}
        movieImage={movieImage}
      />
    </div>
  );
}

export default Dates;