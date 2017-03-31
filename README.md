# 'The Mondrian Papers' Entries

This module generates `.tsx` (Typescript JSX) files from TEI-XML. Every TEI-XML file is considered an entry.

## Run
- $ npm install # install dependencies)
- $ npm run build # build TypeScript to JavaScript
- $ npm start # Generate .tsx files

## SVN credentials
The SVN credentials are extracted from <mondrian-entries>/config.json. The format is:
```
{
	svnUser: '',
	svnServer: '',
	svnPath: ''
}
```
If no config.json is found, the script will ask for the user, server and path.

