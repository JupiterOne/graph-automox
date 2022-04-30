import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const deviceGroupSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://console.automox.com/api/servergroups
     * PATTERN: Fetch Entities
     */
    id: 'fetch-device-groups',
    name: 'Fetch Device Groups',
    entities: [
      {
        resourceName: 'Device Group',
        _type: 'automox_device_group',
        _class: ['Group'],
      },
    ],
    relationships: [
      {
        _type: 'automox_account_has_device_group',
        sourceType: 'automox_account',
        _class: RelationshipClass.HAS,
        targetType: 'automox_device_group',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },

  {
    /**
     * ENDPOINT: https://console.automox.com/api/servergroups
     * PATTERN: Fetch Entities
     */
    id: 'build-device-group-and-device-relationships',
    name: 'Build Device Group and Device Relationships',
    entities: [],
    relationships: [
      {
        _type: 'automox_device_group_has_device',
        sourceType: 'automox_device_group',
        _class: RelationshipClass.HAS,
        targetType: 'automox_device',
      },
    ],
    dependsOn: ['fetch-device-groups', 'fetch-devices'],
    implemented: true,
  },
];
