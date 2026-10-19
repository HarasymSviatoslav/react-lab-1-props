import React from 'react';

/**
 * Компонент CourseCard (Картка курсу)
 * Отримує дані через властивості (props) для відображення індивідуального курсу.
 * 
 * @param {Object} props
 * @param {string|number} props.id - Унікальний ідентифікатор курсу
 * @param {string} props.title - Назва курсу
 * @param {string} props.instructor - Ім'я викладача
 * @param {string} props.duration - Тривалість курсу (наприклад, "8 тижнів (48 годин)")
 * @param {boolean} props.isAvailable - Доступність запису на курс
 * @param {boolean} [props.isEnrolled] - Чи записаний поточний студент
 * @param {string} [props.level] - Рівень складності (Початковий, Середній, Просунутий)
 * @param {string} [props.icon] - Іконка курсу
 * @param {string} [props.description] - Короткий опис навчальної програми
 * @param {Function} [props.onToggleEnroll] - Функція зворотного виклику (callback prop) для запису на курс
 * @param {Function} [props.onDelete] - Функція зворотного виклику для видалення курсу
 */
function CourseCard({
  id,
  title,
  instructor,
  duration,
  isAvailable,
  isEnrolled = false,
  level = 'Для всіх рівнів',
  icon = '📚',
  description = 'Практичний курс із розробки та закріплення ключових навичок.',
  onToggleEnroll,
  onDelete
}) {
  // Визначення класу та тексту для бейджа статусу доступності
  const getStatusInfo = () => {
    if (isEnrolled) {
      return {
        className: 'status-badge enrolled',
        label: 'Ви записані'
      };
    }
    if (isAvailable) {
      return {
        className: 'status-badge open',
        label: 'Запис відкритий'
      };
    }
    return {
      className: 'status-badge closed',
      label: 'Запис закрито'
    };
  };

  const status = getStatusInfo();

  return (
    <article className="course-card" id={`course-card-${id}`}>
      {/* Верхня частина картки: іконка та бейдж статусу */}
      <div className="card-top">
        <div className="course-icon-badge" aria-hidden="true">
          {icon}
        </div>
        <span className={status.className}>
          <span className="status-dot"></span>
          {status.label}
        </span>
      </div>

      {/* Основна інформація курсу */}
      <div className="card-content">
        <h3 className="course-title">{title}</h3>
        <p className="course-description">{description}</p>

        {/* Список метаданих (передані через props) */}
        <div className="meta-list">
          <div className="meta-item">
            <span className="meta-label">
              <span role="img" aria-label="instructor">👨‍🏫</span> Викладач:
            </span>
            <span className="meta-value">{instructor}</span>
          </div>

          <div className="meta-item">
            <span className="meta-label">
              <span role="img" aria-label="duration">⏱️</span> Тривалість:
            </span>
            <span className="meta-value">{duration}</span>
          </div>

          <div className="meta-item">
            <span className="meta-label">
              <span role="img" aria-label="level">🎯</span> Рівень:
            </span>
            <span className="meta-value">{level}</span>
          </div>

          <div className="meta-item">
            <span className="meta-label">
              <span role="img" aria-label="status">📋</span> Статус запису:
            </span>
            <span className={`meta-value ${isAvailable ? 'text-success' : 'text-danger'}`} style={{ color: isAvailable ? 'var(--status-open-text)' : 'var(--status-closed-text)' }}>
              {isAvailable ? 'Доступний' : 'Місць немає'}
            </span>
          </div>
        </div>
      </div>

      {/* Нижня панель: дія (Записатися / Скасувати) та видалення */}
      <div className="card-footer">
        {isAvailable || isEnrolled ? (
          <button
            type="button"
            id={`enroll-btn-${id}`}
            className={`btn-action ${isEnrolled ? 'btn-action enrolled' : 'btn-action enroll'}`}
            onClick={() => onToggleEnroll && onToggleEnroll(id)}
            title={isEnrolled ? 'Натисніть, щоб скасувати запис' : 'Натисніть для запису'}
          >
            {isEnrolled ? '✓ Скасувати запис' : 'Записатися на курс'}
          </button>
        ) : (
          <button
            type="button"
            id={`disabled-btn-${id}`}
            className="btn-action disabled"
            disabled
          >
            Реєстрацію завершено
          </button>
        )}

        {/* Кнопка видалення (якщо передано onDelete) */}
        {onDelete && (
          <button
            type="button"
            id={`delete-btn-${id}`}
            className="btn-icon-danger"
            onClick={() => onDelete(id)}
            title="Видалити курс"
            aria-label="Видалити курс"
          >
            🗑️
          </button>
        )}
      </div>
    </article>
  );
}

export default CourseCard;
