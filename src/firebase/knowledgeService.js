import { ref, get, onValue, push, set, update, remove } from "firebase/database";
import { db } from "./firebase";

export const subScribleCards = (setCards, setLoading) => {
    const newCardRef = ref(db, "cards");
    const unsbscribe = onValue(newCardRef, (snapshot) => {
        if (!snapshot.exists()) {
            setCards([]);
            setLoading(false);
            return;
        }
        const data = snapshot.val();
        const cardArray = Object.keys(data).map((id) => ({
            id,
            ...data[id]
        }));
        setCards(cardArray);
        setLoading(false);
    });
    return unsbscribe;
}

export const fetchCardOnce = async () => {
    const newCardRef = ref(db, "cards");
    const snapshot = await get(newCardRef);
    if (!snapshot.exists()) return [];
    const data = snapshot.val();
    return Object.keys(data).map((id) => ({
        id,
        ...data[id]
    }));
}

export const createCard = async (cardData, user) => {
  try {
    if (!user?.uid) {
      throw new Error("User not authenticated");
    }
    const newCardRef = push(ref(db, "cards"));
    const newCard = {
      id: newCardRef.key,
      ...cardData,
      authorId: user.uid,
      authorEmail: user.email || "",
      authorName: user.displayName || "Anonymous",
      status: cardData.status || "not-complete",
      likes: [],
      bookmarkStatus: cardData.bookmarkStatus || "not-bookmarked",
      views: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await set(newCardRef, newCard);
    return { success: true, data: newCard };
  } catch (error) {
    console.error("Error creating card:", error);
    return { success: false, error: error.message };
  }
};

export const editNewCard = async(cardId, data)=>{
    const cleanData = Object.fromEntries(
        Object.entries({
            ...data,
            updatedAt: Date.now()
        }).filter(([_, value])=> value !== undefined)
    );
    await update (ref(db, `cards/${cardId}`), cleanData)
}
export const publishedCard = async (cardId) => {
    await update(ref(db, `cards/${cardId}`), {
        status: "complete",
        completedAt: Date.now(),
    });
}
export const bookmarked = async (cardId, status = "bookmarked") => {
    await update(ref(db, `cards/${cardId}`), {
        bookmarkStatus: status
    });
}

export const deleteCard = async(id)=>{
    await remove (ref(db, `cards/${id}`));
}

export const toggleLike = async (cardId, userId, currentLikes = []) => {
    const likes = Array.isArray(currentLikes) ? currentLikes : [];

    const updatedLikes = likes.includes(userId)
        ? likes.filter((id) => id !== userId)
        : [...likes, userId];

    await update(ref(db, `cards/${cardId}`), {
        likes: updatedLikes,
    });
};
