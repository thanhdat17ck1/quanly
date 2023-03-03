using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Repository.Cat;

namespace WebApplication.Api.Cat
{
    [RoutePrefix("api/ChatLuong")]
    public class ChatLuongController : ApiController
    {
        // GET: Todo
        readonly IChatLuongRepository _repo = new ChatLuongRepository();
        [HttpGet]
        [Route("GetAllChuyenLoi")]
        public dynamic GetAllChuyenLoi( DateTime dt,DateTime de)
        {

            DataTable tbl = _repo.GetAllChuyenLoi(dt,de);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GetThongKeTLLoi")]
        public dynamic GetThongKeTLLoi(string line,DateTime dt, DateTime de)
        {

            DataTable tbl = _repo.GetThongKeTLLoi(line,dt, de);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GetThongKeTLLoiChuyen")]
        public dynamic GetThongKeTLLoiChuyen(string line, DateTime dt, DateTime de)
        {

            DataTable tbl = _repo.GetThongKeTLLoiChuyen(line, dt, de);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GetThongKeTLLoiTheoMaHang")]
        public dynamic GetThongKeTLLoiTheoMaHang(string line, DateTime dt, DateTime de)
        {

            DataTable tbl = _repo.GetThongKeTLLoiTheoMaHang(line, dt, de);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        //new
        [HttpGet]
        [Route("GetThongKeTLLoiThangTheoMaHang")]
        public dynamic GetThongKeTLLoiThangTheoMaHang(string action,string line, string styleID,string month, string year)
        {

            DataTable tbl = _repo.GetThongKeTLLoiThangTheoMaHang(action,line, styleID, month, year);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        //chietiet
        [HttpGet]
        [Route("GetChatLuongChiTiet")]
        public dynamic GetChatLuongChiTiet(string action, string line, string styleID, string month, string year)
        {

            DataTable tbl = _repo.GetChatLuongChiTiet(action, line, styleID, month, year);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
    }
}
