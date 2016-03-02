let numericycle = function(element) {

	let currentIteration,
		totalIterations,
		changeInValue,
		settings,
		defaults = {
			duration: 2000,
			easing: 'easeOut',
			format: '0,0'
		};

	const fps = 60;

	function cycle(options) {
		settings = Object.assign({}, defaults, options);

		if(isNaN(settings.initialValue)) {
			settings.initialValue = utils.stringToNumber(element.textContent);
		}

		if(isNaN(settings.finalValue) || isNaN(settings.initialValue) || settings.finalValue == settings.initialValue) {
			return;
		} 

		if (!window.requestAnimationFrame) {
			element.textContent = utils.formatNumber(settings.finalValue, settings.format);
		} else {
			currentIteration = 0;
			totalIterations = fps*(settings.duration/1000);
			changeInValue = settings.finalValue - settings.initialValue;
			element.textContent = utils.formatNumber(settings.initialValue, settings.format);

			window.requestAnimationFrame(onAnimationFrame);
		}

	}

	function getCurrentValue() {
		var easingFunction = getEasingFunction();
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
				return easing.linearEase;
		}
	}

	function onAnimationFrame() {
		if(currentIteration < totalIterations) {
			currentIteration++;
			element.textContent = utils.formatNumber(getCurrentValue(), settings.format);
			window.requestAnimationFrame(onAnimationFrame);
		}
	}

	return {
		cycle: cycle
	};
}

let utils = {
	stringToNumber: function(str) {
		return parseFloat(str.replace(/\D/g,''));
	},
	formatNumber: function(number, format) {
		switch(format) {
			case "0,0":
				return this.formatNumberStandard(number);
			case "0":
				return number.toString();

		}	
	},
	formatNumberStandard: function(number) {
		var nStr = number.toString();
		nStr += '';
		var x = nStr.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
}

let easing = {
	linearEase: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * currentIteration / totalIterations + startValue;
	},
	easeInOutCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
		if ((currentIteration /= totalIterations / 2) < 1) {
			return changeInValue / 2 * Math.pow(currentIteration, 3) + startValue;
		}
		return changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
	},
	easeOutCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
	},
	easeInCubic: function (currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue;
	}
}

export default numericycle;