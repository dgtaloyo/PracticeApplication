using PracticeApplication.Models;
using RegistrationApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using MySql.Data.MySqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PracticeApplication.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        
        public ActionResult RegistrationPage()
        {
            return View();
        }

        public ActionResult LoginPage()
        {
            return View();
        }

        public ActionResult HomePage()
        {
            return View();
        }

        public ActionResult TourPage()
        {
            return View();
        }

        public ActionResult Packages()
        {
            ViewBag.Message = "Your packages page.";

            return View();
        }

        public ActionResult Dashboard()
        {
            return View();
        }

        public ActionResult UserPage()
        {
            return View();
        }
        public ActionResult PurchaseHistory()
        {
            return View();
        }

        public ActionResult AdminPackages()
        {
            return View();
        }
        public ActionResult Booking()
        {
            return View();
        }
        public ActionResult Customers()
        {
            return View();
        }

        public ActionResult Inquiries()
        {
            return View();
        }

        public string GetConnection()
        {
            var returnValue = "Connected succesfully";
            return returnValue;
        }

        public string GetConnectionwithParameter(int AccessID)
        {
            if (AccessID == 1)
            {
                return "The Access of the user is admin";
            }else
            {
                return "The Access of the user is user";
            }
        }

        public JsonResult PostUser(RegistrationModel userInformation)
        {
            var fName = userInformation.firstName;
            var lName = userInformation.lastName;
            var mName = userInformation.middleName;
            var address = userInformation.address;
            var userNum = userInformation.userNumber;
            var userEmail = userInformation.userEmail;

            var registrationInstance = new RegistrationModel()
            {
                firstName = fName,
                lastName = lName,
                middleName = mName,
                address = address,
                userNumber = userNum,
                userEmail = userEmail,
            };
            return Json(registrationInstance, JsonRequestBehavior.AllowGet);
        }

        public void AddUser(tblUsersModel userInformation)
        {
            var dateToday = DateTime.Now;
            using (var connect = new CompaniesContext()) 
            {
               

                try
                {
                    userInformation.createdAt = dateToday;
                    userInformation.updatedAt = dateToday;
                    connect.tblusers.Add(userInformation);
                    connect.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    Console.WriteLine(ex.InnerException);

                }

            }
        }




    }
}