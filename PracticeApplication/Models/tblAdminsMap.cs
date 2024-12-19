using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace PracticeApplication.Models
{
    public class tblAdminsMap : EntityTypeConfiguration<tblAdminsModel>
    {
        public tblAdminsMap()
        {
            HasKey(x => x.adminID);
            ToTable("tblAdmins");
        }
    }
}