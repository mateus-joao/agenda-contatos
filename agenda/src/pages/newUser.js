
import { useState } from "react";

const NewUser = ({setErro, setUser}) => {
  const [nome, setNewNome] = useState("");
  const [senha, setNewSenha] = useState("");
  const newUserSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:3001/api/users/newUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, senha}),
        });
        if(res.ok){
          const data = await res.json();
          localStorage.setItem("usuario", JSON.stringify(data));
          setUser(data);
        }else{
          const data = await res.json();
          setErro(data.error);
        }
        
  }    
  return (
    
    <div>
        <form className="userForm" onSubmit={newUserSubmit}>
            <input onChange={(e)=> {setNewNome(e.target.value)}} value={nome} placeholder="Nome" />
            <input onChange={(e) => setNewSenha(e.target.value)}value={senha} placeholder="Senha" type="password"/>
            <button type="Submit" >Enviar</button>
        </form>
     
    </div>
  )
}

export default NewUser