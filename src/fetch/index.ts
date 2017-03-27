const colors = require('colors');
import fetchXml from './xml';

const fetch = async () => {
	process.stdout.write('* Checkout XML (SVN). '.cyan);
	await fetchXml();
	console.log('Done.'.green);
};

export default fetch;
