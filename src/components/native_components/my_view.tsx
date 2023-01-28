import React, { useEffect, useRef } from "react";
import { PixelRatio, UIManager, findNodeHandle, Dimensions } from "react-native";

import { MyViewManager } from "./index";

const {width,height}=Dimensions.get('screen')

const createFragment = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    UIManager.MyViewManager.Commands.create.toString(),
    [viewId]
  );

const MyView = ({ style = {} }) => {
  const ref = useRef(null);

  useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);

  return (
    <MyViewManager
      style={[
        {
          // converts dpi to px, provide desired height
          height: PixelRatio.getPixelSizeForLayoutSize(300),
          // converts dpi to px, provide desired width
          width: PixelRatio.getPixelSizeForLayoutSize(394),
        },
        { ...style },
      ]}
      ref={ref}
    />
  );
};

export default MyView;
