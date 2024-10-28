import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BrandComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <StyledWrapper>
      <button className="button me-2" data-text="Awesome" onClick={() => {
        navigate("/home")
        dispatch({ type: "PAGE", payload: 1 })
        dispatch({
          type: "SEARCH", payload: ""
        })
      }
      }
      >
        <span className="actual-text">&nbsp;Power <span className='up'>Up</span>&nbsp;</span>
        <span aria-hidden="true" className="hover-text">&nbsp;Power Up&nbsp;</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* === removing default button style ===*/
  .button {
    margin: 0;
    height: auto;
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
  }

  /* button styling */
  .button {
    --text-stroke-color: rgba(255,255,255,0.6);
    --border-right: 1px;
    --animation-color: #37FF8B;
    --fs-size: 2em;
    padding: 0px;
    width: 4.5em; 
    letter-spacing: 3px;
    text-decoration: none;
    font-size: var(--fs-size);
    font-family: "Bebas Neue", sans-serif;
    position: relative;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: 1px var(--text-stroke-color);
  }
  .up{
   color: #1ad214;
   -webkit-text-stroke: 0px;
  }
  /* this is the text, when you hover on button */
  .hover-text {
    position: absolute;
    box-sizing: border-box;
    content: attr(data-text);
    color: var(--animation-color);
    width: 0%;
    inset: 0;
    border-right: var(--border-right) solid #1ad214; 
    overflow: hidden;
    transition: 0.5s;
    -webkit-text-stroke: 1px var(--animation-color);
  }
  /* hover */
  .button:hover .hover-text {
    width: 100%;
    filter: drop-shadow(0 0 23px var(--animation-color))
  }`;

export default BrandComponent;
