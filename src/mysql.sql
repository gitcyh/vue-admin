
--
--用户表
--
CREATE TABLE IF NOT EXISTS `user`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '用户id',
    `username` varchar(30) NOT NULL COMMENT '用户名',
    `password` varchar(30) NOT NULL COMMENT '密码',
    `phone` varchar(20) NOT NULL COMMENT '手机号',
    `email` varchar(60) NOT NULL COMMENT '邮箱用于找回密码',
    `picture` TEXT  COMMENT '头像',
    `role` int(4) unsigned NOT NULL COMMENT '角色',
    `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

INSERT INTO `user` (`user_id`, `username`, `password`, `phone`,`email`, `picture`, `role`) VALUES
('cyh123', '英哥', '123456', '13576004423','1643017650@qq.com', '', '9999')

--
--第三方用户信息表
--
CREATE TABLE IF NOT EXISTS `oauths`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT 'id',
    `user_id` varchar(30) NOT NULL COMMENT '用户id',
    `oauth_type` varchar(30) NOT NULL COMMENT '第三方登陆类型 weibo、qq、wechat 等',
    `oauth_id` varchar(255) NOT NULL COMMENT '第三方 uid 、openid 等',
    `unionid` varchar(255)  COMMENT 'QQ / 微信同一主体下 Unionid 相同',
    `credential` varchar(255)  COMMENT '密码凭证 /access_token (目前更多是存储在缓存里)',
    `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--员工表
--
CREATE TABLE IF NOT EXISTS `staff`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '唯一id',
    `shop_id` varchar(64) NOT NULL PRIMARY KEY COMMENT '所属店铺id',
    `name` varchar(30) NOT NULL COMMENT '员工姓名',
    `sex` TINYINT NOT NULL COMMENT '性别',
    `age` TINYINT NOT NULL COMMENT '年龄',
    `phone` varchar(16) NOT NULL COMMENT '手机号',
    `idCard` varchar(20) COMMENT '身份证号',
    `date` datetime NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '入职日期',
    `address` varchar(255)  COMMENT '住址',
    `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--客户表
--
CREATE TABLE IF NOT EXISTS `customer`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '唯一id',
    `shop_id` varchar(64) NOT NULL PRIMARY KEY COMMENT '所属店铺id',
    `name` varchar(255) NOT NULL COMMENT '客户名称',
    `address` varchar(255)  COMMENT '地址',
    `phone` varchar(16) NOT NULL COMMENT '手机号',
    `remark` varchar(255) NOT NULL COMMENT '备注',
    `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)


--
--店铺信息表
--
CREATE TABLE IF NOT EXISTS `shop`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT 'id',
    `user_id` varchar(64) NOT NULL COMMENT '店铺所有人id',
    `shopname` varchar(255) NOT NULL COMMENT '店铺名称',
    `shop_address` varchar(255) NOT NULL COMMENT '店铺地址',
    `shop_tel` varchar(40) NOT NULL COMMENT '店铺电话',
    `shopkeeper` varchar(20) NOT NULL COMMENT '店主姓名',
    `idCard` varchar(20) NOT NULL COMMENT '店主身份证号码',
    `telephone` varchar(20) NOT NULL COMMENT '店主手机号',
    `shopCompany` varchar(250) NOT NULL COMMENT '公司名称',
    `shop_img` TEXT  COMMENT '店铺图标',
    `shop_license` TEXT  COMMENT '营业执照',
    `apply_status` int(4) DEFAULT 0  COMMENT '-1:申请失败,0:待审核 1:审核通过',
    `applyDesc` varchar(255)  COMMENT '申请失败原因',
    `longitude` decimal(10,7) COMMENT '店铺经度',
    `latitude` decimal(10,7) COMMENT '店铺纬度',
    `serviceStartTime` time NULL DEFAULT '08:30:00' COMMENT'开始营业时间',
    `serviceEndTime` time NULL DEFAULT '22:30:00' COMMENT'结束营业时间',
    `shopActive` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1:营业中 0:休息中',
    `shopStatus` tinyint(4) NOT NULL DEFAULT 1 COMMENT '-1:拒绝|停用 0:未审核 1:已审核',
    `applyTime`  datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '申请时间',
    `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

INSERT INTO `shop` (`user_id`, `shopname`, `shop_address`, `shop_tel`,`shopkeeper`,'shop_idcard', `telephone`, `shopCompany`,`shop_img`,
`shop_license`, `apply_status`, `applyDesc`, `longitude`,`latitude`, `serviceStartTime`, `serviceEndTime`,`shopAtive`, `shopStatus`,`applyTime`) VALUES
('cyh123', '新围仔农夫山泉店', '新围仔4巷', '075512345678','李老板', '3607241994123456','15986620002', '农夫山泉有限公司','', '', 2,'',115,22, '08:30:00','22:30:00',1,1,'2022-11-10:10:00:00')


--
--银行表
--
CREATE TABLE IF NOT EXISTS `bank`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT 'id',
    `bank_name` varchar(50) NOT NULL COMMENT '银行名称',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1:有效 -1:无效',
    `bank_img` TEXT  COMMENT '银行图标',
    `bank_code` varchar(100)  COMMENT '第三方功能会用到，如用户申请提现，管理员付款到银行卡时会用到',
    `is_show` tinyint(4)  COMMENT '1：是 0：否',
    `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--商品分类表
