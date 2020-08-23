import { IDatabaseDriver, EntityManager } from "@mikro-orm/core";
import { Response, Request, Express } from "express";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver>;
  res: Response & { session: Express.Session };
  req: Request;
};
