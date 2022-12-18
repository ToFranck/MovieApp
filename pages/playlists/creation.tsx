import { Button } from "@mui/material";
import MoviesList from "components/Playlist";
import { LocalStoragePlaylist } from "models";
import React from "react";

export default function PlaylistCreationPage() {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [playlist, setPlaylist] = React.useState<LocalStoragePlaylist>({
    movies: [],
  });

  React.useEffect(() => {
    const playlistStr = window.localStorage.getItem("playlist");
    if (!playlistStr) return;

    const playlistValue = JSON.parse(playlistStr) as LocalStoragePlaylist;
    setPlaylist(playlistValue);
  }, []);

  if (playlist.movies.length === 0) return <p>Pas de films</p>;

  return (
    <>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <Button
        onClick={async () => {
          const response = await fetch("http://localhost:3000/api/playlists", {
            method: "POST",
            body: JSON.stringify({
              movieIds: playlist.movies.map((movie) => movie.id),
              name: name,
              description: description,
            }),
          });
          const savedPlaylist = await response.json();
          console.log(savedPlaylist);
        }}
      >
        
        Sauvegarder la playlist
      </Button>
      <button onClick={}>Voir la playlist </button>
      <MoviesList movies={playlist.movies} />;
    </>
  );
}
