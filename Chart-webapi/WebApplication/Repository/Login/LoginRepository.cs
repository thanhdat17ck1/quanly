using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using WebApplication.Models;

namespace WebApplication.Repository.Login
{
    public interface ILoginRepository
    {
        string CheckLogin(string email, string password);
    }
    public class LoginRepository : ILoginRepository
    {
        private readonly UserModel _model;
        public LoginRepository()
        {
            _model = new UserModel();
        }
        public string CheckLogin(string email, string password)
        {
            DataTable tb = _model.CheckLogin(email, password);
            string result = Newtonsoft.Json.JsonConvert.SerializeObject(tb);
            return result;
        }
    }
}