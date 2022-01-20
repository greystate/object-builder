(function() {
  this.ecoTemplates || (this.ecoTemplates = {});
  this.ecoTemplates["coffee"] = function(__obj) {
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
        var i, len, m, method, ref;
      
        __out.push('class ');
      
        __out.push(__sanitize(this.name));
      
        __out.push('\n  constructor: (');
      
        __out.push(__sanitize("" + (((function() {
          var i, len, ref, results;
          ref = this.properties;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            m = ref[i];
            results.push('@' + m.name);
          }
          return results;
        }).call(this)).join(', '))));
      
        __out.push(') ->\n');
      
        ref = this.methods;
        for (i = 0, len = ref.length; i < len; i++) {
          method = ref[i];
          __out.push('\n  ');
          __out.push(__sanitize(method.name));
          __out.push(': () ->\n    # implementation\n');
        }
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
