/**
 * jQuery Form Row Repeater Plugin
 * Version: 2.0
 * 
 * A jQuery plugin to handle dynamic form row repetition with sorting functionality.
 * Allows adding, removing, and sorting form rows based on a template.
 * 
 * @author Nabeel Javaid <nabeeljavaid.nmj@gmail.com>
 * @version 2.0
 * 
 * @param {Object} options - Plugin options for customization.
 * @param {string} [options.templateRow='.template-row'] - Selector for the template row.
 * @param {string} [options.addRowButton='#add-row'] - Selector for the add row button.
 * @param {string} [options.sortableContainer] - Selector for the sortable container.
 * @param {string} [options.rowClass='.form-row'] - Class for each form row.
 * @param {string} [options.handleClass='.handle'] - Class for the handle of sortable rows.
 * @param {string} [options.removeButtonClass='.remove-row'] - Class for the remove row button.
 * @param {string} [options.sortOrderClass='.sort-order'] - Class for sorting order input field.
 * @param {number} [options.level=0] - Nested level to replace `[number]` in field names.
 * @param {function} [options.afterAddedRow=null] - Callback function after adding a row.
 */

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
			level: 0,
			afterAddedRow: null // Callback function
		}, options);

		let $template = null;

		// Function to update sort order
		this.updateSortOrder = function() {
			$(settings.sortableContainer, this).find(settings.rowClass).each(function(index) {
				$(this).find(settings.sortOrderClass).val(index + 1);
			});
		}

		// Clear values of a form row
		function clearRowValues($row) {
			$row.find('input[type="text"]').val('');
			$row.find('input[type="hidden"]').val('');
			$row.find('select').each(function() {
				$(this).val($(this).find('option:first').val());
			});
			$row.find('input[type="checkbox"], input[type="radio"]').prop('checked', false);
		}

		// Add a new row
		this.addRow = function() {

			const $rowId = Date.now();
			let $newRow = $template.clone();
			$newRow.attr('data-row-id', $rowId); // Set UUID attribute

			const rowCount = $(settings.sortableContainer, this).children(settings.rowClass).length;
			const level = settings.level;

			$newRow.find('input, select').each(function() {
				let name = $(this).attr('name');

				let count = 0;
				name = name.replace(/\[\d+\]/g, function(match) {
					count++;
					return count === level + 1 ? `[${rowCount}]` : match;
				});

				$(this).attr('name', name);
			});

			clearRowValues($newRow); // Clear input values

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
			console.log('Initialized the plugin');

			$template = $(settings.templateRow, this).first().clone();

			this.makeSortable();

			// Add row event handler
			$(settings.addRowButton, this).on('click', (event) => {
				event.preventDefault();
				this.addRow();
				this.makeSortable();
			});

			// Remove row event handler
			$(settings.sortableContainer, this).on('click', settings.removeButtonClass, function() {

				$(this).closest(settings.rowClass).remove();
			});

			// Update sort order initially
			this.updateSortOrder();


		};

		return this.init();
	};
}(jQuery));
