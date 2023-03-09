using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using WebApplication.Models;

namespace WebApplication.Repository.DoanhThu
{
    public interface IDoanhThuRepository
    {
        DataTable GetTopDTKHAllTime();
        DataTable GetTopDTKHYearAgo();
        DataTable GetTopDTKHMonthAgo();
        DataTable GetTopDTKHWeekAgo();
        DataTable GETDSKH(string fromdate, string todate);
        DataTable GETDTTungMaHang(string fromdate, string todate);
        DataTable GETDTTheoSoLuong(string fromdate, string todate);
        DataTable GETDTHomNay(string fromdate, string todate);
        DataTable GETDThangTrongNam();
        DataTable GETDTTungChuyen();
        DataTable GETDTTungMaHang();
        DataTable GETChiTietDTKH(string fromdate, string todate, string makhachhang);
        //JArray Insert(string title);
        
        //JArray Update(string title, int id);

        //bool Delete(int id);
    }
    public class DoanhThuRepository: IDoanhThuRepository
    {
        private readonly DoanhThuModel _model;

        public DoanhThuRepository()
        {
            _model = new DoanhThuModel();
        }

        public DataTable GetTopDTKHAllTime()
        {
            DataTable tb = _model.GetTopDTKHAllTime();
            return tb;
        }
        public DataTable GetTopDTKHYearAgo()
        {
            DataTable tb = _model.GetTopDTKHYearAgo();
            return tb;
        }
        public DataTable GetTopDTKHMonthAgo()
        {
            DataTable tb = _model.GetTopDTKHMonthAgo();
            return tb;
        }
        public DataTable GetTopDTKHWeekAgo()
        {
            DataTable tb = _model.GetTopDTKHWeekAgo();
            return tb;
        }
        public DataTable GETChiTietDTKH(string fromdate, string todate, string makhachhang)
        {
            DataTable tb = _model.GETChiTietDTKH(fromdate, todate, makhachhang);
            return tb;
        }
        public DataTable GETDSKH(string fromdate, string todate)
        {
            DataTable tb = _model.GETDSKH(fromdate, todate);
            return tb;
        }
        public DataTable GETDTTungMaHang(string fromdate, string todate)
        {
            DataTable tb = _model.GETDTTungMaHang(fromdate, todate);
            return tb;
        }

        public DataTable GETDTTheoSoLuong(string fromdate, string todate)
        {
            DataTable tb = _model.GETDTTheoSoLuong(fromdate, todate);
            return tb;
        }
        public DataTable GETDTHomNay(string fromdate, string todate)
        {
            DataTable tb = _model.GETDTHomNay(fromdate, todate);
            return tb;
        }

        public DataTable GETDThangTrongNam()
        {
            DataTable tb = _model.GETDThangTrongNam();
            return tb;
        }
        public DataTable GETDTTungChuyen()
        {
            DataTable tb = _model.GETDTTungChuyen();
            return tb;
        }
        public DataTable GETDTTungMaHang()
        {
            DataTable tb = _model.GETDTTungMaHang();
            return tb;
        }
    }
}