const { category } = require("../tableConstraint/category")
const { client } = require("../tableConstraint/client")
const { employee } = require("../tableConstraint/employee")
const { invoiceBuy } = require("../tableConstraint/invoiceBuy")
const { invoiceSell } = require("../tableConstraint/invoiceSell")
const { money } = require("../tableConstraint/money")
const { payPurchasesHistory } = require("../tableConstraint/payPurchasesHistory")
const { paySalesHistory } = require("../tableConstraint/paySalesHistory")
const { permissions } = require("../tableConstraint/permissions")
const { productBuy } = require("../tableConstraint/productBuy")
const { products } = require("../tableConstraint/products")
const { productSell } = require("../tableConstraint/productSell")
const { services } = require("../tableConstraint/services")
const { servicesSell } = require("../tableConstraint/servicesSell")
const { setting } = require("../tableConstraint/setting")
const { supplier } = require("../tableConstraint/supplier")
const { users } = require("../tableConstraint/users")

const handleConstraint = (res, error) => {
    try {
        if (error.table === "category") {
            category(res, error)
        }
        if (error.table === "client") {
            client(res, error)
        }
        if (error.table === "employee") {
            employee(res, error)
        }
        if (error.table === "invoice_buy") {
            invoiceBuy(res, error)
        }
        if (error.table === "invoice_sell") {
            invoiceSell(res, error)
        }
        if (error.table === "money") {
            money(res, error)
        }
        if (error.table === "pay_purchases_history") {
            payPurchasesHistory(res, error)
        }
        if (error.table === "pay_sales_history") {
            paySalesHistory(res, error)
        }
        if (error.table === "permissions") {
            permissions(res, error)
        }
        if (error.table === "product_buy") {
            productBuy(res, error)
        }
        if (error.table === "product_sell") {
            productSell(res, error)
        }
        if (error.table === "products") {
            products(res, error)
        }
        if (error.table === "services") {
            services(res, error)
        }
        if (error.table === "services_sell") {
            servicesSell(res, error)
        }
        if (error.table === "setting") {
            setting(res, error)
        }
        if (error.table === "supplier") {
            supplier(res, error)
        }
        if (error.table === "users") {
            users(res, error)
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { handleConstraint }