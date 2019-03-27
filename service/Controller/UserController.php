<?php
//用户控制器
$allow = 1;
include "ServerController.php";

class UserController
{
    public $userid;
    public $root;
    public $db;
    public function __construct()
    {
        $this->userid = $GLOBALS['userid'];
        $this->root = $GLOBALS['root'];
        $this->db = $GLOBALS['db'];
    }
    public function login()
    {
        $array = [];
        $user = $_POST["username"];
        $psw = $_POST["password"];
        $validate = $_POST["validate"];
        $validate = md5($validate);
        if ($validate != $_SESSION["verification"]) {
            $array[] = ["state" => "validata-error","msg"=>"验证码错误"];
            echo json_encode($array);
            mysqli_close($this->db);
            exit();
        }
        $password = hash("sha1", $psw);
        date_default_timezone_set('Asia/Shanghai');
        $sql = "select * from admin_user where username='$user'";
        $res = $this->db->query($sql);
        $num = mysqli_num_rows($res);
        if ($num) {
            $sql3 = "select * from admin_user where username='$user'  and password = '$password'";
            $result2 = $this->db->query($sql3);
            $num3 = mysqli_num_rows($result2);
            if ($num3) {
                while ($num3 = mysqli_fetch_assoc($result2)) {
                    $_SESSION["userid"] = $num3['userid'];
                    $_SESSION["user"] = $num3['username'];
                }
                $userid=$_SESSION["userid"];
                $session_id = session_id();
                $sql = "select login_id from admin_user where userid='$userid'";
                $result = $this->db->query($sql);
                $num1 = mysqli_num_rows($result);
                $token=createRandomStr(20);
                if ($num1) {
                    $sql = "update admin_user set login_id = '$session_id' , login_time=now(), login_token='$token' where userid='$userid'";
                    $this->db->query($sql);
                }
                $_SESSION["ss_id"] = $session_id;
                $array[] = [
                    "state" => "success",
                    "user" => $_SESSION["user"],
                    "token" =>$token,
                    "userid"=>$userid,
                    "login_time"=>date("Y年m月d日 h:i:s"),
                    "msg"=>"登录成功"
                ];//登录成功
            } else {
                $array[] = ["state" => "error","msg"=>"密码或用户名错误"];
            }
        } else {
            $array[] = ["state" => "nouser","msg"=>"用户不存在"];//没有该用户
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
    public function logout()
    {
        $sata = $_GET['e'];
        $sql="update admin_user set login_token='' where userid='$this->userid'";
        $this->db->query($sql);
        session_unset();
        session_destroy();
        if (!empty($sata)) {
            header("Location: ../admin?e=" . $sata);
            exit();
        } else {
            header("Location: ../admin");
            exit();
        }
    }
    public function verifyCode()
    {
        ob_clean();
        function random($len){
            $srcstr = "1a2s3d4f5g6hj8k9qwertyupzxcvbnm";
            mt_srand();
            $strs = "";
            for ($i = 0; $i < $len; $i++) {
                $strs .= $srcstr[mt_rand(0, 30)];
            }
            return $strs;
        }
        $str = random(5);
        $width = 100;
        $height = 40;
        @ header("Content-Type:image/png");
        $im = imagecreate($width, $height);
        $back = imagecolorallocate($im, 0xFF, 0xFF, 0xFF);
        $pix = imagecolorallocate($im, 187, 230, 247);
        $font = imagecolorallocate($im, 0, 184, 60);
        mt_srand();
        for ($i = 0; $i < 1000; $i++) {
            imagesetpixel($im, mt_rand(0, $width), mt_rand(0, $height), $pix);
        }
        imagestring($im, 15, 30, 11, $str, $font);
        imagerectangle($im, -1, -1, $width - 0, $height - 0, $font);
        imagepng($im);
        imagedestroy($im);
        $str = md5($str);
        $_SESSION["verification"] = $str;
    }
}