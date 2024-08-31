'use client';

import { ActionIcon, Button, Flex, Group, Input, MultiSelect, TextInput } from '@mantine/core';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { articleTags } from '@/lib/definitions';
import { useInputState } from '@mantine/hooks';

type Props = {
	formAction : any
	defaultSortBy : string
	submitOnChange : boolean
};

const dropdownValues = [
	'Date published',
	'Ratings',
];
export default function FilterAndSortOptions(props : Props) {
	const { formAction, defaultSortBy, submitOnChange } = props;
	const [sortDescending, setSortDescending] = useState<boolean>(true);
	const [sortBy, setSortBy] = useState<string>(defaultSortBy);
	const [filter, setFilter] = useState<string[]>([]);

	const sortOptions = dropdownValues.map(value =>
		<option key={value} value={value}>{value}</option>
	);
	useEffect(() => {
		const submit = () => {
			const finalFormData : FormData = new FormData();
			finalFormData.append('sort-by', `${sortBy}_${sortDescending ? 'desc' : 'asc'}`);
			finalFormData.append('tags', filter.toString());
			console.log('submitting filter');
			formAction(finalFormData);
		};
		submit();
	}, [sortDescending, sortBy, filter]);

	return (
		<>
			<Flex align="center" justify="space-between" gap={10}>
				<MultiSelect onChange={setFilter} label="Filter by tag" name="tags" data={articleTags} miw={{ sm: 200, md: 300 }} maw={{ sm: 300, md: 400, lg: 500, xl: 700 }} styles={{ pillsList: { maxHeight: 200 } }} maxValues={10} />
				<Group gap={2}>
					<TextInput label="Sort by" onChange={(event) => setSortBy(event.currentTarget.value)} component="select" name="sort-by" pointer>{sortOptions}</TextInput>
					<ActionIcon mt="lg" variant="subtle" color="black" onClick={() => setSortDescending(!sortDescending)}>
						{sortDescending ?
							<MdArrowDropDown size={32} />
							: <MdArrowDropUp size={32} /> }
					</ActionIcon>
				</Group>
			</Flex>
		</>
	);
}
