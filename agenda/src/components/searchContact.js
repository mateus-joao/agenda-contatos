function Search({ setSearchTerm }) {
  return (
    <div className="search">
      <input
        placeholder="Pesquisar"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
}
export default Search;
