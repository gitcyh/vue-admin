
--
--后台用户表
--
CREATE TABLE IF NOT EXISTS `user`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '用户id',
    `username` varchar(64) NOT NULL COMMENT '用户名',
    `password` varchar(64) NOT NULL COMMENT '密码',
    `phone` varchar(20) NOT NULL COMMENT '手机号',
    `email` varchar(60) NOT NULL COMMENT '邮箱用于找回密码',
    `picture_id`  varchar(64)  COMMENT '头像id',
    `role` int(4) unsigned NOT NULL DEFAULT 6666 COMMENT '角色,6666:店铺管理员,9999超级管理员',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

INSERT INTO `user` (`id`, `username`, `password`, `phone`,`email`, `picture_id`, `role`) VALUES
('1', 'admin', '123456cyhZ', '13576004423','1643017650@qq.com', '', '9999')

--
--微信用户表
--
CREATE TABLE IF NOT EXISTS `wxuser`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT 'id',
    `code`  varchar(64)  COMMENT '调用wx.login返回的临时code',
    `cloud_id` varchar(64)  COMMENT '',
    `encrypted_data` text  COMMENT '加密的敏感数据',
    `nick_name` varchar(255) NOT NULL COMMENT '微信用户昵称',
    `gender` tinyint  COMMENT '用户性别0男1女',
    `language` varchar(16)  COMMENT '语言如zh_CN',
    `province` varchar(32)  COMMENT '省份',
    `phone` varchar(16)  COMMENT '手机号',
    `city` varchar(32)  COMMENT '城市',
    `country` varchar(32) COMMENT '国家',
    `avatar_url` text  COMMENT '用户头像地址',
    `signature` varchar(64)  COMMENT '使用 sha1( rawData + sessionkey ) 得到字符串,用于校验用户信息',
    `iv` varchar(32) COMMENT '加密算法的初始向量',
    `session_key` varchar(32)  COMMENT '会话密钥',
    `unionid` varchar(32)  COMMENT '用户在开放平台的唯一标识符,若当前小程序已绑定到微信开放平台帐号下会返回',
    `openid` varchar(32) COMMENT '用户唯一标识,非常重要',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--微信地址表一个微信用户可以对应多个地址
CREATE TABLE IF NOT EXISTS `wx_address`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '唯一id',
    `userid` varchar(255)  NOT NULL COMMENT "用户id",
    `address` varchar(500) NOT NULL DEFAULT '' COMMENT '地址全称',
    `address_tag` varchar(32) NOT NULL DEFAULT '' COMMENT "家或公司",
    `auth_token` varchar(32) COMMENT "授权token",
    `country_code` varchar(32) NOT NULL DEFAULT 'chn' COMMENT "国家码",
    `country_name` varchar(32) NOT NULL DEFAULT '中国' COMMENT "国家名称",
    `province_code` varchar(32) COMMENT "省份码" ,
    `province_name` varchar(32) COMMENT "省份名称",
    `city_code` varchar(32) COMMENT "城市码",
    `city_name` varchar(64) COMMENT "城市名称",
    `district_code` varchar(32) COMMENT "县或区码",
    `district_name` varchar(64) COMMENT "县或区名",
    `detail_address` varchar(400) COMMENT "详细地址",
    `is_default` tinyint(4)  DEFAULT 0 COMMENT '1是默认地址0不是',
    `longitude` decimal(10,7) COMMENT '用户经度',
    `latitude` decimal(10,7) COMMENT '用户纬度',
    `name` varchar(255) COMMENT "收货人姓名",
    `phone` varchar(16)  COMMENT '手机号',
    `phone_number` varchar(16)  COMMENT '手机号码',
    `lift` tinyint(4) DEFAULT NULL  COMMENT '有无电梯',
    `floors` tinyint(4) DEFAULT NULL  COMMENT '楼层数',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)



