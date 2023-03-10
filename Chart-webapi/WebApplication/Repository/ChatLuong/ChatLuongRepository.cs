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
    public interface IChatLuongRepository
    {
        DataTable GetAllChuyenLoi(DateTime dt,DateTime de);
        DataTable GetThongKeTLLoi(string line,DateTime dt, DateTime de);
        DataTable GetThongKeTLLoiChuyen(string line, DateTime dt, DateTime de);
        DataTable GetThongKeTLLoiTheoMaHang(string line, DateTime dt, DateTime de);

        //DataTable GetMoTa(string action ,string line, DateTime dt, DateTime de);

        //new 
        
        DataTable GetThongKeTLLoiThangTheoMaHang(string action,string line,string styleID, string month, string year);

        DataTable GetChatLuongChiTiet(string action, string line, string styleID, string month, string year);
    }
    public class ChatLuongRepository : IChatLuongRepository
    {
        private readonly ChatLuongModel _model;

        public ChatLuongRepository()
        {
            _model = new ChatLuongModel();
        }

        public DataTable GetAllChuyenLoi(DateTime dt, DateTime de)
        {
            DataTable tb = _model.GetAllChuyenLoi(dt,de);
            return tb;
        }
        public DataTable GetThongKeTLLoi(string line, DateTime dt, DateTime de)
        {
            DataTable tb = _model.GetThongKeTLLoi(line, dt, de);
            return tb;
        }
        public DataTable GetThongKeTLLoiChuyen(string line, DateTime dt, DateTime de)
        {
            DataTable tb = _model.GetThongKeTLLoiChuyen(line, dt, de);
            return tb;
        }
        public DataTable GetThongKeTLLoiTheoMaHang(string line, DateTime dt, DateTime de)
        {
            DataTable tb = _model.GetThongKeTLLoiTheoMaHang(line, dt, de);
            return tb;
        }

        //public DataTable GetMoTa(string action ,string line, DateTime dt, DateTime de)
        //{
        //    DataTable tb = _model.GetMoTa(action,line, dt, de);
        //    return tb;
        //}
        public DataTable GetThongKeTLLoiThangTheoMaHang(string action,string line,string styleID, string month, string year)
        {
            DataTable tb = _model.GetThongKeTLLoiThangTheoMaHang(action,line, styleID,month, year);
            return tb;
        }

        //chitiet
        public DataTable GetChatLuongChiTiet(string action, string line, string styleID, string month, string year)
        {
            DataTable tb = _model.GetChatLuongChiTiet(action, line, styleID, month, year);
            return tb;
        }
    }
}