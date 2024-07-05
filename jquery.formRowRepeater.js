/**
 * jQuery Form Row Repeater Plugin
 * Version: 1.0
 * 
 * A jQuery plugin to handle dynamic form row repetition with sorting functionality.
 * Allows adding, removing, and sorting form rows based on a template.
 * 
 * @author Nabeel Javaid <nabeeljavaid.nmj@gmail.com>
 * @version 1.0
 * 
 * @param {Object} options - Plugin options for customization.
 *   @param {string} [options.templateRow='.template-row'] - Selector for the template row.
 *   @param {string} [options.addRowButton='#add-row'] - Selector for the add row button.
 *   @param {string} [options.sortableContainer] - Selector for the sortable container.
 *   @param {string} [options.rowClass='.form-row'] - Class for each form row.
 *   @param {string} [options.handleClass='.handle'] - Class for the handle of sortable rows.
 *   @param {string} [options.removeButtonClass='.remove-row'] - Class for the remove row button.
 *   @param {string} [options.sortOrderClass='.sort-order'] - Class for sorting order input field.
 *   @param {function} [options.afterAddedRow=null] - Callback function after adding a row.
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
			rowCounterPlaceholder: '{n}',
			afterAddedRow: null // Callback function
		}, options);

		let $template = null;
		let $rowCount = 0;

		// Function to update sort order
		this.updateSortOrder = function() {
			console.log('sort ordering....');
			$(settings.sortableContainer, this).find(settings.rowClass).each(function(index) {
				$(this).find(settings.sortOrderClass).val(index + 1);
			});
		}

		// Clear values of a form row
		function clearRowValues($row) {
			console.log('clearing form....');
			$row.find('input[type="text"]').val('');
			$row.find('select').val('');
			$row.find('input[type="checkbox"], input[type="radio"]').prop('checked', false);
		}
		
		function generateUUID() {
		  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random() * 16 | 0,
			v = c === 'x' ? r : (r & 0x3 | 0x8);
		    return v.toString(16);
		  });
		}
		
		// Add a new row
		this.addRow = function($rowCounter) {
			console.log('adding row....');
			
			console.log('rowCounter:' + $rowCounter);
			const $rowId = generateUUID();
			let $newRow = $template.clone();
			$newRow.attr('data-row-id', $rowId); // Set UUID attribute
			
			$newRow.find('input, select').each(function() {
				const name = $(this).attr('name').replace(settings.rowCounterPlaceholder, $rowCounter);
				$(this).attr('name', name);
			});

			clearRowValues($newRow); // Clear input values
			const rowCount = $(settings.sortableContainer, this).children(settings.rowClass).length;
			$newRow.find(settings.sortOrderClass).val(rowCount + 1);
			$(settings.sortableContainer, this).append($newRow);

			this.updateSortOrder();

			// Call the afterAddedRow callback if provided
			if (typeof settings.afterAddedRow === 'function') {
				settings.afterAddedRow($rowId);
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

			$template = $(settings.templateRow).first().clone();
			
			
			// Remove the original template row from DOM
			$(settings.templateRow, this).first().remove();

			// Append a first row on initialization
			this.addRow(0);

			this.makeSortable();

			// Add row event handler
			$(settings.addRowButton, this).on('click', (event) => {
				event.preventDefault();
				$rowCount++;
				this.addRow($rowCount);
				this.makeSortable();
			});

			// Remove row event handler
			$(settings.sortableContainer, this).on('click', settings.removeButtonClass, function() {
				console.log('removing row....');
				$(this).closest(settings.rowClass).remove();
			});

			// Update sort order initially
			this.updateSortOrder();


		};

		return this.init();
	};
}(jQuery));
