import { gsap } from 'gsap';
import { Item } from './item';
import { Preview } from './preview';

const body = document.body;

const contentEl = document.querySelector('.content');

const frameEl = document.querySelector('.frame');

const overlayRows = [...document.querySelectorALL('.overlay__row')];

const preview = [];
[...document.querySelectorALL('.preview')].forEach(preview => preview.push(new Preview(preview)));

const item = [];
[...document.querySelectorALL('.item')].forEach((item, pos) => item.push(new Item(item, preview[pos])));


const openItem = item => {

    gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power3.inOut'
        }
    })
    .add(() => {
        contentEl.classList.add('content--hidden');
    }, 'start')

    .addLabel('start', 0)
    .set([item.preview.DOM.innerElement, item.preview.DOM.backCtrl], {
        opacity: 0
    }, 'start')
    .to(overlayRows, {
        scaleY: 1
    }, 'start')

    .addLabel('content', 'start+=0.6')

    .add(() => {
        body.classList.add('preview-visible');

        gsap.set(frameEl, {
            opacity: 0
        }, 'start')
        item.Preview.DOM.el.classList.add('preview--current');
    }, 'content')
    .to([item.preview.DOM.image, item.preview.DOM.imageInner], {
        startAt: {y: pos => pos ? '101%' : '-101%'},
        y: '0%'
    }, 'content')

    .add(() => {
        for (const line of item.preview.multiLines) {
            line.in();
        }
        gsap.set(item.preview.DOM.multiLinesWrap, {
            opacity: 1,
            delay:0.1
        })
    }, 'content')

    .to(frameEl, {
        ease: 'expo',
        startAt: {y: '-100%', opacity: 0},
        opacity: 1,
        y: '0%'
    }, 'content+=0.3')
    .to(item.preview.DOM.innerElement, {
        ease: 'expo',
        startAt: {yPercent: 101},
        yPercent: 0,
        opacity: 1
    }, 'content+=0.3')
    .to(item.preview.DOM.backCtrl, {
        opacity: 1
    }, 'content')
};

const closeItem = item => {

    gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power3.inOut'
        }
    })
    .addLabel('start', 0)
    .to(item.preview.DOM.innerElement, {
        yPercent: -101,
        opacity: 0,
    }, 'start')
    .add(() => {
        for (const line of item.preview.multiLines) {
            line.out();
        }
    }, 'start')

    .to(item.preview.DOM.backCtrl, {
        opacity: 0
    }, 'start')

    .to(item.preview.DOM.image, {
        y: '101%'
    }, 'start')
    .to(item.preview.DOM.imageInner, {
        y: '-101%'
    }, 'start')

    .to(frameEl, {
        opacity: 0,
        y: '-100%',
        onComplete: () => {
            body.classList.remove('preview-visible');
            gsap.set(frameEl, {
                opacity: 1,
                y: '0%'
            })
        }
    }, 'start')

    .addLabel('grid', 'start+=0.6')

    .to(overlayRows, {
        //ease: 'expo'
        scaleY: 0,
        onComplete: () => {
            item.Preview.DOM.el.classList.remove('preview--current');
            contenEl.classList.remove('content--hidden');
        }
    }, 'grid')
};


for (const item of item) {
    item.DOM.link.addEventListener('click', () => openItem(item));

    item.preview.DOM.backCtrl.addEventListener('click', () => closeItem(item));
}