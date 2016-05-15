在上海交通大学120周年校庆前夕，经过SJTUG所有人的共同努力，我们上线了Arch Linux，PuTTY和Cygwin的镜像，向百廿交大的生日献上我们的祝福。

Arch Linux源使用方法：

编辑`/etc/pacman.d/mirrorlist`，先注释掉里面的所有行，然后在文件的最顶端添加

    Server = http://mirrors.sjtug.org/archlinux/$repo/os/$arch
