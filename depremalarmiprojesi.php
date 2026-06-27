<?php
file_put_contents(
"deprem_log.txt",
date("d.m.Y H:i:s")." Deprem algilandi\n",
FILE_APPEND
);
echo "OK";
?>
