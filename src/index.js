const solveAll = require('./solve-all');

//copy session id from adventofcode.com session cookie
const sessionId = '***REMOVED***';
solveAll(sessionId).catch(err => console.error(err.stack));
