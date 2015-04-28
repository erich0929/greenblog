<?php

function generateRandomString($length = 10) {
    return substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, $length);
}

$salt = generateRandomString ();
echo 'salt : ' . $salt; 
echo "\n";
echo 'md5 : ' . md5 ($salt . '2642805');
echo "\n";
echo 'all : ' . $salt . md5 ($salt . '2642805');
