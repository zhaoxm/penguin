import { JwtPayload } from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';

export type UserPayload = JwtPayload & User;
