$(document).ready(function () {

    $(".slider").on("init", function (event, slick) {
        $(".count").text(parseInt(slick.currentSlide + 1) + ' / ' + slick.slideCount);
    });

    $(".slider").on("afterChange", function (event, slick, currentSlide) {
        $(".count").text(parseInt(slick.currentSlide + 1) + ' / ' + slick.slideCount);
    });


    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: true,
        arrows: true,
        appendDots: '.count',
        appendArrows: '.arrows-container',
        prevArrow: $('.prev'),
        nextArrow: $('.next'),


        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    appendDots: '.dots',
                }
            }
        ]
    });

    $('.slider-concern').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        variableWidth: true,
        dots: false,
        infinite: true,
        arrows: false,
    });
    $('.slider-apartments').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        infinite: false,
        arrows: true,
        appendDots: '.dots-appartments',
        appendArrows: '.arrow-slider',
        prevArrow: $('.prev-appartment'),
        nextArrow: $('.next-appartment'),
        customPaging: function (slider, i) {
            var title = $(slider.$slides[i]).data('number');
            return '<a> ' + title + ' </a>';
        },
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    appendDots: '.dots-appartments_mobile',
                    customPaging: function (slider, i) {
                        return
                    },
                }

            }
        ]
    });

});

const iconMenu = document.querySelector('.menu-btn')
const modalMenu = document.querySelector('.modal-menu')
const contentMenu = document.querySelector('.menu-content')

const btnNenu = document.querySelector('.menu-btn')
btnNenu.addEventListener('click', () => {
    modalMenu.classList.add('open')
    modalMenu.querySelector('.close-btn').addEventListener('click', () => {
        modalMenu.classList.remove('open')
    })
})

document.addEventListener('click', e => {
    let target = e.target;
    let its_menu = target == contentMenu || contentMenu.contains(target);
    let its_hamburger = target == iconMenu || iconMenu.contains(target);
    let menu_is_active = modalMenu.classList.contains('open');

    if (!its_menu && !its_hamburger && menu_is_active) {
        modalMenu.classList.toggle('open');
    }
})


let selectHeader = document.querySelectorAll('.select-header')
let selectItem = document.querySelectorAll('.select-item')

selectHeader.forEach(item => {

    item.addEventListener('click', function (e) {
        document.querySelectorAll('.select.filter.active').forEach(it => {
            it.classList.remove('active')
        })
        e.target.parentElement.classList.toggle('active')
    })
})

let count = 0;

const createSelectedFilter = (text) => {
    const selectedFilter = document.createElement('div')
    selectedFilter.classList.add('selected-filter')

    const value = document.createElement('span')
    value.innerText = text
    selectedFilter.appendChild(value)

    const icon = document.createElement('div')
    icon.classList.add('close-icon')
    const img = document.createElement('img')
    img.src = "assets/img/close-selected.svg"

    icon.appendChild(img)
    selectedFilter.appendChild(icon)
    const selectedFiltersBlock = document.querySelector('.selected-filters')
    const filters = document.querySelectorAll('.selected-filter')
    icon.addEventListener('click', function () {
        selectedFilter.remove()
        count = count - 1
        if (filters.length === 0) {
            selectedFiltersBlock.classList.remove('selected')
        }
    })


    selectedFiltersBlock.classList.add('selected')

    const btnClearAll = document.querySelector('.clear-all')
    selectedFiltersBlock.insertBefore(selectedFilter, btnClearAll)
    count = count + 1

    btnClearAll.addEventListener('click', function () {
        const filters = document.querySelectorAll('.selected-filter')
        filters.forEach(item => {
            item.remove()
            selectedFiltersBlock.classList.remove('selected')
        })
    })
}
selectItem.forEach(item => {
    item.addEventListener('click', function () {
        let text = item.innerText,
            select = item.closest('.select'),
            currentText = select.querySelector('.select-current')
        currentText.innerText = text

        if (window.innerWidth < 560) {


            createSelectedFilter(text)

            document.querySelector('.count-filters').innerText = count
        }


        select.classList.remove('active')
    })
})

let countRoomItem = document.querySelectorAll('.room-item')

countRoomItem.forEach(item => {
    item.addEventListener('click', function () {
        item.classList.toggle('active')

        createSelectedFilter(item.innerText)
    })
})

const addRangeSlider = (rangeSlider, min, max, numberSigns) => {
    var formatForSlider = {
        from: function (formattedValue) {
            return Number(formattedValue);
        },
        to: function (numericValue) {
            return Math.round(numericValue);
        }
    };
    noUiSlider.create(rangeSlider, {
        start: [min, max],
        connect: true,
        range: {
            'min': min,
            'max': max
        },
        format: formatForSlider,
        tooltips: {
            to: function (numericValue) {
                return numericValue.toFixed(numberSigns);
            }
        }
    });

}
const rangeSliderFloor = document.getElementById('range-slider_floor');
const rangeSliderSquare = document.getElementById('range-slider_square');
const rangeSliderPrice = document.getElementById('range-slider_price');
addRangeSlider(rangeSliderFloor, 1, 16, 0)
addRangeSlider(rangeSliderSquare, 24, 60, 0)
addRangeSlider(rangeSliderPrice, 4.1, 12.4, 1)

const extendedBtn = document.querySelector('.btn-extended')
const extendedFilters = document.querySelectorAll('.extended')

extendedBtn.addEventListener('click', function () {
    extendedFilters.forEach(item => {
        item.classList.toggle('open')
    })
    extendedBtn.querySelector('.icon').classList.toggle('open')
})

if (window.innerWidth < 560) {
    extendedFilters.forEach(item => {
        item.classList.remove('extended')
    })
}

const btnFilters = document.querySelector('.btn-filters')
const filters = document.querySelector('.filters')

btnFilters.addEventListener('click', function () {
    filters.classList.toggle('open')
})

let filterLocation = document.querySelector('.location')
let btnsLocation = document.querySelectorAll('.location-item')

filterLocation.addEventListener('click', function (e) {
    btnsLocation.forEach(item => {
        item.classList.remove('active')
    })
    e.target.classList.toggle('active')
})

const btnPlayVideo = document.querySelectorAll('.btn-play_video')

btnPlayVideo.forEach(item => {
    item.addEventListener('click', function () {
        const video = item.closest('.video-wrapper').querySelector('#video')
        video.play()
        item.classList.toggle('close')
        video.addEventListener('click', function () {
            video.pause()
            item.classList.remove('close')
        })
    })
})