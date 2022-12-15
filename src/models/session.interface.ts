import { User } from './user.interface';
export interface Session {
    uuid: string
    user: User
    codeblock_id: string
}