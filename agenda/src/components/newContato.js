


const NewContato = ({ agendaSubmit, nome, numero, setNome, setNumero }) => {
    
  return (
    
    <div>
        <h1>Novo contato</h1>
        <form className="newContatoForm" onSubmit={agendaSubmit} >
            <input value={nome} onChange={(e)=> {setNome(e.target.value)}}  placeholder="Nome" type="text" />
            <input value={numero} onChange={(e)=> {setNumero(e.target.value)}} placeholder="Numero" type="number"/>
            <button type="submit">Adicionar</button>
        </form>
    </div>
  )
}

export default NewContato