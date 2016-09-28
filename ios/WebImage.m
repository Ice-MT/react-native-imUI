//
//  WebImage.m
//  JCBM
//
//  Created by 陈全 on 16/9/22.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "WebImage.h"
#import "UIImageView+WebCache.h"
#import "UIView+CSFrame.h"

@interface WebImage ()
@property(strong,nonatomic)UIImageView *imv;
@property(strong,nonatomic)UIImage *showIm;

@property(strong,nonatomic)UILabel *label1;

@end

@implementation WebImage



- (instancetype)init
{
  self = [super init];
  if (self) {
    self.imv = [[UIImageView alloc]init];
    self.imv.contentMode = UIViewContentModeScaleAspectFit;
    
    self.imv.layer.cornerRadius = 4;
    self.imv.layer.masksToBounds = YES;
    
    [self addSubview:self.imv];
  }
  return self;
}

- (void)layoutSubviews{
  [super layoutSubviews];

  [self layout];
}


-(void)setIsMe:(BOOL)isMe{
  _isMe = isMe;
  [self layout];
}

- (void)layout{
  
  CGSize size = self.showIm.size;
  
  CGFloat hh = self.bounds.size.height;
  CGFloat ww = self.bounds.size.height;

  if(hh==0||ww==0||!self.showIm){
    return;
  }
  
  self.imv.frame = CGRectMake(0, 0, ww, hh);

  self.imv.height = ww/size.width*size.height;
  self.imv.centerY = ww/2;
  
  if(size.height>size.width){
    ww = hh/size.height*size.width;
    self.imv.frame = CGRectMake(0, 0, ww, hh);

  }
  if(_isMe){
    self.imv.right = hh;
  }else{
    self.imv.left= 0;
  }
  
}

-(void)setUrl:(NSString *)url
{
  _url = url;
  
  if([url hasPrefix:@"http"]){
    [self.imv sd_setImageWithURL:[NSURL URLWithString:url] completed:^(UIImage *image, NSError *error, SDImageCacheType cacheType, NSURL *imageURL) {
      self.showIm = image;
      [self layout];
    }];

  }else{
    
    self.showIm = [UIImage imageWithContentsOfFile:url];
    
    [self.imv setImage:self.showIm];
    [self layer];

  }
  
}



@end
