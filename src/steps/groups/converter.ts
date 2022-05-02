import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { AutomoxGroup } from '../../types';

import { Entities } from '../constants';

export function getGroupKey(id: string): string {
  return `automox_device_group:${id}`;
}

export function createDeviceGroupEntity(deviceGroup: AutomoxGroup): Entity {
  if (!deviceGroup.name) {
    var account_name = 'owner';
  } else {
    var account_name = deviceGroup.name;
  }
  const newDeviceGroup = {
    id: deviceGroup.id,
    organization_id: deviceGroup.organization_id,
    name: account_name,
    parent_server_group_id: deviceGroup.parent_server_group_id,
  };

  return createIntegrationEntity({
    entityData: {
      source: newDeviceGroup,
      assign: {
        _type: Entities.DEVICE_GROUP._type,
        _class: Entities.DEVICE_GROUP._class,
        _key: getGroupKey(newDeviceGroup.id.toString()),
        id: newDeviceGroup.id.toString(),
        name: account_name,
        displayName: account_name,
      },
    },
  });
}
