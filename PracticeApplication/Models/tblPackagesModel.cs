using Google.Protobuf.WellKnownTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TourTerraApplication.Models
{
    public class tblPackagesModel
    {
        public int packageID {  get; set; }
        public string packageName { get; set; }
        public string packageLocation { get; set; }
        public float packagePrice { get; set; }
        public string packageDetails { get; set; }
        public DateTime packageStart { get; set; }
        public DateTime packageEnd  { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }

    }
}