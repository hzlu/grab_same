# hello_same

A command line client for [SAME](https://same.com/) app.

## installing

```bash
$ npm install -g hello_same
$ hello_same
```

## Usage

search channel

```bash
channel -s <name>
```

view channel info or user profile

```bash
channel -i <id>
user -i <id>
```

view channel/user SAME posts

```bash
channel -c <id>
user -c <id>
```

show more posts(next page)

```bash
n/next/m/more
```

backup channel/user media resources

```bash
channel -b <id>
user -b <id>
```

help and quit

```bash
q/quit
h/help
```

## example

search **广州** channel and view its SAME posts

```bash
hello same > channel -s 广州图文

┌─────────┬─────────────────────┬────────┐
│ 频道ID  │ 频道名              │ 内容数 │
├─────────┼─────────────────────┼────────┤
│ 1015144 │ 广州【SAMER】图文志 │ 101458 │
├─────────┼─────────────────────┼────────┤
│ 1002620 │ 杭州，杭州。        │ 70050  │
├─────────┼─────────────────────┼────────┤
│ 894     │ 苏州                │ 11592  │
├─────────┼─────────────────────┼────────┤
│ 1011981 │ 郑州。              │ 16456  │
├─────────┼─────────────────────┼────────┤
│ 1018560 │ 福州                │ 8729   │
├─────────┼─────────────────────┼────────┤
│ 1284959 │ 广州广州广州        │ 6      │
├─────────┼─────────────────────┼────────┤
...

hello same > channel -i 1015144
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                              频道信息                                                                              │
├──────────┬──────────────────────────────────────────────────────────┬───────────────────────────────────────────────┬──────────────────────────────────────────────┤
│ 频道     │ 广州【SAMER】图文志                                      │ 频道ID                                        │ 1015144                                      │
├──────────┼──────────────────────────────────────────────────────────┼───────────────────────────────────────────────┼──────────────────────────────────────────────┤
│ 频道主   │ 史提芬周                                                 │ 频道主ID                                      │ 1104377                                      │
├──────────┼──────────────────────────────────────────────────────────┼───────────────────────────────────────────────┼──────────────────────────────────────────────┤
│ 创建时间 │ 2014-04-09 10:21:27                                      │ 内容数目                                      │ 101458                                       │
├──────────┼──────────────────────────────────────────────────────────┴───────────────────────────────────────────────┴──────────────────────────────────────────────┤
│ 频道简介 │ 呢度可以分享广州或者你喺广州又或者曾在广州的你嘅点点滴滴，图文不拘。                                                                                    │
│          │ ※※※                                                                                                                                                     │
│          │ 如果你被折叠请先睇下呢个公告                                                                                                                            │
│          │ ×××                                                                                                                                                     │
│          │ 刷屏会折叠，版聊睇情况处理，人身攻击炒虾拆蟹撩事斗非折叠，大量发自拍折叠。发硬广告折叠。連續發帖超過3個有機會摺疊。帖文內有其他app ID或二维码會被摺疊。 │
│          │ 第一条post为自拍必定折叠。                                                                                                                              │
│          │ 多数post为自拍会提高自拍折叠几率。                                                                                                                      │
│          │ 缺乏美感配图会提高折叠概率。                                                                                                                            │
│          │                                                                                                                                                         │
│          │ 可以提意见，但频道坐馆唔一定回复。                                                                                                                      │
│          │ ※※※                                                                                                                                                     │
│          │ 唔好叫我折乜唔折乜，因为我哋三唔识七，我只係义务管理，个个都指手画脚我咪好唔得闲？                                                                      │
└──────────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
hello same >
```

Feel free to try, and enjoy yourself!
