// pages/CardPage.tsx
"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { CardData } from "./interface";
import VideoPlayer from "@/components/youtube-player";
import { Button } from "@/components/ui/button";

// Modal.setAppElement('#root'); // Set the root element for accessibility

const CardPage: React.FC = () => {
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("http://localhost:5000/api/card/")
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data to the state
        setCardData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const openModal = (card: CardData) => {
    setSelectedCard(card);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="flex flex-wrap justify-around">
      {/* display all cards separately */}
      {cardData &&
        cardData.map((card: CardData, i: number) => (
          <div
            key={i}
            className="bg-white  dark:bg-gray-800 shadow-lg rounded-lg  m-4 p-2"
            onClick={() => openModal(card)}
          >
            <div className="py-2 text-center space-x-4">
              <VideoPlayer url={card.videoURL} />
              <Button className="mt-4">Click to Learn More</Button>
            </div>
          </div>
        ))}

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Card Modal"
        ariaHideApp={false}
      >
        {selectedCard && (
          <div className="dark:bg-gray-800 flex flex-col items-center justify-center">
            {/* Display the modal content here, adjust as needed */}
            <VideoPlayer url={selectedCard.videoURL} />
            <br />
            <h2>Transcript</h2>
            <p className="text-foreground">{selectedCard.transcript}</p>
            <br />
            <h2>Time Stamp</h2>
            <p className="text-foreground">{selectedCard.timestamp}</p>
            <br />
            <h2>Summary</h2>
            <p className="text-foreground">{selectedCard.summary}</p>
            <Button onClick={closeModal}>Close</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CardPage;
