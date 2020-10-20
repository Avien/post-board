import { RoleType } from './role-type.enum';

export interface User {
    id: number;
    name: string;
    role: RoleType;
}
