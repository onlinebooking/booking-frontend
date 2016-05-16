#!/bin/sh
$QANDO_DEPOLY_PATH/env/bin/ansible-playbook \
$QANDO_DEPOLY_PATH/frontend_deploy.yml \
--user root \
-i $QANDO_DEPOLY_PATH/hosts \
--extra-vars "local_deploy_dir=$(pwd)" \
-vv
