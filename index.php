<!DOCTYPE html>
<html>

<head>
	<title>Logisim WEB</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="css/bootstrap.min.css" />
	<link rel="stylesheet" href="css/geral.css" />
	<script src="js/svg.min.js"></script>
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
				<li class="nav-item btn-menu-opt" data-tp="cin">
					<img src="./img/entrada_desativado.png" class="img-fluid" style="max-height: 40px; max-width: 40px;margin: 0 10px;" title="Entrada">
				</li>
				<li class="nav-item btn-menu-opt" data-tp="cout">
					<img src="./img/saida_desativada.png" class="img-fluid" style="max-height: 40px; max-width: 40px;margin: 0 10px;" title="Saída">
				</li>
				<li class="nav-item btn-menu-opt" data-tp="sel">
					<img src="./img/cursor.png" class="img-fluid" style="max-height: 40px; max-width: 40px;margin: 0 10px;" title="Selecionar">
				</li>
				<li class="nav-item btn-menu-opt" data-tp="del">
					<img src="./img/deletar.png" class="img-fluid" style="max-height: 40px; max-width: 40px; margin: 0 10px;" title="Deletar">
				</li>
				<li class="nav-item btn-menu-opt" data-tp="cline">
					<img src="./img/fio.png" class="img-fluid" style="max-height: 40px; max-width: 40px;margin: 0 10px;" title="Fio">
				</li>
				<li class="nav-item btn-menu-opt" data-tp="pand">
					<img src="./img/and.png" class="img-fluid" style="max-height: 40px; max-width: 40px;margin: 0 10px;" title="Porta AND">
				</li>
				<li class="nav-item btn-menu-opt" data-tp="por">
					<img src="./img/or.png" class="img-fluid" style="max-height: 40px; max-width: 40px;margin: 0 10px;" title="Porta OR">
				</li>
				<li class="nav-item btn-menu-opt" data-tp="pnot">
					<img src="./img/not.png" class="img-fluid" style="max-height: 40px; max-width: 40px;margin: 0 10px;" title="Porta NOT">
				</li>
				<li class="nav-item btn-menu-opt" data-tp="pxor">
					<img src="./img/xor.png" class="img-fluid" style="max-height: 40px; max-width: 40px; margin: 0 10px;" title="Porta XOR">
				</li>
			</ul>
		</div>
	</nav>

	<div class="container-fluid">
		<div class="row justify-content-md-center">
			<div class="col-sm-2">
				<label>Pinos horizontais:</label>
				<input type="number" min="4" class="form-control" value="60" id="px">
			</div>
			<div class="col-sm-2">
				<label>Pinos verticais:</label>
				<input type="number" min="4" class="form-control" value="30" id="py">
			</div>
		</div>
		<div class="row">
			<main role="main" class="col-12 mt-1">
				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom">
					<div class="col-12" id="spc-grad" style="height: 100%;overflow:scroll;zoom:1;">
						<svg id="gradient-princ" style="border: 1px solid #000;"></svg>
					</div>
				</div>
			</main>
		</div>
	</div>

	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/portas.js"></script>
	<script src="js/global.js"></script>
</body>

</html>