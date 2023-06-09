import {
  getAllService,
  getByIdService,
  createService,
  updateService,
  deleteService,
} from "../services/ProductService.js";

export const getAllController = async (req, res, next) => {
  try {
    const docs = await getAllService();
    res.json(docs);
  } catch (error) {
    next(error);
  }
};

export const getByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await getByIdService(id);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const createController = async (req, res, next) => {
  try {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    const newDoc = await createService({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    });
    res.json(newDoc);
  } catch (error) {
    next(error);
  }
};

export const updateController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    await getByIdService(id);
    const docUpd = await updateService(id, {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    });
    res.json(docUpd);
  } catch (error) {
    next(error);
  }
};

export const deleteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteService(id);
    res.json({ message: "Producto borrado satisfactoriamente!" });
  } catch (error) {
    next(error);
  }
};
