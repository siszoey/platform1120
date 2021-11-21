﻿
var xiePuotext = null;

var xiePuoinfoaddlayerindex = null;
var addtimeimagelayerindex = null;
var upload = layui.upload;  
var srcInfo = {};//用来装图片地址，备注等。
var xiePuoIndex = null;
function gotoXiePuo() {
    //本面积计算方法为：将所有点转换为大地坐标BLH，然后将H赋值为最大H，再转换为空间直角坐标XYZ，取XY计算面积
    ClearTemp();
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    if (modleInfo == null) {
        layer.msg('请先选择模型');
        return;
    }
    isPoint = false;
    isLength = false;
    isHeight = false;
    isAraa = true;
    isAzimuth = false;
    isRedo = false;
    isPointLabel = false;
    isPolylineLabel = false;
    isPolygonLabel = false;
    isOccurrence = false;
    isWindowZiDingyi = false;

    if (isAraa) {
        if (handler != undefined) {
            handler.destroy();
        }

        handler = new Cesium.ScreenSpaceEventHandler(canvas);

        //左击
        handler.setInputAction(function (leftclik) {
            if (isRedo) {
                ClearTemp();
                isRedo = false;
                points = [];
            }

            var pickedOject = scene.pick(leftclik.position);
            if (pickedOject != undefined) {
                var position = scene.pickPosition(leftclik.position);
                if (position != undefined) {
                    if (Cesium.defined(position)) {
                        viewer.entities.add({
                            name: "ptMeasue" + NewGuid(),
                            position: position,
                            point: {
                                pixelSize: 10,
                                color: Cesium.Color.YELLOW,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            }
                        });
                        points.push(position);
                        if (points.length > 1) {
                            var point = points[points.length - 2];
                            //polylineOnModel("plMeasue" + NewGuid(), [point, position], 0.05, 10, Cesium.Color.AQUAMARINE);             
                            viewer.entities.add({
                                name: "plMeasue" + NewGuid(),
                                polyline: {
                                    positions: [point, position],
                                    width: 2,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: Cesium.Color.RED,
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.RED,
                                    }),
                                }
                            });
                        }
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        //移动
        handler.setInputAction(function (move) {
            if (points.length > 0) {
                //清除多边形临时边线

                var pick = viewer.scene.pick(move.endPosition);
                if (pick != undefined) {
                    var XYZ = viewer.scene.pickPosition(move.endPosition);
                    if (XYZ != undefined) {
                        //删除
                        if (viewer.entities.getById("line_temp9999") != null) {
                            viewer.entities.removeById("line_temp9999");
                        }

                        //绘制多边形临时边线
                        viewer.entities.add({
                            id: "line_temp9999",
                            polyline: {
                                positions: [points[points.length - 1], XYZ],
                                width: 2,
                                arcType: Cesium.ArcType.RHUMB,
                                material: Cesium.Color.RED,
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.RED,
                                }),
                            }
                        });

                        if (points.length > 1) {
                            //绘制多边形临时闭合线
                            if (viewer.entities.getById("line_temp9998") != null) {
                                viewer.entities.removeById("line_temp9998");
                            }
                            viewer.entities.add({
                                id: "line_temp9998",
                                polyline: {
                                    positions: [points[0], XYZ],
                                    width: 2,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: Cesium.Color.RED,
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.RED,
                                    }),
                                }
                            });
                        }
                    }
                }
            }

        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        if (isMobile.any()) {
            //双指
            handler.setInputAction(function (pinch) {
                if (points.length > 2) {
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");
                    }
                    if (viewer.entities.getById("line_temp9998") != null) {
                        viewer.entities.removeById("line_temp9998");
                    }
                    if (handler != undefined) {
                        handler.destroy();
                    }
                    viewer.entities.add({
                        name: "plMeasue" + NewGuid(),
                        polyline: {
                            positions: [points[0], points[points.length - 1]],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: Cesium.Color.RED,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.RED,
                            }),
                        }
                    });
                   DrowHuaHua("xiePuo", [], points);


                }

            }, Cesium.ScreenSpaceEventType.PINCH_START);
        }
        else {
            //右击
            handler.setInputAction(function (rightclik) {
                if (points.length > 2) {
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");
                    }
                    if (viewer.entities.getById("line_temp9998") != null) {
                        viewer.entities.removeById("line_temp9998");
                    }
                    if (handler != undefined) {
                        handler.destroy();
                    }
                    viewer.entities.add({
                        name: "plMeasue" + NewGuid(),
                        polyline: {
                            positions: [points[0], points[points.length - 1]],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: Cesium.Color.RED,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.RED,
                            }),
                        }
                    });
                    DrowHuaHua("xiePuo", [], points);
                    console.log(points);
                }

            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    }
};
function LoadSteepHillindex(id){
    ClearTemp();

    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    if (modleInfo == null) {
        layer.msg('请先选择模型');
        return;
    }
    if (xiePuoinfo == null) {
        layer.msg('请先选择斜坡');
        return;
    }
    //console.log(xiePuoinfo);
    if (xiePuoinfoaddlayerindex == null) {
        xiePuoinfoaddlayerindex = layer.open({
            type: 1
            , title: [xiePuoinfo.title + '隐患识别', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['400px', '720px']
            , shade: 0
            , offset: 'r'
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , content: xiePuoSteepHillHtml // , content: '/Apps/flz/widget/1.3 xiePuoinfoadd.html'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);


                //if (xjxzqs.length > 0) {
                //    for (var i in xjxzqs) {
                //        document.getElementById("appdId").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                //    }
                //}

                //渲染开始时间&结束时间
                date.render({
                    elem: '#xmkssjid'
                });

                form.render();
                form.render('select');
                srcInfo = {};
                form.val('xiePuoSteepHillFilter', {
                    appd: xiePuoinfo.datas.appd
                    , apjg: xiePuoinfo.datas.apjg
                    , xpbj: xiePuoinfo.datas.xpbj
                    , yxyz: xiePuoinfo.datas.yxyz
                    , ruc: xiePuoinfo.datas.ruc
                    , ytjg: xiePuoinfo.datas.ytjg
                    , ytfh: xiePuoinfo.datas.ytfh
                    , ytlh: xiePuoinfo.datas.ytlh
                    , dxdm: xiePuoinfo.datas.dxdm
                    , dzgz: xiePuoinfo.datas.dzgz
                    , gcdz: xiePuoinfo.datas.gcdz
                    , score: xiePuoinfo.datas.score
                    ,jieLun: xiePuoinfo.datas.jieLun
                });
                srcInfo = {
                      appdrest: xiePuoinfo.datas.appdrest
                    , apjgrest: xiePuoinfo.datas.apjgrest
                    , xpbjrest: xiePuoinfo.datas.xpbjrest
                    , yxyzrest: xiePuoinfo.datas.yxyzrest
                    , rucrest: xiePuoinfo.datas.rucrest
                    , ytjgrest: xiePuoinfo.datas.ytjgrest
                    , ytfhrest: xiePuoinfo.datas.ytfhrest
                    , ytlhrest: xiePuoinfo.datas.ytlhrest
                    , appdSrc: xiePuoinfo.datas.appdSrc
                    , apjgSrc: xiePuoinfo.datas.apjgSrc
                    , xpbjSrc: xiePuoinfo.datas.xpbjSrc
                    , yxyzSrc: xiePuoinfo.datas.yxyzSrc
                    , rucSrc: xiePuoinfo.datas.rucSrc
                    , ytjgSrc: xiePuoinfo.datas.ytjgSrc
                    , ytfhSrc: xiePuoinfo.datas.ytfhSrc
                    , ytlhSrc: xiePuoinfo.datas.ytlhSrc
                }
                /////////////////////
                form.on('select(appdSelect)', function (data) {
                     var datas = form.val('xiePuoSteepHillFilter');
                     gotoSrcoe(datas);
                     form.render('select');
                });
                form.on('select(apjgSelect)', function (data) {
                    var datas = form.val('xiePuoSteepHillFilter');
                    gotoSrcoe(datas);
                    form.render('select');
                });
                form.on('select(xpbjSelect)', function (data) {
                    var datas = form.val('xiePuoSteepHillFilter');
                    gotoSrcoe(datas);
                    form.render('select');
                });
                form.on('select(rucSelect)', function (data) {
                    var datas = form.val('xiePuoSteepHillFilter');
                    gotoSrcoe(datas);
                    form.render('select');
                });
                form.on('select(yxyzSelect)', function (data) {
                    var datas = form.val('xiePuoSteepHillFilter');
                    gotoSrcoe(datas);
                    form.render('select');
                });
                form.on('select(ytlhSelect)', function (data) {
                    var datas = form.val('xiePuoSteepHillFilter');
                    gotoSrcoe(datas);
                    form.render('select');
                });
                form.on('select(ytfhSelect)', function (data) {
                    var datas = form.val('xiePuoSteepHillFilter');
                    gotoSrcoe(datas);
                    form.render('select');
                });
                form.on('select(ytjgSelect)', function (data) {
                    var datas = form.val('xiePuoSteepHillFilter');
                    gotoSrcoe(datas);
                    form.render('select');
                });


                ////////////////////
                form.on('submit(xiePuoSteepHillFilterSubmit)', function (data) {
                    data.field.cookie = document.cookie;
                    data.field.id = xiePuoinfo.id.split('_')[1];
                    //备注
                    if (srcInfo.appdrest != null && srcInfo.appdrest != "") { data.field.appdrest = srcInfo.appdrest };
                    if (srcInfo.apjgrest != null && srcInfo.apjgrest != "") { data.field.apjgrest = srcInfo.apjgrest };
                    if (srcInfo.xpbjrest != null && srcInfo.xpbjrest != "") { data.field.xpbjrest = srcInfo.xpbjrest };
                    if (srcInfo.yxyzrest != null && srcInfo.yxyzrest != "") { data.field.yxyzrest = srcInfo.yxyzrest };
                    if (srcInfo.rucrest != null && srcInfo.rucrest != "") { data.field.rucrest = srcInfo.rucrest };
                    if (srcInfo.ytjgrest != null && srcInfo.ytjgrest != "") { data.field.ytjgrest = srcInfo.ytjgrest };
                    if (srcInfo.ytfhrest != null && srcInfo.ytfhrest != "") { data.field.ytfhrest = srcInfo.ytfhrest };
                    if (srcInfo.ytlhrest != null && srcInfo.ytlhrest != "") { data.field.ytlhrest = srcInfo.ytlhrest };
                    //src
                    if (srcInfo.appdSrc != null && srcInfo.appdSrc != "") { data.field.appdSrc = srcInfo.appdSrc };
                    if (srcInfo.apjgSrc != null && srcInfo.apjgSrc != "") { data.field.apjgSrc = srcInfo.apjgSrc };
                    if (srcInfo.xpbjSrc != null && srcInfo.xpbjSrc != "") { data.field.xpbjSrc = srcInfo.xpbjSrc };
                    if (srcInfo.yxyzSrc != null && srcInfo.yxyzSrc != "") { data.field.yxyzSrc = srcInfo.yxyzSrc };
                    if (srcInfo.rucSrc != null && srcInfo.rucSrc != "") { data.field.rucSrc = srcInfo.rucSrc };
                    if (srcInfo.ytjgSrc != null && srcInfo.ytjgSrc != "") { data.field.ytjgSrc = srcInfo.ytjgSrc };
                    if (srcInfo.ytfhSrc != null && srcInfo.ytfhSrc != "") { data.field.ytfhSrc = srcInfo.ytfhSrc };
                    if (srcInfo.ytlhSrc != null && srcInfo.ytlhSrc != "") { data.field.ytlhSrc = srcInfo.ytlhSrc };

                    var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                    $.ajax({
                        url: servicesurl + "/api/FlzWindowInfo/UpdateFlzSteepHill", type: "post", data: data.field,
                        success: function (result) {
                            layer.close(loadinglayerindex);
                            if (result == "更新成功") {

                                for (var m in layers) {
                                    if (layers[m].type == "XIEPUOFAT") {
                                        for (var i in layers[m].children) {
                                            if (layers[m].children[i].id == xiePuoinfo.id) {//更新游戏啊
                                                xiePuoinfo.datas = data.field;
                                                layers[m].children[i].datas = data.field;
                                                layers[m].children[i].checked = true;
                                                layers[m].children[i].spread = true;
                                                
                                                break;
                                            }
                                        }
                                        
                                    }
                                }
                                modeljiazaiFlag = false;
                                tree.reload('prjlayerlistid', { data: layers });
                                ClearTemp();

                                layer.msg("提交成功。", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });


                                //关闭
                                
                                layer.close(xiePuoinfoaddlayerindex);
                            }
                            else {
                                //更新失败
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }
                        }, datatype: "json"
                    });

                    return false;
                });
                //layui.$('#LAY-component-form-setval').on('click', function () {
                //    form.val('xiePuoSteepHillFilter', {
                //        "username": "贤心" // "name": "value"
                //        , "password": "123456"
                //        , "interest": 1
                //        , "like[write]": true //复选框选中状态
                //        , "close": true //开关状态
                //        , "sex": "女"
                //        , "desc": "我爱 layui"
                //    });
                //});

                //表单取值
                layui.$('#LAY-component-form-getval').on('click', function () {
                    var data = form.val('xiePuoSteepHillFilter');
                    if (data.apjg.length == 0) {
                        layer.msg('请选择岸坡结构');
                        return;
                    }
                    if (data.appd.length == 0) {
                        layer.msg('请选择岸坡坡度');
                        return;
                    }
                    if (data.xpbj.length == 0) {
                        layer.msg('请选择斜坡边界');
                        return;
                    }
                    if (data.ruc.length == 0) {
                        layer.msg('请选择软弱层');
                        return;
                    }
                    if (data.yxyz.length == 0) {
                        layer.msg('请选择岩性岩组');
                        return;
                    }
                    if (data.ytfh.length == 0) {
                        layer.msg('请选择岩体风化程度');
                        return;
                    }
                    if (data.ytjg.length == 0) {
                        layer.msg('请选择岩体结构');
                        return;
                    }
                    if (data.ytlh.length == 0) {
                        layer.msg('请选择岩体劣化程度');
                        return;
                    }

                    var scroe = (fenshu(data.apjg) * 0.443 + fenshu(data.appd) * 0.387 + fenshu(data.xpbj) * 0.17) * 0.241 +
                        (fenshu(data.ruc) * 0.5 + fenshu(data.yxyz) * 0.5) * 0.21 +
                        (fenshu(data.ytfh) * 0.24 + fenshu(data.ytjg) * 0.21 + fenshu(data.ytlh) * 0.55) * 0.549
                    var x = (fenshu(data.apjg) * 0.443 + fenshu(data.appd) * 0.387 + fenshu(data.xpbj) * 0.17) * 0.241;
                    var y = (fenshu(data.ruc) * 0.5 + fenshu(data.yxyz) * 0.5) * 0.21;
                    var z = (fenshu(data.ytfh) * 0.24 + fenshu(data.ytjg) * 0.21 + fenshu(data.ytlh) * 0.55) * 0.549;
                    

                    form.val('xiePuoSteepHillFilter', {
                        "dxdm": x.toFixed(4) // "name": "value"
                        , "dzgz": y.toFixed(4)
                        , "gcdz": z.toFixed(4)
                        , "score": scroe.toFixed(4)
                    });
                    //alert(JSON.stringify(data));
                });



            }
            , end: function () {
                xiePuoinfoaddlayerindex = null;
                srcInfo = {};
            }
        });
    } else {
        layer.msg('已打开隐患识别窗口');
        return;
    }


}
//带分数的切割
function fenshu(datas) {
    return parseFloat(datas.split('/')[0]) / parseFloat(datas.split('/')[1])
}
function goShangChuan(flag) {
    console.log(flag);
    console.log(1111);
    if (addtimeimagelayerindex==null) {
        var addtimeimagelayerindex = layer.open({
            type: 1
            , title: ['上传目标时序影像', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['500px', '600px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: false
            , moveOut: true
            , content: '<form class="layui-form" style="margin-top:10px" lay-filter="addtimeimageform">   <div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="image_bz_add" autocomplete="off" placeholder="" class="layui-input" /></div></div><div class="layui-form-item" style="height: 220px;"><div class="layui-upload"><div class="layui-row" style="margin-top:20px;margin-left:10px;margin-right:20px"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><button type="button" class="layui-btn-fluid  layui-btn layui-btn-primary layui-border-green" id="image_timeimage_select">1-选择影像</button></div></div><div class="layui-col-xs6"><div class="grid-demo"><button type="button" class="layui-btn-fluid layui-btn layui-btn-primary layui-border-green" id="image_timeimage_upload">2-提交上传</button></div></div></div><div class="layui-upload-list" style="height:380px;margin-top:10px;margin-left:10px;margin-right:10px;background-color:rgba(25,25,0,0.11)"><img class="layui-upload-img" id="image_timeimage_img" name="image_timeimage_img" style="width:100%;height:auto;vertical-align:middle"></div></div></div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                if (flag == 1) {
                    if (srcInfo.appdrest != null && srcInfo.appdrest != "") {
                        form.val('addtimeimageform', {
                            "image_bz_add": srcInfo.appdrest 
                        });
                    }
                    if (srcInfo.appdSrc != null && srcInfo.appdSrc != "") {
                        //document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/" + srcInfo.appdSrc+".jpg";
                        document.getElementById("image_timeimage_img").src = "http://localhost:1519/lingShi.jpg";
                    }
                }
                if (flag == 2) {
                    if (srcInfo.apjgrest != null && srcInfo.apjgrest != "") {
                        form.val('addtimeimageform', { "image_bz_add": srcInfo.apjgrest });
                    }
                    if (srcInfo.apjgSrc != null && srcInfo.apjgSrc != "") {
                        //document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/" + srcInfo.apjgSrc+".jpg"; 
                        document.getElementById("image_timeimage_img").src = "http://localhost:1519/lingShi.jpg";
                    }
                }
                if (flag == 3) {
                    if (srcInfo.xpbjrest != null && srcInfo.xpbjrest != "") {
                        form.val('addtimeimageform', { "image_bz_add": srcInfo.xpbjrest });
                    }
                    if (srcInfo.xpbjSrc != null && srcInfo.xpbjSrc != "") {
                        //document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/" + srcInfo.xpbjSrc+".jpg"; 
                        document.getElementById("image_timeimage_img").src = "http://localhost:1519/lingShi.jpg";
                    }
                }
                if (flag == 4) {
                    if (srcInfo.yxyzrest != null && srcInfo.yxyzrest != "")
                    {
                        form.val('addtimeimageform', { "image_bz_add": srcInfo.yxyzrest });
                    }
                    if (srcInfo.yxyzSrc != null && srcInfo.yxyzSrc != "") {
                        //document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/" + srcInfo.yxyzSrc+".jpg"; 
                        document.getElementById("image_timeimage_img").src = "http://localhost:1519/lingShi.jpg";
                    }
                }
                if (flag == 5) {
                    if (srcInfo.rucrest != null && srcInfo.rucrest != "")
                    {
                        form.val('addtimeimageform', { "image_bz_add": srcInfo.rucrest });
                    }
                    if (srcInfo.rucSrc != null && srcInfo.rucSrc != "") {
                        //document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/" + srcInfo.rucSrc+".jpg";
                        document.getElementById("image_timeimage_img").src = "http://localhost:1519/lingShi.jpg";
                    }
                }
                     if (flag == 6) {
                         if (srcInfo.ytjgrest != null && srcInfo.ytjgrest != "") {
                             form.val('addtimeimageform', { "image_bz_add": srcInfo.ytjgrest });
                         } if (srcInfo.ytjgSrc != null && srcInfo.ytjgSrc != "") {
                             //document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/" + srcInfo.ytjgSrc+".jpg"; 
                             document.getElementById("image_timeimage_img").src = "http://localhost:1519/lingShi.jpg";
                         }
                     }
                     if (flag == 7) {
                         if (srcInfo.ytfhrest != null && srcInfo.ytfhrest != "") {
                             form.val('addtimeimageform', { "image_bz_add": srcInfo.ytfhrest });
                         } if (srcInfo.ytfhSrc != null && srcInfo.ytfhSrc != "") {
                             //document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/" + srcInfo.ytfhSrc+".jpg"; 
                             document.getElementById("image_timeimage_img").src = "http://localhost:1519/lingShi.jpg";
                         }
                     }
                     if (flag == 8) {
                         if (srcInfo.ytlhrest != null && srcInfo.ytlhrest != "") {
                             form.val('addtimeimageform', { "image_bz_add": srcInfo.ytlhrest });
                         } if (srcInfo.ytlhSrc != null && srcInfo.ytlhSrc != "") {
                             //document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/" + srcInfo.ytlhSrc+".jpg"; 
                             document.getElementById("image_timeimage_img").src = "http://localhost:1519/lingShi.jpg";
                         }
                     }

               // $('#image_timeimage_img')[0].src = "D:/platform20210807/data/SurImage/20211117112028.jpg";
               // document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/equipment/1_2_20210714%20(3).jpg";
                
                var loadingminindex = null;
                //创建一个影像上传组件
                var uploadinst = upload.render({
                    elem: '#image_timeimage_select' //绑定元素
                    , url: servicesurl + "/api/ImageUpload/UploadXiePoImage" //上传接口
                    , data: {
                        timeimg: function () {
                            return $('#image_timeimage_img')[0].src;
                        },
                        cookie: function () {
                            return document.cookie;
                        },
                        geshi: function () {
                            return $('#image_timeimage_img')[0].src.split(',')[0];
                        }
                    }
                    , datatype: "json"
                    , accept: 'images'
                    , auto: false
                    , bindAction: '#image_timeimage_upload'
                    , multiple: false
                    , choose: function (obj) {
                        obj.preview(function (index, file, result) {
                            $('#image_timeimage_img')[0].src = result;

                            var image = new Image();
                            image.src = result;
                            image.onload = function () {
                                EXIF.getData(image, function () {
                                    var exifs = EXIF.pretty(this);
                                    imagetime = EXIF.getTag(this, "DateTime");
                                    f = EXIF.getTag(this, "FocalLength");
                                    f = f.numerator * 1.0 / f.denominator;
                                    camera = EXIF.getTag(this, "Model");
                                });
                            };
                        });
                    }
                    , before: function (obj) {
                        console.log(form.val("addtimeimageform"));
                        loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                       
                    }
                    , done: function (res) {
                        //上传完毕回调
                        if (res.code == 1) {
                            console.log(form.val("addtimeimageform"));
                            console.log(res);
                            console.log(flag);
                            layer.close(loadingminindex);
                            layer.close(addtimeimagelayerindex);
                            if (flag==1) {//岸坡上传
                                srcInfo.appdrest = form.val("addtimeimageform").image_bz_add;
                                srcInfo.appdSrc = res.data;
                            }
                            if (flag == 2) { srcInfo.apjgrest = form.val("addtimeimageform").image_bz_add; srcInfo.apjgSrc = res.data; }
                            if (flag == 3) { srcInfo.xpbjrest = form.val("addtimeimageform").image_bz_add; srcInfo.xpbjSrc = res.data; }
                            if (flag == 4) { srcInfo.yxyzrest = form.val("addtimeimageform").image_bz_add; srcInfo.yxyzSrc = res.data; }
                            if (flag == 5) { srcInfo.rucrest = form.val("addtimeimageform").image_bz_add; srcInfo.rucSrc = res.data; }
                            if (flag == 6) { srcInfo.ytjgrest = form.val("addtimeimageform").image_bz_add; srcInfo.ytjgSrc = res.data; }
                            if (flag == 7) { srcInfo.ytfhrest = form.val("addtimeimageform").image_bz_add; srcInfo.ytfhSrc = res.data; }
                            if (flag == 8) { srcInfo.ytlhrest = form.val("addtimeimageform").image_bz_add; srcInfo.ytlhSrc = res.data; }
                        }

                        layer.msg(res.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }
                    , error: function () {
                        //请求异常回调
                    }
                });
                form.render();
                form.render('select');
            }
            , end: function () { }
        });
    } else {
        layer.msg("已打开照片上传", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    }
   
}
function gotoSrcoe(data) {
    var tempc = {};
    console.log(data);
    if (data.appd.length > 0 && data.apjg.length > 0 && data.xpbj.length > 0) {//可以计算地形地貌的得分
        tempc.dxdm = (fenshu(data.apjg) * 0.443 + fenshu(data.appd) * 0.387 + fenshu(data.xpbj) * 0.17) * 0.241;
    } else {
        tempc.dxdm = '';
    }
    if (data.ruc.length > 0 && data.yxyz.length > 0) {//可以计算地形地貌的得分
        tempc.dzgz = (fenshu(data.ruc) * 0.5 + fenshu(data.yxyz) * 0.5) * 0.21;;
    } else {
        tempc.dzgz = '';
    }
    if (data.ytfh.length > 0 && data.ytlh.length > 0 && data.ytjg.length > 0) {//可以计算地形地貌的得分
        tempc.gcdz = (fenshu(data.ytfh) * 0.24 + fenshu(data.ytjg) * 0.21 + fenshu(data.ytlh) * 0.55) * 0.549;
    } else {
        tempc.gcdz = '';
    }
    if (tempc.gcdz != "" && tempc.dzgz.length != "" && tempc.dxdm.length != "") {
        tempc.score = tempc.gcdz + tempc.dzgz + tempc.dxdm;
        if (tempc.score > 0.31) {
            tempc.jieLun = "斜坡消落区发生演化可能性大";
        } else if (tempc.score < 0.25) {
            tempc.jieLun = "斜坡消落区发生演化可能性小";
        } else {
            tempc.jieLun = "斜坡消落区发生演化可能性中";
        }
    } else {
        tempc.score = '';
        tempc.jieLun = "";
    }
    console.log(tempc);
    form.val('xiePuoSteepHillFilter', {
        "dxdm": tempc.dxdm!=""?tempc.dxdm.toFixed(4):"" // "name": "value"
        , "dzgz": tempc.dzgz != "" ? tempc.dzgz.toFixed(4) : "" 
        , "gcdz": tempc.gcdz != "" ? tempc.gcdz.toFixed(4) : "" 
        , "score": tempc.score != "" ? tempc.score.toFixed(4) : "" 
        , "jieLun": tempc.jieLun
    });
    //console.log(tempc);
    return tempc;
}
//斜坡统计
function xiePuoTongji() {
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    if (xiePuoIndex!=null) {
        layer.msg("已打开斜坡；列表窗口", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    xiePuoIndex = layer.open({
        type: 1
        , title: ['斜坡信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
        , area: ['1000px', '750px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , anim: 0
        , maxmin: true
        , moveOut: true
        , content: xiepoTable
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);
            form.render();
            form.render('select');
            form.on('submit(queryXieposubmit)', function (data) {
                data.field.cookie = document.cookie;
                data.field.id = currentprojectid;
                //data.field.type = '3';
                var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                $.ajax({
                    url: servicesurl + "/api/FlzWindowInfo/GetSteepHillInfoList", type: "get", data: data.field,
                    success: function (result) {
                        layer.close(loadinglayerindex);
                        xiepotabledata = [];
                        if (result == "") {
                            //无监测剖面信息
                            xiepotableview.reload({ id: 'xiepotableviewid', data: [] });
                        }
                        else {
                            var windowInfos = JSON.parse(result);
                            var tempList = [];
                            for (var i in windowInfos) {
                                var xiepo = new Object;
                                xiepo.id = windowInfos[i].id;
                                xiepo.name = windowInfos[i].name;
                                xiepo.creatTime = windowInfos[i].creatTime;
                                xiepo.projectId = windowInfos[i].projectId;
                                xiepo.status = windowInfos[i].status;
                                xiepo.remarks = windowInfos[i].remarks;
                                xiepo.appd = windowInfos[i].appd;
                                xiepo.apjg = windowInfos[i].apjg;
                                xiepo.xpbj = windowInfos[i].xpbj;
                                xiepo.yxyz = windowInfos[i].yxyz;
                                xiepo.ruc = windowInfos[i].ruc;
                                xiepo.ytjg = windowInfos[i].ytjg;
                                xiepo.ytfh = windowInfos[i].ytfh;
                                xiepo.ytlh = windowInfos[i].ytlh;
                                xiepo.dxdm = windowInfos[i].dxdm;
                                xiepo.dzgz = windowInfos[i].dzgz;
                                xiepo.gcdz = windowInfos[i].gcdz;
                                xiepo.score = windowInfos[i].score;
                                xiepo.jieLun = windowInfos[i].jieLun;
                                xiepo.appdrest = windowInfos[i].appdrest;
                                xiepo.apjgrest = windowInfos[i].apjgrest;
                                xiepo.xpbjrest = windowInfos[i].xpbjrest;
                                xiepo.yxyzrest = windowInfos[i].yxyzrest;
                                xiepo.rucrest = windowInfos[i].rucrest;
                                xiepo.ytjgrest = windowInfos[i].ytjgrest;
                                xiepo.ytfhrest = windowInfos[i].ytfhrest;
                                xiepo.ytlhrest = windowInfos[i].ytlhrest;
                                xiepo.appdSrc = windowInfos[i].appdSrc;
                                xiepo.apjgSrc = windowInfos[i].apjgSrc;
                                xiepo.xpbjSrc = windowInfos[i].xpbjSrc;
                                xiepo.yxyzSrc = windowInfos[i].yxyzSrc;
                                xiepo.rucSrc = windowInfos[i].rucSrc;
                                xiepo.ytjgSrc = windowInfos[i].ytjgSrc;
                                xiepo.ytfhSrc = windowInfos[i].ytfhSrc;
                                xiepo.ytlhSrc = windowInfos[i].ytlhSrc;
                                xiepotabledata.push(xiepo);
                                //var postionList = JSON.parse(windowInfos[i].postion);
                                //if (xiepo.avgOpening != "0.0020") {
                                //    postionList.push(postionList[0]);
                                //    console.log(windowInfos[i].name);
                                //    console.log(postionList[0]);
                                //}
                                //tempList.push(postionList);
                            }
                            xiepotableview.reload({ id: 'xiepotableviewid', data: xiepotabledata });
                        }
                    }, datatype: "json"
                });
                return false;
            });
        }
        , end: function () {
            xiePuoIndex = null;
        }
    });

    var xiepotabledata = [];
    var xiepotableview = table.render({
        elem: '#xiepotable-view'
        , id: 'xiepotableviewid'
        , title: '斜坡信息'
        , skin: 'line'
        , even: false
        , page: true
        , limit: 10
        , toolbar: true
        , totalRow: false
        , initSort: { field: 'id', type: 'desc' }
        , cols: [[
            { field: 'id', title: 'ID', hide: true }
            , { field: 'name', title: '斜坡名称', width: 120, align: "center", totalRowText: '合计' }
            , { field: 'dxdm', title: '地形地貌得分', width: 120, sort: true, align: "center", totalRow: true }
            , { field: 'dzgz', title: '地质构造得分', width: 120, sort: true, align: "center", totalRow: true }
            , { field: 'gcdz', title: '工程地质得分', width: 120, sort: true, align: "center", totalRow: true }
            , { field: 'score', title: '斜坡得分', width: 120, sort: true, align: "center", totalRow: true }
            , { field: 'jieLun', title: '斜坡结果', width: 200,  align: "center" }
            , { fixed: 'right', width: 180, align: 'center', toolbar: '#processedPatrolButon' }
        ]]
        , data: []
    });
    table.on('tool(xiepotable-view)', function (obj) {
        console.log(obj);
        if (obj.event === 'detail') {

        }
    });
    var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
    $.ajax({
        url: servicesurl + "/api/FlzWindowInfo/GetSteepHillInfoList", type: "get", data: {
            "id": currentprojectid,
            "cookie": document.cookie,
        },
        success: function (data) {
            layer.close(loadinglayerindex);
            xiepotabledata = [];
            if (data == "") {
                //无监测剖面信息
                xiepotableview.reload({ id: 'xiepotableviewid', data: xiepotabledata });
            }
            else {
                var windowInfos = JSON.parse(data);
                for (var i in windowInfos) {
                    var xiepo = new Object;
                    xiepo.id = windowInfos[i].id;
                    xiepo.name = windowInfos[i].name;
                    xiepo.creatTime = windowInfos[i].creatTime;
                    xiepo.projectId = windowInfos[i].projectId;
                    xiepo.status = windowInfos[i].status;
                    xiepo.remarks = windowInfos[i].remarks;
                    xiepo.appd = windowInfos[i].appd;
                    xiepo.apjg = windowInfos[i].apjg;
                    xiepo.xpbj = windowInfos[i].xpbj;
                    xiepo.yxyz = windowInfos[i].yxyz;
                    xiepo.ruc = windowInfos[i].ruc;
                    xiepo.ytjg = windowInfos[i].ytjg;
                    xiepo.ytfh = windowInfos[i].ytfh;
                    xiepo.ytlh = windowInfos[i].ytlh;
                    xiepo.dxdm = windowInfos[i].dxdm;
                    xiepo.dzgz = windowInfos[i].dzgz;
                    xiepo.gcdz = windowInfos[i].gcdz;
                    xiepo.score = windowInfos[i].score;
                    xiepo.jieLun = windowInfos[i].jieLun;
                    xiepo.appdrest = windowInfos[i].appdrest;
                    xiepo.apjgrest = windowInfos[i].apjgrest;
                    xiepo.xpbjrest = windowInfos[i].xpbjrest;
                    xiepo.yxyzrest = windowInfos[i].yxyzrest;
                    xiepo.rucrest = windowInfos[i].rucrest;
                    xiepo.ytjgrest = windowInfos[i].ytjgrest;
                    xiepo.ytfhrest = windowInfos[i].ytfhrest;
                    xiepo.ytlhrest = windowInfos[i].ytlhrest;
                    xiepo.appdSrc = windowInfos[i].appdSrc;
                    xiepo.apjgSrc = windowInfos[i].apjgSrc;
                    xiepo.xpbjSrc = windowInfos[i].xpbjSrc;
                    xiepo.yxyzSrc = windowInfos[i].yxyzSrc;
                    xiepo.rucSrc = windowInfos[i].rucSrc;
                    xiepo.ytjgSrc = windowInfos[i].ytjgSrc;
                    xiepo.ytfhSrc = windowInfos[i].ytfhSrc;
                    xiepo.ytlhSrc = windowInfos[i].ytlhSrc;
                    xiepotabledata.push(xiepo);
                }
                xiepotableview.reload({ id: 'xiepotableviewid', data: xiepotabledata });
            }
        }, datatype: "json"
    });
}