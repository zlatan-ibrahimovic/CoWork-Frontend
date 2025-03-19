import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

setupZoneTestEnv();
