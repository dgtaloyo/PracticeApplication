using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace PracticeApplication.Models
{
    public class tblUsersMap : EntityTypeConfiguration<tblUsersModel>
    {
        public tblUsersMap()
        {
            HasKey(x => x.userID);
            ToTable("tblusers");
        }
    }
}