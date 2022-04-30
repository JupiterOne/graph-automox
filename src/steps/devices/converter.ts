import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { AutomoxDevice } from '../../types';

import { Entities } from '../constants';

export function getDeviceKey(id: string): string {
  return `Automox_device:${id.toString()}`;
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
        uuid: device.uuid,

        category: 'endpoint',
        make: device.name,
        model: device.detail.MODEL,
        serial: device.serial_number,
        deviceId: device.uuid,

        /*
          osVersionId: device.os_version_id,
          instanceId: device.instance_id,
          refreshInterval: device.refresh_interval,
          lastUpdateTime: device.last_update_time,
          lastRefreshTime: device.last_refresh_time,
          uptime: device.uptime,
          needsReboot: device.needs_reboot,
          timezone: device.timezone,
          deleted: device.deleted,
          createTime: device.create_time,
          osVersion: device.os_version,
          osName: device.os_name,
          osFamily: device.os_family,
          patches: device.patches,
          cpu: device.cpu,
          cpuSize: device.cpu_size,
          cpuType: device.cpu_type,
          mode: device.mode,
          nicsConnected: device.nics_connected,
          nicsDevice: device.nics_device,
          nicsVendor: device.nics_vendor,
          ram: device.ram,
          serial: device.serial,
          servicetag: device.servicetag,
          vendor: device.vendor,
          version: device.version,
          pendingPatches: device.pending_patches,
          connected: device.connected,
          lastProcessTime: device.last_process_time,
          nextPatchTime: device.next_patch_time,
          notificationCount: device.notification_count,
          rebootNotificationCount: device.reboot_notification_count,
          patchDeferralCount: device.patch_deferral_count,
          isDelayedByNotification: device.is_delayed_by_notification,
          rebootIsDelayedByNotification: device.reboot_is_delayed_by_notification,
          isDelayedByUser: device.is_delayed_by_user,
          rebootIsDelayedByUser: device.reboot_is_delayed_by_user,
          lastDisconnectTime: device.last_disconnect_time,
          needsAttention: device.needs_attention,
          serialNumber: device.serial_number,
          deviceStatus: device.device_status,
          agentStatus: device.agent_status,
          policyStatus: device.policy_status,
          lastLoggedInUser: device.last_logged_in_user,
          */
      },
    },
  });
}
