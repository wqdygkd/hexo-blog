---
title: input file 控件
date: 2019/09/27
updated: 2019/09/27
categories:
  - [html&css]
---

## 限制上传文件类型

```html
<input id="File1" type="file" accept=".xls,.doc,.txt,.pdf" />
```

<details>
<summary>文件类型</summary>
<pre>
.3gpp audio/3gpp， video/3gpp 3GPP Audio/Video
.ac3 audio/ac3 AC3 Audio
.asf allpication/vnd.ms-asf Advanced Streaming Format
.au audio/basic AU Audio
.css text/css Cascading Style Sheets
.csv text/csv Comma Separated Values
.doc application/msword MS Word Document
.dot application/msword MS Word Template
.dtd application/xml-dtd Document Type Definition
.dwg image/vnd.dwg AutoCAD Drawing Database
.dxf image/vnd.dxf AutoCAD Drawing Interchange Format
.gif image/gif Graphic Interchange Format
.htm text/html HyperText Markup Language
.html text/html HyperText Markup Language
.jp2 image/jp2 JPEG-2000
.jpe image/jpeg JPEG
.jpeg image/jpeg JPEG
.jpg image/jpeg JPEG
.js text/javascript， application/javascript JavaScript
.json application/json JavaScript Object Notation
.mp2 audio/mpeg， video/mpeg MPEG Audio/Video Stream， Layer II
.mp3 audio/mpeg MPEG Audio Stream， Layer III
.mp4 audio/mp4， video/mp4 MPEG-4 Audio/Video
.mpeg video/mpeg MPEG Video Stream， Layer II
.mpg video/mpeg MPEG Video Stream， Layer II
.mpp application/vnd.ms-project MS Project Project
.ogg application/ogg， audio/ogg Ogg Vorbis
.pdf application/pdf Portable Document Format
.png image/png Portable Network Graphics
.pot application/vnd.ms-powerpoint MS PowerPoint Template
.pps application/vnd.ms-powerpoint MS PowerPoint Slideshow
.ppt application/vnd.ms-powerpoint MS PowerPoint Presentation
.rtf application/rtf， text/rtf Rich Text Format
.svf image/vnd.svf Simple Vector Format
.tif image/tiff Tagged Image Format File
.tiff image/tiff Tagged Image Format File
.txt text/plain Plain Text
.wdb application/vnd.ms-works MS Works Database
.wps application/vnd.ms-works Works Text Document
.xhtml application/xhtml+xml Extensible HyperText Markup Language
.xlc application/vnd.ms-excel MS Excel Chart
.xlm application/vnd.ms-excel MS Excel Macro
.xls application/vnd.ms-excel MS Excel Spreadsheet
.xlt application/vnd.ms-excel MS Excel Template
.xlw application/vnd.ms-excel MS Excel Workspace
.xml text/xml， application/xml Extensible Markup Language
.zip aplication/zip Compressed Archive
</pre>
</details>

## 清空 value

使用 input file 进行文件上传时，重复选择相同文件时，change 事件不再触发
解决方式：手动将 file 的 value 值设置为空

```html
<input type="file" id="file" accept="image/gif,image/jpeg" @change="uploadFile($event)" />
```

```js
$event.target.value = ''
// 或
var file = document.getElementById('file')
file.value = ''
```
