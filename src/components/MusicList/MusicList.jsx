import React from 'react'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { AudioContext } from "../../context/AppContext"
import { FaPlay } from "react-icons/fa";
import { IoIosPause } from "react-icons/io";
import PlayBar from '../PlayBar/PlayBar';



import { Box, Container, CircularProgress, Card, CardContent } from "@mui/material"

const url = "https://665b0c8a003609eda45fa87a.mockapi.io/api/v1/tracks"
const MusicList = () => {
    const [songs, setSongs] = useState([])
    const { setAudio, currentTrack, isPlaying, name } = useContext(AudioContext)

    useEffect(() => {
        axios.get(url).then((response) => {
            console.log(response);
            setSongs(response.data);
        })
    }, [])

    if (songs.length === 0) {
        return <Container maxWidth="md">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        </Container>
    }

    return (
        <div>
            <Container maxWidth="md" >
                <Card>
                    <CardContent>
                        {songs.filter(el => el.artists.toLowerCase().includes(name.toLowerCase())).map((track) => {
                            const min = Math.floor(track.duration / 60)
                            const remainderSecund = Math.floor(track.duration % 60)
                            return (
                                <div key={track.id} style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
                                    <button className='btn' onClick={() => setAudio(track)}>
                                        {currentTrack?.id === track.id && isPlaying ? <IoIosPause /> : <FaPlay />}
                                    </button>
                                    <img style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 10
                                    }} src={track.preview} alt="" />
                                    <div>
                                        <h4>{track.title}</h4>
                                        <p>{track.artists}</p>
                                    </div>
                                    <p style={{
                                        marginLeft: 'auto'
                                    }}>{min} : {remainderSecund}</p>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
                {currentTrack && <PlayBar />}
            </Container >
        </div>
    )
}

export default MusicList