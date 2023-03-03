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
    [RoutePrefix("api/TienDo")]
    public class TienDoController : ApiController
    {
        // GET: Todo
        readonly ITienDoRepository _repo = new TienDoRepository();
        [HttpGet]
        [Route("GetChuyenTienDo")]
        public dynamic GetChuyenTienDo( DateTime dt,DateTime de)
        {

            DataTable tbl = _repo.GetChuyenTienDo(dt,de);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GetChiTietChuyenTienDo")]
        public dynamic GetChiTietChuyenTienDo(string line,DateTime dt, DateTime de)
        {

            DataTable tbl = _repo.GetChiTietChuyenTienDo(line,dt, de);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GetChiTietChuyenNgayGiao")]
        public dynamic GetChiTietChuyenNgayGiao(string line, DateTime dt, DateTime de)
        {

            DataTable tbl = _repo.GetChiTietChuyenNgayGiao(line, dt, de);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GetMoTa")]
        public dynamic GetMoTa(string action,string line, DateTime dt, DateTime de)
        {

            DataTable tbl = _repo.GetMoTa(action,line, dt, de);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        //Tiến độ new
        [HttpGet]
        [Route("GetMaHangTheoThang")]
        public dynamic GetMaHangTheoThang(string month, string year )
        {

            DataTable tbl = _repo.GetMaHangTheoThang(month, year);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GetAllMaHangTrongThangTheoChuyen")]
        public dynamic GetAllMaHangTrongThangTheoChuyen(string styleID,string month, string year)
        {

            DataTable tbl = _repo.GetAllMaHangTrongThangTheoChuyen(styleID,month, year);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GetChiTietTienDoMaHang")]
        public dynamic GetChiTietTienDoMaHang(string action, string line, string styleID, string month, string year)
        {

            DataTable tbl = _repo.GetChiTietTienDoMaHang(action, line, styleID, month, year);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
    }
}
