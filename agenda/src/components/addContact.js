const AddContact = ({
  handleAddContact,
  newContactName,
  newContactPhone,
  setContactName,
  setContactPhone,
}) => {
  return (
    <div>
      <h1>Novo contato</h1>
      <form className="newContactForm" onSubmit={handleAddContact}>
        <input
          value={newContactName}
          onChange={(e) => {
            setContactName(e.target.value);
          }}
          placeholder="Nome"
          type="text"
        />
        <input
          value={newContactPhone}
          onChange={(e) => {
            setContactPhone(e.target.value);
          }}
          placeholder="Numero"
          type="number"
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default AddContact;
