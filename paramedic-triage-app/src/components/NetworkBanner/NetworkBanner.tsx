import {
  Banner,
} from 'react-native-paper';

interface Props {
  online: boolean;
}

export default function NetworkBanner({
  online,
}: Props) {
  return (
    <Banner
      visible={!online}
    >
      Device Offline
    </Banner>
  );
}