export function stringToNumber(str) {
	if(typeof str === 'undefined' || str === null) {
		return NaN;
	}

	return parseFloat(str.replace(/[^0-9.-]/g,''));
}

export function formatNumber(number, format) {
	switch(format) {			
		case "0":
			return number.toString();
		case "0,0":
		default:
			return formatNumberStandard(number);
	}	
}
	
export function formatNumberStandard(number) {
	let nStr = number.toString();
	nStr += '';
	const x = nStr.split('.');
	let x1 = x[0];
	const x2 = x.length > 1 ? '.' + x[1] : '';
	const rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}