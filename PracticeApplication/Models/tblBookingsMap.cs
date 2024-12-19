using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace PracticeApplication.Models
{
    public class tblBookingsMap : EntityTypeConfiguration<tblBookingsModel>
    {
        public tblBookingsMap()
        {
            HasKey(x => x.bookingID);
            ToTable("tblBookings");
        }
    }
}