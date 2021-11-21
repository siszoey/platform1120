/*
 * 地图
 */
var baseMaps = new Array(
    new Cesium.ProviderViewModel({
        name: '天地图矢量',
        iconUrl: Cesium.buildModuleUrl('../../Resources/img/cesium/chinaVector.png'),
        tooltip: '天地图全球矢量地图服务',
        creationFunction: function () {
            var imageryProviders = [];
            //天地图矢量
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=138994fd58a355f0f5d7b6d5bfe4d840",
                layer: "tdtVecBasicLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
            }));
            //天地图矢量中文标注
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=138994fd58a355f0f5d7b6d5bfe4d840",
                layer: "tdtAnnoLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible"
            }));
            return imageryProviders;
        }
    }),
    new Cesium.ProviderViewModel({
        name: '天地图影像',
        iconUrl: Cesium.buildModuleUrl('../../Resources/img/cesium/chinaImage.png'),
        tooltip: '天地图全球影像地图服务',
        creationFunction: function () {
            var imageryProviders = [];
            //天地图影像
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=138994fd58a355f0f5d7b6d5bfe4d840",
                layer: "tdtBasicLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
                maximumLevel: 16,
            }));
            //天地图影像中文标注
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=138994fd58a355f0f5d7b6d5bfe4d840",
                layer: "tdtAnnoLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
                maximumLevel: 16,
            }));
            return imageryProviders;
        }
    }),
    new Cesium.ProviderViewModel({
        name: '天地图影像（重庆）',
        iconUrl: Cesium.buildModuleUrl('../../Resources/img/cesium/cqImage.png'),
        creationFunction: function () {
            var imageryProviders = [];
            //天地图影像（底图）
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=138994fd58a355f0f5d7b6d5bfe4d840",
                layer: "tdtBasicLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
                maximumLevel: 16,
            }));

            //重庆天地图
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://www.digitalcq.com/tianditu/kxrgo/d4028ca7ce8e4853b868d205426993a4/WMTS/tile/1.0.0/TDT_CQMap_IMG/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}",
                layer: "TDT_CQMap_IMG",
                style: "default",
                tileMatrixSetID: "default028mm",
                format: "image/jpgpng",
                tilingScheme: new Cesium.GeographicTilingScheme(),
                maximumLevel: 17,
                tileMatrixLabels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
            }));

            ////重庆天地图注记
            //imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
            //    url: "http://www.digitalcq.com/tianditu/ewfwz/a31647270b994833b1d291c44790de69/WMTS/tile/1.0.0/TDT_CQMap_IMG_LABEL/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}",
            //    layer: "TDT_CQMap_IMG_LABEL",
            //    style: "default",
            //    tileMatrixSetID: "default028mm",
            //    format: "image/jpgpng",
            //    tilingScheme: new Cesium.GeographicTilingScheme(),
            //    maximumLevel: 17,
            //    tileMatrixLabels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
            //}));

            //天地图影像中文标注
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=138994fd58a355f0f5d7b6d5bfe4d840",
                layer: "tdtAnnoLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
                //maximumLevel: 16,
            }));

            return imageryProviders;
        }
    }),
    new Cesium.ProviderViewModel({
        name: 'Google影像',
        iconUrl: Cesium.buildModuleUrl('../../Resources/img/cesium/google_earth_pro.ico'),
        creationFunction: function () {
            var imageryProviders = [];
            //Google影像
            imageryProviders.push(new Cesium.UrlTemplateImageryProvider({
                url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
            }));
            //天地图影像中文标注
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=138994fd58a355f0f5d7b6d5bfe4d840",
                layer: "tdtAnnoLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
                //maximumLevel: 16,
            }));
            return imageryProviders;
        }
    }),
    new Cesium.ProviderViewModel({
        name: 'Bing影像',
        iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerialLabels.png'),
        creationFunction: function () {
            return new Cesium.BingMapsImageryProvider({
                key: "AsIZsAbumjggRVNlqygRPotPRyU9S8hWadxcxfdOafquIz7JfxtxNwudfFZ68P1i",
                url: 'https://dev.virtualearth.net',
                mapStyle: Cesium.BingMapsStyle.AERIAL_WITH_LABELS
            });
        }
    }),
    new Cesium.ProviderViewModel({
        name: 'Mapbox卫星',
        iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapboxSatellite.png'),
        creationFunction: function () {
            return new Cesium.MapboxImageryProvider({
                mapId: 'mapbox.satellite'
            });
        }
    }),
    new Cesium.ProviderViewModel({
        name: 'ESRI影像',
        iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldImagery.png'),
        creationFunction: function () {
            return new Cesium.ArcGisMapServerImageryProvider({
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
                enablePickFeatures: false
            });
        }
    }),
    //new Cesium.ProviderViewModel({
    //    name: 'ESRI街道',
    //    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldStreetMap.png'),
    //    creationFunction: function () {
    //        return new Cesium.ArcGisMapServerImageryProvider({
    //            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
    //            enablePickFeatures: false
    //        });
    //    }
    //}),
    //new Cesium.ProviderViewModel({
    //    name: 'ESRI National Geographic',
    //    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriNationalGeographic.png'),
    //    creationFunction: function () {
    //        return new Cesium.ArcGisMapServerImageryProvider({
    //            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/',
    //            enablePickFeatures: false
    //        });
    //    }
    //}),
    //new Cesium.ProviderViewModel({
    //    name: 'OSM',
    //    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
    //    creationFunction: function () {
    //        return Cesium.createOpenStreetMapImageryProvider({
    //            url: 'https://a.tile.openstreetmap.org/'
    //        });
    //    }
    //}),
    //new Cesium.ProviderViewModel({
    //    name: 'Stamen Watercolor',
    //    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenWatercolor.png'),
    //    creationFunction: function () {
    //        return Cesium.createOpenStreetMapImageryProvider({
    //            url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/',
    //            credit: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
    //        });
    //    }
    //}),
    //new Cesium.ProviderViewModel({
    //    name: 'Stamen Toner',
    //    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenToner.png'),
    //    creationFunction: function () {
    //        return Cesium.createOpenStreetMapImageryProvider({
    //            url: 'https://stamen-tiles.a.ssl.fastly.net/toner/',
    //            credit: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
    //        });
    //    }
    //}),
    //new Cesium.ProviderViewModel({
    //    name: 'BlackMarble',
    //    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/earthAtNight.png'),
    //    creationFunction: function () {
    //        return Cesium.createTileMapServiceImageryProvider({
    //            url: 'https://cesiumjs.org/blackmarble',
    //            flipXY: true,
    //            credit: 'Black Marble imagery courtesy NASA Earth Observatory'
    //        });
    //    }
    //}),
    //new Cesium.ProviderViewModel({
    //    name: 'Google',
    //    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/naturalEarthII.png'),
    //    creationFunction: function () {
    //        return new Cesium.UrlTemplateImageryProvider({
    //            url: 'http://www.google.cn/maps/vt?lyrs=s@800&x={x}&y={y}&z={z}',
    //            tilingScheme: new Cesium.WebMercatorTilingScheme(),
    //            minimumLevel: 1,
    //            maximumLevel: 20,
    //            credit: 'http://www.bjxbsj.cn',
    //        });
    //    }
    //})
);

