import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePersonInfoService from '@modules/users/services/CreatePersonInfoService';
import UpdatePersonInfoService from '@modules/users/services/UpdatePersonInfoService';
import ShowPersonInfoService from '@modules/users/services/ShowPersonInfoService';
import FindByFirstAndLastNameService from '@modules/users/services/FindByFirstAndLastNameService';
import { classToClass } from 'class-transformer';

export default class PersonInfoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { person_id, first_name, last_name } = req.body;
    const reqParams = req.params;
    const { user_id } = reqParams;

    const createPersonInfo = container.resolve(CreatePersonInfoService);

    const personInfo = await createPersonInfo.execute({
      person_id,
      user_id,
      first_name,
      last_name,
    });

    return res.json(classToClass(personInfo));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;

    const showPersonInfo = container.resolve(ShowPersonInfoService);

    const personInfo = await showPersonInfo.execute(user_id);

    return res.json(classToClass(personInfo));
  }

  public async findByFirstAndLastName(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const reqParams = req.params;
    const { first_name, last_name } = reqParams;

    const findByFirstAndLastName = container.resolve(
      FindByFirstAndLastNameService,
    );

    const personInfo = await findByFirstAndLastName.execute({
      first_name,
      last_name,
    });

    if (personInfo) {
      return res.json(classToClass(personInfo));
    }
    return res.json();
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

    return res.json(classToClass(personInfo));
  }
}
