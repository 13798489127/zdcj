<?php
include "ServerController.php";

class LinkController
{
    public $db;
    public function __construct()
    {
        $this->db = $GLOBALS['db'];
    }
    public function AddLink(){
        $name=$_POST['link_name'];
        $href=$_POST['link_href'];
        $id=createGuid();
        $sql="insert into friend_link (link_id,link_name,link_href) VALUES ('$id','$name','$href')";
        $result=$this->db->query($sql);
        if($result){
            $array[]=[
                "state"=>'success',
                "link_id"=>$id,
                "link_href"=>$href,
                "link_name"=>$name,
                "msg"=>'友情链接添加成功'
            ];
        }else{
            $array[]=[
                "state"=>'fail',
                "msg"=>'友情链接添加失败'
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
    public function EditLink(){
        $id=$_POST['link_id'];
        $name=$_POST['link_name'];
        $href=$_POST['link_href'];
        $sql="update friend_link set link_name='$name',link_href='$href' where link_id='$id'";
        $result=$this->db->query($sql);
        if($result){
            $array[]=[
                "state"=>'success',
                "msg"=>'友情链接修改成功'
            ];
        }else{
            $array[]=[
                "state"=>'fail',
                "msg"=>'友情链接修改失败'
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
    public function DeleteLink(){
        $array=[];
        $id=$_POST['link_id'];
        $sql="delete from friend_link where link_id='$id'";
        $result=$this->db->query($sql);
        if($result){
            $array[]=[
                "state"=>'success',
                "msg"=>'友情链接删除成功'
            ];
        }else{
            $array[]=[
                "state"=>'fail',
                "msg"=>'友情链接删除失败'
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
}