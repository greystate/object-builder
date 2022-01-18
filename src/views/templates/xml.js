(function() {
  this.ecoTemplates || (this.ecoTemplates = {});
  this.ecoTemplates["xml"] = function(__obj) {
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
        var i, j, len, len1, method, prop, ref, ref1, ref2;
      
        __out.push('<object id="');
      
        __out.push(__sanitize((ref = this.name) != null ? ref.toLowerCase() : void 0));
      
        __out.push('" xmlns="http://xmlns.greystate.dk/2002/object-descriptor">\n\t<name>');
      
        __out.push(__sanitize(this.name));
      
        __out.push('</name>\n\t');
      
        ref1 = this.properties;
        for (i = 0, len = ref1.length; i < len; i++) {
          prop = ref1[i];
          __out.push('\n\t<property');
          if ((prop.type != null) && prop.type !== 'default') {
            __out.push(' type="');
            __out.push(this.nameForType(prop.type));
            __out.push('"');
          }
          __out.push('>\n\t\t<name>');
          __out.push(__sanitize(prop.name));
          __out.push('</name>\n\t</property>\n\t');
        }
      
        __out.push('\n\t');
      
        ref2 = this.methods;
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          method = ref2[j];
          __out.push('\n\t<method>\n\t\t<name>');
          __out.push(__sanitize(method.name));
          __out.push('</name>\n\t</method>\n\t');
        }
      
        __out.push('\n</object>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
