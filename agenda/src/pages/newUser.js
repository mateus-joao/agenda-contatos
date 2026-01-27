
import { useState } from "react";

const NewUser = ({ setError, setUser}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleNewUserSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:3001/api/users/newUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName, password}),
        });
        if(res.ok){
          const data = await res.json();
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        }else{
          const data = await res.json();
          setError(data.error);
        }
        
  }    
  return (
    
    <div>
        <form className="userForm" onSubmit={handleNewUserSubmit}>
            <input onChange={(e)=> {setUserName(e.target.value)}} value={userName} placeholder="Nome" />
            <input onChange={(e) => setPassword(e.target.value)}value={password} placeholder="Senha" type="password"/>
            <button type="Submit" >Enviar</button>
        </form>
     
    </div>
  )
}

export default NewUser