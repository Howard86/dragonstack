import React, { useState, FC } from 'react';
import { Button } from 'react-bootstrap';

import { buyDragon } from 'api/dragon';
import DragonAvatar from './Dragon/DragonAvatar';
import MatingOptions from './MatingOptions';

const PublicDragonRow: FC<Dragon> = dragon => {
  const [displayMatingOptions, setDisplayMatingOptions] = useState(false);
  const { dragonId, nickname, saleValue, sireValue } = dragon;

  return (
    <>
      <div>{nickname}</div>
      <DragonAvatar {...dragon} />
      <div>
        <span>
          Sale Value:
          {saleValue}
        </span>
        {' | '}
        <span>
          Sire Value:
          {sireValue}
        </span>
      </div>
      <br />
      <Button
        className='button-padding'
        onClick={() => buyDragon(dragonId, saleValue)}
      >
        Buy
      </Button>
      <Button
        className='button-padding'
        onClick={() => setDisplayMatingOptions(!displayMatingOptions)}
      >
        Sire
      </Button>
      {displayMatingOptions && <MatingOptions {...dragonId} />}
    </>
  );
};

export default PublicDragonRow;
