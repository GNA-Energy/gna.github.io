
var banner_slider = new Splide( '.bannerSlider', {
// type   : 'loop',
// padding: '5rem',
perPage: 1,
perMove: 1,
pagination: false,
breakpoints: {
    767: {
    // destroy: true,
    // label  : 'My Gallery', // Used after destruction
    
    }
}
} );

banner_slider.mount();

var why_us_slider = new Splide( '.whyUsSlider', {
// type   : 'loop',
// padding: '15rem',
gap: 20,
perPage: 2,
perMove: 1,
pagination: false,
breakpoints: {
    1024: {
        perPage: 1,
    
        },
    800: {
        perPage: 1,
    
        },
    767: {
        perPage: 1,
    
        },
    768: {
    // destroy: true,
    // label  : 'My Gallery', // Used after destruction
    perPage: 1,
    padding: '6rem',
    // gap: '-10px',
        },
    
    }
} );

why_us_slider.mount();
