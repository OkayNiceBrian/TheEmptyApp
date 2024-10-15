import { apiHost } from "config/host";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import "styles/Search.css";

const Search = () => {
    const { searchQuery } = useParams();
    const { token, logout } = useAuth();

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [pageNum, setPageNum] = useState(1);
    const [searchType, setSearchType] = useState("all");

    const [loading, setLoading] = useState(true);
    const [allData, setAllData] = useState(null);

    useEffect(() => {
        if (loading) {
            const url = `${apiHost}/query`;
            const query = {
                queryString: searchQuery,
                searchType: searchType,
                pageNumber: parseInt(pageNum),
                itemsPerPage: parseInt(itemsPerPage)
            }
            fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(query)
            }).then(rsp => {
                if (rsp.status === 401) logout();
                return rsp.json();
            }).then(data => {
                if (searchType === "all") setAllData(data);
                setLoading(false);
            }).catch(e => console.error(e));
        }
    }, [itemsPerPage, loading, logout, pageNum, searchQuery, searchType, token]);

    const renderSongs = (songs) => {
        return songs.map(song => {
            return <li key={song.id} className="search-song-item">
                <p>{song.name}</p>
                <p>{song.artistName}</p>
                <p>{song.albumName}</p>
            </li>
        })
    }

    const renderAlbums = (albums) => {
        return albums.map(album => {
            return <li key={album.id} className="search-album-item">
                <p>{album.name}</p>
                <p>{album.artistName}</p>
                <p>Songs: {album.songCount}</p>
            </li>
        })
    }

    const renderArtists = (artists) => {
        return artists.map(artist => {
            return <li key={artist.id} className="search-artist-item">
                <p>{artist.name}</p>
                <p>Albums: {artist.albumCount}</p>
            </li>
        })
    }

    if (loading) {
        return (
            <div className="search-container">
                <h1>loading...</h1>
            </div>
        );
    }

    return (
        <div className="search-container">
            <h1>Results for "{searchQuery}"</h1>
            {searchType === "all" && allData && (
                <div className="search-all-container">
                    <div className="search-all-items-container">
                        <h2>songs</h2>
                        <ul>
                            {renderSongs(allData.songs)}
                        </ul>
                    </div>
                    <div className="search-all-items-container">
                        <h2>albums</h2>
                        <ul>
                            {renderAlbums(allData.albums)}
                        </ul>
                    </div>
                    <div className="search-all-items-container">
                        <h2>artists</h2>
                        <ul>
                            {renderArtists(allData.artists)}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;