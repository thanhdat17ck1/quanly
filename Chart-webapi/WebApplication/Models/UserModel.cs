using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class UserModel
    {
        public DataTable CheckLogin(string email, string password)
        {
            SqlConnection conn = null;
            try
            {

                conn = Libs.SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("[SP_ERP_QUANLY_CUT_NEW]", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GET");
                cmd.Parameters.AddWithValue("@SPOID", "");
                cmd.Parameters.AddWithValue("@MaLenh", "");
                cmd.Parameters.AddWithValue("@NhomVai", 0);
                cmd.Parameters.AddWithValue("@CutTable", "");
                cmd.Parameters.AddWithValue("@Code_TNC", "");
                cmd.Parameters.AddWithValue("@AllowCut", "");
                cmd.Parameters.AddWithValue("@Date", "");
                cmd.Parameters.AddWithValue("@Parameter", "");
                using (SqlDataAdapter adt = new SqlDataAdapter(cmd))
                {
                    DataTable ds = new DataTable();
                    adt.Fill(ds);
                    return ds;
                }
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
            finally { if (conn != null) { conn.Close(); conn.Dispose(); } }
        }
    }
}