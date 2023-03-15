using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebApplication.Repository.DoanhThu;

namespace WebApplication.Api.DoanhThu
{
    [RoutePrefix("api/DoanhThu")]
    public class DoanhThuController : ApiController
    {
        // GET: DoanhThu
        readonly IDoanhThuRepository _repo = new DoanhThuRepository();
        [HttpGet]
        [Route("GetTopDTKHAllTime")]
        public dynamic GetTopDTKHAllTime()
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GetTopDTKHAllTime();
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        [HttpGet]
        [Route("GetTopDTKHYearAgo")]
        public dynamic GetTopDTKHYearAgo()
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GetTopDTKHYearAgo();
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        [HttpGet]
        [Route("GetTopDTKHMonthAgo")]
        public dynamic GetTopDTKHMonthAgo()
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GetTopDTKHMonthAgo();
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        [HttpGet]
        [Route("GetTopDTKHWeekAgo")]
        public dynamic GetTopDTKHWeekAgo()
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GetTopDTKHWeekAgo();
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        [HttpGet]
        [Route("GETChiTietDTKH")]
        public dynamic GETChiTietDTKH(string fromdate, string todate, string makhachhang)
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GETChiTietDTKH(fromdate, todate, makhachhang);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GETDSKH")]
        public dynamic GETDSKH(string fromdate, string todate)
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GETDSKH(fromdate, todate);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        [HttpGet]
        [Route("GETDTTungMaHang")]
        public dynamic GETDTTungMaHang(string fromdate, string todate)
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GETDTTungMaHang(fromdate, todate);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        [HttpGet]
        [Route("GETDTTheoSoLuong")]
        public dynamic GETDTTheoSoLuong(string fromdate, string todate)
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GETDTTheoSoLuong(fromdate, todate);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        [HttpGet]
        [Route("GETDTHomNay")]
        public dynamic GETDTHomNay(string fromdate, string todate)
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GETDTHomNay(fromdate, todate);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GetTopDTTuyChon")]
        public dynamic GetTopDTTuyChon(string fromdate, string todate)
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GetTopDTTuyChon(fromdate, todate);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GETTongSPHomNay")]
        public dynamic GETTongSPHomNay(string fromdate, string todate)
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GETTongSPHomNay(fromdate, todate);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        [HttpGet]
        [Route("GETDThangTrongNam")]
        public dynamic GETDThangTrongNam(string year)
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GETDThangTrongNam(year);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        [HttpGet]
        [Route("GETDTTungChuyen")]
        public dynamic GETDTTungChuyen(string fromdate, string todate)
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GETDTTungChuyen(fromdate, todate);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        [HttpGet]
        [Route("GETDTTungMaHang")]
        public dynamic GETDTTungMaHang()
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GETDTTungMaHang();
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GETDTTungMaHangTable")]
        public dynamic GETDTTungMaHangTable()
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GETDTTungMaHangTable();
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GETDTTungChuyenTheoThang")]
        public dynamic GETDTTungChuyenTheoThang(string month, string year)
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GETDTTungChuyenTheoThang(month,year);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GETDTTungMaHangTheoThang")]
        public dynamic GETDTTungMaHangTheoThang(string month, string year)
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GETDTTungMaHangTheoThang(month, year);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
    }
}