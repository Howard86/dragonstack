import React, { FC } from 'react';
import {
  skinny,
  slender,
  sporty,
  stocky,
  patchy,
  plain,
  spotted,
  striped,
} from 'assets';

const propertyMap = {
  backgroundColor: {
    black: '#263238',
    white: '#cfd8dc',
    green: '#a5d6a7',
    blue: '#0277bd',
  },
  build: {
    slender,
    stocky,
    sporty,
    skinny,
  },
  pattern: {
    plain,
    striped,
    spotted,
    patchy,
  },
  size: {
    small: 100,
    medium: 140,
    large: 180,
    enormous: 220,
  },
};

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

const DragonImage: FC<Dragon> = dragon => {
  const dragonPropertyMap = {
    backgroundColor: '#263238',
    build: slender,
    pattern: plain,
    size: 100,
  };
  const currentTraits = dragon.traits;
  if (currentTraits) {
    currentTraits.forEach(trait => {
      const { traitType, traitValue } = trait;

      if (
        hasKey(propertyMap, traitType) &&
        hasKey(propertyMap[traitType], traitValue)
      )
        dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
    });
  }

  const { backgroundColor, build, pattern, size } = dragonPropertyMap;
  const sizing = { width: size, height: size };

  return (
    <div className='dragon-avatar-image-wrapper'>
      <div
        className='dragon-avatar-image-background'
        style={{
          backgroundColor,
          ...sizing,
        }}
      />
      <img
        src={pattern}
        className='dragon-avatar-image-pattern'
        style={{ ...sizing }}
      />
      <img src={build} className='dragon-avatar-image' style={{ ...sizing }} />
    </div>
  );
};

export default DragonImage;
