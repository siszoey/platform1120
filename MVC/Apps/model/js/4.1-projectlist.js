﻿var modelprojectlist = [];

//三维模型项目列表widget
layer.open({
    type: 1
    , title: ['项目列表', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
    , area: ['300px', '800px']
    , shade: 0
    , offset: ['60px', '10px']
    , closeBtn: 0
    , maxmin: true
    , moveOut: true
    , content: '<!--项目列表--> <div class="layui-row" style="position:absolute;top:5px;width:100%"> <!--搜索--> <div class="layui-col-md9" style="float:left"> <div class="grid-demo grid-demo-bg1"> <input type="text" id="projectfilter" lay-verify="title" autocomplete="off" placeholder="搜索" class="layui-input" style="left:30px;height:30px;padding-left:35px;border-radius:5px;margin-left:5px;margin-right:10px;"> </div> </div> <div class="layui-col-md3" style="float:right"> <div class="grid-demo grid-demo-bg1"> <button id="projectsearch" type="button" class="layui-btn layui-btn-primary layui-btn-sm" style="border-style:hidden;"><i class="layui-icon layui-icon-search" style="margin-right:0px"></i></button> </div> </div> </div> <!--项目列表--> <div class="layui-tab layui-tab-brief" lay-filter="projectListTab" style="margin-top:30px"> <!--选项卡--> <ul class="layui-tab-title"> <li lay-id="list_1" class="layui-this" style="width:40%;padding-top: 10px;">项目列表</li> <!--<li lay-id="list_2" style="width:40%;padding-top: 10px;">图层列表</li>--> </ul> <!--tree--> <div class="layui-tab-content"> <div class="layui-tab-item layui-show" id="projectbyarea"></div> <!--<div class="layui-tab-item" id="projectbylayer"></div>--> </div> </div>'
    , zIndex: layer.zIndex
    , success: function (layero) {
        layer.setTop(layero);

        //获取用户全部项目信息
        GetUserAllModelProjects();
        //获取用户全部项目信息

        tree.render({
            elem: '#projectbyarea'
            , id: 'modelprojectlistid'
            , data: []
            , showCheckbox: true
            , customCheckbox: true
            , edit: ['add', 'update', 'del']    //项目操作选项
            , customOperate: true
            , accordion: false
            , click: function (obj) {
                ModelProjectNodeClick(obj);
            }
            , operate: function (obj) {
                ModelProjectNodeOperate(obj);
            }
            , oncheck: function (obj) {
                if (obj.checked) {
                    if (obj.data.type == "task") {
                        LoadModel(obj.data);
                        for (var i in modelprojectlist) {
                            for (var j in modelprojectlist[i].children) {
                                for (var k in modelprojectlist[i].children[j].children) {
                                    if (modelprojectlist[i].children[j].children[k].id != obj.data.id) {
                                        //modelprojectlist[i].spread = false;
                                        //modelprojectlist[i].children[j].spread = false;
                                        //modelprojectlist[i].children[j].children[k].spread = false;
                                        modelprojectlist[i].children[j].children[k].checked = false;
                                    }
                                    else {
                                        modelprojectlist[i].spread = true;
                                        modelprojectlist[i].children[j].spread = true;
                                        modelprojectlist[i].children[j].children[k].spread = true;
                                        modelprojectlist[i].children[j].children[k].checked = true;
                                    }
                                }
                            }
                        }
                       
                    }
                    //重载项目树：将项目列表数据ModelProjectlist给data
                    tree.reload('modelprojectlistid', {
                        data: modelprojectlist
                    });
                }
            }
        });

    }
});

//树搜索
$('#projectsearch').click(function () {
    var value = $("#projectfilter").val();
    //console.log('value:', value);
    if (value) {
        //首选应将文本的颜色恢复正常
        var node = $("#projectbyarea");
        node.find('.layui-tree-txt').css('color', '');

        tree.reload('modelprojectlistid', {});//重载树，使得之前展开的记录全部折叠起来
        $.each(node.find('.layui-tree-txt'), function (index, elem) {
            elem = $(elem);
            let textTemp = elem.text();
            if (textTemp.indexOf(value) !== -1) {//查询相当于模糊查找
                elem.addClass("tree-txt-active");
                console.log('elem:', elem);
                elem.filter(':contains(' + value + ')').css('color', '#FFB800'); //搜索文本并设置标志颜色
            }
        });

        $.each($("#projectbyarea").find('.tree-txt-active'), function (index, elem) {
            elem = $(elem);
            // 展开所有父节点
            elem.parents('.layui-tree-set').each(function (i, item) {
                if (!$(item).hasClass('layui-tree-spread')) {
                    $(item).find('.layui-tree-iconClick:first').click();
                }
            });
        });
    }
});

//获取用户所有项目列表
function GetUserAllModelProjects() {
    

    $.ajax({
        url: servicesurl + "/api/ModelProject/GetUserModelProjectList", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {

                var modelprojectdata = JSON.parse(result.data);

                var areas = [];                 //地区
                var years = [];                 //时间
                for (var i in modelprojectdata) {
                    var year = modelprojectdata[i].ModelProjects.XMSJ.substr(0, 4);
                    var area = modelprojectdata[i].ModelProjects.XZQBM;
                    if (years.indexOf(year) == -1) {
                        years.push(year);
                    }
                    if (areas.indexOf(area) == -1) {
                        areas.push(area);
                    }

                }
                //升序排序
                years.sort();
                areas.sort();
                for (var x in areas) {
                    var xzq = new Object;
                    if ((xjxzqs != null) && (xjxzqs.length > 0)) {
                        //行政区编码转行政区名称
                        for (var y in xjxzqs) {
                            if (areas[x] == xjxzqs[y].value) {
                                xzq.title = xjxzqs[y].name;
                            }
                        }
                    }
                    else {
                        xzq.title = areas[x];
                    }
                    var projects = [];

                    for (var i in modelprojectdata) {
                        if (modelprojectdata[i].ModelProjects.XZQBM == areas[x]) {
                            var prj = new Object;
                            prj.id = modelprojectdata[i].ModelProjects.Id;
                            prj.nodeOperate = true;
                            prj.title = modelprojectdata[i].ModelProjects.XMMC;
                            prj.b = modelprojectdata[i].ModelProjects.ZXWD;
                            prj.l = modelprojectdata[i].ModelProjects.ZXJD;
                            prj.type = "project";

                            var tasks = [];

                            //model
                            if (modelprojectdata[i].ModelTasks != null) {
                                for (var j in modelprojectdata[i].ModelTasks.TaskList) {
                                    var task = new Object;
                                    task.id = modelprojectdata[i].ModelTasks.TaskList[j].Id;
                                    task.type = "task";
                                    task.nodeOperate = true;
                                    task.title = modelprojectdata[i].ModelTasks.TaskList[j].RWMC;
                                    task.path = modelprojectdata[i].ModelTasks.TaskList[j].MXLJ;
                                    
                                    if (modelprojectdata[i].ModelTasks.TaskList[j].MXLJ != null) {
                                        task.showCheckbox = true;
                                        task.checked = false;
                                    }
                                    else {
                                        task.showCheckbox = false;
                                        task.checked = false;
                                    }
                                    tasks.push(task);
                                }
                            }
                            prj.children = tasks;
                            projects.push(prj);
                        }


                    }
                    xzq.children = projects;
                    modelprojectlist.push(xzq);
                }
                //重载项目树：将项目列表数据ModelProjectlist给data
                tree.reload('modelprojectlistid', {
                    data: modelprojectlist
                });

                //TODO 新增项目位置及标注
                modelprojectentities = [];                   //项目位置及标注
                var bs = [];//纬度集合
                var ls = [];//经度集合

                for (var i in modelprojectdata) {
                    var modelprojectentity = new Cesium.Entity({
                        id: "PROJECTCENTER_" + modelprojectdata[i].ModelProjects.Id,
                        position: Cesium.Cartesian3.fromDegrees(modelprojectdata[i].ModelProjects.ZXJD, modelprojectdata[i].ModelProjects.ZXWD),
                        billboard: {
                            image: '../../Resources/img/map/marker.png',
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            width: 40,
                            height: 40,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY, //深度检测，解决图标、标注与模型遮挡冲突
                        }
                    });
                    modelprojectentities.push(modelprojectentity);

                    var modelprojectentitylabel = new Cesium.Entity({
                        id: "PROJECTCENTER_" + modelprojectdata[i].ModelProjects.Id + "_LABEL",
                        position: Cesium.Cartesian3.fromDegrees(modelprojectdata[i].ModelProjects.ZXJD, modelprojectdata[i].ModelProjects.ZXWD),
                        label: {
                            text: modelprojectdata[i].ModelProjects.XMMC,
                            font: '20px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                        }
                    });

                    modelprojectentities.push(modelprojectentitylabel);

                    bs.push(modelprojectdata[i].ModelProjects.ZXWD);
                    ls.push(modelprojectdata[i].ModelProjects.ZXJD);
                };





                if ((bs.length > 0) && (ls.length > 0)) {
                    //缩放至项目范围
                    setTimeout(() => {
                        FlytoExtent(Math.min.apply(null, ls) - 0.5, Math.min.apply(null, bs) - 0.5, Math.max.apply(null, ls) + 0.5, Math.max.apply(null, bs) + 0.5)
                    }, 3000);
                };

            }
            else {
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            };

        }, datatype: "json"
    });
};

//项目节点点击:set currentproject
function ModelProjectNodeClick(obj) {
    if (obj.data.type == "project") {
        if (currentprojectid == null || obj.data.id != currentprojectid) {
            if (JSON.stringify(obj.data.id) != currentprojectid) {
                currentprojectid = JSON.stringify(obj.data.id);                             //更新当前项目id

                document.getElementById("currentproject").style.visibility = "visible";
                document.getElementById("currentproject").innerHTML = "<option>" + JSON.stringify(obj.data.title).replace(/\"/g, "") + "</option><option>清除当前项目</option>";

                //监听清除当前项目操作
                $(() => {
                    $('#currentprojectoperate select').change(() => {
                        if ($('#currentprojectoperate select').val() == "清除当前项目") {
                            document.getElementById("currentproject").innerHTML = "";
                            document.getElementById("currentproject").style.visibility = "hidden";
                            currentprojectid = null;

                            CloseAllLayer();                               //关闭弹出图层
                            viewer.entities.removeAll();
                            AddEntitiesInViewer(modelprojectentities);
                        }
                    });
                });

            }


            FlytoCurrentProjectExtent(obj.data.l, obj.data.b, 8000.0);

        }
    }
    else {
        //TODO

    }
};

//项目树（项目列表+目标）节点操作：add\update\del
function ModelProjectNodeOperate(obj) {
    if (obj.type == 'add') {
        //查看
        if (obj.data.type == 'project') {
            //项目查看操作
            if ((modelprojectinfoaddlayerindex == null) && (modelprojectinfoeditlayerindex == null)) {
                ModelProjectInfo(obj.data.id, "view");
            }
            else {
                layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    CloseModelProjectInfoLayer();
                    ModelProjectInfo(obj.data.id, "view");
                    layer.close(index);
                });
            }
        }
        else if (obj.data.type == 'task') {
            //目标的查看操作
            //TODO
            if ((modeltaskinfoaddlayerindex == null) && (modeltaskinfoeditlayerindex == null)) {
                ModelTaskInfo(obj.data.id, "view");
            }
            else {
                layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    CloseModelTaskInfoLayer();
                    ModelTaskInfo(obj.data.id, "view");
                    layer.close(index);
                });
            }
        }
    }
    else if (obj.type == 'update') {
        //编辑
        if (obj.data.type == 'project') {
            //项目编辑操作
            if ((modelprojectinfoaddlayerindex == null) && (modelprojectinfoviewlayerindex == null)) {
                ModelProjectInfo(obj.data.id, "edit");
            }
            else {
                layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    CloseModelProjectInfoLayer();
                    ModelProjectInfo(obj.data.id, "edit");
                    layer.close(index);
                });
            }
        }
        else if (obj.data.type == 'task') {
            //目标的编辑操作
            if ((modeltaskinfoaddlayerindex == null) && (modeltaskinfoviewlayerindex == null)) {
                ModelTaskInfo(obj.data.id, "edit");
            }
            else {
                layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    CloseModelTaskInfoLayer();
                    ModelTaskInfo(obj.data.id, "edit");
                    layer.close(index);
                });
            }
        }

    }
    else {
        //删除
        //编辑
        if (obj.data.type == 'project') {
            //项目删除操作del                      
            $.ajax({
                url: servicesurl + "/api/ModelProject/DeleteModelProject", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
                success: function (data) {
                    var result = JSON.parse(data);
                    //layer.msg(result.data, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    //TODO————清除项目位置及标注
                    //刷新项目列表
                    GetUserAllModelProjects();
                    ////欲删除项目未选定为当前项目，或当前项目为空。
                    if (obj.data.id == currentprojectid) {
                        document.getElementById("currentproject").innerHTML = "";
                        document.getElementById("currentproject").style.visibility = "hidden";
                        currentprojectid = null;
                        CloseAllLayer();                               //关闭弹出图层
                    }
                    if ((modelprojectinfoviewlayerindex != null) || (modelprojectinfoeditlayerindex != null) || (modelprojectinfoaddlayerindex != null)) {
                        CloseAllLayer();
                    }
                }, datatype: "json"
            })
        }
        else if (obj.data.type == 'task') {
            //任务删除操作
            $.ajax({
                url: servicesurl + "/api/ModelTask/DeleteTask", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
                success: function (data) {
                    var result = JSON.parse(data);
                    //刷新项目列表
                    GetUserAllModelProjects();
                    layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    if ((modeltaskinfoviewlayerindex != null) || (modeltaskinfoaddlayerindex != null) || (modeltaskinfoeditlayerindex != null)) {
                        CloseAllLayer();
                        

                    }
                }, datatype: "json"
            })
        }

    }
};

