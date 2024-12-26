app.controller("TourTerraApplicationController", function ($scope, $window, TourTerraApplicationService) {
    $scope.$on('$viewContentLoaded', function () {
        var modals = document.querySelectorAll('.modal');
        M.Modal.init(modals);
    });

    $scope.isLoggedIn = false;

    var userCredentials = [];

    // Validate Registration Function
    $scope.validateRegistration = function () {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var nameRegex = /^[A-Za-z]+$/;
        var phoneRegex = /^[0-9]{10,11}$/;
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
                var postData = TourTerraApplicationService.add(newUser);
                postData.then(function (ReturnedData) {
                    var returnedValue = ReturnedData.data.FirstName;
                });

                userCredentials.push(newUser);
                alert("Registration successful!");
                $scope.cleanFunc();
                window.location.href = "/Home/LoginPage";
                sessionStorage.setItem('userInformation', JSON.stringify(userInformation));

            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Data already exists.",
                    icon: "error"
                });
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

        TourTerraApplicationService.login(credentials).then(function (response) {
            if (response && response.success) {
                $scope.userEmail = response.userEmail;
                if (response.roleId == 1) {
                    window.location.href = "/Home/Customers";
                } else {
                    window.location.href = "/Home/HomePage";
                }
            } else {
                alert(response ? response.message : "An error occurred.");
            }
        }).catch(function (error) {
            Swal.fire({
                title: "Error!",
                text: "An error occurred during login.",
                icon: "error"
            });
        });
    };

    $scope.checkUserSession = function () {
        TourTerraApplicationService.getUserSession().then(function (response) {
            if (response && response.success) {
                $scope.isLoggedIn = true;
                $scope.userEmail = response.userEmail;
            } else {
                $scope.isLoggedIn = false;
            }
        }).catch(function (error) {
            $scope.isLoggedIn = false;
        });
    };
    $scope.checkUserSession();

    $scope.logout = function () {
        TourTerraApplicationService.logout().then(function (response) {
            if (response && response.success) {
                $scope.isLoggedIn = false;
                $scope.userEmail = null;
                window.location.href = "/Home/HomePage"; // Redirect to the default page
            } else {
                alert("An error occurred during logout.");
            }
        }).catch(function (error) {
            Swal.fire({
                title: "Error!",
                text: "An error occurred during logout.",
                icon: "error"
            });
        });
    };

    //Load Packages
    $scope.loadPackages = function () {
        TourTerraApplicationService.loadPackages().then(function (response) {
            if (response && response.success) {
                $scope.packages = response.packages;

            }
        })
    };

    $scope.loadPackages();

    $scope.getUserSession = function () {
        return $http({
            method: "get",
            url: "/Home/GetUserSession",
        }).then(function (response) {
            if (response.data.success) {
                return response.data;
            } else {
                return null;
            }
        })
    }
    


    // Customer New Booking/Order
    var userSession = TourTerraApplicationService.getUserSession();
    console.log(userSession);
    var bookingInfo = [];
    $scope.newOrder = function (package) {
        
        var newOrder = {
            packageID: package.packageID,
            userID: userSession.userID,
            fromDate: package.packageStart,
            toDate: package.packageEnd,
            Status: "Pending",
        };


        var postData = TourTerraApplicationService.addOrder(newOrder);
        postData.then(function (ReturnedData) {
            var returnedValue = ReturnedData.data.packageID;
        });

        bookingInfo.push(newOrder);
        Swal.fire({
            title: "Good job!",
            text: "You successfully ordered!",
            icon: "success"
        });
        
    }


    //Admin Package
    $scope.adminPackage = function () {
        var getData = TourTerraApplicationService.adminPackage();
        getData.then(function (ReturnedData) {
            console.log(ReturnedData.data);
            $scope.package = ReturnedData.data.map(function (item) {
                return {
                    ...item,

                    packageStart: new Date(item.packageStart).toLocaleString(),
                    packageEnd: new Date(item.packageEnd).toLocaleString(),
                    createdAt: new Date(item.createdAt).toLocaleString(),
                    updatedAt: new Date(item.updatedAt).toLocaleString()
                };
            });
            
            $(document).ready(function () {
                if (!$.fn.DataTable.isDataTable('#adminPackageTbl')) {
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
                } else {
                    $('#adminPackageTbl').DataTable.destroy();
                }
            })
        });
    }
    $scope.adminPackage();

    //Admin User
    $scope.adminUser = function () {
        var getData = TourTerraApplicationService.adminUser();
        getData.then(function (ReturnedData) {
            console.log(ReturnedData.data);
            $scope.user = ReturnedData.data.map(function (item) {
                return {
                    ...item,

                    createdAt: new Date(item.createdAt).toLocaleString(),
                    updatedAt: new Date(item.updatedAt).toLocaleString()
                };
            });
            
            $(document).ready(function () {
                if (!$.fn.DataTable.isDataTable('#adminUserTbl')) {
                    $('#adminUserTbl').DataTable({
                        data: $scope.user,
                        columns: [
                            { data: 'userID' },
                            { data: 'Email' },
                            { data: 'fName' },
                            { data: 'lName' },
                            { data: 'mName' },
                            { data: 'Address' },
                            { data: 'phoneNum' },
                            { data: 'createdAt' },
                            { data: 'updatedAt' }
                        ]
                    });
                } else {
                    $('#adminUserTbl').DataTable.destroy();
                }
            })
           
        });
    }
    $scope.adminUser();

    //Admin Booking
    $scope.adminBooking = function () {
        var getData = TourTerraApplicationService.adminBooking();
        getData.then(function (ReturnedData) {
            console.log(ReturnedData.data);
            $scope.user = ReturnedData.data.map(function (item) {
                return {
                    ...item,


                    toDate: new Date(item.toDate).toLocaleString(),
                    fromDate: new Date(item.fromDate).toLocaleString(),
                    createdAt: new Date(item.createdAt).toLocaleString(),
                    updatedAt: new Date(item.updatedAt).toLocaleString()
                };
            });
            
            $(document).ready(function () {
                if (!$.fn.DataTable.isDataTable('#adminBookingTbl')) {
                    $('#adminBookingTbl').DataTable({
                        data: $scope.booking,
                        columns: [
                            { data: 'bookingID' },
                            { data: 'packageID' },
                            { data: 'userID' },
                            { data: 'fromDate' },
                            { data: 'toDate' },
                            { data: 'Comment' },
                            { data: 'Status' },
                            { data: 'createdAt' },
                            { data: 'updatedAt' }
                        ]
                    });
                } else {
                    $('#adminBookingTbl').DataTable.destroy();
                }
            })
        });
    }
    $scope.adminBooking();

    var packageInfo = [];
    $scope.packageAddSubmit = function () {
       var packageFind = packageInfo.find(UFind => UFind.packageName === $scope.packageName);

        if (packageFind === undefined) {
            var newPackage = {
                packageName: $scope.packageName,
                packageLocation: $scope.packageLoc,
                packagePrice: $scope.packagePrice,
                packageStart: $scope.packageStart,
                packageEnd: $scope.packageEnd,
                packageDetails: $scope.packageDetails,
            };

            var postData = TourTerraApplicationService.addPackage(newPackage);
            postData.then(function (ReturnedData) {
                var returnedValue = ReturnedData.data.packageName;
            });
            
            packageInfo.push(newPackage);
            alert("Added successfully!");
        }

    }

    // Admin Add Customer
    $scope.customerAdd = function () {
        var addCustomer = {
            fName: $scope.customerFname,
            lName: $scope.customerLname,
            mName: $scope.customerMname,
            Email: $scope.customerEmail,
            Password: $scope.customerPassword,
            Address: $scope.customerAddress,
            phoneNum: $scope.customerPhone
        }

        postData.then(function (ReturnedData) {
            var returnedPackage = ReturnedData.data;
        })
    }

    var customerInfo = [];
    $scope.customerAddSubmit = function () {
       var customerFind = customerInfo.find(UFind => UFind.customerEmail === $scope.customerEmail);

        if (customerFind === undefined) {
            var newCustomer = {
                fName: $scope.customerFname,
                lName: $scope.customerLname,
                mName: $scope.customerMname,
                Email: $scope.customerEmail,
                Password: $scope.customerPassword,
                Address: $scope.customerAddress,
                phoneNum: $scope.customerPhone
            };
            var postData = TourTerraApplicationService.addCustomer(newCustomer);
            postData.then(function (ReturnedData) {
                var returnedValue = ReturnedData.data.customerEmail;
            });

            customerInfo.push(newCustomer);
            Swal.fire({
                title: "Success!",
                text: "Added successfully!",
                icon: "success"
            });
        }

    }
   
});
