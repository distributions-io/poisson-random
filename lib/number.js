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


// GENERATE POISSON RANDOM NUMBERS //

/**
* FUNCTION random( lambda[, rand] )
*	Generates a random draw from a Poisson distribution with parameter `lambda`.
*
* @param {Number} lambda - mean parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number} random draw from the specified distribution
*/
function random( lambda, rand ) {
	var v, u, us, k, l, p,
		slambda = sqrt( lambda ),
		b = 0.931 + 2.54 * slambda,
		a = -0.059 + 0.02483 * b,
		ainv = 1.1239 + 1.1328 / ( b - 3.4 ),
		vr = 0.9277 - 3.6224 / ( b - 2 );

	if ( !rand ) {
		rand = Math.random;
	}

	if ( lambda < 30 ) {
		/*
		When lambda < 30, use Knuth's method.
		Reference:
			Donald E. Knuth (1969). Seminumerical Algorithms.
			The Art of Computer Programming, Volume 2. Addison Wesley.
		*/
		l = exp( -lambda );
		k = 0;
		p = 1;
		do {
			k += 1;
			u = rand();
			p *= u;
		} while ( p > l );
		return k - 1;
	}
	/*
	Case: lambda >= 30
	Use transformed rejection method as Knuth's method does not scale well with lambda
	Reference:
		Hörmann, W. (1993). The transformed rejection method
		for generating Poisson random variables.
		Insurance: Mathematics and Economics.
	*/
	return (function exec() {
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
			return exec();
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
			return exec();
		}
	})();
}

module.exports = random;
