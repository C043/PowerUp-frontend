import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchComponent = () => {
  const [search, setSearch] = useState("")
  const [focused, setFocused] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch({ type: "SEARCH", payload: search })
    dispatch({ type: "PAGE", payload: 1 })
    navigate("/home")
  }

  return (
    <Form className="w-100 me-3 p-0" onSubmit={ev => handleSubmit(ev)}>
      <StyledWrapper>
        <div className="container p-0">
          <input
            type="text"
            value={search}
            onChange={ev => setSearch(ev.target.value)}
            name="text"
            className={focused ? "input focused" : "input"}
            placeholder="Type to search..."
          />
          <div className="icon" onClick={() => {
            if (focused) setFocused(false)
            else setFocused(true)
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
              <title>Search</title>
              <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit={10} strokeWidth={32} />
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={32} d="M338.29 338.29L448 448" />
            </svg>
          </div>
        </div>
      </StyledWrapper>
    </Form>
  );
}

const StyledWrapper = styled.div`
  .container {
    position: relative;
    --size-button: 50px;
    color: white;
  }

  .input {
    padding-left: var(--size-button);
    height: var(--size-button);
    font-size: 15px;
    border: none;
    color: #fff;
    outline: none;
    width: var(--size-button);
    transition: all ease 0.3s;
    background-color: #191A1E;
    box-shadow: 1.5px 1.5px 3px #1ad214, -1.5px -1.5px 3px rgb(95 94 94 / 25%), inset 0px 0px 0px #0e0e0e, inset 0px -0px 0px #5f5e5e;
    border-radius: 50px;
    cursor: pointer;
  }

  .input:focus,
  .focused{
    width: 100%;
    cursor: text;
    box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 1.5px 1.5px 3px #0e0e0e, inset -1.5px -1.5px 3px #1ad214;
  }

  .input:focus + .icon,
  .input:not(:invalid) + .icon {
    pointer-events: all;
    cursor: pointer;
  }

  .container .icon {
    position: absolute;
    width: var(--size-button);
    height: var(--size-button);
    top: 0;
    padding: 8px;
    pointer-events: none;
  }

  .container .icon svg {
    width: 100%;
    height: 100%;
  }`;

export default SearchComponent;

