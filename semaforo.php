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

        public function connect() {
            $connection = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            if ($connection->connect_error) {
                die ("<p>Error de conexión: " . $connection->connect_error . "</p>");
            }
            return $connection;
        }

        public function insertNewRecord() {
            $nombre = "";
            $apellidos = "";
            $tiempo = 0;
            $nivel = 0;

            if (!empty($_POST['nombre']) && !empty($_POST['apellidos'])) {
                $nombre = $_POST["nombre"];
                $apellidos = $_POST["apellidos"];
                $tiempo = $_POST["tiempo"];
                $nivel = $_POST["dificultad"];
        
                $db = $this->connect();
                $stmt = $db->prepare("INSERT INTO registro (nombre, apellidos, tiempo, nivel) VALUES (?, ?, ?, ?)");
                $stmt->bind_param("ssdd", $nombre, $apellidos, $tiempo, $nivel);
                if ($stmt->execute()) {
                    // Do nothing
                } else {
                    die ("<p>Error al hacer el INSERT: " . $stmt->error . "</p>");
                }
                $stmt->close();
            }
        }

        public function getBestRecords() {
            if (count($_POST) > 0) {
                $nivel = $_POST["dificultad"];

                $db = $this->connect();
                $stmt = $db->prepare("SELECT nombre, apellidos, tiempo, nivel FROM registro WHERE nivel = $nivel ORDER BY tiempo ASC LIMIT 10");
                $stmt->execute();
                $stmt->bind_result($nombre, $apellidos, $tiempo, $nivel);
                $stmt->store_result();
                $num_rows = $stmt->num_rows;
                if ($num_rows > 0) {
                    echo "<section>";
                    echo "<h3>Mejores Tiempos para Dificultad $nivel</h3>";
                    echo "<ol>";
                    while ($stmt->fetch()) {
                        echo "<li>$nombre $apellidos: $tiempo s</li>";
                    }
                    echo "</ol>";
                    echo "</section>";
                }
                $stmt->close();
            }
        }
    }
    
    $record = new Record();
    $record->insertNewRecord();
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
            <a href="viajes.php" title="Viajes">Viajes</a>
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
    <?php
        $record->getBestRecords();
    ?>
    
</body>