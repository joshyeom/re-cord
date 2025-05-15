import { useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [memos, setMemos] = useState<{ title: string; content: string; date: string }[]>([])

  const handleSave = () => {
    if (!title && !content) return
    setMemos([
      { title, content, date: new Date().toLocaleString() },
      ...memos,
    ])
    setTitle('')
    setContent('')
  }

  return (
    <div className="memo-app-container">
      <h1>아이디어 & 감정 메모</h1>
      <div className="memo-input-box">
        <input
          type="text"
          placeholder="제목 (선택)"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="순간의 아이디어나 감정을 적어보세요"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={4}
        />
        <button onClick={handleSave}>저장</button>
      </div>
      <div className="memo-list">
        {memos.length === 0 && <p>아직 메모가 없습니다.</p>}
        {memos.map((memo, idx) => (
          <div key={idx} className="memo-item">
            <div className="memo-header">
              <strong>{memo.title || '제목 없음'}</strong>
              <span className="memo-date">{memo.date}</span>
            </div>
            <div className="memo-content">{memo.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
