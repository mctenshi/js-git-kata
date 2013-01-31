"use strict";

var util = {
  compress: function (line) {
    line = line.replace(/;.*$/, '').trim();
    return line;
  },
  isCategory: function (line) {
    if (line.substr(0, 1) === "[" && line.substr(-1) === "]") {
      return true;
    }
    return false;
  },
  getCategory: function (line) {
    return line.substr(1, line.length - 2);
  },
  isProperty: function (line) {
    return (/^[a-z].*=/).test(line);
  },
  getPropertyKey: function (line) {
    return line.split('=')[0].trim();
  },
  getPropertyValue: function (line) {
    var value = line.split('=')[1].trim();
    if (value.substr(0, 1) === '"' && value.substr(-1) === '"') {
      value = value.substr(1, value.length - 2);
    }
    if (value.substr(0, 1) === "'" && value.substr(-1) === "'") {
      value = value.substr(1, value.length - 2);
    }
    return value;
  }
};

module.exports = {
  convert: function (content) {
    var lines = content.toString().split(/\r?\n/);
    var result = '';
    var i;
    var stream;
    var properties = {};
    var currentCategory = '';

    for (i = 0; i < lines.length; i++) {
      stream = lines[i];
      stream = util.compress(stream);

      if (util.isCategory(stream)) {
        currentCategory = util.getCategory(stream);
        properties[currentCategory] = {};
      } else if (util.isProperty(stream)) {
        properties[currentCategory][util.getPropertyKey(stream)] = util.getPropertyValue(stream);
      }
    }

    return properties;
  }
};
