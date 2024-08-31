'use client';

import { RichTextEditor, Link } from '@mantine/tiptap';
import { JSONContent, useEditor } from '@tiptap/react';
import { notifications } from '@mantine/notifications';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Button, TextInput, Container, MultiSelect, Stack, Divider, Image, Flex, Skeleton } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdError } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { articleSchema } from '@/lib/schema/articleSchema';
import { articleTags } from '@/lib/definitions';
import DropzoneImageUpload from '../Files/DropzoneUpload';

const placeholderContent =
  '';

export default function CreateArticle() {
	const [loading, setLoading] = useState(false);
	const { data: session } = useSession();
	const router = useRouter();
	const [content, setContent] = useState<JSONContent>();
	const [contentError, setContentError] = useState(null);
	const editor = useEditor({
		onUpdate({ editor: _editor }) {
			setContent(_editor.getJSON());
		},
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
		],
		content: placeholderContent,
	});
	const [title, setTitle] = useState('');
	const [titleError, setTitleError] = useState(null);

	const [tags, setTags] = useState<string[]>([]);
	const [tagsError, setTagsError] = useState(null);

	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageError, setImageError] = useState<boolean>(false);

	const createFormData = () => {
		const formData : FormData = new FormData();
		const contentString = JSON.stringify(content);
		const validationResponse = articleSchema.safeParse({
			title,
			content: contentString,
			tags,
			image: imageFile,
		});

		if (validationResponse.success) {
			if (session) {
				formData.append('title', title);
				formData.append('content', contentString);
				formData.append('authorId', session?.userId);
				console.log('SESSION: ', session);
				formData.append('tags', tags.toString());
				if (imageFile) formData.append('image', imageFile);

				console.log(tags.toString());
				submitFormData(formData);
			}
		} else {
			const _validationErrors : any[] = [];
			const { errors: zodErrors } = validationResponse.error;
			zodErrors.map((zodIssue) =>
				_validationErrors.push({ for: zodIssue.path, message: zodIssue.message }));

			_validationErrors.forEach((validationError) => {
				(notifications.show({
					title: 'There\'s an issue with your submission',
					message: validationError.message,
					color: 'white',
					icon: <MdError color="red" size={32} />,
				}));

				switch (validationError.for[0]) {
				case 'title':
					setTitleError(validationError.message);
					break;
				case 'content':
					setContentError(validationError.message);
					break;
				case 'tags':
					setTagsError(validationError.message);
					break;
				}
			});
		}
	};

	const submitFormData = async (formData : FormData) => {
		setLoading(true);
		try {
			const response = await fetch('/feed/api', {
				method: 'POST',
				body: formData,
			});
			switch (response.status) {
			case 401:
				throw new Error(response.statusText);
			default:
				break;
			}
			const data = await response.json();
			console.log('Data: ', data);
			router.push(`/feed/${data.id}`);
		} catch (ex : any) {
			notifications.show({
				title: 'Uh oh...',
				message: ex.message,
				color: 'white',
				icon: <MdError color="red" size={32} />,
			});
			setLoading(false);
		}
	};

	return (
		<Container>
			<Flex justify="center" gap={10} align="center">
				{imageFile ? <Image src={URL.createObjectURL(imageFile)} height={250}></Image>
					: <Skeleton height={250} />}
				<DropzoneImageUpload onDrop={(files) => {
					const file = files === null ? null : files[0];
					setImageFile(file);
				}
				} />
			</Flex>
			<Divider mt="sm" mb="md" label="Title" styles={{ label: { fontSize: 16 } }} />
			<TextInput error={titleError} id="title_input" name="title" onChange={(event) => setTitle(event.currentTarget.value)} size="xl" radius="xs" placeholder="Title goes here..." />
			<Divider my="sm" label="Content" />
			<RichTextEditor editor={editor}>
				<RichTextEditor.Toolbar sticky stickyOffset={60}>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold />
						<RichTextEditor.Italic />
						<RichTextEditor.Underline />
						<RichTextEditor.Strikethrough />
						<RichTextEditor.ClearFormatting />
						<RichTextEditor.Highlight />
						<RichTextEditor.Code />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.H1 />
						<RichTextEditor.H2 />
						<RichTextEditor.H3 />
						<RichTextEditor.H4 />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Blockquote />
						<RichTextEditor.Hr />
						<RichTextEditor.BulletList />
						<RichTextEditor.OrderedList />
						<RichTextEditor.Subscript />
						<RichTextEditor.Superscript />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Link />
						<RichTextEditor.Unlink />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.AlignLeft />
						<RichTextEditor.AlignCenter />
						<RichTextEditor.AlignJustify />
						<RichTextEditor.AlignRight />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Undo />
						<RichTextEditor.Redo />
					</RichTextEditor.ControlsGroup>
				</RichTextEditor.Toolbar>

				<RichTextEditor.Content />
			</RichTextEditor>
			<Divider mt="sm" mb="sm" label="Tags" />
			<Container p={10}>
				<Stack>
					<MultiSelect error={tagsError} name="tags" onChange={(value) => setTags(value)} label="Add some tags" placeholder="Enter a tag, e.g. Politics" data={articleTags} maxValues={8} searchable limit={10} hidePickedOptions />
					<Button loading={loading} size="md" color="black" variant="filled" onClick={() => createFormData()}>Submit</Button>
				</Stack>
			</Container>
		</Container>
	);
}
