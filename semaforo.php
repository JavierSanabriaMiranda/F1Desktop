<!DOCTYPE HTML>
<html lang="es">

<?php
    class Record {
        private $server;
        private $user;
        private $pass;
        private $dbname;

        public function __construct() {
            $this->server = "localhost";
            $this->user = "DBUSER2024";
            $this->pass = "DBPSWD2024";
            $this->dbname = "records";
        }
    }
?>

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Juego de Tiempo de Reacción</title>
    <meta name="author" content="Javier Sanabria Miranda" />
    <meta name="description" content="Juego de Tiempo de Reacción de F1" />
    <meta name="keywords" content="F1 Desktop, Semáforo, Juego" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/semaforo_grid.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico" />

    <script src="js/semaforo.js"></script>
</head>

<body>
    <!-- Datos con el contenido que aparece en el navegador -->
    <header>
        <h1><a href="index.html" title="Inicio">F1 Desktop</a></h1>
        <nav>
            <a href="index.html" title="Inicio">Inicio</a>
            <a href="piloto.html" title="Piloto">Piloto</a>
            <a href="noticias.html" title="Noticias">Noticias</a>
            <a href="calendario.html" title="Calendario">Calendario</a>
            <a href="meteorologia.html" title="Meteorología">Meteorología</a>
            <a href="circuito.html" title="Circuitos">Circuitos</a>
            <a href="viajes.html" title="Viajes">Viajes</a>
            <a href="juegos.html" title="Juegos" class="active">Juegos</a>
        </nav>
    </header>

    <p>Estás en <a href="index.html" title="Inicio">Inicio</a> >> <a href="juegos.html" title="Juegos">Juegos</a> >>
        Juego de Tiempo de Reacción</p>

    <main>
        <script>
            var game = new Semaforo()
        </script>
    </main>
</body>