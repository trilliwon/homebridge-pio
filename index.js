var Gpio = require('onoff').Gpio;
var relay = new Gpio(17, 'out');

var Service, Characteristic;

module.exports = function(homebridge) {
	    Service = homebridge.hap.Service;
	    Characteristic = homebridge.hap.Characteristic;
			console.log("homebridge API version: " + homebridge.version);
			homebridge.registerAccessory('homebridge-pio', 'Stand', GPIOAccessory);
}

function GPIOAccessory(log, config) {
	this.log = log;
	this.name = config.name;
	this.pin = config.pin;

	this.switchService = new Service.Switch(this.name);
	relay = new Gpio(this.pin, 'out');
	if (!this.pin) throw new Error('You must provide a config value for pin.');

  this.switchService.getCharacteristic(Characteristic.On).on('set', this.setSwitch.bind(this));
	this.switchService.getCharacteristic(Characteristic.On).on('get', this.getSwitch.bind(this));
}

GPIOAccessory.prototype.getServices = function() {
	return [this.switchService];
}

GPIOAccessory.prototype.setSwitch = function(on, callback) {
  this.log("Setting " + on);
	if (on) {
		relay.writeSync(0);
	} else {
    relay.writeSync(1);
	}
	callback();
}

GPIOAccessory.prototype.getSwitch = function(callback) {
	var on = relay.readSync();
	callback(null, on);
	this.log("Get " + on ^ 1);
}
