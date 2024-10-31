import snowImage from './images/snowy.png';
import partlyRainyImage from './images/partly_rainy.png';
import cloudyImage from './images/cloudy.png';
import sunnyImage from './images/sunny.png';
import partlyCloudyImage from './images/partly_cloudy.png';
import heavyRainImage from './images/heavy_rain.png';
import mistImage from './images/mist.png';

export const getWeatherImage = (description) => {
    if (description.includes('snow')) {
        return snowImage;
    } else if (description.includes('heavy rain') || description.includes('heavy intensity rain')) {
        return heavyRainImage;
    } else if (description.includes('light rain') || description.includes('drizzle')) {
        return partlyRainyImage;
    } else if (description.includes('mist')) {
        return mistImage;
    } else if (description.includes('clouds')) {
        return description.includes('few clouds') ? partlyCloudyImage : cloudyImage;
    } else if (description.includes('clear')) {
        return sunnyImage;
    } else {
        return sunnyImage; // Default case
    }
};
