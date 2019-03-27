<?php
//新闻控制器
include "ServerController.php";

class NewsController
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

    public function AddNews()
    {
        $classify_id = $_POST['classify_id'];
        $news_title = $_POST['news_title'];
        $news_content = $_POST['news_content'];
        $news_position = $_POST['news_position'];
        $sql = "select * from news where news_title='$news_title'";
        $result = mysqli_num_rows($this->db->query($sql));
        if ($result) {
            $array[] = [
                "state" => "fail",
                "msg" => $news_title . "新闻已存在,请更换新闻名称",
            ];
            echo json_encode($array);
            mysqli_close($this->db);
            exit();
        }
        if ($news_position) {
        } else {
            $sql = "select * from news where classify_id='$classify_id'";
            $news_position = mysqli_num_rows($this->db->query($sql)) + 1;
        }
        $news_id = createGuid();
        $sql = "insert into news (news_id,classify_id,news_title,news_content,news_position) values('$news_id','$classify_id','$news_title','$news_content','$news_position')";
        $result = $this->db->query($sql);
        if ($result) {
            $array[] = [
                "news_id" => $news_id,
                "classify_id" => $classify_id,
                "news_title" => $news_title,
                "news_content" => $news_content,
                "brower_count" => 0,
                "news_position" => $news_position,
                "state" => "success",
                "msg" => "新闻添加成功",
            ];
        } else {
            $array[] = [
                "state" => "fail",
                "msg" => "新闻添加失败",
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function EditNews()
    {
        $array = [];
        $id = $_POST['news_id'];
        $classify_id = $_POST['classify_id'];
        $news_title = $_POST['news_title'];
        $news_content = $_POST['news_content'];
        $news_position = $_POST['news_position'];
        $old_news_position = $_POST['old_news_position'];
        $sql = "select * from news where news_title='$news_title'";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $change_id = $num['news_id'];
                $change_name = $num['news_title'];
            }
            if ($change_name == $news_title && $id != $change_id) {
                $array[] = [
                    "state" => 'fail',
                    "msg" => $change_name . '已经存在，请修改新闻标题'
                ];
                echo json_encode($array);
                mysqli_close($this->db);
                exit();
            }
        }
        $sql = "select * from news where news_position='$news_position'";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $change_id = $num['news_id'];
            }
            $sql1 = "update news set news_position='$old_news_position' where news_id='$change_id'";
            $this->db->query($sql1);
        }
        $sql1 = "update news set news_title='$news_title',news_content='$news_content',classify_id='$classify_id',news_position='$news_position' where news_id='$id'";
        $result = $this->db->query($sql1);
        if ($result) {
            $array[] = [
                "state" => 'success',
                "msg" => '新闻修改成功',
            ];
        } else {
            $array[] = [
                "state" => 'fail',
                "msg" => '新闻修改失败'
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function DeleteNews()
    {
        $id = $_POST['id'];
        $image = $_POST['image'];
        $array = [];
        $sql = "delete from news where news_id='$id'";
        $result = $this->db->query($sql);
        if ($result) {
            unlink($this->root . '/' . $image);
            $array[] = [
                "state" => "success",
                "msg" => "删除新闻成功"
            ];
        } else {
            $array[] = [
                "state" => "fail",
                "msg" => "删除新闻失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
}