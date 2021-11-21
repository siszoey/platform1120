/** layui-v2.5.6 MIT License By https://www.layui.com */
 ;layui.define("form",function(e){"use strict";var i=layui.$,a=layui.form,n=layui.layer,t="tree",r={config:{},index:layui[t]?layui[t].index+1e4:0,set:function(e){var a=this;return a.config=i.extend({},a.config,e),a},on:function(e,i){return layui.onevent.call(this,t,e,i)}},c=function(){var e=this,i=e.config,a=i.id||e.index;return c.that[a]=e,c.config[a]=i,{config:i,reload:function(i){e.reload.call(e,i)},getChecked:function(){return e.getChecked.call(e)},setChecked:function(i){return e.setChecked.call(e,i)}}},l="layui-hide",d="layui-disabled",o="layui-tree-set",s="layui-tree-iconClick",u="layui-icon-addition",h="layui-icon-subtraction",p="layui-tree-entry",y="layui-tree-main",f="layui-tree-txt",v="layui-tree-pack",k="layui-tree-spread",m="layui-tree-setLineShort",C="layui-tree-showLine",x="layui-tree-lineExtend",b=function(e){var a=this;a.index=++r.index,a.config=i.extend({},a.config,r.config,e),a.render()};b.prototype.config={data:[],showCheckbox:!1,showLine:!0,accordion:!1,onlyIconControl:!1,isJump:!1,edit:!1,customSpread:!1,customCheckbox:!1,customOperate:!1,text:{defaultNodeName:"未命名",none:"无数据"}},b.prototype.reload=function(e){var a=this;layui.each(e,function(e,i){i.constructor===Array&&delete a.config[e]}),a.config=i.extend(!0,{},a.config,e),a.render()},b.prototype.render=function(){var e=this,a=e.config;e.checkids=[];var n=i('<div class="layui-tree'+(a.showCheckbox?" layui-form":"")+(a.showLine?" layui-tree-line":"")+'" lay-filter="LAY-tree-'+e.index+'"></div>');e.tree(n);var t=a.elem=i(a.elem);if(t[0]){if(e.key=a.id||e.index,e.elem=n,e.elemNone=i('<div class="layui-tree-emptyText">'+a.text.none+"</div>"),t.html(e.elem),0==e.elem.find(".layui-tree-set").length)return e.elem.append(e.elemNone);a.showCheckbox&&e.renderForm("checkbox"),e.elem.find(".layui-tree-set").each(function(){var e=i(this);e.parent(".layui-tree-pack")[0]||e.addClass("layui-tree-setHide"),!e.next()[0]&&e.parents(".layui-tree-pack").eq(1).hasClass("layui-tree-lineExtend")&&e.addClass(m),e.next()[0]||e.parents(".layui-tree-set").eq(0).next()[0]||e.addClass(m)}),e.events()}},b.prototype.renderForm=function(e){a.render(e,"LAY-tree-"+this.index)},b.prototype.tree=function(e,a){var n=this,t=n.config,r=a||t.data;layui.each(r,function(a,r){var c=r.children&&r.children.length>0,s=i('<div class="layui-tree-pack" '+(r.spread?'style="display: block;"':"")+'"></div>'),u=i(['<div data-id="'+r.id+'" class="layui-tree-set'+(r.spread?" layui-tree-spread":"")+(r.checked?" layui-tree-checkedFirst":"")+'">','<div class="layui-tree-entry">','<div class="layui-tree-main">',function(){return t.showLine?c?'<span class="layui-tree-iconClick layui-tree-icon"><i class="layui-icon '+(r.spread?"layui-icon-subtraction":"layui-icon-addition")+'"></i></span>':t.customSpread?'<span class="layui-tree-iconClick"></span>':'<span class="layui-tree-iconClick"><i class="layui-icon layui-icon-file"></i></span>':'<span class="layui-tree-iconClick"><i class="layui-tree-iconArrow '+(c?"":l)+'"></i></span>'}(),function(){return t.customCheckbox?r.showCheckbox?t.showCheckbox?'<input type="checkbox" name="'+(r.field||"layuiTreeCheck_"+r.id)+'" same="layuiTreeCheck" lay-skin="primary" '+(r.disabled?"disabled":"")+' value="'+r.id+'">':"":void 0:t.showCheckbox?'<input type="checkbox" name="'+(r.field||"layuiTreeCheck_"+r.id)+'" same="layuiTreeCheck" lay-skin="primary" '+(r.disabled?"disabled":"")+' value="'+r.id+'">':""}(),function(){return t.isJump&&r.href?'<a href="'+r.href+'" target="_blank" class="'+f+'">'+(r.title||r.label||t.text.defaultNodeName)+"</a>":void 0!=r.icon?r.icon+'<span class="'+f+(r.disabled?" "+d:"")+'">'+(r.title||r.label||t.text.defaultNodeName)+"</span>":'<span class="'+f+(r.disabled?" "+d:"")+'">'+(r.title||r.label||t.text.defaultNodeName)+"</span>"}(),"</div>",function(){if(!t.edit)return"";if(t.customOperate){if(!r.nodeOperate)return"";var e={add:'<i class="layui-icon layui-icon-read" data-type="add"></i>',update:'<i class="layui-icon layui-icon-edit" data-type="update"></i>',del:'<i class="layui-icon layui-icon-delete" data-type="del"></i>'},i=['<div class="layui-btn-group layui-tree-btnGroup">'];if(t.edit===!0&&(t.edit=["update","del"]),"object"==typeof t.edit)return layui.each(t.edit,function(a,n){i.push(e[n]||"")}),i.join("")+"</div>"}else{var e={add:'<i class="layui-icon layui-icon-read" data-type="add"></i>',update:'<i class="layui-icon layui-icon-edit" data-type="update"></i>',del:'<i class="layui-icon layui-icon-delete" data-type="del"></i>'},i=['<div class="layui-btn-group layui-tree-btnGroup">'];if(t.edit===!0&&(t.edit=["update","del"]),"object"==typeof t.edit)return layui.each(t.edit,function(a,n){i.push(e[n]||"")}),i.join("")+"</div>"}}(),"</div></div>"].join(""));c&&(u.append(s),n.tree(s,r.children)),e.append(u),u.prev("."+o)[0]&&u.prev().children(".layui-tree-pack").addClass("layui-tree-showLine"),c||u.parent(".layui-tree-pack").addClass("layui-tree-lineExtend"),n.spread(u,r),t.showCheckbox&&(r.checked&&n.checkids.push(r.id),n.checkClick(u,r)),t.edit&&n.operate(u,r)})},b.prototype.spread=function(e,a){var n=this,t=n.config,r=e.children("."+p),c=r.children("."+y),l=r.find("."+s),m=r.find("."+f),C=t.onlyIconControl?l:c,x="";t.customSpread||C.on("click",function(i){var a=e.children("."+v),n=C.children(".layui-icon")[0]?C.children(".layui-icon"):C.find(".layui-tree-icon").children(".layui-icon");if(a[0]){if(e.hasClass(k))e.removeClass(k),a.slideUp(200),n.removeClass(h).addClass(u);else if(e.addClass(k),a.slideDown(200),n.addClass(h).removeClass(u),t.accordion){var r=e.siblings("."+o);r.removeClass(k),r.children("."+v).slideUp(200),r.find(".layui-tree-icon").children(".layui-icon").removeClass(h).addClass(u)}}else x="normal"}),m.on("click",function(){var n=i(this);n.hasClass(d)||(x=e.hasClass(k)?t.onlyIconControl?"open":"close":t.onlyIconControl?"close":"open",t.click&&t.click({elem:e,state:x,data:a}))})},b.prototype.setCheckbox=function(e,i,a){var n=this,t=(n.config,a.prop("checked"));if(!a.prop("disabled")){if("object"==typeof i.children||e.find("."+v)[0]){var r=e.find("."+v).find('input[same="layuiTreeCheck"]');r.each(function(){this.disabled||(this.checked=t)})}var c=function(e){if(e.parents("."+o)[0]){var i,a=e.parent("."+v),n=a.parent(),r=a.prev().find('input[same="layuiTreeCheck"]');t?r.prop("checked",t):(a.find('input[same="layuiTreeCheck"]').each(function(){this.checked&&(i=!0)}),i||r.prop("checked",!1)),c(n)}};c(e),n.renderForm("checkbox")}},b.prototype.checkClick=function(e,a){var n=this,t=n.config,r=e.children("."+p),c=r.children("."+y);c.on("click",'input[same="layuiTreeCheck"]+',function(r){layui.stope(r);var c=i(this).prev(),l=c.prop("checked");c.prop("disabled")||(n.setCheckbox(e,a,c),t.oncheck&&t.oncheck({elem:e,checked:l,data:a}))})},b.prototype.operate=function(e,a){var t=this,r=t.config,c=e.children("."+p);c.children("."+y);c.children(".layui-tree-btnGroup").on("click",".layui-icon",function(c){layui.stope(c);var d=i(this).data("type"),u=e.children("."+v),y={data:a,type:d,elem:e};"add"==d?r.operate&&r.operate(y):"update"==d?r.operate&&r.operate(y):n.confirm('确认删除 "<span style="color: #999;">'+(a.title||"")+'</span>" 吗？',function(a){if(r.operate&&r.operate(y),y.status="remove",n.close(a),!e.prev("."+o)[0]&&!e.next("."+o)[0]&&!e.parent("."+v)[0])return e.remove(),void t.elem.append(t.elemNone);if(e.siblings("."+o).children("."+p)[0]){if(r.showCheckbox){var c=function(e){if(e.parents("."+o)[0]){var a=e.siblings("."+o).children("."+p),n=e.parent("."+v).prev(),r=n.find('input[same="layuiTreeCheck"]')[0],l=1,d=0;0==r.checked&&(a.each(function(e,a){var n=i(a).find('input[same="layuiTreeCheck"]')[0];0!=n.checked||n.disabled||(l=0),n.disabled||(d=1)}),1==l&&1==d&&(r.checked=!0,t.renderForm("checkbox"),c(n.parent("."+o))))}};c(e)}if(r.showLine){var d=e.siblings("."+o),f=1,b=e.parent("."+v);layui.each(d,function(e,a){i(a).children("."+v)[0]||(f=0)}),1==f?(u[0]||(b.removeClass(x),d.children("."+v).addClass(C),d.children("."+v).children("."+o).removeClass(m)),e.next()[0]?b.children("."+o).last().children("."+v).children("."+o).last().addClass(m):e.prev().children("."+v).children("."+o).last().addClass(m),e.next()[0]||e.parents("."+o)[1]||e.parents("."+o).eq(0).next()[0]||e.prev("."+o).addClass(m)):!e.next()[0]&&e.hasClass(m)&&e.prev().addClass(m)}}else{var g=e.parent("."+v).prev();if(r.showLine){g.find("."+s).removeClass("layui-tree-icon"),g.find("."+s).children(".layui-icon").removeClass(h).addClass("layui-icon-file");var w=g.parents("."+v).eq(0);w.addClass(x),w.children("."+o).each(function(){i(this).children("."+v).children("."+o).last().addClass(m)})}else g.find(".layui-tree-iconArrow").addClass(l);e.parents("."+o).eq(0).removeClass(k),e.parent("."+v).remove()}e.remove()})})},b.prototype.events=function(){var e=this,a=e.config;e.elem.find(".layui-tree-checkedFirst");e.setChecked(e.checkids),e.elem.find(".layui-tree-search").on("keyup",function(){var n=i(this),t=n.val(),r=n.nextAll(),c=[];r.find("."+f).each(function(){var e=i(this).parents("."+p);if(i(this).html().indexOf(t)!=-1){c.push(i(this).parent());var a=function(e){e.addClass("layui-tree-searchShow"),e.parent("."+v)[0]&&a(e.parent("."+v).parent("."+o))};a(e.parent("."+o))}}),r.find("."+p).each(function(){var e=i(this).parent("."+o);e.hasClass("layui-tree-searchShow")||e.addClass(l)}),0==r.find(".layui-tree-searchShow").length&&e.elem.append(e.elemNone),a.onsearch&&a.onsearch({elem:c})}),e.elem.find(".layui-tree-search").on("keydown",function(){i(this).nextAll().find("."+p).each(function(){var e=i(this).parent("."+o);e.removeClass("layui-tree-searchShow "+l)}),i(".layui-tree-emptyText")[0]&&i(".layui-tree-emptyText").remove()})},b.prototype.getChecked=function(){var e=this,a=e.config,n=[],t=[];e.elem.find(".layui-form-checked").each(function(){n.push(i(this).prev()[0].value)});var r=function(e,a){layui.each(e,function(e,t){layui.each(n,function(e,n){if(t.id==n){var c=i.extend({},t);return delete c.children,a.push(c),t.children&&(c.children=[],r(t.children,c.children)),!0}})})};return r(i.extend({},a.data),t),t},b.prototype.setChecked=function(e){var a=this;a.config;a.elem.find("."+o).each(function(a,n){var t=i(this).data("id"),r=i(n).children("."+p).find('input[same="layuiTreeCheck"]'),c=r.next();if("number"==typeof e){if(t==e)return r[0].checked||c.click(),!1}else"object"==typeof e&&layui.each(e,function(e,i){if(i==t&&!r[0].checked)return c.click(),!0})})},c.that={},c.config={},r.reload=function(e,i){var a=c.that[e];return a.reload(i),c.call(a)},r.getChecked=function(e){var i=c.that[e];return i.getChecked()},r.setChecked=function(e,i){var a=c.that[e];return a.setChecked(i)},r.render=function(e){var i=new b(e);return c.call(i)},e(t,r)});