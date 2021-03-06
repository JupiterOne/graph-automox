import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { AutomoxUser } from '../../types';
import { Entities } from '../constants';

export function getUserKey(id: string): string {
  return `automox_user:${id}`;
}

export function createUserEntity(user: AutomoxUser): Entity {
  return createIntegrationEntity({
    entityData: {
      source: user,
      assign: {
        _type: Entities.USER._type,
        _class: Entities.USER._class,
        _key: getUserKey(user.id.toString()),
        id: user.id.toString(),
        username: user.email,
        name: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
        samlEnabled: user.saml_enabled,
        ssoEnabled: user.sso_enabled,
        active: true,
      },
    },
  });
}
