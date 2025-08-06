import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";

function NavBar({ children }) {
  return (
    <div className="navbar">
      <div className="navbar__logo">LOGO 😍</div>

      {children}
    </div>
  );
}

export function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="text-field"
      placeholder="search"
    />
  );
}

export function NavBarResult({ foundedCharsCount }) {
  return (
    <div className="navbar__result">{foundedCharsCount} character founded</div>
  );
}

export function Favorites({ favorites, onRemoveFavorite }) {
  //---
  const [isClose, setIsClose] = useState(true);

  function handleCloseModal(value) {
    setIsClose(value);
  }

  return (
    <>
      {!isClose ? (
        <Modal close={isClose} onClose={handleCloseModal} title={"Favorites"}>
          {favorites.map((fav) => {
            return (
              <Character key={fav.id} char={fav}>
                <button
                  className="icon red"
                  onClick={() => onRemoveFavorite(fav.id)}
                >
                  <TrashIcon />
                </button>
              </Character>
            );
          })}
        </Modal>
      ) : null}
      <button className="heart" onClick={() => setIsClose(false)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorites.length}</span>
      </button>
    </>
  );
}

export default NavBar;
