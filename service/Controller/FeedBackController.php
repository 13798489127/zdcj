<?php
/*反馈控制器*/
include "ServerController.php";

class FeedBackController
{
    public $db;
    public function __construct()
    {
        $this->db = $GLOBALS['db'];
    }
    public function DeleteFeedBack(){
        $array=[];
        $id=$_POST['id'];
        $sql="delete from feed_back where feedback_id='$id'";
        $result=$this->db->query($sql);
        if($result){
            $array[]=[
                "state"=>'success',
                "msg"=>'反馈信息删除成功'
            ];
        }else{
            $array[]=[
                "state"=>'fail',
                "msg"=>'反馈信息删除失败'
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
}