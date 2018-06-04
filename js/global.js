var
	w = 800,
	h = 600,
	wRp = 4, //width referencial padrão
	hRp = 4, //height referencial padrão
	wR = 4, // width referencial
	hR = 4, // height referencial
	mLp = 8, //margin left referencial padrão
	mTp = 8, //margin right referencial (padrão)
	mL = 8,
	mT = 8,
	grad = null,
	qPh = 0,
	qPv = 0,
	optSel = null,
	elgrad = document.getElementById( 'gradient-princ' ),
	spcGrad = document.getElementById( 'spc-grad' ),
	divGrad = spcGrad.parentNode,
	//rangeZoom = document.getElementById( 'n-zoom' ),
	px = document.getElementById( 'px' ),
	py = document.getElementById( 'py' ),
	selectedElement=null,
	selEl = null,
	currentX=0,
	currentY=0,
	qtdPortas=[],
	indAddPorta=true,
	indAddLine=true,
	linePt1 = null,
	linePt2 = null,
	lineProv = null,
	indSel = false,
	indDel = false,
	p_out = [  ],
	p_in = { '0,0':1 },
  fat = 1;//( rangeZoom.value / 100 );

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
		color: '#CCC',
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
	}
},
portasAdd = [],
caminho = [];

function portaDragStart( evt )
{
	selectedElement = evt.target;
	currentX = evt.offsetX;
	currentY = evt.offsetY;

	selectedElement.setAttributeNS(null, "onmousemove", "portaDragOver(evt)");
	selectedElement.setAttributeNS(null, "onmouseout", "portaMouseOut(evt)");
	selectedElement.setAttributeNS(null, "onmouseup", "portaMouseOut(evt)");
}

function portaDragOver( evt )
{
	var
		id = evt.target.id,
		i = getCrd( mL, evt.offsetX - 20 ),
		j = getCrd( mT, evt.offsetY - 20 ),
		x = getPos( mL, i ),
		y = getPos( mT, j );

	grad.select( '#' + id ).move( x, y );

	currentX = evt.clientX;
	currentY = evt.clientY;
}

function portaMouseOut( evt )
{
	if(selectedElement != 0)
	{
		selectedElement.removeAttributeNS(null, "onmousemove");
		selectedElement.removeAttributeNS(null, "onmouseout");
		selectedElement.removeAttributeNS(null, "onmouseup");
		selectedElement = 0;
	}
}

function addLine( evt )
{
	var
		i = getCrd( mL, evt.offsetX ),
		j = getCrd( mT, evt.offsetY ),
		x = getPos( mL, i ) + ( wR / 2 ),
		y = getPos( mT, j ) + ( hR / 2 );

	if( linePt1 == null )
	{
		linePt1 = [x,y];
		lineProv = grad.line();
		lineProv.stroke({width: 4});
		
	}
	else if( linePt2 == null )
	{
		linePt2 = [x,y];
		lineProv.plot([linePt1, linePt2]);
		linePt1 = linePt2 = null;
		lineProv.click( function()
		{
			if( indDel )
			{ this.remove(); }
		});
	}
}

function addPorta( evt )
{
	if( indAddPorta )
	{
		var
			i = getCrd( mL, evt.offsetX ),
			j = getCrd( mT, evt.offsetY ),
			x = getPos( mL, i ),
			y = getPos( mT, j );
		
		x+= ( wR / 2 );
		y+= ( hR / 2 );
		
		console.log( "(" + i + ", " + j + ")" );

		if( optSel != null )
		{
			var
				pol = optSel.poly.clone(),
				circ = optSel.circles;

			pol.circ = [];
			pol.fill( optSel.color );
			pol.opacity( 0.5 );
			pol.move( x, y );
			pol.show();
			pol.click( function()
			{
				indAddPorta = false;
				if( indSel )
				{ selEl = this; }

				if( indDel )
				{
					this.circ.forEach( function( el )
					{ el.remove(); });
					this.remove();
				}
			});
			
			//Bolinhas de entrada e saída
			circ.forEach( function( el )
			{
				c = el.clone();
				console.log( ( x - mL ) + " x " + ( y - mT ) );
				c.dx( x - mL ).dy( y - mT );
				c.show();
				pol.circ.push( c );
			});
		}
	}
	indAddPorta = true;
}

