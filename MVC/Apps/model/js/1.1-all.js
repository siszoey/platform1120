/*
 * 全局对象
 */
var viewer = null;

var tree = layui.tree;              //layui初始化
var form = layui.form;              //layui初始化
var table = layui.table;            //layui初始化
var util = layui.util;              //layui初始化
var date = layui.laydate;           //layui初始化
var elem = layui.element;           //layui初始化

var role = "";                     //用户功能权限

var modelprojectinfoviewlayerindex = null;                           //项目信息模块（查看）
var modelprojectinfoaddlayerindex = null;                            //项目信息模块（新建）
var modelprojectinfoeditlayerindex = null;                           //项目信息模块（编辑）


var modeltaskinfoviewlayerindex = null;                           //模型信息模块（查看）
var modeltaskinfoaddlayerindex = null;                            //模型信息模块（新建）
var modeltaskinfoeditlayerindex = null;                           //模型信息模块（编辑）


var headeruserlayerindex = null;                                //用户信息
var headernoticelayerindex = null;                              //通知消息
var headerselayerindex = null;                                  //设置



var tipslayer = -1;//全局提示层


//*model
var modelprojectentities = [];//项目位置及标注
//*model
var currentprojectid = null;//当前项目id
//*model
var currentprojectdisastertype = null;//当前项目类型



var currentprojectmonitors = [];//当前项目监测点树（除报警器、GNSS基站）
var currentprojectfristmonitor = null;//当前项目默认第一个监测点

var curtileset = null;//当前模型


/*
 * 图标常量
 */
var LANDSLIDEICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/map/project_type_landslide.png" style="width:14px;height:14px;"/></span>';
var ROCKFALLICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/map/project_type_rockfall.png" style="width:14px;height:14px;"/></span>';




















