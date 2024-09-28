<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submission Result</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css"> <!-- Link to your CSS file -->
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #333;
        }
        form {
            max-width: 400px;
            margin: auto;
            padding: 20px;
            background: #fff;
            border: 2px solid #500000;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: #555;
        }
        input[type="text"], input[type="date"], input[type="time"], input[type="file"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 2px solid #500000;
            border-radius: 5px;
            transition: border-color 0.3s;
        }
        input[type="text"]:focus, input[type="date"]:focus, input[type="time"]:focus, input[type="file"]:focus {
            border-color: #500000;
            outline: none;
        }
        input[type="submit"] {
            background-color: #500000;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
            width: 100%;
        }
        input[type="submit"]:hover {
            background-color: #500000;
        }
    </style>
</head>
<body>

<h1>Where I found Reveille!</h1>
<form action="submit_location.php" method="post" enctype="multipart/form-data">
    <label for="location">Location:</label>
    <input type="text" id="location" name="location" required placeholder="Enter your location">

    <label for="date">Date:</label>
    <input type="date" id="date" name="date" required>

    <label for="time">Time:</label>
    <input type="time" id="time" name="time" required>

    <label for="image">Upload Picture:</label>
    <input type="file" id="image" name="image" accept="image/*" required>

    <input type="submit" value="Submit">
</form>

<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $location = htmlspecialchars($_POST['location']);
    $date = htmlspecialchars($_POST['date']);
    $time = htmlspecialchars($_POST['time']);

    echo "<h2>Submitted Data</h2>";
    echo "<p><strong>Location:</strong> $location</p>";
    echo "<p><strong>Date:</strong> $date</p>";
    echo "<p><strong>Time:</strong> $time</p>";

    // Handle file upload
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $uploadDir = 'uploads/';
        $uploadFile = $uploadDir . basename($_FILES['image']['name']);

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
            echo "<p><strong>Uploaded File:</strong> <a href='$uploadFile'>" . basename($uploadFile) . "</a></p>";
        } else {
            echo "<p>File upload failed.</p>";
        }
    } else {
        echo "<p>No file uploaded or there was an upload error.</p>";
    }
}
?>

</body>
</html>