function resizeScreen()
{
	//w = spcGrad.offsetWidth - 60;
	//h = spcGrad.offsetHeight;

	grad = SVG( 'gradient-princ' ).size( w, h );
	resizeGrid();
}

function resizeGrid()
{
	//Apaga tudo da tela para reinserir
	elgrad.innerHTML = "";

	//mL = mLp * fat;
	//mT = mTp * fat;

	var posX, posY;

	wR = wRp * fat;
	hR = hRp * fat;

	qPh = px.value;
	qPv = py.value;

	for( i = 0; i < qPh; i++ )
		for( j = 0; j < qPv; j++ )
		{
			var rect = grad.rect( wR, hR );

            posX = getPos( mL, i );
            posY = getPos( mT, j );

			rect.attr({
				fill: '#f06',
				class: 'pin',
				'id': ( i + '_' + j ),
				'data-xp': i,
				'data-yp': j
			});
			rect.move( posX, posY );
			rect.click( function()
			{
				console.log( this );
			});
		}

	grad.size( posX + 2 * mL, posY + 2 * mT );
}

// ( x, y )
function getPos( m, t )
{
	var v = t + t;
	v += 1;
	return m * v;
}
// mL + i * mL * 2 = x
// mL * ( 1 + i * 2 ) = x
// mL = x / ( 1 + i * 2 )

// ( i, j )
function getCrd( m, pos )
{
	var
		v = m + m,
		s = pos - m,
		r = s / v;

	return Math.round( r );
}
// x = mL + i * mL * 2
// x - mL = i * mL * 2
// ( x - mL ) / ( mL * 2 ) = i

$( document ).ready( function()
{
	$( ".btn-menu-opt" ).click( function()
	{
		var opt = $( this ).data( "tp" );

		elgrad.onclick = null;
		selEl = null;
		indSel = false;
		indDel = false;
		
		switch( opt )
		{
			case 'cin':
			case 'cout':
			case 'del':
				indDel = true;
			break;
			case 'sel':
				indSel = true;
			break;
			case 'cline':
				elgrad.onclick = addLine;
			break;
			default:
				elgrad.onclick = addPorta;
		}

		optSel = portas[ opt ];
		$( this ).addClass( "opt-active" );

		if( selectedElement != null )
		{ $( selectedElement ).removeClass( "opt-active" ); }

		selectedElement = this;
	});

	//Criação do temporário de cada porta
	[ 'pand', 'por', 'pnot' ].forEach( function( pt )
	{
		var pts = [];

		porta = portas[ pt ];

		porta.pts.forEach( function( el )
		{
			var
				x = getPos( mL, el[ 0 ] ),
				y = getPos( mT, el[ 1 ] );
			pts.push( [ x, y ] );
		});

		var pol = grad.polygon( pts );
		
		porta.circles = [];
		
		//Bolinhas de entrada (azuis)
		porta.ptin.forEach( function( el )
		{
			var
				pt = porta.pts[ el ],
				x = getPos( mL, pt[ 0 ] ),
				y = getPos( mT, pt[ 1 ] ),
				circ = grad.circle( 5 ).fill( 'blue' ).cx( x ).cy( y );

			circ.hide();
			porta.circles.push( circ );
		});
		
		//Bolinhas de saída (verdes)
		var lista = Object.getOwnPropertyNames( porta.ptout );
		lista.pop();

		lista.forEach( function( el )
		{
			var
				pt = porta.pts[ porta.ptout[ el ].pt ],
				x = getPos( mL, pt[ 0 ] ),
				y = getPos( mT, pt[ 1 ] ),
				circ = grad.circle( 5 ).fill( 'green' ).cx( x ).cy( y );

			circ.hide();
			porta.circles.push( circ );
		});

		porta.poly = pol;
		porta.poly.hide();
	});
});

//Carrega o SVG
SVG.on( document, 'DOMContentLoaded', function()
{ resizeScreen(); } );