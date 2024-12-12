import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen leading-snug text-center flex-col justify-center">
      <p className="text-lg font-normal opacity-50">{t('good morning')}</p>
    </div>
  );
}
