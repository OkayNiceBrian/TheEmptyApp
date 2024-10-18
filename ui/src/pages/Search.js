import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { apiHost, blobUrl } from "config/host";
import "styles/Search.css";

const Search = () => {
    const { searchQuery } = useParams();
    const { token, logout } = useAuth();

    const [itemsPerPage] = useState(10);
    const [pageNum] = useState(1);
    const [searchType] = useState("all");

    const [loading, setLoading] = useState(true);
    const [allData, setAllData] = useState(null);

    useEffect(() => {
        setLoading(true);
    }, [searchQuery])

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
            return <Link key={song.id} to={`/artist/${song.artistId}/album/${song.albumId}`} className="link">
                <li className="search-song-item">
                    <h3>{song.name}</h3>
                    <p>by {song.artistName}</p>
                    <p>{song.albumName}</p>
                    <p>Plays: {song.listens}</p>
                </li>
            </Link>
        })
    }

    const renderAlbums = (albums) => {
        return albums.map(album => {
            return <Link key={album.id} to={`/artist/${album.artistId}/album/${album.id}`} className="link">
                <li className="search-album-item">
                    <img className="search-album-cover" src={`${blobUrl}/${album.albumCoverGuid}`} alt={album.name}/>
                    <div className="search-album-item-content">
                        <h3>{album.name}</h3>
                        <p>{album.artistName}</p>
                        <p>Songs: {album.songCount}</p>
                    </div>
                </li>
            </Link>
        })
    }

    
    const renderArtists = (artists) => {
        return artists.map(artist => {
            return <Link key={artist.id} to={`/artist/${artist.id}`} className="link">
                <li className="search-artist-item">
                    <h3>{artist.name}</h3>
                    <p>Albums: {artist.albumCount}</p>
                </li>
            </Link>
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