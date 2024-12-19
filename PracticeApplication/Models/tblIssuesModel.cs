using Google.Protobuf.WellKnownTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PracticeApplication.Models
{
    public class tblIssuesModel
    {
        public int issueID { get; set; }
        public string userEmail { get; set; }
        public string Issue { get; set; }
        public string Description { get; set; }
        public Timestamp postingDate { get; set; }
        public string adminRemark { get; set; }
        public Timestamp adminRemarkDate { get; set; }
        public Timestamp createdAt { get; set; }
        public Timestamp updatedAT { get; set; }
    }
}