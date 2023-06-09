<?php

  try {
    $bd = include_once "../database.php";

    if ($_SERVER["REQUEST_METHOD"] != "DELETE" && $_SERVER["REQUEST_METHOD"] != "OPTIONS") {
      exit("Solo se admiten peticiones DELETE para actualizar información.");
    }

    if (empty($_GET["idAssociated"])) {
      exit("No existen id de usuarios para eliminar");
    }

    $idAssociated = $_GET["idAssociated"];
    $sql = $bd->prepare("DELETE FROM associated WHERE id = ?");
    $response = $sql->execute([$idAssociated]);

    if ($response) {
      echo json_encode([
        "code" => 200,
        "status" => $response,
        "message" => "El registro ha sido eliminado exitosamente."
      ]);
    } else {
      throw new Exception("Error en el momento de eliminar un asociado en la base de datos.");
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
      "message" => $e->getMessage()
    ]);
  }
?>