const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getCategory = async (req, res) => {
  try {
    /*const response = await pool.query(
      "select * from category order by name asc"
    );*/
    const response = await pool.query(
      `select *, (select count(*) from products 
      where id_category=category.id) as quantity from category order by name asc`
    );
    
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error)
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from category where id=$1", [
      id,
    ]);
    res.status(200).json(response.rows[0]);
  } catch (error) {
    handleError(res, error)
  }
};

const createCategory = async (req, res) => {
  try {
    const id = v4();
    const { name } = req.body;
    await pool.query(
      "insert into category (id, name) values ($1, $2)",
      [id, name]
    );
    res.status(200).send({ message: "Successful" });
  } catch (error) {
    handleError(res, error)
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const response = await pool.query(
      "update category set name=$1 where id=$2",
      [name, id]
    );
    if (response.rowCount > 0) {
      res.status(200).send({ message: "Successful" });
    } else {
      res.status(404).send({ code: "44947" });
    }
  } catch (error) {
    rhandleError(res, error)
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("delete from category where id=$1", [id]);
    if (response.rowCount > 0) {
      res.status(200).send({ message: "Successful" });
    } else {
      res.status(404).send({ code: "44947" })
    }
  } catch (error) {
    handleError(res, error)
  }
};

module.exports = {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
