import { TextLinesReveal } from '.textLinesReveal';

export class Preview {
    DOM = {
        // main element (.preview)
		el: null,
		// image element (.preview__img)
		image: null,
		// image inner element (.preview__img-inner)
		imageInner: null,
		// title
		title: null,
		// backCtrl
		backCtrl: null,

		// oh__inner elements
		innerElements: null,
		multiLineWrap: null,
    };
    multiLines = [];


    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.DOM.image = this.DOM.el.querySelector('.preview__img');
        this.DOM.imageInner = this.DOM.el.querySelector('.preview__img-inner');
        this.DOM.title = this.DOM.el.querySelector('.preview--title');
        this.DOM.backCtrl = this.DOM.el.querySelector('.preview__back');

        this.DOM.innerElements = [...this.DOM.el.querySelectorALL('.oh__inner')];

        this.DOM.multiLineWrap = [...this.DOM.el.querySelectorALL('.preview__column > p')];
        this.DOM.multiLineWrap.forEach(line => this.multiLines.push(new TextLinesReveal(line)));
    }
}