import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../components/DB/Firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import Loader from '../components/userProfile/Spinner';
import UserInfo from '../components/userProfile/UserInfo';
import OrderHistory from '../components/userProfile/UserHistory';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate('/inicio-de-sesion');
        return;
      }

      try {
        const userDoc = await getDoc(doc(firestore, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.error("No hay datos para este usuario");
        }

        const ordersCollection = collection(firestore, 'users', currentUser.uid, 'orders');
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersList = ordersSnapshot.docs.map(doc => doc.data());
        setOrders(ordersList);
      } catch (error) {
        console.error("Error! No encontramos tus datos :( ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/inicio-de-sesion');
    }).catch(error => {
      console.error("Error signing out: ", error);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedUser) => {
    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      await updateDoc(doc(firestore, 'users', currentUser.uid), updatedUser);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className='w-full py-44 mx-auto flex justify-center'><Loader /></div>;
  }

  if (!user) {
    return <div className='py-80 text-foreground'>Error para cargar los datos, te pedimos disculpas!.</div>;
  }

  return (
    <div className="min-h-screen px-4 py-14">
      <div className="max-w-7xl mx-auto bg-third-color shadow p-6 rounded-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Datos del perfil</h1>
        </div>
        <div className="flex flex-col">
          <div className="w-fulla">
            <UserInfo user={user} onSave={handleSave} onCancel={() => setIsEditing(false)} isEditing={isEditing} handleEdit={handleEdit} onSignOut={handleSignOut} />
          </div>
          <div>
            <OrderHistory orders={orders} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
