using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PracticeApplication.Models
{
    public class tblInquiriesModel
    {
        public int inquiryID {  get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public DateTime postingDate { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }

    }
}