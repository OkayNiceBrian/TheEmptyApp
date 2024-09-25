import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiHost from "../config/global";
import "../styles/Artist.css";

const Artist = () => {
    const { artistId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const url = apiHost + "/artists/" + artistId;
                await fetch(url, {
                    method: "GET"
                })
                .then((response) => response.json())
                .then((data) => setArtist(data));
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }

        if (isLoading) {
            fetchArtist();
        }
    }, [artistId, isLoading]);

    const renderAlbums = () => {
        return artist.albums.map(album => 
            <div class="album-container">
                <div class="album-header-container">
                    <p class="album-header-text">{album.name}</p>
                </div>
                <div class="songs-container">
                    {renderSongs(album)}
                </div>
            </div>
        );
    }

    const renderSongs = (album) => {
        return album.songs.map(song => 
            <div class="song-container">
                <p class="song-text">{song.name}</p>
            </div>
        );
    }

    if (isLoading) return <div class="container" />;

    return (
        <div class="container">
            <div class="header-container">
                <p class="header-text">{artist.name}</p>
            </div>
            {renderAlbums()}
        </div>
    );
};

export default Artist;