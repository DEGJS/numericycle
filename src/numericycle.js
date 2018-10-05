import { formatNumber, stringToNumber } from "./numberUtils.js";
import * as easing from "@degjs/easing";

function numericycle(element) {

	let currentIteration;
	let totalIterations;
	let changeInValue;
	let animationRequestId;
	let settings;

	const defaults = {
			duration: 2000,
			easing: 'easeOut',
			format: '0,0'
		};

	const fps = 60;

	function cycle(options) {
		settings = Object.assign({}, defaults, options);

		verifyDuration();		
		verifyInitialValue();
		verifyFinalValue();		
		
		if (!window.requestAnimationFrame || 
			settings.duration === 0 || 
			settings.finalValue === settings.initialValue) {
			updateElementContent(settings.finalValue);			
		} else {
			if(animationRequestId != null) {
				window.cancelAnimationFrame(animationRequestId);
			}

			currentIteration = 0;
			totalIterations = Math.ceil(fps*(settings.duration/1000));
			changeInValue = settings.finalValue - settings.initialValue;
			updateElementContent(settings.initialValue);

			animationRequestId = window.requestAnimationFrame(onAnimationFrame);
		}
	}

	function verifyInitialValue() {
		if(isNaN(settings.initialValue)) {
			settings.initialValue = stringToNumber(element.textContent);
		}

		if(isNaN(settings.initialValue)) {
			throw new TypeError("initialValue must be a number");
		}
	}

	function verifyFinalValue() {
		if(isNaN(settings.finalValue)) {
			throw new TypeError("finalValue must be a number");
		}
	}

	function verifyDuration() {
		if(isNaN(settings.duration)) { 
			throw new TypeError("duration must be a number");
		} else if(settings.duration < 0) {
			throw new RangeError("duration cannot be a negative number")
		}
	}

	function getCurrentValue() {
		const easingFunction = getEasingFunction();		
		return Math.round(easingFunction(currentIteration, settings.initialValue, changeInValue, totalIterations));
	}

	function getEasingFunction() {
		switch(settings.easing) {
			case "easeOut":
				return easing.easeOutCubic;
			case "easeInOut":
				return easing.easeInOutCubic;
			case "easeIn":
				return easing.easeInCubic;
			default:
				return easing.linear;
		}
	}

	function onAnimationFrame() {		
		if(currentIteration < totalIterations) {
			currentIteration++;
			updateElementContent(getCurrentValue());
			animationRequestId = window.requestAnimationFrame(onAnimationFrame);
		} 
	}

	function updateElementContent(value) {
		element.textContent = formatNumber(value, settings.format);
	}

	return {
		cycle
	};
}

export default numericycle;