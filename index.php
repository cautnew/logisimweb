<!DOCTYPE html>
<html>

<head>
	<title>Logisim WEB</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="css/bootstrap.min.css" />
	<link rel="stylesheet" href="css/geral.css" />
	<script src="js/svg.min.js"></script>
	<style type="text/css">
		.pin:hover {
			fill: #000;
		}

		.pand {
			border: 1px solid #000;
			fill: #000;
		}

		.porta-and {
			border: 1px solid #000;
			height: 40px;
			width: 40px;
		}

		.porta-or {
			border: 1px solid #ccc;
			height: 40px;
			width: 40px;
		}
	</style>
</head>

<body>

	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<a class="navbar-brand" href="#">LogiSim Web</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
		 aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
					 aria-expanded="false">
						Menu
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<a class="dropdown-item" href="#">Novo</a>
						<a class="dropdown-item" href="#">Abrir</a>
						<a class="dropdown-item disabled" href="#">Salvar</a>
						<div class="dropdown-divider"></div>
						<a class="dropdown-item" href="#">Fechar</a>
					</div>
				</li>
				<li class="nav-item">
					<img src="./img/entrada_desativado.png" class="img-fluid" style="max-height: 40px; max-width: 40px;margin: 0 10px;">
				</li>
				<li class="nav-item">
					<img src="./img/saida_desativada.png" class="img-fluid" style="max-height: 40px; max-width: 40px;margin: 0 10px;">
				</li>
				<li class="nav-item">
					<img src="./img/and.png" class="img-fluid" style="max-height: 40px; max-width: 40px;margin: 0 10px;">
				</li>
				<li class="nav-item">
					<img src="./img/or.png" class="img-fluid" style="max-height: 40px; max-width: 40px;margin: 0 10px;">
				</li>
				<li class="nav-item">
					<img src="./img/not.png" class="img-fluid" style="max-height: 40px; max-width: 40px;margin: 0 10px;">
				</li>
				<li class="nav-item">
					<img src="./img/xor.png" class="img-fluid" style="max-height: 40px; max-width: 40px; margin: 0 10px;">
				</li>
				<li class="nav-item">
					<img src="./img/xnor.png" class="img-fluid" style="max-height: 40px; max-width: 40px; margin: 0 10px;">
				</li>
			</ul>
		</div>
	</nav>

	<div class="container">
		<div class="row justify-content-md-center">
			<div class="col-sm-2">
				<label>Pinos horizontais:</label>
				<input type="number" min="1" class="form-control" value="20" id="px">
			</div>
			<div class="col-sm-2">
				<label>Pinos verticais:</label>
				<input type="number" min="1" class="form-control" value="20" id="py">
			</div>
		</div>
		<div class="row">
			<!-- <nav class="col-md-2 d-none d-md-block bg-light sidebar">
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
			</nav> -->

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