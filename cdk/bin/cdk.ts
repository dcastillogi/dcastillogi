#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CDKStack } from '../lib/cdk-stack';
import { ConfigProps } from '../shared/types';

const app = new cdk.App();

const config = require("../config.json") as ConfigProps;

new CDKStack(app, `${config.project}Stack`, {
    config
});