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

export default CognitionSlider;
