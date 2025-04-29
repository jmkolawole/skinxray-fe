import {IconWrapper} from '../Icon.style';

export const Lock = ({...rest}) => (
  <IconWrapper {...rest}>
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 7H15V5C15 2.79086 13.2091 1 11 1C8.79086 1 7 2.79086 7 5V7H5C3.89543 7 3 7.89543 3 9V17C3 18.1046 3.89543 19 5 19H17C18.1046 19 19 18.1046 19 17V9C19 7.89543 18.1046 7 17 7Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 5C8 3.34315 9.34315 2 11 2C12.6569 2 14 3.34315 14 5V7H8V5Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="11"
        cy="13"
        r="2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);
