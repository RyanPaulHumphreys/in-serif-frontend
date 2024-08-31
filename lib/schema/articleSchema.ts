import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_CONTENT_LENGTH, MAX_IMAGE_UPLOAD_SIZE, MAX_TAGS_PER_POST, MAX_TITLE_LENGTH, MIN_CONTENT_LENGTH, MIN_TAGS_PER_POST, MIN_TITLE_LENGTH } from '../validation/articleValidationDefinitions';

export const articleSchema = z.object({
    title: z.string({ required_error: 'Title cannot be empty', invalid_type_error: 'Title must be a string' })
                .min(MIN_TITLE_LENGTH, `Title must be longer than ${MIN_TITLE_LENGTH} characters`)
                .max(MAX_TITLE_LENGTH, `Title must be shorter than ${MAX_TITLE_LENGTH} characters`),
    content: z.string({ required_error: 'Content cannot be empty', invalid_type_error: 'Content must be a string' })
                .min(MIN_CONTENT_LENGTH, `Content must be longer than ${MIN_CONTENT_LENGTH} characters`)
                .max(MAX_CONTENT_LENGTH, `Content must be shorter than ${MAX_CONTENT_LENGTH} characters`),
    tags: z.array(z.string())
                .min(MIN_TAGS_PER_POST, `You must define at least ${MIN_TAGS_PER_POST} tag(s)`)
                .max(MAX_TAGS_PER_POST, `You cannot have more than ${MAX_TAGS_PER_POST} tags`),
    image: z.instanceof(File).optional()
    .refine((file) => !file || file.size !== 0 || file.size <= MAX_IMAGE_UPLOAD_SIZE, `Max image upload size is ${MAX_IMAGE_UPLOAD_SIZE}MB`)
    .refine((file) => !file || file.type === '' || ACCEPTED_IMAGE_TYPES.includes(file.type), `Accepted image types are ${ACCEPTED_IMAGE_TYPES.toString()}`),
});
