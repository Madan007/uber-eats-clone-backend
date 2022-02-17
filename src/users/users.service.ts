import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/create-account.dto';
import { LoginInput, LoginOutpt } from './dto/login.dto';
import { User } from './entities/user.entity';
import { OUTPUT_CONFIG } from './config';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';
import { UserProfileOutput } from './dto/user-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly globalConfigService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private filterData = (filterColumns, data) =>
    filterColumns.reduce(
      (result, key) => ({
        ...result,
        [key]: data[key],
      }),
      {},
    );

  private prepareResponse(responsePayload) {
    const {
      Code,
      data = { id: null, email: '' },
      userProfile = {
        id: null,
        email: null,
        role: null,
        createdDate: null,
        updatedDate: null,
      },
      token = '',
    } = responsePayload;

    const colletiveData = {
      ...OUTPUT_CONFIG[Code],
      data,
      token,
      userProfile,
    };

    const commonItems = ['message', 'ok', 'error', 'code'];

    switch (colletiveData.type) {
      case 'createAccount':
        return this.filterData([...commonItems, 'data'], colletiveData);

      case 'login':
        return this.filterData([...commonItems, 'token'], colletiveData);

      case 'userProfile':
        return this.filterData([...commonItems, 'userProfile'], colletiveData);

      default:
        break;
    }
  }

  async createAccount(
    accountDetails: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const { email, password, role } = accountDetails;

      const exists = await this.usersRepository.findOne({ email });

      if (exists) return this.prepareResponse({ Code: 'CODE-CA-2' });

      const data = await this.usersRepository.save(
        this.usersRepository.create({ email, password, role }),
      );

      return this.prepareResponse({ Code: 'CODE-CA-1', data });
    } catch (err) {
      return this.prepareResponse({ Code: 'CODE-CA-3' });
    }
  }

  async login(LoginData: LoginInput): Promise<LoginOutpt> {
    try {
      const { email, password } = LoginData;

      const user = await this.usersRepository.findOne({ email });
      if (!user) return this.prepareResponse({ Code: 'CODE-LO-2' });

      const passwordMatch = await user.checkPassword(password);
      if (!passwordMatch) return this.prepareResponse({ Code: 'CODE-LO-2' });

      const token = this.jwtService.sign({ id: user.id });

      return this.prepareResponse({ Code: 'CODE-LO-1', token });
    } catch (err) {
      return this.prepareResponse({ Code: 'CODE-LO-3' });
    }
  }

  async userProfile(userId: number): Promise<UserProfileOutput> {
    try {
      const { id, email, role, createdDate, updatedDate } =
        await this.usersRepository.findOne({ id: userId });

      const userProfile = { id, email, role, createdDate, updatedDate };

      return this.prepareResponse({ Code: 'CODE-UP-1', userProfile });
    } catch (err) {
      return this.prepareResponse({ Code: 'CODE-UP-2' });
    }
  }
}
