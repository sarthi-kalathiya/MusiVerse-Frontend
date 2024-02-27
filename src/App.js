import './App.css';
import './output.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from './routes/Login';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import UploadSong from './routes/UploadSong';
import { useCookies } from 'react-cookie';
import MyMusic from './routes/MyMusic';
import songContext from "./contexts/songContext";
import nameContext from './contexts/usernameContext';
import { useState } from "react";
import Home from './routes/Home';
import LoginHome from './routes/LoggedInHome';
import SearchPage from "./routes/SearchPage";
import Library from "./routes/Library";
import SinglePlaylistView from './routes/SinglePlaylistView';


function App() {

  const [Cookie, setCookie] = useCookies(["token"]);
  //console.log(Cookie);
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [name, setName] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  return (
    <div className="w-screen h-screen font-poppins">

      <BrowserRouter>

        {Cookie.token ? (
          // logged in routes
          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
            }}
          >
            <nameContext.Provider
              value={{
                name,
                setName,
              }}>

              <Routes>
                <Route path="/" element={<div className='bg-blue-500'>hello</div>} />
                <Route path="/home" element={<LoginHome />} />
                <Route path="/uploadSong" element={<UploadSong />} />
                <Route path="/mymusic" element={<MyMusic />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/library" element={<Library />} />
                <Route
                  path="/playlist/:playlistId"
                  element={<SinglePlaylistView />}
                />

                <Route path="*" element={<Navigate to="/home" />} />
                <></>
              </Routes>
            </nameContext.Provider>
          </songContext.Provider>


        ) : (
          // logged out routes
          <Routes>
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )
        }
      </BrowserRouter>
    </div>
  );
}

export default App;