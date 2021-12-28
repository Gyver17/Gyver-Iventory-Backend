const pool = require("../database");
const { v4 } = require("uuid");

const getSetting = async (req, res) => {
  try {
    const response = await pool.query("select * from setting");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getSettingById = (req, res) => {
  res.send("getSettingById");
};

const createSetting = async (req, res) => {
  try {
    const id = v4();
    const {
      id_money_1,
      id_money_2,
      qty_decimal,
      numbel_format,
      company_name,
      company_rif,
      company_adress,
      company_phone_first,
      company_phone_second,
      company_photo,
      iva,
    } = req.body;
    await pool.query(
      "insert into setting (id, id_money_1, id_money_2, qty_decimal, numbel_format, company_name, company_rif, company_adress, company_phone_first, company_phone_second, company_photo, iva) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
      [
        id,
        id_money_1,
        id_money_2,
        qty_decimal,
        numbel_format,
        company_name,
        company_rif,
        company_adress,
        company_phone_first,
        company_phone_second,
        company_photo,
        iva,
      ]
    );
    res.send("createSetting");
  } catch (error) {
    res.status(404).send(error);
  }
};

const updateSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_money_1,
      id_money_2,
      qty_decimal,
      numbel_format,
      company_name,
      company_rif,
      company_adress,
      company_phone_first,
      company_phone_second,
      company_photo,
      iva,
    } = req.body;
    const response = await pool.query(
      "update setting set id_money_1=$1,id_money_2=$2, qty_decimal=$3, numbel_format=$4, company_name=$5, company_rif=$6,company_adress=$7, company_phone_first=$8, company_phone_second=$9, company_photo=$10, iva=$11 where id=$12",
      [
        id_money_1,
        id_money_2,
        qty_decimal,
        numbel_format,
        company_name,
        company_rif,
        company_adress,
        company_phone_first,
        company_phone_second,
        company_photo,
        iva,
        id,
      ]
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

const deleteSetting = (req, res) => {
  res.send("deleteSetting");
};

module.exports = {
  getSetting,
  getSettingById,
  createSetting,
  updateSetting,
  deleteSetting,
};
