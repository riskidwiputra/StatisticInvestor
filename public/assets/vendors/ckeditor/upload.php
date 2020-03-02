    <?php
    session_start();

    if(isset($_FILES['upload']['name']))
    {
    $file = $_FILES['upload']['tmp_name'];
    $file_name = $_FILES['upload']['name'];
    $folder = '../../../../../../stream.id/public/assets/img/NewsGame/';
    $folder2 = '../../img/NewsGame/';
    $file_name_array = explode(".", $file_name);
    $extension = strtolower(end($file_name_array));
    $new_image_name = rand() . '.' . $extension;
    chmod('upload', 0777);
    $allowed_extension = array("jpg", "gif", "png",'jpeg');
    if(in_array($extension, $allowed_extension))
    {
    move_uploaded_file($file, $folder. $new_image_name);
    copy($folder.$new_image_name, $folder2.$new_image_name);
    $function_number = $_GET['CKEditorFuncNum'];
    $url = '../public/assets/img/NewsGame/' . $new_image_name;
    $link = $_SESSION['best'].'/public/assets/img/NewsGame/' . $new_image_name;
    $message = '';
    echo "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction($function_number, '$link', '$message');</script>";
    }
    }

    ?>