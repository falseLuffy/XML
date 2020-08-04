(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.XML = factory());
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

  var tag = "<(\\w+)((\\s+([\\w][\\-\\d\\w]*?=(['\"])([^'\"<>]*?)\\5))*)*\\s*?>([^<>]*?)<\\/\\1>";
  var openTag = "<(\\w+)((\\s+([\\w][\\-\\d\\w]*?=(['\"])([^'\"<>]*?)\\5))*)*\\s*/>";
  function parse(xmlString) {
    var tagMap = {};
    var tagg = new RegExp(tag, 'g');
    var a = stringReplace(new RegExp(openTag, 'g'), new RegExp(openTag), xmlString, tagMap);
    xmlString = a.xml;
    var b = stringReplace(tagg, new RegExp(tag), xmlString, tagMap);
    xmlString = b.xml;
    return Object.keys(tagMap).map(function (key) {
      var node = nodeParse(tagMap[key]);
      return node;
    });
  }

  function stringReplace(reg1, reg2, xmlString, tagMap) {
    while (reg1.test(xmlString)) {
      var matchList = xmlString.match(reg1);
      matchList.forEach(function (item) {
        var random = uuid();
        var identifier = '\\$\\{(.*?)\\}';
        var identifier_g = new RegExp(identifier, 'g');
        var content = (item.match(new RegExp(tag)) || [])[7] || '';
        var children = (content.match(identifier_g) || []).map(function (item) {
          var uuid = (item.match(new RegExp(identifier)) || [])[1] || '';
          var child = tagMap[uuid];
          delete tagMap[uuid];
          return child;
        });
        content.replace(identifier_g, '&&&&').split('&&&&').forEach(function (item, index) {
          if (item.trim()) {
            children.splice(index, 0, item.trim());
          }
        });
        xmlString = xmlString.replace(item, "${".concat(random, "}"));
        tagMap[random] = {
          xml: item,
          children: children,
          tag: (item.match(new RegExp(reg2)) || [])[1] || ''
        };
      });
    }

    return {
      tagMap: tagMap,
      xml: xmlString
    };
  }

  function nodeParse(data) {
    if (!data) return;

    if (Array.isArray(data)) {
      data.map(function (item) {
        return nodeParse(item);
      });
    } else {
      var obj = {};
      var attr = {};
      var reg = "([\\w][\\-\\d\\w]*?)=((['\"])([^'\"<>]*?)\\3)";
      var attrString = data.xml ? (data.xml.match(new RegExp(tag)) || data.xml.match(new RegExp(openTag)) || [])[2] || '' : '';
      var text = data.xml ? undefined : data;
      (attrString.match(new RegExp(reg, 'g')) || []).forEach(function (item) {
        var a = item.match(reg);
        attr[a[1]] = a[4];
      });

      if (data.tag) {
        obj[data.tag] = _objectSpread2(_objectSpread2({}, attr), {}, {
          children: (data.children || []).map(function (item) {
            return nodeParse(item);
          })
        });
      } else {
        obj.text = {
          text: text
        };
      }

      return obj;
    }
  }

  function generateXML(data) {
    var XMLHeader = '<?xml version=\'1.0\' encoding=\'utf-8\'?>';
    return "".concat(XMLHeader).concat(generate(data));
  }

  function generate(json, tag) {
    var XMLString = '';

    if (Array.isArray(json)) {
      json.forEach(function (item) {
        XMLString += generate(item, Object.keys(item)[0]);
      });
    } else {
      XMLString += node(tag, json[tag]);
    }

    return XMLString;
  }

  function node(tag, data) {
    var dataKey = Object.keys(data);
    var attrString = dataKey.filter(function (key) {
      return _typeof(data[key]) !== 'object' && key !== 'text';
    }).map(function (key) {
      return "".concat(key, "=\"").concat(data[key], "\"");
    }).join(' ');
    attrString = attrString ? ' ' + attrString : '';
    var children = dataKey.filter(function (key) {
      return _typeof(data[key]) === 'object';
    }).map(function (key) {
      return generate(data[key], key);
    });
    return tag !== 'children' ? tag !== 'text' ? data.children && data.children.length ? "<".concat(tag).concat(attrString, ">").concat(children, "</").concat(tag, ">") : "<".concat(tag).concat(attrString, " />") : data.text : children;
  }

  var index = {
    parse: parse,
    stringify: generateXML
  };

  return index;

})));
