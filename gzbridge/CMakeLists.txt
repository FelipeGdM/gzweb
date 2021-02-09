cmake_minimum_required(VERSION 2.8 FATAL_ERROR)

project(gzbridge)

find_package(gazebo REQUIRED)
pkg_check_modules(jansson REQUIRED jansson)

# build sources
include_directories(${GAZEBO_INCLUDE_DIRS})
link_directories(${GAZEBO_LIBRARY_DIRS})
list(APPEND CMAKE_CXX_FLAGS "${GAZEBO_CXX_FLAGS}")

set (sources
  GZNode.cc
  ConfigLoader.cc
  GazeboInterface.cc
  OgreMaterialParser.cc
  pb2json.cc
)

add_library(gzbridge ${sources} ${CMAKE_JS_SRC})

# Gives our library file a .node extension without any "lib" prefix
set_target_properties(gzbridge PROPERTIES PREFIX "" SUFFIX ".node")

# Essential include files to build a node addon,
# You should add this line in every CMake.js based project
target_include_directories(gzbridge PRIVATE ${CMAKE_JS_INC})

# Essential library files to link to a node addon
# You should add this line in every CMake.js based project
target_link_libraries(gzbridge ${CMAKE_JS_LIB})

target_link_libraries(gzbridge ${GAZEBO_LIBRARIES} ${jansson_LIBRARIES})

if (UNIX)
  target_link_libraries(gzbridge pthread)
endif()

# enable_testing()

# add_subdirectory(test)

# build tests
# include_directories (
#   ${PROJECT_SOURCE_DIR}
#   ${PROJECT_SOURCE_DIR}/test/gtest/include
#   ${PROJECT_SOURCE_DIR}/test/gtest
# )

# set (test_sources
#   pb2json_TEST.cc)

# foreach(src ${test_sources})
#   string(REGEX REPLACE "\\.cc" "" BINARY_NAME ${src})
#   set(BINARY_NAME UNIT_${BINARY_NAME})

#   add_executable(${BINARY_NAME} ${src})

#   link_directories(${PROJECT_BINARY_DIR}/test)
#   target_link_libraries(${BINARY_NAME}
#     gtest
#     gtest_main
#     gzbridge
#   )
#   if (UNIX)
#     target_link_libraries(${BINARY_NAME} pthread)
#   endif()

#   add_test(${BINARY_NAME} ${CMAKE_CURRENT_BINARY_DIR}/${BINARY_NAME})

# endforeach()

