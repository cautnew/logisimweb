var portas = {
	'pand': {
		name: 'and',
		color: '#000',
		ptin: [ 0, 4 ],
		ptout: [
			{ pt: 2, fn: function(){} }
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
		ptout: [ { pt: 2, fn: function(){ return false; } } ],
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
		color: '',
		ptin: [ 0 ],
		ptout: [ { pt: 3, fn: function(){} } ],
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
		ptout: [ { pt:2, function(){ return true; } } ],
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