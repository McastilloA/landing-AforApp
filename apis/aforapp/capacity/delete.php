<?php

  try {
    $bd = include_once "../database.php";

    if ($_SERVER["REQUEST_METHOD"] != "DELETE" && $_SERVER["REQUEST_METHOD"] != "OPTIONS") {
      exit("Solo se admiten peticiones DELETE para actualizar información.");
    }

    if (empty($_GET["idCapacity"])) {
      exit("No existen id de usuarios para eliminar");
    }

    $idCapacity = $_GET["idCapacity"];
    $sql = $bd->prepare("DELETE FROM capacity WHERE id = ?");
    $response = $sql->execute([$idCapacity]);

    echo json_encode([
      "code" => 200,
      "status" => $response,
      "message" => "El registro ha sido eliminado exitosamente."
    ]);

    if (!$response) {
      throw new Exception("Error al eliminar los datos en el servidor.");
    }

  } catch (Exception $e) {
    echo json_encode([
      "code" => 500,
      "status" => false,
      "message" => $e->getMessage()
    ]);
  }
?>