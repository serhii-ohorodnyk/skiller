import AppIcon from "app/components/AppIcon";
import { styled } from "app/styles";

export const LayoutContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled(AppIcon)`
  fill: ${({ theme }) => theme.global.colors.brand};
`;
