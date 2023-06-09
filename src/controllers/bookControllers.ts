import { NextFunction, Request, Response } from "express";
import bookServices from "../service/bookServices";

async function create(req: Request, res: Response, next: NextFunction) {
  const { name, author } = req.body;
  const { id } = res.locals.user;

  try {
    await bookServices.create({
      name,
      author,
      userId: id,
      available: true,
    });

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const books = await bookServices.findAll();
    res.send(books);
  } catch (err) {
    next(err);
  }
}

async function takeBook(req: Request, res: Response, next: NextFunction) {
  const { id } = res.locals.user;
  const bookId = +req.params.id;
  try {
    await bookServices.takeBook(id, bookId);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function findAllMyBooks(req: Request, res: Response, next: NextFunction) {
  const { id } = res.locals.user;
  try {
    const books = await bookServices.findAllMyBooks(id);
    res.send(books);
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  findAll,
  takeBook,
  findAllMyBooks,
};