/*
 * 地形
 */
var baseTerrains = Cesium.createDefaultTerrainProviderViewModels();
baseTerrains[0].name = "WGS84 椭球体";
baseTerrains[0].tooltip = "";
baseTerrains[1].name = "STK 世界地形";
baseTerrains[1].tooltip = "";

/*
 * token
 */
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNDc5ZGE1NS1iOGI4LTRkMDAtODA1OC0xOTMwN2Y3M2QyZTIiLCJpZCI6MTAyOCwic2NvcGVzIjpbImFzbCIsImFzciIsImFzdyIsImdjIiwicHIiXSwiaWF0IjoxNTg1NTU0NzQyfQ.CUFsgTc17aKqruesY_plpr4l1FzqsSsWMXh1FK2fwfg';


/*
 * 初始化viewer
 */
viewer = new Cesium.Viewer("map", {
    homeButton: true,
    animation: false,
    baseLayerPicker: true,
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    infoBox: true,
    sceneModePicker: false,
    selectionIndicator: true,
    timeline: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    imageryProviderViewModels: baseMaps,
    selectedImageryProviderViewModel: baseMaps[2],
    terrainProviderViewModels: baseTerrains,
    selectedTerrainProviderViewModel: baseTerrains[1],
    orientation: {
        // 指向
        heading: Cesium.Math.toRadians(90, 0),
        // 视角
        pitch: Cesium.Math.toRadians(-90),
        roll: 0.0
    }
});


/*
 * 修改
 */
viewer._cesiumWidget._creditContainer.style.display = "none";           //隐藏版权信息
viewer.scene.globe.enableLighting = false;                              //日夜区分
viewer.scene.globe.depthTestAgainstTerrain = false;
viewer.homeButton.viewModel.tooltip = "初始视图";
viewer.baseLayerPicker.viewModel.buttonTooltip = "地图及地形";
viewer.baseLayerPicker.viewModel.toggleDropDown.afterExecute.addEventListener(function () {
    if (viewer.baseLayerPicker.viewModel.dropDownVisible) {
        for (var i in document.getElementsByClassName("cesium-baseLayerPicker-sectionTitle")) {
            if (document.getElementsByClassName("cesium-baseLayerPicker-sectionTitle")[i].innerText == "Imagery") {
                document.getElementsByClassName("cesium-baseLayerPicker-sectionTitle")[i].innerText = "地图";
            }
            else if (document.getElementsByClassName("cesium-baseLayerPicker-sectionTitle")[i].innerText == "Terrain") {
                document.getElementsByClassName("cesium-baseLayerPicker-sectionTitle")[i].innerText = "地形";
            }
        }
    }
});

