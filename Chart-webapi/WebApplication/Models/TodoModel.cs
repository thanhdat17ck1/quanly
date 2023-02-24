using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class TodoModel
    {
        public DataTable GetTodo()
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("sp_pie", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "get");
                cmd.Parameters.AddWithValue("@id", "");
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

        public DataTable GetDetailTodo(int id)
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("sp_pie", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "getDetail");
                cmd.Parameters.AddWithValue("@id", id);
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

        public DataTable GetDoanhThu()
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("SP_doanhthu", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GetDoanhThu");
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
        public DataTable GetTop3banchay()
        {
            SqlConnection _cnn = null;

            try
            {
                _cnn = SqlHelper.GetConnection();
                SqlCommand cmd = new SqlCommand("SP_doanhthu", _cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GetTop3banchay");
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

        //public DataTable InsertTodo(string title)
        //{
        //    SqlConnection _cnn = null;

        //    try
        //    {
        //        _cnn = SqlHelper.GetConnection();
        //        SqlCommand cmd = new SqlCommand("sp_Todo", _cnn);
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.Parameters.AddWithValue("@Action", "insert");
        //        cmd.Parameters.AddWithValue("@title", title);
        //        cmd.Parameters.AddWithValue("@id", "");
        //        using (SqlDataAdapter adt = new SqlDataAdapter(cmd))
        //        {
        //            DataTable tb = new DataTable();
        //            adt.Fill(tb);
        //            return tb;
        //        }
        //    }

        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //    finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        //}

        //public DataTable UpdateTodo(string title, int id)
        //{
        //    SqlConnection _cnn = null;

        //    try
        //    {
        //        _cnn = SqlHelper.GetConnection();
        //        SqlCommand cmd = new SqlCommand("sp_Todo", _cnn);
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.Parameters.AddWithValue("@Action", "update");
        //        cmd.Parameters.AddWithValue("@title", title);
        //        cmd.Parameters.AddWithValue("@id", id);
        //        using (SqlDataAdapter adt = new SqlDataAdapter(cmd))
        //        {
        //            DataTable tb = new DataTable();
        //            adt.Fill(tb);
        //            return tb;
        //        }
        //    }

        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //    finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        //}

        //public bool DeleteTodo(int id)
        //{
        //    SqlConnection _cnn = null;

        //    try
        //    {
        //        _cnn = SqlHelper.GetConnection();
        //        SqlCommand cmd = new SqlCommand("sp_Todo", _cnn);
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.Parameters.AddWithValue("@Action", "update");
        //        cmd.Parameters.AddWithValue("@title", "");
        //        cmd.Parameters.AddWithValue("@id", id);

        //        return true;
        //    }

        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //    finally { if (_cnn != null) { _cnn.Close(); _cnn.Dispose(); } }
        //}
    }
}