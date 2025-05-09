import React from 'react'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleChange = (event) => {
    const value = event.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar por Marca o Modelo"
        value={searchTerm}
        onChange={handleChange}
      />
      <button
        onClick={() => onSearch(searchTerm)}
        className="search-action-button"
      >
        Buscar
      </button>
    </div>
  )
}

export default SearchBar
