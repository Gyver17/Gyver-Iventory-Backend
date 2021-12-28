const pool = require("../database");
const { v4 } = require("uuid");

const getCategory = async (req, res) => {
  try {
    const response = await pool.query(
      "select * from category order by name asc"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from category where id=$1", [
      id,
    ]);
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

const createCategory = async (req, res) => {
  try {
    const id = v4();
    const { name, unit } = req.body;
    await pool.query(
      "insert into category (id, name, unit) values ($1, $2, $3)",
      [id, name, unit]
    );
    res.status(200).send({ id, name, unit });
  } catch (error) {
    res.status(404).send(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, unit } = req.body;
    const response = await pool.query(
      "update category set name=$1, unit=$2 where id=$3",
      [name, unit, id]
    );
    if (response.rowCount > 0) {
      res.status(200).send("Category Updated Successfully");
    } else {
      res.status(404).send("Id not found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("delete from category where id=$1", [id]);
    if (response.rowCount > 0) {
      res.status(200).send("Category Deleted SuccessFully");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {}
};

module.exports = {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
