"use strict";

var profile = require(process.env.SOAJS_PROFILE);
var mongoHostname = profile.servers[0].host;
var lib= {
	"extKey1": process.env.SOAJS_EXTKEY,
	"analytics": process.env.SOAJS_DEPLOY_ANALYTICS,
	"masterDomain": process.env.MASTER_DOMAIN || 'soajs.org',
	"apiPrefix": process.env.API_PREFIX || "dashboard-api",
	"sitePrefix": process.env.SITE_PREFIX || "dashboard",
	"portalPrefix": process.env.PORTAL_PREFIX || "portal",
	"folder": process.env.SOAJS_DATA_FOLDER || "/opt/soajs/node_modules/soajs.installer/data/startup/",
	"profile": process.env.SOAJS_PROFILE || "/opt/soajs/node_modules/soajs.installer/data/startup/profile.js",
	"deploy_acc": process.env.SOAJS_DEPLOY_ACC || true,
	"git":{
		"branch": process.env.SOAJS_GIT_BRANCH || 'develop',
		"domain": process.env.SOAJS_GIT_DOMAIN || 'github.com',
		"provider": process.env.SOAJS_GIT_PROVIDER || 'github'
	},
	"dashUISrc": {
		"branch": process.env.SOAJS_GIT_DASHBOARD_BRANCH || 'develop'
	},
	"customUISrc":{
		"owner": process.env.SOAJS_GIT_OWNER || null,
		"repo": process.env.SOAJS_GIT_REPO || null,
		"branch": process.env.SOAJS_GIT_CUSTOM_UI_BRANCH || null,
		"token": process.env.SOAJS_GIT_TOKEN || null,
		"provider": process.env.SOAJS_GIT_SOURCE || null,
		"domain": process.env.SOAJS_GIT_PROVIDER || null,
		"path": process.env.SOAJS_GIT_PATH || null
	},
	"mongo":{
		"prefix": profile.prefix,
		"hostname": mongoHostname,
		"services": {
			"dashboard": {
				"name": mongoHostname,
				"ips": []
			}
		},
		"rsName": process.env.SOAJS_MONGO_RSNAME || null,
		"external": (process.env.MONGO_EXT === "true") || false,
		"port": parseInt(profile.servers[0].port) || 27017
	},
	"nginx":{
		"port": {
			"http": parseInt(process.env.NGINX_HTTP_PORT) || 80,
			"https": parseInt(process.env.NGINX_HTTPS_PORT) || 443
		},
		"ssl": (process.env.SOAJS_NX_SSL === "true") || false
	},
	"images":{
		"soajs": {
			"prefix": process.env.SOAJS_IMAGE_PREFIX || 'soajsorg',
			"tag": process.env.SOAJS_IMAGE_TAG || 'latest'
		},
		"nginx": {
			"prefix": process.env.SOAJS_NX_IMAGE_PREFIX || 'soajsorg',
			"tag": process.env.SOAJS_NX_IMAGE_TAG || 'latest'
		}
	},
	"docker":{
		"mongoCollection": 'docker',
		"replicas": parseInt(process.env.SOAJS_DOCKER_REPLICA) || 1,
		"machineIP": process.env.CONTAINER_HOST || "127.0.0.1",
		"machinePort": parseInt(process.env.CONTAINER_PORT) || 2376,
		"certsPath": process.env.SOAJS_DOCKER_CERTS_PATH || process.env.HOME + '/.docker',
		"socketPath": process.env.SOAJS_DOCKER_SOCKET || '/var/run/docker.sock',
		"network": process.env.DOCKER_NETWORK ||  'soajsnet',
		"options": {
			"ListenAddr": "0.0.0.0:" + (parseInt(process.env.SWARM_INTERNAL_PORT) || 2377),
			"AdvertiseAddr": (process.env.CONTAINER_HOST || "127.0.0.1") + ':' + (parseInt(process.env.SWARM_INTERNAL_PORT) || 2377),
			"ForceNewCluster": true,
			"Spec": {
				"Orchestration": {},
				"Raft": {},
				"Dispatcher": {},
				"CAConfig": {}
			}
		},
		"swarmConfig": {
			"tokens": {}
		},
		"volumes": {
			"log": {
				"label": "soajs_log_volume",
				"path": "/var/log/soajs/"
			}
		}
	},
	"deployGroups": ['db', 'elk', 'core', 'nginx'],
	"services":{
		"path": {
			"dir": __dirname + '/services/',
			"fileType": 'js'
		}
	}
};
module.exports = lib;