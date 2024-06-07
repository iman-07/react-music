import { useEffect, useState, useContext } from 'react';
import { AudioContext } from '../../context/AppContext';
import { Container, IconButton, Box, Slider } from '@mui/material';
import { FaPlay } from "react-icons/fa";
import { IoIosPause } from "react-icons/io";
import { formatMMSS } from '../../helpers/formatMMSS';

const PlayBar = () => {
    const { currentTrack, isPlaying, audio } = useContext(AudioContext);
    const [currentTime, setCurrentTime] = useState(0);
    const [percent, setPercent] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    
    useEffect(() => {
        let timer;
        setCurrentTime(0);
        setPercent(0);
        if (isPlaying && !isSeeking) {
            timer = setInterval(() => {
                const newTime = audio.currentTime;
                setCurrentTime(newTime);
                setPercent((newTime / currentTrack.duration) * 100);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isPlaying, isSeeking, currentTrack]);
    const handleChange = (_, newValue) => {
        const newTime = (newValue / 100) * currentTrack.duration;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
        setPercent(newValue);
    };
    const handleSeekStart = () => {
        setIsSeeking(true);
    };

    const handleSeekEnd = (_, newValue) => {
        setIsSeeking(false);
        handleChange(_, newValue);
    };
    return (
        <div style={{
            position: 'fixed',
            width: '100%',
            height: 150,
            left: 0,
            bottom: 0,
            background: "aqua",
            display: 'flex',
            alignItems: 'center',
        }}>
            <Container maxWidth="lg">
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <IconButton>{isPlaying ? <IoIosPause /> : <FaPlay/>}</IconButton>
                    <img width={80} src={currentTrack.preview} alt="" />
                    <div>
                        <h4>{currentTrack.artists}</h4>
                        <p>{currentTrack.title}</p>
                    </div>
                    <p style={{width: 100}}> {formatMMSS(currentTime)} </p>
                    <Slider
                        onChange={handleChange}
                        onChangeStart={handleSeekStart}
                        onChangeCommitted={handleSeekEnd}
                        value={percent}
                        min={0}
                        max={100}/>
                    <p style={{width: 100}}>{formatMMSS(currentTrack.duration - currentTime)}</p>
                </Box>
            </Container>
        </div>
    )
}

export default PlayBar;