import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const ACCOUNT_ENTITY_KEY = 'entity:account';
export const Steps = {
  ACCOUNT: 'fetch-account',
  DEVICES: 'fetch-devices',
  GROUPS: 'fetch-device-groups',
  USERS: 'fetch-users',
  BUILD_DEVICE_GROUP_DEVICE_RELATIONSHIPS:
    'build-device-group-and-device-relationships',
};

export const Entities: Record<
  'DEVICE' | 'ACCOUNT' | 'DEVICE_GROUP' | 'USER',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'automox_account',
    _class: ['Account'],
  },
  DEVICE: {
    resourceName: 'Device',
    _type: 'automox_device',
    _class: ['Device'],
  },
  DEVICE_GROUP: {
    resourceName: 'Device Group',
    _type: 'automox_device_group',
    _class: ['Group'],
  },
  USER: {
    resourceName: 'User',
    _type: 'automox_user',
    _class: ['User'],
  },
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_DEVICE'
  | 'ACCOUNT_HAS_DEVICE_GROUP'
  | 'ACCOUNT_HAS_USER'
  | 'DEVICE_GROUP_HAS_DEVICE',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_DEVICE: {
    _type: 'automox_account_has_device',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DEVICE._type,
  },
  ACCOUNT_HAS_DEVICE_GROUP: {
    _type: 'automox_account_has_device_group',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DEVICE_GROUP._type,
  },
  ACCOUNT_HAS_USER: {
    _type: 'automox_account_has_user',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  DEVICE_GROUP_HAS_DEVICE: {
    _type: 'automox_device_group_has_device',
    sourceType: Entities.DEVICE_GROUP._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DEVICE._type,
  },
};
