using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace TourTerraApplication.Models
{
    public class tblPackagesMap : EntityTypeConfiguration<tblPackagesModel>
    {
        public tblPackagesMap()
        {
            HasKey(x => x.packageID);
            ToTable("tblPackages");
        }
    }
}