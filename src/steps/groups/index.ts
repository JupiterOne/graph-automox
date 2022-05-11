import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
  getRawData,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import {
  Entities,
  Relationships,
  Steps,
  ACCOUNT_ENTITY_KEY,
} from '../constants';
import { AutomoxDevice } from '../../types';
import { createDeviceGroupEntity, getGroupKey } from './converter';

export async function fetchDeviceGroups({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateGroups(async (deviceGroup) => {
    const deviceGroupEntity = await jobState.addEntity(
      createDeviceGroupEntity(deviceGroup),
    );
    await jobState.addRelationship(
      createDirectRelationship({
        _class: RelationshipClass.HAS,
        from: accountEntity,
        to: deviceGroupEntity,
      }),
    );
  });
}

export async function buildGroupAndDeviceRelationships({
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.DEVICE._type },
    async (deviceEntity) => {
      const device = getRawData<AutomoxDevice>(deviceEntity);
      if (!device) {
        logger.warn(
          { _key: deviceEntity._key },
          'Could not get raw data for device entity',
        );
        return;
      }

      const isGroupEntity = await jobState.findEntity(
        getGroupKey(device.server_group_id.toString()),
      );

      if (isGroupEntity)
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: isGroupEntity,
            to: deviceEntity,
          }),
        );
    },
  );
}

export const deviceGroupSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.GROUPS,
    name: 'Fetch Device Groups',
    entities: [Entities.DEVICE_GROUP],
    relationships: [Relationships.ACCOUNT_HAS_DEVICE_GROUP],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchDeviceGroups,
  },
  {
    id: Steps.BUILD_DEVICE_GROUP_DEVICE_RELATIONSHIPS,
    name: 'Build Device Group and Device Relationships',
    entities: [],
    relationships: [Relationships.DEVICE_GROUP_HAS_DEVICE],
    dependsOn: [Steps.GROUPS, Steps.DEVICES],
    executionHandler: buildGroupAndDeviceRelationships,
  },
];
