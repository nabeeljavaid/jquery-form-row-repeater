# Form Row Repeater

`formRowRepeater` is a lightweight jQuery plugin that allows you to dynamically add, remove, and sort form rows with drag-and-drop functionality. This is ideal for forms that require repeating fields such as adding multiple employees, contacts, or any repetitive data entries.

## Screenshot
![screenshot](https://github.com/nabeeljavaid/jquery-form-row-repeater/assets/2786954/90043798-2824-4668-92c5-23da94f0cae1)


## Features

- Dynamically add new form rows.
- Remove existing form rows.
- Drag-and-drop sorting of form rows.
- Automatic updating of row order values.
- Supports various input types including text, select, checkboxes, and radio buttons.
- Simple and intuitive to integrate and use with minimal configuration.

## Getting Started

### Prerequisites

Include the following libraries in your HTML file:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
```

Optionally, you can include FontAwesome and Bootstrap for better styling:

```html
<!-- Optional: FontAwesome for handle icon -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
<!-- Optional: Bootstrap for styling -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet"/>
```

### Installation

Include the `jquery.formRowRepeater.js` script in your HTML file:

```html
<script src="path/to/jquery.formRowRepeater.js"></script>
```

### Usage

Create a form with a template row. The template row should be styled with Bootstrap classes and hidden initially:

```html
<form id="employees">
<!-- Template row with Bootstrap classes -->
<div id="form-rows">
  <div class="row g-3 align-items-center mb-4 form-row template-row">
    <div class="col-auto handle">
      <i class="fas fa-grip-vertical"></i>
    </div>
    <div class="col-auto">
      <input type="text" class="form-control" name="employees[{n}][name]" placeholder="Enter employee name">
    </div>
    <div class="col-auto">
      <select class="form-select" name="employees[{n}][dept]">
        <option value="">Select Department</option>
        <option value="IT">IT</option>
        <option value="Sales & Marketing">Sales & Marketing</option>
        <option value="HR">HR</option>
        <option value="Operations">Operations</option>
      </select>
    </div>
    <div class="col-auto">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="employees[{n}][perks]" value="Salary" id="checkboxSalary">
        <label class="form-check-label" for="checkboxSalary">Salary</label>
      </div>
    </div>
    <div class="col-auto">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="employees[{n}][perks]" value="Commission" id="checkboxCommission">
        <label class="form-check-label" for="checkboxCommission">Commission</label>
      </div>
    </div>
    <div class="col-auto">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="employees[{n}][gender]" value="M" id="radioMale">
        <label class="form-check-label" for="radioMale">Male</label>
      </div>
    </div>
    <div class="col-auto">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="employees[{n}][gender]" value="F" id="radioFemale">
        <label class="form-check-label" for="radioFemale">Female</label>
      </div>
    </div>
    <div class="col-auto">
      <input type="text" class="form-control sort-order" name="employees[{n}][sort_order]" value="1" style="width: 100px">
    </div>
    <div class="col-auto">
      <button type="button" class="btn btn-danger remove-row">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
</div>
<button id="add-row" class="btn btn-primary">Add Row</button>
<button id="submit" class="btn btn-primary">Submit</button>
</form>
```

Initialize the `formRowRepeater` plugin on the form:

```html
<script>
    $(document).ready(function() {
        $('#employees').formRowRepeater({
            templateRow: '.template-row',
            addRowButton: '#add-row',
            sortableContainer: '#employees',
            rowClass: '.form-row',
            handleClass: '.handle',
            removeButtonClass: '.remove-row',
            sortOrderClass: '.sort-order'
        });
    });
</script>
```

## Configuration Options

| Option             | Type   | Default            | Description                                               |
|--------------------|--------|--------------------|-----------------------------------------------------------|
| `templateRow`      | String | `.template-row`    | Selector for the template row                             |
| `addRowButton`     | String | `#add-row`         | Selector for the button to add a new row                  |
| `sortableContainer`| String | `this`             | Selector for the container of the sortable rows           |
| `rowClass`         | String | `.form-row`        | Class of the rows to be repeated                          |
| `handleClass`      | String | `.handle`          | Class of the handle element used for sorting              |
| `removeButtonClass`| String | `.remove-row`      | Class of the button to remove a row                       |
| `sortOrderClass`   | String | `.sort-order`      | Class of the input to store the sort order value          |

## License

This project is licensed under the MIT License. See the LICENSE file for details.

