import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/components/NavDropdown.module.scss';

interface NavDropdownProps {
  title: string;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ title, children }) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  return (
    <div
      ref={ref}
      onClick={() => setShow(!show)}
      className={styles.navDropdown}
    >
      <div className={cn('btn', styles.navDropdown__toggle)}>
        <span className={styles.navDropdown__title}>
          {title} <i className='fas fa-chevron-down'></i>
        </span>
      </div>
      {show && <div className={styles.navDropdown__dropDown}>{children}</div>}
    </div>
  );
};

export default NavDropdown;
