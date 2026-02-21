<?php
$allowed = ["jpg","jpeg","png","heic","docx","txt"];
$ext = strtolower(pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION));

if (!in_array($ext, $allowed)) {
    http_response_code(400);
    exit("Geçersiz dosya türü");
}

move_uploaded_file(
    $_FILES["file"]["tmp_name"],
    "uploads/" . uniqid() . "." . $ext
);
?>