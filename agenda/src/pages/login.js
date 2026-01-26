import {useState} from "react";

function Login({setUser, setErro}) {
    const [loginNome, setLoginNome] = useState("");
    const [loginsenha, setLoginSenha] = useState("");
    const loginSubmit = async (e) =>{
        e.preventDefault();
        const res = await fetch("http://localhost:3001/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ loginNome, loginsenha }),
        });
        if(res.ok){
            const data = await res.json();
            localStorage.setItem("usuario", JSON.stringify(data));
            setUser(data)
        }else{
            const erro = await res.json()
            setErro(erro.error)
        }
        // tratar erros
    }

   
  return (
    <div>
        <form className="userForm" onSubmit={loginSubmit}>
        <input
            onChange={(e)=> { setLoginNome(e.target.value)} }
            value={loginNome}
            placeholder="Nome"
            type="text"
        />

        <input
            onChange={(e)=> {setLoginSenha(e.target.value)}}
            value={loginsenha}
            placeholder="senha"
            type="password"
        />

        <button type="submit">Entrar</button>
        </form>
    </div>
  );
}

export default Login;