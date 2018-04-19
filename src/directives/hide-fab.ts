import { Directive, ElementRef, Renderer, ViewChild, ContentChild } from '@angular/core';
import { Content, ViewController, FabButton } from "ionic-angular";
@Directive({
    selector: '[hide-fab]',
    host: {
        '(ionScroll)': 'handleScroll($event)'
    }
})
export class HideFabDirective {
    private fabRef;
    private storedScroll: number = 0;
    private threshold: number = 10;
    @ContentChild('fab') fab;

    constructor(public element: ElementRef, public renderer: Renderer) {
        console.log('Hello HideFabDirective Directive');
    }

    ngAfterViewInit() {
        this.fabRef = this.element.nativeElement.getElementsByClassName("fab")[0];
        this.renderer.setElementStyle(this.fabRef, 'webkitTransition', 'transform 500ms,top 500ms');
    }

    handleScroll(event: Content) {
        if (event.scrollTop - this.storedScroll > this.threshold) {
            //scroll up
            this.renderer.setElementStyle(this.fabRef, 'top', '60px');
            this.renderer.setElementStyle(this.fabRef, 'webkitTransform', 'scale3d(.1,.1,.1)');
        } else if (event.scrollTop - this.storedScroll < 0) {
            //scroll down

            this.renderer.setElementStyle(this.fabRef, 'top', '0');
            this.renderer.setElementStyle(this.fabRef, 'webkitTransform', 'scale3d(1,1,1)');
        }
        // console.log(event.scrollTop - this.storedScroll);
        this.storedScroll = event.scrollTop;
        if(this.fab)
            this.fab.close();

    }
}
