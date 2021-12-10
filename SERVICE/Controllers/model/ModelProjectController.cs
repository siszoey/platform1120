using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

using COM;
using DAL;
using MODEL;

namespace SERVICE.Controllers
{
    /// <summary>
    /// 影像项目
    /// </summary>
    public class ModelProjectController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(ModelProjectController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 1---新建项目
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddProject()
        {
            #region 参数
            string xmmc = HttpContext.Current.Request.Form["model_xmmc_add"];        //Request.Form  获取页面表单元素
            string xmprovince = HttpContext.Current.Request.Form["model_province_add"];//省市
            string xmdistrict = HttpContext.Current.Request.Form["model_district_add"];//县级行政区
            string zxjd = HttpContext.Current.Request.Form["model_zxjd_add"];
            string zxwd = HttpContext.Current.Request.Form["model_zxwd_add"];
            string xmsj = HttpContext.Current.Request.Form["model_xmsj_add"];
            string xzqbm = HttpContext.Current.Request.Form["model_district_add"];
            string xmlx = HttpContext.Current.Request.Form["model_xmlx_add"];
            string xmyt = HttpContext.Current.Request.Form["model_xmyt_add"];
            string bz = HttpContext.Current.Request.Form["model_bz_add"];
            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                if (user == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户为空！", string.Empty));
                }
                string xmbm = CreateProjectCode(xzqbm);//项目编码
                if (
                    (!string.IsNullOrEmpty(xmmc))
                    && (!string.IsNullOrEmpty(zxjd))
                    && (!string.IsNullOrEmpty(zxwd))
                    )
                {
                    string value = "("
                    + SQLHelper.UpdateString(xmmc) + ","
                    + SQLHelper.UpdateString(xmbm) + ","
                    + zxjd + ","
                    + zxwd + ","
                    + xzqbm + ","
                    + SQLHelper.UpdateString(xmsj) + ","
                    + xmlx + ","
                    + xmyt + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + SQLHelper.UpdateString(Guid.NewGuid().ToString("D")) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ")";

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO model_project (xmmc,xmbm,zxjd,zxwd,xzqbm,xmsj,xmlx,xmyt,cjsj,bsm,ztm,bz) VALUES" + value);
                    if (id != -1)
                    {
                        //2---非必填选项，有值则更新信息至image_project
                        if (!string.IsNullOrEmpty(xmbm))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_project SET xmbm={0} WHERE id={1}", xmbm, id));
                        }
                        if (!string.IsNullOrEmpty(bz))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_project SET bz={0} WHERE id={1}", bz, id));
                        }

                        int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO model_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", user.Id, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (mapid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建用户-项目映射失败！", string.Empty));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建项目失败！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "参数不全！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "验证用户失败！", string.Empty));
            }
        }

        /// <summary>
        /// 2---获取当前用户所有项目，以及各项目下的实景模型
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserModelProjectList(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                List<ModelProjectInfo> modelProjectInfos = new List<ModelProjectInfo>();

                string projectdatas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE bsm{0} AND ztm={1} ORDER BY id DESC", userbsms, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(projectdatas))
                {
                    string[] projectrows = projectdatas.Split(new char[] { COM.ConstHelper.rowSplit });

                    for (int i = 0; i < projectrows.Length; i++)
                    {
                        ModelProject modelProject = ParseModelHelper.ParseModelProject(projectrows[i]);
                        if (modelProject != null)
                        {
                            ModelProjectInfo modelProjectInfo = new ModelProjectInfo();
                            modelProjectInfo.ModelProjects = modelProject;

                            #region 项目对应模型
                            string project_task_maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_map_project_task WHERE projectid={0} AND ztm={1} ORDER BY cjsj ASC", modelProject.Id, (int)MODEL.Enum.State.InUse));
                            if (!string.IsNullOrEmpty(project_task_maps))
                            {
                                ModelTaskInfos modelTaskInfos = new ModelTaskInfos();
                                modelTaskInfos.Title = "任务";
                                #region 项目对应任务
                                List<ModelTask> Tasks = new List<ModelTask>();

                                string[] maprows = project_task_maps.Split(new char[] { COM.ConstHelper.rowSplit });
                                for (int j = 0; j < maprows.Length; j++)
                                {
                                    MapModelProjecTask mapModelProjecTask = ParseModelHelper.ParseMapModelProjecTask(maprows[j]);
                                    if (mapModelProjecTask != null)
                                    {
                                        ModelTask modelTask = ParseModelHelper.ParseModelTask(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0} AND ztm={1}", mapModelProjecTask.TaskId, (int)MODEL.Enum.State.InUse)));
                                        if (modelTask != null)
                                        {
                                            Tasks.Add(modelTask);
                                        }
                                    }
                                }
                                #endregion

                                if (Tasks.Count > 0)
                                {
                                    modelTaskInfos.TaskList = Tasks;
                                    modelProjectInfo.ModelTasks = modelTaskInfos;
                                }
                            }
                            #endregion

                            modelProjectInfos.Add(modelProjectInfo);
                        }
                    }
                    if (modelProjectInfos.Count > 0)
                    {
                        //有项目信息
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(modelProjectInfos)));
                    }
                    else
                    {
                        //无项目信息
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无项目信息！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无项目信息！", string.Empty));
                }
            }
            else
            {
                //验证失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 3---获取项目信息（查看+编辑项目）
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetModelProjectInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                ModelProject modelproject = ParseModelHelper.ParseModelProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM model_project WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms)));
                if (modelproject != null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(modelproject)));
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
        /// 3.1---更新项目信息（编辑后保存）
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateModelProject()
        {
            #region 参数
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string xmmc = HttpContext.Current.Request.Form["image_xmmc_edit"];
            string xmbm = HttpContext.Current.Request.Form["image_xmbm_edit"];
            string zxjd = HttpContext.Current.Request.Form["image_zxjd_edit"];
            string zxwd = HttpContext.Current.Request.Form["image_zxwd_edit"];
            string srid = HttpContext.Current.Request.Form["image_kjck_edit"];
            string ms = HttpContext.Current.Request.Form["image_ms_edit"];
            string bz = HttpContext.Current.Request.Form["image_bz_edit"];
            #endregion

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM image_project WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms));
                if (count == 1)
                {
                    if (!string.IsNullOrEmpty(xmmc)
                    && !string.IsNullOrEmpty(zxjd)
                    && !string.IsNullOrEmpty(zxwd)
                    && !string.IsNullOrEmpty(srid))
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(
                             "UPDATE image_project SET xmmc={0},xmbm={1},zxjd={2},zxwd={3},srid={4},ms={5},bz={6} WHERE id={7} AND bsm{8} AND ztm={9}",
                             SQLHelper.UpdateString(xmmc),
                             SQLHelper.UpdateString(xmbm),
                             zxjd,
                             zxwd,
                             srid,
                             SQLHelper.UpdateString(ms),
                             SQLHelper.UpdateString(bz),
                             id,
                             userbsms,
                             (int)MODEL.Enum.State.InUse));

                        if (updatecount == 1)
                        {
                            if (!string.IsNullOrEmpty(xmbm))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_project SET xmbm={0} WHERE id={1} AND bsm{2} AND ztm={3}", xmbm, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }
                            if (!string.IsNullOrEmpty(ms))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_project SET ms={0} WHERE id={1} AND bsm{2} AND ztm={3}", ms, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }
                            if (!string.IsNullOrEmpty(bz))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_project SET bz={0} WHERE id={1} AND bsm{2} AND ztm={3}", bz, id, userbsms, (int)MODEL.Enum.State.InUse));
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
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "验证失败", string.Empty));
            }
        }

        /// <summary>
        /// 4---删除项目
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteModelProject()
        {
            string id = HttpContext.Current.Request.Form["id"];
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int updateprojectcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_project SET ztm={0} WHERE id={1}", (int)MODEL.Enum.State.NoUse, id));
                if (updateprojectcount == 1)
                {
                    //①map_user_project
                    int updatemapusercount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_map_user_project SET ztm={0} WHERE userid={1} AND projectid={2}", (int)MODEL.Enum.State.NoUse, user.Id, id));

                    if (updatemapusercount == 1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "删除成功！", string.Empty));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除用户——项目映射失败！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除项目出错！", string.Empty));
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
        /// <param name="xjxzq"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        private string CreateProjectCode(string xjxzq)
        {
            if (!string.IsNullOrEmpty(xjxzq) && !string.IsNullOrEmpty(xjxzq))
            {
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE xzqbm='{0}'", xjxzq));
                if (data == string.Empty)
                {
                    return xjxzq + "000001";
                }
                else
                {
                    List<long> codes = new List<long>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        try
                        {
                            ModelProject project = ParseModelHelper.ParseModelProject(rows[i]);
                            long code = Convert.ToInt64(project.XMBM);
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
        /// <summary>
        /// </summary>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetModelUserInfo(string cookie)
        {
            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref user);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                return JsonHelper.ToJson(user.BZ);
            }
            else
            {
                //验证失败
                return string.Empty;
            }
            #endregion
        }

    }
}