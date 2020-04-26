function random(start, end) {
	return Math.floor(Math.random() * (end - start) + 1);
}

export function generateData(sizeX = 20, sizeY = 20) {
	let data = [];
	for (let i = 0; i < sizeY; i++) {
		let rowData = [];
		for (let j = 0; j < sizeX; j++) {
			rowData.push({
				value: random(0, 100),
			});
		}
		data.push(rowData);
	}
	return data;
}

export const isEmpty = (obj) => Object.keys(obj).length === 0;

export const range = (start, end) => {
	const array = [];
	const inc = end - start > 0;
	for (let i = start; inc ? i <= end : i >= end; inc ? i++ : i--) {
		inc ? array.push(i) : array.unshift(i);
	}
	return array;
};

export const defaultParsePaste = (str) => {
	return str.split(/\r\n|\n|\r/).map((row) => row.split("\t"));
};
