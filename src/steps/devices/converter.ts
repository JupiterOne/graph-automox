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
  const serialNumber = device.serial_number;
  const lastSeenOn = parseTimePropertyValue(device.last_refresh_time);
  const macAddresses = getMacAddresses(device);

  return createIntegrationEntity({
    entityData: {
      source: device,
      assign: {
        _type: Entities.DEVICE._type,
        _class: Entities.DEVICE._class,
        _key: getDeviceKey(device.id.toString()),
        id: device.id.toString(),
        displayName: device.display_name,
        name: device.name,
        serverGroupId: device.server_group_id,
        organizationId: device.organization_id,
        compliant: device.compliant,
        connected: device.connected,
        deleted: device.deleted,
        category: 'endpoint',
        make: device.detail.VENDOR,
        model: device.detail.MODEL,
        serial: serialNumber,
        serialNumber,
        macAddress: macAddresses.length ? macAddresses : undefined,
        deviceId: device.uuid,
        osFamily: device.os_family,
        osName: device.os_name,
        osVersion: device.os_version,
        osVersionId: device.os_version_id,
        'status.deviceStatus': device.status?.device_status,
        'status.agentStatus': device.status?.agent_status,
        'status.policyStatus': device.status?.policy_status,
        'status.policyStatuses': device.status?.policy_statuses?.map(
          (policyStatus) => policyStatus.id,
        ),
        lastProcessedOn: parseTimePropertyValue(device.last_process_time),
        lastRefreshedOn: lastSeenOn,
        lastSeenOn,
        lastScanFailedOn: parseTimePropertyValue(device.last_scan_failed),
        createdOn: parseTimePropertyValue(device.create_time),
        updatedOn: parseTimePropertyValue(device.last_update_time),
      },
    },
  });
}

function getMacAddresses(device: AutomoxDevice) {
  return (device.detail.NICS || []).map((v) => v.MAC);
}
