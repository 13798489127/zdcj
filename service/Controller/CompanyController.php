<?php
//Banner控制器
include "ServerController.php";

class CompanyController
{
    public $root;
    public $db;

    public function __construct()
    {
        $this->root = $GLOBALS['root'];
        $this->db = $GLOBALS['db'];
    }

    public function GetCompanyContent()
    {
        $id = $_POST['company_id'];
        $result = $this->db->query("SELECT company_content FROM company where company_id='" . $id . "';");
        if ($result) {
            $array[] = [
                "state" => "success",
                "company_content" => mysqli_fetch_assoc($result)['company_content']
            ];
        } else {
            $array[] = [
                "state" => "fail",
                "company_content" => "查无内容"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function AddCompany()
    {
        $id = createGuid();
        $title = $_POST['company_title'];
        $maxPosition = mysqli_fetch_assoc($this->db->query("SELECT company_position FROM company order by company_position desc;"))['company_position'];
        $maxPosition++;
        $sql = "INSERT INTO `company` (`company_id`, `company_title`, `company_position`) VALUES ('$id','$title','$maxPosition');";
        $result = $this->db->query($sql);
        if ($result) {
            mkdir($this->root . "/public/img/companyInfo/" . $id);
            $array[] = [
                "state" => "success",
                "msg" => "添加公司信息成功",
                "company_id" => $id,
                "company_position" => $maxPosition
            ];
        } else {
            $array[] = [
                "state" => "fail",
                "msg" => "添加公司信息失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function DeleteCompany()
    {
        $id = $_POST['company_id'];
        $sql = "delete from company where company_id='$id';";
        $result = $this->db->query($sql);
        $array = [];
        if ($result) {
            removeDir($this->root . "/public/img/companyInfo/" . $id);
            $array[] = [
                "state" => "success",
                "msg" => "删除公司信息成功"
            ];
        } else {
            $array[] = [
                "state" => "fail",
                "msg" => "删除公司信息失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function UpdateCompany()
    {
        $id = $_POST['company_id'];
        $title = $_POST['company_title'];
        $content = $_POST['company_content'];
        $sql = "UPDATE `company` SET  `company_title`='$title', `company_content`='$content' where `company_id` = '$id';";
        $result = $this->db->query($sql);
        $array = [];
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

    public function UpdateCompanyPosition()
    {
        $id = $_POST['company_id'];
        $new_position = $_POST['new_position'];
        $old_position = $_POST['old_position'];
        $nowId = mysqli_fetch_assoc($this->db->query("SELECT company_id FROM company where  company_position=" . $new_position . ";"))['company_id'];
        if ($nowId) {
            $this->db->query("UPDATE `company` SET `company_position`='" . $old_position . "' WHERE `company_id`=" . $nowId . ";");
        }
        $result = $this->db->query("UPDATE `company` SET `company_position`='" . $new_position . "' WHERE `company_id`=" . $id . ";");
        if ($result) {
            $array[] = [
                "state" => "success",
                "msg" => "更新排序成功",
            ];
        } else {
            $array[] = [
                "state" => "fail",
                "msg" => "更新排序失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
}