"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/shadcn/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/shadcn/popover";
import { Badge } from "./badge";
interface optionInterface {
	label: string;
	value: string;
}
interface MultiselectProps {
	id?: string;
	options: optionInterface[];
	placeholder?: string;
	selected: string[];
	setSelected: (selected: string[]) => void;
}
export function Multiselect({
	id,
	options,
	selected,
	setSelected,
	placeholder = "Select options...",
}: MultiselectProps) {
	const [open, setOpen] = React.useState(false);

	const toggleValue = (valueToToggle: string) => {
		if (selected.includes(valueToToggle)) {
			const newSelected = selected.filter(
				(selectedValue) => selectedValue !== valueToToggle
			);
			setSelected([...newSelected]);
		} else {
			const newSelected = [...selected];

			setSelected([...newSelected, valueToToggle]);
		}
	};
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					id={id}
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="flex flex-row gap-1 justify-between flex-wrap items-center w-full h-auto"
					type="button"
				>
					<div
						className="flex justify-left items-center flex-wrap gap-1 max-w-[100%] 
                    overflow-y-auto max-h-16"
					>
						{selected?.length > 0 ? (
							selected?.map((selectedOption) => {
								return (
									<Badge key={selectedOption}>
										{
											options.find((option) => option.value == selectedOption)
												?.label
										}
										<button
											onClick={(e) => {
												e.stopPropagation();
												toggleValue(selectedOption);
											}}
										>
											{" "}
											<XIcon className="ml-1 w-3 h-3 shrink-0 opacity-50 cursor-pointer" />
										</button>
									</Badge>
								);
							})
						) : (
							<span> {placeholder}</span>
						)}
					</div>
					{/* <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search options..." />
					<CommandList>
						<CommandEmpty>No options found</CommandEmpty>
						<CommandGroup>
							{options.map((option: optionInterface) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={(currentValue) => {
										toggleValue(currentValue);
									}}
								>
									<CheckIcon
										className={cn(
											"mr-2 h-4 w-4",
											selected.includes(option.value)
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
