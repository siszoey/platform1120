﻿ //任务
function ModelTaskInfo(id, style) {
    if (style == "view") {
        //查看目标
        if (modeltaskinfoviewlayerindex == null) {
            modeltaskinfoviewlayerindex = layer.open({
                type: 1
                , title: ['查看任务', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['750px', '620px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--查看任务--> <form class="layui-form" style="margin-top:5px;margin-right:10px;" lay-filter="viewModeltaskinfoform"> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">任务名称</label> <div class="layui-input-block"> <input type="text" name="model_rwmc_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">任务编码</label> <div class="layui-input-block"> <input type="text" name="model_rwbm_view" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">采集人员</label> <div class="layui-input-block"> <input type="text" name="model_yxcjry_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">影像数量</label> <div class="layui-input-block"> <input type="text" name="model_yxsl_view" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">采集时间</label> <div class="layui-input-block"> <input type="text" id="yxcjsjid" name="model_yxcjsj_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">坐标系统</label> <div class="layui-input-block"> <input type="text" name="model_kjck_view" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">采集设备</label> <div class="layui-input-block"> <input type="text" name="model_yxcjsb_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">目标成果</label> <div class="layui-input-block" id="sxcgid"> <input type="text" name="model_sxcg_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">控制点</label> <div class="layui-input-block"> <input type="text" name="model_yxkzd_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">范围</label> <div class="layui-input-block"> <input type="text" name="model_yxfw_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">影像链接</label> <div class="layui-input-block"> <input type="text" name="model_yxcflj_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">任务描述</label> <div class="layui-input-block"> <input type="text" name="model_rwms_view" readonly="readonly" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">成果链接</label> <div class="layui-input-block"> <input type="text" name="model_cgxzlj_view" readonly="readonly" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">模型描述</label> <div class="layui-input-block"> <input type="text" name="model_mxms_view" readonly="readonly" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">备注</label> <div class="layui-input-block"> <input type="text" name="model_bz_view" readonly="readonly" class="layui-input"> </div> </div> </form>'
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
                                    "model_rwmc_view": taskinfo.RWMC
                                    , "model_rwbm_view": taskinfo.RWBM
                                    , "model_yxcjry_view": taskinfo.YXCJRY
                                    , "model_yxcjsj_view": taskinfo.YXCJSJ
                                    , "model_yxsl_view": taskinfo.YXSL
                                    , "model_yxkzd_view": taskinfo.YXKZD
                                    , "model_yxfw_view": taskinfo.YXFW
                                    , "model_yxcflj_view": taskinfo.YXCFLJ
                                    , "model_rwms_view": taskinfo.RWMS
                                    , "model_cgxzlj_view": taskinfo.CGXZLJ
                                    , "model_mxms_view": taskinfo.MXMS
                                    , "model_bz_view": taskinfo.BZ
                                    
                                });
                                //采集设备
                                if (cjsbs.length > 0) {
                                    for (var i in cjsbs) {
                                        if (cjsbs[i].value == taskinfo.YXCJSB) {
                                            form.val("viewModeltaskinfoform", {
                                                "model_yxcjsb_view": cjsbs[i].name
                                            });
                                        }
                                    }
                                }
                                //翻译目标类型、空间参考
                                if (srids.length > 0) {
                                    for (i in srids) {
                                        if (srids[i].value == taskinfo.SRID) {
                                            form.val("viewModeltaskinfoform", {
                                                "model_kjck_view": srids[i].name
                                            });
                                        }
                                    }
                                }
                                //所需成果
                                if (sxcgs.length > 0) {
                                    var Sxcg = taskinfo.SXCG.trim().split(",");
                                    var sxcgdata = "";
                                    for (var i in Sxcg) {
                                        for (var j in sxcgs) {
                                            if (sxcgs[j].value == Sxcg[i]) {

                                                sxcgdata += sxcgs[j].name+"；";
                                            }
                                        }
                                    }
                                    form.val("viewModeltaskinfoform", {
                                        "model_sxcg_view": sxcgdata
                                    });
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
                , title: ['编辑任务', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['750px', '650px']
                , shade: 0
                , offset: 'auto'
                , maxmin: true
                , closeBtn: 1
                , moveOut: true
                , content: '<!--编辑任务--> <form class="layui-form" style="margin-top:5px;margin-right:10px;" lay-filter="editModeltaskinfoform"> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">*任务名称</label> <div class="layui-input-block"> <input type="text" name="model_rwmc_edit" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">*任务编码</label> <div class="layui-input-block"> <input type="text" name="model_rwbm_edit" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">*采集人员</label> <div class="layui-input-block"> <input type="text" name="model_yxcjry_edit" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">*影像数量</label> <div class="layui-input-block"> <input type="text" name="model_yxsl_edit" autocomplete="off" placeholder="请输入数字" lay-verify="required|number" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">*采集时间</label> <div class="layui-input-block"> <input type="text" id="yxcjsjid" name="model_yxcjsj_edit" lay-verify="required|date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">*坐标系统</label> <div class="layui-input-block"> <select id="kjckid" name="model_kjck_edit" lay-verify="required"></select> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">*采集设备</label> <div class="layui-input-block"> <select id="yxcjsbid" name="model_yxcjsb_edit" lay-verify="required"></select> </div> </div> </div> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">*目标成果</label> <div class="layui-input-block" id="sxcgid"></div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">*控制点</label> <div class="layui-input-block"> <input type="text" name="model_yxkzd_edit" autocomplete="off" placeholder="请输入txt格式" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">*范围</label> <div class="layui-input-block"> <input type="text" name="model_yxfw_edit" autocomplete="off" placeholder="请输入kml格式" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">*影像链接</label> <div class="layui-input-block"> <input type="text" name="model_yxcflj_edit" autocomplete="off" placeholder="请输入影像链接" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">任务描述</label> <div class="layui-input-block"> <input type="text" name="model_rwms_edit" autocomplete="off" placeholder="请输入" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">*成果链接</label> <div class="layui-input-block"> <input type="text" name="model_cgxzlj_edit" autocomplete="off" placeholder="请输入" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">模型描述</label> <div class="layui-input-block"> <input type="text" name="model_mxms_edit" autocomplete="off" placeholder="请输入" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">备注</label> <div class="layui-input-block"> <input type="text" name="model_bz_edit" placeholder="请输入备注" autocomplete="off" class="layui-input"> </div> </div> <div class="layui-form-item" style="margin-top:10px"> <div style="position:absolute;right:15px;"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editModeltaskinfosubmit" style="width:100px">提交</button> </div> </div> </form>'
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
                                form.val("editModeltaskinfoform", {
                                    "model_rwmc_edit": taskinfo.RWMC
                                    , "model_rwbm_edit": taskinfo.RWBM
                                    , "model_yxcjry_edit": taskinfo.YXCJRY
                                    , "model_yxcjsj_edit": taskinfo.YXCJSJ
                                    , "model_yxsl_edit": taskinfo.YXSL
                                    , "model_yxkzd_edit": taskinfo.YXKZD
                                    , "model_yxfw_edit": taskinfo.YXFW
                                    , "model_yxcflj_edit": taskinfo.YXCFLJ
                                    , "model_rwms_edit": taskinfo.RWMS
                                    , "model_cgxzlj_edit": taskinfo.CGXZLJ
                                    , "model_mxms_edit": taskinfo.MXMS
                                    , "model_bz_edit": taskinfo.BZ
                                });

                                //采集设备
                                if (cjsbs.length > 0) {
                                    for (var i in cjsbs) {
                                        if (cjsbs[i].value == taskinfo.YXCJSB) {
                                            document.getElementById("yxcjsbid").innerHTML += '<option value="' + cjsbs[i].value + '" selected">' + cjsbs[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("yxcjsbid").innerHTML += '<option value="' + cjsbs[i].value + '">' + cjsbs[i].name + '</option>';
                                        }
                                    }
                                }
                                //空间参考
                                if (srids.length > 0) {
                                    for (var i in srids) {
                                        if (srids[i].value == taskinfo.SRID) {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>'; //设置默认选择"China Geodetic Coordinate System 2000"
                                        }
                                        else {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '">' + srids[i].name + '</option>';     //设置默认选择为空
                                        }
                                    }
                                }

                                //所需成果
                                if (sxcgs.length > 0) {
                                    var Sxcg = taskinfo.SXCG.trim();
                                    for (var i in sxcgs) {
                                        if (Sxcg.includes(sxcgs[i].value)) {
                                            document.getElementById("sxcgid").innerHTML += '<input name="model_sxcg_edit" value="' + sxcgs[i].value + '"' + 'type="checkbox" title="' + sxcgs[i].name + '" checked="">'; //设置默认选择"系统模型"
                                        }
                                        else {
                                            document.getElementById("sxcgid").innerHTML += '<input name="model_sxcg_edit" value="' + sxcgs[i].value + '"' + 'type="checkbox" title="' + sxcgs[i].name + '">';
                                        }

                                    }
                                }
                                //渲染时间
                                date.render({
                                    elem: '#yxcjsjid'
                                });

                                form.render();
                                form.render('select');
                            }

                            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });

                    //保存编辑--更新目标信息
                    form.on('submit(editModeltaskinfosubmit)', function (data) {
                        //将页面全部复选框选中的值拼接到一个数组中
                        var arr_box = [];
                        $('input[name=model_sxcg_edit]:checked').each(function () {
                            arr_box.push($(this).val());
                        });
                        data.field.cookie = document.cookie;
                        data.field.id = id;
                        data.field.model_sxcg_edit = arr_box.toString();
                        
                        $.ajax({
                            url: servicesurl + "/api/ModelTask/UpdateTaskInfo", type: "put", data: data.field,
                            success: function (result) {
                                var info = JSON.parse(result);
                                layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                layer.close(modeltaskinfoeditlayerindex);  //关闭模块
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
            if (modeltaskinfoaddlayerindex == null){
                modeltaskinfoaddlayerindex = layer.open({
                    type: 1
                    , title: ['新建任务', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                    , area: ['775px', '565px']
                    , shade: 0
                    , offset: 'auto'
                    , closeBtn: 1
                    , maxmin: true
                    , moveOut: true
                    , content: '<!--创建任务--> <form class="layui-form" style="margin-top:5px;margin-right:10px;" lay-filter="addModeltaskinfoform"> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">*任务名称</label> <div class="layui-input-block"> <input type="text" name="model_rwmc_add" autocomplete="off" placeholder="航测对象具体描述，如：XX镇XX滑坡" lay-verify="required" class="layui-input" /> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">*采集时间</label> <div class="layui-input-block"> <input type="text" id="yxcjsjid" name="model_yxcjsj_add" lay-verify="required|date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">*影像数量</label> <div class="layui-input-block"> <input type="text" name="model_yxsl_add" autocomplete="off" placeholder="请输入数字" lay-verify="required|number" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">*坐标系统</label> <div class="layui-input-block"> <select id="kjckid" name="model_kjck_add" lay-verify="required"></select> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" style="font-weight:bold">*采集设备</label> <div class="layui-input-block"> <select id="yxcjsbid" name="model_yxcjsb_add" lay-verify="required"></select> </div> </div> </div> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">*目标成果</label> <div class="layui-input-block" id="sxcgid"></div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">*控制点</label> <div class="layui-input-block"> <input type="text" name="model_yxkzd_add" autocomplete="off" placeholder="请输入txt格式" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">*范围</label> <div class="layui-input-block"> <input type="text" name="model_yxfw_add" autocomplete="off" placeholder="请输入kml格式" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">*影像链接</label> <div class="layui-input-block"> <input type="text" name="model_yxcflj_add" autocomplete="off" lay-verify="required" placeholder="请输入影像链接" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" style="font-weight:bold">任务描述</label> <div class="layui-input-block"> <textarea name="model_rwms_add" class="layui-textarea" placeholder="请输入任务描述信息"></textarea> </div> </div> <div class="layui-form-item" style="margin-top:10px"> <div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addModeltaskinfosubmit" style="width:100px">提交</button></div> </div> </form>'
                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        layer.setTop(layero);
                        //采集设备
                        if (cjsbs.length > 0) {
                            for (var i in cjsbs) {
                                if (cjsbs[i].name == "精灵 PHANTOM 4 RTK") {
                                    document.getElementById("yxcjsbid").innerHTML += '<option value="' + cjsbs[i].value + '" selected">' + cjsbs[i].name + '</option>';
                                }
                                else {
                                    document.getElementById("yxcjsbid").innerHTML += '<option value="' + cjsbs[i].value + '">' + cjsbs[i].name + '</option>';
                                }
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
                            //将页面全部复选框选中的值拼接到一个数组中
                            var arr_box = [];
                            $('input[name=model_sxcg_add]:checked').each(function () {
                                arr_box.push($(this).val());
                            });
                            data.field.cookie = document.cookie;
                            data.field.projectid = currentprojectid;
                            data.field.model_sxcg_add = arr_box.toString();
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