--
--员工表
--
CREATE TABLE IF NOT EXISTS `staff`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '唯一id',
    `shop_id` varchar(64) NOT NULL COMMENT '所属店铺id',
    `name` varchar(30) NOT NULL COMMENT '员工姓名',
    `sex` tinyint NOT NULL DEFAULT 0 COMMENT '性别',
    `age` tinyint  COMMENT '年龄',
    `phone` varchar(16)  COMMENT '手机号',
    `id_card` varchar(20) COMMENT '身份证号',
    `entry_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '入职日期',
    `address` varchar(255)  COMMENT '住址',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1:有效 -1:无效',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--客户表
--
CREATE TABLE IF NOT EXISTS `customer`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '唯一id',
    `shop_id` varchar(64) NOT NULL  COMMENT '所属店铺id',
    `customer_form` tinyint(4) NOT NULL DEFAULT 0  COMMENT '客户来源0默认人工录入1是微信客户',
    `name` varchar(255) NOT NULL DEFAULT '' COMMENT '客户名称',
    `address` varchar(255) NOT NULL  COMMENT '地址',
    `longitude` decimal(10,7) DEFAULT NULL COMMENT '地址经度',
    `latitude` decimal(10,7) DEFAULT NULL COMMENT '地址纬度',
    `settlement` tinyint(4) NOT NULL DEFAULT 1  COMMENT '结算方式0水票,1及时支付,2月结',
    `wechat` varchar(64) DEFAULT NULL COMMENT '微信号',
    `phone` varchar(16) DEFAULT NULL COMMENT '手机号',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1:有效 -1:无效',
    `remark` varchar(255) DEFAULT NULL  COMMENT '备注',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--押金表
--
CREATE TABLE IF NOT EXISTS `desposit`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '唯一id',
    `customer_id` varchar(64) NOT NULL COMMENT '所属客户id,一个客户可能有多张押金单',
    `description` varchar(255) NOT NULL COMMENT '押金描述',
    `money` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '押金金额',
    `num` int NOT NULL DEFAULT 0  COMMENT '押桶数量',
    `file_id` varchar(64) DEFAULT NULL COMMENT '押金文件id',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1:有效 -1:无效',
    `state` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1:已押 -1:未押 0:已退',
    `remark` varchar(255) NOT NULL COMMENT '备注',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)


--
--店铺信息表
--
CREATE TABLE IF NOT EXISTS `shop`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT 'id',
    `user_id` varchar(64) NOT NULL COMMENT '店铺所有人id',
    `shop_name` varchar(255) NOT NULL COMMENT '店铺名称',
    `shop_address` varchar(255) NOT NULL COMMENT '店铺地址',
    `shop_tel` varchar(40) NOT NULL COMMENT '店铺电话',
    `shop_keeper` varchar(20) NOT NULL COMMENT '店主姓名',
    `id_card` varchar(20) NOT NULL COMMENT '店主身份证号码',
    `telephone` varchar(20) NOT NULL COMMENT '店主手机号',
    `shop_company` varchar(250) NOT NULL COMMENT '公司名称',
    `img_id` varchar(64) DEFAULT NULL COMMENT '店铺图标id',
    `license_id` varchar(64) DEFAULT NULL  COMMENT '营业执照id',
    `apply_status` int(4) DEFAULT 0  COMMENT '申请状态-1:申请失败,0:待审核 1:审核通过',
    `apply_desc` varchar(255)  COMMENT '申请失败原因',
    `longitude` decimal(10,7) COMMENT '店铺经度',
    `latitude` decimal(10,7) COMMENT '店铺纬度',
    `start_time` time NULL DEFAULT '08:30:00' COMMENT'开始营业时间',
    `end_time` time NULL DEFAULT '22:30:00' COMMENT'结束营业时间',
    `shop_active` tinyint(4) NOT NULL DEFAULT 0 COMMENT '1:营业中 0:休息中',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1可用-1删除-2违规',
    `apply_time`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '申请时间',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

INSERT INTO `shop` (`id`,`user_id`, `shopname`, `shop_address`, `shop_tel`,`shopkeeper`,'idCard', `telephone`, `shopCompany`,`img_id`,
`license_id`, `apply_status`, `applyDesc`, `longitude`,`latitude`, `serviceStartTime`, `serviceEndTime`,`shopActive`, `shopStatus`,`applyTime`) VALUES
('wqeqweqw13131312313','cyh123', '新围仔农夫山泉店', '新围仔4巷', '075512345678','李老板', '3607241994123456','15986620002', '农夫山泉有限公司','', '', 2,'',115,22, '08:30:00','22:30:00',1,1,'2022-11-10:10:00:00')


--
--银行表
--
CREATE TABLE IF NOT EXISTS `bank`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT 'id',
    `bank_name` varchar(50) NOT NULL COMMENT '银行名称',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1:有效 -1:无效',
    `bankimg_id` varchar(64) DEFAULT NULL  COMMENT '银行图标id',
    `bank_code` varchar(100)  COMMENT '第三方功能会用到,如用户申请提现,管理员付款到银行卡时会用到',
    `is_show` tinyint(4)  COMMENT '1：是 0：否',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--商品分类表
--
CREATE TABLE IF NOT EXISTS `category`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT 'id',
    `parent_id` varchar(64) DEFAULT NULL COMMENT '父id',
    `name` varchar(255) NOT NULL COMMENT '分类名称',
    `sub_title` varchar(255) DEFAULT NULL COMMENT '二级标题',
    `level`tinyint(4) NOT NULL DEFAULT 1 COMMENT '分类等级,如一级分类二级分类默认一级分类',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '删除标志1:有效 -1:删除',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

INSERT INTO `category` (`id`,`parent_id`,`name`,`sub_title`,`level`) VALUES
('1',null,'食品','食品类',1),
('2',null,'女装','女装类',1),
('3',null,'手机','手机类',1),
('4',null,'百货','百货类',1),
('5','1','牛奶饮料','牛奶饮料类',2),
('6','2','外套','外套类',2),
('7','3','手机配件','手机配件类',2),
('8','4','饰品','饰品类',2),
('9','5','饮用水','饮用水类',3)

-- --
-- --店铺品牌表
-- --
-- CREATE TABLE IF NOT EXISTS `brand`(
--     `id` varchar(64) NOT NULL PRIMARY KEY COMMENT 'id',
--     `brand` varchar(255) NOT NULL COMMENT '品牌名称',
--     `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
--     `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
-- )

--
--系统商品表
--
CREATE TABLE IF NOT EXISTS `goods_sys`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '商品id',
    `category_id` varchar(64) DEFAULT NULL COMMENT '商品分类id',
    `brand_name` varchar(255) NOT NULL COMMENT '品牌名称',
    `goods_num` varchar(32)  DEFAULT NULL COMMENT '商品编号',
    `goods_name` varchar(255) NOT NULL COMMENT '商品名称',
    `specs` varchar(255) NOT NULL COMMENT '商品规格',
    `img_id` varchar(64) DEFAULT NULL  COMMENT '商品图片id',
    `goods_desc` TEXT  COMMENT '商品描述',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '删除标志1:有效 -1:无效',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--店铺商品表
--
CREATE TABLE IF NOT EXISTS `goods`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '商品id',
    `category_id` varchar(64) NOT NULL COMMENT '商品分类id',
    `shop_id` varchar(64) NOT NULL COMMENT '店铺id',
    `goods_num` varchar(32) NOT NULL COMMENT '商品编号',
    `goods_name` varchar(255) NOT NULL COMMENT '商品名称',
    `brand_name` varchar(255) NOT NULL COMMENT '品牌名称',
    `specs` varchar(255) NOT NULL COMMENT '商品规格',
    `img_id` varchar(64) DEFAULT NULL  COMMENT '商品图片id',
    `goods_desc` TEXT  COMMENT '商品描述',
    `allowance` int NOT NULL DEFAULT 0 COMMENT '库存余量',
    `goods_status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '商品状态-1:违规 0:未审核 1:已审核',
    `apply_desc` varchar(255)  COMMENT '申请失败原因',
    `cost_price` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '成本价',
    `delivery_price` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '配送价',
    `self_price` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '自提价',
    `active_price` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '活动价',
    `is_sale` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否上架-1已下架0待上架1已上架',
    `is_best` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否精品0:否 1:是',
    `is_hot` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否热销产品0:否 1:是',
    `is_new` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否新品0:否 1:是',
    `is_recom` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否推荐0:否 1:是',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '删除标志1:有效 -1:无效',
    `sale_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上架时间',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)


--
--系统品牌表
--
CREATE TABLE IF NOT EXISTS `brand_sys`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT 'id',
    `brand` varchar(255) NOT NULL COMMENT '品牌名称',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '删除标志1:有效 -1:无效',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)


INSERT INTO `brand_sys` (`id`,`brand`) VALUES
('1','农夫山泉'),
('2','景田'),
('3','怡宝'),
('4','王老吉'),
('5','梧桐山'),
('6','益力'),
('7','百岁山'),
('8','吾尔康'),
('9','恒大'),
('10','冰露'),
('11','屈臣氏'),
('12','雀巢'),
('13','统一'),
('14','康师傅'),
('15','乐百氏'),
('16','哇哈哈')




--
--微信订单明细表
--
CREATE TABLE IF NOT EXISTS `wx_order_detail`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '订单明细id',
    `order_id` varchar(64) NOT NULL COMMENT '所属订单id',
    `shop_id` varchar(64) NOT NULL COMMENT '店铺id',
    `goods_id` varchar(64) NOT NULL COMMENT '商品id',
    `price` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '成交价',
    `num` int NOT NULL DEFAULT 0 COMMENT '成交数量',
    `palou_money` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '爬楼费',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--微信订单表
--
CREATE TABLE IF NOT EXISTS `wx_order`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '订单id',
    `order_num` varchar(64) NOT NULL COMMENT '订单编号',
    `user_id` varchar(64) NOT NULL  COMMENT '下单的用户id',
    `shop_id` varchar(64) NOT NULL COMMENT '店铺id',
    `address_id` varchar(64) NOT NULL COMMENT '客户地址id',
    `address` varchar(255)  COMMENT '客户地址',
    `customer_name` varchar(255)  COMMENT '客户名称',
    `customer_phone` varchar(20) COMMENT '客户手机号',
    `sum_money` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '总成交额',
    `sum_count` int NOT NULL DEFAULT 0 COMMENT '总成交数量',
    `prefer_money`  decimal(11,2) NOT NULL DEFAULT 0 COMMENT '优惠金额',
    `send_state` tinyint(4) NOT NULL DEFAULT 1 COMMENT '配送状态0:未配送,1:配送中,2:已配送,3:客户自提,4:其他',
    `payway` tinyint(4) NOT NULL DEFAULT 0 COMMENT '支付方式0:微信支付,1:支付宝,2:水票,3:月结,4:现金,5:其他',
    `sender_id` varchar(64) COMMENT '配送员一般是员工id或客户自提',
    `remark` varchar(255)  COMMENT '备注',
    `style` text  COMMENT '背景颜色',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '删除标志1:有效 -1:无效',
    `order_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '订单创建日期可修改',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--优惠券表
