app.service("TourTerraApplicationService", function ($http) {

    this.GetConnection = function () {
        return $http.get("/Home/GetConnection");
    }

    this.GetConnectionParameter = function (accessIdentifier) {
        var response = $http({
            method: "post",
            url: "/Home/GetConnectionwithParameter",
            params: {
                AccessID: accessIdentifier
            }
        })
        return response;
    }

    this.getUserInformation = function (accessIdentifier, username) {
        var response = http({
            method: "post",
            url: "/Home/GetUserInformation"
        })
    }

    // REGISTRATION
    this.postUser = function (userinformation) {
        var response = $http({
            method: "post",
            url: "/Home/AddUser",
            data: userinformation
        });
        return response;
    }


    // LOGIN/LOGOUT
    var baseUrl = '/Home/Login'; 

    this.login = function (credentials) {
        return $http.post(baseUrl, credentials).then(function (response) {
            return response.data;
        });
    };

    this.logout = function () {
        return $http.post('/Home/Logout');
    };

    // Check if the user is logged in
    this.getUserSession = function () {
        return $http.get('/Home/GetUserSession').then(function (response) {
            return response.data;
        });
    };
    // Loads the packages
    this.loadPackages = function () {
        return $http.get('/Home/LoadPackages').then(function (response) {
            return response.data;
        });
    };
    // Customer Order packages
        this.addOrder = function (addOrder) {
            var Add = $http({
                method: "post",
                url: "/Home/orderPackages",
                data: addOrder
            })
            return Add;
        }
    

    // Logout function
    this.logout = function () {
        return $http.post('/Home/Logout').then(function (response) {
            return response.data;
        });
    };

    //Admin Package Get
    this.adminPackage = function () {
        return $http.get("/Home/AdminPackage")
    };
    //Admin User Get
    this.adminUser = function () {
        return $http.get("/Home/AdminUser")
    };
    //Admin Booking Get
    this.adminBooking = function () {
        return $http.get("/Home/AdminBooking")
    };
    //Admin Inquiries Get
    this.adminInquiries = function () {
        return $http.get("/Home/AdminInquiries")
    };

    //Admin Add Package
    this.addPackage = function (addPackage) {
        var Add = $http({
            method: "post",
            url: "/Home/addAdminPackage",
            data: addPackage
        })
        return Add;
    }
    //Admin Add Customer
    this.addCustomer = function (addCustomer) {
        var Add = $http({
            method: "post",
            url: "/Home/addAdminCustomer",
            data: addCustomer
        })
        return Add;
    }
    //Admin Add Booking
    this.addBooking = function (addBooking) {
        var Add = $http({
            method: "post",
            url: "/Home/addAdminBooking",
            data: addBooking
        })
        return Add;
    }
});