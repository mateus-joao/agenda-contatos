function UserMenu({ handleExitUser, handleDeleteUser, onUpdateUser }) {
  return (
    <div className="userContent">
      <button onClick={handleExitUser}>Sair</button>
      <button onClick={handleDeleteUser}>Apagar</button>
      <button onClick={onUpdateUser}>Editar</button>
    </div>
  );
}
export default UserMenu;
