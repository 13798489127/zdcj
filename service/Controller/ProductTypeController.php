<?php
//产品类型控制器
include "ServerController.php";

class ProductTypeController
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
    public function AddProductClassify(){
        $array=[];
        $name=$_POST['classify_name'];
        $position=$_POST['classify_position'];
        if($position){
        }else{
            $sql="select * from product_classify order by classify_position";
            $result=$this->db->query($sql);
            $position = mysqli_num_rows($result);
        }
        $classify_id=createGuid();
        $sql="select * from product_classify where classify_name='$name'";
        $result=mysqli_num_rows($this->db->query($sql));
        if($result){
            $array[]=[
                "state"=>"fail",
                "msg"=>"产品类型名称已存在",
            ];
            echo json_encode($array);
            mysqli_close($this->db);
            exit();
        }
        $sql="insert into product_classify (classify_id,classify_name,classify_position) values('$classify_id','$name','$position')";
        $result=$this->db->query($sql);
        if($result){
            $array[]=[
                "classify_name"=>$name,
                "classify_id"=>$classify_id,
                "classify_position"=>$position,
                "state"=>"success",
                "msg"=>"产品分类添加成功",
            ];
        }else{
            $array[]=[
                "state"=>"fail",
                "msg"=>"产品分类添加失败",
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
    public function EditProductClassify(){
        $array=[];
        $id=$_POST['classify_id'];
        $name=$_POST['classify_name'];
        $position=$_POST['classify_position'];
        $old_position=$_POST['old_position'];
        $sql="select * from product_classify where classify_name='$name'";
        $result=$this->db->query($sql);
        if($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $change_id = $num['classify_id'];
                $change_name = $num['classify_name'];
            }
            if($change_name==$name&&$id!=$change_id){
                $array[]=[
                    "state"=>'fail',
                    "msg"=>$change_name.'已经存在，请更换分类名'
                ];
                echo json_encode($array);
                mysqli_close($this->db);
                exit();
            }
        }
        $sql="select * from product_classify where classify_position='$position'";
        $result=$this->db->query($sql);
        if($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $change_id = $num['classify_id'];
            }
            $sql1 = "update product_classify set classify_position='$old_position' where classify_id='$change_id'";
            $this->db->query($sql1);
        }
        $sql1="update product_classify set classify_name='$name',classify_position='$position' where classify_id='$id'";
        $result=$this->db->query($sql1);
        if($result){
            $array[]=[
                "state"=>'success',
                "msg"=>'修改产品类型成功',
                "classify_name"=>$name,
                "classify_id"=>$id,
                "classify_position"=>$position
            ];
        }else{
            $array[]=[
                "state"=>'fail',
                "msg"=>'修改产品类型失败'
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
    public function DeleteProductClassify(){
        $array=[];
        $id=$_POST['classify_id'];
        $sql="select * from product where product_classify='$id'";
        $result=mysqli_num_rows($this->db->query($sql));
        if($result){
            $array[]=[
                "state"=>"fail",
                "msg"=>"该分类下存在产品，禁止删除"
            ];
            echo json_encode($array);
            mysqli_close($this->db);
            exit();
        }
        $sql="delete from product_classify where classify_id='$id'";
        $result=$this->db->query($sql);
        if($result){
            $array[]=[
                "state"=>"success",
                "msg"=>"删除产品类型成功"
            ];
        }else{
            $array[]=[
                "state"=>"fail",
                "msg"=>"删除产品类型失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
}