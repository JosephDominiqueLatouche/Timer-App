import { Grid, Typography, ButtonBase } from "@mui/material";
import IndividualTimer from "../Components/IndividualTimer";
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

export default function Home() {
    // contains all of the app's timers, where each timer has a length (in mins) and a start time (in milliseconds)
    const [timers, setTimers] = useState([]);

    // called by the plus icon button. Simply adds a new 1 minute timer, but can be extended to call a modal which selects timer length
    const handleAddOneMinuteTimer = () => {
        setTimers(prevTimers => [...prevTimers, { 
            timerLength: 1,
            timerStart: Date.now() 
        }]);
    };

    // a component list of all timers
    const timerComponents = timers.map((timer, index) => (
        <IndividualTimer key={index} timerStart={timer.timerStart} timerLength={timer.timerLength}/>
    ));

    return (
        <Grid container direction="column" sx={{ backgroundColor: "black", color: "white", padding: "25px", minHeight: "100vh" }}>
            <Grid item>
                <Grid container justifyContent="flex-end" sx={{ color: "orange" }}>
                    <ButtonBase onClick={handleAddOneMinuteTimer}>
                        <AddIcon fontSize="large" />
                    </ButtonBase>
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    Timers
                </Typography>
            </Grid>
            {timerComponents}
        </Grid>
    );
}