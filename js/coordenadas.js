// ( x, y ) // dá a coordenada cartesiana, pixels
function getPos( m, t )
{
	var v = t + t;
	v += 1;
	return m * v;
}
// mL + i * mL * 2 = x
// mL * ( 1 + i * 2 ) = x
// mL = x / ( 1 + i * 2 )

// ( i, j ) // dá a coordenada do pino
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