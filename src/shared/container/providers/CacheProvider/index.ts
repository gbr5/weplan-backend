import { container } from 'tsyringe';
import cacheConfig from '@config/cache';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import RedisCacheProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';

const providers = {
  redis: container.resolve(RedisCacheProvider),
};

container.registerInstance<ICacheProvider>(
  'CacheProvider',
  providers[cacheConfig.driver],
);
