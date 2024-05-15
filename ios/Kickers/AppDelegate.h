//#import <RCTAppDelegate.h>
//#import <React/RCTBridgeDelegate.h>
//#import <UIKit/UIKit.h>
//@interface AppDelegate : UIResponder <UIApplicationDelegate,
//RCTBridgeDelegate,UNUserNotificationCenterDelegate>
//
//@end
//#import <UIKit/UIKit.h>
//
//@interface AppDelegate : UIResponder <UIApplicationDelegate>
//
//@property (strong, nonatomic) UIWindow *window;
//
//@end
#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <UserNotifications/UserNotifications.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (nonatomic, strong) UIWindow *window;
//@property (nonatomic, strong) RCTBridge *bridge;

@end
