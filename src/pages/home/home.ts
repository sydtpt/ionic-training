import { PostService } from './../../providers/post.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostPage } from '../post/post';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    posts ;

    constructor(public navCtrl: NavController,private postsService: PostService,  private sanitizer: DomSanitizer) {

    }

    ionViewDidLoad(){
        this.postsService.getPosts().subscribe(
            res => {
                this.posts = res;
                console.log(res);
            }
        );
    }

    navigate(type: string) {


        if(type === 'camera'){

        }

        this.navCtrl.push(PostPage,{type: type, parametro: '1'});
    }

}
