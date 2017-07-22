<?php

    // Connect to db
    $connection = mysql_connect('localhost', 'bodycurry', 'Access@123');
    mysql_select_db('bodycurry', $connection);
    error_reporting(E_ALL && ~E_NOTICE);

    // Get ip
    $ip = $_SERVER['REMOTE_ADDR'];

    // Check if ip exists
    $query = "SELECT * from analytics where ip='$ip'";
    $result = mysql_query($query);

    if(mysql_num_rows($result) > 0) {
        while($row = mysql_fetch_array($result)) {
            $count = (int)$row['count'] + 1;
            echo $row;
        }

        // Update count
        $sql="UPDATE analytics
            SET count = '$count'
            WHERE ip='$ip'";
        mysql_query($sql);
    } else {

        // Insert ip
        $sql = "INSERT INTO analytics (ip, count) VALUES ('$ip', 1)";
        mysql_query($sql);
    }

?>
