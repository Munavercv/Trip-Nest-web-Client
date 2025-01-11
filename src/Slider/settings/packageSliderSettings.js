import React from "react";

export const CustomLeftArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            style={{
                display: "block",
                background: "var(--primary-color)",
                padding: "10px 17px",
                borderRadius: "50%",
                position: "absolute",
                left: "-10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            <i className="fa fa-chevron-left" style={{ color: "white" }}></i>
        </div>
    );
};

export const CustomRightArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            style={{
                display: "block",
                background: "var(--primary-color)",
                padding: "10px 17px",
                borderRadius: "100%",
                position: "absolute",
                right: "-10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            <i className="fa fa-chevron-right" style={{ color: "white" }}></i>
        </div>
    );
};

// Slider Settings
export const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomRightArrow />,
    prevArrow: <CustomLeftArrow />,
    responsive: [
        {
            breakpoint: 1200, // For screens <1200px
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 992, // For screens <992px
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 576, // For screens <576px
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};
