<?php
  try {
    $bd = include_once "../database.php";

    $sql = $bd->query("SELECT * FROM associated ORDER BY fullName");
    $response = $sql->fetchAll(PDO::FETCH_OBJ);

    if ($response) {
      echo json_encode([
        "code" => 200,
        "status" => true,
        "data" => $response
      ]);
    } else {
      throw new Exception("No se encontraron registros en la base de datos en estos momentos.");
    }
  } catch (PDOException $e) {
    echo json_encode([
      "code" => 500,
      "status" => false,
      "message" => "Error en la conexión a la base de datos: " . $e->getMessage()
    ]);
  } catch (Exception $e) {
    echo json_encode([
      "code" => 200,
      "status" => false,
      "message" => $e->getMessage(),
    ]);
  }
?>