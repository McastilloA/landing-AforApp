<?php

  try {
    $bd = include_once "../database.php";

    if ($_SERVER["REQUEST_METHOD"] != "PUT") {
      exit("Solo se admiten peticiones PUT para actualizar información.");
    }

    $reqCapacity = json_decode(file_get_contents("php://input"));

    if (!$reqCapacity) {
      exit("No existen datos correctos.");
    }

    $sql = $bd->prepare("UPDATE capacity SET 
    name = ?, 
    lastName = ?, 
    typeDocument = ?, 
    document = ?, 
    email = ?, 
    phone = ?, 
    birthDate = ?, 
    timeNowDate = ?,
    timeAfterDate = ?
    WHERE id = ?");
    
    $response = $sql->execute([
        $reqCapacity->name,
        $reqCapacity->lastName,
        $reqCapacity->typeDocument,
        $reqCapacity->document,
        $reqCapacity->email,
        $reqCapacity->phone,
        $reqCapacity->birthDate,
        $reqCapacity->timeNowDate,
        $reqCapacity->timeAfterDate,
        $reqCapacity->id
    ]);

    echo json_encode([
      "code" => 200,
      "status" => $response,
      "message" => "El registro ha sido actualizado exitosamente."
    ]);

    if (!$response) {
      throw new Exception("Error al actualizar los datos en el servidor.");
    }

  } catch (Exception $e) {
    echo json_encode([
      "code" => 500,
      "status" => false,
      "message" => $e->getMessage()
    ]);
  }
?>