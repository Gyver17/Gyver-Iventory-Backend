const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getInvoiceSell = async (req, res) => {
  try {
    const response = await pool.query(
      "select * from invoice_sell order by number asc"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error)
  }
};

const getInvoiceSellById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "select * from invoice_sell where id=$1",
      [id]
    );
    res.status(200).json(response.rows[0]);
  } catch (error) {
    handleError(res, error)
  }
};

const createInvoiceSell = async (req, res) => {
  try {
    const id = v4();
    const {
      number,
      id_client,
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
      credit,
      amount_pay,
      amount_remaining,
      observation,
    } = req.body;
    await pool.query(
      "insert into invoice_sell (id, number, id_client, id_employee, price_sub, price_porcent, price_iva, price_total, date, description, pay_type, pay_debit, pay_cash, credit, amount_pay, amount_remaining, observation) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
      [
        id,
        number,
        id_client,
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
        credit,
        amount_pay,
        amount_remaining,
        observation,
      ]
    );
    res.status(200).send({ message: "Successful" });
  } catch (error) {
    handleError(res, error)
  }
};

const updateInvoiceSell = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, credit, amount_pay, amount_remaining } = req.body;
    const response = await pool.query(
      "update invoice_sell set description=$1, credit=$2, amount_pay=$3, amount_remaining=$4 where id=$5",
      [description, credit, amount_pay, amount_remaining, id]
    );
    if (response.rowCount > 0) {
      res.status(200).send({ message: "Successful" });
    } else {
      res.status(404).send({ code: "44947" });
    }
  } catch (error) {
    handleError(res, error)
  }
};

module.exports = {
  getInvoiceSell,
  getInvoiceSellById,
  createInvoiceSell,
  updateInvoiceSell,
};