--
CREATE TABLE IF NOT EXISTS `goods_cat`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT 'id',
    `·  新设备而被0看，0你。5pid` varchar(64) NOT NULL COMMENT '父id',
    `cat_name` varchar(255) NOT NULL COMMENT '分类名称',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '删除标志1:有效 -1:删除',
    `cat_img` TEXT  COMMENT '分类图片',
    `subTitle` varchar(150) COMMENT '二级标题',
    `is_show` tinyint(4)  COMMENT '1：是 0：否',
    `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--品牌表
--
CREATE TABLE IF NOT EXISTS `brand`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT 'id',
    `brand` varchar(255) NOT NULL COMMENT '品牌名称',
    `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--商品表
--
CREATE TABLE IF NOT EXISTS `goods`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '商品id',
    `cat_id` varchar(64) NOT NULL COMMENT '商品分类id',
    `shop_id` int NOT NULL COMMENT '店铺id',
    `goods_num` varchar(20) NOT NULL COMMENT '商品编号',
    `goods_name` varchar(255) NOT NULL COMMENT '商品名称',
    `brand_name` varchar(255) NOT NULL COMMENT '品牌名称',
    `goods_img` TEXT  COMMENT '商品图片',
    `goods_desc` TEXT  COMMENT '商品描述',
    `goods_status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '商品状态-1:违规 0:未审核 1:已审核',
    `applyDesc` varchar(255)  COMMENT '申请失败原因',
    `costPrice` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '成本价',
    `deliveryPrice` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '配送价',
    `selfPrice` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '自提价',
    `waterPrice` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '水票价',
    `MonthlyPrice` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '月结价',
    `is_sale` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否上架0:不上架 1:上架',
    `is_best` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否精品0:否 1:是',
    `is_hot` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否热销产品0:否 1:是',
    `is_new` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否新品0:否 1:是',
    `is_recom` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否推荐0:否 1:是',
    `data_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '删除标志1:有效 -1:无效',
    `sale_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上架时间',
    `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)


--
--系统品牌表
--
CREATE TABLE IF NOT EXISTS `brand_sys`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT 'id',
    `brand` varchar(255) NOT NULL COMMENT '品牌名称',
    `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--系统商品表
--
CREATE TABLE IF NOT EXISTS `goods_sys`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '商品id',
    `cat_id` varchar(64) NOT NULL COMMENT '商品分类id',
    `goods_num` varchar(20) NOT NULL COMMENT '商品编号',
    `goods_name` varchar(255) NOT NULL COMMENT '商品名称',
    `brand_name` varchar(255) NOT NULL COMMENT '品牌名称',
    `goods_img` TEXT  COMMENT '商品图片',
    `goods_desc` TEXT  COMMENT '商品描述',
    `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)


--
--订单明细表
--
CREATE TABLE IF NOT EXISTS `order_list`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '订单明细id',
    `shop_id` int NOT NULL COMMENT '店铺id',
    `goods_num` varchar(20) NOT NULL COMMENT '商品编号',
    `goods_name` varchar(255) NOT NULL COMMENT '商品名称',
    `goods_specs` varchar(255) NOT NULL COMMENT '商品规格',
    `price` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '成交价',
    `num` int NOT NULL DEFAULT 0 COMMENT '成交数量',
    `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)

--
--订单表
--
CREATE TABLE IF NOT EXISTS `order`(
    `id` varchar(64) NOT NULL PRIMARY KEY COMMENT '订单id',
    `user_id` varchar(64) NOT NULL  COMMENT '下单的用户id',
    `order_from` tinyint(4) NOT NULL DEFAULT 1 COMMENT '订单来源1:用户下单,2:平台录入',
    `order_list_id` TEXT  COMMENT '订单明细id',
    `shop_id` int NOT NULL COMMENT '店铺id',
    `address` varchar(255)  COMMENT '客户地址',
    `customer_name` varchar(255)  COMMENT '客户名称',
    `customer_phone` varchar(20) NOT NULL COMMENT '客户手机号',
    `sum_price` decimal(11,2) NOT NULL DEFAULT 0 COMMENT '总成交价',
    `sum_num` int NOT NULL DEFAULT 0 COMMENT '总成交数量',
    `send_state` tinyint(4) NOT NULL DEFAULT 1 COMMENT '配送状态0:未配送,1:配送中,2:已配送,3:客户自提,4:其他',
    `payway` tinyint(4) NOT NULL DEFAULT 0 COMMENT '支付方式0:微信支付,1:支付宝,2:水票,3:月结,4:现金,5:其他',
    `sender` varchar(64) NOT NULL COMMENT '配送员一般是员工id或客户自提',
    `remark` TEXT  COMMENT '备注',
    `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
)
