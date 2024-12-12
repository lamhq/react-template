import { useTranslation } from 'react-i18next';
import styles from './Demo.module.css';

export default function App() {
  const { t } = useTranslation();
  return (
    <div className={styles.content}>
      <p>{t('good morning')}</p>
    </div>
  );
}
