import {useState} from "react";

function Login({setUser, setError}) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const handleLoginSubmit = async (e) =>{
        e.preventDefault();
        const res = await fetch("http://localhost:3001/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userName, password }),
        });
        if(res.ok){
            const data = await res.json();
            localStorage.setItem("usuario", JSON.stringify(data));
            setUser(data)
        }else{
            const erro = await res.json()
            setError(erro.error)
        }
        
    }

   
  return (
    <div>
        <form className="userForm" onSubmit={handleLoginSubmit}>
        <input
            onChange={(e)=> { setUserName(e.target.value)} }
            value={userName}
            placeholder="Nome"
            type="text"
        />

        <input
            onChange={(e)=> {setPassword(e.target.value)}}
            value={password}
            placeholder="senha"
            type="password"
        />

        <button type="submit">Entrar</button>
        </form>
    </div>
  );
}

export default Login;