'use strict';
var gConfig = require("../../config.js");

var components = {
    service: {
        "apiVersion": "v1",
        "kind": "Service",
        "metadata": {
            "name": "dashboard-dashboard-v1-service",
            "labels": {
                "soajs.content": "true",
                "soajs.env.code": "dashboard",

                "soajs.service.name": "dashboard",
                "soajs.service.group": "soajs-core-services",
	            "soajs.service.type": "service",
	            "soajs.service.subtype": "soajs",
                "soajs.service.version": "1",
                "soajs.service.label": "dashboard-dashboard-v1",
                "soajs.service.mode": "deployment",
	            "soajs.service.repo.name": "soajs_dashboard",
                "service.branch": gConfig.git.branch,
	            "service.owner": "soajs",
                "service.repo": "soajs.dashboard"
            }
        },
        "spec": {
            "selector": {
                "soajs.service.label": "dashboard-dashboard-v1"
            },
            "ports": [
                {
                    "name": "service-port",
                    "protocol": "TCP",
                    "port": 4003,
                    "targetPort": 4003
                },
                {
                    "name": "maintenance-port",
                    "protocol": "TCP",
                    "port": 5003,
                    "targetPort": 5003
                }
            ]
        }
    },
    deployment: {
        "apiVersion": "extensions/v1beta1",
        "kind": "Deployment",
        "metadata": {
            "name": "dashboard-dashboard-v1",
            "labels": {
                "soajs.content": "true",
                "soajs.env.code": "dashboard",

                "soajs.service.name": "dashboard",
                "soajs.service.group": "soajs-core-services",
	            "soajs.service.type": "service",
	            "soajs.service.subtype": "soajs",
                "soajs.service.version": "1",
                "soajs.service.label": "dashboard-dashboard-v1",
                "soajs.service.mode": "deployment",
	            "soajs.service.repo.name": "soajs_dashboard",
                "service.branch": gConfig.git.branch,
	            "service.owner": "soajs",
                "service.repo": "soajs.dashboard"
            }
        },
        "spec": {
            "replicas": gConfig.kubernetes.replicas,
            "selector": {
                "matchLabels": {
                    "soajs.service.label": "dashboard-dashboard-v1"
                }
            },
            "template": {
                "metadata": {
                    "name": "dashboard-dashboard-v1",
                    "labels": {
                        "soajs.content": "true",
                        "soajs.env.code": "dashboard",

                        "soajs.service.name": "dashboard",
                        "soajs.service.group": "soajs-core-services",
	                    "soajs.service.type": "service",
	                    "soajs.service.subtype": "soajs",
                        "soajs.service.version": "1",
                        "soajs.service.label": "dashboard-dashboard-v1",
                        "soajs.service.mode": "deployment",
                        "service.branch": gConfig.git.branch,
	                    "service.owner": "soajs",
                        "service.repo": "soajs.dashboard"
                    }
                },
                "spec": {
                    "containers": [
                        {
                            "name": "dashboard-dashboard-v1",
	                        "image": gConfig.images.soajs.prefix + "/soajs:" + gConfig.images.soajs.tag,
                            "imagePullPolicy": gConfig.imagePullPolicy,
                            "workingDir": "/opt/soajs/deployer/",
                            "command": ["node"],
                            "args": ["index.js", "-T", "service"],
                            "ports": [
                                {
                                    "name": "service",
                                    "containerPort": 4003
                                },
                                {
                                    "name": "maintenance",
                                    "containerPort": 5003
                                }
                            ],
                            "readinessProbe": {
                                "httpGet": {
                                    "path": "/heartbeat",
                                    "port": "maintenance"
                                },
                                "initialDelaySeconds": gConfig.kubernetes.readinessProbe.initialDelaySeconds,
                                "timeoutSeconds": gConfig.kubernetes.readinessProbe.timeoutSeconds,
                                "periodSeconds": gConfig.kubernetes.readinessProbe.periodSeconds,
                                "successThreshold": gConfig.kubernetes.readinessProbe.successThreshold,
                                "failureThreshold": gConfig.kubernetes.readinessProbe.failureThreshold
                            },
                            "env": [
                                {
                                    "name": "NODE_ENV",
                                    "value": "production"
                                },
                                {
                                    "name": "SOAJS_ENV",
                                    "value": "dashboard"
                                },
                                {
                                    "name": "SOAJS_PROFILE",
                                    "value": "/opt/soajs/FILES/profiles/profile.js"
                                },
                                {
                                    "name": "SOAJS_SRV_AUTOREGISTERHOST",
                                    "value": "true"
                                },
                                {
                                    "name": "SOAJS_GIT_OWNER",
                                    "value": "soajs"
                                },
                                {
                                    "name": "SOAJS_GIT_BRANCH",
                                   // "value": gConfig.git.branch
                                    "value": "feature/analytics"
                                },
                                {
                                    "name": "SOAJS_GIT_REPO",
                                    "value": "soajs.dashboard"
                                },
                                {
                                    "name": "SOAJS_GIT_PROVIDER",
                                    "value": gConfig.git.provider
                                },
                                {
                                    "name": "SOAJS_GIT_DOMAIN",
                                    "value": gConfig.git.domain
                                },
                                {
                                    "name": "SOAJS_DEPLOY_ACC",
                                    "value": gConfig.deploy_acc
                                },
                                {
                                    "name": "SOAJS_DEPLOY_HA",
                                    "value": "kubernetes"
                                },
                                {
                                    "name": "SOAJS_HA_IP",
                                    "valueFrom": {
                                        "fieldRef": {
                                            "fieldPath": "status.podIP"
                                        }
                                    }
                                },
                                {
                                    "name": "SOAJS_HA_NAME",
                                    "valueFrom": {
                                        "fieldRef": {
                                            "fieldPath": "metadata.name"
                                        }
                                    }
                                }
                            ],
                            "volumeMounts": [
                                {
                                    "mountPath": gConfig.kubernetes.volumes.log.path,
                                    "name": gConfig.kubernetes.volumes.log.label
                                }
                            ]
                        }
                    ],
                    "volumes": [
                        {
                            "name": gConfig.kubernetes.volumes.log.label,
                            "hostPath": {
                                "path": gConfig.kubernetes.volumes.log.path
                            }
                        }
                    ]
                }
            }
        }
    }
};

module.exports = components;
