
const contactosAgendas = {};

let user = "";
contactosAgendas.getAllContactos = async (elUsuario) => {
  user = elUsuario;
  try {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts`)
    const data = await response.json();
    if( data.contacts.length===0){
      //si el usuario no tiene contactos devuelve cero para que se inicie de nuevo el fetchData hasta encontrar un usuario que si tenga contactos
      return 0
      
    }
    console.log("estas son las agendas : " + data)

    return data;

  } catch (error) {
    console.log("error es : " + error)
  }
}


contactosAgendas.getAgenda = async () => {
  
  try {
    const response = await fetch("https://playground.4geeks.com/contact/agendas?offset=0&limit=100")
    const data = await response.json();


    console.log("estas son las agendas : " + data)

    if(!response.ok){
      throw new Error("este es el error". error)
      
    }

    return {data};

  } catch (error) {
    console.log("error es : " + error)
  }
}



// En serviciosAgendas.js
contactosAgendas.createContact = async (contactData) => {
  try {
                      
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    // Verificar si la respuesta fue exitosa (código 2xx)
    if (!response) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Devuelve directamente la respuesta en formato JSON
    return await response.json();
  } catch (error) {
    console.error("Error en la creación del contacto:", error);
    throw error;  // Relanzar el error para que el controlador en el componente lo maneje
  }
};


contactosAgendas.deleteContact = async (contacto) => {
  try {
    debugger
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts/${contacto.id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      
    });
    // Verificar si la respuesta fue exitosa (código 2xx)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Devuelve directamente la respuesta en formato JSON
    return await response;
  } catch (error) {
    console.error("Error en la creación del contacto:", error);
    throw error;  // Relanzar el error para que el controlador en el componente lo maneje
  }
};




contactosAgendas.editarContact = async (contacto) => {
  try {
    
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/pepe/contacts/${contacto.id}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contacto),
    });

    // Verificar si la respuesta fue exitosa (código 2xx)
    if (!response) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Devuelve directamente la respuesta en formato JSON
    return await response.text();
  } catch (error) {
    console.error("Error en la creación del contacto:", error);
    throw error;  // Relanzar el error para que el controlador en el componente lo maneje
  }
};

export default contactosAgendas;