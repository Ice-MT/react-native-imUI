//
//  WebImageManager.m
//  JCBM
//
//  Created by 陈全 on 16/9/22.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "WebImageManager.h"
#import "WebImage.h"

@implementation WebImageManager

RCT_EXPORT_VIEW_PROPERTY(url,NSString )
RCT_EXPORT_VIEW_PROPERTY(isMe,BOOL )

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[WebImage alloc] init];
}



@end
