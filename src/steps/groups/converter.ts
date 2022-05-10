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
  // This is currently getting included by default
  // See: https://github.com/JupiterOne/jupiter-managed-integration-sdk/pull/66
  // For right now we need to keep this line in.
  delete (deviceGroup as any).notes;

  return createIntegrationEntity({
    entityData: {
      source: deviceGroup,
      assign: {
        _type: Entities.DEVICE_GROUP._type,
        _class: Entities.DEVICE_GROUP._class,
        _key: getGroupKey(deviceGroup.id.toString()),
        id: deviceGroup.id.toString(),
        name: deviceGroup.name,
        displayName: deviceGroup.name || deviceGroup.id.toString(),
      },
    },
  });
}