CREATE TABLE IF NOT EXISTS `prefer` (
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '优惠券id',
    `prefer_name` varchar(63) NULL COMMENT '优惠券名称',
    `prefer_desc` varchar(255) NULL COMMENT '优惠券介绍,通常是显示优惠券使用限制文字',
    `tag` varchar(64) NULL COMMENT '优惠券标签,例如新人专用',
    `total` int(11) NULL DEFAULT '0' COMMENT '优惠券数量,如果是0,则是无限量',
    `discount` decimal(10,2) NULL DEFAULT '0.00' COMMENT '优惠金额,',
    `min` decimal(10,2) NULL DEFAULT '0.00' COMMENT '最少消费金额才能使用优惠券。',
    `prefer_limit` smallint(6) NULL DEFAULT '1' COMMENT '用户领券限制数量,如果是0,则是不限制;默认是1,限领一张.',
    `prefer_type` smallint(6) NULL DEFAULT '0' COMMENT '优惠券赠送类型,如果是0则通用券,用户领取;如果是1,则是注册赠券;如果是2,则是优惠券码兑换;',
    `prefer_status` smallint(6) NULL DEFAULT '0' COMMENT '优惠券状态,如果是0则是正常可用;如果是1则是过期; 如果是2则是下架。',
    `goods_type` smallint(6) NULL DEFAULT '0' COMMENT '商品限制类型,如果0则全商品,如果是1则是类目限制,如果是2则是商品限制。',
    `goods_value` varchar(1023) NULL DEFAULT '[]' COMMENT '商品限制值,goods_type如果是0则空集合,如果是1则是类目集合,如果是2则是商品集合。',
    `prefer_code` varchar(63) NULL COMMENT '优惠券兑换码',
    `time_type` smallint(6) NULL DEFAULT '0' COMMENT '有效时间限制,如果是0,则基于领取时间的有效天数days;如果是1,则start_time和end_time是优惠券有效期;',
    `days` smallint(6) NULL DEFAULT '0' COMMENT '基于领取时间的有效天数days。',
    `start_time` datetime NULL COMMENT '使用券开始时间',
    `end_time` datetime NULL COMMENT '使用券截至时间',
    `data_flag` tinyint(1) NOT NULL DEFAULT 1 COMMENT '删除标志1:有效 -1:无效'
)

