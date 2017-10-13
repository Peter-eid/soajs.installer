'use strict';

var settings = [
    {
        "_type": "settings",
        "_name": "Analytics Settings",
        "env": {
	        dashboard: false
        },
	    "mongoImported": true,
	    "elasticsearch": {
		    "security": "%es_security%",
		    "db_name": "%db_name%"
        }
    }
];

module.exports = settings;