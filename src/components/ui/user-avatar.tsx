import React from 'react';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-12 h-12 text-base'
};

const colorVariants = [
  'bg-blue-500 text-white',
  'bg-green-500 text-white',
  'bg-purple-500 text-white',
  'bg-pink-500 text-white',
  'bg-indigo-500 text-white',
  'bg-yellow-500 text-white',
  'bg-red-500 text-white',
  'bg-orange-500 text-white',
  'bg-teal-500 text-white',
  'bg-cyan-500 text-white'
];

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  firstName = '', 
  lastName = '', 
  email = '',
  className,
  size = 'md'
}) => {
  // Get initials from name
  const getInitials = () => {
    const firstInitial = firstName?.charAt(0).toUpperCase() || '';
    const lastInitial = lastName?.charAt(0).toUpperCase() || '';
    return firstInitial + lastInitial || email?.charAt(0).toUpperCase() || '?';
  };

  // Generate consistent color based on user data
  const getColorVariant = () => {
    const identifier = `${firstName}${lastName}${email}`.toLowerCase();
    let hash = 0;
    for (let i = 0; i < identifier.length; i++) {
      hash = ((hash << 5) - hash + identifier.charCodeAt(i)) & 0xffffffff;
    }
    return colorVariants[Math.abs(hash) % colorVariants.length];
  };

  return (
    <div 
      className={cn(
        'rounded-full flex items-center justify-center font-medium',
        sizeClasses[size],
        getColorVariant(),
        className
      )}
    >
      {getInitials()}
    </div>
  );
};