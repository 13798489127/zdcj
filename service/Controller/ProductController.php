<?php
//产品控制器
include "ServerController.php";

class ProductController
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
    public function AddProduct(){
        $product_classify=$_POST['product_classify'];
        $product_name=$_POST['product_name'];
        $product_desp=$_POST['product_desp'];
        $product_position=$_POST['product_position'];
        $product_recommend=$_POST['product_recommend'];
        $recommend_position=$_POST['recommend_position'];
        $sql="select * from product where product_name='$product_name'";
        $result=mysqli_num_rows($this->db->query($sql));
        if($result){
            $array[]=[
                "state"=>"fail",
                "msg"=>$product_name."产品已存在,请更换产品名称",
            ];
            echo json_encode($array);
            mysqli_close($this->db);
            exit();
        }
        $sql="select * from product where product_recommend='1'";
        $result=mysqli_num_rows($this->db->query($sql));
        if($result>=8&&$product_recommend==1){
            $array[]=[
                "state"=>"fail",
                "msg"=>"产品推荐设置更新失败,超出最大推荐数(8个)，请移除部分推荐产品"
            ];
            echo json_encode($array);
            mysqli_close($this->db);
            exit();
        }
        if($product_position) {
        }else{
            $sql = "select * from product where product_classify='$product_classify'";
            $product_position = mysqli_num_rows($this->db->query($sql));
        }
        if($product_recommend==1&&!$recommend_position){
            $sql = "select * from product where product_recommend='1'";
            $recommend_position = mysqli_num_rows($this->db->query($sql));
        }else{
            $recommend_position=   $product_position;
        }
        $product_id=createGuid();
        $sql="insert into product (product_id,product_classify,product_name,product_desp,product_position,product_recommend,recommend_position) values('$product_id','$product_classify','$product_name','$product_desp','$product_position','$product_recommend','$recommend_position')";
        $result=$this->db->query($sql);
        if($result){
            $array[]=[
                "product_id"=>$product_id,
                "product_classify"=>$product_classify,
                "product_name"=>$product_name,
                "product_desp"=>$product_desp,
                "product_position"=>$product_position,
                "product_recommend"=>$product_recommend,
                "recommend_position"=>$recommend_position,
                "state"=>"success",
                "msg"=>"产品添加成功",
            ];
        }else{
            $array[]=[
                "state"=>"fail",
                "msg"=>"产品添加失败",
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
    public function EditCommend(){
        $product_id=$_POST['product_id'];
        $product_recommend=$_POST['product_recommend'];
        $sql="select * from product where product_recommend='1'";
        $result=mysqli_num_rows($this->db->query($sql));
        if($result>=8&&$product_recommend==1){
            $array[]=[
                "state"=>"fail",
                "msg"=>"产品推荐设置更新失败,超出最大推荐数(8个)，请移除部分推荐产品"
            ];
            echo json_encode($array);
            mysqli_close($this->db);
            exit();
        }
        $sql="update product set product_recommend='$product_recommend' where product_id='$product_id'";
        $result=$this->db->query($sql);
        if($result){
            $array[]=[
                "state"=>"success",
                "msg"=>"产品推荐设置更新成功"
            ];
        }else{
            $array[]=[
                "state"=>"fail",
                "msg"=>"产品推荐设置更新失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
    public function EditProduct(){
        $product_id=$_POST['product_id'];
        $product_classify=$_POST['product_classify'];
        $product_name=$_POST['product_name'];
        $product_desp=$_POST['product_desp'];
        $product_position=$_POST['product_position'];
        $product_recommend=$_POST['product_recommend'];
        $recommend_position=$_POST['recommend_position'];
        $old_position=$_POST['old_position'];
        $old_recommend_position=$_POST['old_recommend_position'];
        if($product_recommend==0){
            $sql="select * from product where product_position='$product_position' and product_classify='$product_classify'";
        }else{
            $sql="select * from product where product_recommend='1'";
            $result=mysqli_num_rows($this->db->query($sql));
            if($result>=8&&$product_recommend==1){
                $array[]=[
                    "state"=>"fail",
                    "msg"=>"产品更新失败,超出最大推荐数(8个)，请移除部分推荐产品"
                ];
                echo json_encode($array);
                mysqli_close($this->db);
                exit();
            }
            $sql="select * from product where recommend_position='$recommend_position' and product_classify='$product_classify'";
        }
        $result=$this->db->query($sql);
        if($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $change_id = $num['product_id'];
            }
            if($product_recommend==0){
                $sql = "update product set product_position='$old_position' where product_id='$change_id'";
            }else{
                $sql = "update product set recommend_position='$old_recommend_position' where product_id='$change_id'";
            }
            $this->db->query($sql);
        }
        $sql="update product set product_classify='$product_classify', product_name='$product_name',product_desp='$product_desp',product_position='$product_position',product_recommend='$product_recommend',recommend_position='$recommend_position' where product_id='$product_id'";
        $result=$this->db->query($sql);
        if($result){
            $array[]=[
                "state"=>"success",
                "msg"=>"产品信息修改成功",
                "product_id"=>$product_id,
                "product_classify"=>$product_classify,
                "product_name"=>$product_name,
                "product_desp"=>$product_desp,
                "product_position"=>$product_position,
                "product_recommend"=>$product_recommend,
                "recommend_position"=>$recommend_position,
            ];
        }else{
            $array[]=[
                "state"=>"fail",
                "msg"=>"产品信息修改失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
    public function DeleteProduct(){
        $id=$_POST['id'];
        $image=$_POST['image'];
        $array=[];
        $sql="delete from product where product_id='$id'";
        $result=$this->db->query($sql);
        if($result){
            unlink($this->root.'/'.$image);
            $array[]=[
                "state"=>"success",
                "msg"=>"删除产品成功"
            ];
        }else{
            $array[]=[
                "state"=>"fail",
                "msg"=>"删除产品失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
}