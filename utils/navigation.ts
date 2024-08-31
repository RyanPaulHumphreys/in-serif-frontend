export function GetRootPath(pathname : String) {
	const rootPath = `/${pathname.substring(1).split('/', 2)[0]}`;
	console.log(`Pathname: ${pathname} :: Route Path: ${rootPath}`);
	return rootPath;
}
