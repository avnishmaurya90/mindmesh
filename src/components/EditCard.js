import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCard } from "../context/CardContext";

export default function EditCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateCard, cards, loading } = useCard()
  const { currentUser } = useAuth()
  const [form, setForm] = useState({
    title: '',
    content: '',
    tags: '',
    category: '',
    status: ''
  });
  const card = cards.find(c => c.id === id);
 
  useEffect(() => {
    if (!card) {
      return
    }
    if (card.authorId !== currentUser.uid) {
      alert("You are not allowed to edit this blog");
      navigate("/");
      return
    }
    setForm({
      title: card.title,
      content: card.content,
      tags: card.tags,
      category: card.category,
      status: card.status
    })
  }, [card, currentUser, navigate]);

  const handleCardUpdate = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.content) {
      alert("All fields are required");
      return;
    }
    await updateCard(card.id, {
      title: form.title,
      content: form.content,
      tags: form.tags,
      category: form.category,
      status: form.status
    });
    navigate("/");

  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <div className="page-header">
            <h2>Edit Knowledge Card</h2>
          </div>

          <form className="form-card edit-form" onSubmit={handleCardUpdate}>
            <div className="form-group">
              <label htmlFor="">Title</label>
              <input
                type="text"
                className="input"
                name="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Content</label>
              <textarea
                className="textarea large-textarea"
                name="content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows="2"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="">Tags</label>
                <input
                  type="text"
                  className="input"
                  value={form.tags}
                  name="tags"
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="">Category</label>
              <select className="input" value={form.category} name="category" onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="">select</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="">Status</label>
              <select className="input" value={form.status} name="status" onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="">select</option>
                <option value="complete">Complete</option>
                <option value="not-complete">Not Complete</option>
              </select>
            </div>

            <div className="form-footer">
              <button className="secondary-btn">Cancel</button>
              <button className="primary-btn">Update Card</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
