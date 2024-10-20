import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { apiHost } from "config/host";

const EditAlbum = () => {
    const { artistId, albumId } = useParams();
    const { token, logout } = useAuth();

    const [loading, setLoading] = useState();

    useEffect(() => {
        if (loading) {
            const url = `${apiHost}/albums/${albumId}`; // Perhaps make a new route to check that user.id == album.userId
            fetch(url, {
                method: "GET", 
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
        }
    });

    const pressSubmit = () => {
        const url = `${apiHost}/albums/${albumId}`;
        const a = {};
        fetch(url, {
            method: "PUT",
            headers: {
                "Accepts": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(a)
        })
    }

    return (
        <div>

        </div>
    );
}

export default EditAlbum;