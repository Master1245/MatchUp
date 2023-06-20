import React, { useState, useEffect } from 'react';

export function TabJourney() {
  const [cards, setCards] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      cleanupDragEvents();
    };
  }, []);

  const cleanupDragEvents = () => {
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const cardIndex = Number(event.currentTarget.dataset.index);
    event.dataTransfer?.setData('text/plain', cardIndex.toString());
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const cardIndex = Number(event.dataTransfer?.getData('text/plain'));
    if (cardIndex !== undefined) {
      const updatedCards = [...cards];
      const [draggedCard] = updatedCards.splice(cardIndex, 1);
      updatedCards.push(draggedCard);
      setCards(updatedCards);
    }
  };

  const renderCards = () => {
    return cards.map((card, index) => (
      <div
        key={index}
        data-index={index}
        draggable
        onDragStart={handleDragStart}
        className="card"
      >
        {card}
      </div>
    ));
  };

  return (
    <div className="card-container" onDragOver={handleDragOver} onDrop={handleDrop}>
      {/* {renderCards()}

      <div class="cloud-container" style="height: 500px">
        <div class="fade-deny"></div>
        <div class="fade-allow"></div>
        <div class="fade-like"></div>

        <div class="card-box">
          <div class="card draggable" value="">
            <div class="moldure">
              <p class="status"></p>
              <p class="name"></p>
            </div>
          </div>
          <div class="next"></div>
          <div class="option-box">
            <div class="option">
              <button class="dislike">
                NF
              </button>
            </div>
            <div class="option">
              <button class="super-like">
                ++
              </button>
            </div>
            <div class="option">
              <button class="like">
                S2
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
