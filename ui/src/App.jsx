import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import AudioProvider from 'contexts/AudioPlayerContext';
import Login from "pages/Login";
import Register from "pages/Register";
import Layout from "pages/Layout";
import Home from "pages/Home";
import Artist from "pages/Artist/Artist";
import Album from "pages/Album/Album";
import Search from "pages/Search";
import Likes from "pages/Likes";
import Options from "pages/Options";
import Contact from "pages/Contact";
import NoPage from "pages/NoPage";
import CreateArtist from "pages/Artist/CreateArtist";
import CreateAlbum from "pages/Album/CreateAlbum";
import EditAlbum from "pages/Album/EditAlbum";

function App() {
  const { token } = useAuth();

  return (!token) ? 
  (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <AudioProvider>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/register" element={<Home/>}/>
            <Route path="/artist/:artistId" element={<Artist/>}/>
            <Route path="/artist/:artistId/album/:albumId" element={<Album/>}/>
            <Route path="/artist/:artistId/album/:albumId/edit" element={<EditAlbum/>}/>
            <Route path="/artist/:artistId/album/create" element={<CreateAlbum/>}/>
            <Route path="/search/:searchQuery" element={<Search/>}/>
            <Route path="/likes" element={<Likes/>}/>
            <Route path="/options" element={<Options/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/artist/create" element={<CreateArtist/>}/>
            <Route path="*" element={<NoPage/>}/>
          </Route>
        </Routes>
      </AudioProvider>
    </BrowserRouter>
  );
}

export default App;
