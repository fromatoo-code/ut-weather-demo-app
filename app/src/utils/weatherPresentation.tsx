import BoltIcon from '@mui/icons-material/Bolt';
import CloudIcon from '@mui/icons-material/Cloud';
import GrainIcon from '@mui/icons-material/Grain';
import SevereColdIcon from '@mui/icons-material/SevereCold';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export function getWeatherPresentation(weatherCode?: number) {
  if (weatherCode === 0) {
    return <WbSunnyIcon sx={{ fontSize: 44, color: 'common.black' }} />;
  }

  if ([1, 2].includes(weatherCode ?? -1)) {
    return <WbCloudyIcon sx={{ fontSize: 44, color: 'common.black' }} />;
  }

  if (weatherCode === 3) {
    return <CloudIcon sx={{ fontSize: 44, color: 'common.black' }} />;
  }

  if ([45, 48].includes(weatherCode ?? -1)) {
    return <GrainIcon sx={{ fontSize: 44, color: 'common.black' }} />;
  }

  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode ?? -1)) {
    return <WaterDropIcon sx={{ fontSize: 44, color: 'common.black' }} />;
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode ?? -1)) {
    return <SevereColdIcon sx={{ fontSize: 44, color: 'common.black' }} />;
  }

  if ([95].includes(weatherCode ?? -1)) {
    return <ThunderstormIcon sx={{ fontSize: 44, color: 'common.black' }} />;
  }

  if ([96, 99].includes(weatherCode ?? -1)) {
    return <BoltIcon sx={{ fontSize: 44, color: 'common.black' }} />;
  }

  return <CloudIcon sx={{ fontSize: 44, color: 'common.black' }} />;
}
