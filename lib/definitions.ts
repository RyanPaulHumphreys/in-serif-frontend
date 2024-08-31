export type Article = {
    id: number;
    title: string;
    content: string;
    tags: string[];
    postedAt: string;
    lastModified: string;
    imageUrl: File;
    author: Author
    userPermissions : ArticlePermission
};

export type Author = {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
};

export type ArticlePermission = {
  read: string,
  update: string,
  delete: string
};

export const articleTags = [
	'BUSINESS',
	'POLITICS',
	'WORLD NEWS',
	'SPORTS',
	'BLACK VOICES',
	'EDUCATION',
	'RELIGION',
	'LATINO VOICES',
	'ENTERTAINMENT',
	'SCIENCE',
	'COMEDY',
	'CRIME',
	'TRAVEL',
	'WEIRD NEWS',
	'QUEER VOICES',
	'MEDIA',
	'WOMEN',
	'TECH',
	'IMPACT',
	'PERSONAL STORIES',
	'ANTHROPOLOGY',
	'SOCIOLOGY',
	'COMMENT',
	'ART',
	'CULTURE',
];
