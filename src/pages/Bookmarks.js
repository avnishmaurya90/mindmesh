import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import KnowledgeCard from "../components/KnowledgeCard";
import { useAuth } from "../context/AuthContext";
import { useCard } from "../context/CardContext";

export default function Bookmarks() {
  const { cards, bookmark } = useCard();
  const bookmarkedCards = cards.filter(card => card.bookmarkStatus === "bookmarked");

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />
        {bookmarkedCards.length === 0 ? (
          <p>No bookmarked cards found....</p>
        ) : null}
        {bookmarkedCards.length > 0 &&
          <div className="content">
            <h2>Bookmarked Cards</h2>
            <div className="cards-grid">
              {bookmarkedCards.map(card => (
                <KnowledgeCard key={card.id} card={card} bookmarkCard={() => bookmark(card.id, card.bookmarkStatus)} />
              ))}
            </div>
          </div>
        }

      </div>
    </div>
  );
}
