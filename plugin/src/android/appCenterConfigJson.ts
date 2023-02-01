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
      const androidAssetsPath = path.join(config.modRequest.platformProjectRoot, "app/src/main/assets");

      if(!await fileOrFolderExists(androidAssetsPath)) {
        await fs.mkdir(androidAssetsPath, { recursive: true });
      }

      await fs.writeFile(
        path.join(androidAssetsPath, "appcenter-config.json"), 
        androidAppCenterConfigContents
      )
      return config;
    }
  ])
};

/** Returns whether or not a file or folder exists */
async function fileOrFolderExists(filename: string) {
  try {
    await fs.access(filename);
    return true;
  } catch (err) {
    if ((err as any).code === "ENOENT") {
      return false;
    } else {
      throw err;
    }
  }
}
