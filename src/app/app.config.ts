import { ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp({
        apiKey: "AIzaSyDq8abrevVPnLJZmsHbtDsSe9sNo-Ro7KE",
        authDomain: "crud-angular-17.firebaseapp.com",
        projectId: "crud-angular-17",
        storageBucket: "crud-angular-17.appspot.com",
        messagingSenderId: "424564661510",
        appId: "1:424564661510:web:2bc99e0d705be590ecd287"
      })),
    provideFirestore(() => getFirestore()),
    ]),
  ],
};
