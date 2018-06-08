class Weather {
  constructor(formattedAddress, temperature, humidity, windSpeed, cloudiness, iconURL) {
    this.formattedAddress = formattedAddress;
    this.temperature = temperature;
    this.celsius = (temperature - 273.15).toFixed(0);
    this.fahrenheit = (1.8 * (temperature - 273.15) + 32).toFixed(0);
    this.humidity = humidity;
    this.windSpeedMetres = windSpeed;
    this.windSpeedMiles = (windSpeed * 2.23694).toFixed(1);
    this.cloudiness = cloudiness;
    this.iconURL = iconURL;
  }

  toString() {
    return `${this.formattedAddress} **Temperature:**` +
    ` ${this.celsius}C / ${this.fahrenheit}F; **Cloudiness**: ${this.cloudiness}%; **Wind speed:** ${this.windSpeedMetres} m/s / ${this.windSpeedMiles} mph`;
  }
}

module.exports = Weather;
