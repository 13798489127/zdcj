<?php
//Banner控制器
include "ServerController.php";

class BannerController
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

    public function AddBanner()
    {
        $id = createGuid();
        $title = $_POST['banner_title'];
        $titles = $_POST['banner_titles'];
        $desp = $_POST['banner_desp'];
        $position = $_POST['banner_position'];
        $href = $_POST['banner_href'];
        $maxPosition = mysqli_fetch_assoc($this->db->query("SELECT banner_position FROM zdcj.banner order by banner_position desc;"))['banner_position'];
        if ($position) {
            $oldId = mysqli_fetch_assoc($this->db->query("SELECT banner_id FROM banner where  banner_position=" . $position . ";"))['banner_id'];
            if ($oldId) {
                $this->db->query("UPDATE `banner` SET `banner_position`='" . ($maxPosition + 1) . "' WHERE `banner_id`='" . $oldId . "';");
            }
        } else {
            $position = $maxPosition + 1;
        }
        $sql = "INSERT INTO `banner` (`banner_id`, `banner_title`, `banner_titles`, `banner_desp`, `banner_href`,`banner_position`) VALUES ('$id','$title','$titles','$desp','$href','$position');";
        $result = $this->db->query($sql);
        if ($result) {
            $array[] = [
                "state" => "success",
                "msg" => "添加Banner成功",
                "banner_id" => $id,
                "banner_position" => $position
            ];
        } else {
            $array[] = [
                "state" => "fail",
                "msg" => "添加Banner失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function DeleteBanner()
    {
        $id = $_POST['id'];
        $image = $_POST['img_path'];
        $sql = "delete from banner where banner_id='$id'";
        $result = $this->db->query($sql);
        if ($result) {
            unlink($this->root . '/' . $image);
            $array[] = [
                "state" => "success",
                "msg" => "删除Banner成功"
            ];
        } else {
            $array[] = [
                "state" => "fail",
                "msg" => "删除Banner失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function UpdateBanner()
    {
        $id = $_POST['banner_id'];
        $title = $_POST['banner_title'];
        $titles = $_POST['banner_titles'];
        $desp = $_POST['banner_desp'];
        $href = $_POST['banner_href'];
        $position = $_POST['banner_position'];
        $old_position = $_POST['old_position'];
        if ($position && $old_position != $position) {
            $nowId = mysqli_fetch_assoc($this->db->query("SELECT banner_id FROM banner where  banner_position=" . $position . ";"))['banner_id'];
            if ($nowId) {
                $this->db->query("UPDATE `banner` SET `banner_position`='" . $old_position . "' WHERE `banner_id`=" . $nowId . ";");
            }
        }
        $sql = "UPDATE `banner` SET  `banner_title`='$title', `banner_titles`='$titles', `banner_desp`='$desp', `banner_position`='$position', `banner_href`='$href' where `banner_id` = '$id';";
        $result = $this->db->query($sql);
        if ($result) {
            $array[] = [
                "state" => "success",
                "msg" => "更新Banner成功",
            ];
        } else {
            $array[] = [
                "state" => "fail",
                "msg" => "更新Banner失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

}
