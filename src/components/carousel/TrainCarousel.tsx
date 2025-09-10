/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight } from "react-icons/fa";
import styles from "./TrainCarousel.module.css";
import { useAppSelector } from "../../store/hooks/react-redux/hook";
import { selectRecentSearches } from "../../store/train/trainSlice/trainSlice";
import { useNavigate } from "react-router-dom";

const TrainCarousel = () => {
  const stationMap: Record<string, string> = {
    "New Delhi": "NDLS",
    "Mumbai Central": "BCT",
    Chandigarh: "CDG",
    Bangalore: "SBC",
    Ernakulam: "ERS",
    Trivandrum: "TVC",
    Amritsar: "ASR",
    Bhopal: "BPL",
    Sealdah: "SDAH",
    Ahmedabad: "ADI",
    Kalka: "KLK",
    Howrah: "HWH",
    Bhubaneswar: "BBS",
    "Agra Cantt": "AGC",
    Mysore: "MYS",
  };

  const recentSearches = useAppSelector(selectRecentSearches);
  const navigate = useNavigate();

  // Determine if we're on mobile or desktop
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Settings for the slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: true,
    centerPadding: "10px",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "30px",
        },
      },
    ],
  };

  const handleSearchClick = (train: any) => {
    const from = train.source;
    const to = train.destination;
    const date = train.date || "";
    const travelClass = train.travelClass || "All Classes";
    const quota = train.quota || "General";

    navigate(
      `/train-search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
        to
      )}&date=${encodeURIComponent(date)}&class=${encodeURIComponent(
        travelClass
      )}&quota=${encodeURIComponent(quota)}`
    );
  };

  if (!recentSearches || recentSearches.length === 0) {
    return null; // Don't render anything if no recent searches
  }

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.heading}>Recent Searches</h2>
      <Slider {...settings} className={styles.carousel}>
        {recentSearches.map((search, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => handleSearchClick(search)}
          >
            <div className={styles.trainRoute}>
              <span className={styles.stationCode}>
                {stationMap[search.source] || "N/A"}
              </span>
              <span className={styles.arrow}>
                <FaArrowRight />
              </span>
              <span className={styles.stationCode}>
                {stationMap[search.destination] || "N/A"}
              </span>
            </div>
            <div className={styles.stationNames}>
              <span>{search.source}</span>
              <span>{search.destination}</span>
            </div>
            <div className={styles.tripDetails}>
              <span className={styles.date}>{search.train_name}</span>
              <span className={styles.classType}>{search.train_number}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrainCarousel;
