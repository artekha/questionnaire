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

class ScrollSpy {
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

export { HeaderMenu, ScrollSpy };
