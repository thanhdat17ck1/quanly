using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebApplication.Repository.Todo;

namespace WebApplication.Api.Todo
{
    [RoutePrefix("api/Todo")]
    public class TodoController : ApiController
    {
        // GET: Todo
        readonly ITodoRepository _repo = new TodoRepository();
        [HttpGet]
        [Route("GetTodo")]
        public dynamic GetTodo()
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.Get();
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }

        [HttpGet]
        [Route("GetDetailTodo")]
        public dynamic GetDetailTodo(int id)
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GetDetail(id);
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GetDoanhThu")]
        public dynamic GetDoanhThu()
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GetDoanhThu();
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        [HttpGet]
        [Route("GetTop3banchay")]
        public dynamic GetTop3banchay()
        {
            //return _repo.GetPhieuKCSCat(date);

            DataTable tbl = _repo.GetTop3banchay();
            string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            JArray arr = JArray.Parse(json);
            return arr;
        }
        //[HttpPost]
        //[Route("InsertTodo")]
        //public JArray InsertTodo(string title)
        //{
        //    JArray tbl = _repo.Insert(title);
        //    return tbl;
        //}

        //[HttpPost]
        //[Route("UpdateTodo")]
        //public JArray UpdateTodo(string title, int id)
        //{
        //    JArray tbl = _repo.Update(title, id);
        //    return tbl;
        //}

        //[HttpPost]
        //[Route("DeleteTodo")]
        //public bool DeleteTodo(int id)
        //{
        //    bool tbl = _repo.Delete(id);
        //    return tbl;
        //}
    }
}