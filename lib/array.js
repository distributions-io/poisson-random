'use strict';

// MODULES //

var partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( len, lambda[, rand] )
*	Creates an array of Poisson distributed random numbers.
*
* @param {Number} len - array length
* @param {Number} lambda - mean parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number[]} array filled with Poisson random numbers
*/
function random( len, lambda, rand ) {
	var out,
		draw,
		i;

	draw = partial( lambda, rand );
	// Ensure fast elements...
	if ( len < 64000 ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = draw();
		}
	} else {
		out = [];
		for ( i = 0; i < len; i++ ) {
			out.push( draw() );
		}
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
