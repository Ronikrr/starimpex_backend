/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ChangeUserStatusDto, GetCartHistoryListDto, GetPriceTrackHistoryListDto, GetUserListDto } from '../../dtos/adminDtos/user.dto';
import { UserCartHistory } from '../../models/userCartHistory.model';
import { UserPriceTrackHistory } from '../../models/userPriceTrackHistory.model';
import { User } from '../../models/users.model';
export declare class UserService {
    getUserList(getData: GetUserListDto): Promise<{
        users: (import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, User> & User & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction)[];
        totalPage: number;
    }>;
    changeUserStatus(userId: string, updateData: ChangeUserStatusDto): Promise<User>;
    getUser(userId: string): Promise<User>;
    getUserCartHistory(getData: GetCartHistoryListDto): Promise<{
        totalPages: number;
        cartHistory: UserCartHistory[];
    }>;
    getUserPriceTrackHistory(getData: GetPriceTrackHistoryListDto): Promise<{
        totalPages: number;
        priceTrackHistory: UserPriceTrackHistory[];
    }>;
}
