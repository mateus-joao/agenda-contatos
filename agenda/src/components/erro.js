function Error({erro}){
    if(!erro){
        return null
    }
    return(
        <p style={{ color: "red" }} >{erro}</p>
    )
}
export default Error