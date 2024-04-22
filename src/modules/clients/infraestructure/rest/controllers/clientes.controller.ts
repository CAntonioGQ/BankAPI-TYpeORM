import { Request, Response } from 'express';
import clientUseCase from '../../../application/usescases/clients';
import { ClientFactory } from '../../../domain/factories/clients.factory';
import { Client } from '../../../domain/models/clients';



export const getClients = async (req: Request, res: Response) => {
  try {
    const data = await clientUseCase.getClients(req.query);
    return res.json({ ok: true, data });
  } catch (err) {
    return res.json({ ok: false, message: err });
  }
};

export const getClientByPk = async (req: Request, res: Response) => {
  try {
    const idCliente = req.params.idCliente as unknown as number;
    const data = await clientUseCase.getClientByPk(idCliente);
    return res.json({ ok: true, data });
  } catch (err) {
    return res.json({ ok: false, message: err });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = new Client();
    ClientFactory.populate(client, req.body);
    const data = await clientUseCase.createClient(client);
    return res.json({ ok: true, data });
  } catch (err) {
    return res.json({ ok: false, message: err });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const client = new Client();
    ClientFactory.populate(client, req.body);
    const clientUpdated = await clientUseCase.updateClient(client.getIdClient!, client);
    return res.json({ ok: true, data: clientUpdated });
  } catch (err) {
    return res.json({ ok: false, message: err });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const idCliente: number = parseInt(req.params.idCliente);
    const clientDeleted = await clientUseCase.deleteClient(idCliente);
    return res.json({ ok: true, data: clientDeleted });
  } catch (err) {
    return res.json({ ok: false, message: err });
  }
};