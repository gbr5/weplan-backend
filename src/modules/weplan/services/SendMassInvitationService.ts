import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import SES from 'aws-sdk/clients/ses';
import { inject, injectable } from 'tsyringe';

//
//
// Descobrir como usar o node.js como multi threads
// Descobrir como limitar o número de e-mails enviados dado o número de emails e a restrição por segundo
//
//

interface IGuest {
  email: string;
  id: string;
  host_name: string;
  first_name: string;
}

interface ISendMassInvitation {
  guests: IGuest[];
  eventName: string;
  eventTrimmedName: string;
}

@injectable()
class SendMassInvitationService {
  private client: SES;

  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,
  ) {
    this.client = new SES({
      region: 'us-east-1',
    });

    // this.client
    //   .getSendQuota()
    //   .promise()
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err));
  }

  async execute({
    guests,
    eventName,
    eventTrimmedName,
  }: ISendMassInvitation): Promise<void> {
    // const sesRestrictions = await this.client
    //   .getSendQuota()
    //   .promise()
    //   .then(data => {
    //     return data;
    //   })
    //   .catch(err => console.log(err));

    // if (!sesRestrictions) {
    //   throw new AppError('SES resctrictions not found!');
    // }

    // console.log('sesRestrictions', sesRestrictions);
    // console.log('sesRestrictions.MaxSendRate', sesRestrictions.MaxSendRate);
    // console.log(
    //   'sesRestrictions.SentLast24Hours',
    //   sesRestrictions.SentLast24Hours,
    // );
    Promise.all([
      guests.map(guest => {
        return this.client
          .sendEmail({
            Source: 'WePlan Invitation <guy@weplan.world>',
            Destination: {
              CcAddresses: [`Convidado ${guest.first_name} < ${guest.email}>`],
            },
            Message: {
              Subject: {
                Data: `${guest.host_name} convidadou você para ${eventName} | WePlan`,
              },
              Body: {
                Text: {
                  Data: `Olá ${guest.first_name}, ${guest.host_name} convidou você para seu evento ${eventName}. Acesse http://weplan.party/event/${eventTrimmedName}/${guest.id} para vizualizar os detalhes`,
                },
              },
            },
            ConfigurationSetName: 'WPParty',
          })
          .promise();
      }),
    ]);
  }
}

export default SendMassInvitationService;
