<?php
file_put_contents(
"deprem_log.txt",
date("d.m.Y H:i:s")." Deprem Alarmı Test Projesi\n",
FILE_APPEND
);
echo "OK";
?>
