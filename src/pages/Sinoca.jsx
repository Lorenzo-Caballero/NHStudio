import React, { useState, useEffect } from 'react';

const API_BASE = 'https://gestoradmin.store/index.php';

export default function GestionarDatos() {
  const [empleadoNombre, setEmpleadoNombre] = useState('');
  const [billetera, setBilletera] = useState({ cbu: '', servicio: '', titular: '' });
  const [mensaje, setMensaje] = useState('');
  const [empleados, setEmpleados] = useState([]);

  const crearEmpleado = async () => {
    try {
      const res = await fetch(`${API_BASE}?recurso=empleados`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          nombre: empleadoNombre,
        }),
      });

      const data = await res.json();
      setMensaje(data.message || 'Empleado creado');
      setEmpleadoNombre('');
      obtenerEmpleados();
    } catch (err) {
      console.error(err);
      setMensaje('Error al crear empleado');
    }
  };

  const crearBilletera = async () => {
    try {
      const res = await fetch(`${API_BASE}?recurso=billeteras`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(billetera),
      });

      const data = await res.json();
      setMensaje(data.message || 'Billetera creada');
      setBilletera({ cbu: '', servicio: '', titular: '' });
    } catch (err) {
      console.error(err);
      setMensaje('Error al crear billetera');
    }
  };

  const obtenerEmpleados = async () => {
    try {
      const res = await fetch(`${API_BASE}?recurso=empleados`);
      const data = await res.json();
      setEmpleados(data || []);
    } catch (err) {
      console.error(err);
      setMensaje('Error al obtener empleados');
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl space-y-8">
        {/* Crear Empleado */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Crear Empleado</h2>
          <input
            type="text"
            placeholder="Nombre del empleado"
            value={empleadoNombre}
            onChange={(e) => setEmpleadoNombre(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            onClick={crearEmpleado}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Crear Empleado
          </button>
        </div>

        {/* Listado de Empleados */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Empleados Registrados</h2>
          {empleados.length > 0 ? (
            <ul className="space-y-2">
              {empleados.map((emp) => (
                <li key={emp.id} className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
                  {emp.nombre}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay empleados.</p>
          )}
        </div>

        {/* Crear Billetera */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Crear Billetera</h2>
          <input
            type="text"
            placeholder="CBU"
            value={billetera.cbu}
            onChange={(e) => setBilletera({ ...billetera, cbu: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <input
            type="text"
            placeholder="Servicio"
            value={billetera.servicio}
            onChange={(e) => setBilletera({ ...billetera, servicio: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <input
            type="text"
            placeholder="Titular"
            value={billetera.titular}
            onChange={(e) => setBilletera({ ...billetera, titular: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            onClick={crearBilletera}
            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
          >
            Crear Billetera
          </button>
        </div>

        {/* Mensaje */}
        {mensaje && (
          <div className="text-center text-sm text-green-700 bg-green-100 border border-green-300 rounded-xl p-3">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}
