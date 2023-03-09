using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Controllers
{
    public class DoanhThuController : Controller
    {
        // GET: DoanhThu
        public ActionResult khachhang()
        {
            return View();
        }
        public ActionResult sanpham()
        {
            return View();
        }
        public ActionResult tonghop()
        {
            return View();
        }
        public ActionResult theothoigian()
        {
            return View();
        }
    }
}