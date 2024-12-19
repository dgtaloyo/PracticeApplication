using Project.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace Project.Controllers {
    public class HomeController : Controller
    {
        private UserContext db = new UserContext(); // Database context for EF

        public ActionResult NoNavbarPage()
        {
            ViewData["ShowNavbar"] = false; // Disable navbar for this view
            return View();
        }

        // Login Page
        public ActionResult SignupPage()
        {
            return View();
        }
        // POST: Handle signup form submission
        [HttpPost]
        public ActionResult SignupPage(UserModel model)
        {
            if (ModelState.IsValid) {
                // Check if the email is already registered
                var existingUser = db.tblusers.FirstOrDefault(u => u.Email == model.Email);
                if (existingUser != null) {
                    ModelState.AddModelError("Email", "Email is already taken.");
                    return View(model);
                }
                // Create a new user object
                var newUser = new UserModel
                {
                    FirstName = model.FirstName,
                        LastName = model.LastName,
                        Username = model.Username,
                        Email = model.Email,
                        Password = model.Password, // TODO: Hash password before saving
                        Role = "user", // Default role
                        RequestedRole = model.RequestedRole,
                        Status = "pending", // Default status
                        Reason = model.Reason,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                };
                // Add the new user to the database and save changes
                db.tblusers.Add(newUser);
                db.SaveChanges();

                return RedirectToAction("LoginPage"); // Redirect to the home page after successful signup 
            }
            return View(model); // Return to the form if there are validation errors
        }

        // Login Page
        public ActionResult LoginPage()
        {
            return View();
        }

        // POST: Handle login form submission
        [HttpPost]
        public JsonResult Login(LoginModel model)
        {
            if (ModelState.IsValid) {
                var user = db.tblusers.FirstOrDefault(u => u.Email == model.Email && u.Password == model.Password);
                if (user != null) {
                    // Store user email and role in session
                    Session["UserEmail"] = user.Email;
                    Session["UserRole"] = user.Role;

                    return Json(new { success = true, role = user.Role });
                }
                else {
                    return Json(new { success = false, message = "Incorrect username or password." });
                }
            }
            return Json(new { success = false, message = "Invalid input" });
        }

        public ActionResult Dashboard(string role)
        {
            var validRoles = new List < string > { "admin", "writer", "user" };
            if (validRoles.Contains(role.ToLower())) {
                return View(role.First().ToString().ToUpper() + role.Substring(1) + "Dashboard");
            }
            else {
                return RedirectToAction("Index");
            }
        }

        [HttpGet]
        public JsonResult GetProfile(string role)
        {
            // Get user email from session
            var userEmail = Session["UserEmail"]?.ToString();

            if (string.IsNullOrEmpty(userEmail))
                return Json(new { success = false, message = "User not logged in" }, JsonRequestBehavior.AllowGet);

            // Fetch user data from the database
            var user = db.tblusers.FirstOrDefault(u => u.Email.ToLower() == userEmail.ToLower());

            if (user == null)
                return Json(new { success = false, message = "User not found" }, JsonRequestBehavior.AllowGet);

            // Return user data
            return Json(new
                {
                    success = true,
                    data = new
                        {
                            firstName = user.FirstName,
                            lastName = user.LastName,
                            email = user.Email,
                            username = user.Username,
                            password = user.Password
                        }
                }, JsonRequestBehavior.AllowGet);
        }

        // PROFILE TAB FOR ALL DASHES
        [HttpPost]
        public JsonResult UpdateProfile(UserModel model)
        {
            var user = db.tblusers.FirstOrDefault(u => u.Email == model.Email);
            if (user == null) return Json(new { success = false, message = "User not found" });
            // Update profile fields
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Username = model.Username;
            if (!string.IsNullOrEmpty(model.Password)) user.Password = model.Password; // Update password if provided
            db.SaveChanges();
            return Json(new { success = true, message = "Profile updated successfully" });
        }

        // MODERATION TAB FOR ADMIN DASH
        [HttpGet]
        public JsonResult GetAllUsers()
        {
            var users = db.tblusers
                .Select(user => new
                    {
                        UserID = user.UserID,
                        Email = user.Email,
                        Role = user.Role,
                        RequestedRole = user.RequestedRole,
                        Reason = user.Reason,
                        Status = user.Status
                    })
                .OrderBy(user => user.Status == "pending" ? 0 : user.Status == "active" ? 1 : 2) // Sort order: Pending > Active > Rejected
                .ToList();
            return Json(new { data = users }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ApproveUser(int UserID)
        {
            var user = db.tblusers.FirstOrDefault(u => u.UserID == UserID);
            if (user == null) {
                return Json(new { success = false, message = "User not found." });
            }
            if (!string.IsNullOrEmpty(user.RequestedRole)) {
                user.Role = user.RequestedRole; // Grant the requested role
                user.RequestedRole = null; // Clear the requested role
                user.Status = "active"; // Update status
                user.UpdatedAt = DateTime.Now; // Update timestamp
                db.SaveChanges();
                return Json(new { success = true, message = "User approved successfully." });
            }
            return Json(new { success = false, message = "No requested role to approve." });
        }

        [HttpPost]
        public JsonResult DeleteUser(int UserID)
        {
            var user = db.tblusers.FirstOrDefault(u => u.UserID == UserID);
            if (user == null) {
                return Json(new { success = false, message = "User not found." });
            }
            user.Status = "rejected";
            user.RequestedRole = null;
            user.UpdatedAt = DateTime.Now;
            db.SaveChanges();
            return Json(new { success = true, message = "User deleted successfully." });
        }

        // Index Page
        public ActionResult Index()
        {
            return View();
        }

        // About Page
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }

        // Contact Page
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            return View();
        }

        // HomePage
        public ActionResult HomePage()
        {
            return View();
        }

        // Attraction Page
        public ActionResult AttractionPage()
        {
            return View();
        }

        // Contact Page
        public ActionResult ContactPage()
        {
            return View();
        }

        public ActionResult UserDashboard()
        {
            if (Session["UserEmail"] == null || Session["UserRole"]?.ToString() != "user") {
                return RedirectToAction("LoginPage");
            }
            return View();
        }

        public ActionResult AdminDashboard()
        {
            if (Session["UserEmail"] == null || Session["UserRole"]?.ToString() != "admin") {
                return RedirectToAction("LoginPage");
            }
            return View();
        }

        public ActionResult WriterDashboard()
        {
            if (Session["UserEmail"] == null || Session["UserRole"]?.ToString() != "writer") {
                return RedirectToAction("LoginPage");
            }
            return View();
        }



        // Writer Posts
        public ActionResult WriterPosts()
        {
            return View();
        }

        // Moderation
        public ActionResult Moderation()
        {
            return View();
        }

        // Experience Blog
        public ActionResult ExperienceBlog()
        {
            return View();
        }

        // Experience Page
        public ActionResult ExperiencePage()
        {
            return View();
        }

        //ADD COMMENT
        [HttpPost]
        public JsonResult PostUser(tblCommentsModel comments)
        {
            try {
                using(var connect = new commentsContext())
                    {
                        // Save the new comment
                        var newComment = new tblCommentsModel
                    {
                    FullName = comments.FullName,
                        CEmail = comments.CEmail,
                        PhoneNumber = comments.PhoneNumber,
                        Subject = comments.Subject,
                        Comment = comments.Comment,
                        PostedAt = DateTime.Now
                };

                connect.tblcomments.Add(newComment);
                connect.SaveChanges();
            }
                return Json(new { success = true, message = "Comment submitted successfully!" });
        }
            catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"Error: {ex.Message}");
            return Json(new { success = false, message = "An error occurred. Please try again later." });
        }
    }

    //SUBMIT EXPERIENCE BLOG
    [HttpPost]
        public JsonResult CreateBlog(string title, string content, HttpPostedFileBase thumbnail, HttpPostedFileBase header, HttpPostedFileBase picture1, HttpPostedFileBase picture2, HttpPostedFileBase picture3)
    {
        var uploadPath = Server.MapPath("~/Content/BlogImages/");
        if (!Directory.Exists(uploadPath))
            Directory.CreateDirectory(uploadPath);

            // File paths for database
            string thumbnailPath = null;
            string headerPath = null;
            string picture1Path = null;
            string picture2Path = null;
            string picture3Path = null;

        // Save files to the server and prepare file paths
        if (thumbnail != null) {
            thumbnailPath = Path.Combine("/Content/BlogImages/", "thumbnail_" + thumbnail.FileName);
            thumbnail.SaveAs(Server.MapPath(thumbnailPath));
        }
        if (header != null) {
            headerPath = Path.Combine("/Content/BlogImages/", "header_" + header.FileName);
            header.SaveAs(Server.MapPath(headerPath));
        }
        if (picture1 != null) {
            picture1Path = Path.Combine("/Content/BlogImages/", "picture1_" + picture1.FileName);
            picture1.SaveAs(Server.MapPath(picture1Path));
        }
        if (picture2 != null) {
            picture2Path = Path.Combine("/Content/BlogImages/", "picture2_" + picture2.FileName);
            picture2.SaveAs(Server.MapPath(picture2Path));
        }
        if (picture3 != null) {
            picture3Path = Path.Combine("/Content/BlogImages/", "picture3_" + picture3.FileName);
            picture3.SaveAs(Server.MapPath(picture3Path));
        }

        // Create a new instance of the blog model
        var blog = new tblBlogsModel
        {
            title = title,
                content = content,
                thumbnail = thumbnailPath,
                header = headerPath,
                picture1 = picture1Path,
                picture2 = picture2Path,
                picture3 = picture3Path,
                postedAt = DateTime.Now
        };

        // Retrieve all users from the database to assign a UserID
        using(var context = new blogsContext())
            {
                var users = context.tblUsers.ToList();

        // Ensure there is at least one valid user to assign
        if (users.Any()) {
                    Random random = new Random();
            var randomUser = users[random.Next(users.Count)];
            blog.UserID = randomUser.UserID;  // Assign a non-null UserID
        }
        else {
            // Handle the case where no users are found
            return Json(new { success = false, message = "No users available to assign to the blog." });
        }

        // Add the blog to the context and save changes to the database
        context.tblBlogs.Add(blog);
        context.SaveChanges();
    }

    return Json(new { success = true, message = "Blog created successfully." });
}




