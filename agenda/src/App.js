
import Error from "./components/erro"
import Login from "./pages/login"
import NewUser from "./pages/newUser"
import Main from "./pages/main"
import "./css/App.css"
import { useState, useEffect } from "react"
const App = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    
    const userSalvo = localStorage.getItem("usuario");
    if (userSalvo) {
      setUser(JSON.parse(userSalvo));
    }
  }, []);


  function alternarModo() {
    setIsLogin(prev => !prev);
  }
  if(user){
    return <Main setErro={setErro} setUser={setUser} user={user} />
  }
  return (
    
    <div>
      <Error erro={erro} />
      <h1>{isLogin ? "Login" : "Criar conta"}</h1>

      {isLogin ? <Login setErro={setErro} setUser = {setUser} /> : <NewUser setErro={setErro} setUser = {setUser}/>}

      <button onClick={alternarModo}>
        {isLogin
          ? "Não tem conta? Criar usuário"
          : "Já tem conta? Fazer login"}
      </button>
      

      

    </div>
  )
}

export default App