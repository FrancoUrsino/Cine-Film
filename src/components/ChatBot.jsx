import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import botAvatar from '../assets/chatbot.avif';
import userAvatar from '../assets/chatuser.webp';
import { Link } from 'react-router-dom';


const theme = {
  background: '#202020',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#bfced8',
  headerFontColor: '#161616',
  headerFontSize: '15px',
  botBubbleColor: '#bfced8',
  botFontColor: '#161616',
  userBubbleColor: '#ecf4f6',
  userFontColor: '#161616',
};

const steps = [
  {
    id: '1',
    message: 'Hola! Soy tu asistente virtual.¿Cuál es tu nombre?',
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: '¿Cómo puedo ayudarte hoy {previousValue}?',
    trigger: '4',
  },
  {
    id: '4',
    options: [
      { value: 'faq', label: 'Preguntas frecuentes', trigger: 'faq' },
      { value: 'informacion', label: 'Necesito información', trigger: 'informacion' },
      { value: 'cartelera', label: 'Peliculas en cartelera', trigger: 'cartelera' },
    ],
  },
  {
    id: 'faq',
    message: 'Claro que si! ¿Cuál es tu inquietud?',
    trigger: 'faqOpciones',
  },
  {
    id: 'faqOpciones',
    options: [
      { value: 'compraDeEntradas', label: '¿Es necesario registrarse para realizar una compra?', trigger: 'registrarse' },
      { value: 'devoluciones', label: '¿Se puede cancelar una compra ya realizada?', trigger: 'devoluciones' },
      { value: 'cartelera', label: 'Peliculas en cartelera', trigger: 'cartelera' },
      { value: 'volver al principio', label: 'volver al principio', trigger: '3' },
    ],
  },
  {
    id: 'registrarse',
    message: 'Si, es necesario registrarse para realizar el proceso de compra. Si bien se puede navegar libremente por la web para visualizar todo el contenido, si no estás con tu sesion iniciada no podes finalizar la compra',
    trigger: 'registrarseLink',
  },
  {
    id: 'registrarseLink',
    component: (
      <div>
        <p>Puedes registrarte haciendo clic en el siguiente enlace:</p>
        <Link to="/inicio-de-sesion">
          <button className="btn btn-primary text-primary-color">Registrarse</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'faqOpciones2',
    message: '¿Tienes alguna otra duda/consulta',
    trigger: 'faqRespuestas',
  },
  {
    id: 'faqRespuestas',
    options: [
      { value: 'si', label: 'Si', trigger: 'faqOpciones' },
      { value: 'no', label: 'No', trigger: 'fin' },
    ],
  },
  {
    id: 'fin',
    message: 'Un placer haberte podido ayudar',
    end: true,
  },
  {
    id: 'devoluciones',
    message: 'No, estamos trabajando en eso pero de momento no se pueden hacer devoluciones',
    trigger: 'faqOpciones2',
  },
  {
    id: 'cartelera',
    message: 'Actualmente en cartelera están disponibles las siguientes peliculas:',
    trigger: 'carteleraOpciones',
  },
  {
    id: 'carteleraOpciones',
    options: [
      { value: 'Mi Villano Favorito 4', label: 'Mi Villano Favorito 4', trigger: 'peli1' },
      { value: 'Un Lugar en Silencio: Dia uno', label: 'Un Lugar en Silencio: Dia uno', trigger: 'peli2' },
      { value: 'Deadpool & Wolverine', label: 'Deadpool & Wolverine', trigger: 'peli3' },
      { value: 'Intensamente 2', label: 'Intensamente 2', trigger: 'peli4' },
      { value: 'El Ultimo Conjuro', label: 'El Ultimo Conjuro', trigger: 'peli5' },
      { value: 'Garfield: Fuera de Casa', label: 'Garfield: Fuera de Casa', trigger: 'peli6' },
      { value: 'Super Mario Bros: La Pelicula', label: 'Super Mario Bros: La Pelicula', trigger: 'peli7' },
      { value: 'Tarot de la Muerte', label: 'Tarot de la Muerte', trigger: 'peli8' },
      { value: 'Kung Fu Panda 4', label: 'Kung Fu Panda 4', trigger: 'peli9' },
      { value: 'Tornados', label: 'Tornados', trigger: 'peli10' },
      { value: 'Beekeeper: Sentencia de Muerte', label: 'Beekeeper: Sentencia de Muerte', trigger: 'peli11' },
      { value: 'El Planeta de los simios: Nuevo Reino', label: 'El Planeta de los simios: Nuevo Reino', trigger: 'peli12' },
      { value: 'Wish', label: 'Wish', trigger: 'peli13' },
      { value: 'Godzilla y Kong: El nuevo Imperio', label: 'Godzilla y Kong: El nuevo Imperio', trigger: 'peli14' },
      { value: 'Mufasa: El Rey Leon', label: 'Mufasa: El Rey Leon', trigger: 'peli15' },
      { value: 'Venom: El Ultimo Baile', label: 'Venom: El Ultimo Baile', trigger: 'peli16' },
      { value: 'El Cuervo', label: 'El Cuervo', trigger: 'peli17' },
      { value: 'Robot Salvaje', label: 'Robot Salvaje', trigger: 'peli18' },
    ],
  },
  {
    id: 'peli1',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/mi-villano-favorito-4">
          <button className="btn btn-primary text-primary-color">Mi villano favorito 4</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli2',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/un-lugar-en-silencio-dia-uno">
          <button className="btn btn-primary text-primary-color">Un Lugar en Silencio: Dia uno</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli3',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/deadpool-&-wolverine">
          <button className="btn btn-primary text-primary-color">Deadpool & Wolverine</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli4',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/intensamente-2">
          <button className="btn btn-primary text-primary-color">Intensamente 2</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli5',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/el-ultimo-conjuro">
          <button className="btn btn-primary text-primary-color">El Ultimo Conjuro</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli6',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="garfield-fuera-de-casa">
          <button className="btn btn-primary text-primary-color">Garfield: Fuera de Casa</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli7',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/super-mario-bros-la-pelicula">
          <button className="btn btn-primary text-primary-color">Super Mario Bros: La Pelicula</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli8',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/tarot-de-la-muerte">
          <button className="btn btn-primary text-primary-color">Tarot de la Muerte</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli9',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/kung-fu-panda-4">
          <button className="btn btn-primary text-primary-color">Kung Fu Panda 4</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli10',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/tornados">
          <button className="btn btn-primary text-primary-color">Tornados</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli11',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/beekeeper-sentencia-de-muerte">
          <button className="btn btn-primary text-primary-color">Beekeeper: Sentencia de Muerte</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli12',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/el-planeta-de-los-simios-nuevo-reino">
          <button className="btn btn-primary text-primary-color">El Planeta de los simios: Nuevo Reino</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli13',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/wish">
          <button className="btn btn-primary text-primary-color">Wish</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli14',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/godzilla-y-kong-el-nuevo-imperio">
          <button className="btn btn-primary text-primary-color">Godzilla y Kong: El nuevo Imperio</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli15',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/mufasa-el-rey-leon">
          <button className="btn btn-primary text-primary-color">Mufasa: El Rey Leon</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli16',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/venom-el-ultimo-baile">
          <button className="btn btn-primary text-primary-color">Venom: El Ultimo Baile</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli17',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/el-cuervo">
          <button className="btn btn-primary text-primary-color">El Cuervo</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'peli18',
    component: (
      <div>
        <p>Tocá acá abajo para ver el trailer y funciones</p>
        <Link to="/robot-salvaje">
          <button className="btn btn-primary text-primary-color">Robot Salvaje</button>
        </Link>
      </div>
    ),
    trigger: 'faqOpciones2',
  },
  {
    id: 'informacion',
    message: 'Claro, ¿qué información necesitas?',
    trigger: 'infoOpciones',
  },
  {
    id: 'infoOpciones',
    options: [
      { value: 'promociones bancarias', label: 'promociones bancarias', trigger: 'promos' },
      { value: 'tipos de salas', label: 'tipos de salas', trigger: 'salas' },
      { value: 'maximo de entradas', label: 'maximo de entradas', trigger: 'entradas' },
      { value: 'volver al principio', label: 'volver al principio', trigger: '3' },
    ],
  },
  {
    id: 'promos',
    message: 'Actualmente contamos con las siguientes promociones bancarias:',
    trigger: 'promosOpciones',
  },
  {
    id: 'promosOpciones',
    options: [
      { value: '50% off con tarjetas AMEX', label: '50% off con tarjetas AMEX', trigger: 'promosOpciones2' },
      { value: '2x1 en entradas con tarjeta Clarin 365', label: '2x1 en entradas con tarjeta Clarin 365', trigger: 'promosOpciones2' },
      { value: 'ver todas las promos', label: 'ver todas las promos', trigger: 'verPromos' },
    ],
  },
  {
    id: 'verPromos',
    component: (
      <div>
        <p>Tocando debajo podes ver todas las promociones:</p>
        <Link to="/promociones">
          <button className="btn btn-primary text-primary-color">click acá</button>
        </Link>
      </div>
    ),
    trigger: 'promosOpciones2',
  },
  {
    id: 'promosOpciones2',
    message: '¿Tienes alguna otra duda/consulta',
    trigger: 'promosRespuestas',
  },
  {
    id: 'promosRespuestas',
    options: [
      { value: 'si', label: 'Si', trigger: 'infoOpciones' },
      { value: 'no', label: 'No', trigger: 'fin' },
    ],
  },
  {
    id: 'salas',
    component: (
      <div>
        <p>Tocando debajo podes ver todas las salas:</p>
        <Link to="/formatos">
          <button className="btn btn-primary text-primary-color">click acá</button>
        </Link>
      </div>
    ),
    trigger: 'promosOpciones2',
  },
  {
    id: 'entradas',
    message: 'Actualmente se pueden comprar hasta 8 entradas en una sola compra.',
    trigger: 'promosOpciones2',
  },
];

function HelperBot() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ChatBot
          steps={steps}
          floating={true}
          botAvatar={botAvatar}
          userAvatar={userAvatar}
        />
      </div>
    </ThemeProvider>
  );
}

export default HelperBot;
