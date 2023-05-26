<?php

  try {
    $bd = include_once "../database.php";
    $reqCapacity = json_decode(file_get_contents("php://input"));
    
    if (!$reqCapacity) {
        exit("No existen datos correctos.");
    }

    $sql = $bd->prepare("INSERT INTO capacity(name, lastName, typeDocument, document, email, phone, birthDate, timeNowDate) VALUES (?,?,?,?,?,?,?,?)");
    $response = $sql->execute([
        $reqCapacity->name,
        $reqCapacity->lastName,
        $reqCapacity->typeDocument,
        $reqCapacity->document,
        $reqCapacity->email,
        $reqCapacity->phone,
        $reqCapacity->birthDate,
        $reqCapacity->timeNowDate
    ]);

    echo json_encode([
      "code" => 200,
      "status" => $response,
      "message" => "El registro ha sido creado exitosamente."
    ]);

    if (!$response) {
      throw new Exception("Error al crear los datos en el servidor.");
    }

  } catch (Exception $e) {
    echo json_encode([
      "code" => 500,
      "status" => false,
      "message" => $e->getMessage()
    ]);
  }
?>