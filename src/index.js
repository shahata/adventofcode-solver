/* global console */
'use strict';

import {solveAll} from './solve-all';

//copy session id from adventofcode.com session cookie
let sessionId = '***REMOVED***';
solveAll(sessionId).catch(err => console.error(err.stack));
