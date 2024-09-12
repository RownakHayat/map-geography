import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TotalParticiple = () => {
  const percentage = 81

  return (
    <div className=''>
      <h6>Population</h6>
      <div style={{ width: '100%' }} className='flex justify-between' >
            <div className='text-md text-wrap my-1'>Total Population</div>
              <div className="" style={
                {width: '100%'}
              }>
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                    textColor: "white",
                    pathColor: "white",
                    trailColor: "#F79323"
                      
                  })}
                  />
              </div>
          </div>
    </div>
  );
};

export default TotalParticiple;
