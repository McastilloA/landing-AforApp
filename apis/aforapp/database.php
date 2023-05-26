<?php

  header("Access-Control-Allow-Origin: http://localhost:4200");
  header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
  header("Access-Control-Allow-Headers: *");

  $host = 'localhost';
  $user = 'root';
  $pass = '';
  $db = 'aforapp';
  $conn = null;

  try {
    return new PDO('mysql:host=' . $host . ';dbname=' . $db, $user, $pass);
  } catch (PDOException $e) {
    echo "Tenemos un error de conexión: " . $e->getMessage();
    return null;
  }
?>