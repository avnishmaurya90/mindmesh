import { Children, createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { createCard, editNewCard, publishedCard, subScribleCards, deleteCard, toggleLike, bookmarked } from "../firebase/knowledgeService";


const CardContext = createContext();
export const CardProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const unsubscribe = subScribleCards((data) => { 
            setCards(data);
        }, (loading) => { 
            setLoading(loading);
        });
        return () => {
            if (typeof unsubscribe === 'function') unsubscribe();
        }
    }, []);
    // fetchCard is not needed, as subScribleCards handles real-time updates
    const fetchCard = () => { };
    const addCard = async (cardData) => {
        await createCard(cardData, currentUser);
    }
    const publish = async (cardId) => {
        await publishedCard(cardId);
    }
    const bookmark = async (cardId, currentStatus) => {
        const newStatus = currentStatus === "bookmarked" ? "not-bookmarked" : "bookmarked";
        await bookmarked(cardId, newStatus);
    }
    const updateCard = async (cardId, updatedData) => {
        await editNewCard(cardId, updatedData)
    }
    const RemoveCard = async (cardId) => {
        await deleteCard(cardId);
    }
    const likeCard = async (card) => {
        if (!currentUser) {
            alert("Please login to like this blog");
            return;
        }
        await toggleLike(card.id, currentUser.uid, card.likes);
    }
    return (
        <CardContext.Provider value={{ cards, fetchCard, addCard, publish, updateCard, RemoveCard, likeCard, bookmark, loading }}>
            {children}
        </CardContext.Provider>
    )
}

export const useCard = () => useContext(CardContext);