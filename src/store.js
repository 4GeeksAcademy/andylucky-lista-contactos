export const initialStore = () => {
  return {
    responString: null,
    agendas: null,
    // contacts_elegido: []
  }
}


export default function storeReducer(store = initialStore(), action = {}) {
  switch (action.type) {

    case 'get_contactos': {
      const { contacts } = action.payload;
      return {
        ...store,
        contacts
      }
    }
    case 'get_contactos_userid': {
      const { contacts_elegido} = action.payload;
      return {
        ...store,
        contacts_elegido
      }
    }

    case 'get_agenda': {
      
      const { agendas } = action.payload;
      return {
        ...store,
        agendas
      }
    }

    case 'delete_contacto': {
      const { responString } = action.payload;
      return {
        ...store,            // ← asegúrate de copiar bien el estado anterior (no 'contacts')
        responString         // ← esto añadirá o actualizará el campo responString
      };
    }
    default:
      throw Error('Unknown action.');
  }
}
