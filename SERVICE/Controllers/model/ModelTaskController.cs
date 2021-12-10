using System;
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


        /// <summary>
        /// 1---新建任务
        /// </summary>
        [HttpPost]
        public string AddTask()
        {
            #region 参数
            string rwmc = HttpContext.Current.Request.Form["model_rwmc_add"];
            string yxcjry = HttpContext.Current.Request.Form["model_yxcjry_add"];
            string yxcjsj = HttpContext.Current.Request.Form["model_yxcjsj_add"];
            string yxsl = HttpContext.Current.Request.Form["model_yxsl_add"];
            string yxcjsb = HttpContext.Current.Request.Form["model_yxcjsb_add"];
            string srid = HttpContext.Current.Request.Form["model_kjck_add"];
            string sxcg = HttpContext.Current.Request.Form["model_sxcg_add"];
            string yxkzd = HttpContext.Current.Request.Form["model_yxkzd_add"];
            string yxfw = HttpContext.Current.Request.Form["model_yxfw_add"];
            string yxcflj = HttpContext.Current.Request.Form["model_yxcflj_add"];
            string rwms = HttpContext.Current.Request.Form["model_rwms_add"];
            string bz = HttpContext.Current.Request.Form["model_bz_add"];

            string projectid = HttpContext.Current.Request.Form["projectid"];
            #endregion

            #region 解析验证用户
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref userbsms);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                ModelProject modelProject = ParseModelHelper.ParseModelProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE id={0} AND bsm{1} AND ztm={2}", projectid, userbsms, (int)MODEL.Enum.State.InUse)));
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
                    && (!string.IsNullOrEmpty(yxkzd))
                    && (!string.IsNullOrEmpty(yxfw))
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
                    + yxkzd + ","
                    + yxfw + ","
                    + SQLHelper.UpdateString(yxcflj) + ","
                    + SQLHelper.UpdateString(rwms) + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + SQLHelper.UpdateString(modelProject.BSM) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ")";

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO model_task (rwmc,rwbm,yxcjry,yxcjsj,yxsl,yxcjsb,kjck,sxcg,yxkzd,yxfw,yxcflj,rwms,rwcjsj,bsm,ztm,bz) VALUES" + value);
                    if (id != -1)
                    {
                        int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO model_map_project_task (projectid,taskid,cjsj,ztm) VALUES({0},{1},{2},{3})", projectid, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (mapid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建项目--任务映射失败！", string.Empty));
                        }
                        else
                        {
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
        /// 2---获取任务基本信息(查看-编辑任务基本信息)
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
        /// 2.1---更新任务基本信息(编辑后保存)
        /// </summary>
        [HttpPut]
        public string UpdateTaskInfo()
        {
            #region 参数

            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string mbmc = HttpContext.Current.Request.Form["model_mbmc_edit"];
            string mbbh = HttpContext.Current.Request.Form["model_mbbh_edit"];
            string mblx = HttpContext.Current.Request.Form["model_mblx_edit"];
            string x = HttpContext.Current.Request.Form["model_x_edit"];
            string y = HttpContext.Current.Request.Form["model_y_edit"];
            string z = HttpContext.Current.Request.Form["model_z_edit"];
            string srid = HttpContext.Current.Request.Form["model_kjck_edit"];
            string bz = HttpContext.Current.Request.Form["model_bz_edit"];
            #endregion


            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms));

                if (count == 1)
                {
                    if ((!string.IsNullOrEmpty(mbmc))
                    && (!string.IsNullOrEmpty(mblx))
                    && (!string.IsNullOrEmpty(x))
                    && (!string.IsNullOrEmpty(y))
                    && (!string.IsNullOrEmpty(z))
                    && (!string.IsNullOrEmpty(srid)))
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(
                               "UPDATE model_task SET mbmc={0},mbbh={1},mblx={2},x={3},y={4},z={5},srid={6},bz={7} WHERE id={8} AND bsm{9} AND ztm={10}",
                               SQLHelper.UpdateString(mbmc),
                               SQLHelper.UpdateString(mbbh),
                               SQLHelper.UpdateString(mblx),
                               x,
                               y,
                               z,
                               srid,
                               SQLHelper.UpdateString(bz),
                               id,
                               userbsms,
                               (int)MODEL.Enum.State.InUse));
                        if (updatecount == 1)
                        {
                            if (!string.IsNullOrEmpty(mbbh))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET mbbh={0} WHERE id={1} AND bsm{2} AND ztm={3}", mbbh, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(bz))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET bz={0} WHERE id={1} AND bsm{2} AND ztm={3}", bz, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }
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
        /// 2.2---删除任务
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