// EXPERIENCE BLOG TO ADMIN
[HttpGet]
        public JsonResult GetWriterPosts()
{
    using(var context = new blogsContext())
        {
            var posts = context.tblBlogs
                .Select(blog => new
                    {
                        id = blog.blogID,
                        title = blog.title,
                        content = blog.content.Length > 50
                            ? blog.content.Substring(0, 50) + "..." // Ellipsis for long content
                            : blog.content,
                        creationDate = blog.postedAt // Leave this as DateTime for now
                    })
                .ToList() // Fetch data from the database first
                .Select(blog => new
                    {
                        blog.id,
                        blog.title,
                        blog.content,
                        creationDate = blog.creationDate.ToString("yyyy-MM-dd"), // Format in memory
                    }).ToList();

    return Json(new { data = posts }, JsonRequestBehavior.AllowGet);
}
        }

[HttpPost]
        public JsonResult UpdatePostStatus(int id, string blogStatus)
{
    using(var context = new blogsContext())
        {
            var post = context.tblBlogs.FirstOrDefault(b => b.blogID == id);
    if (post != null) {
        post.blogStatus = blogStatus;
        context.SaveChanges();
        return Json(new { success = true });
    }
    return Json(new { success = false });
}
        }


// ADMIN TO EXPERIENCE PAGE
[HttpGet]
        public JsonResult GetApprovedPosts()
{
    using(var context = new blogsContext())
        {
            var approvedPosts = context.tblBlogs
                .Where(p => p.blogStatus == "Approved") // Filter for approved posts
                .Join(
                    context.tblUsers, // Join with tblUsers
                    post => post.UserID, // Foreign key in tblBlogs
                    user => user.UserID, // Primary key in tblUsers
                    (post, user) => new // Result selector
                        {
                            id = post.blogID,
                            title = post.title,
                            content = post.content,
                            thumbnail = post.thumbnail,
                            postedAt = post.postedAt,
                            username = user.Username,
                            picture1 = post.picture1,
                            picture2 = post.picture2,
                            picture3 = post.picture3
                        })
                .ToList() // Execute the query and bring the data into memory
                .Select(post => new
                    {
                        post.id,
                        post.title,
                        post.content,
                        post.thumbnail,
                        post.username,
                        post.picture1,
                        post.picture2,
                        post.picture3,
                        postedAt = post.postedAt.ToString("yyyy-MM-dd") // Format the date in memory
                    })
                .ToList(); // Convert to a list again after formatting

    return Json(new { data = approvedPosts }, JsonRequestBehavior.AllowGet);
}
        }

        // CHART ON ABOUT PAGE
        
    }
}