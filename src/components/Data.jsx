export const news = [
  { image: "/assets/cine.jpg", title: "Los mejores cines de Argentina" },
  { image: "/assets/VillanoFav.jpg", title: "Mi Villano Favorito", link: "/mi-villano-favorito-4" },
  { image: "/assets/LugarEnSilencio.jpg", title: "Un Lugar en Silencio: Día uno", link: "/un-lugar-en-silencio-dia-uno" },
  { image: "/assets/personasCine.webp", title: "Una salida perfecta" },
  { image: "/assets/popcorns.jpg", title: "Los mejores combos y promociones", link: "/candybar" }
];

export const SwiperSliderData = [
  { name: "Darth Vader", backgroundImage: "/assets/estatuadarthvader.png" },
  { name: "Yoda", backgroundImage: "/assets/estatuayoda.png" },
  { name: "Elsa", backgroundImage: "/assets/estatuaelsa.png" },
  { name: "Gomitas", backgroundImage: "/assets/gomitas.png" },
  { name: "Combo Nachos", backgroundImage: "/assets/combonachos.png" },
  { name: "Pochoclos", backgroundImage: "/assets/baldePochoclo.png" }
];

export const promociones = [
  { id: 1, imagen: '/favicon.png', titulo: 'General', entradas: 1, cantidad: 1, descripcion: 'Válido por 1 entrada a precio general.', precio: 8900 },
  { id: 2, imagen: '/assets/amex.png', titulo: 'Entradas 50% OFF', entradas: 1, cantidad: 1, descripcion: 'Válido para tarjetas AMEX emitidas por American Express S.A.', precio: 4450 },
  { id: 3, imagen: '/assets/365.png', titulo: 'Promociones 2x1', entradas: 2, cantidad: 1, descripcion: '2x1 Salas 2D, 3D, XD y Comfort - Válido de Lunes a Domingo con tarjeta Clarin 365.', precio: 8900 },
  { id: 4, imagen: '/assets/bbva.jpg', titulo: 'Promociones 2x1 y 20% off en productos del Candy', entradas: 2, cantidad: 1, descripcion: '2x1 Salas Comfort y 4D - Válido de Lunes a Sábados con tarjetas BBVA débito y crédito.', precio: 8900, candyOff: 0.20 },
  { id: 5, imagen: '/favicon.png', titulo: 'Family Pack', entradas: 4, cantidad: 1, descripcion: '4 entradas a precio especial y 25% OFF en el combo familiar de pochoclos.', precio: 16000, candyOff: 0.25 },
  { id: 7, imagen: '/favicon.png', titulo: 'Super Combo 3D', entradas: 3, cantidad: 1, descripcion: '3 entradas para cualquier película en 3D + 20% OFF en el Candy', precio: 13350, candyOff: 0.20 },
  { id: 8, imagen: '/favicon.png', titulo: 'Entrada y Snacks', entradas: 1, cantidad: 1, descripcion: '1 entrada + 10% OFF en cualquier producto del Candy.', precio: 8900, candyOff: 0.10 },
  { id: 9, imagen: '/favicon.png', titulo: 'Día del Espectador', entradas: 1, cantidad: 1, descripcion: 'Precio especial los días miércoles. No incluye Candybar.', precio: 3500 },
];

export const candyOptions = [
  { id: 10, name: 'Combo de Pochoclos + golosina', price: 17900, backgroundImage: '/assets/ComboPochoclos.png', content: '1 paquete de pochoclos + 2 gaseosas grandes + 1 recarga de cada gaseosa + 1 golosina sin eleccion (recargas hasta las 00:00 y 2:00 AM dias con trasnoche)' },
  { id: 11, name: 'Combo Familiar', price: 29800, backgroundImage: '/assets/comboFamiliar.png', content: '2 Baldes de pochoclos + 4 gaseosas medianas. Imagen a modo ilustrativo.' },
  { id: 12, name: 'Combo Individual mediano', price: 10299, backgroundImage: '/assets/combopochoclo.png', content: '1 paquete de pochoclos + 1 gaseosa mediana + 1 recarga de gaseosa. (recargas hasta las 00:00 y 2:00 AM dias con trasnoche) Imagen a modo ilustrativo.' },
  { id: 13, name: 'Combo Balde Individual ', price: 14499, backgroundImage: '/assets/comboBalde.png', content: '1 balde de pochoclos + 1 gaseosa grande + 1 recarga de gaseosa. (recargas hasta las 00:00 y 2:00 AM dias con trasnoche) Imagen a modo ilustrativo.' },
  { id: 14, name: 'Combo Balde duo', price: 16499, backgroundImage: '/assets/comboBaldeduo.png', content: '1 balde de pochoclos + 2 gaseosas medianas + 1 recarga de gaseosa. (recargas hasta las 00:00 y 2:00 AM dias con trasnoche) Imagen a modo ilustrativo.' },
  { id: 15, name: 'Combo Hamburguesa + papas', price: 15499, backgroundImage: '/assets/comboHamburguesa.png', content: '1 balde de pochoclos + 1 gaseosa grande + 1 recarga de gaseosa. (recargas hasta las 00:00 y 2:00 AM dias con trasnoche) Imagen a modo ilustrativo.' },
  { id: 16, name: 'Combo Nachos', price: 8999, backgroundImage: '/assets/comboNachos.png', content: 'Nachos con queso + 1 gaseosa grande. Imagen a modo ilustrativo.' },
  { id: 17, name: 'Combo Nuggets', price: 8999, backgroundImage: '/assets/comboNuggets.png', content: 'Porcion de 12 unidades + 1 gaseosa grande. Imagen a modo ilustrativo.' },
  { id: 18, name: 'Combo Pancho', price: 8999, backgroundImage: '/assets/comboPancho.png', content: '1 Pancho + 1 gaseosa grande. Imagen a modo ilustrativo.' },
];

