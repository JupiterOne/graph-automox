import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { accountSpec } from './account';
import { deviceSpec } from './devices';
import { deviceGroupSpec } from './groups';
import { userSpec } from './users';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...accountSpec,
    ...deviceGroupSpec,
    ...deviceSpec,
    ...userSpec,
  ],
};
