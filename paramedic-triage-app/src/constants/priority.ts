export const PRIORITIES = [
  {
    value: 1,
    label: 'Critical',
    color: '#8B0000',
    description: 'Immediate life-threatening condition',
  },
  {
    value: 2,
    label: 'High',
    color: '#D32F2F',
    description: 'Urgent medical attention required',
  },
  {
    value: 3,
    label: 'Moderate',
    color: '#F57C00',
    description: 'Needs medical evaluation',
  },
  {
    value: 4,
    label: 'Low',
    color: '#FBC02D',
    description: 'Minor injuries',
  },
  {
    value: 5,
    label: 'Stable',
    color: '#388E3C',
    description: 'Walking wounded',
  },
] as const;