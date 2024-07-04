(function($) {
    // Define the plugin
    $.fn.formRowRepeater = function(options) {
        const settings = $.extend({
            templateRow: '.template-row',
            addRowButton: '#add-row',
            sortableContainer: this,
            rowClass: '.form-row',
            handleClass: '.handle',
            removeButtonClass: '.remove-row',
            sortOrderClass: '.sort-order',
            afterAddedRow: null // Callback function
        }, options);

        // Function to update sort order
        this.updateSortOrder = function() {
            console.log('sort ordering....');
            console.log('sortableContainer: ' + settings.sortableContainer);
            console.log('rowClass: ' + settings.rowClass);
            console.log('sortOrderClass: ' + settings.sortOrderClass);
            $(settings.sortableContainer, this).find(settings.rowClass).each(function(index) {
                $(this).find(settings.sortOrderClass).val(index + 1);
            });
        }

        // Clear values of a form row
        function clearRowValues($row) {
            console.log('clearing form....');
            //console.log('sortOrderClass: ' + settings.sortOrderClass);
            $row.find('input[type="text"]').val('');
            $row.find('select').val('');
            $row.find('input[type="checkbox"], input[type="radio"]').prop('checked', false);
        }
	
	// Add a new row
        this.addRow = function(event) {
            console.log('adding row....');
            const $templateRow = $(settings.templateRow);
            const $newRow = $templateRow.first().clone();
            clearRowValues($newRow); // Clear input values
            const rowCount = $(settings.sortableContainer, this).children(settings.rowClass).length;
            $newRow.find(settings.sortOrderClass).val(rowCount + 1);
            $(settings.sortableContainer, this).append($newRow);
            this.updateSortOrder();
            
            // Call the afterAddedRow callback if provided
            if (typeof settings.afterAddedRow === 'function') {
                settings.afterAddedRow($newRow);
            }
            
        };

        // Initialize sortable functionality
        this.makeSortable = function() {
            const self = this; // Capture `this` context
            $(settings.sortableContainer, this).sortable({
                handle: settings.handleClass,
                axis: 'y',
                update: function(event, ui) {
                    self.updateSortOrder();
                }
            });
        };

        // Initialize the plugin
        this.init = function() {
            console.log('Initialize the plugin');
            console.log('ID: ' + this.attr('id'));
            this.makeSortable();
            $(settings.addRowButton, this).on('click', (event) => {
            	 event.preventDefault();
                this.addRow();
                this.makeSortable();
            });
            $(settings.sortableContainer, this).on('click', settings.removeButtonClass, function() {
                $(this).closest(settings.rowClass).remove();
                this.updateSortOrder();
            });

            // Show the first row by default
            $(settings.sortableContainer, this).children(settings.rowClass).first();

            // Update sort order initially
            this.updateSortOrder();
            
            
        };

        return this.init();
    };
}(jQuery));