//重写HomeButton功能
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
    e.cancel = true;
    if (projectentities.length > 0) {
        viewer.flyTo(projectentities, { duration: 5, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 3000) });
    }
    else {
        //缩放至中国
        FlyToChina();
    }
});


/*
 * 修改样式
 */
document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:80px;top:30px;width:80px;height:60px ";
document.getElementsByClassName("cesium-button cesium-toolbar-button")[0].style = "width:30px;height:30px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[1].style = "width:30px;height:30px";
//document.getElementsByClassName("cesium-baseLayerPicker-selected")[0].style = "width:50px;height:50px";
/*
 * 扩展
 */
viewer.extend(Cesium.viewerCesiumNavigationMixin, {});                                          //扩展导航功能
document.getElementsByClassName("navigation-controls")[0].style = "visibility:hidden";          //修改工具栏样式
document.getElementsByClassName("compass")[0].style = "top:10px";
//初始定位
setTimeout(FlyToChina(), 3000);
function FlyToChina() {
    viewer.camera.flyTo({
        destination: new Cesium.Rectangle.fromDegrees(73.66, 3.86, 135.05, 53.55)               //定位中国
    }, { duration: 3 });
};




/*
 * 加载3d tiles模型
 */
function LoadModel(obj) {
    //var modelurl = "../Data/SurModel" + obj.path;
    var modelurl = datasurl + "/SurModel" + obj.path;
    //if (obj.MXST != null) {
    //    //使用设置的最优视图
    //}
    //else {
    //    //设置视图
    //    $.getJSON(modelurl, function (data) {
    //        var arry = data.root.boundingVolume.box;
    //        console.log(arry);
    //        var boundingSphere = new Cesium.BoundingSphere(new Cesium.Cartesian3(arry[0], arry[1], arry[2]), arry[3]+1000);

    //        //home按钮功能
    //        viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (commandInfo) {
    //            viewer.camera.flyToBoundingSphere(boundingSphere);
    //            commandInfo.cancel = true;
    //        });

    //        //设置初始位置
    //        viewer.camera.flyToBoundingSphere(boundingSphere, { duration: 1 });
    //    });
    //}

    //删除上一个模型（保证只有一个模型）
    if (curtileset != null) {
        viewer.scene.primitives.remove(curtileset);
    }

    //添加模型
    curtileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: modelurl,
        maximumScreenSpaceError: isMobile.any() ? 1 : 1,
        maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
    }));

    //缩放至模型
    viewer.zoomTo(curtileset,new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 0));

    //tree.reload('prjlayerlistid', { data: layers });
};


//移动端判断
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
var jsondata = {"displayFieldName":"","fieldAliases":{"FID":"FID","Layer":"Layer","Elevation":"Elevation","PM":"PM","序号":"序号","start_X":"start_X","start_Y":"start_Y","end_X":"end_X","end_Y":"end_Y"},"geometryType":"esriGeometryPolyline","spatialReference":{"wkid":4545,"latestWkid":4545},"fields":[{"name":"FID","type":"esriFieldTypeOID","alias":"FID"},{"name":"Layer","type":"esriFieldTypeString","alias":"Layer","length":254},{"name":"Elevation","type":"esriFieldTypeDouble","alias":"Elevation"},{"name":"PM","type":"esriFieldTypeString","alias":"PM","length":50},{"name":"序号","type":"esriFieldTypeInteger","alias":"序号"},{"name":"start_X","type":"esriFieldTypeDouble","alias":"start_X"},{"name":"start_Y","type":"esriFieldTypeDouble","alias":"start_Y"},{"name":"end_X","type":"esriFieldTypeDouble","alias":"end_X"},{"name":"end_Y","type":"esriFieldTypeDouble","alias":"end_Y"}],"features":[{"attributes":{"FID":0,"Layer":"一般区剖面","Elevation":151.72193417599999,"PM":"51-51'","序号":51,"start_X":562477.76856400003,"start_Y":3425911.7690099999,"end_X":562412.45848599996,"end_Y":3425774.82326},"geometry":{"paths":[[[562477.7685636566,3425911.7690102081],[562412.45848554862,3425774.8232581466]]]}},{"attributes":{"FID":1,"Layer":"一般区剖面","Elevation":84.3116131803,"PM":"193 - 193'","序号":193,"start_X":596206.54169400001,"start_Y":3424818.5868299999,"end_X":596123.89694500004,"end_Y":3424801.9046999998},"geometry":{"paths":[[[596206.54169402434,3424818.5868314756],[596123.89694516431,3424801.9046972319]]]}},{"attributes":{"FID":2,"Layer":"一般区剖面","Elevation":57.413781967699997,"PM":"277-277'","序号":277,"start_X":575628.75577399996,"start_Y":3423539.43934,"end_X":575581.20401999995,"end_Y":3423571.61344},"geometry":{"paths":[[[575628.75577426457,3423539.4393381584],[575581.20402021846,3423571.6134433826]]]}}]};
//var jsondata = JSON.parse(jsontext);
//console.log(jsontext)

