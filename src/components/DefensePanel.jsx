import React, { useState } from 'react';

/**
 * Панель із відповідями на запитання для усного захисту практичної роботи
 */
function DefensePanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="defense-panel" id="defense-section" aria-labelledby="defense-title">
      <div 
        className="defense-panel-header" 
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
      >
        <div className="defense-panel-title" id="defense-title">
          <span>🎓</span>
          <span>Питання та відповіді для усного захисту роботи (Пункт 5)</span>
        </div>
        <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>▼</span>
      </div>

      {isOpen && (
        <div className="defense-content">
          <div className="qa-card">
            <h4 className="qa-question">
              <span className="q-num">1.</span>
              <span>Чому ви створили один компонент CourseCard, а не три окремі компоненти?</span>
            </h4>
            <p className="qa-answer">
              <strong>Відповідь:</strong> Ми створили один компонент <code>CourseCard</code> за принципом <strong>DRY (Don't Repeat Yourself)</strong> та концепцією повторного використання компонентів (<em>reusability</em>). Всі три картки мають ідентичну структуру (DOM-розмітку), логіку та стилі, відрізняючись лише переданими даними. Створення трьох окремих компонентів призвело б до трикратного дублювання коду, ускладнило підтримку (будь-яку зміну в дизайні довелося б повторювати тричі) та масштабування.
            </p>
          </div>

          <div className="qa-card">
            <h4 className="qa-question">
              <span className="q-num">2.</span>
              <span>Як дані потрапляють із компонента App до CourseCard?</span>
            </h4>
            <p className="qa-answer">
              <strong>Відповідь:</strong> Дані передаються зверху вниз завдяки <strong>односпрямованому потоку даних (Unidirectional Data Flow)</strong> у React через <strong>властивості (props)</strong>. Батьківський компонент <code>App</code> зберігає масив об'єктів курсів та ітерує його методом <code>.map()</code>, передаючи кожному екземпляру <code>CourseCard</code> атрибути: <code>title</code>, <code>instructor</code>, <code>duration</code>, <code>isAvailable</code> тощо (або розгортанням об'єкта <code>{...course}</code>). Усередині <code>CourseCard</code> ці параметри приймаються як аргумент функції (деструктуризуються з <code>props</code>) і рендеряться в JSX.
            </p>
          </div>

          <div className="qa-card">
            <h4 className="qa-question">
              <span className="q-num">3.</span>
              <span>Що потрібно змінити, щоб додати четвертий навчальний курс?</span>
            </h4>
            <p className="qa-answer">
              <strong>Відповідь:</strong> Оскільки рендеринг реалізовано декларативно через метод <code>courses.map()</code>, структуру коду чи компонент <code>CourseCard</code> змінювати взагалі <strong>не потрібно</strong>. Достатньо лише додати новий об'єкт із полями (назва, викладач, тривалість, статус) до масиву курсів у стані <code>courses</code> (наприклад, через форму на екрані або безпосередньо в масив <code>INITIAL_COURSES</code>). Завдяки реактивності React новий курс автоматично з'явиться на екрані.
            </p>
          </div>

          <div className="qa-card" style={{ borderColor: 'rgba(99, 102, 241, 0.3)', background: 'rgba(99, 102, 241, 0.08)' }}>
            <h4 className="qa-question">
              <span className="q-num">⭐</span>
              <span>Індивідуальне завдання та передача функцій через props (Callback Props):</span>
            </h4>
            <p className="qa-answer">
              Для демонстрації поглибленого володіння React реалізовано інтерактивний запис на курс. Батьківський компонент <code>App</code> передає функцію <code>onToggleEnroll</code> як prop дочірньому <code>CourseCard</code>. При натисканні на кнопку дочірній компонент викликає цю функцію, передаючи свій <code>id</code>, що дозволяє безпечно модифікувати стан у батьківському компоненті, дотримуючись принципу чистоти дочірніх компонентів.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default DefensePanel;
