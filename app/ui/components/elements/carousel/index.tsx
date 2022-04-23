import { FileDto } from "../../../../types/dtos/remote-file.dtos";
import Slider from "react-slick";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
/**
 * common attachment Carousel component
 */
interface AttachmentCarouselProps {
  files: FileDto[];
}

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export function AttachmentCarousel(props: AttachmentCarouselProps) {
  const [, setSlider] = useState<Slider | null>(null);
  return (
    <Box
      position={"relative"}
      height={"600px"}
      width={"full"}
      overflow={"hidden"}
    >
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            { props.files.map((f,index)=>{
                if(f.metadata.type === 'image'){
                    return <Box
                      key={index}
                      height={'6xl'}
                      position="relative"
                      backgroundPosition="center"
                      backgroundRepeat="no-repeat"
                      backgroundSize="cover"
                      backgroundImage={`url(${f.path})`}
                  />
                } else if( f.metadata.type === 'pdf') {
                    // TODO: Render PDF
                } else {
                    return null;
                }
            })

            }
            </Slider>
    </Box>
  );
}
