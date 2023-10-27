import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { Article } from '../../interfaces/index';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article:Article;
  @Input() index: number;

  constructor(
    private iab: InAppBrowser,
    private platform:Platform,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService:StorageService,
  ) { }

  openArticle() {

    if ( this.platform.is('ios') || this.platform.is('android') ) {
      const browser = this.iab.create( this.article.url );
      browser.show();
      return;
    }

    window.open( this.article.url, '_blank' );
  }

  async onOpenMenu() {

    const articleInFavorite = this.storageService.articleIFavorites( this.article );

    const buttons: ActionSheetButton[] = [
      {
        text: articleInFavorite ? 'Eliminar de favoritos' : 'Favorito',
        icon: articleInFavorite ? 'heart' : 'heart-outline',
        handler: () => this.onToogleFavorite()
      }, {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
      }];

    const shareBtn: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArtilce()
    };

    if ( this.platform.is('capacitor') ) {
      buttons.unshift(shareBtn);
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: buttons,
    });



    await actionSheet.present();
  }


  onShareArtilce() {
    console.log('Estamos en onShareArtilce')
    const { title, source, url } = this.article;

    console.log('title: ' + title + 'source: ' + source + 'url: ' + url )

    this.socialSharing.share(
      title,
      source.name,
      undefined,
      url,
    )
  }

  onToogleFavorite() {
    this.storageService.saveRemoveArticle(this.article);
  }
}
