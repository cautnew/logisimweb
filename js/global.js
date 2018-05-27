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
	currentX=0,
	currentY=0,
	qtdPortas=[],
	indAddPorta=true,
	indAddLine=true,
  fat = 1;//( rangeZoom.value / 100 );

var portas = {
	'pand': {
		color: '#000',
		pts: [
			[0, 0],
			[0, 1],
			[2, 1],
			[2, -1],
			[0, -1]
		]
	},
	'por': {
		color: '#CCC',
		pts: [
			[0, 0],
			[0, 1],
			[2, 1],
			[2, -1],
			[0, -1]
		]
	},
	'cline': {
		color: '#CCC'
	}
}

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
	id = evt.target.id,
	i = getCrd( mL, evt.offsetX - 20 ),
	j = getCrd( mT, evt.offsetY - 20 ),
	x = getPos( mL, i ),
	y = getPos( mT, j );

	grad.select( '#' + id ).move( x, y );

	currentX = evt.clientX;
	currentY = evt.clientY;
}

function portaMouseOut(evt)
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

		if( optSel != null )
		{
			var pol = optSel.poly.clone();
			pol.fill( optSel.color );
			pol.move( x + (wR / 2), y + (hR / 2) );
			pol.show();
			pol.click( function()
			{
				indAddPorta = false;
				alert( "Você não pode criar outro aqui." );
			});
		}
	}
	indAddPorta = true;
}

/*elgrad.ondrop = function( evt )
{
	var
		i = getCrd( mL, evt.offsetX - 20 ),
		j = getCrd( mT, evt.offsetY - 20 ),
		x = getPos( mL, i ),
		y = getPos( mT, j ),
		tipoPorta = evt.dataTransfer.getData( 'tipo-porta' ),
		rect = grad.rect( 40, 40 );

	if( qtdPortas[ tipoPorta ] === undefined )
        qtdPortas[ tipoPorta ] = 1;
	else
        qtdPortas[ tipoPorta ] += 1;

    rect.attr({
		fill: '#f06',
		class: 'teste2',
		id:'p_' + tipoPorta + '_' + qtdPortas[ tipoPorta ],
		'data-tipo-porta': tipoPorta,
		'data-xp': i,
		'data-yp': j,
		'onmousedown': 'portaDragStart(evt)'
    });
    rect.move( x, y );

    console.log( "X = " + x );
    console.log( "Y = " + y );
    console.log( "i = " + i );
    console.log( "j = " + j );
}*/

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

//px.onchange = function(){ resizeGrid(); }
//py.onchange = function(){ resizeGrid(); }

// ( x, y )
function getPos( m, t )
{ return ( m * ( 1 + t * 2 ) ); }
// mL + i * mL * 2 = x
// mL * ( 1 + i * 2 ) = x
// mL = x / ( 1 + i * 2 )

// ( i, j )
function getCrd( m, pos )
{ return Math.round( ( ( pos - m ) / ( m * 2 ) ) ); }
// x = mL + i * mL * 2
// x - mL = i * mL * 2
// ( x - mL ) / ( mL * 2 ) = i

$( document ).ready( function()
{
	ajustaNavbar();

	$( ".btn-menu-opt" ).click( function()
	{
		var opt = $( this ).data( "tp" );
		
		switch( opt )
		{
			case 'cin':
			case 'cout':
			case 'sel': elgrad.onclick = null; break;
			case 'cline': elgrad.onclick = addLine; break;
			default: elgrad.onclick = addPorta;
		}

		optSel = portas[ opt ];
		$( this ).addClass( "opt-active" );

		if( selectedElement != null )
		{ $( selectedElement ).removeClass( "opt-active" ); }

		selectedElement = this;
	});

	[ 'pand', 'por' ].forEach( function( pt )
	{
		var pts = [];
		portas[ pt ].pts.forEach( function( el )
		{
			var
				x = getPos( mL, el[ 0 ] ),
				y = getPos( mT, el[ 1 ] );
			pts.push( [ x, y ] );
		});
		portas[ pt ].poly = grad.polygon( pts );
		portas[ pt ].poly.hide();
	});
});

SVG.on( document, 'DOMContentLoaded', function()
{ resizeScreen(); } );

function ajustaNavbar()
{
    var sizeNavbar = document.getElementsByClassName( 'navbar' )[ 0 ].clientHeight;
    //$( '.container-fluid' ).css( 'padding-top', sizeNavbar + "px" );
}