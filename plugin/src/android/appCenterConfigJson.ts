import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import fs from "fs/promises";
import path from "path";

/**
 * Copy `appcenter-config.json`
 */
export const withAndroidAppCenterConfigFile: ConfigPlugin<{
  androidAppSecret: string;
}> = (config, { androidAppSecret }) => {
  const androidAppCenterConfigContents = JSON.stringify({"app_secret": androidAppSecret });

  return withDangerousMod(config, [
    "android",
    async (config) => {
      await fs.writeFile(
        path.join(config.modRequest.platformProjectRoot, "app/src/main/assets/appcenter-config.json"), 
        androidAppCenterConfigContents
      )
      return config;
    }
  ])
};
