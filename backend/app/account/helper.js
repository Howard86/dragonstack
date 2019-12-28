import SHA256 from 'crypto-js/sha256';
import { APP_SECRET } from '../../secrets';

export const hash = string =>
  SHA256(`${APP_SECRET}${string}${APP_SECRET}`).toString();
