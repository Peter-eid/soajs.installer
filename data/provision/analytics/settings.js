'use strict';
//done
var settings = [
    {
        "_type": 'settings',
        "_name": 'Analytics Settings',
        "env": {
	        dashboard: false
        },
	    "mongoImported": true,
	    "elasticsearch": {
        	"db_name": "%db_name%",
		    "external": "%external%"
        }
    }
];

module.exports = settings;