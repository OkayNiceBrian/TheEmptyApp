import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "src/auth/AuthContext";
import Login from "src/pages/Login";
import Register from "src/pages/Register";
import Layout from "src/pages/Layout";
import Home from "src/pages/Home";
import Artist from "src/pages/Artist/Artist";
import Album from "src/pages/Album/Album";
import Contact from "src/pages/Contact";
import NoPage from "src/pages/NoPage";
import CreateArtist from "src/pages/Artist/CreateArtist";
import CreateAlbum from "src/pages/Album/CreateAlbum";

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
  ) : 
  (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/artist/:artistId" element={<Artist/>}/>
          <Route path="/album/:albumId" element={<Album/>}/>
          <Route path="/artist/:artistId/create/album" element={<CreateAlbum/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/create/artist" element={<CreateArtist/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
