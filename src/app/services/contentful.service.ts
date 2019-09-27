import { Injectable } from '@angular/core';

import { createClient, Entry } from 'contentful';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// https://www.contentful.com/developers/docs/references/authentication/
const CONFIG = {
  space: 'cxts8zfs2vii',
  accessToken: 'h2qV-rw0CG7F4XZdDDA9zK0XTqQKUwZfKnrQOktuYXI',

  contentTypeIds: {
    drills: 'drills',
  }
}

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  public content;

  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  });

  constructor() { 
    this.getContentFromServer().subscribe(val => {
      this.content = val;
    })
  }

  getSelectedDrill(name) {
    if (!this.content) return {};

    const item = this.content
      .filter(val => val.fields['name'] === name)
      .map(val => ({
        id: val.fields['id'],
        name: val.fields['name'],
        description: val.fields['description'],
        techniques: val.fields['techniques']
      }))[0];
    return item;
  }


  getContentFromServer() {
    const promise = this.cdaClient.getEntries({ content_type: CONFIG.contentTypeIds.drills })
    return from(promise).pipe(map(val => {
      return val.items;
    }));
  }

  getDrills() {
    const promise = this.cdaClient.getEntries({ content_type: CONFIG.contentTypeIds.drills })
    return from(promise).pipe(map(val => val.items.map(val => val.fields['name'])), tap(console.log));
  }

  // ud = CONFIG.contentTypeIds.product
  getEntries(id, query?: object): Observable<Entry<any>[]> {
    // TODO: Double check this, because I updated to ES6 Spread
    return from(this.cdaClient.getEntries({ ...query, content_type: id })).pipe(map(entries => entries.items));
  }

  getEntry(id): Observable<any> {
    const promise = this.cdaClient.getEntry(id);
    return from(promise).pipe(map(entry => entry.fields));
  }
}