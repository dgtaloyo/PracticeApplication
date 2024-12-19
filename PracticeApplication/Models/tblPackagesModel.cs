using Google.Protobuf.WellKnownTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PracticeApplication.Models
{
    public class tblPackagesModel
    {
        public int packageID {  get; set; }
        public string packageName { get; set; }
        public string packageType { get; set; }
        public string packageLocation { get; set; }
        public float packagePrice { get; set; }
        public string packageFeatuers { get; set; }
        public string packageDetails { get; set; }
        public Timestamp createdAt { get; set; }
        public Timestamp updatedAt { get; set; }

    }
}