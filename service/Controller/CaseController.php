<?php
//成功案例控制器
include "ServerController.php";

class CaseController
{
    public $root;
    public $db;
    public function __construct()
    {
        $this->root = $GLOBALS['root'];
        $this->db = $GLOBALS['db'];
    }
    public function AddCase(){
        $name=$_POST['case_name'];
        $id=createGuid();
        $sql="insert into success_case (case_id,case_name,case_preview) VALUES ('$id','$name',null)";
        $result=$this->db->query($sql);
        if($result){
            $array[]=[
                "state"=>'success',
                "case_id"=>$id,
                "case_name"=>$name,
                "msg"=>'案例添加成功'
            ];
        }else{
            $array[]=[
                "state"=>'fail',
                "msg"=>'案例添加失败'
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
    public function DeleteCase(){
        $array=[];
        $id=$_POST['id'];
        $old_preview=$_POST['old_preview'];
        $sql="delete from success_case where case_id='$id'";
        $result=$this->db->query($sql);
        if($result){
            unlink($this->root.'/'.$old_preview);
            $array[]=[
                "state"=>'success',
                "msg"=>'案例删除成功'
            ];
        }else{
            $array[]=[
                "state"=>'fail',
                "msg"=>'案例删除失败'
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
    public function EditCase(){
        $id=$_POST['case_id'];
        $name=$_POST['case_name'];
        $sql="update success_case set case_name='$name' where case_id='$id'";
        $result=$this->db->query($sql);
        if($result){
            $array[]=[
                "state"=>'success',
                "msg"=>'案例修改成功'
            ];
        }else{
            $array[]=[
                "state"=>'fail',
                "msg"=>'案例修改失败'
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
}