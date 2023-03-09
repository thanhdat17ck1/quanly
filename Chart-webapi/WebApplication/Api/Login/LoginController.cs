using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Libs;
using WebApplication.Models;
using WebApplication.Repository.Login;
using System.Security.Cryptography;
using System.Text;

namespace WebApplication.Api.Login
{
    [RoutePrefix("api/Login")]
    public class LoginController : ApiController
    {
        ILoginRepository _repo = new LoginRepository();
        MD5StringCrypt Md5Crypt = new MD5StringCrypt();
        [HttpGet]
        [Route("CheckLogin")]
        public dynamic CheckLogin(string email, string password)
        {
            string input = password;
            byte[] inputBytes = Encoding.UTF8.GetBytes(input);

            MD5 md5 = MD5.Create();
            byte[] hashBytes = md5.ComputeHash(inputBytes);

            StringBuilder sb = new StringBuilder();
            foreach (byte b in hashBytes)
            {
                sb.Append(b.ToString("x2"));
            }

            string hash = sb.ToString();
            Console.WriteLine("MD5 hash of '{0}': {1}", input, hash);

            //_maLenh = maLenh;
            //string pw = Md5Crypt.Decrypt(password, true);
            //DataTable tbl = _repo.CheckLogin(email, password);
            //string json = JsonConvert.SerializeObject(tbl, Formatting.Indented);
            //JArray arr = JArray.Parse(json);
            return 1;
        }
    }
}