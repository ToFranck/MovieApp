import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { LocalStoragePlaylist, Movie } from "models";
import router from "next/router";
import React, { useState } from "react";
import { json } from "stream/consumers";
// import { useEffect } from "react";
import classes from "./classes.module.css";

type Props = {
  movies: Movie[];
};



export default function MoviesList({ movies }: Props) {
  const [playlist, setPlaylist] = React.useState<Movie[]>(movies);
  const deleteMovie = (movie: Movie, e: any) => {
    e.stopPropagation();
    const plalistSR = window.localStorage.getItem("playlist");

    const playlistTemp = window.localStorage.getItem("playlist");
    if (!playlistTemp) return;
    const playlist: LocalStoragePlaylist = plalistSR
      ? JSON.parse(plalistSR)
      : { movies: [] };
    const newPlaylist = playlist.movies.filter(
      (movieTemp) => movieTemp.id !== movie.id
    );
    window.localStorage.setItem(
      "playlist",
      JSON.stringify({ movies: newPlaylist })
    );

    setPlaylist(newPlaylist);
  };



  return (
    <>

      <TableContainer className={classes.root} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableCell}>
                ID
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                Titre
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                Évaluation
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                Nb de votes
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                Popularité
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                Date de sortie
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                Suppresion de la playlist
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlist.map((movie) => (
              <TableRow
                key={movie.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className={classes.row}
                onClick={() => {
                  router.push(`/movies/${movie.id}`);
                }}
              >
                <TableCell align="center">{movie.id}</TableCell>
                <TableCell align="center">{movie.title}</TableCell>
                <TableCell align="center">{movie.vote_average}</TableCell>
                <TableCell align="center">{movie.vote_count}</TableCell>
                <TableCell align="center">{movie.popularity}</TableCell>
                <TableCell align="center">{movie.release_date}</TableCell>
                <TableCell align="center">
                  <button
                    onClick={async (e) => {
                      {
                        deleteMovie(movie, e);
                      }
                    }}
                  >
                    Supprimer
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
