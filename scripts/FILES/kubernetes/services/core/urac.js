'use strict';
var gConfig = require("../../config.js");

var components = {
    service: {
        "apiVersion": "v1",
        "kind": "Service",
        "metadata": {
            "name": "dashboard-urac-v2-service",
            "labels": {
                "soajs.content": "true",
                "soajs.env.code": "dashboard",

                "soajs.service.name": "urac",
                "soajs.service.group": "soajs-core-services",
                "soajs.service.type": "service",
                "soajs.service.version": "2",
                "soajs.service.label": "dashboard-urac-v2",
                "soajs.service.mode": "deployment",
	            "soajs.service.repo.name": "soajs_urac"
            }
        },
        "spec": {
            "selector": {
                "soajs.service.label": "dashboard-urac-v2"
            },
            "ports": [
                {
                    "name": "service-port",
                    "protocol": "TCP",
                    "port": 4001,
                    "targetPort": 4001
                },
                {
                    "name": "maintenance-port",
                    "protocol": "TCP",
                    "port": 5001,
                    "targetPort": 5001
                }
            ]
        }
    },
    deployment: {
        "apiVersion": "extensions/v1beta1",
        "kind": "Deployment",
        "metadata": {
            "name": "dashboard-urac-v2",
            "labels": {
                "soajs.content": "true",
                "soajs.env.code": "dashboard",

                "soajs.service.name": "urac",
                "soajs.service.group": "soajs-core-services",
                "soajs.service.type": "service",
                "soajs.service.version": "2",
                "soajs.service.label": "dashboard-urac-v2",
                "soajs.service.mode": "deployment",
	            "soajs.service.repo.name": "soajs_urac"
	            
            }
        },
        "spec": {
            "replicas": gConfig.kubernetes.replicas,
            "selector": {
                "matchLabels": {
                    "soajs.service.label": "dashboard-urac-v2"
                }
            },
            "template": {
                "metadata": {
                    "name": "dashboard-urac-v2",
                    "labels": {
                        "soajs.content": "true",
                        "soajs.env.code": "dashboard",

                        "soajs.service.name": "urac",
                        "soajs.service.group": "soajs-core-services",
                        "soajs.service.type": "service",
                        "soajs.service.version": "2",
                        "soajs.service.label": "dashboard-urac-v2",
                        "soajs.service.mode": "deployment"
                    }
                },
                "spec": {
                    "containers": [
                        {
                            "name": "dashboard-urac-v2",
                            "image": gConfig.imagePrefix + "/soajs",
                            "imagePullPolicy": gConfig.imagePullPolicy,
                            "workingDir": "/opt/soajs/FILES/deployer/",
                            "command": ["./soajsDeployer.sh"],
                            "args": ["-T", "service", "-X", "deploy", "-L"],
                            "ports": [
                                {
                                    "name": "service",
                                    "containerPort": 4001
                                },
                                {
                                    "name": "maintenance",
                                    "containerPort": 5001
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
                                    "value": gConfig.git.branch
                                },
                                {
                                    "name": "SOAJS_GIT_REPO",
                                    "value": "soajs.urac"
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
