import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { AutomoxDevice } from '../../types';
import { Entities } from '../constants';

export function getDeviceKey(id: string): string {
  return `Automox_device:${id}`;
}

export function createDeviceEntity(device: AutomoxDevice): Entity {
  return createIntegrationEntity({
    entityData: {
      source: device,
      assign: {
        _type: Entities.DEVICE._type,
        _class: Entities.DEVICE._class,
        _key: getDeviceKey(device.id.toString()),
        id: device.id.toString(),
        name: device.name,
        serverGroupId: device.server_group_id,
        organizationId: device.organization_id,
        compliant: device.compliant,
        connected: device.connected,
        deleted: device.deleted,
        category: 'endpoint',
        make: device.name,
        model: device.detail.MODEL,
        serial: device.serial_number,
        deviceId: device.uuid,
        lastProcessedOn: parseTimePropertyValue(device.last_process_time),
        lastRefreshedOn: parseTimePropertyValue(device.last_refresh_time),
        lastScanFailedOn: parseTimePropertyValue(device.last_scan_failed),
        createdOn: parseTimePropertyValue(device.create_time),
        updatedOn: parseTimePropertyValue(device.last_update_time),
      },
    },
  });
}
