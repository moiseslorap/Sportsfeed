import { Component } from '@angular/core';

import { NbaPage } from '../../pages/nba/nba';
import { MlbPage } from '../../pages/mlb/mlb';
import { NflPage } from '../../pages/nfl/nfl';
import { NewsPage } from '../../pages/news/news';
import { FavoritesPage } from '../../pages/favorites/favorites';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NewsPage;
  tab2Root = NbaPage; 
  tab3Root = MlbPage; 
  tab4Root = NflPage;
  tab5Root = FavoritesPage;

  constructor() {

  }
}
