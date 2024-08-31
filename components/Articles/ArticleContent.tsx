'use client';

import { JSONContent } from '@tiptap/core';
import { Link } from '@mantine/tiptap';
import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { generateHTML } from '@tiptap/html';
import { useMemo } from 'react';
import DOMPurify from 'isomorphic-dompurify';

type Props = {
    json : JSONContent
};
export default function ArticleContent(props : Props) {
	const output = useMemo(() => generateHTML(props.json, [
		Link,
		StarterKit,
		Highlight,
		Underline,
		TextAlign.configure({ types: ['heading', 'paragraph'] }),
		Superscript,
		SubScript,
		Document,
		Paragraph,
		Text,
		Bold,
		// other extensions …
	]), [props.json]);

	const sanitizedOutput = DOMPurify.sanitize(output, { USE_PROFILES: { html: true } });
	return (
		<div dangerouslySetInnerHTML={{ __html: sanitizedOutput }} />
	);
}
