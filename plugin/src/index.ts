import { ConfigPlugin, withPlugins } from "@expo/config-plugins";
import {
  AndroidProps,
  withAndroidAppCenterConfigFile,
  withAppCenterStringsXML,
} from "./android";

import { withAppCenterAppDelegate, withIosAppCenterConfigFile } from "./ios";

interface PluginProps {
  iosAppSecret: string;
  androidAppSecret: string;
  androidOptions?: AndroidProps;
}

/**
 * A config plugin for configuring `appcenter`
 */
const withAppCenter: ConfigPlugin<PluginProps> = (
  config,
  { iosAppSecret, androidAppSecret, androidOptions = {} }
) => {
  if(!iosAppSecret && !androidAppSecret)
    throw new Error("Please provide an `iosAppSecret` and `androidAppSecret`")
  else if(!iosAppSecret)
    throw new Error("Please provide an `iosAppSecret`")
  else if(!androidAppSecret)
    throw new Error("Please provide an `androidAppSecret`")
  else return withPlugins(config, [
    // iOS
    withAppCenterAppDelegate,
    [
      withIosAppCenterConfigFile,
      {
        iosAppSecret: iosAppSecret,
      },
    ],
    // Android
    [withAppCenterStringsXML, androidOptions],
    [
      withAndroidAppCenterConfigFile,
      {
        androidAppSecret: androidAppSecret,
      },
    ],
  ]);
};

export default withAppCenter;
