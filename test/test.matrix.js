/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	random = require( './../lib/matrix.js' ),

	// Module to calculate the mean
	mean = require( 'compute-mean' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'random matrix', function tests() {

	this.timeout( 50000 );

	it( 'should export a function', function test() {
		expect( random ).to.be.a( 'function' );
	});

	it( 'should generate samples which pass mean test when lambda = 10', function test() {
		var out,
			lambda = 10,
			sampleMean,
			M = 200,
			N = 200,
			iTotal = 400,
			s,
			ci,
			outside = 0,
			i;

		// Mean test
		s = Math.sqrt( lambda ) / Math.sqrt( M * N );

		// CI
		ci = [ lambda - 2 * s, lambda + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = random( [M,N], 'float64', lambda );
			sampleMean = mean( out.data );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass mean test when lambda = 75', function test() {
		var out,
			lambda = 75,
			sampleMean,
			M = 200,
			N = 200,
			iTotal = 400,
			s,
			ci,
			outside = 0,
			i;

		// Mean test
		s = Math.sqrt( lambda ) / Math.sqrt( M * N );

		// CI
		ci = [ lambda - 2 * s, lambda + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = random( [M,N], 'float64', lambda );
			sampleMean = mean( out.data );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

});
