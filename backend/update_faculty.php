<?php
header("Access-Control-Allow-Origin: *");
include 'db.php';

$id = $_GET['id'] ?? 0;
$name = $_POST['name'] ?? '';
$qualification = $_POST['qualification'] ?? '';
$designation = $_POST['designation'] ?? '';
$department = $_POST['department'] ?? '';
$image = null;

// Handle new image if uploaded
if(isset($_FILES['image']) && $_FILES['image']['error'] === 0){
    $filename = time() . "_" . $_FILES['image']['name'];
    $filepath = "staffs/" . $filename;
    move_uploaded_file($_FILES['image']['tmp_name'], $filepath);
    $image = $filename;
    $stmt = $conn->prepare("UPDATE faculty SET name=?, qualification=?, designation=?, department=?, image=? WHERE id=?");
    $stmt->bind_param("sssssi", $name, $qualification, $designation, $department, $image, $id);
} else {
    $stmt = $conn->prepare("UPDATE faculty SET name=?, qualification=?, designation=?, department=?, WHERE id=?");
    $stmt->bind_param("ssssi", $name, $qualification, $designation, $department, $id);
}

if($stmt->execute()){
    echo json_encode(["status"=>"success"]);
} else {
    echo json_encode(["status"=>"error","message"=>"Failed to update"]);
}

$stmt->close();
$conn->close();
?>
