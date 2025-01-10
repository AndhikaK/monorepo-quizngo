import '@/locales/i18n';
import { AppProvider } from '@/app/provider';
import { AppRouter } from '@/app/routes';

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
