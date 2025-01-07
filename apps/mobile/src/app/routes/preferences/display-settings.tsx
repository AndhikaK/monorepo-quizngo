import { NavigationScreenProps } from '@/app/routes.type';
import { useHardwareBackPress } from '@/common/hooks';
import { Appbar, View } from '@/components/ui';

type ScreenProps =
  NavigationScreenProps<'account/preferences/display-settings'>;
export function DisplaySettingsScreen(props: ScreenProps) {
  const { goBackAction } = useHardwareBackPress();

  return (
    <View>
      <Appbar title="Display Settings" onBackIconPress={goBackAction} />
    </View>
  );
}
