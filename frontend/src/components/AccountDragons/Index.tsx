import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountDragonsAction } from 'store/userAccount/actions';
import AccountDragonRow from './AccountDragonsRow';
import { RootState } from '../../store/reducers';

const AccountDragons: FC = () => {
  const { dragons } = useSelector(({ userAccount }: RootState) => userAccount);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccountDragonsAction());
  }, [dispatch]);

  return (
    <>
      <h3>Account Dragons</h3>
      {dragons &&
        dragons.map(dragon => (
          <div key={dragon.dragonId}>
            <AccountDragonRow {...dragon} />
            <hr />
          </div>
        ))}
    </>
  );
};

export default AccountDragons;
