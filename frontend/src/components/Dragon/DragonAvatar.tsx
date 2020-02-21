import React, { FC } from 'react';
import { Badge, Card } from 'react-bootstrap';

import DragonImage from './DragonImage';

const DragonAvatar: FC<Dragon> = dragon => {
  // const [keyCount, setKeyCount] = useState(0);
  const { generationId, dragonId, traits } = dragon;

  return (
    <>
      {dragonId ? (
        <Card style={{ width: '50vw', margin: 'auto' }}>
          <Card.Header>
            <Badge variant='primary'>G{generationId}</Badge>
            <span> - </span>
            <Badge variant='success'>I{dragonId}</Badge>
          </Card.Header>
          <Card.Body>
            <DragonImage {...dragon} />
            <Card.Text>
              {traits &&
                traits.map(({ traitValue }, index) => (
                  <Badge
                    variant='light'
                    style={{ margin: '5px' }}
                    key={`${String(traitValue)}-${index}`}
                  >
                    {traitValue}
                  </Badge>
                ))}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : null}
    </>
  );
};

export default DragonAvatar;
