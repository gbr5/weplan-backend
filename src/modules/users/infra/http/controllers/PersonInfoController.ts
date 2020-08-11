import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePersonInfoService from '@modules/users/services/CreatePersonInfoService';
import UpdatePersonInfoService from '@modules/users/services/UpdatePersonInfoService';
import ShowPersonInfoService from '@modules/users/services/ShowPersonInfoService';

export default class PersonInfoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const { person_id, first_name, last_name } = req.body;

    const createPersonInfo = container.resolve(CreatePersonInfoService);

    const personInfo = await createPersonInfo.execute({
      person_id,
      user_id,
      first_name,
      last_name,
    });

    return res.json(personInfo);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { user_id } = dataParams;

    const showPersonInfo = container.resolve(ShowPersonInfoService);

    const personInfo = await showPersonInfo.execute({ user_id });

    return res.json(personInfo);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const { first_name, last_name, person_id } = req.body;

    const updatePersonInfo = container.resolve(UpdatePersonInfoService);

    const personInfo = await updatePersonInfo.execute({
      person_id,
      user_id,
      first_name,
      last_name,
    });

    return res.json(personInfo);
  }
}
