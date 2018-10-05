import numericycle from "../../../src/numericycle.js";
import { findAncestor } from "./domUtils.js";
import Prism from 'prismjs';

const demo = function() {

	let examples = {};

	function init() {
		examples = {
			example1: {
				options: {
					initialValue: 5,
					finalValue: 250
				}
			},
			example2: {
				options: {
					initialValue: 999,
					finalValue: 100,
					duration: 4000,
					easing: 'easeIn'
				}
			},
			example3: {
				options: {
					initialValue: 5000,
					finalValue: 3500,
					format: '0'
				}
			},
			example4: {
				options: {
					initialValue: 0,
					finalValue: 59,
					duration: 60000,
					easing: 'linear'
				}
			}
		}

		document.addEventListener('click', onDocumentClick);

		Prism.highlightAll();
	}

	function onDocumentClick(e) {
		if(e.target.classList.contains('example__button')) {
			e.preventDefault();

			runExample(findAncestor(e.target, 'example'));
		}
	}

	function runExample(containerEl) {

		var example = getExample(containerEl);

		example.instance.cycle(example.options);
	}

	function getExample(containerEl) {
		var example = examples[containerEl.id];

		if(example.hasOwnProperty('instance') == false) {
			var numberEl = containerEl.querySelector('.example__number');
			example.instance = numericycle(numberEl);
		}

		return example;
	}

	init();
};

export default demo();