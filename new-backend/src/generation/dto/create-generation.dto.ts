// import Dragon from '../dragon';
import { REFRESH_RATE, SECONDS } from '../generation.constant';

const refreshRate = REFRESH_RATE * SECONDS;

export class CreateGenerationDto {
  generationId: number;
  // accountIds: Set<number>;

  get expiration(): Date {
    const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2));

    const msUntilExpiration =
      Math.random() < 0.5
        ? refreshRate - expirationPeriod
        : refreshRate + expirationPeriod;

    return new Date(Date.now() + msUntilExpiration);
  }

  // newDragon({ accountId }) {
  //   if (Date.now().valueOf() > this.expiration.valueOf())
  //     throw new Error(`This generation expired on ${this.expiration}`);

  //   if (this.accountIds.has(accountId))
  //     throw new Error('You already have dragon from this generation');

  //   this.accountIds.add(accountId);

  //   // return new Dragon({ generationId: this.generationId });
  // }
}
