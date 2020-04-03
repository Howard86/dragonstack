import { ConfigService } from '../config/config.service';
export const jwtConstants = new ConfigService().getJwtConfig();
