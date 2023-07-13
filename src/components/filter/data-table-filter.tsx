import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FilterOptionType } from '@/types';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface DataTableFilterProps {
	title?: string;
	options: FilterOptionType[];
	selectedOption: FilterOptionType | null;
	onSelectOption: (option: FilterOptionType | string | null) => void;
}

export const DataTableFilter = ({
	title,
	options,
	selectedOption,
	onSelectOption
}: DataTableFilterProps) => {
	const [open, setOpen] = useState(false);

	const handleFilterSelection = (value: FilterOptionType | null) => {
		onSelectOption(value);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='outline' size='sm' className='h-10 border-dashed'>
					<PlusCircle className='mr-2 h-4 w-4' />
					{title}
					{selectedOption && (
						<>
							<Separator orientation='vertical' className='mx-2 h-5' />
							<Badge variant='secondary' className='rounded-sm px-1 font-normal'>
								{selectedOption.label}
							</Badge>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='p-0 max-w-[250px]' side='bottom' sideOffset={10} align='start'>
				<Command>
					<CommandInput placeholder='Change status...' />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.label}
									onSelect={() => handleFilterSelection({ label: option.label, value: option.value })}
								>
									{option.icon && (
										<option.icon
											className={cn(
												'mr-2 h-4 w-4',
												option.value === selectedOption?.value ? 'opacity-100' : 'opacity-40'
											)}
										/>
									)}
									<span>{option.label}</span>
								</CommandItem>
							))}
						</CommandGroup>
						{selectedOption && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => handleFilterSelection(null)}
										className='justify-center text-center'
									>
										Clear filters
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
