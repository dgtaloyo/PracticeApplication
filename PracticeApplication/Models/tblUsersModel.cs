using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PracticeApplication.Models
{
    public class tblUsersModel
    {
        public int userID { get; set; }
        public string fName { get; set; }
        public string lName { get; set; }
        public string mName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public string phoneNum { get; set; }
        public int roleID {  get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
    }
}