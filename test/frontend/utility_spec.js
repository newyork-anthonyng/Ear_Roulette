import { Utility } from '../../src/utility';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Utility', () => {
	describe('#saveToLocalStorage', () => {
		beforeEach(() => {
			window.localStorage = {
				setItem: sinon.spy()
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
});
