import { FilterOptionType } from '@/types';
import { Heart, HeartCrack } from 'lucide-react';

export const statuses: FilterOptionType[] = [
	{
		label: 'Dead',
		value: 'false',
		icon: HeartCrack
	},
	{
		label: 'Alive',
		value: 'true',
		icon: Heart
	}
];

export const genders: FilterOptionType[] = [
	{
		label: 'Male',
		value: 'male'
	},
	{
		label: 'Female',
		value: 'female'
	}
];
