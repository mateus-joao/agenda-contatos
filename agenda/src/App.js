
import Error from "./components/error"
import Login from "./pages/login"
import NewUser from "./pages/newUser"
import Main from "./pages/main"
import "./css/App.css"
import { useState, useEffect } from "react"
const App = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const checkUser = localStorage.getItem("usuario");
    if (checkUser) {
      setUser(JSON.parse(checkUser));
    }
  }, []);


  function handleToggleAuthMode() {
    setIsLogin(prev => !prev);
  }
  if(user){
    return <Main setError={setError} setUser={setUser} user={user} />
  }
  return (
    
    <div>
      <Error error={error} />
      <h1>{isLogin ? "Login" : "Criar conta"}</h1>

      {isLogin ? <Login setError={setError} setUser = {setUser} /> : <NewUser setError={setError} setUser = {setUser}/>}

      <button onClick={handleToggleAuthMode}>
        {isLogin
          ? "Não tem conta? Criar usuário"
          : "Já tem conta? Fazer login"}
      </button>
      
    </div>
  )
}

export default App