<?php
include "ServerController.php";

class ServiceController
{
    public $db;

    public function __construct()
    {
        $this->db = $GLOBALS['db'];
    }

    public function AddService()
    {
        $id = createGuid();
        $name = $_POST['service_name'];
        $code = urldecode(urldecode($_POST['service_code']));
        $position = $_POST['service_position'];
        $maxPosition = mysqli_fetch_assoc($this->db->query("SELECT service_position FROM service order by service_position desc;"))['service_position'];
        if ($position) {
            $oldId = mysqli_fetch_assoc($this->db->query("SELECT service_id FROM service where  service_position=" . $position . ";"))['service_id'];
            if ($oldId) {
                $this->db->query("UPDATE `service_id` SET `service_position`='" . ($maxPosition + 1) . "' WHERE `service_id`='" . $oldId . "';");
            }
        } else {
            $position = $maxPosition + 1;
        }
        $sql = "insert into service (service_id,service_name,service_code,service_position) VALUES ('$id','$code','$name','$position')";
        $result = $this->db->query($sql);
        if ($result) {
            $array[] = [
                "state" => 'success',
                "msg" => '客服添加成功'
            ];
        } else {
            $array[] = [
                "state" => 'fail',
                "msg" => '客服添加失败'
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function UpdateService()
    {
        $id = $_POST['service_id'];
        $name = $_POST['service_name'];
        $code = $_POST['service_code'];
        $position = $_POST['service_position'];
        $old_position = $_POST['old_position'];
        if ($position) {
            $nowId = mysqli_fetch_assoc($this->db->query("SELECT service_id FROM service where  service_position=" . $position . ";"))['service_id'];
            if ($nowId) {
                if ($old_position) {
                    $this->db->query("UPDATE `service` SET `service_position`='" . $old_position . "' WHERE `service_id`=" . $nowId . ";");
                } else {
                    $maxPosition = mysqli_fetch_assoc($this->db->query("SELECT service_position FROM zdcj.service order by service_position desc;"))['service_position'];
                    $this->db->query("UPDATE `service` SET `service_position`='" . $maxPosition . "' WHERE `service_id`='" . $nowId . "';");
                }
            }
        }
        $sql = "update service set service_name='$name',service_code='$code',service_position='$position' where service_id='$id'";
        $result = $this->db->query($sql);
        if ($result) {
            $array[] = [
                "state" => 'success',
                "msg" => '客服修改成功'
            ];
        } else {
            $array[] = [
                "state" => 'fail',
                "msg" => '客服修改失败'
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function DeleteService()
    {
        $array = [];
        $id = $_POST['service_id'];
        $sql = "delete from service where service_id='$id'";
        $result = $this->db->query($sql);
        if ($result) {
            $array[] = [
                "state" => 'success',
                "msg" => '客服删除成功'
            ];
        } else {
            $array[] = [
                "state" => 'fail',
                "msg" => '客服删除失败'
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
}