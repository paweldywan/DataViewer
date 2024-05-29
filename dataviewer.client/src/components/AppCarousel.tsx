import {
    Carousel,
    CarouselCaption,
    CarouselControl,
    CarouselIndicators,
    CarouselItem
} from "reactstrap";

import { AppCarouselItem } from "../interfaces";

import {
    CSSProperties,
    useState
} from "react";

interface Props {
    items: AppCarouselItem[];
    style?: CSSProperties | undefined
}

const AppCarousel = ({
    items,
    style,
    ...other
}: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;

        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;

        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;

        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;

        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex: number) => {
        if (animating) return;

        setActiveIndex(newIndex);
    };

    const slides = items.map(item => (
        <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.src}
        >
            <img
                src={item.src}
                alt={item.altText}
                className="img-fluid"
            />

            <CarouselCaption
                captionText={item.captionText}
                captionHeader={item.captionHeader}
            />
        </CarouselItem>
    ));

    return (
        <div style={style}>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                {...other}
                dark
            >
                <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                />

                {slides}

                <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                />

                <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                />
            </Carousel>
        </div>
    );
};

export default AppCarousel;