'use strict';

// MODULES //

var factorialln = require( 'compute-factorialln' ),
	sgn = require( 'compute-signum' );


// FUNCTIONS //

var abs = Math.abs,
	exp = Math.exp,
	floor = Math.floor,
	log = Math.log,
	pow = Math.pow,
	sqrt = Math.sqrt;


// CONSTANTS //

var LOG_SQRT_TWO_PI = log( sqrt( 2 * Math.PI ) );


// PARTIAL //

/**
* FUNCTION: partial( lambda[, rand] )
*	Partially applies `lambda` and returns a function to generate random variables from the triangular distribution.
*
* @param {Number} lambda - mean parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Function} function which generates random draws from the specified distribution
*/
function partial( lambda, rand ) {
	var random,
		v, u, us, k, l, p,
		slambda = sqrt( lambda ),
		b = 0.931 + 2.54 * slambda,
		a = -0.059 + 0.02483 * b,
		ainv = 1.1239 + 1.1328 / ( b - 3.4 ),
		vr = 0.9277 - 3.6224 / ( b - 2 );


	if ( rand ) {
		random = rand;
	} else {
		random = Math.random;
	}
	/*
	When lambda < 30, use Knuth's method.
	Reference:
		Donald E. Knuth (1969). Seminumerical Algorithms.
		The Art of Computer Programming, Volume 2. Addison Wesley.
	*/
	if ( lambda < 30 ) {
		/**
		* FUNCTION: draw( x )
		*	Generates a random draw for a Poisson distribution with parameter `lambda < 30`.
		*
		* @private
		* @returns {Number} random draw from the specified distribution
		*/
		return function draw1() {
			l = exp( -lambda );
			k = 0;
			p = 1;
			do {
				k += 1;
				u = rand();
				p *= u;
			} while ( p > l );
			return k - 1;
		}; // end FUNCTION draw()
	}
	/*
	Case: lambda >= 30
	Use transformed rejection method as Knuth's method does not scale well with lambda
	Reference:
		Hörmann, W. (1993). The transformed rejection method
		for generating Poisson random variables.
		Insurance: Mathematics and Economics.
	*/
	return function draw2() {
		v = rand();
		if ( v <= 0.86 * vr ) {
			u = v / vr - 0.43;
			return floor( ( 2*a / (0.5-abs(u) ) + b ) * u + lambda + 0.445 );
		}
		if ( v >= vr ) {
			u = rand() - 0.5;
		} else {
			u = v / vr - 0.93;
			u = sgn( u ) * 0.5 - u;
			v = vr * rand();
		}
		us = 0.5 - abs( u );
		if ( us < 0.013 && v > us ) {
			return draw2();
		}
		k = floor( ( 2*a/us + b ) * u + lambda + 0.445 );
		v = v * ainv  / ( a/pow( us, 2 ) + b );
		if ( k >= 10 && log( v * slambda ) <= ( k + 0.5 ) * log(lambda/k) -
			lambda - LOG_SQRT_TWO_PI  + k - (1/12 - 1/(360*k*k))/k ) {
			return k;
		}
		if ( 0 <= k && k <= 9 && log(v) <= k * log(lambda) - lambda - factorialln( k ) ) {
			return k;
		} else {
			return draw2();
		}
	};

} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
