

function Busca({setBusca}){
    return(
        <div className="busca">
            <input placeholder="buscar contato" onChange={(e)=> {setBusca(e.target.value)}} />
        </div>
    )
}
export default Busca