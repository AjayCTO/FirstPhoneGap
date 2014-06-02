(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'datacontext', dashboard]);

    function dashboard(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;

        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getMessageCount(), getPeople(), mobileListViewEndlessScrolling()];
            common.activateController(promises, controllerId)
                .then(function () {
                    log('Activated Dashboard View');
                });
        }

        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }

        function getPeople() {
            return datacontext.getPeople().then(function (data) {
                return vm.people = data;
            });
        }

       
        function mobileListViewEndlessScrolling() {
            var people = [
                { id: "1", name: "test1", description: "" },
                { id: "2", name: "test2", description: "" },
                { id: "3", name: "test3", description: "" },
                { id: "4", name: "test4", description: "" },
                { id: "5", name: "test5", description: "" },
                { id: "6", name: "test6", description: "" },
                { id: "7", name: "test7", description: "" },
                { id: "8", name: "test8", description: "" },
                { id: "9", name: "test9", description: "" },
                { id: "10", name: "test10", description: "" },
                { id: "11", name: "test11", description: "" },
                { id: "12", name: "test12", description: "" },
                { id: "13", name: "test13", description: "" },
                { id: "14", name: "test14", description: "" },
                { id: "15", name: "test15", description: "" },
                { id: "16", name: "test16", description: "" },
                { id: "17", name: "test17", description: "" },
                { id: "18", name: "test18", description: "" },
                { id: "19", name: "test19", description: "" },
                { id: "20", name: "test20", description: "" },
                { id: "21", name: "test21", description: "" }

            ];

            var dataSource = new kendo.data.DataSource({
                type: "odata",
                //transport: {
                //    read: {
                //        url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                //    }
                //},   
                data:people,
                serverPaging: true,
                schema: {
                    model: {
                        fields: {
                            id: { type: "number" },
                            name: { type: "string" },
                            description: { type: "string" },
                           
                        }
                    }
                },
               // serverFiltering: true,
                serverSorting: true,             
                pageSize: 50
            });

            $("#touch-scroller").kendoMobileScroller();

            $("#flat-listview").kendoMobileListView({
                dataSource: dataSource,
                template: $("#endless-scrolling-template").text(),
                //endlessScroll: true              
                //filterable: {
                //    field: "name",
                //    operator: "startswith"
                //},
            });

            $("#filter").keypress(function() {
                var ds = $("#flat-listview").data("kendoMobileListView").dataSource;
                var value = $(this).val();
                ds.filter([
                    {
                        "field": "name",
                        "operator": "startswith",
                        "value": value
                    }
                ]);
            });


        }

       
        


    }
})();