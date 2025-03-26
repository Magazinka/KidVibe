import React, { useEffect, useState } from 'react';
import './footer.css';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      // Показываем футер, если пользователь прокрутил страницу до конца
      setIsVisible(scrollTop + windowHeight >= documentHeight - 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className={isVisible ? 'visible' : ''}>
      <p>© 2025 KidVibe. Все права защищены.</p>
      <p>
        <a href="mailto:kidvibe@elbrus.com">kidvibe@elbrus.com</a> | <a href="tel:+79992087573">+7 (999) 208-75-73</a>
      </p>
    </footer>
  );
}

export default Footer;
