#sjtug-mirror-frontend

Simple static web frontend for tunasync

## Usage
Modify `logic.js` and set `tunasync_path`(URL of your `tunasync.json`),`dir_base`(URL of the root of your mirror site). It should just work.

### Add help for repo
1. Modify `data.js` and add your repo name to `helpfiles`.
2. Edit `helps/{your_repo_name}.md` to provide help for this repo. This will be displayed as a tooltip.

### Add news
1. Modify `data.js` and add a new item including `title`, `filename` and `date` in `newsfiles`.
2. Edit `news/{filename}.md` to provide the content of this news. News will be sorted by `date` in reverse order.

## License
GPLv3

 > This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 > This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 > You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
