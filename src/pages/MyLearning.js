import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import KnowledgeCard from "../components/KnowledgeCard";
import { useAuth } from "../context/AuthContext";
import { useCard } from "../context/CardContext"; 

export default function MyLearning() {
  const { currentUser } = useAuth();
  const {cards, loading, RemoveCard, fetchCard, publish,bookmark} = useCard();
  const visibleCards = cards.filter(
    (card)=>  card.status === "complete" || currentUser?.uid === card.authorId
  )

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />

        <div className="content">
          <h2>My Learning Progress</h2>

          <div className="progress-box">
            <div className="progress-bar"></div>
          </div>

          <div className="cards-grid">
            {visibleCards.map((card) => (
              <KnowledgeCard key={card.id} card={card} publishCard={() => publish(card.id)} bookmarkCard={() => bookmark(card.id, card.bookmarkStatus)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
