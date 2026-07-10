import React from 'react';
import { PRIORITIES } from '../../constants/priority';
import PriorityCard from './PriorityCard';

interface Props {
  value: number;
  onChange(value: number): void;
}

export default function PrioritySelector({
  value,
  onChange,
}: Props) {
  return (
    <>
      {PRIORITIES.map((priority) => (
        <PriorityCard
          key={priority.value}
          title={`Priority ${priority.value} - ${priority.label}`}
          description={priority.description}
          color={priority.color}
          selected={value === priority.value}
          onPress={() => onChange(priority.value)}
        />
      ))}
    </>
  );
}