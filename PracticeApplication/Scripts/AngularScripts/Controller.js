app.controller("PracticeApplicationController", function ($scope, $window, PracticeApplicationService) {
    // Alert Function
    $scope.alertFunc = function () {
        alert("Page is running correctly.");
    };

   
    var userCredentials = [];

   
    $scope.validateRegistration = function () {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var nameRegex = /^[A-Za-z]+$/;
        var phoneRegex = /^[0-9]{11,12}$/;
        var passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

        if (!nameRegex.test($scope.firstName) || !nameRegex.test($scope.lastName) || !nameRegex.test($scope.MiddleName)) {
            alert("First Name, Last Name, and Middle Name should only contain letters.");
            return false;
        }

       
        if (!emailRegex.test($scope.userEmail)) {
            alert("Please enter a valid email address.");
            return false;
        }

        if (!passwordRegex.test($scope.userPassword)) {
            alert("Password must contain at least one uppercase letter, one special character, and one number.");
            return false;
        }

        if ($scope.userAddress.length > 100) {
            alert("Address must be a maximum of 100 characters long.");
            return false;
        }

        if (!phoneRegex.test($scope.userNumber)) {
            alert("Phone number must be 11 to 12 digits long and should not contain any letters.");
            return false;
        }

        return true;
    };

 
    $scope.submitFunc = function () {
       
        if ($scope.validateRegistration()) {
            var userFind = userCredentials.find(UFind => UFind.FirstName === $scope.firstName && UFind.LastName === $scope.lastName);

            if (userFind === undefined) {
                var newUser = {
                    fName: $scope.firstName,
                    lName: $scope.lastName,
                    mName: $scope.MiddleName,
                    Email: $scope.userEmail,
                    Address: $scope.userAddress,
                    phoneNum: $scope.userNumber,
                    Password: $scope.userPassword  
                };
                var postData = PracticeApplicationService.postUser(newUser);
                postData.then(function (ReturnedData) {
                    var returnedValue = ReturnedData.data.FirstName;
                })

                userCredentials.push(newUser);
                sessionStorage.setItem('userInformation', JSON.stringify(userInformation));

                alert("Registration successful!");
                $scope.cleanFunc();
                window.location.href = "/Home/LoginPage";
            } else {
                alert("Data is already existing.");
                $scope.cleanFunc();
            }
        }
    };

    
    $scope.cleanFunc = function () {
        $scope.firstName = null;
        $scope.lastName = null;
        $scope.MiddleName = null;
        $scope.userEmail = null;
        $scope.userPassword = null;
        $scope.userAddress = null;
        $scope.userNumber = null;
        $scope.username = null; 
        $scope.password = null; 
    };

    $scope.loginFunc = function () {
      
        if (!$scope.loginUsername || !$scope.loginPassword) {
            alert("Please enter both username and password.");
            return;
        }

      
        var storedUserCredentials = JSON.parse(sessionStorage.getItem('userCredentials')) || [];

    
        var user = storedUserCredentials.find(cred =>
            cred.UserName === $scope.loginUsername && cred.UserPassword === $scope.loginPassword);

        if (user) {
            window.location.href = "/Home/HomePage";
        } else {
            alert("Invalid username or password.");
        }
    };

});
