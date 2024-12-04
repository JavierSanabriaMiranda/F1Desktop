<!DOCTYPE HTML>
<html lang="es">

<?php

    class F1Manager {

        private $server;
        private $user;
        private $pass;
        private $dbname;
        private $sql_file;

        public function __construct() {
            $this->server = "localhost";
            $this->user = "DBUSER2024";
            $this->pass = "DBPSWD2024";
            $this->dbname = "f1_stats";
            $this->sql_file = "f1_stats.sql";
        }

        public function createDatabase() {
            try {
                // Conexión al servidor
                $conn = new PDO("mysql:host={$this->server}", $this->user, $this->pass);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                // Eliminar la base de datos si existe
                $conn->exec("DROP DATABASE IF EXISTS {$this->dbname}");

                // Crear la nueva base de datos
                $conn->exec("CREATE DATABASE IF NOT EXISTS {$this->dbname}");
                $conn->exec("USE {$this->dbname}");

                // Crear las tablas
                $sql = file_get_contents($this->sql_file);
                if ($sql === false) {
                    die ("<p>Error al leer el archivo SQL</p>");
                }
                $conn->exec($sql);
            } catch (PDOException $e) {
                die ("<p>Error de conexión: " . $e->getMessage() . "</p>");
            }
        }

        public function connect() {
            try {
                $conn = new PDO("mysql:host={$this->server};dbname={$this->dbname}", $this->user, $this->pass);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $conn;
            } catch (PDOException $e) {
                die ("<p>Error de conexión: " . $e->getMessage() . "</p>");
            }
        }

        public function importCSV() {
            // Comprueba que el archivo sea un CSV y se haya subido correctamente
            if (!isset($_FILES['csvFile']) || $_FILES['csvFile']['error'] !== UPLOAD_ERR_OK) {
                die ("<p>Error al subir el archivo CSV</p>");
            }

            $csvFile = $_FILES['csvFile']['tmp_name'];
            $conn = $this->connect();
            try {
                $file = fopen($csvFile, 'r');
                if ($file === false) {
                    die ("<p>Error al abrir el archivo CSV</p>");
                }

                $table_name = '';
                $columns = [];
                $query = '';
                $stmt = null;

                while (($data = fgetcsv($file)) !== false) {
                    // Leer la primera línea para obtener el nombre de la tabla
                    if ($data[0] === '#TABLE') {
                        $table_name = $data[1];
                        $columns = fgetcsv($file);
                        
                        if ($columns === false) {
                            die ("<p>Error al leer los nombres de las columnas del archivo CSV</p>");
                        }
                        // Preparar la consulta de inserción
                        $placeholders = implode(',', array_fill(0, count($columns), '?'));
                        $query = "INSERT INTO $table_name (" . implode(',', $columns) . ") VALUES ($placeholders)";
                        $stmt = $conn->prepare($query);
                        continue;
                    } else {
                        // Leer el resto del archivo y ejecutar la consulta para cada fila
                        $stmt->execute($data);
                    }
                }
                fclose($file);                
            } catch (PDOException $e) {
                die ("<p>Error al importar datos: " . $e->getMessage() . "</p>");
            }
        }

        public function exportCSV() {
            $fileName = "F1ManagerSimulation.csv";
            $conn = $this->connect();

            // Preparar encabezados para la descarga del archivo CSV
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=' . $fileName);

            // Crear un flujo de salida que se envía directamente al cliente
            $output = fopen('php://output', 'w');

            // Definimos los nombres de todas las tablas de la base de datos
            $tables = ["equipos", "pilotos", "circuitos", "carreras", "piloto_carrera"];

            // Iterar sobre cada tabla
            foreach ($tables as $table) {
                // Escribir el encabezado de la tabla
                fputcsv($output, ["#TABLE", $table]);

                // Obtener los nombres de las columnas de la tabla
                $columnsQuery = $conn->query("DESCRIBE $table");
                $columns = $columnsQuery->fetchAll(PDO::FETCH_COLUMN);

                // Escribir las columnas como encabezado
                fputcsv($output, $columns);

                // Obtener los datos de la tabla
                $dataQuery = $conn->query("SELECT * FROM $table");
                while ($row = $dataQuery->fetch(PDO::FETCH_ASSOC)) {
                    // Escribir cada fila en el CSV
                    fputcsv($output, $row);
                }
            }

            // Cerrar el flujo de salida
            fclose($output);
            exit; // Terminar el script para que no se envíe contenido adicional
        }

        public function getTeams() {
            $conn = $this->connect();
            $stmt = $conn->query("SELECT nombre FROM equipos");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function createPilot() {
            $name = $_POST['nombre'];
            $surname = $_POST['apellido'];
            $birthday = $_POST['fecha_nacimiento'];
            $nationality = $_POST['nacionalidad'];
            $team = $_POST['equipo'];

            $conn = $this->connect();
            // Obtenemos el id del equipo seleccionado
            $stmt = $conn->prepare("SELECT id_equipo FROM equipos WHERE nombre = ?");
            $team = $stmt->execute([$team]);
            // Creamos el nuevo piloto
            $stmt = $conn->prepare("INSERT INTO pilotos (nombre, apellido, fecha_nacimiento, nacionalidad, id_equipo) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$name, $surname, $birthday, $nationality, $team]);
        }

    }

    // Procesar solicitud del formulario
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['createDB'])) {
        $f1_manager = new F1Manager();
        $f1_manager->createDatabase();
    }
    // Procesar importación de datos desde CSV
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['importCSV'])) {
        $f1_manager = new F1Manager();
        $f1_manager->importCSV();
    }
    // Procesar exportación de datos a CSV 
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['exportCSV'])) {
        $f1_manager = new F1Manager();
        $f1_manager->exportCSV();
    }
    // Procesar creación de nuevo piloto 
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['createPilot'])) {
        $f1_manager = new F1Manager();
        $f1_manager->createPilot();
    }
