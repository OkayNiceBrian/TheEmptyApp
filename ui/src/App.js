import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import Login from "pages/Login";
import Register from "pages/Register";
import Layout from "pages/Layout";
import Home from "pages/Home";
import Artist from "pages/Artist/Artist";
import Album from "pages/Album/Album";
import Contact from "pages/Contact";
import NoPage from "pages/NoPage";
import CreateArtist from "pages/Artist/CreateArtist";
import CreateAlbum from "pages/Album/CreateAlbum";

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
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/artist/:artistId" element={<Artist/>}/>
          <Route path="/artist/:artistId/album/:albumId" element={<Album/>}/>
          <Route path="/artist/:artistId/album/create" element={<CreateAlbum/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/artist/create" element={<CreateArtist/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
