import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import contactosAgendas from "../servicios/serviciosAgendas";


export const AddContact = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [elegido, setElegido] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });



  useEffect(() => {

    if (store.contacts_elegido) {
      setElegido(store.contacts_elegido);
      setName(store.contacts_elegido.name || "");
      setEmail(store.contacts_elegido.email || "");
      setPhone(store.contacts_elegido.phone || "");
      setAddress(store.contacts_elegido.address || "");
    }
  }, [store.contacts_elegido]);

  useEffect(() => {

    setElegido({});
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");

  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //si tiene id es que ya ha sido creado, portanto es un edicion
    if (elegido.id) {
      await contactosAgendas.editarContact(elegido);
      navigate("/contactos");

    }
    else {
      await contactosAgendas.createContact(elegido);
      navigate("/contactos");
    }

  };
  return (

    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="form-label fw-bold">Nombre completo</label>
          <input
            type="text"
            value={elegido.name || ""}
            onChange={(e) => {

              setName(e.target.value)
              console.log("pasa por aqui")
              setElegido({
                ...elegido,
                name: e.target.value
              });
            }}
            className="form-control"
            name="name"
            placeholder="Escribe tu nombre completo"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="form-label fw-bold">Correo electrónico</label>
          <input
            type="email"
            value={elegido.email || ""}
            onChange={(e) => {
              setEmail(e.target.value)
              setElegido({
                ...elegido,
                email: e.target.value
              });
            }
            }
            className="form-control"
            name="email"
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="form-label fw-bold">Teléfono</label>
          <input
            type="tel"
            value={elegido.phone || ""}
            onChange={(e) => {
              setPhone(e.target.value)
              setElegido({
                ...elegido,
                phone: e.target.value
              });
            }}
            className="form-control"
            name="phone"
            placeholder="Ej. 600 000 000"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="address" className="form-label fw-bold">Dirección</label>
          <input
            type="text"
            value={elegido.address || ""}
            onChange={(e) => {
              setAddress(e.target.value)
              setElegido({
                ...elegido,
                address: e.target.value
              });
            }}
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
  )

};
