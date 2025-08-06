import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading.jsx";
import toast from "react-hot-toast";

function CharacterDetails({ selectedId, onAddFavorite, isInFavorites }) {
  // states
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  // effects
  useEffect(() => {
    async function fetchChar() {
      try {
        setIsLoading(true);
        //--- char data
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        // episodes data
        if (data.episode) {
          const episodesId = data.episode.map((e) => e.split("/").at(-1));
          const { data: episodeData } = await axios.get(
            `https://rickandmortyapi.com/api/episode/${episodesId}`
          );

          setEpisodes([episodeData].flat().slice(0, 9));
        }

        // --- try end
      } catch (err) {
        console.log(err);
        toast.error(err.message);
        setCharacter(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fetchChar();
    else setCharacter(null);
  }, [selectedId]);

  // show empty list message to user
  if (!character)
    return (
      <div style={{ flex: 1, textAlign: "center", marginTop: "2rem" }}>
        <h3>please select a character 🫠</h3>
      </div>
    );

  // show loading
  if (isLoading) {
    return (
      <div style={{ flex: 1, textAlign: "center", marginTop: "2rem" }}>
        <Loading />
      </div>
    );
  }

  return (
    <div style={{ flex: 1 }}>
      <CharacterInfo
        character={character}
        isInFavorites={isInFavorites}
        onAddFavorite={onAddFavorite}
      />
      <Episodes episodes={episodes} />
    </div>
  );
}

function CharacterInfo({ character, isInFavorites, onAddFavorite }) {
  return (
    <div className="character-detail">
      <img src={character.image} className="character-detail__img" />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👨‍🦳" : "👩‍🦰"}</span>
          <span> {character.name}</span>
          <div className="info">
            <span
              className={`status ${character.status === "Dead" ? "red" : ""}`}
            />
            <span> {character.status}</span>
            <span> - {character.species}</span>
          </div>
          <div className="location">
            <p>Last known location:</p>
            <p>{character.location.name}</p>
          </div>
          <div className="actions">
            {isInFavorites ? (
              <p>already in favorites ✅</p>
            ) : (
              <button
                className="btn btn--primary"
                onClick={() => onAddFavorite(character)}
              >
                Add to favorites
              </button>
            )}
          </div>
        </h3>
      </div>
    </div>
  );
}

function Episodes({ episodes }) {
  // ---
  const [isAscending, setIsAscending] = useState(true);

  let sortedEpisodes;

  if (isAscending) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of episodes</h2>
        <button onClick={() => setIsAscending((isAsc) => !isAsc)}>
          <ArrowUpCircleIcon
            className="icon"
            style={
              isAscending
                ? { transform: "rotateX(180deg)" }
                : { transform: "rotateX(0deg)" }
            }
          />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => {
          return (
            <li key={item.id}>
              <div className="">
                {(index + 1).toString().padStart(2, "0")} -
                <strong>{" " + item.name + ` (${item.episode})`}</strong>
              </div>
              <div className="badge badge--secondary">{item.air_date}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CharacterDetails;
