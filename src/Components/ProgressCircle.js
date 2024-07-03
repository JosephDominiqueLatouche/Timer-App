import { Pause as PauseIcon, PlayArrow as PlayIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';

// a simple graphic which has an outer circle which highlights orange to reflect timer progress
// input props are progress (out of 100), isFinished (bool) and isPaused (bool)
const ProgressCircle = (props) => {
  // get properties
  let progress = props.progress;
  let isFinished = props.isFinished;
  let isPaused = props.isPaused;

  // set constants and calculate the completed segment length of the progress
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '120px', height: '120px' }}>
      {isFinished ? 
        <div>
          <svg width="100%" height="100%" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
            />
          </svg>
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)' 
          }}>
            <Typography variant="h6">
              Done
            </Typography>
          </div>
        </div>
        :
        <div>
          <svg width="100%" height="100%" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="grey"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="orange"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 0.35s' }}
            />
          </svg>
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)' 
          }}>
            {isPaused ? <PlayIcon fontSize="large" /> : <PauseIcon fontSize="large" />}
          </div>
        </div>
      }
    </div> 
  )
};

export default ProgressCircle;
