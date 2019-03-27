<?php
//前端获取信息
$allow = 1;
include "ServerController.php";

class ApiController
{
    public $root;
    public $db;

    public function __construct()
    {
        $this->root = $GLOBALS['root'];
        $this->db = $GLOBALS['db'];
    }

    public function GetBanner()
    {
        $array = [];
        $sql = "select * from banner order by banner_position";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "banner_id" => $num['banner_id'],
                    "banner_title" => $num['banner_title'],
                    "banner_titles" => $num['banner_titles'],
                    "banner_desp" => $num['banner_desp'],
                    "banner_preview" => $num['banner_preview'],
                    "banner_position" => $num['banner_position'],
                    "banner_href" => $num['banner_href']
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetWebInfo()
    {
        $array = [];
        $sql = "select * from web_info";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "web_seodesp" => $num['web_seodesp'],
                    "web_titles" => $num['web_title'],
                    "web_seokey" => $num['web_seokey'],
                    "web_copyright" => $num['web_copyright'],
                    "web_logo" => $num['web_logo'],
                    "company_landline" => $num['company_landline'],
                    "company_phone" => $num['company_phone'],
                    "company_fax" => $num['company_fax'],
                    "company_email" => $num['company_email'],
                    "company_name" => $num['company_name'],
                    "company_address" => $num['company_address'],
                    "company_contact" => $num['company_contact'],
                    "company_web" => $num['company_web'],
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetContactInfo()
    {
        $array = [];
        $sql = "select * from web_info";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "电话: " . $num['company_landline'],
                    '手机: ' . $num['company_phone'],
                    '传真: ' . $num['company_fax'],
                    '邮箱: ' . $num['company_email'],
                    '公司: ' . $num['company_name'],
                    '地址: ' . $num['company_address'],
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetPublicInfo()
    {
        $array = [];
        $sql = "select web_title, web_seokey,web_seodesp,web_copyright from web_info";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "web_title" => $num['web_title'],
                    "web_seokey" => $num['web_seokey'],
                    "web_seodesp" => $num['web_seodesp'],
                    "web_copyright" => $num['web_copyright']
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetCommentProduct()
    {
        $array = [];
        $sql = "select * from product where product_recommend='1' order by recommend_position";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "product_id" => $num['product_id'],
                    "product_classify" => $num['product_classify'],
                    "product_name" => $num['product_name'],
                    "product_desp" => $num['product_desp'],
                    "product_prview" => $num['product_prview'],
                    "product_position" => $num['product_position'],
                    "product_recommend" => $num['product_recommend'],
                    "recommend_position" => $num['recommend_position'],
                    "create_time" => $num['create_time'],
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetProductType()
    {
        $array = [];
        $sql = "select * from product_classify order by classify_position";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "classify_name" => $num['classify_name'],
                    "classify_id" => $num['classify_id'],
                    "classify_position" => $num['classify_position']
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetProductByType()
    {
        $array = [];
        $type = $_POST['type'];
        $pageNum = $_POST['page'];
        $size = $_POST['size'];
        $allCount = 0;
        $page = ($pageNum - 1) * $size;
        $sql = "select * from product where product_classify='$type' order by product_position";
        $allCount = mysqli_num_rows($this->db->query($sql));
        $sql = "select * from product where product_classify='$type' order by product_position limit $page,$size;";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "product_id" => $num['product_id'],
                    "product_classify" => $num['product_classify'],
                    "product_name" => $num['product_name'],
                    "product_desp" => $num['product_desp'],
                    "product_prview" => $num['product_prview'],
                    "product_position" => $num['product_position'],
                    "product_recommend" => $num['product_recommend'],
                    "recommend_position" => $num['recommend_position'],
                    "create_time" => $num['create_time'],
                    "all_count" => $allCount,
                    "page_num" => $pageNum
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetProductDetail()
    {
        $id = $_POST['id'];
        $sql = "select * from product where product_id='$id'";
        $result = $this->db->query($sql);
        $array = null;
        if ($result) {
            $num = mysqli_fetch_assoc($result);
            $newCount = $num['brower_count'] + 1;
            $product_id = $num['product_id'];
            $this->db->query("UPDATE `product` SET  `brower_count`=$newCount where `product_id` ='$product_id';");
            $array = [
                "product_id" => $num['product_id'],
                "product_classify" => $num['product_classify'],
                "product_name" => $num['product_name'],
                "product_desp" => $num['product_desp'],
                "product_prview" => $num['product_prview'],
                "product_position" => $num['product_position'],
                "product_recommend" => $num['product_recommend'],
                "recommend_position" => $num['recommend_position'],
                "create_time" => $num['create_time'],
                "brower_count" => $newCount
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetProductByPos()
    {
        $type = $_POST['type'];
        $state = $_POST['state'];
        $position = $_POST['position'];
        $size = $state > 0 ? '>' : '<';
        $desc = $state > 0 ? 'ASC' : 'DESC';
        $sql = "SELECT * from product where product_classify='$type' AND product_position $size $position order by product_position $desc LIMIT 0, 1";
        $result = $this->db->query($sql);
        $array = null;
        if ($result) {
            $num = mysqli_fetch_assoc($result);
            $product_id = $num['product_id'];
            if($product_id){
                $newCount = $num['brower_count'] + 1;
                $this->db->query("UPDATE `product` SET  `brower_count`=$newCount where `product_id` ='$product_id';");
                $array = [
                    "product_id" => $num['product_id'],
                    "product_classify" => $num['product_classify'],
                    "product_name" => $num['product_name'],
                    "product_desp" => $num['product_desp'],
                    "product_prview" => $num['product_prview'],
                    "product_position" => $num['product_position'],
                    "product_recommend" => $num['product_recommend'],
                    "recommend_position" => $num['recommend_position'],
                    "create_time" => $num['create_time'],
                    "brower_count" => $newCount
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetNewsType()
    {
        $array = [];
        $sql = "select * from news_classify order by classify_position";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "classify_name" => $num['classify_name'],
                    "classify_id" => $num['classify_id'],
                    "classify_position" => $num['classify_position']
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetIndexNews()
    {
        $array = [];
        $sql = "select A.*,B.* from news as A,news_classify as B where EXISTS (select A.* from news where B.classify_id=A.classify_id ) group by B.classify_id order by create_time limit 0,3";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "news_id" => $num['news_id'],
                    "classify_name" => $num['classify_name'],
                    "news_title" => $num['news_title'],
                    "news_content" => $num['news_content'],
                    "create_time" => substr($num['create_time'], 0, 10)
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetNewsByType()
    {
        $array = [];
        $type = $_POST['type'];
        $pageNum = $_POST['page'];
        $size = $_POST['size'];
        $allCount = 0;
        $page = ($pageNum - 1) * $size;
        $sql = "select * from news where classify_id='$type' order by news_position";
        $allCount = mysqli_num_rows($this->db->query($sql));
        $sql = "select * from news where classify_id='$type' order by news_position limit $page,$size;";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $content =mb_substr($num['news_content'],0,50,'utf8').'...';
                $array[] = [
                    "news_id" => $num['news_id'],
                    "classify_id" => $num['classify_id'],
                    "news_title" => $num['news_title'],
                    "create_time" => $num['create_time'],
                    "news_position"=>$num['news_position'],
                    "news_content" =>$content,
                    "all_count" => $allCount,
                    "page_num" => $pageNum
                ];
            }
        }
        echo  json_encode($array,true);
        mysqli_close($this->db);
    }

    public function GetNewsDetail()
    {
        $id = $_POST['id'];
        $sql = "select * from news where news_id='$id'";
        $result = $this->db->query($sql);
        $array = null;
        if ($result) {
            $num = mysqli_fetch_assoc($result);
            $newCount = $num['brower_count'] + 1;
            $product_id = $num['news_id'];
            $this->db->query("UPDATE `news` SET  `brower_count`=$newCount where `news_id` ='$product_id';");
            $array = [
                "news_id" => $num['news_id'],
                "classify_id" => $num['classify_id'],
                "news_title" => $num['news_title'],
                "news_content" => $num['news_content'],
                "news_position" => $num['news_position'],
                "create_time" => $num['create_time'],
                "brower_count" => $newCount
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetNewsByPos()
    {
        $type = $_POST['type'];
        $state = $_POST['state'];
        $position = $_POST['position'];
        $size = $state > 0 ? '>' : '<';
        $desc = $state > 0 ? 'ASC' : 'DESC';
        $sql = "SELECT * from news where classify_id='$type' AND news_position $size $position order by news_position $desc LIMIT 0, 1";
        $result = $this->db->query($sql);
        $array = null;
        if ($result) {
            $num = mysqli_fetch_assoc($result);
            $product_id = $num['news_id'];
            if($product_id){
                $newCount = $num['brower_count'] + 1;
                $this->db->query("UPDATE `news` SET  `brower_count`=$newCount where `news_id` ='$product_id';");
                $array = [
                    "news_id" => $num['news_id'],
                    "classify_id" => $num['classify_id'],
                    "news_title" => $num['news_title'],
                    "news_content" => $num['news_content'],
                    "news_position" => $num['news_position'],
                    "create_time" => $num['create_time'],
                    "brower_count" => $newCount
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetIndexCase()
    {
        $array = [];
        $sql = "select * from success_case order by create_time";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "case_id" => $num['case_id'],
                    "case_name" => $num['case_name'],
                    "case_preview" => $num['case_preview'],
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetCase()
    {
        $array = [];
        $pageNum = $_POST['page'];
        $size = $_POST['size'];
        $allCount = 0;
        $page = ($pageNum - 1) * $size;
        $sql = "select * from success_case";
        $allCount = mysqli_num_rows($this->db->query($sql));
        $sql = "select * from success_case order by create_time limit $page,$size;";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "case_id" => $num['case_id'],
                    "case_name" => $num['case_name'],
                    "case_preview" => $num['case_preview'],
                    "all_count" => $allCount
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetService()
    {
        $array = [];
        $sql = "select * from service order by service_position";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "service_id" => $num['service_id'],
                    "service_name" => $num['service_name'],
                    "service_code" => $num['service_code'],
                    "service_position" => $num['service_position']
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetLink()
    {
        $array = [];
        $sql = "select * from friend_link ";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "link_id" => $num['link_id'],
                    "link_name" => $num['link_name'],
                    "link_href" => $num['link_href']
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetCompany()
    {
        $array = [];
        $result = $this->db->query("SELECT * FROM company order by company_position;");
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "company_title" => $num['company_title'],
                    "company_position" => $num['company_position'],
                    "company_id" => $num['company_id']
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetCompanyAll()
    {
        $array = [];
        $result = $this->db->query("SELECT * FROM company order by company_position;");
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "company_title" => $num['company_title'],
                    "company_content" => $num['company_content'],
                    "company_position" => $num['company_position'],
                    "company_id" => $num['company_id']
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function GetRecruit()
    {
        $result = $this->db->query("SELECT * FROM recruit");
        echo json_encode(mysqli_fetch_assoc($result));
        mysqli_close($this->db);
    }

    public function GetFeedBack()
    {
        $array = [];
        $pageNum = $_POST['page'];
        $size = $_POST['size'];
        $allCount = 0;
        $page = ($pageNum - 1) * $size;
        $sql = "select * from feed_back";
        $allCount = mysqli_num_rows($this->db->query($sql));
        $sql = "select * from feed_back order by create_time limit $page,$size;";
        $result = $this->db->query($sql);
        if ($result) {
            while ($num = mysqli_fetch_assoc($result)) {
                $array[] = [
                    "feedback_id" => $num['feedback_id'],
                    "feedback_name" => $num['feedback_name'],
                    "feedback_contact" => $num['feedback_contact'],
                    "feedback_message" => $num['feedback_message'],
                    "all_count" => $allCount
                ];
            }
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }

    public function FeedBack()
    {
        $name = $_POST['name'];
        $contact = $_POST['contact'];
        $content = $_POST['content'];
        $id = createGuid();
        $sql = "insert into feed_back (feedback_id,feedback_name,feedback_contact,feedback_message) values ('$id','$name','$contact','$content')";
        $result = $this->db->query($sql);
        if ($result) {
            $array[] = [
                "state" => "success",
                "msg" => "信息提交成功"
            ];
        } else {
            $array[] = [
                "state" => "fail",
                "msg" => "信息提交失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
}