import {
  Chip,
} from 'react-native-paper';

import { Colors } from '../../constants/colors';

interface Props {
  priority: 1 | 2 | 3 | 4 | 5;
}

export default function PriorityBadge({
  priority,
}: Props) {
  return (
    <Chip
      style={{
        backgroundColor:
          Colors.priority[priority],
      }}
      textStyle={{
        color: 'white',
      }}
    >
      Priority {priority}
    </Chip>
  );
}