import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { Auth0Service } from 'src/auth0.service';

export type User = {
  id?: string;
  email: string;
  password?: string;
  given_name: string;
  family_name: string;
  role: Role;
  talentProfileId?: string;
  companyProfileId?: string;
};

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly auth0Service: Auth0Service,
  ) {}

  // @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() user: User): Promise<User> {
    const { given_name, family_name, email, user_id } =
      await this.auth0Service.managementClient.createUser({
        connection: 'Talentpool',
        email: user.email,
        password: user.password,
        given_name: user.given_name,
        family_name: user.family_name,
      });

    const { id, role, talentProfileId, companyProfileId } =
      await this.usersService.createUser({
        id: user_id,
        role: user.role,
        talentProfile: user.talentProfileId
          ? { connect: { id: user.talentProfileId } }
          : undefined,
        companyProfile: user.companyProfileId
          ? { connect: { id: user.companyProfileId } }
          : undefined,
      });

    return {
      id,
      role,
      given_name,
      family_name,
      email,
      talentProfileId,
      companyProfileId,
    };
  }

  @Get()
  async getUsers(
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('role') role?: string,
  ): Promise<User[]> {
    const localUsers = await this.usersService.getUsers({
      take: take ? +take : undefined,
      cursor: cursor
        ? {
            cursor: +cursor,
          }
        : undefined,
      where: {
        role: role ? (role as Role) : undefined,
      },
    });

    return await Promise.all(
      localUsers.map(async (user) => {
        const auth0User = await this.auth0Service.managementClient.getUser({
          id: user.id,
        });
        const { id, role, talentProfileId, companyProfileId } = user;
        const { given_name, family_name, email } = auth0User;
        return {
          id,
          role,
          talentProfileId,
          companyProfileId,
          given_name,
          family_name,
          email,
        };
      }),
    );
  }

  // @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    console.log(id);
    const { role, talentProfileId, companyProfileId } =
      await this.usersService.getUser({ id });
    console.log(id, role, talentProfileId, companyProfileId);

    const { given_name, family_name, email } =
      await this.auth0Service.managementClient.getUser({ id });
    console.log(given_name, family_name, email);

    return {
      id,
      role,
      given_name,
      family_name,
      email,
      talentProfileId,
      companyProfileId,
    };
  }

  // @UseGuards(AuthGuard)
  @Get('talent/:talentProfileId')
  async getUserByTalentProfileId(
    @Param('talentProfileId') talentProfileId: string,
  ): Promise<User> {
    const { id, role, companyProfileId } = await this.usersService.getUser({
      talentProfileId,
    });

    const { given_name, family_name, email } =
      await this.auth0Service.managementClient.getUser({ id });

    return {
      id,
      role,
      given_name,
      family_name,
      email,
      talentProfileId,
      companyProfileId,
    };
  }

  // @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    const {
      role,
      given_name,
      family_name,
      email,
      talentProfileId,
      companyProfileId,
    } = user;

    const newAuth0User = await this.auth0Service.managementClient.updateUser(
      { id },
      { given_name, family_name, email },
    );

    const newLocalUser = await this.usersService.updateUser({
      where: { id },
      data: {
        role,
        talentProfile: talentProfileId
          ? { update: { id: talentProfileId } }
          : undefined,
        companyProfile: companyProfileId
          ? { update: { id: companyProfileId } }
          : undefined,
      },
    });

    return {
      id: newLocalUser.id,
      role: newLocalUser.role,
      given_name: newAuth0User.given_name,
      family_name: newAuth0User.family_name,
      email: newAuth0User.email,
      talentProfileId: newLocalUser.talentProfileId,
      companyProfileId: newLocalUser.companyProfileId,
    };
  }

  // @UseGuards(AuthGuard)
  @Patch('talent/:talentProfileId')
  async updateUserByTalentProfileId(
    @Param('talentProfileId') talentProfileId: string,
    @Body() user: User,
  ): Promise<User> {
    const { id, role, companyProfileId } = await this.usersService.updateUser({
      where: { talentProfileId },
      data: {
        role: user.role,
        talentProfile: user.talentProfileId
          ? { update: { id: user.talentProfileId } }
          : undefined,
      },
    });

    const { family_name, given_name, email } = user;
    const {} = await this.auth0Service.managementClient.updateUser(
      { id },
      { family_name, given_name, email },
    );

    return {
      id,
      role,
      companyProfileId,
      talentProfileId,
      family_name,
      given_name,
      email,
    };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.removeUser({ id });
  }
}
