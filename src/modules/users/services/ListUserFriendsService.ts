import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IPersonInfoRepository from '../repositories/IPersonInfoRepository';
// import IUserFriendDTO from '../dtos/IUserFriendDTO';
import UserFriend from '../infra/typeorm/entities/UserFriend';

interface IUserPersonInfoDTO {
  id: string;
  first_name: string;
  last_name: string;
}

interface IGroupFriendInfoDTO {
  groupId: string;
  name: string;
  group_friendId: string;
}

interface IUserFriendDTOTest {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  my_userId: string;
  avatar: string;
  friendGroup: IGroupFriendInfoDTO[];
}
interface IFriendDTOTest {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  my_userId: string;
  avatar: string;
  friendGroup: IGroupFriendInfoDTO;
}

@injectable()
class ListUserFriendsService {
  constructor(
    @inject('UserFriendsRepository')
    private userFriendsRepository: IUserFriendsRepository,

    @inject('PersonInfoRepository')
    private personInfoRepository: IPersonInfoRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<UserFriend[]> {
    const userFriends = await this.userFriendsRepository.findAllFriends(
      user_id,
    );

    const friendsIds = userFriends.map(user => user.friend_id);
    const groupedFriendsIds: string[] = [];

    friendsIds.map(async id => {
      const checkId = groupedFriendsIds.find(ids => ids === id);
      if (checkId === undefined) {
        return groupedFriendsIds.push(id);
      }
      return groupedFriendsIds;
    });

    const listUserFriends: IFriendDTOTest[] = [];

    const handleUserFriend = async (friend: UserFriend) => {
      const friendPersonInfo = await this.personInfoRepository.findByUserId(
        friend.friend.id,
      );

      listUserFriends.push({
        id: friend.friend.id,
        name: friend.friend.name,
        first_name: friendPersonInfo ? friendPersonInfo.first_name : '',
        last_name: friendPersonInfo
          ? friendPersonInfo.last_name
          : `${friend.id}`,
        avatar: friend.friend.avatar ? friend.friend.avatar : '',
        my_userId: friend.user_id,
        friendGroup: {
          groupId: friend.friendGroup.id,
          name: friend.friendGroup.name,
          group_friendId: friend.id,
        },
      });
    };

    const handleFriendGroup = async (friend: UserFriend) => {
      const friendIndex = listUserFriends.findIndex(
        user => user.id === friend.friend.id,
      );

      listUserFriends[friendIndex].friendGroup = {
        groupId: friend.friendGroup.id,
        name: friend.friendGroup.name,
        group_friendId: friend.id,
      };
    };

    userFriends.map(friend => {
      const checkFriendInArray = listUserFriends.find(
        user => user.id === friend.friend_id,
      );

      if (checkFriendInArray) {
        handleFriendGroup(friend);
      } else {
        handleUserFriend(friend);
      }
      return friend;
    });

    return userFriends;
  }
}

export default ListUserFriendsService;
