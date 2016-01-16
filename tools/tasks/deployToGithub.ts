import {join} from 'path';
import {APP_DEST} from '../config';

export = function deployToGithub(gulp, plugins) {
  return function() {
    return gulp.src(join(APP_DEST, '**/*'))
      .pipe(plugins.ghPages({
        remoteUrl: 'git@github.com:critical-chain/critical-chain.github.io.git',
        branch: 'master'
      }));
  };
}
