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
				//console.log( this );
			});
		}

	grad.size( posX + 2 * mL, posY + 2 * mT );
}

$( document ).ready( function()
{
	$( ".btn-menu-opt" ).click( function()
	{
		var opt = $( this ).data( "tp" );

		elgrad.onclick = null;
		selEl = null;
		indSel = false;
		indDel = false;
		lineProv = linePt1 = linePt2 = null;
		
		switch( opt )
		{
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

	//Criação da matriz de cada porta
	[ 'pand', 'por', 'pnot', 'pxor', 'cin', 'cout' ].forEach( function( pt )
	{
		var pts = [];

		porta = portas[ pt ];
		porta.indPorta = pt;

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
		if( porta.ptin !== undefined )
		{
			porta.ptin.forEach( function( el )
			{
				var
					pt = porta.pts[ el ],
					x = getPos( mL, pt[ 0 ] ),
					y = getPos( mT, pt[ 1 ] ),
					circ = grad.circle( 5 ).fill( 'green' ).cx( x ).cy( y );

				circ.direcao = 'in';
				circ.hide();
				porta.circles.push( circ );
			});
		}
		
		//Bolinhas de saída (verdes)
		if( porta.ptout !== undefined )
		{
			var lista = Object.getOwnPropertyNames( porta.ptout );
			lista.pop();

			lista.forEach( function( el )
			{
				var
					pt = porta.pts[ porta.ptout[ el ].pt ],
					x = getPos( mL, pt[ 0 ] ),
					y = getPos( mT, pt[ 1 ] ),
					circ = grad.circle( 5 ).fill( 'blue' ).cx( x ).cy( y );

				circ.direcao = 'out';
				circ.hide();
				porta.circles.push( circ );
			});
		}

		porta.poly = pol;
		porta.poly.hide();
	});
});

//Carrega o SVG
SVG.on( document, 'DOMContentLoaded', function()
{ resizeScreen(); } );