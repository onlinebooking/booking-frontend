#!/bin/sh
$QANDO_DEPLOY_PATH/env/bin/ansible-playbook \
$QANDO_DEPLOY_PATH/frontend_deploy.yml \
--user root \
-i $QANDO_DEPLOY_PATH/hosts \
--extra-vars "local_deploy_dir=$(pwd)" \
-vv
