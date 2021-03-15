import { getRepository, Repository } from 'typeorm';
import IContactPagePostsRepository from '@modules/contactPages/repositories/IContactPagePostsRepository';
import ICreateContactPagePostDTO from '@modules/contactPages/dtos/ICreateContactPagePostDTO';
import ContactPagePost from '../entities/ContactPagePost';

class ContactPagePostsRepository implements IContactPagePostsRepository {
  private ormRepository: Repository<ContactPagePost>;

  constructor() {
    this.ormRepository = getRepository(ContactPagePost);
  }

  public async findById(id: string): Promise<ContactPagePost | undefined> {
    const findContactPagePost = await this.ormRepository.findOne(id);

    return findContactPagePost;
  }

  public async findByContactPageId(
    contact_page_id: string,
  ): Promise<ContactPagePost[]> {
    const findContactPagePost = await this.ormRepository.find({
      where: { contact_page_id },
    });

    return findContactPagePost;
  }

  public async create(
    data: ICreateContactPagePostDTO,
  ): Promise<ContactPagePost> {
    const contactPage = this.ormRepository.create(data);

    await this.ormRepository.save(contactPage);

    return contactPage;
  }

  public async save(contactPage: ContactPagePost): Promise<ContactPagePost> {
    return this.ormRepository.save(contactPage);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ContactPagePostsRepository;
