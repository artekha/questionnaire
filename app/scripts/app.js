// Adding classes for input's labels
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

const inputs = new Inputs({
	fields: document.getElementsByClassName('field__input')
});

// DropDown menu (years of birth)
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

const dropdown = new DropDown('.dropdown');

class HeaderMenu {
	constructor(header) {
		this.header = document.querySelector(header);
		this.toggle = this.header.querySelector(`${header}-nav__toggle`);
		this.menu = this.header.querySelector(`${header}-nav`);


		this.toggle.addEventListener('click', this.viewDropDownByToggle.bind(this));
		document.addEventListener('click', this.hideDropDown.bind(this));

	}

	viewDropDownByToggle(e) {
		const target = e.target;
		target.parentNode.classList.toggle('header_active');
	}
	hideDropDown(e) {
		if (e.target.classList.contains('header-nav__toggle')) return;
		this.header.classList.remove('header_active');
	}
}

const headerMenu = new HeaderMenu('.header');

class Scrollspy {
	constructor(options) {
		this.list = options.linkList;
		this.id = options.linkId;
		this.breakpoints = [];
		this.counter = 0;

		this.checkState = 0;

		// Get breakpointes
		this.getBreakpoints();

		// Add events on anchors
		for (let item of this.list) {
			item.addEventListener('click', this.scrollByClick.bind(this));
		}

		// Scroll event
		window.addEventListener('scroll', this.scroll.bind(this));
	}
	getCoords(element) {
		const box = element.getBoundingClientRect();
		return box.top + pageYOffset;
	}
	getBreakpoints() {
		for(let breakpoint of this.id){
			this.breakpoints.push(this.getCoords(breakpoint));
		}
	}
	scrollByClick(e) {
		e.preventDefault();
		const scrollEl = document.querySelector(e.target.getAttribute('href'));
		const scrollElCoords = scrollEl.getBoundingClientRect().top + pageYOffset - 80;
		window.scrollTo(0, scrollElCoords);
	}
	scroll() {
		// Check breakpoints
		for (let i = 0; i < this.breakpoints.length; i++){
			if (window.pageYOffset + 80 >= this.breakpoints[i]) {
				this.counter = i;
			}
		}

		if (this.counter !== this.checkState) {
			// Set counter
			this.checkState = this.counter;

			// Check list
			for (let item of this.list) {
				item.classList.remove('header-nav__link_active');
			}
			this.list[this.counter].classList.add('header-nav__link_active');
		}
	}
}

const scrollspy = new Scrollspy({
	linkList: document.querySelectorAll('.header-nav__link'),
	linkId: document.querySelectorAll('.section')
});

class CognitionSlider {

	constructor(options) {

		// Values
		this.anchors = options.anchors;
		this.line = options.line;
		this.phantom = options.phantom;
		this.pointer = options.pointer;
		this.input = options.input;

		// Methods
		for (let item of this.anchors) {
			item.addEventListener('click', this.changeByAnchor.bind(this));
		}
		this.line.addEventListener('click', this.changeByLine.bind(this));
		this.pointer.ondragstart = () => {
			return false;
		};
		this.pointer.addEventListener('mousedown', this.changeByDrag.bind(this));
		document.onmouseup = () => {
			this.pointer.classList.add('cognition-lane__pointer_animate');
		}

	}

	changeByAnchor(e) {

		e.preventDefault();

		let level = e.target.dataset.level;
		let width = this.line.offsetWidth;
		let input = this.input;
		let position, value, phantomWidth;

		switch (level) {
			case '0':
				position = -10;
				value = e.target.textContent;
				phantomWidth = 0;
				break;
			case '1':
				position = width * 25 / 100 - 10;
				value = e.target.textContent;
				phantomWidth = width * 25 / 100;
				break;
			case '2':
				position = width * 50 / 100 - 10;
				value = e.target.textContent;
				phantomWidth = width * 50 / 100;
				break;
			case '3':
				position = width - 11;
				value = e.target.textContent;
				phantomWidth = width;
				break;
		}

		input.value = value;
		this.pointer.style.left = `${position}px`;
		this.phantom.style.width = `${phantomWidth}px`;
		for (let item of this.anchors) {
			item.classList.remove('cognition-lane__anchor_active');
		}
		e.target.classList.add('cognition-lane__anchor_active');

	}

