using Google.Protobuf.WellKnownTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PracticeApplication.Models
{
    public class tblBookingsModel
    {
        public int bookingID {  get; set; }
        public int packageID { get; set; }
        public string userEmail { get; set; }
        public DateTime fromDate { get; set; }
        public DateTime toDate { get; set; }
        public string Comment {  get; set; }
        public string Status { get; set; }
        public Timestamp regDate { get; set; }
        public Timestamp updatedAt { get; set; }
        public Timestamp createdAt { get; set; }
    }
}