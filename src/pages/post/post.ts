import { PostService } from './../../providers/post.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
    selector: 'page-post',
    templateUrl: 'post.html',
})
export class PostPage {
    legend: string = '';
    maxSizeComment = 50;
    photo: string;
    shareInstagram: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private camera: Camera,
        private imagePicker: ImagePicker,
        private base64: Base64,
        private postService: PostService,
        private loadingController: LoadingController,
        private sanitizer: DomSanitizer,
        private socialSharing: SocialSharing,
        public actionSheetCtrl: ActionSheetController
    ) {
        let tipo = navParams.get('type');
    }

    ionViewDidLoad() {
        let param = this.navParams.get('type');
        if (param === 'camera') {
            this.takePicture();
        } else {
            this.selectPicure();
        }
    }

    post() {
        let loading = this.loadingController.create({});
        loading.present();
        this.postService.postPhoto({
            image: this.photo,
            legend: this.legend
        }).subscribe(res => {
            if (this.shareInstagram) {
                this.socialSharing.shareViaInstagram(this.legend, this.photo).then(res => {
                    console.log(res);
                    loading.dismiss();
                    this.navCtrl.pop();
                }).catch(err => {
                    console.log(err);
                    loading.dismiss();
                });
            } else {
                loading.dismiss();
                this.navCtrl.pop();
            }
        }, error => {
            loading.dismiss();
        });
    }

    private takePicture() {
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true
        };
        this.camera.getPicture(options).then((imageData) => {
            this.photo = 'data:image/jpeg;base64,' + imageData;

        }, (err) => {
            console.log(err);
        });
    }

    selectPicure() {
        let options: ImagePickerOptions = {
            maximumImagesCount: 1
        };
        this.imagePicker.getPictures(options).then((image) => {
            this.base64.encodeFile(image[0]).then(
                base64image => {
                    this.photo = base64image;
                }).catch(
                    err => {
                        console.log(err);
                    });
        }, (err) => {
            console.log(err);
        });
    }

    showPostOptions() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Abrir com',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: () => {
                        this.takePicture();
                    }
                }, {
                    text: 'Selecionar do álbum',
                    icon: 'folder',
                    handler: () => {
                        this.selectPicure();
                    }
                }, {
                    text: 'Cancelar',
                    icon: 'close',
                    cssClass: 'action-sheet-cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }
}
