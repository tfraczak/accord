import { User } from './user';

declare global {
  var currentUser: User;
  var defaultAvatarUrl: string;
}