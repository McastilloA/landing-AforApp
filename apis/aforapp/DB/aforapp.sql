-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 09-06-2023 a las 02:49:57
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
(36, 'Pedro Castillo', 'Bello Florez', 'CD', 'y2k-000', 'm@m.com', '22222221', '2012-10-10', '2023-05-25 11:27:13', '2023-05-25 11:27:13'),
(37, 'Diego Armando', 'Florez portela', 'CD', 'y2k', 'm@m.com', '2222222', '2012-10-10', '2023-05-25 11:27:13', '2023-05-25 11:37:13'),
(38, 'Jose', 'Humberto', 'CC', '1234343443', 'erfp@hotmail.com', '3124646647', '2010-10-10', '2023-05-25 11:41:51', NULL),
(39, 'David', 'Plata', 'PAS', 'y54bn545', 'm_alejandroc@hotmail.com', '3124646647', '2020-12-12', '2023-05-26 12:09:43', '2023-05-26 12:11:24'),
(40, 'AFORAPP', 'mundo', 'CD', '123400', 'erfp@hotmail.com', '2222222', '2020-10-10', '2023-05-26 12:11:24', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `capacity`
--
ALTER TABLE `capacity`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `capacity`
--
ALTER TABLE `capacity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
