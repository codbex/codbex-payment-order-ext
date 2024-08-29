const viewData = {
    id: 'sales-order-payment-generate',
    label: 'Generate Sales Order Payment',
    link: '/services/web/codbex-payment-order-ext/generate/SalesOrderPayment/generate-sales-order-payment.html',
    perspective: 'CustomerPayment',
    view: 'CustomerPayment',
    type: 'entity',
    order: 29
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}