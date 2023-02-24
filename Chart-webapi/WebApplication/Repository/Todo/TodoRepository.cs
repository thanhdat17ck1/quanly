using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using WebApplication.Models;

namespace WebApplication.Repository.Todo
{
    public interface ITodoRepository
    {
        DataTable Get();
        DataTable GetDetail(int id);
        DataTable GetDoanhThu();
        DataTable GetTop3banchay();
        //JArray Insert(string title);

        //JArray Update(string title, int id);

        //bool Delete(int id);
    }
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoModel _model;

        public TodoRepository()
        {
            _model = new TodoModel();
        }

        public DataTable Get()
        {
            DataTable tb = _model.GetTodo();
            return tb;
        }

        public DataTable GetDetail(int id)
        {
            DataTable tb = _model.GetDetailTodo(id);
            return tb;
        }
        public DataTable GetDoanhThu()
        {
            DataTable tb = _model.GetDoanhThu();
            return tb;
        }
        public DataTable GetTop3banchay()
        {
            DataTable tb = _model.GetTop3banchay();
            return tb;
        }
        //public JArray Insert(string title)
        //{
        //    DataTable tb = _model.InsertTodo(title);
        //    string json = JsonConvert.SerializeObject(tb);
        //    JArray jarray = JArray.Parse(json);
        //    tb = JsonConvert.DeserializeObject<DataTable>(json);
        //    return jarray;
        //}

        //public JArray Update(string title, int id)
        //{
        //    DataTable tb = _model.UpdateTodo(title, id);
        //    string json = JsonConvert.SerializeObject(tb);
        //    JArray jarray = JArray.Parse(json);
        //    tb = JsonConvert.DeserializeObject<DataTable>(json);
        //    return jarray;
        //}

        //public bool Delete(int id)
        //{
        //    bool tb = _model.DeleteTodo(id);
        //    return tb;
        //}
    }
}