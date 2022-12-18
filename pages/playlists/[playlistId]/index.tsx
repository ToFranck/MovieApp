
import { prisma } from "pages/api/playlists";
import { GetServerSideProps } from "next";
import React from "react";
import { fetchMovie } from "services/api/tmdb";
import { Movie } from "models";
import { Playlist } from "@prisma/client";
import MoviesList from "components/Playlist";

// type FoundPlaylistParams = {
//     name?: string;
//     description?: string;
//     movieIds: number[];
//     id: number;
//   };

type Props = {
    playlist: Playlist;
    movies: Movie[];
};

export default function PlaylistId({ playlist, movies }: Props) {
    
    console.log(playlist);

    return (
        <>
            <p>ID de la playliste: {playlist.id}</p>
            <p>Nom de la playliste: {playlist.name}</p>
            <p>Description de la playliste: {playlist.description}</p>
            <MoviesList movies={movies} />
        </>
    );
} 

export const getServerSideProps: GetServerSideProps = async (context) => {
    const playlistId = context.params?.playlistId;
    
    if (!playlistId || !Number(playlistId) || Array.isArray(playlistId)) {
        return { notFound: true };
    }

    const reponse = await prisma.playlist.findUnique({
        where: {
            id: +playlistId,
        },
        include: {
            movies: true,
        },
    });

    if (!reponse?.movies) {
        return { notFound: true };
    }
    const tableauMovies = reponse?.movies.map(async(movie) => { return await fetchMovie(movie.id) });
    const movies = await Promise.all(tableauMovies);


    console.log(movies);
    return {
        props: {
            playlist: reponse,
            movies,
        },
    }
};


