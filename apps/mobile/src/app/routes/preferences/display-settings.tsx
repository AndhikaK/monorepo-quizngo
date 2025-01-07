import { useHardwareBackPress } from '@/common/hooks';
import { Appbar, View } from '@/components/ui';

export function DisplaySettingsScreen() {
  const { goBackAction } = useHardwareBackPress();

  return (
    <View>
      <Appbar title="Display Settings" onBackIconPress={goBackAction} />
    </View>
  );
}
