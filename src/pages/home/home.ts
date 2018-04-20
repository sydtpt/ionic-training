import { Post } from './../../models/Post';
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
    posts: Post[] = [];
    last: string;
    hasNext:boolean;
    isLoading:boolean;
    constructor(public navCtrl: NavController, private postsService: PostService, private sanitizer: DomSanitizer) {

    }

    ionViewDidLoad() {
        this.getPosts();
    }

    getPosts(event?) {
        this.postsService.getPosts().subscribe(
            posts => {
                this.posts = posts;
                if (posts.length > 0) {
                    this.last = posts[posts.length - 1].createdAt;
                    this.hasNext =true;
                }else{

                }
                if (event) {
                    event.complete();
                }
            });
    }

    getMorePosts(event) {
        this.postsService.getPosts(this.last).subscribe(
            posts => {
                if (posts.length > 0) {
                    this.last = posts[posts.length - 1].createdAt;
                    this.hasNext =true;
                }else{
                    this.hasNext =false;
                }
                for(let post of posts){
                    this.posts.push(post);
                }
                if (event) {
                    event.complete();
                }
            });

    }

    navigate(type: string) {
        this.navCtrl.push(PostPage, { type: type, parametro: '1' });
    }
}
