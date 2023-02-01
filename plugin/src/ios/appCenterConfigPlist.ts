import {
  ConfigPlugin,
  withXcodeProject,
  XcodeProject,
} from "@expo/config-plugins";
import { getSourceRoot } from "@expo/config-plugins/build/ios/Paths";
import {
  addResourceFileToGroup,
  getProjectName,
} from "@expo/config-plugins/build/ios/utils/Xcodeproj";
import fs from "fs";
import path from "path";

export const withIosAppCenterConfigFile: ConfigPlugin<{
  iosAppSecret: string;
}> = (config, { iosAppSecret }) => {
  return withXcodeProject(config, (config) => {
    config.modResults = setAppCenterConfigFile({
      projectRoot: config.modRequest.projectRoot,
      project: config.modResults,
      iosAppSecret,
    });
    return config;
  });
};

export function setAppCenterConfigFile({
  projectRoot,
  project,
  iosAppSecret,
}: {
  project: XcodeProject;
  projectRoot: string;
  iosAppSecret: string;
}): XcodeProject {
  const iosAppCenterConfigContents = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "https://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
    <key>AppSecret</key>
    <string>${iosAppSecret}</string>
    </dict>
</plist>
`.trim();

  fs.writeFileSync(path.join(getSourceRoot(projectRoot), "AppCenter-Config.plist"), iosAppCenterConfigContents)

  const projectName = getProjectName(projectRoot);
  const plistFilePath = `${projectName}/AppCenter-Config.plist`;
  if (!project.hasFile(plistFilePath)) {
    project = addResourceFileToGroup({
      filepath: plistFilePath,
      groupName: projectName,
      project,
      isBuildFile: true,
    });
  }
  return project;
}
