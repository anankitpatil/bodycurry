<?php

if (isset($_REQUEST)) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $interested = $_POST['interested'];

    // Connect to db
    $connection = mysql_connect('localhost', 'bodycurry', 'Access@123');
    mysql_select_db('bodycurry', $connection);
    error_reporting(E_ALL && ~E_NOTICE);

    // Insert contact
    $sql = "INSERT INTO contact (name, email, phone, interested) VALUES ('$name', '$email', '$phone', '$interested')";
    if (mysql_query($sql)) {
        echo "Thanks! We've received your details and will get back to you soon.";
    }

    // Mail alert
    $to = 'devdutts@gmail.com, drpradnyashastri@gmail.com';//, anankitpatil@gmail.com';
    $subject = 'bodycurry.com | Contact from '.$name;
    $message = 'Name: '.$name."\r\n".
        'E - mail: '.$email."\r\n".
        'Mobile no.: '.$phone."\r\n".
        'Interest: '.$interested."\r\n".
        "\r\n".
        'BodyCurry';
    $headers = 'From: BodyCurry Contact Form <contact@bodycurry.com>'."\r\n".
        'Reply-To: '.$name.' <'.$email.">\r\n".
        'X-Mailer: PHP/'.phpversion();

    mail($to, $subject, $message, $headers);
}
