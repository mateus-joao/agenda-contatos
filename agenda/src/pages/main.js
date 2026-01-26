import NewContato from "../components/newContato"
import Exibir from "../components/exibir"
import { useEffect, useState } from "react"
import Busca from "../components/busca"
const Main = ({setErro, setUser, user}) => {
  const [busca, setBusca] = useState("");
  const [contatos, setContatos] = useState([]);
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [id, setId] = useState(null)
  const agendaSubmit = async (e) => {
    e.preventDefault();
    if(id){
      console.log("editando")
        const res = await fetch(`http://localhost:3001/api/contatos/${user.id}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, numero}),
      });
      
      if(res.ok){
          const data = await res.json();
          setContatos([...data])
      };
        
    }else{
      const res = await fetch(`http://localhost:3001/api/contatos/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, numero}),
      });
      if(res.ok){
          setNome("")
          setNumero("")
          const data = await res.json();
          setContatos([...contatos, data])
      };
    }
        
    };
  const onEdit = (e) =>{
    setId(e.id);
    setNome(e.nome);
    setNumero(e.numero);
    
  }

  useEffect(() => {
    if (!user?.id) return;
      async function buscarContatos() {
      try {
        const response = await fetch(`http://localhost:3001/api/contatos/${user.id}`);
        const data = await response.json();
        setContatos(data);
      } catch (error) {
        console.error("Erro ao buscar contatos:", error);
      }
  }

  buscarContatos();
}, [user?.id]);
  // voltal a tela inicial lagin/cadastro
  const onExit = (e) => {
    e.preventDefault()
    localStorage.setItem("usuario", JSON.stringify(""));
    setUser(null)
  }


  //apagando contato
  const onDelete = async (e) => {
      console.log( "apagando o contato" ,e)
          const res = await fetch(`http://localhost:3001/api/contatos/${user.id}/${e}`, {
      method: "DELETE",
    });
    if(res.ok){
      const data = await res.json();
      setContatos(data)
    }
    }

  return (
    
    <div className="mainContainer">
      <div className="userMain">
        <h1>usuario: {user.nome}</h1>
        <button onClick={onExit}>sair</button>
      </div>
        <NewContato 
          agendaSubmit={agendaSubmit}
          nome={nome}
          numero={numero}
          setNome={setNome}
          setNumero={setNumero}
        />
        <Busca setBusca={setBusca}/>  
        
        <Exibir
          busca = {busca} 
          onEdit={onEdit}
          onDelete={onDelete}
          contatos={contatos}/>        
    </div>
  )
}

export default Main