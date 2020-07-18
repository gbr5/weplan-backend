import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';
import BCryptProvider from '@modules/users/providers/hashProviders/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptProvider);
