﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;

using COM;
using DAL;
using MODEL;


namespace SERVICE.Controllers
{
    /// <summary>
    /// 目标
    /// </summary>
    public class ModelTaskController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(ModelTaskController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();
        //service 的Web.config中定义modeldir,绝对路径
        private static string modeldir = ConfigurationManager.AppSettings["modeldir"] != null ? ConfigurationManager.AppSettings["modeldir"].ToString() : string.Empty;


        /// <summary>
        /// 新建任务
        /// </summary>
        [HttpPost]
        public string AddTask()
        {
            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            #region 参数
            string rwmc = HttpContext.Current.Request.Form["model_rwmc_add"];
            string yxcjry = user.ALIASNAME;
            string yxcjsj = HttpContext.Current.Request.Form["model_yxcjsj_add"];
            string yxsl = HttpContext.Current.Request.Form["model_yxsl_add"];
            string yxcjsb = HttpContext.Current.Request.Form["model_yxcjsb_add"];
            string srid = HttpContext.Current.Request.Form["model_kjck_add"];
            string sxcg = HttpContext.Current.Request.Form["model_sxcg_add"];
            string yxkzd = HttpContext.Current.Request.Form["model_yxkzd_add"];
            string yxfw = HttpContext.Current.Request.Form["model_yxfw_add"];
            string yxcflj = HttpContext.Current.Request.Form["model_yxcflj_add"];
            string rwms = HttpContext.Current.Request.Form["model_rwms_add"];
            

            string projectid = HttpContext.Current.Request.Form["projectid"];
            #endregion

            

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                ModelProject modelProject = ParseModelHelper.ParseModelProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE id={0} AND ztm={1}", projectid,(int)MODEL.Enum.State.InUse)));
                if (modelProject == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此项目！", string.Empty));
                }
                string rwbm = CreateTaskCode(modelProject.XMBM, modelProject.BSM);//项目编码

                if (
                    (!string.IsNullOrEmpty(rwmc))
                    && (!string.IsNullOrEmpty(yxcjry))
                    && (!string.IsNullOrEmpty(yxcjsj))
                    && (!string.IsNullOrEmpty(yxsl))
                    && (!string.IsNullOrEmpty(yxcjsb))
                    && (!string.IsNullOrEmpty(yxcflj))
                    && (!string.IsNullOrEmpty(srid))
                    )     //1---必填选项，填入则可创建项目id
                {
                    string value = "("
                    + SQLHelper.UpdateString(rwmc) + ","
                    + SQLHelper.UpdateString(rwbm) + ","
                    + SQLHelper.UpdateString(yxcjry) + ","
                    + SQLHelper.UpdateString(yxcjsj) + ","
                    + yxsl + ","
                    + SQLHelper.UpdateString(yxcjsb) + ","
                    + srid + ","
                    + SQLHelper.UpdateString(sxcg) + ","
                    + SQLHelper.UpdateString(yxkzd) + ","
                    + SQLHelper.UpdateString(yxfw) + ","
                    + SQLHelper.UpdateString(yxcflj) + ","
                    + SQLHelper.UpdateString(rwms) + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + SQLHelper.UpdateString(modelProject.BSM) + ","
                    + (int)MODEL.Enum.State.InUse 
                    + ")";

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO model_task (rwmc,rwbm,yxcjry,yxcjsj,yxsl,yxcjsb,kjck,sxcg,yxkzd,yxfw,yxcflj,rwms,rwcjsj,bsm,ztm) VALUES" + value);
                    if (id != -1)
                    {
                        int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO model_map_project_task (projectid,taskid,cjsj,ztm) VALUES({0},{1},{2},{3})", projectid, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (mapid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建项目--任务映射失败！", string.Empty));
                        }
                        else
                        {
                            string modelFilePath = modeldir + @"\Allmodel" + @"\" + modelProject.XMBM.ToString() + @"\" + rwbm;
                            if (Directory.Exists(modelFilePath))//判断文件夹是否存在
                            {
                                Console.WriteLine("文件夹"+modelFilePath+"在，无需创建！");
                            }
                            else
                            {
                                try
                                {
                                    Directory.CreateDirectory(modelFilePath);
                                    Console.WriteLine("文件夹" + modelFilePath + "创建成功！");
                                }
                                catch(Exception ex)
                                {
                                    Console.WriteLine("文件夹创建失败，原因：" +ex.ToString());
                                }
                            }
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", string.Empty));

                        }
                    } 
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建任务失败！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "参数不全！", string.Empty));
                }

            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }
        
        /// <summary>
        /// 获取任务基本信息(查看-编辑任务基本信息)
        /// </summary>
        [HttpGet]
        public string GetTaskInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                ModelTask modelTask = ParseModelHelper.ParseModelTask(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM model_task WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms)));
                if (modelTask != null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(modelTask)));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此目标！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }
        
        /// <summary>
        /// 更新任务基本信息(编辑后保存)
        /// </summary>
        [HttpPut]
        public string UpdateTaskInfo()
        {
            #region 参数

            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string rwmc = HttpContext.Current.Request.Form["model_rwmc_edit"];
            string rwbm = HttpContext.Current.Request.Form["model_rwbm_edit"];
            string yxcjry = HttpContext.Current.Request.Form["model_yxcjry_edit"];
            string yxcjsj = HttpContext.Current.Request.Form["model_yxcjsj_edit"];
            string yxsl = HttpContext.Current.Request.Form["model_yxsl_edit"];
            string yxcjsb = HttpContext.Current.Request.Form["model_yxcjsb_edit"];
            string srid = HttpContext.Current.Request.Form["model_kjck_edit"];
            string sxcg = HttpContext.Current.Request.Form["model_sxcg_edit"];
            string yxkzd = HttpContext.Current.Request.Form["model_yxkzd_edit"];
            string yxfw = HttpContext.Current.Request.Form["model_yxfw_edit"];
            string yxcflj = HttpContext.Current.Request.Form["model_yxcflj_edit"];
            string rwms = HttpContext.Current.Request.Form["model_rwms_edit"];
            string cgxzlj = HttpContext.Current.Request.Form["model_cgxzlj_edit"];
            string mxms = HttpContext.Current.Request.Form["model_mxms_edit"];
            string bz = HttpContext.Current.Request.Form["model_bz_edit"];
            #endregion


            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms));

                if (count == 1)
                {
                    if ((!string.IsNullOrEmpty(rwmc))
                    && (!string.IsNullOrEmpty(yxcjry))
                    && (!string.IsNullOrEmpty(yxcjsj))
                    && (!string.IsNullOrEmpty(yxsl))
                    && (!string.IsNullOrEmpty(yxcjsb))
                    && (!string.IsNullOrEmpty(yxcflj))
                    && (!string.IsNullOrEmpty(srid))
                    )
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(
                               "UPDATE model_task SET rwmc={0},yxcjry={1},yxcjsj={2},yxsl={3},yxcjsb={4},kjck={5},sxcg={6},yxkzd={7},yxfw={8},yxcflj={9},rwms={10},cgxzlj={11},mxms={12} ,bz={13} WHERE id={14} AND bsm{15} AND ztm={16}",
                               SQLHelper.UpdateString(rwmc),
                               SQLHelper.UpdateString(yxcjry),
                               SQLHelper.UpdateString(yxcjsj),
                               yxsl,
                               SQLHelper.UpdateString(yxcjsb),
                               srid,
                               SQLHelper.UpdateString(sxcg),
                               SQLHelper.UpdateString(yxkzd),
                               SQLHelper.UpdateString(yxfw),
                               SQLHelper.UpdateString(yxcflj),
                               SQLHelper.UpdateString(rwms),
                               SQLHelper.UpdateString(cgxzlj),
                               SQLHelper.UpdateString(mxms),
                               SQLHelper.UpdateString(bz),
                               id,
                               userbsms,
                               (int)MODEL.Enum.State.InUse));
                        if (updatecount == 1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "更新成功！", string.Empty));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "更新项目失败！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "缺少必需参数！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此项目！", string.Empty));
                }
            }
            else
            {
                //验证失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 删除任务
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteTask()
        {
            string id = HttpContext.Current.Request.Form["id"];
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int updatetaskcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET ztm={0} WHERE id={1}", (int)MODEL.Enum.State.NoUse, id));
                if (updatetaskcount == 1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "删除成功！", string.Empty));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除目标出错！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 获取目标集合
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetTaskList(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == CookieHelper.CookieResult.SuccessCookkie)
            {
                List<ModelTask> tasks = new List<ModelTask>();


                int mapprojecttaskcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM model_map_project_task WHERE projectid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));

                if (mapprojecttaskcount > 0)
                {
                    string mapprojecttaskdata = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_map_project_task WHERE projectid={0} AND ztm={1} ORDER BY id ASC", id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(mapprojecttaskdata))
                    {
                        string[] mapprojecttaskrows = StringHelper.String2Array(mapprojecttaskdata);
                        for (int i = 0; i < mapprojecttaskrows.Length; i++)
                        {
                            MapModelProjecTask mapModelProjecTask = ParseModelHelper.ParseMapModelProjecTask(mapprojecttaskrows[i]);
                            if (mapModelProjecTask != null)
                            {
                                //同一个项目，需要数据隔离？后台需要多个操作员
                                ModelTask task = ParseModelHelper.ParseModelTask(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0} AND ztm={1} ", mapModelProjecTask.TaskId, (int)MODEL.Enum.State.InUse)));

                                if (task != null)
                                {

                                    tasks.Add(task);
                                }
                            }
                        }
                        if (tasks.Count > 0)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(tasks)));
                        }
                        else //
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "目标信息为空！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "目标信息为空！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "该项目无目标！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }

        }

        #region 方法1
        /// <summary>
        /// 创建项目编码
        /// </summary>
        /// <param name="xmbm"></param>
        /// <param name="bsm"></param>
        /// <returns></returns>
        private string CreateTaskCode(string xmbm, string bsm)
        {
            if (!string.IsNullOrEmpty(bsm) && !string.IsNullOrEmpty(xmbm))
            {
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE bsm='{0}'", bsm));
                if (data == string.Empty)
                {
                    return xmbm + "001";
                }
                else
                {
                    List<long> codes = new List<long>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        try
                        {
                            ModelTask task = ParseModelHelper.ParseModelTask(rows[i]);
                            long code = Convert.ToInt64(task.RWBM);
                            codes.Add(code);
                        }
                        catch
                        {
                            return string.Empty;
                        }
                    }

                    long maxcode = codes.Max();
                    return (maxcode + 1).ToString();
                }
            }
            else
            {
                return string.Empty;
            }
        }
        #endregion
    }
}
