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

		// Add a new row
		this.addRow = function(event) {
			console.log('adding row....');
			
			$rowCount++;
			let $newRow = $template.clone();
			$newRow.find('input, select').each(function() {
			    const name = $(this).attr('name').replace('{n}', $rowCount);
			    $(this).attr('name', name);
			});
			
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
			
			$template = $(settings.templateRow).first().clone();
		      	$template.removeClass('template-row'); // Remove template class

		      	// Remove the original template row from DOM
		      	$(settings.templateRow).first().remove();
      			
      			// Append a first row on initialization
      			this.addRow();
			
			this.makeSortable();
			
			// Add row event handler
			$(settings.addRowButton, this).on('click', (event) => {
				event.preventDefault();
				this.addRow();
				this.makeSortable();
			});
			
			// Remove row event handler
			$(settings.sortableContainer, this).on('click', settings.removeButtonClass, function() {
			        console.log('removing row....');
				$(this).closest(settings.rowClass).remove();
				updateSortOrder();
			});

			// Show the first row by default
			// $(settings.sortableContainer, this).children(settings.rowClass).first();

			// Update sort order initially
			this.updateSortOrder();


		};

		return this.init();
	};
}(jQuery));
