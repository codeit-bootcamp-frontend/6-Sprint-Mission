import React from 'react';
import styled from 'styled-components';

type IconProps = {
  iconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: number;
  fillColor?: string;
  outlineColor?: string;
};

const IconWrapper = styled.div<{
  $size?: number;
  $fillColor?: string;
  $outlineColor?: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${({ $fillColor }) => $fillColor || 'current'}; // 색 채움
    width: ${({ $size }) => ($size ? `${$size}px` : 'auto')};
    height: ${({ $size }) => ($size ? `${$size}px` : 'auto')};
  }

  svg path {
    stroke: ${({ $fillColor, $outlineColor }) => $fillColor || $outlineColor || 'currentColor'};
  }
`;

const Icon = ({ iconComponent: IconComponent, size, fillColor, outlineColor }: IconProps) => (
  <IconWrapper $size={size} $fillColor={fillColor} $outlineColor={outlineColor}>
    <IconComponent />
  </IconWrapper>
);

export default Icon;
