import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../DB/Firebase';
import { setDoc, doc } from 'firebase/firestore';

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          setError('Las contraseñas no coinciden.');
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(firestore, 'users', user.uid), {
          email: user.email,
          username: name,
        });
        console.log('Usuario registrado y documento creado en Firestore');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate(-1);
    } catch (error) {
      console.error('Error en la autenticación:', error);
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Correo electrónico no válido.');
          break;
        case 'auth/user-disabled':
          setError('Esta cuenta ha sido deshabilitada.');
          break;
        case 'auth/user-not-found':
          setError('No se encontró una cuenta con este correo electrónico.');
          break;
        case 'auth/wrong-password':
          setError('Contraseña incorrecta.');
          break;
        case 'auth/email-already-in-use':
          setError('Este correo electrónico ya está en uso.');
          break;
        case 'auth/weak-password':
          setError('La contraseña es demasiado débil.');
          break;
        default:
          setError('Ocurrió un error. Por favor, inténtelo de nuevo.');
      }
    }
  };

  const handleToggleForm = (e) => {
    e.preventDefault();
    setIsRegistering(!isRegistering);
    setError('');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen relative mx-auto">
      <div
        className={`flex-1 hidden lg:flex items-center justify-center bg-cover bg-center transition-transform duration-500 ease-in-out ${
          isRegistering ? 'lg:translate-x-full' : 'lg:translate-x-0'
        }`}
        style={{ backgroundImage: "url('../assets/cine.jpg')" }}
      ></div>
      <div
        className={`flex-1 flex items-center justify-center p-8 transition-transform duration-500 ease-in-out ${
          isRegistering ? 'lg:-translate-x-full' : 'lg:translate-x-0'
        }`}
      >
        <div className="max-w-md w-full space-y-8 text-foreground">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold">{isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}</h2>
            <p className="mt-2 text-sm">{isRegistering ? '¡Bienvenido!' : '¡Hola de nuevo!'}</p>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {isRegistering && (
              <div>
                <label htmlFor="name" className="sr-only">Nombre de Usuario</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-third-color placeholder-secondary-color text-third-color rounded-t-md focus:outline-none focus:ring-primary-color focus:border-primary-color focus:z-10 sm:text-sm"
                  placeholder="Nombre de usuario"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-third-color placeholder-secondary-color text-third-color focus:outline-none focus:ring-primary-color focus:border-primary-color focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-third-color placeholder-secondary-color text-third-color focus:outline-none focus:ring-primary-color focus:border-primary-color focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={handleTogglePassword}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </span>
            </div>
            {isRegistering && (
              <div className="relative">
                <label htmlFor="confirm-password" className="sr-only">Repetir contraseña</label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-third-color placeholder-secondary-color text-third-color rounded-b-md focus:outline-none focus:ring-primary-color focus:border-primary-color focus:z-10 sm:text-sm"
                  placeholder="Repetir contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-primary-color focus:ring-primary-color border-third-color rounded" />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-third-color">Mantener sesión iniciada</label>
              </div>
              {!isRegistering && (
                <div className="text-sm">
                  <Link to="" className="font-medium text-primary-color hover:text-secondary-color">¿Olvidaste tu contraseña?</Link>
                </div>
              )}
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-primary-color hover:bg-third-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color">
                {isRegistering ? 'Registrarse' : 'Iniciar sesión'}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <Link to="" onClick={handleToggleForm} className="text-sm text-primary-color hover:text-secondary-color">
              {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : "¿Todavía no tienes una cuenta? Regístrate"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
