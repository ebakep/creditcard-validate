/*
* jQuery credit card validation plugin
*
* Based on jQuery creditcard2 extension (https://github.com/iHwy/jQuery-Validation-Extension) for the jQuery Validation plugin (http://plugins.jquery.com/project/validate).
*
* Author: Smus Dmitriy
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

/**
 * Function creditCardValidate
 *
 * Validate credit card number based on car type
 *
 * @param cardType stores car type
 * @returns {boolean}
 */
$.fn.creditCardValidate = function(cardType) {
	var cards = [
			{ cardName: "Visa", lengths: "13,16", prefixes: "4", checkdigit: true },
			{ cardName: "MasterCard", lengths: "16", prefixes: "51,52,53,54,55", checkdigit: true },
			{ cardName: "DinersClub", lengths: "14,16", prefixes: "305,36,38,54,55", checkdigit: true },
			{ cardName: "CarteBlanche", lengths: "14", prefixes: "300,301,302,303,304,305", checkdigit: true },
			{ cardName: "AmEx", lengths: "15", prefixes: "34,37", checkdigit: true },
			{ cardName: "Discover", lengths: "16", prefixes: "6011,622,64,65", checkdigit: true },
			{ cardName: "JCB", lengths: "16", prefixes: "35", checkdigit: true },
			{ cardName: "enRoute", lengths: "15", prefixes: "2014,2149", checkdigit: true },
			{ cardName: "Solo", lengths: "16,18,19", prefixes: "6334, 6767", checkdigit: true },
			{ cardName: "Switch", lengths: "16,18,19", prefixes: "4903,4905,4911,4936,564182,633110,6333,6759", checkdigit: true },
			{ cardName: "Maestro", lengths: "12,13,14,15,16,18,19", prefixes: "5018,5020,5038,6304,6759,6761", checkdigit: true },
			{ cardName: "VisaElectron", lengths: "16", prefixes: "417500,4917,4913,4508,4844", checkdigit: true },
			{ cardName: "LaserCard", lengths: "16,17,18,19", prefixes: "6304,6706,6771,6709", checkdigit: true }
		], lengthValid = false,
		prefixValid = false,
		prefix = [],
		lengths = [],
		cardNumber = $(this).val();

	cards.forEach(function(value, index) {
		if(value.cardName.toLowerCase() == cardType) {

			cardType = index;
		}
	});

	cardType = cardType ? cardType : 0;

	cardNumber = cardNumber.replace(/[\s-]/g, ""); // remove spaces and dashes

	if (cardNumber.length == 0) { return false; } // no length

	if (!/^[0-9]{13,19}$/.exec(cardNumber)) { return false; } // has chars or wrong length

	cardNumber = cardNumber.replace(/\D/g, ""); // strip down to digits

	if (cards[cardType].checkdigit) {
		var checksum = 0,
			j = 1,
			calc = null;

		for (var i = cardNumber.length - 1; i >= 0; i--) {
			calc = Number(cardNumber.charAt(i)) * j;

			if (calc > 9) {

				checksum = checksum + 1;
				calc = calc - 10;
			}

			checksum = checksum + calc;

			if (j == 1) { j = 2 } else { j = 1 }
		}

		if (checksum % 10 != 0) { return false; } // not mod10
	}

	prefix = cards[cardType].prefixes.split(",");

	for (i = 0; i < prefix.length; i++) {
		var exp = new RegExp("^" + prefix[i]);

		if (exp.test(cardNumber)) prefixValid = true;
	}
	if (!prefixValid) { return false; } // invalid prefix

	lengths = cards[cardType].lengths.split(",");

	for (j = 0; j < lengths.length; j++) {

		if (cardNumber.length == lengths[j]) lengthValid = true;
	}
	if (!lengthValid) { return false; } // wrong length

	return true;
};