	changeByLine(e) {

		if (e.target.classList.contains('cognition-lane__pointer')) return;
		const width = this.line.offsetWidth;
		let coords = e.target.getBoundingClientRect();
		let percentage = Math.round((e.clientX - coords.left) / width * 100);

		this._determinePosition(percentage, width);


	}

	changeByDrag(e) {

		this.pointer.classList.remove('cognition-lane__pointer_animate');
		this.phantom.classList.remove('cognition-lane__phantom_animate');

		e.preventDefault();

		let pointerCoords = this._getCoords(this.pointer);
		let shiftX = e.pageX - pointerCoords.left;
		let lineCoords = this._getCoords(this.line);
		let width = this.line.offsetWidth;

		document.onmousemove = e => {

      let newLeft = e.pageX - shiftX - lineCoords.left;
      if (newLeft < - 6) {
        newLeft = - 6;
      }

      let rightEdge = this.line.offsetWidth - this.pointer.offsetWidth + 16;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      this.pointer.style.left = `${newLeft - 5}px`;
			this.phantom.style.width = `${newLeft + 6}px`;
    }

		document.onmouseup = (e) => {
			this.pointer.classList.add('cognition-lane__pointer_animate');
			this.phantom.classList.add('cognition-lane__phantom_animate');
			e.stopImmediatePropagation();
			document.onmousemove = document.onmouseup = null;
			let width = this.line.offsetWidth;
			let percentage = Math.round((this._getCoords(this.pointer).left - this._getCoords(this.line).left + 6) / width * 100);

			this._determinePosition(percentage, width);

    }

	}

	_getCoords(elem) {

    let box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  }

	_determinePosition(percentage, width) {

		for (let item of this.anchors) {
			item.classList.remove('cognition-lane__anchor_active');
		}

		if (percentage <= 13) {
			this.input.value = document.querySelector('[data-level="0"]').textContent;
			this.pointer.style.left = '-10px';
			this.phantom.style.width = '0px';
			document.querySelector('[data-level="0"]').classList.add('cognition-lane__anchor_active');
		} else if (percentage > 13 && percentage <= 38) {
			this.input.value = document.querySelector('[data-level="1"]').textContent;
			this.pointer.style.left = `${width * 25 / 100 - 10}px`;
			this.phantom.style.width = `${width * 25 / 100}px`;
			document.querySelector('[data-level="1"]').classList.add('cognition-lane__anchor_active');
		} else if (percentage > 38 && percentage <= 75) {
			this.input.value = document.querySelector('[data-level="2"]').textContent;
			this.pointer.style.left = `${width * 50 / 100 - 10}px`;
			this.phantom.style.width = `${width * 50 / 100}px`;
			document.querySelector('[data-level="2"]').classList.add('cognition-lane__anchor_active');
		} else if (percentage > 75) {
			this.input.value = document.querySelector('[data-level="3"]').textContent;
			this.pointer.style.left = `${width - 11}px`;
			this.phantom.style.width = `${width}px`;
			document.querySelector('[data-level="3"]').classList.add('cognition-lane__anchor_active');
		}

	}

}

const cognitionSlider = new CognitionSlider({
	anchors: document.querySelectorAll('.cognition-lane__anchor'),
	line: document.querySelector('.cognition-lane__progress'),
	phantom: document.querySelector('.cognition-lane__phantom'),
	pointer: document.querySelector('.cognition-lane__pointer'),
	input: document.querySelector('.cognition-lane__input')
});
