<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? 0;

$stmt = $conn->prepare("DELETE FROM faculty WHERE id=?");
$stmt->bind_param("i", $id);
if($stmt->execute()){
    echo json_encode(["status"=>"deleted"]);
} else {
    echo json_encode(["status"=>"error","message"=>"Failed to delete"]);
}

$stmt->close();
$conn->close();
?>
