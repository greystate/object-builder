(function() {
  this.ecoTemplates || (this.ecoTemplates = {});
  this.ecoTemplates["es6"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        var m, method, prop, _i, _j, _len, _len1, _ref, _ref1;
      
        __out.push('class ');
      
        __out.push(__sanitize(this.name));
      
        __out.push(' {\n\tconstructor(');
      
        __out.push(__sanitize("" + (((function() {
          var _i, _len, _ref, _results;
      
          _ref = this.properties;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            m = _ref[_i];
            _results.push(m.name);
          }
          return _results;
        }).call(this)).join(', '))));
      
        __out.push(') {');
      
        _ref = this.properties;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          prop = _ref[_i];
          __out.push('\n\t\tthis.');
          __out.push(__sanitize(prop.name));
          __out.push(' = ');
          __out.push(__sanitize(prop.name));
        }
      
        __out.push('\n\t}\n');
      
        _ref1 = this.methods;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          method = _ref1[_j];
          __out.push('\n\t');
          __out.push(__sanitize(method.name));
          __out.push('() {\n\t\t// implementation\n\t}\n');
        }
      
        __out.push('\n}\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