--
--平台订单表
--
CREATE TABLE IF NOT EXISTS `order_sys`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '订单id',
    `order_num` varchar(64) NOT NULL COMMENT '订单编号',
    `user_id` varchar(64) NOT NULL  COMMENT '下单的用户id',
    `shop_id` varchar(64) NOT NULL COMMENT '店铺id',
    `goods_id` varchar(64) NOT NULL COMMENT '商品id',
    `customer_id` varchar(64) NOT NULL COMMENT '客户id',
    `address` varchar(255)  COMMENT '客户地址',
    `customer_name` varchar(255)  COMMENT '客户名称',
    `customer_phone` varchar(20) COMMENT '客户手机号',
    `price` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '成交价',
    `num` int NOT NULL DEFAULT 0 COMMENT '成交数量',
    `send_state` tinyint(4) NOT NULL DEFAULT 1 COMMENT '配送状态0:未配送,1:配送中,2:已配送,3:客户自提,4:其他',
    `payway` tinyint(4) NOT NULL DEFAULT 0 COMMENT '支付方式0:微信支付,1:支付宝,2:水票,3:月结,4:现金,5:其他',
    `sender_id` varchar(64) COMMENT '配送员一般是员工id或客户自提',
    `remark` varchar(255)  COMMENT '备注',
    `style` text  COMMENT '背景颜色',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '删除标志1:有效 -1:无效',
    `order_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '订单创建日期可修改',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)


--
--上传文件表
--
CREATE TABLE IF NOT EXISTS `file`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '唯一id',
    `shop_id` varchar(64) DEFAULT NULL COMMENT '所属店铺id,为空则是系统文件',
    `file_name` varchar(255) DEFAULT NULL COMMENT '文件名称',
    `file_type` varchar(10) DEFAULT NULL COMMENT '文件类型',
    `file_size` double DEFAULT NULL COMMENT '文件大小',
    `content` longblob DEFAULT NULL COMMENT '文件内容',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--入库明细表
--
CREATE TABLE IF NOT EXISTS `instock`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '唯一id',
    `shop_id` varchar(64) NOT NULL COMMENT '店铺id',
    `goods_id` varchar(64) NOT NULL COMMENT '商品id',
    `img_id` varchar(64) NOT NULL COMMENT '进货凭证',
    `price` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '单价',
    `num` int NOT NULL DEFAULT 0 COMMENT '进货数量',
    `bucket` int NOT NULL DEFAULT 0 COMMENT '回桶数量',
    `money` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '进货金额',
    `remark` varchar(255)  COMMENT '备注',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '删除标志1:入库-1退库',
    `instock_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '进货日期',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--费用支出明细表
