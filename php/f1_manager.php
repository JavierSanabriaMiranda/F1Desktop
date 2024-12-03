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
    </main>
</body>
</html>