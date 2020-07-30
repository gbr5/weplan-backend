import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from '@shared/container/providers/StorageProvider/implementations/S3StorageProvider';

const providers = {
  disk: container.resolve(DiskStorageProvider),
  s3: container.resolve(S3StorageProvider),
};

container.registerInstance<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
