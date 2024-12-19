using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RegistrationApplication.Models
{
    public class RegistrationModel
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string middleName { get; set; }
        public string address { get; set; }
        public int userNumber { get; set; }
        public string userEmail { get; set; }

    }
}