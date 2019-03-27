<?php
mb_internal_encoding("UTF-8");
$conf=[
    "HOST"=>"127.0.0.1",
    "PORT"=>"3306",
    "DATABASE"=>"zdcj",
    "USERNAME"=>"root",
    "PASSWORD"=>""
    //"ADDRESS"=>"D:\\laragon\\www\\zdcj"
];
class ServerController
{
    public function __construct($conf)
    {
        global $allow;
        $GLOBALS['db'] = new mysqli($conf['HOST'], $conf['USERNAME'], $conf['PASSWORD'], $conf['DATABASE']);
        $GLOBALS['root'] =$conf['ADDRESS'];
        $GLOBALS['db']->query("set names 'utf8'");
        $GLOBALS['userid']=$_SESSION["userid"];
        $GLOBALS['username']= $_SESSION['user'];
        $userid = $_SESSION["userid"];
        if ($allow!=1) {
            $token=$_GET['token'];
            $sql = "select * from admin_user where userid='$userid'";
            $result = $GLOBALS['db']->query($sql);
            $num1 = mysqli_num_rows($result);
            if ($num1) {
                while ($num1 = mysqli_fetch_assoc($result)) {
                    $login_id = $num1['login_id'];
                    $login_token=$num1['login_token'];
                }
                if ($token !=$login_token) {
                    echo 'token认证失效';
                    Header("http/1.0 401 Forbidden");
                    exit();
                }
                if ($login_id != $_SESSION["ss_id"]) {
                    Header("http/1.0 401 Forbidden");
                    exit();
                }
            } else {
                Header("http/1.0 401 Forbidden");
                exit();
            }
        }
    }
}
new ServerController($conf);
function createRandomStr($length){
    $str = array_merge(range(0,9),range('a','z'));
    shuffle($str);
    $str = implode('',array_slice($str,0,$length));
    return $str;
}
function createRandomnum($length) {
    return rand(pow(10,($length-1)), pow(10,$length)-1);
}
function createGuid(){
    mt_srand((double)microtime()*10000);
    $charid = strtoupper(md5(uniqid(rand(), true)));
    $hyphen = chr(45);
    $uuid =substr($charid, 0, 8).$hyphen
        .substr($charid, 8, 4).$hyphen
        .substr($charid,12, 4).$hyphen
        .substr($charid,16, 4).$hyphen
        .substr($charid,20,12);
    return $uuid;
}
function createThumb($src,$sx,$sy,$save){
    $imgage = getimagesize($src); //得到原始大图片
    switch ($imgage[2]) { // 图像类型判断
        case 1:
            $im = imagecreatefromgif($src);
            break;
        case 2:
            $im = imagecreatefromjpeg($src);
            break;
        case 3:
            $im = imagecreatefrompng($src);
            break;
    }
    $fx = imagesx($im); // 获取宽度
    $fy = imagesy($im); // 获取高度
    $small = imagecreatetruecolor($sx,$sy);
    imagecopyresampled($small,$im,0,0,0,0,$sx,$sy,$fx,$fy);
    imagejpeg($small,$save);
    imagedestroy($im);
    imagedestroy($small);
}
function getadder(){
    return 'http://'.$_SERVER['SERVER_NAME'].':'.$_SERVER["SERVER_PORT"];
}
function removeDir($dirName){
    if(! is_dir($dirName))
    {
        return false;
    }
    $handle = @opendir($dirName);
    while(($file = @readdir($handle)) !== false)
    {
        if($file != '.' && $file != '..')
        {
            $dir = $dirName . '/' . $file;
            is_dir($dir) ? removeDir($dir) : @unlink($dir);
        }
    }
    closedir($handle);
    return rmdir($dirName) ;
}
?>