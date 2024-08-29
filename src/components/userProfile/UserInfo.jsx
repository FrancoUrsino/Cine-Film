import React, { useState, useEffect } from 'react';

function UserInfo({ user, onSave, onCancel, isEditing, handleEdit, onSignOut }) {
  const [image, setImage] = useState(user.profileImage || '/default-profile.png');
  const [formData, setFormData] = useState({ ...user });

  useEffect(() => {
    setImage(user.profileImage || '/default-profile.png');
    setFormData({ ...user });
  }, [user]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setFormData({ ...formData, profileImage: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div>
      <div className="mt-6 flex flex-col items-center">
        <div className="mb-4">
          <img
            src={image}
            alt="Profile"
            className="w-32 h-32 rounded-full border"
          />
        </div>
        {isEditing && (
          <input
            type="file"
            onChange={handleImageChange}
            className="py-2 px-4 bg-secondary-color text-black rounded hover:bg-third-color"
          />
        )}
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center">
          <div className="text-lg">
            <p><strong>Nombre de Usuario:</strong><input type="text" name="username" value={formData.username} onChange={handleChange} className="ml-2 bg-third-color" /></p>
            <p><strong>Nombre:</strong><input type="text" name="name" value={formData.name} onChange={handleChange} className="ml-2 bg-third-color" /></p>
            <p><strong>Apellido:</strong><input type="text" name="surname" value={formData.surname} onChange={handleChange} className="ml-2 bg-third-color" /></p>
            <p><strong>DNI:</strong><input type="text" name="dni" value={formData.dni} onChange={handleChange} className="ml-2 bg-third-color" /></p>
            <p><strong>Email:</strong><input type="email" name="email" value={formData.email} onChange={handleChange} className="ml-2 bg-third-color" /></p>
            <p><strong>Teléfono:</strong><input type="text" name="phone" value={formData.phone} onChange={handleChange} className="ml-2 bg-third-color" /></p>
            <p><strong>Dirección:</strong><input type="text" name="address" value={formData.address} onChange={handleChange} className="ml-2 bg-third-color" /></p>
            <p><strong>Ciudad:</strong><input type="text" name="city" value={formData.city} onChange={handleChange} className="ml-2 bg-third-color" /></p>
            <p><strong>Provincia:</strong><input type="text" name="province" value={formData.province} onChange={handleChange} className="ml-2 bg-third-color" /></p>
            <p><strong>Código Postal:</strong><input type="text" name="cp" value={formData.cp} onChange={handleChange} className="ml-2 bg-third-color" /></p>
          </div>
          <button type="submit" className="mt-4 py-2 px-4 bg-primary-color text-black rounded hover:bg-secondary-color">Guardar</button>
          <button type="button" onClick={onCancel} className="mt-4 py-2 px-4 bg-primary-color text-black rounded hover:bg-secondary-color">Cancelar</button>
        </form>
      ) : (
        <div className="mt-6 flex flex-col items-center">
          <div className="text-lg">
            <p><strong>Nombre de Usuario:</strong> {user.username}</p>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Apellido:</strong> {user.surname}</p>
            </div>
            <p><strong>Email:</strong> {user.email}</p>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
            <p><strong>Teléfono:</strong> {user.phone}</p>
            <p className='pl-2'><strong>DNI:</strong> {user.dni}</p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
            <p><strong>Provincia:</strong> {user.province}</p>
            <p><strong>Ciudad:</strong> {user.city}</p>
            </div>
            <p><strong>Dirección:</strong> {user.address}</p>
            <p><strong>Código Postal:</strong> {user.cp}</p>
          </div>
          <button onClick={handleEdit} className="mt-4 py-2 px-4 bg-primary-color text-black rounded hover:bg-secondary-color">Editar</button>
          <button onClick={onSignOut} className="mt-4 py-2 px-4 bg-primary-color text-black rounded hover:bg-secondary-color">Cerrar Sesión</button>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
