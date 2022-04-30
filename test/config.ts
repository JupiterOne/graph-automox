import { IntegrationInvocationConfig } from '@jupiterone/integration-sdk-core';
import { StepTestConfig } from '@jupiterone/integration-sdk-testing';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { invocationConfig } from '../src';
import { IntegrationConfig } from '../src/config';

if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}
const DEFAULT_ACCOUNT_NAME = 'j1-stefan';
const DEFAULT_ACCOUNT_ID = '0f225c46-b6d3-43b8-b924-310add97641a';
const DEFAULT_CLIENT_SECRET = '94db9222-b9bb-43c6-93a9-77d02faa463c';

export const integrationConfig: IntegrationConfig = {
  apiKey: process.env.API_KEY || DEFAULT_CLIENT_SECRET,
  accountId: process.env.ACCOUNT_ID || DEFAULT_ACCOUNT_ID,
  accountName: process.env.ACCOUNT_NAME || DEFAULT_ACCOUNT_NAME,
};

export function buildStepTestConfigForStep(stepId: string): StepTestConfig {
  return {
    stepId,
    instanceConfig: integrationConfig,
    invocationConfig: invocationConfig as IntegrationInvocationConfig,
  };
}
