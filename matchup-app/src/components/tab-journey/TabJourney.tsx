import React, { useState, useEffect } from 'react';

export function TabJourney() {
  const [cards, setCards] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      cleanupDragEvents();
    };
  }, []);

  const cleanupDragEvents = () => {
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach((cardElement) => {
      cardElement.removeEventListener('dragstart', handleDragStart);
    });

    const containerElement = document.querySelector('.card-container');
    containerElement?.removeEventListener('dragover', handleDragOver);
    containerElement?.removeEventListener('drop', handleDrop);
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
      {renderCards()}
    </div>
  );
};
