class Inputs {
	constructor(options) {
		this.fields = options.fields;

		for (let i = 0; i < this.fields.length; i++) {
			this.fields[i].addEventListener('input', this.render.bind(this));
		}

		window.addEventListener('load', this.checkInputs.bind(this));
	}

	render(event) {
		const target = event.target;
		const value = target.value;

		if (value.length > 0) {
			target.parentNode.querySelector('.field__label').classList.add('field__label_active');
		}
		else {
			target.parentNode.querySelector('.field__label').classList.remove('field__label_active');
		}
	}

	checkInputs() {
		for (let i = 0; i < this.fields.length; i++) {
			if (this.fields[i].value.length > 0) {
				this.fields[i].parentNode.querySelector('.field__label').classList.add('field__label_active');
			}
		}
	}
}

class DropDown {
	constructor(dropdown) {
		this.dropdown = document.querySelector(dropdown);
		this.select = this.dropdown.querySelector(`${dropdown}__select`);
		this.hiddenInput = this.dropdown.querySelector(`${dropdown}__hidden-input`);

		this.select.addEventListener('click', this.viewDropDownByToggle.bind(this));
		document.addEventListener('click', this.hideDropDown.bind(this));
		this.dropdown.addEventListener('click', this.chooseItem.bind(this));
		document.addEventListener('keydown', this.hideDropDownByEscape.bind(this));

	}

	viewDropDownByToggle(e) {
		const target = e.target;
		target.parentNode.classList.toggle('dropdown_active');
	}
	hideDropDown(e) {
		if (!e.target.classList.contains('dropdown__select') && this.dropdown.classList.contains('dropdown_active')) {
			this.dropdown.classList.remove('dropdown_active');
		}
		return;
	}
	hideDropDownByEscape(e) {
		if (e.keyCode === 27 && this.dropdown.classList.contains('dropdown_active')) {
			this.dropdown.classList.remove('dropdown_active');
		}
		return;

	}
	chooseItem(e) {
		const target = e.target;

		if (target.classList.contains('dropdown-menu__item')) {
			this.hiddenInput.value = target.textContent;
			this.select.textContent = target.textContent;
			this.select.classList.add('dropdown__select_choosen');
		}
	}
}

export {Inputs, DropDown};
