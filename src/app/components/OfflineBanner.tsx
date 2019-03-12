import { Box, Layer, Text } from "grommet";
import React from "react";
import useNetwork from "react-use/lib/useNetwork";

const OfflineBanner: React.FC = () => {
  const network = useNetwork();
  // Layer cannot be rendered in ssr, there we need to prevent it when online status is not defined
  if (network.online === undefined) {
    return null;
  }
  return (
    <Layer
      position={network.online ? "hidden" : "bottom"}
      full="horizontal"
      responsive={false}
      modal={false}
    >
      <Box
        direction="row"
        justify="center"
        align="center"
        background="accent-4"
        pad="medium"
        fill={true}
        basis="full"
      >
        <Text>Application is running in offline mode</Text>
      </Box>
    </Layer>
  );
};

export default OfflineBanner;
