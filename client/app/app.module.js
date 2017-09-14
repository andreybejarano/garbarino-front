import { HomePageModule } from './home-page/home-page.module';
import { } from './app.vendors.module';
import { CommonsModule } from './commons/common.module';
import { AppTemplates } from './app.templates';

export const FopsComponentsApp =
	angular
		.module('garbarinofront', [
			AppTemplates,
			CommonsModule,
			HomePageModule
		])
		.value('EventEmitter', (payload) => ({ $event: payload }));
