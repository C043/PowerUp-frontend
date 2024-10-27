import styled from 'styled-components';

const ButtonComponent = ({ text }) => {
  return (
    <StyledWrapper>
      <button> {text}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button,
  button::after {
   padding: 16px 20px;
   font-size: 18px;
   background: linear-gradient(45deg, transparent 5%, #1ad214 5%);
   border: 0;
   color: #fff;
   letter-spacing: 3px;
   line-height: 1;
   box-shadow: 6px 0px 0px #a997df;
   outline: transparent;
   position: relative;
  }

  button::after {
   --slice-0: inset(50% 50% 50% 50%);
   --slice-1: inset(80% -6px 0 0);
   --slice-2: inset(50% -6px 30% 0);
   --slice-3: inset(10% -6px 85% 0);
   --slice-4: inset(40% -6px 43% 0);
   --slice-5: inset(80% -6px 5% 0);
   content: "HOVER ME";
   display: block;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: linear-gradient(45deg, transparent 3%, #1ad214 3%, #1ad214 5%, #1ad214 5%);
   text-shadow: -3px -3px 0px #f8f005, 3px 3px 0px #00e6f6;
   clip-path: var(--slice-0);
  }

  button:hover::after {
   animation: 1s glitch;
   animation-timing-function: steps(2, end);
  }

  @keyframes glitch {
   0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
   }

   10% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
   }

   20% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
   }

   30% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
   }

   40% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
   }

   50% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
   }

   60% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
   }

   70% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
   }

   80% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
   }

   90% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 0px);
   }

   100% {
    clip-path: var(--slice-1);
    transform: translate(0);
   }
  }`;

export default ButtonComponent;
