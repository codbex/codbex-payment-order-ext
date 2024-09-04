import { SalesOrderRepository as SalesOrderDao } from "codbex-orders/gen/codbex-orders/dao/SalesOrder/SalesOrderRepository";
import { CustomerPaymentRepository as CustomerPaymentDao } from "codbex-payments/gen/codbex-payments/dao/CustomerPayment/CustomerPaymentRepository";
import { SalesOrderPaymentRepository as SalesOrderPaymentDao } from "codbex-orders/gen/codbex-orders/dao/SalesOrder/SalesOrderPaymentRepository";

import { Controller, Get } from "sdk/http";

@Controller
class GenerateSalesOrderPaymentService {

    private readonly salesOrderDao;
    private readonly customerPaymentDao;
    private readonly salesOrderPaymentDao

    constructor() {
        this.salesOrderDao = new SalesOrderDao();
        this.customerPaymentDao = new CustomerPaymentDao();
        this.salesOrderPaymentDao = new SalesOrderPaymentDao();
    }

    @Get("/salesOrderData/:customerPaymentId")
    public salesOrderData(_: any, ctx: any) {
        const customerPaymentId = ctx.pathParameters.customerPaymentId;

        const customerPayment = this.customerPaymentDao.findById(customerPaymentId);

        const salesOrder = this.salesOrderDao.findAll({
            $filter: {
                equals: {
                    Customer: customerPayment.Customer
                }
            }
        });

        let notPaidOrders = [];

        salesOrder.forEach((order) => {

            let salesOrderPayments = this.salesOrderPaymentDao.findAll({
                $filter: {
                    equals: {
                        CustomerPayment: customerPayment.Id,
                        SalesOrder: order.Id,
                    }
                }
            });

            if (salesOrderPayments.length == 0) {
                notPaidOrders.push(order);
            }

        });

        return {
            "salesOrder": notPaidOrders
        };
    }

    @Get("/customerPayment/:customerPaymentId")
    public customerPaymentData(_: any, ctx: any) {
        const customerPaymentId = ctx.pathParameters.customerPaymentId;

        const customerPayment = this.customerPaymentDao.findById(customerPaymentId);

        return {
            "Id": customerPayment.Id,
            "Amount": customerPayment.Amount
        };
    }

}