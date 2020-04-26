import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store/reducers';
import { fetchAccountDragons } from 'store/userAccount/actions';
import { getPublicDragonsAction } from 'store/dragon/actions';
import PublicDragonRow from './PublicDragonRow';

const PublicDragons: FC = () => {
  const dispatch = useDispatch();
  const { publicDragons } = useSelector(({ dragon }: RootState) => dragon);

  useEffect(() => {
    dispatch(getPublicDragonsAction());
    dispatch(fetchAccountDragons());
  }, []);

  return (
    <>
      <h3>Public Dragons</h3>
      {publicDragons.map(dragon => (
        <div key={dragon.dragonId}>
          <PublicDragonRow {...dragon} />
          <hr />
        </div>
      ))}
    </>
  );
};

export default PublicDragons;
