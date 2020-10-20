import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { persistState } from '@datorama/akita';

const providers = [{ provide: 'persistStorage', useValue: persistState() }];

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic(providers)
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));