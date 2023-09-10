/* eslint-disable require-jsdoc */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/header.scss';

export function Header() {
  return (
    <div className="headerContainer">
      <div className='headerLeft'>
        <FontAwesomeIcon icon={faClock} style={{color: '#ffffff'}} /> Pomoclone
      </div>
      <div className='headerRight'>
        <button> <FontAwesomeIcon icon={faChartColumn} style={{color: '#ffffff'}} /> Stats </button>
        <button> <FontAwesomeIcon icon={faGear} style={{color: '#ffffff'}} /> Settings </button>
        <button> <FontAwesomeIcon icon={faUser} style={{color: '#ffffff'}} /> Login </button>
      </div>
    </div>
  );
}
