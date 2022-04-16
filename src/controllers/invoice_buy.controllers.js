const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getInvoiceBuy = async (req, res) => {
  try {
    const response = await pool.query(
      "select * from invoice_buy order by number asc"
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
    await pool.query("update numbers_invoice set buy=$1 where id=1", [number + 1]);

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
      const description_product = "Compra";
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
  getInvoiceBuyById,
  createInvoiceBuy,
  updateInvoiceBuy,
};
