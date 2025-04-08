import { AddDiamondNotes } from '@/dtos/userDtos/diamond.dto';
import { HttpException } from '@/exceptions/HttpException';
import { DiamondModel } from '@/models/diamonds.model';
import { SearchHistoryModel } from '@/models/searchHistory.model';
import { UserDiamondNotesModel } from '@/models/userDiamondNotes.model';
import { User } from '@/models/users.model';
import { CODE_BAD_REQUEST } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import Container, { Service } from 'typedi';
import { DiamondService } from '../diamond.service';

@Service()
export class UserDiamondService {
  private commonDiamondService = Container.get(DiamondService);
  public async addDiamondNotes(data: AddDiamondNotes, user: User) {
    const diamondIds = data.diamondNotes.map(data => data.diamondId);
    const findDiamonds = await DiamondModel.find({ _id: { $in: diamondIds } });
    if (findDiamonds.length !== diamondIds.length) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.DIAMOND_NOT_FOUND);
    }

    const promiseArray = [];
    for (let index = 0; index < data.diamondNotes.length; index++) {
      const findDiamond = findDiamonds.find(diamond => diamond._id.toString() === data.diamondNotes[index].diamondId);
      promiseArray.push(
        UserDiamondNotesModel.findOneAndUpdate(
          { uniqueStoneId: findDiamond.uniqueStoneId, user: user._id },
          { $set: { notes: data.diamondNotes[index].notes } },
          { upsert: true },
        ),
      );
    }
    await Promise.allSettled(promiseArray);
  }

  public async saveDiamondSearch(filters: any, user: User) {
    const result = await this.commonDiamondService.getDiamondList(filters);
    await SearchHistoryModel.create({
      user: user._id,
      filters,
      totalStones: result.totalCount,
    });
  }
}
