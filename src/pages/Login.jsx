import React, { useState } from "react";
import { motion } from 'framer-motion';
import { FiLogIn } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../components/context/AuthContext";
import TheSpinner from "../layout/TheSpinner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: .3 }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut' }
  }
};

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://dimgrey-gnu-703361.hostingersite.com/index.php?recurso=clientes&login=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });


      const data = await response.json();
console.log("data",data)
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.email);
        localStorage.setItem("admin","true");
        localStorage.setItem("id", data.id);
        localStorage.setItem("isAuthenticated", "true");

        login(data.email, data.rol);
        navigate('/');
      } else {
        alert(data.message || "Credenciales incorrectas.");
      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="w-[80%] mx-auto mt-40 mb-52"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-[320px] sm:w-[400px] rounded shadow-xl border-2 border-solid px-4 sm:px-8 py-20 mx-auto">
        <h2 className="text-3xl uppercase tracking-wider font-bold text-center mb-12 select-none">
          <span className="text-[#4779a4]">NH</span>
          <span className="text-[#2c3e50]">Studio</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <InputField
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <SubmitButton loading={loading} />
        </form>
        <p className="text-center text-[#4779a4] mt-6">¿Aún no tienes una cuenta? <Link to='/register' className="text-primary">¡Regístrate !</Link></p>
      </div>
    </motion.div>
  );
};

const InputField = ({ type, name, placeholder, value, onChange, required }) => (
  <div className="mb-6">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
      required={required}
    />
  </div>
);

const SubmitButton = ({ loading }) => (
  <button
    type="submit"
    className="px-4 py-2 block mt-3 ml-auto text-white bg-primary border border-primary rounded-md hover:bg-opacity-80"
    disabled={loading}
  >
    {loading ? <TheSpinner /> : <><FiLogIn className="inline-block text-xl -mt-1 mr-1" />Login</>}
  </button>
);

export default Login;
