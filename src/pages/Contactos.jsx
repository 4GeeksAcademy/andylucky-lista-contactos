import { Link,useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import contactosAgendas from "../servicios/serviciosAgendas";

export const Contactos = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const [contactoAEliminar, setContactoAEliminar] = useState (null);
  const [usuarioActual, setUsuarioActual] = useState(null);


  useEffect(() => {
    let numero = 0;
    const fetchData = async () => {
      
      
      try {
        const responseAgenda = await contactosAgendas.getAgenda();
        debugger
        const elUsuario = responseAgenda.data.agendas[numero]?.slug;
         setUsuarioActual(elUsuario)
       
      if (!elUsuario) {
        console.error("No se encontró ninguna agenda");
        return;
      }
        dispatch({
          type: "get_agenda",
          payload: { agendas: responseAgenda.data.agendas }
        });

        const responseContactos = await contactosAgendas.getAllContactos(elUsuario);
        if(responseContactos === 0 || responseContactos.contacts.length === 0){
          //si el usuario no tiene contactos se buscan el siguiente usuario de la lista
          numero++
          fetchData()
        }
        else{
          
          dispatch({
            type: "get_contactos",
            payload: { contacts: responseContactos.contacts }
          });
        }
       
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
  
    fetchData();
  }, []);

 

  const handlerDeleteContact = async (contacto) => {
    try {
      await contactosAgendas.deleteContact(contacto); // aseguramos que se haya borrado
  
      const responseContactos = await contactosAgendas.getAllContactos(usuarioActual); // usamos el usuario guardado
  
      dispatch({
        type: "get_contactos",
        payload: { contacts: responseContactos.contacts }
      });
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
    }
  };






  


  const handlerEditar = async (contacto) => {

    try {
      await contactosAgendas.editarContact(contacto); // aseguramos que se haya borrado
      navigate("/addcontact")
      await contactosAgendas.getAllContactos(); // volvemos a obtener los contactos
      
      dispatch({
        type: "get_contactos",
        payload: { contacts: responseContactos.contacts }
      });
      

    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
    }
    
  };


  return (
    <div className="container mt-4">
      	<div className="d-flex justify-content-end">
        <Link to="/addcontact">
						<div className="btn btn-success mb-3">Añade un contacto</div>
				</Link>
        
            </div>
      {store && store?.contacts?.map((contacto) => {
        return <div className="card mb-3" key={contacto.id} style={{ height: "200px" }}>
          <div className="row h-100 g-0">
            <div className="col-auto d-flex align-items-center ps-5">
              <img
                src="https://www.w3schools.com/w3images/avatar2.png"
                className="rounded-circle"
                alt="Foto"
                width="120"
                height="120"
              />
            </div>

            <div className="col d-flex flex-column justify-content-center ps-4">
              <h5 className="mb-1">{contacto.name}</h5>
              <p className="mb-1">{contacto.phone}</p>
              <p className="mb-1">{contacto.email}</p>
              <p className="mb-1">{contacto.address}</p>
              <p className="mb-1">{contacto.id}</p>

            </div>

            <div className="col-2 d-flex justify-content-center align-items-start p-3">

            <i  
             onClick={ () => handlerEditar(contacto)} className="bi bi-pencil me-3 text-secondary" style={{ cursor: "pointer" }}></i>
            <i  
            data-bs-toggle="modal" 
            data-bs-target="#deleteModal" 
            className="bi bi-trash text-secondary"
            onClick={() => setContactoAEliminar(contacto)}
            style={{ cursor: "pointer" }}></i>
            </div>

          </div>
        </div>
        
      }


      )}
         
         <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteModalLabel">Eliminar contacto</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  ¿Estás seguro de que quieres eliminar a <strong>{contactoAEliminar?.name}</strong>?
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => handlerDeleteContact(contactoAEliminar)}
                    
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
</div>
    </div>
  );
};
