import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useCard } from "../context/CardContext";

export default function Analytics() {
  const { cards } = useCard();
  function getLearningStreak(cards) {
    const completedDates = cards
      .filter(card => card.completedAt)
      .map(card => new Date(card.completedAt).setHours(0, 0, 0, 0));
    if (completedDates.length === 0) return 0;
    const uniqueDates = Array.from(new Set(completedDates)).sort((a, b) => b - a);
    let streak = 1;
    for (let i = 1; i < uniqueDates.length; i++) {
      if (uniqueDates[i] === uniqueDates[i - 1] - 86400000) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }
  function getAvgReadTime(cards) {
    if (!cards.length) return 0;
    const total = cards.reduce((sum, card) => sum + (card.readTime || 0), 0);
    return Math.round(total / cards.length);
  }
  function getProgressByTag(cards) {
    const tagStats = {};
    cards.forEach(card => {
      const tags = Array.isArray(card.tags) ? card.tags : [card.tags];
      tags.forEach(tag => {
        if (!tag) return;
        if (!tagStats[tag]) tagStats[tag] = { total: 0, completed: 0 };
        tagStats[tag].total++;
        if (card.status === "complete") tagStats[tag].completed++;
      });
    });
    return tagStats;
  }

  function getMostUsedTag(cards) {
    const tagCount = {};
    cards.forEach(card => {
      const tags = Array.isArray(card.tags) ? card.tags : [card.tags];
      tags.forEach(tag => {
        if (tag) {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        }
      });
    });
    return Object.entries(tagCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  }

  const mostUsedTag = getMostUsedTag(cards);
  const learningStreak = getLearningStreak(cards);
  const avgReadTime = getAvgReadTime(cards);
  const progressByTag = getProgressByTag(cards);

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />
        <div className="content">
          <h2>Learning Analytics</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <div className="analytics-title">Most Used Tag</div>
              <div className="analytics-value">{mostUsedTag || "N/A"}</div>
            </div>
            <div className="analytics-card">
              <div className="analytics-title">Learning Streak</div>
              <div className="analytics-value">{learningStreak} {learningStreak === 1 ? "Day" : "Days"}</div>
            </div>
            <div className="analytics-card">
              <div className="analytics-title">Avg Read Time</div>
              <div className="analytics-value">{avgReadTime} mins</div>
            </div>
          </div>
          <div className="analytics-progress">
            <h3>Learning Progress</h3>
            {Object.entries(progressByTag).length === 0 && <div>No progress data available.</div>}
            {Object.entries(progressByTag).map(([tag, stat]) => {
              const percent = stat.total ? Math.round((stat.completed / stat.total) * 100) : 0;
              return (
                <div className="progress-item" key={tag}>
                  <div className="progress-header">
                    <span>{tag}</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
