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

    this.postUser = function (userinformation) {
        var response = $http({
            method: "post",
            url: "/Home/AddUser",
            data: userinformation
        });
        return response;
    }

});