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
    }
}