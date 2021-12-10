using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using COM;

namespace MODEL
{
    /// <summary>
    /// 实景模型枚举
    /// </summary>
    public static class EnumModel
    {
        /// <summary>
        /// 项目类型
        /// </summary>
        public enum ProjectType
        {
            [RemarkAttribute("危岩")]
            Rockfall = 0,

            [RemarkAttribute("滑坡")]
            Landslide = 1,

            [RemarkAttribute("消落带")]
            HydroFluctuation = 2,

            [RemarkAttribute("调勘查")]
            GroundSurvey = 3,

            [RemarkAttribute("其他")]
            GroundOther = 4
        }


        /// <summary>
        /// 项目用途
        /// </summary>
        public enum ProjectPurpose
        {
            [RemarkAttribute("内部调研")]
            Purpose1 = 0,

            [RemarkAttribute("内部生产项目")]
            Purpose2 = 1,

            [RemarkAttribute("外部生产项目")]
            Purpose3 = 2,
            [RemarkAttribute("其他")]
            Purpose4 = 3
        }
        /// <summary>
        /// 采集设备
        /// </summary>
        public enum AircrafType
        {
            [RemarkAttribute("精灵 PHANTOM 4 PRO")]
            Aircraf1 = 0,

            [RemarkAttribute("精灵 PHANTOM 4 RTK")]
            Aircraf2 = 1,

            [RemarkAttribute("经纬 M300 RTK")]
            Aircraf3 = 2
        }

        /// <summary>
        /// 所需成果
        /// </summary>
        public enum ResultType
        {
            [RemarkAttribute("系统模型")]
            ResultType1 = 0,
            [RemarkAttribute("DOM/DSM")]
            ResultType2 = 1,

            [RemarkAttribute("OSGB(特殊情况)")]
            ResultType3 = 2,

            [RemarkAttribute("点云PNTS")]
            ResultType4 = 3,

            [RemarkAttribute("点云LAS)")]
            ResultType5 = 4
        }


    }
}
