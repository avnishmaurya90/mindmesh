
import { useNavigate, useParams } from "react-router-dom";
import { useCard } from "../context/CardContext";
import Sidebar from "./Sidebar";

export default function ViewCard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cards, loading, RemoveCard } = useCard();
    const card = cards.find(c => c.id === id);

    if (loading) {
        return (
            <div className="layout">
                <Sidebar />
                <div className="main"><div className="content"><p>Loading...</p></div></div>
            </div>
        );
    }

    if (!card) {
        return (
            <div className="layout">
                <Sidebar />
                <div className="main"><div className="content"><h2>Card Not Found</h2></div></div>
            </div>
        );
    }
const removeCard = ()=>{
    RemoveCard(card.id);
    navigate('/')
}
function getDaysAgo(date) {
  if (!date) return "";
  const now = new Date();
  const updated = new Date(date);
  const diffTime = now - updated;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Updated today";
  if (diffDays === 1) return "Updated 1 day ago";
  return `Updated ${diffDays} days ago`;
}
    return (
        <div className="layout">
            <Sidebar />
            <div className="main">
                <div className="content view-card">
                    <div className="page-header">
                        <h2>Knowledge Cards</h2>
                        <button className="primary-btn" onClick={() => navigate('/create')}>+ Add Card</button>
                    </div>

                    <div className="cards-grid">
                        <div className="knowledge-card">
                            <div className="card-header">
                                <span className="tag">{card.tags}</span>
                                <span className="difficulty">{card.category}</span>
                            </div>
                            <h3 className="card-title">{card.title}</h3>
                            <p className="card-desc">{card.content}</p>
                            <div className="card-footer">
                                <span>{getDaysAgo(card.updatedAt)}</span>
                                <div className="card-actions">
                                    <button onClick={() => navigate(`/edit/${card.id}`)} className="active">
                                        Edit
                                    </button>
                                    <button className="active" onClick={removeCard}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}