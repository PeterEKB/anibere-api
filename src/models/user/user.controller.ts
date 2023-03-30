import { Controller, Get } from '@nestjs/common';
import { Body, Param, Post, Sse } from '@nestjs/common/decorators';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('u:id')
  async getUser(@Param('id') id): Promise<{ results: User | string }> {
    const search = this.userService.getUserById(id);

    return search.then((x) => {
      return { results: x };
    });
  }
  @Post()
  authenticateUserPass(@Body() body): { results: User | string } {
    const search = this.userService.validateUser(body.username, body.password);
    this.userService.updatelogin(search)
    return { results: search };
  }
}
