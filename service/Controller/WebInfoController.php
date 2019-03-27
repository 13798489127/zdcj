<?php
//网页信息控制器
include "ServerController.php";

class WebInfoController
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
    public function EditWebInfo(){
        function GenerateHTML($data,$addr){;
            $url=dirname(dirname(__FILE__)).'/templates';
            $fileName=[
                "about.html","contact.html","detail.html","index.html","news.html","product.html","recruit.html","recruit_temp.html","case.html"
            ];
            $length=count($fileName);
            $title=$data['web_titles'];
            $keywords=$data['web_seokey'];
            $description=$data['web_name'];
            $footer=$data['web_copyright'];
            $landline='电话:'.$data['company_landline'];
            $phone='手机:'.$data['company_phone'];
            $fax='传真'.$data['company_fax'];
            $email='邮箱:'.$data['company_email'];
            $company='公司:'.$data['company_name'];
            $address='地址:'.$data['company_address'];
            for($i=0;$i<$length;$i++){
                $FP = fopen($url.'/'.$fileName[$i],"r");
                $Str = fread($FP,filesize($url.'/'.$fileName[$i]));
                $Str=preg_replace('#<!--[^\!\[]*?(?<!\/\/)-->#' , '' , $Str);
                $Str = str_replace("{title}",$title, $Str);
                $Str = str_replace("{keywords}", $keywords, $Str);
                $Str = str_replace("{description}", $description, $Str);
                $Str = str_replace("{footer}", $footer,$Str);
                $Str = str_replace("{landline}", $landline,$Str);
                $Str = str_replace("{phone}", $phone,$Str);
                $Str = str_replace("{fax}", $fax,$Str);
                $Str = str_replace("{email}", $email,$Str);
                $Str = str_replace("{company}", $company,$Str);
                $Str = str_replace("{address}", $address,$Str);
                fclose($FP);
                $Handle = fopen($addr.'/'.$fileName[$i],"w");
                fwrite($Handle,$Str);
                fclose($Handle);
            }
        }
        $web_seodesp=$_POST['web_seodesp'];
        $web_titles=$_POST['web_titles'];
        $web_seokey=$_POST['web_seokey'];
        $web_copyright=$_POST['web_copyright'];
        $company_landline=$_POST['company_landline'];
        $company_phone=$_POST['company_phone'];
        $company_fax=$_POST['company_fax'];
        $company_email=$_POST['company_email'];
        $company_name=$_POST['company_name'];
        $company_address=$_POST['company_address'];
        $company_contact=$_POST['company_contact'];
        $company_web=$_POST['company_web'];
        $sql="update web_info set web_seodesp='$web_seodesp' , web_title='$web_titles' , web_seokey='$web_seokey' , web_copyright='$web_copyright' ,company_landline='$company_landline' , company_phone='$company_phone', company_fax='$company_fax', company_email='$company_email',company_name='$company_name',company_address='$company_address',company_contact='$company_contact',company_web='$company_web'";
        $res = $this->db->query($sql);
        if($res){
            $array[]=[
                "state"=>"success",
                "msg"=>"网站信息更新成功,请更新招聘信息",
                "web_name"=>$web_seodesp,
                "web_titles"=>$web_titles,
                "web_seokey"=>$web_seokey,
                "web_copyright"=>$web_copyright,
                "company_landline"=>$company_landline,
                "company_phone"=>$company_phone,
                "company_fax"=>$company_fax,
                "company_email"=>$company_email,
                "company_name"=>$company_name,
                "company_address"=>$company_address,
                "company_contact"=>$company_contact,
                "company_web"=>$company_web,
            ];
            GenerateHTML($array[0],$this->root);
        }else{
            $array[]=[
                "state"=>"fail",
                "msg"=>"网站信息更新失败"
            ];
        }
        echo json_encode($array);
        mysqli_close($this->db);
    }
}