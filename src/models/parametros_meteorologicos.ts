

export class ParametrosMeteorologicos {
    temp_avg: number;
    temp_max: number;
    temp_min: number;
    precipitation: number;
    humidity: number;
    wind: number;
    location: String;

    constructor() {
        // this.setValues();
    }

    setValues(location, temp_avg, temp_max, temp_min, precipitation, humidity, wind) {
        this.location = location;
        this.temp_avg = this.kelvinToCelsius(temp_avg);
        this.temp_max = this.kelvinToCelsius(temp_max);
        this.temp_min = this.kelvinToCelsius(temp_min);
        this.precipitation = precipitation;
        this.humidity = humidity;
        this.wind = wind;
    }

    kelvinToCelsius(kelvin) {
        return  kelvin - 273.15;
    }

}