import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import SES from 'aws-sdk/clients/ses';
import { inject, injectable } from 'tsyringe';
import IUserFormsRepository from '../repositories/IUserFormsRepository';

interface IFormResultFieldDTO {
  name: string;
  value: string;
}

interface ISendFormEmailNotificationsDTO {
  form_id: string;
  formResults: IFormResultFieldDTO[];
}

@injectable()
class SendFormEmailNotificationsService {
  private client: SES;

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,
  ) {
    this.client = new SES({
      region: 'us-east-1',
    });
  }

  async execute({
    form_id,
    formResults,
  }: ISendFormEmailNotificationsDTO): Promise<void> {
    const form = await this.userFormsRepository.findById(form_id);
    if (!form) {
      throw new AppError('Form not found!');
    }
    const user = await this.usersRepository.findById(form.user_id);
    if (!user) {
      throw new AppError('User not found!');
    }
    const eString = JSON.stringify(formResults);

    const results = eString
      .replace(/\[/g, '')
      .replace(/\]/g, '')
      .replace(/"/g, '')
      .replace(/\b,/g, ';')
      .replace(/name:/g, '')
      .replace(/value:/g, '')
      .replace(/{/g, '')
      .replace(/}/g, '')
      .replace(/;/g, ': ')
      .replace(/,/g, '\n');

    const internalMessage = form.emailNotifications.find(
      email => email.notification_type === 'internal_message',
    );

    if (internalMessage) {
      const message = `
        ${internalMessage.message}\n
        ${results}
      `;
      const toAdresses = internalMessage.recipients
        .filter(recipient => recipient.sending_type === 'to')
        .map(recipient => recipient.email);
      const ccAdresses = internalMessage.recipients
        .filter(recipient => recipient.sending_type === 'cc')
        .map(recipient => recipient.email);
      const ccoAdresses = internalMessage.recipients
        .filter(recipient => recipient.sending_type === 'cco')
        .map(recipient => recipient.email);
      if (toAdresses.length <= 0) {
        toAdresses.push(user.email);
      }
      await this.client
        .sendEmail({
          Source: 'WePlan Forms <guy@weplan.world>',
          Destination: {
            ToAddresses: toAdresses,
            CcAddresses: ccAdresses,
            BccAddresses: ccoAdresses,
          },
          Message: {
            Subject: {
              Data: internalMessage.subject,
            },
            Body: {
              Text: {
                Data: message,
              },
            },
          },
          ConfigurationSetName: 'WPParty',
        })
        .promise();
    }
    const externalMessage = form.emailNotifications.find(
      email => email.notification_type === 'external_message',
    );

    if (externalMessage) {
      const toAddress =
        formResults.find(result => result.name === 'email')?.value || '';
      await this.client
        .sendEmail({
          Source: 'WePlan Forms <guy@weplan.world>',
          Destination: {
            ToAddresses: [toAddress],
          },
          Message: {
            Subject: {
              Data: externalMessage.subject,
            },
            Body: {
              Text: {
                Data: externalMessage.message,
              },
            },
          },
          ConfigurationSetName: 'WPParty',
        })
        .promise();
    }
  }
}

export default SendFormEmailNotificationsService;
