const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getSetting = async (req, res) => {
  try {
    const response = await pool.query(`
        select *, 
        setting.id as id_setting, 
        m1.symbol as first_symbol, 
        m1.value as first_value, 
        m2.symbol as second_symbol,
        m2.value as second_value from setting 
        inner join money as m1 on setting.id_money_1 = m1.id 
        inner join money as m2 on setting.id_money_2 = m2.id
      `);
    res.status(200).json(response.rows[0]);
  } catch (error) {
    handleError(res, error)
  }
};

const createSetting = async (req, res) => {
  try {
    const id = v4();
    const {
      id_money_1,
      id_money_2,
      qty_decimal,
      number_format,
      company_name,
      company_rif,
      company_mail,
      company_phone_first,
      company_phone_second,
      company_photo,
      iva,
    } = req.body;
    await pool.query(
      "insert into setting (id, id_money_1, id_money_2, qty_decimal, number_format, company_name, company_rif, company_mail, company_phone_first, company_phone_second, company_photo, iva) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
      [
        id,
        id_money_1,
        id_money_2,
        qty_decimal,
        number_format,
        company_name,
        company_rif,
        company_mail,
        company_phone_first,
        company_phone_second,
        company_photo,
        iva,
      ]
    );
    res.status(200).send({ message: "Successful" });
  } catch (error) {
    handleError(res, error)
  }
};

const updateSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_money_1,
      id_money_2,
      qty_decimal,
      number_format,
      company_name,
      company_rif,
      company_mail,
      company_phone_first,
      company_phone_second,
      company_photo,
      iva,
    } = req.body;
    const response = await pool.query(
      "update setting set id_money_1=$1,id_money_2=$2, qty_decimal=$3, number_format=$4, company_name=$5, company_rif=$6,company_mail=$7, company_phone_first=$8, company_phone_second=$9, company_photo=$10, iva=$11 where id=$12",
      [
        id_money_1,
        id_money_2,
        qty_decimal,
        number_format,
        company_name,
        company_rif,
        company_mail,
        company_phone_first,
        company_phone_second,
        company_photo,
        iva,
        id,
      ]
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
  getSetting,
  createSetting,
  updateSetting,
};
