import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import contactosAgendas from "../servicios/serviciosAgendas";

export const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const contactData = { name, email, phone, address };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      debugger
      const response = await contactosAgendas.createContact(contactData);
      if (response) {

        console.log("Nuevo contacto creado:", response);

        // dispatch({
        //   type: "add_contact",  
        //   payload: response,  
        // });

        navigate("/contactos");

      } else {
        console.log("Error al crear el contacto:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="form-label fw-bold">Nombre completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            name="name"
            placeholder="Escribe tu nombre completo"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="form-label fw-bold">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            name="email"
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="form-label fw-bold">Teléfono</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            name="phone"
            placeholder="Ej. 600 000 000"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="address" className="form-label fw-bold">Dirección</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
            name="address"
            placeholder="Calle, número, ciudad"
          />
        </div>

        <div className="d-grid mb-5">
          <button type="submit" className="btn btn-primary btn-lg">Enviar</button>
        </div>
      </form>

      <p>
        <Link to="/contactos">Vuelve a contactos</Link>
      </p>
    </div>
  );
};
