import { useState } from "react";
import "./SearchBar.css"

function SearchBar ({onSubmit}) {

    const [word,setWord] = useState("")

   const handleChange = (event) => {
        setWord(event.target.value)
    }

   const handleSubmit = (event) => {
  event.preventDefault();
  onSubmit(word);
  setWord("");
};

        return(
            <header className="searchbar">
  <form className="form" onSubmit={handleSubmit}>
    <button type="submit" className="button">
      <span className="button-label">Search</span>
    </button>

    <input
      className="input"
      type="text"
      autoComplete="off"
    value={word}
    onChange={handleChange}
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
        )
    }

export default SearchBar