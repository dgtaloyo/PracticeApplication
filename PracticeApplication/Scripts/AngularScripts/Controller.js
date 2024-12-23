app.controller("PracticeApplicationController", function ($scope, $window, PracticeApplicationService) {
    $scope.$on('$viewContentLoaded', function () {
        var modals = document.querySelectorAll('.modal');
        M.Modal.init(modals);
    });

    // Alert Function

    $scope.isLoggedIn = false;

    $scope.alertFunc = function () {
        alert("Page is running correctly.");
        console.log("Alert is being ran.")
    };

    var userCredentials = [];

    // Validate Registration Function
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

    // Submit Function
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
                var postData = PracticeApplicationService.add(newUser);
                postData.then(function (ReturnedData) {
                    var returnedValue = ReturnedData.data.FirstName;
                });

                userCredentials.push(newUser);
                alert("Registration successful!");
                $scope.cleanFunc();
                window.location.href = "/Home/LoginPage";
                sessionStorage.setItem('userInformation', JSON.stringify(userInformation));

            } else {
                alert("Data is already existing.");
                $scope.cleanFunc();
            }
        }
    };

    // Clean Function
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

    // Login Function
    $scope.loginFunc = function () {
        var credentials = {
            Email: $scope.loginEmail,
            Password: $scope.loginPassword,
        };
            
        PracticeApplicationService.login(credentials).then(function (response) {
            // Check if response is valid and contains 'success'
            if (response && response.success) {
                $scope.userEmail = response.userEmail;
                if (response.roleId == 1) {
                    window.location.href = "/Home/Dashboard";
                } else {
                    window.location.href = "/Home/HomePage";
                }
            } else {
                alert(response ? response.message : "An error occurred.");
            }
        }).catch(function (error) {
            // Handle any errors that occur during the request
            console.error("Error during login:", error);
            alert("An error occurred during login.");
        });
    };

    $scope.checkUserSession = function () {
        PracticeApplicationService.getUserSession().then(function (response) {
            if (response && response.success) {
                // User is logged in, set variables for the dropdown
                $scope.isLoggedIn = true;
                $scope.userEmail = response.userEmail;
            } else {
                // User is not logged in, show login button
                $scope.isLoggedIn = false;
            }
        }).catch(function (error) {
            console.error("Error fetching user session:", error);
            $scope.isLoggedIn = false; // Default to logged-out state
        });
    };

    // Call this function when the page loads
    $scope.checkUserSession();


    $scope.logout = function () {
        PracticeApplicationService.logout().then(function (response) {
            if (response && response.success) {
                $scope.isLoggedIn = false;
                $scope.userEmail = null;
                window.location.href = "/Home/HomePage"; // Redirect to the default page
            } else {
                alert("An error occurred during logout.");
            }
        }).catch(function (error) {
            console.error("Error during logout:", error);
            alert("An error occurred during logout.");
        });
    };

    //Admin Package
    $scope.adminPackage = function () {
        var getData = PracticeApplicationService.adminPackage();
        getData.then(function (ReturnedData) {
            $scope.package = ReturnedData.data;
            
                $('#adminPackageTbl').DataTable({
                    data: $scope.package,
                    columns: [
                        { data: 'packageID' },
                        { data: 'packageName' },
                        { data: 'packageLocation' },
                        { data: 'packagePrice' },
                        { data: 'packageStart' },
                        { data: 'packageEnd' },
                        { data: 'packageDetails' },
                        { data: 'createdAt' },
                        { data: 'updatedAt' }
                    ]
                });
           
        });
    }

    // Admin Add Package
    $scope.packageAdd = function () {
        var addPackage = {
            packageName: $scope.packageName,
            packageLoc: $scope.packageLoc,
            packagePrice: $scope.packagePrice,
            packageStart: $scope.packageStart,
            packageEnd: $scope.packageEnd,
            packageDetails: $scope.packageDetails
        }

        postData.then(function (ReturnedData) {
            var returnedPackage = ReturnedData.data;
        })
    }

    var packageInfo = [];
    $scope.packageAddSubmit = function () {
       var userFind = packageInfo.find(UFind => UFind.packageName === $scope.packageName);

        if (userFind === undefined) {
            var newPackage = {
                packageName: $scope.packageName,
                packageLocation: $scope.packageLoc,
                packagePrice: $scope.packagePrice,
                packageStart: $scope.packageStart,
                packageEnd: $scope.packageEnd,
                packageDetails: $scope.packageDetails
            };
            var postData = PracticeApplicationService.addPackage(newPackage);
            postData.then(function (ReturnedData) {
                var returnedValue = ReturnedData.data.packageName;
            });

            packageInfo.push(newPackage);
            alert("Added successfully!");
        }

    }

});
