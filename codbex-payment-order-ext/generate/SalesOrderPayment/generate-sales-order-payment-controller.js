const app = angular.module('templateApp', ['ideUI', 'ideView']);
app.controller('templateController', ['$scope', '$http', 'ViewParameters', 'messageHub', function ($scope, $http, ViewParameters, messageHub) {
    const params = ViewParameters.get();
    $scope.showDialog = true;

    const salesOrdersUrl = "/services/ts/codbex-payment-order-ext/generate/SalesOrderPayment/api/GenerateSalesOrderPaymentService.ts/salesOrderData/" + params.id;
    const customerPaymentUrl = "/services/ts/codbex-payment-order-ext/generate/SalesOrderPayment/api/GenerateSalesOrderPaymentService.ts/customerPayment/" + params.id;
    const salesOrderPaymentUrl = "/services/ts/codbex-orders/gen/codbex-orders/api/SalesOrder/SalesOrderPaymentService.ts/";

    $http.get(salesOrdersUrl)
        .then(function (response) {
            $scope.SalesOrders = response.data.salesOrder;
        })
        .catch(function (error) {
            console.error("Error retrieving data:", error);
        });


    $http.get(customerPaymentUrl)
        .then(function (response) {
            $scope.CustomerPayment = response.data;
        })
        .catch(function (error) {
            console.error("Error retrieving data:", error);
        });


    $scope.generateSalesOrderPayment = function () {
        const salesOrders = $scope.SalesOrders.filter(item => item.selected);

        salesOrders.forEach((salesOrder) => {

            const salesOrderPayment = {
                "SalesOrder": salesOrder.Id,
                "CustomerPayment": $scope.CustomerPayment.Id,
                "Amount": $scope.CustomerPayment.Amount
            }

            $http.post(salesOrderPaymentUrl, salesOrderPayment)
                .then(function (response) {
                    $scope.closeDialog();
                }).catch(function (error) {
                    console.error("Error creating Sales Order Payment", error);
                    $scope.closeDialog();
                });
        });

    }

    $scope.closeDialog = function () {
        $scope.showDialog = false;
        messageHub.closeDialogWindow("sales-order-payment-generate");
    };

    document.getElementById("dialog").style.display = "block";
}]);