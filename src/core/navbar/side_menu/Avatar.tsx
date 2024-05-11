import Image from 'next/image';
import { Router } from 'next/router';
import React from 'react'

type AvatarProps = {
    path: string;
    size: number;
    className?: string;
    alt?: string;
    onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
    path,
    size,
    className,
    onClick,
    alt
}) => {
    return (
        <div>
            <Image onClick={onClick} src={path} width={size} height={size} className={className} alt={alt || "image"} />
        </div>
    );
};

export default Avatar