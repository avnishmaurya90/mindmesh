import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import KnowledgeCard from "../components/KnowledgeCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCard } from "../context/CardContext";
import { useEffect, useMemo } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { cards, RemoveCard, loading, fetchCard, publish, bookmark } = useCard();
  useEffect(() => {
   
  }, []);
  const visibleCards = cards.filter(
    (card)=>  card.authorId === currentUser?.uid
  )
 
    const status = useMemo(() => {
        const myCards = cards.filter(b => b.authorId === currentUser?.uid)
        return {
            total: myCards.length,
            published: myCards.filter(b => b.status === 'complete').length,
            bookmarked: myCards.filter(b => b.bookmarkStatus === 'bookmarked').length,
            draft: myCards.filter(b => b.status === 'draft').length,
        }
    }, [cards, currentUser])
    const totalLikes = cards.reduce(
        (sum, card) => sum + (card.likes?.length || 0),
        0
    );
 
     if (loading) return <p>Loading...</p>;

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />
        <div className="content">
          <div className="page-header">
            <h2>Dashboard</h2>
            <button className="primary-btn" onClick={() => navigate('/create')}>+ Create Card</button>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{status.total}</h3>
              <p>Total Cards</p>
            </div>
            <div className="stat-card">
              <h3>{status.published}</h3>
              <p>Completed</p>
            </div>
            <div className="stat-card">
              <h3>{Math.round((status.published / (status.total || 1)) * 100)}%</h3>
              <p>Progress</p>
            </div>
            <div className="stat-card">
              <h3>{status.bookmarked}</h3>
              <p>Bookmarks</p>
            </div>
          </div>

          <div className="cards-grid">
            {visibleCards.map((card) => (
              <KnowledgeCard key={card.id} card={card} onDelete={() => RemoveCard(card.id)} publishCard={() => publish(card.id)} bookmarkCard={() => bookmark(card.id, card.bookmarkStatus)} />
            ) || [])}    
          </div>

        </div>
      </div>
    </div>
  );
}
