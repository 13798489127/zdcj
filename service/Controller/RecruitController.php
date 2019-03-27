<?php
/**
 * 招聘信息控制器
 */
include "ServerController.php";
class RecruitController
{
    public $db;
    public $root;
    public function __construct()
    {
        $this->db = $GLOBALS['db'];
        $this->root = $GLOBALS['root'];
    }

    public function UpdateRecruit()
    {
       $recruit_content =  $_POST['recruit_content'];
        $result = $this->db->query("update recruit set recruit_content='$recruit_content';");
        $array = [];
        if ($result) {
            $url=$this->root.'/recruit_temp.html';
            $FP = fopen($url,"r");
            $Str = fread($FP,filesize($url));
            $Str = str_replace("{recruit}",$recruit_content, $Str);
            fclose($FP);
            $Handle = fopen($this->root.'/recruit.html',"w");
            fwrite($Handle,$Str);
            fclose($Handle);

            $array[] = [
                "state" => "success",
                "msg" => "修改招聘信息成功",
            ];
        } else {
            $array[] = [
                "state" => "fail",
                "msg" => "修改招聘信息失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
}