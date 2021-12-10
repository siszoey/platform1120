//任务
function ModelTaskInfo(id, style) {
    if (style == "view") {
        //查看目标
        if (modeltaskinfoviewlayerindex == null) {
            modeltaskinfoviewlayerindex = layer.open({
                type: 1
                , title: ['查看目标', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['450px', '500px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--查看目标--><form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="viewModeltaskinfoform"><div class="layui-form-item"><label class="layui-form-label">目标名称</label><div class="layui-input-block"><input type="text" name="model_mbmc_view" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">目标编号</label><div class="layui-input-block"><input type="text" name="model_mbbh_view" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">目标类型</label><div class="layui-input-block"><select id="mblxid" name="model_mblx_view" lay-verify="required"></select></div></div><div class="layui-form-item"><label class="layui-form-label">X</label><div class="layui-input-block"><input type="text" name="model_x_view" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">Y</label><div class="layui-input-block"><input type="text" name="model_y_view" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">Z</label><div class="layui-input-block"><input type="text" name="model_z_view" autocomplete="off"  class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">坐标系统</label><div class="layui-input-block"><select id="kjckid" name="model_kjck_view"></select></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block"><input type="text" name="model_bz_view" autocomplete="off" class="layui-input"></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    //异步获取目标基本信息
                    $.ajax({
                        url: servicesurl + "/api/ModelTask/GetTaskInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            var result = JSON.parse(data);
                            if (result.code == 1) {
                                var taskinfo = JSON.parse(result.data);
                                form.val("viewModeltaskinfoform", {
                                    "model_mbmc_view": taskinfo.MBMC
                                    , "model_mbbh_view": taskinfo.MBBH
                                    , "model_mblx_view": taskinfo.MBLX
                                    , "model_x_view": taskinfo.X
                                    , "model_y_view": taskinfo.Y
                                    , "model_z_view": taskinfo.Z
                                    , "model_kjck_view": taskinfo.SRID
                                    , "model_bz_view": taskinfo.BZ
                                });

                                //翻译目标类型、空间参考
                                if (srids.length > 0) {
                                    for (i in srids) {
                                        if (srids[i].value == taskinfo.SRID) {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>';
                                        }
                                    }
                                }
                                if (mblxs.length > 0) {
                                    for (i in mblxs) {
                                        if (mblxs[i].value == taskinfo.MBLX) {
                                            document.getElementById("mblxid").innerHTML += '<option value="' + mblxs[i].value + '" selected>' + mblxs[i].name + '</option>';
                                        }
                                    }
                                }

                                form.render();
                                form.render('select');
                            }

                            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });
                    form.render();
                }
                , end: function () {
                    layer.close(modeltaskinfoviewlayerindex);
                    modeltaskinfoviewlayerindex = null;
                }
            });
        }
    }
    else if (style == "edit") {
        //编辑目标
        if (modeltaskinfoeditlayerindex == null) {
            modeltaskinfoeditlayerindex = layer.open({
                type: 1
                , title: ['编辑目标', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['580px', '620px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:1px 0px"><ul class="layui-tab-title"><li class="layui-this">基本信息</li><li>靶区</li><li>时序影像</li></ul><div class="layui-tab-content" style="margin:0px 0px"><!--目标基本信息--><div class="layui-tab-item layui-show"><form class="layui-form" style="margin-top:0px" lay-filter="editModeltaskinfoform"><div class="layui-form-item"><label class="layui-form-label">目标名称</label><div class="layui-input-block"><input type="text" name="model_mbmc_edit" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">目标编号</label><div class="layui-input-block"><input type="text" name="model_mbbh_edit" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">目标类型</label><div class="layui-input-block"><select id="mblxid" name="model_mblx_edit" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">X</label><div class="layui-input-block"><input type="text" name="model_x_edit" autocomplete="off" placeholder="请输入空间直角坐标 X" lay-verify="required|number" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">Y</label><div class="layui-input-block"><input type="text" name="model_y_edit" autocomplete="off" placeholder="请输入空间直角坐标 Y" lay-verify="required|number" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">Z</label><div class="layui-input-block"><input type="text" name="model_z_edit" autocomplete="off" placeholder="请输入空间直角坐标 Z" lay-verify="required|number" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">坐标系统</label><div class="layui-input-block"><select id="kjckid" name="model_kjck_edit"></select></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block"><input type="text" name="model_bz_edit" placeholder="请输入" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item" style="margin-top:10px"><div style="position:absolute;right:15px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editModeltaskinfosubmit" style="width:100px">保存</button></div></div></form></div><!--靶区ROI信息--><div class="layui-tab-item"><div class="layui-card-body" style="padding:0px"><!--表格--><table id="model-roi-edit" lay-filter="model-roi-edit"></table><!--按钮--><script type="text/html" id="addroi"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px" lay-event="addroi">添加靶区</button></div></script><!--数据操作项--><script type="text/html" id="table-toolbar-roi"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="roiview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-blue layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="roiedit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="roidel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div><!--时序影像--><div class="layui-tab-item"><div class="layui-card-body" style="padding:0px"><!--表格--><table id="model-timemodel-edit" lay-filter="model_timemodel-edit"></table><!--按钮——上传目标影像--><script type="text/html" id="addtimemodel"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px" lay-event="addtimemodel">添加时序影像</button></div></script><!--数据操作项--><script type="text/html" id="table-toolbar-timemodel"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="timemodelview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="timemodeldel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div></div></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    //li————1-基本信息
                    //异步获取目标基本信息
                    $.ajax({
                        url: servicesurl + "/api/ModelTask/GetTaskInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            var result = JSON.parse(data);
                            if (result.code == 1) {
                                var taskinfo = JSON.parse(result.data);
                                form.val("editModeltaskinfoform", {
                                    "model_mbmc_edit": taskinfo.MBMC
                                    , "model_mbbh_edit": taskinfo.MBBH
                                    , "model_mblx_edit": taskinfo.MBLX
                                    , "model_x_edit": taskinfo.X
                                    , "model_y_edit": taskinfo.Y
                                    , "model_z_edit": taskinfo.Z
                                    , "model_kjck_edit": taskinfo.SRID
                                    , "model_bz_edit": taskinfo.BZ
                                });

                                //翻译目标类型、空间参考
                                if (srids.length > 0) {
                                    for (i in srids) {
                                        if (srids[i].value == taskinfo.SRID) {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '">' + srids[i].name + '</option>';
                                        }
                                    }
                                }
                                if (mblxs.length > 0) {
                                    for (i in mblxs) {
                                        if (mblxs[i].value == taskinfo.MBLX) {
                                            document.getElementById("mblxid").innerHTML += '<option value="' + mblxs[i].value + '" selected>' + mblxs[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("mblxid").innerHTML += '<option value="' + mblxs[i].value + '">' + mblxs[i].name + '</option>';
                                        }
                                    }
                                }

                                form.render();
                                form.render('select');
                            }

                            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });

                    //保存编辑--更新目标信息
                    form.on('submit(editModeltaskinfosubmit)', function (data) {
                        data.field.cookie = document.cookie;
                        data.field.id = id;
                        $.ajax({
                            url: servicesurl + "/api/ModelTask/UpdateTaskInfo", type: "put", data: data.field,
                            success: function (result) {
                                var info = JSON.parse(result);
                                if (info.code == 1) {
                                    //layer.close(modeltaskinfoeditlayerindex);
                                    //刷新项目列表
                                    GetUserAllModelProjects();
                                    form.render();
                                    form.render('select');
                                }
                                layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }, datatype: "json"
                        });
                        return false;
                    });

                }
                , end: function () {
                    modeltaskinfoeditlayerindex = null;
                }
                , cancel: function () {
                    modeltaskinfoeditlayerindex = null;
                }
            });
        }
    }
    else if (style == "add") {
        //新建目标----必须选择当前项目
        //①--先选择当前项目
        if (id == null) {
            layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            //②--再新建目标
            if (modeltaskinfoaddlayerindex == null) {
                modeltaskinfoaddlayerindex = layer.open({
                    type: 1
                    , title: ['新建任务', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                    , area: ['650px', '600px']
                    , shade: 0
                    , offset: 'auto'
                    , closeBtn: 1
                    , maxmin: true
                    , moveOut: true
                    , content: '<!--创建任务--> <form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="addModeltaskinfoform"> <div class="layui-form-item"><label class="layui-form-label">任务名称</label> <div class="layui-input-block"> <input type="text" name="model_rwmc_add" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"><label class="layui-form-label">采集人员</label> <div class="layui-input-block"> <input type="text" name="model_yxcjry_add" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"><label class="layui-form-label">采集时间</label> <div class="layui-input-block"> <input type="text" id="yxcjsjid" name="model_yxcjsj_add" lay-verify="required|date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"><label class="layui-form-label">影像数量</label> <div class="layui-input-block"> <input type="text" name="model_yxsl_add" autocomplete="off" placeholder="请输入数字" lay-verify="required|number" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"><label class="layui-form-label">采集设备</label> <div class="layui-input-block"> <select id="yxcjsbid" name="model_yxcjsb_add" lay-verify="required"></select> </div> </div> </div> </div> </div><div class="layui-form-item"><label class="layui-form-label">坐标系统</label> <div class="layui-input-block"> <select id="kjckid" name="model_kjck_add" lay-verify="required"></select> </div> </div><div class="layui-form-item"><label class="layui-form-label">所需成果</label> <div class="layui-input-block" id="sxcgid"></div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"><label class="layui-form-label">有无控制点</label> <div class="layui-input-block"> <input name="model_yxkzd_add" value="1" type="radio" title="有" checked=""> <input name="model_yxkzd_add" value="0" type="radio" title="无"> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"><label class="layui-form-label">有无kml范围</label> <div class="layui-input-block"> <input name="model_yxfw_add" value="1" type="radio" title="有" checked=""> <input name="model_yxfw_add" value="0" type="radio" title="无"> </div> </div> </div> </div> </div> <div class="layui-form-item"><label class="layui-form-label">百度云链接</label> <div class="layui-input-block"> <input type="text" name="model_yxcflj_add" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">任务详情</label> <div class="layui-input-block"> <textarea name="model_rwms_add" class="layui-textarea"></textarea> </div> </div> <div class="layui-form-item"><label class="layui-form-label">备注</label> <div class="layui-input-block"> <input type="text" name="model_bz_add" placeholder="请输入" autocomplete="off" class="layui-input"> </div> </div> <div class="layui-form-item" style="margin-top:10px"> <div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addModeltaskinfosubmit" style="width:100px">提交</button></div> </div> </form>'
                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        layer.setTop(layero);
                        //采集设备
                        if (cjsbs.length > 0) {
                            for (var i in cjsbs) {
                                document.getElementById("yxcjsbid").innerHTML += '<option value="' + cjsbs[i].value + '">' + cjsbs[i].name + '</option>';
                            }
                        }
                        //空间参考
                        if (srids.length > 0) {
                            for (var i in srids) {
                                if (srids[i].name == "China Geodetic Coordinate System 2000") {
                                    document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>'; //设置默认选择"China Geodetic Coordinate System 2000"
                                }
                                else {
                                    document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '">' + srids[i].name + '</option>';     //设置默认选择为空
                                }
                            }
                        }

                        //所需成果
                        if (sxcgs.length > 0) {
                            for (var i in sxcgs) {
                                if (sxcgs[i].name == "系统模型") {
                                    document.getElementById("sxcgid").innerHTML += '<input name="model_sxcg_add" value="' + sxcgs[i].value + '"' + 'type="checkbox" title="' + sxcgs[i].name + '" checked="">'; //设置默认选择"系统模型"
                                }
                                else {
                                    document.getElementById("sxcgid").innerHTML += '<input name="model_sxcg_add" value="' + sxcgs[i].value + '"' + 'type="checkbox" title="' + sxcgs[i].name + '">';
                                }

                            }
                        }
                        //渲染时间
                        date.render({
                            elem: '#yxcjsjid'
                        });
                        form.render();
                        form.render('select');//刷新

                        //提交——创建目标
                        form.on('submit(addModeltaskinfosubmit)', function (data) {
                            data.field.cookie = document.cookie;
                            data.field.projectid = currentprojectid;

                            $.ajax({
                                url: servicesurl + "/api/ModelTask/AddTask", type: "post", data: data.field,
                                success: function (result) {
                                    var info = JSON.parse(result);
                                    if (info.code == 1) {
                                        layer.close(modeltaskinfoaddlayerindex);

                                        //刷新项目列表
                                        GetUserAllModelProjects();
                                    }


                                    layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }, datatype: "json"
                            });
                            return false;
                        });
                    }

                    , end: function () {
                        modeltaskinfoaddlayerindex = null;
                    }
                    , cancel: function () {
                        modeltaskinfoaddlayerindex = null;
                    }
                });
            }
        }
    }
};


