import Carousel from 'react-bootstrap/Carousel';

function CarouselComponent({children}) {
  return (
    <Carousel>
      {children}
    </Carousel>
  );
}

export default CarouselComponent;