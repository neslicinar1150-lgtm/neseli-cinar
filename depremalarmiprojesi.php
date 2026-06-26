<?php
file_put_contents("deprem.txt", "DEPREM " . date("H:i:s") . "\n", FILE_APPEND);
echo "OK";
?>
