'use strict';

// MODULES //

var partial = require( './partial.js' ),
	recurse = require( './recurse.js' );


// RANDOM //

/**
* FUNCTION: random( dims, lambda[, rand] )
*	Creates a multidimensional array of Poisson distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {Number} lambda - mean parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Array} multidimensional array filled with Poisson random numbers
*/
function random( dims, lambda, rand ) {
	var draw = partial( lambda, rand );
	return recurse( dims, 0, draw );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
