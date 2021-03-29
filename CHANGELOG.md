# Changelog

## 2021-03-28

- Now all source code is inside a src folder. We have 4 subfolders
  - **gz3d** - JS code that is bundled for the browser
  - **client** - Everiything that is sent to the browser and is not bundled
  - **gzcoarse** - C++ utility tool that simplifies 3d meshes in order to save bandwith
  - **tools** - Thumbnail generating tool

## 2021-03-27

- Grunt is a really powerfull tool, in order to simplify the project the python script get_local_models was migrated to two Grunt tasks "copy:local_modes" and "copy:local_resources"
- Another simplification made with Grunt was the removal from gz3d CMakeLists.txt, another Grunt task was created to perform the same job

## 2021-02-12

- Gzbrige is now a standalone project
