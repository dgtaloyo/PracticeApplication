app.service("PracticeApplicationService", function ($http) {

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

    // Logout function
    this.logout = function () {
        return $http.post('/Home/Logout').then(function (response) {
            return response.data;
        });
    };

    //Admin Package Get
    this.adminPackage = function () {
        return $http.get("/Home/AdminPackage").then(
            function (response) {
                console.log("API Response:", response.data);
                return response;
            },
            function (error) {
                console.error("API Error:", error);
                return error;
            }
        );
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
});