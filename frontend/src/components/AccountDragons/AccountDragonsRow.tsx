import React, { FormEvent, useState, FC } from 'react';
import DragonAvatar from 'components/Dragon/DragonAvatar';
import { Button } from 'react-bootstrap';
import { updateDragon } from 'api/dragon';

const AccountDragonRow: FC<Dragon> = (dragon: Dragon) => {
  const {
    dragonId,
    nickname: initNickname,
    isPublic: initIsPublic,
    saleValue: initSaleValue,
    sireValue: initSireValue,
  } = dragon;

  const [nickname, setNickname] = useState(initNickname);
  const [isPublic, setIsPublic] = useState(initIsPublic);
  const [saleValue, setSaleValue] = useState(initSaleValue);
  const [sireValue, setSireValue] = useState(initSireValue);
  const [isEditing, setIsEditing] = useState(false);

  const updateNickname = (event: FormEvent<HTMLInputElement>) =>
    setNickname(event.currentTarget.value);
  const updateSaleValue = (event: FormEvent<HTMLInputElement>) =>
    setSaleValue(event.currentTarget.valueAsNumber);
  const updateSireValue = (event: FormEvent<HTMLInputElement>) =>
    setSireValue(event.currentTarget.valueAsNumber);
  const updateIsPublic = (event: FormEvent<HTMLInputElement>) =>
    setIsPublic(event.currentTarget.checked);

  const toggleEdit = () => setIsEditing(!isEditing);

  const save = async () => {
    try {
      const response = await updateDragon({
        dragonId,
        nickname,
        saleValue,
        sireValue,
        isPublic,
      });

      toggleEdit();
    } catch (error) {
      alert(error.message);
    }
  };

  const cancel = () => {
    setIsEditing(!isEditing);
    setNickname(initNickname);
    setSaleValue(initSaleValue);
    setSireValue(initSireValue);
  };

  const SaveButton = () => (
    <div>
      <Button className='button-padding' onClick={save}>
        Save
      </Button>
      <Button className='button-padding' onClick={cancel}>
        Cancel
      </Button>
    </div>
  );

  const EditButton = () => (
    <Button className='button-padding' onClick={toggleEdit}>
      Edit
    </Button>
  );

  return (
    <>
      {/* <div>{dragon.nickname}</div> */}
      <input
        type='text'
        value={nickname}
        onChange={updateNickname}
        disabled={!isEditing}
        style={{ backgroundColor: !isEditing ? 'silver' : '' }}
      />
      <div>
        <span>
          <span>Sale Value: </span>
          <input
            type='number'
            disabled={!isEditing}
            value={saleValue}
            onChange={updateSaleValue}
            className='account-dragon-row-input'
          />
          <br />
          <span>Sire Value: </span>
          <input
            type='number'
            disabled={!isEditing}
            value={sireValue}
            onChange={updateSireValue}
            className='account-dragon-row-input'
          />
        </span>
        <br />
        <text>Public </text>
        <input
          type='checkbox'
          disabled={!isEditing}
          checked={isPublic}
          onChange={updateIsPublic}
        />
        <br />
        {isEditing ? <SaveButton /> : <EditButton />}
        <DragonAvatar {...dragon} />
      </div>
      <br />
    </>
  );
};

export default AccountDragonRow;
