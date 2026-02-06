import AddContact from "../components/addContact" 
import ContactList from "../components/contactList" // backend
import { useEffect, useState } from "react"
import SearchContact from "../components/searchContact" //ok
const Main = ({setError, setUser, user}) => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [contacts, setContacts] = useState([]);
  const [newContactName, setContactName] = useState("");
  const [newContactPhone, setContactPhone] = useState("");
  const [id, setId] = useState(null)
  const handleAddContact = async (e) => {
    e.preventDefault();
    //editar
    if(id){
        const res = await fetch(`http://localhost:3001/api/contacts/${id}/user/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({newContactName, newContactPhone}),
      });
      
      if(res.ok){
        
        setContactName("")
        setContactPhone("")
        setId(null)
        const data = await res.json();
        setContacts(contacts.map(c =>
        c.id === data.id ? { ...c, ...data } : c
    ));
      };
    //addcontato
    }else{
      const res = await fetch(`http://localhost:3001/api/contacts/user/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newContactName, newContactPhone}),
      });
      if(res.ok){
          setContactName("")
          setContactPhone("")

          const data = await res.json();
          setContacts([...contacts, data])
      };
    }
        
    };
  const handleEditContact = (e) =>{
    setId(e.id);
    setContactName(e.name);
    setContactPhone(e.phone);
    
  }
  
  useEffect(() => {
    if (!user?.id) return;
      async function getContacts() {
      try {
        const response = await fetch(`http://localhost:3001/api/contacts/user/${user.id}`);
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Erro ao buscar contatos:", error);
      }
  }

  getContacts();
}, [user?.id]);

  // voltar a tela inicial login/cadastro
  const handleExitUser = (e) => {
    e.preventDefault()
    localStorage.setItem("user", JSON.stringify(""));
    setUser(null)
  }


  //apagando contato
  const handleDeleteContact = async (e) => {

      const res = await fetch(`http://localhost:3001/api/contacts/${e}/user/${user.id}`, {
      method: "DELETE",
    });
    if(res.ok){
      console.log(res)
      setContacts(contacts.filter(c => c.id !== e))

    }else{console.log("error ",res)}
    }

  return (
    
    <div className="mainContainer">
      <div className="userMain">
        <h1>usuario: {user.name}</h1>
        <button onClick={handleExitUser}>sair</button>
      </div>
        <AddContact 
          handleAddContact={handleAddContact}
          newContactName={newContactName}
          newContactPhone={newContactPhone}
          setContactName={setContactName}
          setContactPhone={setContactPhone}
        />
        <SearchContact setSearchTerm={setSearchTerm}/>  
        
        <ContactList
          searchTerm = {searchTerm} 
          handleEditContact={handleEditContact}
          handleDeleteContact={handleDeleteContact}
          contacts={contacts}/>        
    </div>
  )
}

export default Main