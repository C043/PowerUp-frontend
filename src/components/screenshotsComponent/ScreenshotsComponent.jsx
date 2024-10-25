import { Carousel } from "react-bootstrap"

const ScreenshotsComponent = ({ screenshots }) => {
  return <Carousel>
    {screenshots.map(screen => {
      <Carousel.Item key={screen.id}>
        <img src={screen.image} />
      </Carousel.Item>
    })}
  </Carousel>
}

export default ScreenshotsComponent
