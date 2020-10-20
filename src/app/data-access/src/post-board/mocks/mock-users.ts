import { RoleType } from '../models/role-type.enum';
import { User } from '../models/user';

export const MOCK_USERS: User[] = [
    {
        id: 575,
        name: 'Avi.E',
        role: RoleType.ADMIN,
    },
    {
        id: 434,
        name: 'John doe',
        role: RoleType.ENABLEMENT,
    },
    {
        id: 222,
        name: 'Mr Smith',
        role: RoleType.UNASSIGNED_NEW_USER,
    },
];
