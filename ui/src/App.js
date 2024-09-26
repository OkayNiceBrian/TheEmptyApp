import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "src/pages/Layout";
import Home from "src/pages/Home";
import Artist from "src/pages/Artist";
import Album from "src/pages/Album";
import Contact from "src/pages/Contact";
import NoPage from "src/pages/NoPage";
import CreateArtist from "src/pages/CreateArtist";
import CreateAlbum from "src/pages/CreateAlbum";

function App() {
  return (
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
