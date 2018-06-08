class Weather {
  constructor(formattedAddress, weatherConditions, temperature, humidity, windSpeed, cloudiness, iconCode) {
    this.formattedAddress = formattedAddress;
    this.weatherConditions = weatherConditions;
    this.celsius = (temperature - 273.15).toFixed(0);
    this.fahrenheit = (1.8 * (temperature - 273.15) + 32).toFixed(0);
    this.humidity = humidity;
    this.windSpeedMetres = windSpeed;
    this.windSpeedMiles = (windSpeed * 2.23694).toFixed(1);
    this.cloudiness = cloudiness;
    this.iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;
  }

  toString() {
    return `${this.formattedAddress} **Temperature:**` +
    ` ${this.celsius}C / ${this.fahrenheit}F; **Cloudiness**: ${this.cloudiness}%; **Wind speed:** ${this.windSpeedMetres} m/s / ${this.windSpeedMiles} mph`;
  }
}

module.exports = Weather;
