/**
 * jQuery serializeFormToJson Plugin
 * Version: 1.0
 * 
 * A jQuery plugin to serialize form data into nested JSON objects.
 * Converts form data with array-like names into structured JSON.
 * 
 * @author Nabeel Javaid <nabeeljavaid.nmj@gmail.com>
 * @version 1.0
 */
 
(function($) {
  // Define the plugin function
  $.fn.serializeFormToJson = function() {
    // Function to serialize form data to JSON
    function serializeFormData($form) {
      var formData = $form.serializeArray();
      var jsonData = {};

      // Process each form field
      $.each(formData, function() {
        var name = this.name;
        var value = this.value;

        // Split the name into parts to navigate through nested structure
        var nameParts = name.split('[').map(function(part) {
          return part.replace(']', '');
        });

        var currentLevel = jsonData;

        // Traverse through the nested structure and create objects as needed
        for (var i = 0; i < nameParts.length; i++) {
          var isArray = /\[\d+\]/.test(nameParts[i]); // Check if current part is an array index

          if (isArray) {
            var arrayName = nameParts[i].substring(0, nameParts[i].indexOf('['));
            var index = parseInt(nameParts[i].match(/\d+/)[0]);

            if (!currentLevel[arrayName]) {
              currentLevel[arrayName] = [];
            }

            if (!currentLevel[arrayName][index]) {
              currentLevel[arrayName][index] = {};
            }

            if (i === nameParts.length - 1) {
              currentLevel[arrayName][index] = value || '';
            } else {
              currentLevel = currentLevel[arrayName][index];
            }
          } else {
            if (!currentLevel[nameParts[i]]) {
              if (i === nameParts.length - 1) {
                currentLevel[nameParts[i]] = value || '';
              } else {
                currentLevel[nameParts[i]] = {};
              }
            }

            if (typeof currentLevel[nameParts[i]] === 'object') {
              currentLevel = currentLevel[nameParts[i]];
            }
          }
        }
      });

      return jsonData;
    }

    // Return serialized JSON data
    return JSON.stringify(serializeFormData(this), null, 2);
  };
})(jQuery);

