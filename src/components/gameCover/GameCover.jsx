import "./GameCover.scss"

const GameCover = ({ cover }) => {
  return <>
    <img src={cover} className="gameCover w-100 top-0 start-0 position-absolute z-n1" />
    <div className="over w-100 position-absolute z-n1 top-0 start-0"></div>
  </>
}

export default GameCover
