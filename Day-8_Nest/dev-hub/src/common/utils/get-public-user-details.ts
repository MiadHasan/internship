import { Types } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import { PublicUserDetails } from 'src/user/interface/user-details.interface';

export const getPublicUserDetails = (user: Users & { _id: Types.ObjectId }) => {
  const userDetails: PublicUserDetails = {
    _id: user._id,
    username: user.username,
    skills: user.skills,
    experience: user.experience,
  };
  return userDetails;
};
