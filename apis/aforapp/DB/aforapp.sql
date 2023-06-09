-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 09-06-2023 a las 10:08:06
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
-- Base de datos: `aforapp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `associated`
--

CREATE TABLE `associated` (
  `id` int(11) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `timeNowDate` date NOT NULL,
  `affair` varchar(50) NOT NULL,
  `message` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `associated`
--

INSERT INTO `associated` (`id`, `fullName`, `email`, `phone`, `timeNowDate`, `affair`, `message`) VALUES
(1, 'Miguel Castillo', 'mcasti40@ibero.edu.do', '3124646647', '2023-06-09', 'Solicitud de información', 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.'),
(2, 'juan carlos pulido car', 'erfp@hotmail.com', '3124646647', '2023-06-09', 'Mayor información', 'Lorem ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `capacity`
--

CREATE TABLE `capacity` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `typeDocument` varchar(3) NOT NULL,
  `document` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `birthDate` date NOT NULL,
  `timeNowDate` datetime NOT NULL,
  `timeAfterDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `capacity`
--

INSERT INTO `capacity` (`id`, `name`, `lastName`, `typeDocument`, `document`, `email`, `phone`, `birthDate`, `timeNowDate`, `timeAfterDate`) VALUES
(36, 'Pedro Castillo', 'Bello Florez', 'CC', '1077180644', 'pcbf_02@m.com', '22222221', '1950-10-10', '2023-05-25 11:27:13', '2023-05-25 11:27:13'),
(39, 'David Daniel', 'Plata', 'PAS', '1200000008765', 'ddp92@hotmail.com', '3124646647', '1992-12-12', '2023-05-26 12:09:43', '2023-05-26 12:11:24'),
(40, 'Diana Carolina', 'Galindo', 'CD', '1234001234', 'dcgp95@hotmail.com', '3201234567', '1995-10-10', '2023-05-26 12:11:24', '2023-06-08 08:44:10'),
(48, 'Miguel Alejandro', 'Rodriguez', 'TI', '1234343443', 'erfp@hotmail.com', '3124646647', '2000-10-10', '2023-06-09 01:48:43', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `associated`
--
ALTER TABLE `associated`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `capacity`
--
ALTER TABLE `capacity`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `associated`
--
ALTER TABLE `associated`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `capacity`
--
ALTER TABLE `capacity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
