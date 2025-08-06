import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loading from "./Loading";

function CharacterList({
  characters,
  isLoading,
  onSelectCharacter,
  selectedId,
}) {
  if (characters.length == 0)
    return (
      <div style={{ flex: 1, textAlign: "center", marginTop: "2rem" }}>
        <h3>empty list 📃</h3>
      </div>
    );

  return (
    <div
      className="characters-list"
      style={
        isLoading
          ? { textAlign: "center", marginTop: "2rem" }
          : { textAlign: "left" }
      }
    >
      {isLoading ? (
        <Loading />
      ) : (
        characters.map((c) => {
          return (
            <Character key={c.id} char={c}>
              <button
                className="icon red"
                onClick={() => onSelectCharacter(c.id)}
              >
                {selectedId === c.id ? <EyeIcon /> : <EyeSlashIcon />}
              </button>
            </Character>
          );
        })
      )}
    </div>
  );
}

export function Character({ char, children }) {
  return (
    <div className="list__item">
      <img src={char.image} alt={char.name} />
      <h3 className="name">
        <span>{char.gender === "Male" ? "👨‍🦰" : "👩‍🦰"}</span>
        <span> {char.title}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${char.status === "Dead" ? "red" : ""}`}
        ></span>
        <span> {char.status}</span>
        <span> - {char.name}</span>
      </div>
      {children}
    </div>
  );
}

export default CharacterList;
