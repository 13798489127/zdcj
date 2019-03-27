<?php
//通用控制器
include "ServerController.php";

class PublicController
{
    public $userid;
    public $root;
    public $db;
    public $admin;
    public function __construct()
    {
        $this->userid = $GLOBALS['userid'];
        $this->root = $GLOBALS['root'];
        $this->db = $GLOBALS['db'];
        $this->admin='1E37CCEE-3AFE-D890-53F6-738E1BA37DA7';
    }
    /*通用接口*/
    public function check(){
        $array=["认证通过"];
        echo json_encode($array);
    }
    public function UploadFile()
    {
        $type = $_POST['upload_type'];
        $file = $_FILES['file'];
        $old_file = $_POST['old_fileName'];
        $data = $_POST['data'];
        $fileName = $file["name"];
        $file_type = substr(strrchr($fileName, '.'), 1);
        if ($old_file) {
            unlink($this->root . '/' . $old_file);
        }
        if ($type == 'logo') {
            $fileName = 'logo.' . $file_type;
        } else {
            if ($data && $type != 'company' &&  $type != 'news') {
                $id = $data;
            } else {
                $id = createGuid();
            }
            $fileName = $id . '.' . $file_type;
        }
        $url = 'public/img/' . $type . '/' . $fileName;
        if ($type === 'logo') {
            $sql = "update web_info set web_logo='$url'";
        } else if ($type == 'product') {
            $sql = "update product set product_prview='$url' where product_id='$data'";
        } else if ($type == 'successCase') {
            $sql = "update success_case set case_preview='$url' where case_id='$data'";
        } else if ($type == 'banner') {
            $sql = "update banner set banner_preview='$url' where banner_id='$data'";
        } else if ($type == 'news') {
            $url = '/public/img/news/' . $data . '/' . $fileName;
            if (!is_dir($this->root . "/public/img/news/" . $data)) {
                mkdir($this->root . "/public/img/news/" . $data);
            }
            move_uploaded_file($file["tmp_name"], $this->root . $url);
            $array[] = [
                "state" => "success",
                "filename" => $fileName,
                "url" => $url,
                "msg" => "上传成功",
            ];
            echo json_encode($array);
            exit();
        } else if ($type == 'company') {
            $url = '/public/img/companyInfo/' . $data . '/' . $fileName;
            if (!is_dir($this->root . "/public/img/companyInfo/" . $data)) {
                mkdir($this->root . "/public/img/companyInfo/" . $data);
            }
            move_uploaded_file($file["tmp_name"], $this->root . $url);
            $array[] = [
                "state" => "success",
                "filename" => $fileName,
                "url" => $url,
                "msg" => "上传成功",
            ];
            echo json_encode($array);
            exit();
        } else if ($type == 'recruit') {
            $sql = "";
        }
        $result = $this->db->query($sql);
        if ($result) {
            move_uploaded_file($file["tmp_name"], $this->root . '/public/img/' . $type . '/' . $fileName);
            $array[] = [
                "state" => "success",
                "filename" => $fileName,
                "url" => $url,
                "msg" => "上传成功",
            ];
        } else {
            $array[] = [
                "state" => "fail",
                "msg" => "上传失败",
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
    public function GetUser(){
        $array=[];
        $sql="select * from admin_user order by register_time";
        $result = $this->db->query($sql);
        if($result){
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "userid" => $num["userid"],
                    "username" =>$num['username'],
                    "register_time"=>$num['register_time']
                ];//登录成功
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
    public function register()
    {
        $array = [];
        $user = $_POST["username"];
        $psw = $_POST["password"];
        $password = hash("sha1", $psw);
        $sql = "select username from admin_user where username = '$user'";
        $result = $this->db->query($sql);
        $num = mysqli_num_rows($result);
        if ($num) {
            $array[] = ["state" => "user-isexist","msg"=>"用户名已存在"];
        } else {
            $userid = createGuid();
            $sql_insert = "insert into admin_user (userid,username,password) values('$userid','$user','$password')";
            $res_insert = $this->db->query($sql_insert);
            if ($res_insert) {
                $array[] = ["state" => "success","msg"=>"管理员添加成功","username"=>$user,"userid"=>$userid,"register_time"=>"今天"];
            } else {
                $array[] = ["state" => "fail","msg"=>"管理员添加失败"];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
    public function updateUser(){
        $array = [];
        $userid=$_POST['userid'];
        $username=$_POST['username'];
        $newpass = $_POST["newpass"];
        $newpass = hash("sha1", $newpass);
        if($userid==$this->admin){
            $oldpass = $_POST["oldpass"];
            $oldpass = hash("sha1", $oldpass);
            $sql = "select * from admin_user where userid='$userid';";
            $result = $this->db->query($sql);
            while ($num = mysqli_fetch_assoc($result)) {
                $nowpass = $num["password"];
                $name=$num['username'];
                $uid=$num['userid'];
            }
            if ($nowpass == $oldpass) //判断密码是否正确
            {
                if($name==$username&&$uid!=$userid){
                    $array[] = ["state" => "user_error","msg"=>"用户名已存在"];
                    echo json_encode($array);
                    exit();
                }else {
                    $sql_update = "update admin_user set username='$username',password='$newpass' where userid='$userid';";
                }
            } else {
                $array[] = ["state" => "pass_error","msg"=>"原始密码错误"];//原始密码错误
            }
        }else{
            $sql = "select * from admin_user where userid='$userid';";
            $result = $this->db->query($sql);
            while ($num = mysqli_fetch_assoc($result)) {
                $name=$num['username'];
                $uid=$num['userid'];
            }
            if($name==$username&&$uid!=$userid){
                $array[] = ["state" => "user_error","msg"=>"用户名已存在"];
                echo json_encode($array);
                exit();
            }else {
                $sql_update = "update admin_user set username='$username',password='$newpass' where userid='$userid';";
            }
        }
        $result = $this->db->query($sql_update);
        if ($result) {
            $array[] = ["state" => "success","msg"=>"信息修改成功"];//修改失败
        } else {
            $array[] = ["state" => "fail","msg"=>"信息修改失败"];//修改失败
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
    public function DeleteUser(){
        $array=[];
        $id=$_POST['userid'];
        if($id==$this->admin){
            $array[]=[
                "state"=>"fail",
                "msg"=>"不可删除该管理员！"
            ];
            echo json_encode($array);
            exit();
        }
        if($id==$this->userid){
            $array[]=[
                "state"=>"fail",
                "msg"=>"当前管理员已登录，无法删除！"
            ];
            echo json_encode($array);
            exit();
        }
        $sql="delete from admin_user where userid='$id'";
        $result=$this->db->query($sql);
        if($result){
            $array[]=[
                "state"=>"success",
                "msg"=>"删除管理员成功"
            ];
        }else{
            $array[]=[
                "state"=>"fail",
                "msg"=>"删除管理员失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
}