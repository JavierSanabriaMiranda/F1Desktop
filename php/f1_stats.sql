-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 03-12-2024 a las 09:55:54
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `f1_stats`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Carreras`
--

CREATE TABLE `Carreras` (
  `ID_Carrera` int(10) UNSIGNED NOT NULL,
  `ID_Circuito` int(10) UNSIGNED NOT NULL,
  `Fecha` date NOT NULL,
  `Numero_Vueltas` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Circuitos`
--

CREATE TABLE `Circuitos` (
  `ID_Circuito` int(10) UNSIGNED NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Pais` varchar(40) NOT NULL,
  `Localidad` varchar(80) NOT NULL,
  `Longitud` float UNSIGNED NOT NULL COMMENT 'Longitud expresada en metros'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Equipos`
--

CREATE TABLE `Equipos` (
  `ID_Equipo` int(10) UNSIGNED NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Pais` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pilotos`
--

CREATE TABLE `Pilotos` (
  `ID_Piloto` int(10) UNSIGNED NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(80) NOT NULL,
  `Fecha_Nacimiento` date NOT NULL,
  `Nacionalidad` varchar(40) NOT NULL,
  `ID_Equipo` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Piloto_Carrera`
--

CREATE TABLE `Piloto_Carrera` (
  `ID_Piloto` int(10) UNSIGNED NOT NULL,
  `ID_Carrera` int(10) UNSIGNED NOT NULL,
  `Posicion` int(10) UNSIGNED NOT NULL,
  `Puntos` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Carreras`
--
ALTER TABLE `Carreras`
  ADD PRIMARY KEY (`ID_Carrera`),
  ADD KEY `FK_Circuito` (`ID_Circuito`);

--
-- Indices de la tabla `Circuitos`
--
ALTER TABLE `Circuitos`
  ADD PRIMARY KEY (`ID_Circuito`);

--
-- Indices de la tabla `Equipos`
--
ALTER TABLE `Equipos`
  ADD PRIMARY KEY (`ID_Equipo`);

--
-- Indices de la tabla `Pilotos`
--
ALTER TABLE `Pilotos`
  ADD PRIMARY KEY (`ID_Piloto`),
  ADD KEY `FK_Equipo` (`ID_Equipo`);

--
-- Indices de la tabla `Piloto_Carrera`
--
ALTER TABLE `Piloto_Carrera`
  ADD PRIMARY KEY (`ID_Piloto`,`ID_Carrera`),
  ADD KEY `FK_Carrera` (`ID_Carrera`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Carreras`
--
ALTER TABLE `Carreras`
  MODIFY `ID_Carrera` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Circuitos`
--
ALTER TABLE `Circuitos`
  MODIFY `ID_Circuito` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Equipos`
--
ALTER TABLE `Equipos`
  MODIFY `ID_Equipo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Pilotos`
--
ALTER TABLE `Pilotos`
  MODIFY `ID_Piloto` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Carreras`
--
ALTER TABLE `Carreras`
  ADD CONSTRAINT `FK_Circuito` FOREIGN KEY (`ID_Circuito`) REFERENCES `Circuitos` (`ID_Circuito`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Pilotos`
--
ALTER TABLE `Pilotos`
  ADD CONSTRAINT `FK_Equipo` FOREIGN KEY (`ID_Equipo`) REFERENCES `Equipos` (`ID_Equipo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Piloto_Carrera`
--
ALTER TABLE `Piloto_Carrera`
  ADD CONSTRAINT `FK_Carrera` FOREIGN KEY (`ID_Carrera`) REFERENCES `Carreras` (`ID_Carrera`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Piloto` FOREIGN KEY (`ID_Piloto`) REFERENCES `Pilotos` (`ID_Piloto`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
