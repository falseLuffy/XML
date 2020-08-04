(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.OneSocket = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function uuid() {
    var s = [];
    var hexDigits = '0123456789abcdef';

    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }

    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010

    s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01

    s[8] = s[13] = s[18] = s[23] = '-';
    return s.join('');
  }

  var tag = /<(\w+)([^<>]*?)>[^<>]*?<\/\1>/;
  function parse(xmlString) {
    var tagMap = {};
    var tagg = /<(\w+)([^<>]*?)>[^<>]*?<\/\1>/g;

    while (tagg.test(xmlString)) {
      var matchList = xmlString.match(tagg);
      matchList.forEach(function (item) {
        var random = uuid();
        var identifier = /\$\{(.*?)\}/;
        var identifierg = /\$\{(.*?)\}/g;
        var children = (item.match(identifierg) || []).map(function (item) {
          var uuid = (item.match(identifier) || [])[1] || '';
          var child = tagMap[uuid];
          delete tagMap[uuid];
          return child;
        });
        xmlString = xmlString.replace(item, "${".concat(random, "}"));
        tagMap[random] = {
          xml: item,
          children: children,
          tag: (item.match(tag) || [])[1] || ''
        };
      });
    }

    console.log(JSON.stringify(tagMap));
    return Object.keys(tagMap).map(function (key) {
      var node = nodeParse(tagMap[key]);
      return node;
    });
  }

  function nodeParse(data) {
    if (Array.isArray(data)) {
      data.map(function (item) {
        return nodeParse(item);
      });
    } else {
      var obj = {};
      var attr = {};
      (((data.xml || '').match(tag) || [])[2] || '').split(' ').filter(function (item) {
        return item;
      }).map(function (item) {
        return item.split('=');
      }).forEach(function (item) {
        attr[item[0]] = item[1];
      });
      obj[data.tag] = _objectSpread2(_objectSpread2({}, attr), {}, {
        children: data.children.map(function (item) {
          return nodeParse(item);
        })
      });
      return obj;
    }
  } // var str = '<?xml version=\'1.0\' encoding=\'utf-8\'?><root><pointer><dev nPclType="1"></dev><dev nPclType="1" nPclType2="1"></dev><dev nPclType="1"></dev><protocol nMinAddr="3"><point nDevIndex="11"></point></protocol></pointer></root>'
  // parse(str)
  // console.log(JSON.stringify(parse(str)))

  function generateXML(data) {
    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pointer';
    var XMLHeader = '<?xml version=\'1.0\' encoding=\'utf-8\'?>';
    return "".concat(XMLHeader, "<root>").concat(generate(data, tag), "</root>");
  }

  function generate(json) {
    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pointer';
    var XMLString = '';

    if (Array.isArray(json)) {
      json.forEach(function (item) {
        XMLString += generate(item);
      });
    } else {
      XMLString += node(tag, json);
    }

    return XMLString;
  }

  function node(tag, data) {
    var dataKey = Object.keys(data);
    var attrString = dataKey.filter(function (key) {
      return _typeof(data[key]) !== 'object';
    }).map(function (key) {
      return "".concat(key, "=\"").concat(data[key], "\"");
    }).join(' ');
    var children = dataKey.filter(function (key) {
      return _typeof(data[key]) === 'object';
    }).map(function (key) {
      return generate(data[key], key);
    });
    return "<".concat(tag, " ").concat(attrString, ">").concat(children, "</").concat(tag, ">");
  }

  var index = {
    parse: parse,
    generate: generateXML
  };

  return index;

})));
