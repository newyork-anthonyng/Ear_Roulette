import { Utility } from '../../src/utility';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';

describe('Utility', () => {
	describe('#saveToLocalStorage', () => {
		beforeEach(() => {
			window.localStorage = {
				setItem: sinon.spy(),
				getItem: function() {
					return '{"foo":"bar"}';
				}
			};
		});

		it('should convert argument to JSON string', () => {
			const argument = {
				foo: 'bar'
			};
			Utility.saveToLocalStorage(argument);

			expect(window.localStorage.setItem.callCount).to.equal(1);
			expect(window.localStorage.setItem.getCall(0).args[0]).to.equal('ear_roulette');
			expect(window.localStorage.setItem.getCall(0).args[1]).to.equal('{"foo":"bar"}');
		});

		it('should merge existing data with updated values that are passed in', () => {
			const argument = {
				xoo: 'yoo'
			};
			Utility.saveToLocalStorage(argument);

			expect(window.localStorage.setItem.getCall(0).args[1]).to.equal('{"foo":"bar","xoo":"yoo"}');
		});
	});

	describe('#loadFromLocalStorage', () => {
		beforeEach(() => {
			window.localStorage = {
				getItem: sinon.stub().returns('{"foo":"bar"}')
			};
		});

		it('should get data from "ear_roulette" key', () => {
			Utility.loadFromLocalStorage();
			expect(window.localStorage.getItem.callCount).to.equal(1);
			expect(window.localStorage.getItem.getCall(0).args[0]).to.equal('ear_roulette');
		});

		it('should return a JavaScript object', () => {
			const data = Utility.loadFromLocalStorage();

			expect(typeof data).to.equal('object');
			expect(data['foo']).to.equal('bar');
		});
	});

	describe('#loadSongs', () => {
		beforeEach(() => {
			const expectedValue = {
				data: {
					songs: 'foobar'
				}
			};
			sinon.stub(axios, 'get', () => ({
				then: (fn) => { fn(expectedValue) }
			}));
		});

		afterEach(() => {
			axios.get.restore();
		});

		it('should make a request to /get_songs', () => {
			Utility.loadSongs(() => {});

			expect(axios.get.calledOnce).to.equal(true);
			expect(axios.get.getCall(0).args[0]).to.equal('/get_songs');
		});

		it('should run callback with data', () => {
			const callback = sinon.spy();
			Utility.loadSongs(callback);

			expect(callback.calledOnce).to.equal(true);
			expect(callback.getCall(0).args[0]).to.equal('foobar');
		});
	});
});
