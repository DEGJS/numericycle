/* */ 
let numberUtils = {
	stringToNumber: function(str) {
		return parseFloat(str.replace(/\D/g,''));
	},
	formatNumber: function(number, format) {
		switch(format) {			
			case "0":
				return number.toString();
			case "0,0":
			default:
				return this.formatNumberStandard(number);

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

export default numberUtils;