--
CREATE TABLE IF NOT EXISTS `payout`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '唯一id',
    `shop_id` varchar(64) NOT NULL COMMENT '店铺id',
    `category_id`  varchar(64) NOT NULL COMMENT '费用类别id',
    `name`  varchar(255) NOT NULL COMMENT '费用名称',
    `amount` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '支出金额',
    `remark` varchar(255) DEFAULT NULL COMMENT '备注',
    `date`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '费用发生时间',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--费用支出类别表
--
CREATE TABLE IF NOT EXISTS `expense_category`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '唯一id',
    `name`  varchar(255) NOT NULL COMMENT '类别名称',
    `description` varchar(255) NOT NULL COMMENT '描述',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '删除标志1:有效 -1:删除',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

INSERT INTO `expense_category` (`id`,`name`,`description`) VALUES
('1','住房支出','房租、物业费、装修、家具家电等'),
('2','交通支出','公共交通费用、汽车费用、燃油费,爱车养车用等'),
('3','食品支出','食品材料费、餐饮费、水果蔬菜费用等'),
('4','衣物支出','服装、鞋帽、饰品等'),
('5','日常开支','美容美发、日用品、家居用品、洗漱用品等'),
('6','娱乐支出','娱乐场所、游乐园、电影院等'),
('7','医疗支出','药品费、住院费、挂号费等'),
('8','教育支出','学费、书籍费用、补习费用等'),
('9','慈善支出','慈善捐款、公益活动等'),
('10','税费支出','个人所得税、营业税等'),
('11','充值缴费','水费、电费、燃气费、话费、宽带费等'),
('12','工资支出','工资,奖金等'),
('13','经营支出','进货,运费等'),
('14','其他','其他不便分类的费用')




