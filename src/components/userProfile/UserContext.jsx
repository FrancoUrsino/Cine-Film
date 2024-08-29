import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore } from '../DB/Firebase';
import { doc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(firestore, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("Datos del usuario:", userData);
            setUser(userData);
          } else {
            console.error("No se encontraron datos de usuario!");
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      } else {
        console.log("No hay usuario autenticado");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
