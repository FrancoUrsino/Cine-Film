import React from 'react';

function UserHistory({ orders }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Historial de Compras</h2>
      {orders.length > 0 ? (
        <ul className="space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {orders.map((order, index) => (
            <li key={index} className="p-4 border rounded">
              <p><strong>Título:</strong> {order.pelicula.titulo ? order.pelicula.titulo : 'No disponible'}</p>
              <div className='flex justify-start gap-2'>
                <p><strong>Día:</strong> {order.dia ? order.dia : 'No disponible'}</p>
                <p><strong>Horario:</strong> {order.horario ? order.horario : 'No disponible'}</p>
              </div>
              <p><strong>Precio Total:</strong> ${order.precio.total ? order.precio.total.toFixed(2) : 'No disponible'}</p>
              <div>
                <p><strong>Total Entradas:</strong> {order.totalEntradas ? order.totalEntradas : 'No disponible'}</p>
                <div><strong>Butacas:</strong>
                  <ul className="list-inside flex justify-start gap-3">
                    {order.asientosSeleccionados && order.asientosSeleccionados.length > 0 ? (
                      order.asientosSeleccionados.map((asiento, idx) => (
                        <li key={idx}>{asiento.asiento}</li>
                      ))
                    ) : (
                      <li>No hay asientos seleccionados en este pedido.</li>
                    )}
                  </ul>
                </div>
              </div>
              <p><strong>Items:</strong></p>
              <ul className="list-disc list-inside">
                {order.candy && order.candy.length > 0 ? (
                  order.candy.map((item, idx) => (
                    <li key={idx}>{item.name} - ${item.price.toFixed(2)}</li>
                  ))
                ) : (
                  <li>No hay items en este pedido.</li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes compras en tu historial.</p>
      )}
    </div>
  );
}

export default UserHistory;