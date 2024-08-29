import { SalesOrderRepository as SalesOrderDao } from "../../../../codbex-orders/gen/codbex-orders/dao/SalesOrder/SalesOrderRepository";
import { CustomerPaymentRepository as CustomerPaymentDao } from "../../../../codbex-payments/gen/codbex-payments/dao/CustomerPayment/CustomerPaymentRepository";

import { Controller, Get } from "sdk/http";

@Controller
class GenerateSalesOrderPaymentService {

    private readonly salesOrderDao;
    private readonly customerPaymentDao;

    constructor() {
        this.salesOrderDao = new SalesOrderDao();
        this.customerPaymentDao = new CustomerPaymentDao();
    }

    @Get("/salesOrderData/:customerPaymentId")
    public salesOrderData(_: any, ctx: any) {
        const customerPaymentId = ctx.pathParameters.customerPaymentId;

        let customerPayment = this.customerPaymentDao.findById(customerPaymentId);

        let salesOrder = this.salesOrderDao.findAll({
            $filter: {
                equals: {
                    Customer: customerPayment.Customer
                }
            }
        });

        return {
            "salesOrder": salesOrder
        };
    }

    @Get("/customerPayment/:customerPaymentId")
    public customerPaymentData(_: any, ctx: any) {
        const customerPaymentId = ctx.pathParameters.customerPaymentId;

        let customerPayment = this.customerPaymentDao.findById(customerPaymentId);

        return {
            "Id": customerPayment.Id,
            "Amount": customerPayment.Amount
        };
    }

}