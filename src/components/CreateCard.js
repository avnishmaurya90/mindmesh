import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useCard } from "../context/CardContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCard() {
  const { addCard } = useCard();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: '',
    tags: '',
    category: ''
  });
  const cardSubmit = async (e) => {
      e.preventDefault();
    await addCard({
      ...form    
    });
    navigate('/')
    setForm({
      title: '',
      content: '',
      tags: '',
      category: ''
    })
  }


  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />

        <div className="content">
          <h2>Create Knowledge Card11</h2>

          <form className="form-card" onSubmit={cardSubmit}>
            <input type="text" placeholder="Title" name="title" className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}  required/>
            <textarea placeholder="Write your content..." name="content" value={form.content} className="textarea" onChange={(e) => setForm({ ...form, content: e.target.value })} required/>
            <input type="text" placeholder="Tags (comma separated)" name="tags" value={form.tags} className="input" onChange={(e) => setForm({ ...form, tags: e.target.value })} required/>
            <select className="input" name="category" value={form.value} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="">Select</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <button className="primary-btn">Save Card</button>
          </form>
        </div>
      </div>
    </div>
  );
}
