import React, { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { getAccountDragonsAction } from 'store/userAccount/actions';
import AccountDragonRow from './AccountDragonsRow';

const AccountDragons: FC<[Dragon]> = dragons => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccountDragonsAction());
  }, [dispatch]);

  return (
    <>
      <h3>Account Dragons</h3>
      {dragons.map(dragon => (
        <div key={dragon.dragonId}>
          <AccountDragonRow {...dragon} />
          <hr />
        </div>
      ))}
    </>
  );
};

export default AccountDragons;
