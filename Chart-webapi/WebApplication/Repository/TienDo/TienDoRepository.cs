using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using WebApplication.Models;

namespace WebApplication.Repository.Cat
{
    public interface ITienDoRepository
    {
        DataTable GetChuyenTienDo(DateTime dt,DateTime de);
        DataTable GetChiTietChuyenTienDo(string line,DateTime dt, DateTime de);
        DataTable GetChiTietChuyenNgayGiao(string line, DateTime dt, DateTime de);
        DataTable GetMoTa(string action ,string line, DateTime dt, DateTime de);

        
        //new 
        DataTable GetMaHangTheoThang(string month, string year);
        DataTable GetAllMaHangTrongThangTheoChuyen( string styleID,string month, string year);
        DataTable GetChiTietTienDoMaHang(string line, string action, string styleID, string month, string year);


    }
    public class TienDoRepository : ITienDoRepository
    {
        private readonly TienDoModel _model;

        public TienDoRepository()
        {
            _model = new TienDoModel();
        }

        public DataTable GetChuyenTienDo(DateTime dt, DateTime de)
        {
            DataTable tb = _model.GetChuyenTienDo(dt,de);
            return tb;
        }
        public DataTable GetChiTietChuyenTienDo(string line, DateTime dt, DateTime de)
        {
            DataTable tb = _model.GetChiTietChuyenTienDo(line, dt, de);
            return tb;
        }
        public DataTable GetChiTietChuyenNgayGiao(string line, DateTime dt, DateTime de)
        {
            DataTable tb = _model.GetChiTietChuyenNgayGiao(line, dt, de);
            return tb;
        }
        public DataTable GetMoTa(string action ,string line, DateTime dt, DateTime de)
        {
            DataTable tb = _model.GetMoTa(action,line, dt, de);
            return tb;
        }
        //new ....................
        public DataTable GetMaHangTheoThang(string month,string year)
        {
            DataTable tb = _model.GetMaHangTheoThang(month,year);
            return tb;
        }
        public DataTable GetAllMaHangTrongThangTheoChuyen(string styleID,string month, string year)
        {
            DataTable tb = _model.GetAllMaHangTrongThangTheoChuyen(styleID,month, year);
            return tb;
        }
        public DataTable GetChiTietTienDoMaHang(string action, string line, string styleID, string month, string year)
        {
            DataTable tb = _model.GetChiTietTienDoMaHang( action, line, styleID, month, year);
            return tb;
        }
    }
}