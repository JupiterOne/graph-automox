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
  // console.log(
  //   Entities.DEVICE_GROUP._type,
  //   Entities.DEVICE_GROUP._class,
  //   getGroupKey(deviceGroup.organization_id.toString()),
  //   deviceGroup.id.toString(),
  //   account_name,
  //   );
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
        //name: account_name,
        //organizationId: group.organization_id.toString(),
        //refreshInterval: group.refresh_interval.toString(),
        //parentServerGroupId: group.parent_server_group_id.toString(),
        //uiColor: group.ui_color,
        //notes: group.notes,
        //enableOsAutoUpdate: group.enable_os_auto_update,
        //serverCount: group.server_count.toString(),
      },
    },
  });
}
