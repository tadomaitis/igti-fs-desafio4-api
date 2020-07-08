import { gradeModel } from "../models/grades.js";
import { logger } from "../config/logger.js";

const create = async (req, res) => {
  try {
    const grade = new gradeModel(req.body);
    await grade.save();
    res.send(grade);
    logger.info(`POST /grade - ${JSON.stringify(grade)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (_, res) => {
  try {
    const grades = await gradeModel.find({});
    res.send(grades);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const grade = await gradeModel.find({ _id: id });
    if (!grade) {
      res.status(404).send("Grade not found on database");
    }
    res.status(200).send(grade);
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }
  const id = req.params.id;
  try {
    const grade = await gradeModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send({ message: "Grade atualizado com sucesso", grade });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    const grade = await gradeModel.findByIdAndDelete({
      _id: id,
    });
    if (!grade) {
      res.status(400).send("Grade not found");
    }
    res.status(200).send({ message: "Grade excluido com sucesso" });

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (_, res) => {
  try {
    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos as Grades" });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
