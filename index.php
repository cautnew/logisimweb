<!DOCTYPE html>
<html>
<head>
	<title>Logisim WEB</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="css/bootstrap.min.css" />
	<link rel="stylesheet" href="css/geral.css" />
	<script src="js/svg.min.js"></script>
	<style type="text/css">
        .pin:hover
        { fill: #000; }
        .pand
        {
            border: 1px solid #000;
            fill: #000;
        }
        .porta-and
        {
            border: 1px solid #000;
            height: 40px;
            width: 40px;
        }
        .porta-or
        {
            border: 1px solid #ccc;
            height: 40px;
            width: 40px;
        }
	</style>
</head>
<body>

<nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
	<a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Logisim WEB</a>
	<input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
	<ul class="navbar-nav px-3">
		<li class="nav-item text-nowrap">
			<a class="nav-link" href="#">Sign out</a>
		</li>
	</ul>
</nav>

<div class="container-fluid">
	<div class="row">
		<nav class="col-md-2 d-none d-md-block bg-light sidebar">
			<div class="sidebar-sticky">
				<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">Controles</h6>
				<ul class="nav flex-column mb-2">
					<li class="nav-item">
						<label>Pinos horizontais:</label>
						<input type="number" min="1" class="form-control" value="20" id="px">
					</li>
					<li class="nav-item">
						<label>Pinos verticais:</label>
                        <input type="number" min="1" class="form-control" value="20" id="py">
					</li>
				</ul>

			</div>
		</nav>

		<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
			<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<div class="col-12" id="spc-grad" style="height: 100%;overflow:scroll;zoom:1;">
					<svg id="gradient-princ" style="border: 1px solid #000;"></svg>
				</div>
			</div>
            <div id="porta-and" class="porta-and" data-tipo-porta="and"></div>
            <div id="porta-or" class="porta-or" data-tipo-porta="or"></div>
		</main>
	</div>
</div>

<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/global.js"></script>
</body>
</html>