export const otherOptions = [
  { id: 19, name: 'Balde de Pochoclos', price: 13900, backgroundImage: '/assets/baldepochoclos.png', content: '1 Balde de pochoclos. Imagen a modo ilustrativo.' },
  { id: 20, name: 'Pochoclos', price: 8900, backgroundImage: '/assets/Pochoclo.png', content: '1 Paquete de pochoclos mediana. Imagen a modo ilustrativo.' },
  { id: 21, name: 'Gaseosa', price: 4900, backgroundImage: '/assets/gaseosa.png', content: '1 gaseosa de 550 ml a elección. Imagen a modo ilustrativo.' },
  { id: 22, name: 'Papas Fritas', price: 4000, backgroundImage: '/assets/Papas.png', content: '1 Papas grandes. Imagen a modo ilustrativo.' },
  { id: 23, name: 'Pancho', price: 4500, backgroundImage: '/assets/pancho.png', content: '1 Pancho. Imagen a modo ilustrativo.' },
  { id: 24, name: 'Nachos', price: 6500, backgroundImage: '/assets/Nachos.png', content: '1 Pote de nachos + salsa a elección. Imagen a modo ilustrativo.' },
  { id: 25, name: 'Nuggets', price: 6500, backgroundImage: '/assets/Nuggets.png', content: '1 Pack de patitas x8. Imagen a modo ilustrativo.' },
];

export const gummyOptions = [
  { id: 26, name: 'Gomitas azucaradas', price: 4500, backgroundImage: '/assets/gomitas.png', content: 'Gomitas multisabor 220g' },
  { id: 27, name: 'Gomitas Random', price: 5000, backgroundImage: '/assets/gummies.webp', content: 'Gomitas random' },
  { id: 28, name: 'Mogul Moras', price: 5500, backgroundImage: '/assets/MogulMoras.png', content: 'Mogul Moras jugosas' },
  { id: 29, name: 'Haribo Goldbears', price: 6000, backgroundImage: '/assets/haribo.png', content: 'Ositos de gomita' },
  { id: 30, name: 'Rockets', price: 2500, backgroundImage: '/assets/rocklets.png', content: 'Rocklets 150g' },
  { id: 31, name: 'M&M', price: 3700, backgroundImage: '/assets/m&m.png', content: 'M&M´s 220g' },
];

export const toysOptions = [
  { id: 32, name: 'Figura Darth Vader', price: 25000, backgroundImage: 'assets/estatuadarthvader.png', content: 'Figura coleccionable de Darth Vader.' },
  { id: 33, name: 'Figura Elsa', price: 25000, backgroundImage: 'assets/estatuaelsa.png', content: 'Figura coleccionable de Elsa.' },
  { id: 34, name: 'Figura Iron Man', price: 25000, backgroundImage: 'assets/estatuaironman.png', content: 'Figura coleccionable de Iron Man.' },
  { id: 35, name: 'Figura Mickey', price: 25000, backgroundImage: 'assets/estatuamickey.png', content: 'Figura coleccionable de Mickey.' },
  { id: 36, name: 'Figura Woody', price: 25000, backgroundImage: 'assets/estatuawoody.png', content: 'Figura coleccionable de Woody.' },
  { id: 37, name: 'Figura Yoda', price: 25000, backgroundImage: 'assets/estatuayoda.png', content: 'Figura coleccionable de Yoda.' },
  { id: 38, name: 'Taza Mandalorian', price: 15000, backgroundImage: 'assets/tazamandalorian.png', content: 'Taza diseño Mandalorian' },
  { id: 39, name: 'Pack Tazas Star Wars', price: 27000, backgroundImage: 'assets/tazas.png', content: 'Pack de tazas Star Wars' },
  { id: 40, name: 'Figura Yoda', price: 36900, backgroundImage: 'assets/termosstarwars.png', content: 'Pack de Termos Star Wars' },
];

