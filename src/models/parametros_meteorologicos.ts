

export class ParametrosMeteorologicos {
    temp_avg: number;
    temp_max: number;
    temp_min: number;
    precipitation: number;
    humidity: number;
    wind: number;

    constructor() {
        this.setValues();
    }

    setValues() {
        this.temp_avg = 25.4;
        this.temp_max = 30.2;
        this.temp_min = 21.1;
        this.precipitation = 153;
        this.humidity = 78.19;
        this.wind = 2.65;
    }

}