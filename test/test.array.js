/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	random = require( './../lib/array.js' ),

	// Module to calculate the mean
	mean = require( 'compute-mean' );

// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'random array', function tests() {

	this.timeout( 50000 );

	it( 'should export a function', function test() {
		expect( random ).to.be.a( 'function' );
	});

	it( 'should generate samples which pass mean test when lambda = 1', function test() {
		var out,
			lambda = 1,
			sampleMean,
			n = 50000,
			iTotal = 400,
			s,
			ci,
			outside = 0,
			i;

		// Mean test
		s = Math.sqrt( lambda ) / Math.sqrt( n );

		// CI
		ci = [ lambda - 2 * s, lambda + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = random( n, lambda );
			sampleMean = mean( out );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass mean test when lambda = 60', function test() {
		var out,
			lambda = 60,
			sampleMean,
			n = 50000,
			iTotal = 400,
			s,
			ci,
			outside = 0,
			i;

		// Mean test
		s = Math.sqrt( lambda ) / Math.sqrt( n );

		// CI
		ci = [ lambda - 2 * s, lambda + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = random( n, lambda );
			sampleMean = mean( out );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

});
