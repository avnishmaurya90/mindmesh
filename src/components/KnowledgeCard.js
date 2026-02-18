import { useNavigate } from "react-router-dom";
import { calculateReadTime } from "../utils/calculateReadTime";

export default function KnowledgeCard({ card, publishCard, bookmarkCard }) {
  const readTime = calculateReadTime(card.content);
  const navigate = useNavigate();
  return (
    <div className="knowledge-card">
      <div className="card-header">
        <span className="tag">{card.tags}</span>
        <span className="difficulty">{card.category}</span>
      </div>

      <h3 className="card-title">{card.title}</h3>

      <div className="card-desc">
        {
          (() => {
            const paragraphs = card.content
              .split(/\n{2,}|\r?\n/)
              .filter(paragraph => paragraph.trim() !== "");
            return paragraphs.length > 0 ? <p>{paragraphs[0]}</p> : null;
          })()
        }
      </div>

      <div className="card-footer">
        <span>{readTime} min read</span>
        <div className="card-actions">
          <button onClick={() => bookmarkCard(card.id, card.bookmarkStatus)} className={card.bookmarkStatus === "bookmarked" ? 'active' : ''}>
            Bookmark
          </button>
          <button onClick={() => card.status === "complete" ? null : publishCard(card.id)} className={card.status === "complete" ? 'active' : ''}>Complete</button>
          <button
            onClick={() => navigate(`/card/${card.id}`)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
