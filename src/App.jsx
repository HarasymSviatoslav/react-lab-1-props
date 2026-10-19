import React, { useState } from 'react';
import CourseCard from './components/CourseCard';
import AddCourseModal from './components/AddCourseModal';
import DefensePanel from './components/DefensePanel';

// Початкові три навчальні курси відповідно до завдання
const INITIAL_COURSES = [
  {
    id: 1,
    title: 'Сучасний Frontend: React 19 та JavaScript',
    instructor: 'Олексій Сидоренко',
    duration: '10 тижнів (60 годин)',
    isAvailable: true,
    isEnrolled: false,
    level: 'Середній',
    icon: '⚛️',
    description: 'Глибоке вивчення компонентного підходу, React Props, хуків стану та побудови сучасних SPA-застосунків.'
  },
  {
    id: 2,
    title: 'Backend розробка на Node.js та Express',
    instructor: 'Марина Мельник',
    duration: '8 тижнів (48 годин)',
    isAvailable: true,
    isEnrolled: false,
    level: 'Просунутий',
    icon: '🚀',
    description: 'Створення надійних REST API, робота з базами даних PostgreSQL та MongoDB, авторизація через JWT.'
  },
  {
    id: 3,
    title: 'Основи UI/UX дизайну та прототипування',
    instructor: 'Денис Кравченко',
    duration: '6 тижнів (36 годин)',
    isAvailable: false,
    isEnrolled: false,
    level: 'Початковий',
    icon: '🎨',
    description: 'Створення дизайн-систем, інтерактивних прототипів у Figma, юзабіліті-тестування та дослідження аудиторії.'
  }
];

function App() {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [filter, setFilter] = useState('all'); // 'all' | 'available' | 'closed'
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Обробник запису/скасування запису на курс (передається як callback prop)
  const handleToggleEnroll = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === courseId) {
          const nextEnrolled = !course.isEnrolled;
          return {
            ...course,
            isEnrolled: nextEnrolled,
            // Якщо студент скасував запис або записався, оновлюємо статус
            isAvailable: nextEnrolled ? course.isAvailable : true
          };
        }
        return course;
      })
    );
  };

  // Додавання нового курсу (демонстрація пункту 5.3)
  const handleAddCourse = (newCourse) => {
    setCourses((prevCourses) => [newCourse, ...prevCourses]);
  };

  // Видалення курсу
  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей курс?')) {
      setCourses((prevCourses) => prevCourses.filter((c) => c.id !== courseId));
    }
  };

  // Скидання курсів до початкових трьох
  const handleResetCourses = () => {
    setCourses(INITIAL_COURSES);
    setSearchQuery('');
    setFilter('all');
  };

  // Фільтрація списку курсів
  const filteredCourses = courses.filter((course) => {
    // Фільтр за доступністю
    if (filter === 'available' && !course.isAvailable && !course.isEnrolled) return false;
    if (filter === 'closed' && (course.isAvailable || course.isEnrolled)) return false;

    // Фільтр за пошуковим запитом (назва або викладач)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = course.title.toLowerCase().includes(query);
      const matchInstructor = course.instructor.toLowerCase().includes(query);
      return matchTitle || matchInstructor;
    }

    return true;
  });

  return (
    <div className="container">
      {/* Шапка застосунку */}
      <header className="app-header">
        <div className="lab-badge">
          <span className="dot"></span>
          Практична робота: Компоненти та властивості (props)
        </div>
        <h1 className="main-title">Конструктор карток курсів</h1>
        <p className="subtitle">
          Демонстрація передачі даних через <code>props</code>, односпрямованого потоку даних та повторного використання компонента <code>CourseCard</code>.
        </p>
      </header>

      {/* Панель керування: пошук, фільтри, кнопки дій */}
      <section className="controls-card" aria-label="Панель фільтрації та дій">
        <div className="search-box">
          <span className="search-icon" role="img" aria-label="search">🔍</span>
          <input
            id="course-search-input"
            type="text"
            className="search-input"
            placeholder="Пошук за назвою або викладачем..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <button
            type="button"
            id="filter-all"
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Всі курси ({courses.length})
          </button>
          <button
            type="button"
            id="filter-available"
            className={`filter-btn ${filter === 'available' ? 'active' : ''}`}
            onClick={() => setFilter('available')}
          >
            Запис відкритий ({courses.filter(c => c.isAvailable || c.isEnrolled).length})
          </button>
          <button
            type="button"
            id="filter-closed"
            className={`filter-btn ${filter === 'closed' ? 'active' : ''}`}
            onClick={() => setFilter('closed')}
          >
            Запис закрито ({courses.filter(c => !c.isAvailable && !c.isEnrolled).length})
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            id="add-course-btn"
            className="add-course-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <span>+</span> Додати курс
          </button>

          <button
            type="button"
            id="reset-courses-btn"
            className="btn-secondary"
            onClick={handleResetCourses}
            title="Відновити початкові три картки"
          >
            ↺ Скинути
          </button>
        </div>
      </section>

      {/* Рядок статистики */}
      <div className="stats-ribbon">
        <span className="stats-count">
          Відображено карток: <strong>{filteredCourses.length}</strong> з <strong>{courses.length}</strong>
        </span>
        <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Курс: 3 | Макс. оцінка: 12 балів
        </span>
      </div>

      {/* Сітка карток: використання компонента CourseCard з передачею props */}
      <main className="course-grid" id="courses-grid" aria-label="Список карток навчальних курсів">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              instructor={course.instructor}
              duration={course.duration}
              isAvailable={course.isAvailable}
              isEnrolled={course.isEnrolled}
              level={course.level}
              icon={course.icon}
              description={course.description}
              onToggleEnroll={handleToggleEnroll}
              onDelete={courses.length > 1 ? handleDeleteCourse : undefined}
            />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔎</div>
            <h3>Курсів не знайдено</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              Спробуйте змінити критерії пошуку або обраний фільтр.
            </p>
          </div>
        )}
      </main>

      {/* Панель усного захисту з готовими відповідями на запитання викладача */}
      <DefensePanel />

      {/* Модальне вікно для додавання нового курсу */}
      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCourse={handleAddCourse}
      />

      {/* Підвал */}
      <footer className="app-footer">
        <p>
          Практична робота: <strong>React. Компоненти та властивості (props)</strong> • 3 Курс
        </p>
      </footer>
    </div>
  );
}

export default App;
