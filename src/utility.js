const STORAGE_KEY = 'ear_roulette';

const Utility = (function() {
	const saveToLocalStorage = (data) => {
		const dataJSON = JSON.stringify(data);
		window.localStorage.setItem(STORAGE_KEY, dataJSON);
	};

	const loadFromLocalStorage = () => {
		const dataJSON = window.localStorage.getItem(STORAGE_KEY);
		return JSON.parse(dataJSON);
	};

	return {
		saveToLocalStorage: saveToLocalStorage,
		loadFromLocalStorage: loadFromLocalStorage
	};
})();

export { Utility };
