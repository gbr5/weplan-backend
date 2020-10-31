import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserConfirmationService from '@modules/users/services/CreateUserConfirmationService';
import UpdateUserConfirmationService from '@modules/users/services/UpdateUserConfirmationService';
import ShowUserConfirmationService from '@modules/users/services/ShowUserConfirmationService';
import DeleteUserConfirmationService from '@modules/users/services/DeleteUserConfirmationService';
import ListReceiverConfirmationsService from '@modules/users/services/ListReceiverConfirmationsService';
import ListSenderConfirmationsService from '@modules/users/services/ListSenderConfirmationsService';

export default class UserConfirmationsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { sender_id, receiver_id, title, message, isConfirmed } = req.body;

    const createUserConfirmation = container.resolve(
      CreateUserConfirmationService,
    );

    const employee = await createUserConfirmation.execute({
      sender_id,
      receiver_id,
      title,
      message,
      isConfirmed,
    });

    return res.json(classToClass(employee));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { title, message, isConfirmed } = req.body;

    const updateUserConfirmation = container.resolve(
      UpdateUserConfirmationService,
    );

    const employee = await updateUserConfirmation.execute({
      id,
      title,
      message,
      isConfirmed,
    });

    return res.json(classToClass(employee));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { receiver_id, sender_id } = reqParams;
    const showUserConfirmation = container.resolve(ShowUserConfirmationService);

    const employee = await showUserConfirmation.execute(receiver_id, sender_id);

    return res.json(classToClass(employee));
  }

  public async listReceiver(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { receiver_id } = reqParams;
    const listReceiverConfirmations = container.resolve(
      ListReceiverConfirmationsService,
    );

    const employee = await listReceiverConfirmations.execute(receiver_id);

    return res.json(classToClass(employee));
  }

  public async ListSender(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { sender_id } = reqParams;
    const listSenderConfirmations = container.resolve(
      ListSenderConfirmationsService,
    );

    const employee = await listSenderConfirmations.execute(sender_id);

    return res.json(classToClass(employee));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteUserConfirmation = container.resolve(
      DeleteUserConfirmationService,
    );

    await deleteUserConfirmation.execute(id);

    return res.status(200).send();
  }
}
