<?php

  try {
    $bd = include_once "../database.php";

    $sql = $bd->query("SELECT * FROM capacity");
    $response = $sql->fetchAll(PDO::FETCH_OBJ);

    echo json_encode([
      "code" => 200,
      "status" => true,
      "data" => $response,
    ]);

    if (!$response) {
      throw new Exception("Error al visualizar los datos en el servidor.");
    }

  } catch (Exception $e) {
    echo json_encode([
      "code" => 500,
      "status" => false,
      "message" => $e->getMessage()
    ]);
  }
?>