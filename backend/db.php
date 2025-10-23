<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database connection
$host = "localhost";
$user = "mass_polytechnic";   // replace with your DB username
$pass = "mass_polytechnic";   // replace with your DB password
$dbname = "mass_polytechnic";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(["status"=>"error","message"=>"Database connection failed: ".$conn->connect_error]));
}

// Helper to read JSON input
function getJsonInput() {
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);
    return is_array($data) ? $data : [];
}
?>
