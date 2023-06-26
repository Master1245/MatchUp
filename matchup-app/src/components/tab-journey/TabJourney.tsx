import { useState, useEffect, useRef } from 'react';
import { axiosMatches } from '../../api/requests/match';
import { GenericObject, Render } from './render/Render';
import Draggable, { DraggableData } from 'react-draggable';
import { WordLanguage } from '../language/Language';


export function TabJourney() {
  const [cards, setCards] = useState<JSX.Element[]>([]);

  async function getMatches() {
    try {
      const response = await axiosMatches();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const renderCards = async () => {
    const results = await getMatches()
    const resultsCards = results.map((result: any) => {
      if (result.type == 'comment') {
        var c: GenericObject<'comment'> = {
          id: result.user_id,
          type: result.type,
          specificProperty: {
            name: result.name,
            comment: result.comment
          }
        }
        return <Render data={c} key={result.user_id} id={result.user_id} />
      }
      else if (result.type == 'profile') {
        console.log(result);
        var p: GenericObject<'profile'> = {
          id: result.user_id,
          type: result.type,
          specificProperty: {
            username: result.username ? result.username : undefined,
            bio: result.bio ? result.bio : undefined,
            avatar: result.avatar ? result.avatar : undefined,
            local: result.local ? result.local : undefined,
            social_media: result.social_media ? result.social_media : undefined
          }
        }
        return <Render data={p} key={result.user_id} id={result.user_id} />
      }
    })
    //add final card
    resultsCards.push(
      <div className="card" key={-1} id={'-1'}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <h1>
          <WordLanguage text="Search of more results ..." />
        </h1>
      </div>
    </div>)
    setCards(resultsCards);
  };

  useEffect(() => {
    renderCards();
  }, []);

  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);


  const [timeout, setTimeout] = useState(0);

  const handleDragStop = (data: DraggableData, index: number, direction: string, cardId: number) => {
    if (timeout != 0) {
      return;
    }
    setTimeout(200);
    const cardWidth = cardRef.current?.clientWidth || 0;
    const containerWidth = containerRef.current?.clientWidth || 0;

    const cardPosition = {
      x: data.x,
      y: data.y
    };
    console.log("X["+data.x+"] Y["+data.y+"]");

    const isNearCenter = Math.abs(cardPosition.x - containerWidth / 2) < cardWidth / 2;

    if (isNearCenter) {
      // O card está perto do centro, não faz nada e retorna à posição original
      console.log('Card está perto do centro');
      return;
    }

    const draggableNode = data.node;
    if (direction === 'left') {
      // Card arrastado para a esquerda
      if (data.x < -100) {
        console.log('Card arrastado para a esquerda');
        draggableNode.style.display = 'none';
        setCards(prevCards => prevCards.filter(card => card.props.id-1 !== cardId));
      }
      // Card arrastado para a direita
      if (data.x > 100) {
        console.log('Card arrastado para a direita');
        draggableNode.style.display = 'none';
        setCards(prevCards => prevCards.filter(card => card.props.id-1 !== cardId));
      }
    }
    if (data.y < -100) {
      console.log('Card arrastado para cima');
      draggableNode.style.display = 'none';
      setCards(prevCards => prevCards.filter(card => card.props.id-1 !== cardId));
    }else{
      draggableNode.style.transform = 'none';
      draggableNode.style.transition = 'transform 0.3s ease-out';
    }
    if (draggableNode && draggableNode.style.display === 'none') {
      draggableNode.style.transform = 'none';
      draggableNode.style.transition = 'transform 0.3s ease-out';
    }else{
      draggableNode.style.display = '';
      draggableNode.style.transform = 'none';
    }
    setTimeout(0);
  };

  return (
    <div
      className="card-container"
      style={{
        position: 'relative',
        height: '400px',
        width: '94%',
      }}
    >
      {cards.map((card, index) => (
        <Draggable
          key={index}
          onStop={(e, data) => handleDragStop(data, index, data.deltaX > 0 ? 'right' : 'left', card.props.id)}
          position={undefined}
          scale={1}
          axis="both"
        >
          <div
            className="card"
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              padding: '30px 10px 10px 10px',
              top: 10,
              left: 10,
              right: 10,
              bottom: 10,
              zIndex: cards.length - index,
              width: '96%',
            }}
          >
            {card}
          </div>
        </Draggable>
      ))}
    </div>
  );
};