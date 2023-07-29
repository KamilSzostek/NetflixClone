import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';

interface IInjectedIconProps {
    icon: IconDefinition,
    container: Element
    classes?: string
}

const InjectedIcon: React.FunctionComponent<IInjectedIconProps> = ({classes, icon, container}) => {
    return ReactDOM.createPortal((<FontAwesomeIcon className={classes} icon={faPlus}/>), container)
};

export default InjectedIcon;
