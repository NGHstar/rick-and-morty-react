import { useState } from "react";
import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import NavBar, { Favorites, NavBarResult, Search } from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import useCharacter from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  //---
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const { isLoading, characters } = useCharacter("https://rickandmortyapi.com/api/character?name", query);

  console.log();

  function handleSelectedCharacter(id) {
    setSelectedId((prevId) => (prevId === id ? null : id));
  }

  function handleAddFavorite(character) {
    setFavorites((prevFavorites) => [...prevFavorites, character]);
  }

  function handleRemoveFavorite(id) {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
  }

  const isInFavorites = favorites.map((fav) => fav.id).includes(selectedId);

  return (
    <>
      <Toaster />
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NavBarResult foundedCharsCount={characters.length} />
        <Favorites favorites={favorites} onRemoveFavorite={handleRemoveFavorite} />
      </NavBar>
      <div className="main">
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectedCharacter}
          selectedId={selectedId}
        />
        <CharacterDetails selectedId={selectedId} onAddFavorite={handleAddFavorite} isInFavorites={isInFavorites} />
      </div>
    </>
  );
}

export default App;
