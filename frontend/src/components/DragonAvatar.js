import React, { Component } from 'react';
import {
  skinny,
  slender,
  sporty,
  stocky,
  patchy,
  plain,
  spotted,
  striped,
} from '../assets';

import { Badge, Card, Container } from 'react-bootstrap';

const propertyMap = {
  backgroundColor: {
    black: '#263238',
    white: '#cfd8dc',
    green: '#a5d6a7',
    blue: '#0277bd',
  },
  build: { slender, stocky, sporty, skinny },
  pattern: { plain, striped, spotted, patchy },
  size: { small: 100, medium: 140, large: 180, enormous: 220 },
};

class DragonAvatar extends Component {
  constructor(props) {
    super(props);

    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
  }

  // Get unique key for component
  getKey() {
    return this.keyCount++;
  }

  get DragonImage() {
    const dragonPropertyMap = {};

    const currentTraits = this.props.dragon.traits;
    if (currentTraits) {
      currentTraits.forEach(trait => {
        const { traitType, traitValue } = trait;

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
        ></div>
        <img
          src={pattern}
          className='dragon-avatar-image-pattern'
          style={{ ...sizing }}
        />
        <img
          src={build}
          className='dragon-avatar-image'
          style={{ ...sizing }}
        />
      </div>
    );
  }

  render() {
    const { generationId, dragonId, traits } = this.props.dragon;

    if (!dragonId) return <div></div>;

    return (
      <Card style={{ width: '50vw', margin: 'auto' }}>
        <Card.Header>
          <Badge variant='primary'>G{generationId}</Badge>
          <span> - </span>
          <Badge variant='success'>I{dragonId}</Badge>
        </Card.Header>
        <Card.Body>
          {this.DragonImage}
          <Card.Text>
            {traits &&
              traits.map(trait => (
                <Badge
                  variant='light'
                  style={{ margin: '5px' }}
                  key={this.getKey()}
                >
                  {trait.traitValue}
                </Badge>
              ))}
          </Card.Text>
          {/* <div className='container'>
            <div className='row justify-content-sm-center'></div>
          </div> */}
        </Card.Body>
      </Card>
    );
  }
}

export default DragonAvatar;
