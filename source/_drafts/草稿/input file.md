video
https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video
媒体相关事件 https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events
获取视频状态 播放未开始，播放中，播放暂停，播放结束

```
$('#video).paused
this.$refs['video'][0].paused
```

方法

属性
controls 控制控件，默认不显示
autoplay 自动播放 autoplay 属性优先于 preload
duration
height
loop 布尔属性；指定后，会在视频结尾的地方，自动返回视频开始的地方。 循环播放
muted
布尔属性，指明了视频里的音频的默认设置。设置后，音频会初始化为静音。默认值是 false,意味着视频播放的时候音频也会播放
playsinline
一个布尔属性，标志视频将被“inline”播放，即在元素的播放区域内。请注意，没有此属性并不意味着视频始终是全屏播放的

preload
该枚举属性旨在告诉浏览器作者认为达到最佳的用户体验的方式是什么。可能是下列值之一：
none: 提示作者认为用户不需要查看该视频，服务器也想要最小化访问流量；换句话说就是提示浏览器该视频不需要缓存。
metadata: 提示尽管作者认为用户不需要查看该视频，不过抓取元数据（比如：长度）还是很合理的。
auto: 用户需要这个视频优先加载；换句话说就是提示：如果需要的话，可以下载整个视频，即使用户并不一定会用它。
空字符串：也就代指 auto 值。

poster
一个海报帧的 URL，用于在用户播放或者跳帧之前展示。如果属性未指定，那么在第一帧可用之前什么都不会展示；之后第一帧就像海报帧一样展示。
src
要嵌到页面的视频的 URL。可选；你也可以使用 video 块内的 <source> 元素来指定需要嵌到页面的视频。
width
视频显示区域的宽度，单位是 CSS 像素。
时间偏移量目前是指定为 float 类型的值，表示偏移的秒数。

object-fit: fill;
