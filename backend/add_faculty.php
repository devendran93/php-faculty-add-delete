<?php
header("Access-Control-Allow-Origin: *");
include 'db.php';

// Get form data
$name = $_POST['name'] ?? '';
$qualification = $_POST['qualification'] ?? '';
$designation = $_POST['designation'] ?? '';
$department = $_POST['department'] ?? '';
$image = null;

// Handle image upload
if(isset($_FILES['image']) && $_FILES['image']['error'] === 0){
    $filename = time() . "_" . $_FILES['image']['name'];
    $filepath = "staffs/" . $filename;
    move_uploaded_file($_FILES['image']['tmp_name'], $filepath);
    $image = $filename;
}

// Insert into DB
$stmt = $conn->prepare("INSERT INTO faculty (image, name, qualification, designation, department) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $image, $name, $qualification, $designation, $department);
if($stmt->execute()){
    echo json_encode(["status"=>"success"]);
} else {
    echo json_encode(["status"=>"error","message"=>"Failed to add faculty"]);
}

$stmt->close();
$conn->close();
?>
