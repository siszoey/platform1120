using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using COM;

namespace MVC.Controllers
{
    public class AppController : BaseController
    {
        private static Logger logger = Logger.CreateLogger(typeof(AppController));


        /// <summary>
        /// 后台管理系统
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Admin()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录后台管理系统");
            return View();
        }

        /// <summary>
        /// 监测系统
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Monitor()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[0];
            ViewBag.UserName = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录监测系统");
            return View();
        }

        /// <summary>
        /// 航线规划系统
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Uav()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[0];
            logger.Info("【" + ViewBag.User + "】登录航线规划系统");
            return View();
        }

        /// <summary>
        /// 影像分析系统
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Image()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录影像分析系统");
            return View();
        }

        /// <summary>
        /// 点云分析系统
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult PointsCloud()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[0];
            logger.Info("【" + ViewBag.User + "】登录点云分析系统");
            return View();
        }

        /// <summary>
        /// 消落带采集系统
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Flz()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[0];
            ViewBag.UserName = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录消落带采集系统");
            return View();
        }

        /// <summary>
        /// 陡崖数据采集系统
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Rock()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[0];
            ViewBag.UserName = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录陡崖数据采集系统");
            return View();
        }

        /// <summary>
        /// 三维实景模型数据管理系统
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Model()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[0];
            logger.Info("【" + ViewBag.User + "】登录三维实景模型管理系统");
            return View();
        }

        /// <summary>
        /// 三维实景模型数据管理系统
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Modelp()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[0];
            logger.Info("【" + ViewBag.User + "】登录三维实景模型管理系统");
            return View();
        }

        /// <summary>
        /// 三维实景模型数据管理系统
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Modelv()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[0];
            logger.Info("【" + ViewBag.User + "】登录三维实景模型管理系统");
            return View();
        }

























        /// <summary>
        /// 展示系统
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Display()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[0];
            logger.Info("【" + ViewBag.User + "】登录展示系统");
            return View();
        }

        /// <summary>
        /// 业主系统
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Owner()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[0];
            logger.Info("【" + ViewBag.User + "】登录业主系统");
            return View();
        }

    }
}