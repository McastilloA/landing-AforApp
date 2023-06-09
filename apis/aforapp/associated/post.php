<?php

  try {
    $bd = include_once "../database.php";
    $reqAssociated = json_decode(file_get_contents("php://input"));
    
    if (!$reqAssociated) {
        exit("No existen datos correctos.");
    }

    $sql = $bd->prepare("INSERT INTO associated(fullName, email, phone, timeNowDate, affair, message) VALUES (?,?,?,?,?,?)");
    $response = $sql->execute([
        $reqAssociated->fullName,
        $reqAssociated->email,
        $reqAssociated->phone,
        $reqAssociated->timeNowDate,
        $reqAssociated->affair,
        $reqAssociated->message
    ]);

    if ($response) {
      echo json_encode([
        "code" => 200,
        "status" => $response,
        "message" => "El registro ha sido creado exitosamente."
      ]);
    } else {
      throw new Exception("Error en el momento de crear un asociado en la base de datos.");
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