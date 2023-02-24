using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class KeHoachDongThungModel
    {
        public DataTable GetIsScan()
        {
            SqlConnection _cnn = null;
            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("sp_Todo", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "get");
                cmd.Parameters.AddWithValue("@Title", "title");
                //cmd.Parameters.AddWithValue("@MaLenh", "");
                //cmd.Parameters.AddWithValue("@MaHang", "");
                //cmd.Parameters.AddWithValue("@SPOID", "");
                //cmd.Parameters.AddWithValue("@TuThungDenThung", "");
                //cmd.Parameters.AddWithValue("@Parameter", "");
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