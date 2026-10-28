// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Balicanta Yao';
export const SITE_DESCRIPTION = "Hello I'm Balicanta";

/** Prefix a root-relative path with the configured `base`. */
export function withBase(path: string): string {
	if (!path.startsWith('/')) return path;
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	if (path === '/') return `${base}/`;
	return `${base}${path}`;
}
