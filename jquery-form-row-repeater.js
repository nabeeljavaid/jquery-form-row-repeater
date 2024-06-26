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
            sortOrderClass: '.sort-order'
        }, options);

        // Function to update sort order
        function updateSortOrder() {
            $(settings.sortableContainer).find(settings.rowClass).each(function(index) {
                $(this).find(settings.sortOrderClass).val(index + 1);
            });
        }

        // Clear values of a form row
        function clearRowValues($row) {
            $row.find('input[type="text"]').val('');
            $row.find('select').val('');
            $row.find('input[type="checkbox"], input[type="radio"]').prop('checked', false);
        }
	
	// Add a new row
        this.addRow = function() {
            const $templateRow = $(settings.templateRow);
            const $newRow = $templateRow.first().clone();
            clearRowValues($newRow); // Clear input values
            const rowCount = $(settings.sortableContainer).children(settings.rowClass).length;
            $newRow.find(settings.sortOrderClass).val(rowCount + 1);
            $(settings.sortableContainer).append($newRow);
            updateSortOrder();
        };

        // Initialize sortable functionality
        this.makeSortable = function() {
            $(settings.sortableContainer).sortable({
                handle: settings.handleClass,
                axis: 'y',
                update: function(event, ui) {
                    updateSortOrder();
                }
            });
        };

        // Initialize the plugin
        this.init = function() {
            console.log('Initialize the plugin');
            this.makeSortable();
            $(settings.addRowButton).on('click', () => {
                this.addRow();
                this.makeSortable();
            });
            $(settings.sortableContainer).on('click', settings.removeButtonClass, function() {
                $(this).closest(settings.rowClass).remove();
                updateSortOrder();
            });

            // Show the first row by default
            $(settings.sortableContainer).children(settings.rowClass).first();

            // Update sort order initially
            updateSortOrder();
        };

        return this.init();
    };
}(jQuery));

