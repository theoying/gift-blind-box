我正在开发一款礼物盲盒的telegram的miniapp，目标是让用户可以在这个miniapp使用star购买盲盒或赠送盲盒给好友，不同盲盒可以开出不同稀有度的telegram礼物，略带一点赌博的性质，同时可以激励用户分享，引起社交裂变。请参考官方示例项目，阅读参考文档，当前所在目录为项目根目录，请在当前目录直接初始化项目，并编写代码实现产品功能，界面要求复合telegram风格，简介易用，复合telegram用户操作习惯。
技术方案：React（+Vite）结合 @telegram-apps/telegram-ui（https://github.com/Telegram-Mini-Apps/TelegramUI），样式框架可采用TailwindCSS，设计请按照官方推荐标准。参考文档1：https://docs.ton.org/mandarin/v3/guidelines/dapps/overview参考文档2:https://core.telegram.org/bots/webapps参考官方示例项目：https://github.com/Telegram-Mini-Apps/reactjs-template
功能点：
1、主页：盲盒礼物展示，盲盒购买（盲盒A系列、盲盒B系列），盲盒开启，我的盲盒列表，我的礼物列表
2、排行榜页：盲盒A系列排行榜，盲盒B系列排行榜
3、分享页：分享好友获得盲盒（分享2个好友即可自己获得B盲盒，2个好友分别获得A盲盒），分享好友升级盲盒（分享1个好友即可升级A盲盒为B盲盒）