import { HeaderMenu, ScrollSpy } from '../blocks/header/header';
import { Inputs, DropDown } from '../blocks/info/info';
import CognitionSlider from '../blocks/cognition/cognition';

const headerMenu = new HeaderMenu('.header');
const inputs = new Inputs({
	fields: document.getElementsByClassName('field__input')
});
const dropdown = new DropDown('.dropdown');

const scrollspy = new ScrollSpy({
	linkList: document.querySelectorAll('.header-nav__link'),
	linkId: document.querySelectorAll('.section')
});

const cognitionSlider = new CognitionSlider({
	anchors: document.querySelectorAll('.cognition-lane__anchor'),
	line: document.querySelector('.cognition-lane__progress'),
	phantom: document.querySelector('.cognition-lane__phantom'),
	pointer: document.querySelector('.cognition-lane__pointer'),
	input: document.querySelector('.cognition-lane__input')
});
