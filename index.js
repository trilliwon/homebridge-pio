var gpio = require('pi-gpio');
var Service, Characteristic;

module.exports = function(homebridge) {
	    Service = homebridge.hap.Service;
	    Characteristic = homebridge.hap.Characteristic;
			homebridge.registerAccessory('homebridge-pi-gpio', 'Stand', GPIOAccessory);
}

function GPIOAccessory(log, config) {
	this.log = log;
	this.name = config.name;
	this.pin = config.pin;
	this.switchService = new Service.Switch(this.name);

  if (!this.pin) throw new Error('You must provide a config value for pin.');

  this.service
	  .getCharacteristic(Characteristic.On);
		.on('get', this.getOn.bind(this))
		.on('set', this.setOn.bind(this));
}

GPIOAccessory.prototype.getServices = function() {
	return [this.switchService];
}

GPIOAccessory.prototype.setSwitch = function(on, callback) {
  this.log("Setting Switch to " + on);
  callback();
}


GPIOAccessory.prototype.getOn = function(callback) {

}

GPIOAccessory.prototype.setOn = function(on, callback) {

}

GPIOAccessory.prototype.pinAction = function(action) {

}
