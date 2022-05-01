const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getInvoiceBuy = async (req, res) => {
  try {
    const { date } = req.params;
    const response = await pool.query(
      `select 
      invoice_buy.id,
      invoice_buy.number,
      supplier.id as id_supplier,
      supplier.name as name_supplier,
      employee.id as id_employee,
      employee.name as name_employee,
      to_char( invoice_buy.date, 'DD/MM/YYYY') as date,
      invoice_buy.credit,
      invoice_buy.price_total  
      from invoice_buy 
      join supplier on invoice_buy.id_supplier=supplier.id
      join employee on invoice_buy.id_employee=employee.id  
      where invoice_buy.date >= $1 and invoice_buy.description='Compra'
      order by number asc`,
      [date]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error);
  }
};

const getPayInvoiceBuy = async (req, res) => {
  try {
    const { date } = req.params;
    const response = await pool.query(
      `select 
      invoice_buy.id,
      invoice_buy.number,
      supplier.id as id_supplier,
      supplier.name as name_supplier,
      employee.id as id_employee,
      employee.name as name_employee,
      to_char( invoice_buy.date, 'DD/MM/YYYY') as date,
      invoice_buy.amount_pay,
      invoice_buy.amount_remaining,
      invoice_buy.price_total  
      from invoice_buy 
      join supplier on invoice_buy.id_supplier=supplier.id
      join employee on invoice_buy.id_employee=employee.id  
      where invoice_buy.date >= $1 and invoice_buy.description='Compra' 
      and invoice_buy.credit='Si'
      order by number asc`,
      [date]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error);
  }
};

const getInvoiceBuyById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from invoice_buy where id=$1", [
      id,
    ]);
    res.status(200).json(response.rows[0]);
  } catch (error) {
    handleError(res, error);
  }
};

const createInvoiceBuy = async (req, res) => {
  try {
    const id = v4();
    const {
      number,
      id_supplier,
      id_employee,
      products,
      price_sub,
      price_porcent,
      price_iva,
      price_total,
      date,
      credit,
      amount_pay,
      amount_remaining,
      observation,
    } = req.body;

    const description = "Compra";

    let credit_value = "";
    if (credit) {
      credit_value = "Si";
    } else {
      credit_value = "No";
    }
    await pool.query("update numbers_invoice set buy=$1 where id=1", [
      number + 1,
    ]);

    await pool.query(
      `insert into invoice_buy 
      (id, 
      number, 
      id_supplier, 
      id_employee, 
      price_sub, 
      price_porcent, 
      price_iva, 
      price_total, 
      date, 
      description, 
      credit, 
      amount_pay, 
      amount_remaining, 
      observation) 
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        id,
        number,
        id_supplier,
        id_employee,
        price_sub,
        price_porcent,
        price_iva,
        price_total,
        date,
        description,
        credit_value,
        amount_pay,
        amount_remaining,
        observation,
      ]
    );

    products.map(async (product) => {
      const id_product_buy = v4();
      const { id_product, quantity, price_total } = product;
      await pool.query(
        "insert into product_buy (id, id_product, quantity, price_total, id_invoice, description) values ($1, $2, $3, $4, $5, $6)",
        [id_product_buy, id_product, quantity, price_total, id, description]
      );
      const response = await pool.query(
        `update products set quantity = quantity+$1 where id=$2`,
        [quantity, id_product]
      );
    });

    res.status(200).send({ message: "Successful" });
  } catch (error) {
    handleError(res, error);
  }
};

const createInvoiceBuyReturn = async (req, res) => {
  try {
    const id = v4();
    const {
      number,
      id_supplier,
      id_employee,
      products,
      price_sub,
      price_iva,
      price_total,
      date,
    } = req.body;

    const description = "Devolución";

    await pool.query(
      `insert into invoice_buy 
      (id, 
      number, 
      id_supplier, 
      id_employee, 
      price_sub, 
      price_porcent, 
      price_iva, 
      price_total, 
      date, 
      description, 
      credit, 
      amount_pay, 
      amount_remaining, 
      observation) 
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        id,
        number,
        id_supplier,
        id_employee,
        -price_sub,
        0,
        -price_iva,
        -price_total,
        date,
        description,
        "no",
        0,
        0,
        "",
      ]
    );

    products.map(async (product) => {
      const id_product_buy = v4();
      const { id_product, id_invoice, quantity, price_total } = product;
      await pool.query(
        "insert into product_buy (id, id_product, quantity, price_total, id_invoice, description) values ($1, $2, $3, $4, $5, $6)",
        [id_product_buy, id_product, -quantity, -price_total, id_invoice, description]
      );
      const response = await pool.query(
        `update products set quantity = quantity-$1 where id=$2`,
        [quantity, id_product]
      );
    });

    res.status(200).send({ message: "Successful" });
  } catch (error) {
    handleError(res, error);
  }
};

const updateInvoiceBuy = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, credit, amount_pay, amount_remaining } = req.body;
    const response = await pool.query(
      "update invoice_buy set description=$1, credit=$2, amount_pay=$3, amount_remaining=$4 where id=$5",
      [description, credit, amount_pay, amount_remaining, id]
    );
    if (response.rowCount > 0) {
      res.status(200).send({ message: "Successful" });
    } else {
      res.status(404).send({ code: "44947" });
    }
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getInvoiceBuy,
  getPayInvoiceBuy,
  getInvoiceBuyById,
  createInvoiceBuy,
  createInvoiceBuyReturn,
  updateInvoiceBuy,
};
