import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const deviceSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://console.automox.com/api/servers
     * PATTERN: Fetch Entities
     */
    id: 'fetch-devices',
    name: 'Fetch Devices',
    entities: [
      {
        resourceName: 'Device',
        _type: 'automox_device',
        _class: ['Device'],
      },
    ],
    relationships: [
      {
        _type: 'automox_account_has_device',
        sourceType: 'automox_account',
        _class: RelationshipClass.HAS,
        targetType: 'automox_device',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
