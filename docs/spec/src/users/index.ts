import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const userSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://console.automox.com/api/users
     * PATTERN: Fetch Entities
     */
    id: 'fetch-users',
    name: 'Fetch Users',
    entities: [
      {
        resourceName: 'User',
        _type: 'automox_user',
        _class: ['User'],
      },
    ],
    relationships: [
      {
        _type: 'automox_account_has_user',
        sourceType: 'automox_account',
        _class: RelationshipClass.HAS,
        targetType: 'automox_user',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
