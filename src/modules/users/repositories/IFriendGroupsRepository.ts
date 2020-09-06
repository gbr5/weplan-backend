import FriendGroup from '@modules/users/infra/typeorm/entities/FriendGroup';
import ICreateFriendGroupDTO from '@modules/users/dtos/ICreateFriendGroupDTO';

export default interface IFriendGroupsRepository {
  findAllGroups(user_id: string): Promise<FriendGroup[]>;
  findByNameAndUserId(
    user_id: string,
    name: string,
  ): Promise<FriendGroup | undefined>;
  findByFriendGroupId(id: string): Promise<FriendGroup | undefined>;
  create(data: ICreateFriendGroupDTO): Promise<FriendGroup>;
  save(user: FriendGroup): Promise<FriendGroup>;
  delete(user: FriendGroup): Promise<void>;
}
