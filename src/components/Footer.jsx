import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/favicon.png'

const Footer = () => {
  return (
    <footer className="bg-[#161616] text-primary-color p-8">
      <hr className='-translate-y-4' />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center md:justify-items-start">
        <div>
          <div className="flex items-center">
            <img src={logo} alt="CineFilm" width={150} />
          </div>
          <div className="flex space-x-4 mt-4">
            <Link to="https://facebook.com" target="_blank">
              <FaFacebook className="text-2xl" />
            </Link>
            <Link to="https://instagram.com" target="_blank">
              <FaInstagram className="text-2xl" />
            </Link>
            <Link to="https://linkedin.com" target="_blank">
              <FaLinkedinIn className="text-2xl" />
            </Link>
            <Link to="https://tiktok.com" target="_blank">
              <FaTiktok className="text-2xl" />
            </Link>
          </div>
        </div>
        <div className='justify-self-center lg:justify-self-end'>
          <h2 className="font-bold text-primary-color text-lg md:text mb-2 md:col-span-2 text-center pt-10 md:pt-8">INFORMACIÓN</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 text-center md:justify-between md:pt-4'>
            <ul className="">
              <li><Link to="/" className="hover:text-third-color font-light pt-1">CINES / PRECIOS</Link></li>
              <li><Link to="/formatos" className="hover:text-third-color font-light pt-1">FORMATOS</Link></li>
              <li><Link to="/" className="hover:text-third-color font-light pt-1">INFORMACION GENERAL</Link></li>
            </ul>
            <ul className="">
              <li><Link to="/info-promociones" className="hover:text-third-color font-light pt-1">PROMOCIONES</Link></li>
              <li><Link to="/" className="hover:text-third-color font-light pt-1">PELICULAS</Link></li>
              <li><Link to="/candybar" className="hover:text-third-color font-light pt-1">CANDY</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
