import React, { useState } from 'react';

function AddCourseModal({ isOpen, onClose, onAddCourse }) {
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [duration, setDuration] = useState('6 тижнів (36 годин)');
  const [isAvailable, setIsAvailable] = useState(true);
  const [level, setLevel] = useState('Початковий');
  const [icon, setIcon] = useState('💻');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !instructor.trim()) {
      alert('Будь ласка, заповніть назву курсу та ім\'я викладача!');
      return;
    }

    onAddCourse({
      id: Date.now(),
      title: title.trim(),
      instructor: instructor.trim(),
      duration: duration.trim(),
      isAvailable: Boolean(isAvailable),
      isEnrolled: false,
      level,
      icon,
      description: description.trim() || 'Практичний курс із сучасних технологій розробки.'
    });

    // Reset & Close
    setTitle('');
    setInstructor('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Додати новий навчальний курс</h3>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Закрити модальне вікно">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="modal-title">Назва курсу *</label>
            <input
              id="modal-title"
              className="form-input"
              type="text"
              placeholder="наприклад, Розробка на Next.js та TypeScript"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="modal-instructor">Викладач *</label>
            <input
              id="modal-instructor"
              className="form-input"
              type="text"
              placeholder="наприклад, проф. Коваленко О. І."
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="modal-duration">Тривалість курсу</label>
            <input
              id="modal-duration"
              className="form-input"
              type="text"
              placeholder="наприклад, 10 тижнів (60 годин)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="modal-level">Рівень</label>
              <select
                id="modal-level"
                className="form-select"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="Початковий">Початковий</option>
                <option value="Середній">Середній</option>
                <option value="Просунутий">Просунутий</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="modal-icon">Іконка</label>
              <select
                id="modal-icon"
                className="form-select"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              >
                <option value="💻">💻 Ноутбук</option>
                <option value="⚛️">⚛️ React</option>
                <option value="🎨">🎨 Дизайн</option>
                <option value="🐍">🐍 Python</option>
                <option value="☁️">☁️ Хмара</option>
                <option value="📱">📱 Mobile</option>
                <option value="🔐">🔐 Кібербезпека</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="modal-available">Доступність запису</label>
            <select
              id="modal-available"
              className="form-select"
              value={isAvailable ? 'true' : 'false'}
              onChange={(e) => setIsAvailable(e.target.value === 'true')}
            >
              <option value="true">Запис відкритий (Є вільні місця)</option>
              <option value="false">Запис закрито (Набір завершено)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="modal-desc">Короткий опис</label>
            <input
              id="modal-desc"
              className="form-input"
              type="text"
              placeholder="Короткий зміст курсу..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Скасувати
            </button>
            <button type="submit" className="add-course-btn" id="modal-submit-btn">
              ✓ Додати курс
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourseModal;
