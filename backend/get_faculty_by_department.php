<?php
header("Content-Type: application/json");
include 'db.php';

$department = $_GET['department'] ?? ''; 
$department = $conn->real_escape_string($department);

$result = $conn->query("SELECT * FROM faculty WHERE department='$department' ORDER BY id DESC");
$faculty = [];

while ($row = $result->fetch_assoc()) {
    $row['image'] = $row['image'] ? "staffs/" . basename($row['image']) : null;
    $faculty[] = $row;
}

echo json_encode($faculty);
$conn->close();
?>
