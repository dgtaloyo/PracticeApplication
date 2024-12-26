using Google.Protobuf.WellKnownTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TourTerraApplication.Models
{
    public class tblBookingsModel
    {
        public int bookingID {  get; set; }
        public int packageID { get; set; }
        public int userID { get; set; }
        public DateTime fromDate { get; set; }
        public DateTime toDate { get; set; }
        public string Comment {  get; set; }
        public string Status { get; set; }
        public DateTime updatedAt { get; set; }
        public DateTime createdAt { get; set; }
    }
}