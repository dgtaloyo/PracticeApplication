using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace PracticeApplication.Models
{
    public class tblInquiriesMap : EntityTypeConfiguration<tblInquiriesModel>
    {
        public tblInquiriesMap()
        {
            HasKey(x => x.inquiryID);
            ToTable("tblInquiries");
        }
    }
}