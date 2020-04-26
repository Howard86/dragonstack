import { REFRESH_RATE, SECONDS } from '../generation.constant';

const refreshRate = REFRESH_RATE * SECONDS;

export class CreateGenerationDto {
  generationId: number;

  get expiration(): Date {
    const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2));

    const msUntilExpiration =
      Math.random() < 0.5
        ? refreshRate - expirationPeriod
        : refreshRate + expirationPeriod;

    return new Date(Date.now() + msUntilExpiration);
  }
}
