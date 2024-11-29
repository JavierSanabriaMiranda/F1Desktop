<!DOCTYPE HTML>
<html lang="es">

<?php
    class Carrusel {

        private $photos = array();
        private $params = array(
            'api_key'	=> '3caa7263ba15295bb518ee4864d92916',
            'method'	=> 'flickr.photos.search',
            'format'	=> 'php_serial',
            'tags'      => 'Qatar, Doha',
            'tag_mode'  => 'any',
            'sort'      => 'interestingness-desc'
        );

        private function getEncodedParams() {
            $encoded_params = array();
            foreach ($this->params as $k => $v){
                $encoded_params[] = urlencode($k).'='.urlencode($v);
            }
            return $encoded_params;
        }

        public function getPhotos() {
            $encoded_params = $this->getEncodedParams();
            $url = "https://api.flickr.com/services/rest/?".implode('&', $encoded_params);
            $rsp = file_get_contents($url);
            $rsp_obj = unserialize($rsp);
            
            if ($rsp_obj['stat'] == 'ok') {
                foreach ($rsp_obj['photos']['photo'] as $photo) {
                    if (count($this->photos) >= 10) 
                        break;
                    $photo_url = "https://farm" . $photo['farm'] . ".staticflickr.com/" . $photo['server'] . "/" . $photo['id'] . "_" . $photo['secret'] . ".jpg";
                    $this->photos[] = $photo_url;
            }
            return $this->photos;
            } else {
                echo "<h3>¡Error al llamar al servicio Web de Flickr!</h3>";
            }
        }

        public function printPhotos() {
            foreach ($this->photos as $photo) {
                echo "<img src=" . $photo . " alt='Imagen de Doha, Qatar'>";
            }
        }
    }

    $carrusel = new Carrusel();
    $carrusel->getPhotos();
?>

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Viajes</title>
    <meta name="author" content="Javier Sanabria Miranda" />
    <meta name="description" content="Viajes planificados para la F1" />
    <meta name="keywords" content="F1 Desktop" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico" />
    <link href="https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="js/viajes.js"></script>
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
            <a href="viajes.php" title="Viajes" class="active">Viajes</a>
            <a href="juegos.html" title="Juegos">Juegos</a>
        </nav>
    </header>

    <p>Estás en <a href="index.html" title="Inicio">Inicio</a> >> Viajes</p>

    <h2>Viajes</h2>
    <article>
        <h3>Carrusel de Imágenes</h3>
        <?php
            $carrusel->printPhotos();
        ?>
        <button>&gt;</button>
        <button>&lt;</button>
    </article>

    <main>
        <button onclick="viajes.getStaticMap()">Obtener Mapa Estático</button>
        <button onclick="viajes.getDynamicMap()">Obtener Mapa Dinámico</button>
        <section>
            <h2>Mapa Estático</h2>
        </section>
        <h2>Mapa Dinámico</h2>
        <div></div>
    </main>
    <script>
        viajes.addListenersToCarrusel()
    </script>
</body>

</html>