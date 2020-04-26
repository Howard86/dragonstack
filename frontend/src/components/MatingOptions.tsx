import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { mateDragon } from 'store/api';
import { RootState } from 'store/reducers';

const MatingOptions: FC<number> = (patronDragonId: number) => {
  const { dragons } = useSelector(({ userAccount }: RootState) => userAccount);
  return (
    <div>
      <h4>Pick one of your dragons to mate with:</h4>
      {dragons &&
        dragons.map(dragon => {
          const { dragonId, generationId, nickname } = dragon;

          return (
            <span key={dragonId}>
              <Button onClick={() => mateDragon(patronDragonId, dragonId)}>
                G{generationId}
                .I
                {dragonId}. {nickname}
              </Button>
            </span>
          );
        })}
    </div>
  );
};

export default MatingOptions;
