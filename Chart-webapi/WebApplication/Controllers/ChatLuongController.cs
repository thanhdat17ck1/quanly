using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Controllers
{
    public class ChatLuongController : Controller
    {
        // GET: ChatLuong
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ChiTiet()
        {
            return View();
        }
        public ActionResult TongQuan()
        {
            return View();
        }
    }
}