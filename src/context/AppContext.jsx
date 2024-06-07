import React, { useState } from "react"


export const AudioContext = React.createContext()
const audio = new Audio();

const AppContext = (props) => {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setPlaying] = useState(false)
  const [name, setName] = useState("")
  const [theme, setTheme] = useState("white")

  const toggleTheme = () => {
    if(theme === "white"){
      setTheme("dark")
    }else if (theme === "dark") {
      setTheme("white")
    }
  }

  const setAudio = (track) => {
    setCurrentTrack(track);
    audio.src = track.src;

    setCurrentTrack((prevTrack) => {
      return prevTrack;
    });

    setPlaying((prevIsPlaying) => {
      return prevIsPlaying;
    });

    if (isPlaying && currentTrack && currentTrack.id === track.id) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  }

  const setSearchText = (name) => {
    console.log(name);
    setName(name)
  }

  const value = {
    toggleTheme,
    theme,
    setSearchText,
    name,
    text: "Music App",
    setAudio,
    audio,
    currentTrack,
    isPlaying,
  }


  return (
    <AudioContext.Provider value={value}>
      {props.children}
    </AudioContext.Provider>
  )
}

export default AppContext