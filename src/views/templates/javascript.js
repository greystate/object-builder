(function() {
  this.ecoTemplates || (this.ecoTemplates = {});
  this.ecoTemplates["javascript"] = function(__obj) {
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
        var i, j, len, len1, method, property, ref, ref1;
      
        __out.push('(function() {\n\tvar _ = self.');
      
        __out.push(__sanitize(this.name));
      
        __out.push(' = function() {\n\t\t// Properties');
      
        ref = this.properties;
        for (i = 0, len = ref.length; i < len; i++) {
          property = ref[i];
          __out.push('\n\t\tthis.');
          __out.push(__sanitize(property.name));
          __out.push(' = ');
          __out.push(this.nameForType(property.type));
          __out.push(';');
        }
      
        __out.push('\n\t};\n\n\t_.prototype = {\n\t\t// Methods');
      
        ref1 = this.methods;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          method = ref1[j];
          __out.push('\n\t\t');
          __out.push(__sanitize(method.name));
          __out.push(': function() { }\n\t');
        }
      
        __out.push('\n\t}\n})();\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
