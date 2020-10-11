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
    console.log('1 -> 45', user_id);
    const userFriends = await this.userFriendsRepository.findAllFriends(
      user_id,
    );

    const friendsIds = userFriends.map(user => user.friend_id);
    console.log('LINHA 52', 'friendsIds', friendsIds);
    const groupedFriendsIds: string[] = [];
    // const personInfoArray: IUserPersonInfoDTO[] = [];

    friendsIds.map(async id => {
      const checkId = groupedFriendsIds.find(ids => ids === id);
      if (checkId === undefined) {
        // const pI = await this.personInfoRepository.findByUserId(id);
        // if (pI)
        //   personInfoArray.push({
        //     id,
        //     first_name: pI.first_name,
        //     last_name: pI.last_name,
        //   });
        return groupedFriendsIds.push(id);
      }
      return groupedFriendsIds;
    });
    console.log('LINHA 62', 'groupedFriendsIds', groupedFriendsIds);

    // groupedFriendsIds.map(async id => {
    //   try {
    //     const pI = await this.personInfoRepository.findByUserId(id);
    //     if (pI)
    //       personInfoArray.push({
    //         id,
    //         first_name: pI.first_name,
    //         last_name: pI.last_name,
    //       });
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // });
    // console.log('LINHA 78', 'personInfoArray', personInfoArray);

    const listUserFriends: IFriendDTOTest[] = [];
    console.log('2 -> 52', userFriends);
    console.log('3 -> 53', 'listUserFriends', listUserFriends);

    const handleUserFriend = async (friend: UserFriend) => {
      const friendPersonInfo = await this.personInfoRepository.findByUserId(
        friend.friend.id,
      );
      console.log('4 -> 59', 'listUserFriends', listUserFriends);
      console.log('LINHA 60', 'friendPersonInfo', friendPersonInfo);

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
      console.log('=====================>', 'listUserFriends', listUserFriends);
    };

    const handleFriendGroup = async (friend: UserFriend) => {
      const friendIndex = listUserFriends.findIndex(
        user => user.id === friend.friend.id,
      );
      console.log('5 -> 84', 'listUserFriends', listUserFriends);
      console.log('LINHA 86', 'friendIndex', friendIndex);

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
      console.log('97', 'friend.id = user.friend.id', friend);

      if (checkFriendInArray) {
        handleFriendGroup(friend);
        console.log('6 -> 100', 'listUserFriends', listUserFriends);
      } else {
        handleUserFriend(friend);
        console.log('7 -> 103', 'listUserFriends', listUserFriends);
      }
      return friend;
    });

    console.log('LINHA -> 155', 'listUserFriends', listUserFriends);

    return userFriends;
  }
}

export default ListUserFriendsService;
