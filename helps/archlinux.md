编辑`/etc/pacman.d/mirrorlist`，先注释掉里面的所有行，然后在文件的最顶端添加

    Server = https://mirrors.sjtug.org/archlinux/$repo/os/$arch 
