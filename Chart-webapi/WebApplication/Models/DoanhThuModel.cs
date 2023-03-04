using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class DoanhThuModel
    {
        public DataTable GetTopDTKHAllTime()
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("SP_ERP_BAOCAOTONGHOPDOANHTHUWEB_REPORT", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GetTopDTKH");
                cmd.Parameters.AddWithValue("@FromDate", "06-01-2022");
                cmd.Parameters.AddWithValue("@ToDate", "06-30-2022");
                cmd.Parameters.AddWithValue("@UserName", "admin");
                cmd.Parameters.AddWithValue("@timeline", "tatca");
                cmd.Parameters.AddWithValue("@MaHangKhach", "");
                using (SqlDataAdapter adt = new SqlDataAdapter(cmd))
                {
                    DataTable tb = new DataTable();
                    adt.Fill(tb);
                    return tb;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        }
        public DataTable GetTopDTKHYearAgo()
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("SP_ERP_BAOCAOTONGHOPDOANHTHUWEB_REPORT", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GetTopDTKH");
                cmd.Parameters.AddWithValue("@FromDate", "01-01-2022");
                cmd.Parameters.AddWithValue("@ToDate", "12-31-2022");
                cmd.Parameters.AddWithValue("@UserName", "admin");
                cmd.Parameters.AddWithValue("@timeline", "namtruoc");
                cmd.Parameters.AddWithValue("@MaHangKhach", "");
                using (SqlDataAdapter adt = new SqlDataAdapter(cmd))
                {
                    DataTable tb = new DataTable();
                    adt.Fill(tb);
                    return tb;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        }
        public DataTable GetTopDTKHMonthAgo()
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("SP_ERP_BAOCAOTONGHOPDOANHTHUWEB_REPORT", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GetTopDTKH");
                cmd.Parameters.AddWithValue("@FromDate", "06-01-2022");
                cmd.Parameters.AddWithValue("@ToDate", "06-30-2022");
                cmd.Parameters.AddWithValue("@UserName", "admin");
                cmd.Parameters.AddWithValue("@timeline", "thangtruoc");
                cmd.Parameters.AddWithValue("@MaHangKhach", "");
                using (SqlDataAdapter adt = new SqlDataAdapter(cmd))
                {
                    DataTable tb = new DataTable();
                    adt.Fill(tb);
                    return tb;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        }
        public DataTable GetTopDTKHWeekAgo()
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("SP_ERP_BAOCAOTONGHOPDOANHTHUWEB_REPORT", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GetTopDTKH");
                cmd.Parameters.AddWithValue("@FromDate", "06-01-2022");
                cmd.Parameters.AddWithValue("@ToDate", "06-30-2022");
                cmd.Parameters.AddWithValue("@UserName", "admin");
                cmd.Parameters.AddWithValue("@timeline", "tuantruoc");
                cmd.Parameters.AddWithValue("@MaHangKhach", "");
                using (SqlDataAdapter adt = new SqlDataAdapter(cmd))
                {
                    DataTable tb = new DataTable();
                    adt.Fill(tb);
                    return tb;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        }

        public DataTable GETChiTietDTKH(string fromdate,string todate, string makhachhang)
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("SP_ERP_BAOCAOTONGHOPDOANHTHUWEB_REPORT", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GETChiTietDTKH");
                cmd.Parameters.AddWithValue("@FromDate", fromdate);
                cmd.Parameters.AddWithValue("@ToDate", todate);
                cmd.Parameters.AddWithValue("@UserName", "admin");
                cmd.Parameters.AddWithValue("@timeline", "");
                cmd.Parameters.AddWithValue("@MaHangKhach", makhachhang);
                using (SqlDataAdapter adt = new SqlDataAdapter(cmd))
                {
                    DataTable tb = new DataTable();
                    adt.Fill(tb);
                    return tb;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        }

        public DataTable GETDSKH(string fromdate, string todate)
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("SP_ERP_BAOCAOTONGHOPDOANHTHUWEB_REPORT", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GETDSKH");
                cmd.Parameters.AddWithValue("@FromDate", fromdate);
                cmd.Parameters.AddWithValue("@ToDate", todate);
                cmd.Parameters.AddWithValue("@UserName", "admin");
                cmd.Parameters.AddWithValue("@timeline", "tuantruoc");
                cmd.Parameters.AddWithValue("@MaHangKhach", "");
                using (SqlDataAdapter adt = new SqlDataAdapter(cmd))
                {
                    DataTable tb = new DataTable();
                    adt.Fill(tb);
                    return tb;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        }

        public DataTable GETDTTungMaHang(string fromdate, string todate)
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("SP_ERP_BAOCAOTONGHOPDOANHTHUWEB_REPORT", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GETDTTungMaHang");
                cmd.Parameters.AddWithValue("@FromDate", fromdate);
                cmd.Parameters.AddWithValue("@ToDate", todate);
                cmd.Parameters.AddWithValue("@UserName", "admin");
                cmd.Parameters.AddWithValue("@timeline", "");
                cmd.Parameters.AddWithValue("@MaHangKhach", "");
                using (SqlDataAdapter adt = new SqlDataAdapter(cmd))
                {
                    DataTable tb = new DataTable();
                    adt.Fill(tb);
                    return tb;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        }

        public DataTable GETDTTheoSoLuong(string fromdate, string todate)
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("SP_ERP_BAOCAOTONGHOPDOANHTHUWEB_REPORT", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GETDTTheoSoLuong");
                cmd.Parameters.AddWithValue("@FromDate", fromdate);
                cmd.Parameters.AddWithValue("@ToDate", todate);
                cmd.Parameters.AddWithValue("@UserName", "admin");
                cmd.Parameters.AddWithValue("@timeline", "");
                cmd.Parameters.AddWithValue("@MaHangKhach", "");
                using (SqlDataAdapter adt = new SqlDataAdapter(cmd))
                {
                    DataTable tb = new DataTable();
                    adt.Fill(tb);
                    return tb;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        }

        public DataTable GETDTHomNay(string fromdate, string todate)
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("SP_ERP_BAOCAOTONGHOPDOANHTHUWEB_REPORT", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GETDTHomNay");
                cmd.Parameters.AddWithValue("@FromDate", fromdate);
                cmd.Parameters.AddWithValue("@ToDate", todate);
                cmd.Parameters.AddWithValue("@UserName", "admin");
                cmd.Parameters.AddWithValue("@timeline", "");
                cmd.Parameters.AddWithValue("@MaHangKhach", "");
                using (SqlDataAdapter adt = new SqlDataAdapter(cmd))
                {
                    DataTable tb = new DataTable();
                    adt.Fill(tb);
                    return tb;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        }

        public DataTable GETDThangTrongNam()
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("SP_ERP_DoanhThuThangTrongNam", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GETDThangTrongNam");
                cmd.Parameters.AddWithValue("@FromDate", "06-01-2022");
                cmd.Parameters.AddWithValue("@ToDate", "06-01-2022");
                using (SqlDataAdapter adt = new SqlDataAdapter(cmd))
                {
                    DataTable tb = new DataTable();
                    adt.Fill(tb);
                    return tb;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        }
    }
}