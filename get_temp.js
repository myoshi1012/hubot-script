readValue = function(msg,cb) {
  var i2c = require('i2c');
  var ADDR = 0x48;
  var INTERVAL = 1000;
  var sensor = new i2c(ADDR, {device: '/dev/i2c-1'});
  sensor.readBytes(0x00, 2, function(err, data) { 
    var temp;
    temp = (data[0] << 8 | data[1]) >> 3;
	if (temp >= 4096){
	    temp -= 8192;
	}
    value = temp * 0.0625; 
    console.log(value.toFixed(3));
    cb(value.toFixed(2));
  });
};

module.exports = function(robot) {
  robot.respond(/get temp/i, function(msg) {
      readValue(msg, function(val) {
        msg.reply(val);
      });
  });
};

