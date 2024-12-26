
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TourTerraApplication.Models
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

        


        public virtual DbSet<tblBookingsModel> tblbookings { get; set; }
        public virtual DbSet<tblPackagesModel> tblpackages { get; set; }
        public virtual DbSet<tblUsersModel> tblusers {  get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Configurations.Add(new tblBookingsMap());
            modelBuilder.Configurations.Add(new tblPackagesMap());
            modelBuilder.Configurations.Add(new tblUsersMap());
        }
    }
}