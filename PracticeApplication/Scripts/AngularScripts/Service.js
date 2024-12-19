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
        return $http.get('/Home/GetUserSession');
    };

    // Logout function
    this.logout = function () {
        return $http.post('/Home/Logout');
    };


});