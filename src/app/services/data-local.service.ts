import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;

  noticias: Article[] = [];

  constructor(private storage: Storage, public toastController: ToastController) {
    this.init();

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }



  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;
    this.cargarFavoritos();
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  guardarNoticia(noticia: Article) {

    const existe = this.noticias.find(noti => noti.title === noticia.title);
    if (!existe) {
      this.noticias.unshift(noticia);
      this.set('favoritos', this.noticias);
    }

    this.presentToast('Agregado a favoritos');

  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(noticia => noticia.title !== noticia.title);
    this.set('favoritos', this.noticias);
    this.presentToast('Borrado de favoritos');
  }

  async cargarFavoritos() {
    const favoritos = await this._storage.get('favoritos');
    if (favoritos) {
      this.noticias = favoritos;
    }
  }

}
