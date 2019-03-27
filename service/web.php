<?php
return[
    //(:num)表示匹配任何数字,(:any)表示任意字符
    /*默认路由*/
    '_DEFAULT_' => 'IndexController@index',
    /*用户路由操作*/
    "login"=>"UserController@login",
    'logout'=>'UserController@logout',
    "verifyCode"=>"UserController@verifyCode",
    'register'=>'PublicController@register',
    'updateUser'=>'PublicController@updateUser',
    "DeleteUser"=>"PublicController@DeleteUser",
    "GetUser"=>"PublicController@GetUser",
    /*产品类型操作*/
    "AddProductClassify"=>"ProductTypeController@AddProductClassify",
    "EditProductClassify"=>"ProductTypeController@EditProductClassify",
    "DeleteProductClassify"=>"ProductTypeController@DeleteProductClassify",
    /*产品操作接口*/
    "AddProduct"=>"ProductController@AddProduct",
    "EditProduct"=>"ProductController@EditProduct",
    "EditCommend"=>"ProductController@EditCommend",
    "DeleteProduct"=>"ProductController@DeleteProduct",
    /*新闻类型操作*/
    "AddNewsClassify"=>"NewsTypeController@AddNewsClassify",
    "EditNewsClassify"=>"NewsTypeController@EditNewsClassify",
    "DeleteNewsClassify"=>"NewsTypeController@DeleteNewsClassify",
    /*新闻操作*/
    "AddNews"=>"NewsController@AddNews",
    "EditNews"=>"NewsController@EditNews",
    "DeleteNews"=>"NewsController@DeleteNews",
    /*案例操作*/
    "AddCase"=>"CaseController@AddCase",
    "EditCase"=>"CaseController@EditCase",
    "DeleteCase"=>"CaseController@DeleteCase",
    /*客服操作*/
    "AddService"=>"ServiceController@AddService",
    "UpdateService"=>"ServiceController@UpdateService",
    "DeleteService"=>"ServiceController@DeleteService",
    /*友情链接操作*/
    "AddLink"=>"LinkController@AddLink",
    "EditLink"=>"LinkController@EditLink",
    "DeleteLink"=>"LinkController@DeleteLink",
    /*网站信息操作*/
    "EditWebInfo"=>"WebInfoController@EditWebInfo",
    /*公司信息管理*/
    "GetCompanyContent" => "CompanyController@GetCompanyContent",
    "AddCompany" => "CompanyController@AddCompany",
    "DeleteCompany" => "CompanyController@DeleteCompany",
    "UpdateCompany" => "CompanyController@UpdateCompany",
    "UpdateCompanyPosition" => "CompanyController@UpdateCompanyPosition",
    /*Banner管理*/
    "AddBanner"=>"BannerController@AddBanner",
    "DeleteBanner" => "BannerController@DeleteBanner",
    "UpdateBanner" => "BannerController@UpdateBanner",
    /*反馈管理*/
    "DeleteFeedBack"=>"FeedBackController@DeleteFeedBack",
    /*统一接口*/
    "check"=>"PublicController@check",
    "UploadFile"=>"PublicController@UploadFile",
    /*招聘信息*/
    "UpdateRecruit" => "RecruitController@UpdateRecruit",
    /*api*/
    "GetBanner"=>"ApiController@GetBanner",//获取Banner
    "GetWebInfo"=>"ApiController@GetWebInfo",//获取网站信息
    "GetContactInfo"=>"ApiController@GetContactInfo",//获取网站联系信息
    "GetPublicInfo"=>"ApiController@GetPublicInfo",//获取网站基本信息
    "GetProductType"=>"ApiController@GetProductType",//获取所有产品类型
    "GetCommentProduct"=>"ApiController@GetCommentProduct",//获取首页推荐产品
    "GetProductByType"=>"ApiController@GetProductByType",//根据分类获取产品
    "GetProductDetail" => "ApiController@GetProductDetail",//根据id获取分类详情
    "GetProductByPos"=>"ApiController@GetProductByPos",//根据位置获取前后产品
    "GetNewsDetail"=>"ApiController@GetNewsDetail",//获取新闻详情
    "GetNewsByPos"=>"ApiController@GetNewsByPos",//根据位置获取新闻
    "GetIndexNews"=>"ApiController@GetIndexNews",//获取所有新闻类型
    "GetNewsType"=>"ApiController@GetNewsType",//获取所有新闻类型
    "GetNewsByType"=>"ApiController@GetNewsByType",//根据分类获取新闻
    "GetIndexCase"=>"ApiController@GetIndexCase",//获取首页成功案例
    "GetCase"=>"ApiController@GetCase",//获取成功案例
    "GetService"=>"ApiController@GetService",//获取客服信息
    "GetLink"=>"ApiController@GetLink",//获取友情链接
    "GetCompany" => "ApiController@GetCompany",//获取公司信息
    "GetCompanyAll" => "ApiController@GetCompanyAll",//前台获取公司信息
    "GetRecruit" => "ApiController@GetRecruit",//获取招聘信息
    "GetFeedBack"=>"ApiController@GetFeedBack",//获取反馈信息
    "FeedBack"=>"ApiController@FeedBack",//反馈信息
];