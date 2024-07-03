import { Grid, Typography, ButtonBase } from "@mui/material";
import ProgressCircle from "./ProgressCircle";
import { useState, useEffect } from "react";

// contains a single timer component
// input properties are timerStart in milliseconds and timerlength in minutes
const IndividualTimer = (props) => {
    // get props
    const timerLength = props.timerLength;
    const timerStart = props.timerStart;

    // set up states for this timer
    const [timeElapsed, setTimeElapsed] = useState(0); // how long has past since timer start, minus any pause lengths, in seconds
    const [run, setRun] = useState(true); // is the timer currently running
    const [totalLengthPaused, setTotalLengthPaused] = useState(0); // in milliseconds
    const [lastPaused, setLastPaused] = useState(null); // the time, in milliseconds, when the timer was last paused, if currently paused. Otherwise null
    const [isFinished, setIsFinished] = useState(false); // set to True once timer complete

    // called when the button is pressed to pause/play. Adds to total paused length if unpausing. Sets pause time if pausing. 
    const toggleTimer = () => {
        if (run) {
            setLastPaused(Date.now());
        } else {
            setTotalLengthPaused(totalLengthPaused + (Date.now() - lastPaused));
            setLastPaused(null);
        }
        setRun(!run);
    };

    // runs once a second to iterate on timer
    useEffect(() => {
        let interval;
        if (run === true) {
            interval = setInterval(() => {
                const currentTimeElapsed = Math.floor((Date.now() - timerStart - totalLengthPaused) / 1000);
                setTimeElapsed(currentTimeElapsed);
                if (currentTimeElapsed / 60 >= timerLength) {
                    setIsFinished(true);
                    setRun(false); // Stop the timer when finished
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [run, timerStart, totalLengthPaused, timerLength]);

    return (
        <Grid item sx={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <Grid container direction="row" justifyContent="space-between" alignContent="center">
                <Grid item xs={6} alignContent="center">
                    <Grid container direction="column">
                        <Grid item>
                            {isFinished ? (
                                <Typography variant="h2">00:00</Typography>
                            ) : (
                                <Typography variant="h2">
                                    {/* Minutes here. Prints a zero before the number if its a one digit number */}
                                    {(Math.floor((timerLength * 60 - timeElapsed) / 60) < 10) ? `0${Math.floor((timerLength * 60 - timeElapsed) / 60)}` : Math.floor((timerLength * 60 - timeElapsed) / 60)}
                                    :
                                    {/* Seconds here. Prints a zero before the number if its a one digit number */}
                                    {(timerLength * 60 - timeElapsed) % 60 < 10 ? `0${Math.floor((timerLength * 60 - timeElapsed) % 60)}` : Math.floor((timerLength * 60 - timeElapsed) % 60)}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                {timerLength} min
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} alignContent="center" sx={{ color: "orange" }} container justifyContent="flex-end">
                    <ButtonBase onClick={toggleTimer}>
                        <ProgressCircle progress = {timeElapsed/(timerLength*60)*100} isFinished = {isFinished} isPaused={!run}/>
                    </ButtonBase>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default IndividualTimer;
