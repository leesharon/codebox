import { User } from './user.interface';
export interface Session {
    uuid: string
    user: User
    codeBlock_id: string
}