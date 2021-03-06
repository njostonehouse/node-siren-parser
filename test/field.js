/* global describe, it, beforeEach, afterEach */

'use strict';

const
	chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

const Field = require('../src/Field');

chai.use(require('sinon-chai'));

describe('Field', function() {
	let
		resource,
		sandbox,
		siren;

	beforeEach(function() {
		resource = {};
		siren = undefined;
		sandbox = sinon.sandbox.create();
		sandbox.stub(console, 'error');
		sandbox.stub(console, 'warn');
	});

	afterEach(function() {
		sandbox.restore();
	});

	function buildField() {
		return new Field(resource);
	}

	beforeEach(function() {
		resource = {
			name: 'foo'
		};
	});

	it('should auto-instantiate', function() {
		expect(Field(resource)).to.be.an.instanceof(Field);
	});

	it('should require the field be an object', function() {
		resource = 1;
		expect(buildField.bind()).to.throw();
	});

	describe('name', function() {
		it('should require a name', function() {
			resource.name = undefined;
			expect(buildField.bind()).to.throw();
		});

		it('should require name be a string', function() {
			resource.name = 1;
			expect(buildField.bind()).to.throw();
		});

		it('should parse name', function() {
			siren = buildField();
			expect(siren.name).to.equal('foo');
		});
	});

	describe('value', function() {
		it('should parse value', function() {
			resource.value = 'foo';
			siren = buildField();
			expect(siren.value).to.equal('foo');
		});
	});

	describe('class', function() {
		it('should parse class', function() {
			resource.class = [];
			siren = buildField();
			expect(siren.class).to.be.an.instanceof(Array);
		});

		it('should require class be an array, if supplied', function() {
			resource.class = 1;
			expect(buildField.bind()).to.throw();
		});

		it('should be able to determine if a field has a given class', function() {
			resource.class = ['foo'];
			siren = buildField();
			expect(siren.hasClass('foo')).to.be.true;

			expect(siren.hasClass(/foo/)).to.be.true;
			expect(siren.hasClass(/bar/)).to.be.false;

			resource.class = undefined;
			siren = buildField();
			expect(siren.hasClass('foo')).to.be.false;
		});
	});

	describe('title', function() {
		it('should parse title', function() {
			resource.title = 'bar';
			siren = buildField();
			expect(siren.title).to.equal('bar');
		});

		it('should require title be a string, if supplied', function() {
			resource.title = 1;
			expect(buildField.bind(undefined, resource)).to.throw();
		});
	});

	describe('type', function() {
		it('should parse type', function() {
			resource.type = 'text';
			siren = buildField();
			expect(siren.type).to.equal('text');
		});

		it('should require type be a string, if supplied', function() {
			resource.type = 1;
			expect(buildField.bind(undefined, resource)).to.throw();
		});

		it('should require type be a valid HTML5 input type, if specified', function() {
			resource.type = 'bar';
			expect(buildField.bind()).to.throw();
		});
	});
});
