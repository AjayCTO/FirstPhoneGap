


function api() {
    var _data = {
        users: [
            {
                id: 142,
                name: 'Jack',
                type: 'admin',
                age: 32,
                skills: ['unix', 'windows', 'http']
            },
            {
                id: 523,
                name: 'Bob',
                type: 'customer',
                age: 23,
                likes: ['shoes', 't-shirts', '<b>Clubs</b>&nbsp;<br/><i>bars</i>']
            }
        ],

        responsibilities: {
            142: [
                {
                    name: 'project 1'
                },
                {
                    name: 'project 2'
                }
            ]
        },

        purchasedItems: {
            523: [
                {
                    name: 'adidas sneakers #24124'
                },
                {
                    name: 'Jack Daniel\'s 18 years'
                }
            ]
        }

    };

    this.getData = function (resourceName) { return _data[resourceName]; };
}



var App = angular.module('app', ['ng'])
     .service('api', [api])
     .controller('PageController', ['$scope', 'api', function ($scope, api) {
         $scope.title = "User Information";
         $scope.user = [];        
         $scope.Idofuser = 523;
         $scope.isAdmin = false;
         $scope.isCustomer = false;
         $scope.currentUserResponsibilities = [];
         $scope.currentUserPurchasedItems = [];

         /*Add New Skills*/
         $scope.addNewSkills = function (user) {
             var oame = prompt("Please enter Skill name", "Skill Detail");              
             user.skills.push(oame);
         };
         /*Add New like for user*/
         $scope.addNewlikes = function (user) {
             var oame = prompt("Please enter like name", "Like Detail");
             user.likes.push(oame);
         };
         /*Get users */

         $scope.GetUsers = function () {             
             var allusers = api.getData("users");
             $scope.user = allusers;
             
             
         };

         /*Filter users */
         $scope.GetById = function () {
             for (var i = 0; i < $scope.user.length; i++) {
                 if ($scope.user[i].id === $scope.Idofuser) {
                     if ($scope.user[i].type === "admin") {
                         $scope.isAdmin = true;
                         $scope.currentUserResponsibilities = api.getData("responsibilities");
                     }
                     else {
                         $scope.isCustomer = true;
                         $scope.currentUserPurchasedItems = api.getData("purchasedItems");
                     }
                     return $scope.user[i];
                 }
             }

         }

         $scope.GetUsers();
     }]);

App.directive('userinfo', function () {
    var directive = {};

    directive.restrict = 'E';
    directive.templateUrl = 'template.html';


    return directive;
});





