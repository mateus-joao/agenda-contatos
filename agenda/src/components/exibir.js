import { FaEdit, FaWindowClose} from "react-icons/fa"

function Exibir({onDelete, contatos, onEdit, busca }) {
  if (!contatos || contatos.length === 0) {
    return <p>Nenhum contato encontrado.</p>;
  }
  const contatosFiltrados = contatos.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );



  return (
    <ul>
      {contatosFiltrados.map((contato) => (
        <li key={contato.id}>
          <strong>{contato.nome}</strong> — {contato.numero}
          <FaEdit onClick={()=> onEdit(contato)} />
          <FaWindowClose onClick={() => onDelete(contato.id)} className="delete"/>
        </li>
      ))}
    </ul>
  );
}

export default Exibir;