?>

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1 Manager</title>
    <meta name="author" content="Javier Sanabria Miranda" />
    <meta name="description" content="Simuladore de Manager de F1" />
    <meta name="keywords" content="F1 Desktop, F1 Manager, Juego" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
    <link rel="icon" href="../multimedia/imagenes/favicon.ico" />

</head>

<body>
    <!-- Datos con el contenido que aparece en el navegador -->
    <header>
        <h1><a href="../index.html" title="Inicio">F1 Desktop</a></h1>
        <nav>
            <a href="../index.html" title="Inicio">Inicio</a>
            <a href="../piloto.html" title="Piloto">Piloto</a>
            <a href="../noticias.html" title="Noticias">Noticias</a>
            <a href="../calendario.html" title="Calendario">Calendario</a>
            <a href="../meteorologia.html" title="Meteorología">Meteorología</a>
            <a href="../circuito.html" title="Circuitos">Circuitos</a>
            <a href="../viajes.php" title="Viajes">Viajes</a>
            <a href="../juegos.html" title="Juegos" class="active">Juegos</a>
        </nav>
    </header>

    <p>Estás en <a href="../index.html" title="Inicio">Inicio</a> >> <a href="../juegos.html" title="Juegos">Juegos</a> >>
        F1 Manager</p>

    <h2>F1 Manager</h2>
    <main>
        <form method="POST">
            <button type="submit" name="createDB">Iniciar Base de Datos</button>
        </form>
        <section>
            <h4>Importar Datos de CSV:</h4>
            <form method="POST" enctype="multipart/form-data">
                <input type="file" name="csvFile" />
                <button type="submit" name="importCSV">Importar</button>
            </form>
        </section>
        <section>
            <h4>Exportar Datos a CSV:</h4>
            <form method="POST">
                <button type="submit" name="exportCSV">Exportar</button>
            </form>
        </section>

        <!-- Sección de creación de nuevo piloto -->
        <section>
            <h3>Crear Nuevo Piloto</h3>
            <form method="POST">
                <h4>Nombre:</h4>
                <input type="text" name="nombre" required/>
                <h4>Apellido:</h4>
                <input type="text" name="apellido" required/>
                <h4>Fecha de Nacimiento:</h4>
                <input type="date" name="fecha_nacimiento" required/>
                <h4>Nacionalidad:</h4>
                <input type="text" name="nacionalidad" required/>
                <h4>Equipo:</h4>
                <select name="equipo" >
                    <?php
                        $f1_manager = new F1Manager();
                        $teams = $f1_manager->getTeams();
                        foreach ($teams as $team) {
                            echo "<option value='{$team['nombre']}'>{$team['nombre']}</option>";
                        }
                    ?>
                </select>
                <button type="submit" name="createPilot">Crear Piloto</button>
            </form>
        </section>
    </main>
</body>
</html>