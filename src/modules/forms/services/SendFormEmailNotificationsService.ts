import ICompanyContactInfosRepository from '@modules/suppliers/repositories/ICompanyContactInfosRepository';
import ICompanyContactNotesRepository from '@modules/suppliers/repositories/ICompanyContactNotesRepository';
import ICompanyContactsRepository from '@modules/suppliers/repositories/ICompanyContactsRepository';
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

    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,

    @inject('CompanyContactInfosRepository')
    private companyContactInfosRepository: ICompanyContactInfosRepository,

    @inject('CompanyContactNotesRepository')
    private companyContactNotesRepository: ICompanyContactNotesRepository,
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
    const email = formResults.find(result => result.name === 'email');
    const name = formResults.find(result => result.name === 'name');
    const phone = formResults.find(result => result.name === 'phone');
    const whatsapp = formResults.find(result => result.name === 'whatsapp');
    const instagram = formResults.find(result => result.name === 'instagram');
    const facebook = formResults.find(result => result.name === 'facebook');
    const familyName = formResults.find(
      result => result.name === 'family_name',
    );

    const eString = JSON.stringify(formResults);

    const results = eString
      .replace(/\[/g, '\n')
      .replace(/\]/g, '')
      .replace(/"/g, '')
      .replace(/\b,/g, ';')
      .replace(/name:/g, '')
      .replace(/value:/g, '')
      .replace(/{/g, '')
      .replace(/}/g, '')
      .replace(/;/g, ': ')
      .replace(/,/g, '\n');

    const note = `Formulário ${form.name}\n${results}`;

    if (email && name) {
      const companyContacts = await this.companyContactsRepository.findByCompanyId(
        form.user_id,
      );
      const findByEmail = companyContacts.find(contact => {
        const contactEmail = contact.contact_infos.find(
          emailInfo => emailInfo.info_type === 'Email',
        );

        if (contactEmail && email.value === contactEmail.info) {
          return contact;
        }
        return undefined;
      });
      if (findByEmail !== undefined) {
        await this.companyContactNotesRepository.create({
          company_contact_id: findByEmail.id,
          isNew: true,
          note,
        });
        if (phone !== undefined) {
          const findPhone = findByEmail.contact_infos.find(
            contactInfo =>
              contactInfo.info_type === 'Phone' &&
              contactInfo.info === phone.value,
          );
          if (!findPhone) {
            await this.companyContactInfosRepository.create({
              company_contact_id: findByEmail.id,
              info: phone.value,
              info_type: 'Phone',
            });
          }
        }
        if (instagram !== undefined) {
          const findInstagram = findByEmail.contact_infos.find(
            contactInfo =>
              contactInfo.info_type === 'Instagram' &&
              contactInfo.info === instagram.value,
          );
          if (instagram && !findInstagram) {
            await this.companyContactInfosRepository.create({
              company_contact_id: findByEmail.id,
              info: instagram.value,
              info_type: 'Instagram',
            });
          }
        }
        if (facebook !== undefined) {
          const findFacebook = findByEmail.contact_infos.find(
            contactInfo =>
              contactInfo.info_type === 'Facebook' &&
              contactInfo.info === facebook.value,
          );
          if (facebook && !findFacebook) {
            await this.companyContactInfosRepository.create({
              company_contact_id: findByEmail.id,
              info: facebook.value,
              info_type: 'Facebook',
            });
          }
        }
        if (whatsapp !== undefined) {
          const findWhatsapp = findByEmail.contact_infos.find(
            contactInfo =>
              contactInfo.info_type === 'Whatsapp' &&
              contactInfo.info === whatsapp.value,
          );
          if (whatsapp || !findWhatsapp) {
            await this.companyContactInfosRepository.create({
              company_contact_id: findByEmail.id,
              info: whatsapp.value,
              info_type: 'Whatsapp',
            });
          }
        }
      } else {
        const newContact = await this.companyContactsRepository.create({
          company_contact_type: 'Others',
          company_id: form.user_id,
          description: `Criado através do formulário ${form.name}`,
          family_name: familyName?.value || ' ',
          isCompany: false,
          isNew: true,
          name: name.value,
          weplanUser: false,
        });
        await this.companyContactInfosRepository.create({
          company_contact_id: newContact.id,
          info_type: 'Email',
          info: email.value,
        });

        await this.companyContactNotesRepository.create({
          company_contact_id: newContact.id,
          isNew: true,
          note,
        });
        if (phone !== undefined) {
          await this.companyContactInfosRepository.create({
            company_contact_id: newContact.id,
            info: phone.value,
            info_type: 'Phone',
          });
        }
        if (instagram !== undefined) {
          await this.companyContactInfosRepository.create({
            company_contact_id: newContact.id,
            info: instagram.value,
            info_type: 'Instagram',
          });
        }
        if (facebook !== undefined) {
          await this.companyContactInfosRepository.create({
            company_contact_id: newContact.id,
            info: facebook.value,
            info_type: 'Facebook',
          });
        }
        if (whatsapp !== undefined) {
          await this.companyContactInfosRepository.create({
            company_contact_id: newContact.id,
            info: whatsapp.value,
            info_type: 'Whatsapp',
          });
        }
      }
    }

    const internalMessage =
      form && form.emailNotifications && form.emailNotifications.length > 0
        ? form.emailNotifications.find(
            internalEmail =>
              internalEmail.notification_type === 'internal_message',
          )
        : undefined;

    if (internalMessage !== undefined) {
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
    const externalMessage =
      form && form.emailNotifications && form.emailNotifications.length > 0
        ? form.emailNotifications.find(
            externalEmail =>
              externalEmail.notification_type === 'external_message',
          )
        : undefined;

    if (externalMessage !== undefined) {
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
