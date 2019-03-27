/*
 Navicat Premium Data Transfer

 Source Server         : 10.3.16.55
 Source Server Type    : MySQL
 Source Server Version : 100130
 Source Host           : 10.3.16.55:3306
 Source Schema         : zdcj

 Target Server Type    : MySQL
 Target Server Version : 100130
 File Encoding         : 65001

 Date: 04/06/2018 09:30:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user`  (
  `userid` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '唯一用户id',
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户邮箱',
  `register_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `login_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录验证id',
  `login_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作认证',
  `login_time` datetime(0) NOT NULL COMMENT '登录时间',
  PRIMARY KEY (`userid`, `login_time`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES ('1E37CCEE-3AFE-D890-53F6-738E1BA37DA7', 'admin', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '', '2018-04-01 16:04:10', '0scsn025tqlk89gnkcism5q601', '1fwv5cbmpzyhu46na0jo', '2018-06-03 20:59:46');
INSERT INTO `admin_user` VALUES ('C80D3BD4-1660-B86E-9847-197A0137337A', 'admin2', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '', '2018-05-02 10:52:39', '40qqh7us08genphlv2kg0sdlj6', '05xnsl7thzoiewb1yf8g', '2018-05-16 09:43:15');
INSERT INTO `admin_user` VALUES ('D7E978AC-D68A-48A6-91BE-C7F302FB3D1A', 'admin1', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '', '2018-04-26 16:35:33', 'ijk6nsnrk50gbtovmn8mgr6ooq', 'qn6a53jcb2pto4kdfw8g', '2018-06-04 08:20:07');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `banner_id` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'bannerid',
  `banner_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'banner标题',
  `banner_titles` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'banner小标题',
  `banner_desp` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'banner描述',
  `banner_preview` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'banner图片',
  `banner_href` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT 'banner超链接地址',
  `banner_position` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`banner_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('57ED17B1-32A9-8C33-7565-12A44F0A892E', '深圳市正东厨房设备有限公司', '健康生活，从厨房设备开始', '深圳厨房设备，深圳厨房改造，深圳厨房设计，深圳厨房工厂，厨房设备，深圳不锈钢厨具，厨房工程，深圳厨房工程', 'public/img/banner/57ED17B1-32A9-8C33-7565-12A44F0A892E.png', 'http://localhost:100/case.html', 4);
INSERT INTO `banner` VALUES ('74CDA982-D9BD-C87D-AF5F-36201F06DCA5', '深圳市正东厨房设备有限公司', '健康生活，从厨房设备开始', '深圳厨房设备，深圳厨房改造，深圳厨房设计，深圳厨房工厂，厨房设备，深圳不锈钢厨具，厨房工程，深圳厨房工程', 'public/img/banner/74CDA982-D9BD-C87D-AF5F-36201F06DCA5.png', 'http://localhost:100/about.html', 2);
INSERT INTO `banner` VALUES ('84B47DD7-A55A-F9FB-C148-AAB4660FED0D', '深圳市正东厨房设备有限公司', '健康生活，从厨房设备开始', '深圳厨房设备，深圳厨房改造，深圳厨房设计，深圳厨房工厂，厨房设备，深圳不锈钢厨具，厨房工程，深圳厨房工程', 'public/img/banner/84B47DD7-A55A-F9FB-C148-AAB4660FED0D.png', 'http://localhost:100/product.html?type=0CCB8600-5A7D-2CBD-523C-2D1D9001CAD1', 3);

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company`  (
  `company_id` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `company_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `company_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `company_position` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`company_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES ('E06C6A90-53EA-A6D8-8EF0-7EE1ACD83D42', '企业简介', '<p>	<span style=\"color: rgb(61, 61, 61); background-color: rgb(255, 255, 255);\">深圳市正东厨房设备有限公司是一家集研究、设计、制造、安装、销售于一体的专专业生产厨房设备连锁企业。专业从事宾馆,酒店,酒楼,员工食堂，学校等中西餐厅厨房工程, 整个抽气、通风系统工程，油烟净化处理等项目，是大中型酒店、工厂、学校、医院、社会团体、企事业单位的厨房设备工程策划、设计、制造、安装、维护及酒店、餐饮用品配送的最佳选择。 正东具有雄厚的研究发明能力、先进的生产设备、科学的管理体制。 多年来，公司以高科技、实用性的产品、良好的信誉、品牌形象以及节能实用良好口号，公司产品已畅销全国，部分产品远销东南亚及欧美地区，赢得了广大用户的支持和推崇成为餐饮界新置和更新换代的首选。 公司目前最节能、高效、实用、实惠、自动点火的环保、高质厨房设备公司，解决了传统鼓风机燃气、燃油灶的污染大、浪费大、成本大、易损维修多、不安全及操作困难的一切弊端。能比传统鼓风灶节省：燃料费20%-60%，省电100%，省水100%（免淋水）。因其显著的节能和简便为厨师减轻劳动强度，改善工作环境提高工作质效；为酒店老板提高利润率和竞争力；为工厂、部队、学校、机关食堂提高伙食标准。 正东一贯秉承站在您的位置为您着想、锲而不舍、开拓创新、勇攀高峰、独占鳌头的宗旨。与您共赢，您的不断发展就是我们所期盼的。</span><img src=\"http://localhost:100/public/img/companyInfo/E06C6A90-53EA-A6D8-8EF0-7EE1ACD83D42/F6AFFCF8-EC1C-D34D-2A14-62A24DCF19AF.png\"></p>', 1);
INSERT INTO `company` VALUES ('E2F323D7-9CEB-A1A7-FF14-3A4ECB1D653B', '擅长领域', '<p><img src=\"http://localhost:100/public/img/companyInfo/E2F323D7-9CEB-A1A7-FF14-3A4ECB1D653B/5907CF04-C530-0A2C-707B-185F18E5E0D3.jpg\"></p>', 2);
INSERT INTO `company` VALUES ('EAC6ABF6-7383-C3E6-6030-024819B167F7', '企业文化', '<p>	<span style=\"color: rgb(61, 61, 61); background-color: rgb(255, 255, 255);\">企业宗旨：以人为本、以德为主、以诚为先。 企业理念：以客户为中心、以市场为向导、以技术为主体、以管理促效益、以质量求生存、以诚信求发展。 企业精神：求真务实、团结协作。 经营方针：专业人做专业事。 服务理念：至真、至诚、至信、至优，始终如一。 合作理念：平等互利、共享三赢。 竞争理念：不求最全、但求最专。 市场理念： 有品质，才有市场；有改善，才有进步。 经营口号： 员工满意是我们永恒的目标!</span></p>', 3);

-- ----------------------------
-- Table structure for feed_back
-- ----------------------------
DROP TABLE IF EXISTS `feed_back`;
CREATE TABLE `feed_back`  (
  `feedback_id` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `feedback_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `feedback_contact` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `feedback_message` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedback_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for friend_link
-- ----------------------------
DROP TABLE IF EXISTS `friend_link`;
CREATE TABLE `friend_link`  (
  `link_id` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `link_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `link_href` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`link_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `news_id` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '新闻id',
  `classify_id` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '新闻分类id',
  `news_title` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '新闻名称',
  `news_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '新闻内容',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `brower_count` int(11) NOT NULL DEFAULT 0 COMMENT '浏览次数',
  `news_position` int(11) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('A2F908CC-60D2-77AD-44AE-D1620FD8318C', '厨房的设计应以流程合理，方便实用，节省劳动，改善厨师工作环境为原则，不必追求设备多多益善。厨房设备多而没用，不', '商用厨房设计理念及要素', '565C558B-724F-4879-70E7-49326B79EB3F', '2018-05-03 13:44:13', 25, 1);
INSERT INTO `news` VALUES ('C8931C25-C376-C991-A555-927C24E6E713', '565C558B-724F-4879-70E7-49326B79EB3F', '商用厨房设计', '<p>厨房的设计应以流程合理，方便实用，节省劳动，改善厨师工作环境为原则，不必追求设备多多益善。厨房设备多而没用，不仅造成投资增大，而且占用场地空间，厨房生产操作施展不开，增加不安全性，更没有必要一味追求气派漂亮，造型花哨......</p>', '2018-05-04 11:24:35', 3, 1);
INSERT INTO `news` VALUES ('5CFBD051-729A-3FC0-5BF8-5AF8C4284F54', '565C558B-724F-4879-70E7-49326B79EB3F', '商用厨房', '<p>商用厨房设计理念及要素aaa</p>', '2018-05-04 11:24:40', 3, 2);
INSERT INTO `news` VALUES ('02B442FD-1DEE-EA89-F333-20064317D8AC', '565C558B-724F-4879-70E7-49326B79EB3F', '厨房设计理念及要素', '厨房的设计应以流程合理，方便实用，节省劳动，改善厨师工作环境为原则，不必追求设备多多益善。厨房设备多而没用，不仅造成投资增大，而且占用场地空间，厨房生产操作施展不开，增加不安全性，更没有必要一味追求气派漂亮，造型花哨......', '2018-05-04 11:24:44', 6, 3);
INSERT INTO `news` VALUES ('7077B3EE-93BD-6969-E947-841CBEF3ACF2', '565C558B-724F-4879-70E7-49326B79EB3F', '商用电磁炉与传统明火锅炉的区别', '<p>绿环保保： 无燃烧废气排放、不消耗氧气、无噪音、无污染、省能源。\n　　安全可靠： 无明火燃烧、无废气...</p>', '2018-05-04 11:24:49', 7, 0);
INSERT INTO `news` VALUES ('418CBEC5-601B-E37B-7471-0D245F2D7F68', '565C558B-724F-4879-70E7-49326B79EB3F', 'AS', '<p>AS</p>', '2018-05-04 11:24:53', 2, 5);
INSERT INTO `news` VALUES ('5E3B98C0-C1CC-86E7-8501-FF203F6521F6', '7B04DC6E-ECC2-A7EA-A6D7-EC72FD8BEDDE', '正东厨具', '正东厨具正东厨具正东厨具正东厨具正东厨具', '2018-05-07 09:10:05', 4, 0);
INSERT INTO `news` VALUES ('F16EE3BD-6ED8-92F5-8470-99D1A87E9594', '06414386-A0F9-5170-A142-CD6089873901', 'news_contentnews_contentnews_content', 'news_contentnews_contentnews_contentnews_contentnews_contentnews_contentnews_contentnews_contentnews_contentnews_contentnews_contentnews_contentnews_contentnews_contentnews_contentnews_contentnews_contentnews_contentnews_contentnews_content', '2018-05-07 09:10:45', 5, 0);
INSERT INTO `news` VALUES ('67164902-B286-D735-9039-6D7BF3CA2A0C', '', '21223', '1', '2018-06-03 20:38:58', 0, 68810);

-- ----------------------------
-- Table structure for news_classify
-- ----------------------------
DROP TABLE IF EXISTS `news_classify`;
CREATE TABLE `news_classify`  (
  `classify_id` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类id',
  `classify_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类名称',
  `classify_position` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`classify_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of news_classify
-- ----------------------------
INSERT INTO `news_classify` VALUES ('06414386-A0F9-5170-A142-CD6089873901', '企业动态', 2);
INSERT INTO `news_classify` VALUES ('4A62F8D4-96BC-3C10-B020-15DFED781625', '食堂承包', 4);
INSERT INTO `news_classify` VALUES ('565C558B-724F-4879-70E7-49326B79EB3F', '厨房设计', 0);
INSERT INTO `news_classify` VALUES ('68810C5C-0CF9-92B9-962F-B83D61C8B2C2', '企业新闻', 3);
INSERT INTO `news_classify` VALUES ('6940B716-6D37-98DF-5F0C-F2054A2C4FB8', '厨具维护', 5);
INSERT INTO `news_classify` VALUES ('7B04DC6E-ECC2-A7EA-A6D7-EC72FD8BEDDE', '厨房管理', 1);
INSERT INTO `news_classify` VALUES ('F211B6EA-6477-ABA1-FE72-4F824E5FA76F', '厨房装修', 6);

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `product_id` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '产品id',
  `product_classify` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类id',
  `product_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '产品名称',
  `product_desp` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '产品描述',
  `product_prview` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '产品图片',
  `product_position` int(11) NULL DEFAULT NULL COMMENT '产品位置',
  `product_recommend` int(2) NULL DEFAULT 0 COMMENT '产品是否首页推荐0不推荐1推荐',
  `recommend_position` int(11) NULL DEFAULT NULL,
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '产品创建时间',
  `brower_count` int(11) NULL DEFAULT 0 COMMENT '浏览次数',
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('00AC2318-E2F8-EF20-C9BC-ADFE93840E04', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '和面机', '无', 'public/img/product/00AC2318-E2F8-EF20-C9BC-ADFE93840E04.jpg', 16, 0, 16, '2018-05-04 09:57:45', 0);
INSERT INTO `product` VALUES ('02C54199-404A-5E30-9D0C-7CE2483495B0', '71741B5B-50FE-27CD-5BE3-D18FBA55BC52', '双门低温消毒柜', '无', 'public/img/product/02C54199-404A-5E30-9D0C-7CE2483495B0.jpg', 2, 0, 2, '2018-05-04 09:42:35', 0);
INSERT INTO `product` VALUES ('02E750C5-3497-5384-32EF-CDF075CA8796', '715B5909-E264-978C-9B32-7862013AF7C9', '中式电磁矮汤炉', '无', 'public/img/product/02E750C5-3497-5384-32EF-CDF075CA8796.jpg', 1, 0, 1, '2018-05-04 10:22:17', 0);
INSERT INTO `product` VALUES ('0707B2F1-3CDD-10FA-0933-A4C32EEE99FA', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '落地式酥皮机', '无', 'public/img/product/0707B2F1-3CDD-10FA-0933-A4C32EEE99FA.jpg', 10, 0, 10, '2018-05-03 10:26:46', 1);
INSERT INTO `product` VALUES ('071774FC-74A6-7710-2DFF-6D7BD9760032', '0CCB8600-5A7D-2CBD-523C-2D1D9001CAD1', '12格味料车', '无', 'public/img/product/071774FC-74A6-7710-2DFF-6D7BD9760032.jpg', 0, 0, 0, '2018-05-02 14:21:48', 102);
INSERT INTO `product` VALUES ('07ABCBB4-C6A3-3DE2-93AA-B57B38977F98', 'F64A0E4A-FE94-B43F-5E68-CF57E22493BF', '防爆开关', '无', 'public/img/product/07ABCBB4-C6A3-3DE2-93AA-B57B38977F98.jpg', 3, 0, 3, '2018-05-04 09:47:13', 0);
INSERT INTO `product` VALUES ('081D2FCF-A768-75EB-FB8A-7A5238182E98', '0CCB8600-5A7D-2CBD-523C-2D1D9001CAD1', '熟笼车', '无', 'public/img/product/081D2FCF-A768-75EB-FB8A-7A5238182E98.jpg', 9, 0, 9, '2018-05-02 14:26:40', 1);
INSERT INTO `product` VALUES ('0823C9F1-6D93-7CA0-98BD-BA0F5428B13E', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '双门电蒸柜', '无', 'public/img/product/0823C9F1-6D93-7CA0-98BD-BA0F5428B13E.jpg', 13, 0, 13, '2018-05-03 10:27:33', 1);
INSERT INTO `product` VALUES ('085A56ED-6809-BCB7-6694-3FAFBB4FC931', '71741B5B-50FE-27CD-5BE3-D18FBA55BC52', '热风循环消毒柜', '无', 'public/img/product/085A56ED-6809-BCB7-6694-3FAFBB4FC931.jpg', 1, 0, 1, '2018-05-04 09:42:18', 0);
INSERT INTO `product` VALUES ('0C76B7AF-B534-C5A8-623A-329F5E694860', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '电烤箱', '无', 'public/img/product/0C76B7AF-B534-C5A8-623A-329F5E694860.jpg', 8, 0, 8, '2018-05-04 09:55:11', 0);
INSERT INTO `product` VALUES ('0EB636B5-984A-2F2F-2119-C4A0B51917B1', '0CCB8600-5A7D-2CBD-523C-2D1D9001CAD1', '平板车', '无', 'public/img/product/0EB636B5-984A-2F2F-2119-C4A0B51917B1.jpg', 6, 1, 6, '2018-05-02 14:25:51', 2);
INSERT INTO `product` VALUES ('13600262-3810-B6B7-ACB7-5DF92C4B5409', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '电炸炉', '无', 'public/img/product/13600262-3810-B6B7-ACB7-5DF92C4B5409.jpg', 9, 0, 9, '2018-05-04 09:55:50', 0);
INSERT INTO `product` VALUES ('139EF413-6EE8-385D-17A7-08CED803CFA7', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '保温汤饭桶', '无', 'public/img/product/139EF413-6EE8-385D-17A7-08CED803CFA7.jpg', 2, 0, 2, '2018-05-04 09:49:51', 0);
INSERT INTO `product` VALUES ('14E2DA76-3795-329F-63F6-6829BCECC1B3', '0CCB8600-5A7D-2CBD-523C-2D1D9001CAD1', '花边车', '无', 'public/img/product/14E2DA76-3795-329F-63F6-6829BCECC1B3.jpg', 5, 1, 5, '2018-05-02 14:24:57', 5);
INSERT INTO `product` VALUES ('19181202-9101-F0D4-A327-7CB301881327', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '高效能全自动榨汁机', '无', 'public/img/product/19181202-9101-F0D4-A327-7CB301881327.jpg', 14, 0, 14, '2018-05-04 09:57:11', 0);
INSERT INTO `product` VALUES ('1A88E75C-7FA0-F08F-963C-D7B922E015E0', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '双头奶昔机', '无', 'public/img/product/1A88E75C-7FA0-F08F-963C-D7B922E015E0.jpg', 25, 0, 25, '2018-05-04 10:00:24', 0);
INSERT INTO `product` VALUES ('21B12000-9FEA-3DC0-3CFC-59866787BE31', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '98kg台下式制冰机', '无', 'public/img/product/21B12000-9FEA-3DC0-3CFC-59866787BE31.jpg', 0, 0, 0, '2018-05-04 09:49:23', 10);
INSERT INTO `product` VALUES ('21B2FED2-F07A-8E76-9071-B1C33450F0EF', 'F64A0E4A-FE94-B43F-5E68-CF57E22493BF', '气化炉', '无', 'public/img/product/21B2FED2-F07A-8E76-9071-B1C33450F0EF.jpg', 6, 0, 6, '2018-05-04 09:47:53', 0);
INSERT INTO `product` VALUES ('22DF987A-1477-C334-E23E-A281412E81FE', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '沪式炒炉', '无', 'public/img/product/22DF987A-1477-C334-E23E-A281412E81FE.jpg', 7, 0, 7, '2018-05-03 10:25:51', 0);
INSERT INTO `product` VALUES ('2365B2CD-4A97-B585-63EE-BCB8F290C6DC', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '切片机', '无', 'public/img/product/2365B2CD-4A97-B585-63EE-BCB8F290C6DC.jpg', 20, 0, 20, '2018-05-04 09:59:06', 0);
INSERT INTO `product` VALUES ('28646CA5-05DC-C7B2-C8BF-A3B04033E928', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '冰粒机', '无', 'public/img/product/28646CA5-05DC-C7B2-C8BF-A3B04033E928.jpg', 3, 0, 3, '2018-05-04 09:50:02', 0);
INSERT INTO `product` VALUES ('2C632ACF-4800-3526-3F21-AC61ADAC55FB', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '高身纱门柜', '无', 'public/img/product/2C632ACF-4800-3526-3F21-AC61ADAC55FB.jpg', 9, 0, 9, '2018-05-03 10:36:42', 0);
INSERT INTO `product` VALUES ('2E786224-7928-683B-D16F-CF742C0DA534', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '双星盆工作台', '无', 'public/img/product/2E786224-7928-683B-D16F-CF742C0DA534.jpg', 14, 0, 14, '2018-05-04 09:27:41', 0);
INSERT INTO `product` VALUES ('33CB9F00-9445-35B6-29A9-E63E73E64E7B', '0CCB8600-5A7D-2CBD-523C-2D1D9001CAD1', '油网抽油烟罩', '无', 'public/img/product/33CB9F00-9445-35B6-29A9-E63E73E64E7B.jpg', 10, 0, 10, '2018-05-02 14:26:58', 1);
INSERT INTO `product` VALUES ('37BE22D3-85D7-C908-DFB0-BADC8751E37B', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '高效能二合一酒吧组合', '无', 'public/img/product/37BE22D3-85D7-C908-DFB0-BADC8751E37B.jpg', 13, 0, 13, '2018-05-04 09:56:54', 0);
INSERT INTO `product` VALUES ('39698259-8AFB-9A19-25FB-4830C4CC065C', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '广式炒炉', '无', 'public/img/product/39698259-8AFB-9A19-25FB-4830C4CC065C.jpg', 6, 0, 18, '2018-05-02 14:47:44', 0);
INSERT INTO `product` VALUES ('39E65490-0690-F267-5EEC-CF6370E139E5', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '吊柜', '无', 'public/img/product/39E65490-0690-F267-5EEC-CF6370E139E5.jpg', 7, 0, 7, '2018-05-03 10:34:59', 0);
INSERT INTO `product` VALUES ('3BE41A35-8078-4D87-98AE-BFE84C48C4DC', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '潮州式炒炉', '无', 'public/img/product/3BE41A35-8078-4D87-98AE-BFE84C48C4DC.jpg', 2, 0, 14, '2018-05-02 14:36:47', 4);
INSERT INTO `product` VALUES ('3BF634F5-5848-326C-54DC-B4D3A2066C3F', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '木质案板台', '无', 'public/img/product/3BF634F5-5848-326C-54DC-B4D3A2066C3F.jpg', 11, 0, 11, '2018-05-03 10:37:14', 0);
INSERT INTO `product` VALUES ('3C42164B-D620-253C-CA45-434488D18F1A', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '矮汤炉', '无', 'public/img/product/3C42164B-D620-253C-CA45-434488D18F1A.jpg', 1, 0, 1, '2018-05-02 14:33:35', 48);
INSERT INTO `product` VALUES ('3ECE5C51-862D-E6D1-1541-250BB6F0FB62', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '双层成列保温柜', '无', 'public/img/product/3ECE5C51-862D-E6D1-1541-250BB6F0FB62.jpg', 24, 0, 24, '2018-05-04 10:00:11', 0);
INSERT INTO `product` VALUES ('4688722D-6C06-B362-19AC-674D58AD5F78', 'F64A0E4A-FE94-B43F-5E68-CF57E22493BF', '压力表', '无', 'public/img/product/4688722D-6C06-B362-19AC-674D58AD5F78.jpg', 8, 0, 8, '2018-05-04 09:48:19', 0);
INSERT INTO `product` VALUES ('46CE60D9-4C63-BFF5-FDF4-F2436BB4C364', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '和面机 (2)', '无', 'public/img/product/46CE60D9-4C63-BFF5-FDF4-F2436BB4C364.jpg', 15, 0, 15, '2018-05-04 09:57:29', 0);
INSERT INTO `product` VALUES ('47A2CA64-6345-3DAE-C262-0379981C4665', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '趟门打荷台', '无', 'public/img/product/47A2CA64-6345-3DAE-C262-0379981C4665.jpg', 18, 0, 18, '2018-05-04 09:37:34', 0);
INSERT INTO `product` VALUES ('489FD846-B2C6-DD1B-BAA2-64166C5E158F', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '电焗炉', '无', 'public/img/product/489FD846-B2C6-DD1B-BAA2-64166C5E158F.jpg', 7, 0, 7, '2018-05-04 09:51:03', 0);
INSERT INTO `product` VALUES ('49E67B8D-7D50-7A8A-3501-61B41455AC57', 'F64A0E4A-FE94-B43F-5E68-CF57E22493BF', '煤气报警器', '无', 'public/img/product/49E67B8D-7D50-7A8A-3501-61B41455AC57.jpg', 5, 0, 5, '2018-05-04 09:47:39', 0);
INSERT INTO `product` VALUES ('50E8515E-9786-BE3B-89C6-3709823D984B', 'F64A0E4A-FE94-B43F-5E68-CF57E22493BF', '低压阀', '无', 'public/img/product/50E8515E-9786-BE3B-89C6-3709823D984B.jpg', 1, 0, 1, '2018-05-04 09:44:15', 0);
INSERT INTO `product` VALUES ('547D24E8-DAD7-D314-9F86-D67326FB0FB5', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '斜刀切片机', '无', 'public/img/product/547D24E8-DAD7-D314-9F86-D67326FB0FB5.jpg', 30, 0, 30, '2018-05-04 10:08:02', 0);
INSERT INTO `product` VALUES ('5526AC58-F960-448D-7E4D-AF6559053B99', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '千秋门打荷台', '无', 'public/img/product/5526AC58-F960-448D-7E4D-AF6559053B99.jpg', 12, 0, 12, '2018-05-04 09:26:35', 0);
INSERT INTO `product` VALUES ('571E65B8-4576-6480-7ABE-B776394EF9A0', 'F64A0E4A-FE94-B43F-5E68-CF57E22493BF', '高压软管', '无', 'public/img/product/571E65B8-4576-6480-7ABE-B776394EF9A0.jpg', 4, 0, 4, '2018-05-04 09:47:26', 0);
INSERT INTO `product` VALUES ('5961821C-2259-CDAE-0396-BB573B6B6261', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '四格保温柜', '无', 'public/img/product/5961821C-2259-CDAE-0396-BB573B6B6261.jpg', 17, 0, 17, '2018-05-04 09:37:19', 0);
INSERT INTO `product` VALUES ('5CE77FE1-110B-7E09-E41A-C7E91682A0DD', '0CCB8600-5A7D-2CBD-523C-2D1D9001CAD1', '点心车', '无', 'public/img/product/5CE77FE1-110B-7E09-E41A-C7E91682A0DD.jpg', 2, 1, 2, '2018-05-02 14:23:14', 23);
INSERT INTO `product` VALUES ('5E59082E-2365-73F4-100B-EDC9D245D7C5', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '煮面炉', '无', 'public/img/product/5E59082E-2365-73F4-100B-EDC9D245D7C5.jpg', 33, 0, 33, '2018-05-04 10:08:43', 0);
INSERT INTO `product` VALUES ('5EC367B4-345A-AD35-0231-FAC0B884F9BE', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '切菜机', '无', 'public/img/product/5EC367B4-345A-AD35-0231-FAC0B884F9BE.jpg', 19, 0, 19, '2018-05-04 09:58:51', 0);
INSERT INTO `product` VALUES ('65D3649A-D185-5627-6D9A-4C0B082CF402', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '三抽屉食物保温柜', '无', 'public/img/product/65D3649A-D185-5627-6D9A-4C0B082CF402.jpg', 23, 0, 23, '2018-05-04 09:59:55', 0);
INSERT INTO `product` VALUES ('66A4F6C0-D3BF-539A-61DB-A08D7FDCCC96', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '双头蒸炉', '无', 'public/img/product/66A4F6C0-D3BF-539A-61DB-A08D7FDCCC96.jpg', 17, 0, 17, '2018-05-03 10:28:55', 0);
INSERT INTO `product` VALUES ('66B0CA03-BD46-5535-C229-65A93FE36C7A', 'F64A0E4A-FE94-B43F-5E68-CF57E22493BF', '防暴风器', '无', 'public/img/product/66B0CA03-BD46-5535-C229-65A93FE36C7A.jpg', 2, 0, 2, '2018-05-04 09:47:02', 0);
INSERT INTO `product` VALUES ('6729A278-996A-52C5-B543-F0C83FAF593D', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '搅拌机', '无', 'public/img/product/6729A278-996A-52C5-B543-F0C83FAF593D.jpg', 18, 0, 18, '2018-05-04 09:58:36', 0);
INSERT INTO `product` VALUES ('67862409-2F11-9D7E-A6FA-355C724D70E9', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '电扒炉', '无', 'public/img/product/67862409-2F11-9D7E-A6FA-355C724D70E9.jpg', 4, 0, 4, '2018-05-04 09:50:23', 0);
INSERT INTO `product` VALUES ('67FBF4A1-9EF5-3520-951A-C2C255F9AE2C', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '中式万能蒸柜系列', '无', 'public/img/product/67FBF4A1-9EF5-3520-951A-C2C255F9AE2C.jpg', 20, 0, 20, '2018-05-03 10:30:20', 0);
INSERT INTO `product` VALUES ('706173AF-69E2-B367-A2FC-FF42065B868A', 'F64A0E4A-FE94-B43F-5E68-CF57E22493BF', '中压阀', '无', 'public/img/product/706173AF-69E2-B367-A2FC-FF42065B868A.jpg', 9, 0, 9, '2018-05-04 09:48:29', 0);
INSERT INTO `product` VALUES ('717131C0-43FF-10D0-4EFB-474E609BA561', '0CCB8600-5A7D-2CBD-523C-2D1D9001CAD1', '八格快餐车', '无', 'public/img/product/717131C0-43FF-10D0-4EFB-474E609BA561.jpg', 1, 1, 1, '2018-05-02 14:22:09', 66);
INSERT INTO `product` VALUES ('72115DD0-718D-BFF8-A56B-C0818986036C', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '豆浆机', '无', 'public/img/product/72115DD0-718D-BFF8-A56B-C0818986036C.jpg', 10, 0, 10, '2018-05-04 09:56:05', 0);
INSERT INTO `product` VALUES ('7721A832-D29F-1FA3-727D-E3749AB94225', 'F31D9B9C-D1C1-F4C5-9D28-6037283F6AF1', '餐台椅系列', '无', 'public/img/product/7721A832-D29F-1FA3-727D-E3749AB94225.jpg', 2, 0, 2, '2018-05-04 10:21:04', 0);
INSERT INTO `product` VALUES ('78769B9E-CA4D-A4CA-B01B-5BDA4AECCD39', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '单星盆台', '无', 'public/img/product/78769B9E-CA4D-A4CA-B01B-5BDA4AECCD39.jpg', 6, 0, 6, '2018-05-03 10:34:45', 1);
INSERT INTO `product` VALUES ('78DED47D-C211-2D1B-7E23-71BBC47DE53A', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '防爆灯', '无', 'public/img/product/78DED47D-C211-2D1B-7E23-71BBC47DE53A.jpg', 17, 0, 17, '2018-05-02 14:47:26', 0);
INSERT INTO `product` VALUES ('79485B8B-4518-938B-C776-D983E23A8532', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '多功能搅拌机', '无', 'public/img/product/79485B8B-4518-938B-C776-D983E23A8532.jpg', 11, 0, 11, '2018-05-04 09:56:20', 0);
INSERT INTO `product` VALUES ('7EA1D24C-30F8-71A5-C46C-2C08F82EDBC6', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '中型双头自动蒸馏咖啡机连热水器', '无', 'public/img/product/7EA1D24C-30F8-71A5-C46C-2C08F82EDBC6.jpg', 32, 0, 32, '2018-05-04 10:08:30', 0);
INSERT INTO `product` VALUES ('8009CC56-6E7B-26BE-A0BA-1A0422A557CC', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '台式电热汤池', '无', 'public/img/product/8009CC56-6E7B-26BE-A0BA-1A0422A557CC.jpg', 28, 0, 28, '2018-05-04 10:01:43', 0);
INSERT INTO `product` VALUES ('8434F433-C060-B30D-CC84-E5FEE223A41D', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '高身储物柜', '无', 'public/img/product/8434F433-C060-B30D-CC84-E5FEE223A41D.jpg', 8, 0, 8, '2018-05-03 10:35:14', 0);
INSERT INTO `product` VALUES ('84600F75-C233-A016-145F-EAA16B7CC990', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '烤鸭炉', '无', 'public/img/product/84600F75-C233-A016-145F-EAA16B7CC990.jpg', 8, 1, 8, '2018-05-03 10:26:13', 17);
INSERT INTO `product` VALUES ('85A2CFEB-82FB-5F65-DBA0-94C398151982', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '全自动刨皮机', '无', 'public/img/product/85A2CFEB-82FB-5F65-DBA0-94C398151982.jpg', 22, 0, 22, '2018-05-04 09:59:39', 0);
INSERT INTO `product` VALUES ('87CA43D2-DC68-C407-1FBA-1D3BFFA77CF8', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '收污台', '无', 'public/img/product/87CA43D2-DC68-C407-1FBA-1D3BFFA77CF8.jpg', 12, 0, 12, '2018-05-03 10:27:17', 1);
INSERT INTO `product` VALUES ('87F60F01-DFE1-038A-AB4C-ADDC79D84132', '71741B5B-50FE-27CD-5BE3-D18FBA55BC52', '红外线消毒柜', '无', 'public/img/product/87F60F01-DFE1-038A-AB4C-ADDC79D84132.jpg', 0, 0, 0, '2018-05-04 09:42:06', 13);
INSERT INTO `product` VALUES ('8D294F1D-8713-A93E-7D82-C922C72D8E1E', 'F31D9B9C-D1C1-F4C5-9D28-6037283F6AF1', '餐台椅系列 (3)', '无', 'public/img/product/8D294F1D-8713-A93E-7D82-C922C72D8E1E.jpg', 1, 0, 1, '2018-05-04 10:20:52', 0);
INSERT INTO `product` VALUES ('8E320728-D2DA-E0A7-E452-1DCADBF1B2AB', '2806EAA6-064F-BB4E-8221-47E5A77A1B39', '前置式及罩式洗條机', '无', 'public/img/product/8E320728-D2DA-E0A7-E452-1DCADBF1B2AB.jpg', 2, 0, 2, '2018-05-04 09:40:53', 1);
INSERT INTO `product` VALUES ('92DD75A6-1AD4-04AF-2C53-9EDFE0E2D106', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '抽屉式工作柜', '无', 'public/img/product/92DD75A6-1AD4-04AF-2C53-9EDFE0E2D106.jpg', 2, 0, 2, '2018-05-03 10:32:21', 2);
INSERT INTO `product` VALUES ('9400EC7F-2FCE-F66A-36AC-7CC8543B18B6', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '碎肉机', '无', 'public/img/product/9400EC7F-2FCE-F66A-36AC-7CC8543B18B6.jpg', 27, 0, 27, '2018-05-04 10:01:15', 0);
INSERT INTO `product` VALUES ('98503C44-694F-1761-CF99-1A7EAD81735D', '0CCB8600-5A7D-2CBD-523C-2D1D9001CAD1', '收碗车', '无', 'public/img/product/98503C44-694F-1761-CF99-1A7EAD81735D.jpg', 8, 0, 8, '2018-05-02 14:26:25', 1);
INSERT INTO `product` VALUES ('989E300D-59AF-8BC3-96B2-86D78888F122', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '绞肉机', '无', 'public/img/product/989E300D-59AF-8BC3-96B2-86D78888F122.jpg', 17, 0, 17, '2018-05-04 09:57:58', 0);
INSERT INTO `product` VALUES ('9A71648E-9A48-1244-B759-B6DB2C4828A3', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '双门蒸柜', '无', 'public/img/product/9A71648E-9A48-1244-B759-B6DB2C4828A3.jpg', 14, 0, 14, '2018-05-03 10:27:53', 1);
INSERT INTO `product` VALUES ('9A946B0C-1381-2490-B6FE-BF9705918F7B', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '四格粥车', '无', 'public/img/product/9A946B0C-1381-2490-B6FE-BF9705918F7B.jpg', 18, 0, 18, '2018-05-03 10:29:10', 0);
INSERT INTO `product` VALUES ('9DA83719-D94B-7E7E-3B96-D0058A4EF44A', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '电烘炉', '无', 'public/img/product/9DA83719-D94B-7E7E-3B96-D0058A4EF44A.jpg', 6, 0, 6, '2018-05-04 09:50:48', 0);
INSERT INTO `product` VALUES ('9E2029DE-4A24-ECB0-4286-CCC620828F08', '2806EAA6-064F-BB4E-8221-47E5A77A1B39', 'k系列蓝传送式洗碗机', '无', 'public/img/product/9E2029DE-4A24-ECB0-4286-CCC620828F08.jpg', 1, 0, 1, '2018-05-04 09:40:34', 2);
INSERT INTO `product` VALUES ('A0148D3D-AB0B-D12F-B800-1A7168757125', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '双层工作台', '无', 'public/img/product/A0148D3D-AB0B-D12F-B800-1A7168757125.jpg', 13, 0, 13, '2018-05-04 09:26:48', 0);
INSERT INTO `product` VALUES ('A2391766-C37F-DAB1-0152-414031403A33', '0CCB8600-5A7D-2CBD-523C-2D1D9001CAD1', '三层餐车', '无', 'public/img/product/A2391766-C37F-DAB1-0152-414031403A33.jpg', 7, 1, 7, '2018-05-02 14:26:08', 2);
INSERT INTO `product` VALUES ('A35E2722-3428-2F8B-084E-BC88E3B63FAF', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '茶叶柜', '无\n', 'public/img/product/A35E2722-3428-2F8B-084E-BC88E3B63FAF.jpg', 1, 0, 1, '2018-05-03 10:31:54', 3);
INSERT INTO `product` VALUES ('A61636E5-989A-8E80-4AC0-F150F02B51E3', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '四片多士炉', '无', 'public/img/product/A61636E5-989A-8E80-4AC0-F150F02B51E3.jpg', 26, 0, 26, '2018-05-04 10:00:39', 0);
INSERT INTO `product` VALUES ('ACC0CD74-66B1-E839-751E-C9644E923CA4', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '纹切两用机', '无', 'public/img/product/ACC0CD74-66B1-E839-751E-C9644E923CA4.jpg', 29, 0, 29, '2018-05-04 10:04:39', 0);
INSERT INTO `product` VALUES ('AE5784C8-AF35-2B0B-5362-36BCBA77C05F', '2806EAA6-064F-BB4E-8221-47E5A77A1B39', 'B系列带传送式洗碗机', '无', 'public/img/product/AE5784C8-AF35-2B0B-5362-36BCBA77C05F.jpg', 0, 0, 0, '2018-05-04 09:40:21', 20);
INSERT INTO `product` VALUES ('AF3D0864-1651-EE9E-0705-ED42F65AD99E', '2806EAA6-064F-BB4E-8221-47E5A77A1B39', '前置式洗杯机和洗碗机', '无', 'public/img/product/AF3D0864-1651-EE9E-0705-ED42F65AD99E.jpg', 3, 0, 3, '2018-05-04 09:41:06', 0);
INSERT INTO `product` VALUES ('B37273F4-16DD-2CBF-A8B3-3B954C971889', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '高速电热开水器', '无', 'public/img/product/B37273F4-16DD-2CBF-A8B3-3B954C971889.jpg', 12, 0, 12, '2018-05-04 09:56:39', 0);
INSERT INTO `product` VALUES ('B72FC2DC-A60D-A865-B33A-C2FF8AA65912', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '三星盆台', '无', 'public/img/product/B72FC2DC-A60D-A865-B33A-C2FF8AA65912.jpg', 11, 0, 11, '2018-05-03 10:27:03', 1);
INSERT INTO `product` VALUES ('B8348BAD-4CB3-99C8-9232-13DD10A40486', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '双头式炒炉', '无', 'public/img/product/B8348BAD-4CB3-99C8-9232-13DD10A40486.jpg', 16, 0, 16, '2018-05-03 10:28:38', 1);
INSERT INTO `product` VALUES ('B8AABB5C-EDB0-40F6-4BFD-E1B2BB585F2F', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '电磁炒炉', '无', 'public/img/product/B8AABB5C-EDB0-40F6-4BFD-E1B2BB585F2F.jpg', 3, 0, 15, '2018-05-02 14:46:56', 1);
INSERT INTO `product` VALUES ('BB5B7C74-6F57-30CB-C992-75B6DBECC1B8', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '汤撑炉', '无', 'public/img/product/BB5B7C74-6F57-30CB-C992-75B6DBECC1B8.jpg', 19, 0, 19, '2018-05-03 10:30:02', 0);
INSERT INTO `product` VALUES ('BF28FE75-9690-30A7-F4F7-186C75B2331A', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '工作台连上层架', '无', 'public/img/product/BF28FE75-9690-30A7-F4F7-186C75B2331A.jpg', 10, 0, 10, '2018-05-03 10:36:59', 0);
INSERT INTO `product` VALUES ('C3A8026C-00D8-00D7-B1E4-CD09C91698A8', '0CCB8600-5A7D-2CBD-523C-2D1D9001CAD1', '横置双盘饼盘车', '无', 'public/img/product/C3A8026C-00D8-00D7-B1E4-CD09C91698A8.jpg', 4, 1, 4, '2018-05-02 14:24:38', 9);
INSERT INTO `product` VALUES ('C6F8BE13-0A2E-ACF6-8D72-397370A19DFC', '8E2D6104-EC5E-4EF1-C84E-EA87023EE17D', '抽风柜', '无', 'public/img/product/C6F8BE13-0A2E-ACF6-8D72-397370A19DFC.jpg', 0, 0, 0, '2018-05-04 09:43:02', 13);
INSERT INTO `product` VALUES ('C9C1A454-8AA3-6BF8-1285-C3D31435D24D', 'F64A0E4A-FE94-B43F-5E68-CF57E22493BF', '燃气报警器', '无', 'public/img/product/C9C1A454-8AA3-6BF8-1285-C3D31435D24D.jpg', 7, 0, 7, '2018-05-04 09:48:07', 0);
INSERT INTO `product` VALUES ('CDD5DC49-16E9-DC53-B5AC-6346E77D960A', 'F64A0E4A-FE94-B43F-5E68-CF57E22493BF', '壁挂式气化炉', '无', 'public/img/product/CDD5DC49-16E9-DC53-B5AC-6346E77D960A.jpg', 0, 0, 0, '2018-05-04 09:44:03', 10);
INSERT INTO `product` VALUES ('CDFCC8C2-7063-CD25-F659-A91B27D0E7F8', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '煲仔炉', '无', 'public/img/product/CDFCC8C2-7063-CD25-F659-A91B27D0E7F8.jpg', 13, 0, 13, '2018-05-02 14:33:53', 0);
INSERT INTO `product` VALUES ('CE01748D-1517-0364-B964-A98E031EA44E', '8E2D6104-EC5E-4EF1-C84E-EA87023EE17D', '复合式静电油烟净化器', '无', 'public/img/product/CE01748D-1517-0364-B964-A98E031EA44E.jpg', 1, 0, 1, '2018-05-04 09:43:15', 0);
INSERT INTO `product` VALUES ('CE636734-374A-5463-64F6-303DAF23568F', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '不锈钢八层蒸笼架', '无', 'public/img/product/CE636734-374A-5463-64F6-303DAF23568F.jpg', 0, 0, 0, '2018-05-03 10:31:34', 15);
INSERT INTO `product` VALUES ('D2095E99-FB1B-9558-2B30-0ED38E65212C', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '座地式锯骨机', '无', 'public/img/product/D2095E99-FB1B-9558-2B30-0ED38E65212C.jpg', 34, 0, 34, '2018-05-04 10:08:54', 0);
INSERT INTO `product` VALUES ('D281E4A1-3C2D-D47F-8533-4D33AC1C1647', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '电饼档', '无', 'public/img/product/D281E4A1-3C2D-D47F-8533-4D33AC1C1647.jpg', 5, 0, 5, '2018-05-04 09:50:35', 0);
INSERT INTO `product` VALUES ('D47CA63B-9616-FAD7-382B-982DAE2BEF99', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '保温汤饭盒', '无', 'public/img/product/D47CA63B-9616-FAD7-382B-982DAE2BEF99.jpg', 1, 0, 1, '2018-05-04 09:49:34', 0);
INSERT INTO `product` VALUES ('D6D97DE4-E0E5-1F32-E527-DD18BD8D48E8', '0CCB8600-5A7D-2CBD-523C-2D1D9001CAD1', '方形酒水车', '无', 'public/img/product/D6D97DE4-E0E5-1F32-E527-DD18BD8D48E8.jpg', 3, 1, 3, '2018-05-02 14:24:20', 13);
INSERT INTO `product` VALUES ('D8DF0550-EBAB-D8B1-215D-05C2D608B233', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '全自动刨皮机 (2)', '无', 'public/img/product/D8DF0550-EBAB-D8B1-215D-05C2D608B233.jpg', 21, 0, 21, '2018-05-04 09:59:25', 0);
INSERT INTO `product` VALUES ('D9BF832C-E853-E16C-3085-CC53D254FA48', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '单星工作台', '无', 'public/img/product/D9BF832C-E853-E16C-3085-CC53D254FA48.jpg', 5, 0, 5, '2018-05-03 10:34:29', 2);
INSERT INTO `product` VALUES ('DE0FCCC8-49D8-7E76-A1A0-AB3A29E5852B', '715B5909-E264-978C-9B32-7862013AF7C9', '电磁单大连单小炒', '无', 'public/img/product/DE0FCCC8-49D8-7E76-A1A0-AB3A29E5852B.jpg', 0, 0, 0, '2018-05-04 10:22:02', 7);
INSERT INTO `product` VALUES ('E4C938CF-4927-737B-90A1-60CD3DB0B896', '0CCB8600-5A7D-2CBD-523C-2D1D9001CAD1', '蒸笼车', '无', 'public/img/product/E4C938CF-4927-737B-90A1-60CD3DB0B896.jpg', 11, 0, 11, '2018-05-02 14:27:14', 2);
INSERT INTO `product` VALUES ('E5417A9D-66E1-BA5F-8BCA-9630A29CB2AC', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '双星盆台', '无', 'public/img/product/E5417A9D-66E1-BA5F-8BCA-9630A29CB2AC.jpg', 15, 0, 15, '2018-05-04 09:27:57', 0);
INSERT INTO `product` VALUES ('EBF76851-8F14-6F80-E87C-AB4564B0BACA', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '电磁炒炉2', '无', 'public/img/product/EBF76851-8F14-6F80-E87C-AB4564B0BACA.jpg', 4, 0, 16, '2018-05-02 14:47:10', 0);
INSERT INTO `product` VALUES ('EEF779C7-A706-7574-AECF-3DCD8A2E04DA', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '抽屉式工作台', '无', 'public/img/product/EEF779C7-A706-7574-AECF-3DCD8A2E04DA.jpg', 3, 0, 3, '2018-05-03 10:33:53', 2);
INSERT INTO `product` VALUES ('EEFCF669-F544-5BEC-F75B-3E717235F254', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '四层货架', '无', 'public/img/product/EEFCF669-F544-5BEC-F75B-3E717235F254.jpg', 16, 0, 16, '2018-05-04 09:36:43', 0);
INSERT INTO `product` VALUES ('F48288A6-5DE0-1E81-584A-E91EC61BE6A2', 'CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '单大星盆台', '无', 'public/img/product/F48288A6-5DE0-1E81-584A-E91EC61BE6A2.jpg', 4, 0, 4, '2018-05-03 10:34:07', 2);
INSERT INTO `product` VALUES ('FAB13B8D-9CC4-30FB-4FE9-DAAB30B30EFA', 'F31D9B9C-D1C1-F4C5-9D28-6037283F6AF1', '餐台椅系列 (2)', '无', 'public/img/product/FAB13B8D-9CC4-30FB-4FE9-DAAB30B30EFA.jpg', 0, 0, 0, '2018-05-04 10:20:41', 6);
INSERT INTO `product` VALUES ('FBE85AD0-2CB9-BE6D-E89F-2AB6006F754E', '6E9ACCA9-C49E-6097-87D1-C8F03901D863', '压面机', '无', 'public/img/product/FBE85AD0-2CB9-BE6D-E89F-2AB6006F754E.jpg', 31, 0, 31, '2018-05-04 10:08:15', 0);
INSERT INTO `product` VALUES ('FC294212-7708-55F5-8028-4A64F36A1DC7', '8E2D6104-EC5E-4EF1-C84E-EA87023EE17D', '立式运水烟罩控制箱', '无', 'public/img/product/FC294212-7708-55F5-8028-4A64F36A1DC7.jpg', 2, 0, 2, '2018-05-04 09:43:27', 0);
INSERT INTO `product` VALUES ('FCC10E8E-90B3-1232-4D6D-2BB3BDE2D10C', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '烤猪炉', '无', 'public/img/product/FCC10E8E-90B3-1232-4D6D-2BB3BDE2D10C.jpg', 9, 0, 9, '2018-05-03 10:26:30', 1);
INSERT INTO `product` VALUES ('FE05B70D-7CE5-6083-7067-6A4B170EFE86', '7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '双盆肠粉炉', '无', 'public/img/product/FE05B70D-7CE5-6083-7067-6A4B170EFE86.jpg', 15, 0, 15, '2018-05-03 10:28:20', 1);

-- ----------------------------
-- Table structure for product_classify
-- ----------------------------
DROP TABLE IF EXISTS `product_classify`;
CREATE TABLE `product_classify`  (
  `classify_id` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类id',
  `classify_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类名称',
  `classify_position` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`classify_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of product_classify
-- ----------------------------
INSERT INTO `product_classify` VALUES ('0CCB8600-5A7D-2CBD-523C-2D1D9001CAD1', '车仔系列', 0);
INSERT INTO `product_classify` VALUES ('2806EAA6-064F-BB4E-8221-47E5A77A1B39', '洗碗消毒设备系列', 3);
INSERT INTO `product_classify` VALUES ('6E9ACCA9-C49E-6097-87D1-C8F03901D863', '外购设备', 7);
INSERT INTO `product_classify` VALUES ('715B5909-E264-978C-9B32-7862013AF7C9', '电磁系列', 9);
INSERT INTO `product_classify` VALUES ('71741B5B-50FE-27CD-5BE3-D18FBA55BC52', '消毒柜系列', 4);
INSERT INTO `product_classify` VALUES ('7F8B5F6B-D333-498B-FD99-3F83D3F8F138', '炉具系列', 1);
INSERT INTO `product_classify` VALUES ('8E2D6104-EC5E-4EF1-C84E-EA87023EE17D', '环保设备系列', 5);
INSERT INTO `product_classify` VALUES ('CF44BFE3-7EBE-552F-E8AC-E55ECDD0F924', '钢具系列', 2);
INSERT INTO `product_classify` VALUES ('F31D9B9C-D1C1-F4C5-9D28-6037283F6AF1', '餐台椅系列', 8);
INSERT INTO `product_classify` VALUES ('F64A0E4A-FE94-B43F-5E68-CF57E22493BF', '气化系列', 6);

-- ----------------------------
-- Table structure for recruit
-- ----------------------------
DROP TABLE IF EXISTS `recruit`;
CREATE TABLE `recruit`  (
  `recruit_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of recruit
-- ----------------------------
INSERT INTO `recruit` VALUES ('<h2><span style=\"color: rgb(51, 51, 51);\">1、资深项目设计师 数量不限</span></h2><p><strong style=\"color: rgb(51, 51, 51);\">工作地点：深圳</strong></p><p><strong style=\"color: rgb(51, 51, 51);\">招聘要求：</strong></p><p><span style=\"color: rgb(51, 51, 51);\">1.大专以上学历，28岁以上。有过三年以上厨房设备工程或顾问公司项目设计工作的经历，对商用厨房设计、顾问有深刻的把握认知，能够胜任全盘独立地主持大型酒店厨房项目的设计顾问，了解行业发展的趋势，具备战略的眼光和缜密的思维。拥有成功案例者更佳。</span></p><p><span style=\"color: rgb(51, 51, 51);\">2.熟练地掌握机械绘图软件，作风稳健、心思细密，具有良好的语言表达能力，善于与不同类型的客户沟通。</span></p><p><span style=\"color: rgb(51, 51, 51);\">3.具备较强的组织和领导能力，为人诚信，抗压能力出众。</span></p><p><span style=\"color: rgb(51, 51, 51);\">4.要求流利的白粤和英文会话能力。</span></p><h2><span style=\"color: rgb(51, 51, 51);\">2、项目营销经理 3名</span></h2><p><strong>工作地点：深圳</strong></p><p><strong>招聘要求：</strong></p><p><span style=\"color: rgb(51, 51, 51);\">1.大专以上学历，25岁以上，具备三年或以上同行业销售或市场推广工作背景，具有广泛而良好的社会关系，尤其是酒店行业和餐饮行业拥有人脉资源。</span></p><p><span style=\"color: rgb(51, 51, 51);\">2.熟悉酒店厨房方面的知识，了解厨房设备行业的状况。对营销推广有着全面而深刻的理解。</span></p><p><span style=\"color: rgb(51, 51, 51);\">3.拥有较强的以目标为导向的市场开拓能力，较强的销售计划与分解能力，耐压力强，精于商务谈判。</span></p><p><span style=\"color: rgb(51, 51, 51);\">4.善于建立并维持良好的客户关系</span></p><p><span style=\"color: rgb(51, 51, 51);\">5.能够领导一个团队。</span></p><h2><span style=\"color: rgb(51, 51, 51);\">3、客服工程师 5名</span></h2><p><strong>工作地点：深圳</strong></p><p><strong>招聘要求：</strong></p><p><span style=\"color: rgb(51, 51, 51);\">1.对客户关系管理（CRM ）比较了解，熟悉客户投诉、客户管理和危机公关的处理流程。</span></p><p><span style=\"color: rgb(51, 51, 51);\">2.有强烈的责任心和使感，较强的沟通和协调能力，出色的语言表达和商用公文处理能力，行事稳健细致，工作有计划，有目标。</span></p><p><span style=\"color: rgb(51, 51, 51);\">3.态度亲和谦逊，待人真诚有礼。善于化解危机和缰局</span></p><p><span style=\"color: rgb(51, 51, 51);\">4.熟悉产品设计、制造、维修方面的知识，具备简单的产品维护能力，要求机械、自动化或工科专业，大学以上学历。</span></p><p><br></p>');

-- ----------------------------
-- Table structure for service
-- ----------------------------
DROP TABLE IF EXISTS `service`;
CREATE TABLE `service`  (
  `service_id` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `service_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `service_code` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `service_position` int(11) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`service_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of service
-- ----------------------------
INSERT INTO `service` VALUES ('391205BF-7B13-995A-EFE2-8F08AF538BC9', '<a target=\"_blank\" href=\"http://wpa.qq.com/msgrd?v=3&uin=1027580820&site=qq&menu=yes\"><img border=\"0\" src=\"http://wpa.qq.com/pa?p=2:1027580820:53\" alt=\"点击这里给我发消息\" title=\"点击这里给我发消息\"/></a>', '高级客服', 2, '2018-05-04 14:34:49');
INSERT INTO `service` VALUES ('E43E7D69-AD1E-6CD2-D058-CFF8E20AB76F', '<a target=\"_blank\" href=\"http://wpa.qq.com/msgrd?v=3&uin=1027580820&site=qq&menu=yes\"><img border=\"0\" src=\"http://wpa.qq.com/pa?p=2:1027580820:41\" alt=\"点击这里给我发消息\" title=\"点击这里给我发消息\"/></a>', '萨达', 1, '2018-05-04 14:34:49');

-- ----------------------------
-- Table structure for success_case
-- ----------------------------
DROP TABLE IF EXISTS `success_case`;
CREATE TABLE `success_case`  (
  `case_id` varchar(52) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '案例id',
  `case_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '案例名称',
  `case_preview` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '案例图片',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`case_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of success_case
-- ----------------------------
INSERT INTO `success_case` VALUES ('01C464F2-9C9E-BB97-5398-DF070494399C', '深圳市宝安区沙井街道办壆岗幼儿园', 'public/img/successCase/01C464F2-9C9E-BB97-5398-DF070494399C.jpg', '2018-05-04 11:14:29');
INSERT INTO `success_case` VALUES ('03CADBB2-1CD8-FEF0-9490-007AC96D95CB', '深圳市石岩香港嘉宝茶餐厅千富分店', 'public/img/successCase/03CADBB2-1CD8-FEF0-9490-007AC96D95CB.jpg', '2018-05-04 11:16:27');
INSERT INTO `success_case` VALUES ('1A8A2376-3E7B-45A9-D629-3728901BBF25', '深圳市龙华龙悦居蓝海幼儿园', 'public/img/successCase/1A8A2376-3E7B-45A9-D629-3728901BBF25.jpg', '2018-05-04 11:12:44');
INSERT INTO `success_case` VALUES ('28DB3E6D-8003-4385-A9AF-FFB0116AFC09', '深圳市龙岗区乐天幼儿园', 'public/img/successCase/28DB3E6D-8003-4385-A9AF-FFB0116AFC09.jpg', '2018-05-04 11:11:32');
INSERT INTO `success_case` VALUES ('2A704D2A-1B7C-F1E4-F01F-0EC56A2FBE22', '惠东港口惠君大酒店', 'public/img/successCase/2A704D2A-1B7C-F1E4-F01F-0EC56A2FBE22.jpg', '2018-05-04 11:12:27');
INSERT INTO `success_case` VALUES ('5B123416-D6F2-1612-E485-EA1519115EC3', '深圳国际比诺中英文幼儿园', 'public/img/successCase/5B123416-D6F2-1612-E485-EA1519115EC3.JPG', '2018-05-04 11:17:04');
INSERT INTO `success_case` VALUES ('6A454872-7C3F-DE53-7F54-6E3163B48E7E', '深圳市南海意库雕刻时光咖啡馆', 'public/img/successCase/6A454872-7C3F-DE53-7F54-6E3163B48E7E.jpg', '2018-05-04 11:13:33');
INSERT INTO `success_case` VALUES ('77AE928A-71E6-E6B1-F131-5ED628459B89', '深圳市福田区香蜜湖私人高级会所', 'public/img/successCase/77AE928A-71E6-E6B1-F131-5ED628459B89.jpg', '2018-05-04 11:14:59');
INSERT INTO `success_case` VALUES ('909DF25F-376B-76FE-1310-3C16FAA6AA90', '揭阳市巨轮股份有限公司', 'public/img/successCase/909DF25F-376B-76FE-1310-3C16FAA6AA90.jpg', '2018-05-04 11:16:02');
INSERT INTO `success_case` VALUES ('9668E1E7-39CA-6ABF-360E-299F2914A3D6', '深圳市罗湖区翠北实验小学', 'public/img/successCase/9668E1E7-39CA-6ABF-360E-299F2914A3D6.png', '2018-05-04 11:15:16');
INSERT INTO `success_case` VALUES ('9CC96792-1CB5-6042-F4BC-2D803193014E', '深圳市坪山区火乐火乐火锅', 'public/img/successCase/9CC96792-1CB5-6042-F4BC-2D803193014E.jpg', '2018-05-04 11:14:45');
INSERT INTO `success_case` VALUES ('E4F7469D-EBB7-B16F-E529-EE4F2E59E558', '深圳市桂园中学', 'public/img/successCase/E4F7469D-EBB7-B16F-E529-EE4F2E59E558.jpg', '2018-05-04 11:10:46');
INSERT INTO `success_case` VALUES ('EADF6EC6-6B8A-2E78-6793-AF969F86112D', '深圳市龙岗区东都汽车城职员餐厅', 'public/img/successCase/EADF6EC6-6B8A-2E78-6793-AF969F86112D.jpg', '2018-05-04 11:13:50');

-- ----------------------------
-- Table structure for web_info
-- ----------------------------
DROP TABLE IF EXISTS `web_info`;
CREATE TABLE `web_info`  (
  `web_title` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '网站描述',
  `web_seokey` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '网站关键词',
  `web_seodesp` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '网站描述',
  `web_copyright` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '网站版权信息',
  `web_logo` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '网站logo',
  `company_landline` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公司座机',
  `company_phone` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公司电话信息',
  `company_fax` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '网站传真信息',
  `company_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '网站邮箱信息',
  `company_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公司名称',
  `company_address` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公司地址信息',
  `company_contact` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公司联系人',
  `company_web` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公司网站'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of web_info
-- ----------------------------
INSERT INTO `web_info` VALUES ('深圳厨房设备|深圳厨具|深圳厨房改造|深圳不锈钢制品|深圳不锈钢厨具|深圳厨房设计|深圳厨具公司|深圳厨房工程|深圳厨房设计', '深圳厨房设备，深圳厨房改造，深圳厨房设计，深圳厨房工厂，厨房设备，深圳不锈钢厨具，厨房工程，深圳厨房工程', 'undefined', '深圳市正东厨房设备有限公司 版权所有 地址：深圳市龙岗区爱联嶂背石龙头工业区办公楼二楼 备 粤ICP备10237478号', 'public/img/logo/logo.png', '0755-28986206', '文小姐 13928443355', '0755-28986280', 'szzdcj@163.com', '深圳市正东厨房设备有限公司', '深圳市龙岗区爱联嶂背石龙头工业区办公室1-2楼', '文小姐', 'www.zdcjzh.com');

SET FOREIGN_KEY_CHECKS = 1;
