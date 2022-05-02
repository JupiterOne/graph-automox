import { accountSteps } from './account';
import { deviceSteps } from './devices';
import { deviceGroupSteps } from './groups';
import { userSteps } from './users';

const integrationSteps = [
  ...accountSteps,
  ...userSteps,
  ...deviceSteps,
  ...deviceGroupSteps,
];

export { integrationSteps };
