import { accountSteps } from './account';
import { deviceSteps } from './devices';
import { deviceGroupSteps } from './groups';

const integrationSteps = [...accountSteps, ...deviceSteps, ...deviceGroupSteps];

export { integrationSteps };
