<?php

  try {
    $bd = include_once "../database.php";

    if ($_SERVER["REQUEST_METHOD"] != "PUT") {
      exit("Solo se admiten peticiones PUT para actualizar información.");
    }

    $reqAssociated = json_decode(file_get_contents("php://input"));

    if (!$reqAssociated) {
      exit("No existen datos correctos.");
    }

    $sql = $bd->prepare("UPDATE associated SET 
    fullName = ?,
    email = ?, 
    phone = ?, 
    timeNowDate = ?,
    affair = ?,
    message = ?
    WHERE id = ?");
    
    $response = $sql->execute([
        $reqAssociated->fullName,
        $reqAssociated->email,
        $reqAssociated->phone,
        $reqAssociated->timeNowDate,
        $reqAssociated->affair,
        $reqAssociated->message,
        $reqAssociated->id
    ]);

    if ($response) {
      echo json_encode([
        "code" => 200,
        "status" => $response,
        "message" => "El registro ha sido actualizado exitosamente."
      ]);
    } else {
      throw new Exception("Error en el momento de actualizar un asociado en la base de datos.");
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