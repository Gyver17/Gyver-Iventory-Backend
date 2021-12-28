const pool = require("../database");
const { v4 } = require("uuid");

const getPermissions = async (req, res) => {
  try {
    const response = await pool.query("select * from permissions");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getPermissionsById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "select * from permissions where id = $1",
      [id]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).json(error);
  }
};

const createPermissions = async (req, res) => {
  try {
    const id = v4();
    const p = req.body;
    await pool.query(
      "insert into permissions (id, id_user, products, products_create, products_update, products_delete, category, category_create, category_update, category_delete, services, services_create, services_update, services_delete, client, client_create, client_update, client_delete, supplier, supplier_create, supplier_update, supplier_delete, employee, employee_create, employee_update, employee_delete, buy, buy_return, buy_pay, sell, sell_return, sell_pay, consult_product, consult_invoice, consult_movement, consult_supplier, consult_client, setting) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38)",
      [
        id,
        p.id_user,
        p.products,
        p.products_create,
        p.products_update,
        p.products_delete,
        p.category,
        p.category_create,
        p.category_update,
        p.category_delete,
        p.services,
        p.services_create,
        p.services_update,
        p.services_delete,
        p.client,
        p.client_create,
        p.client_update,
        p.client_delete,
        p.supplier,
        p.supplier_create,
        p.supplier_update,
        p.supplier_delete,
        p.employee,
        p.employee_create,
        p.employee_update,
        p.employee_delete,
        p.buy,
        p.buy_return,
        p.buy_pay,
        p.sell,
        p.sell_return,
        p.sell_pay,
        p.consult_product,
        p.consult_invoice,
        p.consult_movement,
        p.consult_supplier,
        p.consult_client,
        p.setting,
      ]
    );
    res
      .status(200)
      .send([
        id,
        p.id_user,
        p.products,
        p.products_create,
        p.products_update,
        p.products_delete,
        p.category,
        p.category_create,
        p.category_update,
        p.category_delete,
        p.services,
        p.services_create,
        p.services_update,
        p.services_delete,
        p.client,
        p.client_create,
        p.client_update,
        p.client_delete,
        p.supplier,
        p.supplier_create,
        p.supplier_update,
        p.supplier_delete,
        p.employee,
        p.employee_create,
        p.employee_update,
        p.employee_delete,
        p.buy,
        p.buy_return,
        p.buy_pay,
        p.sell,
        p.sell_return,
        p.sell_pay,
        p.consult_product,
        p.consult_invoice,
        p.consult_movement,
        p.consult_supplier,
        p.consult_client,
        p.setting,
      ]);
  } catch (error) {
    res.status(404).json(error);
  }
};

const updatePermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const p = req.body;
    const response = await pool.query(
      "update permissions set id_user=$1, products=$2, products_create=$3, products_update=$4, products_delete=$5, category=$6, category_create=$7, category_update=$8, category_delete=$9, services=$10, services_create=$11, services_update=$12, services_delete=$13, client=$14, client_create=$15, client_update=$16, client_delete=$17, supplier=$18, supplier_create=$19, supplier_update=$20, supplier_delete=$21, employee=$22, employee_create=$23, employee_update=$24, employee_delete=$25, buy=$26, buy_return=$27, buy_pay=$28, sell=$29, sell_return=$30, sell_pay=$31, consult_product=$32, consult_invoice=$33, consult_movement=$34, consult_supplier=$35, consult_client=$36, setting=$37 where id=$38",
      [
        p.id_user,
        p.products,
        p.products_create,
        p.products_update,
        p.products_delete,
        p.category,
        p.category_create,
        p.category_update,
        p.category_delete,
        p.services,
        p.services_create,
        p.services_update,
        p.services_delete,
        p.client,
        p.client_create,
        p.client_update,
        p.client_delete,
        p.supplier,
        p.supplier_create,
        p.supplier_update,
        p.supplier_delete,
        p.employee,
        p.employee_create,
        p.employee_update,
        p.employee_delete,
        p.buy,
        p.buy_return,
        p.buy_pay,
        p.sell,
        p.sell_return,
        p.sell_pay,
        p.consult_product,
        p.consult_invoice,
        p.consult_movement,
        p.consult_supplier,
        p.consult_client,
        p.setting,
        id,
      ]
    );
    if (response.rowCount > 0) {
      res.status(200).send("Permission Updating Success");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const deletePermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("delete from permissions where id=$1", [
      id,
    ]);
    if (response.rowCount > 0) {
      res.status(200).send("Delete Permission Sucess");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    res.status(404).send(error)
  }
};

module.exports = {
  getPermissions,
  getPermissionsById,
  createPermissions,
  updatePermissions,
  deletePermissions,
};