//缩放至当前项目范围
function FlytoCurrentProjectExtent(l, b, h) {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(l, b, h)
    }, { duration: 3 });
};



//缩放至所有项目范围
function FlytoExtent(west, south, east, north) {
    viewer.camera.flyTo({
        destination: new Cesium.Rectangle.fromDegrees(west, south, east, north)
    }, { duration: 3 });

    if (modelprojectentities.length > 0) {
        setTimeout(() => {
            AddEntitiesInViewer(modelprojectentities)
        }, 3000);
    }
};


//向viewer添加entity
function AddEntityInViewer(entity) {
    if (entity != null) {
        viewer.entities.add(entity);
    }
};

//向viewer添加entity集合
function AddEntitiesInViewer(entities) {
    if (entities.length > 0) {
        for (var i in entities) {
            if (entities[i] != null) {
                viewer.entities.add(entities[i]);
            }
        }

        //viewer.flyTo(entities, { duration: 1, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 0) });
    }
};

//关闭所有弹出图层
function CloseAllLayer() {
    //关闭项目信息图层
    if (modelprojectinfoviewlayerindex != null) {
        layer.close(modelprojectinfoviewlayerindex);
        modelprojectinfoviewlayerindex = null;
    }
    if (modelprojectinfoaddlayerindex != null) {
        layer.close(modelprojectinfoaddlayerindex);
        modelprojectinfoaddlayerindex = null;
    }
    if (modelprojectinfoeditlayerindex != null) {
        layer.close(modelprojectinfoeditlayerindex);
        modelprojectinfoeditlayerindex = null;
    }
    
    //关闭模型信息图层
    if (modeltaskinfoviewlayerindex != null) {
        layer.close(modeltaskinfoviewlayerindex);
        modeltaskinfoviewlayerindex = null;
    }
    if (modeltaskinfoaddlayerindex != null) {
        layer.close(modeltaskinfoaddlayerindex);
        modeltaskinfoaddlayerindex = null;
    }
    if (modeltaskinfoeditlayerindex != null) {
        layer.close(modeltaskinfoeditlayerindex);
        modeltaskinfoeditlayerindex = null;
    }

    //TODO更多关闭图层
};
//关闭任务信息相关图层
function CloseModelProjectInfoLayer() {
    if (modelprojectinfoviewlayerindex != null) {
        layer.close(modelprojectinfoviewlayerindex);
        modelprojectinfoviewlayerindex = null;
    }
    if (modelprojectinfoaddlayerindex != null) {
        layer.close(modelprojectinfoaddlayerindex);
        modelprojectinfoaddlayerindex = null;
    }
    if (modelprojectinfoeditlayerindex != null) {
        layer.close(modelprojectinfoeditlayerindex);
        modelprojectinfoeditlayerindex = null;
    }
    
}

//关闭任务信息相关图层
function CloseModelTaskInfoLayer() {
    if (modeltaskinfoviewlayerindex != null) {
        layer.close(modeltaskinfoviewlayerindex);
        modeltaskinfoviewlayerindex = null;
    }
    if (modeltaskinfoaddlayerindex != null) {
        layer.close(modeltaskinfoaddlayerindex);
        modeltaskinfoaddlayerindex = null;
    }
    if (modeltaskinfoeditlayerindex != null) {
        layer.close(modeltaskinfoeditlayerindex);
        modeltaskinfoeditlayerindex = null;
    }
}





