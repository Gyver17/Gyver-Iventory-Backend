const pool = require("../database");
const { v4 } = require("uuid");

const getInvoiceBuy = async (req, res) => {
  try {
    const response = await pool.query(
      "select * from invoice_buy order by number asc"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getInvoiceBuyById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from invoice_buy where id=$1", [
      id,
    ]);
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error)
  }
};

const createInvoiceBuy = async (req, res) => {
  try {
    const id = v4();
    const {
      number,
      id_suplier,
      id_employee,
      price_sub,
      price_porcent,
      price_iva,
      price_total,
      date,
      description,
      pay_type,
      pay_debit,
      pay_cash,
      credir,
      amount_pay,
      amount_remaining,
      observation,
    } = req.body;
    await pool.query(
      "insert into invoice_buy (id, number, id_suplier, id_employee, price_sub, price_porcent, price_iva, price_total, date, description, pay_type, pay_debit, pay_cash, credir, amount_pay, amount_remaining, observation) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
      [
        id,
        number,
        id_suplier,
        id_employee,
        price_sub,
        price_porcent,
        price_iva,
        price_total,
        date,
        description,
        pay_type,
        pay_debit,
        pay_cash,
        credir,
        amount_pay,
        amount_remaining,
        observation,
      ]
    );
    res.status(200).send({
      id,
      number,
      id_suplier,
      id_employee,
      price_sub,
      price_porcent,
      price_iva,
      price_total,
      date,
      description,
      pay_type,
      pay_debit,
      pay_cash,
      credir,
      amount_pay,
      amount_remaining,
      observation,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

const updateInvoiceBuy = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, credir, amount_pay, amount_remaining } = req.body;
    const response = await pool.query(
      "update invoice_buy set description=$1, credir=$2, amount_pay=$3, amount_remaining=$4 where id=$5",
      [description, credir, amount_pay, amount_remaining, id]
    );
    if (response.rowCount > 0) {
      res.status(200).send("Update Success");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const innerInvoiceBuy = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "select *, supplier.name as supplier, employee.name as employee from invoice_buy join supplier on invoice_buy.id_suplier=supplier.id join employee on invoice_buy.id_employee=employee.id where invoice_buy.id=$1",
      [id]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getInvoiceBuy,
  getInvoiceBuyById,
  createInvoiceBuy,
  updateInvoiceBuy,
  innerInvoiceBuy,
};
