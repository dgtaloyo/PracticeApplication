
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PracticeApplication.Models
{
    [DbConfigurationType(typeof(MySql.Data.EntityFramework.MySqlEFConfiguration))]
    public class CompaniesContext : DbContext
    {
        static CompaniesContext()
        {
            Database.SetInitializer<CompaniesContext>(null);
        }


        public CompaniesContext() : base("Name=dbtourterra")
        {

        }


        public virtual DbSet<tblAdminsModel> tbladmins { get; set; }
        public virtual DbSet<tblBookingsModel> tblbookings { get; set; }
        public virtual DbSet<tblInquiriesModel> tblinquiries { get; set; }
        public virtual DbSet<tblPackagesModel> tblpackages { get; set; }
        public virtual DbSet<tblUsersModel> tblusers {  get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Configurations.Add(new tblAdminsMap());
            modelBuilder.Configurations.Add(new tblBookingsMap());
            modelBuilder.Configurations.Add(new tblInquiriesMap());
            modelBuilder.Configurations.Add(new tblPackagesMap());
            modelBuilder.Configurations.Add(new tblUsersMap());
        }
    }
}