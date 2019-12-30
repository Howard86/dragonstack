import uuid from 'uuid/v4';
import { hash } from './helper';

const SEPARATOR = '|';

export default class Session {
  constructor({ username }) {
    this.username = username;
    this.id = uuid();
  }

  toString() {
    const { username, id } = this;

    return Session.sessionString({ username, id });
  }

  static parse(sessionString) {
    const sessionData = sessionString.split(SEPARATOR);

    return {
      username: sessionData[0],
      id: sessionData[1],
      sessionHash: sessionData[2],
    };
  }

  static verify(sessionString) {
    const { username, id, sessionHash } = this.parse(sessionString);

    const accountData = this.accountData({ username, id });

    return hash(accountData) === sessionHash;
  }

  static accountData({ username, id }) {
    return `${username}${SEPARATOR}${id}`;
  }

  static sessionString({ username, id }) {
    const accountData = this.accountData({ username, id });

    return `${accountData}${SEPARATOR}${hash(accountData)}`;
  }
}
