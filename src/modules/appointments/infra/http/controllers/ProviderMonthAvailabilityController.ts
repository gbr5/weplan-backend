import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthlyAvailabilityService from '@modules/appointments/services/ListProviderMonthlyAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.params.id;
    const { month, year } = req.body;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthlyAvailabilityService,
    );

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return res.json(availability);
  }
}
