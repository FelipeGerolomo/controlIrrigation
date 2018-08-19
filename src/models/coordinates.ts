export class Coordinates{
    latitude: number = null; 
    longitude: number = null; 
    altitude: number = null; 
    accuracy: number = null; 
    altitudeAccuracy: number = null; 
    speed: number = null; 
    heading: number = null;

    constructor() { }

    setValues(latitude, longitude, altitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }
}
