using Google.Protobuf.WellKnownTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PracticeApplication.Models
{
    public class tblAdminsModel
    {
        public int adminID {  get; set; }
        public string adminName { get; set; }
        public string adminPassword { get; set; }
        public Timestamp createdAt { get; set; }
        public Timestamp updatedAt { get; set; }

    }
}