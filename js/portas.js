var portas = {
	'pand': {
		name: 'and',
		color: '#000',
		ptin: [ 0, 4 ],
		ptout: [
			{ pt: 2, fn: function( val1, val2 ){ return ( val1 && val2 ); } }
		],
		pts: [
			[0, 0],
			[2, 0],
			[2, 1],
			[2, 2],
			[0, 2],
			[0, 1]
		]
	},
	'por': {
		name: 'or',
		color: '#CCC',
		ptin: [ 0, 4 ],
		ptout: [ { pt: 2, fn: function( val1, val2 ){ return ( val1 || val2 ); } } ],
		pts: [
			[0, 0],
			[2, 0],
			[2, 1],
			[2, 2],
			[0, 2],
			[0, 1]
		]
	},
	'pxor': {
		name: 'or',
		color: '#cc88cc',
		ptin: [ 0, 4 ],
		ptout: [ { pt: 2, fn: function( val1, val2 ){ return ( val1 != val2 ); } } ],
		pts: [
			[0, 0],
			[2, 0],
			[2, 1],
			[2, 2],
			[0, 2],
			[0, 1]
		]
	},
	'pnot': {
		name: 'not',
		color: '#aa6666',
		ptin: [ 0 ],
		ptout: [ { pt: 3, fn: function( val1 ){ return !val1; } } ],
		pts: [
			[0, 0],
			[0, 1],
			[1, 1],
			[2, 1],
			[2, 0]
		]
	},
	'cline': {
		color: '#CCC'
	},
	'cin': {
		name: 'in',
		color: 'green',
		ptin: [],
		ptout: [ { pt:2, function( val ){ return val; } } ],
		pts: [
			[0,0],
			[1,0],
			[1,1],
			[0,1]
		]
	},
	'cout': {
		name: 'out',
		color: 'blue',
		ptin: [ 3 ],
		ptout: [],
		pts: [
			[0,0],
			[1,0],
			[1,1],
			[0,1]
		]
	}
};