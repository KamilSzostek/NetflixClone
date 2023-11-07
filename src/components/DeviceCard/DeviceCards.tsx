import { FC, useRef } from 'react';
import Image from 'next/image';

import styles from './DeviceCard.module.scss'

export interface IDevice {
    _id: string,
    name: string,
    icon: string,
    description: string
}

interface IDeviceCardProps {
    device: IDevice
}

const DeviceCard: FC<IDeviceCardProps> = ({ device }) => {
    const { name, icon, description } = device
    const deviceRef = useRef<HTMLDivElement>(null)

    return (
        <div className={styles.device} ref={deviceRef} onClick={()=>{
            deviceRef.current?.classList.toggle(`${styles.selectedDevice}`)
        }}>
            <Image src={icon} alt={name} width={150} height={150} priority/>
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    );
};

export default DeviceCard;
